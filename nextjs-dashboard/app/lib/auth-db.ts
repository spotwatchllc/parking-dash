/**
 * Server-only: user lookup for credentials auth.
 * Do not import this from middleware or edge code.
 */
import postgres from 'postgres';
import bcrypt from 'bcryptjs';

// Local Postgres (e.g. Docker) usually has no TLS; require SSL only in production
const url = process.env.POSTGRES_URL!;
const useSsl = process.env.NODE_ENV === 'production' && !url.includes('localhost');
const sql = postgres(url, { ssl: useSsl ? 'require' : false });

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export async function getUserByCredentials(
  email: string,
  password: string
): Promise<AuthUser | null> {
  const rows = await sql`
    SELECT id, name, email, password, role
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;
  const row = rows[0] as
    | { id: string; name: string; email: string; password: string; role?: string }
    | undefined;
  if (!row || !(await bcrypt.compare(password, row.password))) return null;
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role ?? 'user',
  };
}

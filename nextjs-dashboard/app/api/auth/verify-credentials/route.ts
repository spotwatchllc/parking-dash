import { NextResponse } from 'next/server';
import { getUserByCredentials } from '@/app/lib/auth-db';

/**
 * Used by Credentials provider authorize (Edge-safe: auth config calls this via fetch).
 * Runs in Node only.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(null, { status: 400 });
    }
    const user = await getUserByCredentials(email, password);
    if (!user) {
      return NextResponse.json(null, { status: 401 });
    }
    return NextResponse.json(user);
  } catch (err) {
    console.error('[verify-credentials]', err);
    return NextResponse.json(null, { status: 500 });
  }
}

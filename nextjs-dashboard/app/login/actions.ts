'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const callbackUrl = (formData.get('callbackUrl') as string) || '/dashboard';

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch {
    return { error: 'Invalid email or password.' };
  }

  redirect(callbackUrl);
}

import { Suspense } from 'react';
import LoginForm from '@/app/ui/login-form';

function LoginFormFallback() {
  return (
    <div className="w-full max-w-sm animate-pulse rounded-lg bg-gray-100 px-6 pb-4 pt-8">
      <div className="mb-4 h-8 w-48 rounded bg-gray-200" />
      <div className="space-y-4">
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
        <div className="h-10 rounded bg-gray-200" />
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}

import { auth } from '@/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginPage = req.nextUrl.pathname === '/login';

  if (isLoginPage) {
    if (isLoggedIn) {
      return Response.redirect(new URL('/dashboard', req.url));
    }
    return;
  }

  if (req.nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return Response.redirect(new URL('/login', req.url));
  }

  return;
});

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

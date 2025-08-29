import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const subdomain = host.split('.')[0];

  // If the subdomain is 'app', rewrite to /app
  if (subdomain === 'app' && !request.nextUrl.pathname.startsWith('/app')) {
    const url = request.nextUrl.clone();
    url.pathname = '/app' + request.nextUrl.pathname;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

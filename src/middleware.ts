import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon (favicon files)
     * - apple-touch-icon (Apple touch icon files)
     * - android-chrome- (Android Chrome files)
     * - site.webmanifest (web manifest file)
     */
    {
      source:
        '/((?!api|_next/static|_next/image|favicon|apple-touch-icon|android-chrome-|site.webmanifest).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    connect-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    media-src 'self' https://media.transistor.fm https://audio.transistor.fm;
    frame-src 'self' https://www.google.com https://recaptcha.google.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors ${request.nextUrl.pathname.startsWith('/blog/preview') ? 'https://hashnode.com' : "'none'"};
    upgrade-insecure-requests;
`
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

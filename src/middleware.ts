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
  const url = request.nextUrl;

  if (url.searchParams.has('qr')) {
    url.searchParams.delete('qr');
    url.searchParams.append('utm_source', 'event');
    url.searchParams.append('utm_medium', 'qr_code');
    url.searchParams.append('utm_campaign', 'cybersecurity_summit_2024');

    return NextResponse.redirect(url);
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const cspHeader = `
    default-src 'self';
    connect-src 'self' https://consentcdn.cookiebot.com https://sst.fix.security;
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://consent.cookiebot.com https://app.storyblok.com${process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"};
    style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
    img-src 'self' https://i.ytimg.com https://a.storyblok.com blob: data: https://imgsct.cookiebot.com;
    media-src 'self' https://media.transistor.fm https://audio.transistor.fm;
    frame-src 'self' https://www.google.com https://recaptcha.google.com https://www.youtube-nocookie.com https://consent.cookiebot.com https://consentcdn.cookiebot.com;
    font-src 'self' data:;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors ${url.pathname.startsWith('/blog/preview') ? 'https://hashnode.com' : "'self' https://app.storyblok.com https://consent.cookiebot.com"};
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

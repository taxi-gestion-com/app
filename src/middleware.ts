import { type NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest): NextResponse => {
  const pathname: string = request.nextUrl.pathname;

  const response: NextResponse = NextResponse.next();

  response.headers.set('x-requested-path', pathname);

  return response;
};

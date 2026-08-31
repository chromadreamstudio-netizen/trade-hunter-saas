import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// اللغات المدعومة واللغة الافتراضية
const locales = ["ar", "en", "tr"];
const defaultLocale = "ar";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // استثناء ملفات النظام والـ API من إعادة التوجيه
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // التحقق مما إذا كان الرابط يحتوي بالفعل على لغة
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // إذا لم يكن هناك لغة في الرابط، أضف اللغة الافتراضية (العربية)
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico).*)',
  ],
};
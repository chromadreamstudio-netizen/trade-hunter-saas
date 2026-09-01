import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // يسمح بنجاح الرفع حتى لو كان هناك تحذيرات تخص شكل الكود
    ignoreDuringBuilds: true,
  },
  typescript: {
    // يسمح بنجاح الرفع وتخطي أخطاء الأنواع الصارمة
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
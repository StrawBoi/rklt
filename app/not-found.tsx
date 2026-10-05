import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-ink-950 text-sand-100 p-6 text-center">
      <div className="max-w-md space-y-6">
        <span className="font-numeral text-7xl md:text-8xl text-terracotta-500 font-extrabold block">
          404
        </span>
        <h1 className="font-display font-extrabold text-2xl md:text-3xl text-sand-100">
          Page Not Found / الصفحة غير موجودة
        </h1>
        <p className="text-sm text-sand-300/80 leading-relaxed">
          The freight route or page you requested could not be located.
          <br />
          لم يتم العثور على المسار أو الصفحة المطلوبة.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/en"
            className="px-5 py-2.5 rounded-md bg-terracotta-500 text-ink-950 font-bold text-sm hover:bg-terracotta-400 transition-colors"
          >
            Return Home (EN)
          </Link>
          <Link
            href="/ar"
            className="px-5 py-2.5 rounded-md bg-ink-800 text-sand-100 border border-ink-700 font-bold text-sm hover:border-terracotta-500 hover:text-terracotta-300 transition-colors"
          >
            الرئيسية (العربية)
          </Link>
        </div>
      </div>
    </div>
  );
}

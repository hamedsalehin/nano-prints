import React, { Suspense } from "react";
import DesignPage from "../../design/page";

export default function LoadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
          <div className="w-8 h-8 border-4 border-[#ff2d78] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold tracking-wide">
            Loading Design Studio...
          </span>
        </div>
      }
    >
      <DesignPage />
    </Suspense>
  );
}

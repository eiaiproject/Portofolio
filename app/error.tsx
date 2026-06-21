"use client";

import { useEffect } from "react";
import { Terminal } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#E5E7EB] flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0D1117] border border-[#78350F] rounded-sm">
          <Terminal className="w-10 h-10 text-[#FBBF24]" />
        </div>

        <div className="space-y-4">
          <h1 className="text-2xl font-sans font-semibold text-[#E5E7EB]">
            Something broke in the lab
          </h1>
          <p className="text-[#9CA3AF] font-sans leading-relaxed">
            An unexpected error occurred. The build failed, but the lesson is logged.
          </p>
          {error.digest && (
            <p className="font-mono text-xs text-[#6B7280]">
              Error: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#111827] hover:bg-[#151B23] text-[#E5E7EB] border border-[#263241] font-sans font-medium text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5E7EB]"
          >
            Back to Lab Index
          </a>
        </div>
      </div>
    </div>
  );
}

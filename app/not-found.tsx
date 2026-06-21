import { FlaskConical } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-[#E5E7EB] flex items-center justify-center p-6">
      <div className="max-w-md text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#0D1117] border border-[#263241] rounded-sm">
          <FlaskConical className="w-10 h-10 text-[#7DD3FC]" />
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-mono font-bold text-[#7DD3FC]">404</h1>
          <h2 className="text-xl font-sans font-semibold text-[#E5E7EB]">Page Not Found</h2>
          <p className="text-[#9CA3AF] font-sans leading-relaxed">
            This experiment doesn&apos;t exist yet. Maybe it&apos;s still in the lab, or maybe it was never built.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
          >
            Back to Lab Index
          </Link>
        </div>

        <div className="pt-8 border-t border-[#263241]">
          <p className="font-mono text-xs text-[#6B7280]">
            ERR_PAGE_NOT_FOUND // status: 404
          </p>
        </div>
      </div>
    </div>
  );
}

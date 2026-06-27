import Link from "next/link";
import { FileTerminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-[#E5E7EB] flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0D1117] border border-[#263241] rounded-sm">
          <FileTerminal className="w-8 h-8 text-[#7DD3FC]" />
        </div>
        <h1 className="text-4xl font-bold font-sans text-balance">Log not found</h1>
        <p className="text-[#9CA3AF] font-sans text-pretty">
          This page doesn&apos;t exist in the lab notebook. Maybe it was archived, or maybe it was never built.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490]/12 hover:bg-[#164E63]/40 text-[#7DD3FC] border border-[#164E63] font-sans font-medium text-sm rounded-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7DD3FC]"
        >
          Back to Lab Index
        </Link>
      </div>
    </div>
  );
}

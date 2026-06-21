import { FlaskConical } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#070A0F] text-[#E5E7EB] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 bg-[#0D1117] border border-[#263241] rounded-sm flex items-center justify-center animate-pulse">
          <FlaskConical className="w-6 h-6 text-[#7DD3FC]" />
        </div>
        <p className="font-mono text-xs text-[#6B7280]">Loading lab...</p>
      </div>
    </div>
  );
}

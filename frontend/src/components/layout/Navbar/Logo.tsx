export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-center text-2xl font-extrabold tracking-tight text-[#FBF8F5] select-none cursor-default ${className}`}
      aria-label="Amber"
    >
      <span>amber</span>
      <span className="text-[#FF8A00] text-3xl leading-none">.</span>
    </div>
  );
}

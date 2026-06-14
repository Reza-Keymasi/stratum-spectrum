import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-3/5 bg-blue-500 flex-col justify-between p-10 relative overflow-hidden">
        {/* Rings */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full border-[40px] border-white/[0.04] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full border-[25px] border-white/[0.05] translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-52 h-52 rounded-full border-[35px] border-white/[0.04] -translate-x-1/3 translate-y-1/3" />

        {/* Brand */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
            {/* Logo */}
          </div>
          <span className="text-white/90 font-medium text-sm tracking-tight">
            Acme
          </span>
        </div>

        {/* Quote */}
        <div className="relative z-10">
          <p className="text-white/80 text-lg font-light leading-relaxed mb-4 tracking-tight">
            "The simplest tools are often the most powerful ones."
          </p>
          <p className="text-white/40 text-sm">
            — Sofia Esposito, Product Lead
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-2/5 bg-gradient-to-b from-white/10 to-gray-200/20 flex items-center justify-center px-8 py-12">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

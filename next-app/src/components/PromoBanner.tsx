"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const PromoBanner: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hidden = localStorage.getItem("promoHidden");
      if (hidden === "1") setVisible(false);
    }
  }, []);

  const dismiss = () => {
    setVisible(false);
    if (typeof window !== "undefined") localStorage.setItem("promoHidden", "1");
  };

  if (!visible) return null;

  return (
    <div className="w-full bg-gfg-green/90 backdrop-blur-sm text-white py-2.5 border-b border-gfg-green/30">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        <div className="text-sm font-medium flex items-center gap-2">
          <Icon icon={['fas', 'bolt']} className="text-gfg-lime text-xs" />
          Become AI Ready with GfG! Get AI Toolkit worth <span className="font-bold text-gfg-lime">INR 5,999</span> and GfG Connect Vouchers by Enrolling Today
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/enroll" className="bg-white text-gfg-green font-bold px-3 py-1 rounded-lg text-sm hover:opacity-90 transition-opacity">
            Enroll Now
          </Link>
          <button onClick={dismiss} aria-label="Dismiss promo" className="text-white/70 hover:text-white transition-colors">
            <Icon icon={['fas', 'xmark']} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;

'use client';

import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
  onOpenHelp?: () => void;
  onOpenMostlyVisited?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenHelp,
  onOpenMostlyVisited,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-xl border-b border-surface-container shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
      {/* Left side brand logo (since sidebar was completely removed) */}
      <div className="flex items-center gap-space-lg">
        <div
          className="flex items-center gap-space-sm cursor-pointer select-none"
          onClick={onGoHome}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-on-primary text-[20px]">
              health_and_safety
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              MediMatch AI
            </span>
            <span className="font-body-sm text-[11px] text-on-surface-variant">
              Clinical Trial Finder
            </span>
          </div>
        </div>

        <div className="h-4 w-[1px] bg-outline-variant hidden sm:block"></div>

        {/* Secondary options: Help and Mostly Visited Cases */}
        <nav className="hidden sm:flex items-center gap-space-sm">
          <button
            type="button"
            onClick={onOpenHelp}
            className="px-3 py-1.5 rounded-lg text-body-sm text-[13px] text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">help_outline</span>
            <span>Help</span>
          </button>
          <button
            type="button"
            onClick={onOpenMostlyVisited}
            className="px-3 py-1.5 rounded-lg text-body-sm text-[13px] text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>Mostly Visited Cases</span>
          </button>
        </nav>
      </div>

      {/* Right side items */}
      <div className="flex items-center gap-space-md">
        {/* Theme Switcher Button */}
        <button
          aria-label="Theme Switcher"
          className="p-space-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-lg transition-colors flex items-center justify-center cursor-pointer"
          type="button"
          onClick={() => {
            document.documentElement.classList.toggle('dark');
          }}
        >
          <span className="material-symbols-outlined text-[20px]">light_mode</span>
        </button>

        <div className="h-4 w-[1px] bg-outline-variant"></div>

        {/* Medical Advisor Profile with Dr. MediMatch */}
        <div className="flex items-center gap-space-sm">
          <div className="text-right hidden sm:flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-tight font-semibold">
              Dr. MediMatch
            </span>
            <span className="font-body-sm text-[12px] text-on-surface-variant">
              Clinical Oncology Advisor
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};

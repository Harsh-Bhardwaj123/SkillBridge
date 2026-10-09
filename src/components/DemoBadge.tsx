import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const DemoBadge: React.FC = () => {
  const { isDemoMode } = useAuth();

  if (!isDemoMode) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#e6f3f0] border border-[#cde4df] text-[#007f70]">
        <CheckCircle2 className="w-3.5 h-3.5 text-[#007f70]" />
        <span>Supabase Live</span>
      </div>
    );
  }

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#fef7ee] border border-[#f8e3c7] text-[#a05e03] shadow-sm transition hover:bg-[#fcefd8]"
      title="Demo Mode Active: Using local persistent storage and intelligent AI fallback. Fully operational!"
    >
      <Sparkles className="w-3.5 h-3.5 text-[#c27807]" />
      <span className="font-semibold tracking-wide">Demo Mode</span>
    </div>
  );
};

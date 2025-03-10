
import React, { createContext, useContext } from 'react';

const TooltipContext = createContext({});

export function Tooltip({ children, delayDuration }: { children: React.ReactNode, delayDuration?: number }) {
  return <div className="relative inline-block">{children}</div>;
}

export function TooltipTrigger({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex">{children}</div>;
}

export function TooltipContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute z-50 p-2 bg-black text-white rounded shadow-lg">
      {children}
    </div>
  );
}

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return (
    <TooltipContext.Provider value={{}}>
      {children}
    </TooltipContext.Provider>
  );
}

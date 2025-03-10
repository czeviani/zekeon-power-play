
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

type SidebarProps = {
  children: React.ReactNode;
};

export const Sidebar = ({ children }: SidebarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-16 bg-black text-white py-4">
      <TooltipProvider>
        {/* Replace the Tooltip with delayDuration with our simplified version */}
        <Tooltip>
          <TooltipTrigger>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            Sidebar Item
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;

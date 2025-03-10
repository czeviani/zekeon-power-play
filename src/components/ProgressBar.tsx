
import React from 'react';

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-10">
      <div className="flex h-1">
        {Array.from({ length: totalSteps }).map((_, step) => (
          <div
            key={step}
            className={`flex-1 transition-all duration-500 ${
              step <= currentStep ? 'bg-[#42e076]' : 'bg-gray-800'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;

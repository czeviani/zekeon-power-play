import React from 'react';
import { Check } from 'lucide-react';
import clsx from 'clsx';

type Props = {
  currentStep: number;
  totalSteps: number;
};

export const StepIndicator: React.FC<Props> = ({ currentStep, totalSteps }) => {
  return (
    <div className="flex items-center justify-between w-full">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center">
            <div
              className={clsx(
                'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                index < currentStep
                  ? 'bg-[#42e076] border-[#42e076] text-black'
                  : index === currentStep
                  ? 'border-[#42e076] text-[#42e076]'
                  : 'border-gray-800 text-gray-600'
              )}
            >
              {index < currentStep ? (
                <Check size={20} />
              ) : (
                <span className="text-lg">{index + 1}</span>
              )}
            </div>
            <span className={clsx(
              'text-sm mt-2 transition-colors duration-300',
              index <= currentStep ? 'text-gray-300' : 'text-gray-600'
            )}>
              Passo {index + 1}
            </span>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={clsx(
                'flex-1 h-0.5 transition-colors duration-300',
                index < currentStep - 1
                  ? 'bg-[#42e076]'
                  : 'bg-gray-800'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
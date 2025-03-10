
import React from 'react';
import { REGIONS } from '../../constants';

type StateSelectionStepProps = {
  onStateSelect: (state: string) => void;
};

const StateSelectionStep: React.FC<StateSelectionStepProps> = ({ onStateSelect }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pt-16">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Selecione seu Estado
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light">
          Escolha o estado onde será feita a instalação
        </p>
      </div>

      <div className="space-y-8 mt-8">
        {REGIONS.map(region => (
          <div key={region.name} className="space-y-4">
            <h3 className="text-lg text-gray-400 font-bold tracking-wide">{region.name}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {region.states.map(state => (
                <button
                  key={state}
                  onClick={() => onStateSelect(state)}
                  className="p-4 rounded-xl border border-gray-800/80 hover:border-[#42e076] transition-all duration-500 text-left font-light tracking-wide text-sm sm:text-base hover:bg-[#42e076]/[0.03]"
                >
                  {state}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StateSelectionStep;


import React from 'react';
import { Building2, Home } from 'lucide-react';
import type { InstallationType } from '../../types';

type InstallationTypeStepProps = {
  onInstallationTypeChange: (type: InstallationType) => void;
};

const InstallationTypeStep: React.FC<InstallationTypeStepProps> = ({ 
  onInstallationTypeChange 
}) => {
  return (
    <div className="space-y-12 max-w-4xl mx-auto pt-16">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Qual o tipo de instalação?
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light max-w-2xl mx-auto">
          Escolha o tipo de instalação para começarmos a calcular sua economia
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 max-w-3xl mx-auto">
        <button
          onClick={() => onInstallationTypeChange('residential')}
          className="aspect-[2/1] sm:aspect-[1.8/1] rounded-2xl border border-gray-800/80 hover:border-[#42e076] transition-all duration-500 flex flex-col items-center justify-center gap-4 group hover:bg-[#42e076]/[0.03]"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a1f14] flex items-center justify-center group-hover:scale-110 transition-all duration-500">
            <Home className="w-6 h-6 sm:w-7 sm:h-7 text-[#42e076]" />
          </div>
          <span className="text-lg font-light tracking-wide">Residência</span>
        </button>

        <button
          onClick={() => onInstallationTypeChange('business')}
          className="aspect-[2/1] sm:aspect-[1.8/1] rounded-2xl border border-gray-800/80 hover:border-[#42e076] transition-all duration-500 flex flex-col items-center justify-center gap-4 group hover:bg-[#42e076]/[0.03]"
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a1f14] flex items-center justify-center group-hover:scale-110 transition-all duration-500">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#42e076]" />
          </div>
          <span className="text-lg font-light tracking-wide">Empresa</span>
        </button>
      </div>
    </div>
  );
};

export default InstallationTypeStep;

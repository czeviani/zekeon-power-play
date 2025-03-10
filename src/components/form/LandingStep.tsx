
import React from 'react';
import { Sparkles, Zap, Timer, ArrowRight } from 'lucide-react';

type LandingStepProps = {
  onNext: () => void;
};

const LandingStep: React.FC<LandingStepProps> = ({ onNext }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none">
            <span className="text-[#42e076] block mb-2">Reduza em até 42%</span>
            <span>sua conta de energia!</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl font-light max-w-2xl mx-auto">
            Descubra quanto você pode economizar em sua conta
          </p>
        </div>

        <div className="space-y-3 max-w-lg mx-auto w-full mt-8">
          <div className="w-full p-4 rounded-xl border border-gray-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0a1f14] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#42e076]" />
            </div>
            <span className="text-lg font-light">Equipe especializada</span>
          </div>
          
          <div className="w-full p-4 rounded-xl border border-gray-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0a1f14] flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#42e076]" />
            </div>
            <span className="text-lg font-light">Início rápido</span>
          </div>
          
          <div className="w-full p-4 rounded-xl border border-gray-800/80 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0a1f14] flex items-center justify-center">
              <Timer className="w-6 h-6 text-[#42e076]" />
            </div>
            <span className="text-lg font-light">Processo facilitado</span>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#42e076] text-black font-medium text-lg tracking-wide transition-all duration-300 hover:bg-[#42e076]/90"
          >
            <span>Iniciar simulação</span>
            <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingStep;

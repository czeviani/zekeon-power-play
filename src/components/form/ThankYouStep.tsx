
import React from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';

type ThankYouStepProps = {
  resetForm: () => void;
};

const ThankYouStep: React.FC<ThankYouStepProps> = ({ resetForm }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="w-20 h-20 rounded-full bg-[#0a1f14] flex items-center justify-center mx-auto">
          <Sparkles className="w-10 h-10 text-[#42e076]" />
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Obrigado pelo seu interesse!
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light">
          Em breve, nossa equipe entrará em contato para discutir as melhores opções para você.
        </p>
        <button
          onClick={resetForm}
          className="inline-flex items-center gap-2 text-[#42e076] hover:text-[#42e076]/80 transition-colors duration-300 mt-8"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao início</span>
        </button>
      </div>
    </div>
  );
};

export default ThankYouStep;

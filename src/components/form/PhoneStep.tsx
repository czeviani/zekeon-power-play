
import React from 'react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';

type PhoneStepProps = {
  phone: string;
  onPhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitError: string | null;
  showWarning: boolean;
  resetForm: () => void;
};

const PhoneStep: React.FC<PhoneStepProps> = ({ 
  phone, 
  onPhoneChange, 
  submitError, 
  showWarning,
  resetForm
}) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pt-24 sm:pt-32">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Número de Telefone
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light">
          Informe seu número de telefone para contato
        </p>
      </div>

      <div className="mt-16 sm:mt-24">
        <div className="max-w-md mx-auto">
          <input
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            placeholder="(00) 00000-0000"
            className="w-full p-4 bg-transparent border-b border-gray-800/80 focus:border-[#42e076] outline-none transition-all duration-300 text-lg sm:text-xl font-light tracking-wider text-center placeholder:text-gray-700"
          />
        </div>
        {submitError && (
          <p className="text-red-500 text-sm text-center mt-4">{submitError}</p>
        )}
        {showWarning && (
          <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <p className="text-yellow-500 font-medium">Aviso Importante</p>
                <p className="text-yellow-500/90 text-sm leading-relaxed">
                  Infelizmente, com base no consumo informado, sua instalação não se enquadra nos parâmetros necessários para viabilizar o investimento neste momento. Agradecemos seu interesse!
                </p>
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors duration-300 mt-4"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar ao início</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneStep;

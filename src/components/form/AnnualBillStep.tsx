
import React from 'react';

type AnnualBillStepProps = {
  annualBill: number;
  onBillChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AnnualBillStep: React.FC<AnnualBillStepProps> = ({ annualBill, onBillChange }) => {
  return (
    <div className="space-y-8 max-w-2xl mx-auto pt-24 sm:pt-32">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
          Valor Mensal da Conta
        </h2>
        <p className="text-gray-400 text-base sm:text-lg font-light">
          Informe o valor mensal da sua conta de energia
        </p>
      </div>

      <div className="mt-16 sm:mt-24">
        <div className="relative max-w-md mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-light">R$</span>
          <input
            type="text"
            inputMode="numeric"
            value={annualBill > 0 ? annualBill.toString() : ''}
            onChange={onBillChange}
            placeholder="0"
            className="w-full p-4 pl-12 bg-transparent border-b border-gray-800/80 focus:border-[#42e076] outline-none transition-all duration-300 text-lg sm:text-xl font-light tracking-wider placeholder:text-gray-700"
          />
        </div>
      </div>
    </div>
  );
};

export default AnnualBillStep;

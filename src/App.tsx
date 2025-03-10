import React, { useState } from 'react';
import { Building2, Home, ArrowLeft, Timer, Zap, Sparkles, ArrowRight, AlertTriangle } from 'lucide-react';
import { REGIONS } from './constants';
import type { FormData, InstallationType } from './types';
import { supabase } from './lib/supabase';

function formatPhoneNumber(value: string) {
  const numbers = value.replace(/\D/g, '');
  let formatted = numbers;
  
  if (numbers.length >= 2) {
    formatted = `(${numbers.slice(0, 2)}`;
    if (numbers.length >= 3) {
      formatted += `) ${numbers.slice(2, 7)}`;
      if (numbers.length >= 7) {
        formatted += `-${numbers.slice(7, 11)}`;
      }
    }
  }
  
  return formatted;
}

function cleanPhoneNumber(phone: string) {
  return phone.replace(/\D/g, '');
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    installationType: '',
    state: '',
    annualBill: 0,
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showWarning, setShowWarning] = useState(false);

  const handleInstallationTypeChange = (type: InstallationType) => {
    setFormData(prev => ({ ...prev, installationType: type }));
    setCurrentStep(2);
  };

  const handleStateSelect = (state: string) => {
    setFormData(prev => ({ ...prev, state }));
    setCurrentStep(3);
  };

  const handleBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    const numberValue = parseInt(inputValue) || 0;
    setFormData(prev => ({ ...prev, annualBill: numberValue }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    if (formatted.length <= 15) {
      setFormData(prev => ({ ...prev, phone: formatted }));
    }
  };

  const handleNext = async () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else if (currentStep === 3 && formData.annualBill > 0) {
      setCurrentStep(4);
    } else if (currentStep === 4 && formData.phone.replace(/\D/g, '').length === 11) {
      setIsSubmitting(true);
      setSubmitError(null);
      setShowWarning(false);
      
      const isDisqualified = formData.installationType === 'residential' && formData.annualBill < 5000;
      
      try {
        const { error } = await supabase
          .from('leads')
          .insert([{
            installation_type: formData.installationType,
            state: formData.state,
            annual_bill: formData.annualBill, // Agora enviamos o valor mensal direto
            phone: cleanPhoneNumber(formData.phone),
            qualify_lead: isDisqualified ? 'desqualificado' : 'qualified'
          }]);

        if (error) throw error;

        if (isDisqualified) {
          setShowWarning(true);
        } else {
          setFormData({
            installationType: '',
            state: '',
            annualBill: 0,
            phone: ''
          });
          setCurrentStep(5);
        }
      } catch (error) {
        setSubmitError('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
        console.error('Error submitting lead:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Progress indicator */}
      {currentStep > 0 && currentStep < 5 && (
        <div className="fixed top-0 left-0 right-0 z-10">
          <div className="flex h-1">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`flex-1 transition-all duration-500 ${
                  step <= currentStep ? 'bg-[#42e076]' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Back button */}
      {currentStep > 0 && currentStep < 5 && (
        <button
          onClick={handleBack}
          className="fixed top-6 left-6 z-10 text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm group bg-black/90 backdrop-blur-sm py-2 px-4 rounded-lg"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-light tracking-wide">Voltar</span>
        </button>
      )}

      {/* Main content */}
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 px-4 sm:px-6 md:px-8">
          {currentStep === 0 && (
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
                    onClick={handleNext}
                    className="w-full group flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-[#42e076] text-black font-medium text-lg tracking-wide transition-all duration-300 hover:bg-[#42e076]/90"
                  >
                    <span>Iniciar simulação</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
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
                  onClick={() => handleInstallationTypeChange('residential')}
                  className="aspect-[2/1] sm:aspect-[1.8/1] rounded-2xl border border-gray-800/80 hover:border-[#42e076] transition-all duration-500 flex flex-col items-center justify-center gap-4 group hover:bg-[#42e076]/[0.03]"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a1f14] flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    <Home className="w-6 h-6 sm:w-7 sm:h-7 text-[#42e076]" />
                  </div>
                  <span className="text-lg font-light tracking-wide">Residência</span>
                </button>

                <button
                  onClick={() => handleInstallationTypeChange('business')}
                  className="aspect-[2/1] sm:aspect-[1.8/1] rounded-2xl border border-gray-800/80 hover:border-[#42e076] transition-all duration-500 flex flex-col items-center justify-center gap-4 group hover:bg-[#42e076]/[0.03]"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0a1f14] flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-[#42e076]" />
                  </div>
                  <span className="text-lg font-light tracking-wide">Empresa</span>
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
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
                          onClick={() => handleStateSelect(state)}
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
          )}

          {currentStep === 3 && (
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
                    value={formData.annualBill > 0 ? formData.annualBill.toString() : ''}
                    onChange={handleBillChange}
                    placeholder="0"
                    className="w-full p-4 pl-12 bg-transparent border-b border-gray-800/80 focus:border-[#42e076] outline-none transition-all duration-300 text-lg sm:text-xl font-light tracking-wider placeholder:text-gray-700"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
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
                    value={formData.phone}
                    onChange={handlePhoneChange}
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
                          onClick={() => setCurrentStep(0)}
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
          )}

          {currentStep === 5 && (
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
                  onClick={() => setCurrentStep(0)}
                  className="inline-flex items-center gap-2 text-[#42e076] hover:text-[#42e076]/80 transition-colors duration-300 mt-8"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar ao início</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Fixed bottom button */}
        {(currentStep === 3 || currentStep === 4) && !showWarning && (
          <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
            <div className="max-w-md mx-auto">
              <button
                onClick={handleNext}
                disabled={
                  (currentStep === 3 && formData.annualBill <= 0) ||
                  (currentStep === 4 && formData.phone.replace(/\D/g, '').length !== 11) ||
                  isSubmitting
                }
                className="w-full p-4 rounded-xl bg-[#42e076] text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg tracking-wide transition-all duration-300 hover:bg-[#42e076]/90 disabled:hover:bg-[#42e076] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
                    <span>Enviando...</span>
                  </>
                ) : (
                  currentStep === 4 ? 'Enviar' : 'Continuar'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
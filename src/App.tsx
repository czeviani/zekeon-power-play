
import React, { useState } from 'react';
import { supabase } from './lib/supabase';
import type { FormData, InstallationType } from './types';
import { formatPhoneNumber, cleanPhoneNumber } from './utils/formatters';

// Components
import ProgressBar from './components/ProgressBar';
import BackButton from './components/BackButton';
import NextButton from './components/NextButton';
import LandingStep from './components/form/LandingStep';
import InstallationTypeStep from './components/form/InstallationTypeStep';
import StateSelectionStep from './components/form/StateSelectionStep';
import AnnualBillStep from './components/form/AnnualBillStep';
import PhoneStep from './components/form/PhoneStep';
import ThankYouStep from './components/form/ThankYouStep';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    installationType: 'residential',
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

  const resetForm = () => {
    setCurrentStep(0);
    setFormData({
      installationType: 'residential',
      state: '',
      annualBill: 0,
      phone: ''
    });
    setSubmitError(null);
    setShowWarning(false);
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
            annual_bill: formData.annualBill,
            phone: cleanPhoneNumber(formData.phone),
            qualify_lead: isDisqualified ? 'desqualificado' : 'qualified'
          }]);

        if (error) throw error;

        if (isDisqualified) {
          setShowWarning(true);
        } else {
          setFormData({
            installationType: 'residential',
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

  const isNextButtonDisabled = () => {
    if (currentStep === 3) return formData.annualBill <= 0;
    if (currentStep === 4) return formData.phone.replace(/\D/g, '').length !== 11;
    return false;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {currentStep > 0 && currentStep < 5 && <ProgressBar currentStep={currentStep - 1} totalSteps={4} />}
      {currentStep > 0 && currentStep < 5 && <BackButton onClick={handleBack} />}

      <div className="min-h-screen flex flex-col">
        <div className="flex-1 px-4 sm:px-6 md:px-8">
          {currentStep === 0 && <LandingStep onNext={handleNext} />}
          {currentStep === 1 && <InstallationTypeStep onInstallationTypeChange={handleInstallationTypeChange} />}
          {currentStep === 2 && <StateSelectionStep onStateSelect={handleStateSelect} />}
          {currentStep === 3 && <AnnualBillStep annualBill={formData.annualBill} onBillChange={handleBillChange} />}
          {currentStep === 4 && (
            <PhoneStep 
              phone={formData.phone} 
              onPhoneChange={handlePhoneChange} 
              submitError={submitError} 
              showWarning={showWarning}
              resetForm={resetForm}
            />
          )}
          {currentStep === 5 && <ThankYouStep resetForm={resetForm} />}
        </div>

        {(currentStep === 3 || currentStep === 4) && !showWarning && (
          <NextButton 
            onClick={handleNext} 
            disabled={isNextButtonDisabled()} 
            isSubmitting={isSubmitting}
            text={currentStep === 4 ? 'Enviar' : 'Continuar'}
          />
        )}
      </div>
    </div>
  );
}

export default App;

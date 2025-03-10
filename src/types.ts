
export type InstallationType = 'residential' | 'business';

export interface FormData {
  installationType: InstallationType;
  state: string;
  annualBill: number;
  phone: string;
}

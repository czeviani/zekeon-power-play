
export type InstallationType = 'business' | 'residential';

export type Region = {
  name: string;
  states: string[];
};

export type FormData = {
  installationType: InstallationType;
  state: string;
  annualBill: number;
  phone: string;
};

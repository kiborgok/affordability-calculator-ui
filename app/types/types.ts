export type AffordabilityRequest = { grossIncome: number; deductions: number; currency?: string };

export type AffordabilityResponse = {
  grossIncome: number;
  deductions: number;
  netIncome: number;
  maxLoan: number;
  eligible: boolean;
  explanation: string;
  currency?: string;
};
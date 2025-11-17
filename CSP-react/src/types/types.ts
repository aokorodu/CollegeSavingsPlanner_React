export type College = {
  name: string;
  cost: number;
  colors: string[];
};

export type FCost = {
  futureCost: number;
  yearlyCostByYear: number[];
};

export type calcObject = {
  selectedCollege?: College | null;
  currentCost?: number;
  yearsToCollege: number;
  initialBalance: number;
  annualRateOfReturn: number;
  annalCostIncrease: number;
  periods: number;
  contribution: number;
  futureSaved: number;
  futureCost: FCost;
  expenseRatio: number;
};

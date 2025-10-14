export type amtSavedParams = {
  rateOfReturn: number;
  periods: number;
  yearsToCollege: number;
  initialBalance: number;
  contribution: number;
};

export const calculateAmountSaved = ({
  rateOfReturn,
  periods,
  yearsToCollege,
  initialBalance,
  contribution,
}: amtSavedParams) => {
  const monthlyRateOfReturn = rateOfReturn / 100 / periods;

  const totalMonths = yearsToCollege * periods;

  let balance = initialBalance;
  console.log("balance: ", balance);
  for (let month = 0; month < totalMonths; month++) {
    balance += contribution;
    balance += balance * monthlyRateOfReturn;
  }

  return balance;
};

export type futureCostParams = {
  yearlyCost: number;
  yearsToCollege: number;
  yearsOfCollege: number;
  annualCostIncrease: number;
};

export type futureCostReturn = {
  futureCost: number;
  yearlyCostByYear: number[];
};

export const calculateFutureCost = ({
  yearlyCost,
  annualCostIncrease,
  yearsToCollege,
  yearsOfCollege,
}: futureCostParams): futureCostReturn => {
  const arr = [];
  const annualCollegeCostIncrease = 1 + annualCostIncrease / 100; // 5% increase per year
  let futureYearlyCost = yearlyCost;
  for (let i = 0; i < yearsToCollege; i++) {
    futureYearlyCost *= annualCollegeCostIncrease;
  }

  let futureCost = 0;
  for (let i = 0; i < yearsOfCollege; i++) {
    futureCost += futureYearlyCost;
    arr.push(Math.round(futureYearlyCost));
    futureYearlyCost *= annualCollegeCostIncrease;
  }
  const obj: futureCostReturn = {
    futureCost: Math.round(futureCost),
    yearlyCostByYear: arr,
  };
  return obj;
};

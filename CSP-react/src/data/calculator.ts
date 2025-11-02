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
  const periodicRateOfReturn = rateOfReturn / 100 / periods;

  const totalMonths = yearsToCollege * periods;

  let balance = initialBalance;
  console.log("balance: ", balance);
  for (let month = 0; month < totalMonths; month++) {
    balance += contribution;
    balance += balance * periodicRateOfReturn;
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

// AI prompted function to calculate future value of an investment with contributions
/* 
    Create a method to calculate future value of an investment that involves both an initial lump-sum investment 
    and ongoing regular contributions taking into account the expense ratio
*/

export type futureValueParams = {
  annualRateOfReturn: number; // percent e.g. 6 for 6%
  expenseRatio: number; // percent annual expense ratio to subtract from return
  periodsPerYear: number; // compounding/contribution periods per year (e.g. 12)
  years: number;
  initialInvestment: number;
  periodicContribution: number; // contribution per period
  contributionTiming?: "begin" | "end"; // default 'begin' (contribute then earn)
};

export const calculateFutureValue = ({
  annualRateOfReturn,
  expenseRatio,
  periodsPerYear,
  years,
  initialInvestment,
  periodicContribution,
  contributionTiming = "begin",
}: futureValueParams): number => {
  if (periodsPerYear <= 0 || years < 0)
    throw new Error("Invalid periodsPerYear or years");

  const netAnnualReturn = annualRateOfReturn - expenseRatio;
  const periodicRate = netAnnualReturn / 100 / periodsPerYear;
  const totalPeriods = Math.floor(years * periodsPerYear);

  let balance = initialInvestment;

  for (let i = 0; i < totalPeriods; i++) {
    if (contributionTiming === "begin") {
      balance += periodicContribution;
    }
    balance *= 1 + periodicRate;
    if (contributionTiming === "end") {
      balance += periodicContribution;
    }
  }

  return parseFloat(balance.toFixed(2));
};

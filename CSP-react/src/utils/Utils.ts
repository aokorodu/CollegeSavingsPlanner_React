export const formatToDollarString = (input: string) => {
  console.log("setStartBalanceFromInput", input);
  let amt = input == "$" ? "0" : input;
  const cleanedInput = amt.replace(/\D/g, "");
  return cleanedInput;
};

export const getDollarString = (amount: number) => {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
};

export const convertToDollarString = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatToDollarString = (input: string) => {
  console.log("setStartBalanceFromInput", input);
  let amt = input == "$" ? "0" : input;
  const cleanedInput = amt.replace(/\D/g, "");
  return cleanedInput;
};

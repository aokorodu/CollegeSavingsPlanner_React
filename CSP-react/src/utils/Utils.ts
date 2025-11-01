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

export const getUserState = async (): Promise<string | null> => {
  if (typeof navigator === "undefined" || !("geolocation" in navigator))
    return null;

  const getPosition = (options?: PositionOptions) =>
    new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    );

  try {
    const pos = await getPosition({ enableHighAccuracy: false, timeout: 7000 });
    const { latitude, longitude } = pos.coords;
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(
      latitude
    )}&lon=${encodeURIComponent(longitude)}&addressdetails=1`;

    const resp = await fetch(url);
    if (!resp.ok) return null;

    const data = await resp.json();
    const address = data.address || {};

    // Prefer state, fall back to common alternatives
    return address.state || address.state_code || address.region || null;
  } catch {
    return null;
  }
};

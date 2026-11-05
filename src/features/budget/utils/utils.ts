export const formatNumber = (num: number | null) => {
  return typeof num === "number" ? num.toLocaleString("en-US") : "0";
};

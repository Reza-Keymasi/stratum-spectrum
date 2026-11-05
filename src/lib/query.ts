export const toQueryString = (
  params: Record<string, string | number | undefined>,
) => {
  const queryString = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "")
      queryString.set(key, String(value));
  }

  const s = queryString.toString();
  return s ? `?${s}` : "";
};

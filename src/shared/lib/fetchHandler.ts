export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    message = this.message;
  }
}

let getAccessToken: () => string | null = () => null;

export function configureTokenGetter(getter: () => string | null): void {
  getAccessToken = getter;
}

export const fetchHandler = async <T>(
  url: string,
  init?: RequestInit,
): Promise<T> => {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `Request failed: ${response.statusText}`,
    );
  }

  return response.json();
};

export type ServerActionSuccess<T> = { success: true; data: T };

export type ServerActionError = { success: false; error: string };

export type ServerActionResult<T = void> = ServerActionSuccess<T> | ServerActionError;

export const ServerActionError = (error: string): ServerActionError => ({
  success: false,
  error
});

export const ServerActionSuccess = <T>(data?: T): ServerActionSuccess<T> => ({
  success: true,
  data: (data ?? void 0) as T
});

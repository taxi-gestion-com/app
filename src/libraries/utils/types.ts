export type LoosePartial<T> = {
  [K in keyof T]: T[K] | undefined;
};

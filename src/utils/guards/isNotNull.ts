export const isNotNull = <T>(x: T): x is NonNullable<T> => x !== null && x !== undefined;

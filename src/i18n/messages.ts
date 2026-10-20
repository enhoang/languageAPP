/** Same shape as the Vietnamese dictionary, every leaf a string. Missing keys fail type-checking. */
export type Messages<T> = { [K in keyof T]: T[K] extends string ? string : Messages<T[K]> };

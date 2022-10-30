export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export type JoinObjectsIntersection<T> = T extends Record<string, unknown> ? { [K in keyof T]: T[K] } : never;

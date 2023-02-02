export type DeepNonNullable<T> = {
  [K in keyof T]: NonNullable<T[K]>
}

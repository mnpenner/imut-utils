// https://github.com/microsoft/TypeScript/issues/37663
export type Resolvable<TValue = unknown, TArgs extends ReadonlyArray<unknown> = []> = TValue | ((...args: TArgs) => TValue)

export type Resolved<T> = T extends Fn ? ReturnType<T> : T

export function resolveValue<TValue, TArgs extends ReadonlyArray<any>>(val: Resolvable<TValue, TArgs>, ...args: TArgs): TValue {
    return typeof val === 'function' ? (val as AnyFn)(...args) : val
}

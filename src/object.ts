import {Resolvable, resolveValue} from './resolvable'
import type {nil} from './types'

/**
 * Merge one or more objects into a target object, similar to
 * [`Object.assign`]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign}, but each value can be a function that takes the previous value for that key and returns a new one.
 *
 * The target object *should* be the full object (with all keys defined), and the objects to be merged may be partial.
 * If the target and objects to be merged do not sum up to the full object then the return type will be invalid.
 */
export function fpShallowMerge<T>(...objects: Array<{
    [K in keyof T]?: Resolvable<T[K], [T[K], K]>;
}>): (obj: T) => T & {} {
    return (obj: T) => {
        objects = objects.filter(o => o != null)
        if(!objects.length) {
            return obj
        }
        const ret = Object.assign(Object.create(null), obj)
        for(const o of objects) {
            for(const k of Object.keys(o!) as (keyof T)[]) {
                ret[k] = resolveValue(o![k], ret[k], k)
            }
        }
        return ret
    }
}

/**
 * Exactly the same as {@link fpShallowMerge} but the types are relaxed to accept `undefined` and `null`. You may want
 * to use this version when the target object is potentially undefined but you know that the to-be merged objects will
 * result in a full object. This version is harder for TypeScript to infer the proper type, so you may need to
 * explicitly pass `<T>`.
 */
export const fpRelaxedMerge: {
    <T>(...objects: Array<{
        [K in keyof T]?: Resolvable<T[K], [T[K], K]>;
    } | nil>): (obj: T | nil) => T & {}
} = fpShallowMerge as any


import type {Nil} from './types'
import {binarySearch} from './extra'

/**
 * Appends elements onto the end of the array.
 */
export function arrayPush<T>(array: T[]|Nil, ...values: T[]): T[] {
    return [...array??[], ...values]
}

export function fpArrayPush<T>(...values: T[]) {
    return (a: T[]|Nil) => arrayPush(a, ...values)
}

/**
 * Insert one or more elements into an array at the given position.
 */
export function arrayInsert<T>(array: T[]|Nil, index:number, ...values: T[]): T[] {
    const copy = array ? [...array] : []
    copy.splice(index,0,...values)
    return copy
}
export function fpArrayInsert<T>(index:number, ...values: T[]) {
    return (a: T[]|Nil) => arrayInsert(a, index, ...values)
}

/**
 * Insert numbers into a sorted array, using binary search to find their position.
 *
 * @param array Array of numbers. Must be sorted in ascending order.
 * @param values Values to insert. These needn't be sorted; each one will be searched for individually.
 */
export function arrayInsertSorted(array: number[]|Nil, ...values: number[]): number[] {
    const copy = array ? [...array] : []
    for(const v of values) {
        const index = binarySearch(copy,v)
        copy.splice(index < 0 ? ~index : index,0,v)
    }
    return copy
}
export function fpArrayInsertSorted<T>(...values: number[]) {
    return (a: number[]|Nil) => arrayInsertSorted(a, ...values)
}


/**
 * Prepends elements onto the end of the array.
 */
export function arrayUnshift<T>(array: T[]|Nil, ...values: T[]): T[] {
    return [...values, ...array??[]]
}

export function fpArrayUnshift<T>(...values: T[]) {
    return (a: T[]|Nil) => arrayUnshift(a, ...values)
}

/**
 * Deletes elements from an array by index.
 */
export function arrayDeleteIndex<T>(array: T[]|Nil, ...indices: number[]): T[] {
    if(!array?.length) return []
    indices.sort((a, b) => b - a)
    const ret = [...array]
    for(const i of indices) {
        ret.splice(i, 1)
    }
    return ret
}

export function fpArrayDeleteIndex<T>(...indices: number[]) {
    return (a: T[]|Nil) => arrayDeleteIndex(a, ...indices)
}

function fpLooseEq<T>(value: any) {
    return (other: any) => other == value
}

function fpStrictEq<T>(value: any) {
    return (other: any) => Object.is(value, other)
}

/**
 * Deletes up to one element from an array, searching by value.
 */
export function arrayDeleteOneValue<T>(array: T[]|Nil, value: T, strict: boolean): T[] {
    if(!array?.length) return []
    const idx = array.findIndex((strict ? fpStrictEq : fpLooseEq)(value))
    return idx < 0 ? array : arrayDeleteIndex(array, idx)
}

export function fpArrayDeleteOneValue<T>(value: T, strict: boolean) {
    return (a: T[]|Nil) => arrayDeleteOneValue(a, value, strict)
}

/**
 * Filters the array to elements that pass the predicate.
 */
export function arraySelect<T>(array: T[]|Nil, predicate: (v: T, i: number) => boolean): T[] {
    if(!array?.length) return []
    return array.filter((v, i) => predicate(v, i))
}

export function fpArraySelect<T>(predicate: (v: T, i: number) => boolean) {
    return (a: T[]|Nil) => arraySelect(a, predicate)
}

/**
 * Removes elements that do *not* pass the predicate.
 */
export function arrayReject<T>(array: T[]|Nil, predicate: (v: T, i: number) => boolean): T[] {
    if(!array?.length) return []
    return array.filter((v, i) => !predicate(v, i))
}

export function fpArrayReject<T>(predicate: (v: T, i: number) => boolean) {
    return (a: T[]) => arrayReject(a, predicate)
}

export function arraySort<T>(array: T[]|Nil, compareFn: (a: T, b: T) => number) {
    if(!array?.length) return []
    return [...array].sort(compareFn)
}

export function arraySortNumbers(array: number[]|Nil, ascending=true) {
    if(!array?.length) return []
    return arraySort(array, ascending ? (a, b) => a - b : (a, b) => b - a)
}

interface CollatorOptions extends Intl.CollatorOptions {
    /**
     * A string with a BCP 47 language tag, or an array of such strings.
     */
    locales?: string | string[]
    /**
     * Sort in ascending order (alphabetically, A->Z).
     */
    ascending?: boolean
}

export function arraySortStrings(array: string[]|Nil, options: CollatorOptions = {
    sensitivity: 'base',
    numeric: true,
    usage: 'sort',
    ascending: true,
}) {
    if(!array?.length) return []
    const {locales, ascending, ...opts} = options
    const collator = new Intl.Collator(locales, opts)
    const compare = ascending ? collator.compare : (a:string,b:string) => -collator.compare(a,b)
    return arraySort(array, compare)
}


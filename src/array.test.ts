import {
    fpArrayDeleteIndex,
    fpArraySelect,
    fpArrayPush,
    fpArrayReject,
    fpArrayDeleteOneValue,
    fpArrayUnshift, arraySortNumbersAsc, arraySortNumbersDesc, arraySortStringsAsc
} from './array'


test(fpArrayPush.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = fpArrayPush(1,5,3)(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([3,1,2,7,4,6,5,1,5,3])
})

test(fpArrayUnshift.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = fpArrayUnshift(1,5,3)(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([1,5,3,3,1,2,7,4,6,5])
})



test(fpArrayDeleteIndex.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = fpArrayDeleteIndex(1,5,3)(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([3,2,4,5])
})

test(fpArraySelect.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = fpArraySelect<number>((v, i) => v > 5 || i === 0)(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([3,7,6])
})


test(fpArrayReject.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = fpArrayReject<number>((v, i) => v > 5 || i === 0)(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([1,2,4,5])
})


describe(fpArrayDeleteOneValue.name, () => {
    it('deletes one value', () => {
        const arr = [1,9,2,9,3]
        const out = fpArrayDeleteOneValue<number>(9,false)(arr)
        expect(arr).toStrictEqual([1,9,2,9,3])
        expect(out).toStrictEqual([1,2,9,3])
    })
    it('performs loose comparison', () => {
        const arr = [1,'2',2,'3']
        const out = fpArrayDeleteOneValue<string|number>(2,false)(arr)
        expect(arr).toStrictEqual([1,'2',2,'3'])
        expect(out).toStrictEqual([1,2,'3'])
    })
    it('performs strict comparison', () => {
        const arr = [1,'2',2,'3']
        const out = fpArrayDeleteOneValue<string|number>(2,true)(arr)
        expect(arr).toStrictEqual([1,'2',2,'3'])
        expect(out).toStrictEqual([1,'2','3'])
    })
    it('no match', () => {
        const arr = [1,9,2,9,3]
        const out = fpArrayDeleteOneValue<number>(10,false)(arr)
        expect(arr).toStrictEqual([1,9,2,9,3])
        expect(out).toBe(arr)
    })
})


test(arraySortNumbersAsc.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = arraySortNumbersAsc(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([1,2,3,4,5,6,7])
})

test(arraySortNumbersDesc.name, () => {
    const arr = [3,1,2,7,4,6,5]
    const out = arraySortNumbersDesc(arr)
    expect(arr).toStrictEqual([3,1,2,7,4,6,5])
    expect(out).toStrictEqual([7,6,5,4,3,2,1])
})

test(arraySortStringsAsc.name, () => {
    const arr = ['alpha','charlie','beta']
    const out = arraySortStringsAsc(arr)
    expect(arr).toStrictEqual(['alpha','charlie','beta'])
    expect(out).toStrictEqual(['alpha','beta','charlie'])
})

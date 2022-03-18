export class ArrayExtended {
    static getRandomArray = (array) =>
        array
            .map((a) => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map((a) => a[1])

    static reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
    }

    static getArrayNumberComplexity = (arr) => {
        let validity = 0
        for (let i = 0; i < arr.length; i++) {
            if (((arr[i] - 1) !== i)) {
                validity++
            }
        }
        return validity
    }

    static arrayEquals = (a, b) =>
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
}

/* This began as a TypeScript port of LevenshteinDistance.java
 * from the org.apache.commons.text.similarity package.
 */
export function levenshtein(a: string, b: string): number {
    if (a == b) return 0

    if (a.length > b.length) {
        const t = a
        a = b
        b = t
    }

    let asize = a.length
    let bsize = b.length

    while (asize > 0 && a.charCodeAt(asize - 1) == b.charCodeAt(bsize - 1)) {
        --asize
        --bsize
    }

    let start = 0

    while (start < asize && a.charCodeAt(start) == b.charCodeAt(start))
        ++start

    asize -= start
    bsize -= start

    if (asize == 0 || bsize < 3) return bsize

    let i: number // iterates through a
    let j: number // iterates through b

    let bj: number
    let cur: number | undefined
    let p: number
    let q: number

    const cache: number[] = Array(asize)
    const vec: number[] = Array(asize)

    for (i = 0; i < asize;) {
        cache[i] = a.charCodeAt(start + i)
        vec[i] = ++i
    }

    for (j = 0; j < bsize; ++j) {
        bj = b.charCodeAt(start + j)
        cur = j + 1
        p = j

        for (i = 0; i < asize; ++i) {
            q = cur
            cur = p
            p = vec[i]

            if (cache[i] != bj)
                cur = Math.min(cur, p, q) + 1

            vec[i] = cur
        }
    }

    return cur as number
}

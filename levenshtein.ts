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

    if (asize == 0 || bsize == 1) return bsize

    --start

    let i: number // iterates through a
    let j: number // iterates through b

    let bj: number
    let p: number
    let q: number

    const vec = new Array<number>(asize + 1)

    for (i = 0; i <= asize; ++i)
        vec[i] = i

    for (j = 1; j <= bsize; ++j) {
        bj = b.charCodeAt(start + j)
        p = vec[0]
        vec[0] = j

        for (i = 1; i <= asize; ++i) {
            q = p + (a.charCodeAt(start + i) == bj ? 0 : 1)
            p = vec[i]
            vec[i] = Math.min(vec[i - 1] + 1, vec[i] + 1, q)
        }
    }

    return vec[asize]
}

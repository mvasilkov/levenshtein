import test from 'ava'
import unicodePassgen from 'unicode-passgen'
import referenceImplementation from 'fast-levenshtein'
import { levenshtein } from '../levenshtein'

test('Compute the Levenshtein distance', t => {
    t.is(levenshtein('', ''), 0)
    t.is(levenshtein('a', ''), 1)
    t.is(levenshtein('', 'a'), 1)
    t.is(levenshtein('a', 'a'), 0)
    t.is(levenshtein('A', 'a'), 1)

    t.is(levenshtein('aa', 'ab'), 1)
    t.is(levenshtein('ab', 'bb'), 1)
    t.is(levenshtein('aa', 'aü'), 1)
    t.is(levenshtein('aaaa', 'aAａb'), 3)

    t.is(levenshtein('cat', 'cow'), 2)
    t.is(levenshtein('sitting', 'kitten'), 3)
    t.is(levenshtein('example', 'samples'), 3)
    t.is(levenshtein('привет', 'превет'), 1)
    t.is(levenshtein('因為我是中國人所以我會說中文', '因為我是英國人所以我會說英文'), 2)
})

test('Compatible with fast-levenshtein', t => {
    for (let n = 0; n < 1024; ++n) {
        const size = Math.floor(Math.random() * 256)
        const a = unicodePassgen.generate(size)
        const b = unicodePassgen.generate(size)
        t.is(levenshtein(a, b), referenceImplementation.get(a, b))
    }
})

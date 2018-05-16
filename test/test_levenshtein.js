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

test('Compatible with fast-levenshtein [ASCII]', t => {
    const ASCII = {
        include: [{
            chars: [[0, 0x7F]],
        }],
    }
    runCompatCheck(t, 1, 9, ASCII)
    runCompatCheck(t, 9, 99, ASCII)
    runCompatCheck(t, 199, 999, ASCII)
})

test('Compatible with fast-levenshtein [BMP]', t => {
    runCompatCheck(t, 1, 9)
    runCompatCheck(t, 9, 99)
    runCompatCheck(t, 199, 999)
})

function runCompatCheck(t, low, high, options) {
    for (let n = 0; n < 256; ++n) {
        const len = Math.floor(Math.random() * (high - low) + low)
        const a = unicodePassgen.generate(len, options)
        const b = unicodePassgen.generate(len, options)
        t.is(levenshtein(a, b), referenceImplementation.get(a, b))
    }
}

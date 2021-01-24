import { concatClassName } from '..'

test('no argument', () => expect(concatClassName()).toBe(''))

test('one null argument', () => expect(concatClassName(null)).toBe(''))

test('one string argument', () => expect(concatClassName('foo')).toBe('foo'))

test('one object argument', () =>
  expect(concatClassName({})).toBe({}.toString()))

test('two arguments', () =>
  expect(concatClassName('foo ', ' bar ')).toBe('foo bar'))

test('multiple arguments', () =>
  expect(concatClassName('', '', 'foo', undefined, 'bar ', null, ' biz')).toBe(
    'foo bar biz'
  ))

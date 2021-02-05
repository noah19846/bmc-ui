import { concatClassName, concatTwoClassName } from '../src/utils'

test('no argument', () => expect(concatTwoClassName()).toBe(''))

test('one null argument', () => expect(concatTwoClassName(null)).toBe(''))

test('one string argument', () => expect(concatTwoClassName('foo')).toBe('foo'))

test('one object argument', () =>
  expect(concatTwoClassName({})).toBe({}.toString()))

test('two arguments', () =>
  expect(concatTwoClassName('foo ', ' bar ')).toBe('foo bar'))

test('multiple arguments', () =>
  expect(concatClassName('', '', 'foo', undefined, 'bar ', null, ' biz')).toBe(
    'foo bar biz'
  ))

function isVoid(value) {
  return value === undefined || value === null
}

export function concatTwoClassName(s1, s2) {
  s1 = (isVoid(s1) ? '' : s1.toString()).trim()
  s2 = (isVoid(s2) ? '' : s2.toString()).trim()

  if (!s1) {
    return s2
  }

  if (!s2) {
    return s1
  }

  return `${s1} ${s2}`
}

export function concatClassName(...args) {
  if (args.length < 3) {
    return concatTwoClassName(args[0], args[1])
  }

  let result = concatTwoClassName(args[0], args[1])

  for (let i = 2; i < args.length; i++) {
    result = concatTwoClassName(result, args[i])
  }

  return result
}

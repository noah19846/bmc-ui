export function concatClassName(...args) {
  if (args.length < 2) {
    return (args[0] || '').toString().trim()
  }

  if (args.length === 2) {
    const c1 = (args[0] || '').toString().trim()
    const c2 = (args[1] || '').toString().trim()

    if (!c1) {
      return c2
    }

    if (!c2) {
      return ''
    }

    return `${c1} ${c2}`
  }

  return concatClassName(args[0], concatClassName(...args.slice(1)))
}

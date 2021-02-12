export function isVoid(value) {
  return value === undefined || value === null
}

export function isEmpty(value) {
  return isVoid(value) || value === ''
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

export function emitEvent(ctx, eventName, event) {
  const handlers = ctx.listeners[eventName]

  if (Array.isArray(handlers)) {
    handlers.forEach((f) => f(event))
  } else {
    handlers(event)
  }
}

export function createComponent(name) {
  return function (sfc) {
    sfc.name = name
    sfc.install = (Vue) => {
      Vue.component(name, sfc)
    }

    return sfc
  }
}

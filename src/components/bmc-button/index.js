import './style.css'

function concatClassName(c1 = '', c2 = '') {
  c1 = c1.trim()
  c2 = c2.trim()

  if (!c1) {
    return c2
  }

  if (!c2) {
    return c1
  }

  return `${c1} ${c2}`
}

export default {
  functional: true,

  name: 'BmcButton',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    }
  },

  render(h, ctx) {
    return h(
      'button',
      {
        attrs: {
          disabled: ctx.props.disabled,
          class: 'bmc-button'
        },

        class: concatClassName(
          'bmc-button',
          ctx.props.block ? 'bmc-button__block' : ''
        ),

        on: {
          click(e) {
            if (!ctx.props.disabled) {
              const listeners = ctx.listeners
              const handlers = listeners.click

              if (Array.isArray(handlers)) {
                handlers.forEach((f) => f(e))
              } else {
                handlers(e)
              }
            }
          }
        }
      },
      ctx.children
    )
  }
}

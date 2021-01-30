import { concatClassName } from '../../utils'

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
    },

    plain: {
      type: Boolean,
      default: false
    },

    type: {
      type: String,
      default: 'default'
    }
  },

  render(h, ctx) {
    const getClassName = (props) => {
      return concatClassName(
        'bmc-button',
        props.block ? 'bmc-button__block' : '',
        props.disabled ? 'bmc-button__disabled' : '',
        props.plain ? 'bmc-button__plain' : '',
        props.type ? `bmc-button__${props.type}` : 'bmc-button__default'
      )
    }

    return h(
      'button',
      {
        attrs: {
          disabled: ctx.props.disabled
        },

        class: getClassName(ctx.props),

        on: {
          click(e) {
            if (!ctx.props.disabled) {
              const listeners = ctx.listeners
              const handlers = listeners.click

              if (handlers) {
                if (Array.isArray(handlers)) {
                  handlers.forEach((f) => f(e))
                } else {
                  handlers(e)
                }
              }
            }
          }
        }
      },
      ctx.children
    )
  }
}

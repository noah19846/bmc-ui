import './style.less'
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

    buttonType: {
      type: String,
      default: 'primary'
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
          ctx.props.block ? 'bmc-button__block' : '',
          ctx.props.disabled ? 'bmc-button__disabled' : '',
          ctx.props.buttonType ? `bmc-button__${ctx.props.buttonType}` : ''
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

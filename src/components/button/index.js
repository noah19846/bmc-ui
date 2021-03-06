import { concatClassName, emitEvent, createComponent } from '../../utils'

export default createComponent('BmcButton')({
  functional: true,

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

    const getEvents = ({ props, listeners }) => {
      const { disabled } = props
      let on = {}

      if (!disabled && listeners['click']) {
        on['click'] = function (event) {
          emitEvent(ctx, 'click', event)
        }
      }

      // 解决 ios :active 无效
      on['touchstart'] = function (event) {
        if (listeners['touchstart']) {
          emitEvent(ctx, 'touchstart', event)
        }
      }

      return on
    }

    return h(
      'button',
      {
        attrs: {
          disabled: ctx.props.disabled
        },
        class: getClassName(ctx.props),
        on: getEvents(ctx)
      },
      ctx.children
    )
  }
})

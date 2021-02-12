import { concatClassName, createComponent, isEmpty } from '../../utils'
import BmcButton from '../button'

export default createComponent('BmcDialog')({
  functional: true,

  props: {
    show: {
      type: Boolean,
      default: false
    },

    title: {
      type: String,
      default: ''
    },

    content: {
      type: String,
      default: ''
    },

    confirmButtonShow: {
      type: Boolean,
      default: true
    },

    cancelButtonShow: {
      type: Boolean,
      default: false
    },

    confirmButtonText: {
      type: String,
      default: '确认'
    },

    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },

  render(h, ctx) {
    const getClassName = () => {
      return concatClassName('bmc-dialog')
    }

    const getTitle = ({ props }) =>
      isEmpty(props.title)
        ? null
        : h(
            'div',
            {
              class: 'bmc-dialog_title'
            },
            props.title
          )

    const getContent = ({ props }) =>
      h(
        'div',
        {
          class: 'bmc-dialog_content'
        },
        props.content
      )

    const getButton = ({ props }) => {
      const { cancelButtonShow, confirmButtonShow } = props

      if (cancelButtonShow && confirmButtonShow) {
        return h(
          'div',
          {
            class: 'bmc-dialog_button-wrapper'
          },
          [
            h(
              BmcButton,
              {
                props: {
                  plain: true,
                  type: 'primary'
                }
              },
              props.cancelButtonText
            ),
            h(
              BmcButton,
              {
                props: {
                  type: 'primary'
                }
              },
              props.confirmButtonText
            )
          ]
        )
      }

      if (cancelButtonShow) {
        return h(
          'div',
          {
            class: 'bmc-dialog_button-wrapper'
          },
          [
            h(
              BmcButton,
              {
                props: {
                  plain: true,
                  type: 'primary'
                }
              },
              props.cancelButtonText
            )
          ]
        )
      }

      if (confirmButtonShow) {
        return h(
          'div',
          {
            class: 'bmc-dialog_button-wrapper'
          },
          [
            h(
              BmcButton,
              {
                props: {
                  type: 'primary'
                }
              },
              props.confirmButtonText
            )
          ]
        )
      }

      return null
    }

    return ctx.props.show
      ? h(
          'div',
          {
            class: getClassName(ctx.props)
          },
          [getTitle(ctx), getContent(ctx), getButton(ctx)]
        )
      : null
  }
})

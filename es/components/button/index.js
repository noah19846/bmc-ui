import { concatClassName, emitEvent, createComponent } from '../../utils';
export default createComponent('BmcButton')({
  functional: true,
  props: {
    disabled: {
      type: Boolean,
      "default": false
    },
    block: {
      type: Boolean,
      "default": false
    },
    plain: {
      type: Boolean,
      "default": false
    },
    type: {
      type: String,
      "default": 'default'
    }
  },
  render: function render(h, ctx) {
    var getClassName = function getClassName(props) {
      return concatClassName('bmc-button', props.block ? 'bmc-button__block' : '', props.disabled ? 'bmc-button__disabled' : '', props.plain ? 'bmc-button__plain' : '', props.type ? "bmc-button__".concat(props.type) : 'bmc-button__default');
    };

    var getEvents = function getEvents(_ref) {
      var props = _ref.props,
          listeners = _ref.listeners;
      var disabled = props.disabled;
      var on = {};

      if (!disabled && listeners['click']) {
        on['click'] = function (event) {
          emitEvent(ctx, 'click', event);
        };
      } // 解决 ios :active 无效


      on['touchstart'] = function (event) {
        if (listeners['touchstart']) {
          emitEvent(ctx, 'touchstart', event);
        }
      };

      return on;
    };

    return h('button', {
      attrs: {
        disabled: ctx.props.disabled
      },
      "class": getClassName(ctx.props),
      on: getEvents(ctx)
    }, ctx.children);
  }
});
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../../utils");

var _default = (0, _utils.createComponent)('BmcButton')({
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
      return (0, _utils.concatClassName)('bmc-button', props.block ? 'bmc-button__block' : '', props.disabled ? 'bmc-button__disabled' : '', props.plain ? 'bmc-button__plain' : '', props.type ? "bmc-button__".concat(props.type) : 'bmc-button__default');
    };

    var getEvents = function getEvents(_ref) {
      var props = _ref.props,
          listeners = _ref.listeners;
      var disabled = props.disabled;
      var on = {};

      if (!disabled && listeners['click']) {
        on['click'] = function (event) {
          (0, _utils.emitEvent)(ctx, 'click', event);
        };
      } // 解决 ios :active 无效


      on['touchstart'] = function (event) {
        if (listeners['touchstart']) {
          (0, _utils.emitEvent)(ctx, 'touchstart', event);
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

exports["default"] = _default;
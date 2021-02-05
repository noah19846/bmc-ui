"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _button["default"];
  }
});
exports["default"] = void 0;

var _button = _interopRequireDefault(require("./components/button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bmc = {
  install: function install(Vue) {
    Vue.use(_button["default"]);
  }
};
var _default = bmc;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatTwoClassName = concatTwoClassName;
exports.concatClassName = concatClassName;
exports.emitEvent = emitEvent;
exports.createComponent = createComponent;

function isVoid(value) {
  return value === undefined || value === null;
}

function concatTwoClassName(s1, s2) {
  s1 = (isVoid(s1) ? '' : s1.toString()).trim();
  s2 = (isVoid(s2) ? '' : s2.toString()).trim();

  if (!s1) {
    return s2;
  }

  if (!s2) {
    return s1;
  }

  return "".concat(s1, " ").concat(s2);
}

function concatClassName() {
  if (arguments.length < 3) {
    return concatTwoClassName(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);
  }

  var result = concatTwoClassName(arguments.length <= 0 ? undefined : arguments[0], arguments.length <= 1 ? undefined : arguments[1]);

  for (var i = 2; i < arguments.length; i++) {
    result = concatTwoClassName(result, i < 0 || arguments.length <= i ? undefined : arguments[i]);
  }

  return result;
}

function emitEvent(ctx, eventName, event) {
  var handlers = ctx.listeners[eventName];

  if (Array.isArray(handlers)) {
    handlers.forEach(function (f) {
      return f(event);
    });
  } else {
    handlers(event);
  }
}

function createComponent(name) {
  return function (sfc) {
    sfc.name = name;

    sfc.install = function (Vue) {
      Vue.component(name, sfc);
    };

    return sfc;
  };
}
'use strict';

var defer = function (fn) {
  return function (/* args... */) {
    var args = arguments;

    setTimeout(function () {
      fn.apply(null, args);
    }, 0);
  };
};

module.exports = defer;

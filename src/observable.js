'use strict';

var defer = require('./helpers/defer');

var subscribe = function (listeners, event, listener) {
  if (typeof listeners[event] === 'undefined') { listeners[event] = []; }
  listeners[event].push(listener);
};

var publish = defer(function (listeners, event, msg) {
  if (Array.isArray(listeners[event])) {
    listeners[event].forEach(defer(function (listener) {
      listener(msg);
    }));
  }
});

var observable = function (generator) {
  var listeners = {};
  generator(publish.bind(null, listeners));
  return subscribe.bind(null, listeners);
};

module.exports = observable;

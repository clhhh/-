var observeEvent = (function () {
  var global = this,
    ObserveEvent,
    _default = "default";

  ObserveEvent = function () {
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      nameSpace = {},
      _create,
      find,
      each = function (array, fn) {
        var ret;
        for (var i = 0; i < array.length; i++) {
          var n = array[i];
          ret = fn.call(n, i, n);
        }
        return ret;
      };

    _listen = function (key, fn, cache) {
      if (!cache[key]) {
        cache[key] = [];
      }
      cache[key].push(fn);
    };
  };
})();

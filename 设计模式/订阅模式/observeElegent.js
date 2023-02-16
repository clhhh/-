// 这段代码定义了一个观察者模式的实现，其中 ObserveEvent 是一个立即执行函数，返回一个对象，该对象包括了四个方法，分别是 create、one、remove 和 listen，以及一个内部变量 _default，代表默认的命名空间。观察者模式中的对象分为两种，一种是观察者，一种是被观察者，观察者会订阅被观察者的变化，而被观察者会在变化发生时通知所有的观察者。

// create 方法用来创建命名空间，如果没有指定命名空间，则使用默认的命名空间 _default。它返回一个对象，该对象包括了 listen、one、remove 和 _trigger 四个方法。

// listen 方法用来订阅一个事件，即向一个事件的订阅者列表中添加一个订阅者，每个订阅者都有一个唯一的 key，当事件发生时，可以根据 key 查找到对应的订阅者列表。

// one 方法与 listen 方法类似，但它只执行一次，即订阅者只能接收到一次事件通知，然后就会被移除。

// remove 方法用来移除一个事件的订阅者，如果没有指定具体的订阅者，则移除所有的订阅者。

// _trigger 方法用来触发一个事件，即通知所有订阅该事件的订阅者。

// observeEvent 是一个立即执行函数，返回的是 ObserveEvent 对象，也就是观察者模式的实现。使用 observeEvent.create 方法可以创建一个命名空间，然后使用 listen、one、remove 和 trigger 方法可以操作该命名空间中的事件。
// var Event = (function () {
//   var global = this,
//     Event,
//     _default = "default";

//   Event = (function () {
//     var _listen,
//       _trigger,
//       _remove,
//       _slice = Array.prototype.slice,
//       _shift = Array.prototype.shift,
//       _unshift = Array.prototype.unshift,
//       namespaceCache = {},
//       _create,
//       find,
//       each = function (ary, fn) {
//         var ret;
//         //有问题
//         for (var i = 0; i < ary.length; i++) {
//           var n = ary[i];
//           ret = fn.call(n, i, n);
//         }
//         return ret;
//       };

//     _listen = function (key, fn, cache) {
//       if (!cache[key]) {
//         cache[key] = [];
//       }
//       cache[key].push(fn);
//     };
//     _remove = function (key, cache, fn) {
//       if (cache[key]) {
//         if (fn) {
//           for (let i = cache[key].length; i >= 0; i--) {
//             if (cache[key][i] === fn) {
//               cache[key].splice(i, 1);
//             }
//           }
//         } else {
//           cache[key] = [];
//         }
//       }
//     };
//     _trigger = function () {
//       var cache = _shift.call(arguments),
//         key = _shift.call(arguments),
//         args = arguments,
//         _self = this,
//         ret,
//         stack = cache[key];
//       if (!stack || !stack.length) {
//         return;
//       }
//       return each(stack, function () {
//         return this.apply(_self, args);
//       });
//     };
//     _create = function (namespace) {
//       var namespace = namespace || _default;
//       var cache = {},
//         offlineStack = [],
//         ret = {
//           listen: function (key, fn, last) {
//             _listen(key, fn, cache);
//             if (offlineStack === null) {
//               return;
//             }
//             if ((last = "last")) {
//               //不一样
//               offlineStack.length && offlineStack.pop();
//             } else {
//               each(offlineStack, function () {
//                 this();
//               });
//             }
//             offlineStack = null;
//           },
//           one: function (key, fn, last) {
//             _remove(key, cache, fn);
//             this.listen(key, fn, last);
//           },
//           remove: function (key, fn) {
//             _remove(key, cache, fn);
//           },

//           trigger: function () {
//             var fn,
//               args,
//               _self = this;
//             _unshift.call(arguments, cache);
//             args = arguments;
//             fn = function () {
//               return _trigger.apply(_self, args);
//             };
//             if (offlineStack) {
//               return offlineStack.push(fn);
//             }
//             return fn();
//           },
//         };
//       return namespace
//         ? namespaceCache[namespace]
//           ? namespaceCache[namespace]
//           : (namespaceCache[namespace] = ret)
//         : ret;
//     };
//     return {
//       create: _create,
//       one: function (key, fn, last) {
//         var event = this.create();
//         event.one(key, fn, last);
//       },
//       remove: function (key, fn) {
//         var event = this.create();
//         event.remove(key, fn);
//       },
//       listen: function (key, fn, last) {
//         var event = this.create();
//         event.listen(key, fn, last);
//       },
//       trigger: function () {
//         var event = this.create();
//         event.trigger.apply(this, arguments);
//       },
//     };
//   })();

//   return Event;
// })();

// 创建一个命名空间
var Event = (function () {
  var global = this,
    Event,
    _default = "default";
  Event = (function () {
    var _listen,
      _trigger,
      _remove,
      _slice = Array.prototype.slice,
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {},
      _create,
      find,
      each = function (ary, fn) {
        var ret;
        for (var i = 0, l = ary.length; i < l; i++) {
          var n = ary[i];
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
    _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          for (var i = cache[key].length; i >= 0; i--) {
            if (cache[key] === fn) {
              cache[key].splice(i, 1);
            }
          }
        } else {
          cache[key] = [];
        }
      }
    };
    _trigger = function () {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        ret,
        stack = cache[key];
      if (!stack || !stack.length) {
        return;
      }
      return each(stack, function () {
        return this.apply(_self, args);
      });
    };
    _create = function (namespace) {
      var namespace = namespace || _default;
      var cache = {},
        offlineStack = [], // 离线事件
        ret = {
          listen: function (key, fn, last) {
            _listen(key, fn, cache);
            if (offlineStack === null) {
              return;
            }
            if (last === "last") {
            } else {
              each(offlineStack, function () {
                this();
              });
            }
            offlineStack = null;
          },
          one: function (key, fn, last) {
            _remove(key, cache);
            this.listen(key, fn, last);
          },
          remove: function (key, fn) {
            _remove(key, cache, fn);
          },
          trigger: function () {
            var fn,
              args,
              _self = this;
            _unshift.call(arguments, cache);
            args = arguments;
            fn = function () {
              return _trigger.apply(_self, args);
            };
            if (offlineStack) {
              return offlineStack.push(fn);
            }
            return fn();
          },
        };
      return namespace
        ? namespaceCache[namespace]
          ? namespaceCache[namespace]
          : (namespaceCache[namespace] = ret)
        : ret;
    };
    return {
      create: _create,
      one: function (key, fn, last) {
        var event = this.create();
        event.one(key, fn, last);
      },
      remove: function (key, fn) {
        var event = this.create();
        event.remove(key, fn);
      },
      listen: function (key, fn, last) {
        var event = this.create();
        event.listen(key, fn, last);
      },
      trigger: function () {
        var event = this.create();
        event.trigger.apply(this, arguments);
      },
    };
  })();
  return Event;
})();

var eventSpace = Event.create("testEvent");
// 触发事件
eventSpace.trigger("click", { message: "event triggered" });
// 监听事件
eventSpace.listen("click", function (e) {
  console.log("click event fired", e);
});

Event.trigger("click", 1);
Event.listen("click", function (a) {
  console.log(a);
});
Event.create("testEvent2").trigger("click", " testEvent2click");
Event.create("testEvent2").listen("click", function (e) {
  console.log("click testEvent2 ", e);
});

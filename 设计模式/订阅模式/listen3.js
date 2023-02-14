var eventForListen = {
  count: 0,
  clientList: {},
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function () {
    let key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    this.count++;
    console.warn("this.count", this.count, "fns", fns);
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; (fn = fns[i++]); ) {
      //这里就执行了吗
      fn.apply(this, arguments);
    }
  },
  remove: function (key, fn) {
    var fns = this.clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (let i = fns.length - 1; i >= 0; i--) {
        var _fn = fns[i];
        if (_fn === fn) {
          console.log("fn", fn, "_fn", _fn);
          fns.splice(i, 1);
        }
      }
    }
  },
};
var installEvent = function (obj) {
  for (var i in eventForListen) {
    obj[i] = eventForListen[i];
  }
};

var salesOffices = {};
installEvent(salesOffices);
salesOffices.listen(
  "meter88",
  (fn1 = function (price) {
    console.warn("小明订阅小房子price", price);
  })
);
salesOffices.listen(
  "meter88",
  (fn2 = function (price) {
    console.warn("小红订阅小房子price", price);
  })
);
salesOffices.listen("meter188", function (price) {
  console.warn("小红订阅大房子price", price);
});
salesOffices.remove("meter88", fn2);
salesOffices.trigger("meter88", 12000);
salesOffices.trigger("meter88", 32000);
salesOffices.trigger("meter188", 32000);

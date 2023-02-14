var salesOffices = {};
salesOffices.clientList = {};
salesOffices.listen = function (key, fn) {
  if (!this.clientList[key]) {
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);
};
salesOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments);
  //   var key2 = Array.prototype.shift.call(arguments);
  fns = this.clientList[key];
  if (!fns || fns.length === 0) {
    return false;
  }
  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments);
  }
};
salesOffices.listen("meter88", function (price, meter) {
  console.warn("price", price * 2);
});
console.log("salesOffices1", salesOffices);
salesOffices.listen("meter128", function (price, meter) {
  console.warn("price", price * 2);
});
console.log("salesOffices2", salesOffices);
salesOffices.trigger("meter88", 20000);
salesOffices.trigger("meter128", 30000);

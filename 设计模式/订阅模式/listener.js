var salesOffices = {};
salesOffices.clientList = [];
salesOffices.listen = function (fn) {
  this.clientList.push(fn);
};
salesOffices.trigger = function () {
  for (var i = 0, fn; (fn = this.clientList[i++]); ) {
    fn.apply(this, arguments);
    this.clientList.pop();
  }
};
salesOffices.listen(function (price, meter) {
  console.warn("price", price);
});
salesOffices.listen(function (price, meter) {
  console.warn("price", price);
});
salesOffices.trigger(20000, 80);
salesOffices.trigger(30000, 80);

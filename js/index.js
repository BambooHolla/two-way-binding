// index.js
function TwoWay(data,el,exp) {
    debugger
    var self = this;
    this.data = data;
    
    Object.keys(data).forEach(function(key) {
        self.proxyKeys(key);
    });
    
    observe(data);
    el.innerHTML = this.data[exp]; // 初始化值
    new Watcher(this,exp,function(value) {
        el.innerHTML = value;
    });
    return this;
}
TwoWay.prototype = {
    proxyKeys: function(key) {
        var self = this;
        Object.defineProperty(this,key,{
            enumerable: true,
            configurable: true,
            get: function proxyGetter() {
                return self.data[key];
            },
            set: function proxySetter(newValue) {
                self.data[key] = newValue
            }
        })
    }
}

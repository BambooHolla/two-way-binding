// watcher.js
function Watcher(vm,exp,cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.value = this.get();
}
Watcher.prototype = {
    updated: function() {
        this.run();
    },
    run: function() {
        var value = this.vm.data[this.exp];
        var oldValue = this.value;
        if(value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm,value,oldValue);
        }
    },
    get: function() {
        Dep.target = this; // 缓存自身
        var value = this.vm.data[this.exp]; // 强制执行监听器里get函数
        Dep.target = null; // 释放自己
        return value;
    }
}
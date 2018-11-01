// observer.js -> observer+dep
function Observe(data) {
    this.data = data;
    this.walk(data);
}
Observe.prototype = {
    walk: function(data) {
        var self = this;
        Object.keys(data).forEach(function(key) {
            self.defineReactive(data,key,data[key]);
        });
    },
    defineReactive: function(data,key,value) {
        var dep = new Dep();
        var childObj = observe(value);
        Object.defineProperty(data,key,{
            enumerable: true,
            configurabler: true,
            get: function() {
                if(Dep.target) {
                    dep.addSub(Dep.target);
                }
                return value;
            },
            set: function(newValue) {
                if(newValue === value) {
                    return ;
                }
                debugger
                value = newValue;
                dep.notify();
            } 
        })

    }
}
function observe(value) {
    if(!value || typeof value !== "object") {
        return ;
    }

    return new Observe(value);
}
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub) {
        this.subs.push(sub);
    },
    notify: function() {
        this.subs.forEach(function(sub) {
            sub && sub.updated();
        })
    }
}
Dep.target = null;
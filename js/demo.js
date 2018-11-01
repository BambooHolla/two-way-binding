(function() {
    "use strict"
    function defineReactive(data,key,value) {
        observe(value);// 用于遍历子属性
        Object.defineProperty(data,key,{
            enumerable: true,
            configurable: true,
            get: function() {
                return value;
            },
            set: function(newValue) {
                value = newValue;
                console.log('属性' + key + '，现在值为：“' + newVal.toString() + '”');
            }
        })
    }
    function observe(data) {
        if(!data || typeof data !== "object") {
            return ;
        }
        Object.keys(data).forEach(function(key) {
            defineReactive(data,key,data[key]);
        });
    }

    var o = {
        item: {
            value: "123",
        },
        name: "aaa"
    }
})()
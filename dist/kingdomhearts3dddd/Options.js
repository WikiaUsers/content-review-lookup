(function(mw, $, config){
    if (config.load === false) return;
    var ChatOptions = {};
    ChatOptions.setStorage = function(key, value){
        key = 'ChatOptions-' + key;
        if (ChatOptions.isJSON(value)){
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    };
    ChatOptions.getStorage = function(key){
        key = 'ChatOptions-' + key;
        var value = localStorage.getItem(key);
        if (ChatOptions.isJSONString(value)){
            value = JSON.parse(value);
        }
        return value;
    };
    ChatOptions.isJSON = function(value){
        var res = null;
        try {
            JSON.stringify(value);
        } catch (e){
            res = false;
        }
        return res !== false;
    };
    ChatOptions.isJSONString = function(value){
        var res = null;
        try {
            JSON.parse(value);
        } catch (e){
            res = false;
        }
        return res !== false;
    };
    ChatOptions.isEnabled = function(module){
        var moduleObj = ChatOptions.getStorage(module);
        if (typeof moduleObj.enabled === 'boolean'){
            return moduleObj.enabled;
        }
        return void module;
    };
    ChatOptions.setFallback = function(value, fallback){
        var type = ChatOptions.getType(value),
            result = ChatOptions.access(type, 'isType').then(function(cond){
                if (cond === true) return value;
                else return fallback;
            }, true);
        return result;
    };
    ChatOptions.access = function(value, property){
        var prop_val = ChatOptions[property];
        if (typeof prop_val === 'function'){
            var fns = {
                then: function(callback, _return){
                    if (_return === true){
                        return callback.apply(ChatOptions, [value]);
                    } else {
                        callback.apply(ChatOptions, [value]);
                    }
                }
            };
            if ((type = ChatOptions.getType(value)) === true){
                fns.done = function(callback, _return){
                    if (_return === true){
                        return callback.apply(ChatOptions, [value]);
                    } else {
                        callback.apply(ChatOptions, [value]);
                    }
                };
            } else {
                fns.fail = function(callback, _return){
                    if (_return === true){
                        return callback.apply(ChatOptions, ['Error']);
                    } else {
                        callback.apply(ChatOptions, ['Error']);
                    }
                };
            }
            return fns;
        }
    };
    ChatOptions.isType = function(value){
        var typePattern = /\[object ([^\s]+)\]/g,
            type = Object.prototype.toString.call(value),
            resType = type.replace(typePattern, '$1'),
            values = {
                'Array': function(val){
                    return val.length > 0;
                },
                'Number': function(val){
                    return val !== 0 && !isNaN(val);
                },
                'String': function(val){
                    return val !== '';
                },
                'Object': function(val){
                    for (var key in val){
                        return true;
                    }
                    return false;
                },
                'Undefined': function(){
                    return false;
                },
                'Null': function(){
                    return false;
                }
            };
        for (var k in values){
            if (k === resType){
                return values[k].apply(value);
            }
        }
        return null;
    };
    ChatOptions.objects = {
        appearance: {
            textColor: ChatOptions.getStorage('textColor'),
            fontFace: ChatOptions.getStorage('fontFace'),
            background: ChatOptions.getStorage('background'),
            selfPostTextColor: ChatOptions.getStorage('selfPostTextColor'),
            selfPostBackground: ChatOptions.getStorage('selfPostBackground'),
            mePost: ChatOptions.getStorage('mePost'),
            inlineAlert: ChatOptions.getStorage('inlineAlert')
        }
    };
}(this.mediaWiki, this.jQuery, this.ChatOptions = this.ChatOptions || {}));
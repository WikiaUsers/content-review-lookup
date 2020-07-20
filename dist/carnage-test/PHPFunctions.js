(function(window){
    var phpfn = {}, _obj = {}, _arr = [], has = function(obj, prop){
        return _obj.hasOwnProperty.call(obj, prop);
    }, slice = function(){
        var arr = arguments[0], args = [].slice.call(arguments, 1);
        return _arr.slice.apply(arr, args);
    }, _toString = function(obj){
        return _obj.toString.call(obj);        
    }, getType = function(obj){
        var pattern = /\[object (.*)\]/g;
        return _toString(obj).replace(pattern, '$1').toLowerCase();
    }, phpparser = [{
        pattern: /\$\{(\d+)\}/g,
        handler: function(string, array, length, i){
            var index = parseInt(i, 10);
            if (index >= length) index = length - 1;
            return string.replace(this.pattern, array[index]);
        }
    }], phppreg = /\\/g;
    phpfn.isset = function(value){
        return !(
            getType(value) === 'undefined' ||
            getType(value) === 'null' ||
            (
                ['array', 'object', 'number', 'boolean']
                    .indexOf(getType(value)) > -1 &&
                !has(value, 'toString')
            )
        );
    };
    phpfn.unset = function(value){
        value = void 0;
    };
    phpfn.preg_replace = function(){
        var args = slice(arguments), pattern = args[0],
            replacement = args[1], string = args[2],
            limit = args[3] || -1, count = args[4];
        
    };
}(this === window ? this : window));
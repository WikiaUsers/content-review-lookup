(function($){
    function ArrayParser(){
        var args = [].slice.call(arguments),
            arg1 = args[0],
            array = (typeof arg1 === 'number' && args.length == 1) ? new Array(arg1) 
                : ((typeof arg1 === 'object' && Array.isArray(arg1)) ? arg1 : args);
        this.array = array;
        this.length = array.length;
        this.firstIndex = 0;
        this.lastIndex = this.length - 1;
    }
    
    ArrayParser.prototype.filter = function(callback, thisArg){
        thisArg = (typeof thisArg !== 'undefined') ? thisArg : this;
        this.array = this.array.filter(function(){
            var args = [].slice.call(arguments);
            return callback.apply(this, args);
        }, thisArg);
        return this;
    };
    
    ArrayParser.prototype.not = function(callback, thisArg){
        thisArg = (typeof thisArg !== 'undefined') ? thisArg : this;
        this.array = this.array.filter(function(){
            var args = [].slice.call(arguments);
            return !(callback.apply(this, args));
        }, thisArg);
        return this;
    };
    
    ArrayParser.prototype.map = function(callback){
        
    };
}(jQuery));
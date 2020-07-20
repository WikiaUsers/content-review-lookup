(function($){
    function ArrayMap(array){
        this.array = array;
        this.length = array.length;
        this.index = 0;
        this.lastIndex = array.length - 1;
        return this;
    }
    
    // toString function
    ArrayMap.prototype.toString = function(){
        return this.array.join(', ');
    };
    
    ['append', 'add', 'insert'].forEach(function(fn){
        ArrayMap.prototype[fn] = function(){
            var args = Array.prototype.slice.call(arguments), index = 0;
            while ((arg = args[index])){
                this.array[this.array.length] = arg;
                index++;
            }
            this.length = this.array.length;
        };
    });

    ArrayMap.prototype.concat = function(){
        var arg = Array.prototype.slice.call(arguments)[0];
        this.array = this.array.concat(arg);
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.copy = function(index, target){
        var targetVal = this.array[parseInt(target, 10)];
        this.array[index] = targetVal;
        return this;
    };
    
    ArrayMap.prototype.copyWithin = function(){
        var args = Array.prototype.slice.call(arguments);
        this.array = Array.prototype.copyWithin.apply(this, args);
        return this;
    };
    
    ['deleteElement', 'remove'].forEach(function(fn){
        ArrayMap.prototype[fn] = function(){
            var args = Array.prototype.slice.call(arguments),
                index = 0;
            while ((target = args[index])){
                if (typeof target !== 'number' || this.array.indexOf(target) > -1){
                    var targetIndex = this.array.isIndexOf(target);
                    this.array = this.array.splice(targetIndex, 1);
                } else {
                    this.array = this.array.splice(target, 1);
                }
                index++;
            }
            return this;
        };
    });
    
    ['each', 'forEach', 'iterate'].forEach(function(fn){
        ArrayMap.prototype[fn] = function(){
            var args = Array.prototype.slice.call(arguments);
            Array.prototype.forEach.apply(this.array, args);
        };
    });
    
    ArrayMap.prototype.empty = function(){
        this.array = this.array.slice(0, 0);
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.every = function(){
        var args = Array.prototype.slice.call(arguments);
        return Array.prototype.every.apply(this.array, args);
    };
    
    ArrayMap.prototype.fill = function(){
        var args = Array.prototype.slice.call(arguments);
        this.array = Array.prototype.fill.apply(this.array, args);
        return this;
    };
    
    ArrayMap.prototype.filter = function(){
        var args = Array.prototype.slice.call(arguments);
        this.array = Array.prototype.filter.apply(this.array, args);
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.find = function(){
        var args = Array.prototype.slice.call(arguments);
        return Array.prototype.find.apply(this.array, args);
    };
    
    ArrayMap.prototype.flatten = function(){
        var args = Array.prototype.slice.call(arguments),
            flatten = function flatten(){
                var index = 0, array = Array.prototype.slice.call(Object(this)),
                    result = [], _args = Array.prototype.slice.call(arguments),
                    depth = parseInt(_args[0], 10), depthIndex = 1;
                while ((element = array[index])){
                    if (Array.isArray(element)){
                        var i = 0;
                        while ((e = element[i])){
                            result[result.length] = e;
                            i++;
                        }
                    } else {
                        result[result.length] = element;
                    }
                    index++;
                }
                if (!isNaN(depth) && depth > 1){
                    while (depthIndex < depth){
                        result = flatten.call(result);
                        depthIndex++;
                    }
                }
                return result;
            };
        this.array = flatten.apply(this.array, args);
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.indexOf = function(){
        var args = Array.prototype.slice.call(arguments),
            values = args[0], fromIndex = args[1], index, i = 0,
            _args;
        if (Array.isArray(values)){
            index = [];
            while ((value = values[i])){
                _args = [value];
                if (typeof fromIndex !== 'undefined') _args[_args.length] = fromIndex;
                index[index.length] = Array.prototype.indexOf.apply(this.array, _args);
                i++;
            }
        } else {
            _args = [values];
            if (typeof fromIndex !== 'undefined') _args[_args.length] = fromIndex;
            index = Array.prototype.indexOf.apply(this.array, _args);
        }
        return index;
    };
    
    ArrayMap.prototype.join = function(){
        var args = Array.prototype.slice.call(arguments),
            baseJoin = function(){
                var _args = Array.prototype.slice.call(arguments),
                    array = Array.prototype.slice.call(Object(this)),
                    a = _args[0], b = _args[1], separator = _args[2],
                    result = '';
                if (typeof separator === 'function'){
                    try {
                        result = separator.apply(array, [a, b]);
                    } catch (error){
                        error.message = 'The result is undefined because the separator did not have a return statement.';
                        error.name = 'ReferenceError';
                        throw error;
                    }
                } else if (typeof separator === 'string'){
                    result = a + separator + b;
                } else {
                    throw new ReferenceError('The separator must be a function or a string.');
                }
                return result;
            },
            join = function(){
                var _args = Array.prototype.slice.call(arguments),
                    array = Array.prototype.slice.call(Object(this)),
                    result = '',
                    ai = 0, bi = ai + 1, s = _args[0];
                while ((a = array[ai]) && (b = array[bi])){
                    if (result === ''){
                        if (['function', 'object', 'undefined'].indexOf(typeof a) > -1
                            || ['function', 'object', 'undefined'].indexOf(typeof b) > -1){
                            ai++; bi++;
                            continue;
                        } else {
                            result = baseJoin.apply(array, [a, b, s]);
                        }
                    } else {
                        result = baseJoin.apply(array, [result, b, s]);
                    }
                    ai++; bi++;
                }
                return result;
            };
        return join.apply(this.array, args);
    };
    
    ArrayMap.prototype.lastIndexOf = function(){
        var args = Array.prototype.slice.call(arguments),
            values = args[0], fromIndex = args[1], index, i = 0,
            _args;
        if (Array.isArray(values)){
            index = [];
            while ((value = values[i])){
                _args = [value];
                if (typeof fromIndex !== 'undefined') _args[_args.length] = fromIndex;
                index[index.length] = Array.prototype.lastIndexOf.apply(this.array, _args);
                i++;
            }
        } else {
            _args = [values];
            if (typeof fromIndex !== 'undefined') _args[_args.length] = fromIndex;
            index = Array.prototype.lastIndexOf.apply(this.array, _args);
        }
        return index;
    };
    
    ArrayMap.prototype.map = function(){
        var args = Array.prototype.slice.call(arguments);
        this.array = Array.prototype.map.apply(this.array, args);
        return this;
    };
    
    ArrayMap.prototype.merge = function(){
        var args = Array.prototype.slice.call(arguments),
            index = 0,
            array = [];
        while ((arg = args[index])){
            if (!Array.isArray(arg)){
                index++; continue;
            } else {
                for (var i = 0; i < arg.length; i++){
                    var value = arg[i];
                    array[array.length] = value;
                }
                index++;
            }
        }
        array = ArrayMap.removeDups(array);
        this.array = ArrayMap.removeDups(this.array.concat(array));
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.not = function(){
        var args = Array.prototype.slice.call(arguments),
            filter = function(){
                var _args = Array.prototype.slice.call(arguments),
                    _array = Array.prototype.slice.call(Object(this));
                return Array.prototype.filter.apply(_array, [function(){
                    var a = Array.prototype.slice.call(arguments),
                        array = Array.prototype.slice.call(Object(this));
                    return !(_args[0].apply(array, a));
                }].concat(_args.slice(1)));
            };
        this.array = filter.apply(this.array, args);
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.reduce = function(){
        var args = Array.prototype.slice.call(arguments),
            reduced = Array.prototype.reduce.apply(this.array, args);
        if (Array.isArray(reduced)){
            this.array = reduced;
            return this;
        } else {
            return reduced;
        }
    };
    
    ArrayMap.prototype.reduceRight = function(){
        var args = Array.prototype.slice.call(arguments),
            reduced = Array.prototype.reduceRight.apply(this.array, args);
        if (Array.isArray(reduced)){
            this.array = reduced;
            return this;
        } else {
            return reduced;
        }
    };
    
    ['removeDups', 'getUnique'].forEach(function(fn){
        ArrayMap.prototype[fn] = function(){
            this.array = Array.prototype.filter.call(this.array, function(element, index, array){
                return array.indexOf(element) === index;
            });
            this.length = this.array.length;
            return this;
        };
    });
    
    ArrayMap.prototype.slice = function(){
        var args = Array.prototype.slice.call(arguments);
        this.array = Array.prototype.slice.apply(this.array, args);
        return this;
    };
    
    ArrayMap.prototype.splice = function(){
        var args = Array.prototype.slice.call(arguments);
        this.array = Array.prototype.splice.apply(this.array, args);
        return this;
    };
    
    ArrayMap.prototype.split = function(){
        var args = Array.prototype.slice.call(arguments),
            result = [], start = args[0], end = args[1],
            array1 = [0, start - 1], array2 = [start], array3 = null;
        if (typeof end !== 'undefined'){
            array2[array2.length] = end;
            array3 = [end + 1];
        }
        result[result.length] = Array.prototype.slice.apply(this.array, array1);
        result[result.length] = Array.prototype.slice.apply(this.array, array2);
        if (array3 !== null) result[result.length] = Array.prototype.slice.apply(this.array, array3);
        this.array = result;
        this.length = this.array.length;
        return this;
    };
    
    ArrayMap.prototype.some = function(){
        var args = Array.prototype.slice.call(arguments);
        return Array.prototype.slice.apply(this.array, args);
    };
    
    ArrayMap.prototype.sort = function(){
        var args = Array.prototype.slice.call(arguments),
            sort = args[0];
        if (typeof sort !== 'function' && typeof sort !== 'undefined'){
            sort = parseInt(sort, 10);
            if (sort < 1){
                this.array = this.array.reverse();
            } else if (sort === 1){
                this.array = this.array.sort();
            }
        } else if (typeof sort === 'function'){
            this.array = Array.prototype.sort.call(this.array, sort);
        } else {
            this.array = this.array.sort();
        }
        return this;
    };
    
    ArrayMap.prototype.toArray = function(){
        return this.array;
    };
    
    window.ArrayMap = ArrayMap;
    ['add', 'append', 'concat', 'copy', 'copyWithin', 'deleteElement', 'each',
        'every', 'fill', 'filter', 'find', 'flatten', 'forEach', 'getUnique',
        'indexOf', 'insert', 'iterate', 'join', 'lastIndexOf', 'map', 'merge',
        'not', 'reduce', 'reduceRight', 'remove', 'removeDups', 'slice',
        'splice', 'split', 'some', 'sort'].forEach(function(fn){
        ArrayMap[fn] = function(){
            var a = Array.prototype.slice.call(arguments),
                array = a[0], args = a.slice(1),
                arraymap = new ArrayMap(array);
            var result = arraymap[fn].apply(arraymap, args);
            if (result instanceof ArrayMap) return result.toArray();
            return result;
        };
    });
}(jQuery));
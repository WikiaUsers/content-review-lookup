;(function(mw, $, ui){
    var _ui = $.extend(ui.prototype, {
        fn: ui.prototype,
        _get: function(a, b){
            var element, type;
            if (typeof b !== 'undefined'){
                switch (typeof b){
                    case 'string':
                        element = a;
                        type = b;
                        return _ui._access(type, element);
                    case 'object':
                        if (b instanceof Array){
                            element = a;
                            type = b;
                            return _ui._access(type, element);
                        } else {
                            throw new SyntaxError('The second argument should be an array or a string. The type of the argument is: ' + b.constructor.name);
                        }
                        break;
                    default:
                        throw new SyntaxError('The second argument should be an array or a string. The type of the argument is: ' + b.constructor.name);
                }
            } else {
                var uiNames = [];
                switch (typeof a){
                    case 'string':
                        if (uiNames.indexOf(a) > -1){
                            type = a;
                            return _ui._access(type, '*');
                        }
                        else {
                            element = a;
                            return _ui._access('*', element);
                        }
                        break;
                    case 'object':
                        if (a instanceof Array === false) throw new SyntaxError('The second argument should be an array or a string. The type of the argument is: ' + a.constructor.name);
                        element = [];
                        type = [];
                        a.forEach(function(_e, index){
                            if (uiNames.indexOf(_e) > -1){
                                type[type.length] = _e;
                            } else {
                                element[element.length] = _e;
                            }
                        });
                        
                        if (element.length > 0){
                            return _ui.access('*', element);
                        } else if (type.length > 0){
                            return _ui.access(type, '*');
                        } else if (element.length > 0 && type.length > 0){
                            return _ui.access(type, element);
                        } else {
                            throw new SyntaxError('The first argument should be an array or a string. The type of the argument is: ' + b.constructor.name);
                        }
                        break;
                    default:
                        throw new SyntaxError('The first argument should be an array or a string. The type of the argument is: ' + b.constructor.name);
                }
            }
        }
    });
})(this.mediaWiki, this.jQuery, this.ExodusUI = this.ExodusUI || function(){
    return this;
});
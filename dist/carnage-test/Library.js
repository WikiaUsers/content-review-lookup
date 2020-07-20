// Dimensions
function Dimensions(d, config){
    var dimension_arr = [];
    function stopNegative(n){
        if (n < 0) n = 0;
        return n;
    }
    if (typeof config !== 'undefined'){
        this.defaultSize = config.defaultSize || 16;
    } else {
        this.defaultSize = 16;
    }
    this.stopNegative = stopNegative;
    if (typeof d == 'object'){
        if (d instanceof Array){
            if (d.length > 2 || d.length < 2) throw new SyntaxError('The array must contain exactly two numeric values.');
            if (
                Array.prototype.some.call(d, function(n){
                    return isNaN(parseInt(n, 10));
                })
            ) throw new SyntaxError('Both values must be numeric.');
            this.width = stopNegative(parseInt(d[0], 10));
            this.height = stopNegative(parseInt(d[1], 10));
            this.perimeter = (2 * this.width) + (2 * this.height);
            this.area = this.width * this.height;
        } else {
            this.width = stopNegative(parseInt(d.width, 10));
            this.height = stopNegative(parseInt(d.height, 10));
            this.perimeter = (2 * this.width) + (2 * this.height);
            this.area = this.width * this.height;
        }
    } else if (typeof d == 'string'){
        dimension_arr = d.split('x');
        if (dimension_arr.length > 2 || dimension_arr.length < 2) throw new SyntaxError('The array must contain exactly two numeric values.');
        if (
            Array.prototype.some.call(dimension_arr, function(n){
                return isNaN(parseInt(n, 10));
            })
        ) throw new SyntaxError('Both values must be numeric.');
        this.width = stopNegative(parseInt(dimension_arr[0], 10));
        this.height = stopNegative(parseInt(dimension_arr[1], 10));
        this.perimeter = (2 * this.width) + (2 * this.height);
        this.area = this.width * this.height;
    } else {
        this.height = 0;
        this.width = 0;
    }
    this.isLandscape = this.width > this.height;
    this.isPortrait = this.height > this.width;
    this.isSquare = this.height == this.width;
    return this;
}
 
Dimensions.prototype.convert = function convert(to){
    var size = this.defaultSize,
        accepted_values = {
            'px': function(width, height){
                return {
                    width: width + 'px',
                    height: height + 'px'
                };
            },
            'em': function(width, height){
                width = width / size;
                height = height / size;
                return {
                    width: width + 'em',
                    height: height + 'em'
                };
            },
            'pc': function(width, height){
                width = width / size;
                height = height / size;
                return {
                    width: width + 'pc',
                    height: height + 'pc'
                };
            },
            'in': function(width, height){
                width = width / 96;
                height = height / 96;
                return {
                    width: width + 'in',
                    height: height + 'in'
                };
            },
            'pt': function(width, height){
                width = width * (72 / 96);
                height = height * (72 / 96);
                return {
                    width: width + 'pt',
                    height: height + 'pt'
                };
            },
            '%': function(width, height){
                width = (width / size) * 100;
                height = (width / size) * 100;
                return {
                    width: width + '%',
                    height: height + '%'
                };
            }
        };
    if (
        Object.keys(accepted_values).some(function(key){
            return key === to;
        }) === false
    ) throw new ReferenceError('The value (' + to + ') is invalid. The accepted values are: ' + Object.keys(accepted_values).join(', ') + '.');
    return Function.prototype.apply.call(accepted_values[to], this, [this.width, this.height]);
};

Dimensions.prototype.scale = function scale(percentage){
    percentage = percentage.replace('%', '');
    percentage = parseInt(percentage, 10) / 100;
    this.width = this.stopNegative(this.width + (this.width * percentage));
    this.height = this.stopNegative(this.height + (this.height * percentage));
    this.perimeter = (2 * this.width) + (2 * this.height);
    this.area = this.width * this.height;
    this.isLandscape = this.width > this.height;
    this.isPortrait = this.height > this.width;
    this.isSquare = this.height == this.width;
    return this;
};

Dimensions.prototype.scaleDown = function scaleDown(percentage){
    if (percentage.indexOf('-') > -1) percentage = percentage.replace('-', '');
    else percentage = '-' + percentage;
    this.scale(percentage);
    return this;
};

Dimensions.prototype.setByElement = function setByElement(elem){
    if (elem instanceof jQuery){
        this.width = elem.width();
        this.height = elem.height();
    } else if (elem instanceof Element || elem instanceof Node){
        var rect = elem.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
    } else {
        throw new ReferenceError('The element must be a jQuery object or a DOM Node.');
    }
    this.perimeter = (2 * this.width) + (2 * this.height);
    this.area = this.width * this.height;
    this.isLandscape = this.width > this.height;
    this.isPortrait = this.height > this.width;
    this.isSquare = this.height == this.width;
    return this;
};

Dimensions.prototype.setByValue = function setByValue(width, height){
    var digit = /\d+/,
        nodigit = /[^\d+]/,
        digit_nodigit = /\d+[^\d+]/,
        _width = null,
        _height = null,
        size = this.defaultSize,
        accepted_values = {
            'px': function(value){
                value = parseInt(value, 10);
                return value;
            },
            'em': function(value){
                value = parseInt(value, 10);
                var res = value * size;
                return res;
            },
            'pc': function(value){
                value = parseInt(value, 10);
                var res = value * size;
                return res;
            },
            'in': function(value){
                value = parseInt(value, 10);
                var res = value * 96;
                return res;
            },
            'pt': function(value){
                value = parseInt(value, 10);
                var res = value / (72 / 96);
                return res;
            },
            '%': function(value){
                value = parseInt(value, 10);
                var res = (value * size) / 100;
                return res;
            }
        };
    if (typeof width === 'undefined') throw new ReferenceError('The width has not been specified');
    else {
        switch (typeof width){
            case 'number':
                _width = width;
                break;
            case 'string':
                if (digit_nodigit.test(width)){
                    let val = width.replace(digit, ''),
                        number = width.replace(nodigit, '');
                    _width = Function.prototype.apply.call(accepted_values[val], this, [number]);
                } else {
                    _width = parseInt(width, 10);
                    if (isNaN(_width)) throw new TypeError('The \'width\' argument is not a number.');
                }
                break;
            default:
                throw new TypeError('It must be a number or a string.');
        }
        if (typeof height === 'undefined') _height = _width;
        else {
            switch (typeof height){
                case 'number':
                    _height = height;
                    break;
                case 'string':
                    if (digit_nodigit.test(height)){
                        let _val = height.replace(digit, ''),
                            _number = height.replace(nodigit, '');
                        _height = Function.prototype.apply.call(accepted_values[_val], this, _number);
                    } else {
                        _height = parseInt(height, 10);
                        if (isNaN(_height)) _height = _width;
                    }
                    break;
                default:
                    _height = _width;
            }
        }
    }
    this._set(_width, _height);
};

Dimensions.prototype.setValue = function setValue(type, number){
    var accepted_types = ['width', 'height'],
        plumin = ['+', '-'],
        op = '';
    if (typeof type == 'string'){
        if (
            !(
                typeof Array.prototype.some !== undefined ?
                Array.prototype.some.call(accepted_types, function(_type){
                    return _type == type;
                }) :
                accepted_types.indexOf(type) > -1
            )
        ) throw new SyntaxError('The type must either be width or height.');
        switch (type){
            case 'width':
                op = number[0];
                if (
                    typeof Array.prototype.some !== undefined ?
                    Array.prototype.some.call(plumin, function(_op){
                        return op == _op;
                    }) :
                    plumin.indexOf(op) > -1
                ){
                    if (op == '+'){
                        number = number.replace('+', '');
                        this.width += parseInt(number, 10);
                    } else if (op == '-'){
                        number = number.replace('-', '');
                        this.width -= parseInt(number, 10);
                    }
                } else {
                    if (isNaN(number)) throw new TypeError('This is not a number.');
                    this.width += parseInt(number, 10);
                }
                break;
            case 'height':
                op = number[0];
                if (
                    typeof Array.prototype.some !== undefined ?
                    Array.prototype.some.call(plumin, function(_op){
                        return op == _op;
                    }) :
                    plumin.indexOf(op) > -1
                ){
                    if (op == '+'){
                        number = number.replace('+', '');
                        this.height += parseInt(number, 10);
                    } else if (op == '-'){
                        number = number.replace('-', '');
                        this.height -= parseInt(number, 10);
                    }
                } else {
                    if (isNaN(number)) throw new TypeError('This is not a number.');
                    this.height += parseInt(number, 10);
                }
                break;
            default:
                throw new SyntaxError('The type must either be width or height.');
        }
    } else {
        if (
            Array.prototype.some.call(type, function(_type){
                return accepted_types.indexOf(_type) > -1;
            })
        ){
            op = number[0];
            if (
                typeof Array.prototype.some !== undefined ?
                Array.prototype.some.call(plumin, function(_op){
                    return op == _op;
                }) :
                plumin.indexOf(op) > -1
            ){
                if (op == '+'){
                    number = number.replace('+', '');
                    this.width += parseInt(number, 10);
                    this.height += parseInt(number, 10);
                } else if (op == '-'){
                    number = number.replace('-', '');
                    this.width -= parseInt(number, 10);
                    this.height -= parseInt(number, 10);
                }
            } else {
                if (isNaN(number)) throw new TypeError('This is not a number.');
                this.width += parseInt(number, 10);
                this.height += parseInt(number, 10);
            }
        } else {
            throw new SyntaxError('The types must either be width and height.');
        }
    }
    this.perimeter = (2 * this.width) + (2 * this.height);
    this.area = this.width * this.height;
    this.isLandscape = this.width > this.height;
    this.isPortrait = this.height > this.width;
    this.isSquare = this.height == this.width;
    return this;
};

Dimensions.prototype._set = function _set(width, height){
    this.width = this.stopNegative(parseInt(width, 10));
    this.height = this.stopNegative(parseInt(height, 10));
    this.perimeter = (2 * this.width) + (2 * this.height);
    this.area = this.width * this.height;
    this.isLandscape = this.width > this.height;
    this.isPortrait = this.height > this.width;
    this.isSquare = this.height == this.width;
    return this;
};

// Page Link
function PageLink(link){
    this.link = link;
    this.isAbsolute = /http:\/\/(.*)\.wikia\.com\/(?:.*)/g.test(this.link);
    this.isRelative = !this.isAbsolute;
    this.domain = /*this.isAbsolute ? link.replace(/\/(wiki|.*\.php)/, '') :*/ mw.config.get('wgServer', wgServer);
    this.absoluteLink = this.isAbsolute ? this.link : this.domain + this.link;
    this.relativeLink = this.isRelative ? this.link : this.link.replace(this.domain, '');
    this.fullurl = this.absoluteLink;
    this.shorturl = this.relativeLink;
    this.host = (this.isAbsolute ? this.link : this.domain).replace(/http:\/\/(.*)\.wikia\.com/g, '$1');
    return this;
}

PageLink.prototype.checkHost = function checkHost(host, callback){
    var value = null;
    if (typeof host == 'string'){
        value = host === this.host;
        if (typeof callback !== 'function') return value;
        else {
            if (value === true){
                Function.prototype.apply.call(callback, window, [host, this]);
                return value;
            } else return value;
        }
    } else if (typeof host == 'object'){
        if (host instanceof Array){
            var that = this;
            value = Array.prototype.some.call(host, function(h){
                return that.host === h;
            });
            if (typeof callback !== 'function') return value;
            else {
                if (value === true){
                    Function.prototype.apply.call(callback, window, [host, this]);
                    return value;
                } else return value;
            }
        }
    }
};

PageLink.prototype.isHost = function isHost(host){
    if (typeof host !== 'string') return;
    return this.checkHost(host);
};
(function(window, $){
    var a = [], slice = a.slice, indexOf = a.indexOf,
        o = {}, has = o.hasOwnProperty,
        isInstance = function(inst, cons){
            return Object(inst) instanceof cons;
        },
        sortKeys = function(obj, compFn){
            if (typeof compFn !== "function") compFn = null;
            var res = {}, keys = Object.keys(obj);
            if (compFn !== null){
                keys = keys.sort(function(a, b){
                    return compFn.call(window, {
                        key: a, value: obj[a]
                    }, {
                        key: b, value: obj[b]
                    });
                });
            } else keys = keys.sort();
        },
        canonicalElements = {
            "a": true, "abbr": true, "address": true, 
            "area": false, "article": true, "aside": true,
            "audio": true, "b": true, "base": false, "bdi": true,
            "bdo": true, "blockquote": true, "body": true,
            "br": false, "button": true, "canvas": true,
            "caption": true, "cite": true, "code": true,
            "col": false, "colgroup": true, "content": true,
            "data": true, "datalist": true, "dd": true,
            "del": true, "details": true, "dfn": true,
            "dialog": true, "div": true, "dl": true,
            "dt": true, "em": true, "embed": false,
            "fieldset": true, "figcaption": true,
            "figure": true, "footer": true, "form": true,
            "h1": true, "h2": true, "h3": true, "h4": true,
            "h5": true, "h6": true, "head": true, "header": true,
            "hr": false, "html": true, "i": true, "iframe": true,
            "img": false, "input": false, "ins": true, "kbd": true,
            "keygen": false, "label": true, "legend": true, 
            "li": true, "link": false, "main": true, "map": true,
            "mark": true, "menu": true, "menuitem": false,
            "meta": false, "meter": false, "nav": true,
            "noscript": true, "object": true, "ol": true,
            "optgroup": true, "option": true, "output": true,
            "p": true, "param": false, "picture": true, "pre": true,
            "progress": true, "q": true, "rp": true, "rt": true,
            "rtc": true, "ruby": true, "s": true, "samp": true,
            "script": true, "section": true, "select": true,
            "shadow": true, "slot": true, "small": true,
            "source": false, "span": true, "style": true,
            "sub": true, "summary": true, "sup": true,
            "table": true, "tbody": true, "td": true,
            "template": true, "textarea": true, "tfoot": true,
            "th": true, "thead": true, "time": true, "title": true,
            "tr": true, "track": false, "u": true, "ul": true,
            "var": true, "video": true, "wbr": false
        };
    
    function ElementParser(element){
        if (!(this instanceof ElementParser)){
            return new ElementParser(element);
        }
        this.elem = _def(element, null);
        this.name = "";
        this.isVoid = false;
        this.isInput = false;
        this.isCollection = false;
        if (this.elem && this.elem instanceof HTMLCollection){
            this.isCollection = true;
        }
        return this;
    }

    Object.keys(canonicalElements).forEach(function(name){
        ElementParser.prototype[name] = function(options){
            if (this.elem !== null) return this;
            this.elem = document.createElement(name);
            this.name = name;
            this.isVoid = !canonicalElements[name];
            this.isInput = ["input", "textarea"].indexOf(name) !== -1;
            return this;
        };
    });

    ElementParser.prototype.toNextSibling = function(){
        if (!this.checkNode("nextSibling")) return this;
        this.elem = this.elem.nextSibling;
        this.name = this.elem.tagName.toLowerCase();
        this.isVoid = !canonicalElements[this.name];
        this.isInput = ["input", "textarea"].indexOf(this.name) !== -1;
        return this;
    };

    ElementParser.prototype.toPreviousSibling = function(){
        if (!this.checkNode("previousSibling")) return this;
        this.elem = this.elem.previousSibling;
        this.name = this.elem.tagName.toLowerCase();
        this.isVoid = !canonicalElements[this.name];
        this.isInput = ["input", "textarea"].indexOf(this.name) !== -1;
        return this;
    };

    ElementParser.prototype.toFirstChild = function(){
        if (!this.checkNode("firstChild")) return this;
        this.elem = this.elem.firstChild;
        this.name = this.elem.tagName.toLowerCase();
        this.isVoid = !canonicalElements[this.name];
        this.isInput = ["input", "textarea"].indexOf(this.name) !== -1;
        return this;
    };

    ElementParser.prototype.toLastChild = function(){
        if (!this.checkNode("lastChild")) return this;
        this.elem = this.elem.lastChild;
        this.name = this.elem.tagName.toLowerCase();
        this.isVoid = !canonicalElements[this.name];
        this.isInput = ["input", "textarea"].indexOf(this.name) !== -1;
        return this;
    };

    ElementParser.prototype.querySelector = function(selector){
        this.elem = (this.elem || document).querySelector(selector);
        this.name = this.elem.tagName.toLowerCase();
        this.isVoid = !canonicalElements[this.name];
        this.isInput = ["input", "textarea"].indexOf(this.name) !== -1;
    };
})(window, jQuery);
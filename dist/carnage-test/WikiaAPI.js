var WikiaAPI = new (function(){
    this.crossDomainURL = 'https://cors-anywhere.herokuapp.com/';
    this.settings = {
        method: 'GET',
        dataType: 'json',
        url: mw.config.get('wgScriptPath') + mw.util.wikiScript('api'),
        data: {}
    };
    this.AJAX = function(){
        var args = Array.prototype.slice.call(arguments),
            settings = typeof args[0] === 'object' ? args[0] : {},
            complete = typeof args[1] === 'function' ? args[1] : null,
            fail = typeof args[2] === 'function' ? args[2] : null,
            xhr = null,
            done = false;
        if (Object.keys(settings).length === 0) return;
        settings = $.extend(true, this.settings, settings);
        $.each([['complete', 'done', 'success'], ['fail', 'error']], function(index, fns){
            $.each(fns, function(i, fn){
                if (fn in settings && !done){
                    done = true;
                }
            });
        });
        xhr = $.ajax(settings);
        if (done === true){
            return;
        } else {
            if (typeof complete === 'function'){
                xhr.done(complete);
                done = true;
            }
            if (done && typeof fail === 'function'){
                xhr.fail(fail);
            }
            if (done){
                return;
            } else {
                return xhr;
            }
        }
    };
    this.GET = function(){
        var args = Array.prototype.slice.call(arguments),
            settings = typeof args[0] === 'object' ? args[0] : {},
            complete = typeof args[1] === 'function' ? args[1] : null,
            fail = typeof args[2] === 'function' ? args[2] : null;
        if ('method' in settings || 'type' in settings){
            if ('method' in settings) delete settings.method;
            else if ('type' in settings) delete settings.type;
        }
        settings = $.extend(true, this.settings, $.extend({ method: 'GET' }, settings));
        return this.AJAX(settings, complete, fail);
    };
    this.POST = function(){
        var args = Array.prototype.slice.call(arguments),
            settings = typeof args[0] === 'object' ? args[0] : {},
            complete = typeof args[1] === 'function' ? args[1] : null,
            fail = typeof args[2] === 'function' ? args[2] : null;
        if ('method' in settings || 'type' in settings){
            if ('method' in settings) delete settings.method;
            else if ('type' in settings) delete settings.type;
        }
        settings = $.extend(true, this.settings, $.extend({ method: 'POST' }, settings));
        return this.AJAX(settings, complete, fail);
    };
    this.GETJSONfromURL = function(){
        var args = Array.prototype.slice.call(arguments),
            url = typeof args[0] === 'string' ? args[0] : '',
            data = typeof args[1] === 'object' ? args[1] : {},
            complete = typeof args[1] === 'function' ? args[2] : null,
            fail = typeof args[2] === 'function' ? args[3] : null,
            isRelative = /^(?:[a-z]+:)?\/\//i.test(url),
            settings = null;
        if ('method' in settings || 'type' in settings){
            if ('method' in settings) delete settings.method;
            else if ('type' in settings) delete settings.type;
        }
        if (isRelative){
            url = this.crossDomainURL + url.replace(/^(?:[a-z]+:)?\/\//i, '');
        }
        settings = $.extend(true, this.settings, { method: 'GET', url: url, dataType: 'json', data: data, crossDomain: true });
        return this.AJAX(settings, complete, fail);
    };
    this.POSTJSONfromURL = function(){
        var args = Array.prototype.slice.call(arguments),
            url = typeof args[0] === 'string' ? args[0] : '',
            data = typeof args[1] === 'object' ? args[1] : {},
            complete = typeof args[1] === 'function' ? args[2] : null,
            fail = typeof args[2] === 'function' ? args[3] : null,
            isRelative = /^(?:[a-z]+:)?\/\//i.test(url),
            settings = null;
        if ('method' in settings || 'type' in settings){
            if ('method' in settings) delete settings.method;
            else if ('type' in settings) delete settings.type;
        }
        if (isRelative){
            url = this.crossDomainURL + url.replace(/^(?:[a-z]+:)?\/\//i, '');
        }
        settings = $.extend(true, this.settings, { method: 'POST', url: url, dataType: 'json', data: data, crossDomain: true });
        return this.AJAX(settings, complete, fail);
    };
    return this;
})();
(function(window, $, mw){
    if (typeof window.QueryAPI !== 'undefined') return;
    var QueryAPI = {};
    
    QueryAPI.def = function(){
        var args = [].slice.call(arguments), len = args.length, i = 0, v;
        while (typeof v === 'undefined' && i < len){
            v = args[i]; i++;
        }
        if (typeof v === 'undefined') return null;
        return v;
    };
    
    QueryAPI.has = function(){
        var args = [].slice.call(arguments), obj = args[0],
            key = args[1];
        return Object.prototype.hasOwnProperty.call(obj, key);
    };
    
    QueryAPI.merge = function(){
        var args = [].slice.call(arguments), i = 0, len = args.length,
            r = [];
        while (i < len){
            if (!(args[i] instanceof Array)){
                i++; continue;
            }
            r = r.concat(args[i]);
            i++;
        }
        r = r.filter(function(e, i, a){ return a.indexOf(e) === i; });
        return r;
    };
    
    QueryAPI.ajax = function(){
        var args = [].slice.call(arguments), config = {};
        if (typeof args[0] === 'string'){
            config.source = args[0];
            if (typeof args[1] === 'object') $.extend(config, args[1]);
        } else if (typeof args[0] === 'object'){
            $.extend(config, args[1]);
        }
        this.instance = $.ajax;
        this.source = QueryAPI.def(config.source, '');
        this.format = QueryAPI.def(config.format, 'json');
        this.defaults = $.extend({}, config.defaults);
    };
    
    QueryAPI.ajax.prototype = {
        constructor: QueryAPI.ajax,
        params: {
            type: 'GET'
        },
        error: function(){
            var error = new ReferenceError('The parameter "action" is required.');
            throw error;
        },
        get: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'action')
            ) this.error();
            params.format = params.format || this.format;
            return this.instance.get(params);
        },
        post: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'action')
            ) this.error();
            params.format = params.format || this.format;
            return this.instance.post(params);
        },
        getJSON: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'action')
            ) this.error();
            params.format = 'json';
            return this.instance.get(params);
        },
        postJSON: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'action')
            ) this.error();
            params.format = 'json';
            return this.instance.post(params);
        }
    };
    
    QueryAPI.nirvana = function(){
        var args = [].slice.call(arguments), config = {};
        if (typeof args[0] === 'string'){
            config.source = args[0];
            if (typeof args[1] === 'object') $.extend(config, args[1]);
        } else if (typeof args[0] === 'object'){
            $.extend(config, args[1]);
        }
        this.format = QueryAPI.def(config.format, 'json');
        this.defaults = $.extend({}, config.defaults);
    };
    
    QueryAPI.nirvana.prototype = {
        constructor: QueryAPI.nirvana,
        error: function(){
            var error = new ReferenceError('The parameters "controller" and "method" are required.');
            throw error;
        },
        get: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'controller') ||
                !QueryAPI.has(params, 'method')
            ) this.error();
            params.format = params.format || this.format;
            return $.get('/wikia.php', params);
        },
        post: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            params.format = params.format || this.format;
            if (
                !QueryAPI.has(params, 'controller') &&
                !QueryAPI.has(params, 'method')
            ) this.error();
            return $.post('/wikia.php', params);
        },
        getJSON: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'action')
            ) this.error();
            params.format = 'json';
            return this.instance.get(params);
        },
        postJSON: function(){
            var params = $.extend({}, this.defaults, arguments[0]);
            if (
                !QueryAPI.has(params, 'action')
            ) this.error();
            params.format = 'json';
            return this.instance.post(params);
        }
    };
    
    QueryAPI.getSubpages = function(){
        var page = arguments[0], params = $.extend({}, arguments[1]),
            title = page.split('|')[0] + '/',
            ajax = new QueryAPI.ajax(title, {
                format: 'json',
                defaults: {
                    action: 'query',
                    list: 'allpages',
                    apnamespace: 0,
                    aplimit: 'max'
                }
            });
        ajax.defaults.title = ajax.source;
        return ajax.get(params);
    };
    
    QueryAPI.getUsers = function(){
        var users = arguments[0], params = $.extend({}, arguments[1]),
            title = users instanceof Array ? users.slice(0, 2) : 
                users.split('|').slice(0, 2),
            ajax = new QueryAPI.ajax(title, {
                format: 'json',
                defaults: {
                    action: 'query',
                    list: 'allusers',
                    aulimit: 'max'
                }
            });
        ajax.defaults.aufrom = title[0];
        ajax.defaults.auto = title[1];
        return ajax.get(params);
    };
    
    QueryAPI.getRevisionText = function(){
        var page = arguments[0], params = $.extend({}, arguments[1]),
            ajax = new QueryAPI.ajax(title, {
                format: 'json',
                defaults: {
                    action: 'query',
                    prop: 'revisions',
                    rvprop: 'content',
                    rvlimit: 1,
                    indexpageids: true
                }
            });
        ajax.defaults.title = ajax.source;
        return ajax.get(params);
    };
    
    QueryAPI.getLanguages = function(){
        var ajax = new QueryAPI.ajax('', {
            format: 'json',
            defaults: {
                action: 'query',
                meta: 'siteinfo',
                siprop: 'languages'
            }
        });
        return ajax.get();
    };
    
    window.QueryAPI = QueryAPI;
}(this, jQuery, mediaWiki));
/**
 * Creates simple non-intrusive pop-up notifications.
 * Last modified: 1691250473268
 * @author Arashiryuu0
 * @module Toasts
 * @version 1.1.0
 */
 
/*
	jshint
	undef: true,
	noarg: true,
	devel: true,
	jquery: true,
	strict: true,
	eqeqeq: true,
	freeze: true,
	newcap: true,
	esnext: true,
	browser: true,
	latedef: true,
	shadow: outer,
	varstmt: false,
	laxbreak: true,
	quotmark: single,
	singleGroups: true,
	futurehostile: true
*/
 
;(function (mw) {
    'use strict';
    
    var toString = Object.prototype.toString;
    
    if (window.dev && window.dev.toasts) return;
    
    window.importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:Toasts.css'
        ]
    });
	
    function log (level) {
		var parts = [
			'%c[Toasts] %o',
			'color: #C9F',
			new Date().toUTCString()
		];
		var method = level in console
			? level
			: 'log';
		return function () {
			console.groupCollapsed.apply(null, parts);
			console[method].apply(null, arguments);
			console.groupEnd();
		};
    }
    
    function isObject (item) {
        return toString.call(item) === '[object Object]';
    }
    
    function deepFreeze (object, exclude) {
        if (exclude && exclude(object)) return;
        if (typeof object === 'object' && object !== null) {
            var props = Object.getOwnPropertyNames(object);
            var len = props.length;
            for (var i = 0; i < len; i++) {
                var key = props[i];
                deepFreeze(object[key], exclude);
            }
        }
        Object.freeze(object);
        return object;
    }
    
    function create (tag, props, children) {
		var el = document.createElement(tag);
		Object.assign(el, props);
		if (Array.isArray(children)) el.append.apply(el, children);
		return el;
    }
    
    function createNS (tag, props, children) {
		var el = document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (var key in props) {
			el.setAttribute(key, props[key]);
		}
		if (Array.isArray(children)) el.append.apply(el, children);
		return el;
    }
    
    function createIcon (d) {
		return createNS('svg', {
			width: 20,
			height: 20,
			viewBox: '0 0 24 24'
		}, [
			createNS('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
			createNS('path', {
				d: d
			})
		]);
    }
    
    var onError = log('error');
    
    var helpers = {
        ensureContainer: function () {
            if (document.querySelector('.toasts')) return;
            var wrapper = create('div', { className: 'toasts' });
            wrapper.style.setProperty('width', document.documentElement.offsetWidth + 'px');
            wrapper.style.setProperty('bottom', '80px');
            document.body.appendChild(wrapper);
        },
        buildToast: function (message, type, icon) {
            var name = ['toast'];
            if (type || icon) name.push('toast-has-icon');
			if (type !== '') name.push('toast-' + type);
            if (!icon && type) icon = type;
            var html = create('div', { className: name.join(' ') }, [
				this.icons[icon] && create('div', { className: 'toast-icon' }, [
					this.icons[icon].cloneNode(true)
				]),
				create('div', { className: 'toast-text', textContent: message })
			].filter(Boolean));
            return html;
        },
        parseType: function (type, types) {
            return types[type] || types['default'];
        },
        icons: {
            warning: createIcon('M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'),
            success: createIcon(
				'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
					+ '10-10S17.52 2 12 2zm-2 '
					+ '15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
			),
            info: createIcon(
				'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
					+ '10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
			),
            error: createIcon(
				'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
					+ '10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
			)
        }
    };
    
    function defaultToast (content, options) {
        content = typeof content === 'string'
			? content
			: '';
        options = isObject(options)
			? options
			: {};
        helpers.ensureContainer();
        var toast = helpers.buildToast(
            content,
            helpers.parseType(arguments[2], defaultToast.types),
            helpers.parseType(options.icon, defaultToast.types)
        );
        document.querySelector('.toasts').appendChild(toast);
        new Promise(function (resolve) {
			var timeout = options.timeout
				? options.timeout
				: 3000;
            setTimeout(resolve, timeout);
        })
        .then(function () {
            toast.classList.add('closing');
            return new Promise(function (resolve) {
                setTimeout(resolve, 300);
            });
        }, onError)
        .then(function () {
            toast.parentElement.removeChild(toast);
            if (document.querySelectorAll('.toasts .toast').length) return;
            var toasts = document.querySelector('.toasts');
            toasts.parentElement.removeChild(toasts);
        }, onError);
    }
    
    Object.assign(defaultToast, {
        show: function (content, options) {
			return defaultToast(content, options, options.type);
        },
        info: function (content, options) {
            return defaultToast(content, options, 'info');
        },
        error: function (content, options) {
            return defaultToast(content, options, 'error');
        },
        success: function (content, options) {
            return defaultToast(content, options, 'success');
        },
        warning: function (content, options) {
            return defaultToast(content, options, 'warning');
        },
        types: {
            'default': '',
            'warning': 'warning',
            'success': 'success',
            'error': 'error',
            'info': 'info'
        }
    });
    
    Object.defineProperty(defaultToast, Symbol.toStringTag, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: 'Toasts'
    });
    
    deepFreeze(defaultToast);
    
    window.dev = window.dev || {};
    window.dev.toasts = defaultToast;
    
    mw.hook('dev.toasts').fire(window.dev.toasts);
})(window.mediaWiki);

/*@end@*/
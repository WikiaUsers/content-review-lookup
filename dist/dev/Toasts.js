/**
 * Creates simple non-intrusive pop-up notifications.
 * Last modified: 1743065538564
 * @author Arashiryuu0
 * @module Toasts
 * @version 1.2.1
 */
 
/*
	jshint
	undef: true,
	noarg: true,
	devel: true,
	typed: true,
	jquery: true,
	strict: true,
	eqeqeq: true,
	freeze: true,
	newcap: true,
	browser: true,
	latedef: true,
	shadow: outer,
	varstmt: true,
	quotmark: single,
	laxbreak: true,
	esversion: 11,
	singleGroups: true,
	futurehostile: true
*/

/*
	globals
	mw
*/

;(() => {
	'use strict';
	
	if (window.dev && window.dev.toasts) return;
    
    const toString = Function.call.bind(Object.prototype.toString);
    
    window.importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:Toasts.css'
        ]
    });
	
    const log = (level) => {
		const getParts = () => [
			'%c[Toasts] %o',
			'color: #C9F',
			new Date().toUTCString()
		];
		const method = level in console
			? level
			: 'log';
		return (...args) => {
			console.groupCollapsed(...getParts());
			console[method](...args);
			console.groupEnd();
		};
    };
    
    const isObject = (item) => toString(item) === '[object Object]';
    
    const deepFreeze = (object, exclude) => {
        if (exclude && exclude(object)) return;
        if (typeof object === 'object' && object !== null) {
            const props = Object.getOwnPropertyNames(object);
            for (const key of props) {
                deepFreeze(object[key], exclude);
            }
        }
        Object.freeze(object);
        return object;
    };
    
    const create = (tag, props, children = []) => {
		const el = document.createElement(tag);
		Object.assign(el, props);
		if (Array.isArray(children)) el.append(...children);
		return el;
    };
    
    const createNS = (tag, props, children = []) => {
		const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
		for (const key in props) {
			el.setAttribute(key, props[key]);
		}
		if (Array.isArray(children)) el.append(...children);
		return el;
    };
    
    const createIcon = (d) => createNS('svg', {
		width: 20,
		height: 20,
		viewBox: '0 0 24 24'
	}, [
		createNS('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
		createNS('path', {
			d: d
		})
	]);
    
    const onError = log('error');
    const toasts = create('div', { className: 'toasts' });
    
    const helpers = {
        ensureContainer () {
            if (toasts.isConnected) return;
            toasts.style.setProperty('width', document.documentElement.offsetWidth + 'px');
            toasts.style.setProperty('bottom', '80px');
            document.body.append(toasts);
        },
        buildToast (message, type, icon) {
            const name = ['toast'];
            if (type || icon) name.push('toast-has-icon');
            if (type !== '') name.push('toast-' + type);
            if (!icon && type) icon = type;
            const html = create('div', { className: name.join(' ') }, [
				Object.hasOwn(this.icons, icon) && create('div', { className: 'toast-icon' }, [
					this.icons[icon]
				]),
				create('div', { className: 'toast-text', textContent: message })
            ].filter(Boolean));
            return html;
        },
        parseType (type, types) {
            return types[type] || types['default'];
        },
        icons: {
            get warning () {
				return createIcon('M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z');
			},
            get success () {
				return createIcon(
					'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
						+ '10-10S17.52 2 12 2zm-2 '
						+ '15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
				);
			},
            get info () {
				return createIcon(
					'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
						+ '10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'
				);
			},
            get error () {
				return createIcon(
					'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
						+ '10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'
				);
			}
        }
    };
    
    const defaultToast = function (content, options = {}) {
        content = typeof content === 'string'
			? content
			: '';
        options = isObject(options)
			? options
			: {};
        helpers.ensureContainer();
        const toast = helpers.buildToast(
            content,
            helpers.parseType(arguments[2], defaultToast.types),
            helpers.parseType(options.icon, defaultToast.types)
        );
        toasts.append(toast);
        new Promise((resolve) => {
			const timeout = options.timeout
				? options.timeout
				: 3000;
            setTimeout(resolve, timeout);
        })
        .then(() => {
            toast.classList.add('closing');
            return new Promise((resolve) => {
                setTimeout(resolve, 300);
            });
        }, onError)
        .then(() => {
            toast.remove();
            if (toasts.children.length) return;
            toasts.remove();
        }, onError);
    };
    
    Object.assign(defaultToast, {
        show (content, options = {}) {
        	const { type = 'default' } = options;
			return defaultToast(content, options, type);
        },
        info (content, options = {}) {
            return defaultToast(content, options, 'info');
        },
        error (content, options = {}) {
            return defaultToast(content, options, 'error');
        },
        success (content, options = {}) {
            return defaultToast(content, options, 'success');
        },
        warning (content, options = {}) {
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
})();

/*@end@*/
/**
 * Creates simple non-intrusive pop-up notifications.
 * @author Arashiryuu0
 * @module Toasts
 * @version 1.0.2
 */
'use strict';

;(function () {
    var toString = Object.prototype.toString;
    
    if (window.dev && window.dev.toasts) return;
    
    window.importArticles({
        type: 'style',
        articles: [
            'u:dev:MediaWiki:Toasts.css'
        ]
    });
    
    function isObject (item) {
        return toString.call(item) === '[object Object]';
    }
    
    var helpers = {
        ensureContainer: function () {
            var wrapper;
            if (document.querySelector('.toasts')) return;
            wrapper = document.createElement('div');
            wrapper.classList.add('toasts');
            wrapper.style.setProperty('width', document.documentElement.offsetWidth + 'px');
            wrapper.style.setProperty('bottom', '80px');
            document.body.appendChild(wrapper);
        },
        parseHTML: function (html, fragment) {
            var template = document.createElement('template'),
                node;
                
            fragment = typeof fragment === 'boolean' ? fragment : false;
            template.innerHTML = html;
            node = template.content.cloneNode(true);
            
            if (fragment) return node;
            return node.childNodes.length > 1 ? node.childNodes : node.childNodes[0];
        },
        buildToast: function (message, type, icon) {
            var hasIcon = type || icon,
                html = '',
                name = 'toast' + (hasIcon ? ' toast-has-icon' : '');
            name += (type && type !== 'default' ? ' toast-' + type : '');
            if (!icon && type) icon = type;
            html += '<div class="' + name + '">';
            if (this.icons[icon]) {
                html += '<div class="toast-icon">';
                html += this.icons[icon](20);
                html += '</div>';
            }
            html += '<div class="toast-text">' + message + '</div>';
            html += '</div>';
            return this.parseHTML(html);
        },
        parseType: function (type, types) {
            return types.hasOwnProperty(type) ? types[type] : '';
        },
        icons: {
            warning: function (size) {
                return [
                    '<svg width="'
                    + (size || 24)
                    + '" height="'
                    + (size || 24)
                    + '" viewBox="0 0 24 24">',
                    '<path d="M0 0h24v24H0z" fill="none" />',
                    '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"'
                    + '/>',
                    '</svg>'
                ].join('');
            },
            success: function (size) {
                return [
                    '<svg width="'
                    + (size || 24)
                    + '" height="'
                    + (size || 24)
                    + '" viewBox="0 0 24 24">',
                    '<path d="M0 0h24v24H0z" fill="none" />',
                    '<path d="'
                    + 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
                    + '10-10S17.52 2 12 2zm-2 '
                    + '15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"'
                    + '/>',
                    '</svg>'
                ].join('');
            },
            info: function (size) {
                return [
                    '<svg width="'
                    + (size || 24)
                    + '" height="'
                    + (size || 24)
                    + '" viewBox="0 0 24 24">',
                    '<path d="M0 0h24v24H0z" fill="none" />',
                    '<path d="'
                    + 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
                    + '10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"'
                    + '/>',
                    '</svg>'
                ].join('');
            },
            error: function (size) {
                return [
                    '<svg width="'
                    + (size || 24)
                    + '" height="'
                    + (size || 24)
                    + '" viewBox="0 0 24 24">',
                    '<path d="'
                    + 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 '
                    + '10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"'
                    + '/>',
                    '</svg>'
                ].join('');
            }
        }
    };
    
    var Toasts = {
        show: function (content, options) {
            var toast;
            content = typeof content === 'string' ? content : '';
            options = isObject(options) ? options : {};
            helpers.ensureContainer();
            toast = helpers.buildToast(
                content,
                helpers.parseType(options.type || '', this.types),
                options.icon || ''
            );
            document.querySelector('.toasts').appendChild(toast);
            new Promise(function (resolve) {
                setTimeout(resolve, options.timeout ? options.timeout : 3000);
            })
            .then(function () {
                toast.classList.add('closing');
                return new Promise(function (resolve) {
                    setTimeout(resolve, 300);
                });
            }, console.error)
            .then(function () {
                var toasts;
                toast.parentElement.removeChild(toast);
                if (document.querySelectorAll('.toasts .toast').length) return;
                toasts = document.querySelector('.toasts');
                toasts.parentElement.removeChild(toasts);
            }, console.error);
        },
        info: function (content, options) {
            content = typeof content === 'string' ? content : '';
            options = isObject(options) ? options : {};
            return this.show(content, Object.assign(options, { type: 'info' }));
        },
        error: function (content, options) {
            content = typeof content === 'string' ? content : '';
            options = isObject(options) ? options : {};
            return this.show(content, Object.assign(options, { type: 'error' }));
        },
        success: function (content, options) {
            content = typeof content === 'string' ? content : '';
            options = isObject(options) ? options : {};
            return this.show(content, Object.assign(options, { type: 'success' }));
        },
        warning: function (content, options) {
            content = typeof content === 'string' ? content : '';
            options = isObject(options) ? options : {};
            return this.show(content, Object.assign(options, { type: 'warning' }));
        },
        'default': function (content, options) {
            content = typeof content === 'string' ? content : '';
            options = isObject(options) ? options : {};
            return this.show(content, options);
        },
        types: {
            'default': '',
            'warning': 'warning',
            'success': 'success',
            'error': 'error',
            'info': 'info'
        }
    };
    
    Object.defineProperty(Toasts, Symbol.toStringTag, {
        configurable: false,
        writable: false,
        value: 'Toasts'
    });
    
    Object.freeze(Toasts);
    
    window.dev = window.dev || {};
    window.dev.toasts = Toasts;
    
    window.mw.hook('dev.toasts').fire(window.dev.toasts);
})();

/*@end@*/
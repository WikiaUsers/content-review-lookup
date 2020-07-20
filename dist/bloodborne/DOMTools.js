/**
 * Helpful utilities for dealing with DOM operations.
 * 
 * @module DOMTools
 * @version 1.1.2
 */
 
;(function () {
    'use strict';
    
    var mw = window.mw;
    
    if (typeof window.DOMTools !== 'undefined') return;
    
    var slice = Array.prototype.slice;
    var listenerStorage = {};
    var DOMTools = {
        listeners: listenerStorage,
        parseHTML: function (html, fragment) {
            fragment = fragment || false;
            
            if (typeof fragment !== 'boolean')
                throw new TypeError('Second parameter must be a boolean!');
            
            var template = document.createElement('template');
            template.innerHTML = html;
            
            var node = template.content.cloneNode(true);
            if (fragment) return node;
            
            return node.childNodes.length > 1
                ? slice.call(node.childNodes)
                : node.childNodes[0];
        },
        escapeHTML: function (html) {
            var text = document.createTextNode('');
            var span = document.createElement('span');
            span.append(text);
            text.nodeValue = html;
            return span.innerHTML;
        },
        query: function (selector, baseElement) {
            if (!baseElement) baseElement = document;
            return baseElement.querySelector(selector);
        },
        queryAll: function (selector, baseElement) {
            if (!baseElement) baseElement = document;
            return slice.call(baseElement.querySelectorAll(selector));
        },
        addClass: function (element) {
            if (!element || arguments.length < 2) return element;
            
            var args = slice.call(arguments, 1);
            
            element.classList.add.apply(element.classList, args);
            
            return element;
        },
        removeClass: function (element) {
            if (!element || arguments.length < 2) return element;
            
            var args = slice.call(arguments, 1);
            
            element.classList.remove.apply(element.classList, args);
            
            return element;
        },
        toggleClass: function (element, className, indicator) {
            if (typeof indicator !== 'undefined') element.classList.toggle(className, indicator);
            else element.classList.toggle(className);
            
            return element;
        },
        hasClass: function (element) {
            if (!element || arguments.length < 2) return false;
            
            var args = slice.call(arguments, 1);
            var predicate = function (name) {
                return element.classList.contains(name);
            };
            
            return args.every(predicate);
        },
        replaceClass: function (element, oldName, newName) {
            element.classList.replace(oldName, newName);
            
            return element;
        },
        appendTo: function (thatNode, thisNode) {
            if (typeof thatNode === 'string') thatNode = this.query(thatNode);
            
            thatNode.appendChild(thisNode);
            
            return thatNode;
        },
        appendAll: function (thatNode, theseNodes) {
            if (typeof thatNode === 'string') thatNode = this.query(thatNode);
            
            if (!thatNode) return;
            
            theseNodes = theseNodes || [];
            
            if (!Array.isArray(theseNodes) || !theseNodes.length) return;
            
            var len = theseNodes.length;
            
            for (var i = 0; i < len; i++) thatNode.appendChild(theseNodes[i]);
            
            return thatNode;
        },
        index: function (node) {
            var children = slice.call(node.parentElement.childNodes);
            var num = 0;
            for (var i = 0, len = children.length; i < len; i++) {
                var child = children[i];
                if (child === node) return num;
                if (child.nodeType === 1) num++;
            }
            return -1;
        },
        insertAfter: function (thisNode, target) {
            target.parentNode.insertBefore(thisNode, target.nextSibling);
            return thisNode;
        },
        after: function (thisNode, newNode) {
            thisNode.parentNode.insertBefore(newNode, thisNode.nextSibling);
            return thisNode;
        },
        previous: function (element, selector) {
            var previous = element.previousElementSibling;
            if (selector) return previous && previous.matches(selector) ? previous : null;
            return previous;
        },
        previousAll: function (element) {
            var previous = [];
            
            while (element.previousElementSibling) previous.push(element = element.previousElementSibling);
            
            return previous;
        },
        previousUntil: function (element, selector) {
            var previous = [];
            while (element.previousElementSibling && !element.previousElementSibling.matches(selector)) previous.push(element = element.previousElementSibling);
            return previous;
        },
        next: function (element, selector) {
            if (!selector) return element.nextElementSibling;
            var siblings = slice.call(element.parentElement.children);
            var index = siblings.findIndex(function (i) {
                return element === i;
            });
            var next = siblings.slice(index + 1);
            return next.find(function (i) {
                return i.matches && i.matches(selector);
            });
        },
        nextAll: function (element) {
            var siblings = slice.call(element.parentElement.children);
            var index = siblings.findIndex(function (i) {
                return element === i;
            });
            return siblings.slice(index + 1);
        },
        nextUntil: function (element, selector) {
            var next = [];
            while (element.nextElementSibling && !element.nextElementSibling.matches(selector)) next.push(element = element.nextElementSibling);
            return next;
        },
        parents: function (element, selector) {
            selector = selector || '';
            
            var results = [];
            
            if (selector) {
                while (element.parentElement.closest(selector)) {
                    results.push(element = element.parentElement.closest(selector));
                }
            } else {
                while (element.parentElement) {
                    results.push(element = element.parentElement);
                }
            }
            
            return results;
        },
        siblings: function (element, selector) {
            selector = selector || '*';
            
            var filter = function (i) {
                return i !== element && i.matches(selector);
            };
            
            var res = slice.call(element.parentElement.children);
            
            return res.filter(filter);
        },
        findChild: function (element, selector) {
            return element.querySelector(':scope > ' + selector);
        },
        findChildren: function (element, selector) {
            return slice.call(element.querySelectorAll(':scope > ' + selector));
        },
        text: function (element, text) {
            if (typeof text === 'undefined') return element.textContent;
            return element.textContent = text, element;
        },
        html: function (element, html) {
            if (typeof html === 'undefined') return element.innerHTML;
            return element.innerHTML = html, element;
        },
        css: function (element, attribute, value) {
            if (typeof value === 'undefined') return getComputedStyle(element)[attribute];
            return element.style[attribute] = value, element;
        },
        width: function (element, value) {
            if (typeof value === 'undefined') return parseInt(getComputedStyle(element).width);
            return element.style.width = value, element;
        },
        height: function (element, value) {
            if (typeof value === 'undefined') return parseInt(getComputedStyle(element).height);
            return element.style.height = value, element;
        },
        innerWidth: function (element) {
            return element.clientWidth;
        },
        innerHeight: function (element) {
            return element.clientHeight;
        },
        outerWidth: function (element) {
            return element.offsetWidth;
        },
        outerHeight: function (element) {
            return element.offsetHeight;
        },
        offset: function (element) {
            return element.getBoundingClientRect();
        },
        on: function (element, event, delegate, callback) {
            var split = event.split('.'), type = split[0], namespace = split[1],
                hasDelegate = delegate && callback, eventFunc,
                listeners, cancel, getIndex, newCancel;
                
            if (!callback) callback = delegate;
            
            eventFunc = !hasDelegate ? callback : function (e) {
                if (e.target.matches(delegate)) callback(e);
            };
            
            element.addEventListener(type, eventFunc);
            
            cancel = function () {
                element.removeEventListener(type, eventFunc);
            };
            
            if (namespace) {
                if (!this.listeners[namespace]) this.listeners[namespace] = [];
                
                listeners = this.listeners[namespace];
                
                getIndex = function (i) {
                    return i.event === type && i.element === element;
                };
                
                newCancel = function () {
                    cancel();
                    listeners.splice(listeners.findIndex(getIndex), 1);
                    if (!listeners.length) delete DOMTools.listeners[namespace];
                };
                
                listeners.push({
                    namespace: namespace,
                    callback: eventFunc,
                    event: type,
                    element: element,
                    cancel: newCancel
                });
                
                return newCancel;
            }
            
            return cancel;
        },
        once: function (element, event, delegate, callback) {
            var split = event.split('.'), type = split[0], ns = split[1], hasDelegate = delegate && callback, func, cancel, newCancel, listeners, getIndex;
            
            if (!callback) callback = delegate;
            
            func = !hasDelegate ? function (e) {
                callback(e);
                element.removeEventListener(type, func);
            } : function (e) {
                if (e.target.matches(delegate)) callback(e), element.removeEventListener(type, func);
            };
            
            element.addEventListener(type, func);
            
            cancel = function () {
                element.removeEventListener(type, func);
            };
            
            if (ns) {
                if (!this.listeners[ns]) this.listeners[ns] = [];
                
                listeners = this.listeners[ns];
                
                getIndex = function (i) {
                    return i.event === type && i.element === element;
                };
                
                newCancel = function () {
                    cancel();
                    listeners.splice(listeners.findIndex(getIndex), 1);
                    if (!listeners.length) delete DOMTools.listeners[ns];
                };
                
                listeners.push({
                    namespace: ns,
                    callback: func,
                    event: type,
                    element: element,
                    cancel: newCancel
                });
                
                return newCancel;
            }
            
            return cancel;
            
        },
        off: function (element, event, delegate, callback) {
            if (typeof element === 'string') return this.__offAll(element);
            
            var split = event.split('.'), type = split[0], namespace = split[1],
                hasDelegate = delegate && callback, func, item, len, i;
            
            if (!callback) callback = delegate;
            
            func = !hasDelegate ? callback : function (e) {
                if (e.target.matches(delegate)) callback(e);
            };
                
            if (namespace) return this.__offAll(event, element);
            
            element.removeEventListener(type, func);
            
            return element;
        },
        __offAll: function (event, element) {
            var split = event.split('.'), type = split[0], namespace = split[1];
                
            var matchFilter = function (l) {
                return l.event === type;
            },
                defaultFilter = function (_) {
                    return _;
                };
            
            if (element) {
                matchFilter = function (l) {
                    return l.event === type && l.element === element;
                };
                defaultFilter = function (l) {
                    return l.element === element;
                };
            }
            
            var listeners = this.listeners[namespace] || [];
            var list = type ? listeners.filter(matchFilter) : listeners.filter(defaultFilter);
            var len = list.length;
            for (var i = 0; i < len; i++) list[i].cancel();
        },
        deepClone: function (value) {
            if (typeof value !== 'object') return value;
            
            if (Array.isArray(value)) return value.map(function (i) {
                return this.deepClone(i);
            }, this);
            
            var clone = Object.assign({}, value);
            
            for (var key in clone) clone[key] = this.deepClone(clone[key]);
            
            return clone;
        },
        deepMerge: function () {
            var obj = {};
            for (var i = 0, len = arguments.length; i < len; i++) {
                var curr = arguments[i];
                if (typeof curr !== 'object') continue;
                for (var prop in curr) obj[prop] = this.deepClone(curr[prop]);
            }
            return obj;
        },
        getProp: function (obj, path) {
            return path.split(/\s?\.\s?/).reduce(function (object, prop) {
                return object && object[prop];
            }, obj);
        },
        isNil: function (anything) {
            return typeof anything === 'undefined' || anything === null;
        }
    };
    
    Object.defineProperties(DOMTools, {
        'name': {
            enumerable: true,
            configurable: false,
            get: function () {
                return 'DOMTools';
            }
        },
        'version': {
            enumerable: true,
            configurable: false,
            get: function () {
                return '1.1.2';
            }
        },
        'valueOf': {
            enumerable: false,
            configurable: false,
            value: function () {
                return DOMTools.toString();
            }
        }
    });
    
    Object.defineProperty(DOMTools, Symbol.toStringTag, {
        writable: false,
        configurable: false,
        value: 'DOMTools'
    });
    
    Object.freeze(DOMTools);

    window.DOMTools = DOMTools;
    mw.hook('DOMTools').fire(DOMTools);
})();

/*@end@*/
/**
 * Name:        UI-js
 * Author:      KockaAdmiralac <1405223@gmail.com>
 * Description: Library for easier UI creation and manipulation
 * Version:     v1.2
 */
(function() {
    'use strict';

    // Prevent double loading
    if (window.dev && window.dev.ui) {
        return;
    }

    /**
     * Mapping of attribute -> namespace for attributes such as
     * xlink:href and potentially other SVG attributes
     */
    var nsAttributes = {
        'xlink:href': 'http://www.w3.org/1999/xlink'
    };

    /**
     * Goes through each property of an object
     * @param {Object} obj Object to go through
     * @param {Function} cb Function to call when a property is found
     */
    function each(obj, cb) {
        if (typeof obj === 'object' && typeof cb === 'function') {
            for (var i in obj) {
                // Don't check if the property is valid because
                // we assume those are plain objects
                cb(i, obj[i]);
            }
        }
    }

    /**
     * Creates a DOM node with a given type
     * @param {String} type Type of the DOM node
     * @returns {Node} Requested DOM node
     */
    function createNode(type) {
        switch(type) {
            case '#text': return document.createTextNode('');
            case undefined:
            case '#document-fragment':
                return document.createDocumentFragment();
            case 'svg':
            case 'use':
            case 'g':
            case 'path':
            case 'circle':
                return document.createElementNS(
                    'http://www.w3.org/2000/svg',
                    type
                );
            default: return document.createElement(type);
        }
    }

    /**
     * Appends a node to its parent
     * @param {Node} node Node to append
     * @param {Node|String} parent node(s) to append the node to
     */
    function appendNode(node, parent) {
        if (parent instanceof Node) {
            parent.appendChild(node);
        } else if (typeof parent === 'string') {
            var elements = document.querySelectorAll(parent);
            for (var i = 0; i < elements.length; i++) {
                elements[i].appendChild(node);
            }
        }
    }

    /**
     * Main method of the library
     * @param {Object} opt Options for creating an element
     * @param {Node} parent Which DOM node to append to
     *                      Used for children property in options
     *                      This parameter should not be used by users
     * @returns {Node} Node with given options
     */
    function main(opt, parent) {
        if (typeof opt === 'string') {
            opt = {
                type: '#text',
                text: opt
            };
        } else if (opt instanceof Node) {
            appendNode(opt, parent);
            return opt;
        } else if (typeof opt !== 'object') {
            throw new Error('Options parameter incorrect!');
        }
        if ('condition' in opt && !opt.condition) {
            return;
        }
        var el = createNode(opt.type);
        if (typeof opt.text === 'string') {
            el.textContent = opt.text;
        }
        if (typeof opt.html === 'string') {
            el.innerHTML = opt.html;
        }
        each(opt.attr, function(k, v) {
            if (typeof k === 'string') {
                if (nsAttributes[k]) {
                    el.setAttributeNS(
                        nsAttributes[k],
                        k.split(':')[1],
                        v
                    );
                } else {
                    el.setAttribute(k, v);
                }
            }
        });
        each(opt.data, function(k, v) {
            el.setAttribute('data-' + k, v);
        });
        each(opt.style, function(k, v) {
            el.style[k.toLowerCase().replace(/-(\w)/g, function(_, a) {
                return a.toUpperCase();
            })] = v;
        });
        each(opt.events, function(k, v) {
            if (typeof v === 'function') {
                el.addEventListener(k, v);
            }
        });
        each(opt.props, function(k, v) {
            el[k] = v;
        });
        if (opt.classes instanceof Array) {
            opt.classes.forEach(function(cls) {
                el.classList.add(cls);
            });
        }
        if (typeof opt.checked === 'boolean') {
            el.checked = opt.checked;
        }
        if (typeof opt.selected === 'number' && !isNaN(opt.selected)) {
            el.selectedIndex = opt.selected;
        }
        if (typeof opt.value === 'number' || typeof opt.value === 'string') {
            el.value = String(opt.value);
        }
        if (opt.children instanceof Array) {
            opt.children.forEach(function(c) {
                main(c, el);
            });
        }
        appendNode(el, parent || opt.parent);
        return el;
    }

    // Expose the library function
    window.dev = window.dev || {};
    window.dev.ui = main;

    // Fire the hook so users know the loading has finished
    mw.hook('dev.ui').fire(window.dev.ui);

})();
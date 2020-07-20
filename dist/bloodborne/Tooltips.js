/**
 * Add custom tooltips to user masthead tags.
 * 
 * @module Tooltips
 * @version 1.0.3
 */
;(function () {
    'use strict';
    
    var has = Object.prototype.hasOwnProperty;
    var $ = window.jQuery;
    var mw = window.mw;
    
    var immediate = function (callback, opts) {
        if (opts && opts.thisArg) callback = callback.bind(opts.thisArg);
        return setTimeout(function () {
            if (opts && opts.args) callback.apply(null, opts.args);
            else callback();
        }, 0);
    };
    
    function wait (action) {
        while (document.readyState !== 'complete') return setTimeout(wait, 1000, action);
        action();
    }
    
    function ready (callback) {
        mw.hook('DOMTools').add(function (DOMTools) {
            var boundCb = callback.bind(null, DOMTools);
            wait(boundCb);
        });
    }
    
    function run (DOMTools) {
        var tooltipStorage = [];
        /**
         * Utility
         */
        function $e (type, properties) {
            var attributes, propStyle, element, events, style, prop, name, len, val, ev, ty, pr, i;
         
            type = type || '';
            properties = properties || {};
         
            ty = type.constructor.name;
            pr = properties.constructor.name;
         
            if (ty !== 'String' || pr !== 'Object') 
                throw new TypeError('Expected: String, Object. Received: ' + ty + ', ' + pr);
         
            element = document.createElement(type);
         
            attributes = [
                'text',
                'class'
            ];
         
            events = {
                'click': 'onclick',
                'clicks': 'ondblclick',
                'context': 'oncontextmenu',
                'keyup': 'onkeyup',
                'keydown': 'onkeydown',
                'keypress': 'onkeypress',
                'mouseup': 'onmouseup',
                'mousedown': 'onmousedown',
                'mousemove': 'onmousemove',
                'mouseover': 'onmouseover',
                'mouseout': 'onmouseout',
                'mouseenter': 'onmouseenter',
                'mouseleave': 'onmouseleave'
            };
         
            for (prop in properties) {
                val = properties[prop] || 0;
         
                if (!val) continue;
         
                name = val.constructor.name;
         
                if (prop === 'style') {
                    propStyle = Object.keys(val);
                    i = 0; len = propStyle.length;
                    for (i; i < len; i++) {
                        style = propStyle[i];
                        if (!val[style]) continue;
                        element.style[style] = val[style];
                    }
                } else if (attributes.includes(prop)) {
                    if (prop === 'text') {
                        element.textContent = val;
                        continue;
                    }
         
                    element.setAttribute(prop, val);
                } else if (events.hasOwnProperty(prop) && name === 'Function') {
                    ev = events[prop];
                    element[ev] = val;
                } else if (prop === 'dataset' && name === 'Object') {
                    for (i in val) element[prop][i] = val[i];
                } else if (prop === 'childNodes' && name === 'Array') {
                    i = 0; len = val.length;
                    for (i; i < len; i++) {
                        if (![1, 3].includes(val[i].nodeType)) continue;
         
                        $a(element, val[i]);
                    }
                } else {
                    element[prop] = val;
                }
            }
         
            element.props = properties;
         
            return element;
        }
         
        function $_ (selector) {
            return document.querySelector(selector);
        }
         
        function $$ (selector) {
            return document.querySelectorAll(selector);
        }
         
        function $a (target, element) {
            if (!target) return;
            return target.appendChild(element);
        }
        
        /**
         * Main functions
         */
        function getStyle () {
            var wiki = window.location.host.split('.').shift(),
                header = $_('.masthead-info hgroup') || $_('.wds-community-header'),
                headerColor, headerImage;
                
            headerImage = DOMTools.css(header, 'backgroundImage');
            headerColor = DOMTools.css(header, 'backgroundColor');
            
            if (header.tagName !== 'HGROUP') headerImage = DOMTools.css(header, 'backgroundColor');
            
            return {
                wiki: wiki,
                color: headerColor !== 'rgba(0, 0, 0, 0)' ? headerColor : 'rgb(38, 50, 57)',
                image: headerImage
            };
        }
        
        function injectCss () {
            var style = getStyle(),
                color = style.color,
                tipCss = $e('style', {
                    id: 'TooltipColorCss',
                    text: '.tooltip ' +
                        JSON.stringify({
                            background: color,
                            'border-color': color
                        })
                        .replace(/"/g, '')
                        .replace(/\),/g, ');') +
                        ' .tag:hover { cursor: help; }'
                });
            
            if (!document.contains($_('#TooltipColorCss'))) $a(document.head, tipCss);
            
            importArticles({
                type: 'style',
                articles: ['u:bloodborne:MediaWiki:Tooltips.css']
            });
        }
        
        function tooltip (node, text, type, options) {
            var tip, createdTip, boundIn, boundOut, defaultOptions = { style: {} };
            
            text = text || '';
            type = type || 'top';
            options = options || defaultOptions;
            
            typeof options !== 'object' && (options = defaultOptions);
            
            tip = $e('div', {
                class: 'tooltip tooltip-' + type,
                style: options.style ? options.style : defaultOptions.style,
                text: text
            });
            
            function mouseIn (that) {
                var tipstyle = that.getAttribute('class'),
                    delayedFn, $tip = $(that), $node = $(node);
                    
                delayedFn = function () {
                    var nodecenter = $node.offset().left + ($node.outerWidth() / 2);
                    var center = nodecenter - ($tip.outerWidth() / 2);
                    var top;
         
                    switch (tipstyle.split(' ')[1]) {
                        case 'tooltip-bottom':
                            top = $node.offset().top + $node.outerHeight();
                        break;
                        case 'tooltip-left':
                            center = $node.offset().left - $tip.outerWidth();
                            top = $node.offset().top + ($node.outerHeight() - $tip.outerHeight()) / 2;
                        break;
                        case 'tooltip-right':
                            center = $node.offset().left + $node.outerWidth();
                            top = $node.offset().top + ($node.outerHeight() - $tip.outerHeight()) / 2;
                        break;
                        default:
                            top = $node.offset().top - $tip.outerHeight();
                        break;
                    }
         
                    that.style.left = center + 'px';
                    that.style.top = top + 'px';
                };
                
                var container = document.getElementById('tooltips');
         
                that.style.left = '-1000vw';
                that.style.top = '-1000vh';
                
                if (!container) $a(document.body, that);
                else $a(container, that);
                
                immediate(delayedFn);
            }
            
            function mouseOut (that) {
                if (document.contains(that)) that.parentElement.removeChild(that);
            }
            
            boundIn = mouseIn.bind(null, tip);
            boundOut = mouseOut.bind(null, tip);
            
            DOMTools.on(node, 'mouseenter.tooltip', boundIn);
            DOMTools.on(node, 'mouseleave.tooltip', boundOut);
            
            createdTip = {
                node: node,
                text: text,
                type: type,
                options: options,
                tooltip: tip,
                $node: $(node),
                $tooltip: $(tip),
                mouseenter: boundIn,
                mouseleave: boundOut
            };
            
            window.TooltipModule.tooltips.push(createdTip);
            
            return createdTip;
        }
        
        function removeTooltip (node, text, type) {
            text = text || '';
            type = type || 'top';
            
            var defaultFilter = function (tip) {
                return tip.node === node;
            };
            var typeFilter = function (tip) {
                return tip.node === node && tip.tooltip.getAttribute('class').split(' ')[1] === 'tooltip-' + type;
            };
            var fullFilter = function (tip) {
                return tip.node === node && tip.text === text && tip.tooltip.getAttribute('class').split(' ')[1] === 'tooltip-' + type;
            };
            
            var index = window.TooltipModule.tooltips.findIndex(fullFilter);
            if (index === -1) index = window.TooltipModule.tooltips.findIndex(typeFilter);
            if (index === -1) index = window.TooltipModule.tooltips.findIndex(defaultFilter);
            if (index === -1) return false;
            
            var tip = window.TooltipModule.tooltips[index];
            if (!tip) return false;
            
            var events = ['mouseenter.tooltip', 'mouseleave.tooltip'];
            for (var i = 0, len = events.length; i < len; i++) DOMTools.off(tip.node, events[i]);
            
            if (document.contains(tip.tooltip)) tip.parentElement.removeChild(tip.tooltip);
            window.TooltipModule.tooltips.splice(index, 1);
            
            return true;
        }
        
        function removeTooltips () {
            var tips = window.TooltipModule.tooltips ? window.TooltipModule.tooltips : $$('.tooltip'),
                tip, len = tips.length, i, j, type, event, ten;
            
            if (!len) return false;
            
            i = 0; type = ['mouseenter.tooltip', 'mouseleave.tooltip'];
            for (i; i < len; i++) {
                tip = tips[i];
                j = 0; ten = type.length;
                for (j; j < ten; j++) {
                    event = type[j];
                    DOMTools.off(tip.node, event);
                }
                if (document.contains(tip.tooltip)) tip.tooltip.parentElement.removeChild(tip.tooltip);
            }
            
            return (window.TooltipModule.tooltips.length = 0, true);
        }
        
        function removeTooltipCss () {
            var css = document.getElementById('TooltipColorCss');
            var remove = function (child) {
                return child.parentElement.removeChild(child);
            };
            if (document.contains(css)) return remove(css) && true;
            return false;
        }
        
        function profileTagTooltips () {
            var profile = $_('.UserProfileMasthead');
            if (!profile) return;
            
            var tags = $$('.tag'),
                tips = window.TooltipModule.tooltips;
                
            var def = {
                'Founder': 'Wiki Creator',
                'Admin': 'Wiki Administration',
                'Administrator': 'Wiki Administration',
                'Bureaucrat': 'Wiki Administration',
                'Chat Moderator': 'Wiki Moderator',
                'Chat moderator': 'Wiki Moderator',
                'Content Moderator': 'Wiki Moderator',
                'Discussions Moderator': 'Wiki Moderator',
                'Wiki Manager': 'Fandom Staff',
                'Staff': 'Fandom Staff'
            };
            
            var tagList = Object.assign({}, { 'default': def });
            
            if (window.tagList) tagList = Object.assign(window.tagList, tagList);
            
            if (!tags.length) return false;
            
            for (var i = 0, len = tags.length; i < len; i++) {
                var text = tags[i].textContent;
                var tiptext, defaults;
                
                if (text.length) {
                    tiptext = has.call(tagList, text)
                        ? tagList[text]
                        : '';
                        
                    defaults = has.call(tagList['default'], text)
                        ? tagList['default'][text]
                        : '';
                }
                
                if (tiptext.length) tooltip(tags[i], tiptext, 'top');
                if (defaults.length) tooltip(tags[i], defaults, 'top');
            }
            
            return true;
        }
        
        function addTipContainer () {
            var el = document.getElementById('tooltips');
            if (el) return false;
            var container = $e('div', { id: 'tooltips' });
            return (document.body.appendChild(container), true);
        }
        
        function removeTipContainer () {
            var el = document.getElementById('tooltips');
            if (!el) return false;
            return (el.parentElement.removeChild(el), true);
        }
        
        /**
         * Init and expose tooltips and tooltip functions
         */
        window.TooltipModule = {
            addTipContainer: addTipContainer,
            removeTipContainer: removeTipContainer,
            initTooltips: profileTagTooltips,
            removeTooltips: removeTooltips,
            injectTooltipCSS: injectCss,
            removeTooltipCSS: removeTooltipCss,
            removeTooltip: removeTooltip,
            Tooltip: tooltip
        };
        Object.defineProperty(window.TooltipModule, 'tooltips', {
            enumerable: true,
            configurable: false,
            value: tooltipStorage
        });
        window.TooltipModule.addTipContainer();
        window.TooltipModule.injectTooltipCSS();
        window.TooltipModule.initTooltips();
    }
    
    importArticles({
        type: 'script',
        articles: ['u:bloodborne:DOMTools.js']
    });
    
    ready(run);
})();

/*@end@*/
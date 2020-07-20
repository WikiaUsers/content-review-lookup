/**
 * Local fixes for the syntax highlighting on JS codeblocks.
 */
'use strict';

;(function() {
    var has = Object.prototype.hasOwnProperty;
    
    function waitUntilReady() {
        if (document.readyState !== 'complete') return setTimeout(waitUntilReady, 1000);
        setTimeout(fixHighlights, 0);
    }
    
    function fixHighlights() {
        first();
        second();
    }
    
    function createElement(type, props) {
        var errMsg = 'Expected: string, object. Received: {{t}}, {{p}}.';
        
        if (typeof type !== 'string' || typeof props !== 'object') {
            errMsg = errMsg
                .replace(/{{t}}/, typeof type)
                .replace(/{{p}}/, typeof props);
            
            throw new TypeError(errMsg);
        }
        
        function addPropsTo(element) {
            var keys = Object.keys(props);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                var data = props[key];
                if (!key || !data) continue;
                element[key] = data;
            }
            return element;
        }
        
        var element = document.createElement(type);
        
        return addPropsTo(element);
    }
    
    function first() {
        function loop(e) {
            var text = e.textContent,
                word = getWord(text);
            
            if (word && e.classList && !e.classList.contains(word)) e.classList.add(word);
            else if (e.classList && text.toLowerCase() === 'hasownproperty') e.classList.add('ownProp');
        }
    
        function getWord(text) {
            if (has.call(keywords, text)) return keywords[text];
            return null;
        }
        
        var selectors = [
            '.kw1',
            '.kw3',
            '.kw4',
            '.sy0'
        ],
            keywords = {
            'instanceof': 'instanceof',
            'prototype': 'prote',
            'typeof': 'typeof',
            'this': 'this',
            'new': 'new',
            'in': 'in',
            '=>': 'aF',
            '$': 'jQ'
        };
        
        for (var i = 0, len = selectors.length; i < len; i++) {
            var elements = document.querySelectorAll('.javascript.source-javascript ' + selectors[i]);
            if (!elements.length) continue;
            for (var j = 0, ren = elements.length; j < ren; j++) loop(elements[j]);
        }
    }
    
    function second() {
        function hasLineNumbers(codeblock) {
            return Boolean(codeblock.querySelector('.lineNumbers'));
        }
        
        function colourNumberedBlock(codeblock) {
            if (!codeblock) return;
            var startPoint = codeblock.querySelector('.lineNumbers');
            one: for (var i = 0, len = startPoint.childNodes.length; i < len; i++) {
                var li = startPoint.childNodes[i];
                if (!li) continue one;
                two: for (var j = 0, nodes = li.childNodes, ken = nodes.length; j < ken; j++) {
                    var node = nodes[j];
                    if (!node || (!node.data && !node.textContent)) continue two;
                    if (node.textContent && !node.data) {
                        if (isPromise(node)) handlePromise(node);
                        continue;
                    }
                    if (!arr.includes(node.data.trim())) {
                        if (isFunctionName(node)) {
                            handleFunctionName(node);
                            continue;
                        }
                    }
                    if (isNotJQuery(node)) {
                        handle$$(node);
                        continue two;
                    } else if (isConsole(node)) {
                        handleConsole(node);
                        continue;
                    } else if (isJSON(node)) {
                        handleJSON(node);
                        continue;
                    }
                    handleNode(node);
                }
            }
        }
        
        function colourBlock(codeblock) {
            if (!codeblock.childNodes.length) return;
            for (var i = 0, len = codeblock.childNodes.length; i < len; i++) {
                var child = codeblock.childNodes[i];
                if (!child || (!child.data && !child.textContent)) continue;
                if (child.textContent && !child.data) {
                    if (isPromise(child)) handlePromise(child);
                    continue;
                }
                if (!arr.includes(child.data.trim())) {
                    if (isFunctionName(child)) {
                        handleFunctionName(child);
                        continue;
                    }
                }
                if (isNotJQuery(child)) {
                    handle$$(child);
                    continue;
                }
                if (isConsole(child)) {
                    handleConsole(child);
                    continue;
                }
                if (isJSON(child)) {
                    handleJSON(child);
                    continue;
                }
                handleNode(child);
            }
        }
        
        function replaceHexClass(node) {
            if (!node || !regex.test(node.textContent)) return;
            node.classList.replace('re0', hexClass);
        }
        
        function fixCSSHexes(codeblock) {
            var targets = document.querySelectorAll('.re0');
            var len = targets.length;
            for (var i = 0; i < len; i++) replaceHexClass(targets[i]);
        }
            
        function getKw(text) {
            var keyword, val, len, kws, i;
            
            kws = Object.keys(keywords);
            
            for (i = 0, len = kws.length; i < len; i++) {
                keyword = kws[i];
                val = keywords[keyword];
                if (val.includes(text)) return keyword;
            }
            
            return null;
        }
        
        function isNotJQuery(node) {
            return node.data === '$' && node.previousSibling && node.previousSibling.textContent === '$';
        }
        
        function isJQuery(node) {
            return node.data === '$' && node.previousSibling && node.previousSibling.textContent !== '$';
        }
        
        function isConsole(node) {
            return node.data.trim() === 'console.';
        }
        
        function isPromise(node) {
            return node.textContent && node.textContent.trim() === 'Promise.';
        }
        
        function isJSON(node) {
            return node.data.trim() === 'JSON.';
        }
        
        function isFunctionName(node) {
            var prev = node.previousSibling && node.previousSibling.textContent === 'function' && node.previousSibling.className === 'kw1';
            var next = node.nextSibling && node.nextSibling.textContent === '(' && node.nextSibling.className === 'br0';
            return prev && next;
        }
        
        function handle$$(node) {
            var element = createElement('span', {
                className: getKw('$$'),
                textContent: '$$'
            });
            node.previousSibling.parentElement.removeChild(node.previousSibling);
            node.replaceWith(element);
        }
        
        function handleNode(node) {
            var element = createElement('span', {
                className: getKw(node.data.trim()),
                textContent: node.data
            });
            node.replaceWith(element);
        }
        
        function handleConsole(node) {
            var consoleNode = createElement('span', {
                className: 'kw4',
                textContent: node.data.split('.')[0]
            });
            var dotNode = document.createTextNode('.');
            node.replaceWith(consoleNode, dotNode);
        }
        
        function handlePromise(node) {
            var promiseNode = createElement('span', {
                className: 'kw4',
                textContent: node.textContent.split('.')[0]
            });
            var dotNode = document.createTextNode('.');
            node.replaceWith(promiseNode, dotNode);
        }
        
        function handleJSON(node) {
            var JSONNode = createElement('span', {
                className: 'kw2',
                textContent: node.data.split('.')[0]
            });
            var dotNode = document.createTextNode('.');
            node.replaceWith(JSONNode, dotNode);
        }
        
        function handleFunctionName(node) {
            var element = createElement('span', {
                className: 'me1',
                textContent: node.data
            });
            node.replaceWith(element);
        }
        
        function processBlock(codeblock) {
            if (hasLineNumbers(codeblock)) return colourNumberedBlock(codeblock);
            colourBlock(codeblock);
        }
        
        function handleCSSBlocks() {
            var len = cssblocks.length;
            for (var i = 0; i < len; i++) fixCSSHexes(cssblocks[i]);
        }
        
        function handleJSBlocks() {
            var len = jsblocks.length;
            for (var i = 0; i < len; i++) processBlock(jsblocks[i]);
        }
        
        var selectors = {
            js: [
                'pre.javascript.source-javascript,',
                'div.javascript.source-javascript',
                '.de1'
            ],
            css: [
                'pre.css.source-css,',
                'div.css.source-css',
                '.de1'
            ]
        };
        
        var jsblocks = document.querySelectorAll(selectors.js.join(' '));
        var cssblocks = document.querySelectorAll(selectors.css.join(' '));
        
        var keywords = {
            'br0': [
                '$$',
                '...',
                'typeof',
                'instanceof'
            ],
            'kw4': [
                'Error',
                'console',
                'Promise',
                'RangeError',
                'TypeError',
                'SyntaxError',
                'ReferenceError',
                'XMLHttpRequest',
                'MutationObserver'
            ],
            'kw1': ['with'],
            'kw1 this': ['arguments'],
            'kw2': ['JSON']
        };
        
        var arr = [
            '$',
            '...',
            'with',
            'JSON',
            'typeof',
            'console',
            'arguments',
            'instanceof',
            'Error',
            'Promise',
            'TypeError',
            'RangeError',
            'SyntaxError',
            'ReferenceError',
            'XMLHttpRequest',
            'MutationObserver'
        ];
        
        var hexClass = 'nu0';
        
        var regex = /^#(\w{3,6}|\d{3,6}|((\w{1,2}|\d{1,2})(\w{1,2}|\d{1,2})(\w{1,2}|\d{1,2})))$/i;
        
        handleCSSBlocks();
        handleJSBlocks();
    }
    
    waitUntilReady();
})();

/*@end@*/
/**
 * Adds numbers to each line of code in a codeblock.
 * // current update is for mw version `1.39.3`
 * @name CodeblockLineNumbers
 * @author Arashiryuu0
 * @version 1.2.4
 * Last modified: 1682579289295
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

/*
	globals
	Symbol
*/

;(function (mw) {
    'use strict';
	
    if (window.dev && window.dev.CodeblockLineNumbers) return;
    
    var classes = [
		'lineNumbers',
		parseInt(mw.config.get('wgVersion').split('.')[1]) < 37
			? null
			: 'obs'
	].filter(Boolean);
	
    var codeblocks = [
        ['de1', 'hljs'],
        ['theme-solarized-light', 'theme-solarized-dark'],
        ['.mw-highlight pre', 'code pre', '.pi-data-value pre']
    ],
        slice = Array.prototype.slice,
        ourblocks = slice.call(document.querySelectorAll('pre'));
	
    if (!ourblocks.length) return;
	
    window.importArticles({
        type: 'style',
        articles: ['u:dev:MediaWiki:CodeblockLineNumbers.css']
    });
	
    function noOl (codeblock) {
        return !codeblock.querySelector('ol');
    }
	
    function mapLine (line) {
        if (!!line) return '<li>' + line + '</li>';
    }
	
    function addLines (codeblock) {
        codeblock.innerHTML = codeblock.innerHTML
            .split('\n')
            .map(mapLine)
            .join('');

        return codeblock;
    }
	
    function ourFilter (codeblock) {
        var hasId = function () {
            return codeblocks[1].includes(codeblock.getAttribute('id'));
        };
        var hasClass = function () {
            return codeblocks[0].some(function (name) {
                return codeblock.classList && codeblock.classList.contains(name);
            });
        };
        var ucpBlock = function () {
            return codeblocks[2].some(function (selector) {
                return codeblock.matches(selector);
            });
        };
		
        if (codeblock.tagName === 'PRE' && codeblock.parentElement.tagName !== 'PRE') {
            return hasId() || hasClass() || ucpBlock();
        }
		
        return false;
    }
	
    function combineFilters () {
        var filters = slice.call(arguments);
        return function (codeblock) {
            var callback = function (filter) {
                return filter(codeblock);
            };
            return filters.every(callback);
        };
    }
	
    function wrapInner (parent, wrapper) {
        if (typeof wrapper === 'string') wrapper = document.createElement(wrapper);
		
        parent.appendChild(wrapper);
		
        while (parent.firstChild !== wrapper) wrapper.appendChild(parent.firstChild);
    }
	
    function isCommentStart (child) {
        return child.textContent.trim().startsWith('/*');
    }
	
    function isInlineComment (child) {
        var blockClasses = ['coMULTI', 'hljs-comment'],
            hasClass = function () {
                var a = Boolean(child.className) && blockClasses.includes(child.className),
                    b = Boolean(child.firstElementChild) 
                        && blockClasses.includes(child.firstElementChild.className);
                return a || b;
            },
            starts = child.textContent.trim().startsWith('/*'),
            ends = child.textContent.trim().endsWith('*/');
        return (hasClass() && starts && ends) || starts && ends; // jshint ignore: line
    }
	
    function getEndIndex (i) {
        return function (child, ind) {
            var greater = ind > i,
                trimmed = child.textContent.trim(),
                ends = trimmed[0] === '*' && trimmed.endsWith('*/');
				
            return Boolean(greater && ends);
        };
    }
	
    function mapSlicedChildren (child) {
        return child.cloneNode(true);
    }
	
    function createUL () {
        var ul = document.createElement('ul');
        ul.classList.add('no-list');
        return ul;
    }
	
    function remove (t) {
        t.parentElement.removeChild(t);
    }
	
    function filterSliced (group) {
        return function (children, index) {
            var a = index >= group.start || index <= group.end,
                b = children.tagName !== 'UL';
            return a && b;
        };
    }
	
    function addCommentGroup (codeblock, group) {
        var children, filtered, fn, end, pe, cn;
		
        pe = codeblock.parentElement;
        cn = pe.className === 'de1' || pe.getAttribute('id');
		
        group.parent.classList.add(cn ? 'coMULTI' : 'hljs-comment');
        for (var i = 0, len = group.children.length; i < len; i++) {
            group.parent.appendChild(group.children[i]);
        }
		
        end = codeblock.children[group.end];
		
        if (codeblock.children.length - 1 === group.end) {
            codeblock.appendChild(group.parent);
        } else if (end) {
            end.insertAdjacentElement('afterend', group.parent);
        }
		
        fn = filterSliced(group);
        children = slice.call(codeblock.children);
        filtered = children.slice(group.start, group.end + 1).filter(fn);
		
        for (i = 0, len = filtered.length; i < len; i++) {
            remove(filtered[i]);
        }
    }
	
    function parseComments (codeblock) {
        var groups = [],
            children = slice.call(codeblock.children),
            sliced;
			
        for (var i = 0, len = children.length; i < len; i++) {
            var start = 0, end = 0, child = children[i];
            if (!isCommentStart(child) || isInlineComment(child)) continue;
			
            start = i;
            end = children.findIndex(getEndIndex(start));
            sliced = children.slice(start, end + 1).map(mapSlicedChildren);
			
            groups.push({
                start: start,
                end: end,
                parent: createUL(),
                children: sliced
            });
        }
		
        if (!groups.length) return;
		
        for (i = groups.length - 1, len = 0; i >= len; i--) {
            addCommentGroup(codeblock, groups[i]);
        }
    }
	
    function match (block, selector) {
        return block.matches(selector);
    }
	
    function processCodeblock (block) {
        if (block.querySelector('ol.lineNumbers')) return;
		
        var ol = document.createElement('ol'),
            matched = match(block, codeblocks[2][1]),
            ignore = match(block, codeblocks[2][2]);
		
        if (ignore) return;
			
        ol.classList.add.apply(ol.classList, classes);
        if (!block.parentElement.classList.contains('mw-highlight-lines')) ol.classList.remove('obs');
        /**
         * weird edge-case, <syntaxhighlight line> element but doesn't render any linenos?
         * see Luxon for reference {@link https://sky-children-of-the-light.fandom.com/wiki/MediaWiki:Luxon.js}
         */
        if (block.matches('.mw-highlight-lines pre') && !block.querySelector('.linenos')) ol.classList.remove('obs');
        wrapInner(addLines(block), ol);
        
        /** remove empty trailing <li>s */
        if (!ol.lastElementChild.childNodes.length) ol.removeChild(ol.lastElementChild);
		
        if (matched || !mw.user.getRights) parseComments(ol);
    }
	
    function processCodeblocks () {
        var filtered = ourblocks.filter(combineFilters(noOl, ourFilter)),
            len = filtered.length;
			
        if (!len) return;
		
        for (var i = 0; i < len; i++) processCodeblock(filtered[i]);
    }
	
    var defaults = {
        ready: true
    };
	
    var obj = {
        processBlock: processCodeblock,
        process: processCodeblocks,
        settings: Object.assign({}, defaults, window.CodeblockLinesConfig)
    };
	
    Object.defineProperty(obj, Symbol.toStringTag, {
        configurable: false,
        writable: false,
        value: 'CodeblockLineNumbers'
    });
	
    Object.freeze(obj);
	
    window.dev = window.dev || {};
    window.dev.CodeblockLineNumbers = obj;
	
    function fire () {
        var lines = window.dev.CodeblockLineNumbers;
        var settings = lines.settings;
		
        if (typeof settings.delay === 'number' && !Number.isNaN(settings.delay) && settings.delay >= 0) {
            setTimeout(lines.process, settings.delay);
        } else if (typeof settings.loadAction === 'function') {
            settings.loadAction(lines);
        } else if (settings.ready) {
            lines.process();
        }
		
        mw.hook('dev.CodeblockLineNumbers').fire(lines);
    }
	
    function ready () {
        if (document.readyState !== 'complete') return setTimeout(ready, 1000);
        setTimeout(fire, 1);
    }
    
    ready();
})(window.mediaWiki);
	
/*@end@*/
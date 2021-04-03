/**
 * Any JavaScript here will be loaded for all users on every page load.
 */
	
// jshint browser: true, devel: true, jquery: true
// jshint strict: true, freeze: true, eqeqeq: true, futurehostile: true
// jshint newcap: true, noarg: true, quotmark: single, shadow: outer
// jshint latedef: true, undef: true, unused: true
/* globals mw */
	
/**
 * IIFE wrapped to avoid polluting the global scope.
 * Waits for everything to finish loading before initialising.
 */
;(function () {
	'use strict';
	
    var has = Object.prototype.hasOwnProperty, // jshint ignore: line
        slice = Array.prototype.slice,
        levels = ['log', 'warn', 'info', 'debug', 'error'];
    
    function getLevel (level) {
        if (typeof level !== 'string' && typeof level !== 'number') return 'log';
        if (typeof level === 'number') return levels[level] || 'log';
        return levels.includes(level) && level || 'log';
    }
    
    function log (level, name) {
        var parts = [
        	'%c[' + name + ']%c \u2014 %s',
        	'color: #F95479; font-weight: 700;',
        	'',
        	new Date().toUTCString()
        ];
        level = getLevel(level);
        return function () {
        	var args = slice.call(arguments);
        	console.group.apply(null, parts);
        	console[level].apply(null, args);
        	console.groupEnd();
        };
    }
    
    function init () {
    	mw.hook('DOMTools').add(function (DOMTools) {
    		/**
	         * Collapsible Tables
	         */
	        ;(function () {
	            var tables, $elems, len, i, t;
	            
	            function collapseText (table) {
	                return table.classList && table.classList.contains('collapsed')
	                    ? 'show'
	                    : 'hide';
	            }
	            
	            function collapseTable (link, table) {
	                $elems = $(table.querySelector('td').parentElement);
	                
	                if (table.classList.contains('collapsed')) {
	                    $elems.show();
	                    table.classList.remove('collapsed');
	                    link.textContent = collapseText(table);
	                    return;
	                }
	                
	                $elems.hide();
	                table.classList.add('collapsed');
	                link.textContent = collapseText(table);
	            }
	            
	            function handleTable (link, table, event) {
	                event.preventDefault();
	                collapseTable(link, table);
	            }
	            
	            function appendCollapseLink (table) {
	                if (!table) return;
	                
	                var th = table.querySelector('th'),
	                    hs, el, link;
	                
	                if (!th) return;
	                
	                hs = collapseText(table);
	                
	                link = document.createElement('a');
	                link.href = '#';
	                link.textContent = hs;
	                link.addEventListener('click', handleTable.bind(null, link, table), false);
	                
	                el = document.createElement('span');
	                el.className = 'collapseLink';
	                el.appendChild(document.createTextNode('['));
	                el.appendChild(link);
	                el.appendChild(document.createTextNode(']'));
	                
	                th.appendChild(el);
	                
	                if (table.classList && table.classList.contains('collapsed')) {
	                    table.querySelector('td').parentElement.style.display = 'none';
	                }
	            }
	            
	            tables = document.querySelectorAll('table.collapsible');
	            len = tables.length;
	            
	            if (!len) return;
	            
	            for (i = 0; i < len; i++) {
	                t = tables[i];
	                appendCollapseLink(t);
	            }
	        })();
	        /**
	         * Highlight-js codeblock highlighting
	         */
	        ;(function () {
	            var onError = log('error', 'Highlight-JS');
	            
	            function addLines (ln) {
	                ln.process();
	            }
	            
	            function start (hljs) {
	                hljs.initHighlighting();
	                mw.hook('dev.CodeblockLineNumbers').add(addLines);
	                return hljs;
	            }
	            
	            function buttonClick (button, hljs) {
	            	return function (hljsm) { // jshint ignore: line
		                var theme = button.getAttribute('data-theme');
		                if (!theme) return;
		                hljs.useTheme(theme);
	            	};
	            }
	            
	            function listenOnButtons (hljs) {
	                var buttons = DOMTools.queryAll('.codeblock-theme-button'), bound;
	                if (!buttons.length) return;
	                buttons.forEach(function (button) {
	                    bound = buttonClick(button, hljs);
	                    DOMTools.on(button, 'click.codeThemeBtn', bound);
	                });
	            }
	            
	            function highlight (hljs) {
	                hljs.useTheme('vs2015');
	                hljs.loadAllLanguages()
	                    .then(start, onError)
	                    .then(listenOnButtons, onError)
	                    .fail(onError);
	            }
	            
	            mw.hook('dev.highlight').add(highlight);
	        })();
    	});
    }
        
    function wait () {
    	if (document.readyState !== 'complete') return setTimeout(wait, 1000);
        setTimeout(init, 0);
    }
    
    mw.config.get('wgVersion') === '1.19.24'
    	? window.addOnloadHook(wait)
    	: wait();
})();
	
/*@end@*/
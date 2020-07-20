/**
 * Any JavaScript here will be loaded for all users on every page load.
 */

/**
 * IIFE wrapped to avoid polluting the global scope.
 * Waits for everything to finish loading before initialising.
 */
;(function() {
    var has = Object.prototype.hasOwnProperty,
        slice = Array.prototype.slice,
        levels = ['log', 'warn', 'info', 'debug', 'error'];
    
    function getLevel(level) {
        if (typeof level !== 'string' && typeof level !== 'number') return 'log';
        if (typeof level === 'number') return levels[level] || 'log';
        return levels.includes(level) && level || 'log';
    }
    
    function log(level, name) {
        var args = slice.call(arguments, 1);
        args.unshift('%c[' + name + ']', 'color: #F95479; font-weight: 700;');
        level = getLevel(level);
        return console[level].apply(this, args);
    }
        
    function wait() {
        if (!has.call(window, 'DOMTools')) return setTimeout(wait, 1000);
        init();
    }
    
    function init() {
        /**
         * Collapsible Tables
         */
        ;(function() {
            var tables, $elems, len, i, t;
            
            tables = document.querySelectorAll('table.collapsible');
            len = tables.length;
            
            if (!len) return;
            
            i = 0;
            
            for (i; i < len; i++) {
                t = tables[i];
                appendCollapseLink(t);
            }
            
            function appendCollapseLink(table) {
                if (!table) return;
                
                var th = table.querySelector('th'),
                    hs, el, link;
                
                if (!th) return;
                
                hs = collapseText(table);
                
                link = document.createElement('a');
                link.href = '#';
                link.textContent = hs;
                link.addEventListener('click', handleTable.bind(link, table), false);
                
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
            
            function collapseText(table) {
                return table.classList && table.classList.contains('collapsed')
                    ? 'show'
                    : 'hide';
            }
            
            function handleTable(table, event) {
                event.preventDefault();
                collapseTable(this, table);
            }
            
            function collapseTable(link, table) {
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
        })();
        /**
         * Highlight-js codeblock highlighting
         */
        ;(function() {
            var onError = log.bind(null, 'error', 'Highlight-JS');
            
            function addLines(ln) {
                ln.process();
            }
            
            function start(hljs) {
                hljs.initHighlighting();
                mw.hook('dev.CodeblockLineNumbers').add(addLines);
                return hljs;
            }
            
            function buttonClick(hljs, e) {
                var theme = this.getAttribute('data-theme');
                if (!theme) return;
                hljs.useTheme(theme);
            }
            
            function listenOnButtons(hljs) {
                var buttons = DOMTools.queryAll('.codeblock-theme-button'), bound;
                if (!buttons.length) return;
                buttons.forEach(function(button) {
                    bound = buttonClick.bind(button, hljs);
                    DOMTools.on(button, 'click.codeThemeBtn', bound);
                });
            }
            
            function highlight(hljs) {
                hljs.useTheme('vs2015');
                hljs.loadAllLanguages()
                    .then(start, onError)
                    .then(listenOnButtons, onError)
                    .fail(onError);
            }
            
            mw.hook('dev.highlight').add(highlight);
        })();
    }
    
    addOnloadHook(wait);
})();

/*@end@*/
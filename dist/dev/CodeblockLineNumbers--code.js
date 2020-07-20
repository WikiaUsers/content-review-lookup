/**
 * Adds numbers to each line of code in a codeblock.
 * 
 * @name CodeblockLineNumbers
 * @author Arashiryuu0
 */
require(['mw'], function(mw) {
    if (window.dev && window.dev.CodeblockLineNumbers) return;
    
    var codeblocks = ['de1', 'hljs', 'theme-solarized-light', 'theme-solarized-dark'],
        slice = Array.prototype.slice,
        ourblocks = slice.call(document.querySelectorAll('pre'));
        
    if (!ourblocks.length) return;
    
    importArticles({
        type: 'style',
        articles: ['u:dev:MediaWiki:CodeblockLineNumbers.css']
    });
    
    function noOl(codeblock) {
        return !codeblock.querySelector('ol');
    }
    
    function mapLine(line) {
        if (!!line) return '<li>' + line + '</li>';
    }
    
    function addLines(codeblock) {
        codeblock.innerHTML = codeblock.innerHTML
            .split('\n')
            .map(mapLine)
            .join('');
        
        return codeblock;
    }
    
    function ourFilter(codeblock) {
        var bool = false;
        
        if (codeblock.tagName === 'PRE' && codeblock.parentElement.tagName !== 'PRE') {
            if (codeblocks.includes(codeblock.getAttribute('id'))) {
                bool = true;
                return bool;
            }
            
            bool = codeblock.classList
                ? codeblocks.includes(codeblock.classList[0])
                : false;
        }
        
        return bool;
    }
    
    function combineFilters(f1, f2) {
        return function(codeblock) {
            return f1(codeblock) && f2(codeblock);
        };
    } 
    
    function wrapInner(parent, wrapper) {
        if (typeof wrapper === 'string') wrapper = document.createElement(wrapper);
        
        parent.appendChild(wrapper);
        
        while (parent.firstChild !== wrapper) wrapper.appendChild(parent.firstChild);
    }
    
    function isCommentStart(child) {
        return child.textContent.trim().startsWith('/*');
    }
    
    function isInlineComment(child) {
        var classes = ['coMULTI', 'hljs-comment'],
            hasClass = classes.includes(child.className) || child.firstElementChild 
                ? classes.includes(child.firstElementChild.className)
                : false,
            starts = child.textContent.trim().startsWith('/*'),
            ends = child.textContent.trim().endsWith('*/');
        
        return hasClass && starts && ends;
    }
    
    function getEndIndex(i, child, ind) {
        var greater = ind > i,
            starts = child.textContent.trim().startsWith('*/');
        
        return greater && starts;
    }
    
    function mapSlicedChildren(child) {
        return child.cloneNode(true);
    }
    
    function createUL() {
        var ul = document.createElement('ul');
        ul.classList.add('no-list');
        return ul;
    }
    
    function parseComments(codeblock) {
        var groups = [],
            children = slice.call(codeblock.children),
            sliced, bound;
        
        for (var i = 0, len = children.length; i < len; i++) {
            var start = 0, end = 0, child = children[i];
            if (!isCommentStart(child) || isInlineComment(child)) continue; 
            
            start = i;
            end = children.findIndex(getEndIndex.bind(null, start));
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
    
    function addCommentGroup(codeblock, group) {
        var children, filtered, bound, add, end, pe, cn;
        
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
        
        children = slice.call(codeblock.children);
        bound = filterSliced.bind(null, group);
        filtered = children.slice(group.start, group.end + 1).filter(bound);
        
        for (i = 0, len = filtered.length; i < len; i++) {
            remove(filtered[i]);
        }
    }
    
    function processCodeblocks() {
        var filtered = ourblocks.filter(combineFilters(noOl, ourFilter)),
            len = filtered.length, ol, i;
        
        if (!len) return;
        
        for (i = 0; i < len; i++) {
            ol = document.createElement('ol');
            ol.setAttribute('class', 'lineNumbers');
            
            wrapInner(addLines(filtered[i]), ol);
            parseComments(ol);
        }
    }
    
    function remove(t) {
        t.parentElement.removeChild(t);
    }
    
    function filterSliced(group, children, index) {
        return (index >= group.start || index <= group.end) && children.tagName !== 'UL';
    }
    
    window.dev = window.dev || {};
    window.dev.CodeblockLineNumbers = { process: processCodeblocks };
    
    window.dev.CodeblockLineNumbers.process();
    mw.hook('dev.CodeblockLineNumbers').fire(window.dev.CodeblockLineNumbers);
});

/*@end@*/
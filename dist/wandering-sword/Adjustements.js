var btn = document.querySelector('.content-size-toggle');
var toc = document.querySelector('#toc');
var cols = document.querySelector('.companion-columns');

if (btn) {
    function applyCollapseState() {
        var isCollapsed = btn.getAttribute('aria-label') === 'Expand';
        if (toc) {
            if (isCollapsed) toc.classList.add('toc-collapsed');
            else toc.classList.remove('toc-collapsed');
        }
        if (cols) {
            if (isCollapsed) cols.classList.add('cols-collapsed');
            else cols.classList.remove('cols-collapsed');
        }
    }

    new MutationObserver(applyCollapseState).observe(btn, { attributes: true, attributeFilter: ['aria-label'] });

    applyCollapseState();
}
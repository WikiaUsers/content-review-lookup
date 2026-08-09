(function() {
    'use strict';

    function initPkToggle() {
        if (document.querySelector('.pk-infobox-toggle-btn')) return;

        var btn = document.createElement('div');
        btn.className = 'pk-infobox-toggle-btn';
        btn.innerHTML = '<span style="position:relative;z-index:5;">\u2630</span>';
        btn.title = 'Toggle Infobox';
        document.body.appendChild(btn);

        btn.addEventListener('click', function() {
            var infobox = document.querySelector('.pk-infobox');
            if (!infobox) return;

            var isHidden = parseFloat(getComputedStyle(infobox).opacity) < 0.5;

            if (isHidden) {
                infobox.style.setProperty('opacity', '1', 'important');
                infobox.style.setProperty('pointer-events', 'auto', 'important');
                infobox.style.setProperty('animation', 'none', 'important');
                infobox.style.setProperty('z-index', '50', 'important');
            } else {
                infobox.style.setProperty('opacity', '0.04', 'important');
                infobox.style.setProperty('pointer-events', 'none', 'important');
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPkToggle);
    } else {
        initPkToggle();
    }

    if (window.mw && mw.hook) {
        mw.hook('wikipage.content').add(initPkToggle);
    }
})();
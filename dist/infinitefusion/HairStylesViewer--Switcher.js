// Template:HairStylesViewer/Switcher
(() => {
    const switcher = document.querySelector('.hair-styles-viewer-switcher');
    if(!switcher) return;
    const switcherButtons = Array.prototype.slice.call(switcher.querySelectorAll('.hair-style-switcher-button')).map((button, index) => {
        return {
            button: button,
            colorId: Number(button.getAttribute('data-color-id')),
        };
    });

    const viewers = Array.prototype.slice.call(document.querySelectorAll('.hair-styles-viewer')).map((viewer) => {
        return { container: viewer, styles: {} };
    });
    if(viewers.length <= 0) return;
    viewers.forEach((viewer) => {
        viewer.container.querySelectorAll(':scope > .mw-collapsible[id^="mw-customcollapsible-hairStyle_"]').forEach((collapsible) => {
            const matches = collapsible.id.match(/^mw-customcollapsible-hairStyle_(\d+)_/);
            if(matches) viewer.styles[matches[1]] = collapsible;           
        });
    });

    function showColor(color) {
        viewers.forEach((viewer) => {
            if(typeof viewer.styles[color] == 'undefined') return;
            for(const [id, style] of Object.entries(viewer.styles)) {
                if(id == color) {
                    style.classList.remove('mw-collapsed');
                    style.style.display = '';
                } else {
                    style.classList.add('mw-collapsed');
                    style.style.display = 'none';
                }
            }
        });
    }

    switcherButtons.forEach((button) => {
        if(!button.colorId
        || !viewers.some((viewer) => {
        	return typeof viewer.styles[button.colorId] !== 'undefined';
        })) {
        	button.button.remove();
        	return;
        }

        button.button.addEventListener('click', () => {
            showColor(button.colorId);
        });
    });
})();
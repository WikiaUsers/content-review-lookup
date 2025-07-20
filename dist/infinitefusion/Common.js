/* Any JavaScript here will be loaded for all users on every page load. */

/* ======================
   Template:GlobalToggles
   ====================== */
(() => {
	const globalToggles = document.getElementById('globalToggles');
	if(!globalToggles) return;
	
	const urlParams = new URLSearchParams(window.location.search);
	
	[
	    [ globalToggles.querySelector('#modeToggle'), 'modeToggle' ],
	    [ globalToggles.querySelector('#difficultyToggle'), 'difficultyToggle' ],
	].forEach(([ tabber, storageName, urlParam ]) => {
		tabber.querySelectorAll('.wds-tabs__tab').forEach((tab) => {
		    const value = tab.getAttribute('data-hash');
		    tab.addEventListener('click', () => { localStorage.setItem(storageName, value); });
		});

	    const currentTab = tabber.querySelector('.wds-tabs__tab.wds-is-current');
	    const urlValue = urlParams.get(storageName)
	    const initValue = urlValue || localStorage.getItem(storageName);
	    if(!initValue) {
	        localStorage.setItem(storageName, currentTab.getAttribute('data-hash'));
	        return;
	    }

	    const defaultTab = tabber.querySelector(`.wds-tabs__tab[data-hash="${initValue}"]`);
	    if(!defaultTab) return;
	    
	    localStorage.setItem(storageName, initValue);
	    
	    if(currentTab === defaultTab) return;
	
	    defaultTab.classList.add('wds-is-current');
	    currentTab.classList.remove('wds-is-current');
	});
})();

/* ==================================
   Template:HairStylesViewer/Switcher
   ================================== */
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
            };
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
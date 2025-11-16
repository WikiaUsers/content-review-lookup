// Template:GlobalToggles
(() => {
	const globalToggles = document.getElementById('globalToggles');
	if(!globalToggles) return;
	
	const urlParams = new URLSearchParams(window.location.search);
	
	[
	    [ globalToggles.querySelector('#modeToggle'), 'modeToggle' ],
	    [ globalToggles.querySelector('#difficultyToggle'), 'difficultyToggle' ],
	    [ globalToggles.querySelector('#e4RematchToggle'), 'e4RematchToggle' ],
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
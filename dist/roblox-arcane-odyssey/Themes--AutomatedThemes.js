/* Seasonal Themes */
let activeTheme = null;
const now = new Date();
const month = now.getMonth() + 1;
const day = now.getDate();
const hour = now.getHours();
let timeClass = null;

const defaultHomepageLogo = 'https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/3/3b/Logolast.png/revision/latest?cb=20221121011613&format=original';
const defaultSiteLogo = 'https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/e/e6/Site-logo.png/revision/latest?cb=20221121011328&format=original';
const halloweenLogo = 'https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/b/b0/Logolast_Halloween.png/revision/latest?cb=20261013164541&format=original';
const halloweenSiteLogo = 'https://static.wikia.nocookie.net/roblox-arcane-odyssey/images/0/0d/Site-logo_Halloween.png/revision/latest?cb=20261014095048&format=original';

/** Automated **/
function applyTheme(name) {
    document.body.classList.remove(
        'theme-halloween',
        'theme-christmas',
        'theme-newyear',
        'theme-easter'
    );
    document.body.classList.add(name);
    localStorage.setItem('selectedTheme', name);
}
function clearThemes() {
    document.body.classList.remove('theme-halloween', 'theme-christmas', 'theme-newyear', 'theme-easter');
    localStorage.removeItem('selectedTheme');
}
function isThemeDisabled() {
    return localStorage.getItem('themeDisabled') === 'true';
}
function updateLogos() {
	const isHomepage = mw.config.get('wgIsMainPage');
	const homepageLogo = isHomepage ? document.querySelector('#mw-content-text figure.mw-halign-center img') : null;
	const siteLogo = document.querySelector('img[data-test="fandom-community-header-community-logo"]') ;
	if (isThemeDisabled() || !activeTheme) {
        if (homepageLogo) homepageLogo.src = defaultHomepageLogo;
        if (siteLogo) siteLogo.src = defaultSiteLogo;
        return;
    }
	switch (activeTheme) {
	    case 'theme-halloween':
	    	if (homepageLogo) homepageLogo.src = halloweenLogo;
			if (siteLogo) siteLogo.src = halloweenSiteLogo;
	        break;
	    case 'theme-christmas':
	        if (homepageLogo) homepageLogo.src = christmasLogo;
			if (siteLogo) siteLogo.src = christmasSiteLogo;
	        break;
	    case 'theme-newyear':
	        if (homepageLogo) homepageLogo.src = newyearLogo;
			if (siteLogo) siteLogo.src = newyearSiteLogo;
	        break;
	    case 'theme-easter':
	        if (homepageLogo) homepageLogo.src = easterLogo;
			if (siteLogo) siteLogo.src = easterSiteLogo;
	        break;
	    default:
	    	break;
	}
}
$(function () {
	function isBetween(month, day, startMonth, startDay, endMonth, endDay) {
		const now = new Date();
		const year = now.getFullYear()
	    const date = new Date(year, month - 1, day);
	    let start = new Date(year, startMonth - 1, startDay);
	    let end = new Date(year, endMonth - 1, endDay);
	    if (end < start) {
	    	if (date < end) {
	    		start = new Date(year - 1, startMonth - 1, startDay);
	    	} else {
	    		end = new Date(year + 1, endMonth - 1, endDay);
	    	}
	    }
	    return date >= start && date <= end;
	}
	// Halloween : 25 oct → 5 nov
	if (isBetween(month, day, 10, 25, 11, 5)) {
		activeTheme = 'theme-halloween';
	}
	// Christmas : 18 → 30 dec
	if (isBetween(month, day, 12, 18, 12, 30)) {
		activeTheme = 'theme-christmas';
	}
	// New Year : 31 dec → 3 jan
	if (isBetween(month, day, 12, 31, 1, 3)) {
		activeTheme = 'theme-newyear';
	}
	// Easter : 8 → 15 apr
	if (isBetween(month, day, 4, 8, 4, 15)) {
		activeTheme = 'theme-easter';
	}
	if (activeTheme && !isThemeDisabled()) {
		applyTheme(activeTheme);
	}
	updateLogos();
	if (hour >= 0 && hour < 6) timeClass = 'theme-midnight';
	else if (hour >= 6 && hour < 12) timeClass = 'theme-morning';
	else if (hour >= 12 && hour < 18) timeClass = 'theme-afternoon';
	else timeClass = 'theme-night';
	document.body.classList.add(timeClass);
	/** Toggle Button **/
	if (activeTheme) {
		initThemeToggleButton(activeTheme);
	}
	function initThemeToggleButton(theme) {
		const btn = document.createElement('div');
		btn.id = 'theme-toggle';
		function refreshButton() {
			btn.textContent = isThemeDisabled() ? 'Enable theme' : 'Disable theme';
		}
		refreshButton();
		btn.onclick = () => {
			if (disabled) {
				localStorage.removeItem('themeDisabled');
				applyTheme(theme);
			} else {
				localStorage.setItem('themeDisabled', 'true');
				clearThemes()
			}
			updateLogos();
        	refreshButton();
		};
		document.body.appendChild(btn);
	}
});

$(function () {
	const theme = activeTheme;
	if(!theme) return;
	else {
		importScriptPage('MediaWiki:Themes/Effects/Panel.js');
		switch(activeTheme) {
			case 'theme-halloween':
				importScriptPage('MediaWiki:Themes/Effects/Halloween.js');
				break;
		}
	}
});
//Back to Top arrow
window.BackToTopModern = true;
window.BackToTopSpeed = 700;
window.BackToTopStart = 890;

//AddRailModule Config
window.AddRailModule = [{prepend: true}];

//Less Config
window.lessOpts = window.lessOpts || [];
window.lessOpts.push( {
	// this is the page that has the compiled CSS
	target: 'MediaWiki:Common.css',
	// this is the page that lists the LESS files to compile
	source: 'MediaWiki:Custom-common.less',
	// these are the pages that you want to be able to update the target page from
	// note, you should not have more than one update button per page
	load: [ 'MediaWiki:Common.css', 'MediaWiki:Custom-common.less' ],
	// target page header
	header: 'MediaWiki:Custom-css-header/common'
} );

// Simple Tabber
document.addEventListener("DOMContentLoaded", function() {
    const tabbers = document.querySelectorAll(".tabber");
    tabbers.forEach(tabber => {
        const tabs = tabber.querySelectorAll(".tabber-tab");
        const contents = tabber.querySelectorAll(".tabber-content");

        tabs.forEach((tab, i) => {
            tab.addEventListener("click", () => {
                tabs.forEach(t => t.classList.remove("active"));
                contents.forEach(c => c.style.display = "none");
                tab.classList.add("active");
                contents[i].style.display = "block";
            });
        });
    });
});


(function() {
    // Detect Fandom theme
    var isDark = document.body.classList.contains('theme-fandomdesktop-dark');

    // Show correct navigation
    var darkNav = document.getElementById('navigation-dark');
    var lightNav = document.getElementById('navigation-light');

    if (isDark) {
        if(darkNav) darkNav.style.display = 'block';
        if(lightNav) lightNav.style.display = 'none';
    } else {
        if(darkNav) darkNav.style.display = 'none';
        if(lightNav) lightNav.style.display = 'block';
    }

    // Optional: Listen for theme changes without page reload (Fandom SPA)
    var observer = new MutationObserver(function() {
        isDark = document.body.classList.contains('theme-fandomdesktop-dark');
        if(isDark) {
            if(darkNav) darkNav.style.display = 'block';
            if(lightNav) lightNav.style.display = 'none';
        } else {
            if(darkNav) darkNav.style.display = 'none';
            if(lightNav) lightNav.style.display = 'block';
        }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
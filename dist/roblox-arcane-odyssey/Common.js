/* Any JavaScript here will be loaded for all users on every page load. */
if (mw.config.get('wgPageName') === 'Damage_Calculation') {
	$(function () {
	        importScriptPage('MediaWiki:Calculators/DamageCalculator.js');
	});
}
/* Link Preview */
(function () {
    let lpLoaded = false;
    $(document).on('mouseenter', 'a[href*="/wiki/"]', function () {
        if (!lpLoaded) {
            lpLoaded = true;
            importScriptPage('LinkPreview/code.js', 'dev');
        }
    });
})();
window.pPreview = $.extend(true, window.pPreview, {
    container: '.mw-parser-output',
    tlen: 300,
    apid: true,
    pibox: false,
    RegExp: {
        onlyinclude: ['p:first-of-type'],
        noinclude: ['.navbox', '.toc']
    }
});

window.refPopups = {
    animate: true,
    fade: true,
    delay: 150,
    hideDelay: 200,
    offset: 15
};
/*Animate JS*/
(function() {
	var $animated = $('div#content').find( '.animated' ).addClass( 'animated-visible' );
	var animateds = [];
	$animated.each( function() {
		animateds.push( {
			$: $( this ).find( '> .animated-subframe' ).addBack()
				.find( '> *:not(.animated-subframe)' ),
		} );
	} );
	$.each( animateds, function() {
		var minHeight = 0, differentHeights;
		this.$.each( function() {
			var height = this.offsetHeight;
			differentHeights = differentHeights || minHeight && height !== minHeight;
			minHeight = Math.max( height, minHeight );
		} );
		
		if ( differentHeights ) {
			this.height = minHeight;
		}
	} );
	
	$animated.each( function( i ) {
		$( this ).css( 'min-height', animateds[i].height );
	} ).removeClass( 'animated-visible' );
}() );

$( function() {
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	var hidden; 
	if ( typeof document.hidden !== 'undefined' ) {
		hidden = 'hidden';
	} else if ( typeof document.msHidden !== 'undefined' ) {
		hidden = 'msHidden';
	} else if ( typeof document.webkitHidden !== 'undefined' ) {
		hidden = 'webkitHidden';
	}
	
	setInterval( function() {
		if ( hidden && document[hidden] ) {
			return;
		}
		$content.find( '.animated' ).each( function() {
			if ( $( this ).hasClass( 'animated-paused' ) ) {
				return;
			}
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );
} );
/* Seasonal Themes */
const themeDisabled = localStorage.getItem('themeDisabled') === 'true';
let activeTheme = null;
const now = new Date();
const month = now.getMonth() + 1;
const day = now.getDate();
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
if (activeTheme && !themeDisabled) {
	applyTheme(activeTheme);
}
/** Toggle Button **/
if (activeTheme) {
	initThemeToggleButton(activeTheme);
}
function initThemeToggleButton(theme) {
	const btn = document.createElement('div');
	btn.id = 'theme-toggle';
	const disabled = localStorage.getItem('themeDisabled') === 'true';
	btn.textContent = disabled ? 'Enable theme' : 'Disable theme';
	btn.onclick = () => {
		if (disabled) {
			localStorage.removeItem('themeDisabled');
			applyTheme(theme);
		} else {
			localStorage.setItem('themeDisabled', 'true');
			clearThemes()
		}
		btn.remove();
		initThemeToggleButton(theme);
	};
	document.body.appendChild(btn);
}
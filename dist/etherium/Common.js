/* Tabber hash links */
mw.loader.using('ext.Tabber', function() {
	if(location.hash != '' && location.hash != '#') {
		var id = 0;
		switch(location.hash.replace('#', '').toLowerCase()) {
			case 'consortium':
				id = 1;
				break;
			case 'intar':
				id = 2;
				break;
			case 'vectide':
				id = 3;
				break;
		}
		if(id != 0) {
			$('.tabberactive').removeClass('tabberactive');
			$('.tabbertab').hide();
			$('.tabberlive div:nth-child(' + (id + 1) + ')').show();
			$('.tabbernav li:nth-child(' + id + ')').addClass('tabberactive');
		}
	}

	$('.tabbernav a').click(function() {
		showTab($(this).attr('title'));
	});
});

function showTab(title) {
	location.hash = '#' + title;
	switch(title.toLowerCase()) {
		case 'consortium':
			id = 1;
			break;
		case 'intar':
			id = 2;
			break;
		case 'vectide':
			id = 3;
			break;
	}
	if(id != 0) {
		$('.tabberactive').removeClass('tabberactive');
		$('.tabbertab').hide();
		$('.tabberlive div:nth-child(' + (id + 1) + ')').show();
		$('.tabbernav li:nth-child(' + id + ')').addClass('tabberactive');
	}
}

/**
 * Special page reporting
 * 
 * @athor cblair91
 * @version 1.0
 */
( function ( $, mw) {
    var pages = [
        'BrokenRedirects',
        'DoubleRedirects',
        'Unusedcategories',
        'Unusedimages',
        'Wantedcategories',
        'Wantedfiles',
        'Wantedpages',
        'Wantedtemplates'
    ];
    function getPages( page ) {
        $.getJSON( '/api.php?action=query&list=querypage&qppage=' + page + '&qplimit=100&format=json', function ( data ) {
            $( '#' + page ).text( data.query.querypage.results.length );
        });
    }
    function apiQuery() {
        for ( var i = 0; i < pages.length; i++ ) {
            getPages( pages[i] );
        }
    }
    $( function() {
        if ( document.getElementsByClassName( 'specialMaintenance').length ) {
            apiQuery();
        }
        if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Specialpages' ) {
            $('#mw-content-text').before('<div id="spreport">' +
                '<div><a href="/Special:BrokenRedirects" title="Special:BrokenRedirects" target="_blank">Broken redirects (<span id="BrokenRedirects"></span>)</a> &bull; <a href="/Special:DoubleRedirects" title="Special:DoubleRedirects" target="_blank">Double redirects (<span id="DoubleRedirects"></span>)</a> &bull; <a href="/Special:Unusedcategories" title="Special:Unusedcategories" target="_blank">Unused categories (<span id="Unusedcategories"></span>)</a> &bull; <a href="/Special:Unusedimages" titl ="Unusedimages" target="_blank">Unused images (<span id="Unusedimages"></span>)</div>' +
                '<div><a href="/Special:Wantedcategories" title="Special:Wantedcategories" target="_blank">Wanted categories (<span id="Wantedcategories"></span>)</a> &bull; <a href="/Special:Wantedfiles" title="Special:Wantedfiles" target="_blank">Wanted files (<span id="Wantedfiles"></span>)</a> &bull; <a href="/Special:Wantedpages" title="Special:Wantedpages" target="_blank">Wanted pages (<span id="Wantedpages"></span>)</a> &bull; <a href="/Special:Wantedtemplates" titl ="Special:Wantedtemplates" target="_blank">Wanted templates (<span id="Wantedtemplates"></span>)</a></div>' +
            '</div>');
            apiQuery();
        }
    });
}( jQuery, mediaWiki ) );

;(function(mw) {
	if (!['Planets', 'Template:Planets'].includes(mw.config.get('wgPageName'))) return;
	function init() {
		var gameUniverse = document.getElementById('game_universe');
		var gameSwitch = document.querySelector('#view .switch');
		var gameSpan = document.querySelectorAll('#data > span');
		var solarSystem = document.getElementById('solar-system');

		if( window.innerWidth < 620 ) {
			gameUniverse.classList.remove('view-3D');
			gameUniverse.classList.add('view-2D');
			gameSwitch.classList.add('on');
			gameSwitch.classList.remove('off');
		}
		gameSwitch.addEventListener('click', function() {
			gameUniverse.classList.toggle('view-3D');
			gameUniverse.classList.toggle('view-2D');
			gameSwitch.classList.toggle('on');
			gameSwitch.classList.toggle('off');
		});
		gameSpan.forEach(function(value) {
			value.addEventListener('click', function() {
				solarSystem.classList = value.classList[0];
				gameSpan.forEach(function(value2) {
					if (value2.classList.contains('active')) {
						value2.classList.remove('active');
						return;
					}
				});
				value.classList.add('active');
			});
		});
	}
	// Execute script after page is loaded
	mw.hook('wikipage.content').add(init);
})(window.mediaWiki);
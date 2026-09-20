/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
document.addEventListener('DOMContentLoaded', function() {
    var terminal = document.querySelector('.lctd-terminal');
    if (!terminal) return;

    // Срабатывает один раз за сессию — не переигрывает при каждом переходе на главную
    if (sessionStorage.getItem('lctd_terminal_played')) return;

    var fullText = terminal.textContent;
    terminal.textContent = '';

    var i = 0;
    var speed = 30; // мс между символами, можно подстроить под вкус

    function typeChar() {
        if (i < fullText.length) {
            terminal.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeChar, speed);
        } else {
            sessionStorage.setItem('lctd_terminal_played', '1');
        }
    }

    typeChar();
});

/* === LCTD carousel (объявления) === */
(function () {
	function initLctdCarousel() {
		var root = document.getElementById( 'lctd-announce' );
		if ( !root || root.dataset.lctdInit ) return;
		root.dataset.lctdInit = '1';

		var slides = root.querySelectorAll( '.lctd-carousel-slide' );
		var dots = root.querySelectorAll( '.lctd-carousel-dot' );
		var prevBtn = root.querySelector( '.lctd-carousel-prev' );
		var nextBtn = root.querySelector( '.lctd-carousel-next' );
		if ( !slides.length ) return;

		var current = 0;
		var timer = null;
		var AUTOPLAY_MS = 6000;

		function show( index ) {
			index = ( index + slides.length ) % slides.length;
			slides.forEach( function ( s, i ) { s.classList.toggle( 'is-active', i === index ); } );
			dots.forEach( function ( d, i ) { d.classList.toggle( 'is-active', i === index ); } );
			current = index;
		}
		function next() { show( current + 1 ); }
		function prev() { show( current - 1 ); }
		function startAutoplay() { stopAutoplay(); timer = setInterval( next, AUTOPLAY_MS ); }
		function stopAutoplay() { if ( timer ) { clearInterval( timer ); timer = null; } }

		if ( nextBtn ) nextBtn.addEventListener( 'click', function () { next(); startAutoplay(); } );
		if ( prevBtn ) prevBtn.addEventListener( 'click', function () { prev(); startAutoplay(); } );
		dots.forEach( function ( d, i ) { d.addEventListener( 'click', function () { show( i ); startAutoplay(); } ); } );

		root.addEventListener( 'mouseenter', stopAutoplay );
		root.addEventListener( 'mouseleave', startAutoplay );

		show( 0 );
		startAutoplay();
	}

	if ( window.mw && mw.hook ) {
		mw.hook( 'wikipage.content' ).add( initLctdCarousel );
	} else {
		document.addEventListener( 'DOMContentLoaded', initLctdCarousel );
	}
})();

/* === LCTD: подстраховка для sortable-таблиц (на случай если jquery.tablesorter не подхватывает их сам) === */
(function () {
	function initLctdSortable() {
		if ( !window.jQuery || !jQuery.fn.tablesorter ) return;
		jQuery( 'table.sortable' ).each( function () {
			var $t = jQuery( this );
			if ( !$t.data( 'tablesorter' ) ) {
				$t.tablesorter();
			}
		} );
	}
	if ( window.mw && mw.hook ) {
		mw.hook( 'wikipage.content' ).add( initLctdSortable );
	}
	document.addEventListener( 'DOMContentLoaded', initLctdSortable );
	window.addEventListener( 'load', initLctdSortable );
})();

(function () {
	function fallbackCopy( text ) {
		var ta = document.createElement( 'textarea' );
		ta.value = text;
		ta.style.position = 'fixed';
		ta.style.top = '-1000px';
		ta.style.opacity = '0';
		document.body.appendChild( ta );
		ta.focus();
		ta.select();
		try {
			document.execCommand( 'copy' );
		} catch ( e ) {}
		document.body.removeChild( ta );
	}

	function copyCode( btn ) {
		var text = btn.getAttribute( 'data-code' ) || '';
		var onDone = function () {
			var orig = btn.getAttribute( 'data-label' ) || btn.textContent;
			btn.setAttribute( 'data-label', orig );
			btn.textContent = 'СКОПИРОВАНО!';
			btn.classList.add( 'is-copied' );
			clearTimeout( btn._lctdCopyTimeout );
			btn._lctdCopyTimeout = setTimeout( function () {
				btn.textContent = orig;
				btn.classList.remove( 'is-copied' );
			}, 1500 );
		};
		if ( navigator.clipboard && navigator.clipboard.writeText ) {
			navigator.clipboard.writeText( text ).then( onDone, function () {
				fallbackCopy( text );
				onDone();
			} );
		} else {
			fallbackCopy( text );
			onDone();
		}
	}

	function initLctdCopyButtons() {
		var tables = document.querySelectorAll( 'table.lctd-codes-table' );
		tables.forEach( function ( table ) {
			var rows = table.querySelectorAll( 'tr' );
			rows.forEach( function ( row, idx ) {
				if ( idx === 0 ) { return; }
				var cell = row.querySelector( 'td' );
				if ( !cell || cell.querySelector( '.lctd-copy-btn' ) ) { return; }
				var code = cell.textContent.trim();
				if ( !code ) { return; }
				var btn = document.createElement( 'button' );
				btn.type = 'button';
				btn.className = 'lctd-copy-btn';
				btn.setAttribute( 'data-code', code );
				btn.textContent = 'КОПИРОВАТЬ';
				btn.addEventListener( 'click', function ( e ) {
					e.preventDefault();
					copyCode( btn );
				} );
				cell.appendChild( btn );
			} );
		} );
	}

	if ( window.mw && mw.hook ) { mw.hook( 'wikipage.content' ).add( initLctdCopyButtons ); }
	document.addEventListener( 'DOMContentLoaded', initLctdCopyButtons );
	window.addEventListener( 'load', initLctdCopyButtons );
})();
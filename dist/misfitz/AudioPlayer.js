( function () {
	'use strict';

	// When shuffling, favorites get a slightly higher chance to come early in the order
	var FAV_WEIGHT = 1.6;

	var ICONS = {
		play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
		pause: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
		prev: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
		next: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>',
		shuffle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>',
		repeat: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>',
		back: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
		volUp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
		volDown: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/></svg>',
		volOff: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>'
	};

	var activeAudio = null; // only one playlist plays at a time on a page

	function el( tag, cls ) {
		var node = document.createElement( tag );
		if ( cls ) {
			node.className = cls;
		}
		return node;
	}

	function icon( name ) {
		var span = el( 'span', 'pl-ico' );
		span.innerHTML = ICONS[ name ];
		return span;
	}

	function button( cls, iconName, label ) {
		var b = el( 'button', cls );
		b.type = 'button';
		b.setAttribute( 'aria-label', label );
		b.title = label;
		b.appendChild( icon( iconName ) );
		return b;
	}

	function setIcon( btn, iconName ) {
		var ico = btn.querySelector( '.pl-ico' );
		if ( ico ) {
			ico.innerHTML = ICONS[ iconName ];
		}
	}

	function fmt( s ) {
		if ( !isFinite( s ) ) {
			return '0:00';
		}
		var m = Math.floor( s / 60 );
		var r = Math.floor( s % 60 );
		return m + ':' + ( r < 10 ? '0' : '' ) + r;
	}

	// Finds the audio file address inside a row's own (hidden) player
	function srcOf( row ) {
		var a = row.querySelector( '.pl-audio audio' );
		if ( !a ) {
			return '';
		}
		var source = a.querySelector( 'source' );
		return a.currentSrc || a.getAttribute( 'src' ) || ( source ? source.src : '' ) || '';
	}

	// The mobile skin lazy-loads images: src holds a tiny placeholder and the real address is in data-src
	function realSrc( img ) {
		if ( !img ) {
			return '';
		}
		var s = img.getAttribute( 'data-src' ) || img.getAttribute( 'data-lazy-src' ) || img.currentSrc || img.src || '';
		return /^data:/.test( s ) ? '' : s;
	}

	// Songs that share the same cover file belong to the same album
	function albumOf( row ) {
		return row.getAttribute( 'data-album' ) || '';
	}

	// Favorites are the checked boxes of the favorites feature
	function isFav( row ) {
		var box = row.querySelector( 'input[type="checkbox"]' );
		return !!( box && box.checked );
	}

	// Random order where every song appears once. Favorites tend to come a bit earlier.
	function buildOrder( list, first ) {
		var keyed = list.filter( function ( r ) {
			return r !== first;
		} ).map( function ( r ) {
			var w = isFav( r ) ? FAV_WEIGHT : 1;
			return { row: r, k: Math.pow( Math.random(), 1 / w ) };
		} );
		keyed.sort( function ( a, b ) {
			return b.k - a.k;
		} );
		var order = keyed.map( function ( x ) {
			return x.row;
		} );
		if ( first ) {
			order.unshift( first );
		}
		return order;
	}

	function setup( wrapper ) {
		if ( wrapper.getAttribute( 'data-pl-ready' ) ) {
			return;
		}
		var table = wrapper.querySelector( 'table.playlist-table' );
		var tbody = table ? table.querySelector( 'tbody' ) : null;
		if ( !tbody ) {
			return;
		}

		function rows() {
			return Array.prototype.slice.call( tbody.querySelectorAll( 'tr' ) ).filter( function ( r ) {
				return srcOf( r );
			} );
		}

		function albumRows( key ) {
			return rows().filter( function ( r ) {
				return albumOf( r ) === key;
			} );
		}

		// If no audio address can be read, leave the template untouched
		if ( !rows().length ) {
			return;
		}
		wrapper.setAttribute( 'data-pl-ready', '1' );

		// ----- Albums (written by the template, one hidden block per cover) -----
		var albums = [];
		Array.prototype.forEach.call( wrapper.querySelectorAll( '.pl-album-src' ), function ( n ) {
			var img = n.querySelector( 'img' );
			albums.push( {
				key: n.getAttribute( 'data-album' ) || '',
				title: n.getAttribute( 'data-title' ) || 'Album',
				src: realSrc( img )
			} );
		} );
		if ( !albums.length ) {
			albums.push( { key: '', title: 'Playlist', src: '' } );
		}

		function findAlbum( key ) {
			for ( var i = 0; i < albums.length; i++ ) {
				if ( albums[ i ].key === key ) {
					return albums[ i ];
				}
			}
			return albums[ 0 ];
		}

		var audio = new Audio();
		audio.preload = 'none';
		var state = {
			row: null, // song being played
			playAlbum: null, // album of the song being played
			viewAlbum: null, // album whose songs are displayed
			shuffle: false,
			repeat: 0, // 0 off, 1 all, 2 one
			order: [], // shuffle order for the playing album
			orderAlbum: null
		};
		var seeking = false;

		// ----- Screen: albums, then the songs of one album -----
		var listEl = table;
		while ( listEl.parentNode && listEl.parentNode !== wrapper ) {
			listEl = listEl.parentNode;
		}
		listEl.classList.add( 'pl-list' );

		var stage = el( 'div', 'pl-stage' );
		wrapper.insertBefore( stage, listEl );

		var topBar = el( 'div', 'pl-top' );
		var backBtn = button( 'pl-back', 'back', 'Back to the albums' );
		var backText = el( 'span' );
		backText.textContent = 'Albums';
		backBtn.appendChild( backText );
		topBar.appendChild( backBtn );

		var grid = el( 'div', 'pl-albums' );
		var cards = {};
		albums.forEach( function ( a ) {
			var card = el( 'button', 'pl-card' );
			card.type = 'button';
			var imgBox = el( 'div', 'pl-card-img' );
			if ( a.src ) {
				var im = el( 'img' );
				im.src = a.src;
				im.alt = '';
				imgBox.appendChild( im );
			}
			var t = el( 'div', 'pl-card-title' );
			t.textContent = a.title;
			var c = el( 'div', 'pl-card-count' );
			card.appendChild( imgBox );
			card.appendChild( t );
			card.appendChild( c );
			card.addEventListener( 'click', function () {
				showAlbum( a.key );
			} );
			cards[ a.key ] = c;
			grid.appendChild( card );
		} );

		var aside = el( 'div', 'pl-aside' );
		var asideImg = el( 'img', 'pl-aside-img' );
		asideImg.alt = '';
		var asideInfo = el( 'div', 'pl-aside-info' );
		var backBtnM = button( 'pl-back pl-back-m', 'back', 'Back to the albums' );
		var backTextM = el( 'span' );
		backTextM.textContent = 'Albums';
		backBtnM.appendChild( backTextM );
		var asideTitle = el( 'div', 'pl-aside-title' );
		var asideCount = el( 'div', 'pl-aside-count' );
		asideInfo.appendChild( backBtnM );
		asideInfo.appendChild( asideTitle );
		asideInfo.appendChild( asideCount );
		aside.appendChild( asideImg );
		aside.appendChild( asideInfo );

		stage.appendChild( topBar );
		stage.appendChild( grid );
		stage.appendChild( aside );
		stage.appendChild( listEl );

		function countText( n ) {
			return n + ( n === 1 ? ' song' : ' songs' );
		}

		function refreshCounts() {
			albums.forEach( function ( a ) {
				cards[ a.key ].textContent = countText( albumRows( a.key ).length );
			} );
			if ( state.viewAlbum !== null ) {
				asideCount.textContent = countText( albumRows( state.viewAlbum ).length );
			}
		}

		function applyFilter() {
			if ( state.viewAlbum === null ) {
				return;
			}
			Array.prototype.forEach.call( tbody.querySelectorAll( 'tr' ), function ( r ) {
				r.classList.toggle( 'pl-hide', albumOf( r ) !== state.viewAlbum );
			} );
		}

		function showAlbums() {
			state.viewAlbum = null;
			wrapper.classList.remove( 'pl-view-songs' );
			wrapper.classList.add( 'pl-view-albums' );
		}

		function showAlbum( key ) {
			var a = findAlbum( key );
			state.viewAlbum = a.key;
			applyFilter();
			asideTitle.textContent = a.title;
			if ( a.src ) {
				asideImg.src = a.src;
				asideImg.style.display = '';
			} else {
				asideImg.style.display = 'none';
			}
			refreshCounts();
			wrapper.classList.remove( 'pl-view-albums' );
			wrapper.classList.add( 'pl-view-songs' );
			tbody.scrollTop = 0;
		}

		backBtn.addEventListener( 'click', showAlbums );
		backBtnM.addEventListener( 'click', showAlbums );

		// ----- Bottom bar -----
		var bar = el( 'div', 'pl-bar' );

		var now = el( 'div', 'pl-now' );
		var nowImg = el( 'img', 'pl-now-img' );
		nowImg.alt = '';
		nowImg.style.display = 'none';
		var nowTitle = el( 'div', 'pl-now-title' );
		nowTitle.textContent = 'Nothing playing';
		now.appendChild( nowImg );
		now.appendChild( nowTitle );

		var controls = el( 'div', 'pl-controls' );
		var buttons = el( 'div', 'pl-buttons' );
		var shuffleBtn = button( 'pl-btn', 'shuffle', 'Shuffle' );
		var prevBtn = button( 'pl-btn', 'prev', 'Previous' );
		var mainBtn = button( 'pl-btn pl-main', 'play', 'Play' );
		var nextBtn = button( 'pl-btn', 'next', 'Next' );
		var repeatBtn = button( 'pl-btn', 'repeat', 'Repeat' );
		var badge = el( 'span', 'pl-badge' );
		repeatBtn.appendChild( badge );
		buttons.appendChild( shuffleBtn );
		buttons.appendChild( prevBtn );
		buttons.appendChild( mainBtn );
		buttons.appendChild( nextBtn );
		buttons.appendChild( repeatBtn );

		var progress = el( 'div', 'pl-progress' );
		var curTime = el( 'span', 'pl-time' );
		curTime.textContent = '0:00';
		var seek = el( 'input' );
		seek.type = 'range';
		seek.min = 0;
		seek.max = 1000;
		seek.value = 0;
		seek.style.accentColor = '#8b2ec9';
		var durTime = el( 'span', 'pl-time' );
		durTime.textContent = '0:00';
		progress.appendChild( curTime );
		progress.appendChild( seek );
		progress.appendChild( durTime );

		controls.appendChild( buttons );
		controls.appendChild( progress );

		// Volume: an icon that opens a vertical slider; the slider closes once the level is set
		var volWrap = el( 'div', 'pl-volwrap' );
		var volBtn = button( 'pl-btn', 'volUp', 'Volume' );
		var volPop = el( 'div', 'pl-volpop' );
		var slider = el( 'div', 'pl-vslider' );
		slider.tabIndex = 0;
		slider.style.touchAction = 'none';
		slider.setAttribute( 'role', 'slider' );
		slider.setAttribute( 'aria-label', 'Volume' );
		slider.setAttribute( 'aria-valuemin', '0' );
		slider.setAttribute( 'aria-valuemax', '100' );
		var track = el( 'div', 'pl-vtrack' );
		var fill = el( 'div', 'pl-vfill' );
		var knob = el( 'div', 'pl-vknob' );
		track.appendChild( fill );
		track.appendChild( knob );
		slider.appendChild( track );
		volPop.appendChild( slider );
		volWrap.appendChild( volBtn );
		volWrap.appendChild( volPop );

		bar.appendChild( now );
		bar.appendChild( controls );
		bar.appendChild( volWrap );
		wrapper.appendChild( bar );

		function setVolume( v ) {
			v = Math.max( 0, Math.min( 1, v ) );
			audio.volume = v;
			fill.style.height = ( v * 100 ) + '%';
			knob.style.bottom = ( v * 100 ) + '%';
			slider.setAttribute( 'aria-valuenow', String( Math.round( v * 100 ) ) );
			setIcon( volBtn, v === 0 ? 'volOff' : ( v < 0.5 ? 'volDown' : 'volUp' ) );
		}

		function closeVolume() {
			volPop.classList.remove( 'pl-open' );
		}

		function volumeFromEvent( e ) {
			var r = track.getBoundingClientRect();
			if ( !r.height ) {
				return audio.volume;
			}
			return 1 - ( e.clientY - r.top ) / r.height;
		}

		var dragging = false;
		volBtn.addEventListener( 'click', function () {
			volPop.classList.toggle( 'pl-open' );
		} );
		slider.addEventListener( 'pointerdown', function ( e ) {
			dragging = true;
			try {
				slider.setPointerCapture( e.pointerId );
			} catch ( err ) { /* not supported, dragging still works inside the slider */ }
			setVolume( volumeFromEvent( e ) );
			e.preventDefault();
		} );
		slider.addEventListener( 'pointermove', function ( e ) {
			if ( dragging ) {
				setVolume( volumeFromEvent( e ) );
			}
		} );
		slider.addEventListener( 'pointerup', function ( e ) {
			if ( !dragging ) {
				return;
			}
			dragging = false;
			setVolume( volumeFromEvent( e ) );
			closeVolume(); // the level has been changed: the bar goes away
		} );
		slider.addEventListener( 'pointercancel', function () {
			dragging = false;
			closeVolume();
		} );
		slider.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'ArrowUp' || e.key === 'ArrowRight' ) {
				setVolume( audio.volume + 0.05 );
				e.preventDefault();
			} else if ( e.key === 'ArrowDown' || e.key === 'ArrowLeft' ) {
				setVolume( audio.volume - 0.05 );
				e.preventDefault();
			} else if ( e.key === 'Escape' || e.key === 'Enter' ) {
				closeVolume();
				volBtn.focus();
			}
		} );
		document.addEventListener( 'pointerdown', function ( e ) {
			if ( volPop.classList.contains( 'pl-open' ) && !volWrap.contains( e.target ) ) {
				closeVolume();
			}
		} );
		setVolume( 1 );

		// ----- Rows -----
		function decorate() {
			Array.prototype.forEach.call( tbody.querySelectorAll( 'td.pl-play' ), function ( cell ) {
				if ( !cell.querySelector( '.pl-playbtn' ) ) {
					cell.textContent = '';
					cell.appendChild( button( 'pl-playbtn', 'play', 'Play' ) );
				}
			} );
			applyFilter();
			refresh();
		}

		function refresh() {
			var playing = !audio.paused;
			setIcon( mainBtn, playing ? 'pause' : 'play' );
			mainBtn.title = playing ? 'Pause' : 'Play';
			Array.prototype.forEach.call( tbody.querySelectorAll( 'tr' ), function ( r ) {
				var isCurrent = r === state.row;
				r.classList.toggle( 'pl-active', isCurrent );
				var b = r.querySelector( '.pl-playbtn' );
				if ( b ) {
					setIcon( b, isCurrent && playing ? 'pause' : 'play' );
				}
			} );
		}

		function showNow() {
			var row = state.row;
			if ( !row ) {
				return;
			}
			var title = row.querySelector( '.pl-title' );
			nowTitle.textContent = title ? title.textContent.trim() : '';
			var cover = findAlbum( albumOf( row ) ).src || realSrc( row.querySelector( '.pl-cover img' ) );
			if ( cover ) {
				nowImg.src = cover;
				nowImg.style.display = '';
			} else {
				nowImg.style.display = 'none';
			}
		}

		// ----- Choosing the next song -----
		function ensureOrder( row ) {
			if ( !state.shuffle ) {
				return;
			}
			if ( state.orderAlbum !== state.playAlbum || state.order.indexOf( row ) < 0 ) {
				state.order = buildOrder( albumRows( state.playAlbum ), row );
				state.orderAlbum = state.playAlbum;
			}
		}

		// Returns the song to play after the current one, or null when the album is finished
		function nextRow( auto ) {
			var list = albumRows( state.playAlbum );
			if ( !list.length ) {
				return null;
			}
			var cur = state.row;
			if ( state.shuffle ) {
				ensureOrder( cur );
				var i = state.order.indexOf( cur );
				if ( i + 1 < state.order.length ) {
					return state.order[ i + 1 ];
				}
				// every song has been played once
				if ( auto && state.repeat !== 1 ) {
					return null;
				}
				var fresh = buildOrder( list, null );
				if ( fresh.length > 1 && fresh[ 0 ] === cur ) {
					fresh.push( fresh.shift() );
				}
				state.order = fresh;
				return fresh[ 0 ];
			}
			var n = list.indexOf( cur ) + 1;
			if ( n >= list.length ) {
				if ( auto && state.repeat !== 1 ) {
					return null;
				}
				n = 0;
			}
			return list[ n ];
		}

		function prevRow() {
			var list = albumRows( state.playAlbum );
			var cur = state.row;
			if ( !list.length ) {
				return null;
			}
			if ( state.shuffle ) {
				ensureOrder( cur );
				var i = state.order.indexOf( cur );
				return i > 0 ? state.order[ i - 1 ] : cur;
			}
			var n = list.indexOf( cur ) - 1;
			return n >= 0 ? list[ n ] : cur;
		}

		// ----- Playback -----
		function startAudio() {
			if ( activeAudio && activeAudio !== audio ) {
				activeAudio.pause();
			}
			activeAudio = audio;
			var p = audio.play();
			if ( p && p.catch ) {
				p.catch( function () {} );
			}
		}

		function playRow( row ) {
			var src = srcOf( row );
			if ( !src ) {
				return;
			}
			state.row = row;
			state.playAlbum = albumOf( row );
			ensureOrder( row );
			audio.src = src;
			startAudio();
			showNow();
			refresh();
		}

		function startFirst() {
			var key = state.viewAlbum !== null ? state.viewAlbum : albums[ 0 ].key;
			var list = albumRows( key );
			if ( !list.length ) {
				return;
			}
			playRow( state.shuffle ? buildOrder( list, null )[ 0 ] : list[ 0 ] );
		}

		function toggle() {
			if ( !state.row ) {
				startFirst();
				return;
			}
			if ( audio.paused ) {
				startAudio();
			} else {
				audio.pause();
			}
		}

		// ----- Events -----
		wrapper.addEventListener( 'click', function ( e ) {
			var btn = e.target.closest ? e.target.closest( '.pl-playbtn' ) : null;
			if ( !btn ) {
				return;
			}
			var row = btn.closest( 'tr' );
			if ( row === state.row ) {
				toggle();
			} else {
				playRow( row );
			}
		} );

		mainBtn.addEventListener( 'click', toggle );

		nextBtn.addEventListener( 'click', function () {
			if ( !state.row ) {
				return;
			}
			var n = nextRow( false );
			if ( n ) {
				playRow( n );
			}
		} );

		prevBtn.addEventListener( 'click', function () {
			if ( !state.row ) {
				return;
			}
			if ( audio.currentTime > 3 ) {
				audio.currentTime = 0;
				return;
			}
			var n = prevRow();
			if ( n === state.row ) {
				audio.currentTime = 0;
			} else if ( n ) {
				playRow( n );
			}
		} );

		shuffleBtn.addEventListener( 'click', function () {
			state.shuffle = !state.shuffle;
			shuffleBtn.classList.toggle( 'pl-on', state.shuffle );
			state.order = [];
			state.orderAlbum = null;
			if ( state.shuffle && state.row ) {
				ensureOrder( state.row );
			}
		} );

		repeatBtn.addEventListener( 'click', function () {
			state.repeat = ( state.repeat + 1 ) % 3;
			repeatBtn.classList.toggle( 'pl-on', state.repeat > 0 );
			badge.textContent = state.repeat === 2 ? '1' : '';
		} );

		seek.addEventListener( 'input', function () {
			seeking = true;
			if ( isFinite( audio.duration ) ) {
				curTime.textContent = fmt( ( seek.value / 1000 ) * audio.duration );
			}
		} );
		seek.addEventListener( 'change', function () {
			if ( isFinite( audio.duration ) ) {
				audio.currentTime = ( seek.value / 1000 ) * audio.duration;
			}
			seeking = false;
		} );

		audio.addEventListener( 'play', refresh );
		audio.addEventListener( 'pause', refresh );
		audio.addEventListener( 'loadedmetadata', function () {
			durTime.textContent = fmt( audio.duration );
		} );
		audio.addEventListener( 'timeupdate', function () {
			if ( seeking ) {
				return;
			}
			curTime.textContent = fmt( audio.currentTime );
			if ( isFinite( audio.duration ) && audio.duration > 0 ) {
				seek.value = Math.round( ( audio.currentTime / audio.duration ) * 1000 );
			}
		} );
		audio.addEventListener( 'ended', function () {
			if ( state.repeat === 2 ) {
				audio.currentTime = 0;
				startAudio();
				return;
			}
			var n = nextRow( true );
			if ( n ) {
				playRow( n );
			} else {
				audio.pause();
				audio.currentTime = 0;
				refresh();
			}
		} );

		// Rows can be rebuilt by the favorites feature, so buttons and the album filter are re-applied
		if ( window.MutationObserver ) {
			new MutationObserver( function () {
				decorate();
				refreshCounts();
			} ).observe( tbody, { childList: true } );
		}

		wrapper.classList.add( 'pl-js' );
		decorate();
		refreshCounts();

		if ( albums.length === 1 ) {
			wrapper.classList.add( 'pl-single' );
			showAlbum( albums[ 0 ].key );
		} else {
			showAlbums();
		}
	}

	function init( root ) {
		Array.prototype.forEach.call( ( root || document ).querySelectorAll( '.playlist-wrapper' ), setup );
	}

	if ( window.mw && mw.hook ) {
		mw.hook( 'wikipage.content' ).add( function ( $content ) {
			init( $content && $content[ 0 ] ? $content[ 0 ] : document );
		} );
	}
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', function () {
			init( document );
		} );
	} else {
		init( document );
	}
}() );
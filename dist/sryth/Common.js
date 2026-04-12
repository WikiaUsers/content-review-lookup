/* Any JavaScript here will be loaded for all users on every page load. */
 
/*<source lang="javascript">*/

importScriptPage('ShowHide/code.js', 'dev');

mw.loader.using( [ 'mediawiki.api' ] ).then( function () {
	'use strict';

	if ( !mw.config.get( 'wgIsArticle' ) || mw.config.get( 'wgAction' ) !== 'view' ) {
		return;
	}

	// Only main namespace, plus Quests namespace
	var ns = mw.config.get( 'wgNamespaceNumber' );
	if ( ns !== 0 && ns !== 202 ) {
		return;
	}

	// Two years should be reasonable for a low-activity wiki
	var maxAgeDays = 730;
	var maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
	var revisionId = mw.config.get( 'wgRevisionId' ) || mw.config.get( 'wgCurRevisionId' );
	var messagePage = 'Sryth_Wiki:OldPageWarningText';

	if ( !revisionId ) {
		return;
	}

	var revisionCacheKey = 'oldPageWarning:revision:' + revisionId;
	var messageCacheKey = 'oldPageWarning:message:' + messagePage;
	var cachedRevisionRaw = null;
	var cachedMessageRaw = null;

	try {
		cachedRevisionRaw = localStorage.getItem( revisionCacheKey );
		cachedMessageRaw = localStorage.getItem( messageCacheKey );
	} catch ( e ) {}

	function getContentRoot() {
		return document.querySelector( '.mw-parser-output' ) ||
			document.getElementById( 'mw-content-text' );
	}

	function insertWarning( isoTimestamp, messageHtml ) {
		if ( !isoTimestamp ) {
			return;
		}

		var lastEditDate = new Date( isoTimestamp );
		if ( isNaN( lastEditDate.getTime() ) ) {
			return;
		}

		if ( Date.now() - lastEditDate.getTime() <= maxAgeMs ) {
			return;
		}

		var content = getContentRoot();
		if ( !content || content.querySelector( '.old-page-warning' ) ) {
			return;
		}

		var formattedDate = lastEditDate.toLocaleDateString( 'en-GB', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		} );

		var box = document.createElement( 'div' );
		box.className = 'old-page-warning';
		box.setAttribute( 'role', 'note' );

		var title = document.createElement( 'div' );
		title.className = 'old-page-warning__title';
		//title.textContent = 'This page may be outdated';
		var titleText = document.createElement( 'span' );
		titleText.className = 'old-page-warning__title-text';
		titleText.textContent = 'This page may be outdated';
		var titleActions = document.createElement( 'span' );
		titleActions.className = 'old-page-warning__title-actions';
		titleActions.innerHTML ='<a href="#" class="old-page-warning-toggle">Collapse</a> | ' +
			'<a href="#" class="old-page-warning-refresh">Refresh this message</a>';
		title.appendChild( titleText );
		title.appendChild( document.createTextNode( ' ' ) ); 
		title.appendChild( titleActions );

		var body = document.createElement( 'div' );
		body.className = 'old-page-warning__body';
		var defaultHtml =
			'<p>This page has not been updated for a long time. ' +
			'Last revision: <strong>' + mw.html.escape( formattedDate ) + '</strong>.</p>';
		body.innerHTML = defaultHtml  + messageHtml;

		box.appendChild( title );
		box.appendChild( body );

		content.insertBefore( box, content.firstChild );
		
		var refreshLink = box.querySelector( '.old-page-warning-refresh' );
		if ( refreshLink ) {
			refreshLink.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				try {
					localStorage.removeItem( messageCacheKey );
				} catch ( err ) {}
				location.reload();
			} );
		}
		
		var toggleLink = box.querySelector( '.old-page-warning-toggle' );
		var contentBox = box.querySelector( '.old-page-warning__body' );
		
		if ( toggleLink && contentBox ) {
			toggleLink.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				var collapsed = box.classList.toggle( 'old-page-warning--collapsed' );
				toggleLink.textContent = collapsed ? 'Expand' : 'Collapse';
			} );
		}
	}

	function fetchMessageHtml() {
		if ( cachedMessageRaw ) {
			try {
				var cachedMessage = JSON.parse( cachedMessageRaw );
				if ( cachedMessage && cachedMessage.html ) {
					return Promise.resolve( cachedMessage.html );
				}
			} catch ( e ) {}
		}

		return new mw.Api().get( {
			action: 'parse',
			page: messagePage,
			prop: 'text',
			formatversion: 2
		} ).then( function ( data ) {
			var html = data && data.parse && data.parse.text ? data.parse.text : '';

			try {
				localStorage.setItem( messageCacheKey, JSON.stringify( {
					html: html
				} ) );
			} catch ( e ) {}

			return html;
		} ).catch( function () {
			return '';
		} );
	}

	function fetchRevisionTimestamp() {
		if ( cachedRevisionRaw ) {
			try {
				var cachedRevision = JSON.parse( cachedRevisionRaw );
				if ( cachedRevision && cachedRevision.timestamp ) {
					return Promise.resolve( cachedRevision.timestamp );
				}
			} catch ( e ) {}
		}

		return new mw.Api().get( {
			action: 'query',
			prop: 'revisions',
			revids: revisionId,
			rvprop: 'timestamp',
			formatversion: 2
		} ).then( function ( data ) {
			var pages = data && data.query && data.query.pages;
			var revisions = pages && pages[ 0 ] && pages[ 0 ].revisions;
			var timestamp = revisions && revisions[ 0 ] && revisions[ 0 ].timestamp;

			if ( timestamp ) {
				try {
					localStorage.setItem( revisionCacheKey, JSON.stringify( {
						timestamp: timestamp
					} ) );
				} catch ( e ) {}
			}

			return timestamp || '';
		} ).catch( function () {
			return '';
		} );
	}

	Promise.all( [
		fetchRevisionTimestamp(),
		fetchMessageHtml()
	] ).then( function ( results ) {
		insertWarning( results[ 0 ], results[ 1 ] );
	} );
} );
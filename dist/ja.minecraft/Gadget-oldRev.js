$( function() {
	'use strict';

	var $content = $( '#mw-content-text' );
	var $oldRev = $content.find( '.old-rev' );
	var ns = mw.config.get( 'wgNamespaceNumber' );
	var title = mw.config.get( 'wgPageName' );
	var escapeNs = [ 0, 2, 4, 10, 12 ];

	var i18n = {
		diff: '差分',
		failedToGetID: '版IDの取得に失敗しました',
		getting: '取得中…',
		notExistEnPage: '英語版ページが存在しません',
		// $1 is the revision id, $2 is the diff link
		output: '現在の英語版は$1のため、更新が遅れています。$2',
		outOfRange: '動作対象外のページです',
		pageIsNotSpecified: '英語版ページが指定されていません',
		specifiedRevIdIsSame: '指定した版IDは最新の英語版と同じです'
	};

	// Only run on pages that use [[Template:OldRev]] and escaped numberspaces
	if ( !$oldRev.length ) {
		return;
	} else if ( escapeNs.indexOf( ns ) === -1 ) {
		return errorText( i18n.outOfRange );
	}

	function errorText( reason ) {
		return $rev.html( '<span class="error">[' + reason + ']</span>' );
	}

	function makeRevisionsJSONReq( pagename ) {
		var enApi = 'https://minecraft.fandom.com/api.php';
		return $.getJSON( enApi, {
			origin: '*',
			action: 'query',
			format: 'json',
			prop: 'revisions',
			indexpageids: '1',
			titles: pagename,
			rvprop: 'ids'
		} );
	}

	function getEnPagename( defer ) {
		var pageid, result;
		var jaApi = new mw.Api();

		jaApi.get( {
			action: 'query',
			format: 'json',
			prop: 'langlinks',
			indexpageids: '1',
			titles: title,
			lllang: 'en'
		} )
		.then( function( data ) {
			pageid = data.query.pageids[ 0 ];
			if ( pageid === '-1' ) return;

			result = data.query.pages[ pageid ];
			if ( !( 'langlinks' in result ) ) return;

			defer.resolve( result.langlinks[ 0 ][ '*' ] );
		} );

		return defer.promise();
	}

	$oldRev.each( function() {
		var $rev = $( this ).find( '#curEnRevision' );
		var $diff = $( this ).find( '#diff' );
		var dPage = $rev.data( 'page' );
		var dRevision = $diff.data( 'revision' );

		$rev.html( '<span class="getting">[' + i18n.getting + ']</span>' );

		if ( !dPage ) {
			var d = new $.Deferred();
			var pagename;

			getEnPagename( d )
			.then( function( page ) {
				// If the return is undefined and the page name characters is one-byte, use the latter.
				pagename = ( !page && /^[\x01-\x7E]+$/.test( title ) )
					? title : page;

				if ( !pagename ) {
					return errorText( i18n.pageIsNotSpecified );
				}

				makeRevisionsJSONReq( pagename ).then( callback );
			} );
		} else {
			makeRevisionsJSONReq( dPage ).then( callback );
		}

		function callback( data ) {
			var pageid = data.query.pageids[ 0 ];
			var revision, diffHTML, result;

			if ( pageid === '-1' ) {
				return errorText( i18n.notExistEnPage );
			}

			revision = data.query.pages[ pageid ].revisions[ 0 ].revid;

			if ( !revision ) {
				return errorText( i18n.failedToGetID );
			} else if ( revision === dRevision ) {
				$oldRev.removeClass( 'old-rev-show' );
				console.info(
					'%c[OldRev] %c' + i18n.specifiedRevIdIsSame, 'font-weight: bold; font-size: 15px', ''
				);
				return;
			}

			diffHTML = '<a href="//minecraft.fandom.com/Special:Diff/'
				+ dRevision + '/' + revision + '">' + i18n.diff + '</a>';

			$rev.html( revision );
			$diff.html( diffHTML );
			result = i18n.output
				.replace( '\$1', $rev.prop( 'outerHTML' ) )
				.replace( '\$2', $diff.prop( 'outerHTML' ) );

			$rev.parent().html( result );
		};
	} );
} );
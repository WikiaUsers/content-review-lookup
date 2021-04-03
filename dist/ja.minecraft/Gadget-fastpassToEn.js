$( function() {
	'use strict';
	var title = mw.config.get( 'wgTitle' );
	var namespace = mw.config.get( 'wgCanonicalNamespace' );
	var specialPagename = mw.config.get( 'wgCanonicalSpecialPageName' );
	var uploadAutoFill = mw.config.get( 'wgUploadAutoFill' );
	var filledFilename = $( '#wpDestFile' ).val();
	var urlParamas = location.search;

	// Only run on pages that pagename is only alphanumeric characters
	if ( !/^[\x01-\x7E]+$/.test( title ) && !specialPagename ) return;

	var encodedTitle = encodeURIComponent( title );
	var resultPagename = uploadAutoFill === false && /^[\x01-\x7E]+$/.test( filledFilename )
		? 'File:' + filledFilename
		: specialPagename
		? namespace + ':' + specialPagename
		: ( namespace ? namespace + ':' : '' ) + encodedTitle;

	var html = genLinkHtml( resultPagename, '対応する英語版ページに移動', '英語版' );

	if ( urlParamas ) {
		var prefix = 'index.php?title=';
		var suffix = paramsList() || '';
		var resultPagenameWithParams = prefix + resultPagename + suffix;
		html += genLinkHtml( resultPagenameWithParams, '正確に対応する英語版ページに移動', '英語版 (A)' );
	}

	$( '#left-navigation ul' ).append( html );

	function paramsList() {
		var paramsPos = urlParamas.indexOf( '&' );
		var params = urlParamas.slice( paramsPos );

		if ( paramsPos === -1 ) {
			return;
		} else {
			return params;
		}
	}

	function genLinkHtml( pagename, title, label ) {
		return [
			'<li id="ca-englishlink">',
				'<span>',
					'<a href="//minecraft.fandom.com/' + pagename + '" title="' + title + '">',
						label,
					'</a>',
				'</span>',
			'</li>'
		].join( '' );
	}
} );
$( document ).ready( function( $ ) {
		if ( $( '.article-up2date-notice' ).length && $( '#footer-info-lastmod' ).length ) {
		var data = JSON.parse( $( '.article-up2date-notice' ).html() );
		var category = data['category'];
		var version = data['version'];
		var snapshot = data['snapshot'];
		var color = data['color'];
		
		var noticestr = 'Última verificação completa da linha do tempo ';
		if ( category == 'unbekannt' ) noticestr += 'desconhecido';
		else {
			noticestr += 'para ' + version;
			if ( snapshot.length ) noticestr += ' (' + snapshot + ')';
		}
		
		var notice = $( '<a>' ).attr( 'href', window.location.protocol + '//' + window.location.hostname + '/Categoria:Stand ' + category ).append(
			$( '<span>' ).css( 'color', '#' + color ).html( noticestr )
		);
		
		var html = $( '#footer-info-lastmod' ).html();
		$( '#footer-info-lastmod' ).html( html + ' ' ).append( notice );
	}
} );
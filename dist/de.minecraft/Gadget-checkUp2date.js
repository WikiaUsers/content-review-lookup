$( document ).ready( function( $ ) {
		if ( $( '.article-up2date-notice' ).length && $( '#footer-info-lastmod' ).length ) {
		var data = JSON.parse( $( '.article-up2date-notice' ).html() );
		var category = data['category'];
		var version = data['version'];
		var snapshot = data['snapshot'];
		var color = data['color'];
		
		var noticestr = 'Letzte vollständige Aktualitätsüberprüfung ';
		if ( category == 'unbekannt' ) noticestr += 'unbekannt';
		else {
			noticestr += 'für ' + version;
			if ( snapshot.length ) noticestr += ' (' + snapshot + ')';
		}
		
		var notice = $( '<a>' ).attr( 'href', window.location.protocol + '//' + window.location.hostname + '/Kategorie:Stand ' + category ).append(
			$( '<span>' ).css( 'color', '#' + color ).html( noticestr )
		);
		
		var html = $( '#footer-info-lastmod' ).html();
		$( '#footer-info-lastmod' ).html( html + ' ' ).append( notice );
	}
} );
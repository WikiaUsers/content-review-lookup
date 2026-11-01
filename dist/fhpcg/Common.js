/* Euphausia Superba x Gem  Dɛn x C. E. Shannon */

/* Ô code (.fhp-codebox): bỏ nút Show all khi code ngắn hơn ngưỡng gập */
mw.hook( 'wikipage.content' ).add( function ( $content ) {
	var LIMIT = 232; // = max-height 220px của CSS + 12px dung sai

	function check() {
		$content.find( '.fhp-codebox' ).each( function () {
			var content = this.querySelector( '.mw-collapsible-content' );
			if ( !content ) {
				return;
			}
			// scrollHeight = chiều cao thật của code, kể cả phần đang bị gập
			this.classList.toggle( 'fhp-codebox-short', content.scrollHeight <= LIMIT );
		} );
	}

	check();
	$( window ).on( 'load', check ); // đo lại khi font đã tải xong
} );
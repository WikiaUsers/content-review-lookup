$( function () {
	if (document.getElementById('new_tab') !== null) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$('#WikiaArticle a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
		} else {
			$('#mw-content-text a').attr('target', '_blank').attr('title', 'Mở link sang Tab mới.');
		} 
	}
});
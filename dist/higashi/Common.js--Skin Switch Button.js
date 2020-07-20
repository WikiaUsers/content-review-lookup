/* Any JavaScript here will be loaded for all users on every page load. */
// Insert it into Toolbar (Oasis) and Header (Monobook)
$( function () {
	if ( !document.getElementById( 'ca-skins' ) ) {
		if ( skin === 'oasis' || skin === 'wikia' ) {
			$('#my-tools-menu').prepend('<li class="ca-skins">Chuyển đổi giao diện<ul><li><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook">Monobook</a></li><li><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">Wikia Mobile</a></li><li><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=monobook&printable=yes">Bản in</a></li></ul></li>' );
		} else {
			$( '<li><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikia">Oasis</a></li>' ).appendTo( '#p-cactions > .pBody > ul' ); $( '<li><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile">Mobile</a></li>' ).appendTo( '#p-cactions > .pBody > ul' ); $( '<li><a href="/wiki/'+ wgPageName +'?useskin=mercury" title="Giao diện Mercury">Mercury</a></li>' ).appendTo( '#p-cactions > .pBody > ul' );
		} 
	}
} );
// Skin Switch Button for monobook to oasis
// and for monobook and oasis to wikiamobile
// Insert it into Edit Button (Oasis)
$(function () {
    $(($( '.UserProfileActionButton' ).length ? '.UserProfileActionButton' : '#WikiaPageHeader') + ' > .wikia-menu-button > ul').append('<li><a href="/wiki/'+ wgPageName +'?action=edit&useskin=monobook" title="Edit trong Monobook">Edit trong Monobook</a></li><li><a href="/wiki/'+ wgPageName +'?useskin=monobook" title="Giao diện Monobook">Giao diện Monobook</a></li><li><a href="/index.php?title=' + encodeURIComponent( wgPageName ) + '&useskin=wikiamobile" title="Giao diện Wikia Mobile">Giao diện Wikia Mobile</a></li><li><a href="/wiki/'+ wgPageName +'?useskin=mercury" title="Giao diện Mercury">Giao diện Mercury</a></li><li><a href="/wiki/'+ wgPageName +'?useskin=monobook&printable=yes" title="Bản in">Bản in</a></li>');
});
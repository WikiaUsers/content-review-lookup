function updateWordmarkByTheme() {
	var light = $( 'body' ).hasClass( 'theme-fandomdesktop-light' );
	var dark = $( 'body' ).hasClass( 'theme-fandomdesktop-dark' );
	var theme = light ? 'light' : dark ? 'dark' : '';
	if ( theme == 'light' ) {
		$( '.fandom-community-header__image img' ).attr( 'src', 'https://static.wikia.nocookie.net/loonatheworld/images/d/dd/Wiki-wordmark-light.png' );
	} else if ( theme == 'dark' ) {
		$( '.fandom-community-header__image img' ).attr( 'src', 'https://static.wikia.nocookie.net/loonatheworld/images/1/12/Wiki-wordmark-dark.png' );
	}
}

$(function() {
	// Doesn't work for custom toggles
	updateWordmarkByTheme();
});
/*<pre>*/
/////////////////////////////////////
// Search Switchbox for Smoke skin //
/////////////////////////////////////

addOnloadHook(makeSmokeSwitch);

function makeSmokeSwitch() {
	var s = new SmokeBox();
	s.create( 'smokeswitch' );
	document.getElementById( 'toolsColumn' ).insertBefore( s.element, document.getElementById( 'expertTools' ) );
	s.appendRoundedBox( 'switch', null );
	s.addListItem( 'switch', null, "javascript: smokeSwitch( 'search' );return false;", 'Search' );
	s.addListItem( 'switch', null, "javascript: smokeSwitch( 'article' );return false;", 'Article' );
}

/*</pre>*/
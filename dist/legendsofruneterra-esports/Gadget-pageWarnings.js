 /* User page warning */
( function() {
	mw.loader.using( 'mediawiki.util' ).then( function() {
		if (mw.config.get("wgCanonicalNamespace") == "User") {
			$("#firstHeading").after('<div style="color:red;">This is a user page. It is not maintained actively by wiki staff and may contain inaccuracies.</div>');
		}
	});
}() 

);

 /* Self page warning */
( function() {
	mw.loader.using( 'mediawiki.util' ).then( function() {
		if (mw.config.get("wgCanonicalNamespace") == "Self") {
			$("#firstHeading").after('<div style="color:red;">This is a self page. Its contents are not guaranteed by wiki staff. <a href="' + wgServer + '/Help:Self">Click here for more information.</a></div>');
		}
	});
}() 

);
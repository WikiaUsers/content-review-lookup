mw.hook('wikipage.content').add(function() {
	var namespace = mw.config.get("wgCanonicalNamespace");
	
	if (namespace == "User") {
		/* User page warning */
		$("#firstHeading").after('<div class="page-warning">This is a user page. It is not maintained actively by wiki staff and may contain inaccuracies.</div>');
	} else if (namespace == "Self") {
		/* Self page warning */
		$("#firstHeading").after('<div class="page-warning">This is a self page. Its contents are not guaranteed by wiki staff. <a href="' + mw.config.get("wgServer") + '/Help:Self">Click here for more information.</a></div>');
	}
});
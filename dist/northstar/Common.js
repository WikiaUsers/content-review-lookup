/*<pre><nowiki>*/
/* Any JavaScript here will be loaded for all users on every page load. */

/* BEGIN: MediaWiki YUI DivView */

function initDivview() {
	var start = document.getElementById( 'bodyContent' );
	if( !start ) start = document.getElementById( 'content' );
	if( !start ) start = document.getElementById( 'c-content' );
	if( !start ) start = document.getElementsByTagName( 'body' )[0];
	if( !start ) start = document;
	var container = 0;
	var containers = YAHOO.util.Dom.getElementsByClassName( 'divview', 'div', start );
	for( var c = 0; c < containers.length; c++ ) {
		container++
		if( !containers[c].id ) containers[c].id = 'YUI_TAB_ID_' + container;
		var divView = new YAHOO.widget.TabView({ id: 'YUI_TAB_CONTAINER_' + container });
		YAHOO.util.Event.onContentReady(containers[c].id, function() {
			for( var t = 0; t < this.childNodes.length; t++ ) {
				if( this.childNodes[t].tagName && this.childNodes[t].tagName.toLowerCase() == 'div' ) {
					divView.addTab( new YAHOO.widget.Tab({
						label: this.childNodes[t].title,
						content: this.childNodes[t].innerHTML
					}));
				}
			}
			divView.set('activeIndex', 0); // make first tab active
			divView.appendTo(this.parentNode, this);
			this.parentNode.removeChild(this);
		});
	}
}

addOnloadHook(initDivview);

/* END: MediaWiki YUI DivView */


/*</pre></nowiki>*/
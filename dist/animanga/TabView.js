//<pre>
//------------------------------//
// BEGIN: MediaWiki YUI TabView //
//------------------------------//
// if ( YAHOO ) {
if ( this.YAHOO ) { // Workaround 
	addOnloadHook(function() {
		var start = document.getElementById( 'bodyContent' );
		if( !start ) start = document.getElementById( 'content' );
		if( !start ) start = document.getElementById( 'c-content' );
		if( !start ) start = document.getElementsByTagName( 'body' )[0];
		if( !start ) start = document;
		var container = 0;
		var containers = YAHOO.util.Dom.getElementsByClassName( 'tabview', 'div', start );
		for( var c = 0; c < containers.length; c++ ) {
			container++
			if( !containers[c].id ) containers[c].id = 'YUI_TAB_ID_' + container;
			var tabView = new YAHOO.widget.TabView({ id: 'YUI_TAB_CONTAINER_' + container });
			YAHOO.util.Event.onContentReady(containers[c].id, function() {
				for( var t = 0; t < this.childNodes.length; t++ ) {
					if( this.childNodes[t].tagName && this.childNodes[t].tagName.toLowerCase() == 'div' ) {
						tabView.addTab( new YAHOO.widget.Tab({
							label: this.childNodes[t].title,
							content: this.childNodes[t].innerHTML
						}));
					}
				}
				var active = 0;
				if( YAHOO.util.Dom.hasClass(this, 'tab-random') ) active = Math.round(Math.random()*(container-1));
				tabView.set('activeIndex', active);
				tabView.appendTo(this.parentNode, this);
				this.parentNode.removeChild(this);
			});
		}
	});
}
//</pre>
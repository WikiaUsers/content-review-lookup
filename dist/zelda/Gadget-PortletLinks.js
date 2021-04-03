//// --------------------------------------------------------
//// Portlet Links
//// This script adds additional/custom links to the sidebar, 
//// and additional/custom tabs at the top-right next to the Search Box.
//// https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addPortletLink
//// https://doc.wikimedia.org/mediawiki-core/master/js/#!/api/mw.util-method-addPortletLink
//// --------------------------------------------------------


var action = mw.config.get("wgAction"),
    server = mw.config.get("wgServer"),
    pageName = mw.config.get("wgPageName"),
    canonicalNamespace = mw.config.get("wgCanonicalNamespace");

// --------------------------------------------------------
// last diff
// Adds a tab which gives the latest diff for a page.
// --------------------------------------------------------
if ( canonicalNamespace != 'Special' 
     && action != 'edit' 
     && action != 'delete' 
     && action != 'watch' 
     && action != 'unwatch' 
     && action != 'protect' ){
	
	$(document).ready(function(){
		
		mw.util.addPortletLink(
			"p-cactions",            //Tab (Action)
			server + "/index.php?title=" + encodeURIComponent(pageName) + "&diff=cur&oldid=prev", 
			"last",                  //Name of Tab
			"ca-last",               //id
			"Show most recent diff", //Tooltip
			'2'                      //accesskey
		);
		
	});
	
}

// --------------------------------------------------------
// Highlight Redirects
// Adds a tab to the top of pages; when clicked it highlights all links on the page that are redirects.
// Notes: https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addCSS
// --------------------------------------------------------
if ( canonicalNamespace != 'Special' 
     && action != 'history' 
     && action != 'delete' 
     && action != 'watch' 
     && action != 'unwatch' 
     && action != 'protect' 
     && action != 'markpatrolled' 
     && action != 'rollback' ){
	
	$(document).ready( function(){
		
		var highlightRedirectsCss = mw.util.addCSS(
			'a.mw-redirect { color:black; background-color:yellow; }' +
			'a.mw-redirect:visited { color:dimgrey; background-color:yellow; }'
		); 
		highlightRedirectsCss.disabled = true;
		
		var portletLink = mw.util.addPortletLink(
			'p-cactions', '#',	'redirects', 'ca-redirects',
			'Highlights all links which are redirects', 'r'
		);
		$( portletLink ).click( function(e){
			e.preventDefault();
			highlightRedirectsCss.disabled = !highlightRedirectsCss.disabled;
		});
		
	});
	
}

// --------------------------------------------------
// Page logs 
// Because they're not just for admins :P
// Adds a link in the Tools section of the sidebar.
// --------------------------------------------------
if (canonicalNamespace != "Special") {
	
	$(document).ready(function(){
		mediaWiki.util.addPortletLink("p-tb", 
			"http://zeldawiki.org/index.php?title=Special%3ALog&type=&user=&page=" + pageName, 
			"Page Logs", 
			"t-logs", 
			"Show all relevant logs for this page.", 
			'3'
		);
	});
	
}

// --------------------------------------------------
// Restyle the Purge tab from the current "Refresh"
// --------------------------------------------------

$(document).ready(function(){
	
	$("#ca-purge a")
		.attr("title","Purge the server cache of this page [alt-shift-0]")
		.attr("accesskey","0")
		.text("Purge");
		
});

// --------------------------------------------------------
// Frozen Animations
// Replaces images with the first frame
// Uses html5 canvas https://caniuse.com/#search=canvas
// Notes: https://www.mediawiki.org/wiki/ResourceLoader/Core_modules#addCSS
// --------------------------------------------------------
if ( canonicalNamespace != 'Special'
     && action != 'history'
     && action != 'delete'
     && action != 'watch'
     && action != 'unwatch'
     && action != 'protect'
     && action != 'markpatrolled'
     && action != 'rollback' ){
	
	$(document).ready( function(){
		$("#bodyContent .image").each(function(){
			var $this = $(this)
			  , img = $this.children()[0]
			  , $cvs = $('<canvas/>').appendTo($this)
			  , ctx = $cvs[0].getContext('2d');
			//$this.addClass('frozen-animations');
			$cvs.attr('width', img.naturalWidth);
			$cvs.attr('height',img.naturalHeight);
			ctx.drawImage(img,0,0);
			$cvs.css('width', img.clientWidth);
			$cvs.css('height',img.clientHeight);
		});
		//var frozenAnimationsCss   = mw.util.addCSS('#bodyContent .frozen-animations > img { display: none; }')
		//  , unfrozenAnimationsCss = mw.util.addCSS('#bodyContent .frozen-animations > canvas { display: none; }'); 
		var frozenAnimationsCss   = mw.util.addCSS('#bodyContent .image > img { display: none !important; }' +
		                                           '#bodyContent .image { display: flex; }' +
		                                           '#bodyContent .image > canvas { margin-left: auto; margin-right: auto; }')
		  , unfrozenAnimationsCss = mw.util.addCSS('#bodyContent .image > canvas { display: none; }'); 
		frozenAnimationsCss.disabled = true;
		
		var portletLink = mw.util.addPortletLink(
			'p-cactions', '#',	'frozen', 'ca-frozen',
			'Replaces animations with a still of the first frame', 'f'
		);
		$( portletLink ).click( function(e){
			e.preventDefault();
			frozenAnimationsCss.disabled = !frozenAnimationsCss.disabled;
			unfrozenAnimationsCss.disabled = !unfrozenAnimationsCss.disabled;
		});
		
	});
	
}
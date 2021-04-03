// webm video autoplay/loop

var vids = document.getElementsByClassName("autoloop");
for (var i = 0; i < vids.length; i++){
    vids[i].autoplay = true;
    vids[i].loop = true;
}

var vids = document.getElementsByClassName("loop");
for (var i = 0; i < vids.length; i++){
    vids[i].loop = true;
}


// ----------------------------------------------------------------------------

// Custom context menu to allow downloading of ext-audiobutton files.

var menu = document.createElement("div");

menu.setAttribute("id", "context-menu");
menu.innerHTML = '<ul><li><a href="#">Download</a></li></ul>';
document.getElementsByTagName('body')[0].appendChild(menu);

document.onclick = function(e){
    menu.style.display = 'none';
}

var buttons = document.querySelectorAll('a.ext-audiobutton');
for (var i = 0; i < buttons.length; i++) {
	buttons[i].oncontextmenu = function(e){
		e.preventDefault();
		var y = e.pageY - 30;
		menu.style.left = e.pageX + 'px';
		menu.style.top = y + 'px';
		menu.style.display = 'block';
		menu.getElementsByTagName("a")[0].href = this.previousElementSibling.getElementsByTagName("source")[0].src;
		menu.getElementsByTagName("a")[0].download = "";
 }
}

// ----------------------------------------------------------------------------

// Mouseover image switch item/unit infoboxes

$("#itemsmallimages img").mouseover(
   function() {
      $("#itemmainimage img:first").attr('src', $(this).attr('src'));
   }
);

// ----------------------------------------------------------------------------

/*
 Element animator
 
 Cycles through a set of elements (or "frames") on a 2 second timer per frame
 Add the "animated" class to the frame containing the elements to animate.
 Optionally, add the "animated-active" class to the frame to display first.
 Optionally, add the "animated-subframe" class to a frame, and the
 "animated-active" class to a subframe within, in order to designate a set of
 subframes which will only be cycled every time the parent frame is displayed.
 
 Requires some styling from [[MediaWiki:Common.css]].
 */
( function() {
	var $content = $( '#mw-content-text' );
	var advanceFrame = function( parentElem, parentSelector ) {
		var curFrame = parentElem.querySelector( parentSelector + ' > .animated-active' );
		$( curFrame ).removeClass( 'animated-active' );
		var $nextFrame = $( curFrame && curFrame.nextElementSibling || parentElem.firstElementChild );
		return $nextFrame.addClass( 'animated-active' );
	};
	setInterval( function() {
		$content.find( '.animated' ).each( function() {
			var $nextFrame = advanceFrame( this, '.animated' );
			if ( $nextFrame.hasClass( 'animated-subframe' ) ) {
				advanceFrame( $nextFrame[0], '.animated-subframe' );
			}
		} );
	}, 2000 );
}() );

// Page-specific JavaScript/CSS

var pageScripts = {
	pagesJS: ['Utilizador:Tarkoviski', 'Utilizadora:Espacorede'],
	pagesCSS: ['Utilizador:Tarkoviski', 'Utilizadora:Espacorede'],
	suffixJS: '/Page.js',
	suffixCSS: '/Page.css',
	init: function() {
		for(var i in pageScripts.pagesJS) {
			if(mw.config.get('wgPageName') == pageScripts.pagesJS[i]) {
				mw.loader.load(mw.config.get('wgScript') + '?title=' + encodeURIComponent(mw.config.get('wgPageName') + pageScripts.suffixJS) + '&ctype=text/javascript&action=raw');
			}
		}
		for(var i in pageScripts.pagesCSS) {
			if(mw.config.get('wgPageName') == pageScripts.pagesCSS[i]) {
				mw.loader.load(mw.config.get('wgScript') + '?title=' + encodeURIComponent(mw.config.get('wgPageName') + pageScripts.suffixCSS) + '&ctype=text/css&action=raw', 'text/css');
			}
		}
	}
};
$(pageScripts.init);
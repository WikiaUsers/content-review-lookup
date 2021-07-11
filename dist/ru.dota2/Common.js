/*WikiEditor/Викификатор*/
if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
        mw.loader.load( '//ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript' );
}

var customizeToolbar = function() {

$( '#wpTextbox1' ).wikiEditor( 'addToToolbar', {
        'section': 'advanced',
        'group': 'format',
        'tools': {
                'wikify': {
                        label: 'Викификатор',
                        type: 'button',
                        icon: '//upload.wikimedia.org/wikipedia/commons/0/06/Wikify-toolbutton.png',
                             action: {
                                  type: 'callback',
                                       execute: function(context){
                                              Wikify();
                                       } 
                             }
                }
        }
} );
};
 
if ( $.inArray( mw.config.get( 'wgAction' ), ['edit', 'submit'] ) !== -1 ) {
        mw.loader.using( 'user.options', function () {
                if ( mw.user.options.get('usebetatoolbar') ) {
                        mw.loader.using( 'ext.wikiEditor.toolbar', function () {
                                $(document).ready( customizeToolbar );
                        } );
                }
        } );
}

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

// Custom context menu to allow downloading of ext-audiobutton files.

var menu = document.createElement("div");

menu.setAttribute("id", "context-menu");
menu.innerHTML = '<ul><li><a href="#">Скачать</a></li></ul>';
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


// Hyperlink required modules in Module namespace
// Author: RheingoldRiver
$(function() {
	if (mw.config.get('wgCanonicalNamespace') != 'Module') return;
	$('.s1, .s2').each(function() {
		var html = $(this).html();
		var quote = html[0];
		var quoteRE = new RegExp('^' + quote + '|' + quote + '$', 'g');
		var name = html.replace(quoteRE,"");
		if (name.startsWith("Модуль:")) {
			var target = name.replace(/ /g,'%20');
			var url = mw.util.getUrl(target);
			var str = quote + '<a href="' + url + '">' + name + '</a>' + quote;
			$(this).html(str);
		}
	});
});
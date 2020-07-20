function onloadhookcustom() {
	var replace = document.getElementById("JRChatReplace");
	if (null != replace) {
		replace.innerHTML='<iframe src="http://webchat.freenode.net/?channels=ultimatedark-wiki" width="400" height="400"></iframe>';
		if (window.attachEvent) window.attachEvent("onbeforeunload",confirmexitjrchat);
		else window.onbeforeunload = confirmexitjrchat;
 
	}
	//alert(document.getElementById("JRChatReplace").innerHTML);
 
}
 
if (window.addEventListener) window.addEventListener("load",onloadhookcustom,false);
else if (window.attachEvent) window.attachEvent("onload",onloadhookcustom);

(function (mw, $, window) {
 
    'use strict';

    if (mw.config.get('skin') !== 'oasis' || mw.config.get('wgNamespaceNumber')) 
    var css, stylesheet, button, defer; 
    function addStylesheet () {
        stylesheet =
        $('<style type="text/css" id="alt-stylesheet">' + css + '">')
        .appendTo(window.document.head || 'head');
        $.storage.set('altStylesheet', '1');
    }
 
    function loadStylesheet () {
        if (!css) {
            if (defer && defer.state() === 'pending') return;
            if (button && button.length) {
                button.prop('disabled', true);
            }
            defer = $.ajax({
                url: 'http://ultimate-dark.wikia.com/index.php?title=MediaWiki:Test.css&action=raw&ctype=text/css&maxage=3600&smaxage=3600',
                dataType: 'text',
                async: false,
                cache: true
            })
            .done(function (text) {
                css = text;
                addStylesheet();
                if (button && button.length) {
                    button.prop('disabled', false);
                }
            });
        } else {
            addStylesheet();
        }
    }
 
    if ($.storage.get('altStylesheet')) {
        loadStylesheet();
    }
 
    $(function () {
        button =
 
        // this is the button:
        $('<input type="button" value="Change theme" class="color-changer">')
        .insertBefore('#WikiaPageHeader .tally')
        //.prependTo('.grid-4')
        //('.WikiaMainContent')
   
        .click(function () {
            var stylesheet = $('#alt-stylesheet');
            if (stylesheet.length) {
                stylesheet.remove();
                $.storage.del('altStylesheet');
            } else {
                loadStylesheet();
            }
            var div = $('<div>').appendTo(window.document.body);
            window.setTimeout(function(){ div.remove(); }, 0);
        });
 
        if (defer && defer.state() === 'pending') {
            button.prop('disabled', true);
        }
    });
 
}(mediaWiki, jQuery, window));

window.onload = function(){
   var style = document.getElementsByClassName('style-code');
   for (var i = 0; i < style.length; i++){
       var css = '<style type="text/css">' + style[i] + '</style>';
       $('head').append(css);
   }
}

/* Testing Canvas */
$(document).ready(function(){
   $('#canvas-section').append('<canvas id="test-canvas" height="250" width="250" style="border: 1px solid red;"></canvas>');
   var c = document.getElementById('test-canvas');
   var ctx = c.getContext('2d');
   ctx.fillStyle="#FFAF0A";
   ctx.fillRect(0, 0, 100, 100);
   ctx.beginPath();
   ctx.arc(125, 125, 30, 0, 2*Math.PI);
   ctx.fill();
});

/*@font-face {
  font-family: "Ethnocentric";
  src: local("☺"),
       url("http://typefront.com/fonts/825590900.ttf") format("opentype");
}
*/
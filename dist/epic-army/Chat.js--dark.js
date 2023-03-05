/** 
 * Konami code
 *
 * Source:
 * http://www.yourinspirationweb.com/en/fun-with-javascript-jquery-and-konami-code/
 */
 
(function (window, document, $) {
    'use strict';
 
    $(function () {
 
        var keys = [],
            darkz = '38,38,38,38,40,40,40,40,68,68';
 
        $(document).keydown(function (e) {
 
            keys.push(e.keyCode);
 
            if (keys.toString().indexOf(darkz) > -1) {
          darkz_style();
	  $("h1.wordmark").find("img").attr("src", "http://img1.wikia.nocookie.net/gt3test/images/9/9c/Ponies.png");
jQuery.getScript('http://panzi.github.io/Browser-Ponies/basecfg.js');
jQuery.getScript('http://panzi.github.io/Browser-Ponies/browserponies.js');
(function (cfg) {BrowserPonies.setBaseUrl(cfg.baseurl);BrowserPonies.loadConfig(BrowserPoniesBaseConfig);BrowserPonies.loadConfig(cfg);})({"baseurl":"http://panzi.github.io/Browser-Ponies/","fadeDuration":500,"volume":1,"fps":25,"speed":3,"audioEnabled":true,"showFps":false,"showLoadProgress":false,"speakProbability":0.1,"spawn":{"apple bloom":1,"applejack (filly)":1,"fluttershy (filly)":1,"pinkie pie (filly)":1,"princess cadence (teenager)":1,"rainbow dash (filly)":1,"rarity (filly)":1,"scootaloo":1,"spike":1,"sweetie belle":1,"twilight sparkle (filly)":1},"autostart":true});
$(document).ready(function() {
{
     $('<button/>', {
        text: 'Disable',
        id: 'btn_1',
        class: 'btnpls',
        style: 'bottom:55px',
        click: function () { javascript:BrowserPonies.stop();void(0) }
    }).appendTo(".Rail");
  }
});
$(document).ready(function() {
{
     $('<button/>', {
        text: 'Enable',
        id: 'btn_2',
        class: 'btnpls',
        style: 'bottom:55px',
        click: function () { javascript:BrowserPonies.start();void(0) }
    }).insertBefore("#btn_1");
  }
});
                // empty keys array, not sure if this is completely necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));
 
function darkz_style() { $("head").append("<link>");
var css = $("head").children(":last");
css.attr({
      rel:  "stylesheet",
      type: "text/css",
      href: "http://epic-army.wikia.com/load.php?mode=articles&only=styles&articles=MediaWiki:Chat.js/dark.js"
});
}
 
(function (window, document, $) {
    'use strict';
 
    $(function () {
 
        var keys = [],
            trolo = '84,82,79,76,79';
 
        $(document).keydown(function (e) {
 
            keys.push(e.keyCode);
 
            if (keys.toString().indexOf(trolo) > -1) {
    $('<embed height="1" width="1" src="http://a.tumblr.com/tumblr_mh2cg70wUc1qbgvpzo1.mp3">').appendTo('.Rail');
$('span.message').text('You just lost the game');
              $('.Chat').css({'background': 'url(http://img1.wikia.nocookie.net/icarly/images/5/58/Rickroll.gif)'});
alert('It seems so that you trolled someone, as revenge, you are trolled too. ');
                // empty keys array, not sure if this is completely necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));
 
//
(function (window, document, $) {
    'use strict';
 
    $(function () {
 
        var keys = [],
            harlem = '68,79,84,72,69,72,65,82,76,69,77,83,72,65,75,69';
 
        $(document).keydown(function (e) {
 
            keys.push(e.keyCode);
 
            if (keys.toString().indexOf(harlem) > -1) {
(function(){function c(){var e=document.createElement("link");e.setAttribute("type","text/css");e.setAttribute("rel","stylesheet");e.setAttribute("href",f);e.setAttribute("class",l);document.body.appendChild(e)}function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}function p(){var e=document.createElement("div");e.setAttribute("class",a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}return n}function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}return 0}function y(){if(window.pageYOffset){return window.pageYOffset}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}function E(e){var t=m(e);return t>=w&&t<=b+w}function S(){var e=document.createElement("audio");e.setAttribute("class",l);e.src=i;e.loop=false;e.addEventListener("canplay",function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},15500)},true);e.addEventListener("ended",function(){N();h()},true);e.innerHTML=" <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";document.body.appendChild(e);e.play()}function x(e){e.className+=" "+s+" "+o}function T(e){e.className+=" "+s+" "+u[Math.floor(Math.random()*u.length)]}function N(){var e=document.getElementsByClassName(s);var t=new RegExp("\\b"+s+"\\b");for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,"")}}var e=30;var t=30;var n=350;var r=350;var i="//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";var s="mw-harlem_shake_me";var o="im_first";var u=["im_drunk","im_baked","im_trippin","im_blown"];var a="mw-strobe_light";var f="//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";var l="mw_added_css";var b=g();var w=y();var C=document.getElementsByTagName("*");var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}if(A===null){console.warn("Could not find a node of the right size. Please try a different page.");return}c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}})()
                // empty keys array, not sure if this is completely necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));
 
(function (window, document, $) {
    'use strict';
 
    $(function () {
 
        var keys = [],
            cupcakes = '67,85,80,67,65,75,69,83';
 
        $(document).keydown(function (e) {
 
            keys.push(e.keyCode);
 
            if (keys.toString().indexOf(cupcakes) > -1) {
          $('.Chat').html('<span>CUPCAKES</span><br><iframe width="420" height="315" src="//www.youtube.com/embed/4oaYkYcYadU#t=10s" frameborder="0" allowfullscreen></iframe><br><img src="http://i1.ytimg.com/vi/5IWsyDKVJf4/hqdefault.jpg"/><img src="http://media-cache-ak0.pinimg.com/236x/e3/b3/35/e3b335c24bc7ac2c7be8b802d19f5aaa.jpg"/><img src="http://images2.wikia.nocookie.net/__cb20130815191308/creepypasta/es/images/thumb/f/fb/Cupcakes_by_pyonkotcchi-d50t3tw.png/290px-Cupcakes_by_pyonkotcchi-d50t3tw.png"/><br><img src="http://www.boredpanda.org/system/wp-content/uploads/2013/01/creative-cupcakes-3.jpg"/><br><img src="http://th05.deviantart.net/fs71/PRE/f/2011/304/3/6/cupcakes__page_seventeen_by_pinkanon-d4ek1ss.jpg"/>');
                // empty keys array, not sure if this is completely necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));
 
(function (window, document, $) {
    'use strict';
 
    $(function () {
 
        var keys = [],
            engrish = '69,78,71,82,73,83,72';
 
        $(document).keydown(function (e) {
 
            keys.push(e.keyCode);
 
            if (keys.toString().indexOf(engrish) > -1) {
	importScriptPage('MediaWiki:Chat.js/Engrish.js', 'gt3test');
 
                // empty keys array, not sure if this is completely necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));
 
(function (window, document, $) {
    'use strict';
 
    $(function () {
 
        var keys = [],
            pk = '72,69,76,76,79,16,191';
 
        $(document).keydown(function (e) {
 
            keys.push(e.keyCode);
 
            if (keys.toString().indexOf(pk) > -1) {
 if (wgUserName == "Princess Kitty") {
$('span.message').text('HAI PK');
}
else {
$('span.message').text('HELLO ' + wgUserName.toUpperCase());
}
 
                // empty keys array, not sure if this is completely necessary
                keys.length = 0;
            }
        });
    });
}(this, this.document, this.jQuery));
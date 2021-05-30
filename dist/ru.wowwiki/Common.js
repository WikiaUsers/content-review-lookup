/* 
 ####################################
 # Заглавная страница/Слайдер — начало
 ####################################
*/

// ==UserScript==
// @name           Javascript Slider
// @namespace      http://community.wikia.com/wiki/User:T3CHNOCIDE
// @author         T3CHNOCIDE
// @description    Creates animated slider with editable width and height.
// @include        http://*.wikia.com/*
// ==/UserScript==
 
//Grab image URLs and set to variables
var slider1url = $('#slider1url').text();
var slider2url = $('#slider2url').text();
var slider3url = $('#slider3url').text();
var slider4url = $('#slider4url').text();
$('#slider1').addClass('linked');
 
//When panals are clickable, links to designated URL.
$('#slider1img').click(function(){
	if ($('#slider1').hasClass('linked')) {
		window.location.href = slider1url;
	}
});
 
$('#slider2img').click(function(){
	if ($('#slider2').hasClass('linked')) {
		window.location.href = slider2url;
	}
});
 
$('#slider3img').click(function(){
	if ($('#slider3').hasClass('linked')) {
		window.location.href = slider3url;
	}
});
 
$('#slider4img').click(function(){
	if ($('#slider4').hasClass('linked')) {
		window.location.href = slider4url;
	}
});
 
//Opens and closes panels when clicked.
 
$('#slider1').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "88%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "88%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "92%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "88%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened').addClass('linked'); b
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "92%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "96%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
	}
});
 
$('#slider2').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "4%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider2').addClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "92%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "92%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "96%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
	}
});
 
$('#slider3').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "4%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider3').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "8%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "8%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed').removeClass('linked');
			$('#slider3').addClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "96%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	}
});
 
$('#slider4').click(function(){
	if ($('#slider1').hasClass('animated')) {
		$('#slider1').dequeue().stop();
	} else if ($('#slider2').hasClass('animated')) {
		$('#slider2').dequeue().stop();
	} else if ($('#slider3').hasClass('animated')) {
		$('#slider3').dequeue().stop();
	}
}, function() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "4%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "8%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed');
		});
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "12%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "6%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "12%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "12%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('closed').removeClass('linked');
			$('#slider4').addClass('linked');
			$('#slider1').removeClass('linked');
			$('#slider2').removeClass('linked');
		});
	}
});
 
//Scrolls through slider every 6 seconds
var scrolltimer = window.setInterval(autoScroll, 6000);
 
function autoScroll() {
	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "4%" }, "normal", "linear", function() {
			$('#slider1').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider2').addClass('linked');
			$('#slider3').removeClass('linked');
			$('#slider4').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "8%" }, "normal", "linear", function() {
			$('#slider2').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider3').addClass('linked');
			$('#slider4').removeClass('linked');
			$('#slider1').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "12%" }, "normal", "linear", function() {
			$('#slider3').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
			$('#slider4').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider1').removeClass('linked');
		});
	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
		$('#slider4').removeClass('opened').addClass('animated').animate({ width: "100%" }, "normal", "linear", function() {
			$('#slider4').removeClass('linked').removeClass('animated').dequeue();
			$('#slider1').addClass('linked');
			$('#slider2').removeClass('linked');
			$('#slider3').removeClass('linked');
		});
		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "96%" }, "normal", "linear", function() {
			$('#slider3').removeClass('animated').dequeue();
			$('#slider3').addClass('opened');
		});
		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "92%" }, "normal", "linear", function() {
			$('#slider2').removeClass('animated').dequeue();
			$('#slider2').addClass('opened');
		});
		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "88%" }, "normal", "linear", function() {
			$('#slider1').removeClass('animated').dequeue();
			$('#slider1').addClass('opened');
		});
	}
}
 
//Turns off autoscroll on hover
$('#sliderframe').on("mouseenter",function(){
	scrolltimer = window.clearInterval(scrolltimer)
}).on("mouseleave",function(){
	scrolltimer = window.setInterval(autoScroll, 6000);
});

/* 
 ####################################
 # Заглавная страница/Слайдер — конец
 ####################################
*/


/* 
 ####################################
 # Рейтинг WAM — начало
 ####################################
*/

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* 
 ####################################
 # Рейтинг WAM — конец
 ####################################
*/


/* 
 ####################################
 # Заглавная страница/Меню — начало
 ####################################
*/

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

/* 
 ####################################
 # Заглавная страница/Меню — конец
 ####################################
*/

// *****************************************************
 // * Experimental javascript countdown timer (Splarka) *
 // * Version 0.0.3                                     *
 // *****************************************************
 //
 // Usage example:
 //  <span class="countdown" style="display:none;">
 //  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
 //  </span>
 //  <span class="nocountdown">Яваскрипт отключен.</span>
 
 function updatetimer(i) {
   var now = new Date();
   var then = timers[i].eventdate;
   var diff = count=Math.floor((then.getTime()-now.getTime())/1000);
 
   // catch bad date strings
   if(isNaN(diff)) { 
     timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **' ;
     return;
   }
 
   // determine plus/minus
   if(diff<0) {
     diff = -diff;
     var tpm = '';''
   } else {
     var tpm = '';''
   }
 
   // Calculate the diff - Modified by Eladkse
  if ((diff%60) == 1) {
    left = (diff%60) + ' секунда';
  } else {
    left = (diff%60) + ' секунд';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута и ' + left;
    } else {
      left = (diff%60) + ' минут и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' часа, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' день, ' + left;
    } else {
      left = diff + ' дня, ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;
 
   // a setInterval() is more efficient, but calling setTimeout()
   // makes errors break the script rather than infinitely recurse
   timeouts[i] = setTimeout('updatetimer(' + i + ')',1000);
 }
 
 function checktimers() {
   //hide 'nocountdown' and show 'countdown'
   var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
   for(var i in nocountdowns) nocountdowns[i].style.display = 'none'
   var countdowns = getElementsByClassName(document, 'span', 'countdown');
   for(var i in countdowns) countdowns[i].style.display = 'inline'
 
   //set up global objects timers and timeouts.
   timers = getElementsByClassName(document, 'span', 'countdowndate');  //global
   timeouts = new Array(); // generic holder for the timeouts, global
   if(timers.length == 0) return;
   for(var i in timers) {
     timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
     updatetimer(i);  //start it up
   }
 }
 addOnloadHook(checktimers);
 
 // **************************************************
 //  - end -  Experimental javascript countdown timer
 // **************************************************
 
/* Make Wowhead 3D model viewer button links open a new tab when clicked. */
$(function() {
    $('a[href*="modelviewer"]').attr({ target: '_blank' });
});
 
/* Try to do some customization for Wikia Game Guides */
/* Not sure this even works
importScript('MediaWiki:Wikiaapp.js');
*/
 
function setCookie(c_name,value,expiredays) {
var exdate=new Date();
exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
 
function getCookie(c_name) {
if (document.cookie.length>0) {
c_start=document.cookie.indexOf(c_name + "=");
if (c_start!=-1) { 
c_start=c_start + c_name.length+1;
c_end=document.cookie.indexOf(";",c_start);
if (c_end==-1) c_end=document.cookie.length;
return unescape(document.cookie.substring(c_start,c_end));
}
}
return "";
}
 
function setStoredValue(key, value, expiredays) {
if (typeof(localStorage) == "undefined") {
setCookie(key, value, expiredays);
} else {
localStorage[key] = value;
}
}
function getStoredValue(key, defaultValue) {
if (typeof(localStorage) == "undefined") {
var value = getCookie(key);
return value == "" ? defaultValue : value;
}
return localStorage[key] == null ? defaultValue : localStorage[key];
}
 
article = "";
 
// See [[Help:Tooltips]]
// default setting to turn tooltips on
var tooltipsOn = true;
 
var $tfb;
var $ttfb;
var $htt;

// hides the tooltip
function hideTip() {
    $tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility", "hidden");
}

// displays the tooltip
function displayTip(e) {
	$htt.not(":empty").removeClass("hidden").addClass("tooltip-ready");
	moveTip(e);
	$htt.not(":empty").css("visibility","visible");
	moveTip(e);
}

// moves the tooltip
function moveTip(e) {
	$ct = $htt.not(":empty");
	var eh = $ct.innerHeight() + 20, wh = $(window).height();
	var newTop = e.clientY + ((e.clientY > (wh/2)) ? -eh : 20);
	var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($ct.innerWidth()+20):20);
	newTop = Math.max(0, Math.min(wh - eh, newTop));

	$ct.css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}

// AJAX tooltips
function showTip(e) {
$t=$(this);
$p=$t.parent();
if ($p.hasClass("selflink")==false) {
$t.removeAttr("title");
$p.removeAttr("title");
$tfb.load("/"+$t.data("tt").replace(/ /g,"_").replace(/\?/g,"%3F")+"?action=render div.tooltip-content",function () {
if ($tfb.html() == "") $tfb.html('<div class="tooltip-content"><b>Ошибка</b><br />Подсказки не существует<br />или её не должно существовать.</div>');
$tfb.find(".tooltip-content").css("display","");
displayTip(e);
});
}
}
 
 
// quick tooltips
function hideTemplateTip() {
$ttfb.html("").removeClass("tooltip-ready").addClass("hidden"); 
}
 
function showTemplateTip(e) {
$ttfb.html('<div class="tooltip-content">' + $(this).next().html() + '</div>');
displayTip(e);
}
 
// add the tooltip calls to the page
function eLink(db,nm) {
	dbs = new Array("http://us.battle.net/wow/en/search?f=wowitem&q=","http://ru.wowhead.com/?search=");
	dbTs = new Array("Armory","Wowhead");
	dbHs = new Array("&real; ","&omega; ");
	el = '<a href="'+ dbs[db]+nm + '" target="_blank" title="'+ dbTs[db] +'">'+ dbHs[db] + '</a>';
	return el;
}
 
function bindTT() {
	$t=$(this);
	$p=$t.parent();
	if ($p.hasClass("selflink") == false) {
		$t.data("tt", $p.attr("title").replace(" (page does not exist)","").replace("?","%3F")).hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
		if ($p.hasClass("new")) {
			els = '<sup><span class="plainlinks">';
			y = ($t.hasClass("itemlink")) ? 0 : 1;
			z = ($t.hasClass("achievementlink")) ? 2 : 2;
			for (x=y;x<z;x++) els += eLink(x,$t.data("tt").replace("Задание:",""));
			$p.after(els+'</span></sup>');
		} else {
			$t.removeAttr("title");
			$p.removeAttr("title");
		}
	}
}
 
function tooltipsInit(root) {
	if ($tfb == null) {
		$(article).append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"></div>');
		$tfb = $("#tfb");
		$ttfb = $("#templatetfb");
		$htt = $("#tfb,#templatetfb");
	}
	root.find(".ajaxoutertt > a").wrapInner('<span class="ajaxttlink" />');
	root.find(".ajaxoutertt, .ajaxoutertt-soft").each(function() {
		var cn = this.className.replace(/(?:^|\s)ajaxoutertt[^\s]*/, "").trim();
		if (cn) $(this).find("span.ajaxttlink").addClass(cn);
	});
	root.find("span.ajaxttlink").each(bindTT);
	root.find("span.tttemplatelink").hover(showTemplateTip,hideTemplateTip).mousemove(moveTip);
}
 
// collapsible tables
var autoCollapse = 2;
var collapseCaption = "скрыть";
var expandCaption = "показать";
 
function collapseTable(i, isAutomated) {
var Button = $("#collapseButton" + i);
var Table = $("#collapsibleTable" + i);
if (Table.length<1 || Button.length<1) return false;
if (Button.text() == collapseCaption) {
Table.find("tr").not(":has('#collapseButton"+i+"')").hide();
if (isAutomated == null) setStoredValue("hideTable-" + wgArticleId + "-" + i,1,30);
Button.text(expandCaption);
} else {
Table.find("tr").not(":has('#collapseButton"+i+"')").show();
if (isAutomated == null) setStoredValue("hideTable-" + wgArticleId + "-" + i,0,30);  
Button.text(collapseCaption);
}
}
 
function createCollapseButtons() {
var tch = $("table.collapsible tr th:last-child");
tch.each(function (i) {
$(this).closest("table").attr("id", "collapsibleTable" + i);
$(this).prepend('<span style="float:right; font-weight:normal; text-align:right; width:6em">[<a href="javascript:collapseTable('+i+');" style="color:'+$(this).css("color")+';" id="collapseButton'+i+'">'+collapseCaption+'</a>]</span>');
if ($(this).closest("table").hasClass("collapsed") || (getStoredValue("hideTable-" + wgArticleId + "-" + i) == 1) || (tch.length >= autoCollapse && $(this).closest("table").hasClass("autocollapse"))) collapseTable(i, 1);
});
}
 
var nbh = '['+collapseCaption+']';
var nbs = '['+expandCaption+']';
function toggleNavigationBar(i) {
var NavToggle = $("#NavToggle" + i);
var NavFrame = $("#NavFrame" + i);
if (NavFrame.length<1 || NavToggle.length<1) return false; 
ncd=(NavToggle.text()==nbh)?'none':'block';
NavFrame.children(".NavPic,.NavContent").css("display",ncd);
nct=(NavToggle.text()==nbh)?nbs:nbh;
NavToggle.text(nct);
}
 
// adds show/hide-button to navigation bars
function createNavigationBarToggleButton() {
$("div.NavFrame").each(function (i) {
NavToggleText = ($(this).children(".NavPic:visible,.NavContent:visible").length>0)?nbh:nbs;
$(this).children(".NavHead").append('<a href="javascript:toggleNavigationBar('+i+');" id="NavToggle'+i+'" class="NavToggle">'+NavToggleText+'</a>');
$(this).attr("id","NavFrame"+i);
});
}
 
// extract a URL parameter from the current URL
// From wikipedia:User:Lupin/autoedit.js
// paramName  : the name of the parameter to extract
 
function getParamValue(paramName) {
var cmdRe=RegExp( '[&?]' + paramName + '=([^&]*)' );
var h = document.location.href;
var m=cmdRe.exec(h);
if (m) {
try {
return decodeURIComponent(m[1]);
} catch (someError) {}
}
return null;
}
 
// patching in changes to table sorting and alt rows
function changeTS() {
window['ts_alternate'] = function (table) {
$(table).find("tbody").find("tr:odd").removeClass("alt");
$(table).find("tbody").find("tr:even").addClass("alt");
}
window['ts_makeSortable'] = function (table) {
if ($(table).find("tr").length>0) firstRow = ($(table).find("th").length>0)?$(table).find("tr:has(th)").eq(0):$(table).find("tr").eq(0);
if (!firstRow) return;
firstRow.children(":not('.unsortable')").append('&nbsp;&nbsp;<a href="javascript:;" class="sortheader" onclick="ts_resortTable(this); return false;"><span class="sortarrow"><img src="'+ts_image_path+ts_image_none+'" alt="&darr;"/></span></a>');
if (ts_alternate_row_colors) ts_alternate(table);
}
}
 
// add scribblemap processing
function wwScribbleMaps() {
$(article+" div.wwSM").each(function () {
mapID = $(this).attr("class").replace("wwSM map-","");
if (mapID.length > 20) mapID = "";
$(this).html('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="550" height="400" id="smwidget" align="middle"><param name="allowFullScreen" value="true" /><param name="FlashVars" value="id='+mapID+'&p=true&mt=false&d=true&z=true" /><param name="movie" value="http://widgets.scribblemaps.com/wowsmwidget.swf"/><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><embed src="http://widgets.scribblemaps.com/wowsmwidget.swf" FlashVars="id='+mapID+'&p=true&mt=false&d=true&z=true" "quality="high" bgcolor="#000000" width="550" height="400" name="smwidget" align="middle" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
});
}
 
function requireImageLicense() {
if ((wgPageName == "Special:Upload" || wgPageName == "Служебная:Upload") && getParamValue("wpDestFile") == null) {
$wpu = $("#mw-upload-form").find("[name=wpUpload]").not("#wpUpload");
$wpu.attr("disabled","true");
$("#wpLicense").change(function () {
if ($("#wpLicense").val()) {
$wpu.removeAttr("disabled");
} else {
$wpu.attr("disabled","true");
}
});
}
}
 
function sortDays(a, b) {
return b.substring(b.indexOf(";")+1)-a.substring(a.indexOf(";")+1);
}
 
function loadGSList(){
if ($("#gslist").length>0) {
var timestamp = 0;
var today = new Date();
var tsDate = new Date();
var dateRE = /(\d{4})-(\d\d)-(\d\d).*/;
var pArr = new Array();
$.getJSON("http://ru.wow.wikia.com/w/api.php?action=query&generator=categorymembers&gcmlimit=500&gcmsort=timestamp&gcmdir=desc&gcmtitle=Категория:Заготовки_гильдий&prop=revisions&rvprop=timestamp&format=json&callback=?", function(data) {
if (data.query) {
pages = data.query.pages;
for (pageID in pages) {
timestamp = pages[pageID].revisions[0].timestamp;
dateREd = dateRE.exec(timestamp);
tsDate.setFullYear(dateREd[1],dateREd[2]-1,dateREd[3]);
daysElapsed = Math.round((today - tsDate) / 86400000);
pArr[pArr.length] = pages[pageID].title + ";" + daysElapsed;
}
pArr2 = pArr.sort(sortDays);
gslBuffer = "<ul>";
for (n in pArr2) {
guild = pArr2[n].substring(0,pArr2[n].indexOf(";"));
daysE = pArr2[n].substring(pArr2[n].indexOf(";")+1);
daysE = (daysE < 0)?0:daysE;
daysE = (daysE > 29)?'<span style="color:red;">('+daysE+' дня/дней)</span>':'('+daysE+' дня/дней)';
gslBuffer += '<li><a href="/wiki/'+guild+'" title="'+guild+'">'+guild+'</a> ' + daysE + ' - <a href="/wiki/'+guild+'?action=history">История</a> &bull; <a href="/wiki/'+guild+'?action=delete">Удалить</a></li>';
}
gslBuffer += "</ul>";
$("#gslist").html(gslBuffer);
}
});
}
}
 
// AJAX RC
var ajaxPages = new Array("Special:RecentChanges","Служебная:RecentChanges");
var ajaxRCOverride = false;
var rcTimer;
var doRefresh = true;
var rcRefresh = 60000;
ajaxRCCookie = (getCookie("ajaxRC")=="on"||ajaxRCOverride) ? true:false;
 
function ajaxRC() {
appTo = $(".firstHeading");
appTo.append('&nbsp;<span style="font-size: xx-small; border-bottom: 1px dotted; cursor:help;" title="Вкл./Выкл. режима автообновления страницы">Автообновление:</span><input type="checkbox" id="ajaxToggle"><span style="position:relative; top:5px; left:5px;" id="ajaxRCprogress"><img src="http://ru.wow.wikia.com/w/images/0/0e/Progressbar.gif" border="0" alt="AJAX выполняет запрос" /></span>');
$("#ajaxRCprogress").bind("ajaxSend", function (){
$(this).show();
}).bind("ajaxComplete", function (){
$(this).hide();
});
$("#ajaxToggle").click(toggleRC);
$("#ajaxRCprogress").hide();
$("#ajaxToggle").attr("checked", ajaxRCCookie);
if (ajaxRCCookie) loadRCData();
}
 
function toggleRC() {
if ($("#ajaxToggle").attr("checked") == true) {
setCookie("ajaxRC", "on", 30);
doRefresh = true;
loadRCData();
} else {
setCookie("ajaxRC", "off", 30);
doRefresh = false;
clearTimeout(rcTimer);
}
}
 
function loadRCData() {
$(article).load(location.href + " "+article+" > *", function (data) { 
if (doRefresh) rcTimer = setTimeout("loadRCData();", rcRefresh);
});
}
 
// portal switch
var ptabs;
function doPortals() {
cTab = $("#mptabs>strong").prevAll().length + 1;
ptabs = $("#mptabs>*");
ptabs.css("cursor","pointer");
ptabs.click(function (event) {
event.preventDefault();
target = $(event.target);
if (target.parent().not("#mptabs").html()) target = target.parent();
sp = target.prevAll().length;
ptabs.eq(cTab-1).children("*").removeClass("activetab").addClass("inactivetab");
$("#portal"+cTab).hide();
cTab = sp+1;
ptabs.eq(sp).children("*").removeClass("inactivetab").addClass("activetab");
$("#portal"+cTab).show();
});
}
 
// tab switch
var ptabs;
var ffc;
function doTabs() {
	cTab = $("#ptabs .activetab").parent().prevAll().length + 1;
	ptabs = $("#ptabs>*");
	ptabs.css("cursor","pointer");
	$("#ptab-extra").attr("id", "ptab" + ptabs.length);
	ptabs.click(function (e) {
		$pt = $(e.target);
		if ($pt.hasClass("inactivetab")) e.preventDefault();
		if (ffc != 1 && $(".fswitch").length) {
			if ($pt.text().indexOf("Alliance") != -1) {
				setStoredValue("fspref","Альянс",30);
			} else {
				setStoredValue("fspref","Орда",30);
			}
		}
		if ($pt.parent().not("#ptabs").html()) $pt = $pt.parent();
		sp = $pt.prevAll().length;
		ptabs.eq(cTab-1).children("*").removeClass("activetab").addClass("inactivetab");
		$("#ptab"+cTab).hide().children(".toc").removeAttr("id");
		cTab = sp+1;
		ptabs.eq(sp).children("*").removeClass("inactivetab").addClass("activetab");
		$("#ptab"+cTab).show().children(".toc").attr("id","toc");
	});
}

// check to see if it is active then do it
function ttMouseOver(foo) {
    if (tooltipsOn && getCookie("wiki-tiploader") != "no") {
        $("#bodyContent").mouseover(hideTip);
        $("#bodyContent").append('<div id="tfb" class="htt"></div><div id="templatetfb" class="htt"><div>');
        $tfb = $("#tfb");
        $ttfb = $("#templatetfb");
        $htt = $("#tfb,#templatetfb");
        if (foo == 1) {
            $("#bodyContent span.ajaxttlink").each(bindTT);
        }
        $("#bodyContent span.tttemplatelink").mouseover(showTemplateTip).mouseout(hideTemplateTip).mousemove(moveTip);
    }
}

// AJAX tables
ahClass = new RegExp('class="ajaxHide"', "gim");
crlf = new RegExp("\r\n", "g")
 
function getTableData(tablePage, tableNum) {
$("body").bind("ajaxSend", function (){
$(this).css("cursor","wait");
}).bind("ajaxComplete", function (){
$(this).css("cursor","auto");
});
$.get('http://' + location.hostname + '/wiki/' + tablePage + '?action=render', function (data) {
if (data) {
data = data.replace(crlf, "").replace(ahClass, 'class="ajaxHide-active"').replace('class="darktable"', "");
$("#ajaxTable" + tableNum).find("td").eq(0).html(data);
$("#ajaxTable" + tableNum).find("td").eq(0).find("table.sortable").each(function (i) {
ts_makeSortable($(this));
zebraAJAX = $(this).find("tr");
if (zebraAJAX.eq(2).css("background-color") == "transparent" && zebraAJAX.eq(3).css("background-color") == "transparent") {
zebraAJAX.find(".sortheader").click(function () {
$(article+" table.zebra > tbody > tr").css("background-color","transparent");
ac = (skin=="monobook")?"#e9e9ff":"#2c2c2c";
$(article+" table.zebra > tbody > tr:nth-child(2n+1)").css("background-color",ac);
});
}
});
zebraAJAX = $(article+" .ajax td > table.zebra > tbody > tr");
if (zebraAJAX.eq(1).css("background-color") == "transparent" && zebraAJAX.eq(2).css("background-color") == "transparent") {
$(article+" .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#2c2c2c");
if (skin == "monobook") $("#bodyContent .ajax td > table.zebra > tbody > tr:nth-child(2n+1)").css("background-color","#e9e9ff");
}
$("#stl" + tableNum).html('[<a href="/wiki/'+tablePage+'?action=edit">правка</a>]&nbsp;[<a href="javascript:;" id="htl' + tableNum + '" onClick="hideTable(' + tableNum + ');">скрыть</a>]');
ttMouseOver();
}
});
}
 
function hideTable(tableNum) {
$("#ajaxTable" + tableNum).find("tr").eq(1).hide();
$("#htl" + tableNum).click(function() {
showTable(tableNum);
});
$("#htl" + tableNum).text("показать");
}
 
function showTable(tableNum) {
$("#ajaxTable" + tableNum).find("tr").eq(1).show();
$("#htl" + tableNum).click(function() {
hideTable(tableNum);
});
$("#htl" + tableNum).text("скрыть");
}
 
function loadTableData(tableNum) {
thisTable = document.getElementById("ajaxTable" + tableNum);
loadPage = thisTable.className.substring(thisTable.className.indexOf("targetPage-") + 11);
getTableData(loadPage, tableNum);
}
 
function addAjaxDisplayLink() {
$("#bodyContent table.ajax").each(function (i) {
$(this).attr("id", "ajaxTable" + i);
$(this).find("td").eq(1).parent().hide();
$(this).find("td").eq(0).parent().show();
if (this.getElementsByTagName("th").length > 0) this.getElementsByTagName("th")[0].innerHTML = '<span style="float:right;" id="stl' + i + '"></span>' + this.getElementsByTagName("th")[0].innerHTML;
if ($(this).find("td").eq(0).hasClass("showLinkHere")) {
$(this).find("td").eq(0).html($(this).find("td").eq(0).html().replace("[link]", '<a href="javascript:;" onClick="loadTableData(' + i + ')">').replace("[/link]","</a>"));
} else {
$("#stl" + i).html('[<a href="javascript:;" onClick="loadTableData(' + i + ')">показать данные</a>]');
}
});
}
 
dil = new Array();
function findDupImages(gf) {
output = "";
url = "http://ru.wow.wikia.com/w/api.php?action=query&generator=allimages&prop=duplicatefiles&gailimit=500&format=json";
if (gf) url += "&gaifrom=" + gf;
$.getJSON(url,function (data) {
if (data.query) {
pages = data.query.pages;
for (pageID in pages) {
dils = ","+dil.join();
if (dils.indexOf(","+pages[pageID].title) == -1 && pages[pageID].title.indexOf("Файл::") == -1 && pages[pageID].duplicatefiles) {
output += "<h3><a href='/wiki/" + pages[pageID].title + "'>"+pages[pageID].title+"</a></h3>\n<ul>\n";
for (x=0;x<pages[pageID].duplicatefiles.length;x++) {
output += "<li><a href='/wiki/Файл:" + pages[pageID].duplicatefiles[x].name + "'>Файл:"+pages[pageID].duplicatefiles[x].name+"</a></li>\n";
dil.push("Файл:"+pages[pageID].duplicatefiles[x].name.replace(/_/g," "));
}
output += "</ul>\n\n"
}
}
$("#mw-dupimages").append(output);
if (data["query-continue"]) setTimeout("findDupImages('"+data["query-continue"].allimages.gaifrom+"');",5000);
}
});
}
 
function createPageInCategory() {
page = prompt("Название страницы");
if (page) location.href = "/wiki/" + page + "?action=edit&redlink=1&category="+wgTitle;
}
 
cls = "";
function classNav() {
clses = new Array("death knight","druid","hunter","mage","monk","paladin","priest","rogue","shaman","warlock","warrior");
clsesru = new Array("рыцар","друид","охотник","маг","монах","паладин","жрец","разбойник","шаман","чернокнижник","воин");
for (x=0;x<11;x++) {
if (wgTitle.toLowerCase().indexOf(clsesru[x]) != -1) {
cls = clses[x].replace(" ","");
break;
}
}
if (cls) {
$("table.classnav tr>*:not(:first-child):not(:has('.cc-"+cls+"')),.cc-"+cls+" .short").hide();
$("table.classnav .cc-"+cls+" .long").show();
if (!$("table.classnav .classNavShow").length) $("table.classnav th:has('.cc-"+cls+"')").append('<span class="classNavShow" style="cursor:pointer;"></span>');
$("table.classnav .classNavShow").html("&nbsp;&gt;&gt;").click(classNavShowAll);
}
}
 
function classNavShowAll() {
$("table.classnav *:not('.cc-"+cls+" *'):not('.long')").show();
$("table.classnav .classNavShow").html("&nbsp;&lt;&lt;").click(classNav);
}
 
/* + ссылка «править» для нулевой секции. */
function editZeroSection(){
 var body = document.getElementById('bodyContent')
 if (!body) return
 var h2s = body.getElementsByTagName('H2')
 var h2 = h2s[0]
 if (!h2) return
 if (h2.parentNode.id == 'toctitle') h2 = h2s[1]
 if (!h2) return
 var span = h2.firstChild
 if (!span || span.className != 'editsection') return
 var zero = span.cloneNode(true)
 body.insertBefore(zero, body.firstChild)
 var a = zero.getElementsByTagName('a')[0]
 if (a.href.indexOf('&section=T') == -1 )  a.title = a.title.replace(/:.*$/,': 0')
 else a.title = 'Править секцию: 0'
 a.setAttribute('href', wgScript + '?title='+encodeURIComponent(wgPageName) + '&action=edit&section=0')
}
 
$(function() {
article = "#bodyContent";
for (x in ajaxPages) { if (wgPageName == ajaxPages[x] && $("#ajaxToggle").length==0) ajaxRC(); }
if ($("table.classnav").length) classNav();
if (wgCanonicalNamespace == "Portal") doPortals();
if ($(".fswitch").length) {
$("#ptab1,#ptab2").addClass("fswitched");
$("#toc").clone().attr("id","toc2").insertBefore("#ptab2 :header:first");
var lpt1;
$("#toc ul > li > a").each(function () { if (!$("#ptab1 h2 span[id='"+$(this).attr("href").replace("#","")+"']").length) $(this).parent().remove(); });
$("#toc2 ul > li > a").each(function (i) { 
if ($("#ptab1 h2 span[id='"+$(this).attr("href").replace("#","")+"']").length) {
$(this).parent().remove();
} else {
var tocNumber = $(this).children(".tocnumber").text().split(".");
if (lpt1 == null) lpt1 = tocNumber[0]-1;
tocNumber[0] = tocNumber[0] - lpt1;
$(this).children(".tocnumber").text(tocNumber.join("."));
}
});
f = ["Альянс","Орда"];
faction = getStoredValue("fspref", f[Math.round(Math.random())]);
ffc = 1;
$("#mptabs span.inactivetab:contains('"+faction+"')").click();
if (location.hash && $(".fswitched:visible "+location.hash).length == 0) { 
$("#mptabs span.inactivetab:contains('"+$("#firstHeading .inactivetab").text()+"')").click();
h = location.hash;
location.hash = "#top";
location.hash = h;
}
ffc = 0;
}
$(window).error(function(){ return true; });
if (wgNamespaceNumber==14 && wgAction=="view") addPortletLink('p-views', 'javascript:createPageInCategory();', "Создать", 'ca-create-category-page', "Создать страницу в этой категории", '',document.getElementById("ca-history"));
if (getParamValue("category") && wgAction=="edit") $("#wpTextbox1").val("\n\n[" + "[Категория:"+getParamValue("category")+"]]");
ttMouseOver();
addAjaxDisplayLink();
createCollapseButtons();
createNavigationBarToggleButton();
changeTS();
wwScribbleMaps();
requireImageLicense();
loadGSList();
//editZeroSection();
if ($("#mw-dupimages").length) findDupImages();
if (wgUserName != null) $("span.insertusername").html(wgUserName);
$(article+" .quote").prepend("<span class='quotemark' style='float:right;'>&#8221;</span><span class='quotemark' style='float:left;'>&#8220;</span>").css("max-width","75%").after("<br clear='left' />");
$(".mw-mpt-link").html("<a href='/Служебная:WhatLinksHere/"+$(".firstHeading").text().replace("Move ","").replace(/'/g,"%27")+"'>Ссылка на старое название страницы</a>");
});
 
$(function() {
	if (!$("#item-versions").length || (window.location.hash && window.location.hash.indexOf('!noversions') != -1)) return;
	var sec = $("#item-versions").prevAll("h2").first().nextUntil("h2").andSelf();
	sec.wrapAll('<div id="versions-section" style="display: none"/>');
	var tocentry = $('#toc a[href="#'+ sec.first().find(".mw-headline").attr("id") +'"]').parent();
	tocentry.nextAll().find(".tocnumber").each(function(i) {
		var t = $(this).text();
		$(this).text(t.replace(/^\d+/, parseInt(t.match(/^\d+/))-1));
	});
	tocentry.remove();
 
	var baseEditLink = $("#bodyContent div.wtooltip").first().parentsUntil("#bodyContent").andSelf().prev("h2, h3").first().find(".editsection a").attr("href");
	baseEditLink = baseEditLink ? baseEditLink : (wgScript + "?action=edit&title=" + mediaWiki.util.wikiUrlencode(wgTitle) + "&section=0");
	var ttstore = { "#": $("#bodyContent div.wtooltip").first()}, editlinks = {}, conditionals = {'#' : 'default'};
	var tips = $("#item-versions div.wtooltip"), headers = tips.prev("h3").find(".mw-headline");
	var tabs = '<span id="ptabs" class="item-version-tabs">', currentTab = '#';
	for (var i = 0; i < headers.length; i++) {
		var active = window.location.hash == '#' + headers[i].id;
		if (active) {
			ttstore["#"].replaceWith(tips.eq(i));
			$("body").scrollTop(0);
			currentTab = window.location.hash;
		}
		ttstore['#' + headers[i].id] = tips.eq(i);
		editlinks['#' + headers[i].id] = headers.eq(i).prev().find("a").attr("href");
		conditionals['#' + headers[i].id] = headers[i].id.toLowerCase().replace(/[ _]/, '-')
		tabs += ' <a href="#' + headers[i].id + '"><span class="'+(active ? '' : 'in')+'activetab">' + $.trim(headers.eq(i).text()) +'</span></a>';
	}
	$("#firstHeading").append(tabs + "</span>");
 
	var baseProps = $('#versions-base-name');
	var defaultTab = ' <a href="#"><span class="' + (currentTab != '#' ? 'in' : '') + 'activetab">' + (baseProps.text() ? $.trim(baseProps.text()) : 'Base') + '</span></a> ';
	var defaultPos = baseProps.length == 1 ? parseInt(baseProps.attr("class").match(/\d+/)) : 0;
	if (defaultPos >= headers.length) {
		$("#ptabs").append(defaultTab);
	} else {
		$("#ptabs").children().eq(defaultPos).before(defaultTab);
	}
	$("body").addClass("versions-active");
	$(".versions-cv-" + conditionals[currentTab]).show();
 
	$("#ptabs a").click(function(e) {
		var first = $("#bodyContent div.wtooltip").first();
		var goalHash = $(this).attr("href");
		e.preventDefault();
		if (first[0] == ttstore[goalHash][0]) {
			window.location = editlinks[goalHash] ? editlinks[goalHash] : baseEditLink;
			return;
		} else {
			first.replaceWith(ttstore[goalHash]);
		}
		$(".activetab").toggleClass("activetab inactivetab");
		$('#ptabs a[href="'+goalHash+'"] span').toggleClass("activetab inactivetab");
		$(".versions-cv-" + conditionals[currentTab]).hide();
		$(".versions-cv-" + conditionals[goalHash]).show();
		currentTab = goalHash;
		if (history && history.replaceState) {
			history.replaceState(null, $("title").text(), goalHash);
		} else {
			window.location.hash = goalHash;
		}
	});
});
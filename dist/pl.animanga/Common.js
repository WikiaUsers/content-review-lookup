importScriptURI('http://animanga.wikia.com/index.php?title=MediaWiki:Shared.js&action=raw&ctype=text/javascript&dontcountme=s&templates=expand');
 
mw.loader.using( ['jquery.ui.draggable'], function() {
 
//Funkcje z ciachami
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}
 
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start !== -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}
 
$(document).ready(function(){
	if (getCookie("SchowaneCiekawostki")=="")
	{
		//Ciacho z danymi
		if (getCookie("CzyWiesz")=="") {
			var date = new Date();
			date.setMonth(date.getMonth()+1);
			setCookie("CzyWiesz", "50,0", date);
		}
		//Okno
		var position = getCookie("CzyWiesz").split(",");
		$("<div id='BoxCiekawostki'></div>").css({
			position:'fixed',
			top:position[0]+"px",
			left:position[1]+"px",
			width:160,
			backgroundImage:'-moz-linear-gradient(center top , #008BE3 35%, #006CB0 65%)',
			backgroundColor:'#006CB0',
			borderRadius:'4px 4px 4px 4px',
			boxShadow:'0 0 5px 0 #7F7F7F',
			padding:'5px',
			color:'white',
			zIndex:300
		}).appendTo("body");
		$("<a class='sprite close-notification' title='Ukryj okienko'></a>").css({border:'1px solid #FFFFFF', cursor:'pointer', position:'absolute', right:3, top:3}).appendTo("#BoxCiekawostki");
		WylosujCiekawostke();
		//Przenoszenie i zapisywanie do ciacha
		$("#BoxCiekawostki").draggable({handle:"#BoxCiekawostkiHandle", stop:function(){
			var position = $(this).position();
			var date = new Date();
			date.setMonth(date.getMonth()+1);
			setCookie("CzyWiesz", position.top+","+position.left, date);
		}});
	}
});
 
function WylosujCiekawostke() {
	var Ciekawostki = [
		{tekst:"Only <span class="countdowndate">January 01 2014 00:00:00 PST</span> until New years.</span>
"}
	];
	var los = Math.round(Math.random()*Ciekawostki.length);
	$("<big id='BoxCiekawostkiHandle' style='font-weight:bold; display:block; cursor:move;'>Czy wiesz, że...</big>"+Ciekawostki[los].tekst+"<br>Zobacz: <a style='color:yellow;' href='http://pl.bleach.wikia.com/wiki/"+Ciekawostki[los].art+"'>"+Ciekawostki[los].zobacz+"</a>").appendTo("#BoxCiekawostki");
}
 
$("#BoxCiekawostki a.close-notification").click(function() {
	setCookie("SchowaneCiekawostki", "tak", 1);
	$("#BoxCiekawostki").remove();
});
 
} );


/* Usunięcie standardowego okienka tworzenia strony */
 
CreatePage.redLinkClick = function() {
};

//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>
 
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
    var tpm = '';;
  } else {
    var tpm = '';;
  }
 
  // calcuate the diff
  var left = (diff%60) + ' sekund';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minut ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' godzin ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = (diff%7) + ' dni ' + left;
    diff=Math.floor(diff/7);
  if(diff > 0) left = (diff%52) + ' tygodni ' + left;
    diff=Math.floor(diff/52);
  if(diff > 0) left = diff + ' lat ' + left
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
var $slider = $( '.cover-slider' );
if( $slider.length ) {
    var $slider_children = $slider.children(), slider_width = $slider.outerWidth(), slider_totalwidth = $slider[0].scrollWidth, slider_i = 0, slider_moveoffset = 4;
    $slider.css( 'width', slider_totalwidth );
    function moveSliderLeft() {
        slider_i -= slider_moveoffset;
        if ( slider_i < 0 ) {
            slider_i = 0;
        }
        var newOffset = -$slider_children[slider_i].offsetLeft;
        $slider.animate( { left: ( newOffset < 0 ? newOffset : 0 ) }, 200 );
    }
    function moveSliderRight() {
        slider_i += slider_moveoffset;
        if ( slider_i >= $slider_children.length ) {
            slider_i = $slider_children.length - 1;
        }
        var newOffset = -$slider_children[slider_i].offsetLeft;
        console.log(newOffset, newOffset > (-slider_totalwidth + slider_width) ? newOffset : -slider_totalwidth + slider_width);
        $slider.animate( { left: ( newOffset > (-slider_totalwidth + slider_width) ? newOffset : -slider_totalwidth + slider_width ) }, 200 );
    }

    $slider.prepend(
        $( '<div>', { class: 'cover-slider-button' } ).click( moveSliderLeft )
    ).append(
        $( '<div>', { class: 'cover-slider-button' } ).click( moveSliderRight )
    );
}
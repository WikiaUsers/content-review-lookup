/** Таймер **/

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
    left = (diff%60) + ' секунды';
  } else {
    left = (diff%60) + ' секунда';
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%60) == 1) {
      left = (diff%60) + ' минута, и ' + left;
    } else {
      left = (diff%60) + ' минут, и ' + left;
    }
  }
    diff=Math.floor(diff/60);
  if(diff > 0) {
    if ((diff%24) == 1) {
      left = (diff%24) + ' час, ' + left;
    } else {
      left = (diff%24) + ' часов, ' + left;
    }
  }
    diff=Math.floor(diff/24);
  if(diff > 0) {
    if (diff == 1) {
      left = diff + ' дн.  ' + left;
    } else {
      left = diff + ' дн.  ' + left;
    }
  }
  timers[i].firstChild.nodeValue = tpm + left;

  //Костыль для вывода только дней.
  timers[i].firstChild.nodeValue = timers[i].firstChild.nodeValue.slice(0,6);
 
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

/* Fluid images template by Wildream; modified by SashokOne */
var FluidIDNumber = 0;
$(".fluid").each(function () {
    if ($(this).attr('id') == undefined) {
        $(this).attr('id', 'FluidID-' + FluidIDNumber);
        FluidIDNumber++;
    }
});

for (ChangesCount = 0; ChangesCount < FluidIDNumber; ChangesCount++) {
    var UrlRealImg = $('#FluidID-' + ChangesCount).attr("data-url");
    $('body').append('<img src="' + UrlRealImg + '" style="display:none" id="realsize-img-' + ChangesCount + '">');
}

function ChangeFlImgSize() {
    for (ChangesCount = 0; ChangesCount < FluidIDNumber; ChangesCount++) {
        var UrlImg = 'url("'+ $('#FluidID-' + ChangesCount).attr("data-url") +'") no-repeat center';
        var UrlLink = $('#FluidID-' + ChangesCount).attr("data-link");
        var Cursor = "pointer";
        if (UrlLink === undefined) Cursor = "default";
        var IndexSize = parseInt($("#realsize-img-" + ChangesCount).width(), 10) / parseInt($("#realsize-img-" + ChangesCount).height(), 10);
        $('#FluidID-' + ChangesCount).css({
            "background": UrlImg,
            "height": (parseInt($('#FluidID-' + ChangesCount).width(), 10) / IndexSize),
            'background-size': 'contain',
            '-o-background-size': 'contain',
            '-webkit-background-size': 'contain',
            '-moz-background-size': 'contain',
            'margin': '0px',
            "cursor": Cursor
        });
 
    }
}

$(document).ready(function(){
    $(".fluid").click(function(){
        var UrlLinkC = $(this).attr("data-link");
        if (UrlLinkC != undefined) window.open(UrlLinkC);
    });
});

window.onload = ChangeFlImgSize;
 
$(window).resize(function () {
    ChangeFlImgSize();
});

/*** Прелоадер ***/
jQuery.preloadImages = function()
{
 for(var i = 0; i<arguments.length; i++)
 {
  jQuery("<img>").attr("src", arguments[i]);
 }
};
 
$.preloadImages("https://images.wikia.nocookie.net/__cb20131221134704/xcom/ru/images/9/9e/Nav6.png");
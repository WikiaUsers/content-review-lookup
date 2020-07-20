/* Any JavaScript here will be loaded for all users on every page load. */
 
importScriptPage('PurgeButton/code.js', 'dev');
 
if (mwCustomEditButtons) {  
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/a/a7/ButtonYouTube.png",
     "speedTip": "Embed a YouTube Video",
     "tagOpen": "<youtube>",
     "tagClose": "</youtube>",
     "sampleText": "Video ID"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
     "speedTip": "Strike",
     "tagOpen": "<s>",
     "tagClose": "</s>",
     "sampleText": "Strike-through text"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/4/47/Button_redir.png",
     "speedTip": "Redirect",
     "tagOpen": "#REDIRECT [[",
     "tagClose": "]]",
     "sampleText": "Insert text"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/clubpenguin/images/3/31/HighlightButton.png",
     "speedTip": "Highlight",
     "tagOpen": "<span style='background:yellow'>",
     "tagClose": "</span>",
     "sampleText": "Highlighted text here."};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/4/41/Bigtextbutton.PNG",
     "speedTip": "Large Text",
     "tagOpen": "<big>",
     "tagClose": "</big>",
     "sampleText": "Insert Text Here"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/8/8a/Smalltextbutton.PNG",
     "speedTip": "Small Text",
     "tagOpen": "<small>",
     "tagClose": "</small>",
     "sampleText": "Insert Text Here"};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/f/fd/Button_underline.png",
     "speedTip": "<u>Underline Selected Text</u>",
     "tagOpen": "<u> ",
     "tagClose": " </u>",
     "sampleText": "Inset text to underline!"}
 
}
 
 
importScriptPage('PurgeButton/code.js', 'dev');
 
importScriptPage('AjaxRC/code.js', 'dev'); 
 
importScriptPage('ShowHide/code.js', 'dev');
 
// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00 begin_of_the_skype_highlighting              01 2007 00      end_of_the_skype_highlighting:00:00 PST</span> until New years.
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
    var tpm = '+';
  } else {
    var tpm = '';
  }
 
  // calcuate the diff
  var left = (diff%60) + ' seconds';
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%60) + ' minutes ' + left;
    diff=Math.floor(diff/60);
  if(diff > 0) left = (diff%24) + ' hours ' + left;
    diff=Math.floor(diff/24);
  if(diff > 0) left = diff + ' days ' + left
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
 
/* Opens chat in a new window for homepage */
 
$(".openchat a").click(function() {
   window.open('/wiki/Special:Chat', 'wikiachat', 'width=600,height=600,menubar=no,status=no,location=no,toolbar=no,scrollbars=no,resizable=yes');
   return false;
});
 
/*** Add Tagline Oasis ***/
 
$(function() {
   if (skin == 'Wikia') {
     $('.tagline').prependTo('#WikiHeader').css('float','right');
     $('#WikiHeader > nav > ul > li:last').hide();
   }
});
 
//Tooltip Code
 
var $tfb;
 
// hides the tooltip
function hideTip() {
$tfb.html("").removeClass("tooltip-ready").addClass("hidden").css("visibility","hidden"); 
}
 
// displays the tooltip
function displayTip(e) {
$tfb.not(":empty").removeClass("hidden").addClass("tooltip-ready");
moveTip(e);
$tfb.not(":empty").css("visibility","visible");
}
 
// moves the tooltip
function moveTip(e) {
var newTop = e.clientY + ((e.clientY > ($(window).height()/2)) ? -($tfb.not(".hidden").innerHeight()+20):20);
var newLeft = e.clientX + ((e.clientX > ($(window).width()/2)) ? -($tfb.not(".hidden").innerWidth()+20):20);
$tfb.not(".hidden").css({"position":"fixed","top":newTop + "px","left":newLeft + "px"});
}
 
 
 
/* Ticker */
var ticker;
var tickertxt;
var tickerdiv;
 
function newsticker() {
  if (document.getElementById) {
  if ((document.getElementById('ticker'))&&(document.getElementById('tickerdiv'))&&(document.getElementById('tickertxt'))) {
    ticker = document.getElementById('ticker'); 
    ticker.style.display = 'block';
    tickerdiv = document.getElementById('tickerdiv');
    tickertxt = document.getElementById('tickertxt').offsetWidth; 
    tickerdiv.style.left = parseInt(ticker.style.width) + 10 + 'px';
    lefttime=setInterval("newstickergo()",200);
  }
  }
}
 
function newstickergo() {
  tickerdiv.style.left = (parseInt(tickerdiv.style.left) > (-10 - tickertxt) ) ? parseInt(tickerdiv.style.left) - 10 + "px" : parseInt(ticker.style.width) + 10 + "px";
} 
addOnloadHook(newsticker)
 
/* MOS Box */
importScript('MediaWiki:Common.js/mosbox.js');
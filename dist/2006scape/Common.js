//Map
importScriptPage('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js');
  $(document).ready(function() {
    $("#draggable").draggable();
  });

// **************************************************
// Slider necessary code
// **************************************************

window.onload = prepareButtons;

function prepareButtons()
{
    document.getElementById('backButn').onclick = function()
    {
           var slide1 == getElementById(slide1);
           var slide2 == getElementById(slide2);
           var slide3 == getElementById(slide3);
           if(slide1.style.display == 'block'){
              slide1.style.display = 'none';
              slide3.style.display = 'block';
           }else if(slide2.style.display == 'block'){
              slide2.style.display = 'none';
              slide1.style.display = 'block';
           }else if(slide3.style.display == 'block'){
              slide3.style.display = 'none';
              slide2.style.display = 'block';
           }
    }
    document.getElementById('fwdButn').onclick = function()
    {
           var slide1 == getElementById(slide1);
           var slide2 == getElementById(slide2);
           var slide3 == getElementById(slide3);
           if(slide1.style.display == 'block'){
              slide1.style.display = 'none';
              slide2.style.display = 'block';
           }else if(slide2.style.display == 'block'){
              slide2.style.display = 'none';
              slide3.style.display = 'block';
           }else if(slide3.style.display == 'block'){
              slide3.style.display = 'none';
              slide1.style.display = 'block';
           }
    }
}
function next(){
   var currSlide;
   var slide1 == getElementById(slide1);
   var slide2 == getElementById(slide2);
   var slide3 == getElementById(slide3);
   if(slide1.style.display == 'block'){
       slide1.style.display = 'none';
       slide2.style.display = 'block';
   }else if(slide2.style.display == 'block'){
       slide2.style.display = 'none';
       slide3.style.display = 'block';
   }else if(slide3.style.display == 'block'){
       slide3.style.display = 'none';
       slide1.style.display = 'block';
   }
}
 
function previous(){
   var currSlide;
   var slide1 == getElementById(slide1);
   var slide2 == getElementById(slide2);
   var slide3 == getElementById(slide3);
   if(slide1.style.display == 'block'){
       slide1.style.display = 'none';
       slide3.style.display = 'block';
   }else if(slide2.style.display == 'block'){
       slide2.style.display = 'none';
       slide1.style.display = 'block';
   }else if(slide3.style.display == 'block'){
       slide3.style.display = 'none';
       slide2.style.display = 'block';
   }
}
// **************************************************
// Show/Hide import/ Necessary
// **************************************************
importScriptPage('ShowHide/code.js', 'dev');


// **************************************************
// Experimental javascript countdown timer (Splarka)
// Version 0.0.3
// **************************************************
//
// Usage example:
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
    var tpm = 'T plus ';
  } else {
    var tpm = 'T minus ';
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
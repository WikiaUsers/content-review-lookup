// Scrolling through an Image Gallery
// Author: Roland Unger, 2010-08-29
// license http://www.gnu.org/copyleft/gpl.html GNU General Public License 2.0 or later
 
function sgAddEvent(obj, eventType, aFunction, isCapture) {
 if (obj.addEventListener) {  // W3C DOM
  obj.addEventListener(eventType, aFunction, isCapture);
  return true;
 }
 else if (obj.attachEvent) {  // Internet Explorer
  return obj.attachEvent("on"+eventType, aFunction);
 }
 else return false;
}

function processGalleryClickEvent(event) {
 var targetLink = null, newPos, aUnit;
 
 // Internet Explorer
 if (event.srcElement) targetLink = event.srcElement;
 // W3C DOM
 if (event.currentTarget) targetLink = event.currentTarget;
 
 if ((targetLink != null) && (targetLink.id !== '')) {
  parts = targetLink.id.split("+");
  if (parts.length == 4) {
   parts[2] = parseInt(parts[2]);
   parts[3] = parseInt(parts[3]);
   if (parts[1] == "n") {
    newPos = parts[2] + 1;
    if (newPos > parts[3] - 1) { newPos = 0; }
   }
   if (parts[1] == "p") {
    newPos = parts[2] - 1;
    if (newPos < 0) { newPos = parts[3] - 1; }
   }

   aUnit = document.getElementById(parts[0] + "+" + parts[2]);
   if (aUnit) { aUnit.style["display"] = "none"; }

   aUnit = document.getElementById(parts[0] + "+" + newPos);
   if (aUnit) { aUnit.style["display"] = "block"; }
  } 
 }
}

function searchScrollGalleries() {
 var i, j, divs, divs2, imgs, prevLink, nextLink, counter, imghead;
 var firstImg, timeDependent, showUnitHeader, timeNow, noLoop, ieversion = 7;
 
 if (document.getElementsByTagName) {
  if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
   ieversion=new Number(RegExp.$1);
  }

  divs = document.getElementsByTagName("div");
 
  for (i = 0; i < divs.length; i++) {
   if (divs[i].className.indexOf("ImageGroup") < 0) { continue; }
   divs[i].id = "ImageGroup" + i;
   timeDependent = divs[i].className.indexOf("timeDependent") >= 0;
   showUnitHeader = divs[i].className.indexOf("hideUnitHeader") < 0;
   noLoop = divs[i].className.indexOf("noLoop") >= 0;
 
   divs2 = divs[i].getElementsByTagName("div");
   if ((divs2 == null) || (divs2.length == 0)) { continue; }
 
   if (ieversion < 7) { // IE6 und darunter brauchen Zwangsbreite
    imgs = divs[i].getElementsByTagName("img");
    if (imgs.length > 0) { divs[i].style["width"] = imgs[0].width + 20 + "px"; }
   }
 
   imgs = new Array();
   for (j = 0; j < divs2.length; j++) {
    if (divs2[j].className == "ImageGrUnit") { imgs.push(divs2[j]); }
   }
 
   if (imgs.length > 1) {
    firstImg = 0;
    if (timeDependent) {
     timeNow = new Date();
     timeNow = timeNow.getHours() + timeNow.getMinutes()/60;
     firstImg = Math.floor(timeNow * imgs.length / 24);
     if (firstImg > imgs.length -1 ) { firstImg = imgs.length -1; }
    }

    for (j = 0; j < imgs.length; j++) {
     imgs[j].id = "scrollUnit" + i + "+" + j;

     if (showUnitHeader) {
      prevLink = document.createElement("span");
      prevLink.style["cursor"] = "pointer";
      prevLink.id = "scrollUnit" + i + "+p+" + j + "+" + imgs.length;
      if (j == 0) { 
      	prevLink.title = imgs.length + "/" + imgs.length;
      	if (noLoop) prevLink.style["display"] = "none";
       }
       else { prevLink.title = j + "/" + imgs.length; }
      prevLink.appendChild(document.createTextNode("◀"));
      sgAddEvent(prevLink, "click", processGalleryClickEvent, false);
 
      nextLink = document.createElement("span");
      nextLink.style["cursor"] = "pointer";
      nextLink.id = "scrollUnit" + i + "+n+" + j + "+" + imgs.length;
      if (j == imgs.length - 1) {
      	nextLink.title = 1 + "/" + imgs.length;
      	if (noLoop) nextLink.style["display"] = "none";
       }
       else { nextLink.title = (j + 2) + "/" + imgs.length; }
      nextLink.appendChild(document.createTextNode("▶"));
      sgAddEvent(nextLink, "click", processGalleryClickEvent, false);
 
      counter = (j + 1) + "/" + imgs.length;
      imghead = document.createElement("div");
      imghead.className = "ImageGrUnitHeader";
      imghead.appendChild(prevLink);
      imghead.appendChild(document.createTextNode(" " +counter + " "));
      imghead.appendChild(nextLink);
 
      imgs[j].insertBefore(imghead, imgs[j].firstChild);
     }

     if (j == firstImg) { imgs[j].style["display"] = "block"; }
      else { imgs[j].style["display"] = "none"; }
    }
   }
  }
 }
}

$( searchScrollGalleries );
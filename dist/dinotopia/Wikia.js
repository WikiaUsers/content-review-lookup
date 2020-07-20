/* JavaScript to build festive cards -- Starfleet Academy */
if ( document.getElementsByClassName("remote-access").length > 0 ) {
  document.getElementById("CounterWeight").style.display="block";
  document.getElementById("PlaceHolder").style.display="none";
}
 
document.getElementById("CardWrapper").onclick = openBook;
function openBook() {
var wrapper = document.getElementById("CardWrapper");
var daWheel = document.getElementById("CounterWeight");
var hailByTimeout;
  daWheel.setAttribute("style","animation: openBook 2s linear; -moz-animation: openBook 2s linear; -webkit-animation: openBook 2s linear");
  hailByTimeout = setTimeout(function() { rootSpin(); },2000);
  wrapper.onclick = undefined;
}
 
function closeBook() {
var wrapper = document.getElementById("CardWrapper");
var wheelie = document.getElementById("CounterWeight");
var cPage = document.getElementById("ContentPage");
var hailByTimeout;
  wheelie.setAttribute("style","animation: closeBook 2s linear; -moz-animation: closeBook 2s linear; -webkit-animation: closeBook 2s linear");
  hailByTimeout = setTimeout(function() { rootSpinAgain(); },2000);
  cPage.style.display = "none";
  wrapper.onclick = undefined;
}
 
function rootSpin() {
var wrapper = document.getElementById("CardWrapper");
var tehWheel = document.getElementById("CounterWeight");
var cPage = document.getElementById("ContentPage");
var styleAttr = "";
  styleAttr += tehWheel.getAttribute("style");
  tehWheel.setAttribute("style", styleAttr + "transform: rotateY(180deg); -moz-transform: rotateY(180deg); -webkit-transform: rotateY(180deg);");
  if ( document.getElementsByClassName("OSTP").length > 0 ) {
    cPage.setAttribute("style","display: block; margin-left: 55.82%");
  } else {
    cPage.style.display="block";
  }
  wrapper.onclick = closeBook;
  wrapper.setAttribute("title","Click to close card!");
}
 
function rootSpinAgain() {
var wrapper = document.getElementById("CardWrapper");
var tehWheel = document.getElementById("CounterWeight");
var styleAttr = "";
  styleAttr += tehWheel.getAttribute("style");
  tehWheel.setAttribute("style", styleAttr + "transform: rotateY(0deg); -moz-transform: rotateY(0deg); -webkit-transform: rotateY(0deg);");
  wrapper.onclick = openBook;
  wrapper.setAttribute("title","Click to open card!");
}
 
function insertImage() {
var imageContainer = document.getElementById("ContainsImage");
  imageContainer.innerHTML='<img src="http://www.puffingbilly.com.au/media/img/logo.png" width="200px">'
}
insertImage();
 
window.onload = function() {
  if ( document.getElementById("ForeText") ) {
  var lesText = document.getElementById("ForeText");
    lesText.innerHTML="... The HTML, CSS and JavaScript way!";
  }
}
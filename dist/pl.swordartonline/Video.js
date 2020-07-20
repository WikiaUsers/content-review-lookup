// Video Test
// Autor: Vuh
// Udostępniane na tej Wiki na licencji CC-BY-NC-SA za zgodą autora
// http://creativecommons.org/licenses/by-nc-sa/3.0/deed.pl
var myVideo=document.getElementById("video1"); 

function playPause()
{ 
if (myVideo.paused) 
  myVideo.play(); 
else 
  myVideo.pause(); 
} 

function makeBig()
{ 
myVideo.width=600; 
} 

function makeSmall()
{ 
myVideo.width=320; 
} 

function makeNormal()
{ 
myVideo.width=480; 
}
function blink(objekt, delay, farbid){
  var blinkobjekt = document.getElementById(objekt);
  var blinkFarbe = blinkobjekt.getAttribute("data-colorset");
  if (blinkFarbe) {
    blinkFarbe = blinkFarbe.split(',');
    if (farbid >= blinkFarbe.length) farbid = 0;
    blinkobjekt.style.color = blinkFarbe[farbid];
    farbid ++;
  }
  else {
    if (blinkobjekt.style.opacity == 0) 
      blinkobjekt.style.opacity = 1; 
    else 
      blinkobjekt.style.opacity = 0
  }
  setTimeout('blink("'+objekt+'", "'+delay+'", "'+farbid+'");',delay);
  return true;
}
 
var Blink = document.getElementsByTagName('div');
for (var i=0; i < Blink.length; i++) {
  if(Blink[i].className == 'blink'){
    Blink[i].id='Blinkelement_'+i;
    blink(Blink[i].id, Blink[i].getAttribute("data-delay"),0);
  }
}
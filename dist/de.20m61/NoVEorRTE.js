/*
function RTEtoCodeMode(i){
  if (!i) { i=1; } else { i++; }
  if (i > 20) { return false; } // nach 4 Sec. aufhören nach dem Button zu suchen.

  if (wgAction == 'edit'){ 
    var CKEObjekt = document.getElementById('cke_21');
    if (CKEObjekt) {
      CKEObjekt.click();
      return true;
    }
    setTimeout('RTEtoCodeMode('+i+')',200);
  }
  return false;
}

function VEtoCodeMode(v){
  if (!v) { v=1; } else { v++; }
  if (v > 20) { return false; } // nach 10 Sec. aufhören nach dem Button zu suchen.
  
  var VEQuellcodeButton = document.getElementById('WikiaMainContent').getElementsByTagName('span');
  for (var n=0; n < VEQuellcodeButton.length; n++) {
    if (VEQuellcodeButton[n].className.search('wikiaSourceMode') >= 0){
      VEQuellcodeButton[n].parentNode.parentNode.mousedown();
//      alert("pressed");
//      VEQuellcodeButton[n].firstChild.click();
      return true;
    }
  }
  setTimeout('VEtoCodeMode('+v+');',1000);
  return false;
}

var VEButton = document.getElementById('ca-ve-edit');
if (VEButton){
  VEButton.onclick = function(){ VEtoCodeMode(0); };
}
addOnloadHook(RTEtoCodeMode);
addOnloadHook(VEtoCodeMode);
*/
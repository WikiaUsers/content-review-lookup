 window.document.oncontextmenu = function(){ 
//alert('不要右键');
return false;
}

$(document).keydown(function(e) {
  if(e.ctrlKey && (e.keyCode == 65 || e.keyCode == 67)) {
    return false;
  }
});
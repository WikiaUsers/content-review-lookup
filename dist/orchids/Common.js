/* Any JavaScript here will be loaded for all users on every page load. */
/* InputBox clearing -- clears the inputbox default text (such as "(name of your article)") */
/* By [[User:Skizzerz]] with help from [[w:User:Splarka]] */
addOnloadHook(function() {
  var boxes = getElementsByClassName(document, 'input', 'createboxInput');
  if(!boxes) return;
  for(var i=0;i<boxes.length;i++) {
    boxes[i].setAttribute('style', 'color:#808080');
    addHandler(boxes[i], 'click', clearInputbox);
  }
});

function clearInputbox(e) {
  if(!e) return;
  var input = e.target || e.srcElement;
  input.value = '';
  input.setAttribute('style', '');
  if(window.removeEventListener) {
    input.removeEventListener('click', clearInputbox, false);
  } else if(window.detachEvent) {
    input.detachEvent('onclick', clearInputbox);
  }
  return true;
}
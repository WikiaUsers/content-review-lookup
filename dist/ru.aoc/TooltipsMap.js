/*
Map tooltips.  No AJAX request method available, we need the template to load on the page.
<pre>
*/
function ttMouseOver_Map() {
var Divs = document.getElementsByTagName( "span" );
for (var i = 0; i < Divs.length; i++) {
if (hasClass(Divs[i], "maptip")) {
Divs[i].setAttribute("id", "tt" + i);
Divs[i].onmouseover = showMapTip.bind(Divs[i],i);
Divs[i].onmouseout = hideTip;
Divs[i].onmousemove = moveTip;
}
}
}

function showMapTip(i) {
  var tip = document.getElementById('tfb');
  var Div = document.getElementById( "tt" + i );
  var ttLink = Div.parentNode.lastChild;
  tip.innerHTML = ttLink.innerHTML;
  nocache = true;
  displayTip();
}

ttMouseOver_Map();
/* </pre> */
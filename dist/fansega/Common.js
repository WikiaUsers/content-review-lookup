/* Any JavaScript here will be loaded for all users on every page load. */
function onloadhookcustom() {
  var replace = document.getElementById("malefurrydoll");
  if (null != replace) {

    replace.innerHTML='<object width="450" height="260"><param name="movie" value="http://backend.deviantart.com/embed/view.swf" /><param name="flashvars" value="id=64778353&width=1337" /><param name="allowScriptAccess" value="always" /><embed src="http://backend.deviantart.com/embed/view.swf" type="application/x-shockwave-flash" width="450" flashvars="id=64778353&width=1337" height="260" allowscriptaccess="always"></embed></object><br /><a href="http://www.deviantart.com/deviation/64778353/">Male Furry Dollmaker v1.1</a> by ~<a class="u" href="http://gen8hedgehog.deviantart.com/">geN8hedgehog</a> on <a href="http://www.deviantart.com">deviant</a><a href="http://www.deviantart.com">ART</a>';
  }
}
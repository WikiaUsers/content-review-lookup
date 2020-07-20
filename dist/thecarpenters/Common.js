/**
 * getElementsByClass : searches the elements of the page by "class" parameter
 */
function getElementsByClass(searchClass, node, tag) {
  if (node == null) node = document;
  if (tag == null) tag = '*';
  return getElementsByClassName(node, tag, searchClass);
}
 
/**
 * Title icons
 * 
 * Looks for title icons (class="icon") and
 * Shifts them to the right of the title on the page.
 */
 
function titleicons() {
  var h1 = document.getElementsByTagName("h1")[0];
  var icons = getElementsByClass( "icon", document, "div" );
  for( var j = icons.length; j > 0; --j ){
    icons[j-1].style.display = "block"; /* cancels "display: none" by default */
    icons[j-1].style.marginLeft = "0.35em";
    if( skin == "modern" ){
      icons[j-1].style.marginTop = "0.2em";
    }
    h1.parentNode.insertBefore(icons[j-1], h1); /* shift of the element */
  }
}
addOnloadHook(titleicons);
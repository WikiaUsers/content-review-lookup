function setModifySectionStyle() {
  try {
    if (!(typeof oldEditsectionLinks == 'undefined' || oldEditsectionLinks == false)) return;
    var spans = document.getElementsByTagName("span");
    for (var s = 0; s < spans.length; ++s) {
      var span = spans[s];
      if (span.className == "editsection") {
        span.style.fontSize = "xx-small";
        span.style.fontWeight = "normal";
        span.style.cssFloat = span.style.styleFloat = "none";
        span.parentNode.appendChild(document.createTextNode(" "));
        span.parentNode.appendChild(span);
      }
    }
  } catch (e) { /* something went wrong */ }
}
 
addOnloadHook(setModifySectionStyle);
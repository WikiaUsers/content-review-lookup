<script>
(function() {
  if(!window.isRubicusLoaded) {
    var x = document.createElement("link");
    x.setAttribute("rel", "stylesheet");
    x.setAttribute("type", "text/css");
    var page = "Rubicus.css";
    if(skin=="wikiamobile") page = "RubicusMini.css";
    x.setAttribute("href", "http://finalfantasy.wikia.com/wiki/MediaWiki:" + page + "?usemsgcache=yes&ctype=text/css&smaxage=86400&action=raw&maxage=86400".split("amp;").join(""));
    document.head.appendChild(x);
  }
  window.isRubicusLoaded = true;
})();
</script>
<script>
console.log(varnishTime);
function importJsUrl(url) {
  var head = document.head;
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url.split("amp;").join("");
  head.appendChild(script);
  return script;
}

importJsUrl("http://" + wgDBname + ".wikia.com/wiki/" + "MediaWiki:Preload.js" + "?action=raw&ctype=text/javascript");
</script>
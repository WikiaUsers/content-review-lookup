function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    // Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

loadScript('https://cdn.jsdelivr.net/npm/@widgetbot/crate@3', function() {
  new Crate({
    server: '719085354514251877', 
    channel: '719215577994100766' // #tchat
  });
});
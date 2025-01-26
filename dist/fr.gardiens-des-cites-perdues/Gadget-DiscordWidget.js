function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function updateCrateSize(crateInstance, isBarHidden) {
  var css = isBarHidden ? 
    ".button { width: 36px !important; height: 36px !important; } " +
    ".css-bu11gw { padding: 9px !important; }" 
    : "";

  crateInstance.setOptions({
    css: css
  });
}

function createWidget(isMobile) {
  if (isMobile) {
    return new Crate({
      server: '719085354514251877',
      channel: '719215577994100766',
      notifications: false
    });
  } else {
    return new Crate({
      server: '719085354514251877',
      channel: '719215577994100766',
      notifications: false,
      location: [ -50 ,  -9],
      css: ""
    });
  }
}

loadScript('https://cdn.jsdelivr.net/npm/@widgetbot/crate@3', function () {
  var $bar = document.getElementById('WikiaBarWrapper');
  var isMobile = window.innerWidth < 785;

  var crateInstance = createWidget(isMobile);

  if (!isMobile && $bar) {
    var isBarHidden = $bar.className.indexOf('hidden') !== -1;
    updateCrateSize(crateInstance, isBarHidden);

    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var isHidden = mutations[i].target.className.indexOf('hidden') !== -1;
        updateCrateSize(crateInstance, isHidden);
      }
    });

    observer.observe($bar, { attributes: true, attributeFilter: ['class'] });
  }
});
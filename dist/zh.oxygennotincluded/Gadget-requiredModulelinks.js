// Author: RheingoldRiver (River)
// Adds hyperlinks to required modules
mw.hook("wikipage.content").add(function () {
  if (window.requiredModulelinksLoaded) return;
  window.requiredModulelinksLoaded = true;
  if (mw.config.get("wgCanonicalNamespace") != "Module") return;
  $(".s1, .s2").each(function (e) {
    var html = $(this).html();
    var quote = html[0];
    var quoteRE = new RegExp("^" + quote + "|" + quote + "$", "g");
    var name = html.replace(quoteRE, "");
    if (name.startsWith("Module:") || name.startsWith("module:")) {
      var target = encodeURI(name);
      var url =
        mw.config.get("wgServer") +
        mw.config.get("wgArticlePath").replace("$1", target);
      var str = quote + '<a href="' + url + '">' + name + "</a>" + quote;
      $(this).html(str);
    }
  });
});
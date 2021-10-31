// Author: RheingoldRiver (River)
// Adds hyperlinks to required modules
mw.hook("wikipage.content").add(function () {
   if (window.requiredModulelinksLoaded) return;
  window.requiredModulelinksLoaded = true;
  if (mw.config.get("wgCanonicalNamespace") != "Module") return;
  $(".s, .s1, .s2").each(function (e) {
    var html = $(this).html();
    var m = html.match(new RegExp("^(\"|'|\\[\\[)(.+)(\"|'|\\]\\])$"));
    if (m === null) return;

    var pre = m[1];
    var name = m[2];
    var suf = m[3];
    if (pre == suf || (pre == "[[" && suf == "]]")) {
      var url;
      if (name.startsWith("Module:") || name.startsWith("module:")) {
        url =
          mw.config.get("wgServer") +
          mw.config.get("wgArticlePath").replace("$1", encodeURI(name));
      } else if (name.startsWith("Dev:") || name.startsWith("dev:")) {
        url =
          "https://dev.fandom.com/wiki/Global_Lua_Modules/" + encodeURI(name.slice(4));
      }
      if (url !== undefined) {
        $(this).html(pre + '<a href="' + url + '">' + name + "</a>" + suf);
      }
    }
  });
});
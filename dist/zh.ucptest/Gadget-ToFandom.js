(function (window, $, mw) {
  if (window.toFandom) {
    return;
  }
  window.toFandom = true;

  mw.hook("wikipage.content").add(function ($content) {
    $("a").each(function (_, e) {
      if (e.href && e.href.startsWith("http://game.bilibili.com/linkfilter")) {
        var newHref = new URL(e.href).searchParams.get("url");
        if (newHref && newHref.startsWith("https://oni.fandom.com/zh")) {
          e.href = newHref
        };
      }
    });
  });
})(this, jQuery, mediaWiki);
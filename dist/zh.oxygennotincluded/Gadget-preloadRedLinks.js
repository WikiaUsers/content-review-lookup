//  ================================
//      Preload Red links
//  ================================
/*  @author DDElephant

    ** Info: **
    Add preload url arguments for red links according to the rules defined in
    "MediaWiki:Custom-PreloadRedLinks". The page that stores the rule can be changed
    by defining window.preloadRedLinks_rules as a page name. If window.preloadRedLinks_rules
    is defined as a JS function which takes the target page name and returns the page name
    for its preload templats (null for doing nothing), it will be used and override rules
    defined in pages.
*/
mw.hook("wikipage.content").add(function ($content) {
  console.log("[PreloadRedLinks]: version 1.01 - 07/2021.");

  // remove noinclude
  function parseMW(source) {
    return source.replace(
      /<includeonly>(\n)?|(\n)?<\/includeonly>|\s*<noinclude>[^]*?<\/noinclude>/g,
      ""
    );
  }

  function getPageName(url) {
    var re = /(?<=zh\/wiki\/).+(?=\?)/;
    return url.match(re)[0];
  }

  if (typeof window.preloadRedLinks_rules == "function") {
    mutate(window.preloadRedLinks_rules);
  } else {
    var rules_path =
      typeof window.preloadRedLinks_rules == "string"
        ? window.preloadRedLinks_rules
        : "MediaWiki:Custom-PreloadRedLinks";

    $.get(mw.util.wikiScript(), {
      title: rules_path,
      action: "raw",
      ctype: "text/plain",
    }).done(function (text) {
      var re = new RegExp(/\*\s*(.+?)\s*?\|\s*?(.+)$/, "gm");
      var rawRules = Array.from(parseMW(text).matchAll(re));
      function rule(pagename) {
        for (var i = 0; i < rawRules.length; i++) {
          if (pagename.match(new RegExp("^" + rawRules[i][2] + "$")) !== null) {
            return rawRules[i][1];
          }
        }
        return null;
      }
      mutate(rule);
    });
  }

  function mutate(rule) {
    $("a.new, span.new").each(function (_, ele) {
      var uncrawlable = ele.getAttribute("data-uncrawlable-url");
      var href = (uncrawlable && atob(uncrawlable)) || ele.href;
      if (uncrawlable !== null) {
        href = atob(uncrawlable);
      }
      href = decodeURI(href);
      var pagename = getPageName(href);
      var preloadTemplate = rule(pagename);

      // if a rule matches
      if (preloadTemplate !== null) {
        href = href + "&preload=" + preloadTemplate;
        href = encodeURI(href);
        if (uncrawlable !== null) {
          ele.setAttribute("data-uncrawlable-url", btoa(href));
        } else {
          ele.href = href;
        }
      }
    });
  }
});
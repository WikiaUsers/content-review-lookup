  window.preload = true;
  var wgServerTime = (typeof (varnishTime) != "undefined" && varnishTime) ? new Date(varnishTime.split(" GMT")[0]) : undefined;
var wgClientTime = new Date();

function _AND(a, b) {
  if(typeof(b) != "undefined") return (a && b);
  for(var i = 0; i < a.length; i++) if(!a[i]) return false;
  return true;
}

function _OR(a, b) {
  if(typeof(b) != "undefined") return (a || b);
  for(var i = 0; i < a.length; i++) if(a[i]) return true;
  return false;
}

window.location.searchList = (function () {
  var x = window.location.search.slice(1).split("&");
  var list = {};

  x.forEach(function (a) {
    var b = a.split("=");
    if (b[0].slice(-2) == "[]") {
      var key = b[0].slice(0, -2);
      if (!list[key]) list[key] = [];
      b.shift();
      list[key].push(b.join("="));
    } else list[b.shift()] = b.join("=");
  });
  return list;
})();

window.location.getSearch = function (a) {
  return location.searchList[a];
};

if (skin == "oasis" && (localStorage && localStorage.theme || location.getSearch("usetheme"))) {
  themename = location.getSearch("usetheme") || localStorage.theme;
  switch (themename) {
    case "zidane":
      importCssPage("User:JBed/zidanetheme.css");
      break;
    case "rydia":
      importCssPage("User:JBed/rydiatheme.css");
      break;
    case "halloween":
      importCssPage("User:JBed/halloween.css");
      break;
    default:
      themename = "oasis";
  }
}

function wikilinkComponent(text) {
  text = text.replace("[[", "").replace("]]", "");
  var page = text.split("|")[0];
  var display = text.replace(page + "|", "");
  if (display == text) display = page;
  var colonSplit = page.split(":");
  var domain = wgDBname;
  if (colonSplit[0] == "w" && colonSplit.length > 1) {
    colonSplit.shift();
    domain = "community";
  } else if (colonSplit[0] === "") colonSplit.shift();
  if (colonSplit[0] == "c" && colonSplit[1]) {
    colonSplit.shift();
    domain = colonSplit.shift();
  } else if (colonSplit[0] === "") colonSplit.shift();
  page = colonSplit.join(":");
  return {
    domain: domain,
    page: page,
    display: display
  };
}

function wikilinkUrl(text) //returns URL from wikitext link
{
  var x = wikilinkComponent(text);
  return "http://" + x.domain + ".wikia.com/wiki/" + x.page.urlEncode();
}

function wikilinkHtml(text, opdisplay) //returns A tag from wikitext link
{
  if (opdisplay) text = text + "|" + opdisplay;
  var x = wikilinkComponent(text);
  return '<a ' + (x.domain != wgDBname ? 'class="extiw" ' : '') + 'title="' + x.page + '" href="http://' + x.domain + '.wikia.com/wiki/' + x.page.urlEncode() + '">' + x.display + '</a>';
}

function createCssRules(cssStyles, id, elem) {
  if (id) if (document.getElementById(id)) killElementById(id);
  var style = document.createElement("style");
  if (id) style.id = id;
  style.type = "text/css";
  style.innerHTML = cssStyles;
  if(!elem) elem = document.head; else style.scoped = true;
  elem.appendChild(style);
  return style;
}

function importCssUrl(url) {
  var head = document.getElementsByTagName("head")[0];
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = url;
  head.appendChild(link);
  return link;
}

function importCssPage(page) {
  return importCssUrl(wikilinkUrl(page) + "?usemsgcache=yes&ctype=text/css&smaxage=86400&action=raw&maxage=86400");
}

function addJsScript(jsScripts) {
  eval(string.toExec());
}

function importJsUrl(url) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
  return script;
}

function importJsPage(page) {
  return importJsUrl(wikilinkUrl(page) + "?action=raw&ctype=text/javascript");
}
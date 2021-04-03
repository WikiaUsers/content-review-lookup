if (mw.config.get('wgCanonicalNamespace') == "File" && document.URL.indexOf("action=delete") == -1){
  var escapedPageName = mw.config.get('wgPageName');
  escapedPageName = encodeURIComponent(escapedPageName).replace(/'/g, "%27");

  $('#WikiaPageHeader').append("<a class='wikia-button' href='?action=delete'>Delete</a><a style='margin-left: 15px;' class='wikia-button' href='/wiki/Special:MovePage/"+escapedPageName+"'>Rename</a>");
}
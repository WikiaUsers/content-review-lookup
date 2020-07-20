function minimap_ajax() {
  getXmlHttpRequestObject = function () {
    if (window.XMLHttpRequest) { return new XMLHttpRequest(); }
    else if(window.ActiveXObject) { return new ActiveXObject("Microsoft.XMLHTTP"); }
    alert("Your browser doesn't support the XmlHttpRequest object. Update your browser.");
    return false;
  };
  if (typeof (lootparser_loot_r = getXmlHttpRequestObject()) == 'boolean') { return; }
  lootparser_loot_r.onreadystatechange = function() {
    if (lootparser_loot_r.readyState != 4) { return; }
    var text = lootparser_loot_r.responseText;
    text = text.slice(text.search('id="pre_mapper">')+16, text.search('<\/pre>'));
    text = text.replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');
    newscript = document.createElement('script');
    newscript.setAttribute("type", "text/javascript");
    newscript.text = text;
    document.getElementsByTagName('body')[0].appendChild(newscript)
  };
  lootparser_loot_r.open('GET', '/wiki/Mapper/Code');
  lootparser_loot_r.send(null);
}
document.minimap_getElementsByClassName = function(cl) {
  var i, retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = document.getElementsByTagName('*');
  for (i in elem) { if (myclass.test(elem[i].className)) { retnode.push(elem[i]); } }
  return retnode;
};
/* End of Code used for Mapper */

/* Hook for Mapper */
if (wgAction == 'view' || wgAction == 'submit' || wgAction == 'purge') {
  addOnloadHook(function() {
    if (wgPageName == 'Mapper') { minimap_ajax(); }
    else {
      var x, tmp = document.minimap_getElementsByClassName('minimap_clic');
      for (x in tmp) { if (tmp.hasOwnProperty(x)) { minimap_ajax(); break; } }
    }
  });
}
/* End of Hook for Mapper */
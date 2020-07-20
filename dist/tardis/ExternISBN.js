function externISBN() {
  if (typeof magicURL=="string" && typeof book_source_URL=="undefined")
  { 
    book_source_URL = magicURL; 
  }
 
  var magicRegex = /MAGICNUMBER/ig;
  if(wgPageName != "Special:BookSources" && !(wgTitle == "Book sources" && wgCanonicalNamespace == "Project"))
  {
    for (var i = 0; i < document.links.length; i++) 
    {       
      if(document.links[i].href.match(/Special:BookSources\/(.*)/)) 
      {
        document.links[i].href=book_source_URL.replace(magicRegex, RegExp.$1.replace(/[\D]*/g, ''))
      }
    }
  }
 
}
 
addOnloadHook(externISBN);
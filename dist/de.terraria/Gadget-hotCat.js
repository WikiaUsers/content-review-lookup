window.hotcat_translations_from_commons = true;

/*
 This imports the latest version of HotCat from Commons.
 HotCat is a gadget to make changes to categories much easier.
 Full documentation can be found at http://commons.wikimedia.org/wiki/Help:Gadget-HotCat
*/
mw.loader.load( '//commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript' );

// Präfix „Datei:“ für Dateibeschreibungsseiten und Spezial:Hochladen als Vorgabe
$(function () {
  var namespaceNumber = mw.config.get('wgNamespaceNumber');
  if (namespaceNumber === -1 && mw.config.get('wgCanonicalSpecialPageName') == 'Upload') {
    // We're on Special:Upload: pretend we were in the file namespace.
    namespaceNumber = 6;
  }
  // Exclude all other namespaces including talk pages and special pages
  if (namespaceNumber !== 6) return;
  $('body').on('focus', '.hotcatinput input:text', function () {
    var wasSet = $(this).data('hotcatprefixset');
    if (wasSet) return; // Already done, don't re-do it (user might have deleted pre-filled text)
    if (!this.value) {
      // If input field is empty, then pre-fill it
      var namespaceNames = mw.config.get('wgFormattedNamespaces');
      if (namespaceNames && typeof (namespaceNames[namespaceNumber]) == 'string') {
        var suffix = ':';          
        this.value = namespaceNames[namespaceNumber] + suffix;
      }
    }
    $(this).data('hotcatprefixset', true);
  });
});
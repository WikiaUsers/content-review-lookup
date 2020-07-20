mw.loader.load("//commons.wikimedia.org/w/index.php?title=MediaWiki:Gadget-HotCat.js&action=raw&ctype=text/javascript");

// Konfiguracja z polskojęzycznej Wikipedii
// https://pl.wikipedia.org/wiki/MediaWiki:Gadget-HotCat.js/local_defaults
if (typeof (HotCat) != 'undefined') {
  HotCat.messages.cat_removed   = 'Usunięto kategorię "$1"';
  HotCat.messages.template_removed  = 'Usunięto {{[[Kategoria:$1]]}}';
  HotCat.messages.cat_added     = 'Dodano kategorię "$1"';
  HotCat.messages.cat_keychange = 'nowy klucz sortowania [[Kategoria:$1]]: ';
  HotCat.messages.cat_notFound  = 'Nie znaleziono kategorii "$1"';
  HotCat.messages.cat_exists    = 'Kategoria "$1" już jest w haśle; nie dodano';
  HotCat.messages.cat_resolved  = ' (za przekierowaniem [[Kategoria:$1]])';
  HotCat.messages.uncat_removed = 'usunięto {{kategoria}}';
  HotCat.messages.using         = ' za pomocą [[wp:WP:Narzędzia/HotCat|HotCat]]';
  HotCat.messages.multi_change  = '$1 kategorii';
 
  HotCat.category_regexp     = '[Cc][Aa][Tt][Ee][Gg][Oo][Rr][Yy]|[Kk][Aa][Tt][Ee][Gg][Oo][Rr][Ii][Aa]';
  HotCat.category_canonical  = 'Kategoria';
  HotCat.disambig_category   = 'Kategorie dla kategorii';
  HotCat.redir_category      = 'Przekierowania kategorii';
  HotCat.uncat_regexp        = /\{\{\s*([Kk]ategoria|[Dd]opracować\|kategoria(?:\s*=\s*[^|}]*)?)\s*\}\}\n?/g ;
  HotCat.template_regexp     = '[Tt][Ee][Mm][Pp][Ll][Aa][Tt][Ee]|[Ss][Zz][Aa][Bb][Ll][Oo][Nn]';
  HotCat.template_categories = {};
}
/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.defimage = 'https://static.wikia.nocookie.net/awatar/images/5/5e/Default.png/revision/latest?cb=20210924054003';
window.pPreview.noimage = 'https://static.wikia.nocookie.net/awatar/images/5/5e/Default.png/revision/latest?cb=20210924054003';

// Licencje
var LicenseOptions = {
	'{{Brak_licencji}}': 'Nie znam licencji',
	'{{Kadr (Aang)}}': 'Plik będący kadrem z serialu "Awatar: Legenda Aanga"',
	'{{Kadr (Korra)}}': 'Plik będący kadrem z serialu "Legenda Korry"',
	'{{Komiks}}': 'Plik będący zdjęciem z komiksu',
	'{{Art}}': 'Plik będący oficjalnym artem związanym z serią',
	'{{CC-BY-SA}}': 'Creative Commons BY-SA',
	'{{Copyright}}': 'Grafika o zastrzeżonych prawach autorskich',
	'{{Fairuse}}': 'Plik używany zgodnie z zasadami dozwolonego użytku',
	'{{PD}}': 'Plik znajduje się w domenie publicznej',
	'{{Wikimedia}}': 'Plik z Wikipedii lub innego projektu Fundacji Wikimedia'
};
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:APIQuery.js",
	"u:pl.tes:MediaWiki:Licenses.js"
   ]
});

// Fix dla EraIcon i LinkPreview
window.pPreview.RegExp.iparents = ['.page-header__eraicons', '.eraicon'];

// Avatarian glyph renderer z angielskiej wiki
(function () {
  var BUNDLE_PAGE = "MediaWiki:Avatarian.js"; 

  function boot() {
    if (!document.querySelector("span.avatarian-word")) return;
    var url = mw.config.get("wgScript") + "?title=" +
      encodeURIComponent(BUNDLE_PAGE) + "&action=raw&ctype=text/javascript";
    mw.loader.load(url);
    // If the bundle never loads, reveal the plain fallback text after 5s.
    setTimeout(function () {
      var pending = document.querySelectorAll(
        "span.avatarian-word:not([data-avatarian-done])");
      Array.prototype.forEach.call(pending, function (w) {
        w.setAttribute("data-avatarian-done", "1");
      });
    }, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */

$(function() {
  if($('#showtextbutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/Tekst:'+ encodeURIComponent(wgPageName) +'" title="Tekst piosenki"><img src="https://images.wikia.nocookie.net/painto/pl/images/c/cb/Tekst.png" style="vertical-align:middle;" /> Tekst</a>');
  }
});

$(function() {
  if($('#showarticlebutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/'+ encodeURIComponent(wgTitle) +'" title="Powrót do artykułu"><img src="https://images.wikia.nocookie.net/painto/pl/images/c/cb/Tekst.png" style="vertical-align:middle;" /> Artykuł</a>');
  }
});

// PODPISY ZAMIAST PERFISKÓW by Nanaki
$(function FixNs() {
    $('.ns-4 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-4 #WikiaPageHeader .header-title').append('<h2>Strona projektu</h2>');
    $('.ns-112 #WikiaPageHeader .header-title > h1').text(wgTitle);
    $('.ns-112 #WikiaPageHeader .header-title').append('<h2>Tekst piosenki</h2>');
});
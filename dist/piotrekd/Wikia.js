/* Umieszczony tutaj kod JavaScript zostanie załadowany wyłącznie przez użytkowników korzystających ze skórki Wikia */
$(document).ready(function() {
  $('.WikiHeader > nav > ul ').append(
    '<li class="nav-item"><a class="nowyserwer" href="http://linuxwiki.pl/wiki/' + encodeURIComponent(wgPageName) + '?wikia=1">Obejrzyj na nowym serwerze</a></li>'
  );
});
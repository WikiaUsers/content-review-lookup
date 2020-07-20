/*
 * Gadżet zamieniający [[S:KiwiIRC]] z informacją, że strona nie istnieje, w całkiem ładną stronę z bramką KiwiIRC.
*/ 
$(function() {
  if ($('body').hasClass('page-Specjalna_KiwiIRC')) {
    $('#mw-content-text').html('\
    <p><b>Poniżej prezentowane jest okno bramki <a href="https://kiwiirc.com/">KiwiIRC</a>. Wikia <u>nie jest</u> odpowiedzialna ni w żaden sposób powiązana z tym, co tam widzisz. Jeśli chcesz, możesz <a class="external" href="https://kiwiirc.com/client?settings=c63790923741f3808be2daa40c418b6d">otworzyć tę bramkę bezpośrednio</a>.</b></p>\n\
    <iframe src="https://kiwiirc.com/client?settings=c63790923741f3808be2daa40c418b6d" class="kiwiirc"></iframe>');
    $('h1#firstHeading').html('Kanał IRC otwarty w bramce KiwiIRC');
    document.title = 'Kanał IRC – KiwiIRC – Grand Theft Auto – GTA Wiki – Wikia';
  }
  if (skin == 'oasis') $('.WikiHeader > nav > ul > li:first-child > ul').append('<li><a class="subnav-2a" href="http://pl.gta.wikia.com/wiki/Specjalna:KiwiIRC">IRC</a></li>');
});
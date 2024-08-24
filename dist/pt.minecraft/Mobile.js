/* Qualquer JavaScript aqui ser� carregado para usu�rios que usam o site m�vel */
/* MF quebrou o carregamento de estilos m�veis em 1.31 */
mw.loader.load( 'mobile.site.styles' );

/* Adicionar links de "revis�o atual" e "desfazer" para Special:MobileDiff */
$(function() {
    var urlRegex = /.*Special:MobileDiff\/([0-9]+).*/;
    var currentID = location.href.replace(urlRegex, '$1');
    var prevID = $('#content #mw-mf-diffarea .revision-history-prev a[href]').attr('href').replace(urlRegex, '$1');

    var pagelink = $('#content #mw-mf-diffarea a[href*="oldid"]');
    pagelink.after('<br>(<a href="/' + pagelink.text().replace(/ /g, '_') + '" style="color:#36c">Exibir p�gina atual</a>)');

    $('#content #mw-mf-diffarea').append('<a class="mw-ui-button" href="/' + pagelink.text().replace(/ /g, '_') + '?action=edit&amp;undoafter=' + prevID + '&amp;undo=' + currentID + '">Desfazer</a>');
});
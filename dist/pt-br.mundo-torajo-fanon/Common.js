/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */


/* UTCClock */
// Exibir 12 horas seguido de dia, mês (Português, nome completo) e ano com "(BRT)" no final
//
window.DisplayClockJS = {
    format: '%2I:%2M:%2S %p %2d de %{Janeiro;Fevereiro;Março;Abril;Maio;Junho;Julho;Agosto;Setembro;Outubro;Novembro;Dezembro}m de %Y (BRT)',
    offset: -180
};
importArticle({type:'script', article:'u:dev:MediaWiki:UTCClock/code.js'});
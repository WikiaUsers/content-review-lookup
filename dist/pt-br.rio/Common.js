/* Códigos JavaScript aqui colocados serão carregados por todos aqueles que acessarem alguma página deste wiki */
importArticles({
	type: "script",
	articles: [
        "w:c:dev:Countdown/code.js"
	]
});

if ( document.getElementById('TitleItalic') ) {
$('.firstHeading').css('font-style','italic');
}
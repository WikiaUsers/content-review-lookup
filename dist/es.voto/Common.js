/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */

importArticles({
    type: "script",
    articles: [
        'Project:Extra/SVGo/SVGoriginal.js',
    ]
/*}, {
    type: "style",
    article: "MediaWiki:StaffHighlight.css"*/
});

svg_original_lista={'Animated_analog_SVG_clock.svg':'https://vignette.wikia.nocookie.net/voto/images/4/4d/Animated_analog_SVG_clock.svg/revision/latest?cb=20150422063729&path-prefix=es'};
var svg_original_iniciar=function(){var x=/[\?&]no_svg_original=([^&#]*)/.exec(location.search);(x&&(1 in x))?x[1]*1:0;if(!x) svg_original(svg_original_lista);};
addOnloadHook(svg_original_iniciar);
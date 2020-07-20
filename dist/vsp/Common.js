//ValveClient.js
/*  Detects if user is connecting from a TF2 MOTD browser
    If so, it will add some navigation buttons across the wiki because
    the MOTD browser does not have a basic browser UI.
*/

//Jquery.geturlParam.js
/*  Custom Jquery function that can get http 'GET' variables
    This is used to detect pre-determined language. example:
    https://vsp.wikia.com/?wplslang=japanese
    The 'getUrlParam' jquery function this file provides can
    then see that the language set is japanese.
*/

//Jquery.classes_func.js
/*  Custom Jquery function that gets an elements classes and returns
    as an array.
*/

//WikiaPls.js
/*  Flagship language switching script. Impliments all functions dealing
    withthe language switcher UI and under the hood work.
    
    Requires:   Jquery.classes_func.js
                Jquery.geturlParam.js
*/

importArticles({
    type: "script",
    articles: [
        "MediaWiki:Common.js/valveclient.js",
        "MediaWiki:Common.js/Jquery.getUrlParam.js",
        "MediaWiki:Common.js/Jquery.classes_func.js",
        "MediaWiki:Common.js/WikiaPls.js"
    ]
});

$( "#mw-content-text .halenavcontain .halenav2 .image" ).hover(
    function() {
        $( this ).css('background', 'rgba(0,0,0,0)');
        //$( this ).parent().siblings('.hale-title').css('color', '#969696');

    }, function() {
        $( this ).css('background', ' rgba(69, 205, 225, 0.12)');
        //$( this ).parent().siblings('.hale-title').css('color', '#333333');

    }
);
/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/*Texte d'information, de fr.lego.wikia.com/wiki/MediaWiki:Common.js*/
if ($.inArray(wgNamespaceNumber, [ 0, 1, 4, 5, 6, 7, 14, 15, 110, 111, 400, 401, 500, 502, 503, -1 ] ) !== -1) {
    $('<div />', { 
        'class': 'legaldisclaimer',
        css: {
            padding: '2px 5px',
            marginTop: '1em',
            clear: 'both',
            fontSize: '85%',
            border: '1px solid #AFEEEE',
            color: '#555555',
            borderRadius: '8px',
            textAlign : 'center',
        }
    }).text('Eldarya est un jeu du studio de création Beemoov. Le wikia Eldarya est un site indépendant non sponsorisé par le groupe Beemoov. Les images proviennent en majorité du jeu.')
    .appendTo('.WikiaArticle');
}

/*Catégorisation de masse*/
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massCategorizationDelay = 1000;
  importScriptPage('MediaWiki:MassCategorization/code.js', 'dev');
}
/*Background changeant jour/nuit*/
$(document).ready(function(){
   var date = new Date();
   var heure = date.getHours();
   if(heure >= 7 && heure < 20){
     $("body.skin-oasis,body.background-dynamic.skin-oasis::after,body.background-dynamic.skin-oasis::before").css("background-image", "url('https://www.eldarya.fr/assets/img/item/player/web_hd/7f359939d2273dac0ee734235e236914~1595420354.png')");
   }else{
     $("body.skin-oasis,body.background-dynamic.skin-oasis::after,body.background-dynamic.skin-oasis::before").css("background-image", "url('https://www.eldarya.fr/assets/img/item/player/web_hd/6b433454b653a8accf326b0000047fb2~1595420936.png')");
   }
   $("body.skin-oasis,body.background-dynamic.skin-oasis::after,body.background-dynamic.skin-oasis::before").css("background-color", "#FFFFFF"); });

/* Import des icones Fandom */
// register hook before import to avoid race conditions
mw.hook('dev.wds').add(function(wds) {
    // wds is a shortcut to window.dev.wds
});

importArticle({ type: 'script', article: 'u:dev:MediaWiki:WDSIcons/code.js' });
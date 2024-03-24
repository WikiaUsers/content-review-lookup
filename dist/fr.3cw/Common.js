/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Common.js/TestCCCW.js'
    ]
});

PurgeButtonText = 'Purge';
importScriptPage('PurgeButton/code.js', 'dev');

function setCookie( cname, cvalue, exdays ) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
// Animation page d'accueil
var page = mw.config.get( 'wgPageName' );
var message = "Cette page d\'accueil a été créé par les vainqueurs de l\'Épreuve de Compétences: L'Équipe 7 !";
if (page === "Wiki_CCCW") {
    var ids = $.cookie('accueilalert');
    if (!ids) {
    alert(message);
    setCookie('accueilalert', 'on', 10);
    }
    $('.WikiaArticle').prepend('<span class="lespan" style=\"font-size: 140%; font-weight: bold; padding-right:20px\">' + message + '</span><input type="button" value="Cliques ici" id="pubocide" style="color: red; font-size: 120%;" />');
    $('#pubocide').click(function() {
        $(this).hide();
        setInterval(function() { 
            $('.WikiaPageHeader .tally em').text("1 000 000");
            $('.WikiaPageHeader .tally em').addClass("unmillion");
            $('.lespan').html('<big><big>Regarde le nombre de pages !!!<big>');
        }, 5000);
    });
}

/*
var WikiaNotificationMessage = "N'oubliez pas, aujourd'hui c'est le jour de l'examen ! Les sujets seront publiés à 17h55, les sujets devront être rendu au plus tard à 19h10 et les options 19h20.";
var WikiaNotificationexpiry = 10;
importScriptPage('WikiaNotification/code.js', 'dev');
*/

var page = mw.config.get( 'wgPageName' );
var message = "Bienvenue sur le prototype des futurs cours dispensés par la 3CW. Nous comptons sur vous pour nous dire ce que vous en pensez via le fil lien que vous trouverez en bas de page.";
if (page === "BTT/Filière_A") {
    var ids = $.cookie('accueilalert');
    if (!ids) {
    alert(message);
    setCookie('accueilalert', 'on', 10);
    }
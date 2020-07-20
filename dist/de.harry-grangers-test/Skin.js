console.warn('Skin ist ' + wgAvailableSkins[skin]);
skin = 'smarty';
wgAdditionalSkins = {
    "smarty": "Paddington",
    "montparnasse": "Montparnasse",
    "davinci": "DaVinci",
    "custom": wgDBname
}
$.extend(wgAvailableSkins,wgAdditionalSkins,true);
console.dir(wgAdditionalSkins);
console.dir(wgAvailableSkins);

function addSkin(name) {
    $.get('/load.php?mode=articles&articles=MediaWiki:' + name + '.css&only=styles').done(function(data) { mw.util.addCSS(data); }
    );
}
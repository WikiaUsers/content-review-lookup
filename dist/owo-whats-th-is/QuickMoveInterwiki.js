/**
 * This javascript is only for use personal
 * don't put this in MediaWiki:Wikia.js or Common.js
 * @author: HumanoidPikachu
**/

//Function Banner
function bannerNotif() {
    new BannerNotification('Quick move: <a href="http://es.gup.wikia.com/" style="color:#ff00a0">GUP Wiki</a> - <a href="http://es.monsterlegends.wikia.com/" style="color:#b25100">ML Wiki</a> - <a href="http://es.mipequeoponyfanlabor.wikia.com/" style="color:#a3ff00">MLPFL Wiki</a> - <a href="http://es.terraria.wikia.com/" style="color:#7450a3">Terraria Wiki</a> - <a href="http://es.mlp.wikia.com/" style="color:#fe82ff">MLP Wiki</a> - <a href="http://es.mariofanon.wikia.com/" style="color:#ff4d00">MF Wiki</a>', 'confirm').show();
}
//Create Button
$('.WikiaRail').prepend('<div id="humanoidButtonQuickMoveInterwiki" onclick="bannerNotif();" style="margin:auto; cursor: pointer; font-size:150%; bottom:4px; padding-bottom:2px; border-bottom: 2px solid #C00; width:90%;" align="center">&nbsp;Quick Move Interwiki</div>');
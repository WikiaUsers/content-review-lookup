//QuickNavChats
// @author HumanoidPikachu
// @version 1.2.9

//Add a button in the .Rail
$('.ChatWindow .Rail').prepend('<center><div id="humanoidShowNavChat" align="center" class="button" style="text-align:center; margin:auto" onclick="openChatNav();">Show Chat Navegator</div></center>');
//Main function
function openChatNav() {
	$.showCustomModal('Chats', '<form class="WikiaForm" method="" name="" id="chatnav"><fieldset><span style="font-family:Arial"><p><a href="http://es.gup.wikia.com/Special:Chat" style="color:#ff00a0">GUP Wiki</a> - <a href="http://es.monsterlegends.wikia.com/Special:Chat" style="color:#b25100">ML Wiki</a> - <a href="http://es.mipequeoponyfanlabor.wikia.com/Special:Chat" style="color:#a3ff00">MLPFL Wiki</a> - <a href="http://es.terraria.wikia.com/Special:Chat" style="color:#7450a3">Terraria Wiki</a> - <a href="http://es.mlp.wikia.com/Special:Chat" style="color:#fe82ff">MLP Wiki</a> - <a href="http://es.mariofanon.wikia.com/Special:Chat" style="color:#ff4d00">MF Wiki</a> - <a href="http://es.geometry-dash.wikia.com/Special:Chat" style="color:#50ee00">GD Wiki</a> - <a href="http://es.clubpenguin.wikia.com/Special:Chat" style="color:#43d4ff">CP Wiki</a> - <a href="http://es.cartoonnetwork.wikia.com/Special:Chat" style="color:#000; text-shadow: 0 0 6px #FFF">CN Wiki</a> - <a href="http://es.naruto.wikia.com/Special:Chat" style="color:#FE6B1F">Naruto Wiki</a> - <a href="http://es.creepypasta.wikia.com/Special:Chat" style="color:#d40000">Creepypasta Wiki</a> - <a href="http://es.horadeaventura.wikia.com/Special:Chat" style="color:#73fff4">HDA Wiki</a> - <a href="http://es.dragonballfanon.wikia.com/Special:Chat" style="color:#f97d00">DB Fanon Wiki</a> - <a href="http://es.polandball.wikia.com/Special:Chat" style="color:#F00">PB Wiki</a> - <a href="http://comunidad.wikia.com/Special:Chat" style="color:#002f6f">CC (ES)</a></p>');
}
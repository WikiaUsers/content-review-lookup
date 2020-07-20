/* Codes obtain from http://xiaolinpedia.wikia.com/wiki/MediaWiki:Wikia.js/monobook.js */

// Monobook Button
var sfwMonobookSwitch = document.createElement("a");
sfwMonobookSwitch.className = "wikia-button";
sfwMonobookSwitch.id = "SFWMonobookSwitch";
sfwMonobookSwitch.href = "?useskin=monobook";
sfwMonobookSwitch.innerHTML = "Monobook";
document.getElementsByClassName('header-container')[0].appendChild(sfwMonobookSwitch);
// End Monobook Button
 
//Skin Switcher
function switchSkin() {
var newSkin = document.createElement('style');
$(newSkin).load('http://sonicfanon.wikia.com/wiki/User:Gamedezyner/Newskin.css?action=raw');
$('html > head').append(newSkin);
}
var skinswitcher = document.getElementById('skinswitcher');
skinswitcher.onclick = switchSkin
// End Skin Switcher
importScriptPage('MediaWiki:Wikia.js/cancelButton.js', 'admintools');
importScriptPage('MediaWiki:Wikia.js/editCount.js', 'admintools');
importScript('MediaWiki:Wikia.js/copyright.js');

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

var notifMessage = "Be sure to read the <a href=\"/wiki/Category:Policies\">Policies/a>!"; //make sure to change this
$(function () {
  if ( getCookie( 'customNotification_'+'_bakublog-'+wgDBname ) != "off" ) {
    $('body.skin-oasis').addClass('notifications');
    $('.toolbar').append('<ul id="WikiaNotifications" class="WikiaNotifications CustomPopup"><li><div data-type="5"><a class="sprite close-notification"></a>'+notifMessage+'</div></li></ul>');
    $('.CustomPopup .close-notification').click(function() {
      $('.CustomPopup').remove();
      $('body.skin-oasis').removeClass('notifications');
      setCookie( 'customNotification_'+'_bakublog-'+ wgDBname, "off", 3 );
    });
  }
});
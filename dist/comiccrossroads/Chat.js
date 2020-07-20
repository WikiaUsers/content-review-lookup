/* QuickModTools */
importArticles({
	type: "script",
	articles: [
		"u:dev:QuickModTools/code.js"
	]
});
importArticles({
	type: "script",
	articles: [
		"u:dev:QuickModTools/loader.js"
	]
});

/* Objects */
importScriptPage( 'ChatObject/code.js', 'dev' );
importScriptPage('MediaWiki:ChatTags/code.js', 'shining-armor');
// Color Scheme
Chat.setColorScheme({
pageBackground: 'black',
textColor: 'black'
});

/*
* FixAdminKick
* Allows admins to kick other admins in chat
* @author Ozank Cx
* Thanks to Dorumin for contributing
*/
 
;(function($, mw) {
 
if (mw.config.get('wgCanonicalSpecialPageName') !== 'Chat') return;
 
var main = {
    init: function() {
        var chatUniqueString = mw.config.get('wgCityId') + "9586094684058490483905805934850986098709568790580980938059835098306968069870796890809870348730573057035370583708"; //chat-specific long string
 
        // Send the kick message to everyone in chat
        mainRoom.model.chats.bind('afteradd', function (child) {
            if (main.oldUsers.findByName(child.attributes.name) && main.oldUsers.findByName(child.attributes.name).attributes.canPromoteModerator && child.attributes.text.slice(0, chatUniqueString.length) == chatUniqueString) {
                main.oldUsers.findByName(child.attributes.name).attributes.canPromoteModerator = false; // prevent double kicking
                var kicked = child.attributes.text.split(' ')[1];
                var kicker = child.attributes.name;
                var inline = main.kickMessage.replace(/\$1/g, kicked).replace(/\$2/g, kicker);
                var chatUL = mainRoom.viewDiscussion.chatUL;
                $('#entry-' + child.cid).remove();
                chatUL.children('.inline-alert').last().html(inline);
            }
        });
 
        // Exit if you're not an admin
        if (mw.config.get('wgUserGroups').indexOf('sysop') === -1) return;
 
	//Add CSS
	mw.util.addCSS('.UserStatsMenu .actions ul li.admin-kick .icon {background-position: -428px 0px;}');
 
        // Attach the admin kick over the existing one
        mainRoom.viewUsers.bind('mainListClick', function(e) {
            var interval = setInterval(function() {
                if (mainRoom.model.users.findByName(e.name) && !mainRoom.model.users.findByName(e.name).attributes.canPromoteModerator)
                    clearInterval(interval);
                if ($('.admin-actions').children().length == 2) { //when the actions against another admin is present the number of child elements is 2
                    clearInterval(interval);
                    $('.admin-actions .kick').removeClass('kick').addClass('admin-kick').click(function() {
                        main.oldUsers = mainRoom.model.users;
                        $('.UserStatsMenu[style*="display: block;"]').remove();
                        main.kickAdmin(e.name);
                        main.sendKickMessage(chatUniqueString + ' ' + e.name);
                    });
                }
            }, 1);
            setTimeout(function() {
                clearInterval(interval);
            }, 3000);
        });
    },
    kickAdmin: function(userToKick) {
        mainRoom.socket.socket.send(new models.BanCommand({
            userToBan: userToKick,
			reason: 'Kicking out of chat'
        }).xport());  
    },
    sendKickMessage: function(msg) {
        mainRoom.socket.send(new models.ChatEntry({
            roomId: this.roomId,
            name: mw.config.get('wgUserName'),
            text: msg
        }).xport());
    },
    kickMessage: '',
    oldUsers: mainRoom.model.users
};
setTimeout(function() {
    $.getJSON('/api.php?action=query&prop=revisions&rvprop=content&titles=MediaWiki:Chat-user-was-kicked&format=json', function(data) {
        var page = data.query.pages[Object.keys(data.query.pages)[0]];
        if (page.missing == '') main.kickMessage = '$1 has been kicked by $2.';
        else main.kickMessage = page.revisions[0]['*'];
        main.init();
    });
}, 5000);
 
}) (this.jQuery, this.mediaWiki);

/* 
* Chat Announcements
* @description Create announcements for all the users in chat
* Must be installed in the wiki's MediaWiki:Chat.js or it will not work
* @author Ozuzanna
*/
 
$(function() {
 
if (mw.config.get('wgCanonicalSpecialPageName') !== "Chat") return;
 
var forAll = window.chatAnnouncementsAll,
username,
message,
isInlineAlert;
 
mainRoom.model.chats.bind("afteradd", function (child) {
    isInlineAlert = child.attributes.isInlineAlert == null ? false : true;
 
	if (!isInlineAlert && mainRoom.model.users.findByName(child.attributes.name) != null) {
		username = child.attributes.name;
		message = child.attributes.text;
 
		if ((mainRoom.model.users.findByName(username).attributes.isModerator || forAll) && /^\/announce /i.test(message)) {
			mainRoom.viewDiscussion.chatUL.children().last().remove();
			mainRoom.model.chats.add(new models.InlineAlert({text: '[[User:' + username + '|' + username + ']]: ' + mw.html.escape(message.slice(10))}));
		}
	}
});
 
});

// <syntaxhighlight lang="javascript">
/**
 * ChatImages
 * @version 1.2.4
 * @author [[User:Houmgaor]]
 */
 
document.querySelector("body").addEventListener("DOMNodeInserted", function() {
// Search the last sended message, check if it contains a link, event active for each key pressed in the chat
        var message = document.querySelector("body").querySelectorAll('.message')[document.querySelector("body").querySelectorAll('.message').length - 1].querySelector('a'); 
        if (typeof message_save == 'undefined') {
            message_save = [];
        } else {
            message_save.push(message);
            if (message_save > 4) {
                message_save.shift();
            }
        }
        if (message !== null && message_save[message_save.length - 1] != message_save[message_save.length - 2]) {
            if (message.innerText.split('|').length == message.href.split('%7C').length == 1 && message.innerText && message.href.substr(location.origin.length + 6).replace(/\:/g, '%3A') != encodeURIComponent(message.innerText.replace(/\s/g, '_'))) {
            message.href += encodeURIComponent('|' + message.innerText);
            }
            var link = {
                href: message.href,
// Shorts the URL, to register the end of it
                target: message.href.substr(location.origin.length + 6)
            };
// Check if it has caracteristics of an image 
           if (/^(?:%20)*(?:File|Image|Fichier|Файл|Archivo|Datei|Plik|Выява)\:(.+)\.(?:png|gif|jpeg|tiff|jpg)(?:%20)*$/i.test(link.target.split('%7C')[0] ) ) {
               message.innerHTML = '<img src="https://images.wikia.nocookie.net/__cb1467284395/common/skins/common/images/ajax.gif" alt="' + RegExp.$1 + '" title="' + RegExp.$1 +'" width="50" height="50">';
               var image = new XMLHttpRequest();
               image.open('GET', link.href.split('%7C')[0]);
               image.send(null);
               image.addEventListener('readystatechange', function() {
                   if (image.readyState == 4 && image.status == 200) {
                       var img = image.responseText;
// "img" is the location of the searched image
                       img = img.substring(img.indexOf('id="file"'), img.indexOf('</a>', img.indexOf('id="file"') ) );
                       img = img.substring(img.indexOf('src=') + 5, img.indexOf('"', img.indexOf('src=') + 5) ).replace(/&amp;/g, '&');
                       message.querySelector('img').setAttribute('src', img);
                       var alt = decodeURIComponent(link.target),
                        title = decodeURIComponent(link.target),
                        width = '175',
                        height = '175';
                       if (link.href.split('%7C').length > 1) {
                           for (var i = 0; i < link.href.split('%7C').length; i++) {
                               if (!/\d+\s*px\s*$/i.test(decodeURIComponent(link.href.split('%7C')[i]) ) ) {
                                   if (!/^\s*(center|left|right)\s*$/.test(decodeURIComponent(link.href.split('%7C')[i]) )) {
                                       alt = (decodeURIComponent(link.href.split('%7C')[i]) !== undefined) ? decodeURIComponent(link.href.split('%7C')[i]).replace(/_/g, ' ').trim() : alt;
                                   title = alt;
                                   } else {
                                        switch (RegExp.$1) {
                                            case 'left':
                                                message.querySelector('img').style.float = 'left';
                                                break;
                                            case 'right':
                                                message.querySelector('img').style.float = 'right';
                                                break;
                                            case 'center':
                                                message.style.display = 'block';
                                                message.style.textAlign = 'center';
                                                break;
                                        }
                                   }
                               } else {
                                   width = (/^(\d{1,4})\s*px$/i.test(decodeURIComponent(link.href.split('%7C')[i]).replace(/_/g, ' ').trim() ) ) ? RegExp.$1 : width;
                                   height = (parseInt(width) * 3/4);
                                   if (/^(\d{1,4})\s*x\s*(\d{1,4})\s*px$/i.test(decodeURIComponent(link.href.split('%7C')[i]).replace(/_/g, ' ').trim() ) ) {
                                       width = RegExp.$1;
                                       height = RegExp.$2;
                                   }
                               }
                           }
                       }
                       message.querySelector('img').alt = alt;
                       message.querySelector('img').title = title;
                       message.querySelector('img').width = width;
                       message.querySelector('img').height = height;
                   } else if (image.readyState == 4 && image.status == 404) {
                       if (typeof wgUserLanguage == 'undefined') {
                            wgUserLanguage = 'en';
                        }
                       switch (wgUserLanguage) {
/********************************HERE**************************************/
// Here you can add more languages if you are sure of them, please add them in alphabetical order, and add 1 on the version (1.0.0 -> 1.0.1 for example) 
                                case 'be':
                               message.innerHTML = 'Файл не знойдзены';
                                break;
                                case 'en':
                               message.innerHTML = 'Missing file';
                                break;
                                case 'es':
                               message.innerHTML = 'Archivo no encontrado';
                                break;
                                case 'fr':
                               message.innerHTML = 'Fichier introuvable';
                                break;
                                case 'pl':
                               message.innerHTML = 'Plik nie istnieje';
                                break;
                                case 'ru':
                               message.innerHTML = 'Файл не найден';
                                break;
                                case 'uk':
                               message.innerHTML = 'Файл не знайдено';
                                break;
                                case '':
                               message.innerHTML = '';
                                break;
/**************************************************************************/
                            default:
                            message.innerHTML = 'Missing file <span style="color: #000;">(You can improve the translation <a href="http://dev.wikia.com/wiki/MediaWiki:ChatImages/code.js" title="MediaWiki:ChatImages/code.js">here</a>)</span>';
                            break;
                       }
                       message.innerHTML = message.innerHTML.fontcolor('red');
                   } else if (image.readyState == 4) {
                       message.innerHTML = 'Hello world! I\'m the error ' + image.status + '! (something wrong has appened)'.fontcolor('red'); 
                   }
               });
           }
        }
    });
// </syntaxhighlight>

/* Chat soundfiles and shit */

var textSound = $('#myText').val();
$('ul.WikiChatList').prepend('<div>Type here the URL of the <abbr style="border-bottom:1px dotted black" title="MP3, OGG & WAV"> audio file</abbr> and press Enter<audio></audio></div><div><input type="text" /></div><a href="//www.google.com/search?q=mp3">Search MP3 files</a>');
$('#playAudio').click(function() {
var audiowtf = document.getElementById("audiowtf"); 
audiowtf.play();
});
 
var audioElement = document.getElementsByTagName('audio')[0];
var inputElement = document.getElementsByTagName('input')[0];
 
$('input').keyup(function() {
  if (event.keyCode == 13) {
    loadAndPlay(inputElement.value);
  }
});
 
function loadAndPlay(src) {
  audioElement.pause();
  audioElement.src = src;
  audioElement.load();
  audioElement.play();
}
 
loadAndPlay(inputElement.value);
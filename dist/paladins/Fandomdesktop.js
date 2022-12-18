// ----------------------------------------------------------------------------
// Original Script from: https://dota2.fandom.com/wiki/MediaWiki:Common.js
// Modification by: https://paladins.fandom.com/wiki/User:QMan
// Custom context menu to allow downloading of ext-audiobutton files.

//Download function
function forceDownload(blob, filename) {
  var a = document.createElement('a');
  a.download = filename;
  a.href = blob;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

//Create Blob URL
function downloadAudio(url, filename) {
  if (!filename) filename = url.split('\\').pop().split('/').pop();
  fetch(url, {
    headers: new Headers({
      'Origin': location.origin
    }),
    mode: 'cors'
  }).then(function (response) {
    return response.blob();
  }).then(function (blob) {
    var blobUrl = window.URL.createObjectURL(blob);
    forceDownload(blobUrl, filename);
  })["catch"](function (e) {
    return console.error(e);
  });
}

//Localization
var loc = {
	i18n: {
		en: {
			download: 'Download',
			copylink: 'Copy Link'
		},
		ru: {
			download: 'Скачать',
			copylink: 'Скопировать ссылку'
		}
	}
};

lng = mw.config.values.wgUserLanguage;

loc.lng = ( typeof loc.i18n[ lng ] === 'undefined' ) ? loc.i18n.en : loc.i18n[ lng ];

//Do not create another <div> element if it already exists
if (!document.getElementById("context-menu")) {
//Create <div> menu with button
var menu = document.createElement("div");
menu.setAttribute("id", "context-menu");
menu.innerHTML = '<ul><li><div class="sm2button" id="audio-download">' + loc.lng.download + '</div></li><li><div class="sm2button" id="cLink">' + loc.lng.copylink + '</div></li></ul>';
document.getElementsByTagName('body')[0].appendChild(menu);
}
    
function sm2b (id) {
    return document.getElementById(id);
}

//Download file using Blob URL instead of external URL
sm2b('audio-download').onclick = function (e) {
  var audioLink = menu.dataset.link;
  audioLink = audioLink.split('/revision')[0];
  downloadAudio(audioLink);
};

//Copy audio link to clipboard
sm2b('cLink').onclick = function (e) {
  var audioLink = menu.dataset.link;
  navigator.clipboard.writeText(audioLink);
};

//Hide elements and remove link on click
document.onclick = function (e) {
  menu.style.display = 'none';
  menu.dataset.link = "";
};

//Set position and URL
var buttons = document.querySelectorAll('a.ext-audiobutton');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].oncontextmenu = function (e) {
    e.preventDefault();
    var y = e.pageY - 30;
    menu.style.left = e.pageX + 'px';
    menu.style.top = y + 'px';
    menu.style.display = 'block';
    menu.dataset.link = this.previousElementSibling.getElementsByTagName("source")[0].src;
  };
}
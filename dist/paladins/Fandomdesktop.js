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

//Create <div> menu with button
var menu = document.createElement("div");
menu.setAttribute("id", "context-menu");
menu.innerHTML = '<ul><li><div id="download">Download</div></li><li><div id="cLink">Copy Link</div></li></ul>';
document.getElementsByTagName('body')[0].appendChild(menu);

//Download file using Blob URL instead of external URL
$('download').onclick = function (e) {
  var audioLink = menu.dataset.link;
  audioLink = audioLink.split('/revision')[0];
  downloadAudio(audioLink);
};

//Copy audio link to clipboard
$('cLink').onclick = function (e) {
  var audioLink = menu.dataset.link;
  audioLink = audioLink.split('/revision')[0];
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

function $ (id) {
    return document.getElementById(id);
}
// Nazwa: Gołąb pocztowy 0.3
// Opis: http://pl.wikipedia.org/wiki/Wikipedia:Narzędzia/Gołąbek_pocztowy
// Autor: http://pl.wikipedia.org/wiki/Wikipedysta:Krzysiu
 
mw.loader.using('ext.gadget.gConfig', function(){
 
gConfig.register('golabPocztowy', 'Gołąbek pocztowy', [
	{
		name: 'KNSflash',
		desc: 'Migająca ikonka nowej wiadomości.',
		type: 'boolean',
		legacy: window,
		deflt: false
	}, {
		name: 'KNSpreview',
		desc: 'Włącz podgląd nowych wiadomości.',
		type: 'boolean',
		legacy: window,
		deflt: true
	}, {
		name: 'KNStitle',
		desc: 'Tekst dodawany przed tytułem strony po nadejściu nowej wiadomości. Domyślnie puste.',
		type: 'string',
		legacy: window,
		deflt: ''
	}
]);
 
var divArr = document.getElementsByTagName('div'); // pobierz wszystkie elementy DIV
var newMsgImg = (!gConfig.get('golabPocztowy', 'KNSflash')) ? '//upload.wikimedia.org/wikipedia/commons/1/1f/KNS_-_new_message_icon.png' : '//upload.wikimedia.org/wikipedia/commons/5/52/KNS_-_new_message_icon_animated.gif'; //jeśli użytkownik ustawi KNSflash to animuj ikonkę
for (var i in divArr) // znajdź element z klasą usermessage
{
    if (divArr[i].className == 'usermessage') {
        var msgBar = divArr[i];
        break;
    }
}
var myTalk = document.getElementById('pt-mytalk')
    .getElementsByTagName('a')[0]; // pobierz element "moja dyskusja"
if (msgBar) { // jeśli jest nowa wiadomość...
    if (gConfig.get('golabPocztowy', 'KNStitle')) {
        document.title = gConfig.get('golabPocztowy', 'KNStitle') + ' ' + document.title;
    }
    myTalk.href = msgBar.getElementsByTagName('a')[1].href; // link z pomarańczowego paska
    myTalk.title = msgBar.childNodes[0].data + msgBar.getElementsByTagName('a')[0].innerHTML; // tytuł również
    myTalk.innerHTML = '<img src="' + newMsgImg + '" alt="moja dyskusja (nowe!)" />'; // no i obrazek!
    if (gConfig.get('golabPocztowy', 'KNSpreview')) {
        url = window.location.protocol + "//pl.wikipedia.org/w/api.php?action=query&prop=revisions&titles=User%20talk:" + encodeURI(wgUserName) + "&rvprop=user|timestamp&format=json&rvdiffto=prev";
        $.ajax(url)
            .done(function (json) {
            for (var id in json.query.pages) {
                var pageid = id;
            }
            window.golabPocztowyDiffData = [json.query.pages[pageid].revisions[0].diff['*'], json.query.pages[pageid].revisions[0].user, json.query.pages[pageid].revisions[0].timestamp.substr(0, 10), json.query.pages[pageid].revisions[0].timestamp.substr(11, 8)];
        });
    var diffWindowLink = document.createElement('a'); // link do podglądu
    diffWindowLink.href = '#';
    diffWindowLink.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/e/e4/KNS_-_preview.png" title="Podgląd ostatniej wiadomości" alt="[+]" />';
    diffWindowLink.className = 'KNSdifflink';
    diffWindowLink.onclick = function () {
        if (diffWindow.innerHTML == '') {
            var diffData = window.golabPocztowyDiffData;
            diffHTML = 'Użytkownik <span style="font-weight: bold">' + diffData[1] + '</span> napisał wiadomość dnia <span style="font-weight: bold">' + diffData[2] + '</span> o <span style="font-weight: bold">' + diffData[3] + '</span>:<p />'; // nagłówek okna z podglądem
            var diffNew = diffData[0].match(new RegExp('<td class=\\"diff-addedline\\">(.*)</td>', 'g')); // wybierz tylko potrzebne linie z podglądu zmian
            for (var i in diffNew) // ...i oczyść je
            {
                diffNew[i] = diffNew[i].replace('<td class=\"diff-addedline\"><div>', '');
                diffNew[i] = diffNew[i].replace('</div></td>', '');
                diffHTML += diffNew[i] + '<br />';
            }
            diffWindow.innerHTML = diffHTML;
            diffWindow.appendChild(diffClose);
        }
        diffWindow.style.visibility = 'visible';
    }; // po kliknięciu pokaż okienko
    document.getElementById('pt-mytalk')
    .appendChild(diffWindowLink);
    var diffWindow = document.createElement('div'); // stwórz okienko z podglądem
    diffWindow.className = 'KNSwindow';
    document.body.appendChild(diffWindow);
    var diffClose = document.createElement('div'); // zamykanie okienka
    diffClose.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/0/0e/KNS_-_preview_close.png" />';
    diffClose.onclick = function () {
    diffWindow.style.visibility = 'hidden';
    };
    diffClose.className = 'KNSclose';
	};
} else { // a jeśli nie...
    myTalk.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/1/15/KNS_-_no_messages_icon.png" alt="moja dyskusja" />';
    myTalk.title = 'Brak nowych wiadomości';
};
 
});
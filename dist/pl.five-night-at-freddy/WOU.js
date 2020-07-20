
/*
@ Author - Michał56
*/

var van = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    username: mw.config.get('wgUserName')
};
 
 //Przycisk
 if(van.pagename === "Five Nights at Freddy Wiki:Wnioski o uprawnienia") {
    var buttonappend = '<a class="wikia-button" id="wnioski-submit" onclick="openFormWOU()">Złóż wniosek</a>';
    document.getElementById("lang-EN").innerHTML = buttonappend;
}

//Otwarcie formularza do wypełnienia
function openFormWOU() {
    $.showCustomModal('Złoż wniosek', '<form class="WikiaForm" method="" name="" id="WOU"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Twój nick</span><br><input id="nick" type="text" placeholder="Tu wpisz swój nick" style="width:400px"/><span style="font-weight:bold">Prawo które chce otrzymać</span><br><input id="prawo" type="text" placeholder="Naprzykład:Administrator" style="width:400px"/><br><span id="br2" /><span style="font-weight:bold">Powód</span><br><textarea name="" id="powod" style="height: 100px; width: 100%;" placeholder="Tutaj wpisz powód, dobre uzasadnienie jest milewidziane"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Anuluj",
            handler: function () {
                cancelformWOU();
            }
        }, {
            id: "submit",
            defaultButton: true,
            message: "Gotowe!",
            handler: function () {
                submitformWOU();
            }
        }]
    });
}

//Zamknięcie formularza
function cancelformWOU() {
    $("#requestWindow").closeModal();
}

//Wygenerowany tekst po prawidłowym wypełnieniu formularza
function submitformVandalism() {
console.log('Zapisywanie...');
    var $form = $('#WOU'),
        wikiname = $form.find('#nick').val(),
        user = $form.find('#prawo').val(),
        comments = $form.find('#powod').val(),
 
console.log('Sprawdzanie...');
 
    // Ajax URL
    var url = van.server + '/api.php?action=edit&title=Five Nights at Freddy Wiki:Wnioski o uprawnienia&section=new&sectiontitle=' + nick + '&text=' + encodeURIComponent(page) + '&summary=Nowy+wniosek+o+uprawnienia+(' + nick + ', ' + prawo + ')&token=' + encodeURIComponent(van.edittoken);
console.log('Got the url: ',url);
 
    $.post(url, function (r) {
console.log('Should be done now:',r);
	cancelformWOU();
        window.location.reload();
    });
console.log('Sent request...');
}
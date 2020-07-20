/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Translate: Szynka013
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/
 
// Zmienne na później
// Wartości organizacyjne
var des = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: (''),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVR42mWTS0hVURSGv32O9329V69FL2lgVEaPUQ+CmvSkUQURQgkNgoToMbgQGEIKNsmCqEETCUOEiEKJBllRszQkRDBDEYVLgSHi6+p9nEfrnPu0Nmz+fdZe+1///s9eirJh/WGTFaFBMzmESXX5HhrzVDDAEi+19fwuhFVhYcxwRQvToYLUYP2za+fXMu0V5lgmrm3geTHFmqFRVfGCVUlIudXcqSI5tBecJJmmxPyCQYnNSsHNdCl7ho22wYTyErYzpcN44XVvlKmEl1tXZ/F4bJfAIZJcJDcpV9qujGni+joeCCMSyFX2wPKyzoEzu/D7Lb69G3MJpFBJSY3ALHeUMcEbvZrz1pIEtRJBKqVxunEvVRGDvs5R1weHwLZyJFqlwDx9KjPGB08VJ6xkSb4mSiw5cK5pP5GwQffjYchKzMwbKqiFBBb5pIxR3utRTq0h0AVlXo4fJhzK8qx9yDXXrW7nFQRdgo/KGPmfwLmKY1TTvSOEAgYPmwewV0vyXYJQgWCYfr2Sk+UErooAxDuOEvQbtN34irtv/6NgSa6QHqTXG+OsfBSrO69DiQ/jv2KYlkZ97Wyxsp0n0MOQmeOtmv9Cc7SWdnNurQfprE5z53Eygh3X+vF7TcwyE/UYLCRoUUNdbN2zjXFfCJ+RzilwCJJpDy09x/BWmLQ2fMbnMd2/4CioEH/SSTKT0+xwn/LkK67X1fMUITDT+Qeu5f5ErlEK3SYhn6A856kf3Ky7yJNiM433cHtLLfeDMQLugUIDlTeT+LIyRyqR4G79JR6t6UZn9Laxc99uGgNeDuqKqJ3vSudapsXiapbB7yN0X2jlZ+HMX0Le/VQrDN6yAAAAAElFTkSuQmCC',
    username: ('{{USERNAME}}')
};
 
if(des.namespace === 0) {
    $('.BuyWikiaPremium').after('<div style="text-align:center;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="https://vignette.wikia.nocookie.net/szynka013/images/e/e9/Kupteraz.png/revision/latest/scale-to-width/280?cb=20150617184430&path-prefix=pl" /> </a></div>');
}
 
function openReportForm() {
    $.showCustomModal('Zakup konto Wikia Premium!', 'NIE TYKAJ!<br>Uwaga: Twój adres IP zostanie zapisany w historii zgłoszeń!<form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nazwa użytkownika:</span><br><input name="" id="pagename" type="text" value="' + des.pagename +'" style="width:400px" placeholder="Napisz tutaj nazwę użytkownika!"/><br><span style="font-weight:bold">Podanie:</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Napisz tutaj, dlaczego konto Wikia Premium jest tak świetną i potrzebną funkcją!"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Anuluj!",
            handler: function () {
                $("#requestWindow").closeModal();
            }
        },
        {
            id: "submit-not-show",
            defaultButton: false,
            message: "Zapłacę następnym razem!",
            handler: function() {
                setTheWikiCookies();
                HAJSY(); 
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: "Już zapłaciłem!",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Przesyłka formularza
function submitReportForm() {
console.log('Wysyłanie...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{subst:Zgłoszenie\n|User = ' + pagina + '\n|Stan = Nowe zgłoszenie\n|Opis =' + comentarios + '|Podpis = ' + des.signature + '}}';
    if (!comentarios) {
        alert('To pole nie może być puste!');
        return;
    }
console.log('Sprawdzanie...');
 
// Ajax URL
    var url = des.server + '/api.php?action=edit&title=Troll:Wikia_Premium&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Wyszukiwanie URL: ',url);
 
    $.post(url, function (r) {
console.log('To powinno być:',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'Troll:Wikia_Premium#' + encodeURIComponent(des.pagename);
    });
console.log('Wysyłanie żądania... <br> https://images.wikia.nocookie.net/__cb20130731182655/wlb/images/7/74/WIP.gif');
}

// USERNAME
function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $("span.insertusername").html(wgUserName);
 }
 addOnloadHook(UserNameReplace);

// HAJSY
var hajsystyle   = '<br /><center><span style="font-size: 25px; color:blue; background: white; padding:10px;">WIKIA</span></center><br /><p id="SUPERPRO"></p>';
var hajsycontent = 'TAK SIĘ STANIE';
function HAJSY(){
    mw.util.addCSS('body{height: 96%;overflow: hidden;} body, html{height:98%;}');
    $('body').append('<div class=hajsydaj></div>');
    $('.HAJSY').html(hajsystyle);
    $('#SUPERPRO').html(hajsycontent);
}
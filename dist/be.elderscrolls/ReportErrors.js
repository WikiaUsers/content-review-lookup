// ################################################ //
// ### Паведамленні аб памылках ### //
// ### Version 1.2                              ### //
// ################################################ //

// Акно запыту
var des = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    pagename: mw.config.get('wgPageName').replace(/_/g, " "),
    server: mw.config.get('wgServer'),
    signature: '~~' + '~~',
    language: mw.config.get('wgUserLanguage'),
    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACeUlEQVR42mWTS0hVURSGv32O9329V69FL2lgVEaPUQ+CmvSkUQURQgkNgoToMbgQGEIKNsmCqEETCUOEiEKJBllRszQkRDBDEYVLgSHi6+p9nEfrnPu0Nmz+fdZe+1///s9eirJh/WGTFaFBMzmESXX5HhrzVDDAEi+19fwuhFVhYcxwRQvToYLUYP2za+fXMu0V5lgmrm3geTHFmqFRVfGCVUlIudXcqSI5tBecJJmmxPyCQYnNSsHNdCl7ho22wYTyErYzpcN44XVvlKmEl1tXZ/F4bJfAIZJcJDcpV9qujGni+joeCCMSyFX2wPKyzoEzu/D7Lb69G3MJpFBJSY3ALHeUMcEbvZrz1pIEtRJBKqVxunEvVRGDvs5R1weHwLZyJFqlwDx9KjPGB08VJ6xkSb4mSiw5cK5pP5GwQffjYchKzMwbKqiFBBb5pIxR3utRTq0h0AVlXo4fJhzK8qx9yDXXrW7nFQRdgo/KGPmfwLmKY1TTvSOEAgYPmwewV0vyXYJQgWCYfr2Sk+UErooAxDuOEvQbtN34irtv/6NgSa6QHqTXG+OsfBSrO69DiQ/jv2KYlkZ97Wyxsp0n0MOQmeOtmv9Cc7SWdnNurQfprE5z53Eygh3X+vF7TcwyE/UYLCRoUUNdbN2zjXFfCJ+RzilwCJJpDy09x/BWmLQ2fMbnMd2/4CioEH/SSTKT0+xwn/LkK67X1fMUITDT+Qeu5f5ErlEK3SYhn6A856kf3Ky7yJNiM433cHtLLfeDMQLugUIDlTeT+LIyRyqR4G79JR6t6UZn9Laxc99uGgNeDuqKqJ3vSudapsXiapbB7yN0X2jlZ+HMX0Le/VQrDN6yAAAAAElFTkSuQmCC',
    username: mw.config.get('wgUserName')
};
 
if(des.namespace === 0) {
    $('.article-categories').after('<div style="text-align:right;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="' + des.img + '" />Паведаміць пра абмылу</a></div>');
}
 
function openReportForm() {
    $.showCustomModal('Паведамляйце пра абмылы!', 'Калі вы заўважылі абмылу на The Elder Scrolls Wiki, калі ласка, выпраўце яе самастойна, The Elder Scrolls Wiki скарыстае тэхналогію вікі, якая дазваляе зрабіць гэта самастойна. Калі вы не можаце самастойна выправіць абмылу, паведаміце пра яе з дапамогай дадзенай формы.'+
'<h2 style="margin: 5px 0;">Калі абмыла ўжо была выпраўлена, не паведамляйце пра яе</h2>' +
'Не пакідайце свой тэлефон і/ці электронны адрас – адказ на паведамленне будзе дадзены толькі на старонцы з паведамленнямі і нідзе больш.' +
'<ul style="list-style: square; font-size:14px; padding:0 10px; margin-left:10px;">' +
                '<li>' +
                    '<a href="/wiki/The_Elder_Scrolls_Wiki:Паведамленні_аб_памылках" title="Бягучы спіс паведамленняў пра абмылы.">Бягучы спіс паведамленняў пра абмылы.</a>' +
                '</li>' +
            '</ul>' +
'Увага! Ваш IP-адрас будзе запісаны ў гісторыю змен старонкі.<form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Назва артыкула:</span><br><input id="pagename" disabled="" type="text" value="' + des.pagename +'" style="width:400px"/><br><span style="font-weight:bold">Апісанне абмылы:</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Калі ласка, апішыце абмылу як мага дакладней. Пры паведамленні пра фактычную абмылу не забудзьцеся пазначыць крыніцу, якая пацвярджае вашу інфармацыю."></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Адмена",
            handler: function () {
                $("#requestWindow").closeModal();
            }
        },
        {
            id: "editar",
            message: "Рэдагаваць самастойна",
            handler: function () {
                $("#requestWindow").closeModal();
                window.location = des.server + '/wiki/' + des.pagename + '?action=edit';
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: "Адправіць заяўку",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Форма дастаўкі
 function submitReportForm() {
console.log('Адпраўка...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{Памылка\n|Стан = Новая памылка\n|Артыкул = ' + pagina + '\n|Апісанне =' + comentarios + '|Подпіс = ' + des.signature + '}}';
    if (!comentarios) {
        alert('Гэта поле не можа быць пустым!');
        return;
    }
console.log('Праверка...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=The_Elder_Scrolls_Wiki:Паведамленні_аб_памылках&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Пошук URL: ',url);
 
    $.post(url, function (r) {
console.log('Гэта павінна быць:',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'The_Elder_Scrolls_Wiki:Паведамленні_аб_памылках#' + encodeURIComponent(des.pagename);
    });
console.log('Адпраўка запыту... <br> https://images.wikia.nocookie.net/__cb20130731182655/wlb/images/7/74/WIP.gif');
}
// ################################################ //
// ################################################ //
// ################################################ //
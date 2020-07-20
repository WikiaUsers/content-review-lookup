// ################################################ //
// ### Сообщения об ошибках Spyro Wiki ### //
// ### Version 1.2                              ### //
// ################################################ //

// Окно запроса
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
    $('.article-categories').after('<div style="text-align:right;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="' + des.img + '" />Сообщить об ошибке</a></div>');
}
 
function openReportForm() {
    $.showCustomModal('Сообщайте об ошибках!', 'Если вы заметили ошибку на Spyro Wiki, пожалуйста, исправьте её самостоятельно, Spyro Wiki использует технологию вики, которая позволяет сделать это самостоятельно. Если вы не можете самостоятельно исправить ошибку, сообщите о ней с помощью данной формы.'+
'<h2 style="margin: 5px 0;">Если ошибка уже исправлена — не сообщайте о ней</h2>' +
'Не оставляйте свой телефон и/или электронный адрес, ответ на сообщение будет дан только на странице с сообщениями и нигде больше.' +
'<ul style="list-style: square; font-size:14px; padding:0 10px; margin-left:10px;">' +
                '<li>' +
                    '<a href="/wiki/Spyro_Wiki:Сообщения_об_ошибках" title="Текущий список сообщений об ошибках.">Текущий список сообщений об ошибках.</a>' +
                '</li>' +
            '</ul>' +
'Внимание! Ваш IP-адрес будет записан в историю изменений страницы.<form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Название статьи:</span><br><input id="pagename" disabled="" type="text" value="' + des.pagename +'" style="width:400px"/><br><span style="font-weight:bold">Описание ошибки:</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Пожалуйста, опишите ошибку как можно точнее. При сообщении о фактической ошибке не забудьте указать источник, подтверждающий вашу информацию."></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Отмена",
            handler: function () {
                $("#requestWindow").closeModal();
            }
        },
        {
            id: "editar",
            message: "Редактировать самостоятельно",
            handler: function () {
                $("#requestWindow").closeModal();
                window.location = des.server + '/wiki/' + des.pagename + '?action=edit';
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: "Отправить заявку",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Форма доставки
 function submitReportForm() {
console.log('Отправка...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{Ошибка\n|Состояние = Новая ошибка\n|Статья = ' + pagina + '\n|Описание =' + comentarios + '|Подпись = ' + des.signature + '}}';
    if (!comentarios) {
        alert('Это поле не может быть пустым!');
        return;
    }
console.log('Проверка...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=Spyro_Wiki:Сообщения_об_ошибках&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Поиск URL: ',url);
 
    $.post(url, function (r) {
console.log('Это должно быть:',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'Spyro_Wiki:Сообщения_об_ошибках#' + encodeURIComponent(des.pagename);
    });
console.log('Отправка запроса... <br> https://images.wikia.nocookie.net/__cb20130731182655/wlb/images/7/74/WIP.gif');
}
// ################################################ //
// ################################################ //
// ################################################ //
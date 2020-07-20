// ####################################################### //
// ### Повідомлення про помилки The Elder Scrolls Wiki ### //
// ### Version 1.2                                     ### //
// ####################################################### //
//@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
//@ Ukrainian translation: Skyflurry
//@ Some functions added by Jr Mime (pop-up layout, variables)
//@ License: CC-BY-NC-SA

// Вікно запиту
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
    $('.article-categories').after('<div style="text-align:right;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="' + des.img + '" /> Повідомити про помилку</a></div>');
}
 
function openReportForm() {
    $.showCustomModal('Повідомляйте про помилки!', 'Якщо ви помітили помилку на «The Elder Scrolls Wiki», будь ласка, виправте її самостійно, «The Elder Scrolls Wiki» використовує технологію вікі, яка дозволяє це зробити самостійно. Не дивуйтеся, одне з правил «The Elder Scrolls Wiki» говорить: «Редагуйте сміливо»! Якщо ви не можете самостійно виправити помилку, повідомте про неї за допомогою даної форми.'+
'<h2 style="margin: 5px 0;">Якщо помилка вже виправлена — не повідомляйте про неї</h2>' +
'Не залишайте свій телефон і/або електронну адресу, відповідь на повідомлення буде дана тільки на сторінці з повідомленнями і ніде більше.' +
'<ul style="list-style: square; font-size:14px; padding:0 10px; margin-left:10px;">' +
                '<li>' +
                    '<a href="/wiki/The_Elder_Scrolls_Wiki:Повідомлення_про_помилки" title="Поточний список повідомлень про помилки.">Поточний список повідомлень про помилки.</a>' +
                '</li>' +
            '</ul>' +
'Увага! Ваша IP-адреса буде записана в журнал змін сторінки.<form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Назва статті:</span><br><input id="pagename" disabled="" type="text" value="' + des.pagename +'" style="width:400px"/><br><span style="font-weight:bold">Опис помилки:</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Будь ласка, опишіть помилку як можна точніше. При повідомленні про фактичну помилку не забудьте вказати джерело, що підтверджує вашу інформацію."></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Скасування",
            handler: function () {
                $("#requestWindow").closeModal();
            }
        },
        {
            id: "editar",
            message: "Редагувати самостійно",
            handler: function () {
                $("#requestWindow").closeModal();
                window.location = des.server + '/wiki/' + des.pagename + '?action=edit';
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: "Відправити заявку",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Форма доставки
 function submitReportForm() {
console.log('Відправка...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{Помилка\n|Стан = Нова помилка\n|Стаття = ' + pagina + '\n|Опис =' + comentarios + '|Підпис = ' + des.signature + '}}';
    if (!comentarios) {
        alert('Це поле не може бути порожнім!');
        return;
    }
console.log('Перевірка...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=The_Elder_Scrolls_Wiki:Повідомлення_про_помилки&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Пошук URL: ',url);
 
    $.post(url, function (r) {
console.log('Це повинно бути:',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'The_Elder_Scrolls_Wiki:Повідомлення_про_помилки#' + encodeURIComponent(des.pagename);
    });
console.log('Відправка запиту... <br> https://images.wikia.nocookie.net/__cb20130731182655/wlb/images/7/74/WIP.gif');
}
// ################################################# //
// ################################################# //
// ################################################# //
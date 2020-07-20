// ######################################### //
// ### Звіт про помилки Mass Effect Вікі ### //
// ### Версія 1.0                        ### //
// ######################################### //
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
    $('.article-categories').after('<div style="text-align:left;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="' + des.img + '" /> Повідомити про помилку</a></div>');
}
 
function openReportForm() {
    $.showCustomModal('<span style="color: #ba8c43;">Повідомляйте про наявні помилки!</span>', 'Якщо ви віднайшли помилку серед сторінок вікі-спільноти, будь ласка, виправте її самостійно, бо Mass Effect Вікі використовує вікі-технології, які дозволяють це зробити самостійно. Не дивуйтеся, одне з правил Mass Effect Вікі каже: «Редагуйте та виправляйте сміливо»! Якщо ви не можете самостійно виправити помилку, будь ласка, повідомте про цю помилку за допомогою даної форми.'+
'<h2 style="margin: 5px 0; color: #ba8c43;">Не повідомляйте про помилки, які не стосуються Mass Effect Вікі!</h2>' +
'Не залишайте свій мобільний телефон і/або електронну адресу, відповідь на повідомлення буде надано лишень на сторінці, де було залишено повідомлення і ніде більше.' +
'<ul style="list-style: square; font-size:14px; padding:0 10px; margin-left:10px;">' +
                '<li>' +
                    '<a href="/wiki/Mass_Effect_Вікі:Повідомлення_про_помилки" title="Поточний список повідомлень про помилки.">Поточний список повідомлень про помилки.</a>' +
                '</li>' +
                '<li>' +
                    '<a href="/wiki/Mass_Effect_Вікі:Виправлені_помилки" title="Поточний список виправлених помилок.">Поточний список виправлених помилок.</a>' +
                '</li>' +
            '</ul>' +
'<span style="color: #ba8c43;">Важливо!</span> Вашу IP-адресу/ім&#39;я користувача буде додано до журналу змін сторінки.<form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Назва статті:</span><br><input id="pagename" disabled="" type="text" value="' + des.pagename +'" style="width:400px"/><br><span style="font-weight:bold">Опис помилки:</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Будь ласка, опишіть помилку як можна точніше. При повідомленні про фактичну помилку не забудьте вказати джерело, що підтверджує вашу інформацію."></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 600,
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
            message: "Надіслати звіт",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Форма звіту
 function submitReportForm() {
console.log('Надсилання...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{Звіт про помилку\n|Стан = Нова помилка\n|Стаття = ' + pagina + '\n|Опис =' + comentarios + '|Підпис = ' + des.signature + '}}';
    if (!comentarios) {
        alert('Будь ласка, додайте вміст, бо це поле не може бути порожнім!');
        return;
    }
console.log('Перевірка...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=Mass_Effect_Вікі:Повідомлення_про_помилки&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Пошук URL: ',url);
 
    $.post(url, function (r) {
console.log('Це повинно бути:',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'Mass_Effect_Вікі:Повідомлення_про_помилки#' + encodeURIComponent(des.pagename);
    });
console.log('Надсилання звіту... <br /> http://images.wikia.nocookie.net/masseffect/uk/images/c/c0/Zavantaženńa.gif');
}
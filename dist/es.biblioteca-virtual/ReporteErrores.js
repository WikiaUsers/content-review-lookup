/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted to es.c by Bola
@ License: CC-BY-NC-SA
*/
 
 
// Variables for later on
// Keep these in an object for organization
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
    $('#WikiaArticleCategories').after('<div style="text-align:right;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="' + des.img + '" /> Reportar un error</a></div>');
}

function openReportForm() {
    $.showCustomModal('Reportar un error', 'Lamentamos que hayas encontrado un problema en esta página. Recuerda que esta es una wikia y cualquier usuario puede modificarla. Aún así, si no te animas a editar, puedes hacer el reporte usando este formulario. ¡Muchas gracias! <form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nombre del artículo</span><br><input id="pagename" disabled="" type="text" value="' + des.pagename +'" style="width:400px"/><br><span style="font-weight:bold">Problema encontrado</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Escribe aquí el problema encontrado"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Cancelar",
            handler: function () {
                $("#requestWindow").closeModal();
            }
        },
        {
            id: "editar",
            message: "Lo arreglaré yo mismo",
            handler: function () {
                $("#requestWindow").closeModal();
                window.location = des.server + '/wiki/' + des.pagename + '?action=edit';
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: "Enviar",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Submits the form
 
function submitReportForm() {
console.log('Enviando...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{subst:Reporte de error\n|Estado = Nuevo reporte\n|Artículo  = ' + pagina + '\n|Comentarios =' + comentarios + '|Firma = ' + des.signature + '}}';
    if (!comentarios) {
        alert('Este campo no puede quedarse en blanco.');
        return;
    }
console.log('Comprobaciones realizadas...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=project_talk:Reporte_de_errores&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Obteniendo la URL: ',url);
 
    $.post(url, function (r) {
console.log('Ya debería estar hecho:',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'project_talk:Reporte_de_errores#' + encodeURIComponent(des.pagename);
    });
console.log('Enviando solicitud...');
}
/*</nowiki>*/
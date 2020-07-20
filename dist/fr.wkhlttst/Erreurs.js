/*<nowiki>
@ Created By Lil' Miss Rarity, customized by Joeytje50 (i18n compatibility upgrade and dropdown languages)
@ Some functions added by Jr Mime (pop-up layout, variables)
@ Adapted by Hulothe
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
    $('#WikiaArticleCategories').after('<div style="text-align:right;"><a href="#" id="reportarError" onclick="openReportForm(); return false"><img style="vertical-align:-3px;" src="' + des.img + '" />Reporter une erreur</a></div>');
}
 
function openReportForm() {
    $.showCustomModal('Reporter un erreur', 'Nous sommes désolés que vous ayez rencontré une erreur. Savez-vous que n\'importe quell utilisateur peut modifier un article ? Si la modification ne vous intéresse pas, vous pouvez utilizer ce formulaire pour reporter une erreur. Merci de votre participation ! <form class="WikiaForm" method="" name="" id="reporteError"><fieldset><span style="font-family:Arial"><span style="font-weight:bold">Nom ed l'article</span><br><input id="pagename" disabled="" type="text" value="' + des.pagename +'" style="width:400px"/><br><span style="font-weight:bold">Problème rencontré</span><br><textarea name="" id="comment" style="height: 100px; width: 100%;" placeholder="Écivez le problème que vous avez rencontré ici"></textarea><br><span id="br2" /></fieldset></form>', {
        id: "requestWindow",
        width: 650,
        buttons: [{
            id: "cancel",
            message: "Annuler",
            handler: function () {
                $("#requestWindow").closeModal();
            }
        },
        {
            id: "editar",
            message: "Je peux régler le problème moi-même",
            handler: function () {
                $("#requestWindow").closeModal();
                window.location = des.server + '/wiki/' + des.pagename + '?action=edit';
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: "Envoyer",
            handler: function () {
                submitReportForm();
            }
        }, ]
    });
}
 
// Submits the form
 
function submitReportForm() {
console.log('Envoi en cours...');
    var $form = $('#reporteError'),
        pagina = $form.find('#pagename').val(),
        comentarios = $form.find('#comment').val(),
        page = '{{subst:Erreurs\n|État = Nuevo reporte\n|Article  = ' + pagina + '\n|Commentaires =' + comentarios + '|Signature = ' + des.signature + '}}';
    if (!comentarios) {
        alert('Ce champ doit être rempli.');
        return;
    }
console.log('Contrôles réalisés...');
 
    // Ajax URL
    var url = des.server + '/api.php?action=edit&title=project:Reports d'erreurs&section=new' + '&text=' + encodeURIComponent(page) + '&token=' + encodeURIComponent(des.edittoken);
    $("#requestWindow").prepend('<div class="wikiaThrobber"></div>');
    console.log('Obtention de l'URL : ',url);
 
    $.post(url, function (r) {
console.log('Ce devrait déjà être fait :',r);
    $("#requestWindow").closeModal();
window.location = des.server + '/wiki/' + 'project:Reports d'erreurs#' + encodeURIComponent(des.pagename);
    });
console.log('Envoi du report...');
}
/*</nowiki>*/
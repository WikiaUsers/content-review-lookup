/*
__________
 
EditBoardDescription 1.0
Original script: https://comunidad.fandom.com/wiki/MediaWiki:Dise%C3%B1os.js
__________
 
Authors:
@ Benfutbol10
@ Lil' Miss Rarity (original script)
@ Joeytje50 (original script)
@ Jr Mime (original script)
@ bola (original script, es.c)
_____________
License: CC-BY-NC-SA
*/
 
var des = {
    edittoken: mw.user.tokens.values.editToken,
    namespace: mw.config.get('wgNamespaceNumber'),
    title: mw.config.get('wgTitle'),
    pagename: mw.config.get('wgPageName'),
    server: mw.config.get('wgServer')
};
 
var messages = {
    en: {
        link_text: "Edit message",
        link_tooltip: "Edit board description",
        windowtitle: "Editing " + des.title + " board description",
        summary: "Edit summary",
        summary_default: "Updated board description",
        save: "Publish",
        cancel: "Cancel"
    },
    es: {
        link_text: "Editar mensaje",
        link_tooltip: "Editar descripción del subforo",
        windowtitle: "Editando descripción del subforo " + des.title,
        summary: "Resumen de edición",
        summary_default: "Descripción del subforo actualizada",
        save: "Grabar la página",
        cancel: "Cancelar"
    },
    pl: {
        link_text: "Edytuj wiadomość",
        link_tooltip: "Edytuj opis tematu",
        windowtitle: "Edytuj opis " + des.title,
        summary: "Dodaj opis zmian",
        summary_default: "Zaktualizuj opis tematu",
        save: "Publikuj",
        cancel: "Anuluj"
    },
    'pt-br': {
        link_text: "Editar mensagem",
        link_tooltip: "Editar descrição do fórum",
        windowtitle: "Editando descrição do fórum " + des.title,
        summary: "Editar sumário",
        summary_default: "Descrição do fórum atualizada",
        save: "Publicar",
        cancel: "Cancelar" 
    },
        tr: {
        link_text: "Mesajı düzenlme",
        link_tooltip: "Pano açıklamasını düzenle",
        windowtitle: + des.title + " pano açıklaması düzenleniyor",
        summary: "Özeti düzenle",
        summary_default: "Pano açıklaması güncellendi",
        save: "Yayınla",
        cancel: "İptal"
    },
};
 
messages = $.extend(messages.en, messages[mw.config.get('wgUserLanguage')]);
 
if (/sysop/i.test(wgUserGroups) && des.namespace === 2000) { 
    $('.board-description').append('<a style="float:right" onclick="openEditForm(); return false;" title="'+ messages.link_tooltip +'" href="/wiki/Message_Wall_Greeting:' + des.title + '?action=edit"><img class="sprite edit-pencil" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D">' + messages.link_text + '</a>');
}
 
function openEditForm() {
    $.showCustomModal(messages.windowtitle, '<form class="WikiaForm" method=""><textarea id="pagetext" style="height: 175px; width: 100%; box-sizing:border-box; resize:none"></textarea><br /> ' + messages.summary + ': <input type="text" id="editsummary" /></form>', {
        id: "editForm",
        width: 650,
        buttons: [{
            id: "cancel",
            message: messages.cancel,
            handler: function () {
                $("#editForm").closeModal();
            }
        },
        {
            id: "submit",
            defaultButton: true,
            message: messages.save,
            handler: function () {
                SaveChanges();
            }
        }, ]
    });
    $.ajax({
        'dataType': 'html',
        'url': '/index.php?title=Message_Wall_Greeting:' + des.title + '&action=raw',
        beforeSend: function() {
              $("#editForm").prepend('<div class="wikiaThrobber"></div>');
        },
        success: function(data) {
            $("#editForm .wikiaThrobber").remove();
            $("#pagetext").val(data);
        },
        error: function(data) {
            $("#editForm .wikiaThrobber").remove();
        }
    });
}
 
function SaveChanges() {
    var pagetext = $('#pagetext').val(),
        summary = $('#editsummary').val();
    if(!summary) {
        var summary = messages.summary_default;
    }
    var url = des.server + '/api.php?action=edit&title=Message_Wall_Greeting:' + des.title + '&text=' + encodeURIComponent(pagetext) + '&summary=' + encodeURIComponent(summary) + '&token=' + encodeURIComponent(des.edittoken);
    $("#editForm").prepend('<div class="wikiaThrobber"></div>');
 
    $.post(url, function (r) {
         $("#editForm").closeModal();
         window.location = des.server + '/wiki/' + des.pagename;
    });
}
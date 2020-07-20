(function ($, mw, Advancedcomments) {
    if (
        wgCanonicalSpecialPageName !== "WikiActivity" ||
        $('#advanced-comments').length > 0 ||
        !/sysop|vstf|staff|helper|content-moderator|wiki-manager|content-team-member/.test(mw.config.get('wgUserGroups').join())
    ) {
        return;
    }
    var i18n = {
        be: {
            error: "Абмыла",
            otherreason: "Іншая прычына",
            preview: "Папярэдні прагляд",
            cancel: "Скасаванне",
            checkall: "Адзначыць усе",
            uncheckall: "Зняць усе",
            deleteall: "Выдаліць абранае",
            deletes: "Выдаліць",
            commenttext: ' (утрымвае : « $1 »)'
        },
        de: {
            error: "Fehler",
            otherreason: "Anderer Grund",
            preview: "Kommentarübersicht",
            cancel: "Abbrechen",
            checkall: "Alles auswählen",
            uncheckall: "Nichts auswählen",
            deleteall: "Ausgewähltes Löschen",
            deletes: "Löschen",
            commenttext: ' (Inhalt war : « $1 »)'
        },
        fr: {
            error: "Erreur",
            otherreason: "Autre motif",
            preview: "Visualisation des commentaires",
            cancel: "Annuler",
            checkall: "Tout séléctionner",
            uncheckall: "Tout déséléctionner",
            deleteall: "Supprimer les séléctionnés",
            deletes: "Supprimer",
            commenttext: ' (contient : « $1 »)'
        },
        en: {
            error: "Error",
            otherreason: "Other reason",
            preview: "Comments preview",
            cancel: "Cancel",
            checkall: "Check all",
            uncheckall: "Uncheck all",
            deleteall: "Delete selected",
            deletes: "Delete",
            commenttext: ' (contains : « $1 »)'
        },
        ru: {
            error: "Ошибка",
            otherreason: "Другая причина",
            preview: "Предварительный просмотр",
            cancel: "Отмена",
            checkall: "Отметить все",
            uncheckall: "Снять все",
            deleteall: "Удалить выбранное",
            deletes: "Удалить",
            commenttext: ' (содержит : « $1 »)'
        },
        uk: {
            error: "Помилка",
            otherreason: "Інша причина",
            preview: "Попередній перегляд",
            cancel: "Скасування",
            checkall: "Зазначити всі",
            uncheckall: "Зняти всі",
            deleteall: "Видалити обране",
            deletes: "Видалити",
            commenttext: ' (містить : « $1 »)'
        }
    };
    i18n = i18n[mw.config.get('wgUserLanguage')] || i18n[mw.config.get('wgContentLanguage')] || i18n.en;
    Advancedcomments = $.extend(Advancedcomments, {});
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:APICall/code.js'
    });
    Advancedcomments.defaultreason = Advancedcomments.defaultreason || i18n.noreason;
    $('#WikiaPageHeader').prepend('<button id="advanced-comments">Advanced comments</button>');
    $(document).on('click','#advanced-comments', function() {
function checkall() {
    $('#Commentsdelete input[type="checkbox"]').attr('checked', true);
}
function deleteall() {
    $('#Commentshow li').each(function(i) {
        if ($('#Commentsdelete input[type="checkbox"]').eq(i).attr('checked')) {
            var reason = $(this).find('tr[data-type="new-article-comment"] td:last').html();
            reason = i18n.commenttext.replace('$1', reason);
            apideletepage($('#Commentshow li').eq(i).find('a.title').attr('href').substring(6), $('.licence').eq(i).find('option:selected').val() + reason, function(){$('.deletecomments').eq(i).fadeOut(2000);$('.deletecomments').find('*').eq(i).fadeOut(2000);$('.licence').eq(i).fadeOut(2000);$('#Commentshow li').eq(i).find('*').css("text-decoration", "line-through");$('#Commentshow li').eq(i).find('*').attr("href","");}, function(message){alert(i18n.error + ': ' + message)});
        }
    });
}
function uncheckall() {
    $('#Commentsdelete input[type="checkbox"]').attr('checked', false);
}

function getdeletepagereason() {
    $.ajax({
        type: "GET",
        url: mw.config.get('wgScriptPath') + '/wiki/MediaWiki:Deletereason-dropdown?action=edit',
        success: function (data) {
            var datas = $(data).find('#wpTextbox1').html();
            licences = datas.split('\n');
            for (i=0;i<$('.licence').length;i++) {
                var tops = $('.licence').eq(i).css('top');
                $('.licence').eq(i).replaceWith('<select class="licence" style="top:' + tops + ';"></select>');
            }
            $('.licence').prepend('<option value="' + i18n.otherreason + '">' + i18n.otherreason + '</option>');
            for (i = 0; i < licences.length; i++) {
                if (licences[i].indexOf('** ') === 0) {
                    licences[i] = licences[i].replace("** ", "");
                    //Change
                    if (licences[i] == Advancedcomments.defaultreason) {
                        $('.licence').find('optgroup:last-child').append('<option selected value="' + licences[i] + '">' + licences[i] + '</option>');
                    } else {
                        $('.licence').find('optgroup:last-child').append('<option value="' + licences[i] + '">' + licences[i] + '</option>');
                    }
                } else {
                    licences[i] = licences[i].replace('* ', '');
                    $('.licence').append('<optgroup label="' + licences[i] + '"></optgroup');
                }
            }
        $('.licence').css('position','absolute');
        $('.licence').css('left','630px');
        },
        error: function (data) {
            $('.licence').css('position','absolute');
            $('.licence').css('left','630px');
            alert('Error : ' + data.error.info);
        }
    });
}

function Commentspreview(content) {
    var ajaxform = '\
  <form method="" name="" class="WikiaForm "> \
    <div id="Commentshow" style="float:left; width:480px; border:3px solid black; word-wrap: break-word;"/> \
    <div id="Commentsdelete" style="float:right; width:480px; border:3px solid black; word-wrap: break-word;"/> \
  </form>';
    $.showCustomModal(i18n.preview, ajaxform, {
        id: 'Commentspreview',
        width: 1000,
        buttons: [{
            message: i18n.cancel,
            id: "Cancel",
            handler: function () {
                $('#Commentspreview').closeModal();
            }
        }, {
            message: i18n.checkall,
            handler: checkall
        }, {
            message: i18n.uncheckall,
            handler: uncheckall
        }, {
            message: i18n.deleteall,
            defaultButton: true,
            handler: deleteall
        }]
    });
    $('#Commentshow').html(content);
    $('#Cancel').css('margin', '5px');
    $('#Commentsdelete').html("");
    $('#Commentshow li').each(function (index) {
        $('#Commentsdelete').html($('#Commentsdelete').html() + '<div class="deletecomments" style="position:absolute; top:' + $(this).position().top + 'px;"><input type="checkbox">' + i18n.deletes + '</input></div>');
        $('#Commentsdelete').html($('#Commentsdelete').html() + '<div class="licence"></div>');
        $('.licence').eq(index).css('top',$(this).position().top + 'px');
    });
    getdeletepagereason();
    $('#Commentsdelete').height($('#Commentshow li:last').position().top);
}
var comments = "";
$('#myhome-activityfeed li.activity-type-talk.activity-ns-1').each(function () {
    comments += '<li class="activity-type-talk activity-ns-1"' + $(this).html() + '</li>';
});
Commentspreview(comments);
});
window.Advancedcomments = Advancedcomments;
})(this.jQuery, this.mediaWiki, window.Advancedcomments);
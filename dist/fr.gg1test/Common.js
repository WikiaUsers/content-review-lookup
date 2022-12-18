/* COC Interwiki */
var languages = {
    en: "English",
    fr: "French",
    de: "Deutsch",
    es: "Español",
    ru: "Русский",
    pl: "Polski",
    it: "Italiano",
    pt: "Português",
    ar: "العربية",
    fa: "فارسی",
    fi: "Suomi",
    he: "עברית",
    hu: "Magyar",
    id: "Bahasa Indonesia",
    ja: "日本語",
    nl: "Nederlands",
    'pt-br': "Português do Brasil",
    ro: "Română",
    tr: "Türkçe",
    uk: "Українська",
    vi: "Tiếng Việt",
    zh: "中文"
};
$('#cocstartinterwikibutton').click(function () {
    $.showCustomModal("Clash of Clans Interwiki-links", '<h2>Hello ' + wgUserName + ', from the ' + wgUserLanguage + ' Clash of Clans Wiki !</h2><br><label for="pagetitle">Page to check interwiki links :</label><input type="text" id="pagetitle"/><div class="button" id="pagesubmit">Check interwiki links</div><br><div class="separate-div" style="clear:both;"><br /><hr><h4 style="font-style: italic; float:left;color:black;">Script created by <a href="http://dev.wikia.com/wiki/User:Gguigui1" target="_blank">Gguigui1</a></h4></div>', {
        id: "cocinterwiki",
        width: 650,
        buttons: [{
            id: "close-menu",
            defaultButton: true,
            message: "Close form",
            handler: function () {
                sendnewinterwiki();
                //$("#cocinterwiki").closeModal();
            }
        }]
    });
    mw.util.addCSS('#cocinterwiki .modalContent input[type="text"] { \
width:30%; border-radius:5px; border:2px black groove; padding:2px; margin:2px; font-family:Verdana; } .previouslanguage {display:inline;}');
});
var content = [];
var interwikipage = "Interwiki_links";
var contentline = -1;
$(document).on("click", "#pagesubmit", function () {
    if ($(this).attr('disabled')) return;
    if (!$('#pagetitle').val()) {
        alert('Enter a page name!');
        return;
    }
    $('#pagesubmit').attr('disabled', "disabled");
    url = wgServer + '/api.php?action=query&prop=revisions&titles=' + interwikipage +'&format=json&rvprop=content&rvlimit=1';
    $.getJSON(url, function (data) {
        if (data.error) {
            alert(data.error.info + '||Action cancelled');
            return;
        } else {
            for (var pageid in data.query.pages) {
                content = data.query.pages[pageid].revisions[0]['*'];
            }
        }
        console.log(content);
        var contentperline = content.split('\n');
        for (i = 0; i < contentperline.length; i++) {
            if (contentperline[i].indexOf($('#pagetitle').val()) > -1) {
                alert('Page found at ' + i + '!');
                contentline = i;
                interwikiform(contentperline[i]);
                return;
            }
        }
        $('#pagesubmit').removeAttr('disabled');
        alert('Page not found !');
    });
});

function interwikiform(links) {
    var alllinks = links.split('|');
    for (i = 0; i < alllinks.length; i++) {
        if (alllinks[i].split('%')[0] === "en") {
            $('.separate-div').before('<br><p class="previouslanguage">' + alllinks[i].split('%')[0] + '</p>: <input type="text" id="links-' + alllinks[i].split('%')[0] + '" disabled value="' + alllinks[i].split('%')[1] + '"></input>');
        } else {
            $('.separate-div').before('<br><p class="previouslanguage">' + alllinks[i].split('%')[0] + '</p>: <input type="text" id="links-' + alllinks[i].split('%')[0] + '" value="' + alllinks[i].split('%')[1] + '"></input>');
        }
    }
    $('.separate-div').before('<br><a id="addselectlink" title="Add a interwiki link" href="javascript:void(0)">Add language link</a>');
    $('#addselectlink').click(function () {
        addnewlanguage();
        return false;
    });
}

function addnewlanguage() {
    $('#addselectlink').before('<select class="language-select"/> : <input type="text" placeholder="Page name" class="linkpagename"></input><br>');
    for (var i in languages) {
        if (content.split('\n')[contentline].split('%')[0].indexOf(i) > -1) {
            $('.language-select:last').append('<option disabled value="' + i + '">' + i + " (" + languages[i] + ')</option>');
        } else {
            $('.language-select:last').append('<option value="' + i + '">' + i + " (" + languages[i] + ')</option>');
            for (k = 0; k < content.split('\n')[contentline].split('|').length; k++) {
                if (content.split('\n')[contentline].split('|')[k].split('%')[0].indexOf(i) > -1) {
                    $('.language-select:last option:last').prop('disabled', true);
                }
            }
        }
    }
    $('.language-select').each(function () {
        if ($(this) !== $('.language-select:last')) {
            $('.language-select:last option[value="' + $(this).val() + '"]').prop("disabled", true);
        }
    });
    $(".language-select:last option:not([disabled])").first().attr("selected", "selected");
}

function sendnewinterwiki() {
    $('.previouslanguage').each(function () {
        if (!$('#links-' + $(this).html()).val()) {
            alert('You have to fill all the inputs !');
            return;
        }
    });
    $('.linkpagename').each(function (i) {
        if (!$(this).val()) {
            alert('You have to fill all the inputs !');
            return;
        }
    });
    var contenttext = [];
    var text = '';
    for (index = 0; index < content.split('\n').length; index++) {
        var contentoftheline = content.split('\n')[index];
        alert('Characters');
        alert(contentoftheline);
        if (index === contentline) {
            $('.previouslanguage').each(function () {
                text += $(this).html() + '%' + $('#links-' + $(this).html()).val() + "|";
            });
            $('.language-select').each(function (i) {
                text += $(this).val() + '%' + $('.linkpagename:eq(' + i + ')').val() + "|";
            });
            text = text.substring(0, text.length - 1);
            contenttext.push(text);
        } else {
            contenttext.push(contentoftheline);
        }
    }
    new mw.Api().post({
        format: 'json',
        action: 'edit',
        title: interwikipage,
        token: mw.user.tokens.get('editToken'),
        text: contenttext.join('\n')
    })
        .done(function (d) {
        if (!d.error) {
            alert('Interwiki posted successfully !');
        } else {
            alert('Interwiki post made a error !\n' + d.error.code);
        }
    })
        .fail(function () {
        alert('Interwiki posted failed !');
    });
}
/*
----
*/
/* Enigmes */
$('#javaalert').remove();
;(function($, mw) {
$('#create-enigme').click(function() {
var formHTML =
    '<form method="" name="" class="WikiaForm">' +
    '  <fieldset>' +
    '      <p style="padding:5px; border:1px solid grey;">' +
    'Pour ajouter une énigme, merci de remplir les champs ci-dessous. Les champs marqués d\'une astérisque (<span style="color:red">*</span>) sont obligatoires. Si les énigmes sont prises d\'un site externe, merci d\'en signaler la source dans la zone de saisie prévu à cet effet.</p><br />' +
    '         <span style="float:left;">' +
    '     <p><b><span style="color:red">*</span>Nom de l\'énigme :</b></p><input type="text" style="align:center;height:20px; width:300px" id="Name" placeholder="Ex : Les 100 copains"/>' +
    '     <p><b><span style="color:red">*</span>Description de l\'énigme :</b></p> <textarea style="width: 418px; height: 240px;" id="Corps"/>' +
    '     <p><b><span style="color:red">*</span>Difficulté de l\'énigme :</b></p><select name="Difficulty" id="Difficulty" accesskey="c"><option value="Easy">Facile</option><option value="Medium">Moyenne</option><option value="Hard">Difficile</option><option disabled value="Extreme">Extrême</option></select>' +
    '         </span>' +
    '         <span style="float:right;">' +
    '     <p><b>Indices :</b></p> <textarea style="width: 418px; height: 121px;" placeholder="Laisser vide si inexistant" id="Indices"/>' +
    '     <p><b>Solution :</b></p> <textarea style="width: 418px; height: 121px;" placeholder="Laisser vide si inexistante" id="Soluce"/>' +
    '     <p><b>Source de l\'énigme (si prise d\'un site externe) :</b></p> <input type="text" style="align:center;height:20px; width:300px" id="Source"/>' +
    '         </span>' +
    '     <div style="clear: both; font-size:75%; font-style: italic;">Toutes les contributions à Wiki Énigmes sont considérées comme publiées sous les termes de la CC-BY-SA (voir <a href="/wiki/w:c:fr:Licence">Wikia : Licence</a> pour plus de détails). Si vous ne désirez pas que vos écrits soient modifiés et distribués à volonté, merci de ne pas les soumettre ici. Vous nous promettez aussi que vous avez écrit ceci vous-même, ou que vous l’avez copié d’une source provenant du domaine public, ou d’une ressource libre. N’UTILISEZ PAS DE TRAVAUX SOUS DROIT D’AUTEUR SANS AUTORISATION EXPRESSE !</div>' +
    '  </fieldset>' +
    '</form>';
$.showCustomModal('Ajout d\'une énigme', formHTML, {
    id: 'enigme',
    width: 900,
    buttons:
    [{
        id: 'startButton',
        message: 'Envoyer',
        defaultButton: true,
        handler: function () {
          var indices = $('#Indices').val() || "",
          solution = $('#Soluce').val() || "";
          if ($.trim($('#Name').val()).length > 0 && $.trim($('#Corps').val()).length > 0) {
          if ($.trim($('#Source').val()).length > 0) {
          send($('#Name').val(),'{{Enigme|Enigme = ' + $('#Corps').val() + '|Indice = ' + indices + '|Solution = ' + solution + '}}<br>Source de l\'énigme : <a href="' + $('#Source').val() + '">' +  $('#Source').val() + '</a>[[Catégorie:' + $('#Difficulty option:selected').html() + ']]');
          } else {
          send($('#Name').val(),'{{Enigme|Enigme = ' + $('#Corps').val() + '|Indice = ' + indices + '|Solution = ' + solution + '}}[[Catégorie:' + $('#Difficulty option:selected').html() + ']]');
          }
          } else {
          alert('Merci de remplir les champs obligatoires !');
          return false;
          }
        }
    },
    {
        message: 'Annuler',
        handler: function() {
            $('#enigme').closeModal();
        }
    }]
  });
  $('#enigme textarea').css('resize', 'none');
});
function send(page, content) {
$.get(mw.util.wikiScript('api'), {
    action: 'query',
    titles: page,
    format: 'json'
}, function (data) {
    //    console.log(data.query.pages);
    if (!data.query.pages['-1']) {
        alert('Une énigme avec ce nom existe déjà, merci d\'en choisir un autre.');
        return false;
    } else {
        //$('#startButton').attr('disabled', 'disabled').addClass('ui-state-disabled');

        $.post(mw.util.wikiScript('api'), {
            format: 'json',
            action: 'edit',
            summary: 'Nouvelle énigme',
            title: page,
            text: content,
            token: mw.user.tokens.get('editToken')
        }, function (data) {
            alert('Merci ! L\'énigme a été postée avec succès.');
            //$('#' + type).closeModal();
            window.location.href = wgServer + '/wiki/' + encodeURIComponent(page);
        });
    }
});
}
}) (this.jQuery, this.mediaWiki);
importScriptPage('MediaWiki:Common.js/NewTroop.js');
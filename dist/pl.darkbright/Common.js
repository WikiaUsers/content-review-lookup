/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */

// AjaxRC
ajaxPages = [
	"Specjalna:Aktywność_na_wiki",
	"Specjalna:Ostatnie_zmiany",
	"Specjalna:Rejestr",
	"Specjalna:Nowe_pliki",
	"Specjalna:Nowe_strony"
];
AjaxRCRefreshText = 'Auto-odświeżanie';
AjaxRCRefreshHoverText = 'Automatycznie aktualizuje tę stronę';
 
// IMPORT SKRYPTÓW
// W ostatnim imporcie nie umieszczamy przecinka.
importArticles({
    type: "script",
    articles: [
	"u:pl.tes:MediaWiki:AjaxRC.js" 			// AjaxRC
    ]
});

// PowerPageMaker - Test
importScriptPage('PowerPageMaker/code.js', 'dev'); 
// KRESKAKRESKAKRESKAKRESKAKRESKAKRESKA
// Last edited
/**
 * lastEdited.js
 * 
 * Adds last edited details to the page
 * @author: [[w:User:Fubuki風吹]]
 */
 
$(function() {
    var lastEdited = $.extend({
//      avatar: true,
        size: true,
        diff: true,
        comment: true,
        time: false
    }, window.lastEdited);
    if (!$.getUrlVar('diff') && !$.getUrlVar('oldid') &&
        $.getUrlVar('action') !== 'history' &&
        mw.config.get('wgNamespaceNumber') < 112 &&
        mw.config.get('wgNamespaceNumber') !== -1 &&
        !$('.lastEdited').length
    ) {
        $.get(mw.util.wikiScript('api'), {
            action: 'query',
            titles: mw.config.get('wgPageName'),
            prop: 'revisions',
            rvprop: 'timestamp|user|size|parsedcomment',
            rvdiffto: 'prev',
            format: 'json'
        }, function(data) {
            for (var i in data.query.pages) break;
            var rv = data.query.pages[i].revisions[0],
                sel,
                action = 'append';
//          $.get('/wiki/Special:Contributions/' + encodeURIComponent(rv.user), function(data) {
                var html = '<div class="lastEdited">Ostatniej edycji dokonał(a) ';
//              if (lastEdited.avatar) html += '<img class="lastEdited-avatar" width="15" height"15" ' + data.slice(data.search('class="masthead-avatar"') + 32, data.search('class="masthead-avatar"') + 154) + '> ';
                html += '<a href="/wiki/Special:Contributions/' + encodeURIComponent(rv.user) + '">' + rv.user + '</a> w(e) ' + new Date(rv.timestamp).toUTCString().slice(0, 16);
                if (lastEdited.time) html += ', ' + new Date(rv.timestamp).toUTCString().slice(17, 25) + ' (UTC)';
      			    if (lastEdited.diff && rv.diff.from) html += ' <a style="cursor:pointer" class="lastEdited-diff">(różnica)</a>';
                if (lastEdited.comment && rv.parsedcomment) 
                    if (rv.parsedcomment.indexOf('Created page with') > -1) {
                        html += '<br>Notatka edycji: Created page.';
                    } else {
                        html += '<br>Notatka edycji: ' + rv.parsedcomment;
                    }
                if (lastEdited.size) html += '<br>Obecny rozmiar: ' + rv.size + ' bajtów';
                html += '</div>';
                switch (mw.config.get('wgNamespaceNumber')) {
                    case 2:
                    case 3:
                        sel = '.UserProfileActionButton';
                        action = 'after';
                        mw.util.addCSS('.lastEdited {padding-bottom: 5px;border-bottom: 1px solid #ccc;}');
                        break;
                    default:
                        sel = '#WikiaPageHeader';
                }
                if (action == 'after') $(sel).after(html);
                else $(sel).append(html);
                mw.loader.using(['mediawiki.action.history.diff'], function() {
                    $('.lastEdited-diff').on('click', function() {
                        $.showCustomModal('Changes: ' + mw.config.get('wgPageName').replace(/_/g, ' '), rv.diff['*'], {
                            id: 'lastEdited-diff',
                            width: 650,
                            buttons: [{
                                message: 'Link',
                                defaultButton: true,
                                handler: function() {
                                    $('#lastEdited-diff').closeModal();
                                    window.open('/?diff=' + rv.diff.to, '_blank');
                                }
                            }, {
                                message: 'Undo',
                                handler: function() {
                                    $('#lastEdited-diff').closeModal();
                                    window.open('/wiki/' + mw.config.get('wgPageName') + '?action=edit&undoafter=' + rv.diff.from + '&undo=' + rv.diff.to, '_blank');
                                }
                            }, {
                                message: 'Cancel',
                                handler: function() {
                                    $('#lastEdited-diff').closeModal();
                                }
                            }]
                        });
                    });
                });
            });
//     });
    }
});
//Username
$(document).ready(function(){
  if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace === null || wgUserName === null) {return;}
  $(".insertusername").each(function(){
    $(this).html(wgUserName);
  });
});
//Poebrane z pl.ztmwaw
//Dodatkowe w źródłowym
if (typeof (mwCustomEditButtons) != 'undefined') {
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/e/ea/Button_align_left.png",
		"speedTip": "Wyrównaj tekst do lewej",
		"tagOpen": "<left>",
		"tagClose": "</left>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/a5/Button_align_right.png",
		"speedTip": "Wyrównaj tekst do prawej",
		"tagOpen": "<right>",
		"tagClose": "</right>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/5f/Button_center.png",
		"speedTip": "Wyśrodkuj tekst",
		"tagOpen": "<center>",
		"tagClose": "</center>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/2/29/Button_justify.png",
		"speedTip": "Wyjustuj tekst",
		"tagOpen": "<p align=justify>",
		"tagClose": "</p>",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/8/89/Button_bigger.png",
		"speedTip": "Powiększ czcionkę",
		"tagOpen": "<big>",
		"tagClose": "</big>",
		"sampleText": "Powiększony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/0/0d/Button_smaller.png",
		"speedTip": "Pomniejsz czcionkę",
		"tagOpen": "<small>",
		"tagClose": "</small>",
		"sampleText": "Pomniejszony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/30/Btn_toolbar_rayer.png",
		"speedTip": "Przekreśl tekst",
		"tagOpen": "<strike>",
		"tagClose": "</" + "strike>",
		"sampleText": "Skreślony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/f/fd/Button_underline.png",
		"speedTip": "Podkreśl tekst",
		"tagOpen": "<u>",
		"tagClose": "</" + "u>",
		"sampleText": "Podkreślony tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/6a/Button_sup_letter.png",
		"speedTip": "Wstaw indeks górny",
		"tagOpen": "<sup>",
		"tagClose": "</" + "sup>",
		"sampleText": "Indeks górny"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/a/aa/Button_sub_letter.png",
		"speedTip": "Wstaw indeks dolny",
		"tagOpen": "<sub>",
		"tagClose": "</" + "sub>",
		"sampleText": "Indeks dolny"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/3/3b/Comment-button-bg.png",
		"speedTip": "Wstaw komentarz widoczny tylko podczas edycji",
		"tagOpen": "<!--",
		"tagClose": "-->",
		"sampleText": "Treść komentarza"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/8/83/Bot%C3%B3n_C%C3%B3digofuente.png",
		"speedTip": "Dodaj kod",
		"tagOpen": "<code><nowiki>",
		"tagClose": "</" + "nowiki></code>",
		"sampleText": "Zakodowany tekst"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/49/Bot%C3%B3n_plantilla.png",
		"speedTip": "Wstaw szablon",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "Nazwa szablonu"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/7/7a/Bot%C3%B3n_tablas.png",
		"speedTip": "Wstaw szaro-zieloną tabelę",
		"tagOpen": '{| {' + '{Tabelka|alineacion=col1izq col2cen col3der|}}\n|-\n',
		"tagClose": "\n|}",
		"sampleText": "!| Nagłówek 1\n!| Nagłówek 2\n!| Nagłówek 3\n|-\n|| komórka 1, kolumna 1\n|| komórka 1, kolumna 2\n|| komórka 1, kolumna 3\n|-\n|| komórka 2, kolumna 1\n|| komórka 2, kolumna 2\n|| komórka 2, kolumna 3"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/inciclopedia/images/4/43/Enlace_a_usuario.png",
		"speedTip": "Zalinkuj użytkownika",
		"tagOpen": "[[Użytkownik:",
		"tagClose": "|Nick_użytkownika]]",
		"sampleText": "Nick_użytkownika"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/6/62/Button_desambig.png",
		"speedTip": "Dodaj szablon ujednoznaczniający",
		"tagOpen": "{{Strona ujednoznaczniająca",
		"tagClose": "}}",
		"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/5/50/Button_tidyman.png",
		"speedTip": "Zgłoś usunięcie tego artykułu",
		"tagOpen": "{{EK",
		"tagClose": "}}",
		"sampleText": ""
	};
 
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "http://upload.wikimedia.org/wikipedia/commons/9/9e/Btn_toolbar_gallery.png",
		"speedTip": "Wstaw galerię zdjęć",
		"tagOpen": "\n<gallery spacing=small columns=3 position=center widths=206 orientation=landscape captionalign=center>\n",
		"tagClose": "\n</gallery>",
		"sampleText": "Plik:Przykład.jpg|Podpis1\nPlik:Przykład.jpg|Podpis2\nPlik:Przykład.jpg|Podpis3\n<!-- Możesz zmienić sposób przycinania grafik zmieniając orientation=landscape na orientation=square, orientation=portrait lub na orientation=none. -->"
	};
 
 
        mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/dark-brightness/images/b/b3/Info.png/revision/latest?cb=20150406134253&path-prefix=pl",
		"speedTip": "Wstaw infobox",
		"tagOpen": "{{Infobox",
		"tagClose": "}}",
		"sampleText": "|Tytuł = tytuł infoboxu|Obraz = obrazek|szerokość obrazka = 0px|podpis obrazka = podpis|Tytuł1 = tytuł jeden|Zawartość1 = zawartość1|Tytuł2 = tytuł dwa|Zawartość2 = zawartość2|Tytuł3 = tytuł trzy|Zawartość3 = zawartość3|Tytuł4 = tytuł cztery|Zawartość4 = zawartość4|Tytuł5 = tytuł pięć|Zawartość5 = zawartość5|i tak aż do 10"
	};
 
 
}
//Purge
PurgeButtonText = 'Odśwież';
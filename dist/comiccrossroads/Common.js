/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: "script",
    articles: [
		'u:dev:MediaWiki:AjaxBatchDelete.js',
        'w:c:dev:Countdown/code.js',
        'w:c:dev:EditcountTag/code.js',
        'w:c:dev:WallGreetingButton/code.js',
        'w:c:dev:AutoEditDropdown/code.js',
        'w:c:dev:SearchSuggest/code.js',
        'w:c:dev:EditIntroButton/code.js',
        'w:c:dev:User Rights Reasons Dropdown/code.js',
        'w:c:dev:CategoryRenameAuto-update/code.js',
        'w:c:dev:DupImageList/code.js'
    ]
});

/* UserTags */
window.UserTagsJS = {
	modules: {},
	tags: {
                designer: { u:'DESIGNER', m:'DESIGNER', f:'DESIGNER' },
        }
};
UserTagsJS.modules.autoconfirmed = true;
UserTagsJS.modules.mwGroups = ['bureaucrat', 'sysop', 'bannedfromchat', 'rollback', 'chatmoderator', 'bot', 'blocked'];
UserTagsJS.modules.custom = {
	'FrenchTouch': ['designer'],
};


/* Facebook */

function fBox() {
	$('#fbox').append('<iframe marginheight="0" marginwidth="0" src="http://www.facebook.com/connect/connect.php?id=305382936313761&amp;connections=10&amp;stream=0" align="top" frameborder="0" width="280" height="210" scrolling="no" />');
}
$(fBox);

/* 
////////////////////////////////////////////////////////////////
// THE BELOW CODE HELPS MAKE THE NAVIGATION TEMPLATE COLLAPSABLE
////////////////////////////////////////////////////////////////
*/
 
 // ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[Wikipedia:NavFrame]].
  *  Maintainers: [[User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "Hide";
 var expandCaption = "Show";
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 addOnloadHook( createCollapseButtons );
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow;
 
     // if hidden now
     } else if (NavToggle.firstChild.data == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild != null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide;
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
 
             indexNavigationBar++;
             var NavToggle = document.createElement("a");
             NavToggle.className = 'NavToggle';
             NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
             NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
 
             var NavToggleText = document.createTextNode(NavigationBarHide);
             NavToggle.appendChild(NavToggleText);
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked)
             for(
               var j=0; 
               j < NavFrame.childNodes.length; 
               j++
             ) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(
                 var i=1; 
                 i<=indexNavigationBar; 
                 i++
         ) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );

/* 
////////////////////////////////////////////////////////////////
// NAVIGATION TEMPLATE COLLAPSE CODE COMPLETE
////////////////////////////////////////////////////////////////
*/
    // Support for Monobook
    if (mw.config.get('skin') === 'monobook') {
        mw.util.addPortletLink('p-tb', '#', 'Batch Delete', 't-bd');
    } else {
        $('#my-tools-menu').prepend('<li class="custom"><a style="cursor:pointer" id="t-bd">' + i18n.toolsTitle + '</a></li>');
    }

    $('#t-bd').click(function() {
        $.showCustomModal(i18n.modalTitle, formHtml, {
            id: 'form-mass-delete',
            width: 500,
            buttons: [{
                message: i18n.close,
                handler: function() {
                    $('#form-mass-delete').closeModal();
                }
            }, {
                message: i18n.addCategoryContents,
                defaultButton: true,
                handler: addCategoryContents
            }, {
                id: 'startButton',
                message: i18n.initiate,
                defaultButton: true,
                handler: init
            }]
        });
    });

    function init() {
        var txt = document.getElementById('text-mass-delete'),
            deleteReason = document.getElementById('delete-reason').value,
            pages = txt.value.split('\n'),
            currentPage = pages[0];
        if (!deleteReason) {
            alert(i18n.stateReason);
            return;
        }
        document.getElementById('startButton').setAttribute('disabled', 'disabled');
        if (!currentPage) {
            document.getElementById('startButton').removeAttribute('disabled');
            $.showCustomModal(i18n.endTitle, i18n.endMsg, {
                id: 'mass-delete-complete',
                width: 200,
                buttons: [{
                    message: i18n.close,
                    defaultButton: true,
                    handler: function() {
                        $('#mass-delete-complete').closeModal();
                    }
                }]
            });
        } else {
            process(currentPage, deleteReason);
        }
        pages = pages.slice(1,pages.length);
        txt.value = pages.join('\n');
    }

    function addCategoryContents() {
        var category = prompt(i18n.enterCategory + ':');
        api.get({
            action: 'query',
            list: 'categorymembers',
            cmtitle: 'Category:' + category,
            cmlimit: 5000
        }).done(function(d) {
            if (!d.error) {
                var data = d.query;
	            for (var i in data.categorymembers) {
                    $('#text-mass-delete').append(data.categorymembers[i].title + '\n');
                }
            } else {
                outputError('GetContents', category, d.error.code);
            }
        }).fail(function() {
            outputError('GetContents', category, i18n.ajaxError);
        });
    }

    function outputError(error, param1, param2) {
        $('#text-error-output').append(formatI18n('error' + error, param1, param2) + '<br />');
    }

    function formatI18n(message, param1, param2) {
        return i18n[message].replace('$1', param1).replace('$2', param2);
    }

    function process(page,reason) {
        api.post({
            action: 'delete',
            watchlist: 'nochange',
            title: page,
            reason: reason,
            token: token,
            bot: true
        }).done(function(d) {
            if (!d.error) {
                console.log(formatI18n('deleteSuccess', page));
                if (document.getElementById('protect-check').checked) {
                    api.post({
                        action: 'protect',
                        expiry: 'infinite',
                        protections: 'create=sysop',
                        watchlist: 'nochange',
                        title: page,
                        reason: reason,
                        token: token
                    }).done(function(d) {
                        if (!d.error) {
                            console.log(formatI18n('protectSuccess', page));
                        } else {
                            console.log(formatI18n('errorProtect', page, d.error.code));
                            outputError('Protect', page, d.error.code);
                        }
                    }).fail(function() {
                        console.log(formatI18n('errorProtect', page, i18n.ajaxError));
                        outputError('Protect', page, i18n.ajaxError);
                    });
                }
            } else {
                console.log(formatI18n('errorDelete', page, d.error.code));
                outputError('Delete', page, d.error.code);
            }
        }).fail(function() {
            console.log(formatI18n('errorDelete', page, i18n.ajaxError));
            outputError('Delete', page, i18n.ajaxError);
        });
        setTimeout(init, delay);
    }
});

// <syntaxhighlight lang="javascript">
/**
 * Quick Delete
 * Deletes all the pages in a specific category
 *
 * @author: [[w:User:Fubuki風吹]]
 */
 
(function ($, mw) {
    'use strict';
    var config = {
        skin: mw.config.get( 'skin' ),
        server: mw.config.get( 'wgServer' ),
        namespace: mw.config.get( 'wgCanonicalNamespace' ),
        title: mw.config.get( 'wgTitle' ),
        edittoken: mw.user.tokens.values.editToken,
        usergroups: mw.config.get( 'wgUserGroups' ),
        category: window.category
    };
    var translations = {
        // Keep the list in alphabetical order
        // Reminder: use backslash to escape quotes within strings
        // English
        en: {
            buttonTitle: 'Delete all pages in this category',
            buttonText: 'Delete All',
            reasonHead: 'Reason for deletion',
            reasonBody: 'All pages including files in this category will be deleted with the reason being:',
            reasonAlert: 'Make sure to check if all the pages and files need to be deleted!',
            msgDel: 'Delete',
            msgCancel: 'Cancel',
            msgRf: 'Refresh',
            doneHead: 'Deleted',
            doneBody: 'All pages and files in this category have been deleted.',
            emptyHead: 'No items found',
            emptyBody: 'No pages or files found in this category.'
        },
        // Belarusian
        be: {
            buttonTitle: 'Выдаліць усе старонкі з гэтай катэгорыі',
            buttonText: 'Выдаліць усе',
            reasonHead: 'Прычына выдалення',
            reasonBody: 'Усе старонкі разам з файламі з дадзенай катэгорыі будзе выдаленыя па наступнай прычыне:',
            reasonAlert: 'Пераканайцеся, што ўсе старонкі і файлы павінны быць выдаленыя!',
            msgDel: 'Выдаліць',
            msgCancel: 'Адмена',
            msgRf: 'Абнавіць',
            doneHead: 'Выдаленае',
            doneBody: 'Усе старонкі і файлы з гэтай катэгорыі былі выдаленыя.',
            emptyHead: 'Нічога не знойдзена',
            emptyBody: 'У гэтай катэгорыі няма старонак або файлаў.'
        },
        // Catalan
        ca: {
            buttonTitle: 'Esborrar totes les pàgines en aquesta categoria',
            buttonText: 'Esborrar-ho tot',
            reasonHead: 'Motiu per a l’esborrat',
            reasonBody: 'Totes les pàgines, incloent fitxers en aquesta categoria seran esborrats amb el motiu de:',
            reasonAlert: 'Assegura’t de verificar si totes les pàgines i fitxers necessiten ser esborrats!',
            msgDel: 'Esborrar',
            msgCancel: 'Canceŀlar',
            msgRf: 'Actualitzar',
            doneHead: 'Esborrat',
            doneBody: 'Totes les pàgines i fitxers en aquesta categoria seran esborrats.',
            emptyHead: 'Cap element ha estat trobat',
            emptyBody: 'No existeixen pàgines o fitxers trobats en aquesta categoria.'
        },
        // Spanish
        es: {
            buttonTitle: 'Borrar todas las páginas en esta categoría',
            buttonText: 'Borrar Todo',
            reasonHead: 'Razón de borrado',
            reasonBody: 'Todas las páginas incluyendo archivos en esta categoría van a ser borradas con la razón dada:',
            reasonAlert: '¡Asegúrate de revisar si todas las páginas y archivos necesitan ser borrados!',
            msgDel: 'Borrar',
            msgCancel: 'Cancelar',
            msgRf: 'Recargar',
            doneHead: 'Borrado',
            doneBody: 'Todas las páginas y archivos en esta categoría han sido borrados.',
            emptyHead: 'No se encontraron elementos',
            emptyBody: 'No hay páginas o archivos en esta categoría.'
        },
        // Finnish
        fi: {
            buttonTitle: 'Poista kaikki tässä luokassa olevat sivut',
            buttonText: 'Poista kaikki',
            reasonHead: 'Poiston syy',
            reasonBody: 'Kaikki tämän luokan sivut tiedostot mukaan lukien poistetaan seuraavasta syystä:',
            reasonAlert: 'Varmistathan, että kaikki sivut ja tiedostot on poistettava!',
            msgDel: 'Poista',
            msgCancel: 'Peruuta',
            msgRf: 'Päivitä',
            doneHead: 'Poisto suoritettu',
            doneBody: 'Kaikki tässä luokassa olleet sivut on postettu.',
            emptyHead: 'Ei nimikkeitä',
            emptyBody: 'Tästä luokasta ei löytynyt yhtään sivua tai tiedostoa.'
        },
        // French
        fr: {
            buttonTitle: 'Supprimer tout les pages dans cette catégorie',
            buttonText: 'Supprimer tout',
            reasonHead: 'Raison de la suppression',
            reasonBody: 'Toutes les pages et les fichiers dans cette catégorie vont être supprimés avec cette raison:',
            reasonAlert: 'Soyez sûr que toutes les pages et fichiers ont besoin d\'être supprimés!',
            msgDel: 'Supprimer',
            msgCancel: 'Annuler',
            msgRf: 'Actualiser',
            doneHead: 'Supprimé(s)',
            doneBody: 'Toutes les pages et fichiers de cette catégorie ont été supprimés',
            emptyHead: 'Aucune page ou fichier trouvé',
            emptyBody: 'Aucune page ou fichier trouvé dans cette catégorie.'
        },
        // Galician
        gl: {
            buttonTitle: 'Excluír todas as páxinas nesta categoría',
            buttonText: 'Excluír todo',
            reasonHead: 'Motivo para exclusión',
            reasonBody: 'Todas as páxinas, incluíndo ficheiros nesta categoría serán excluídos polo motivo de:',
            reasonAlert: 'Asegúrache de verificar se todas as páxinas e ficheiros precisan ser excluídos!',
            msgDel: 'Excluír',
            msgCancel: 'Cancelar',
            msgRf: 'Actualizar',
            doneHead: 'Excluído',
            doneBody: 'Todas as páxinas e ficheiros nesta categoría foron excluídos.',
            emptyHead: 'Ningún elemento foi encontrado',
            emptyBody: 'Non existen páxinas ou ficheiros encontrados nesta categoría.'
        },
        // Italian
        it: {
            buttonTitle: 'Cancella tutte le pagine in questa categoria',
            buttonText: 'Cancella Tutto',
            reasonHead: 'Ragione per l\'eliminazione',
            reasonBody: 'Tutte le pagine in questa categoria verranno cancellate per la seguente ragione:',
            reasonAlert: 'Controlla se tutte le pagine e le immagini vanno cancellate!',
            msgDel: 'Cancella',
            msgCancel: 'Annulla',
            msgRf: 'Ricarica',
            doneHead: 'Cancellato',
            doneBody: 'Tutte le pagine in questa categoria sono state cancellate.',
            emptyHead: 'Non sono stati trovati elementi',
            emptyBody: 'Non sono state trovate pagine o immagini in questa categoria.'
        },
        // Japanese
        ja: {
            buttonTitle: 'このカテゴリの全ページを削除する',
            buttonText: '全て削除',
            reasonHead: '削除理由',
            reasonBody: 'このカテゴリの、ファイルを含む全ページは、次の理由で削除されます:',
            reasonAlert: '全ページおよびファイルを削除していいか、確認してください！',
            msgDel: '削除',
            msgCancel: 'キャンセル',
            msgRf: '更新',
            doneHead: '削除しました',
            doneBody: 'このカテゴリの全ページおよびファイルを削除しました。',
            emptyHead: '該当なし',
            emptyBody: 'このカテゴリには、ページおよびファイルはありません。'
        },
        // Korean
        ko: {
            buttonTitle: '이 분류에 있는 모든 문서 삭제',
            buttonText: '모두 삭제',
            reasonHead: '삭제할 이유',
            reasonBody: '이 분류에 있는 모든 문서와 파일들은 삭제되며 삭제되는 이유는 다음과 같습니다:',
            reasonAlert: '모든 문서와 파일들이 지워져야 하는지 확인하십시오!',
            msgDel: '삭제',
            msgCancel: '취소',
            msgRf: '새로고침',
            doneHead: '삭제됨',
            doneBody: '이 분류에 있는 모든 문서와 파일들이 삭제되었습니다.',
            emptyHead: '항목을 찾을 수 없음',
            emptyBody: '이 분류에 있는 문서나 파일을 찾을 수 없습니다.'
        },
        // Malay
        ms: {
            buttonTitle: 'Padam semua halaman dalam kategori ini',
            buttonText: 'Padam Semua',
            reasonHead: 'Sebab memadam',
            reasonBody: 'Semua halaman termasuk fail-fail dalam kategori ini akan dipadamkan kerana:',
            reasonAlert: 'Sila pastikan semua halaman dan fail-fail sudah diperiksa dan memang ingin dipadam!',
            msgDel: 'Padam',
            msgCancel: 'Batal',
            msgRf: 'Muat semula',
            doneHead: 'Dipadamkan',
            doneBody: 'Semua halaman dan fail-fail dalam kategori ini telahpun dipadamkan.',
            emptyHead: 'Tiada kandungan',
            emptyBody: 'Tiada halaman atau fail terjumpa dalam kategori ini.'
        },
        // Dutch
        nl: {
            buttonTitle: 'Verwijder alle pagina\'s in deze categorie',
            buttonText: 'Verwijder alles',
            reasonHead: 'Reden om te verwijderen',
            reasonBody: 'Alle pagina\'s in deze categorie, inclusief bestanden, zullen verwijderd worden, met als reden:',
            reasonAlert: 'Let op of alle pagina\'s en bestanden wel zeker moeten verwijderd worden!',
            msgDel: 'Verwijderen',
            msgCancel: 'Annuleren',
            msgRf: 'Hernieuwen',
            doneHead: 'Verwijderd',
            doneBody: 'Alle pagina\'s en bestanden in deze categorie zijn verwijderd.',
            emptyHead: 'Geen items gevonden',
            emptyBody: 'Geen pagina\'s of bestanden gevonden in deze categorie.'
        },
        // Polish
        pl: {
            buttonTitle: 'Usuń wszystkie strony z tej kategorii',
            buttonText: 'Usuń wszystko',
            reasonHead: 'Powód usunięcia',
            reasonBody: 'Wszystkie strony wraz z plikami z tej kategorii zostaną usunięte z następującego powodu:',
            reasonAlert: 'Upewnij się, czy wszystkie strony i pliki mają zostać usunięte!',
            msgDel: 'Usuń',
            msgCancel: 'Anuluj',
            msgRf: 'Odśwież',
            doneHead: 'Usunięto',
            doneBody: 'Wszystkie strony i pliki z tej kategorii zostały usunięte.',
            emptyHead: 'Nic nie znaleziono',
            emptyBody: 'W tej kategorii nie ma stron lub plików.'
        },
        // Portuguese
        pt: {
            buttonTitle: 'Excluir todas as páginas nesta categoria',
            buttonText: 'Excluir tudo',
            reasonHead: 'Motivo para exclusão',
            reasonBody: 'Todas as páginas, incluindo ficheiros nesta categoria serão excluídos pelo motivo de:',
            reasonAlert: 'Assegura-te de verificar se todas as páginas e ficheiros precisam ser excluídos!',
            msgDel: 'Excluir',
            msgCancel: 'Cancelar',
            msgRf: 'Actualizar',
            doneHead: 'Excluído',
            doneBody: 'Todas as páginas e ficheiros nesta categoria foram excluídos.',
            emptyHead: 'Nenhum item foi encontrado',
            emptyBody: 'Não existem páginas ou ficheiros encontrados nesta categoria.'
        },
        // Portuguese (Brazilian)
        'pt-br': {
            buttonTitle: 'Excluir todas as páginas nesta categoria',
            buttonText: 'Expluir tudo',
            reasonHead: 'Motivo para exclusão',
            reasonBody: 'Todas as páginas, incluindo arquivos nesta categoria serão excluídos pelo motivo de:',
            reasonAlert: 'Certifique-se de verificar se todas as páginas e arquivos precisam ser excluídos!',
            msgDel: 'Excluir',
            msgCancel: 'Apagar',
            msgRf: 'Atualizar',
            doneHead: 'Excluído',
            doneBody: 'Todas as páginas e arquivos nesta categoria foram excluídos.',
            emptyHead: 'Nenhum item foi encontrado',
            emptyBody: 'Não existem páginas ou arquivos encontrados nesta categoria.'
        },
        // Russian
        ru: {
            buttonTitle: 'Удалить все страницы из этой категории',
            buttonText: 'Удалить все',
            reasonHead: 'Причина удаления',
            reasonBody: 'Все страницы вместе с файлами из данной категории будут удалены по следующей причине:',
            reasonAlert: 'Убедитесь, что все страницы и файлы должны быть удалены!',
            msgDel: 'Удалить',
            msgCancel: 'Отмена',
            msgRf: 'Обновить',
            doneHead: 'Удалено',
            doneBody: 'Все страницы и файлы из этой категории были удалены.',
            emptyHead: 'Ничего не найдено',
            emptyBody: 'В этой категории нет страниц или файлов.'
        },
        // Swedish
        sv: {
            buttonTitle: 'Radera alla sidor i denna kategori',
            buttonText: 'Radera alla',
            reasonHead: 'Orsak till radering',
            reasonBody: 'Alla sidor inklusive filer raderas av följande orsak:',
            reasonAlert: 'Kontrollera att alla sidor och filer verkligen behöver raderas!',
            msgDel: 'Radera',
            msgCancel: 'Avbryt',
            msgRf: 'Uppdatera',
            doneHead: 'Raderingen utförd',
            doneBody: 'Alla sidor och filer i denna kategori har raderats.',
            emptyHead: 'Inga artiklar hittades',
            emptyBody: 'Inga sidor eller filer i denna kategori hittades.'
        },
        // Ukrainian
            uk: {
                buttonTitle: 'Видалити всі сторінки з цієї категорії',
                buttonText: 'Видалити всі',
                reasonHead: 'Причина видалення',
                reasonBody: 'Всі сторінки разом з файлами з даної категорії будуть видалені з наступної причини:',
                reasonAlert: 'Переконайтеся, що всі сторінки та файли повинні бути видалені!',
                msgDel: 'Видалити',
                msgCancel: 'Скасування',
                msgRf: 'Оновити',
                doneHead: 'Видалено',
                doneBody: 'Усі сторінки та файли цієї категорії були видалені.',
                emptyHead: 'Нічого не знайдено',
                emptyBody: 'У цій категорії немає сторінок або файлів.'
            },
        // Tagalog
        tl: {
            buttonTitle: 'Alisin ang lahat ng pahina sa kategorya',
            buttonText: 'Alisin ang lahat',
            reasonHead: 'Dahilan ng pag-alis',
            reasonBody: 'Lahat ng pahina kasama ang mga file na nasa kategoryang ito ay idedelete sa dahilang:',
            reasonAlert: 'Tiyakin na lahat ng pahina at file ay kailangang alisin!',
            msgDel: 'Alisin',
            msgCancel: 'Ikansela',
            msgRf: 'I-refresh',
            doneHead: 'Inalis na',
            doneBody: 'Inalis na ang lahat na pahina at file sa kategoryang ito.',
            emptyHead: 'Walang nahanap na mga file',
            emptyBody: 'Walang pahina o file ang nahanap sa kategoryang ito.'
        }
    },
        lang = $.extend( translations.en, translations[ mw.config.get( 'wgContentLanguage' ) ] );
    if ( $( '.deleteAll' ).length ) {
        return;
    }
    if ( ( config.usergroups.indexOf('sysop') + config.usergroups.indexOf('staff') + config.usergroups.indexOf('helper') > -3 ) && 
         config.namespace == 'Category' 
       ) {
        switch ( config.skin ) {
        case 'wikia':
        case 'oasis':
            if ( typeof config.category !== 'undefined' ) {
                if ( config.title == config.category ) {
                    $( '.wikinav2 .WikiaPageHeader' ).css( 'padding-right', '0' );
                    $( '#WikiaPageHeader .comments.talk' ).after( '<button class="wikia-button deleteAll" title="' + lang.buttonTitle + '">' + lang.buttonText + '</button>' );
                    $( '.deleteAll' ).on( 'click', checkDeletion ).css( 'margin', '3px 5px' );
                }
            } else {
                $( '.wikinav2 .WikiaPageHeader' ).css( 'padding-right', '0' );
                $( '#WikiaPageHeader .comments.talk' ).after( '<button class="wikia-button deleteAll" title="' + lang.buttonTitle + '">' + lang.buttonText + '</button>' );
                $( '.deleteAll').on( 'click', checkDeletion ).css( 'margin', '3px 5px' );
            }
            break;
        case 'monobook':
        case 'uncyclopedia':
        case 'wowwiki':
            if ( typeof config.category !== 'undefined' ) {
                if ( config.title == config.category ) {
                    $( '#p-cactions .pBody #ca-delete' ).after( '<li id="ca-deleteAll"><a id="ca-deleteAllButton" title="' + lang.buttonTitle + '">' + lang.buttonText + '</a></li>' );
                    $( '#ca-deleteAllButton' ).on( 'click', checkDeletion );
                }
            } else {
                $( '#p-cactions .pBody #ca-delete' ).after( '<li id="ca-deleteAll"><a id="ca-deleteAllButton" title="' + lang.buttonTitle + '">' + lang.buttonText + '</a></li>' );
                $( '#ca-deleteAllButton' ).on( 'click', checkDeletion );
            }
        }
    }
 
    function checkDeletion () {
        if ( config.skin == 'monobook' ) {
            mw.util.addCSS( '.modalWrapper {border:1px solid #aaa !important;box-shadow:5px 5px 35px #000;font-size:13px;padding:20px !important;}.modalWrapper .close {border:none;background:#aaa !important;padding:3px 5px !important;}.modalWrapper .neutral {margin-top:5px;}.modalWrapper .wikia-button {margin:3px;padding:2px 4px;background:#eee;color:#000;cursor:pointer;text-decoration:none;}' );
        }
        $.showCustomModal( lang.reasonHead, lang.reasonBody + '<input style="border:1px solid #aaa;-moz-border-radius:4px;border-radius:4px;padding:2px;width:250px" type="text" id="wpDelReason"><hr>' + lang.reasonAlert, {
            id: 'deleteModal',
            width: 650,
            buttons: [ {
                defaultButton: true,
                message: lang.msgDel,
                handler: function () {
                    deleteAll();
                }
            }, {
                message: lang.msgCancel,
                handler: function () {
                    cancelDeletion();
                }
            } ]
        } );
    }
 
    function deleteAll () {
        cancelDeletion();
        var delItems = [];
        $( '#mw-pages .mw-content-ltr li' ).each( function () {
            delItems.push( $( this ).text() );
        } );
        $( '.gallery .gallerytext > a' ).each( function () {
            delItems.push( $( this ).attr( 'title' ).replace( / /g, '_' ) );
        } );
        config.reason = $( '#wpDelReason' ).val() || window.reason;
        if ( delItems.length > 0 ) {
            for ( i = 0; i < delItems.length; i++ ) {
                var deleteURL = config.server + '/api.php?action=delete&title=' + encodeURIComponent( delItems[ i ] ) + '&token=' + encodeURIComponent( config.edittoken ) + '&reason=' + encodeURIComponent( config.reason );
                $.post( deleteURL );
            }
            $.showCustomModal( lang.doneHead, lang.doneBody, {
                id: 'deleted',
                width: 450,
                buttons: [ {
                    defaultButton: true,
                    id: 'refresh',
                    message: lang.msgRf,
                    handler: function () {
                        window.location.reload();
                    }
                } ]
            } );
        } else if ( delItems.length === 0 ) {
            $.showCustomModal( lang.emptyHead, lang.emptyBody, {
                id: 'no-delItems',
                width: 450,
                buttons: [ {
                    defaultButton: true,
                    message: 'OK',
                    handler: function () {
                        $( '#no-delItems' ).closeModal();
                    }
                } ]
            } );
        }
    }
 
    function cancelDeletion () {
        $( '#deleteModal' ).closeModal();
    }
} ) ( jQuery, mediaWiki );
// </syntaxhighlight>

/**
*
* Description:
* Updates page links in use on the wiki when the page is renamed.
*
* @Author Foodbandlt
* Using code by Jr Mime
*
* Last updated 12th of May, 2014
 
/api.php?action=query&list=allpages&apprefix=&apnamespace=" + $.getUrlVar('namespace') + "&aplimit=5000
**/
 
// Options processing
 
if (typeof PRAoptions !== "undefined"){	
	if (typeof PRAoptions.editSummary === "undefined"){
		PRAoptions.editSummary = "Updating page links (automatic)";
	}
}else{	
	PRAoptions = {
		editSummary: 'Updating page links (automatic)',
	};
}
$.getJSON("/api.php?action=query&meta=userinfo&uiprop=groups&format=json", function(result){
	if (/content-moderator|helper|staff|sysop/g.test(result.query.userinfo.groups.join('|'))) {
 
		if (typeof PRA === "undefined"){
			PRA = {
 
				started: false,
 
				updateStatus: function(gifDisplay, message){
					if ($("#PRAStatus").length === 0) return false;
 
					if (typeof gifDisplay === "string"){
						message = gifDisplay;
					}else if (typeof gifDisplay === "boolean"){
						if (gifDisplay === false){
							displayValue = "none";
						}else{
							displayValue = "inline-block";
						}
						document.getElementById("liveLoader").style.display = displayValue;
					}else{
						return false;
					}
 
					if (typeof message === "string"){
						$("#PRAStatus").html(" " + message);
					}
					return true;
				},
 
				start: function(callback){
 
					/* Checks if function has already started */
					if (PRA.started === true){
						return false;
					}
 
					PRA.started = true;
					PRA.updateStatus(true, PRA.getMessage("process"));
					$("#PRAprocess").css("display", "none");
					PRA.toggleInputs(false);
 
					/* Sets variables used by the function */
					PRA.oldName = decodeURIComponent($.getUrlVar('pagename').replace(/_/g, " ")).replace(/%22/g, '"').replace(/%27/g, "'"),
					PRA.newName = $("#wpNewTitleMain").val();
					PRA.reason = $("#wpReason").val();
 
 
					PRA.pageKey = [];			
 
					/* Check if destination page name is in use */
					$.getJSON("/api.php?action=query&prop=revisions&rvprop=content&titles="+encodeURIComponent(PRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"&format=json", function(result){
						if (typeof result.query.pages[-1] !== "undefined"){
 
							$.getJSON("/api.php?action=query&list=embeddedin&eititle=" + encodeURIComponent(PRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&eilimit=5000&format=json", function(result){
								var transUsage = result.query.embeddedin;
 
								$.getJSON("/api.php?action=query&bllimit=5000&list=backlinks&bltitle=" + encodeURIComponent(PRA.oldName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "&format=json", function(result){
									var pageLinks = result.query.backlinks;
									var pageUsage = transUsage.concat(pageLinks);
 
									if (console) console.log("Usage successfully retrieved");
									if (pageUsage.length > 0){
 
										PRA.queueData = [];
										PRA.pageKey = [];
 
										for (var currentPage = 0; currentPage < pageUsage.length; currentPage++){
											var title = pageUsage[currentPage].title;
											PRA.queueData.push(title);
											/* Temporary until Wikia fixes issue with editing blog comments through the API */
											if (title.search(/User blog comment/i) != -1){
												var PRABlogComment = true;
											}
										}
 
 
 
										/* Temporary until Wikia fixes issue with editing blog comments through the API */
										if (typeof(PRABlogComment) === "undefined"){
											PRA.updateStatus(false, PRA.getMessage("success"));
											PRA.started = false;
											PRA.toggleInputs(true);
											$("#PRAprocess").css("display", "inline-block");
											PRA.updateQueueListing();
										}else{
											PRA.started = false;
											PRA.updateStatus(false, PRA.getMessage("blogcomment"));
											PRA.toggleInputs(true);
											if (typeof(callback) === "function"){
												callback(false, "blogcomment");
											}
										}
 
 
									}else{
										/* Else, prompt to use normal renaming, since this is kind of pointless otherwise */
										PRA.started = false;
										PRA.updateStatus(false, PRA.getMessage("filenotused"));
										PRA.toggleInputs(true);
										if (typeof(callback) === "function"){
											callback(false, "filenotused");
										}
									}
								});
							});
						}else{
							PRA.started = false;
							PRA.updateStatus(false, PRA.getMessage("destinuse"));
							PRA.toggleInputs(true);
							if (typeof(callback) === "function"){
								callback(false, "destinuse");
							}
						}
					});
 
				},
 
				/**************************************
				// Processing-related functions
				**************************************/
 
				processQueue: function(){
					/* Check if operation already started */
					if (PRA.started === true){
						return false;
					}
 
					/* Variable redeclaration */
					PRA.started = true;
					PRA.toggleInputs(false);
					PRA.requestCompleted  = [];
					PRA.pageData = [];
					PRA.updateStatus(true, PRA.getMessage("process"));
 
					/* Queue retrieval, returns false if no queue */
 
					PRA.movePage(function(){
						PRA.processPageContent(function(){
							PRA.queueData = [];
							PRA.updateStatus(false, PRA.getMessage("success") + ": <a target='_blank' href='/wiki/"+encodeURIComponent(PRA.newName.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27")+"'>Link</a>");
							PRA.updateQueueListing();
						});
					});
				},
 
				processPageContent: function(callback) {
					/* Sets progress checking variables */
					for (i = 0; i<PRA.queueData.length; i++){
						PRA.requestCompleted[i] = false;
					}
 
					var pageDataRetrieved = 0;
 
					if (console) console.log("Getting page contents");
 
 
					for (var j = 0; j < (Math.floor(PRA.queueData.length/500)+1); j++){
						var tempArray = [];
 
						for (var k = (j * 500); k < (j * 500) + 500; k++){
							if (k == PRA.queueData.length){
								break;
							}
 
							tempArray.push( PRA.queueData[k] );
						}
 
					/* Calls API for page contents */
						$.post(
							"/api.php",
							{
								action: "query",
								prop: "revisions",
								rvprop: "content",
								titles: tempArray.join("|"),
								format: "json"
							},
							function(result){
								/* Saves page contents for each page in PRA.pageData */
								for (var i in result.query.pages){
									var keyNum = PRA.queueData.indexOf(result.query.pages[i].title);
									PRA.pageData[keyNum] = {
										title: PRA.queueData[keyNum],
										content: result.query.pages[i].revisions[0]["*"],
										changed: false
									};
									pageDataRetrieved++;
								}
 
								if (pageDataRetrieved == PRA.queueData.length){
									if (console) console.log("Page contents retrieved and saved");
 
									if (console) console.log("Begin processing page content.");
 
									/* Replacing image name on each page */
									var escapedName0 = window.PRA.oldName.replace(/\*/g, "\\*").replace(/\?/g, "\\?").replace(/\./g, "\\.").replace(/( |_)/g, "[ _]*?").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\+/g, "\\+");
									if ( escapedName0.substr(0,1).match(/[A-z]/i) ){
										var escapedName = "[" + escapedName0.substr(0,1).toUpperCase() + escapedName0.substr(0,1).toLowerCase() + "]" + escapedName0.substr(1);
									}else{
										var escapedName = escapedName0;
									}
 
									var pageReplacement = new RegExp("(:?|=[ ]*?|\\||\\[|\\{)" + escapedName + "(.*?\\n|[ ]*?\\||\\]|\\})", "g");
									var replacementReg = new RegExp(escapedName, "g");
 
									for (i=0; i<PRA.pageData.length; i++){
 
										if (PRA.pageData[i].content.search(pageReplacement) != -1){
											PRA.pageData[i].changed = true;
											if (console) console.log("\""+PRA.oldName+"\" replaced on page \""+PRA.queueData[i]+"\"");
 
											while ((regExec = pageReplacement.exec(PRA.pageData[i].content)) !== null){
												PRA.pageData[i].content = PRA.pageData[i].content.replace(regExec[0], regExec[0].replace(replacementReg, PRA.newName));
												pageReplacement.lastIndex += (regExec[0].replace(replacementReg, PRA.newName).length - regExec[0].length) - (regExec[2].length);
											}
										}else{
											PRA.failedLog(PRA.queueData[i].title);
										}
									}
 
									if (console) console.log("Begin submitting pages");
 
									/* Adds progress bar for page submission (since this is the longest part and something entertaining needs to happen) */
									$(".PRAinfo").append("<div id='PRAQueueProgress' style='float: right; width: 200px; border: 2px solid black; height: 17px; margin: 6px 5px 0px 0px;'><div id='PRAProgressInd' style='width: 0%; height: 100%; float: left; background-color: green;'></div></div>");
									PRA.queueProgress = 0;
 
									var l = 0;
 
									var throttle = setInterval(function(){
										if (PRA.pageData[l].changed === true){
											PRA.submitChangedPages(l, callback);
										}else{
											PRA.requestCompleted[l] = true;
										}
 
										l++;
 
										if (l == PRA.pageData.length){
											clearInterval(throttle);
										}
									}, 500);
								}else if (k == PRA.queueData.length && pageDataRetrieved != PRA.queueData.length){
									if(console) console.log("There was a problem retrieving one or more pages. Retrieved " + PRA.pageData.length + " of " + PRA.queueData.length + " pages");  
								}
							},
							"json"
						);
					}
				},
 
				submitChangedPages: function(pageKey, callback) {
 
					$.ajax({
						url: "/api.php",
						type: "POST",
						async: true,
						data: {
							action: "edit",
							title: PRA.pageData[pageKey].title,
							summary: PRAoptions.editSummary,
							text: PRA.pageData[pageKey].content,
							minor: true,
							nocreate: true,
							redirect: false,
							bot: true,
							token: mediaWiki.user.tokens.get("editToken"),
							format: "json"
						},
						contentType: "application/x-www-form-urlencoded",
						error: function(){
							PRA.requestCompleted[pageKey] = true;
							alert("Unable to publish page \""+PRA.pageData[pageKey].title+"\".  Please update links on that page manually.");
 
							PRA.started = false;
 
							if (typeof(callback) === "function"){
								callback();
							}
 
						},
						success: function(result){
							PRA.requestCompleted[pageKey] = true;
							if (console) console.log("Posted page \""+PRA.pageData[pageKey].title+"\"");
 
							$("#PRAProgressInd").css("width", ((++PRA.queueProgress) / PRA.pageData.length * 100) + "%");
 
							if (typeof result.error !== "undefined"){
								alert("The page \"" + PRA.pageData[pageKey].title + "\" could not be submitted because of error code:\"" + result.error.code + "\". Please update the link(s) on that page manually.");
 
								PRA.failedLog(PRA.pageData[pageKey].title);
							}
 
							if (PRA.requestCompleted.indexOf(false) == -1){
 
								PRA.started = false;
								$("#PRAQueueProgress").remove();
 
								/* Call callback if exists */
								if (typeof(callback) === "function"){
									callback();
								}
							}
						}					
					});
				},
 
				movePage: function(callback) {
 
					$.ajax({
						url: "/api.php",
						type: "POST",
						async: true,
						data: {
							action: "move",
							from: PRA.oldName,
							to: PRA.newName,
							reason: PRA.reason,
							movetalk: false,
							noredirect: true,
							ignorewarnings: true,
							token: mediaWiki.user.tokens.get("editToken"),
							format: "json"
						},
						contentType: "application/x-www-form-urlencoded",
						error: function(){
							alert("Unable to move page \"" + PRA.oldName + "\" to \"" + PRA.newName + "\".");
							PRA.started = false;
							PRA.toggleInputs(true);
						},
						success: function(result){
							if (typeof result.error === "undefined"){
								if (console) console.log("Moved page \"" + PRA.oldName + "\"");
 
								/* Call callback if exists */
								if (typeof(callback) === "function"){
									callback();
								}
							}else if (result.error.code == "articleexists" || result.error.code == "invalidtitle"){
								var promptResponse = prompt("The page \"" + PRA.oldName + "\" was unable to be moved to \"" + PRA.newName + "\" for reason: " + result.error.code + ". \n Please enter another destination name for this file.");
 
								if (promptResponse !== null && promptResponse !== ""){
									PRA.newName = promptResponse;
									PRA.movePage(callback);
								}else{
									alert(PRA.oldName + " was unable to be moved.");
									PRA.started = false;
									PRA.toggleInputs(true);
								}
							}else{
								alert("The page \"" + PRA.oldName + "\" was unable to be moved to \"" + PRA.newName + "\" for reason: " + result.error.code + ".");
								PRA.started = false;
								PRA.toggleInputs(true);
							}
						}
					});
				},
 
				/**************************************
				// Modal-related functions
				**************************************/
 
				toggleInputs: function(toggle){
					$("#wpNewTitleMain, #wpReason").attr("disabled", (toggle === false));
				},
 
				getMessage: function(message, number){
					switch (message){
						case "":
							break;
						case "nameinuse":
							return "Destination name is already queued to be used or is currently in use.";
						case "blogcomment":
							return "Page linked in blog comment. Unable to update blog comments due to API bug.";
						case "filenotused":
							return "Page not linked on any pages.";
						case "destinuse":
							return "Destination name already in use.";
						case "process":
							return "Processing...";
						case "success":
							return "Successful.";
						case "varsundef":
							return "Variables undefined, check code.";
						case "queueupdate":
							return "Queue updated.";
						case "nothinginqueue":
							return "There is currently nothing in the queue.";
						case "trydiffname":
							return "Please enter a page name.";
					}
				},
 
				failedLog: function(page){
					if (typeof(PRA.logFailed) === "undefined"){
						PRA.logFailed = "";
					}
					PRA.logFailed += "<div><a target='_blank' href='/wiki/" + encodeURIComponent(page.replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + page + "</a></div>";
 
					if ($("#PRAFailedLog").length > 0){
						document.getElementById("PRAFailedLog").innerHTML = PRA.logFailed;
						$("#PRAFailedLog div:odd").css("background-color", "darkred");
					}
				},
 
				updateQueueListing: function(){
					if (typeof PRA.queueData == "undefined" || PRA.queueData.length < 1){
						document.getElementById("PRAQueue").innerHTML = "<div>" + PRA.getMessage("nothinginqueue") + "</div>";
						document.getElementById("PRAQueueLengthBox").innerHTML = "0";
						return false;
					}
 
					var PRACurrentQueueData = PRA.queueData;
					var queueToAdd = "";
 
					for (i = 0; i<PRACurrentQueueData.length; i++){
						queueToAdd += "<div><a target='_blank' href='/wiki/" + encodeURIComponent(PRACurrentQueueData[i].replace(/ /g, "_")).replace(/"/g, "%22").replace(/'/g, "%27") + "'>" + PRACurrentQueueData[i] + "</a></div>";
					}
 
					document.getElementById("PRAQueue").innerHTML = queueToAdd;
					document.getElementById("PRAQueueLengthBox").innerHTML = PRA.queueData.length;
					$("#PRAQueue div:odd").css("background-color", "lightgrey");
				}
			};
		}
 
		/* Actions performed on page load to add script elements */
 
		if (mw.config.get('wgCanonicalSpecialPageName') === 'Blankpage' && $.getUrlVar('blankspecial') === 'pageusageupdate') {
			var decodedOldPage = decodeURIComponent($.getUrlVar('pagename').replace(/_/g, " ")).replace(/(%22|")/g, '&quot;').replace(/(%27|')/g, "&#39;");
			(function() {
		/* Text */		var form = '<div class="AdminDashboardGeneralHeader AdminDashboardArticleHeader"><h1>Renaming Page:' + decodedOldPage + '</h1></div>Using the form below will rename a page by changing the page names on pages that the page is used on. Be sure to check <a href="/wiki/Special:WantedCategories">wanted categories</a>. You are responsible for making sure that links continue to point where they are supposed to go.<br /><br />Note that the page will <strong>not</strong> be moved if there is already a page at the new title.<br /><br /><strong>Warning!</strong> This can be drastic and unexpected for a popular page; please be sure you understand the consequences of this before proceeding.<br />'
		/* Current name */		+ '<fieldset><legend>Rename page & update usage</legend><table border="0" id="mw-renamepage-table"><tr><td class="mw-label">Current name:</td><td class="mw-input"><strong><a href="/wiki/' + $.getUrlVar('pagename') + '">' + decodedOldPage + '</a></strong></td></tr>'
		/* Rename page */		+ '<tr><td class="mw-label">Rename page:</td><td class="mw-input"><input name="wpNewTitleMain" size="79.5" value="' + decodedOldPage + '" type="text" id="wpNewTitleMain" maxlength="255"></td></tr>'
		/* Reason box */		+ '<tr><td class="mw-label">Reason:</td><td class="mw-input"><textarea name="wpReason" id="wpReason" cols="60" rows="2" maxlength="255"></textarea></td></tr>'
		/* Buttons and misc */		+ '<tr><td>&#160;</td><td class="mw-submit"><a style="margin-left: 0px;" class="wikia-button" id="PRAstart" onclick="PRA.start()">Populate list</a> <a style="margin-left: 5px; display: none;" class="wikia-button" id="PRAprocess" onclick="PRA.processQueue()">Process queue</a><span id="liveLoader" style="display:none"><img src="https://images.wikia.nocookie.net/__cb62004/common/skins/common/progress-wheel.gif" /></span><span id="PRAStatus" style="font-weight: bold"></span></td></tr>'
		/* Queue box */         + '<tr><td class="mw-label">Queued items:</td><td class="mw-input"><div id="PRAQueue" style="overflow: scroll; width: 798px; height: 300px; float: left; border: 1px solid black; font-weight: bold; background-color: #FFFFFF;"></div></td></tr>'
		/* Counter */               + '<tr><td class="mw-label">&#160;</td><td class="mw-input PRAinfo"><div id="PRAQueueLength" style="float: left;margin: 5px 15px 0px 0px; font-weight: bold;">Pages in queue: <span id="PRAQueueLengthBox"></span></div></td></tr>'
		/* Error box */			+ '<tr><td class="mw-label">Failed items:</td><td class="mw-input"><div id="PRAFailedLog" style="width: 798px; margin: 5px auto 0px auto; background-color: #ffbfbf; height: 150px; border: 1px solid black; font-weight: bold; overflow: scroll;">Failed items appear here after execution. Note that pages that the page is transcluded through a template on will also appear here falsely.</div></td></tr>';
				$('#WikiaArticle').html(form);
			})();
 
			document.title = 'Page Rename Auto-Update';
			PRA.updateQueueListing();
		}else if (wgCanonicalNamespace != "Special" && wgCanonicalNamespace != "Mediawiki" && wgCanonicalNamespace != "Category" && wgCanonicalNamespace != "Category Talk" && wgCanonicalNamespace != "User Talk" ){
			/* Page */
			$('#WikiaPageHeader nav ul').append(
				$('<li/>').append(
					$('<a/>', {
						'href': '/wiki/Special:BlankPage?blankspecial=pageusageupdate&pagename=' + encodeURIComponent(mw.config.get('wgPageName').replace(/ /g, "_")) + '&namespace=' + wgNamespaceNumber,
						'title': 'Rename & update',
						'html': 'Rename & update'
					})
				)
			);
		}
	}
});

// Saves the page when Ctrl+S or Command+S is pressed
// Author: KurwaAntics
 
if ( $("body").hasClass("editor") ) {
    $(document).keydown(function(event) {
        if((event.ctrlKey || event.metaKey) && event.which == 83) {
            $('#wpSave').click();
            event.preventDefault();
            return false;
        }
    });
}
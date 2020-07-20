// <pre><nowiki>
/* Any JavaScript here will be loaded for all users on every page load. */
/* MainPages.js
 * 
 * This script is used to customize the appearance of the Commons main page and its translations.
 * In particular, it is used to hide the page title and to change the tab text from "Gallery" to
 * "Main page" or a translated version thereof.
 * This script supersedes the [[MediaWiki:MainPages.css]] style sheet.
 *
 * Maintainer(s): [[User:Ilmari Karonen]]
 */

mw.hook("postEdit").add(function() {
    console.info("postEdit hook fired");
    mw.notify("Successfully saved me");
});

isInChat = wgWikiaChatUsers.some(function(user) {
    return user.username == wgUserName;
});
if(isInChat) {
    $('.chat-module.rail-module .start-a-chat-button').text('Du bist schon im Chat')
}

$.getScript("/wiki/MediaWiki:OOJS.js?action=raw", function() {
  $.getScript("/wiki/MediaWiki:OOJS.ui.js?action=raw", function() {
      /*OO.ui.confirm( 'Are you sure?' ).done( function ( confirmed ) {
          if ( confirmed ) {
              console.log( 'User clicked "OK"!' );
          } else {
              console.log( 'User clicked "Cancel" or closed the dialog.' );
          }
      } );*/
  
  });
});

$('#mw-content-text').append(
    $('<button />').addClass('wikia-button').attr('id','wiki-add-new-section').text('Neuen Abschnitt hinzufügen').click(function() {
        $('#mw-content-text').append(
            $('<input />').attr({
                'type': 'text',
                'id': 'newsection-title',
                'placeholder': 'Titel'
            }),
            $('<textarea />').css({
                height: '150px',
                resize: 'both'
            }).attr({
                id: 'newsection-content',
                placeholder: 'Inhalt'
            }),
            $('<button />').addClass('wikia-button').text('Speichern').click(function() {
                addSection($('#newsection-title').val(),$('#newsection-content').val());
            })
        );
        $(this).detach();
    })
);

function addSection(title,content) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            format: 'json',
            action: 'edit',
            title: mw.config.get('wgPageName'),
            sectiontitle: title,
            section: 'new',
            summary: '[API] added new section "' + title + '"',
            text: content,
            token: mw.user.tokens.get('editToken')
        },
        dataType: 'json',
        type: 'POST',
        success: function( data ) {
            if ( data && data.edit && data.edit.result == 'Success' ) {
                $.get('/api.php?action=parse&page=' + mw.config.get('wgPageName') + '&prop=sections&format=json',function(data) {
                    window.location.search = '?newsectionid=' + data.parse.sections.length;
                });
                //window.location.reload(); // reload page if edit was successful
            } else if ( data && data.error ) {
                alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
            } else {
                alert( 'Error: Unknown result from API.' );
            }
        },
        error: function( xhr ) {
            alert( 'Error: Request failed.' );
        }
    });
}

/* Any JavaScript here will be loaded for all users on every page load. */
/* set global vars */
console.time('performanceTest');
config = {
    userSubpages: ['Bücher','To do'],
    ajaxPages: ['Spezial:Letzte_Änderungen'],
    AjaxRCRefreshText: 'Auto-Aktualisierung',
    AjaxRCRefreshHoverText: 'automatische Aktualisierung ohne Neuladen der kompletten Seite',
    parties: ['Slytherin','Hufflepuff','Ravenclaw','Gryffindor'],
    additionalFileExtensions: ['mp4','mpeg'],
    WikiaNotificationMessage: 'Herzlich Willkommen im Testwiki<br /><br /><a href="/wiki/" alt="home" title="Hauptseite">Hauptseite&gt;&gt;</a>',
    WikiaNotificationMessagePage: 'Custom-edit-rules',
    WikiaNotificationexpiry : 10,
    newpages_created: 'Seitenerstellungen', //BuchPortraits erstellt
    editsummaries: {
        defaultTemplate: false
    },
    activateLibraries: ['moment']
}
var userSubpages = config.userSubpages;
 
/* Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC) */
ajaxPages = ['Spezial:Letzte_Änderungen'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';

// our less config is stored in an array
window.lessOpts = window.lessOpts || [];

$('button.close[data-dismiss="alert"]').click(function() {
    $(this).parent().detach();
});

if(!!$('#mw-content-text .vertical-tabber').length) {
    $('#mw-content-text .vertical-tabber')
        .html(
            $('#mw-content-text .vertical-tabber')
                .html()
                .replace(new RegExp('&lt;', 'g'),'<')
                .replace(new RegExp('&gt;', 'g'),'>')
   );
}
 
importArticles({
    type: 'style',
    articles: [
        'MediaWiki:Bootstrap.css',
        'MediaWiki:Bootstrap.css/label.css',
        'MediaWiki:Bootstrap.css/alert.css',
        'MediaWiki:Bootstrap.css/typographie.css',
        'MediaWiki:FontAwesome.css',
        'MediaWiki:Prism.css',
        'MediaWiki:Tabber.css',
        'MediaWiki:Wikiaprojekt.css',
        'MediaWiki:OOJS.ui.css'
    ]
});
 
importArticles({
    type: 'script',
    articles: [
        //'MediaWiki:CSON.js',
        //'MediaWiki:OOJS.js',
        //'MediaWiki:OOJS.ui.js',
        //'MediaWiki:OOJS.js/Test.js',
        'MediaWiki:Extension:Extensions.js',
        'MediaWiki:Onlyifuploading.js',
        'MediaWiki:Language.js',
        'MediaWiki:Functions.js',
        'MediaWiki:CustomSpoiler.js',
        'MediaWiki:EditModal.js',
        'MediaWiki:Comments.js',
        'MediaWiki:Summaries.js',
        'MediaWiki:Twitter.js',
        'MediaWiki:SettingsPage.js',
        'MediaWiki:Latest.js',
        'MediaWiki:Intertypelink.js',
        'MediaWiki:God-Table.js',
        'MediaWiki:Namespaces.js',
        'MediaWiki:Lua.js',
        'MediaWiki:WatchAPI.js',
        'MediaWiki:Notify.js',
        'MediaWiki:API.js',
        'MediaWiki:Customization.js',
        'MediaWiki:Redirect.js',
        'MediaWiki:UploadLicence.js',
        'MediaWiki:Edit.js',
        'MediaWiki:Settings.js',
        'MediaWiki:RawData.js',
        'MediaWiki:WikiaPhotoGallery.js',
        'MediaWiki:Tabber.js',
        'MediaWiki:UserPage.js',
        'MediaWiki:UserContribs.js',
        'MediaWiki:Event.js',
        'MediaWiki:Validate.js',
        //'MediaWiki:WikiaNotifications.js',//Test
        'MediaWiki:Draft.js',
        'MediaWiki:Upload.js',
        //'MediaWiki:Login.js', //Deleted because of violating the terms of use
        //'MediaWiki:MovieAPI.js',
        //'MediaWiki:BookAPI.js',
        'MediaWiki:Labels.js',
        'MediaWiki:Tags.js',
        'MediaWiki:CustomSettingsMenu.js',
        //'MediaWiki:GenderAPI.js',
        'MediaWiki:mainCategory.js',
        'MediaWiki:PrivateMessage.js',
        'MediaWiki:Auto-Refresh.js',
        //'MediaWiki:Draggable.js',
        'w:c:de:harrypotter:MediaWiki:Benutzername-aus-Nachrichtenseite.js',
        //'MediaWiki:CategoryDesign.js',
        'MediaWiki:CustomTags.js',
        'MediaWiki:CustomUserSubpages.js',
        //'MediaWiki:Skin.js',
        'MediaWiki:Marquee.js',
        'MediaWiki:BelongsTo.js',
        //'MediaWiki:BlogOverview.js',
        'MediaWiki:Breadcrumbs.js',
        //'MediaWiki:Adventskalender.js',
        'MediaWiki:GroupContents.js',
        //'MediaWiki:LastActivities.js',
        //Must stand at the bottom!
        'MediaWiki:Common_init.js',
        'MediaWiki:Coffee2JS.js'
    ]
});
 
importArticles({
    type: 'style',
    articles: [
        'MediaWiki:Adventskalender.css'
    ]
});

/* FileExtensionsAdd = ['mp4','mpeg'];
$.extend(true,wgFileExtensions,FileExtensionsAdd); */
 
function importArticleCallback(page,type,callback) {
    var v = Math.random() * 10; //don't get cached version (e.g. action=purge)
    $.getScript('/load.php?mode=articles&articles=' + page + '&only=' + type + '&v=' + v).fail(function (response) {
        console.error(response);
    }).done(callback);
}
 
function importArticlesCallback() {
    for(i = 0; i < arguments[0].length; i++) {
        page = arguments[0][i].page;
        type = arguments[0][i].type;
        callback = arguments[0][i].callback;
        importArticleCallback(page,type,callback);
    }
}
 
// </source>
 
function rewriteTitle() {
    if (typeof (window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }
 
    if ($('#title-meta').length === 0) {
        return;
    }
 
    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header div.header-column.header-title > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header div.header-column.header-title > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}
 
// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]]
//and may be further modified for local use.
function mainPageRenameNamespaceTab() {
    try {
        var Node = document.getElementById('ca-nstab-main').firstChild;
        if (Node.textContent) { // Per DOM Level 3
            Node.textContent = 'Main Page';
        } else if (Node.innerText) { // IE doesn't handle .textContent
            Node.innerText = 'Main Page';
        } else { // Fallback
            Node.replaceChild(Node.firstChild, document.createTextNode('Main Page'));
        }
    } catch (e) {
        // bailing out!
    }
}
 
if (wgTitle == 'Main Page' && (wgNamespaceNumber === 0 || wgNamespaceNumber == 1)) {
    addOnloadHook(mainPageRenameNamespaceTab);
}
 
/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop inexperienced users bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Oasis support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
    if (typeof (enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
        return;
    }
    if (!document.getElementById('old-forum-warning')) {
        return;
    }
 
    if (skin == 'oasis') {
        if (wgNamespaceNumber == 2 || wgNamespaceNumber == 3) {
            $("#WikiaUserPagesHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
            $('span.editsection').remove();
            return;
        } else {
            $("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
            $('span.editsection').remove();
            return;
        }
    }
 
    if (!document.getElementById('ca-edit')) {
        return;
    }
 
    if (skin == 'monaco') {
        editLink = document.getElementById('ca-edit');
    } else if (skin == 'monobook') {
        editLink = document.getElementById('ca-edit').firstChild;
    } else {
        return;
    }
 
    editLink.removeAttribute('href', 0);
    editLink.removeAttribute('title', 0);
    editLink.style.color = 'gray';
    editLink.innerHTML = 'Archived';
 
    $('span.editsection-upper').remove();
    $('span.editsection').remove();
 
    appendCSS('#control_addsection, #ca-addsection { display: none !important; }');
}
addOnloadHook(disableOldForumEdit);
 
//Removes the "Featured on:" line on File pages -- By Grunny
addOnloadHook(function () {
    if (wgNamespaceNumber == 6 && $('#file').length !== 0) {
        $('#file').html($('#file').html().replace(/Featured on\:(.*?)<br>/, ''));
    }
});

/* Is this still in use? */
/* Temporary fix for the duration of the giveaway to let others use talk pages */
/* $( function () {
	if( wgTitle == 'Wizarding World Giveaway' || wgTitle == 'Deathly Hallows Premiere Event' ) {
		return;
	}
	if( wgNamespaceNumber == 0 ) {
		if( skin == 'oasis' ) {
			$('ul.commentslikes > li.comments > a').text('Talk').attr('href','/wiki/Talk:'+ encodeURIComponent (wgPageName));
			$('section#WikiaArticleComments').remove();
		} else {
			$('#p-cactions > .pBody > ul > #ca-nstab-main').after('<li id="ca-talk"><a accesskey="t" title="Discussion about the content page [t]" href="/wiki/Talk:'+ encodeURIComponent (wgPageName) +'">Discussion</a></li>');
			$('div#article-comments-wrapper').remove();
		}
	}
} ); */
 
/* Sachen, die nur Administratoren und Helfern angezeigt werden (sysop.js ist ausschließlich den Administratoren vorbehalten) */
/*
if (wgUserGroups) {
    for (var g = 0; g < wgUserGroups.length; ++g) {
        if (wgUserGroups[g] == "sysop") {
            importStylesheet("MediaWiki:Sysop.css");
            $(function () {
                if (!window.disableSysopJS) {
                    importScript("MediaWiki:Sysop.js");
                }
            });
        } else if (wgUserGroups[g] == "helper") {
            importStylesheet("MediaWiki:Sysop.css");
        }
    }
}
*/
 
/* 
 * include other pages extension
 * syntax: <div class="getPageContent" data-page="pageToFetch"></div>
 * example: <div class="getPageContent" data-page="Spezial:Forum"></div>
 */
(function () {
    var doChange = true;
    $('body').bind('DOMNodeInserted', function () {
        if ($('.getPageContent').length !== 0 && doChange) {
            $('.getPageContent').each(function () {
                var self = this;
                doChange = false;
                $.ajax('/wiki/' + encodeURIComponent($(self).attr('data-page'))).done(function (data) {
                    $(self).replaceWith($(data).find('#mw-content-text'));
                    doChange = true;
                });
 
            });
        }
    }).trigger('DOMNodeInserted');
})();

$('.adventskalender > div').each(function(key, val) {
  var number = Math.round(Math.random() * 24);
  $(val).css('order',number);
  console.log(number);
});
 
/* Why can't wikia make their own code work? */
addOnloadHook(function(){
    if(JSSnippets!==undefined){
        JSSnippets.init();
    }
    setTimeout(function(){ // ok, i guess i'm ready to die
        $('img.lzy').map(function(){
            this.src = $(this).attr('data-src');
        });
    },3000);
});

console.timeEnd('performanceTest');
//</nowiki> </pre>
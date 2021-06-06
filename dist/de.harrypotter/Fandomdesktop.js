// From MediaWiki:Common.js
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

/* Any JavaScript here will be loaded for all users on every page load. */

// List of all main page translations on Commons and their respective language codes, from [[Template:Lang-mp]]
// (The script does not currently use the language code for anything, it just checks that a value is present.)
var localizedMainPageTitles = {
    "Tuisblad": 'af',
    "Houptsyte": 'als',
    "Hēafodsīde": 'ang',
    "الصفحة الرئيسية": 'ar',
    "Portalada": 'an',
    "Entamu": 'ast',
    "Hauptsaitn": 'bar',
    "Першая старонка": 'be',
    "Галоўная старонка": 'be-tarask',
    "Halaman Utama": 'id',
    "Laman Utama": 'ms',
    "Tepas": 'su',
    "প্রধান পাতা": 'bn',
    "Početna strana": 'bs',
    "Degemer": 'br',
    "Начална страница": 'bg',
    "Pàgina principal": 'ca',
    "Hlavní strana": 'cs',
    "Hafan": 'cy',
    "Forside": 'da',
    "Hauptseite": 'de',
    "Esileht": 'et',
    "Κύρια Σελίδα": 'el',
    "Main Page": 'en',
    "Portada": 'es',
    "Ĉefpaĝo": 'eo',
    "Páhina prencipal": 'ext',
    "Azala": 'eu',
    "صفحهٔ اصلی": 'fa',
    "Forsíða/fo": 'fo',
    "Accueil": 'fr',
    "Príomhleathanach": 'ga',
    "Portada galega": 'gl',
    "મુખપૃષ્ઠ": 'gu',
    "עמוד ראשי": 'he',
    "मुख्य पृष्ठ": 'hi',
    "Glavna stranica": 'hr',
    "Գլխավոր Էջ": 'hy',
    "Pagina principal": 'ia',
    "Forsíða/is": 'is',
    "Pagina principale": 'it',
    "Pamuklat": 'pam',
    "მთავარი გვერდი": 'ka',
    "Басты бет": 'kk',
    "ទំព័រដើម": 'km',
    "ಮುಖ್ಯ ಪುಟ": 'kn',
    "대문": 'ko',
    "Pagina prima": 'la',
    "Haaptsäit": 'lb',
    "Pagrindinis puslapis": 'lt',
    "Sākumlapa": 'lv',
    "Kezdőlap": 'hu',
    "Главна страница": 'mk',
    "പ്രധാന താൾ": 'ml',
    "Паджина принчипалэ": 'mo',
    "मुखपृष्ठ": 'mr',
    "Il-Paġna prinċipali": 'mt',
    "Páigina percipal": 'mwl',
    "گت ولگ]]": 'mzn',
    "Hoofdpagina": 'nl',
    "Veurpagina": 'nds-nl',
    "メインページ": 'ja',
    "Calīxatl": 'nah',
    "गृह पृष्ठ": 'ne',
    "Hovedside": 'no',
    "Hovudside": 'nn',
    "Acuèlh": 'oc',
    "Hööftsiet": 'nds',
    "Strona główna": 'pl',
    "لومړی مخ": 'ps',
    "Página principal": 'pt',
    "Qhapaq p'anqa": 'qu',
    "Pagina principală": 'ro',
    "Заглавная страница": 'ru',
    "Haudsiede Commons": 'stq',
    "Faqja Kryesore": 'sq',
    "මුල් පිටුව": 'si',
    "Simple English": 'en-simple',
    "Hlavná stránka": 'sk',
    "Glavna stran": 'sl',
    "Главна страна": 'sr',
    "Glavna stranica - Главна страница": 'sh',
    "Etusivu": 'fi',
    "Huvudsida": 'sv',
    "Unang Pahina": 'tl',
    "முதன்மைப் பக்கம்": 'ta',
    "หน้าหลัก": 'th',
    "Trang Chính": 'vi',
    "Ana Sayfa": 'tr',
    "Головна сторінка": 'uk',
    "Pajina prinsipałe": 'vec',
    "Cifapad": 'vo',
    "Syahan nga Pakli": 'war',
    "ערשטע זײַט": 'yi',
    "Ojúewé Àkọ́kọ́": 'yo',
    "頭版": 'yue',
    "卷首": 'zh-classical',
    "首页": 'zh-hans',
    "首頁": 'zh-hant'
};

function importArticleCallback(page, type, callback) {
    var v = Math.random() * 10; //don't get cached version (e.g. action=purge)
    return $.getScript('/load.php?mode=articles&articles=' + page + '&only=' + type + '&v=' + v).fail(function (response) {
        console.error(response);
    }).done(callback);
}
 
function importArticlesCallback() {
    for(var i = 0; i < arguments[0].length; i++) {
        var page = arguments[0][i].page;
        var type = arguments[0][i].type;
        var callback = arguments[0][i].callback;
        importArticleCallback(page, type, callback);
    }
}

var MessageBlock = {
  title : 'Block',
  message : 'Du wirst $2 Tage lang gesperrt (Grund: $1)',
  autocheck : true
};

window.railWAM = {
    logPage:"Project:WAM Log"
};

window.discussionsModuleConfig = {
	'columns' : '1',
	'size' : '5',
	'mostrecent' : 'true',
	'catid' : [
		'2960193792873055990',
		'2960315177893086314',
		'2963862012326823733'
	]
};

if(!!$('#mw-content-text .vertical-tabber').length) {
    $('#mw-content-text .vertical-tabber')
        .html(
            $('#mw-content-text .vertical-tabber')
                .html()
                .replace(new RegExp('&lt;', 'g'),'<')
                .replace(new RegExp('&gt;', 'g'),'>')
   );
}

$('.fantasticbeasts-character').click(function() {
   window.location.href = mw.util.getUrl($(this).attr('data-article'));
});

/* Better seeable background */ 
$(document).ready(function() {
    if(!!$('.page:hover, .page *:hover').length) {
        $('.WikiaPageBackground').removeClass('WikiaPageBackgroundOpacity');
    }
    else {
        $('.WikiaPageBackground').addClass('WikiaPageBackgroundOpacity');
    }
    $('.page').on("mouseenter", function() {
        $('.WikiaPageBackground').removeClass('WikiaPageBackgroundOpacity');
    }).on("mouseleave", function() {
        $('.WikiaPageBackground').addClass('WikiaPageBackgroundOpacity');
    }); 
});

importArticles({
    type: "script",
    articles: [
        "w:c:de.harry-grangers-test:MediaWiki:Settings.js",
        "w:c:de.harry-grangers-test:MediaWiki:UserPage.js"
    ]
});

$(document).ready(function () {
    importArticlesCallback([{
        page: 'w:c:de.harry-grangers-test:MediaWiki:Sidebar.js',
        type: 'scripts',
        callback: function () {
            $(document).ready(function () {
                importArticlesCallback([{
                    page: 'w:c:de.harry-grangers-test:MediaWiki:WikiAPI.js',
                    type: 'scripts',
                    callback: function () {
                        $(document).ready(function() {
                            importArticlesCallback([{
                              page: 'w:c:de.harry-grangers-test:MediaWiki:UserAPI.js',
                              type: 'scripts',
                              callback: function () {
                                  $(document).ready(function() {
                                      Wiki.prototype.init = function(callback) {
                                      that = this;
                                      wgCityId = mw.config.get('wgCityId');
                                      getWikiData(wgCityId, function(data) {
                                        that.stats = data.items[wgCityId].stats;
                                        that.wam = data.items[wgCityId].wam_score;
                                        
                                        getUserGroup('sysop', function(data) {
                                          that.stats.admins = {
                                            length: that.stats.admins,
                                            users: data.query.allusers
                                          };
                                          
                                          callback();
                                        });
                                      });
                                    };
                                    wgWiki = new Wiki();
                                    wgWiki.init(function() {
                                      console.log('insert adminlist', $('.adminlist'), wgWiki.stats.admins.users);
                                      $('.adminlist').append($('<ul />'));
                                      for (var u in wgWiki.stats.admins.users) {
                                        $('.adminlist ul').append(
                                          $('<li />').append(
                                            $('<a />')
                                            .attr('href', mw.util.getUrl('Benutzer:' + wgWiki.stats.admins.users[u].name))
                                            .text(wgWiki.stats.admins.users[u].name)
                                          )
                                        );
                                      }
                                    });
                                  });
                              }
                          }]);
                        });
                    }
                }]);
            });
        }
    }]);
});

/* Fixes the forum header inside topic thread */
$(document).ready(function() {
    var contentHeader = $('.ContentHeader.Topic');
    contentHeader.detach();
    $('.BreadCrumbs').after(contentHeader);
    $('ul.ThreadList').before($('<h2 />').text('Bisherige Forenbeiträge zum Thema:'));
    $('ul.ThreadList li.thread .thread-right').each(function(key, val) {
        var threadInfoContainer = $(val).closest($('ul.ThreadList li.thread'));
        $(val).detach();
        threadInfoContainer.prepend($(val));
    });
});

$('.page-Harry-Potter-Lexikon_Community_Portal .WikiaPageHeader').append(
    $('<a />').attr({
        href: mw.util.getUrl('Project:Informationen zum Community Portal'),
        id: 'info',
        title: 'Informationen zum Community Portal'
    }).addClass('wikia-button secondary more-info-button').text('Info')
);

function rowGroup(groups) {
  for(var i in groups) {
    console.log($('tr').find(groups[i]).first(), $('tr').find(groups[i]).last());
    $('tr.' + groups[i]).first().before(
      $('<tr />').addClass('caption').data('group', groups[i]).append(
        $('<th />').attr('colspan','2').html(groups[i] + '<span style="float:right; padding-right:2px;"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron"></span>')
      )
    );
    $('tr.' + groups[i]).first().css('border-top', '1px solid silver');
    $('tr.' + groups[i]).last().css('border-bottom', '1px solid silver');
    $('.infobox-collapsable tr.caption').off().click(function() {
      $('.infobox-collapsable').find('tr.' + $(this).data('group')).toggle();
      $(this).find('.chevron.rotate-180').length ? $(this).find('.chevron').removeClass('rotate-180') : $(this).find('.chevron').addClass('rotate-180');
    });
  }
}
if($('.infobox-collapsable').length) {
    rowGroup(['general','look','trait']);
}

/*if(mw.config.get('wgUserName') === 'Agent Zuri') {
    var index = mw.config.get('wgUserGroups').indexOf('sysop');
    mw.config.get('wgUserGroups').splice(index, 1);
}*/

importArticles({
    type: "script",
    articles: [
        "MediaWiki:UserDropdown.js",
        "MediaWiki:Discussion.js",
        "MediaWiki:AdminOnlyDiv.js",
        "MediaWiki:Upload.js",
        "MediaWiki:Top10.js",
        "MediaWiki:WatchAll.js"
    ]
});

$('.watch-discussion-guides').click(function() {
    if (typeof watchAll === 'function') {
        watchAll([
            'Project:Diskussionsrichtlinien',
            'Project:Diskussionen_Team',
            'Project:Diskussionen_FAQ',
            'Project:Diskussionen_Inhalte',
            'Project:Diskussionen_ — Wie schreibe ich einen lesenswerten Diskussionsbeitrag?',
            'Project:Diskussionen_Profil',
            'Kategorie:Diskussionsbeitrag',
            'Project:Diskussionen_Beitrag_des_Monats',
            'Project:Diskussionen_Interviews',
            'Project:Hinweise_zu_Kommunikationsdiensten',
            'Project:Diskussionen_Verwarnungen',
            'Project:Diskussionen_Wiederholt_gestellte_Fragen',
        ]);
    }
});

// Build an inverted language look-up table
var localizedMainPageTitlesBack = {};
for (var key in localizedMainPageTitles) {
    localizedMainPageTitlesBack[localizedMainPageTitles[key]] = key;
}

// Callback function used for tab text translation
function setMainPageTabTextAPI(json) {
    var title = json.query.allmessages[0]['*'];
    if (title) $(document).ready(function () {
        var tab = document.getElementById('ca-nstab-main');
        if (tab) tab = tab.getElementsByTagName('a')[0];
        while (tab && tab.firstChild) tab = tab.firstChild;
        if (tab) tab.nodeValue = title;
    });
}

if (mw.config.get('wgNamespaceNumber') < 2 && localizedMainPageTitles[mw.config.get('wgTitle')]) {
    // Replace the main page tab title with the [[MediaWiki:Mainpage-description]] message
    importScriptURI(mw.config.get('wgScriptPath') + "/api.php?format=json&callback=setMainPageTabTextAPI&maxage=2592000&smaxage=2592000&action=query&meta=allmessages&ammessages=mainpage-description&amlang=" + mw.config.get('wgUserLanguage'));

    // Hide title when viewing the main page (but not when editing it or viewing the talk page)
    if (mw.config.get('wgNamespaceNumber') === 0 && (["view", "purge"].includes(mw.config.get('wgAction')))) {
        appendCSS("#firstHeading { display: none; }");
    }
}

function suggestMainpageLang() {
    // look-up welcome box on mainpage
    var mwb = document.getElementById('mainpage-welcome-box');
    if (mwb) {
        // determine browser language
        var lang = navigator.userLanguage || navigator.language || navigator.browserLanguage;

        // now use reverse loop-up table to find the correct page (try up to first dash if full code is not found) 
        var page = localizedMainPageTitlesBack[lang] || localizedMainPageTitlesBack[lang.substr(0, lang.indexOf('-'))];

        if (page && page !== mw.config.get('wgTitle')) {
            mwb.innerHTML += '<br/><img src="http://bits.wikimedia.org/skins-1.5/common/images/redirectltr.png">' + '<span class="redirectText"><a href="/wiki/' + page + '">' + page + '</a></span>';
        }
    }
}
if (mw.config.get('wgUserName') === null) $(document).ready(suggestMainpageLang);

// </source>

/* Any JavaScript here will be loaded for all users on every page load. */


/** Username replace function
 * Inserts user name into 
 * By Splarka
 *
 * Replaces {{BENUTZERNAME}} with the name of the user browsing the page.
 * Requires copying Template:USERNAME.
 */
   
   var wgUserNameAnon = 'Anonymous';

function UserNameReplace() {
    if (typeof (disableUsernameReplace) != 'undefined' && disableUsernameReplace) return;
    $("span.insertusername").text(mw.config.get('wgUserName') || wgUserNameAnon);
}
$(document).ready(UserNameReplace);

/* End of the {{BENUTZERNAME}} replacement */

function addHideButtons() {
    if (typeof getElementsByClass != 'function') {
        return;
    }
    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if (button !== null && button.length > 0) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Versteckt]'));

            if (new ClassTester('start-hidden').isMatch(box)) button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage) {
    if (typeof getElementsByClass != 'function') {
        return;
    }

    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if (content !== null && content.length > 0) {
        content = content[0];

        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Versteckt]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Zeige]';
            nowShown = false;
        }

        if (window.storagePresent && (typeof (bypassStorage) == 'undefined' || bypassStorage != 'bypass')) {
            var page = window.pageName.replace(/\W/g, '_');
            var items = getElementsByClass('hidable');
            var item = -1;

            for (var i = 0; i < items.length; i++) {
                if (items[i] == parent) {
                    item = i;
                    break;
                }
            }

            if (item == -1) {
                return;
            }

            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

function rewriteTitle() {
    if (typeof (window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }

    if ($('#title-meta').length === 0) {
        return;
    }

    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header div.header-column.header-title > h1').html(
            $('<div />').attr('id', "title-meta").css("display", "inline").html(newTitle)
        );
        $('header div.header-column.header-title > h1').css('text-align', $('#title-align').html());
    }
    else {
        $('.firstHeading').html(
            $('<div />').attr('id', "title-meta").css("display", "inline").html(newTitle)
        );
        $('.firstHeading').css('text-align', $('#title-align').html());
    }
}

// onload stuff
var firstRun = true;

function loadFunc() {
    if (firstRun) {
        firstRun = false;
    } else {
        return;
    }

    window.pageName = mw.config.get('wgPageName');
    window.storagePresent = (typeof (globalStorage) != 'undefined');

    addHideButtons();
    substUsername();
    substUsernameTOC();
    addAlternatingRowColors();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if (!bodyClass || (bodyClass.indexOf('page-') == -1)) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if (typeof (onPageLoad) != "undefined") {
        onPageLoad();
    }
}

function infoboxToggle() {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;

    if (document.getElementById('infoboxtoggle').innerHTML == '[Hide]') {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Show]';
        nowShown = false;
    } else {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Hide]';
        nowShown = true;
    }

    if (window.storagePresent) {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
}


function addAlternatingRowColors() {
    var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

    if (infoboxes.length === 0) return;

    for (var k = 0; k < infoboxes.length; k++) {
        var infobox = infoboxes[k];

        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;

        for (var i = 0; i < rows.length; i++) {
            if (rows[i].className.indexOf('infoboxstopalt') != -1) break;

            var ths = rows[i].getElementsByTagName('th');

            if (ths.length > 0) {
                continue;
            }

            if (changeColor) rows[i].style.backgroundColor = '#f9f9f9';
            changeColor = !changeColor;
        }
    }
}

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
    $('.insertusername').text(mw.config.get('wgUserName'));
}

function substUsernameTOC() {
    if (typeof getElementsByClass != 'function') {
        return;
    }

    var toc = document.getElementById('toc');
    var userpage = document.getElementById('pt-userpage');

    if (!userpage || !toc) return;

    var username = userpage.firstChild.firstChild.nodeValue;
    var elements = getElementsByClass('toctext', toc, 'span');

    for (var i = 0; i < elements.length; i++)
    elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}

/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

/*
    Source: http://www.dustindiaz.com/getelementsbyclass/
    getElementsByClass, which complements getElementById and getElementsByTagName, returns an array of all subelements of ''node'' that are tagged with a specific CSS class (''searchClass'') and are of the tag name ''tag''. If tag is null, it searches for any suitable elements regardless of the tag name.
    Example: getElementsByClass('infobox', document.getElementById('content'), 'div') selects the same elements as the CSS declaration #content div.infobox
*/
function getElementsByClass(searchClass, node, tag) {
    var classElements = [];

    if (node === null || node === undefined || !node) node = document;

    if (tag === null) tag = '*';

    var els = node.getElementsByTagName(tag);
    if(els.length!==0){
        var elsLen = els.length;
        var tester = new ClassTester(searchClass);

        for (i = 0, j = 0; i < elsLen; i++) {
            if (tester.isMatch(els[i])) {
                classElements[j] = els[i];
                j++;
            }
        }
    }
    return classElements;
}

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function (element) {
    return this.regex.test(element.className);
};
/*
    end getElementsByClass
*/
/*
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

function getFirstHeading() {
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements !== null && elements.length > 0) ? elements[0] : null;
}
*/
/*
    Returns the element's nearest parent that has the specified CSS class.
*/
/*
function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;

    while (node !== null && node != document) {
        if (tester.isMatch(node)) return node;

        node = node.parentNode;
    }

    return null;
}
*/
/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
/*
function rewriteHover() {
    var gbl = document.getElementById("hover-global");

    if (gbl === null) return;

    var nodes = getElementsByClass("hoverable", gbl);

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onmouseover = function () {
            this.className += " over";
        };
        nodes[i].onmouseout = function () {
            this.className = this.className.replace(new RegExp(" over\\b"), "");
        };
    }
}
*/
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$(loadFunc);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * Modified by [[User:Grunny]] and [[User:Sikon]] for use in both Monobook and Monaco on Wikia
 * Added section edit functionality by [[User:Green tentacle]]
 * Fix for new edit button next to the title by [[User:Grunny]]
 * New Wikia skin support by [[User:Grunny]]
 */
function addEditIntro(name) {
    // Top link
    if (mw.config.get('skin') == 'oasis') {
        $('a[data-id="edit"]').attr('href', $('a[data-id="edit"]').attr('href') + '&editintro=' + name);
        $('span.editsection > a').each(function () {
            $(this).attr('href', $(this).attr('href') + '&editintro=' + name);
        });
    } else {
        var el = document.getElementById('ca-edit');

        if (typeof (el.href) == 'undefined') {
            el = el.getElementsByTagName('a')[0];
        }

        if (el) el.href += '&editintro=' + name;

        // Section links
        var spans = document.getElementsByTagName('span');
        for (var i = 0; i < spans.length; i++) {
            el = null;

            if (spans[i].className == 'editsection') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el) el.href += '&editintro=' + name;
            } else if (spans[i].className == 'editsection-upper') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el) el.href += '&editintro=' + name;
            }
        }
    }
}

if (mw.config.get('wgNamespaceNumber') === 0) {
    $(document).ready(function () {
        var cats = document.getElementById('mw-normal-catlinks');
        if (!cats) return;
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title == 'Kategorie:Harry-Potter-Lexikon Zauberhafte Artikel') {
                addEditIntro('Vorlage:Gewählter_Zauberhafter_Artikel_editintro');
                break;
            }
        }
    });
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

var config = mw.config.get(['wgCityId', 'wgNamespaceNumber']);
if (config.wgTitle == 'Main_Page' && [0, 1].includes(config.wgNamespaceNumber)) {
    $(document).ready(mainPageRenameNamespaceTab);
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

    if (mw.config.get('skin') == 'oasis') {
        if (mw.config.get('wgNamespaceNumber') == 2 || mw.config.get('wgNamespaceNumber') == 3) {
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

    if (mw.config.get('skin') == 'monaco') {
        editLink = document.getElementById('ca-edit');
    } else if (mw.config.get('skin') == 'monobook') {
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
$(document).ready(disableOldForumEdit);

//Removes the "Featured on:" line on File pages -- By Grunny
$(document).ready(function () {
    if (mw.config.get('wgNamespaceNumber') == 6 && $('#file').length !== 0) {
        $('#file').html($('#file').html().replace(/Featured on\:(.*?)<br>/, ''));
    }
});

/* Temporary fix for the duration of the giveaway to let others use talk pages 
$( function () {
	if( ['Wizarding World Giveaway', 'Deathly Hallows Premiere Event'].includes(mw.config.get('wgTitle')) ) {
		return;
	}
	if( mw.config.get('wgNamespaceNumber') == 0 ) {
		if( mw.config.get('skin') == 'oasis' ) {
			$('ul.commentslikes > li.comments > a').text('Talk').attr('href', mw.util.getUrl('Talk:'+ wgPageName));
			$('section#WikiaArticleComments').remove();
		} else {
			$('#p-cactions > .pBody > ul > #ca-nstab-main').after('<li id="ca-talk"><a accesskey="t" title="Discussion about the content page [t]" href="+ mw.util.getUrl('Talk:'+ wgPageName) +'">Discussion</a></li>');
			$('div#article-comments-wrapper').remove();
		}
	}
} ); */

//edit buttons
if (mwCustomEditButtons != null) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
            "speedTip": "Redirect",
            "tagOpen": "#REDIRECT [[",
            "tagClose": "]]",
            "sampleText": "Insert page"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
            "speedTip": "Strike",
            "tagOpen": "<s>",
            "tagClose": "</s>",
            "sampleText": "Strike-through text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
            "speedTip": "Line break",
            "tagOpen": "<br />",
            "tagClose": "",
            "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
            "speedTip": "Comment visible only for editors",
            "tagOpen": "<!-- ",
            "tagClose": " -->",
            "sampleText": "Insert comment here"
    };
}

/* Variablen für das Skript AjaxRC (siehe http://dev.wikia.com/wiki/AjaxRC) */
ajaxPages = ['Spezial:Letzte_Änderungen'];
AjaxRCRefreshText = 'Auto-Aktualisierung';
AjaxRCRefreshHoverText = 'automatische Aktualisierung ohne Neuladen der kompletten Seite';

/* Import verschiedener Styles */

importArticles({
    type: "style",
    article: "MediaWiki:Wikiaprojekt.css"
});

//================================================================================
// alles mit class='jstest' ist dragbar

/***********************************************
 * Drag and Drop Script: © Dynamic Drive (http://www.dynamicdrive.com)
 * This notice MUST stay intact for legal use
 * Visit http://www.dynamicdrive.com/ for this script and 100s more.
 ***********************************************/

var dragobject = {
    z: 0,
    x: 0,
    y: 0,
    offsetx: null,
    offsety: null,
    targetobj: null,
    dragapproved: 0,
    initialize: function () {
        document.onmousedown = this.drag;
        document.onmouseup = function () {
            this.dragapproved = 0;
        };
    },
    drag: function (e) {
        var evtobj = window.event ? window.event : e;
        this.targetobj = window.event ? event.srcElement : e.target;
        if (this.targetobj.className == "jstest") {
            this.dragapproved = 1;
            if (isNaN(parseInt(this.targetobj.style.left))) {
                this.targetobj.style.left = 0;
            }
            if (isNaN(parseInt(this.targetobj.style.top))) {
                this.targetobj.style.top = 0;
            }
            this.offsetx = parseInt(this.targetobj.style.left);
            this.offsety = parseInt(this.targetobj.style.top);
            this.x = evtobj.clientX;
            this.y = evtobj.clientY;
            if (evtobj.preventDefault) evtobj.preventDefault();
            document.onmousemove = dragobject.moveit;
        }
    },
    moveit: function (e) {
        var evtobj = window.event ? window.event : e;
        if (this.dragapproved == 1) {
            this.targetobj.style.left = this.offsetx + evtobj.clientX - this.x + "px";
            this.targetobj.style.top = this.offsety + evtobj.clientY - this.y + "px";
            return false;
        }
    }
};

dragobject.initialize();

/* Sachen, die nur Administratoren und Helfern angezeigt werden (sysop.js ist ausschließlich den Administratoren vorbehalten) */
/*
if (mw.config.get('wgUserGroups')) {
    for (var g = 0; g < mw.config.get('wgUserGroups').length; ++g) {
        if (mw.config.get('wgUserGroups')[g] == "sysop") {
            importStylesheet("MediaWiki:Sysop.css");
            $(function () {
                if (!window.disableSysopJS) {
                    importScript("MediaWiki:Sysop.js");
                }
            });
        } else if (mw.config.get('wgUserGroups')[g] == "helper") {
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
                $.ajax(mw.util.getUrl($(self).attr('data-page'))).done(function (data) {
                    $(self).replaceWith($(data).find('#mw-content-text'));
                    doChange = true;
                });
            });
        }
    }).trigger('DOMNodeInserted');
})();


function getArticleId(title, callback){
    $.getJSON('/api/v1/Articles/Details?titles=' + encodeURIComponent(title)).done(callback);
}

function getArticleDescription(id, callback){
    $.getJSON('/api/v1/Articles/AsSimpleJson?id=' + id).done(callback);
}

/* Why can't wikia make their own code work? */
$(document).ready(function(){
    if(JSSnippets!==undefined){
        JSSnippets.init();
    }
});

$(document).ready(function(){
    setTimeout(function(){ // ok, i guess i'm ready to die
        $('img.lzy').map(function(){
            this.src = $(this).attr('data-src');
        });
    }, 3000);
});


// belongs to
$(document).ready(function(){
    if ($('#article-belongs-to').length === 0) {
        return;
    }
    var $belongsTo = $('#article-belongs-to').detach();
    if (mw.config.get('skin') == "oasis") {
        $('header div.header-column.header-title')
            .append(
                $('<h2>').append($belongsTo)
            )
            .css('text-align', $belongsTo.css('text-align'));
    } else {
        $('.secondHeading')
            .emtpy()
            .append($belongsTo)
            .css('text-align', $belongsTo.css('text-align'));
    }
});


//</nowiki> </pre>
//-------------------------
// From MediaWiki:Wikia.js
/* Import jQuery */
importScriptPage('http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js');

var SocialMediaButtonsNamespaces = [0, 4, 6, 14, 500, 1201];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "color",
	buttonSize: "25px",
	wikiTwitterAccount: "wikia_de"
};


importArticles({
    type: "script",
    articles: [
        "u:dev:SocialIcons/code.js",/*
        "l:MediaWiki:Wikia.js/AdminNotify.js",*/
        "w:c:de.harry-grangers-test:MediaWiki:Customization.js"
    ]
});

$(function() {
    var rights = {
        'Agent Zuri'       : ['Technischer Admin'],
        'Jannina'          : ['Gründerin','inaktiv'],
        'Castor Castrorus' : ['Admin'],
        'Harry granger'    : ['Admin', 'Bürokratin'],
        'Sorunome'         : ['Technischer Admin', 'Bürokrat'],
        'ElBosso'          : ['Wikia-Mitarbeiter'],
        'Wikia'            : ['Wikia-Bot']
    },
        newrights = rights[mw.config.get('wgTitle')];
 
    if ( typeof newrights != 'undefined' ) {
        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();
 
        for ( var i in newrights ) {
            // add new rights
            $('<span />', { class: 'tag', css: { marginLeft: '10px' }, html: newrights[i] }).appendTo( '.masthead-info hgroup' );
        }
    }
});
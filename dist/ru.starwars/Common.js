// importScript('User:Grunny/ajaxcloakrequest.js');

// onload stuff
/*
var firstRun = true;

function loadFunc() {
    if (firstRun) {
        firstRun = false;
    } else {
        return;
    }

    window.pageName = wgPageName;
    window.storagePresent = (typeof (globalStorage) != 'undefined');

    // DEPRECATED
    if (document.getElementById('infoboxinternal') !== null && document.getElementById('infoboxend') !== null) {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Скрыть]</a>';
    }

/*    // Upload form - need to run before adding hide buttons
   if (wgCanonicalSpecialPageName === 'Upload') {
        setupUploadForm();
    }
*//*
    addHideButtons();

    if (document.getElementById('mp3-navlink') !== null) {
        document.getElementById('mp3-navlink').onclick = onArticleNavClick;
        document.getElementById('mp3-navlink').getElementsByTagName('a')[0].href = 'javascript:void(0)';
    }

    if (window.storagePresent) {
        initVisibility();
    }

    fillEditSummaries();
    fillPreloads();

    substUsername();
    substUsernameTOC();
    rewriteTitle();
    showEras('title-eraicons');
    showEras('title-shortcut');
    rewriteHover();
    addAlternatingRowColors();
    // replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
    fixSearch();
//    hideContentSub();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if (!bodyClass || (bodyClass.indexOf('page-') === -1)) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if (typeof (onPageLoad) != "undefined") {
        onPageLoad();
    }
}
*/
//------------------------------------
// Кнопка сворачивания инфобокса
//--
/*
function infoboxToggle() {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;

    if (document.getElementById('infoboxtoggle').innerHTML == '[Скрыть]') {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Открыть]';
        nowShown = false;
    } else {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Скрыть]';
        nowShown = true;
    }

    if (window.storagePresent) {
        var storage = globalStorage[window.location.hostname];
        storage.setItem('infoboxshow-' + page, nowShown);
    }
}
*/
//--


//------------------------------------
/*
function fillEditSummaries() {
    var label = document.getElementById("wpSummaryLabel");

    if (label === null) return;

    var comboString = "Standard summaries: <select id='stdSummaries' onchange='onStdSummaryChange()'>";
    comboString += "</select><br />";
    label.innerHTML = comboString + label.innerHTML;

    requestComboFill('stdSummaries', 'Template:Stdsummaries');
}
*/

/*
function onStdSummaryChange() {
    var value = $('#stdSummaries').val();

    if (value !== "") {
        $('#wpSummary').val(value);
    }
}
*/
//--


//------------------------------------
// Скрипт для переписывания наименования страницы, отредактирован Grunny
//--
/*
function rewriteTitle() {
    if (typeof (window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
        return;
    }

    if ($('#title-meta').length === 0) {
        return;
    }

    var newTitle = $('#title-meta').html();
    if (skin == "oasis") {
        $('header.WikiaPageHeader > h1').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('header.WikiaPageHeader > h1').attr('style', 'text-align:' + $('#title-align').html() + ';');
    } else {
        $('.firstHeading').html('<div id="title-meta" style="display: inline;">' + newTitle + '</div>');
        $('.firstHeading').attr('style', 'text-align:' + $('#title-align').html() + ';');
    }
}
*/

/*
function showEras(className) {
    if (skin == 'oasis') {
        return;
    }

    if (typeof (SKIP_ERAS) != 'undefined' && SKIP_ERAS) return;

    var titleDiv = document.getElementById(className);

    if (titleDiv === null || titleDiv === undefined) return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
*/
//--
// Конец скрипта
//------------------------------------


/*
// повторяется ниже

function initVisibility() {
    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        var content = getElementsByClass('hidable-content', hidables[i]);
        var button = getElementsByClass('hidable-button', hidables[i]);

        if (content !== null && content.length > 0 && button !== null && button.length > 0 && content[0].style.display == 'none') {
            button[0].onclick('bypass');
        }
    }
}
*/
/*
function onArticleNavClick() {
    var div = document.getElementById('mp3-nav');

    if (div.style.display == 'block') div.style.display = 'none';
    else div.style.display = 'block';
}
*/
/*
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
*/

/* функция сворачивания/разворачивания скрываемых блоков */
function toggleHidable(bypassStorage) {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if (content !== null && content.length > 0) {
        content = content[0];

        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Скрыть]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Открыть]';
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

/*
function substUsernameTOC() {
    var toc = document.getElementById('toc');
    var userpage = document.getElementById('pt-userpage');

    if (!userpage || !toc) return;

    var username = userpage.firstChild.firstChild.nodeValue;
    var elements = getElementsByClass('toctext', toc, 'span');

    for (var i = 0; i < elements.length; i++)
    elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}
*/
/* Автоматическое обновление */
window.AjaxRCRefreshText = 'Автоматическое обновление';
window.AjaxRCRefreshHoverText = 'Включить автообновление при загрузке';
window.ajaxSpecialPages = ["Recentchanges","WikiActivity"];
importScriptPage('AjaxRC/code.js', 'dev');


//------------------------------------
// Ссылка на избранную статью (может не работать в нашей вики)
/*
var FA_enabled = true;

function addfaicon() {
    // if disabled
    if (!FA_enabled) return;
    var pLang = document.getElementById("p-lang");
    if (!pLang) return;
    var lis = pLang.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        var li = lis[i];
        // only links with a corresponding Link_FA template are interesting
        if (!document.getElementById(li.className + "-fa")) continue;
        // additional class so the template can be hidden with CSS
        li.className += " FA";
        // change title (mouse over)
        li.title = "Эта статья является избранной.";
    }
}
addOnloadHook(addfaicon);
*/

/* замена на странице шаблона {{USERNAME}} на имя участника, открывшего страницу */
function substUsername() 
{
    $('.insertusername').html(wgUserName);
}
/*
function substUsernameTOC() {
    var toc = $('#toc');
    var userpage = $('#pt-userpage');

    if (!userpage || !toc) return;

    var username = $('#pt-userpage').children(':first-child').html();
    $('span.toctext:not(:has(*)), span.toctext i', toc).each(function () {
        $(this).html($(this).html().replace('<insert name here>', username));
    });
}
*/
/************************************************************
 * Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/
/*
function getElementsByClass(searchClass, node, tag) {
    var classElements = [];

    if (node === null) node = document;

    if (tag === null) tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for (i = 0, j = 0; i < elsLen; i++) {
        if (tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}
*/
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
*/
/*
function getFirstHeading() {
    var elements = getElementsByClass('firstHeading', document.getElementById('content'), 'h1');
    return (elements !== null && elements.length > 0) ? elements[0] : null;
}
*/
/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;

    while (node !== null && node != document) {
        if (tester.isMatch(node)) return node;

        node = node.parentNode;
    }

    return null;
}

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

//------------------------------------
// Добавляет в шапку при редактировании избранной и хорошей статьи предупреждающий шаблон
// Модификации для Monaco и Monobook написаны Sikon
// Редактирование разделов: Green tentacle
// Поддержка нового скина: Grunny
//--
/*
function addEditIntro(name) {
    // Top link
    if (skin == 'oasis') {
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
*/
/*
$(function () {
    if (wgNamespaceNumber === 0) {
        var cats = document.getElementById('mw-normal-catlinks');
        if (!cats) {
            return;
        }
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title === 'Категория:Вукипедия:Избранные_статьи') {
                addEditIntro('Template:Featured_editintro');
                break;
            } else if (cats[i].title === 'Category:Wookieepedia good articles') {
                addEditIntro('Template:Good_editintro');
                break;
            } else if (cats[i].title === 'Category:Articles undergoing major edits' || cats[i].title === 'Category:Works in progress') {
                addEditIntro('Template:Inuse_editintro‎');
                break;
            } else if (wgPageName === 'Template:DYK editintro') {
                addEditIntro('Template:Good_editintro');
                break;
            }
        }
    } else if (wgPageName === 'Template:DidYouKnow') {
        addEditIntro('Template:DYK_editintro');
    }
});
*/
// Конец скрипта
//------------------------------------


/** Отключение вкладки редактирования архива
 * Отключает вкладку редактирования на старых топиках форума
 * топик можно отредактировать иными способами
 * к примеру, вбив вручную команду в адресную строку
 * Сделано [[:en:User:Spang|Spang]]
 * Версия для Monaco [[:en:User:Uberfuzzy|User:Uberfuzzy]]
 * Версия для Oasis [[:en:User:Uberfuzzy|User:Uberfuzzy]]
 * Скрытие кнопки редактирования разделов на страницах обсуждения написано [[User:Grunny|Grunny]]
 * User:/User talk: поддерживают новый стиль оформления [[User:Grunny|Grunny]]
 */
 /*
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
*/
//Removes the "Featured on:" line on File pages -- By Grunny
/*
addOnloadHook(function () 
{
    if (wgNamespaceNumber == 6 && $('#file').length !== 0) {
        $('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
    }
});
*/
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/5/51/Ico_angle_qoutation_marks.png",
            "speedTip": "Кавычки",
            "tagOpen": "«",
            "tagClose": "»",
            "sampleText": "Текст"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/e/e6/Ico_interlang.png",
            "speedTip": "Межъязыковые ссылки",
            "tagOpen": "{{Interlang|en=",
            "tagClose": "         }}",
            "sampleText": ""
    };
    
    mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/b/b0/Button_canon.png",
		"speedTip": "Приписка Канон для гиперссылок",
		"tagOpen": "[[/Канон|",
		"tagClose": "]]",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/6/68/Кнопка_скобок.png",
		"speedTip": "Гиперссылка",
		"tagOpen": "[[|",
		"tagClose": "]]",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/6/61/Кнпока_ланг-ен.png",
		"speedTip": "Название оригинальной статьи",
		"tagOpen": "({{lang-en|",
		"tagClose": "}})",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/6/6f/Иконка_цитат.png",
		"speedTip": "Цитаты",
		"tagOpen": "{{Цитата|",
		"tagClose": "||}}",
		"sampleText": ""
	};
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://vignette.wikia.nocookie.net/ru.starwars/images/6/63/Ico_dash.png",
		"speedTip": "Тире",
		"tagOpen": "—",
		"sampleText": ""
	};
};


/* показать/скрыть строки в таблице при щелчке по определённой ссылке  (от Grunny) */
$(function () 
{
    if (!$('.timeline-toggles').length) {
        return;
    }
    $('.timeline-toggles').find('td > a').click(function () {
        var hideBtnClass = $(this).parent().attr('class'),
            $hideContent = $('tr.' + hideBtnClass);
        if (!$hideContent.length) {
            return;
        }
        $hideContent.toggle();
        if ($(this).text().indexOf('скрыть') >= 1) {
            $(this).text($(this).text().replace('скрыть', 'показать'));
        } else {
            $(this).text($(this).text().replace('показать', 'скрыть'));
        }
    });
});

/* скрывает ссылку под главным заголовком с страниц с припиской /Канон */
function hideContentSub() 
{
    // декодируем адрес страницы
    var s = decodeURIComponent( document.location.href );
    
    // если в адресе страницы есть НЕ основное пространство имён
    if ( s.indexOf('wiki/Обсуждение') >0 )
    {
        return;
    }
    
    // копируем 6 символов с конца
    s= s.substr( -6, 6);
 
    // если скопированная часть = /Канон
    if ( s === '/Канон'){
        // скрываем ссылку 
        // $("#WikiaPageHeader h2").hide();
         $("div.page-header__page-subtitle").hide();
    }
}
/**
 *Сворачивание шаблонов App и Credits
 **/
function getElementsByClass(searchClass, node, tag) {
    var classElements = new Array();

    if (node == null) node = document;

    if (tag == null) tag = '*';

    var els = node.getElementsByTagName(tag);
    var elsLen = els.length;
    var tester = new ClassTester(searchClass);

    for (i = 0, j = 0; i < elsLen; i++) {
        if (tester.isMatch(els[i])) {
            classElements[j] = els[i];
            j++;
        }
    }

    return classElements;
}
/*
function initVisibility() {
    var page = window.pageName.replace(/\W/g, '_');
    var show = localStorage.getItem('infoboxshow-' + page);

    if (show == 'false') {
        infoboxToggle();
    }

    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        show = localStorage.getItem('hidableshow-' + i + '_' + page);

        if (show == 'false') {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if (content != null && content.length > 0 && button != null && button.length > 0 && content[0].style.display != 'none') {
                button[0].onclick('bypass');
            }
        } else if (show == 'true') {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if (content != null && content.length > 0 && button != null && button.length > 0 && content[0].style.display == 'none') {
                button[0].onclick('bypass');
            }
        }
    }
}
*/
/*
function onArticleNavClick() {
    var div = document.getElementById('mp3-nav');

    if (div.style.display == 'block') div.style.display = 'none';
    else div.style.display = 'block';
}
*/
/*
function addAlternatingRowColors() {
    var infoboxes = getElementsByClass('infobox', document.getElementById('content'));

    if (infoboxes.length == 0) return;

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
*/
function addHideButtons() {
    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if (button != null && button.length > 0) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Скрыть]'));

            if (new ClassTester('start-hidden').isMatch(box)) button.onclick('bypass');
        }
    }
}
/*
function toggleHidable(bypassStorage) {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if (content != null && content.length > 0) {
        content = content[0];

        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Скрыть]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Показать]';
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

            localStorage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}
*/
$(function () {
    addHideButtons();
});

// смена фона страницы в зависимости от времени суток
(function($) {
    'use strict';

    // случайный пункт из списка ссылок
    var  i = Math.floor( Math.random() * 17);

    $('body.skin-oasis').addClass("BodyImg"+i);

})(this.jQuery);

// выполнение при готовности страницы
$(document).ready(function()
{  
    //-----------------------------------------------------------------------------------------------
/*
    // скрипт обработки выпадающего меню (НАЧАЛО)
    // функция при наведении на иконку категории -- меню появляется
    $(" .CatalogCategItem").mouseenter (function ()
    {
        $('.KategMenu', this).slideDown( 210 ) ;
    });
   
    // функция при уходе с иконки категории -- меню пропадает
    $(" .CatalogCategItem").mouseleave (function ()
    {
        $('.KategMenu', this).slideUp( 210 ) ;
    });
    // скрипт обработки выпадающего меню (КОНЕЦ)
*/    
    //-----------------------------------------------------------------------------------------------
    // изменение ширины военного шаблона в зависимости от кол-ва колонок (НАЧАЛО)

	// находим все военные модули на странице
	oWarModules  = $("aside.pi-theme-WAR");
	// вызываем функцию для каждого найденного модуля 
 
	oWarModules.each(
	function()
	{
		// находим кол-во столбцов в 1й таблице модуля
		iCountTD = $("table.pi-horizontal-group:first td.pi-horizontal-group-item", this).length;
 
		// присваиваем стиль в зависимости от найденого кол-ва столбцов
		switch (iCountTD) {
			case 3:
			$(this).addClass("pi-theme-WAR350");
			break;
 
			case 4:
			$(this).addClass("pi-theme-WAR400");
			break;
		}
	});
	
	// изменение ширины военного шаблона в зависимости от кол-ва колонок (КОНЕЦ)
	
	//-----------------------------------------------------------------------------------------------
	// улучшение качества картинок в инфобоксах (НАЧАЛО)

    // если на странице есть инфобоксы
    if ( $( '.portable-infobox' ).length > 0) 
    {
        // находим каждый инфобокс на странице
        $( '.pi-image img' ).each( 
           function() 
           {
               // если картинка инфобокса мелкая, выходим из функции
               if ( $( this ).attr('width') <200 ) 
               {
                 return;
               }
               
               // путь для новой картинки
               var new_url;
               // объект-картинка
               var oImg = $( this );
               
               // в инфобоксе находим путь к картинке и вычисляем новую высоту ($1500 = 500 пкс.)
               new_url = oImg.attr( 'src' ).replace( /(thumb\/|scale-to-width(-down)?\/)\d{1,3}/g, '$1500' );
               // меняем значение в атрибуте
               oImg.attr( 'src', new_url );

               // находим путь к картинке с указанной плотностью пикселей и вычисляем новую высоту ($1500 = 500 пкс.)
               new_url = oImg.attr( 'srcset' ).replace( /(thumb\/|scale-to-width(-down)?\/)\d{1,3}/g, '$1500' );
               // меняем значение в атрибуте
               oImg.attr( 'srcset', new_url );
               
               // растяниваем картинку во всю ширину инфобокса
               oImg.css( 'width', '100%');
               // подгоняемв высоту картинки
               oImg.css( 'height', 'auto');
               
           }
        );
    }
	// улучшение качества картинок в инфобоксах (КОНЕЦ)
	
    //-----------------------------------------------------------------------------------------------
    // добавление на страницу панели (слева) для быстрого перемещения вверх/вниз (НАЧАЛО)
    
	// добавляем сам прокрутчик
	$(".WikiaSiteWrapper").prepend("<div id='Scroller' title='Панель быстрой навигации по странице'></div>");	
	// добавляем иконку прокрутчика
	$(".WikiaSiteWrapper").prepend("<div id='ScrollerText' ></div>");	
	
	// вызываем функций прокруткаи страницы для загрузки соот-щей иконки
	$(document).scroll();
 
    // функция при щелчке
    $(" #Scroller, #ScrollerText").click (function ()
    {
		iPosition = $( document ).scrollTop();
		
		if (iPosition === 0) {
			// прокручиваем документ, не доходя но "подвала"
			$(document).scrollTop( $( document ).height() - $( "footer.wds-global-footer" ).height() - $( "#mixed-content-footer" ).height() - document.documentElement.clientHeight  );
		}
		else{
			// прокручиваем документ в самый верх
			$(document).scrollTop(0);
		}
		
    });
    
    //-----------------------------------------------------------------------------------------------
    // добавление на страницу панели (слева) для быстрого перемещения вверх/вниз (КОНЕЦ)
    
    // скрывает ссылку под главным заголовком с страниц с припиской /Канон 
    hideContentSub();
    
    // вставляет имя пользователя в Шаблон:УЧАСТНИК 
    substUsername();
    
    // если открыта страница загрузки изображения
    if (wgCanonicalSpecialPageName === 'Upload') 
    {
        importScript('MediaWiki:Wikificator.js');
        
        // список лицензий
        var selector = document.getElementById("wpLicense");
        // поле краткого описания изображения
        var memo ;
        // шаблон выбранной лицензии 
        var selection;
            
        // добавление шаблона в поле краткого описания для загружаемого изображения
        $('#wpUploadDescription').val('{{Информация\n|внимание=\n|описание=\n|источник=\n|автор=\n|спецификация=\n|лицензирование={{Fairuse}}\n|другие версии=\n|кат художник=\n|кат лицензиат=\n|кат субъект=\n|кат тип=\n}}').css('height', '250px');
        // перемещение выпадающего списка лицензий и блока для шаблона выбранной лицензии 
        $("tr.mw-htmlform-field-HTMLTextAreaField").after( $("tr.mw-htmlform-field-Licenses, tr.mw-htmlform-field-Licenses + tr") );
        //выбранный пункт по умолчанию
        selector.selectedIndex =13;

        $("#wpLicense").change(function(e) 
        {
            selection = selector.options[selector.selectedIndex].title;
            
            memo = $('#wpUploadDescription');
            // вставка шаблона выбранной лицензии в поле краткого описания
            memo.val(  memo.val().replace(/\|лицензирование=(.*)/, '|лицензирование='+ selection )  );
        }
        );  
        // при щелчке по кнопке "Загрузить"
        $("input[name=wpUpload]").click(function(e) 
        {
            // обнуление список лицензий, чтобы не дублировалась вконце краткого описания
            document.getElementById("wpLicense").selectedIndex = 0;
        });  
        // добавление кнопки автозамены категорий
        $('#wpUploadDescription').after('<div class="mw-toolbar-editbutton" title="Автоматический перевод названий категорий" id="btn_categorizer" onclick="Wikify(\'CATEG\');">Обработать категории</div>');
    }
    
    // если страница переименована
    if (wgCanonicalSpecialPageName === 'Movepage') 
    {
        $('input[name=wpMove]').click(function() {
            /* типы сообщений:
            - notify -- напоминание (флаг)
            - confirm -- ОК (галочка)
            - error -- ошибка (крест)
            - warn -- предупреждение (восклицательный знак)
            */
            // выводим спадающее сообщение 
            //new BannerNotification( 'Не забудьте переименовать страницу изображений!','warn').show();
            
            alert('Не забудьте переименовать страницу изображений!');
        });
    }
    
    // если страница редактируется
    if (wgAction == 'edit' || wgAction == 'submit') 
    {
        importScript('MediaWiki:Wikificator.js');

        // добавление на палень инструментов кнопки вукификатора
        $('#cke_toolbar_source_1').append('<img src="https://vignette.wikia.nocookie.net/ru.starwars/images/7/73/Projects_wm_logo.svg" title="Викификатор" alt="Викификатор" id="btn_wikifikator2" class="mw-toolbar-editbutton" onclick="Wikify(\'WIKIFY\');">');
        
        // добавление на палень инструментов кнопки сменты курсива на ёлочки
        $('#cke_toolbar_source_1').append('<img src="https://vignette.wikia.nocookie.net/ru.starwars/images/b/bd/Ico_italic_to_quotes.png" title="Автозамена курсива на кавычки" alt="Автозамена кавычек" id="btn_quoter" class="mw-toolbar-editbutton" onclick="Wikify(\'QUOTES\');">');
    }
    
    // если на странице есть шаблон {inuse}
    if (wgCategories.includes('Активно редактирующиеся статьи') == true 
        && ( 
             ($('#iduser').text()!== wgUserName || wgUserName=== null) 
             && 
             (mw.config.get('wgUserGroups').indexOf('sysop') === -1 || mw.config.get('wgUserGroups').indexOf('content-moderator') === -1)
           )
       )
    {
       $('#ca-edit, #ca-ve-edit, #wpSave').before('<span class="wds-button wds-button-dissabled" title="Статья недоступна для редактирования, т.к. была зарезервирована другим участником!">Правка недоступна</span>').detach();
       $('span.editsection').detach();
    }
});

// обработчик прокрутки страницы
$(document).scroll(function()
{
	iPosition = $( document ).scrollTop();
	
	if (iPosition === 0) {
		$('#ScrollerText').removeClass( 'ico_up');
		$('#ScrollerText').addClass( 'ico_down');
	}
	else{
		$('#ScrollerText').removeClass( 'ico_down');
		$('#ScrollerText').addClass( 'ico_up');
	}
});

// импорт скрипта с англо-ауребешевском конвертером
//importScript('MediaWiki:Convert_ENG-AUR.js');


// импорт скрипта с таймером
//importScript('MediaWiki:Timer.js');

// импорт скрипта с интерактивной картой галактики
//importScript('MediaWiki:GalMap.js');

// если на странице имеются таймеры (шаблон {{таймер}} )
if ( $(".TimerCountDown").length > 0)
{
    // импорт скрипта с таймером
    importScript('MediaWiki:Timer.js');
}

// если на странице имеется англо-ауребешевский конвертер
if ( $("#aurebesh_converter").length > 0 ) 
{
	importScript('MediaWiki:Convert_ENG-AUR.js');
}

// если на странице открыта интерактивная карта галактики (шаблон {{GM}} )
if ( $("#GalaxyMapDatabase").length > 0)
{
    importScript('MediaWiki:GalMap.js');
}

// добавление на страницу мобильного списка заголовков 
if (  $("#WikiaArticle H2 span.mw-headline").length > 0)
{
    importScript('MediaWiki:CaptList.js');
}
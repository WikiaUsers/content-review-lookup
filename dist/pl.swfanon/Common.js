/* Umieszczony tutaj kod JavaScript zostanie załadowany przez każdego użytkownika, podczas każdego ładowania strony. */
/* Kod JS został zapożyczony z Wookieepedii */
/* <pre><nowiki> */
// onload stuff
var firstRun = true;

function loadFunc() {
    if (firstRun) {
        firstRun = false;
    } else {
        return;
    }

    window.pageName = wgPageName;
    window.storagePresent = (typeof(localStorage) != 'undefined');

    // DEPRECATED
    if (document.getElementById('infoboxinternal') !== null && document.getElementById('infoboxend') !== null) {
        document.getElementById('infoboxend').innerHTML = '<a id="infoboxtoggle" href="javascript:infoboxToggle()">[Ukryj]</a>';
    }

    // Upload form - need to run before adding hide buttons
    if (wgCanonicalSpecialPageName === 'Upload') {
        setupUploadForm();
    }

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
    // replaceSearchIcon(); this is now called from MediaWiki:Monobook.js
    fixSearch();
    hideContentSub();

    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;

    if (!bodyClass || (bodyClass.indexOf('page-') === -1)) {
        var page = window.pageName.replace(/\W/g, '_');
        body.className += ' page-' + page;
    }

    if (typeof(onPageLoad) != "undefined") {
        onPageLoad();
    }
}

function infoboxToggle() {
    var page = window.pageName.replace(/\W/g, '_');
    var nowShown;

    if (document.getElementById('infoboxtoggle').innerHTML == '[Ukryj]') {
        document.getElementById('infoboxinternal').style.display = 'none';
        document.getElementById('infoboxtoggle').innerHTML = '[Pokaż]';
        nowShown = false;
    } else {
        document.getElementById('infoboxinternal').style.display = 'block';
        document.getElementById('infoboxtoggle').innerHTML = '[Ukryj]';
        nowShown = true;
    }

    if (window.storagePresent) {
        localStorage.setItem('infoboxshow-' + page, nowShown);
    }
}

/**
 * jQuery version of Sikon's fillEditSummaries
 * @author Grunny
 */
function fillEditSummaries() {

    if (!$('#wpSummaryLabel').length) {
        return;
    }

    $.get(mw.config.get('wgScript'), {
        title: 'Template:Stdsummaries',
        action: 'raw',
        ctype: 'text/plain'
    }).done(function(data) {
        var $summaryOptionsList,
            $summaryLabel = $('#wpSummaryLabel'),
            lines = data.split('\n'),
            $wrapper = $('<div>').addClass('edit-widemode-hide').text('Standard summaries: ');

        $summaryOptionsList = $('<select />').attr('id', 'stdEditSummaries').change(function() {
            var editSummary = $(this).val();
            if (editSummary !== '') {
                $('#wpSummary').val(editSummary);
            }
        });

        for (var i = 0; i < lines.length; i++) {
            var editSummaryText = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
            $summaryOptionsList.append($('<option>').val(editSummaryText).text(lines[i]));
        }

        $summaryLabel.prepend($wrapper.append($summaryOptionsList));
    });

}
importArticles({
    type: 'script',
    articles: [
        'MediaWiki:Summaries.js',
        'u:pl.tes:MediaWiki:Change.js'
    ]
});
/**
 * jQuery version of Sikon's fillPreloads
 * @author Grunny
 */
function fillPreloads() {

    if (!$('#lf-preload').length) {
        return;
    }

    $('#lf-preload').attr('style', 'display: block');

    $.get(wgScript, {
        title: 'Template:Stdpreloads',
        action: 'raw',
        ctype: 'text/plain'
    }).done(function(data) {
        var $preloadOptionsList,
            lines = data.split('\n');

        $preloadOptionsList = $('<select />').attr('id', 'stdSummaries').change(function() {
            var templateName = $(this).val();
            if (templateName !== '') {
                templateName = 'Template:' + templateName + '/preload';
                templateName = templateName.replace(' ', '_');
                $.get(wgScript, {
                    title: templateName,
                    action: 'raw',
                    ctype: 'text/plain'
                }).done(function(data) {
                    insertAtCursor(document.getElementById('wpTextbox1'), data);
                });
            }
        });

        for (var i = 0; i < lines.length; i++) {
            var templateText = (lines[i].indexOf('-- ') === 0) ? lines[i].substring(3) : '';
            $preloadOptionsList.append($('<option>').val(templateText).text(lines[i]));
        }

        $('#lf-preload-cbox').html($preloadOptionsList);
    });

    $('#lf-preload-pagename').html('<input type="text" class="textbox" />');
    $('#lf-preload-button').html('<input type="button" class="button" value="Insert" onclick="doCustomPreload()" />');

}

function doCustomPreload() {
    var value = $('#lf-preload-pagename > input').val();
    value = value.replace(' ', '_');
    $.get(wgScript, {
        title: value,
        action: 'raw',
        ctype: 'text/plain'
    }).done(function(data) {
        insertAtCursor(document.getElementById('wpTextbox1'), data);
    });
}

// ============================================================
// BEGIN JavaScript title rewrite -- jQuery version and new wikia skin fixes by Grunny

function rewriteTitle() {
    if (typeof(window.SKIP_TITLE_REWRITE) != 'undefined' && window.SKIP_TITLE_REWRITE) {
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

function showEras(className) {
    if (skin == 'oasis') {
        return;
    }

    if (typeof(SKIP_ERAS) != 'undefined' && SKIP_ERAS)
        return;

    var titleDiv = document.getElementById(className);

    if (titleDiv === null || titleDiv === undefined)
        return;

    var cloneNode = titleDiv.cloneNode(true);
    var firstHeading = getFirstHeading();
    firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
    cloneNode.style.display = "block";
}
// END JavaScript title rewrite

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

            if (content !== null && content.length > 0 &&
                button !== null && button.length > 0 && content[0].style.display != 'none') {
                button[0].onclick('bypass');
            }
        } else if (show == 'true') {
            var content = getElementsByClass('hidable-content', hidables[i]);
            var button = getElementsByClass('hidable-button', hidables[i]);

            if (content !== null && content.length > 0 &&
                button !== null && button.length > 0 && content[0].style.display == 'none') {
                button[0].onclick('bypass');
            }
        }
    }
}

function onArticleNavClick() {
    var div = document.getElementById('mp3-nav');

    if (div.style.display == 'block')
        div.style.display = 'none';
    else
        div.style.display = 'block';
}

function addHideButtons() {
    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');

        if (button !== null && button.length > 0) {
            button = button[0];

            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Ukryj]'));

            if (new ClassTester('start-hidden').isMatch(box))
                button.onclick('bypass');
        }
    }
}

function toggleHidable(bypassStorage) {
    var parent = getParentByClass('hidable', this);
    var content = getElementsByClass('hidable-content', parent);
    var nowShown;

    if (content !== null && content.length > 0) {
        content = content[0];

        if (content.style.display == 'none') {
            content.style.display = content.oldDisplayStyle;
            this.firstChild.nodeValue = '[Ukryj]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Pokaż]';
            nowShown = false;
        }

        if (window.storagePresent && (typeof(bypassStorage) == 'undefined' || bypassStorage != 'bypass')) {
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

/*
    Replaces {{USERNAME}} with the name of the user browsing the page.
    Requires copying Template:USERNAME.
*/
function substUsername() {
    if (wgUserName) {
        $('.insertusername').text(wgUserName);
    }
}

function substUsernameTOC() {
    var toc = $('#toc');
    var userpage = $('#pt-userpage');

    if (!userpage || !toc)
        return;

    var username = $('#pt-userpage').children(':first-child').text();
    $('span.toctext:not(:has(*)), span.toctext i', toc).each(function() {
        $(this).text($(this).text().replace('<insert name here>', username));
    });
}

function fixSearch() {
    var button = document.getElementById('searchSubmit');

    if (button)
        button.name = 'go';
}

/**
 * Start upload form customisations
 * @author Green tentacle
 */

function setupUploadForm() {
    // Check if cookie has been set for form style. Overrides URL parameter if set.
    var formstyle = localStorage.getItem("uploadform");

    $("#uploadBasicLinkJS").show();
    $("#uploadTemplateNoJS").hide();

    var wpLicense = $('#wpLicense');

    if (wpLicense.length && window.location.search.indexOf('wpForReUpload=1') == -1) {
        if (formstyle == "guided" || (formstyle == "" && window.location.search.indexOf('basic=true') == -1)) {
            // Add link to basic form
            $("#uploadtext").prepend('<div style="float: right;" id="uploadBasicLinkJS"><a href="http://starwars.wikia.com/index.php?title=Special:Upload&basic=true" onclick="javascript:localStorage.setItem(\'uploadform\', \'basic\')">Switch to basic upload form</a></div>');

            // Stretch table to full width
            $('#mw-htmlform-description').css('width', '100%');


            // Check for duplicated or capitalized file extensions
            if (wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg\.jpg|png\.png|gif\.gif|svg\.svg)$/)) {
                alert('Prosimy nie używać wielkich liter w rozszerzeniu pliku ani nie stosować podwójnych rozszerzeń.');
                return false;
            }
        }
    }
}

function verifyName() {
    var wpDestFile = document.getElementById('wpDestFile');
    var wpLicense = document.getElementById('wpLicense');

    // Check for duplicated or capitalized file extensions
    if (wpDestFile.value.match(/(JPG|PNG|GIF|SVG|jpg.jpg|png.png|gif.gif|svg.svg)$/)) {
        alert('Prosimy nie używać wielkich liter w rozszerzeniu pliku ani nie stosować podwójnych rozszerzeń.');
        return false;
    }

    // Check for annoying characters
    if (wpDestFile.value.match(/(\(|\)|!|\?|,|\+|\'|\’)/)) {
        alert('Prosimy nie stosować znaków niepochodzących z klawiatury alfanumerycznej.');
        return false;
    }
    if (wpLicense.value != '') {
        $('#wpUploadDescription').val(
            $('#wpUploadDescription').val().replace('|licensing=', '|licensing=' + wpLicense.options[wpLicense.selectedIndex].title)
        );

        wpLicense.selectedIndex = 0;
    }
    return true;
}

/**
 * End upload form customisations
 */

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
    var classElements = new Array();

    if (node == null)
        node = document;

    if (tag == null)
        tag = '*';

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

function ClassTester(className) {
    this.regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
}

ClassTester.prototype.isMatch = function(element) {
        return this.regex.test(element.className);
    }
    /*
        end getElementsByClass
    */

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
    return (elements != null && elements.length > 0) ? elements[0] : null;
}

/*
    Returns the element's nearest parent that has the specified CSS class.
*/
function getParentByClass(className, element) {
    var tester = new ClassTester(className);
    var node = element.parentNode;

    while (node != null && node != document) {
        if (tester.isMatch(node))
            return node;

        node = node.parentNode;
    }

    return null;
}

/*
    Performs dynamic hover class rewriting to work around the IE6 :hover bug
    (needs CSS changes as well)
*/
function rewriteHover() {
    var gbl = document.getElementById("hover-global");

    if (gbl == null)
        return;

    var nodes = getElementsByClass("hoverable", gbl);

    for (var i = 0; i < nodes.length; i++) {
        nodes[i].onmouseover = function() {
            this.className += " over";
        }
        nodes[i].onmouseout = function() {
            this.className = this.className.replace(new RegExp(" over\\b"), "");
        }
    }
}
/************************************************************
 * End old Functions.js stuff
 * Deprecated, most of these functions will be removed slowly
 ************************************************************/

$(loadFunc);

//Link FA

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
        li.title = "This article is rated as featured article.";
    }
}
addOnloadHook(addfaicon);

/* Magic edit intro. Copied from Wikipedia's MediaWiki:Common.js
 * modified for use in both Monaco and Monobook skins by Sikon
 * Section edit links added by Green tentacle
 * New Wikia skin support by Grunny
 */
function addEditIntro(name) {
    // Top link
    if (skin == 'oasis') {
        $('a[data-id="edit"]').attr('href', $('a[data-id="edit"]').attr('href') + '&editintro=' + name);
        $('span.editsection > a').each(function() {
            $(this).attr('href', $(this).attr('href') + '&editintro=' + name);
        });
    } else {
        var el = document.getElementById('ca-edit');

        if (typeof(el.href) == 'undefined') {
            el = el.getElementsByTagName('a')[0];
        }

        if (el)
            el.href += '&editintro=' + name;

        // Section links
        var spans = document.getElementsByTagName('span');
        for (var i = 0; i < spans.length; i++) {
            el = null;

            if (spans[i].className == 'editsection') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el)
                    el.href += '&editintro=' + name;
            } else if (spans[i].className == 'editsection-upper') {
                el = spans[i].getElementsByTagName('a')[0];
                if (el)
                    el.href += '&editintro=' + name;
            }
        }
    }
}

$(function() {
    if (wgNamespaceNumber === 0) {
        var cats = document.getElementById('catlinks');
        if (!cats) {
            return;
        }
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title === 'Category:Wookieepedia featured articles') {
                addEditIntro('Template:Featured_editintro');
                break;
            } else if (cats[i].title === 'Category:Wookieepedia good articles') {
                addEditIntro('Template:Good_editintro');
                break;
            } else if (cats[i].title === 'Category:Wookieepedia comprehensive articles') {
                addEditIntro('Template:Comprehensive_editintro');
                break;
            } else if (cats[i].title === 'Category:Articles undergoing major edits' || cats[i].title === 'Category:Works in progress') {
                addEditIntro('Template:Inuse_editintro');
                break;
            } else if (cats[i].title === 'Category:Legends articles with canon counterparts') {
                addEditIntro('Template:Legends_editintro');
                break;
            } else if (cats[i].title === 'Category:Canon articles with Legends counterparts') {
                addEditIntro('Template:Canon_editintro');
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

// [[Main Page]] JS transform. Originally from [[Wikipedia:MediaWiki:Monobook.js]]/[[Wikipedia:MediaWiki:Common.js]] and may be further modified for local use.
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

if (wgTitle == 'Main Page' && (wgNamespaceNumber == 0 || wgNamespaceNumber == 1)) {
    addOnloadHook(mainPageRenameNamespaceTab);
}

/** Archive edit tab disabling *************************************
 * Disables the edit tab on old forum topic pages to stop noobs bumping old topics.
 * Page can still be edited by going via the edit tab on the history etc, or by 
 * typing the edit address manually.
 * By [[User:Spang|Spang]]
 * Monaco support by [[User:Uberfuzzy|]]
 * Oasis support by [[User:Uberfuzzy|]]
 * Removal of section edit buttons and new section tab on talk pages added by [[User:Grunny|Grunny]]
 * User:/User talk: support and styling in new skin by [[User:Grunny|Grunny]]
 */
function disableOldForumEdit() {
    if (typeof(enableOldForumEdit) != 'undefined' && enableOldForumEdit) {
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
            $("#WikiaPageHeader .wikia-menu-button a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
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
addOnloadHook(function() {
    if (wgNamespaceNumber == 6 && $('#file').length != 0) {
        $('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
    }
});

/**
 * Show/hide for media timeline -- Grunny
 **/
$(function() {
    if (!$('.timeline-toggles').length) {
        return;
    }
    $('.timeline-toggles').find('td > a').click(function() {
        var hideBtnClass = $(this).parent().attr('class'),
            $hideContent = $('tr.' + hideBtnClass);
        if (!$hideContent.length) {
            return;
        }
        $hideContent.toggle();
        if ($(this).text().indexOf('hide') >= 1) {
            $(this).text($(this).text().replace('hide', 'show'));
        } else {
            $(this).text($(this).text().replace('show', 'hide'));
        }
    });
});

// Lazy load SWTOR article appearances list
$(function lazyLoadTorApp() {
    var pageName = 'Star_Wars:_The_Old_Republic',
        appPageName = encodeURIComponent(pageName + '/Appearances'),
        $lazyLoadEl = $('#WookTorLazyload'),
        includeHtml,
        $editLink;
    if (mw.config.get('wgPageName') !== pageName || !$lazyLoadEl.length) {
        return;
    }

    $lazyLoadEl.html('<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" alt="Loading..." />');
    $.getJSON('/api.php?action=parse&page=' + appPageName + '&format=json')
        .done(function(data) {
            if (data.parse && data.parse.text) {
                includeHtml = data.parse.text['*'];
                $lazyLoadEl.html(includeHtml);
                addHideButtons();
                $editLink = $lazyLoadEl.prev('h2').find('.editsection a');
                if ($editLink.length) {
                    $editLink.attr('href', '/index.php?title=' + appPageName + '&action=edit');
                }
            }
        });
});

/**
 * Hides the link to parent pages from subpages if {{HideContentSub}} is included
 **/
function hideContentSub() {
    if (mw.config.get('wgNamespaceNumber') === 0 || $('#hideContentSub').length > 0) {
        if (mw.config.get('skin') === 'oasis') {
            if ($('#WikiaPageHeader h2').text().substring(0, 1) === "<") {
                var $wikiaHeader = $('#WikiaPageHeader h2'),
                    $backToPageLink;
                if (mw.config.get('wgNamespaceNumber') % 2 === 1) {
                    // ugly hack to only leave back to page link on talk pages
                    $backToPageLink = $wikiaHeader.find('a[accesskey="c"]');
                    $wikiaHeader.html('').append($backToPageLink);
                } else {
                    $wikiaHeader.hide();
                }
            }
        } else {
            if ($('#contentSub span.subpages').text().substring(0, 1) === "<") {
                $('#contentSub span.subpages').hide();
            }
        }
    }
}

// Related Categories
$(function() {
    if (document.getElementById("related-catlinks")) {
        document.getElementById("catlinks").appendChild(document.getElementById("related-catlinks"));
    }
});

// EDITBUTTONS (kod zapożyczony z Dawno, dawno temu Wiki)
var ExMenu = $('.WikiaPageHeader ul.WikiaMenuElement'),
    ExMenu_Links = '<li><a href="?veaction=edit"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-desktop "></span> VisualEditor</a></li>' +
    '<li><a href="?action=delete"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-trash-o "></span> Usuń</a></li>' +
'<li><a href="/wiki/Special:MovePage/' + wgPageName +'"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-reply "></span> Zmień nazwę</a></li>' +
'<li><a href="?action=protect"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-lock "></span> Zabezpiecz</a></li>' +
'<li><a href="?action=history"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-book "></span> Historia</a></li>' +
'<li><a href="/wiki/Special:WhatLinksHere/' + wgPageName +'"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-link "></span> Linkujące</a></li>' +
'<li><a href="?action=purge"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-clock-o "></span> Odśwież</a></li>' +
'<li><a href="?action=raw&ctype=text/javascript"><span style="width: 20px; text-align: center; display: inline-block;" class="fa fa-code "></span> Surowa wersja</a></li>';
 
if (wgUserGroups != 'null') {
ExMenu.html(ExMenu_Links);
}
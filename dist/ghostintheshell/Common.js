importScript('MediaWiki:Functions.js');
var firstRun = true;

function loadFunc() {
    if (firstRun)
        firstRun = false;
    else
        return;
    initFunctionsJS();
    addHideButtons();
    fillPreloads();
    substUsername();
    substUsernameTOC();
    rewriteTitle();
    addAlternatingRowColors();
    var body = document.getElementsByTagName('body')[0];
    var bodyClass = body.className;
    if (!bodyClass || (bodyClass.indexOf('page-') == -1)) {
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
    if (infoboxes.length === 0)
        return;
    for (var k = 0; k < infoboxes.length; k++) {
        var infobox = infoboxes[k];
        var rows = infobox.getElementsByTagName('tr');
        var changeColor = false;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].className.indexOf('infoboxstopalt') != -1)
                break;
            var ths = rows[i].getElementsByTagName('th');
            if (ths.length > 0) {
                continue;
            }
            if (changeColor)
                rows[i].style.backgroundColor = '#f9f9f9';
            changeColor = !changeColor;
        }
    }
}

function addHideButtons() {
    var hidables = getElementsByClass('hidable');
    for (var i = 0; i < hidables.length; i++) {
        var box = hidables[i];
        var button = getElementsByClass('hidable-button', box, 'span');
        if (button !== null && button.length > 0) {
            button = button[0];
            button.onclick = toggleHidable;
            button.appendChild(document.createTextNode('[Hide]'));
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
            this.firstChild.nodeValue = '[Hide]';
            nowShown = true;
        } else {
            content.oldDisplayStyle = content.style.display;
            content.style.display = 'none';
            this.firstChild.nodeValue = '[Show]';
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
            var storage = globalStorage[window.location.hostname];
            storage.setItem('hidableshow-' + item + '_' + page, nowShown);
        }
    }
}

function substUsernameTOC() {
    var toc = document.getElementById('toc');
    var userpage = document.getElementById('pt-userpage');
    if (!userpage || !toc)
        return;
    var username = userpage.firstChild.firstChild.nodeValue;
    var elements = getElementsByClass('toctext', toc, 'span');
    for (var i = 0; i < elements.length; i++)
        elements[i].firstChild.nodeValue = elements[i].firstChild.nodeValue.replace('<insert name here>', username);
}
addOnloadHook(loadFunc);

window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:Log',
    'Special:NewFiles'
];

function addEditIntro(name) {
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
        var cats = document.getElementById('mw-normal-catlinks');
        if (!cats)
            return;
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title == 'Category:Ghost in the Shell Wiki Featured articles') {
                addEditIntro('Template:Featured_editintro');
                break;
            }
        }
    }
});

if (wgTitle == 'Main Page' && (wgNamespaceNumber === 0 || wgNamespaceNumber == 1)) {
    try {
        var Node = document.getElementById('ca-nstab-main').firstChild;
        if (Node.textContent) {
            Node.textContent = 'Main Page';
        } else if (Node.innerText) {
            Node.innerText = 'Main Page';
        } else {
            Node.replaceChild(Node.firstChild, document.createTextNode('Main Page'));
        }
    } catch (e) {}
}

$(function disableOldForumEdit() {
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
            $("#WikiaPageHeader .wikia-menu-button li a:first").html('Archived').removeAttr('href').attr('style', 'color: darkgray;');
            $('span.editsection').remove();
            return;
        }
    }
    if (!document.getElementById('ca-edit')) {
        return;
    }
    if (skin == 'monobook') {
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
});

$(function() {
    if (wgNamespaceNumber == 6 && $('#file').length !== 0) {
        $('#file').html($('#file').html().replace(/Featured on\:(.*?)\<br\>/, ''));
    }
});


$(function() {
    if (wgPageName == 'Special:Upload') {
        $('#wpUploadDescription').text("==Summary==\r\n{{Information\r\n|attention=\r\n|description=\r\n|source=\r\n|author=\r\n|filespecs=\r\n|licensing=\r\n|other versions=\r\n|categories=\r\n}}");
    }
});

if (mwCustomEditButtons) {
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
// <nowiki>
/**
 * 이 스크립트는 일부 편집기에 나타나는 간단한 상용구 입력 버튼을 변경하는 것이
 * 목적입니다.
 * 자세한 정보는 https://www.mediawiki.org/wiki/Extension:CharInsert에서
 * 찾을 수 있습니다.
 * This is a very ancient code and broken currently.
 * 아주 예전 코드라 망가져 있습니다.
 * 
 * Any JavaScript here will be loaded for all users on every page load.
 */

/* 시작: Edittool Bars */
// [[MediaWiki:Edittools]]와 동시 편집 (순서 바꾸지 않기를!)
function addCharSubsetMenu() {
    var specialchars = document.getElementById('specialchars');
    if (specialchars) {
        var menu =
            '<select style="display:inline" onChange="chooseCharSubset(selectedIndex)">';
        menu += '<option>위키 문법</option>';
        menu += '<option>문장 부호</option>';
        menu += '<option>특수 기호</option>';
        menu += '<option>틀</option>';
        menu += '<option>특수 함수</option>';
        menu += '<option>내용 꾸미기</option>';
        menu += '<option>기타</option>';
        menu += '<option>정비 요망</option>';
        menu += '</select>';
        specialchars.innerHTML = menu + specialchars.innerHTML;
        chooseCharSubset(0);
    }
}
function chooseCharSubset(s) {
    var l = document.getElementById('specialchars').getElementsByTagName('p');
    for (var i = 0; i < l.length; i++) {
        l[i].style.display = i == s ? 'inline' : 'none';
        l[i].style.visibility = i == s ? 'visible' : 'hidden';
    }
}
/* 끝: Edittool Bars */
/* 시작: Edittool-bar 옮기기 */
// Cookie
function SetCookie(cookieName, cookieValue) {
    var today = new Date();
    var expire = new Date();
    var nDays = 30;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    document.cookie =
        cookieName +
        '=' +
        escape(cookieValue) +
        ';expires=' +
        expire.toGMTString();
}
function GetCookie(name) {
    var i = 0;
    while (i < document.cookie.length) {
        if (document.cookie.substr(i, name.length) == name) {
            var valend = document.cookie.indexOf(';', i + name.length + 1);
            if (valend == -1) {
                valend = document.cookie.length;
            }
            return unescape(
                document.cookie.substring(i + name.length + 1, valend)
            );
        }
        i = document.cookie.indexOf(' ', i) + 1;
        if (i == 0) break;
    }
}
function chooseCharSubset(ss) {
    s = parseInt(ss);
    if (isNaN(s)) s = 0;
    if (SpecCharsAccesskeys.length == 0) {
        if (is_opera)
            SpecCharsAccesskeys = new Array(
                '!',
                '"',
                '§',
                '$',
                '%',
                '&',
                '/',
                '(',
                ')',
                '='
            );
        else
            SpecCharsAccesskeys = new Array(
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '0',
                '!',
                '"',
                '§',
                '$',
                '%',
                '&',
                '/',
                '(',
                ')',
                '='
            );
    }
    if (s >= 0) {
        var l = document
            .getElementById('specialchars')
            .getElementsByTagName('p');
        for (var i = 0; i < l.length; i++) {
            if (i == s) {
                l[i].style.display = 'inline';
                SetArrayAccessKeys(
                    l[i].getElementsByTagName('a'),
                    SpecCharsAccesskeys
                );
            } else l[i].style.display = 'none';
        }
        SetCookie('CharSubset', s);
    }
}
// Accesskeys
function SetArrayAccessKeys(elements, keys) {
    for (var i = 0; i < elements.length; i++) {
        if (i < keys.length) {
            elements[i].setAttribute('accessKey', keys[i]);
            elements[i].setAttribute('title', 'alt-' + keys[i]);
        } else {
            elements[i].setAttribute('accessKey', '');
            elements[i].setAttribute('title', '');
        }
    }
}
SpecCharsAccesskeys = new Array();
function addCharSubsetMenu() {
    var SpecCharsMove = true;
    var edittools = document.getElementById('specialchars');
    if (edittools) {
        var name;
        var menu = document.createElement('select');
        menu.style.display = 'inline';
        var line = edittools.getElementsByTagName('p');
        for (var i = 0; i < line.length; i++) {
            if (
                line[i].className == 'specialbasic' ||
                line[i].className == 'speciallang'
            ) {
                if (line[i].title) name = line[i].title;
                else name = line[i].id;
                menu.options[menu.options.length] = new Option(name);
            }
        }
        menu.onchange = function () {
            chooseCharSubset(this.selectedIndex);
        };
        if (SpecCharsMove) {
            edittools.insertBefore(menu, edittools.firstChild);
        } else {
            edittools.insertAfter(menu, edittools.firstChild);
        }
        var stdsubset = 0;
        if (GetCookie('CharSubset'))
            stdsubset = parseInt(GetCookie('CharSubset'));
        if (isNaN(stdsubset)) stdsubset = 0;
        menu.options[stdsubset].selected = true;
        chooseCharSubset(stdsubset);
        var charlinks = document
            .getElementById('toolbar')
            .getElementsByTagName('a');
        for (var i = 0; i < charlinks.length; i++) {
            charlinks[i].setAttribute('tabindex', 8);
        }
    }
}
addOnloadHook(addCharSubsetMenu);
//  Toolbar 옮기기
function elementMoveto(node, refNode, pos) {
    if (node && refNode) {
        var parent = refNode.parentNode;
        if (pos && pos == 'after') refNode = refNode.nextSibling;
        try {
            parent.insertBefore(node, refNode);
        } catch (DOMException) {}
    }
}
// Toolbar 고정
function fixToolbar() {
    var wpEditToolbar = document.getElementById('toolbar');
    var dropdownListEditTools = document.getElementById(
        'dropdownListEditTools'
    );
    elementMoveto(dropdownListEditTools, wpEditToolbar, 'after');
    if (dropdownListEditTools) dropdownListEditTools.style.display = 'block';
    var editspecialchars = document.getElementById('specialchars');
    elementMoveto(editspecialchars, wpEditToolbar, 'after');
}
addOnloadHook(fixToolbar);
/* 끝: Edittool-bar 옮기기 */
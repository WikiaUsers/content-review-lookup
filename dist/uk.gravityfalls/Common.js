/* Розміщений тут код JavaScript буде завантажений всім користувачам при зверненні до будь-якої сторінки */
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Taken from Wikipedia's Common.js.
 */
 
var autoCollapse = 2;
var collapseCaption = "скрыть";
var expandCaption = "показать";
 
function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);
 
    if (!Table || !Button) {
        return false;
    }
 
    var Rows = Table.rows;
 
    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = "none";
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}
 
$(function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = {};
    var Tables = document.getElementsByTagName("table");
 
    for (var i = 0; i < Tables.length; i++) {
        if ($(Tables[i]).hasClass("collapsible")) {
 
            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;
 
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
 
            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);
 
            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "7em";
 
            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);
 
            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));
 
            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }
 
    for (var i = 0; i < tableIndex; i++) {
        if ($(NavigationBoxes[i]).hasClass("collapsed") || (tableIndex >= autoCollapse && $(NavigationBoxes[i]).hasClass("autocollapse"))) {
            collapseTable(i);
        }
    }
});

/* Auto updating recent changes opt-in
 * See w:c:dev:AjaxRC for info & attribution 
 */

window.AjaxRCRefreshText = 'Автооновлення';
window.AjaxRCRefreshHoverText = 'Автоматично оновляти сторінку';
window.ajaxPages = ["Служебная:RecentChanges", "Служебная:WikiActivity"];

/************* Wikify *************/

function addWikifButton() {
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return;
    var i = document.createElement('img');
    i.src = 'http://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
    i.alt = i.title = 'Білофікатор';
    i.onclick = Wikify;
    i.style.cursor = 'pointer';
    toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
        importScriptURI('//ru.wikipedia.org/w/index.php?title=MediaWiki:Gadget-wikificator.js&action=raw&ctype=text/javascript');
        addOnloadHook(addWikifButton);
}

/* Linking to subsections in other tabs
help from http://community.wikia.com/wiki/Thread:614000 */

/**
 * Link to tab
 *   By [[User:AnimatedCartoons]]
 */
$(function () {
    'use strict';

    setTimeout(function () {
        if (location.hash === '' && $('.tabberlive').length !== 1) {
            return;
        }

        var $nav = $('.tabbernav li'),
            $div = $('.tabberlive .tabbertab'),
            url = location.href;

        url = url.slice(url.indexOf('?tab=') + 5, url.indexOf('#'));

        $($nav[url]).addClass('tabberactive');
        $($div[url]).removeClass('tabbertabhide');

        for (var i = 0; i < $nav.length; i++) {
            if (parseInt(url, 10) !== i) {
                $($nav[i]).removeClass('tabberactive');
                $($div[i]).addClass('tabbertabhide');
            }
        }

        location.hash = location.hash;
    }, 1000);
});
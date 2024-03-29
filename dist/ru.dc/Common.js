/* Неактивные участники спустя 3 месяца */
window.InactiveUsers = {
    months: 3,
    text: 'Неактивен'
};

/* Кнопка «Наверх» */
window.BackToTopModern = true;

/* Слайдер */
mw.loader.using( ['oojs-ui-windows'], function() {
    $( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    $(function() {
        var $tabs = $("#slider").tabs({ fx: {opacity:'toggle', duration:100} });
        $("[class^=portal_sliderlink]").click(function() {
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 );
            return false;
        });
        $('#prev').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 );
            return false;
        });
    });
});

/* Иконки */
$(function() {
    if ( mw.config.get( 'wgVersion' ) !== '1.19.24' && $( '#title-eraicons' ).length ) {
        $( '.page-header__contribution > div' ).first().append( $( '#title-eraicons' ).show() );
    } else if ( $( '.wds-community-header' ).length ) {
		$( '.page-header' ).prepend(
		$( '#icons' ).attr( 'style', 'position: absolute; right: 70px;' )
	);
	} else {
		$( '.page-header' ).append( $( '#icons' ) );
		$( '#icons' ).css( { 'position' : 'absolute', 'bottom' : '-2em' } ).show();
}
});

/* Делает активной последнюю вкладку панели */
$(document).ready(function () {
    $('.pi-theme-lastpanel .wds-tabs__tab.wds-is-current, .pi-theme-lastpanel .wds-tab__content.wds-is-current').removeClass('wds-is-current')
    $('.pi-theme-lastpanel .wds-tabs__tab:last-child, .pi-theme-lastpanel .wds-tab__content:last-child').addClass('wds-is-current')
});

/* Добавление кнопки викификатора */
function addWikifButton() {
    var toolbar = document.getElementById('toolbar');
    if (!toolbar) return;
    var i = document.createElement('img');
    i.src = 'https://upload.wikimedia.org/wikisource/ru/d/d1/Button-wikifikator.png';
    i.alt = i.title = 'викификатор';
    i.onclick = Wikify;
    i.style.cursor = 'pointer';
    toolbar.appendChild(i);
}
if (wgAction == 'edit' || wgAction == 'submit') {
    importScriptURI('https://ru.wikipedia.org/w/index.php?title=MediaWiki:Wikificator.js&action=raw&ctype=text/javascript');
    addOnloadHook(addWikifButton);
}

/* Динамические навбоксы */
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

var autoCollapse = 2;
var collapseCaption = "Свернуть";
var expandCaption = "Показать";

function collapseTable(tableIndex) {
    var Button = document.getElementById("collapseButton" + tableIndex);
    var Table = document.getElementById("collapsibleTable" + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.getElementsByTagName("tr");

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

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {
            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.style.styleFloat = "right";
            Button.style.cssFloat = "right";
            Button.style.fontWeight = "normal";
            Button.style.textAlign = "right";
            Button.style.width = "6em";

            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            var Header = Tables[i].getElementsByTagName("tr")[0].getElementsByTagName("th")[0];
            if (Header) {
                Header.insertBefore(Button, Header.childNodes[0]);
                tableIndex++;
            }
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        }
    }
}
addOnloadHook(createCollapseButtons);

var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
var NavigationBarShowDefault = autoCollapse;

function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }

    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
        ) {
            if (hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
            if (hasClass(NavChild, 'NavContent')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;

    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (
            var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling
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

function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var divs = document.getElementsByTagName("div");
    for (
        var i = 0; NavFrame = divs[i]; i++
    ) {
        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var NavToggleText = document.createTextNode(NavigationBarHide);
            NavToggle.appendChild(NavToggleText);
            for (
                var j = 0; j < NavFrame.childNodes.length; j++
            ) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
    if (NavigationBarShowDefault < indexNavigationBar) {
        for (
            var i = 1; i <= indexNavigationBar; i++
        ) {
            toggleNavigationBar(i);
        }
    }

}
addOnloadHook(createNavigationBarToggleButton);
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/* By GodRich 27.03.2018 */

// Добавление к внешним ссылкам автоматическое открытие в новой вкладке
$(function() {
    if ($('.link-external').length) {
        $('.link-external').attr('target', '_blank');
    }
});

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *	https://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
var autoCollapse = 2;
var collapseCaption = 'скрыть';
var expandCaption = 'показать';

function collapseTable(tableIndex) {
    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table = document.getElementById('collapsibleTable' + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.rows;

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = 'none';
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
    var Tables = document.getElementsByTagName('table');

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], 'collapsible')) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName('tr')[0];
            if (!HeaderRow) {
                continue;
            }
            var Header = HeaderRow.getElementsByTagName('th')[0];
            if (!Header) {
                continue;
            }

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);

            var Button = document.createElement('span');
            var ButtonLink = document.createElement('a');
            var ButtonText = document.createTextNode(collapseCaption);

            Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
            ButtonLink.setAttribute('href', "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode('['));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode(']'));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], 'collapsed') || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], 'autocollapse'))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], 'innercollapse')) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, 'outercollapse')) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}

addOnloadHook(createCollapseButtons);

/****************************************/
/* tables span */
/****************************************/
$(function() {
    $('.collapsible-element-container').each(function() {
        if (!($(this).hasClass('no-collapse'))) {
            $(this).find('.collapsible-element').hide();
        }
        $(this).find('.collapsible-element-trigger').click(function() {
            $(this).parent().find('.collapsible-element').slideToggle(500);
        });
    });
});

/*************************************************/
/****************** Слайдеры *********************/
/*************************************************/
mw.loader.using(['jquery.ui.tabs'], function() {
    $("[class^=portal_vtab]").tabs().addClass("ui-tabs-vertical ui-helper-clearfix");
    $("[class^=portal_vtab] li").removeClass("ui-corner-top").addClass("ui-corner-left");
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') === 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

/*************************************************/
/****************** Прокрутка ********************/
/*************************************************/
$('.GamesArrowLeft').click(function() {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({
        'scrollLeft': scroll - 284
    }, 100);
});
$('.GamesArrowRight').click(function() {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({
        'scrollLeft': scroll + 284
    }, 100);
});
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
/*************************************************/
/************ Sliders на jqueryUI ****************/
/*************************************************/
mw.loader.using( ['oojs-ui-windows'], function() {
	$(document).ready(function() {
		$(".portal_slider").each(function(index, portal_slider) {
			$(portal_slider).tabs({ fx: {opacity:'toggle', duration:100} } );
			$("[class^=portal_sliderlink]").click(function() {
				$(portal_slider).tabs('select', this.className.replace("portal_sliderlink_", ""));
				return false;
			});
			$(portal_slider).find('#portal_next').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') == ($(portal_slider).tabs('length'))-1) ? 0 : $(portal_slider).tabs('option', 'selected') + 1 );
				return false;
			});
			$(portal_slider).find('#portal_prev').click(function() {
				$(portal_slider).tabs('select', ($(portal_slider).tabs('option', 'selected') === 0) ? ($(portal_slider).tabs('length')-1) : $(portal_slider).tabs('option', 'selected') - 1 );
				return false;
			});
		}); 
	});
});

// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history

/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *               [[Wikipedia:NavFrame]].
 *  Maintainers: [[User:R. Koot]]
 */

var autoCollapse = 1;
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
    var collapseIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

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
            Button.style.width = "5em";
            Button.className = "t_show_hide";

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
            ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode("["));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode("]"));

            Header.insertBefore(Button, Header.childNodes[0]);

            if (!hasClass(Tables[i], "nocount")) {
                collapseIndex++;
            }
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], "collapsed") || (collapseIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], "innercollapse")) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, "outercollapse")) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
});

// ============================================================
// END Collapsible tables
// ============================================================

/* Плашки */
//добавляет новые "статусы" участников, и, опционально - картинки к ним. Прав не даёт.
//Originaly made for ru-Mass Effect Wiki http://ru.masseffect.wikia.com/ 
//Images inserting added by Wildream
$(function() {
    var rights = {};
    var image = {};
    var ImgStart = '<a href="http://ru.masseffect.wikia.com/wiki/Блог_участника:V.V.S./Командная_работа"><img src=" ';
    var ImgEnd = '"></a>';

    rights["R256S"] = ["ЖУКОКРАТ"];
    image["R256S"] = [ImgStart + 'https://images.wikia.nocookie.net/masseffect/ru/images/4/42/N7MasteryBanner.png' + ImgEnd];
    rights["Mercenary2811"] = ["Ветеран ME wiki"];
    rights["Iskandra"] = ["Специалист по протеанам"];
    image["%D0%90%D0%BD%D0%BD%D0%B0%D1%8D%D0%B9%D1%80%D0%B0"] = ['https://vignette.wikia.nocookie.net/masseffect/images/0/02/Navi_toruk.png/revision/latest?cb=20171015174252&path-prefix=ru'];

    if (typeof rights[wgTitle] != "undefined") {

        // remove old rights
        $('.UserProfileMasthead .masthead-info span.tag').remove();

        for (var i = 0, len = rights[wgTitle].length; i < len; i++) {

            if (typeof image[wgTitle] != "undefined") {

                // add new rights
                $('<span class="tag">' + rights[wgTitle][i] + '</span><span style="position:relative; left:60px;">' + image[wgTitle] + '</span>').appendTo('.masthead-info hgroup');
            } else {
                // add new rights
                $('<span class="tag">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
            }
        }
    }

});

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

/* Дополнительные варианты в поиске */

/* Закрытие блога для комментирования */
if (wgPageName != "Блог_участника:V.V.S./Командная_работа") {
    window.LockOldBlogs = {
        expiryDays: 30,
        expiryMessage: "Этот блог был неактивен в течение <expiryDays> дней. Просьба не редактировать его.",
        nonexpiryCategory: "Заархивированные блоги"
    };
}

/* Удаление ссылки изображения вместе с изображением */


// Fixes a weird bug with the MW parser that adds lots of empty parapgraphs
$('.switch-infobox > p, .switch-infobox-triggers > p').each(function() {
    if ($(this).children('br').length) {
        $(this).remove();
    } else {
        $(this).replaceWith(this.innerHTML);
    }
});

// Appends the switch triggers to every item
$('.switch-infobox').each(function() {
    // The switch triggers
    var triggers = $(this).children('.switch-infobox-triggers');

    $(this).children('.item').find('caption').append(triggers);
});

// Does the actual switching
$('.switch-infobox').find('.switch-infobox-triggers').children('.trigger').click(function() {
    // The parent .switch-infobox of the clicked trigger
    var parentSwitchInfobox = $(this).parents('.switch-infobox');
    // Hides items showing
    parentSwitchInfobox.children('.item.showing').removeClass('showing');
    // Show the relevant item
    parentSwitchInfobox.children('.item[data-id="' + this.getAttribute('data-id') + '"]').addClass('showing');
});

// Finishes loading and makes switch infoboxes functional
$('.switch-infobox.loading').removeClass('loading');

//Custom achievements module. Made for ru.masseffect.wikia.com by Wildream.
var element = document.getElementsByClassName('AchievementsModule');
if (element) {
    if (skin == "FandomDesktop" && wgNamespaceNumber == 2 && wgPageName == "Участник:V.V.S.") { //Вместо "Имя участника" нужно, соответственно, ввести имя участника, у которого будут отображаться эти ачивки
        addOnloadHook(AddCustomAchievements);
    }

    function AddCustomAchievements() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><tr><td><div class="custom-achievements-VVS-1" /><td><div class="custom-achievements-VVS-2" /><td><div class="custom-achievements-VVS-3" /></td><tr><td><div class="custom-achievements-VVS-4" /></tr></table></p></div></section>').insertAfter('.AchievementsModule');
    }


    if (skin == "FandomDesktop" && wgNamespaceNumber == 2 && wgPageName == "Участник:R256S") {
        addOnloadHook(AddCustomAchievements3);
    }

    function AddCustomAchievements3() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-R256S-1" /><td><div class="custom-achievements-R256S-2" /></table></p></div></section>').insertAfter('.ChatModule');
    }
    if (skin == "FandomDesktop" && wgNamespaceNumber == 2 && wgPageName == "Участник:Nidred") {
        addOnloadHook(AddCustomAchievements4);
    }

    function AddCustomAchievements4() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-Nidred-1" /><td><div class="custom-achievements-Nidred-2" /></table></p></div></section>').insertAfter('.AchievementsModule');
    }
    if (skin == "FandomDesktop" && wgNamespaceNumber == 2 && wgPageName == "Участник:Mercenary2811") {
        addOnloadHook(AddCustomAchievements5);
    }

    function AddCustomAchievements5() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-Mercenary2811-1" /><td><div class="custom-achievements-Mercenary2811-2" /></table></p></div></section>').insertAfter('.AchievementsModule');
    }

    if (skin == "FandomDesktop" && wgNamespaceNumber == 2 && wgPageName == "Участник:Iskandra") {
        addOnloadHook(AddCustomAchievements6);
    }

    function AddCustomAchievements6() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-Iskandra-1" /><td><div class="custom-achievements-Iskandra-2" /></table></p></div></section>').insertAfter('.AchievementsModule');
    }
}

if (skin == "FandomDesktop" && wgNamespaceNumber == 2 && wgPageName == "Участник:Аннаэйра") {
        addOnloadHook(AddCustomAchievements7);
    }

    function AddCustomAchievements7() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><tr><td><div class="custom-achievements-annaeira-1" /></td></table></p></div></section>').insertAfter('.AchievementsModule');
    }


//Wildream's few scripts
$('body').append('<span id="reapersound" style="display:none;"></span>');

$('#blocklaser').hover(function() {
    document.getElementById('reapersound').innerHTML = '<audio src="https://images.wikia.nocookie.net/wildreamtestfacility/ru/images/a/a6/Mass_Effect_3_-_Reaper_laser.ogg" autoplay=""></audio>';
});

((window.dev = window.dev || {}).ReferencePopups = dev.ReferencePopups || {}).lockdown = true;



function initVisibility() {
    var storage = globalStorage[window.location.hostname];

    var page = window.pageName.replace(/\W/g, '_');
    var show = storage.getItem('infoboxshow-' + page);

    if (show == 'false') {
        infoboxToggle();
    }

    var hidables = getElementsByClass('hidable');

    for (var i = 0; i < hidables.length; i++) {
        show = storage.getItem('hidableshow-' + i + '_' + page);

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

/* Tooltip code by Wildream */
$('.article-tooltip').mouseover(function() {
    $('.article-tooltip-hidden').fadeIn(400);
});
$('.article-tooltip').mouseout(function() {
    $('.article-tooltip-hidden').fadeOut(400);
});
$('.article-tooltip').mousemove(
    function(a) {
        if (a.pageX === null && a.clientX !== null) {
            var html = document.documentElement;
            var body = document.body;

            a.pageX = a.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
            a.pageY = a.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
        }
        $('.article-tooltip-hidden').css({
            left: a.pageX - 150,
            top: a.pageY - 270
        });
    });

//Emoticons link
if (wgPageName == 'Служебная:Chat') {
    $('.public').append('<a class="EmoLinks" href="/wiki/MediaWiki:Emoticons" target="_blank">Смайлики!</a>');
    $('.EmoLinks').css({
        'position': 'relative',
        'left': '400px'
    });
}

//Scrolls Games left and right
$('.GamesArrowLeft').click(function() {
    $('.GamesCarousel').each(function() {
        var _el = $( this ),
            _s = $( this ).scrollLeft();

		_el.animate({
			'scrollLeft': _s - 284
		}, 0);
	});
});
//Scrolls Games left and right
$('.GamesArrowRight').click(function() {
    $('.GamesCarousel').each(function() {
        var _el = $( this ),
            _s = $( this ).scrollLeft();

		_el.animate({
			'scrollLeft': _s + 284
		}, 0);
	});
});

if (wgPageName == "Участник:V.V.S.") {
    $('body').css('background', 'url(https://vignette.wikia.nocookie.net/masseffect/images/c/c2/Фон_Тучанка.png/revision/latest?cb=20131114191116&path-prefix=ru) no-repeat center center fixed #000000');
}
if (wgPageName == "Участник:R256S") {
    $('body').css('background', 'url(https://vignette.wikia.nocookie.net/masseffect/images/9/9a/Капсулы_на_корабле_Коллекционеров.jpg/revision/latest?cb=20140221210745&path-prefix=ru) no-repeat center center fixed #000000');
}

/*************************************************/
/* spoilers by User:Tierrie from Dragon Age Wiki */
/*************************************************/

var showSpoiler = new Array();

function showSpoilers(splrType) {
    var Divs = document.getElementsByTagName("div");
    for (i = 0; i < Divs.length; i++) {
        // allows the child to be something besides a div (a table for example)
        if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_' + splrType)) {
            var warning = Divs[i].childNodes[0].childNodes[1];
            warning.className = warning.className.replace('show_warning', 'hide_warning');

            var spoiler = Divs[i].childNodes[1];
            spoiler.className = spoiler.className.replace('hide_spoiler', 'show_spoiler');
        }
    }
    document.cookie = 'showspoiler_' + splrType + '=1; path=/';
}

function hideSpoilers(splrType) {
    var Divs = document.getElementsByTagName("div");
    for (i = 0; i < Divs.length; i++) {

        // allows the child to be something besides a div (a table for example)
        if (hasClass(Divs[i], 'splr') && hasClass(Divs[i].childNodes[0], 'splr_' + splrType)) {
            var warning = Divs[i].childNodes[0].childNodes[1];
            warning.className = warning.className.replace('hide_warning', 'show_warning');

            var spoiler = Divs[i].childNodes[1];
            spoiler.className = spoiler.className.replace('show_spoiler', 'hide_spoiler');
        }
    }
    document.cookie = 'showspoiler_' + splrType + '=0; path=/';
}

function toggleSpoilers(ev) {
    var splrType = this.className.split('_')[1];
    showSpoiler[splrType] = showSpoiler[splrType] ? 0 : 1;
    if (showSpoiler[splrType])
        showSpoilers(splrType);
    else
        hideSpoilers(splrType);
    //ev.target.focus(); /* focus back on the element because large spoilers tend to move the page around */
}

function initSpoilers() {
    var Divs = document.getElementsByTagName("div");
    for (i = 0; i < Divs.length; i++) {
        if (hasClass(Divs[i], 'splr')) {
            Divs[i].childNodes[0].onclick = toggleSpoilers;

            var warning = Divs[i].childNodes[0].childNodes[1];
            warning.className = warning.className.replace('hide_warning', 'show_warning');

            var spoiler = Divs[i].childNodes[1];
            spoiler.className = spoiler.className.replace('show_spoiler', 'hide_spoiler');
        }
    }

    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        // a name/value pair (a crumb) is separated by an equal sign
        if (cookies[i].indexOf('showspoiler') != -1) {
            var crumbs = cookies[i].split("=");
            var splrType = crumbs[0].split('_')[1]; /* cookie="showspoiler_me=1", crumbs[0] = "showspoiler_me", splrType="me" */
            var splrValue = parseInt(crumbs[1]);

            showSpoiler[splrType] = splrValue;
            if (splrValue)
                showSpoilers(splrType);
            else
                hideSpoilers(splrType);
        }
    }
}

var spoilers = true;

function loadSpoilers() {
    if (spoilers) initSpoilers();
}
addOnloadHook(loadSpoilers);
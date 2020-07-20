/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

/* WAM 
importArticles({
    type: 'script',
    articles: [
        'u:dev:RailWAM/code.js'
    ]
});

window.railWAM = {
    logPage:"Project:WAM Log"
};

*/

/* ВК Виджет «Мне нравится» — начало 

importScriptURI("http://vk.com/js/api/openapi.js?121");
window.onload = function() {
    VK.init({
        apiId: 5347266,
        onlyWidgets: true
    });
    $('<div id="vk_like"></div><script type="text/javascript">VK.Widgets.Like("vk_like", {type: "mini"});</script>').insertAfter('#WikiaPageHeader > .talk');
};
*/
/* ВК Виджет «Мне нравится» — конец */

/* Автообновление — начало */

window.AjaxRCRefreshText = 'Автообновление';
window.AjaxRCRefreshHoverText = 'Включить автообновление страницы';
window.ajaxPages = [
    "Служебная:RecentChanges",
    "Служебная:WikiActivity",
    "Служебная:NewFiles"
];

/* Автообновление — конец */

// *****************************************************
// * Experimental javascript countdown timer (Splarka) *
// * Version 0.0.3                                     *
// *****************************************************
//
// Usage example:
//  <span class="countdown" style="display:none;">
//  Only <span class="countdowndate">January 01 2007 00:00:00 PST</span> until New years.
//  </span>
//  <span class="nocountdown">Javascript disabled.</span>

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
    }
    
    var tpm = '';
    
    // Calculate the diff - Modified by Eladkse
    if ((diff % 60) == 1) {
        left = (diff % 60) + ' секунды';
    } else {
        left = (diff % 60) + ' секунда';
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 60) == 1) {
            left = (diff % 60) + ' минута, и ' + left;
        } else {
            left = (diff % 60) + ' минут, и ' + left;
        }
    }
    diff = Math.floor(diff / 60);
    if (diff > 0) {
        if ((diff % 24) == 1) {
            left = (diff % 24) + ' час, ' + left;
        } else {
            left = (diff % 24) + ' часов, ' + left;
        }
    }
    diff = Math.floor(diff / 24);
    if (diff > 0) {
        if (diff == 1) {
            left = diff + ' день, ' + left;
        } else {
            left = diff + ' дней, ' + left;
        }
    }
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length === 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

// **************************************************
//  - end -  Experimental javascript countdown timer
// **************************************************

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

window.InactiveUsers = {
    months: 1,
    text: 'НЕАКТИВНЫЙ УЧАСТНИК'
};

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
    if (skin == "oasis" && wgNamespaceNumber == 2 && wgPageName == "Участник:V.V.S.") { //Вместо "Имя участника" нужно, соответственно, ввести имя участника, у которого будут отображаться эти ачивки
        addOnloadHook(AddCustomAchievements);
    }

    function AddCustomAchievements() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><tr><td><div class="custom-achievements-VVS-1" /><td><div class="custom-achievements-VVS-2" /><td><div class="custom-achievements-VVS-3" /></td><tr><td><div class="custom-achievements-VVS-4" /></tr></table></p></div></section>').insertAfter('.AchievementsModule');
    }


    if (skin == "oasis" && wgNamespaceNumber == 2 && wgPageName == "Участник:R256S") {
        addOnloadHook(AddCustomAchievements3);
    }

    function AddCustomAchievements3() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-R256S-1" /><td><div class="custom-achievements-R256S-2" /></table></p></div></section>').insertAfter('.ChatModule');
    }
    if (skin == "oasis" && wgNamespaceNumber == 2 && wgPageName == "Участник:Nidred") {
        addOnloadHook(AddCustomAchievements4);
    }

    function AddCustomAchievements4() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-Nidred-1" /><td><div class="custom-achievements-Nidred-2" /></table></p></div></section>').insertAfter('.AchievementsModule');
    }
    if (skin == "oasis" && wgNamespaceNumber == 2 && wgPageName == "Участник:Mercenary2811") {
        addOnloadHook(AddCustomAchievements5);
    }

    function AddCustomAchievements5() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-Mercenary2811-1" /><td><div class="custom-achievements-Mercenary2811-2" /></table></p></div></section>').insertAfter('.AchievementsModule');
    }

    if (skin == "oasis" && wgNamespaceNumber == 2 && wgPageName == "Участник:Iskandra") {
        addOnloadHook(AddCustomAchievements6);
    }

    function AddCustomAchievements6() {
        $('<section class="CustomAchievements module"><h1 style="margin-top:0px; margin-bottom:10px;">Отличительные медали этого участника</h1><div><p><table><td><div class="custom-achievements-Iskandra-1" /><td><div class="custom-achievements-Iskandra-2" /></table></p></div></section>').insertAfter('.AchievementsModule');
    }
}

if (skin == "oasis" && wgNamespaceNumber == 2 && wgPageName == "Участник:Аннаэйра") {
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

/* Иконки социальных сетей 

This module cannot be placed outside the Wikia skin

$('.WikiaRail').prepend('<div style="right:-31px; top:108px; position: absolute;"><div style="position: absolute;" class="SocialIcon"><div style="float:right;"><a href="http://vk.com/masseffectwikia"><img src="https://images.wikia.nocookie.net/__cb20140227085821/masseffect/ru/images/e/e6/VKontakte.png"></a></div></div><div style="position: absolute; margin-top:42px" class="SocialIcon"><div style="float:right;"><a href="http://social.bioware.com"><img src="https://images.wikia.nocookie.net/masseffect/ru/images/8/8d/SocialBioware.png"></a></div></div><div style="position: absolute; margin-top:84px" class="SocialIcon"><div style="float:right;"><a href="https://www.origin.com"><img src="https://images.wikia.nocookie.net/masseffect/ru/images/0/0d/OrginSocial.png"></a></div></div><div style="position: absolute; margin-top:126px" class="SocialIcon"><div style="float:right;"><a href="http://social.bioware.com/n7hq"><img src="https://images.wikia.nocookie.net/masseffect/ru/images/2/2a/N7HQSocial.png"></a></div></div>');
*/

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

/* Слайдеры */

mw.loader.using( ['jquery.ui.tabs'], function() {
$( "[class^=portal_vtab]" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
$( "[class^=portal_vtab] li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
$(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );


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

/* Приветствие форума*/
$(function() {
    $('.boards').prepend("<div class=forumwelcome style='text-align:center; color:white; text-shadow: #555 1px 1px 3px; padding:2px; width:100%;'>Добро пожаловать на форум Mass Effect Wiki<br>Это идеальное место, чтобы начать обсуждение, задать вопросы и пообщаться с сообществом вики.<br>Если это ваш первый визит на форум Mass Effect Wiki, пожалуйста, нажмите на кнопку «Правила Форума и Справка» выше, чтобы ознакомиться с работой этого форума и его правилами.</div>");
});

//Изображения в профиле
var img = {};
img["Mercenary2811"] = ['<img src="https://images.wikia.nocookie.net/__cb20140531182009/masseffect/ru/images/e/ec/Кнопка_Batman.png" width="320px" height="80px">'];
if (typeof img[wgTitle] != "undefined") {
    $('<div style="position:absolute; left:5px; top:85px;">' + img[wgTitle] + '</div>').appendTo('.masthead-info');
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
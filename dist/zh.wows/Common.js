/* 此处的JavaScript将加载于所有用户每一个页面。 */
function showModulesTree() {
    $('.js-modules-tree').each(function() {
        var $this = $(this),
            contentWidth, contentHeight, iframe, contentPadding;
        $this.html('<div class="b-modulestree"><iframe frameborder="0" style="border-width: 0; width: 1000px; min-width: 100%; height: 695px;" src="//armor.kiev.ua/wot/tanks/modulestree.php?l=en&vehicle=' + $.trim($(this).text()) + '"></iframe></div>');
        iframe = $this.find('iframe');
        contentWidth = iframe.width();
        contentHeight = iframe.height();
        contentPadding = parseInt(iframe.parent().css('padding-bottom'));
        $this.height(contentHeight + contentPadding);

        $this.data('jsp', '').jScrollPane({
            showArrows: false,
            contentWidth: contentWidth,
            contentHeight: contentHeight
        });
        $(window).resize(function() {
            $this.data('jsp').reinitialise();
        });
    });
}
addOnloadHook(showModulesTree);

/* ----- END Jiri_Starrider's JS edits, feel free to edit below.-----*/

/* BEGIN n1sK's js, please leave it alone, if you really must edit it ask me first.*/
/* Collapsible tables js*/

var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

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

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName("table");

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], "collapsible")) {

            var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
            if (!HeaderRow) continue;
            var Header = HeaderRow.getElementsByTagName("th")[0];
            if (!Header) continue;

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);

            var Button = document.createElement("span");
            var ButtonLink = document.createElement("a");
            var ButtonText = document.createTextNode(collapseCaption);

            Button.className = "collapseButton"; //Styles are declared in Common.css

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
        if (hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse"))) {
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
}

addOnloadHook(createCollapseButtons);


var NavigationBarHide = collapseCaption;
var NavigationBarShow = expandCaption;


function toggleNavigationBar(indexNavigationBar) {
    var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
    var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);

    if (!NavFrame || !NavToggle) {
        return false;
    }


    if (NavToggle.firstChild.data == NavigationBarHide) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'none';
            }
        }
        NavToggle.firstChild.data = NavigationBarShow;


    } else if (NavToggle.firstChild.data == NavigationBarShow) {
        for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
            if (hasClass(NavChild, 'NavContent') || hasClass(NavChild, 'NavPic')) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
}

function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;

    var divs = document.getElementsByTagName("div");
    for (var i = 0; NavFrame = divs[i]; i++) {

        if (hasClass(NavFrame, "NavFrame")) {

            indexNavigationBar++;
            var NavToggle = document.createElement("a");
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
            NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');

            var isCollapsed = hasClass(NavFrame, "collapsed");

            for (var NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling) {
                if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                    if (NavChild.style.display == 'none') {
                        isCollapsed = true;
                    }
                }
            }
            if (isCollapsed) {
                for (var NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling) {
                    if (hasClass(NavChild, 'NavPic') || hasClass(NavChild, 'NavContent')) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode(isCollapsed ? NavigationBarShow : NavigationBarHide);
            NavToggle.appendChild(NavToggleText);

            for (var j = 0; j < NavFrame.childNodes.length; j++) {
                if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                    NavFrame.childNodes[j].appendChild(NavToggle);
                }
            }
            NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
        }
    }
}

addOnloadHook(createNavigationBarToggleButton);


var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
/* END n1sK's js, feel free to edit below.*/

/* BEGIN SNIB's MAGIC */
function toggleSidebar() {
    try {
        if (document.getElementById('switcherTop').style.display == 'none') {
            var stock = document.getElementsByClassName('stock');
            for (i = 0; i < stock.length; i++) stock[i].style.display = 'none';
            var top = document.getElementsByClassName('top');
            for (i = 0; i < top.length; i++) top[i].style.display = 'inline';
            document.getElementById('switcherStock').style.display = 'none';
            document.getElementById('switcherTop').style.display = '';
        } else {
            var stock = document.getElementsByClassName('stock');
            for (i = 0; i < stock.length; i++) stock[i].style.display = '';
            var top = document.getElementsByClassName('top');
            for (i = 0; i < top.length; i++) top[i].style.display = 'none';
            document.getElementById('switcherStock').style.display = '';
            document.getElementById('switcherTop').style.display = 'none';
        }
    } catch (err) {}
}

$(function() {
    try {
        $('#switcher').attr('onclick', 'toggleSidebar();');
    } catch (err) {}
});

$(function() {
    var first;
    first = $("#history").html();
    if (first) {
        first = first.split(/\n/);
        if (first.length == 0) {
            first = null;
            return;
        }
        for (var i = 0; i < first.length; i++) {
            if (first[i].substring(0, 4) != '<div') {
                first = first[i];
                break;
            }
        }
        if (first == null || first == '') return;

        $("#history").hide();

        $("#readMore").before('<div id="first">' + first + '</div>').show();
        first = null;

        $('#readMore').click(function() {
            $("#first").remove();
            $("#readMore").remove();
            $("#history").show('slow');
        });
    }
});

var mwpanel = document.getElementById('mw-panel');
if (mwpanel) {
    var appendContent = document.getElementById('appendContent');
    if (appendContent) {
        mwpanel.appendChild(appendContent);
    }
}

/* END SNIB's MAGIC */

/* Modules tree */

function modulesBlock() {
    var currentModulesBlock = 1;
    var modulesBlock = [];
    modulesBlock[1] = $('#modulesBlock').html();
    modulesBlock[2] = false;
    var vehicle = $('#codeValue').text();

    $('#modulesBlockH2').append('<span id="modulesBlockChange"><div class="switcherCtrlBtn active" id="modulesBlockChange_1"><span>Tech List</span></div><div class="switcherCtrlBtn" id="modulesBlockChange_2"><span>Tech Tree</span></div></span>');

    $('#modulesBlockChange .switcherCtrlBtn').click(function() {
        if ($(this).hasClass('active')) return false;
        currentModulesBlock = $(this).attr("id") == 'modulesBlockChange_1' ? 1 : 2;
        if (modulesBlock[currentModulesBlock] == false) {
            modulesBlock[currentModulesBlock] = '<iframe frameborder="0" style="border-width: 0; width: 100%; min-width: 780px; height: 620px;" src="//armor.kiev.ua/wot/tanks/modulestree.php?l=en&vehicle=' + vehicle + '"></iframe>';
        }
        $('#modulesBlock').html(modulesBlock[currentModulesBlock]);
        $('#modulesBlockChange .switcherCtrlBtn').removeClass('active');
        $(this).addClass('active');
        return false;
    });

    $('.treeFrame').each(function(indx) {
        $(this).html('<iframe frameborder="0" style="border-width: 0; width: 100%; min-width: 1010px; height: 750px;" src="' + $(this).html() + '"></iframe>');
    });
    $('.modulesTreeFrame').each(function(indx) {
        $(this).html('<iframe frameborder="0" style="border-width: 0; width: 100%; min-width: 820px; height: 620px;" src="' + $(this).html() + '"></iframe>');
    });
}

/* Popup */
function addPopupWindow() {
    $('body').append(
        '<div id="popupWindow"><table><tr><td style="vertical-align: middle;">' +
        '<div id="popupOverlay"></div>' +
        '<div id="popupWrapper">' +
        '<div id="popupContent"></div>' +
        '<img src="//wiki.gcdn.co/images/b/bd/Close.png" class="closeBtn">' +
        '</div>' +
        '</td></tr></table></div>'
    );
    //Закрыть попап кнопкой
    $('.closeBtn').click(function(index) {
        $('#popupWindow').hide();
    });

    //Закрыть попап фоном
    $('#popupOverlay').click(function(index) {
        $('#popupWindow').hide();
    });
}

/* Model3DViewer */
function addModel3DViewer() {
    $('.Model3DViewer').click(function() {
        document.getElementById("popupContent").innerHTML = '<iframe width="' + (document.documentElement.clientWidth - 150) + 'px" height="' + (document.documentElement.clientHeight - 150) + 'px" id="Model3D" src="https://sketchfab.com/models/' + $(this).children('div.Model3D').text() + '/embed?autostart=1&amp;preload=1" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" onmousewheel=""></iframe>';
        $('#popupWrapper').show();
        $('#popupWindow').show();
    });
}

/*  ready  */

$(function() {
    modulesBlock();
    addPopupWindow();
    addModel3DViewer();
});

/* Modules tree end */
/* Haswell's Stuff of the new age */

/* WG.net API access, credit to OOPMan */

function populatePlayerCount() {
    var games = {
            "#Game_Population_WoT": "wot",
            "#Game_Population_WoWP": "wowp",
            "#Game_Population_WoWS": "wows",
            "#Game_Population_WoTB": "wotb"
        },
        requests = {
            "https://api.worldoftanks.com/wgn/servers/info/": "51b1718552c3bc828e3157bf34fdbdb9",
            "https://api.worldoftanks.eu/wgn/servers/info/": "3502193af04bb0572b876d77bd34bfac",
            "https://api.worldoftanks.asia/wgn/servers/info/": "be786d54f31e79c2b15038bef5a5730f",
            "https://api.worldoftanks.ru/wgn/servers/info/": "0d0ee38f8837ae7ce3bd62bbdf1401b8"
        },
        requestParameters = {
            language: "en"
        };

    $.each(games || {}, function(selector, gameId) {
        if ($(selector).length) {
            $.each(requests || [], function(url, appId) {
                var data = $.extend({
                        application_id: appId,
                        game: gameId
                    },
                    requestParameters || {});
                $.get(url, data, function(data, textStatus, jqXHR) {
                    if (data.status == "ok") {
                        var gameDataContainer = $(selector).parents("div.wot-frame-1");
                        $.each(data.data[gameId] || [], function(index, server) {
                            var serverName = server.server;
                            gameDataContainer.find('tr[data-server="' + serverName + '"] .population-count-container').html(server.players_online);
                        });
                    }
                });
            });
        }
    });
}

$(document).ready(populatePlayerCount);

/* WOWS */
function tthTopStock() {
    $('#toStock').click(function() {
        $('#stockTTH').show();
        $('#topTTH').hide();
    });
    $('#toTop').click(function() {
        $('#stockTTH').hide();
        $('#topTTH').show();
    });
}
$(document).ready(tthTopStock);

/* WOWS version */
const rp = require('request-promise');
const WOWS_version_url = "https://api.worldofwarships.asia/wows/encyclopedia/info/?application_id=09c1c0d2898bafce438c7cb708033ad0&language=zh-tw&fields=game_version";

var version;
function getversion()
{
    rp(WOWS_version_url).then(data=>{
        data = JSON.parse(data);
        if(data.status === "ok")
        {
            version = data.data.game_version;
        }
    })
}

(function(){
	getversion();
})();
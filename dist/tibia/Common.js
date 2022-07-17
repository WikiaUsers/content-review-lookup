/* Any JavaScript here will be loaded for all users on every page load. */
// Edit page tool selector
//  -> modified from http://commons.wikimedia.org/wiki/MediaWiki:Edittools.js

function queryString(p) {
    var re = RegExp('[&?]' + p + '=([^&]*)');
    var matches;
    if ((matches = re.exec(document.location))) {
        try {
            return decodeURI(matches[1]);
        } catch (e) {}
    }
    return null;
}

function customCharInsert() {
    if (!window.wgCustomCharInsert || !mw.config.get('wgUserName')) {
        return;
    }
    var spec = document.getElementById('specialchars');
    var userp = document.createElement('p');
    userp.className = 'specialbasic';
    userp.id = 'Custom_Edittools';
    userp.style.display = 'none';

    for (var i = 0; i < wgCustomCharInsert.length; i++) {
        var a = document.createElement('a');
        a.href = '#';
        a.setAttribute('onclick', 'insertTags("' + wgCustomCharInsert[i].tagOpen + '","' + wgCustomCharInsert[i].tagClose + '","' + wgCustomCharInsert[i].sampleText + '"); return false;');
        a.appendChild(document.createTextNode(wgCustomCharInsert[i].tagOpen + wgCustomCharInsert[i].tagClose));
        userp.appendChild(a);
        if (i != wgCustomCharInsert.length - 1) {
            userp.appendChild(document.createTextNode(' · '));
        }
    }
    spec.appendChild(userp);
}
if (queryString('action') == 'edit' || queryString('action') == 'submit') {
    $(customCharInsert);
}

function edittoolsTabs() {
    var spec = document.getElementById('specialchars');
    if (!spec) {
        return;
    }
    var sb = getElementsByClassName(spec, 'p', 'specialbasic');
    if (sb.length <= 1) {
        return;
    }

    var sel = document.createElement('select');
    sel.style.display = 'inline';
    sel.setAttribute('onchange', 'chooseCharSubset(selectedIndex)');

    for (var i = 0; i < sb.length; i++) {
        var o = document.createElement('option');
        o.appendChild(document.createTextNode(sb[i].id.replace(/_/g, ' ')));
        sel.appendChild(o);
    }
    spec.insertBefore(sel, spec.firstChild.nextSibling);
}
if (queryString('action') == 'edit' || queryString('action') == 'submit') {
    $(edittoolsTabs);
}

function chooseCharSubset(seld) {
    var spec = document.getElementById('specialchars');
    var sb = getElementsByClassName(spec, 'p', 'specialbasic');
    for (var i = 0; i < sb.length; i++) {
        sb[i].style.display = i == seld ? 'inline' : 'none';
    }
}

/* Force Preview  JavaScript code - Start */
// Code slightly modified from http://www.mediawiki.org/w/index.php?title=Manual:Force_preview&oldid=250009
(function () {
    "use strict";
    /*jslint browser: true */
    /*globals addOnloadHook*/
    var disable_force_preview = window.disable_force_preview || false,
        wgAction = window.wgAction || "view",
        wgUserName = window.wgUserName || "",
        wgUserGroups = window.wgUserGroups || [],
        permittedGroups = ["sysop", "bureaucrat", "rollback", "bot"],
        permittedUsers = ["Kwigon the sharpshooter", "Temahk"],
        userName = [wgUserName],
        userGroups = wgUserGroups || [];
    function arrayIntersects(arr1, arr2) {
        // returns true if any element in arr1 exists in arr2
        var len1 = arr1.length, len2 = arr2 ? arr2.length : 0, i, j;
        for (i = 0; i < len1; i += 1) {
            for (j = 0; j < len2; j += 1) {
                if (arr1[i] === arr2[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    function forcePreview() {
        // Check if a user is permitted to bypass preview
        var save = document.getElementById("wpSave"),
            preview = document.getElementById("wpPreview");
        if (!(arrayIntersects(userGroups, permittedGroups) || arrayIntersects(userName, permittedUsers))) {
            save.disabled = true;
            save.value = "Save page (use preview first)";
            save.style.fontWeight = "normal";
            preview.style.fontWeight = "bold";
        }
        // to bypass force preview, add this to your user skin JS file:
        // var disable_force_preview = true;
    }
    if (wgAction === "edit" && !disable_force_preview) {
        //addOnloadHook(forcePreview);
    }
}());
/* Force Preview  JavaScript code - End */

/* Color Transcripts */
$(function () {
    $('table.npc_chat_div_r div.m3, table.npc_chat_div div.m3').each(function () {
        $(this).html('<span>' + ($(this).html().replace(/<br \/>|<br\/>|<br>/gi, '</span><br /><span>').replace(/''player'':|<i>player<\/i>:|player:/gi, '</span><span class="pl">-:pL:-').replace(/-:pL:-/g, '<span class="i">Player</span>:').replace(/::/g, ':').replace(/\{/g, '<b>').replace(/\}/g, '</b>')) + '</span>');
    });
});
/* End of Color Transcripts */

/* Outfiter */
$(function () {
	if (mw.config.get('wgPageName') === 'Outfiter') {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:Outfiter.js'
	    }, {
	        type: 'style',
	        article: 'MediaWiki:Outfiter.css'
	    });
	}
	/* End of Outfiter */
	
	/* template outfiter */
	if ($('div.outfiter_template').length) {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:Outfiter/Template.js'
	    });
	}
	/* end of template outfiter */
	/* Mapper */
	if (mw.config.get('wgPageName') === 'Mapper' || $('a[href*="//tibia.wikia.com/wiki/Mapper"]').length || $('a[href*="//tibia.fandom.com/wiki/Mapper"]').length) {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:Mapper.js'
	    });
	}
	/* End Mapper */
	/* Test Mapper */
	if (mw.config.get('wgPageName') === 'Mapper/Test' || $('a[href*="//tibia.wikia.com/wiki/Mapper/Test"]').length || $('a[href*="//tibia.fandom.com/wiki/Mapper/Test"]').length) {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:Mapper-Test.js'
	    });
	}
	/* End of Test Mapper */
	/* Loot Statistics data + LootPercentages + LootValue */
	importArticles({
	    type: 'script',
	    articles: [
	    	'MediaWiki:LootStatistics-Data.js',
	    	'MediaWiki:LootPercentages.js',
	    	'MediaWiki:LootValue.js'
	    ]
	});
	/* End of Loot Statistics data + LootPercentages */
	/* Show/hide Template:Scene when inside Template:Ability */
	$('.creatureAbility').mouseover(function() {
		if ($(this).find(".abilityScene").length > 0) {
			$(this).addClass('activeAbility');
			var scene = $(this).find(".abilityScene");
			scene.css({
				'visibility':'visible',
				'left': Math.min(0, $(window).width() - (scene.width() + scene.parent().offset().left)),
			});	
		}
	});
	$('.creatureAbility').mouseout(function() {
		if ($(this).find(".abilityScene").length > 0) {
			$(this).removeClass('activeAbility');
			$(this).find(".abilityScene").css({'visibility':'hidden'});
		}
	});
	/* End of Show/hide Template:Scene when inside Template:Ability */
	
	/* Loot Statistics */
	if (mw.config.get('wgPageName') === 'Loot_Statistics') {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:LootStatistics.js'
	    });
	}
	/* End of Loot Statistics */
	/* Loot Statistics checker */
	if (mw.config.get('wgPageName') === 'Loot_Statistics/Checker') {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:LootStatistics-Checker.js'
	    });
	}
	/* End of Loot Statistics checker */
	/* TibiaWiki:Creature_Statistics */
	if (mw.config.get('wgPageName') === 'TibiaWiki:Creature_Statistics') {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:CreatureStatistics.js'
	    });
	}
	/* TibiaWiki:Creature_Statistics End */
	/* TibiaWiki:Reward_Container_Statistics */
	if (mw.config.get('wgPageName') === 'TibiaWiki:Reward_Container_Statistics') {
	    importArticles({
	        type: 'script',
	        article: 'MediaWiki:RewardContainerStatistics.js'
	    });
	}
	/* TibiaWiki:Reward_Container_Statistics End */
	
	/* Calculators */
	if (mw.config.get('wgPageName') === 'Calculators') {
	    $(function () {
	        importScriptPage('MediaWiki:Calculators/Code.js');
	    });
	}
	
	if (mw.config.get('wgPageName') === 'Skills_Calculator') {
	    $(function () {
	        importScriptPage('MediaWiki:Calculators/Skills.js');
	    });
	}
	
	if (mw.config.get('wgPageName') === 'Character_Stats_Calculator') {
	    $(function () {
	        importScriptPage('MediaWiki:Calculators/Stats.js');
	    });
	}
	
	if (mw.config.get('wgPageName') === 'Armor_Calculator') {
	    $(function () {
	        importScriptPage('MediaWiki:Calculators/Armor.js');
	    });
	}
	
	if (mw.config.get('wgPageName').includes('Calculator')) {
		 $(function () {
		 	importArticles({
	            type: 'style',
	            article: 'MediaWiki:Calculators.css'
	        });
		 });
	}
	/* End of Calculators */
	/* UserAccountAge */
	if (mw.config.get('wgPageName').includes('User') || mw.config.get('wgPageName').includes('Special:')) {
	    $(function () {
	        importArticles({
	            type: 'script',
	            article: 'u:dev:MediaWiki:UserAccountAge/code2.js'
	        });
	    });
	}
	/* Bestiary */
	if (mw.config.get('wgPageName') === 'Bestiary/Simulator') {
	    $(function () {
	        importArticles({
	            type: 'script',
	            article: 'MediaWiki:Bestiary/Code.js'
	        }, {
	            type: 'style',
	            article: 'MediaWiki:Bestiary.css'
	        });
	    });
	}
	/* End of Bestiary */
	/* Daily Status */
	if (mw.config.get('wgPageName') === 'Daily_Status') {
	    $(function () {
	        importArticles({
	            type: 'script',
	            article: 'MediaWiki:DailyStatus.js'
	        });
	    });
	}
	/* End of Daily Status */
	
	/*
	 * Lightbearer monitor script. Allows the monitoring of basin times.
	 * 
	 * Script is available at [[MediaWiki:Custom Scripts/Lightbearer_Basin_Monitor.js]].
	 *
	 * This runs only when [[TibiaWiki:Tools/Lightbearer_Basin_Monitor]] is being viewed.
	 */
    // Check currently viewed page.
    if (mw.config.get('wgPageName') === "TibiaWiki:Tools/Lightbearer_Basin_Monitor") {
        // Load the script, but only once the page has loaded.
        importArticle({
            type: 'script',
            article: 'MediaWiki:Custom Scripts/Lightbearer_Basin_Monitor.js'
        });
    }
});

/* NPC Chat Windows */
$(function () {
    $('.npc_chat_div .t3.npc_chat_can_grow, .npc_chat_div_r .t3.npc_chat_can_grow').append(
    $('<a href="#">Expand</a>').click(function () {
        $(this).closest('.npc_chat_div, .npc_chat_div_r').find('.m3').height('100%');
        $(this).add($(this).next()).remove();
        return false;
    }),
    $('<span>&nbsp;-&nbsp;</span>'));
    $('.npc_chat_div .t3, .npc_chat_div_r .t3').append(
    $('<a class="npc_chat_div_ttoggle" href="#">Hide</a>').click(function () {
        $(this).closest('.npc_chat_div, .npc_chat_div_r').find('.m_tr').hide();
        $(this).parent().find('.npc_chat_div_ttoggle').toggle();
        return false;
    }),
    $('<a style="display:none;" class="npc_chat_div_ttoggle" href="#">Show</a>').click(function () {
        $(this).closest('.npc_chat_div, .npc_chat_div_r').find('.m_tr').show();
        $(this).parent().find('.npc_chat_div_ttoggle').toggle();
        return false;
    }),
    $('<span>&nbsp;-&nbsp;</span>'),
    $('<a class="npc_chat_div_swcol" href="#">Switch Color</a>').click(function () {
        var writeCookie = function (data) {
            var date = new Date();
            date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
            date = date.toGMTString();
            document.cookie = 'npc_transcript_color=' + data + ';expires=' + date + ';path=/';
        };
        if ($('.npc_chat_div').length) {
            $('.npc_chat_div').removeClass('npc_chat_div').addClass('npc_chat_div_r');
            writeCookie('white');
        } else {
            $('.npc_chat_div_r').removeClass('npc_chat_div_r').addClass('npc_chat_div');
            writeCookie('tibia');
        }
        return false;
    }));
    if (document.cookie.match(/npc_transcript_color[\s]?=[\s]?white/) !== null) {
        $('.npc_chat_div_swcol:first').click();
    }
});
/* End of NPC Chat Windows */


/* Quest transcript linker start */
$(function () {
    if ($.inArray('Quest Overview Pages', mw.config.get('wgCategories')) === -1 && $.inArray('Quest Spoiling Pages', mw.config.get('wgCategories')) === -1) {
        return;
    }
    var
    jq_escape = function (t) {
        return t.replace(/([\]\\!"#$%&'()*+,.\/:;<=>?@\[\^`{|}~])/g, '\\$1');
    },
    re_escape = function (t) {
        return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
    },
    acss = {
        fontSize: 'x-small',
        fontWeight: 'normal',
        marginLeft: '30px'
    },
    container = 'mw-content-text',
        $headers = $('#' + container + ' .mw-headline').parent('h1, h2, h3, h4, h5, h6, h7, h8'),
        headers = [],
        matched_transcripts = [],
        $transcripts_parent_lis = $('#toc').find('a[href*="\\#Transcript"]'),
        transcript_header = -1;
    /* creating headers = [[header, level], ...] */
    $headers.each(function () {
        var id = $(this).children('.mw-headline').attr('id');
        if (id) {
            headers.push([id, parseInt($(this).prop('tagName').replace(/h/i, ''), 10) || 0]);
        }
    });
    /* creating matched_transcripts = [sample_title_2, ...] */
    $.each(headers, function (i, v) {
        var
        header = v[0],
            level = v[1];
        if ((/^Transcript/).test(header)) {
            transcript_header = level;
        } else if (level === transcript_header) {
            transcript_header = -1;
        } else if (
        (/_2$/).test(header) && transcript_header > 0 && level - 1 === transcript_header) {
            matched_transcripts.push(header);
        }
    });
    /* adding links */
    $.each(matched_transcripts, function (i, v) {
        var
        v1 = v.replace(/_2$/, '');
        $('#' + container + ' #' + jq_escape(v)).parent().append(
        $('<a />', {
            'href': '#' + v1
        }).css(acss).text('Jump to matching title'),
        $('<a />', {
            'href': '#toc'
        }).css(acss).css('margin-left', '10px').text('Jump to TOC'));
        $('#' + container + ' #' + jq_escape(v1)).parent().append(
        $('<a />', {
            'href': '#' + v
        }).css(acss).text('Jump to Transcript'),
        $('<a />', {
            'href': '#toc'
        }).css(acss).css({
            marginLeft: '10px'
        }).text('Jump to TOC'));
    });
});
/* Quest transcript linker end */
/* Updates toggle changes start */
$(function () {
	var updatePages = ['Major_Updates', 'Winter_Updates', 'Summer_Updates', 'Spring_Updates', 'Autumn_Updates', 'Patch_Updates', 'Minor_Updates', 'Version_5_Updates', 'Version_6_Updates', 'Version_7_Updates', 'Version_8_Updates', 'Version_9_Updates', 'Version_10_Updates', 'Version_11_Updates', 'Version_12_Updates'];
	if (updatePages.includes(mw.config.get('wgPageName'))) {
	    $(function () {
	        $('#Updates_Toggle_Changes td:nth-child(6),#Updates_Toggle_Changes th:nth-child(6)').hide();
	        $('#Updates_Toggle_Changes').prepend(
	            $('<button />', {
	            'class': 'button'
	            }).text('Toggle change list').css({
	                float: 'right'
	            }).data('shown', false).click(function () {
	                $('#Updates_Toggle_Changes td:nth-child(6),#Updates_Toggle_Changes th:nth-child(6)').toggle();
	            })
	        );
	    });
	}
});
/* Updates toggle changes end */

/* Achievements toggle spoilers start */
$(function () {
	if (mw.config.get('wgPageName') === 'Achievements') {
	    $(function () {
	        var
	        $table = $('#achievements_title_table'),
	            $top_div = $('caption:first', $table),
	            $els = $table.siblings('table').add($table).find('.achievements_spoilers');
	        $top_div.append(
	        $('<button />', {
	            'class': 'button'
	        }).text('Toggle spoiler info').css({
	            float: 'right'
	        }).data('shown', false).click(function () {
	            var $this = $(this),
	                data = !$this.data('shown');
	            $this.data('shown', data);
	            $els.toggle(data);
	        })).css({
	            position: 'relative'
	        });
	    });
	}
});
/* Achievements toggle spoilers end */

(function () {
    "use strict";
    // button to display all spoilers on the Achievements page
    if (mw.config.get('wgPageName') === 'Achievements') {
        $(function () {
            var ach_shown = false,
                button = document.createElement('button');
            button.appendChild(document.createTextNode("Show/Hide all spoilers"));
            $('#ach-tools').append(button).click(function () {
                $('div[id$=_content]').each(function () {
                    this.parentNode.style.visibility = ach_shown ? 'hidden' : 'visible';
                    this.parentNode.style.position = ach_shown ? 'absolute' : 'static';
                });
                ach_shown = !ach_shown;
            });
        });
    }
}());

/* custom spoiler toggle (used by [[Template:Infobox Achievement]]) */
function custom_spoiler() {
    var button = document.createElement('button'); //define variable button
    button.appendChild(document.createTextNode("Show/Hide spoiler")); //add text to this button
    $(".custom_spoiler_button").append(button).click(function () {
        $(".custom_spoiler_content").toggle('slow');
    });
}
if (mw.config.get('wgAction') === 'view' || mw.config.get('wgAction') === 'submit' || mw.config.get('wgAction') === 'purge') {
    $(custom_spoiler);
}
/* end of custom spoiler toggle */

/* Demo test
 * temporary script showing creature ability demonstrations
 * preview at [[User:Sixorish/Abilities/Tanjis]]
 *
addOnloadHook(function () {
    var script;
    if (mw.config.get('wgPageName').indexOf('User:Sixorish/Abilities') === 0) {
        // Load User:Sixorish/Abilities/Render.js
        script = document.createElement('script');
        script.src = '/wiki/User:Sixorish/Abilities/Render.js?action=raw&nocache=' + Math.round(Math.random() * 10000000);
        document.getElementsByTagName('head')[0].appendChild(script);
    }
});
 */

/* Cookies */
function setCookie(name, value, offset) {
    var time;
    if (offset === undefined) {
        offset = 1000 * 60 * 60 * 365 * 10;
    }
    time = new Date(+new Date() + offset);
    document.cookie = name + "=" + value + (offset ? "; expires=" + time.toGMTString() : "") + "; path=/";
}

function removeCookie(name) {
    setCookie(name, "", -1);
}

function getCookie(name) {
    var n = name + '=',
        arr = document.cookie.split(';'),
        i, len, cookie;
    for (i = 0, len = arr.length; i < len; i += 1) {
        cookie = arr[i];
        // trim leading spaces
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(n) === 0) {
            return cookie.substring(n.length, cookie.length);
        }
    }
    return null;
}

/* Utility */
function selectEntireInput() {
    this.select();
    return false;
}

function clearElement() {
    while (this.lastChild) {
        this.removeChild(this.lastChild);
    }
}
(function (window) {
    /* Data to be used by any script */
    var game;
    game = {};
    game.worlds = ["Adra", "Alumbra", "Antica", "Ardera", "Astera", "Axera", "Bastia", "Batabra", "Belobra", "Bombra", "Bona", "Cadebra", "Calmera", "Castela", "Celebra", "Celesta", "Collabra", "Damora", "Descubra", "Dibra", "Epoca", "Esmera", "Famosa", "Fera", "Ferobra", "Firmera", "Gentebra", "Gladera", "Harmonia", "Havera", "Honbra", "Illusera", "Impulsa", "Inabra", "Issobra", "Kalibra", "Karna", "Libertabra", "Lobera", "Luminera", "Lutabra", "Marbera", "Marcia", "Menera", "Monza", "Mudabra", "Mykera", "Nadora", "Nefera", "Nossobra", "Ocebra", "Olima", "Ombra", "Optera", "Pacera", "Peloria", "Premia", "Quelibra", "Quintera", "Refugia", "Reinobra", "Seanera", "Secura", "Serdebra", "Solidera", "Suna", "Talera", "Tembra", "Thyria", "Trona", "Utobra", "Venebra", "Versa", "Visabra", "Vunira", "Wintera", "Wizera", "Xandebra", "Yonabra", "Zenobra", "Zuna", "Zunera"];
    game.worldIds = (function (worlds) {
        // Map worlds to IDs
        var obj = {}, len = worlds.length;
        while (len--) {
            obj[worlds[len]] = len;
        }
        return obj;
    }(game.worlds));
    game.getHouseUrl = function (w, id) {
        if (!isNaN(w)) {
            // input is an index, we want a name
            if (w < 0 || w > game.worlds.length) {
                throw new Error("No game world at index " + w);
            }
            w = game.worlds[w];
        }
        return 'https://www.tibia.com/community/?subtopic=houses&page=view&houseid=' + id + '&world=' + w;
    };
    window.game = game;
}(window));
(function () {
    /* Settings */
    if (mw.config.get('wgPageName') === 'TibiaWiki:Settings') {
        $(function () {
            var html = '', i, len, worlds;
            // Cookie: TW_gameworld
            // We want an alphabetical list, not chronological,
            // copy the array and sort it
            worlds = game.worlds.slice(0);
            worlds.sort();
            html += 'Your game server: <select id="set-gameworld">';
            html += '<option value="-1">Set a game server</option>';
            for (i = 0, len = game.worlds.length; i < len; i += 1) {
                html += '<option value="' + game.worldIds[worlds[i]] + '">' + worlds[i] + '</option>';
            }
            html += '</select><br />';
            // Cookie: TW_showcontent
            html += 'Hidden content?';
            html += '<select id="set-showcontent">';
            html += '<option value="-1">(no change)</option>';
            html += '<option value="0">Hide</option>';
            html += '<option value="1">Show</option>';
            html += '</select>';
            $('#tw-settings').append(html);
            // Change settings
            $('#set-gameworld').change(function (e) {
                if (this.value === "-1") {
                    return;
                }
                setCookie("TW_gameworld", this.value);
            });
            $("#set-showcontent").change(function (e) {
                if (this.value === "-1") {
                    return;
                }
                setCookie("TW_showcontent", this.value);
            });
        });
    }
}());
(function () {
    /* Run commands (that require cookies/JS) */
    var commands, cmd;
    commands = {
        'get-house-url': function (e) {
            var $span, href;
            href = game.getHouseUrl(getCookie("TW_gameworld") || "0", e.getAttribute('data-houseid') || "0");
            $span = $('<span>View the <a class="external text" href="' + href + '">Tibia.com house page</a>. (<a href="/wiki/Project:Settings">change settings</a>)</span>)');
            clearElement.call(e);
            $(e).append($span);
        },
        'create-tooltip': (function () {
            // Tooltip container
            var $tt;
            function showTooltip($e) {
                var o = $e.data(), params, i, len, p, offset;
                params = o && o.params ? o.params.split(",") : [];
                offset = $e.offset();
                $tt.empty();
                for (i = 0, len = params.length; i < len; i += 1) {
                    p = params[i];
                    if (o[p] !== undefined && o.hasOwnProperty(p)) {
                        $tt.append('<div id="' + p + '">' + o[p] + '</div>');
                    }
                }
                $tt.addClass("show");
                $tt.css({
                    top: Math.floor(offset.top) + 'px',
                    left: Math.floor(offset.left) + 'px'
                });
            }
            function hideTooltip() {
                $tt.removeClass("show");
            }
            return function setupTooltip(e) {
                var $e = $(e);
                if ($tt === undefined) {
                    $tt = $('<div id="tw_tt"></div>');
                    $('body').append($tt);
                }
                $e.mouseover(function () {
                    showTooltip($e);
                });
                $e.mouseout(hideTooltip);
                $(window).blur(hideTooltip);
            };
        }()),
        'showhide-content': function setupContentHider(e) {
            var $e = $(e), $ch = $e.children(), userSetting = !!parseInt((getCookie("TW_showcontent") || "0"), 10);
            function toggleVisibility() {
                if ($e.data("showhide-value") === "hidden") {
                    $e.addClass("showhide-visible").removeClass("showhide-hidden").data("showhide-value", "visible");
                } else {
                    $e.addClass("showhide-hidden").removeClass("showhide-visible").data("showhide-value", "hidden");
                }
            }
            $ch.each(function () {
                var $this = $(this);
                if ($this.data("showhide-element") === "header") {
                    $this.click(toggleVisibility);
                    return false;
                }
            });
            // Confirmed: JS enabled, remove showhide init class
            $e.removeClass("showhide-init");
            // User has opted to show the hidden content
            if (userSetting) {
                $e.addClass("showhide-visible").removeClass("showhide-hidden").data("showhide-value", "visible");
            }
        }
    };
    cmd = $('.tw-cmd');
    if (cmd.length) {
        cmd.each(function () {
            var cmd = this.getAttribute('data-command');
            if (cmd && typeof commands[cmd] === 'function') {
                commands[cmd](this);
            }
        });
    }
}());

$(function () {
    /* Add a class to document.body if textShadow isn't supported */
    var e = document.createElement("div"), compat = {};
    if (e.style.textShadow !== "") {
        $(document.body).addClass("nosupport-textShadow");
    }
});
/* purging the cache of the pages in the array showing time sensitive data */
var purge_pages = ['Rashid','Main Page','TibiaWiki:New website skin and new features','Tibiadrome/Rotation','Tibiadrome','Dream Scar/Boss of the Day','Template:Eventviewer'];
purge_pages = purge_pages.concat(game.worlds);
if ( purge_pages.includes(mw.config.get('wgPageName')) ) {
    $(function () {
        var api = new mw.Api();
        api.post({
            action: 'purge',
            titles: mw.config.get('wgPageName')
        });
    });
}

/* Animation starter for the daylight viewport in combination with 'day_cycle' class and keyframes*/
$(function () {
	if (document.getElementById("dayview")) {
		document.getElementById("dayview").style.setProperty('--g', 80+(new Date().getMinutes()*2.21) + "%");
	}
});
/* gets the current minute / day value on page load for [[Time]]*/
$(function () {
	if (document.getElementById("minutes")) {
		var minutes = new Date().getMinutes();
		if (minutes < 10) {minutes = "0" + minutes}
		document.getElementById("minutes").innerHTML = "hh:"+ minutes;
	}
});
$(function () {
	if (document.getElementById("daytime")) {
		var minutes = new Date().getMinutes();
			if (minutes>=15 && minutes<=45) {
				document.getElementById("daytime").innerHTML = "(Day)";
			} else {
				document.getElementById("daytime").innerHTML = "(Night)";
			}
	}
});
$(function () {
	/* Load /wiki/Creature_Ranks.css */
	importArticles({
	    type: 'style',
	    article: 'MediaWiki:CreatureRanks.css'
	});
	/* end of Load /wiki/Creature_Ranks.css */
});

/* Sort creature resistance bars by their value (data-value) */
$(function () {
  var arr = $("#creature-resistance ul").children('li');
  Array.prototype.sort.call(arr, function (a, b) {
    return b.getAttribute("data-value") - a.getAttribute("data-value");
  });
  $("#creature-resistance ul").append(arr);
});
/* Sort draft of new resistance table */
$(function () {
  var arr = $("#creature-resistance-d").children('.creature-resistance-el');
  Array.prototype.sort.call(arr, function (a, b) {
    return b.getAttribute("data-value") - a.getAttribute("data-value");
  });
  $("#creature-resistance-d").append(arr);
});

/* twbox - section headers behave as anchor links */
$("#twbox h1, #twbox h2, #twbox h3, #twbox h4, #twbox h5, #twbox h6").each(function () {
    var $this = $(this);
    $this.attr("data-target", $this.find(".mw-headline").attr('id') || "");
    $this = null;
}).click(function () {
    window.location.hash = this.getAttribute("data-target");
});

(function () {
    /* Vandalwarn.js checks various signs of vandalism and warns the user */
    if (mw.config.get('wgCanonicalNamespace') === '' && mw.config.get('wgAction') === 'view' && !(getCookie("TW_hidevandalwarning") || false)) {
        importArticle({
            type: 'script',
            article: 'MediaWiki:Custom Scripts/VandalWarn.js'
        });
    }
}());

/* Fix pixel-art images */
$(function(){
	function reload_imgs(target) {
		var srcvar = $(target).attr('src');
	    if(srcvar &&
	    	!srcvar.endsWith('format=original') && srcvar.startsWith('https://static.wikia.nocookie.net')) {
	        if(srcvar.includes('?')) {
	            $(target).attr('src', srcvar+'&format=original');
	        } else {
	            $(target).attr('src', srcvar+'?format=original');
	        }
	    }
	    var srcset = $(target).attr('srcset');
	    if(srcset && !srcset.includes('format=original')) {
	    	var srcarray = srcset.split(' ');
	    	$(target).attr('srcset', srcarray[0]+'&format=original');
	    }
	    return;
	}
	document.body.addEventListener('load', function(event) {
		const target = event.target;
		if ($(target).is('img')) {
		    reload_imgs(target);
		}
	}, true);
	$('.page__main img, .WikiaMainContent img').each(function() {
		if(this.complete) { 
			reload_imgs(this);
		}
	});
});

/* Bypassing license check on multiple upload */
mw.config.set('UMFBypassLicenseCheck',true);

/* Process Average Loot Value data */
$(function(){
	if (mw.config.get('wgPageName') === 'List_of_Creatures_by_Average_Loot_Value') {
		var baseurl = 'https://tibia.fandom.com/wiki/',
		fileurl = 'https://tibia.fandom.com/wiki/Special:Filepath?file=',
		looturl = 'https://tibia.fandom.com/wiki/Loot_Statistics:',
		lootValueData = [];
		
		$.each($('#lootValueData').text().split('|'), function() {
			if (this.length > 0) {
				var vals = this.split("/"),
				creature = vals[0],
				kills =  parseInt(vals[1], 10),
				value = parseFloat(vals[2]);
				if (kills > 100 && value > 0) {
					lootValueData.push({n: creature, k: kills, v:value});	
				}
			}
		});
		
		lootValueData.sort(function(x,y){return (y.v - x.v)});
		
		//$('#lootValueTable > tbody > tr')[1].remove();
		
		$.each(lootValueData, function() {
			$('#lootValueTable > tbody')
				.append($('<tr>')
        			.append($('<td>')
        				.append($('<a>')
        					.attr('href', baseurl + this.n)
        					.text(this.n))
    					.append('<br />')
    					.append($('<small>')
    						.append($('<a>')
    							.attr('href', looturl + this.n)
        						.text('Loot Statistics'))))
    				.append($('<td>')
        				.append($('<img>')
        					.attr('src', fileurl + this.n + '.gif')
        					.attr('class', 'lazyloaded')))
        			.append($('<td>')
        				.text(this.k))
    				.append($('<td>')
        				.text(this.v))
    			);
		});
		
		$('#lootValueLoading').remove();
		$('#lootValueTable').show();
	}
});
/* Template:KW */
$(function(){
	if ($('.keyword-highlight')[0]) {
		var notif = '<div id="kw-notification" style="display: none;">' +
		'<div id="kw-content">' +
		'<span>Keyword copied to clipboard!</span>' +
		'</div></div>'
		
		$('.resizable-container').before(notif);
		
		$('#kw-notification').css({
			'position': 'sticky',
			'top': '50px',
			'height': '0px',
			'width': '250px',
			'z-index': '105',
			'left':'calc(50% - 125px)'
		});
		$('#kw-content').css({
			'width': '250px',
			'height': '50px',
	        'text-align': 'center',
	        'padding': '10px 0px 10px 0px',
	        'border': '1px solid',
	        'border-radius': '3px',
	        'background-color': 'var(--theme-page-background-color--secondary)',
			'border-color': 'var(--theme-warning-color--secondary)',
			'color': 'var(--theme-alert-color)',
			'float': 'left'
		});
		
		$('.keyword-highlight').click(function() {
			navigator.clipboard.writeText($(this).html());
			$('#kw-notification').fadeIn('fast', function() {
				$('#kw-notification').fadeOut(3000);
			});
		});
	}
});
/* same as function as Template:KW, here allowing bolded words in Template:Infobox Transcript to be copied to clipboard by clicking them*/
$(function(){
	if ($('.npc_chat_div b')[0]) {
		var notif = '<div id="kw-notification" style="display: none;">' +
		'<div id="kw-content">' +
		'<span>Keyword copied to clipboard!</span>' +
		'</div></div>'
		
		$('.resizable-container').before(notif);
		
		$('#kw-notification').css({
			'position': 'sticky',
			'top': '50px',
			'height': '0px',
			'width': '250px',
			'z-index': '105',
			'left':'calc(50% - 125px)'
		});
		$('#kw-content').css({
			'width': '250px',
			'height': '50px',
	        'text-align': 'center',
	        'padding': '10px 0px 10px 0px',
	        'border': '1px solid',
	        'border-radius': '3px',
	        'background-color': 'var(--theme-page-background-color--secondary)',
			'border-color': 'var(--theme-warning-color--secondary)',
			'color': 'var(--theme-alert-color)',
			'float': 'left'
		});
		
		$('.npc_chat_div b').click(function() {
			navigator.clipboard.writeText($(this).html());
			$('#kw-notification').fadeIn('fast', function() {
				$('#kw-notification').fadeOut(3000);
			});
		});
	}
});
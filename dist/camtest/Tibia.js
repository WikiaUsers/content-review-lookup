/* Any JavaScript here will be loaded for all users on every page load. */

/*global $, mw */

var conf = mw.config.get([
        'wgUserName',
        'wgCustomCharInsert',
        'wgAction',
        'skin',
        'wgPageName',
        'wgTitle',
        'wgCategories'
    ]);

/* Code for demo widgets */
var addWidgets = function () {
    var widgets = $('#bodyContent div.wikia_widget').get();
    for (var i = 0; i < widgets.length; i++) {
        widgets[i].innerHTML = "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0' width='300' height='250' align='middle' id='wikia_widget'><param name='allowScriptAccess' value='always' /><param name='movie' value='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' /><param name='quality' value='high' /> <param name='wmode' value='transparent' /><embed src='https://images.wikia.nocookie.net/common/skins/common/flash_widgets/wikia_widget.swf' FlashVars='backgroundColor=000000&backgroundImage=&borderColor=92947c&dropShadow=on&headerColor=92947c&headerAlpha=.05&headerBorderColor=000000&headline1=The Vault presents&headline1Color=CCCCCC&headline2=Most Wanted DLC Items&headline2Color=FFFFFF&clickURL=http://fallout.wikia.com&wikiURLColor=FFFFFF&wikiaLogoColor=FFFFFF&type=slideshow&slideshowImages=https://images.wikia.nocookie.net/fallout/images/8/8b/Widget_Auto-Axe.png,https://images.wikia.nocookie.net/fallout/images/f/ff/Widget_Gauss-Rifle.png,https://images.wikia.nocookie.net/fallout/images/6/6f/Widget_WidPower-Armor.png,https://images.wikia.nocookie.net/fallout/images/1/1c/Get_Shock-Sword.png&=Preview images in the widget&' quality='high' wmode='transparent' width='300' height='250' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' name='wikia_widget' /></object>";
    }
};

$(addWidgets);
/* End of code for demo widgets */


/* Force Preview  JavaScript code - Start */
// Code slightly modified from http://www.mediawiki.org/w/index.php?title=Manual:Force_preview&oldid=250009
(function () {
    "use strict";
    /*jslint browser: true */
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
        // $(forcePreview);
    }
}());
/* Force Preview  JavaScript code - End */

if (conf.wgAction === 'view' || conf.wgAction === 'submit' || conf.wgAction === 'purge') {
    /* template outfiter loader */
    $(function () {
        if ($('div.outfiter_template').length) {
            $.getScript(window.location.host.match(/(tibia|dantest)\.wikia\.com/) ? '/index.php?title=Outfiter/Code_Template&action=raw&ctype=text/javascript' : 'template.js');
        }
    });
}

/* template outfiter loader end */
/* infobox sidebar toggle */
$(function () {
    'use strict';
    if (conf.skin !== 'oasis') {
        return;
    }
    var read_cookie = function (name) {
        var i, c, cl = document.cookie.split(';');
        for (i = 0; i < cl.length; i++) {
            c = $.trim(cl[i]);
            if (c.indexOf(name + '=') === 0) {
                return c.substring(name.length + 1);
            }
        }
        return null;
    },
    write_cookie = function (name, val) {
        var date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        date = date.toGMTString();
        document.cookie = name + '=' + val + '; expires=' + date + '; path=/';
    },
    infobox_sidebar_hide,
    $infobox_sidebar_toggler,
    $infobox_sidebar = $('#WikiaArticle #infobox_sidebar'),
        $infobox_bottom = $('#WikiaArticle #infobox_bottom'),
        $infobox_topleft = $('#WikiaArticle #infobox_topleft'),
        $infobox_topright = $('#WikiaArticle #infobox_topright'),
        version_pos = function () {
            $infobox_topleft.css('width', 'auto');
            $infobox_topleft.css(
            $infobox_topleft.width() + $infobox_topright.width() + 10 > $infobox_topleft.parent().width() ? {
                'top': '18px',
                    'width': '63'
            } : {
                'top': '5px',
                    'width': 'auto'
            });
        };
    if ($infobox_sidebar.length === 1) {
        infobox_sidebar_hide = read_cookie('infobox_sidebar_hide') === '1';
        $infobox_sidebar_toggler = $('<span />', {
            'id': 'infobox_sidebar_toggler',
                'href': '#'
        }).css({
            'position': 'absolute',
                'right': '1px',
                'top': '40px',
                'width': '1em',
                'text-align': 'center',
                'font-size': 'smaller',
                'line-height': '0.8em',
                'color': '#006CB0',
                'cursor': 'pointer'
        }).html('T<br />o<br />g<br />g<br />l<br />e<br /><br />S<br />i<br />d<br />e<br />b<br />a<br />r')
            .data('shown', true).click(function () {
            var $this = $(this),
                data = !$this.data('shown');
            $this.data('shown', data);
            $infobox_sidebar.toggle(data);
            $infobox_bottom.attr({
                colspan: data ? 2 : 1
            });
            write_cookie('infobox_sidebar_hide', data ? 0 : 1);
            version_pos();
        });
        $infobox_sidebar.siblings('td:first').children('div').append($infobox_sidebar_toggler);
        if (infobox_sidebar_hide) {
            $infobox_sidebar_toggler.click();
        }
        version_pos();
    }
});
/* infobox sidebar toggle end */
/* Color Transcripts */
$(function () {
    $('table.npc_chat_div_r div.m3, table.npc_chat_div div.m3').each(function () {
        $(this).html('<span>' + ($(this).html().replace(/<br \/>|<br\/>|<br>/gi, '</span><br /><span>').replace(/''player'':|<i>player<\/i>:|player:/gi, '</span><span class="pl">-:pL:-').replace(/-:pL:-/g, '<span class="i">Player</span>:').replace(/::/g, ':').replace(/\{/g, '<b>').replace(/\}/g, '</b>')) + '</span>');
    });
});
/* End of Color Transcripts */
/* Outfiter */
if (conf.wgPageName === 'Outfiter') {
    $(function () {
        $.ajax({
            url: '/index.php?title=Outfiter/Code&action=raw',
            success: function (text) {
                var otext = text;
                text = text.slice(text.search('id="pre_outfiter1">') + 19, text.search('<\/pre>'));
                $('head').append('<style type="text/css">' + text + '</style>');
                text = otext.slice(otext.search('</pre>') + 4);
                text = text.slice(text.search('id="pre_outfiter2">') + 19, text.search('</pre>'));
                $('#outfiter_container').html(text);
                text = otext.slice(otext.search('</pre>') + 4);
                text = text.slice(text.search('</pre>') + 4);
                text = text.slice(text.search('id="pre_outfiter3">') + 19, text.search('</pre>'));
                $('#outfiter_script').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    });
}
/* End of Outfiter */
/* Mapper */
$(function () {
    if (conf.wgPageName === 'Mapper' || $('a[href*="http://tibia.wikia.com/wiki/Mapper"]').size()) {
        $.ajax({
            url: '/index.php?title=Mapper/Code&action=raw',
            success: function (text) {
                text = text.slice(text.search('id="pre_mapper">') + 16, text.search('<\/pre>'));
                $('body:first').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    }
});
/* End Mapper */
/* Test Mapper */
$(function () {
    if (conf.wgPageName === 'Mapper/Test' || $('a[href*="http://tibia.wikia.com/wiki/Mapper/Test"]').size()) {
        // @todo huh?
        conf.wgPageName = 'Mapper';
        $.ajax({
            url: '/index.php?title=Mapper/Test/Code&action=raw',
            success: function (text) {
                text = text.slice(text.search('id="pre_mapper">') + 16, text.search('<\/pre>'));
                $('body:first').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    }
});
/* Test Mapper */
/* Loot Statistics */
if (conf.wgPageName === 'Loot_Statistics') {
    $(function () {
        $.ajax({
            url: '/index.php?title=Loot_Statistics/Code&action=raw',
            cache: false,
            success: function (text) {
                text = text.slice(text.search('id="pre_lootparser">') + 21, text.search('<\/pre>'));
                $('#lootparser_loot_script').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    });
}
/* End of Loot Statistics */
/* Loot Statistics checker */
if (conf.wgPageName === 'Loot_Statistics/Checker') {
    $(function () {
        $.ajax({
            url: '/index.php?title=Loot_Statistics/Checker/Code&action=raw',
            cache: false,
            success: function (text) {
                text = text.slice(text.search('id="pre_lootchecker">') + 22, text.search('<\/pre>'));
                $('#stats_data').parents('div:first').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    });
}
/* End of Loot Statistics checker */
/* TibiaWiki:Creature_Statistics */
if (conf.wgPageName === 'TibiaWiki:Creature_Statistics') {
    $(function () {
        $.ajax({
            url: '/index.php?title=TibiaWiki:Creature_Statistics/Code&action=raw',
            dataType: 'text',
            cache: false,
            success: function (text) {
                text = text.slice(text.search('id="pre_statsparser">') + 22, text.search('<\/pre>'));
                $('body:first').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    });
}
/* TibiaWiki:Creature_Statistics End */
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
        if ($('.npc_chat_div').size()) {
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
/* Loot percentage data */
$(function () {
    'use strict';
    var current_tibia_version = '8.6',
        lootparser_versions_ex = {'8.6': {
/*changed*/
  'Ancient Scarab': '10.8',
  'Choking Fear': '10.8',
  'Corym Charlatan': '10.8',
  'Corym Skirmisher': '10.8',
  'Corym Vanguard': '10.8',
  'Elder Bonelord': '10.8',
  'Kongra': '10.8',
  'Lizard Sentinel': '10.8',
  'Massive Water Elemental': '10.8',
  'Orc Berserker': '10.8',
  'Retching Horror': '10.8',
  'Waspoid': '10.8',
  'Water Elemental': '10.8',
  'Werewolf': '10.8',
  'Wild Warrior': '10.8',
  'Devourer': '10.7',
  'Glooth Anemone': '10.7',
  'Metal Gargoyle': '10.7',
  'Rustheap Golem': '10.7',
  'Glooth Golem': '10.7',
  'Demon': '10.37',
  'Hellhound': '10.37',
  'Chakoya Tribewarden': '10.37',
  'Chakoya Toolshaper': '10.37',
  'Chakoya Windcaller': '10.37',
  'Juggernaut': '10.3',
  'Demon Skeleton': '10.1',
  'Lich': '10.1',
  'Vampire': '10.1',
  'Betrayed Wraith': '9.86',
  'Blightwalker': '9.86',
  'Crystal Spider': '9.86',
  'Gargoyle': '9.86',
  'Hand of Cursed Fate': '9.86',
  'Ice Golem': '9.86',
  'Lost Soul': '9.86',
  'Mammoth': '9.86',
  'Phantasm': '9.86',
  'Stone Golem': '9.86',
  'Terramite': '9.86',
  'Thornback Tortoise': '9.86',
  'Tortoise': '9.86',
  'Quara Constrictor Scout': '9.86',
  'Quara Hydromancer Scout': '9.86',
  'Quara Mantassin Scout': '9.86',
  'Quara Pincher Scout': '9.86',
  'Quara Predator Scout': '9.86',
  'Swamp Troll': '9.8',
  'Rat': '9.63',
  'Spider': '9.63',
  'Poison Spider': '9.63',
  'Bug': '9.63',
  'Massive Fire Elemental': '9.6',
  'Behemoth': '9.5',
  'Dark Torturer': '9.5',
  'Defiler': '9.5',
  'Draken Spellweaver': '9.5',
  'Eternal Guardian': '9.5',
  'Ghastly Dragon': '9.5',
  'Giant Spider': '9.5',
  'Gnarlhound': '9.5',
  'Hydra': '9.5',
  'Killer Caiman': '9.5',
  'Lizard Zaogun': '9.5',
  'Mutated Tiger': '9.5',
  'Quara Constrictor': '9.5',
  'Quara Hydromancer': '9.5',
  'Quara Mantassin': '9.5',
  'Quara Pincher': '9.5',
  'Sea Serpent': '9.5',
  'Wailing Widow': '9.5',
  'Undead Dragon': '9.5',
  'Wyvern': '9.5',
  'Blazing Fire Elemental': '9.1',
  'Blistering Fire Elemental': '9.1',
  'Carrion Worm': '9.1',
  'Draken Abomination': '9.1',
  'Dwarf Guard': '9.1',
  'Earth Elemental': '9.1',
  'Fire Overlord': '9.1',
  'Hellfire Fighter': '9.1',
  'Jagged Earth Elemental': '9.1',
  'Muddy Earth Elemental': '9.1',
  'Tarantula': '9.1',
  'Witch': '9.1',
  'Worker Golem': '9.1',
/*bosses*/
  'Terofar': '10.5',
  'Zavarash': '10.5',
  'Deathbine': '9.86',
  'Hide': '9.86',
  'The Bloodtusk': '9.86',
  'Ethershreck': '9.5',
  'Gorgo': '9.5',
  'Kerberos': '9.5',
  'Stonecracker': '9.5',
  'Esmeralda': '9.2',
  'Flameborn': '9.2',
  'Fleshcrawler': '9.2',
  'Leviathan': '9.2',
  'Ribstride': '9.2',
  'Shardhead': '9.2',
  'Sulphur Scuttler': '9.2',
  'The Bloodweb': '9.2',
  'The Many': '9.2',
  'The Noxious Spawn': '9.2',
  'The Old Widow': '9.2',
  'The Snapper': '9.2',
  'Thul': '9.2',
  'Salamander Trainer': '10.55',
/*new*/
  'Dawnfire Asura': '10.8',
  'Ekatrix': '10.8',
  'Elder Forest Fury': '10.8',
  'Feroxa': '10.8',
  'Feroxa (Gloom Wolf)': '10.8',
  'Feroxa (Killable Werewolf)': '10.8',
  'Feroxa (Werewolf)': '10.8',
  'Ghost Wolf': '10.8',
  'Gloom Wolf': '10.8',
  'Mahatheb': '10.8',
  'Midnight Asura': '10.8',
  'Omnivora': '10.8',
  'Oodok Witchmaster': '10.8',
  'Owin (Creature)': '10.8',
  'Redeemed Soul': '10.8',
  'Renegade Knight': '10.8',
  'Tainted Soul': '10.8',
  'The Flaming Orchid': '10.8',
  'Vicious Squire': '10.8',
  'Vile Grandmaster': '10.8',
  'Werebadger': '10.8',
  'Werebear': '10.8',
  'Wereboar': '10.8',
  'Abyssal Calamary': '10.7',
  'Control Tower': '10.7',
  'Deep Terror': '10.7',
  'Depowered Minotaur': '10.7',
  'Empowered Glooth Horror': '10.7',
  'Energy Pulse': '10.7',
  'Feeble Glooth Horror': '10.7',
  'Glooth-Generator': '10.7',
  'Glooth Bandit': '10.7',
  'Glooth Battery': '10.7',
  'Glooth Bomb': '10.7',
  'Glooth Brigand': '10.7',
  'Glooth Horror': '10.7',
  'Glooth Masher': '10.7',
  'Glooth Powered Minotaur': '10.7',
  'Glooth Slasher': '10.7',
  'Glooth Trasher': '10.7',
  'High Voltage Elemental': '10.7',
  'Minotaur Invader': '10.7',
  'Minotaur Totem': '10.7',
  'Minotaur Wallbreaker': '10.7',
  'Noble Lion': '10.7',
  'Professor Maxxen': '10.7',
  'Renegade Quara Constrictor': '10.7',
  'Renegade Quara Hydromancer': '10.7',
  'Renegade Quara Mantassin': '10.7',
  'Renegade Quara Pincher': '10.7',
  'Renegade Quara Predator': '10.7',
  'Roaring Lion': '10.7',
  'Seacrest Serpent': '10.7',
  'Strong Glooth Horror': '10.7',
  'Tentacle of the Deep Terror': '10.7',
  'Tremor Worm': '10.7',
  'Unstable Tunnel': '10.7',
  'Weakened Glooth Horror': '10.7',
  'Minotaur Commander': '10.7',/*unconfirmed*/
  'Brittle Skeleton': '10.55',
  'Crazed Dwarf': '10.55',
  'Dawn Scorpion': '10.55',
  'Dawnfly': '10.55',
  'Juvenile Cyclops': '10.55',
  'Lesser Fire Devil': '10.55',
  'Meadow Strider': '10.55',
  'Minotaur Bruiser': '10.55',
  'Minotaur Occultist': '10.55',
  'Minotaur Poacher': '10.55',
  'Mountain Troll': '10.55',
  'Muglex Clan Assassin': '10.55',
  'Muglex Clan Footman': '10.55',
  'Muglex Clan Scavenger': '10.55',
  'Sacred Snake': '10.55',
  'Scar Tribe Shaman': '10.55',
  'Scar Tribe Warrior': '10.55',
  'Troll-Trained Salamander': '10.55',
  'Woodling': '10.55',
  'Blood Beast': '10.5',
  'Bullwark': '10.5',
  'Death Priest Shargon': '10.5',
  'Execowtioner': '10.5',
  'Glooth Blob': '10.5',
  'Glooth Fairy': '10.5',
  'Lisa': '10.5',
  'Minotaur Amazon': '10.5',
  'Minotaur Hunter': '10.5',
  'Mooh\'tah Warrior': '10.5',
  'Mooh\'Tah Warrior': '10.5',
  'Moohtant': '10.5',
  'Rot Elemental': '10.5',
  'The Ravager': '10.5',
  'Walker': '10.5',
  'Worm Priestess': '10.5',
  'Demon Outcast': '10.3',
  'Feversleep': '10.3',
  'Frazzlemaw': '10.3',
  'Gaz\'haragoth': '10.3',
  'Guzzlemaw': '10.3',
  'Horadron': '10.3',
  'Mawhawk': '10.3',
  'Omrafir': '10.3',
  'Prince Drazzak': '10.3',
  'Shiversleep': '10.3',
  'Shockhead': '10.3',
  'Sight of Surrender': '10.3',
  'Silencer': '10.3',
  'Terrorsleep': '10.3',
  'Enraged Soul': '10.2',
  'Furyosa': '10.2',
  'Hirintror': '10.2',
  'Ocyakao': '10.2',
  'Shlorg': '10.2',
  'The Pale Count': '10.2',
  'The Welter': '10.2',
  'Tyrn': '10.2',
  'White Pale': '10.2',
  'Zushuka': '10.2',
  'Blood Hand': '10.1',
  'Blood Priest': '10.1',
  'Elder Wyrm': '10.1',
  'Forest Fury': '10.1',
  'Gravedigger': '10.1',
  'Leaf Golem': '10.1',
  'Nightfiend': '10.1',
  'Rorc': '10.1',
  'Shadow Pupil': '10.1',
  'Tarnished Spirit': '10.1',
  'Vampire Viscount': '10.1',
  'Vicious Manbat': '10.1',
  'White Shade': '10.1',
  'Wilting Leaf Golem': '10.1',
  'Adventurer': '9.8',
  'Angry Adventurer': '9.8',
  'Drillworm': '9.8',
  'Emerald Damselfly': '9.8',
  'Little Corym Charlatan': '9.8',
  'Lost Basher': '9.8',
  'Lost Husher': '9.8',
  'Lost Thrower': '9.8',
  'Marsh Stalker': '9.8',
  'Party Skeleton': '9.8',
  'Pigeon': '9.8',
  'Salamander': '9.8',
  'Swampling': '9.8',
  'Water Buffalo': '9.8',
  'Young Troll': '9.63',
  'Abyssador': '9.6',
  'Deathstrike': '9.6',
  'Gnomevil': '9.6',
  'Vesperoth': '9.6',
  'Armadile': '9.6',
  'Cliff Strider': '9.6',
  'Crystalcrusher': '9.6',
  'Damaged Crystal Golem': '9.6',
  'Dragonling': '9.6',
  'Enraged Crystal Golem': '9.6',
  'Enslaved Dwarf': '9.6',
  'Hideous Fungus': '9.6',
  'Humongous Fungus': '9.6',
  'Humorless Fungus': '9.6',
  'Ironblight': '9.6',
  'Lava Golem': '9.6',
  'Lost Berserker': '9.6',
  'Magma Crawler': '9.6',
  'Modified Gnarlhound': '9.6',
  'Mushroom Sniffer': '9.6',
  'Orewalker': '9.6',
  'Stone Devourer': '9.6',
  'Vulcongra': '9.6',
  'Weeper': '9.6',
  'Wiggler': '9.6',
  'Bretzecutioner': '9.5',
  'Bruise Payne': '9.5',
  'Chopper': '9.5',
  'Fazzrah': '9.5',
  'Fleshslicer': '9.5',
  'Hemming': '9.5',
  'Maw': '9.5',
  'Mindmasher': '9.5',
  'Paiz the Pauperizer': '9.5',
  'Rotspit': '9.5',
  'Shadowstalker': '9.5',
  'Tormentor': '9.5',
  'Tromphonyte': '9.5',
  'Zanakeph': '9.5',
  'Jaul': '9.4',
  'Obujos': '9.4',
  'Tanjis': '9.4',
  'Calamary': '9.4',
  'Crawler': '9.4',
  'Deepling Guard': '9.4',
  'Deepling Spellsinger': '9.4',
  'Deepling Warrior': '9.4',
  'Deepling Worker': '9.4',
  'Fish (Creature)': '9.4',
  'Floor Blob': '9.4',
  'Hive Pore': '9.4',
  'Insectoid Worker': '9.4',
  'Jellyfish': '9.4',
  'Kollos': '9.4',
  'Ladybug': '9.4',
  'Lady Bug': '9.4',
  'Lesser Swarmer': '9.4',
  'Manta Ray': '9.4',
  'Northern Pike (Creature)': '9.4',
  'Slippery Northern Pike': '9.4',
  'Shark': '9.4',
  'Spidris': '9.4',
  'Spidris Elite': '9.4',
  'Spitter': '9.4',
  'Swarmer': '9.4',
  'Swarmer Hatchling': '9.4',
  'Askarak Demon': '9.1',
  'Askarak Lord': '9.1',
  'Askarak Prince': '9.1',
  'Bog Frog': '9.1',
  'Clay Guardian': '9.1',
  'Crystal Wolf': '9.1',
  'Death Priest': '9.1',
  'Deepling Scout': '9.1',
  'Desperate White Deer': '9.1',
  'Diamond Servant': '9.1',
  'Donkey': '9.1',
  'Dromedary': '9.1',
  'Elder Mummy': '9.1',
  'Elf Overseer': '9.1',
  'Energized Raging Mage': '9.1',
  'Enraged White Deer': '9.1',
  'Feverish Citizen': '9.1',
  'Filth Toad': '9.1',
  'Firestarter': '9.1',
  'Ghoulish Hyaena': '9.1',
  'Golden Servant': '9.1',
  'Grave Guard': '9.1',
  'Groam': '9.1',
  'Honour Guard': '9.1',
  'Horestis': '9.1',
  'Horse': '9.1',
  'Insectoid Scout': '9.1',
  'Iron Servant': '9.1',
  'Kraknaknork': '9.1',
  'Kraknaknork\'s Demon': '9.1',
  'Mad Mage': '9.1',
  'Raging Mage': '9.1',
  'Sacred Spider': '9.1',
  'Sandstone Scorpion': '9.1',
  'Shaburak Demon': '9.1',
  'Shaburak Lord': '9.1',
  'Shaburak Prince': '9.1',
  'Slug': '9.1',
  'Spider Queen': '9.1',
  'Starving Wolf': '9.1',
  'Thornfire Wolf': '9.1',
  'Tomb Servant': '9.1',
  'Weakened Demon': '9.1',
  'White Deer': '9.1',
  'Yielothax': '9.1'
} },
        droppedby_perc_data = {}, loot_perc_data = {},
        loot_perc_datao = '',
        loot_perc_datap = '',
        loot_perc_dataoa = true,
        droppedby_inaccurate = [],
        droppedby_minimum = 500,
        loot_minimum = 500,
        loot_perc_sort = function (sid) {
            $('#' + sid).each(function () {
                var t = $(this).html().replace(/<img[^>]*id="(?:loot|droppedby)_perc_load"[^>]*>/, ''),
                    sp = t.match(/(<span[\s\S]*>[^\d]*?<\/span>)/i),
                    prefix = '', postfix = '',
                    delim,
                    concatstr;
                sp = (sp === null ? '' : sp[1]);
                t = $.trim(t.replace(sp, ''));
                while (t.substr(-1) === '.') {
                    t = t.substr(0, t.length - 1);
                }
                if (t.indexOf("<li>") !== -1) {
                    delim = "\n";
                    concatstr = "\n";
                    prefix = "<ul>";
                    postfix = "</ul>";
                    t = t.replace(prefix, '').replace(postfix, '');
                } else if (t.indexOf(",") !== -1) {
                    delim = ",";
                    concatstr = ", ";
                }
                t = t.split(delim);
                t.sort(function (a, b) {
                    b = (b.match(/\(([\d\.]+)%\)/) || [0, 0])[1];
                    a = (a.match(/\(([\d\.]+)%\)/) || [0, 0])[1];
                    return parseFloat(b) - parseFloat(a);
                });
                $.each(t, function (i, v) {
                    t[i] = $.trim(v);
                });
                $(this).html(prefix + t.join(concatstr) + sp + postfix);
            });
        },
        loot_perc_get_data = function (text, cname) {
            var get_it = function (version) {
                version = version.replace(/\\/g, '').replace(/\./g, '\\.');
                var items, x, r = new RegExp('version[\\s]?=[\\s]?' + version + '[^}\\d]*?kills[\\s]?=[\\s]?(\\d*)([\\s\\S]*?)}' + '}'),
                    matches = text.match(r);
                if (matches !== null && matches.length === 3 && parseInt(matches[1], 10) > 0) {
                    loot_perc_data.kills = parseInt(matches[1], 10);
                    items = matches[2].split('|');
                    for (x = 0; x < items.length; x++) {
                        if (items[x].match(/times:/)) {
                            loot_perc_data[$.trim(items[x].split(',')[0])] = (Math.round((parseInt(items[x].split('times:')[1].split(',')[0], 10) / parseInt(matches[1], 10)) * 10000) / 100) + '%';
                        }
                    }
                }
            };
            if (text !== false) {
                cname = cname.replace(/_/g, ' ');
                if (lootparser_versions_ex.hasOwnProperty(current_tibia_version) && lootparser_versions_ex[current_tibia_version].hasOwnProperty(cname)) {
                    get_it(lootparser_versions_ex[current_tibia_version][cname]);
                } else {
                    get_it(current_tibia_version);
                }
            }
        },
        loot_perc_put_data = function () {
            var t, off, ex;
            if (typeof loot_perc_data.kills === 'undefined') {
                off = $('#loot_perc_text').offset();
                $('body:first').append(
                $('<div>There is no statistics <br />information to show percentages</div>').attr('id', 'loot_perc_not_enough')
                    .css({
                    'display': 'none',
                        'z-index': '999',
                        'top': String(off.top - 20) + 'px',
                        'left': String(off.left - 35) + 'px',
                        'position': 'absolute',
                        'background-color': '#0038d8',
                        'border-radius': '4px',
                        'box-shadow': '0px 0px 5px',
                        'color': '#ffffff',
                        'margin': '0px',
                        'padding': '10px 20px'
                }).fadeIn('slow', function () {
                    setTimeout(function () {
                        $('#loot_perc_text').hide();
                        $('#loot_perc_not_enough').fadeOut('slow');
                    }, 4000);
                }));
                $('#loot_perc_loot').html(loot_perc_datao);
            } else {
                if (loot_perc_data.kills < loot_minimum) {
                    if ($('#loot_perc_inaccurate').size() === 0) {
                        $('#loot_perc_text').after($('<span class="information-icon"></span>').attr('id', 'loot_perc_inaccurate').attr('title', '%s are not accurate because the low amount of kills (' + loot_perc_data.kills + ' kills).').click(function () {
                            alert('%s are not accurate because the low amount of kills (' + loot_perc_data.kills + ' kills).');
                        }));
                    }
                    $('#loot_perc_text').show();
                }
                $('#loot_perc_text').attr('title', 'Based on ' + loot_perc_data.kills + ' kills');
                $('#loot_perc_loot a').each(function () {
                    ex = {
                        'gp': 'Gold Coin',
                            'skull (item)': 'Skull',
                            'black skull (item)': 'Black Skull',
                            'rusty armor (common)': 'Rusty Armor',
                            'rusty armor (semi-rare)': 'Rusty Armor',
                            'rusty armor (rare)': 'Rusty Armor',
                            'rusty legs (common)': 'Rusty Legs',
                            'rusty legs (semi-rare)': 'Rusty Legs',
                            'rusty legs (rare)': 'Rusty Legs'
                    };
                    t = decodeURI($(this).attr('href').replace(/.*\/(.*?)$.*/, '$1').replace(/_/g, ' '));
                    if (ex.hasOwnProperty(t.toLowerCase())) {
                        t = ex[t.toLowerCase()];
                    }
                    if (loot_perc_data.hasOwnProperty(t)) {
                        $(this).after(' (' + loot_perc_data[t] + ')');
                    }
                });
                loot_perc_sort('loot_perc_loot');
                loot_perc_datap = $('#loot_perc_loot').html();
            }
        },
        loot_perc_loaded = function (text, cname) {
            loot_perc_get_data(text, cname);
            $('#loot_perc_load').hide();
            loot_perc_put_data();
            loot_perc_dataoa = false;
        },
        loot_perc_load = function () {
            if (loot_perc_dataoa && loot_perc_datap === '') {
                $('#loot_perc_loot').html($('#loot_perc_loot').html().replace(/[\s]?\((?:semi-|very |extremely )?rare\)[\s]?/g, ''))
                    .prepend('<img id="loot_perc_load" src="https://images.wikia.nocookie.net/tibia/en/images/8/87/Ajax_Load_Image.gif" alt="Loading %s" />');
                $.ajax({
                    url: '/index.php?title=Loot_Statistics:' + conf.wgTitle + '&action=raw',
                    dataType: 'text',
                    timeout: 15000,
                    success: function (text) {
                        loot_perc_loaded(text, conf.wgTitle);
                    },
                    error: function () {
                        loot_perc_loaded(false);
                    }
                });
            } else if (loot_perc_dataoa) {
                $('#loot_perc_loot').html(loot_perc_datap);
                $('#loot_perc_inaccurate').show();
                loot_perc_dataoa = false;
            } else {
                $('#loot_perc_loot').html(loot_perc_datao);
                $('#loot_perc_inaccurate').hide();
                loot_perc_dataoa = true;
            }
        },
        droppedby_perc_put_data = function () {
            var t;
            $('#droppedby_perc_creat a').each(function () {
                var d, t = $(this).text();
                if (droppedby_perc_data.hasOwnProperty(t)) {
                    d = droppedby_perc_data[t];
                    if (d[1] < droppedby_minimum) {
                        droppedby_inaccurate.push(t);
                    }
                    $(this).after($('<span> (' + d[0] + ')</span>').attr('title', 'Based on ' + d[1] + ' kills').css('cursor', 'pointer'));
                }
            });
            loot_perc_sort('droppedby_perc_creat');
            $('#droppedby_perc_creat span').css('color', '#0148C2').click(function () {
                window.open('/wiki/Loot_Statistics:' + $(this).prev().text());
            });
            if (droppedby_inaccurate.length > 0) {
                t = 'Some %s are not accurate because the low amount of kills:\n' + droppedby_inaccurate.join('\n');
                $('#droppedby_perc_text').after($('<span class="information-icon"></span>').attr('title', t).click(function () {
                    alert(t);
                }));
            }
        },
        droppedby_perc_get_data = function (text, cname, item) {
            if (typeof item === 'undefined') {
                item = conf.wgTitle;
            }
            var ex = {
                'skull (item)': 'Skull',
                    'black skull (item)': 'Black Skull',
                    'rusty armor (common)': 'Rusty Armor',
                    'rusty armor (semi-rare)': 'Rusty Armor',
                    'rusty armor (rare)': 'Rusty Armor',
                    'rusty legs (common)': 'Rusty Legs',
                    'rusty legs (semi-rare)': 'Rusty Legs',
                    'rusty legs (rare)': 'Rusty Legs'
            },
            get_it = function (version) {
                version = version.replace(/\\/g, '').replace(/\./g, '\\.');
                var r = new RegExp('version[\\s]?=[\\s]?' + version + '[^}\\d]*?kills[\\s]?=[\\s]?(\\d*)[^}]*?name[\\s]?=[\\s]?(.*)[|\\r\\n][^}]*?[|][\\s]?(' + (item.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")) + ')[\\s]?,[^}\\r\\n]*?times:(\\d*)'),
                    matches = text.match(r);
                if (matches !== null && matches.length === 5 && matches[2] && parseInt(matches[1], 10) > 0) {
                    droppedby_perc_data[matches[2]] = [(Math.round((parseInt(matches[4], 10) / parseInt(matches[1], 10)) * 10000) / 100) + '%', parseInt(matches[1], 10)];
                }
            };
            if (text !== false) {
                if (ex.hasOwnProperty(item.toLowerCase())) {
                    item = ex[item.toLowerCase()];
                }
                cname = cname.replace(/_/g, ' ');
                if (lootparser_versions_ex.hasOwnProperty(current_tibia_version) && lootparser_versions_ex[current_tibia_version].hasOwnProperty(cname)) {
                    get_it(lootparser_versions_ex[current_tibia_version][cname]);
                } else {
                    get_it(current_tibia_version);
                }
            }
        },
        droppedby_perc_loading = 0,
        droppedby_perc_loaded = function (text, cname) {
            droppedby_perc_loading--;
            droppedby_perc_get_data(text, cname);
            if (droppedby_perc_loading < 1) {
                $('#droppedby_perc_load').hide();
                droppedby_perc_put_data();
            }
        },
        droppedby_perc_load = function () {
            $('#droppedby_perc_text').hide();
            var t = [];
            $('#droppedby_perc_creat a').each(function () {
                t.push($(this).attr('title'));
            });
            droppedby_perc_loading = t.length;
            $('#droppedby_perc_creat').prepend('<img id="droppedby_perc_load" src="https://images.wikia.nocookie.net/tibia/en/images/8/87/Ajax_Load_Image.gif" alt="Loading %s" />');
            $.each(t, function (i, v) {
                t[i] = $.trim(v);
                $.ajax({
                    url: '/index.php?title=Loot_Statistics:' + t[i] + '&action=raw',
                    dataType: 'text',
                    timeout: 15000,
                    success: function (text) {
                        droppedby_perc_loaded(text, t[i]);
                    },
                    error: function () {
                        droppedby_perc_loaded(false);
                    }
                });
            });
        };
    $('#droppedby_perc_tr>td:eq(0),#item-droppedby>h3:eq(0)')
        .append($('<a id="droppedby_perc_text" style="font-size:80%" href="#">(Load %)</a>').click(function () {
        droppedby_perc_load();
        return false;
    }))
        .next().attr('id', 'droppedby_perc_creat');
    loot_perc_datao = $('#loot_perc_tr>td:eq(0),#creature-loot>h3:eq(0)')
        .append($('<a id="loot_perc_text" style="font-size:80%" href="#"">(Toggle % view)</a>').click(function () {
        loot_perc_load();
        return false;
    }))
        .next().attr('id', 'loot_perc_loot').html();
});
/* End of Loot percentage data */
/* Calculators */
if (conf.wgPageName === 'Calculators') {
    $(function () {
        $.ajax({
            url: '/index.php?title=Calculators/Code&action=raw',
            dataType: 'text',
            success: function (text) {
                text = text.slice(text.search('id="pre_calculators">') + 21, text.search('<\/pre>'));
                $('body:first').append('<script type="text/javascript">' + text + '</script>');
            }
        });
    });
}
/* End of Calculators */
/* Quest transcript linker start */
$(function () {
    if ($.inArray('Quest Overview Pages', conf.wgCategories) === -1 && $.inArray('Quest Spoiling Pages', conf.wgCategories) === -1) {
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
/* Achievements toggle spoilers start */
if (conf.wgPageName === 'Achievements') {
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

/* Achievements toggle spoilers end */ (function () {
    "use strict";
    // button to display all spoilers on the Achievements page
    if (conf.wgPageName === 'Achievements') {
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
if (conf.wgAction === 'view' || conf.wgAction === 'submit' || conf.wgAction === 'purge') {
    $(custom_spoiler);
}
/* end of custom spoiler toggle */

/* Demo test
 * temporary script showing creature ability demonstrations
 * preview at [[User:Sixorish/Abilities/Tanjis]]
 */
$(function () {
    var script;
    if (conf.wgPageName.indexOf('User:Sixorish/Abilities') === 0) {
        // Load User:Sixorish/Abilities/Render.js
        script = document.createElement('script');
        script.src = '/wiki/User:Sixorish/Abilities/Render.js?action=raw&nocache=' + Math.round(Math.random() * 10000000);
        document.getElementsByTagName('head')[0].appendChild(script);
    }
});
(function () {
    // Lightbearer monitor script
    if (mw.config.get("wgPageName") === "TibiaWiki:Tools/Lightbearer_Basin_Monitor") {
        $(function () {
            var script = document.createElement("script"),
                head = document.getElementsByTagName("head")[0];
            script.src = "http://tibia.wikia.com/wiki/TibiaWiki:Tools/Lightbearer_Basin_Monitor/Code.js?action=raw&nocache=" + Math.floor(Math.random() * 100);
            head.appendChild(script);
        });
    }
}());
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
    game.worlds = ["Antica", "Nova", "Premia", "Amera", "Secura", "Libera", "Lunara", "Eternia", "Trimera", "Calmera", "Danubia", "Isara", "Rubera", "Julera", "Valoria", "Hiberna", "Solera", "Titania", "Azura", "Chimera", "Harmonia", "Pacera", "Aldora", "Mythera", "Dolera", "Elysia", "Inferna", "Xantera", "Aurea", "Samera", "Galana", "Tenebra", "Lucera", "Fortera", "Celesta", "Pythera", "Arcania", "Jamera", "Astera", "Pandoria", "Shivera", "Danera", "Elera", "Iridia", "Morgana", "Selena", "Silvera", "Zanera", "Empera", "Nebula", "Saphira", "Shanera", "Berylia", "Guardia", "Grimera", "Honera", "Balera", "Furora", "Neptera", "Thoria", "Luminera", "Refugia", "Askara", "Malvera", "Obsidia", "Vinera", "Kyra", "Ocera", "Keltera", "Xerena", "Candia", "Menera", "Nerana", "Unitera", "Fidera", "Magera", "Olympa", "Aurora", "Aurera", "Calva", "Calvera", "Kenora", "Garnera", "Kronera", "Nika", "Rowana", "Thera", "Hydera", "Quilia", "Morta", "Mortera", "Bellona", "Efidia", "Iona", "Irmada", "Justera", "Umera", "Yanara", "Chrona", "Eldera"];
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
        return 'https://secure.tibia.com/community/?subtopic=houses&page=view&houseid=' + id + '&world=' + w;
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
            worlds = window.game.worlds.slice(0);
            worlds.sort();
            html += 'Your game server: <select id="set-gameworld">';
            html += '<option value="-1">Set a game server</option>';
            for (i = 0, len = window.game.worlds.length; i < len; i += 1) {
                html += '<option value="' + window.game.worldIds[worlds[i]] + '">' + worlds[i] + '</option>';
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
            href = window.game.getHouseUrl(getCookie("TW_gameworld") || "0", e.getAttribute('data-houseid') || "0");
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
$(document).ready(function () {
    /* Add a class to document.body if textShadow isn't supported */
    var e = document.createElement("div"), compat = {};
    if (e.style.textShadow !== "") {
        $(document.body).addClass("nosupport-textShadow");
    }
});
/* Load /wiki/Creature_Ranks.css when the document is ready */
$(document).ready(function () {
    $.ajax({
        url: 'http://tibia.wikia.com/wiki/TibiaWiki:Styles/Creature_Ranks.css?action=raw',
        success: function (r) {
            $(document.body).append("<style type=\"text/css\">" + r + "</style>");
        }
    });
});
/* Sort creature resistance bars by their value (data-value) */
$(document).ready(function () {
  var arr = $("#creature-resistance ul").children('li');
  Array.prototype.sort.call(arr, function (a, b) {
    return b.getAttribute("data-value") - a.getAttribute("data-value");
  });
  $("#creature-resistance ul").append(arr);
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
    // Temporary measure to warn about vandalism
    if (mw.config.get('wgCanonicalNamespace') === '' && mw.config.get('wgAction') === 'view' && !(getCookie("TW_hidevandalwarning") || false)) {
        $(document.body).append("<script src=\"http://tibia.wikia.com/wiki/TibiaWiki:Scripts/VandalWarn?action=raw\">");
    }
}());
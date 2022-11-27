//<noinclude>{{protected|this page contains javascript and therefor VERY vulnerable to vandalism or hackers}}</noinclude>
/*jslint devel: true, browser: true, white: true, indent: 2, plusplus: true, bitwise: true*/
/*global $, wgUserName, mw */

// We need to load the Mapper script because creatures may contain mapper links.
importArticles({
    type: 'script',
    article: 'MediaWiki:Mapper.js'
});
$(function(){
    //__NOWYSIWYG__
    'use strict';
    var bestiary_creature_baseinfo = [],
    bestiary_difficulty = ['harmless', 'trivial', 'easy', 'medium', 'hard', 'challenging', 'veryrare'],
    bestiary_classes = {Amphibic:0,  Aquatic:0,  Bird:0,  Construct:0,  Demon:0,  Dragon:0,  Elemental:0,  'Extra Dimensional':0,  Fey:0,  Giant:0,  Human:0,  Humanoid:0,  Lycanthrope:0,  Magical:0,  Mammal:0,  Plant:0,  Reptile:0,  Slime:0,  Undead:0,  Vermin:0},
    bestiary_creature_classes = {Amphibic:[],  Aquatic:[],  Bird:[],  Construct:[],  Demon:[],  Dragon:[],  Elemental:[],  'Extra Dimensional':[],  Fey:[],  Giant:[],  Human:[],  Humanoid:[],  Lycanthrope:[],  Magical:[],  Mammal:[],  Plant:[],  Reptile:[],  Slime:[],  Undead:[],  Vermin:[]},
    dmgMods = ['physicalDmgMod', 'earthDmgMod', 'fireDmgMod', 'energyDmgMod', 'iceDmgMod','deathDmgMod', 'holyDmgMod', 'healMod'],
    dmgNames = ['physical', 'earth', 'fire', 'energy', 'ice', 'death', 'holy', 'heal'],
    bestiary_vr_creatures = [],
    currclass = 'Magical',
    creaturedata = {},
    fpath = 'https://tibia.fandom.com/wiki/Special:FilePath?file=',
    //Get creature data on demand from raw wikitext
    bestiary_get_creature_info_raw = function (name) {
        var result,
        path1 = 'https://tibia.fandom.com/index.php?title=',
        path2 = '&action=raw';
        bestiary_clear_ui();
        $.ajax({
            async: true,
            type: 'GET',
            url: path1 + name + path2,
            success: function(raw) {
                result = raw;
                $.each(result.split('\n'), function (i, v) {
                    var propv, propn, item,
                    rarity = 'alwaysuncommonvery raresemi-rare';
                    if (v.includes('{{Loot Table')) { //Initializes loot array 
                        creaturedata.loot = [];
                    } else if (v.includes('{{Loot Item|')) {
                        item = v.replace(/\s?\|\s?\u007B\u007BLoot Item\|/, '');
                        item = item.replace(/}}\s?/, '');
                        item = item.split('|');
                        propv = {};
                        propn = 'loot';
                        propv.amount = '1';
                        propv.rarity = 'common';
                        if (item.length == 1) {
                            propv.iname = item[0];
                        } else if (item.length == 2) {
                            if (rarity.includes(item[1])) {
                                propv.iname = item[0];
                                propv.rarity = item[1];
                            } else {
                                propv.amount = item[0];
                                propv.iname = item[1];
                            }
                        } else {
                            propv.amount = item[0];
                            propv.iname = item[1];
                            propv.rarity = item[2];
                        }
                        propv.rarity = propv.rarity.replace(/[\s-]/,'');
                        propv.rarity = propv.rarity == 'always' ? 'common' : propv.rarity;
                        creaturedata.loot.push(propv);
                    } else {
                        var matches = v.match(/\s*\|\s?(\w+)/);
                        if (matches !== null && matches.length > 0) {
                            propn = matches[1];
                            propv = v.replace(/^\s*\|\s?.+?=\s?/, ''); //Remove bar, prop name and leading empty space
                            propv = propv.replace(/\[\[([^\]]+?)\|(.+?)\]\]/g, '<a href="' + path1 + '$1">$2</a>'); //Replace [[page|display]] with link tags
                            propv = propv.replace(/\[\[(.+?)\]\]/g, '<a href="' + path1 + '$1">$1</a>'); //Replace [[page]] with link tags
                            if (propn == 'location') {
                                propv = propv.replace(/\u007B\u007BMapper Coords\|?([0-9.|]+)?\|text=([\w ]+)\|?([0-9.|]+)?\u007D\u007D/g, '<a href="' + path1 + 'Mapper?coords=$1$3">$2</a>').replace(/\|/g, '-'); //Replace Mapper template links
                                propv = propv.replace(/\s\[(http.+?)\s(.+?)\]/g, ' <a href="$1">$2</a>'); //Replace mapper direct links
                            }
                            creaturedata[propn] = propv;
                        }
                    }
                });
                creaturedata.ur = fpath + creaturedata.name + '.gif';
                bestiary_populate_ui();
            }
        });
        return false;
    },
    //Get list of all bestiary creatures from DPL table. 
    bestiary_get_creature_list = function (diff) {
        var ret = [],
        x, p, h = $('#bestiary_list_' + diff).html().replace(/<p>/gi, '').replace(/<\/p>/gi, '');
        while (h.search(/\s\s/) !== -1) {
            h = h.replace(/\s\s/g, ' ');
        }
        h = h.replace(/\s/g, ' ');
        p = h.split('|');
        for (x in p) {
            if (p.hasOwnProperty(x)) {
                p[x] = $.trim(p[x]);
            }
        }
        while (p[0] === '') {
            p = p.slice(1);
        }
        for (x = 0; x < p.length; x) {
            ret.push({
                name: p[x++],
                bclass: p[x++],
                raceid: parseFloat(p[x++])});
            if (ret[ret.length - 1].bclass === '') {
            	ret.pop();
            }
        }
		return ret;	
    },
    bestiary_level_imgs = {harmless: 'https://static.wikia.nocookie.net/tibia/images/a/ab/Bestiary_Level_Harmless.gif/revision/latest?cb=20200618024600&path-prefix=en&format=original', trivial: 'https://static.wikia.nocookie.net/tibia/images/d/d1/Bestiary_Level_Trivial.gif/revision/latest?cb=20200618024558&path-prefix=en&format=original', easy: 'https://static.wikia.nocookie.net/tibia/images/b/bf/Bestiary_Level_Easy.gif/revision/latest?cb=20200618024557&path-prefix=en&format=original', medium: 'https://static.wikia.nocookie.net/tibia/images/f/ff/Bestiary_Level_Medium.gif/revision/latest?cb=20200618024555&path-prefix=en&format=original', hard: 'https://static.wikia.nocookie.net/tibia/images/4/46/Bestiary_Level_Hard.gif/revision/latest?cb=20200618024554&path-prefix=en&format=original', challenging: 'https://static.wikia.nocookie.net/tibia/images/3/30/Bestiary_Level_Challenging.gif/revision/latest?cb=20200611174646&path-prefix=en&format=original'},
    bestiary_occurrence_imgs = {common: 'https://static.wikia.nocookie.net/tibia/images/2/2c/Bestiary_Occurrence_Common.gif/revision/latest?cb=20180618025920&path-prefix=en&format=original', uncommon: 'https://static.wikia.nocookie.net/tibia/images/2/2f/Bestiary_Occurrence_Uncommon.gif/revision/latest?cb=20180618025920&path-prefix=en&format=original', rare: 'https://static.wikia.nocookie.net/tibia/images/d/d5/Bestiary_Occurrence_Rare.gif/revision/latest?cb=20180618025921&path-prefix=en&format=original', veryrare: 'https://static.wikia.nocookie.net/tibia/images/0/08/Bestiary_Occurrence_Very_Rare.gif/revision/latest?cb=20180618025921&path-prefix=en&format=original'},
    bestiary_display_classes = function() {
        $('#bestiary_creature_namebar').hide();
        $('#bestiary_search_results').empty();
        $('#bestiary_search_results').show();
        $.each(bestiary_classes, function (n, v) {
            var nm = n, //Name may be trimmed, so 2 separate vars are required
            title = '';
            if (nm.length > 15) {
                nm = nm.substr(0, 13) + "...";
            }
            /*if (bestiary_vr_creatures.includes(v.name)) {
                vr = '<div title="Occurrence: Very Rare"><img src="' + fpath + 'Bestiary Occurrence Icon.gif"></div>';
            } */
            $('#bestiary_search_results').append(
                '<div class="bestiary_search_box">' +
                '<div class="bestiary_search_name bestiary_bgdark" title="' + n + '">' + nm + '</div>' +
                '<div class="bestiary_class_img" name="'+ n + '">' + 
                '<img src="' + fpath + n + '.png"></div>' +
                '<div class="bestiary_search_box_count">Total: ' + v + '</div>' +
                '<div class="bestiary_search_box_count">Known: ' + v + '</div>' +
                '</div>'
            );
        });
    },
    bestiary_clear_ui = function() {
        //Clears all data to avoid flickering before loading new creature
        $('#bestiary_creature_name').html('<a href="#" style="color: inherit;" target="_blank">?</a>'); //Empty string removes the bar name height
        
        $('#bestiary_creature_img, #bestiary_creature_hp, #bestiary_creature_exp, #bestiary_creature_speed, #bestiary_creature_armor, #bestiary_creature_mit, #bestiary_creature_bestiarylevel, #bestiary_creature_occurrence, #bestiary_creature_attack #bestiary_creature_charms, #bestiary_kills2, #bestiary_creature_locations').html('?');
        $.each(dmgMods, function (i, v) {
            var tmp = '#bestiary_creature_' + v;
            var val = 100;
            $(tmp).attr('class', 'bestiary_dmg_neutral');
            $(tmp).parent().attr('title', 'Sensitive to ' + dmgNames[i] + ': ' + val + '% (neutral)');
            $(tmp).width(21 + val/5);
        });
        $('#bestiary_loot_common, #bestiary_loot_uncommon, #bestiary_loot_semirare, #bestiary_loot_rare, #bestiary_loot_veryrare').empty();
        
    },
    bestiary_update_items_urls = function(urls) {
    	$.each(Object.keys(urls), function(i, v) {
    		$($("img[data-file='" + v +"']")[0]).attr('src', urls[v] + '&format=original');
    	});
    	/*$.each(urls, function(i, v) {
    		$('#loot_item_' + i).attr('src', v + '&format=original');
    	});*/
    },
    bestiary_populate_ui = function() {
        var minKills = {harmless: 25, trivial: 250, easy: 500, medium: 1000, hard: 2500, challenging: 5000},
        charmPts = {harmless: 1, trivial: 5, easy: 15, medium: 25, hard: 50, challenging: 100},
        charmPtsvr = {harmless: 5, trivial: 10, easy: 30, medium: 50, hard: 100, challenging: 200},
        occurr = creaturedata.occurrence.toLowerCase().replace(/\s/, ''),
        itemcounter = {},
        rareness = ['common', 'uncommon', 'semirare', 'rare', 'veryrare'];
        currclass = creaturedata.bestiaryclass;
        $('#bestiary_creature_img').html('<a href="https://tibia.fandom.com/wiki/' + creaturedata.name + '" target="_blank"><img src="' + creaturedata.ur + '"></a>');
        $('#bestiary_creature_name').html('<a href="https://tibia.fandom.com/wiki/' + creaturedata.name + '" style="color: inherit;" target="_blank">' + creaturedata.name + '</a>');
        $('#bestiary_creature_hp').html(creaturedata.hp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); //add comma if 4+ digits
        $('#bestiary_creature_exp').html(creaturedata.exp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        $('#bestiary_creature_speed').html(creaturedata.speed);
        $('#bestiary_creature_armor').html(creaturedata.armor);
        $('#bestiary_creature_mit').html(creaturedata.mitigation.toString() + "%");
        //
        if (creaturedata.bestiarylevel !== "") {
            $('#bestiary_creature_bestiarylevel').html('<img src="' + bestiary_level_imgs[creaturedata.bestiarylevel.toLowerCase()] + '">'); 
            $('#bestiary_creature_bestiarylevel').attr('title', 'Difficulty: ' + creaturedata.bestiarylevel);
        } else {
            $('#bestiary_creature_bestiarylevel').empty();
        }
        if (creaturedata.occurrence !== "") {
            $('#bestiary_creature_occurrence').html('<img src="' + bestiary_occurrence_imgs[occurr] + '">');
            $('#bestiary_creature_occurrence').attr('title', 'Occurrence: ' + creaturedata.occurrence);
        } else {
            $('#bestiary_creature_occurrence').empty();
        }
        if (creaturedata.occurrence == "Very Rare") {
            $('#bestiary_creature_charms').html(charmPtsvr[creaturedata.bestiarylevel.toLowerCase()]);
        } else {
            $('#bestiary_creature_charms').html(charmPts[creaturedata.bestiarylevel.toLowerCase()]);
        }
        if (creaturedata.attacktype !== "") {
        	var attackimg = fpath + "Logout_Block_Icon.gif";
        	var attacktitle = "Creature attacks in melee range.";
        	if (creaturedata.attacktype.toLowerCase() == "distance") {
        		attackimg = fpath + "Distance_Fighting_Icon.png";
        		attacktitle = "Creature attacks from a distance.";
        	} else if (creaturedata.attacktype.toLowerCase() == "none") {
        		attackimg = fpath + "No_Attack.png";
        		attacktitle = "Creature does not attack.";
        	}
            $('#bestiary_creature_attack').html('<img src="' + attackimg + '">');
            $('#bestiary_creature_attack').find('img:eq(0)').attr('title', attacktitle);
            if (creaturedata.usespells.toLowerCase() == "yes") {
            	$('#bestiary_creature_attack').append('<img src="' + fpath + 'Magic_Level_Icon.png' + '" style="margin-left:2px;">');
            	$('#bestiary_creature_attack').find('img:eq(1)').attr('title', 'Creature casts spells or uses skills.');
            }
        } else {
            $('#bestiary_creature_attack').empty();
        }
        //
        $('#bestiary_kills2').html(creaturedata.occurrence == "Very Rare" ? 5 : minKills[creaturedata.bestiarylevel.toLowerCase()]);
        $('#bestiary_kills2').attr('title', minKills[creaturedata.bestiarylevel.toLowerCase()] + ' / ' + minKills[creaturedata.bestiarylevel.toLowerCase()] + ' (fully unlocked)');

        $.each(dmgMods, function (i, v) {
            var tmp = '#bestiary_creature_' + v;
            var val = creaturedata[v] == '0%' ? 0 : (parseInt(creaturedata[v], 10) || 100);
            if (val < 0) {
            	$(tmp).attr('class', 'bestiary_dmg_immune');
                $(tmp).parent().attr('title', 'Sensitive to ' + dmgNames[i] + ': ' + val + '% (gets healed)');
            } else if (val === 0) {
                $(tmp).attr('class', 'bestiary_dmg_immune');
                $(tmp).parent().attr('title', 'Sensitive to ' + dmgNames[i] + ': ' + val + '% (immune)');
            } else if (val < 100) {
                $(tmp).attr('class', 'bestiary_dmg_strong');
                $(tmp).parent().attr('title', 'Sensitive to ' + dmgNames[i] + ': ' + val + '% (strong)');
            } else if (val ==100) {
                $(tmp).attr('class', 'bestiary_dmg_neutral');
                $(tmp).parent().attr('title', 'Sensitive to ' + dmgNames[i] + ': ' + val + '% (neutral)');
            } else if (val > 100) {
                $(tmp).attr('class', 'bestiary_dmg_weak');
                $(tmp).parent().attr('title', 'Sensitive to ' + dmgNames[i] + ': ' + val + '% (weak)');
            }
            if (val < 0) {
            	$(tmp).width(10);
            } else {
	            val += val > 100 ? 5 : 0; //Adds 5 if weak to account for 1px border between neutral and weak. 
	            $(tmp).width(21 + val/5);
            }
        });
        
        //
        $('#bestiary_creature_locations').html(creaturedata.location);
        //
        $.each(rareness, function(i, v) {
            $('#bestiary_loot_' + v).empty();
            itemcounter[v] = 0;
        });
        $('#bestiary_loot_common').empty();
        $('#bestiary_loot_uncommon').empty();
        if (typeof(creaturedata.loot) != "undefined") {
        	var apiqueries = [],
        	totalitems = 0,
        	origurls = {};
            $.each(creaturedata.loot, function(i, v) {
            	var itemurl = fpath + v.iname + ".gif",
            	pagetitle = 'File:' + v.iname + '.gif';
            	apiqueries.push(pagetitle);
            	$('#bestiary_loot_' + v.rarity).append('<div class="bestiary_loot_item" title="' + v.iname + '"><a href="https://tibia.fandom.com/wiki/' + v.iname + '" style="color:inherit;" target="_blank"><img data-file="' + pagetitle + '" src="' + itemurl + '"><span>' + v.amount + '</span></a></div>');
            	totalitems++;
				itemcounter[v.rarity]++;
            });
			$.ajax({
				async: true,
				type: 'GET',
			    url: 'https://tibia.fandom.com/api.php?action=query&titles=' + apiqueries.join('|') + '&prop=imageinfo&iiprop=url&format=json',
			    success: function (data) {
			    	$.each(data.query.pages, function(i, v) {
			    		origurls[v.title] = v.imageinfo[0].url;
			    	});
			    	bestiary_update_items_urls(origurls);
			    }
			});
        }
        $.each(rareness, function(i, v) {
            if (itemcounter[v] === 0) {
                $('#bestiary_loot_' + v).parent().hide();
            } else {
                $('#bestiary_loot_' + v).parent().show();
                var rows = Math.ceil(itemcounter[v] / 15);
                var itemsleft = rows*15 - itemcounter[v];
                for (i = 0; i < itemsleft; i++) {
                    $('#bestiary_loot_' + v).append('<div class="bestiary_loot_empty"></div>');
                }
                $('#bestiary_loot_' + v).parent().height(rows * 32 + 'px');
                $($('#bestiary_loot_' + v).parent().find('span')[0]).css('line-height', rows * 32 + 'px');
            }
        });
        $('#bestiary_back_btn').html('<img src="' + fpath + 'Back Arrow On.png">');
        //Update URL if user want to copy/paste to share:
        var url = new URL(window.location);
        url.searchParams.set('creature', creaturedata.name);
        history.pushState({}, null, url);
        
        // Rebind all the mapper links.
        // Only rebind if Mapper dependency loaded.
        typeof(mapper) !== 'undefined' && typeof(mapper.mapper_rebind_all_links) !== 'undefined' && mapper.mapper_rebind_all_links();
    },
    bestiary_populate_class = function (bclass) {
        if (typeof(bclass) == 'undefined') return;
        $('#bestiary_search_results').empty();
        $('#bestiary_back_btn').html('<img src="' + fpath + 'Back Arrow On.png">');
        //var bclass = $(this).attr('name');
        $.each(bestiary_creature_classes[bclass], function(i, v) {
                var nm = v, title = '', vr = '';
                if (nm.length > 15) {
                    title = ' title="' + nm + '"';
                    nm = nm.substr(0, 13) + "...";
                }
                if (bestiary_vr_creatures.includes(v)) {
                    vr = '<div title="Occurrence: Very Rare"><img src="' + fpath + 'Bestiary Occurrence Icon.gif"></div>';
                }
                $('#bestiary_search_results').append(
                    '<div class="bestiary_search_box">' +
                    '<div class="bestiary_search_name bestiary_bgdark"' + title + '>' + nm + '</div>' +
                    '<div class="bestiary_search_img" name="'+ v + '">' + 
                    '<img src="' + fpath + v + '.gif"></div>' +
                    '<div title="You have unlocked all information about this creature."><img src="' + fpath + 'Check_Mark.gif"></div>' +
                    vr +
                    '</div>'
                );
            });
    };
    $.each(bestiary_difficulty, function (i, v) {
       bestiary_creature_baseinfo = bestiary_creature_baseinfo.concat(bestiary_get_creature_list(v)); 
    });
    bestiary_creature_baseinfo.sort(function(a, b) {  //Sort by race_id 
        return a.raceid - b.raceid;
    });
    $.each(bestiary_creature_baseinfo, function (i, v) {
        bestiary_classes[v.bclass] += 1; 
        bestiary_creature_classes[v.bclass].push(v.name);
    });
    $.each(bestiary_get_creature_list('veryrare'), function (i, v){
        bestiary_vr_creatures.push(v.name);
    });
    $('#bestiary_search').html(
        '<input type="text" id="bestiary_input">'
    );
    $('#bestiary_back_btn').click(function() {
        if ($('#bestiary_creature_namebar').is(':visible')) {
            $('#bestiary_creature_namebar').hide();
            if (!$.trim($('#bestiary_search_results').html())) { //Shows class if there is no search 'history';
                bestiary_populate_class(currclass);   
            }
            $('#bestiary_search_results').show();
        } else {
            $('#bestiary_search_results').empty();
            $('#bestiary_back_btn').html('<img src="' + fpath + 'Back Arrow Off.png">');
            bestiary_display_classes();
        }
    });
    $('#bestiary_search_btn').click(function() {
        var query = $('#bestiary_input').val().toLowerCase();
        $('#bestiary_input').val('');
        if (query === '') {
            return;
        }
        var results = [];
        $.each(bestiary_creature_baseinfo, function (i, v) {
            if (v.name.toLowerCase().includes(query)) {
                results.push(v);
            } 
        });
        if (results.length == 1) {
            //bestiary_populate_ui();
            bestiary_get_creature_info_raw(results[0].name);
            $('#bestiary_creature_namebar').show();
            $('#bestiary_search_results').hide();
        } else if (results.length === 0) {
            return;
        } else {
            $('#bestiary_creature_namebar').hide();
            $('#bestiary_search_results').empty();
            $('#bestiary_search_results').show();
            $('#bestiary_back_btn').html('<img src="' + fpath + 'Back Arrow On.png">');
            $.each(results, function(i, v) {
                var nm = v.name, title = '', vr = '';
                if (nm.length > 15) {
                    title = ' title="' + nm + '"';
                    nm = nm.substr(0, 13) + "...";
                } 
                if (bestiary_vr_creatures.includes(v.name)) {
                    vr = '<div title="Occurrence: Very Rare"><img src="' + fpath + 'Bestiary Occurrence Icon.gif"></div>';
                }
                $('#bestiary_search_results').append(
                    '<div class="bestiary_search_box">' +
                    '<div class="bestiary_search_name bestiary_bgdark"' + title + '>' + nm + '</div>' +
                    '<div class="bestiary_search_img" name="'+ v.name + '">' + 
                    '<img src="' + fpath + v.name + '.gif"></div>' +
                    '<div title="You have unlocked all information about this creature."><img src="' + fpath + 'Check_Mark.gif"></div>' +
                    vr +
                    '</div>'
                );
            });
        } 
    });
    $(document).on('click', '.bestiary_class_img', function () {
        bestiary_populate_class($(this).attr('name'));
    });
    $(document).on('click', '.bestiary_search_img', function () {
        $('#bestiary_creature_namebar').show();
        $('#bestiary_search_results').hide();
        //bestiary_populate_ui($(this).attr('name'));
        bestiary_get_creature_info_raw($(this).attr('name'));
    });
    $('#bestiary_input').keypress(function(e) {
        if (e.which == 13) { //Enter key
            $('#bestiary_search_btn').click();
        }
    });
    var urlquery = new URL(window.location).searchParams.get("creature");
    if (urlquery !== null) {
        //bestiary_populate_ui(urlquery);
        bestiary_get_creature_info_raw(urlquery);
    } else {
        //bestiary_populate_ui('orc');
        bestiary_display_classes();
    }
    $('#bestiary_main').show();
    $('#bestiary_loading').hide();
});
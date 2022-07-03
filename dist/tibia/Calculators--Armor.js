$(function() {
	var get_item_name_from_img_src = function (src) {
            var tokens, imgnamecomponents, name;
            tokens = src.split(/\//);
            
            /*
             * All image links follow a similar pattern: tokens[7] contains image name.
             * Assumption: there are no slashes in the image name.
             * Assumption: there is only one extension separator (.) in the image name.
             * Example: Ancient_Amulet.gif
             */
            imgnamecomponents = (tokens[7] || "").split(".");
            
            /* First element of the components corresponds to the image file, without the extension. */
            name = decodeURIComponent(imgnamecomponents[0].replace(/_/g, ' ').toLowerCase());
            
            return name;
        },
         calculator_array_sort = function(inputArr, numeric, by_key, reverse, sub_key) {
            var tmp_arr = {},
                valArr = [],
                keyArr = [],
                keys = [],
                sorter, i, k, populateArr = [],
                is_numeric = function(v) {
                    v = parseFloat(v);
                    return (typeof v === 'number' && !isNaN(v));
                },
                bubbleSort = function(keyArr, inputArr, sub_key) {
                    var i, j, tempValue, tempKeyVal, ret;
                    for (i = inputArr.length - 2; i >= 0; i--) {
                        for (j = 0; j <= i; j++) {
                            ret = (sub_key === '') ? sorter(inputArr[j + 1], inputArr[j]) : sorter((typeof inputArr[j + 1].resist[sub_key] === 'undefined' ? inputArr[j + 1][sub_key] : inputArr[j + 1].resist[sub_key]), (typeof inputArr[j].resist[sub_key] === 'undefined' ? inputArr[j][sub_key] : inputArr[j].resist[sub_key]));
                            if (ret < 0) {
                                tempValue = inputArr[j];
                                inputArr[j] = inputArr[j + 1];
                                inputArr[j + 1] = tempValue;
                                tempKeyVal = keyArr[j];
                                keyArr[j] = keyArr[j + 1];
                                keyArr[j + 1] = tempKeyVal;
                            }
                        }
                    }
                };
            if (typeof numeric === 'undefined') {
                numeric = false;
            }
            if (typeof by_key === 'undefined') {
                by_key = false;
            }
            if (typeof reverse === 'undefined') {
                reverse = false;
            }
            if (typeof sub_key === 'undefined') {
                sub_key = '';
            }
            if (numeric) {
                sorter = function(a, b) {
                    return (reverse ? b - a : a - b);
                };
            } else {
                sorter = function(a, b) {
                    var x = a,
                        y = b,
                        tmp;
                    if (!is_numeric(a) && !is_numeric(b)) {
                        tmp = (function(a, b) {
                            a = a.search(/[a-z]/);
                            b = b.search(/[a-z]/);
                            if ((a !== 0 && b !== 0) || a === b) {
                                return 0;
                            }
                            if (a === 0) {
                                return -1;
                            }
                            if (b === 0) {
                                return 1;
                            }
                        }(x, y));
                        if (tmp !== 0) {
                            return tmp * (reverse ? -1 : 1);
                        }
                        if (a === b) {
                            return 0;
                        }
                        if (a > b) {
                            return (reverse ? -1 : 1);
                        }
                        return (reverse ? 1 : -1);
                    }
                    a = parseFloat(a) || 0;
                    b = parseFloat(b) || 0;
                    return (reverse ? b - a : a - b);
                };
            }
            if (by_key) {
                for (k in inputArr) {
                    if (inputArr.hasOwnProperty(k)) {
                        keys.push(k);
                    }
                } /*Make a list of key names*/
                keys.sort(sorter);
                for (i = 0; i < keys.length; i++) {
                    k = keys[i];
                    tmp_arr[k] = inputArr[k];
                } /*Rebuild array with sorted key names*/
                for (i in tmp_arr) {
                    if (tmp_arr.hasOwnProperty(i)) {
                        populateArr[i] = tmp_arr[i];
                    }
                }
            } else {
                for (k in inputArr) {
                    if (inputArr.hasOwnProperty(k)) {
                        valArr.push(inputArr[k]);
                        keyArr.push(k);
                    }
                } /*Get key and value*/
                try {
                    bubbleSort(keyArr, valArr, sub_key);
                } catch (e) {
                    return false;
                } /*Sort our new temporary arrays*/
                for (i = 0; i < valArr.length; i++) {
                    populateArr[keyArr[i]] = valArr[i];
                } /*Repopulate the old array*/
            }
            return populateArr;
        };
    	/*Armor*/
    (function() {
        $('#calculator_armor').append(
            '<div style="display:grid;grid-template-columns: 1fr 1fr 1fr 1fr;column-gap:2px">' +
            '<div style="background-color: rgba(255, 255, 255, .1);">' +
            '<div id="calculator_armor_body_main">' +
            '  <div style="top:2px;left:39px;"><img id="calculator_armor_body_helmet" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:39px;left:39px;"><img id="calculator_armor_body_armor" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:76px;left:39px;"><img id="calculator_armor_body_legs" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:113px;left:39px;"><img id="calculator_armor_body_boots" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:17px;left:2px;"><img id="calculator_armor_body_amulet" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:54px;left:76px;"><img id="calculator_armor_body_shield" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:54px;left:2px;"><img id="calculator_armor_body_weapon" alt="" src="" width="32" height="32" /></div>' +   
            '  <div style="top:91px;left:2px;"><img id="calculator_armor_body_ring" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:91px;left:76px;"><img id="calculator_armor_body_belt" alt="" src="" width="32" height="32" /></div>' +
            '</div>' +
            '</div><div style="grid-column: 2 / 5;">' +
            '  <div id="calculator_armor_items_div" class="text_align_left" style="overflow:auto;height:165px;background-color: rgba(255, 255, 255, .1);"></div>' +
            '</div><div>' +
            '  <div id="calculator_armor_links"><b>Links to items</b></div>' +
            '</td><td class="text_align_left" style="width:180px;">' +
            '  </div><div style="min-width:180px;"><table>' +
            '  <tr><th colspan="2">Sort by:</th></tr>' +
            '  <tr><td colspan="2"><input type="radio" value="name" name="calculator_armor_items_sort" />Name <input type="radio" value="oz" name="calculator_armor_items_sort" />Oz <input type="radio" value="arm" name="calculator_armor_items_sort" />Armor' +
            '  </td></tr><tr><th colspan="2">Protection:</th></tr>' +
            '  <tr><td><input type="radio" value="physical" name="calculator_armor_items_sort" checked="checked" />Physical</td><td><input type="radio" value="fire" name="calculator_armor_items_sort" />Fire</td></tr>' +
            '  <tr><td><input type="radio" value="earth" name="calculator_armor_items_sort" />Earth</td><td><input type="radio" value="energy" name="calculator_armor_items_sort" />Energy</td></tr>' +
            '  <tr><td><input type="radio" value="ice" name="calculator_armor_items_sort" />Ice</td><td><input type="radio" value="holy" name="calculator_armor_items_sort" />Holy</td></tr>' +
            '  <tr><td><input type="radio" value="death" name="calculator_armor_items_sort" />Death</td><td><input type="radio" value="manadrain" name="calculator_armor_items_sort" />Mana Drain</td></tr>' +
            '  <tr><td></td><td><input type="radio" value="lifedrain" name="calculator_armor_items_sort" />Life Drain</td></tr></table>' +
            '</div><div>' +
            '  <b>Damage type:</b><br /><select id="calculator_armor_damage_type" size="1"><option value="physical" selected="selected">Physical</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="energy">Energy</option><option value="ice">Ice</option><option value="holy">Holy</option><option value="death">Death</option><option value="manadrain">Mana Drain</option><option value="lifedrain">Life Drain</option></select>' +
            '  <br /><br />' +
            '  <b>Show items for:</b><br />' +
            '  <select id="calculator_armor_voc" size="1"><option value="0">All</option><option value="1" selected="selected">Druid</option><option value="2">Knight</option>  <option value="4">Paladin</option><option value="8">Sorcerer</option></select>' +
            '  <br /><br />' +
            '  <input type="checkbox" value="1" id="calculator_armor_np" /> Show non <br />protective items' +

            '</div><div">' +
            '  <b>Defensive Imbuements:</b><br/>' +
            '  Armor: <select style="width:85px;" id="calculator_armor_imbue_1" size="1" disabled><option value="none" selected="selected">None</option><option value="basic">Basic</option><option value="intricate">Intricate</option><option value="powerful">Powerful</option></select><br />' +
            '  Shield: <select style="width:85px;" id="calculator_armor_imbue_2" size="1" disabled><option value="none" selected="selected">None</option><option value="basic">Basic</option><option value="intricate">Intricate</option><option value="powerful">Powerful</option></select><br /><br />' +
            '  <hr />' +
            '  Required Level: <span id="calculator_armor_req_level">None</span><br />' +
            '  Needed Cap: <span id="calculator_armor_set_oz">0.00 oz</span><br />' +
            '  Total Armor: <span id="calculator_armor_set_arm">0</span><br />' +
            '  <span id="calculator_armor_set_prot">Physical protection: 0%</span>' +
            '</div></div>' +
            '<table id="calculator_armor_damages">' +
            '<tr><th>Hit with <span id="calculator_armor_damage_type_ind">Physical</span></th><td>10</td><td>20</td><td>50</td><td>100</td><td>200</td><td>300</td><td>400</td><td>800</td><td><input type="text" id="calculator_armor_custom_damage" value="100" size="5" maxlength="5" /></td></tr>' +
            '<tr><th>Will hit</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
            '</table>'
        );
        var calculator_armor_parts_names = ['amulet', 'ring', 'helmet', 'armor', 'legs', 'boots', 'shield', 'weapon', 'belt'],
            calculator_armor_names_parts = {
                'amulet': 0,
                'ring': 1,
                'helmet': 2,
                'armor': 3,
                'legs': 4,
                'boots': 5,
                'shield': 6,
                'weapon': 7,
                'belt': 8
            },
            calculator_armor_imbue_prot = {
                'Physical': [0, 0, 0, 0],
                'Fire': [0, 3, 8, 15],
                'Earth': [0, 3, 8, 15],
                'Energy': [0, 3, 8, 15],
                'Ice': [0, 3, 8, 15],
                'Holy': [0, 3, 8, 15],
                'Death': [0, 2, 5, 10],
                'Mana Drain': [0, 0, 0, 0],
                'Life Drain': [0, 0, 0, 0],
            },
            calculator_armor_get_link_for_name = function(item, part) {
                /* Filter out every image that doesn't match. We should be left with a jQuery object containing one element.
                 * If we aren't, just get the first one anyway. */
                 
                /* Wikia's Lazy Loading functionality requires us to check data-src. If data-src doesn't exist, it may have already been processed, so
                 * use the src as a fallback. This solves a rare issue of (usually a single) image not loading correctly. */
                 
                var $item = $('#calculator_armor_list_' + calculator_armor_parts_names[part] + '_img img').filter(function() {
                    var $this = $(this), dataSrc;
                    dataSrc = $this.attr('data-src') || $this.attr('src');
                    if(dataSrc !== null) {
                        /* OLD CODE.
                         * It should suffice to check if parsing the src would result in the same name as we've been provided.
                         * var a = dataSrc.split('/');
                         * return (decodeURIComponent(a[7]) === decodeURIComponent(item.replace(/ /g, '_') + '.gif') ? true : false);
                         */
                        return (get_item_name_from_img_src(dataSrc) === item.toLowerCase());
                    }
                }).first();
                
                return $item.attr('data-src') || $item.attr('src');
            },
            get_items_data = function(name) {
                var part = calculator_armor_names_parts[name],
                    ret = {},
                    x, p, h = $('#calculator_armor_list_' + name).html().replace(/<p>/gi, '').replace(/<\/p>/gi, ''),
                    get_vocation_number = function(t) {
                        t = t.toLowerCase();
                        return (t.match(/druid/i) ? 1 : 0) + (t.match(/knight/i) ? 2 : 0) + (t.match(/paladin/i) ? 4 : 0) + (t.match(/sorcerer/i) ? 8 : 0);
                    };
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
                for (x = 0; x < p.length; x = x + 8) {
                    /*jslint regexp: true */
                    ret[p[x].toLowerCase()] = {
                        name: p[x],
                        def: (parseInt(p[x + 1], 10) || 0),
                        arm: (parseInt(p[x + 2], 10) || 0),
                        oz: parseFloat(p[x + 3]) || 0,
                        att: $.trim(p[x + 4].replace(/none\.?/gi, '').replace(/<a.*?>(.*?)<\/a>/gi, '$1').replace(/</g, '')),
                        resist: {
                            physical: (parseInt((' ' + p[x + 5]).split(/physical/i)[1], 10) || 0),
                            fire: (parseInt((' ' + p[x + 5]).split(/fire/i)[1], 10) || 0),
                            earth: (parseInt((' ' + p[x + 5]).split(/earth/i)[1], 10) || 0),
                            energy: (parseInt((' ' + p[x + 5]).split(/energy/i)[1], 10) || 0),
                            ice: (parseInt((' ' + p[x + 5]).split(/ice/i)[1], 10) || 0),
                            holy: (parseInt((' ' + p[x + 5]).split(/holy/i)[1], 10) || 0),
                            death: (parseInt((' ' + p[x + 5]).split(/death/i)[1], 10) || 0),
                            manadrain: (parseInt((' ' + p[x + 5]).split(/mana drain/i)[1], 10) || 0),
                            lifedrain: (parseInt((' ' + p[x + 5]).split(/life drain/i)[1], 10) || 0)
                        },
                        lvl: (parseInt(p[x + 6], 10) || 0),
                        voc: get_vocation_number(p[x + 7]),
                        ur: calculator_armor_get_link_for_name(p[x], part)
                    };
                    /*jslint regexp: false */
                }
                x = 'No' + name.slice(0, 1).toUpperCase() + name.slice(1);
                ret[x.toLowerCase()] = {
                    name: x,
                    def: 0,
                    arm: 0,
                    oz: 0,
                    att: '',
                    lvl: 0,
                    voc: 0,
                    resist: {
                        physical: 0,
                        fire: 0,
                        earth: 0,
                        energy: 0,
                        ice: 0,
                        holy: 0,
                        death: 0,
                        manadrain: 0,
                        lifedrain: 0
                    }
                };
                ret[x.toLowerCase()].ur = calculator_armor_get_link_for_name(x, part);
                $('#calculator_armor_body_' + calculator_armor_parts_names[part]).attr('src', ret[x.toLowerCase()].ur);
                return ret;
            },
            calculator_armor_items_data = [get_items_data('amulet'), get_items_data('ring'), get_items_data('helmet'), get_items_data('armor'), get_items_data('legs'), get_items_data('boots'), get_items_data('shield'), get_items_data('weapon'), get_items_data('belt')],
            calculator_armor_vocv = 1,
            calculator_armor_current_part = 0,

            calculator_armor_template_translate = {
                'helmet': 'head',
                'armor': 'torso',
                'boots': 'feet',
                'amulet': 'neck',
                'ring': 'ring',
                'legs': 'legs',
                'shield': 'lefthand',
                'weapon': 'righthand',
                'shoulders': 'shoulders',
                'belt': 'belt'
            },
            calculator_armor_items_sorted,
            calculator_armor_do_items_sorted = function(part, key) {
                if (typeof key === 'undefined') {
                    key = $('[name=calculator_armor_items_sort]:checked').val();
                }
                calculator_armor_items_sorted = calculator_armor_items_data[part];
                if (key === 'name') {
                    calculator_armor_items_sorted = calculator_array_sort(calculator_armor_items_sorted, false, true);
                } else {
                    calculator_armor_items_sorted = calculator_array_sort(calculator_armor_items_sorted, false, false, true, key);
                }
            },
            calculator_armor_calculate = function(update_links) {
                var x, $links = $(),
                    tmp, tmpa = [],
                    dmg_type = $('#calculator_armor_damage_type :selected').text(),
                    imbue_prots = [],
                    min_val = [],
                    max_val = [],
                    calculate_damage = function(total_arm, damage, prot) {
                        var r1 = 0,
                            r2 = 0,
                            r3;
                        damage = parseInt(damage, 10);
                        if ($('#calculator_armor_damage_type').val() === 'physical') {
                            /*jslint unparam: true */
                            $.each(prot, function(i, v) {
                                damage = parseInt(((100 - v) / 100) * damage, 10);
                            });
                            /*jslint unparam: false */
                            r1 += (total_arm < 2 ? total_arm : Math.floor(total_arm / 2));
                            r2 += (total_arm < 2 ? total_arm : (total_arm % 2 === 0 ? total_arm - 1 : total_arm - 2));
                            r1 = r1 > damage ? damage : r1;
                            r2 = r2 > damage ? damage : r2;
                            r3 = (r2 + r1) / 2;
                            // min/max (avg)
                            return Math.max(0, damage - r2) + '/' + Math.max(0, damage - r1) + ' (' + Math.max(0, damage - r3) + ')';
                        }
                        r1 = damage;
                        /*jslint unparam: true */
                        $.each(prot, function(i, v) {
                            r1 = parseInt(((100 - v) / 100) * r1, 10);
                        });
                        /*jslint unparam: false */
                        return r1;
                    };
                if (update_links) {
                    $('#calculator_armor_links').empty();
                    for (x = 0; x < calculator_armor_parts_names.length; x++) {
                        tmpa = $('#calculator_armor_body_' + calculator_armor_parts_names[x]).attr('src');
                        if(tmpa != null) {
                            tmp = get_item_name_from_img_src(tmpa);
                            if (calculator_armor_items_data[x].hasOwnProperty(tmp)) {
                                if ('no' + calculator_armor_parts_names[x] !== tmp.toLowerCase()) {
                                    $links = $links.add(
                                        $('<a>', {
                                            'href': '/wiki/' + encodeURIComponent(calculator_armor_items_data[x][tmp].name.replace(/ /g, '_')),
                                            'title': calculator_armor_parts_names[x]
                                        })
                                        .text(calculator_armor_items_data[x][tmp].name)
                                    );
                                }
                            }
                        }
                    }
                    $links.not(':last').each(function() {
                        $('#calculator_armor_links').append($(this), '<br />');
                    });
                    $('#calculator_armor_links').append($links.last());
                    $('#calculator_armor_links a').click(function() {
                        window.open(this.href);
                        return false;
                    });
                }
                $('#calculator_armor_links, #calculator_armor_compare th').each(function() {
                    var x, lvl = 0,
                        oz = 0,
                        arm = 0,
                        dmg_prot = [],
                        tmp = '',
                        tmpa = [],
                        $link, $this = $(this);
                    for (x = 0; x < calculator_armor_parts_names.length; x++) {
                        $link = $this.children('a[title="' + calculator_armor_parts_names[x] + '"]');
                        if ($link.length) {
                            tmpa = $link.attr('href').split(/\//);
                            tmp = decodeURIComponent(tmpa[tmpa.length - 1].replace(/_/g, ' ').toLowerCase());
                            if (calculator_armor_items_data[x].hasOwnProperty(tmp)) {
                                arm += calculator_armor_items_data[x][tmp].arm;
                                oz += calculator_armor_items_data[x][tmp].oz;
                                lvl = (calculator_armor_items_data[x][tmp].lvl > lvl ? calculator_armor_items_data[x][tmp].lvl : lvl);
                                if ((tmp = calculator_armor_items_data[x][tmp].resist[dmg_type.toLowerCase().replace(/\s/g, '')]) !== 0) {
                                    dmg_prot.push(tmp);
                                }
                            }
                        }
                    }
                    imbue_prots.push(calculator_armor_imbue_prot[dmg_type][$('#calculator_armor_imbue_1').prop('selectedIndex')],
                    calculator_armor_imbue_prot[dmg_type][$('#calculator_armor_imbue_2').prop('selectedIndex')]);
                    $.each(imbue_prots, function (i, v) {
                        if (v > 0) {
                            dmg_prot.push(v);
                        }
                    });
                    lvl = lvl || 'None';
                    oz = String(oz);
                    oz = oz + (oz.match(/\.\d\d/) ? '' : (oz.match(/\.\d/) ? '0' : '.00')) + ' oz';
                    tmpa = [];
                    for (x = 0; x < dmg_prot.length; x++) {
                        tmpa.push(dmg_prot[x] + '%');
                    }
                    tmp = dmg_type + ' protection: ' + (!tmpa.length ? '0%' : tmpa.join(', '));
                    if ($(this).is('div')) {
                        $('#calculator_armor_req_level').html(lvl);
                        $('#calculator_armor_set_oz').html(oz);
                        $('#calculator_armor_set_arm').html(arm);
                        var tot_dmg_prot = 1;
                        $.each(dmg_prot, function(i, v) {
                                tot_dmg_prot = tot_dmg_prot * ((100 - v)/100);
                        });
                        tot_dmg_prot = Math.round((1 - tot_dmg_prot) * 100 * 10) / 10;
                        $('#calculator_armor_set_prot').html(tmp + '<br/>Total: ' + tot_dmg_prot + '%');
                        $('#calculator_armor_damages tr:eq(1) td').text(function(i) {
                            if (i !== 8) {
                                return calculate_damage(arm, $('#calculator_armor_damages tr:eq(0) td:eq(' + i + ')').text(), dmg_prot);
                            }
                            return calculate_damage(arm, $('#calculator_armor_damages input').val(), dmg_prot);
                        });
                    } else {
                        $(this).attr('title',
                            'Required Level: ' + lvl + ' - Needed Cap: ' + oz +
                            ' - Total Armor: ' + arm + ' - ' + tmp.replace(/<br \/>/, ' ')
                        );
                        $(this).nextAll('td').text(function(i) {
                            if (i !== 8) {
                                return calculate_damage(arm, $('#calculator_armor_damages tr:eq(0) td:eq(' + i + ')').text(), dmg_prot);
                            }
                            return calculate_damage(arm, $('#calculator_armor_damages input').val(), dmg_prot);
                        });
                    }
                });
                if (!update_links) {
                    if ($('#calculator_armor_compare tr').length > 1) {
                        $('#calculator_armor_compare tr').each(function() {
                            $(this).children('td').each(function(col) {
                                var tmp = $(this).text().match(/\([\d\.]+\)/),
                                    val;
                                if (tmp === null) {
                                    tmp = $(this).text().match(/[\d\.]+/);
                                }
                                val = parseFloat(tmp[0].replace(/[\(\)]/g, ''), 10);
                                min_val[col] = typeof min_val[col] === 'undefined' ? val : Math.min(min_val[col], val);
                                max_val[col] = typeof max_val[col] === 'undefined' ? val : Math.max(max_val[col], val);
                            });
                        });
                        $('#calculator_armor_compare tr').each(function() {
                            $(this).children('td').each(function(col) {
                                var tmp = $(this).text().match(/\([\d\.]+\)/),
                                    val;
                                if (tmp === null) {
                                    tmp = $(this).text().match(/[\d\.]+/);
                                }
                                val = parseFloat(tmp[0].replace(/[\(\)]/g, ''), 10);
                                $(this).css('background-color',
                                    (max_val[col] === min_val[col] ? 'transparent' :
                                        (val === min_val[col] ? '#D2F0D2' :
                                            (val === max_val[col] ? '#F0D2D2' : 'transparent')
                                        )
                                    )
                                ).css('color',
                                    (max_val[col] === min_val[col] ? '#E6E6E6' :
                                        (val === min_val[col] ? '#333333' :
                                            (val === max_val[col] ? '#333333' : '#E6E6E6')
                                        )
                                    )
                                );
                            });
                        });
                    } else {
                        $('#calculator_armor_compare tr td').css('background-color', 'transparent');
                    }
                }
            },
            calculator_armor_tt_html = function(d) {
                var arm_att_resist, att_resist, oz, x, voc_lvl = [],
                    resist = [];
                for (x in d.resist) {
                    if (d.resist.hasOwnProperty(x)) {
                        if (d.resist[x] !== 0) {
                            resist.push(x + ' ' + (d.resist[x] > 0 ? '+' : '') + d.resist[x] + '%');
                        }
                    }
                }
                resist = resist.length ? 'protection ' + resist.join(', ') : '';
                if (d.voc & 1) {
                    voc_lvl.push('druids');
                }
                if (d.voc & 2) {
                    voc_lvl.push('knights');
                }
                if (d.voc & 4) {
                    voc_lvl.push('paladins');
                }
                if (d.voc & 8) {
                    voc_lvl.push('sorcerers');
                }
                voc_lvl = (voc_lvl.length || d.lvl) ? '<br />It can only be wielded properly by ' + (voc_lvl.length ? voc_lvl.join(' and ') : 'players') + (d.lvl ? ' of level ' + d.lvl + ' or higher' : '') + '.' : '';
                att_resist = (d.att ? (resist.length ? [d.att, resist] : [d.att]) : (resist.length ? [resist] : [])).join(', ');
                arm_att_resist = (
                    d.arm ?
                    'Arm:' + d.arm + (att_resist.length ? ', ' : '') :
                    (d.def ?
                        'Def:' + d.def + (att_resist.length ? ', ' : '') :
                        '')
                );
                arm_att_resist += att_resist;
                oz = String(d.oz);
                oz = oz + (oz.match(/\.\d/) ? '0' : (oz.match(/\.\d\d/) ? '' : '.00'));
                return '<b>' + d.name + '</b>' + (arm_att_resist ? ' (' + arm_att_resist + ')' : '') + voc_lvl + (d.oz ? '<br />It weighs ' + oz + ' oz.' : '');
            };
        $('#calculator_armor_damage_type').change(function() {
            var no_imbue = ['physical', 'manadrain', 'lifedrain'];
            if (no_imbue.includes($(this).val())) {
                $('#calculator_armor_imbue_1').val('none');
                $('#calculator_armor_imbue_1').prop('disabled', 'true');
                $('#calculator_armor_imbue_2').val('none');
                $('#calculator_armor_imbue_2').prop('disabled', 'true');
            } else {
                $('#calculator_armor_imbue_1').removeAttr('disabled');
                $('#calculator_armor_imbue_2').removeAttr('disabled');
            }
            $('[name=calculator_armor_items_sort][value=' + $('#calculator_armor_damage_type').val() + ']').attr('checked', 'checked');
            $('#calculator_armor_damage_type_ind').text($('#calculator_armor_damage_type :selected').text());
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
            calculator_armor_calculate(false);
        });
        $('#calculator_armor_imbue_1, #calculator_armor_imbue_2').change(function() {
            calculator_armor_calculate(false);
        });
        $('#calculator_armor_voc').change(function() {
            var need_clear = false;
            $.each(calculator_armor_parts_names, function(i, v) {
                var tmpa = $('#calculator_armor_body_' + v).attr('src').split(/\//),
                    tmp;
                tmpa = tmpa[tmpa.length - 3].split(/\./);
                tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
                if (calculator_armor_items_data[i].hasOwnProperty(tmp)) {
                    if (calculator_armor_items_data[i][tmp].voc !== 0 && !(calculator_armor_items_data[i][tmp].voc & parseInt($('#calculator_armor_voc').val(), 10))) {
                        need_clear = true;
                        return false;
                    }
                }
            });
            if (need_clear) {
                if (confirm('This will reset the set, continue?')) {
                    $.each(calculator_armor_parts_names, function(i, v) {
                        var x = 'No' + v.slice(0, 1).toUpperCase() + v.slice(1);
                        $('#calculator_armor_body_' + v).attr('src', calculator_armor_get_link_for_name(x, i)).attr('alt', '');
                    });
                    calculator_armor_vocv = parseInt($('#calculator_armor_voc').val(), 10);
                } else {
                    $('#calculator_armor_voc').val(calculator_armor_vocv);
                }
            } else {
                calculator_armor_vocv = parseInt($('#calculator_armor_voc').val(), 10);
            }
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
            calculator_armor_calculate(true);
        });


        $('#calculator_armor_custom_damage').keyup(function() {
            $(this).val(parseInt($(this).val(), 10) || 0);
            if ($(this).val() === '0') {
                $(this).select();
            }
            calculator_armor_calculate(false);
        });

        $('#calculator_armor_body_main img').click(function() {
                var tmp, x, y, t = parseInt(calculator_armor_names_parts[$(this).attr('id').split('_')[3]], 10);
                calculator_armor_current_part = t;
                calculator_armor_do_items_sorted(calculator_armor_current_part);
                $('#calculator_armor_items_div').html('');
                for (x in calculator_armor_items_sorted) {
                    if (calculator_armor_items_sorted.hasOwnProperty(x)) {
                        tmp = true;
                        for (y in calculator_armor_items_sorted[x].resist) {
                            if (calculator_armor_items_sorted[x].resist.hasOwnProperty(y)) {
                                if (calculator_armor_items_sorted[x].resist[y] !== 0) {
                                    tmp = false;
                                    break;
                                }
                            }
                        }
                        if (
                            (('no' + calculator_armor_parts_names[t] === x.toLowerCase()) || $('#calculator_armor_np').is(':checked') || !tmp || calculator_armor_items_sorted[x].arm !== 0) &&
                            (calculator_armor_items_sorted[x].voc === 0 || calculator_armor_vocv === 0 || (calculator_armor_items_sorted[x].voc & calculator_armor_vocv))
                        ) {
                            $('#calculator_armor_items_div').append(
                                $('<img class="item_img" ' + 'src="' + calculator_armor_items_sorted[x].ur + '" ' +
                                    'alt="' + calculator_armor_items_sorted[x].name + '" ' +
                                    'width="32" height="32" />'));
                        }
                    }
                }
                $('.item_img').css('cursor', 'pointer')
                    .click(function() {
                        if ($('#calculator_armor_code_div').is(':visible')) {
                            $('#calculator_armor_code_toggle').click();
                        }
                        $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).attr('src', $(this).attr('src')).attr('alt', $(this).attr('alt'));
                        calculator_armor_calculate(true);
                    })
                    .mousemove(function(e) {
                        if ($(this).attr('alt') === '') {
                            return;
                        }
                        var tmp = get_item_name_from_img_src($(this).attr('src'));
                        t = calculator_armor_items_data[calculator_armor_current_part][tmp];
                        $('#calculator_armor_tt_items').show().css({
                            top: (e.pageY + 20) + 'px',
                            left: (e.pageX + 10) + 'px'
                        }).html(calculator_armor_tt_html(t));
                    })
                    .mouseout(function() {
                        $('#calculator_armor_tt_items').hide();
                    });
                if ($('#calculator_armor_tt_items').length === 0) {
                    $('body:eq(0)').append($('<div id="calculator_armor_tt_items">&nbsp;</div>'));
                }
            })
            .mousemove(function(e) {
                if ($(this).attr('alt') === '') {
                    return;
                }
                var tmpa = $(this).attr('src').split(/\//),
                    tmp, t;
                tmpa = tmpa[tmpa.length - 3].split(/\./);
                tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
                t = calculator_armor_items_data[calculator_armor_names_parts[$(this).attr('id').split('_')[3]]][tmp];
                $('#calculator_armor_tt_items').show().css({
                    top: (e.pageY + 20) + 'px',
                    left: (e.pageX + 10) + 'px'
                }).html(calculator_armor_tt_html(t));
            })
            .mouseout(function() {
                $('#calculator_armor_tt_items').hide();
            });

        $('#calculator_armor_np').click(function() {
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
        });
        $('[name=calculator_armor_items_sort]').click(function() {
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
        });


        $('#calculator_armor_body_helmet').click();
        calculator_armor_calculate(true);

        $('#calculator_armor_links').after(
            '<hr />Code for your ',
            (mw.config.get('wgUserName') ?
                $('<a href="https://tibia.fandom.com/wiki/User:' + mw.config.get('wgUserName') + '?action=edit">user page</a>').click(function() {
                    window.open($(this).attr('href'));
                    return false;
                }) :
                'user page'
            ),
            ' ',
            $('<input type="button" id="calculator_armor_code_toggle" value="Show" />').toggle(function() {
                var calculator_armor_template = '{{Equips_Set';
                /*jslint unparam: true */
                $.each(calculator_armor_parts_names.concat(['shoulders']), function(i, v) {
                    calculator_armor_template += '\n  |' + calculator_armor_template_translate[v] + '=' + ($('#calculator_armor_body_' + v).attr('alt') || 'None');
                });
                /*jslint unparam: false */
                calculator_armor_template += '\n}}';
                if ($('#calculator_armor_code_div').length < 1) {
                    $(this).after(
                        $('<div />', {
                            'id': 'calculator_armor_code_div'
                        }).append(
                            $('<textarea />', {
                                'id': 'calculator_armor_code',
                                'rows': '12',
                                'cols': '30'
                            }).click(function() {
                                $(this).select();
                            })
                        ).css('display', 'none')
                    );
                }
                $('#calculator_armor_code').val(calculator_armor_template).parent().slideDown(200, function() {
                    $('#calculator_armor_code_toggle').val('Hide');
                });
            }, function() {
                $('#calculator_armor_code_div').slideUp(200, function() {
                    $('#calculator_armor_code_toggle').val('Show');
                });
            }),
            '<hr />Add set to ',
            $('<input />', {
                'type': 'button',
                'value': 'compare'
            }).click(function() {
                var set_text = [],
                    already_on_list = false;
                if ($('#calculator_armor_links a').length > 0) {
                    $('#calculator_armor_links a').each(function() {
                        set_text.push($(this).html());
                    });
                    if ($('#calculator_armor_compare').length === 0) {
                        $('#calculator_armor_damages').after($('<table>', {
                            'id': 'calculator_armor_compare'
                        }));
                    }
                    $('#calculator_armor_compare th').each(function() {
                        if ($(this).children('a').text() === $('#calculator_armor_links').children('a').text()) {
                            already_on_list = true;
                            return false;
                        }
                    });
                    if (already_on_list) {
                        alert('This set is already on the list.');
                    } else {
                        $('#calculator_armor_compare').append(
                            $('<tr>').append(
                                $('<th>').append(
                                    $('<input>', {
                                        'type': 'button',
                                        'value': 'Load this set'
                                    }).click(function() {
                                        var $td = $(this).parent();
                                        $.each(calculator_armor_parts_names, function(i, v) {
                                            var x = 'No' + v.slice(0, 1).toUpperCase() + v.slice(1),
                                                $link = $td.children('a[title="' + calculator_armor_parts_names[i] + '"]'),
                                                tmp, tmpa, tmpo;
                                            $('#calculator_armor_body_' + v).attr('src', calculator_armor_get_link_for_name(x, i)).attr('alt', '');
                                            if ($link.length) {
                                                tmpa = $link.attr('href').split(/\//);
                                                tmp = decodeURIComponent(tmpa[tmpa.length - 1].replace(/_/g, ' ').toLowerCase());
                                                if (calculator_armor_items_data[i].hasOwnProperty(tmp)) {
                                                    tmpo = calculator_armor_items_data[i][tmp];
                                                    $('#calculator_armor_body_' + v).attr('src', tmpo.ur).attr('alt', tmpo.name);
                                                }
                                            }
                                        });
                                        $('#calculator_armor_voc').val($td.children('input:hidden').val());
                                        $('#calculator_armor_body_helmet').click();
                                        calculator_armor_calculate(true);
                                    }),
                                    ' ',
                                    $('<div>').css({
                                        'cursor': 'pointer',
                                        'display': 'inline-block'
                                    }).text('x').click(function() {
                                        $(this).closest('tr').remove();
                                        calculator_armor_calculate(false);
                                    }),
                                    $('<input>', {
                                        'type': 'hidden',
                                        'value': $('#calculator_armor_voc').val()
                                    }),
                                    '<br/>',
                                    $('#calculator_armor_links').children().clone(true)
                                ),
                                $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'),
                                $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'),
                                $('<td>').html('&nbsp;')
                            )
                        );
                        calculator_armor_calculate(false);
                    }
                }
            })
        );
    }());
    
    $('#calculators_loading').hide();
    $('#calculators_container').show();
});
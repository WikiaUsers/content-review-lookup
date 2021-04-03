(function () {
    'use strict';
    var loot_val_avg = 0,
    //Exceptions below should all be listed on [[Loot_Statistics/Average Loot Value]]
    loot_val_exceptions = {
        'Mana Potion': 56,
        'Strong Mana Potion': 93,
        'Great Mana Potion': 144,
        'Ultimate Mana Potion': 438,
        //'Strong Health Potion': 115, //Rarely used, market price is closer to 50% of sell price
        //'Great Health Potion': 225, //Rarely used, market price is closer to 50% of sell price
        'Ultimate Health Potion': 379,
        'Supreme Health Potion': 625,
        'Great Spirit Potion': 228,
        'Ultimate Spirit Potion': 438 
    },
    loot_val_get_data = function(creature) {
        loot_val_avg = 0;
        var lootable;
        $.ajax({
            type: 'GET',
            dataType: 'text',
            timeout: 15000,
            url: '/wiki/Loot_Statistics:' + encodeURIComponent(creature) + '?action=raw',
            success: function(raw) {
                $('#loot_val_result').html(' Average loot value: <img src="https://images.wikia.nocookie.net/tibia/en/images/8/87/Ajax_Load_Image.gif" alt="Loading" style="width:14px;height:14px;" />');
                $('#loot_val_result').show();
                var killsMatch = raw.match(/kills\s*=\s*(\d+)/),
                loot_val_kills = killsMatch === null ? 0 : parseInt(killsMatch[1]),
                seenEndTemplate = false,
                filtered = raw.split('\n').filter(function (v) {
                    if (v.substr(0, 2) == "}}") {
                        seenEndTemplate = true;
                    }
                    return !seenEndTemplate && v.substr(0, 1) === "|" && !v.includes("=");
                }),
                items = filtered.map(function (v) {
                    var sv = v.split(","),
                    item = sv[0].substr(1),
                    total = sv[sv.length - 1].split(":")[1];
                    return { item: item, total: total };
                }).filter(function(v) {
                    return v.item !== "Empty";
                }),
                ajaxes = [];
                $.each(items, function(i, v) {
                    var frac = parseInt(v.total)/parseInt(loot_val_kills);
                    ajaxes.push(loot_val_get_item_val(v.item, frac, creature));
                });
                $.when.apply($, ajaxes)
                    .done(function(){
                        $('#loot_val_result').html(' Average loot value: ' + Math.round(loot_val_avg* 100)/100 + ' gold ');
                });
                $('#loot_val_text').hide();
                $('#loot_val_details').show();
            },
            error: function () {
                console.log("Error");
                var off = $('#loot_val_text').offset();
                $('body:first').append(
                    $('<div>There are no loot statistics <br /> to calculate the value</div>').attr('id', 'loot_val_not_enough')
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
                            $('#loot_val_text').hide();
                            $('#loot_val_not_enough').fadeOut('slow');
                        }, 4000);
                    })
                );
            }
        });
    },
    loot_val_get_item_val = function(item, frac, creature) {
        var value = 0,
        aj;
        if (loot_val_exceptions[item] !== undefined) {
            value = loot_val_exceptions[item];
            loot_val_avg += value * frac;
        } else {
            aj = $.ajax({
                type: 'GET',
                dataType: 'text',
                timeout: 15000,
                url: '/wiki/' + encodeURIComponent(item) + '?action=raw',
                success: function(raw) {
                    var match = raw.match(/npcvalue\s*=\s*(\d+)/);
                    value = match === null ? 0 : parseInt(match[1]);
                    //console.log('Price of ' + item + ': ' + value);
                    loot_val_avg += value * frac;
                }
            });
        }
        return aj;
    };
    
    $('#loot_perc_tr>td:eq(0),#creature-loot>h3:eq(0)').after(
        $('<a id="loot_val_text" href="#"">(Load average value)</a>')
        .css({fontSize: '75%', verticalAlign: 'bottom', marginLeft: '0.5em'})
        .click(function () {
            loot_val_get_data(mw.config.get('wgTitle'));
            return false;
        })
    ).after(
        $('<a href="https://tibia.fandom.com/wiki/Loot_Statistics/Average Loot Value" target="_blank"><span class="information-icon"></span></a>').attr('id', 'loot_val_details').attr('title', 'Based on the loot statistics and the price paid by NPCs. This value may not be accurate for bosses. Click for more details.')
        .css({display:'none', marginLeft: '0.3em'})
    ).after(
        $('<span id="loot_val_result">Average loot value: 0 gold</span>')
        .css({fontSize: '75%', verticalAlign: 'bottom', display: 'none', marginLeft: '0.5em'})
    );
}());
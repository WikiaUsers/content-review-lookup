function scratchInit() {
    var cdf = [];
    var revealSequence = [];
    unitData = $.Unit;
    //makeUnitSelector($('#special-units,#special-units-extra,#special-units-extra-2,#special-units-extra-3'), unitData);

    var gachaData = $.secureEvalJSON($('#gacha-weights').text());
    $.each(gachaData, function (k, v) {
        unitData[k].gacha = v;
    });

    var rarityPath=[null,
        'https://images.wikia.nocookie.net/__cb20140316183635/divine-gate/zh/images/0/06/Pawn-icon.png',
        'https://images.wikia.nocookie.net/__cb20140316183635/divine-gate/zh/images/7/7b/Knight-icon.png',
        'https://images.wikia.nocookie.net/__cb20140316183634/divine-gate/zh/images/7/79/Bishop-icon.png',
        'https://images.wikia.nocookie.net/__cb20140316183636/divine-gate/zh/images/0/0f/Queen-icon.png',
        'https://images.wikia.nocookie.net/__cb20140316183635/divine-gate/zh/images/c/c7/King-icon.png',
        'https://images.wikia.nocookie.net/__cb20140316183635/divine-gate/zh/images/c/c7/King-icon.png',
        'https://images.wikia.nocookie.net/__cb20140316183635/divine-gate/zh/images/c/c7/King-icon.png',
    ];

    var updateRealGachaRate = function() {
        var filters = [];

        var addFilter = function(what, value, id) {
            var rarity = +$('#' + what + '-rarity').val();
            var rate = +$('#' + what + '-rate').val();
            if ($('#' + id).prop('checked')) {
                filters.push(function (x) {
                    if (x[what] == value || x['sub'+what] == value) if (x.rarity >= rarity) {
                        return rate;
                    }
                    return 1;
                });
            }
        };

        addFilter('elem', '火', 'fire');
        addFilter('elem', '水', 'aqua');
        addFilter('elem', '風', 'wind');
        addFilter('elem', '光', 'light');
        addFilter('elem', '闇', 'dark');
        addFilter('elem', '無', 'none');
        addFilter('race', '人類', 'human');
        addFilter('race', '龍', 'dragon');
        addFilter('race', '神', 'god');
        addFilter('race', '魔物', 'demon');
        addFilter('race', '妖精', 'spirit');
        addFilter('race', '獸', 'beast');
        addFilter('race', '機械', 'machine');
        addFilter('race', '強化合成用', 'egg');

        var rarityRate = +$('#rarity-rate').val();
        var rarity = +$('input[name=rarity]:checked').val();
        if (rarityRate == -1) {
            filters.push(function (x) {
                if (x.rarity < rarity) return 0; else return 1;
            });
        } else {
            filters.push(function (x) {
                if (x.rarity >= rarity) return rarityRate; else return 1;
            });
        }

        if ($('#rarity-4-plus').prop('checked')) {
            filters.push(function (x) {
                if (x.rarity < 4) return 0; else return 1;
            });
        }

        cdf = [ [0] ];

        $.each(unitData, function (k, v) {
            if (!v) return;
            var realGacha = v.gacha;
            if (!realGacha) { v.realGacha = 0; return; }
            $.each(filters, function (_, filter) {
                realGacha *= filter(v);
            });
            v.realGacha = Math.ceil(realGacha);
        });

        var standardRate = unitData[133].gacha;
        $.each(['', '-extra', '-extra-2', '-extra-3'], function (k, v) {
            var specialGacha = standardRate * $('#special-rate' + v).val();
            $.each(($('#special-units' + v).val() || '').split(/,/), function(_, unitId) {
                var unit = unitData[unitId];
                if (unit) unit.realGacha = specialGacha;
            });
        });

        $.each(unitData, function (k, v) {
            if (v) if (v.realGacha) {
                var lastCdf = cdf[cdf.length-1][0];
                cdf.push([lastCdf + v.realGacha, k]);
            }
        });

        var totalGacha = 0;
        var gachaPerRarity = [0, 0, 0, 0, 0, 0, 0, 0];
        var statsPerRarity = [{}, {}, {}, {}, {}, {}, {}, {}];
        $.each(unitData, function (k, v) {
            if (!v||!v.realGacha) return;
            totalGacha += v.realGacha;
            gachaPerRarity[v.rarity] += v.realGacha;
            var obj = statsPerRarity[v.rarity];
            if (!(v.realGacha in obj)) obj[v.realGacha] = [];
            obj[v.realGacha].push(k);
        });

        for (var rarity = 3; rarity <= 7; ++ rarity) {
            var totalProb = 100 * gachaPerRarity[rarity] / totalGacha;
            $('#total-gacha-' + rarity).text(totalProb.toFixed(1) + '%');

            var unitsHtml = [];
            $.each(statsPerRarity[rarity], function (k, v) {
                var prob = 100 * k / totalGacha;
                unitsHtml.push('<p>');
                unitsHtml.push(prob.toFixed(2));
                unitsHtml.push('%: ');
                $.each(v, function (_, unit) {
                    unitsHtml.push('<img src="');
                    unitsHtml.push(unitData[unit].smallimage);
                    unitsHtml.push('" title="ID:');
                    unitsHtml.push(unit);
                    unitsHtml.push(' ');
                    unitsHtml.push(unitData[unit].name);
                    unitsHtml.push('">');
                });
                unitsHtml.push('</p>');
            });
            $('#units-gacha-' + rarity).html(unitsHtml.join(''));
        }
    };

    /*$('#special-units-select,#special-units-select-extra,#special-units-select-extra-2,#special-units-select-extra-3').change(function() {
        $('#'+this.id.replace(/-select/, '')).select2("val", $(this).val().split(/,/));
    });*/

    $('#special-units,#special-units-extra,#special-units-select-extra-2,#special-units-select-extra-3,#scratch-event select').change(updateRealGachaRate);
    $('#scratch-event input').click(updateRealGachaRate);

    $('#scratch-table div').click(function() {
        if ($(this).hasClass('flip-2-1') || $(this).hasClass('flip-2-5')) {
            var unitId = this._unitId;
            var url = 'ID:' + unitId + '_' + unitData[unitId].name;
            window.open('http://zh.divine-gate.wikia.com/wiki/' + url);
        }
        if ($(this).hasClass('flip-1-1') || $(this).hasClass('flip-1-5')) {
            return;
        }
        var value = Math.random() * cdf[cdf.length-1][0];
        var unitId = $.grep(cdf, function (e) { return value < e[0]; })[0][1];
        var unit = unitData[unitId];
        var flipClass;
        if (unit.rarity >= 5) flipClass = 'flip-1-5'; else flipClass = 'flip-1-1';
        $('.middle', this).attr('src', rarityPath[unit.rarity]);
        $('.front', this).attr('src', unit.image);
        this._unitId = unitId;
        revealSequence.push([$(this).addClass(flipClass), unitId]);
        if (revealSequence.length == 9) {
            var delay = 1000;
            $.each(revealSequence, function (i, elem) {
                elem = elem[0];
                var cls, inc;
                if (elem.hasClass('flip-1-5')) {
                    cls = 'flip-2-5';
                    inc = 1300;
                } else {
                    cls = 'flip-2-1';
                    inc = 600;
                }
                setTimeout(function() { elem.addClass(cls); }, delay);
                delay += inc;
            });
        }
    });

    $('#restart').click(function() {
        $('#scratch-table div').removeClass('flip-1-1 flip-1-5 flip-2-1 flip-2-5');
        $('#chips-used').text(function (_, old) { return 45 + (old|0); });
        revealSequence = [];
    });

    var currentEvent = window.location.hash.substr(1).split(/:/);
    $.each(currentEvent, function(_, v) {
        var m = v.match(/^([-\w]+)(?:=|\.3D)([-.\dC]+)$/);
        if (m) {
            if (/^special-units/.test(m[1])) {
                var units = m[2].split(/\.2C|,/);
                var m1 = m[1];
                setTimeout(function() { $('#' + m1).val(units.join(',')); }, 1000);
            } else {
                $('#' + m[1]).val(m[2]);
            }
        } else {
            $('#' + v).prop('checked', true);
        }
    });

/*
    var specialUnitsJson = $.secureEvalJSON($('#special-units-json').text());
    var specialUnitsHtml = [];
    $.each(specialUnitsJson, function (_, a) {
        specialUnitsHtml.push('<option value="');
        specialUnitsHtml.push(a[1]);
        specialUnitsHtml.push('">');
        specialUnitsHtml.push(a[0]);
        specialUnitsHtml.push('</option>');
    });
    $('#special-units-select,#special-units-select-extra,#special-units-select-extra-2,#special-units-select-extra-3').append($(specialUnitsHtml.join('')));
*/

    setTimeout(updateRealGachaRate, 1100);
}
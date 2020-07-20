;(function($, mw) {
    if (!$('#ark_calc').length) { return; }

    ARK = {
        init: function() {
            obj_data = {
                creature: {},
                food: {}
            };

            $.get('/wiki/Project:Данные', {action: 'raw', cb: Math.ceil(Math.random() * 1000)}, function(d) {
                $('#ark_calc').html(
                    '<table class="ark_calc wikitable" style="min-width:500px;">' +
                        '<tbody>' +
                            '<tr>' +
                                '<th colspan="5">' +
                                    '<select class="creature" />' +
                                '</th>' +
                            '</tr>' +
                            '<tr>' +
                                '<th colspan="2">' +
                                    'Уровень <input class="level" type="number" min="1" max="1094" maxlength="4" value="1" style="width:3em">' +
                                '</th>' +
                                '<th>' +
                                    '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/2/29/Narcoberry.png/30px-Narcoberry.png" width="30" height="30">' +
                                '</th>' +
                                '<th>' +
                                    '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/e/e6/Narcotic.png/30px-Narcotic.png" width="30" height="30">' +
                                '</th>' +
                                '<th>' +
                                    'Время' +
                                '</th>' +
                            '</tr>' +
                            '<tr class="ko">' +
                                '<td colspan="5" style="text-align: center;">' +
                                    '<span style="cursor: help; border-bottom: 1px dotted #397d75;" title="Предпологая, что лук полностью заряженный, и цель без брони и урон ближнего боя 100%">KO:</span> ' +
                                    // Дубина
                                    '<a href="/wiki/%D0%94%D0%B5%D1%80%D0%B5%D0%B2%D1%8F%D0%BD%D0%BD%D0%B0%D1%8F_%D0%B4%D1%83%D0%B1%D0%B8%D0%BD%D0%BA%D0%B0" title="Деревянная дубинка">' +
                                        '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c8/Wooden_Club.png/30px-Wooden_Club.png" width="30" height="30">' +
                                    '</a> × <span class="dubina">0</span>;' +
                                    // Рогатка
                                    '<a href="/wiki/%D0%A0%D0%BE%D0%B3%D0%B0%D1%82%D0%BA%D0%B0" title="Рогатка">' +
                                        '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/3/3f/Slingshot.png/30px-Slingshot.png" width="30" height="30">' +
                                    '</a> × <span class="rogatka">0</span>;' +
                                    // Транк. лук
                                    '<a href="/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D0%BA%D0%B2%D0%B8%D0%BB%D0%B8%D0%B7%D0%B8%D1%80%D1%83%D1%8E%D1%89%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%B0" title="Транк. стрела из лука">' +
                                        '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/50/TranqArrowBow.png/30px-TranqArrowBow.png" width="30" height="30">' +
                                    '</a> × <span class="trank_luk">0</span>;' + 
                                    // Транк. арбалет
                                    '<a href="/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D0%BA%D0%B2%D0%B8%D0%BB%D0%B8%D0%B7%D0%B8%D1%80%D1%83%D1%8E%D1%89%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B5%D0%BB%D0%B0" title="Транк. стрела из арбалета">' +
                                        '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/c/c0/TranqArrowCrossbow.png/30px-TranqArrowCrossbow.png" width="30" height="30">' +
                                    '</a> × <span class="trank_arb">0</span>;' +
                                    // Дротик
                                    '<a href="/wiki/%D0%A2%D1%80%D0%B0%D0%BD%D0%BA%D0%B2%D0%B8%D0%BB%D0%B8%D0%B7%D0%B8%D1%80%D1%83%D1%8E%D1%89%D0%B8%D0%B9_%D0%B4%D1%80%D0%BE%D1%82%D0%B8%D0%BA" title="Транк. дротик">' +
                                        '<img src="https://images.wikia.nocookie.net/ark-survival-evolved/ru/images/thumb/5/56/Tranquilizer_Dart.png/30px-Tranquilizer_Dart.png" width="30" height="30">' +
                                    '</a> × <span class="drotik">0</span>' +
                                '</td>' +
                            '</tr>' +
                        '</tbody>' +
                    '</table>'
                );

                $.each(d.split(';@'), function(num, val) {
                    if (val === '') { return; }
                    var type = (/^Создания/.test(val)) ? 'creature' : 'food';

                    $.each(val.replace(/^(Создания|Еда)\n/, '').split('*@'), function(i, v) {
                        ARK.buildObj(i, v, type);
                    });
                });
                
                var def_crt = $('#ark_calc').attr('data-crt');
                if (typeof(obj_data.creature[def_crt]) === 'undefined') {
                    def_crt = 'Анкилозавр';
                }
                
                $('.creature option[value="' + def_crt + '"]').attr('selected', 'selected');
                ARK.count(def_crt, 0);

                $('.creature').before(
                    $('<img class="crt_img" style="margin-right:5px;" />')
                        .attr('src', obj_data.creature[def_crt].icon)
                        .prop('outerHTML')
                );

                $('.creature, .level').on('change', function() {
                    var crt = $('.creature option:selected').val(),
                        lvl = parseInt($('.level').val(), 10);

                    $('.crt_img').attr('src', obj_data.creature[crt].icon);
                    ARK.count(crt, lvl);
                });
            });
        },

        buildObj: function(i, v, type) {
            if (v === '') { return; }
            v = v.split('\n');

            var name = v[0].replace(/\n/g, '');
            obj_data[type][name] = {};

            if (type === 'creature') {
                $('.creature').append('<option value="' + name + '">' + name + '</option>');
            }

            $.each(v, function(i, val) {
                if (i === 0 || val === '') { return; }

                val = val.replace(/(\*\*|\n)/g, '').split(': ');

                if (val[0] === 'eats' && type === 'creature') {
                    obj_data[type][name][val[0]] = val[1].split(', ');
                    return;
                }

                obj_data[type][name][val[0]] = val[1];
            });
        },

        count: function(creature, level) {
            $('.eats').remove();

            var creature = obj_data.creature[creature],
                affinityNeeded = parseFloat(creature.affinityNeeded0, 10) + parseFloat(creature.affinityIncrease, 10) * level,
                totalTorpor = parseFloat(creature.torpor1, 10) + parseFloat(creature.torporIncrease, 10) * (level - 1),
                torporDeplPS = parseFloat(creature.torporDepletionPS0, 10) * (1 + 0.01819 * level);

            /*//+не насильственное приручение
            if (creature.nonViolent === nil && creature.nonViolentTame == 1) {
                if (creature.wakeAffinityMult === nil) {
                    var wakeAffinityMult = creature.wakeAffinityMult;
                }
                if (creature.wakeFoodDeplMult === nil) {
                    var wakeFoodDeplMult = creature.wakeFoodDeplMult
                }
            }
            //-не насильственное приручение*/

            $.each(creature.eats, function(i, v) {
                var foodname = v.replace(/\d$/g, ''),
                    food = obj_data.food[v],
                    foodPiecesNeeded = Math.ceil(affinityNeeded / parseFloat(food.affinity, 10)),
                    seconds = Math.ceil(foodPiecesNeeded * parseFloat(food.foodValue, 10) / (parseFloat(creature.foodConsumptionBase, 10) * parseFloat(creature.foodConsumptionMult, 10))),
                    torporNeeded = Math.ceil(torporDeplPS * seconds - totalTorpor),
                    time = ~~(seconds/3600) + ":" + ~~((seconds%3600)/60) + ":" + seconds%3600%60;

                if (torporNeeded < 0) { torporNeeded = 0; }

                if (foodname == 'Корм') { foodname = "Корм (Яйцо " + creature.favoriteKibble + ")"; }

                ARK.addBody(foodname, foodPiecesNeeded, torporNeeded, time, food.image, torporDeplPS);
            });
 
            ARK.addToKO(totalTorpor);
        },

        addBody: function(foodname, foodPiecesNeeded, torporNeeded, time, link, torporDeplPS) {
            $('.ko').before(
                '<tr class="eats">' +
                    '<td>' +
                        $('<img style="margin-right:5px;" />').attr('src', link).prop('outerHTML') +
                        $('<a />').attr({href: foodname, title: foodname}).text(foodname).prop('outerHTML') +
                    '</td>' +
                    '<td style="text-align: right; width:2.8em">' + 
                        Math.ceil(foodPiecesNeeded) +
                    '</td>' +
                    '<td style="text-align: right; width:2.8em">' + 
                        Math.ceil(torporNeeded / (7.5+3*torporDeplPS)) +
                    '</td>' +
                    '<td style="text-align: right; width:2.8em">' + 
                        Math.ceil(torporNeeded / (40+5*torporDeplPS)) +
                    '</td>' +
                    '<td style="text-align: right; width:2.8em">' + 
                        time +
                    '</td>' +
                '</tr>'
            );
        },

        addToKO: function(t) {
            $('.dubina').text(Math.ceil(t / 10));
            $('.rogatka').text(Math.ceil(t / 24.5));
            $('.trank_luk').text(Math.ceil(t / 90));
            $('.trank_arb').text(Math.ceil(t / 157.5));
            $('.drotik').text(Math.ceil(t / 221));
        }
    };

    try {
        $(ARK.init);
    }
    catch(e) {
        $('#ark_calc').text('Ошибка! Проверьте консоль.');
        console.log(e);
    }
})(this.jQuery, this.mediaWiki);
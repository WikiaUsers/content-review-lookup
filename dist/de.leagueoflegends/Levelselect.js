(function() {
    'use strict';
    var stats = [
        'Health',
        'HealthRegen',
        'ResourceBar',
        'ResourceRegen',
        'AttackDamage',
        'AttackSpeed',
        'AttackSpeedBonus',
        'Armor',
        'MagicResist',
        'Range',
        'MovementSpeed'
    ], MAX_LVL = 18, data = {};
 
    function toLvl(champ, index, lvl) {
        var base = data[champ][index].base,
            plus = data[champ][index].plus,
            value;
        if (stats[index] === 'AttackSpeed') {
            value = base * (
                1 + plus / 100 * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1))
            );
            return Math.round(value * 1000) / 1000;
        }
        value = base + plus * (lvl - 1) * (0.7025 + 0.0175 * (lvl - 1));
        return Math.round(value * 100) / 100;
    }
 
    function update() {
        var $this = $(this),
            champ = $this.attr('data-champ'),
            lvl = Number($this.val()),
            champStats = data[champ];
        stats.forEach(function(stat, index) {
            var champStat = champStats[index],
                $base = champStat.$base,
                $plus = champStat.$plus,
                base = champStat.base,
                plus = champStat.plus;
            switch (lvl) {
                // Stufe N
                case -1:
                    if ($base.length || $plus.length) {
                        if (base === 0) {
                            $base.empty();
                            $plus.text(plus);
                        } else {
                            $base.text(base);
                            if (stat === 'AttackSpeed') {
                                $plus.text(plus ? ' (+ ' + plus + '%)' : '');
                            } else {
                                $plus.text(plus ? ' (+ ' + plus + ')' : '');
                            }
                        }
                    }
                    break;
                // Stufe "1 - MAX_LVL"
                case 0:
                    if ($base.length || $plus.length) {
                        $base.text(plus ? '' : toLvl(champ, index, 1));
                        $plus.text(
                            plus ?
                                base + ' – ' + toLvl(champ, index, MAX_LVL) :
                                ''
                        );
                    }
                    break;
                // Stufe dynamic
                default:
                    if ($plus.length) {
                        $base.text('');
                        $plus.text(toLvl(champ, index, lvl));
                    }
                    break;
            }
        });
    }
 
    // Note: change the trigger class if the new version is required
    function initEach() {
        var $this = $(this).addClass('lvlselect-initialized'),
            champ = $this.text().trim(),
            $select = $('<select>', {
                'change': update,
                'data-champ': champ,
                'id': 'lvl_' + champ
            }).append(
                $('<option>', {
                    text: 'n',
                    value: -1
                }),
                $('<option>', {
                    selected: 'selected',
                    text: '1-' + MAX_LVL,
                    value: 0
                }),
                Array
                    .apply(null, Array(MAX_LVL))
                    .map(function(_, index) {
                        return $('<option>', {
                            text: index + 1,
                            value: index + 1
                        });
                    })
            );
        data[champ] = stats.map(function(stat) {
            var $base = $(document.getElementById(stat + '_' + champ)),
                $plus = $(document.getElementById(
                    stat + '_' + champ + '_lvl'
                ));
            return {
                $base: $base,
                $plus: $plus,
                base: Number($base.text()) || 0,
                plus: Number($plus.text()) || 0
            };
        });
        $this.html([
            $('<label>', {
                'for': 'lvl_' + champ,
                'text': 'Stufe: '
            }),
            $select
        ]);
        update.bind($select)();
    }
 
    function init($content) {
        $content
            .find('.lvlselect:not(.lvlselect-initialized)')
            .each(initEach);
    }
 
    mw.loader.using(['mediawiki.util']).then(function() {
        init(mw.util.$content);
        mw.hook('wikipage.content').add(init);
    });
})();
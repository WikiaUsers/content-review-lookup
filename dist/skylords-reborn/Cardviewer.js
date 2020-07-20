// TODO: Promo disables select
require(['jquery', 'mw'], function($, mw) {
    'use strict';
 
    function updateUpgrade() {
        var $infobox = $(this).closest('aside'),
            $charge = $infobox.find('.cardviewer-controls-charge select'),
            $cards = $infobox.find('.cv-card-container:not(.cv-promo)'),
            u = $(this)[0].selectedIndex,
            c = $charge[0].selectedIndex;
 
        $cards.find('.cv-upgradeparts').hide(0);
        for(var i = 0; i <= u; i++) {
            $cards.find('.cv-U' + i).show(0);
        }
        $cards.find('.cv-A' + u).show(0);
        $cards.find('.cv-damage').each(function() {
            $(this).html($(this).data('damage')[u]);
        });
        $cards.find('.cv-health').each(function() {
            $(this).html($(this).data('health')[u]);
        });
        $cards.find('.cv-cost').each(function() {
            $(this).html($(this).data('cost')[u]);
        });
 
        if (c > u) {
            $charge.val(u).change();
        }
    }
 
    function updateCharge() {
        var $infobox = $(this).closest('aside'),
            $upgrade = $infobox.find('.cardviewer-controls-upgrade select'),
            $cards = $infobox.find('.cv-card-container:not(.cv-promo)'),
            u = $upgrade[0].selectedIndex,
            c = $(this)[0].selectedIndex;
 
        $cards.find('.cv-chargeparts').hide(0);
        for(var i = 0; i <= c; i++) {
            $cards.find('.cv-C' + i).show(0);
        }
        $cards.find('.cv-charges').each(function() {
            $(this).html($(this).data('charges') * (c+1));
        });
 
        if (c > u) {
            $upgrade.val(c).change();
        }
    }
 
    function initEach() {
        var $this = $(this).addClass('controls-initialized');
 
        var $select = $('<select>', {
                'change': $this.hasClass('cardviewer-controls-upgrade') ? updateUpgrade : updateCharge,
            }).append('<option value="0">0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option>');
 
        $this.append($select);
    }
 
    function init($content) {
        $content
            .find('.cardviewer-controls-upgrade:not(.controls-initialized)')
            .each(initEach);
        $content
            .find('.cardviewer-controls-charge:not(.controls-initialized)')
            .each(initEach);
    }
 
    mw.loader.using(['mediawiki.util']).then(function() {
        init(mw.util.$content);
        mw.hook('wikipage.content').add(init);
    });
});
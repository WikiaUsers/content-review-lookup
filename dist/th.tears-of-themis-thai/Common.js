/* จาวาสคริปต์ใด ๆ ในหน้านี้จะถูกโหลดให้แก่ผู้ใช้ทุกคนในทุกหน้า */

/*
 * @name: WdsTooltips
 * @author: KhangND (idea by 机智的小鱼君)
 * @refactoring: Suggon
 * @description: documented at https://dev.fandom.com/WdsTooltips
 */
(function () {
    var $container = $('#mw-content-text');

    if (window.WdsTLoaded || $container.length === 0) {
        return;
    }
    window.WdsTLoaded = true;

    var containerBound = {
        left:   $container.offset().left,
        right:  $container.offset().left + $container.width(),
        bottom: $container.offset().top  + $container.height()
    };
    
    var align = {
        left:  'wds-is-right-aligned',
        right: 'wds-is-left-aligned',
        top:   'wds-is-flipped'
    };

    $('.custom-tooltip > *').on('mouseenter focusin', adjustBounds);

    function adjustBounds() {
        var tip = $(this).parent().children('.wds-dropdown__content')[0];
        var $tip = $(tip);

        //fix for short pages
        if($container.height() < $tip.height()) {
            $('#content').css('overflow', 'unset');
            return;
        }
        
        //fix for tooltips clipped inside portable infobox
        var $piData = $(this).parents('.pi-data');
        if ($piData) {
            $piData.css('overflow', 'unset');
        }

        //check bounds
        var tipBound = {
            left:   $tip.offset().left,
            right:  $tip.offset().left + $tip.width(),
            bottom: $tip.offset().top  + $tip.height()
        };

        //check overflow
        var overflow = {
            left:   tipBound.left   < containerBound.left,
            right:  tipBound.right  > containerBound.right,
            bottom: tipBound.bottom > containerBound.bottom
        };

        //adjust bounds as necessary
        if (overflow.left)   $tip.addClass(align.right);
        if (overflow.right)  $tip.addClass(align.left).removeClass(align.right);
        if (overflow.bottom) $tip.parent().addClass(align.top);

        //trigger scroll to display lazy loading images
        $(window).trigger('scroll');
    }
})();
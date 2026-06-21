$(function() {
    $('.utdx-tabber-wrapper').each(function() {
        var $wrapper = $(this);
        var $tabs = $wrapper.find('.utdx-tabs');

        if ($wrapper.find('.utdx-scroll-btn').length === 0) {
            var $leftBtn = $('<button class="utdx-scroll-btn left">‹</button>');
            var $rightBtn = $('<button class="utdx-scroll-btn right">›</button>');

            $wrapper.append($leftBtn, $rightBtn);

            $leftBtn.on('click', function() {
                $tabs[0].scrollBy({ left: -200, behavior: 'smooth' });
            });

            $rightBtn.on('click', function() {
                $tabs[0].scrollBy({ left: 200, behavior: 'smooth' });
            });
        }
    });
});
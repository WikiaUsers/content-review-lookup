$(function () {
    if ($('.ao-filters-container').length === 0) return;

    $('.ao-filters-container').on('click', '.ao-filter-btn', function () {
        var $btn = $(this);
        var filterVal = $btn.attr('data-filter');

        $('.ao-filter-btn').removeClass('ao-active');
        $btn.addClass('ao-active');

        var $cards = $('.ao-item-card');

        if (filterVal === 'All') {
            $cards.show();
        } else if (filterVal === 'Relics' || filterVal === 'Craft') {
            $cards.hide();
            $cards.filter('[data-ao-type="' + filterVal + '"]').show();
        } else {
            $cards.hide();
            $cards.filter('[data-ao-set="' + filterVal + '"]').show();
        }

        $('.ao-set-section').each(function () {
            var $sec = $(this);
            if ($sec.find('.ao-item-card:visible').length === 0) {
                $sec.hide();
            } else {
                $sec.show();
            }
        });

        $('.ao-type-section').each(function () {
            var $sec = $(this);
            if ($sec.find('.ao-item-card:visible').length === 0) {
                $sec.hide();
            } else {
                $sec.show();
            }
        });
    });
});
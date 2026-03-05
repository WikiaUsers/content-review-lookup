$(function() {
    // Only run if our wrapper is present
    if (!$('.rs-2011-wrapper').length) return;

    // 1. Add Plus/Minus buttons to level inputs (just like OSRS)
    $('.jcForm input[type="text"]').each(function() {
        if ($(this).attr('name').includes('level')) {
            const $input = $(this);
            const $minus = $('<button class="rs-calc-btn">-</button>').click(function() {
                $input.val(Math.max(1, (parseInt($input.val()) || 1) - 1)).change();
            });
            const $plus = $('<button class="rs-calc-btn">+</button>').click(function() {
                $input.val((parseInt($input.val()) || 1) + 1).change();
            });
            $input.before($minus).after($plus);
        }
    });

    // 2. Handle Search button feedback
    $('.jcForm input[type="submit"]').on('click', function() {
        $(this).val('Searching...').css('opacity', '0.7');
    });
});
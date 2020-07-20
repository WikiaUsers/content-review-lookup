if ($('.js-items-spoilers').length) {
    $('.js-items-spoilers').before('<tr colspan="2" class="js-items-menu"><td><div class="js-items-buttons"><span class="button" data-type="show">&darr;</span><span class="button" data-type="hide">&uarr;</span></div></td></tr>');

    $('.js-items-menu .button').click(function() {
        var $jsItemsParent = $(this).closest('.js-items-menu').next(),
            toggleType = $(this).data('type');
        $jsItemsParent.find('.t_show_hide').each(function() {
            var $btnIndex = $(this).find('a').attr('id').replace(/\D/g, ''),
                $tableBody = $('#collapsibleTable' + $btnIndex + '>tbody>tr:last-child');
            if ((toggleType === 'show' && $tableBody.attr('style')) 
                || (toggleType === 'hide' && !$tableBody.attr('style'))
               ) {
                collapseTable($btnIndex);
            }
        });
    });
}
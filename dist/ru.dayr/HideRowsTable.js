$(document).ready(function() {
    $('td[data-row-hide]').closest('tr').hide();

    $('[data-open-rows]').on('click', function() {
        var $toggleDetails = $(this).find('.toggle-details');
        var $toggleHide = $(this).find('.toggle-hide');
        var $hiddenRows = $(this).closest('tr').nextAll('tr:has(td[data-row-hide])');

        if ($hiddenRows.is(':visible')) {
            $hiddenRows.stop(true, true).slideUp(400, function() {
                $hiddenRows.addClass('hidden-row');
                $toggleDetails.show();
                $toggleHide.hide();
            });
        } else {
            $hiddenRows.stop(true, true).hide().removeClass('hidden-row').slideDown(400, function() {
                $toggleDetails.hide();
                $toggleHide.show();
            });
        }
    });
});
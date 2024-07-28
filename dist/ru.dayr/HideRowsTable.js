$(document).ready(function() {
    $('tr[data-row-hide]').addClass('hidden-row');

    $(document).on('click', '.toggle-details', function() {
        var $toggleDetails = $(this);
        var $toggleHide = $toggleDetails.next('.toggle-hide');
        var $hiddenRows = $('tr[data-row-hide]');

        if ($hiddenRows.hasClass('hidden-row')) {
            $hiddenRows.removeClass('hidden-row');
        } else {
            $hiddenRows.addClass('hidden-row');
        }

        $toggleDetails.toggle();
        $toggleHide.toggle();
    });

    $(document).on('click', '.toggle-hide', function() {
        var $toggleHide = $(this);
        var $toggleDetails = $toggleHide.prev('.toggle-details');
        var $hiddenRows = $('tr[data-row-hide]');

        if ($hiddenRows.hasClass('hidden-row')) {
            $hiddenRows.removeClass('hidden-row');
        } else {
            $hiddenRows.addClass('hidden-row');
        }

        $toggleDetails.toggle();
        $toggleHide.toggle();
    });
});
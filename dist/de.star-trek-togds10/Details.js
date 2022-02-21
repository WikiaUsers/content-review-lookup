$('.details > .summary').each(function() {
    var $summary = $(this);
    var $details = $summary.parent();
    var $button = $('<a />').html('anzeigen');
    $summary.append(" [").append($button).append(']');
    $summary.bind('click', function() {
        $details.toggleClass('open');
        if ($details.hasClass('open')) {
            $button.html('verbergen');
        } else {
            $button.html('anzeigen');
        }
    });
});
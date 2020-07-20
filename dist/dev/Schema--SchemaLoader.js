$(function() {
    $('.schema[data-widget-id]').each(function() {
        var $this = $(this);
        $.getJSON('/wiki/Schema:' + $this.attr('data-widget-id'), {
            action: 'raw'
        }, function(data) {
            $this.append(
                $('<script>', {
                    text: JSON.stringify(data),
                    type: 'application/ld+json'
                })
            );
        });
    });
});
$('span.schema').css('display', 'none');
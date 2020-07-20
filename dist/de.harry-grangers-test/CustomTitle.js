addOnloadHook(function(){
    if ($('#article-belongs-to').length === 0) {
        return;
    }
    var $belongsTo = $('#article-belongs-to').detach();
    if (skin == "oasis") {
        $('header div.header-column.header-title')
            .append(
                $('<h2>').append($belongsTo)
            )
            .css('text-align',$belongsTo.css('text-align'));
    } else {
        $('.secondHeading')
            .emtpy()
            .append($belongsTo)
            .css('text-align',$belongsTo.css('text-align'));
    }
});
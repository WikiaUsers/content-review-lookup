"use strict";

function _portraitHoverSetup() {
    $('.portrait').mouseover(function(event) {
        var portrait, big_image;

        portrait = $(event.currentTarget).attr('data-big');
        if( portrait ) {
            big_image = $("<img/>").addClass("center_image").attr('src', portrait);
            $(".center_col").empty().append(big_image);
        }
    });
    
    // Start us out with Tyrael, because he's so very, very pretty.
    $($('a[title="Tyrael"]')[0]).parents('.portrait').trigger("mouseover");
}

$(_portraitHoverSetup);
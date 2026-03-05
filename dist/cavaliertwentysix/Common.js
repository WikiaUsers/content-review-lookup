/* Any JavaScript here will be loaded for all users on every page load. */

// Oscars Prediction Challenge Embed
$(function () {

    function loadTypeformEmbed(container) {
        $(container).html(
            "<div class='typeform-widget' data-url='https://form.typeform.com/to/meFVWeYM' style='width: 100%; height: 725px;'></div>"
        );

        if (!document.getElementById('typef_orm')) {
            var js = document.createElement('script');
            js.id = 'typef_orm';
            js.src = 'https://embed.typeform.com/embed.js';
            document.body.appendChild(js);
        }
    }

    // Manual page embeds
    $('.prediction-challenge-embed').each(function () {
        loadTypeformEmbed(this);
    });

    // Inject into wiki rail
    if ($('#WikiaRail').length) {
        var railContainer = $("<div style='margin-top:20px'></div>");
        $('#WikiaRail').append(railContainer);
        loadTypeformEmbed(railContainer);
    }

});
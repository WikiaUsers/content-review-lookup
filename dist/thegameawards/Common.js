/* Any JavaScript here will be loaded for all users on every page load. */

// Prediction Challenge Giveaway code
    $(function () {
        $('#WikiaRail').append("<div class='typeform-widget' data-url='https://form.typeform.com/to/aCzGX6WC' style='width: 100%; height: 775px;margin-top:20px'></div> <script> (function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id='typef_orm', b='https://embed.typeform.com/'; if(!gi.call(d,id)) { js=ce.call(d,'script'); js.id=id; js.src=b+'embed.js'; q=gt.call(d,'script')[0]; q.parentNode.insertBefore(js,q) } })() </script>" );
    });

// Prediction Challenge logo link
$('.fandom-community-header__community-name-wrapper').append(
    $('<a/>').addClass('hover-community-header-wrapper')
        .append($('<div/>')
            .addClass('message')
            .text('Join our Prediction Challenge!')
        )
        .attr('href', 'https://thegameawards.fandom.com/wiki/The_Game_Awards_2025_Prediction_Challenge_Giveaway')
);
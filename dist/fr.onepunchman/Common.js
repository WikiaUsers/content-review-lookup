window.railWAM = {
    logPage:"Project:WAM Log"
};

/* ==========Drapeaux des liens interlangues========== */

// Interlanguage links created by Gguigui1
var nav = '<nav class="wikia-menu-button secondary combined chooselanguage"><img class="fr-image" src="https://images.wikia.com/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="Français" height="16" width="22"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid rgb(47, 52, 52); border-top: none; text-align:center;" class="WikiaMenuElement"><a style="display: inline; padding: 0; height: 0; line-height: 0;" class="en-link"><li style="border-top: 1px solid rgb(47, 52, 52); padding-top: 3px; padding-bottom: 3px;" class="en"><img class="en-image" src="https://images.wikia.com/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="Anglais" height="16" width="22"></li></a><a style="display: inline; padding: 0; height: 0; line-height: 0;" class="ar-link"><li style="border-top: 1px solid rgb(47, 52, 52); padding-top: 3px; padding-bottom: 3px;" class="ar"><img class="ar-image" src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Flag_of_Saudi_Arabia.svg" alt="Arabe" height="16" width="22"></li></a></ul></nav>';
$('.wikia-button.comments.secondary').after(nav);
$('.en-link').attr('href', $('a.free').attr("href"));
if ($('#arlink').length > 0) {
    $('.ar-link').attr('href', 'https://' + $('#arlink').html());
}


/* Activation des galeries à flèches */
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-640},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+640},1000);
});

/* Message préventif de spoiler */
SpoilerAlert = {
    question: 'Cette page est à 100% dans la zone spoil du manga. Voulez-vous vraiment la lire ?',
    yes: 'Oui',
    no: 'Non, pas maintenant',
    }
    isSpoiler: function () {
        return -1 !== wgCategories.indexOf('100% spoils');
    }

};
importScriptPage('SpoilerAlert/code.js', 'dev');
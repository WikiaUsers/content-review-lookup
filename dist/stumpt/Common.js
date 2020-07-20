/* Any JavaScript here will be loaded for all users on every page load. */

$('#TwitchStream').html($('<iframe>', {
    src: 'http://player.twitch.tv/?channel=stumptgamers',
    allowfullscreen: true
}));


$(function() {
    mw.hook('DiscordIntegrator.added').add(function() {
        $('<section class="rail-module"><iframe src="http://player.twitch.tv/?channel=stumptgamers" style="width: 100%;" allowfullscreen="true"></iframe></section>').insertBefore('.DiscordIntegratorModule');
    });
});


window.railWAM = {
     logPage:'Log of WAM Scores',
     loadOnPage:['Special:WikiActivity', 'Special:Statistics'],
     lang:'en'
};

/* Replacing default "Image not found" image for the Link preview JavaScript Imported from the Dev Wikia when hovering on links as it's a Borderlands (game) themed image, which isn't suitable for this Wiki's topic(s) */

window.pPreview = {
    noimage: 'https://vignette.wikia.nocookie.net/stumpt/images/6/6d/Stumpt_Wikia_Image_not_found_default_image.PNG'
}
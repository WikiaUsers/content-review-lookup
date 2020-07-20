/* Any JavaScript here will be loaded for all users on every page load. */

// START UserTags module configuration
window.UserTagsJS = {
	modules: {},
	tags: {}
};
// NOTE: bannedfromchat displays in Oasis but is not a user-identity group so must be checked manually
UserTagsJS.modules.mwGroups = ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'];
UserTagsJS.modules.metafilter = {
	chatmoderator: ['sysop', 'bureaucrat']
};
// END UserTags module configuration

// START Map system scripts
// Fix for map tables on Firefox and Opera
if ($.client.profile().name == 'firefox' || $.client.profile().name == 'opera') {
    $('.eo1map td').css('height', '18');
    $('.eo2map td').css('height', '17');
}

// Creates floating popup boxes on hover of tiles to show more info
$('body').on("mouseenter", ".maptable td", function () {
    if ($('#mappopup').length) {
        $('#mappopup').remove();
    }
    if ($(this).children('span').text() !== "") {
        var tooltip = $('<div class="popover-inner" id="mappopup" style="position:absolute;left:'+($(this).offset().left+$(this).width())+'px;top:'+$(this).offset().top+'px;z-index:9;max-width:150px;padding:0.5em;"></div>');
        $(tooltip).append($(this).children('span').contents().clone());
        $('body').append(tooltip);
    }
});

// Removes popup box when mouse leaves it
$('body').on("mouseleave", "#mappopup", function () {
    $('#mappopup').remove();
});
// END Map system scripts
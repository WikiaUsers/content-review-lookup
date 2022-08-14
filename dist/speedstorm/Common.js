/* Any JavaScript here will be loaded for all users on every page load. */
/* Discord Banner settings */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'disneyspeedstorm',
    prependToRail: true,
    noRail: false
};

/*Multi-upload*/
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:UploadMultipleFiles.js',
    ]
});

/*Images*/
$('#content img').bind('contextmenu', function(e) {
    return false;
});

$('#content').on('contextmenu', 'img', function(e) {
    return false;
});

$('#content img').attr('draggable', false).on({
    'contextmenu': function(e) {
        return false;
    }
});
/***************************************/
window.AddRailModule = [
    {page: 'Template:WikiRules', prepend: true},
    'Template:ExtraDiscord',
];
/*************Replace the HOME button with a pic**************************/
const welcomeCustom = document.querySelector('.welcome'); //check if it's the main page by the class
const picCustom = '<img alt="Crikee sticker.png" src="https://static.wikia.nocookie.net/speedstorm/images/c/cf/Crikee_sticker.png/revision/latest/scale-to-width-down/150?cb=20220812065820" decoding="async" width="150" height="63" data-image-name="Crikee sticker.png" data-image-key="Crikee_sticker.png" data-src="https://static.wikia.nocookie.net/speedstorm/images/c/cf/Crikee_sticker.png/revision/latest/scale-to-width-down/150?cb=20220812065820" class=" lazyloaded" draggable="false">';
const headerCustom = document.querySelector('.page-header__title-wrapper'); //find the header
const headerHide = document.querySelector('.page-header__title');
const functionCustomVar = function () {
	headerCustom.insertAdjacentHTML('afterbegin', picCustom); //insert the pic to the header
};
const functionDeleteHeader = function() {
        headerHide.classList.add('hide');
    };
    
if (welcomeCustom) {
    functionCustomVar(); 
    functionDeleteHeader();
}
/* Any JavaScript here will be loaded for all users on every page load. */
/* Discord Banner settings */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'disneyspeedstorm',
    prependToRail: true,
    noRail: false
};


/***************************************/
window.AddRailModule = [
    {page: 'Template:WikiRules', prepend: true},
    'Template:ExtraDiscord',
    'Template:Calculator'
];


/*************Replace the HOME button with a pic**************************/
const welcomeCustom = document.querySelector('.welcome'); //check if it's the main page by the class

const picCustom = '<img alt="Crikee sticker.png" src="https://static.wikia.nocookie.net/speedstorm/images/c/cf/Crikee_sticker.png/revision/latest/scale-to-width-down/150?cb=20220812065820" decoding="async" width="150" height="63" data-image-name="Crikee sticker.png" data-image-key="Crikee_sticker.png" data-src="https://static.wikia.nocookie.net/speedstorm/images/c/cf/Crikee_sticker.png/revision/latest/scale-to-width-down/150?cb=20220812065820" class=" lazyloaded" draggable="false">';

const linksCustom = '<div class="page-header__languages" style="float: right; padding-top: 15px;"><div class="wds-dropdown"><div class="wds-dropdown__toggle">English<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div><div class="wds-dropdown__content"><ul class="wds-list wds-is-linked"><li><a href="https://speedstorm.fandom.com/es/wiki/" data-tracking-label="lang-es">español</a></li></ul></div></div></div>';

const headerCustom = document.querySelector('.page-header__title-wrapper'); //find the header
const headerHide = document.querySelector('.page-header__title');
const functionCustomVar = function () {
	headerCustom.insertAdjacentHTML('afterbegin', picCustom); //insert the pic to the header
};
const functionDeleteHeader = function() {
    headerHide.classList.add('hide');
    };

const addLanguageLinks = function () {
	headerCustom.insertAdjacentHTML('beforeend', linksCustom);
};

if (welcomeCustom) {
    functionCustomVar(); 
    functionDeleteHeader();
    addLanguageLinks();
}
/*----------------------------------------*/
/***************************************/
/***************************************/
/***************************************/
/***************************************/
/***************************************/
/***************************************/

/* Adding the list of the last new page creations */
$.ajax({
    url: "https://speedstorm.fandom.com/api.php?action=query&format=json&list=logevents&formatversion=2&leprop=title&letype=create&lenamespace=0&lelimit=5",
    type: 'GET',
    dataType: 'json',
    success: function(res) {
        var newPageList = '<ul>';
        if (res && res.query && res.query.logevents) {
    		res.query.logevents.forEach(function(e) {
        if (e.title) {
            newPageList += '<li><a href="/wiki/' + e.title + '">' + e.title + '</a></li>';
        	}
			 });
			}
        newPageList += '</ul>';
        $( '#recent-changes-api' ).html(newPageList);
    }
});
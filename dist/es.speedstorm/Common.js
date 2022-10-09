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

const linksCustom = '<div class="page-header__languages" style="float: right; padding-top: 15px;"><div class="wds-dropdown"><div class="wds-dropdown__toggle">español<svg class="wds-icon wds-icon-tiny wds-dropdown__toggle-chevron"><use xlink:href="#wds-icons-dropdown-tiny"></use></svg></div><div class="wds-dropdown__content"><ul class="wds-list wds-is-linked"><li><a href="https://speedstorm.fandom.com/wiki/" data-tracking-label="lang-en">English</a></li></ul></div></div></div>';

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
/**********************Add pic to the top bar*********************************
const communityHeaderWrapper = document.querySelector('.community-header-wrapper');
const newPicOnTop = '<div class="pic-on-top"><img alt="MegHercCars.png" src="https://static.wikia.nocookie.net/speedstorm/images/0/0c/MegHercCars.png/revision/latest/scale-to-width-down/300?cb=20220819085733" decoding="async" width="300" height="163" data-image-name="MegHercCars.png" data-image-key="MegHercCars.png" data-src="https://static.wikia.nocookie.net/speedstorm/images/0/0c/MegHercCars.png/revision/latest/scale-to-width-down/300?cb=20220819085733" class=" lazyloaded" draggable="false"></div>';
const putThePicOnTop = function () {
    communityHeaderWrapper.insertAdjacentHTML('afterbegin', newPicOnTop);
};

if (communityHeaderWrapper) {
    putThePicOnTop();
}*/
/***************************************/
/***************************************/
/*Social media buttons add links*/
const checkSocialMediaClass = document.querySelector('.socialMedia');
const steamButton = document.querySelector('#steam');
const container = document.querySelector('.sci');
const addLinks = function () {
const links = '<li data-text="Steam"><div class="SMbutton steam"><a href="https://store.steampowered.com/app/1537830/Disney_Speedstorm"><i class="fa fa-steam" aria-hidden="true"></i></a></div></li><li data-text="Youtube"><div class="SMbutton yt"><a href="https://www.youtube.com/c/DisneySpeedstorm/"><i class="fa fa-youtube" aria-hidden="true"></i></a></div></li><li data-text="Facebook"><div class="SMbutton facebook"><a href="https://www.facebook.com/disneyspeedstorm/"><i class="fa fa-facebook" aria-hidden="true"></i></a></div></li><li data-text="Twitter"><div class="SMbutton twitter"><a href="https://twitter.com/speedstormgame"><i class="fa fa-twitter" aria-hidden="true"></i></a></div></li>';
container.insertAdjacentHTML('afterbegin', links); 
};

if(checkSocialMediaClass) {
    addLinks();
}

/***************************************/
/***************************************/
/*Hide overflow on skills page*/
const checkPage = document.querySelector('.back-menu');
const checkPageFAQ = document.querySelector('.FAQ-border-hover');
const checkPageRacers = document.querySelector('#unset-me');
const addHideOverflowClass = function () {
	document.querySelector('.page-content').classList.add('hide-overflow');
};


if (checkPage) {
	addHideOverflowClass();
}
if (checkPageFAQ) {
	addHideOverflowClass();
}
if (checkPageRacers) {
	addHideOverflowClass();
}
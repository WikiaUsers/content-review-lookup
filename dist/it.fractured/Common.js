/* Discord Banner settings */
window.DiscordBannerSettings = {
    bannerStyle: '3',
    inviteLink: 'jRSG4VnfwY',
    prependToRail: true,
    noRail: false
};

/* Any JavaScript here will be loaded for all users on every page load. */

$(function () {
    /* Hide namespace prefixes for page links on category pages */
    var prefix = $('#mw-cat-hide-page-ns').text().trim();

    if (prefix.length > 0){
        $('#mw-pages a').text(function(i, val){
            return val.slice(0, prefix.length) === prefix ? val.slice(prefix.length + 1) : val;
        });
    }
}());


/*----------------------------------------------------*/
/*Add Obtained from style*/
const obtainedFrom = document.querySelector('.obtained-from'); //check if it's a skill page with mobs
const customText = '<div class="text-obtained-from">Obtained from</div>';

const functionObtainedFromText = function (functionObtainedFrom) {
	obtainedFrom.insertAdjacentHTML('afterbegin', customText); //insert the heading before Syndesia
};
if (obtainedFrom) {
    functionObtainedFromText(); 
}


/*-----------------------------------------------------------------------------------*/
/*********Adds a spoiler button on that freakin spider*************/
const checkPic = document.querySelector('.image-spoiler');
const spoilerButton = document.querySelector('.spoiler-button');
const clickToRemoveBlur = function () {
    spoilerButton.addEventListener('click', function () {
        checkPic.classList.remove('image-spoiler');
        spoilerButton.remove();
    });
};

if (checkPic) {
    clickToRemoveBlur();
}




/***********************************************************************************/
/*----------Hides overflow to make the back button work with position sticky------------------*/
/*Hide overflow on skills page*/
const checkPage = document.querySelector('.back-menu');
const addHideOverflowClass = function () {
	document.querySelector('.page-content').classList.add('hide-overflow');
};


if (checkPage) {
	addHideOverflowClass();
}
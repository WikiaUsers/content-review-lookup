/* Any JavaScript here will be loaded for all users on every page load. */


/*################*/
/*### Rail WAM ###*/
/*################*/

window.railWAM = {
    logPage:"Project:WAM Log"
};

/* ########################## */
/* ### Back to Top Button ### */
/* ########################## */
window.BackToTopModern = true;
window.BackToTopArrow = true;
window.BackToTopText = "Back to Top";

/*##########################*/
/*### Link Hover Preview ###*/
/*##########################*/
 

window.pPreview = $.extend(true, window.pPreview, {RegExp: (window.pPreview || {}).RegExp || {} });
window.pPreview.noimage = 'https://vignette.wikia.nocookie.net/reverend-insanity/images/0/0e/No_image.jpg/revision/latest?cb=20200314121149&format=original';
window.pPreview.defimage = 'https://vignette.wikia.nocookie.net/reverend-insanity/images/b/b2/Blue-hourglass.gif/revision/latest?cb=20200314125634';
window.pPreview.tlen = 1000;

/*##############################################################*/
/*### Icon in Infobox Tab not showing up until scrolling Fix ###*/
/*##############################################################*/
$('body').on('click', '.pi-section-tab', $.fn.trigger.bind($(window), 'scroll'));
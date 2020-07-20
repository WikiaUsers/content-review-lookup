/*————————————————————————————————————————————————————————————————————————————*/
/* CONFIGURATIONS */
/*----------------------------------------------------------------------------*/
 
/*-------------------------------------------------------------------- AjaxRC */

window.ajaxSpecialPages = [
    "Contributions",
    "Images",
    "ListFiles",
    "Log",
    "NewPages",
    "Recentchanges",
    "UncategorizedFiles",
    "UncategorizedPages", 
    "UnusedFiles", 
    "Watchlist",
    "WikiActivity"
];

/*--------------------------------------------------------- EditConflictAlert */

var EditConflictAlertInterval = 15000;

/*---------------------------------------------------------------- LockForums */

window.LockForums = {
    expiryDays: 30,
    lockMessageWalls: true,
    expiryMessage: "This thread has been archived due to inactivity."
};

/*------------------------------------------------------------ SignatureCheck */

window.i = window.i || 0;

/*————————————————————————————————————————————————————————————————————————————*/
/* APT */
/*----------------------------------------------------------------------------*/

var elemImage = document.querySelector('.image');

if (typeof elemImage !== 'undefined' && elemImage !== null) {
    //const _images = $('.image');
    $('.image').append(new ImgIcon());
}

var elemVideo = document.querySelector('.video');

if (typeof elemVideo !== 'undefined' && elemVideo !== null) {
    //const _videos = $('.video');
    $('.video').append(new VidIcon());

    if ($('.image-icon')) {
        $('.video .image-icon').remove();
    }
}

/*----------------------------------------------------------------------------*/

function ImgIcon() {
    return $("<span></span>").addClass('apt-media-icon image-icon fa fa-search-plus');
}

function VidIcon() {
    return $("<span></span>").addClass('apt-media-icon video-icon fa fa-play');
}

/*————————————————————————————————————————————————————————————————————————————*/
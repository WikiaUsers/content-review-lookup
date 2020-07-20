/* Any JavaScript here will be loaded for all users on every page load. */

document.addEventListener('DOMContentLoaded', function () {
    /* subtitles */
    var title;
    if (document.getElementsByClassName('header-title').length) {
        title = document.getElementsByClassName('header-title')[0].firstElementChild;
    } else if (document.getElementById('firstHeading')) {
        title = document.getElementById('firstHeading');
    }
    title.innerHTML = title.textContent.replace(/\((.*)\)/gi, function(match, sub, index) {
        return '<span class="subtitle">' + sub + '</span>';
    });
});
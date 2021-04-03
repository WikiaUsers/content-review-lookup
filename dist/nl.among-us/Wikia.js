//Randkleur toevoegen aan infoboxen
$('.portable-infobox').each(function () {
    var cls = $(this).attr('class').match(/pi-theme-_(\S+)/);
    if (cls) {
        $(this).css('border-color', '#' + cls[1]);
    }
});

// voorkomt dat bestaande tags worden verborgen
// <nowiki>https://dev.fandom.com/wiki/ProfileTags</nowiki>
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
var casualty = '';
casualty += '<a href="/wiki/Casualty">';
casualty += '<img src="https://vignette.wikia.nocookie.net/casualty/images/c/c7/CasualtyInfobox.png/revision/latest" />';
casualty += '</a>';
 
$(document).ready(function() {
    $('.portable-infobox.type-casualty').prepend(casualty);
});
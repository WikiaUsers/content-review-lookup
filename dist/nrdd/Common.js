/* Any JavaScript here will be loaded for all users on every page load. */

/*----------- SIDEBAR FUNCTION -------- */
// loads sidebar section for new episodes, specials etc
 
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"></section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', 
     function(data) {
        var content = data.parse.text['*'];
        $('section#sidebar').append(content);
    });
});
$(document).ready(function() {
    var newSection = '<section id="sidebar" class="module"><h1>' +
      'What is New?' + '</h1>' + '</section>';
    $('#WikiaRail').append(newSection);
    $.getJSON('/api.php?action=parse&text={{Sidebar}}&format=json', function(data) {
        var code = data.parse.text['*'];
        $('section#sidebar').append(code);
    });
});












var admins = ['SunshineCutiePie'];
if ($('#UserProfileMasthead').length) {
    for (var i = 0; i < admins.length; i++) {
        if (admins[i] === wgTitle.substr(0, admins[i].length)) {
            $('.masthead-avatar img.avatar', '#UserProfileMasthead').css({
                borderStyle: 'outset', borderColor: 'blue', borderWidth: '5px'
            });
            break;
        }
    }
}
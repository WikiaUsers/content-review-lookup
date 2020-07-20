var admins = ['Bat Forever'];
if ($('#UserProfileMasthead').length) {
    for (var i = 0; i < admins.length; i++) {
        if (admins[i] === wgTitle.substr(0, admins[i].length)) {
            $('.masthead-avatar img.avatar', '#UserProfileMasthead').css({
                borderStyle: 'outset', borderColor: 'red', borderWidth: '5px'
            });
            break;
        }
    }
}
 
$('.speech-bubble-avatar')
.filter(function () {
    return $(this).has('a[href="Bat_Forever"]').length;
}).next().css({
    backgroundColor: 'white'
});
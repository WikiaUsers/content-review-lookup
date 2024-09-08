var darkThemeImage  = 'https://static.wikia.nocookie.net/catto-boi/images/e/e6/Wiki-logo-dark.png/revision/latest?cb=20240908115457';
var lightThemeImage = 'https://static.wikia.nocookie.net/catto-boi/images/d/d0/Wiki-logo-light.png/revision/latest?cb=20240908115428';
var darkThemeIcon   = 'https://static.wikia.nocookie.net/catto-boi/images/f/f3/Site-favicon-dark.ico/revision/latest?cb=20240204063715&format=original';
var lightThemeIcon  = 'https://static.wikia.nocookie.net/catto-boi/images/f/f3/Site-favicon-light.ico/revision/latest?cb=20240204063715&format=original';

if ($('body').hasClass('theme-fandomdesktop-dark')) {
    // Set dark theme logo image
    $('.fandom-community-header__image img').attr('src', darkThemeImage);
    
    // Random chance for dark theme favicon change
    var chance = Math.floor(Math.random() * 200) + 1;
    if (chance == 200) {
        $("link[rel='icon']").remove();
        $("link[rel='shortcut icon']").remove();
        $("head").append('<link rel="icon" href="' + darkThemeIcon + '?t=' + new Date().getTime() + '" type="image/x-icon">');
    }
} else {
    // Set light theme logo image
    $('.fandom-community-header__image img').attr('src', lightThemeImage);
    
    // Random chance for light theme favicon change
    var chance = Math.floor(Math.random() * 1000) + 1;
    if (chance == 1000) {
        $("link[rel='icon']").remove();
        $("link[rel='shortcut icon']").remove();
        $("head").append('<link rel="icon" href="' + lightThemeIcon + '?t=' + new Date().getTime() + '" type="image/x-icon">');
    }
}
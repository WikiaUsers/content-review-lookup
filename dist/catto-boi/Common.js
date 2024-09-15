var darkThemeIcon   = 'https://static.wikia.nocookie.net/catto-boi/images/f/f3/Site-favicon-dark.ico/revision/latest?cb=20240204063715&format=original';
var lightThemeIcon  = 'https://static.wikia.nocookie.net/catto-boi/images/f/f3/Site-favicon-light.ico/revision/latest?cb=20240204063715&format=original';
var themeImages     = [
    'https://static.wikia.nocookie.net/catto-boi/images/2/27/Catto_Boi_Title_-_The_Adventures_of_Catto_Boi.png/revision/latest?cb=20240913150811&format=original',
    'https://static.wikia.nocookie.net/catto-boi/images/5/5b/Catto_Boi_Title_-_Tedious_Pearl_Hunt.png/revision/latest?cb=20231227092044&format=original',
    'https://static.wikia.nocookie.net/catto-boi/images/8/84/Catto_Boi_Title_-_Journey_to_Catto_Land.png/revision/latest?cb=20240913150810&format=original',
    'https://static.wikia.nocookie.net/catto-boi/images/c/c0/Catto_Boi_Title_-_The_Quest_for_the_Frozen_Tuna.png/revision/latest?cb=20240914080213&format=original'
];

// Generate a random index to pick a random image
var randomIndex = Math.floor(Math.random() * themeImages.length);
var randomImage = themeImages[randomIndex];

// Change Wiki logo to the randomly selected image
$('.fandom-community-header__image img').attr('src', randomImage);

// Dark theme handling
if ($('body').hasClass('theme-fandomdesktop-dark')) {
    // Random chance for dark theme favicon change
    var chance = Math.floor(Math.random() * 200) + 1;
    if (chance == 200) {
        $("link[rel='icon']").remove();
        $("link[rel='shortcut icon']").remove();
        $("head").append('<link rel="icon" href="' + darkThemeIcon + '?t=' + new Date().getTime() + '" type="image/x-icon">');
    }
} else {
    // Random chance for light theme favicon change
    var chance = Math.floor(Math.random() * 1000) + 1;
    if (chance == 1000) {
        $("link[rel='icon']").remove();
        $("link[rel='shortcut icon']").remove();
        $("head").append('<link rel="icon" href="' + lightThemeIcon + '?t=' + new Date().getTime() + '" type="image/x-icon">');
    }
}
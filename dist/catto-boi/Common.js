// Updated 24.07.2026! If somehow you found this, yes this page changes logos and favicons.

mw.hook('wikipage.content').add(function() {
    // 1. Configuration & Asset URLs
    const DarkThemeIcon    = 'https://static.wikia.nocookie.net/catto-boi/images/f/f3/Site-favicon-dark.ico/revision/latest?cb=20240204063715&format=original';
    const LightThemeIcon   = 'https://static.wikia.nocookie.net/catto-boi/images/f/f3/Site-favicon-light.ico/revision/latest?cb=20240204063715&format=original';
    const ThemeImages      = [
        'https://static.wikia.nocookie.net/catto-boi/images/2/27/Catto_Boi_Title_-_The_Adventures_of_Catto_Boi.png/revision/latest?cb=20240913150811&format=original',
        'https://static.wikia.nocookie.net/catto-boi/images/5/5b/Catto_Boi_Title_-_Tedious_Pearl_Hunt.png/revision/latest?cb=20231227092044&format=original',
        'https://static.wikia.nocookie.net/catto-boi/images/8/84/Catto_Boi_Title_-_Journey_to_Catto_Land.png/revision/latest?cb=20240913150810&format=original',
        'https://static.wikia.nocookie.net/catto-boi/images/c/c0/Catto_Boi_Title_-_The_Quest_for_the_Frozen_Tuna.png/revision/latest?cb=20240914080213&format=original'
    ];
    const ThemeImagesALT  = [
        'https://static.wikia.nocookie.net/catto-boi/images/3/34/Catto_Boi_Title_-_The_Adventures_of_Catto_Boi_Corrupted_1.png/revision/latest?cb=20240914141313&format=original',
        'https://static.wikia.nocookie.net/catto-boi/images/f/f4/Catto_Boi_Title_-_Journey_to_Catto_Land_Corrupted.png/revision/latest?cb=20240913150813&format=original',
        'https://static.wikia.nocookie.net/catto-boi/images/d/d0/Catto_Boi_Title_-_The_Quest_for_the_Frozen_Tuna_Corrupted.png/revision/latest?cb=20240914081007&format=original',
        'https://static.wikia.nocookie.net/catto-boi/images/d/d7/Catto_Boi_1_Beta_Title.png/revision/latest?cb=20251022102508&format=original'
    ];

    // 2. State & Randomization Initialization
    const DateInfo = new Date();
    const logoChance = Math.floor(Math.random() * 1000) + 1; // 1 to 1000

    // Targets the main community header logo image
    const $headerLogo = $('.fandom-community-header__image img');
    let selectedLogoSrc = '';

    // 3. Logo Selection Logic
    if (DateInfo.getMonth() === 3 && DateInfo.getDate() === 1 && logoChance >= 666) {
        // April Fools Easter Egg
        selectedLogoSrc = 'https://static.wikia.nocookie.net/catto-boi/images/9/9f/Catto_Boi_Title_-_The_Quest_for_the_Frozen_Tuna_Easter.png/revision/latest?cb=20240914081107&format=original';
    } else if (logoChance === 1000) {
        // 0.1% Chance: 3D Catto Boi
        selectedLogoSrc = 'https://static.wikia.nocookie.net/catto-boi/images/d/d8/3D_Catto_Boi.png/revision/latest?cb=20231222164936&format=original';
    } else if (logoChance <= 19) {
        // 1.9% Chance: Loaf Title Catto
        selectedLogoSrc = 'https://static.wikia.nocookie.net/catto-boi/images/3/37/Loaftitlecatto.png/revision/latest?cb=20251007074318&format=original';
    } else if (logoChance >= 977) {
        // 2.3% Chance: ALT Titles
        const randomIndex = Math.floor(Math.random() * ThemeImagesALT.length);
        selectedLogoSrc = ThemeImagesALT[randomIndex];
    } else {
        // 95.7% Chance: Standard Random Titles
        const randomIndex = Math.floor(Math.random() * ThemeImages.length);
        selectedLogoSrc = ThemeImages[randomIndex];
    }

    // Apply selected logo to header element
    if ($headerLogo.length) {
        $headerLogo.attr('src', selectedLogoSrc);
    }

    // 4. Favicon Manipulation Logic
    const isDarkTheme = $('body').hasClass('theme-fandomdesktop-dark');
    const faviconChance = Math.floor(Math.random() * (isDarkTheme ? 200 : 500)) + 1;
    const targetFaviconValue = isDarkTheme ? 200 : 500;

    if (faviconChance === targetFaviconValue) {
        const chosenIcon = isDarkTheme ? DarkThemeIcon : LightThemeIcon;
        
        // Remove existing favicon tags cleanly
        $('link[rel="icon"], link[rel="shortcut icon"]').remove();
        
        // Append the new custom favicon with a cache-busting timestamp
        $('head').append('<link rel="icon" href="' + chosenIcon + '?t=' + Date.now() + '" type="image/x-icon">');
    }
});
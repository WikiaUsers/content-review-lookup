/* Custom Navigation Icons for Dropdown Menu */

mw.hook('wikipage.content').add(function () {
    console.log('✅ Custom Navigation Icon Script Loaded');
    const iconMap = {
    // Wiki Guidelines section
        'General Rules': 'https://static.wikia.nocookie.net/bladeball/images/9/9c/Editing_Rules.png',
        'Page Structures': 'https://static.wikia.nocookie.net/bladeball/images/a/ab/Page_Structures.png',
        'User Rights & Roles': 'https://static.wikia.nocookie.net/bladeball/images/6/64/User_Roles.png',
        'Activity': 'https://static.wikia.nocookie.net/bladeball/images/9/96/Activity.png',

    // Game Contents section
        'Abilities': 'https://static.wikia.nocookie.net/bladeball/images/7/78/No_Ability_Reward.png',
        'Skins': 'https://static.wikia.nocookie.net/bladeball/images/f/fe/Apex_Blade.png',
        'Gamemodes': 'https://static.wikia.nocookie.net/bladeball/images/9/9d/Menacing.png',
        'Maps': 'https://static.wikia.nocookie.net/bladeball/images/a/a5/Zero_Gravity_Boost.png',
        'Emotes': 'https://static.wikia.nocookie.net/bladeball/images/3/39/Zombie_Slide.png',

    // Game Infos section
    'Currency': 'https://static.wikia.nocookie.net/bladeball/images/4/41/Robux.png',
    'Battle Pass': 'https://static.wikia.nocookie.net/bladeball/images/0/04/Easter_Bunny.png',
    'Wheel': 'https://static.wikia.nocookie.net/bladeball/images/4/44/Wheel.png',
    'Merchant': 'https://static.wikia.nocookie.net/bladeball/images/f/fa/Forsaken_Riftide.png',
    'Clans': 'https://static.wikia.nocookie.net/bladeball/images/f/f3/Crown.png',
    'Trading': 'https://static.wikia.nocookie.net/bladeball/images/7/76/Trade_Token_Currency.png'
    };

    document.querySelectorAll('.wds-dropdown__content a span').forEach(span => {
        const label = span.textContent.trim();
        if (iconMap[label]) {
            const img = document.createElement('img');
            img.src = iconMap[label];
            img.alt = label + ' icon';
            img.loading = 'lazy';
            img.style = `
                width: 18px;
                height: 18px;
                margin-right: 6px;
                vertical-align: middle;
                object-fit: contain;
            `;
            img.classList.add('custom-nav-icon');

            // Insert the icon before the text
            span.parentNode.insertBefore(img, span);

            // 💡 Fix misalignment by applying flexbox to parent <a> tag
            const link = span.closest('a');
            if (link) {
                link.style.display = 'flex';
                link.style.alignItems = 'center';
                link.style.justifyContent = 'flex-start';
                link.style.gap = '6px';
            }

            console.log(`✅ Inserted icon for: ${label}`);
        }
    });
});
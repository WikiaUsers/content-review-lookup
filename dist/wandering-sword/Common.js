/* Any JavaScript here will be loaded for all users on every page load. */

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:Translator/Translator.js'
    ]
});

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:YouTubeModal/code.js'
    ]
});

// --------------------------------------------------------------------------------------------
// Site-wide floating buttons (Discord, YouTube, Steam)
(function () {
    const header = document.querySelector('.fandom-community-header__top-container');
    if (!header) return;

    const buttons = [
        {
            id: 'steam-btn',
            url: 'https://store.steampowered.com/app/1876890/Wandering_Sword/'
        },
        {
            id: 'youtube-btn',
            url: 'https://www.youtube.com/@wanderingsword2893/videos'
        },
        {
            id: 'discord-header-btn',
            url: 'https://discord.com/channels/974263216186212422/974263216651763738'
        }
    ];

    buttons.forEach(btn => {
        if (document.getElementById(btn.id)) return;

        const link = document.createElement('a');
        link.id = btn.id;
        link.href = btn.url;
        link.target = '_blank';

        header.appendChild(link);
    });
})();
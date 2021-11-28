/* Any JavaScript here will be loaded for all users on every page load. */
/* User Tags */
window.UserTagsJS = {
    tags: {
        discordmod: { u: 'Discord Moderator' },
        wikidev: { u: 'Wiki Developer' },
        exec: { u: 'Executive' },
        themedesigner: { u: 'Theme Designer' },
        imagelead: { u: 'Image Lead' }
    },
    modules: {
        inactive: {
            days: 60,
            namespaces: [0],
            zeroIsInactive: true
        },
        mwGroups: [
            'imagelead',
            'rollback',
            'bot'
        ]
    }
};
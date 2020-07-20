/* -                    ______________________________________                       - */
                       /* Do not edit without the permission *\
                       \*      of [[User:SketchNebula]].     */
/* -                    ¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯                       - */
/* ~ ~ ~ ~ ~ ~ */
/* Any JavaScript here will be loaded for all users on every page load. */
/* This code was put together from snippets of code from [[w:c:dev]], or the Dev Wiki! */
/* The !mods code SHOULD NOT be used unless there is an emergency, such as extreme spam. */
/* ChatTags were removed, possibly temporarily but possibly not. */
/* I do not know why the block button will not work. I will look into it later. */
/* ~ ~ ~ ~ ~ ~ */
importArticles( {
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:MediaWiki:GiveChatModPrompt/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:MediaWiki:ChatBlockButton/code.2.js',
    ]
} );

/* ~ ~ ~ ~ ~ ~ */

/* This is a simple code for chat notifications (from [[w:c:dev:ChatNotifications]] */
if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
    importScriptPage('ChatNotifications/code.js', 'dev');
}
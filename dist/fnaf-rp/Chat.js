//This code was put together from snippets of code from [[w:c:dev]], or the Dev Wiki!
//Some articles had to be imported directly, as they would not work regularly. Still dunno why they were broken.
//As for chattags, I had to remove [big], which is why the code is pasted here.
importArticles( {
    type: 'script',
    articles: [
        'u:dev:!kick/code.js',
        'u:dev:GiveChatModPrompt/code.js',
        'u:dev:!mods/code.js',
        'u:dev:ChatOptions/code.js',
        'u:dev:ChatAnnouncements/code.js',
        'u:dev:ChatDelay/code.js',
    ]
} );
//Note that !mods is ONLY to be used in cases of extreme spam, as it pings every moderator on chat. It is entirely unnecessary, otherwise.
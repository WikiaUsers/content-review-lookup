/* Any JavaScript here will be loaded for all users on every page load. */

/* DISCORD SIDERAIL */

importArticles({
    type: "script",
    articles: [
        // ...
        'u:dev:MediaWiki:DiscordIntegrator/code.js'
        // ...
    ]
});
 
window.DiscordIntegratorConfig = {
    siderail: {
        title: "Live Discord Chat!",
        id: "233671456028884992",
        theme: "light",
        height: "250px",
        moduleHeight: "300px"
    }
};

/* Global Edit Count on Masthead */

importArticles({
    type: "script",
    articles: [
        // ...
        'u:dev:MediaWiki:GlobalEditcount/code.js'
        // ...
    ]
});

/* Clock */

importArticles({
    type: 'script',
    articles: [
        'u:dev:DisplayClock/code.js',
    ]
});
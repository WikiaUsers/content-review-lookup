require([
    "wikia.window",
    "wikia.document",
    "jquery",
    "mw",
    require.optional("BannerNotification"),
    require.optional("ext.wikia.design-system.loading-spinner")
], (window, document, $, mw, Banner, Spinner) => {
    // Proxy handler
    const PROXY_HANDLER = Object.freeze({
        get: (object, property) => property in object ? object[property] : null
    });
    // Promisify function
    const Promisify = (deferred) => new Promise((resolve, reject) => deferred.done(resolve).fail(reject));
    // Cache object
    const CACHE = new Proxy({}, PROXY_HANDLER);
    // Admin rights
    const ADMIN = Object.freeze([
        "staff", "helper", "wiki-manager", "content-team-member", "vstf", "sysop"
    ]);
});
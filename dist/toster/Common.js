/**
 * It is a localization script to redirect users to the /ru/ path. 
 * Since Russian is the primary language of this community, this ensures that 
 * even if a user omits the "/ru/" prefix, they are correctly directed to 
 * the localized content.
 */
(function() {
    var path = window.location.pathname;
    var search = window.location.search;
    var hash = window.location.hash;

    // Check if the user is already within the /ru/ localization path
    if (!path.startsWith('/ru/')) {
        var newPath;

        // Redirect base root or standard Main Page to the localized community home page
        if (path === '/' || path === '/wiki/' || path === '/wiki/Main_Page') {
            newPath = '/ru/wiki/%D0%A2%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D0%92%D0%B8%D0%BA%D0%B8';
        } else {
            // For specific articles, simply prepend the /ru/ prefix to maintain navigation
            newPath = '/ru' + path;
        }

        // Use location.replace to perform the redirect without cluttering the browser history
        window.location.replace(window.location.origin + newPath + search + hash);
    }
})();
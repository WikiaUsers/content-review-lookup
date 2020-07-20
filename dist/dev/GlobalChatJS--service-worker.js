/* Service worker component loaded by [[GlobalChatJS]] */

/*jslint browser, long */
/*global self, Response */

(function () {
    "use strict";

    /**
     * Dummy 'mw' object
     *
     * The 'mediaWiki' and 'mw' variables won't exist in service worker scope,
     * but MediaWiki's load.php will try to call 'mw.loader.state'.
     */
    self.mw = {
        loader: {
            state: function () {}
        }
    };

    /**
     * Construct the site/user chat JS URL
     *
     * Original source:
     *   https://github.com/Wikia/app/blob/4b74305/extensions/wikia/Chat2/templates/Chat_Index.php#L190
     *
     * Example URL:
     *   https://dev.wikia.com/load.php?lang=en&mode=articles&articles=MediaWiki%3AChat.js%7CUser%3AExample%2Fchat.js&only=scripts
     *
     * Example URL articles are:
     *   MediaWiki:Chat.js, User:Example/chat.js
     *
     * importStart portion (note 'en' is hard-coded in original source):
     *   ?lang=en&mode=articles&articles=MediaWiki%3AChat.js%7CUser%3A
     *
     * Portion between importStart and importEnd (should be current user's user name):
     *   Example
     *
     * importEnd portion:
     *   %2Fchat.js&only=scripts
     */
    const importParts = [
        "?lang=en&mode=articles&articles=MediaWiki%3AChat.js%7C",
        "User%3A",
        "%2Fchat.js",
        "&only=scripts"
    ];
    const importStart = importParts[0] + importParts[1];
    const importEnd = importParts[2] + importParts[3];

    /**
     * Monitor network requests and intercept the site/user chat JS request
     *
     * Note that 'location.pathname' should be equal to 'mw.config.get("wgLoadScript")' in page scope.
     * This is usually '/load.php'.
     */
    self.addEventListener("fetch", function (event) {
        const requestUrl = new URL(event.request.url);
        const searchParams = requestUrl.search;

        if (
            // Is this a ResourceLoader (load.php) request?
            requestUrl.pathname === location.pathname
            // Is this request for the site/user chat JS?
            && searchParams.startsWith(importStart)
            && searchParams.endsWith(importEnd)
            // Is the request *not* coming from English Community Central chat?
            && !(
                (location.host === "community.wikia.com" || location.host === "community.fandom.com")
                && location.pathname === "/load.php"
            )
        ) {
            // Looks like this request is for the site/user chat JS - let's adjust it!

            const userName = searchParams.slice(importStart.length, -importEnd.length);
            const userChatJsPage = importParts[1] + userName + importParts[2];
            // userChatJsPage equals "User%3AExample%2Fchat.js"

            requestUrl.search = (
                importParts[0]
                + "u%3Acommunity%3A"
                + userChatJsPage
                + "%7C"
                + userChatJsPage
                + importParts[3]
            );

            // requestUrl.search now equals:
            //   ?lang=en&mode=articles&articles=MediaWiki%3AChat.js%7Cu%3Acommunity%3AUser%3AExample%2Fchat.js%7CUser%3AExample%2Fchat.js&only=scripts
            // URl articles now are:
            //   MediaWiki:Chat.js, u:community:User:Example/chat.js, User:Example/chat.js

            // Create response to redirect to the new chat JS URL
            // 307 status is "Temporary Redirect"
            const importResponse = new Response(null, {
                status: 307,
                headers: {
                    Location: String(requestUrl)
                }
            });

            // Respond to request with the new redirect
            event.respondWith(importResponse);
        }
    });
}());
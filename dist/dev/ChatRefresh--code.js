/* ChatRefresh
 * By IAmAPersson (https://c.fandom.com/wiki/User:IAmAPersson)
 * Original release date: January 20, 2014
 * Fixed by KockaAdmiralac on January 29, 2017
 */
$(function() {
    if(mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
        setInterval(function() {
            $('.Chat ul').empty();
        }, (window.refreshTime || 1800000));
    }
});
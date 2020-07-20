// ============================================================
// User profile tabs
// ============================================================
// code originally by User:Penguin-Pal

var userSpacesIds = [
        2, // User
        3, // User_talk
        500, // User_blog
        1200, // Message_Wall
];
if (
        userSpacesIds.indexOf(mw.config.get("wgNamespaceNumber")) > -1 || // ordinary base userspaces
        mw.config.get("wgCanonicalSpecialPageName") === "Contributions/" || // contributions
        mw.config.get("wgPageName").indexOf("Special:Contributions/") === 0 ||
        mw.config.get("wgPageName") === "Special:Following"
) {
        var username = encodeURIComponent($('section#UserProfileMasthead h1[itemprop="name"]').html().replace(/ /g, "_"));
        $('#WikiaUserPagesHeader ul.tabs > li[data-id="profile"]').after(
                '<li data-id="fanonprofile"><a href="http://fablefanon.wikia.com/wiki/User:' + username + '" title="w:c:fablefanon:User:' + username + '"><font color=#1E90FF>Fanon Profile</font></a></li>'

        );
        $('#WikiaUserPagesHeader ul.tabs > li[data-id="wall"]').after(
                '<li data-id="fanontalk"><a href="http://fablefanon.wikia.com/wiki/User_talk:' + username + '" title="w:c:fablefanon:User talk:' + username + '"><font color=#1E90FF>Talk page</font></a></li>'

        );
}
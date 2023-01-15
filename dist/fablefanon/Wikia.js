// ============================================================
// User profile tabs
// ============================================================
// categoryTab on User Masthead originally by User:Penguin-Pal

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
        $('#WikiaUserPagesHeader ul.tabs > li[data-id="profile"]').before(
                '<li data-id="mainprofile"><a href="http://fable.wikia.com/wiki/User:' + username + '" title="w:c:fable:User:' + username + '"><font color=#A21F1F>Wiki Profile</font></a></li>'
        );
        $('#WikiaUserPagesHeader ul.tabs > li[data-id="talk"]').before(
                '<li data-id="mainprofile"><a href="http://fable.wikia.com/wiki/Message_Wall:' + username + '" title="w:c:fable:Message Wall:' + username + '"><font color=#A21F1F>Message Board</font></a></li>'
        );
        $('#WikiaUserPagesHeader ul.tabs > li[data-id="talk"]').after(
                '<li data-id="category"><a href="/wiki/Category:' + username + '" title="Category:' + username + '">Creations</a></li>'
        );
}
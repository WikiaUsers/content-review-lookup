/* Any JavaScript here will be loaded for all users on every page load. */
// Custom Forum Restriction for a Specific User
mw.loader.using('mediawiki.util').then(function () {

    var restrictedUser = "Ksenia Sandalov"; // ✅ Replace this with the real username exactly
    var user = mw.config.get("wgUserName");

    // Check if user matches AND page is Forum or Discussions
    var isForum =
        mw.config.get('wgCanonicalNamespace') === "Forum" ||
        window.location.href.includes("/f") ||     // Discussions-style URL
        window.location.href.includes("/forum");   // Forum-based URL

    if (user === restrictedUser && isForum) {
        alert("You are restricted from using the Forums. Please use article comments instead.");
        window.location.href = "wiki/SunSil_(platform)?commentId=4400000000000508559"; 
        // ✅ Change the redirect page to where you want them to go
    }
});
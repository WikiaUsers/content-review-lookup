/* Any JavaScript here will be loaded for all users on every page load. */
/*Open Game using URI, and launch a toast*/
$(function() {
    function openRobloxLink() {
        var link = "roblox://placeId=12018816388";
        window.open(link, "_self");

        mw.hook("dev.toasts").add(function(toasts) {
            var toastMessage = "Game Launched!";
            toasts.success(toastMessage);
        });
    }

    $('.play-dovedale').click(function() {
        openRobloxLink();
    });
});
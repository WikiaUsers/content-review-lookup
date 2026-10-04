/* Any JavaScript here will be loaded for all users on every page load. */
$(function() {
    if (mw.config.get("wgPageName") === "User:CosmoRoyalty") {
        $(".user-identity-header__title").text("Cosmo Royalty");
    }
});
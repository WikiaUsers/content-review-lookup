/* Any JavaScript here will be loaded for all users on every page load. */


/* ==========================================================================
   USER TAGS
   ========================================================================== */

if (window.UserTagsJS && UserTagsJS.modules) {
    UserTagsJS.modules.inactive = 15;
}


/* ==========================================================================
   EXISTING SPOILER ALERT CONFIG
   ========================================================================== */

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};


/* ==========================================================================
   MASS CATEGORIZATION
   ========================================================================== */

/*
   Wrapped in try/catch so an error here
   cannot kill the rest of Common.js.
*/

try {

    importArticles({
        type: 'script',
        articles: [
            'u:dev:MediaWiki:MassCategorization/code.js',
        ]
    });

} catch (e) {

    console.error('MassCategorization import failed:', e);

}


/* ==========================================================================
   BFF CONTAINER
   ========================================================================== */

// Ensure the script runs after the page content loads
document.addEventListener("DOMContentLoaded", function () {

    // Find the BFFs container by ID
    const bffsContainer = document.getElementById("bffs-container");

    // If the container exists, apply scroll behavior
    if (bffsContainer) {

        bffsContainer.style.display = "flex";
        bffsContainer.style.overflowX = "auto";
        bffsContainer.style.whiteSpace = "nowrap";
        bffsContainer.style.gap = "10px";

    }

});
/* Any JavaScript here will be loaded for all users on every page load. */

window.SpoilerAlertJS = {
    question: 'This area contains spoilers. Are you sure you want to read it?',
    yes: 'Yes',
    no: 'No',
    fadeDelay: 1600
};

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MassCategorization/code.js',
    ]
});

// Ensure the script runs after the page content loads
document.addEventListener("DOMContentLoaded", function () {
  // Find the BFFs container by ID (this will be set later in the template)
  const bffsContainer = document.getElementById("bffs-container");

  // If the container exists, apply scroll behavior
  if (bffsContainer) {
    bffsContainer.style.display = "flex";        // Flex layout for row display
    bffsContainer.style.overflowX = "auto";      // Horizontal scroll
    bffsContainer.style.whiteSpace = "nowrap";   // Prevent wrapping
    bffsContainer.style.gap = "10px";            // Optional: gap between BFFs
  }
});
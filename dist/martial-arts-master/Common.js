/* Any JavaScript here will be loaded for all users on every page load. */

// Enable modern button style
window.BackToTopModern = true;

// Change scroll speed (in milliseconds)
window.BackToTopSpeed = 800;

// Change scroll distance before button appears (in pixels)
window.BackToTopStart = 600;

// Change button text
window.BackToTopText = "Top";

// Disable fade effect
window.BackToTopFade = 0;

// Import the script
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:BackToTopButton/code.js',
    ]
});

InactiveUsers = {
    months: 3,                    // Change inactivity threshold
    gone: ['User1', 'User2'],     // Instantly tag these users as inactive
    text: 'inactive'              // Custom tag label
};
importScriptPage('InactiveUsers/code.js', 'dev');
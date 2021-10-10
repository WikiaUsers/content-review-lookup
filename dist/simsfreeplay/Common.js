/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxSpecialPages = ["SocialActivity"];

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:

window.dev.editSummaries = {
    css: '#stdSummaries { ... }',
    select: [
        '(click to browse)',
        '1. Content', [
            'Page created',
            'Updated with new information',
            'Expanded/Rewrote',
            'Revised',
            'Added sources/appearances',
            'Updated links',
            'Updated references',
            'Added/removed image(s)',
            'Modified image(s)',
            'Replaced duplicate image(s)'
         ],
        '2. Refactoring', [
            'Fixed typo',
            'Cleanup',
            'Corrected spelling/grammar',
            'Corrected tense',
            'Factual correction',
            'Formatting',
            'HTML tidying',
            'Corrected template usage',
            'Restored design from the previous edit'
         ],
        '3. Removal/Reversion', [
            'Reverted vandalism',
            'Reverted test edit',
            'Reverted vanity edit',
            'Removed fanon',
            'Removed libel/slander',
            'Removed copyvio'
         ],
        '4. Templates', [
            'Added template(s)',
            'Added infobox',
            'Updated infobox',
            'Added disambig template',
            'Added quote',
            'Modified quotes' 
         ],
        '5. Categories', [
            'Added category',
            'Modified category',
            'Alphabetized categories'
         ]
    ]
}; 

/*Clear Previous Element*/
var myClears = document.getElementsByClassName("clearprev");
for(var j=0;j<myClears.length;j++)
{
    myClears[j].previousElementSibling.style.clear = "both";
}

// prevents existing tags from being hidden
(window.dev = window.dev || {}).profileTags = { noHideTags: true };
/*
    mw.hook('discussionsModule.added').add(function($module) {
        // Module addition
        if ($('.insights-module').exists()) {
            $module.insertBefore('.insights-module');
        } else {
            $module.appendTo('#WikiaRail');
        }
    });*/

//BackToTop
window.BackToTopModern = true;
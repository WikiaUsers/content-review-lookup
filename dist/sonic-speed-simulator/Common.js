/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
     type: 'script',
     articles: [
        'MediaWiki:Common.js/FormulaCalculator.js'
    ]
});

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.addNoteAbove = true;
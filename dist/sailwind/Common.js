/* Any JavaScript here will be loaded for all users on every page load. */
window.SpoilerAlertJS = {
    question: 'Yar! This area contains spoilers. Are ye sure ye wish to read it?',
    yes: 'Aye',
    no: 'Nay',
    fadeDelay: 500
};

// Add category-based classes to body for CSS targeting
$(function() {
    var categories = mw.config.get('wgCategories');
    if (categories) {
        categories.forEach(function(cat) {
            var className = 'category-' + cat.replace(/ /g, '_').replace(/'/g, '_');
            $('body').addClass(className);
        });
    }
});
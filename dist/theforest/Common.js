/* Any JavaScript here will be loaded for all users on every page load. */
mw.hook('wikipage.content').add(function($content) {
    var articles = [];

    // Load these on every page
    articles.push('MediaWiki:InfoboxMapZoom.js');
    articles.push('MediaWiki:ImageComparison.js');
    
    // Conditionally load other scripts
    if ($content.find('#cookingCalc')[0]) articles.push('MediaWiki:CookingCalc.js');
    if ($content.find('#damageCalc')[0]) articles.push('MediaWiki:DamageCalc.js');
    if ($content.find('#StatCalc')[0]) articles.push('MediaWiki:StatCalc.js');

    // Load CraftingMat.js on the "Crafting" page and "Template:CraftingMat"
    if (mw.config.get('wgPageName') === 'Crafting' || mw.config.get('wgPageName') === 'Template:CraftingMat') {
        articles.push('MediaWiki:CraftingMat.js');
    }

    // Load MPIconDisplace.js on the "Main" page, "The Forest Wiki/Top section" and "Template:MPIconToolsAnimation"
    if (mw.config.get('wgPageName') === 'The_Forest_Wiki' || mw.config.get('wgPageName') === 'The_Forest_Wiki/Top_section' || mw.config.get('wgPageName') === 'Template:MPIconToolsAnimation') {
        articles.push('MediaWiki:MPIconDisplace.js');
    }

    // Import all specified articles
    if (articles.length) importArticles({type: "script", articles: articles});
});
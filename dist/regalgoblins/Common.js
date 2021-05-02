/* Any JavaScript here will be loaded for all users on every page load. */

// Background settings
	window.bg_color = '#203B34'; 
    window.bg_size = '100%'; 
    window.bg_attachment = 'fixed';
    window.bg_repeat = 'no-repeat';
// Image List
switch (true) {
    case /Rollplay/.test(mw.config.get('wgPageName')):
        // Backgrounds for page "Rollplay"
        window.bgrandom_list = ["https://vignette.wikia.nocookie.net/regalgoblins/images/4/42/Rollplay_Background.jpg"];
        break;
    case /Hardcore_Heroes/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Hardcore_Heroes"
        window.bgrandom_list = ["https://vignette.wikia.nocookie.net/regalgoblins/images/2/2a/Van%26Mal.jpg"];
        break;
    case /Akuban_Knights/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Akuban_Knights"
        window.bgrandom_list = ["https://vignette.wikia.nocookie.net/regalgoblins/images/b/b1/Sara%26Bud.jpg"];
        break;
    case /Frozen_Frontier/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Frozen_Frontier"
        window.bgrandom_list = ["https://vignette.wikia.nocookie.net/regalgoblins/images/a/a0/Background_FroFro.jpg"];
        break;
    case /Homeward_Bound/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Homeward_Bound"
        window.bgrandom_list = ["https://vignette.wikia.nocookie.net/regalgoblins/images/a/a0/Background_FroFro.jpg"];
        break;
    case /Desperate_ Measures/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Desperate_Measures"
        window.bgrandom_list = ["https://vignette.wikia.nocookie.net/regalgoblins/images/1/12/DM_Background.jpg"];
        break;
    default:
        //Backgrounds for all the other pages
        window.bgrandom_list = [
        "https://vignette.wikia.nocookie.net/regalgoblins/images/b/b1/Sara%26Bud.jpg",
        "https://vignette.wikia.nocookie.net/regalgoblins/images/2/2a/Van%26Mal.jpg",
        "https://vignette.wikia.nocookie.net/regalgoblins/images/4/42/Rollplay_Background.jpg",
        "https://vignette.wikia.nocookie.net/regalgoblins/images/1/12/DM_Background.jpg"];
        break;
}
// Import always after you declare your variables or in MediaWiki:ImportJS
importArticles({
    type: 'script',
    articles: [
        'u:dev:RandomBackground/code.js'
    ]
});
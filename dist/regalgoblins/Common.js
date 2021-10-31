/* Any JavaScript here will be loaded for all users on every page load. */

// Image List
switch (true) {
    case /Rollplay/.test(mw.config.get('wgPageName')):
        // Backgrounds for page "Rollplay"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/4/42/Rollplay_Background.jpg/revision/latest"];
        break;
    case /Hardcore_Heroes/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Hardcore_Heroes"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/2/2a/Van%26Mal.jpg/revision/latest"];
        break;
    case /Akuban_Knights/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Akuban_Knights"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/b/b1/Sara%26Bud.jpg/revision/latest"];
        break;
    case /Frozen_Frontier/.test(mw.config.get('wgPageName')):
    case /Homeward_Bound/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Frozen_Frontier" & "Homeward Bound"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/6/6b/FroFro_Background.jpg/revision/latest"];
        break;
    case /Desperate_Measures/.test(mw.config.get('wgPageName')):
        //Backgrounds for page "Desperate_Measures"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/1/12/DM_Background.jpg/revision/latest"];
        break;
    case /Dicing_with_Death/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Dicing_with_Death"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/5/59/Georg%26Divan.jpg/revision/latest"];
        break;
    case /Of_Dice_and_Men/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Of_Dice_and_Men"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/6/6e/Nevets%26Vicho.jpg/revision/latest"];
        break;
    case /Gnomes,_Tomes_%26_Catacombs/.test(mw.config.get('wgPageName')):
    	//Backgrounds for page "Gnomes,_Tomes_%26_Catacombs"
        window.bgrandom_list = ["https://static.wikia.nocookie.net/regalgoblins/images/d/dc/ChadBarbo%26GeraldKnott.jpg"];
        break;
    default:
        //Backgrounds for all the other pages
        window.bgrandom_list = [
        "https://static.wikia.nocookie.net/regalgoblins/images/b/b1/Sara%26Bud.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/2/2a/Van%26Mal.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/4/42/Rollplay_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/1/12/DM_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/5/59/Georg%26Divan.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/7/70/Scoria_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/6/6e/Nevets%26Vicho.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/6/6b/FroFro_Background.jpg/revision/latest",
        "https://static.wikia.nocookie.net/regalgoblins/images/d/dc/ChadBarbo%26GeraldKnott.jpg"];
        break;
}
// Import always after you declare your variables or in MediaWiki:ImportJS
importArticles({
    type: 'script',
    articles: [
        'u:dev:RandomBackground/code.js'
    ]
});

// Desktop Google calender embed - Styled per theme
if ($('body').hasClass('theme-fandomdesktop-dark')) $("#googleCal").html("<iframe src='https://k-miksic.com/cookie/arcadia-wiki-calendar-dark-theme.php'></iframe>");
else if ($('body').hasClass('theme-fandomdesktop-light')) $("#googleCal").html("<iframe src='https://k-miksic.com/cookie/arcadia-wiki-calendar-light-theme.php'></iframe>");
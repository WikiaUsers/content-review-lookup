/* Any JavaScript here will be loaded for all users on every page load. */

window.quizName = "Test your Shinkalion knowledge!";
window.quizLang = "en";
window.resultsTextArray = [ 
    "You won't make a great Shinkalion Driver, considering your poor knowledge!",
    "Some Shinkalion Drivers know less than you, but there are still others who know more than you!",
    "Congrats! Your knowledge is exactly what ERDA looks after!" 
];
window.questions = [
    ["Who of those characters existed for real in history?",
    "Carl Roman Abt",
    "Nagato Yamaguchi",
    "Midori Kurume"], 

    ["Who from S.U.E.I. staff of Season 1 doesn't appear in Season 2?",
    "Chikuma Kiyosu",
    "Akagi Honjo",
    "Akatsuki Ogura"],

    ["Who of those doesn't have siblings?",
    "Akita Oga",
    "Hayato Hayasugi",
    "Shin Arata"],

    ["Who of those isn't a staff member of ERDA?",
    "Asahi Folden",
    "Kadomichi Takanawa",
    "Chiguko Nabeshima"],

    ["Who of those currently doesn't study at Shinkai Academy?",
    "Ina Onari",
    "Ryota Kuzuryu",
    "Akane Folden"],

    ["Who of those ERDA staff members isn't from Tokyo?",
    "Hidaka Toma",
    "Agano Tsugawa",
    "Kadomichi Takanawa"],
];

window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 because you have committed the following offence(s): $1',
  autocheck : true
};

addOnloadHook(createCollapseButtons);

/** Magic editintros ****************************************************
 *
 *  Description: Adds editintros on disambiguation pages.
 */

function addEditIntro(name) {
    var el = document.getElementById('control_edit');
    if (!el)
        return;
    el = el.getElementsByTagName('a')[0];
    if (el)
        el.href += '&editintro=' + name;
}


if (wgNamespaceNumber == 0) {
    addOnloadHook(function() {
        if (document.getElementById('disambigbox'))
            addEditIntro('Template:Disambig_editintro');
    });
}

/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("https://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("https://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");

mw.loader.using(['jquery.ui.tabs'], function() {
    $(function() {
        var $tabs = $("#portal_slider").tabs({
            fx: {
                opacity: 'toggle',
                duration: 100
            }
        });
        $("[class^=portal_sliderlink]").click(function() { // bind click event to link
            $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
            return false;
        });
        $('#portal_next').click(function() {
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length')) - 1) ? 0 : $tabs.tabs('option', 'selected') + 1); // switch to next tab
            return false;
        });
        $('#portal_prev').click(function() { // bind click event to link
            $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length') - 1) : $tabs.tabs('option', 'selected') - 1); // switch to previous tab
            return false;
        });
    });
});

/******************************/
/* changes the redirect image */
/******************************/
function ChangeRedirectImage() {
    $('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/__cb20100902033555/dragonage/images/b/b5/Redirectltr.png');
}
addOnloadHook(ChangeRedirectImage);

//ArchiveTool configuration 

var ArchiveToolConfig = {
    archiveListTemplate: 'ArchCat',
    archivePageTemplate: 'ArchPage',
    archiveSubpage: 'Archive',
    userLang: true
};

/////////////////
// END OF CODE //
/////////////////
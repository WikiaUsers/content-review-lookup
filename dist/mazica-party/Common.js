/* Any JavaScript here will be loaded for all users on every page load. */

window.quizName = "Test your Mazica Party knowledge!";
window.quizLang = "en";
window.resultsTextArray = [ 
    "Mazica Academy won‘t accept you as a student, considering your poor knowledge!",
    "Given your knowledge you would at least make an average student at Mazica Academy!",
    "Congrats! You have such a vast knowledge, that you could easily become one of the top students at Mazica Academy!" 
];
window.questions = [
    ["Who is Kezuru‘s best friend?",
    "Cratch",
    "Kanna",
    "Eric"], 

    ["Who is Kezuru‘s main partner Mazin?",
    "Ballonya",
    "Fuclock",
    "Discou"],

    ["Who of those has siblings?",
    "Eric",
    "Cratch",
    "Kanna"]
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
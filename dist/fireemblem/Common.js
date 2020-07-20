/* Any JavaScript here will be loaded for all users on every page load. */

/* Default last tab in the infobox */
mw.hook('wikipage.content').add(function(elem) {
    var $nav = $(elem).find('#last-tab .tabbernav li');
    var $tab = $(elem).find('#last-tab .tabbertab');
 
    $nav.first().removeClass('tabberactive');
    $nav.last().addClass('tabberactive');
    $tab.first().css('display', 'none');
    $tab.last().css('display', 'block');
});

/* Template:Spoiler/Gallery */
var _alert = ".spoiler-alert";
$(_alert).next("div").hide();

$(_alert + " span").click(function() {
    $(this).attr('id') === "y" ?
        $(this).parents(_alert).next("div").fadeIn() :
        $(this).parents(_alert).next("div").hide();
    $(this).parents(_alert).hide();
});

/* Fix poll's radio behavior */
$('.pollAnswer').click(function(){
	$(this).find('input[type=radio]')[0].checked = true;
});

/* Add a custom button to the edit toolbar */
if (mwCustomEditButtons) {
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://vignette.wikia.nocookie.net/fireemblem/images/c/c8/Button_redirect.png/revision/latest?cb=20090312204241",
        "speedTip": "Redirect",
        "tagOpen": "",
        "tagClose": "",
        "sampleText": "#REDIRECT [[]]"
    };
}

/*****************************
 * DEV SCRIPT CUSTOMIZATIONS *
 *****************************/

window.ArchivePoll = {
    preformat: false,
    format:
    '== $question ==\
    \n{{Poll entry |Entry = $answer |$vote |$total}}\
    \n:The poll was created at $time $date and $total people voted.'
}
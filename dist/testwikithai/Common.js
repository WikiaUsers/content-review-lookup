/* Auto-refreshing recent changes */
window.ajaxPages = ["History"];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

/* Standard edit summaries */
window.dev = window.dev || {};
window.dev.editSummaries = {
	select: 'User:Thailog/EditSummaries'
};

if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/marvel_dc/images/2/29/Character_Button.png",
		"speedTip": "Character link shortcut",
		"tagOpen": "{{\subst:c|",
		"tagClose": "}}",
		"sampleText": "shortcut"};
}

/* Display of ranking on userprofile masthead */
$(document).ready(function() {
    setTimeout(function() {
        if ($(".ranking").exists())  {
            var name = $(".masthead-info hgroup h1").text();
            var rankObject = $(".ranking p a").text().split(" #");
            rankObject = rankObject[1].split("");
            var mastheadString10 = name + "-D-zero-";
            var mastheadString10Plus = name + "-D-";
            var numeralArray = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "nine" ];
            for ( i = 0; i <= rankObject.length - 1; i++ ) {
                if (rankObject.length - 1 === 0) {
                    mastheadString10 = mastheadString10 + numeralArray[rankObject];
                }
                else if ( rankObject.length - 1 > 0 && i != rankObject.length - 1) {
                    mastheadString10Plus = mastheadString10Plus + numeralArray[rankObject[i]] + "-";
                    mastheadString10 = mastheadString10Plus; 
                }
                else {
                    mastheadString10 = mastheadString10 + numeralArray[rankObject[i]];
                }
            }
            $(".masthead-info hgroup h1").html('<span class="mastheadPrefix">Recognized:</span> ' + mastheadString10);
        }
    }, 2000);
});

/* Turns last image collection tab into current */
 
$(document).ready(function() {
    $(".pi-theme-character ul.pi-image-collection-tabs > li.current").removeClass("current");
    $(".pi-theme-character ul.pi-image-collection-tabs > li:last-child").addClass("current");
    $(".pi-theme-character div.pi-image-collection > div.current").removeClass("current");
    $(".pi-theme-character div.pi-image-collection > div:last-child").addClass("current");
    currentYear = $(".pi-image-collection-tabs > li.current").html();
    if ( currentYear == 2016 ) {
        $("#2010name, #2018name").hide();
    }
    else if ( currentYear == 2018 && $("#2018name").exists()) {
        $("#2016name, #2010name").hide();
    }
    else if ( currentYear == 2018 )
        $("#2010name").hide();
    else {
        $("#2016name, #2018name").hide();
    }
});

/* Displaying different names in character infobox depending on year */
$(document).ready(function() {
    if ($(".pi-image-collection-tabs").exists()) {
        $(".pi-image-collection-tabs > li").click(function() {
            currentYearAfter = $(".pi-image-collection-tabs > .current").html();
            if (currentYearAfter == 2016 ) {
                $("#2010name, #2018name").hide();
                $("#2016name").show();
            }
            else if ( currentYearAfter == 2018 && $("#2018name").exists()) {
                $("#2010name, #2016name").hide();
                $("#2018name").show();
            }
            else if ( currentYearAfter == 2018 ) {
                $("#2010name").hide();
                $("#2016name").show();
            }
            else {
                $("#2018name, #2016name").hide();
                $("#2010name").show();
            } 
        });
    }
});
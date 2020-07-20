/* Any JavaScript here will be loaded for all users on every page load. */
 
importArticles({
    type: "script",
    articles: [
        "u:halo:MediaWiki:Wikia.js/Slider.js"
    ]
});

//wsl.loadCSS.call(wsl, "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css");
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
 
mw.loader.using( ['jquery.ui.tabs'], function() {
$(document).ready(function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
    return false;
  });
  $('#portal_prev').click(function() { // bind click event to link
    $tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
    return false;
  });
});
} );

/***User Tags***/
importArticle({type:'script', article:'w:c:dev:UserTags/code.js'});

window.UserTagsJS = {
        modules: {},
        tags: {
                // group: { associated tag data }
                Crat: 'Senior RPer',
                ElderHN: 'Elder Admin of Halo Nation',
                ONI: 'ONI Officer',
                SIV: 'SPARTAN-IV',
                Ind: 'Indian',
                BA: 'Bravo Alumna',
                LotS: 'Kig-yar buccaneers and occasional hired guns',
                NA: 'N/A',
                NO: 'Normal',
                Sng:  'Sangheili',
                INC:  'Inactive',
                Rcl:  'Reclaimer',
                Mam:  'Madman',
                SC: 'Scout Trooper',
                Fett: 'Bounty Hunter',
                Lots: 'Test',
        }
};
//Custom
UserTagsJS.modules.custom = {
	'Haloprov': ['ElderHN'],
	'Dab1001': ['Crat', 'Lots'],
	'Agent Locke': ['Crat', 'ONI', 'BA', 'SIV'],
        'Vessel Of War': ['Crat'],
        'Sean4333': ['Crat', 'NO'],
        'Lord of the STARS': ['LotS'],
        'ReDquinox': ['SC', 'Mam'],
        'Thel Vadam4321': ['Sng'],
        'Coolbuddy379': ['Ind', 'Rcl', 'Fett'],
        'Commando Trooper': ['Crat'],
};
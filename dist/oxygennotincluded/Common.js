/* Any JavaScript here will be loaded for all users on every page load using a Desktop Theme (Hydradark or Fandomdesktop). */


//
// This function will just add the listeners & update displays in the navigation
//
function initNavboxSectionToggler() {
	// add a click listener to all of the category action buttons
	$('.navbox-section-action.navbox-section-category').click(function() {
        if ($(this).hasClass('navbox-section-selected')) {
            // remove the "selected" class from every category button
            $('.navbox-section-category').removeClass('navbox-section-selected');
        } else {
            // remove the "selected" class from every category button
            $('.navbox-section-category').removeClass('navbox-section-selected');
            // and then apply it to this one
            $(this).addClass('navbox-section-selected');
        }

		// cool, now that the state is updated, go refresh the information display!
		readAndUpdate();
	});
	
	// add a click listener to all the dlc action buttons
	$('.navbox-section-action.navbox-section-dlc').click(function() {
		// DLC just toggles each one independently on-and-off
		// so we don't have to worry about any of the other ones
		// just use the jquery toggleClass function to toggle the value of
		// the navbox-section-selected class here
		$(this).toggleClass('navbox-section-selected');
		
		// cool, now that the state is updated, go refresh the information display!
		readAndUpdate();
	});
}

function readAndUpdate() {
	// just make a constant value of where we will shove the results when we are done
	var $outputContainer = $('#navbox-cargo-results');
	
	//
	// Step 1: read in the current state based on the classes in the navigation
	//
	
	// first just set some constants so stuff is in scope
	var curCategory = null;
	var curDlcs = [];
	
	// iterate through a loop of 1 thing and grab the name of the category through the
	// "data-category" attribute that we set in the template for the `li` item
	$('.navbox-section-category.navbox-section-selected').each(function() {
		curCategory = $(this).attr('data-category');
	});
	
	// iterate through all of the DLCs and append them to the curDlcs list
	$('.navbox-section-dlc.navbox-section-selected').each(function() {
		curDlcs.push($(this).attr('data-dlc'));
	});
	
	//
	// Step 2: parse the current state into wikitext to feed to the MediaWiki parse action
	//
	
	// this is just a bit of javascript "magic" that I condensed into a single line
	// map the array through a formatting function, and
	// join it into a string separated by "" (the empty string)
	// so [ "SO", "SO2" ] -> "|SO=Yes|SO2=Yes", [ "SO" ] -> "|SO=Yes", [] -> ""
	var dlcStr = curDlcs.map(function(dlc) { return '|' + dlc + '=Yes' }).join('');
	
	// concat all of the parts of the string
	var toParse = '{{NavboxSection|category=' + curCategory + dlcStr + '}}';
	console.log(toParse);
	
	//
	// Step 3: Do the AJAX to get the MediaWiki API result & put the result into the
	// area that we want it in
	//
	
	return new mw.Api().get({
		action: 'parse',
		text: toParse,
		prop: 'text',
		title: mw.config.get('wgPageName')
	}).then(function(data) {
		// use jquery to set the html of $outputContainer to our result
		$outputContainer.html(data.parse.text['*']);
		
		// this hook sometimes does useful things & it's a good idea to fire it
		// after doing a parse action & inserting data into a container
		mw.hook('wikipage.content').fire($outputContainer);
	});
	
}

/* Implement */
$(function ()
{
    // Tabber for the Buildings Footer, switch between categories and toogling DLC content 
    initNavboxSectionToggler();
});




/*
    Simple but flexible javascript tabs
    v0.3
    Author: Abdullah A. Abduldayem
    Contact: https://zelda.gamepedia.com/User:Abdullah5599
    See https://zelda.gamepedia.com/MediaWiki_talk:Tabs.js for examples and documentation
*/

$(document).ready(function(){
    // When a tab is clicked
    $(".tab").not(".disabled").click(function () {
        var $siblings= $(this).parent().children();
        var $alltabs = $(this).closest(".tabcontainer");
        var $content = $alltabs.parent().children(".tabcontents");

        // switch all tabs off
        $siblings.removeClass("active");

        // switch this tab on
        $(this).addClass("active");

        // hide all content
        $content.children(".content").css("display","none");

        // show content corresponding to the tab
        var index = $(this).data("index");
        $content.children("[data-index="+index+"]").css("display","block");
    });    
});

/**
Oxygen Not Included Overlay Tabs
This should cause any tabs with the class "OniOverlayTab" to be toggle-able, switching back to the Default tab when clicked again.
**/

(function ($) {
    $(".OniOverlayTab").data("active", false);
    $(".OniOverlayTabDefault").data("active", true);
    $(".OniOverlayTab").not(".disabled").click(function(){
        if($(this).data("active")) {
            if(!$(this).hasClass("OniOverlayTabDefault")) {
                $(this).siblings(".OniOverlayTabDefault").delay(100).click();
            }
        } else {
            $(this).siblings().data("active", false);
            $(this).data("active", true);
        }
    });
})(this.jQuery);
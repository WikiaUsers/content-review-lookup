/**
 * Dynamic Navigation Bars (experimental)
 *
 * Description: See [[Wikipedia:NavFrame]].
 * Maintainers: UNMAINTAINED
 */
 
/* set up the words in your language */
var NavigationBarHide = '[' + collapseCaption + ']';
var NavigationBarShow = '[' + expandCaption + ']';
 
/**
 * Shows and hides content and picture (if available) of navigation bars
 * Parameters:
 *     indexNavigationBar: the index of navigation bar to be toggled
 **/
window.toggleNavigationBar = function ( indexNavigationBar, event ) {
    var NavToggle = document.getElementById( 'NavToggle' + indexNavigationBar );
    var NavFrame = document.getElementById( 'NavFrame' + indexNavigationBar );
    var NavChild;
 
    if ( !NavFrame || !NavToggle ) {
        return false;
    }
 
    /* if shown now */
    if ( NavToggle.firstChild.data === NavigationBarHide ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'none';
            }
        }
    NavToggle.firstChild.data = NavigationBarShow;
 
    /* if hidden now */
    } else if ( NavToggle.firstChild.data === NavigationBarShow ) {
        for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
            if ( $( NavChild ).hasClass( 'NavContent' ) || $( NavChild ).hasClass( 'NavPic' ) ) {
                NavChild.style.display = 'block';
            }
        }
        NavToggle.firstChild.data = NavigationBarHide;
    }
 
    event.preventDefault();
};
 
/* adds show/hide-button to navigation bars */
function createNavigationBarToggleButton() {
    var indexNavigationBar = 0;
    var NavFrame;
    var NavChild;
    /* iterate over all < div >-elements */
    var divs = document.getElementsByTagName( 'div' );
    for ( var i = 0; (NavFrame = divs[i]); i++ ) {
        /* if found a navigation bar */
        if ( $( NavFrame ).hasClass( 'NavFrame' ) ) {
 
            indexNavigationBar++;
            var NavToggle = document.createElement( 'a' );
            NavToggle.className = 'NavToggle';
            NavToggle.setAttribute( 'id', 'NavToggle' + indexNavigationBar );
            NavToggle.setAttribute( 'href', '#' );
            $( NavToggle ).on( 'click', $.proxy( window.toggleNavigationBar, window, indexNavigationBar ) );
 
            var isCollapsed = $( NavFrame ).hasClass( 'collapsed' );
            /**
             * Check if any children are already hidden.  This loop is here for backwards compatibility:
             * the old way of making NavFrames start out collapsed was to manually add style="display:none"
             * to all the NavPic/NavContent elements.  Since this was bad for accessibility (no way to make
             * the content visible without JavaScript support), the new recommended way is to add the class
             * "collapsed" to the NavFrame itself, just like with collapsible tables.
             */
            for ( NavChild = NavFrame.firstChild; NavChild != null && !isCollapsed; NavChild = NavChild.nextSibling ) {
                if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                    if ( NavChild.style.display === 'none' ) {
                        isCollapsed = true;
                    }
                }
            }
            if ( isCollapsed ) {
                for ( NavChild = NavFrame.firstChild; NavChild != null; NavChild = NavChild.nextSibling ) {
                    if ( $( NavChild ).hasClass( 'NavPic' ) || $( NavChild ).hasClass( 'NavContent' ) ) {
                        NavChild.style.display = 'none';
                    }
                }
            }
            var NavToggleText = document.createTextNode( isCollapsed ? NavigationBarShow : NavigationBarHide );
            NavToggle.appendChild( NavToggleText );
 
            /* Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) */
            for( var j = 0; j < NavFrame.childNodes.length; j++ ) {
                if ( $( NavFrame.childNodes[j] ).hasClass( 'NavHead' ) ) {
                    NavToggle.style.color = NavFrame.childNodes[j].style.color;
                    NavFrame.childNodes[j].appendChild( NavToggle );
                }
            }
            NavFrame.setAttribute( 'id', 'NavFrame' + indexNavigationBar );
        }
    }
}
 
mw.hook( 'wikipage.content' ).add( createNavigationBarToggleButton  

// 2.- Edit Menu
 // From http://www.sourcewatch.org/index.php?title=MediaWiki:Monobook.js#Edit_summary_stuff
 // Modify by [[User:Cizagna]]
 
 // The original value of the edit summary field is stored here
 var editsummOriginalSummary = new String();
 
 // A global ref to the dropdown with canned edit summaries
 var editsummDropdown = null;
 
 function editsummInitialize() {
    var label = document.getElementById('wpSummaryLabel');
    if(label == null) return;
    label.firstChild.style.cssText = 'display:none';
    
    // Save the original value of the edit summary field
    editsummOriginalSummary = document.forms.editform.wpSummary.value;
    
    // For convenience, add a dropdown box with some canned edit
    // summaries to the form.
    
    var dropdown = document.createElement('select');
    dropdown.setAttribute('title', 'Standard Summaries')
    dropdown.style.cssText = 'margin-top:3px;';
    dropdown.onchange = new Function('editsummOnCannedSummarySelected()');
    
    addDropdownOption(dropdown,'','(Summary)');
    addDropdownOption(dropdown,'','Refactoring:');
    addDropdownOption(dropdown,'Cleanup','— Cleanup');
    addDropdownOption(dropdown,'Formating','— Formatting');
    addDropdownOption(dropdown,'HTML tidying','— HTML tidying');
    addDropdownOption(dropdown,'Wikification','— Wikification');
    addDropdownOption(dropdown,'','Content:');
    addDropdownOption(dropdown,'Page created','— Page created');
    addDropdownOption(dropdown,'Update with new info.','— Update with new info.');
    addDropdownOption(dropdown,'Expansion','— Expansion');
    addDropdownOption(dropdown,'Rewrite','— Rewrite');
    addDropdownOption(dropdown,'Fix spelling/grammar','— Corrected spelling/grammar');
    addDropdownOption(dropdown,'','Remove/Revert:');
    addDropdownOption(dropdown,'Revert Vandalism','— Revert Vandalism');
    addDropdownOption(dropdown,'-unverified info','— Remove unverified info');
    addDropdownOption(dropdown,'','Templates:');
    addDropdownOption(dropdown,'+Infobox','— Added Infobox');
    addDropdownOption(dropdown,'Corrected template usage','— Corrected template usage');
    addDropdownOption(dropdown,'','Categories:');
    addDropdownOption(dropdown,'+Cat','— Added Category');
    addDropdownOption(dropdown,'-Cat','— Remove Category');
    addDropdownOption(dropdown,'Alphabetized ""','— Alphabetized ');
    /*addDropdownOption(dropdown,'','');
    addDropdownOption(dropdown,'','');*/
    
    label.appendChild(dropdown);
    
    // Store a global ref to it
    editsummDropdown = dropdown;
    
    var onMonaco = skin == 'monaco' ? true : false;
    if(onMonaco) {
        // even thougth this can be configure by MediaWiki pages its better this way so it only affects monaco pages
        document.getElementById('wpMinoredit').nextSibling.nextSibling.innerHTML = 'Minor';
        document.getElementById('wpWatchthis').nextSibling.nextSibling.innerHTML = 'Watch';
    }else {
        var wpSumamaryCssSize  = document.getElementById('wpSummary');
        wpSumamaryCssSize.style.cssText = 'width:70%'; //FF
        wpSumamaryCssSize.size = '60'; //IE
    }
 }
 // Adds options to the drop down menu on "editsummInitialize()"
 function addDropdownOption(dropdown,optionValue,optionText) {
    var option = document.createElement('option');
    option.setAttribute('value', optionValue)
    option.appendChild(document.createTextNode(optionText));
    dropdown.appendChild(option);
 }
 // There's a cross-browser issue when accessing the selected text:
 // *In Firefox you can use: selectObj.value
 // *In IE, you have to use: selectObj.options[selectObj.selectedIndex].text
 // *The latter method also works in Firefox
 function editsummOnCannedSummarySelected() {
    var newSummary = editsummOriginalSummary;
    if(newSummary.length!=0) newSummary += " - ";
    
    var idx = editsummDropdown.selectedIndex;
    var canned = editsummDropdown.options[idx].value;
    newSummary += canned;
    document.forms.editform.wpSummary.value = newSummary;
 }
  addOnloadHook(editsummInitialize);


var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark"
};
importScriptPage('SocialIcons/code.js','dev');
/** Username replace function ([[Template:USERNAME]]) *******************************
  * Inserts user name into <span class="insertusername"></span>
  * Originally by User:Splarka
  * New version by User:Spang
  * Fixed with JS provided by User:Grunny, thanks!
  */
 
 function UserNameReplace() {
    if(typeof(disableUsernameReplace) != 'undefined' && disableUsernameReplace || wgUserName == null) return;
    $('.insertusername').html(wgUserName); }
 addOnloadHook(UserNameReplace);

//Attempt at loading top icons
function showRating()
{
    var titleDiv = document.getElementById("title-rating");
    if (titleDiv != null && titleDiv != undefined)
    {
       var content = document.getElementById('article');
       if (!content) 
       {
         var content = document.getElementById('content');
       }

       if (content) 
       {
          var hs = content.getElementsByTagName('h1');
          var firstHeading;
          for (var i = 0; i < hs.length; i++){
            if ( (' '+hs[i].className+' ').indexOf(' firstHeading ') != -1){
              firstHeading=hs[i];
              break;
            }
          }
   
          var cloneNode = titleDiv.cloneNode(true);
          firstHeading.insertBefore(cloneNode, firstHeading.childNodes[0]);
          cloneNode.style.display = "block";
          cloneNode.style.visibility = "visible";
          if (skin != "monaco")
          {
            cloneNode.style.marginTop = "-11px";
          }
       }
    }
}

addOnloadHook( showRating );

$(function() {
	var nick = (wgUserName == null) ? ('BP-Visitor-' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_'); 
	$('#IRCReplace').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=brickipedia&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="650" height="400" style="border:0;"></iframe>');
});

// Edit Menu
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
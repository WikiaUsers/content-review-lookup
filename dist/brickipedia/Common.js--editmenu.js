/* The original value of the edit summary field is stored here */
var editsummOriginalSummary = new String();
 
/* A global ref to the dropdown with canned edit summaries */
var editsummDropdown = null;
 
function editsummInitialize() {
   var label = document.getElementById('wpSummaryLabel');
   if(label == null) return;
   label.firstChild.style.cssText = 'display:none';
 
    /* Save the original value of the edit summary field */
   editsummOriginalSummary = document.forms.editform.wpSummary.value;
 
    /* For convenience, add a dropdown box with some canned edit
       summaries to the form. */
 
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
/* addDropdownOption(dropdown,'','');
   addDropdownOption(dropdown,'',''); */
 
   label.appendChild(dropdown);
 
    /* Store a global ref to it */
   editsummDropdown = dropdown;
 
   var onMonaco = skin == 'monaco' ? true : false;
   if(onMonaco) {
       /* even thougth this can be configure by MediaWiki pages its better this way so it only affects monaco pages */
       document.getElementById('wpMinoredit').nextSibling.nextSibling.innerHTML = 'Minor';
       document.getElementById('wpWatchthis').nextSibling.nextSibling.innerHTML = 'Watch';
   }else {
       var wpSumamaryCssSize  = document.getElementById('wpSummary');
       wpSumamaryCssSize.style.cssText = 'width:70%'; //FF
       wpSumamaryCssSize.size = '60'; //IE
   }
}
 /* Adds options to the drop down menu on "editsummInitialize()" */
function addDropdownOption(dropdown,optionValue,optionText) {
   var option = document.createElement('option');
   option.setAttribute('value', optionValue)
   option.appendChild(document.createTextNode(optionText));
   dropdown.appendChild(option);
}
 /* There's a cross-browser issue when accessing the selected text:
  *In Firefox you can use: selectObj.value
  *In IE, you have to use: selectObj.options[selectObj.selectedIndex].text
  *The latter method also works in Firefox */
function editsummOnCannedSummarySelected() {
   var newSummary = editsummOriginalSummary;
   if(newSummary.length!=0) newSummary += " - ";
 
   var idx = editsummDropdown.selectedIndex;
   var canned = editsummDropdown.options[idx].value;
   newSummary += canned;
   document.forms.editform.wpSummary.value = newSummary;
}
 addOnloadHook(editsummInitialize);
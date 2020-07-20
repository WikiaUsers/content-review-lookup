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
//test
$('ul.tools li:first-child').after('<li><a href="http://lego.answers.wikia.com/">Ask a question about LEGO!</a></li>');

//Hiding spotlights from unregistered, thanks to User:VegaDark
addOnloadHook(function () {
  if (wgUserName) {
    footer = document.getElementById("WikiaFooter section");
 if (footer) {
      document.getElementById("WikiaFooter section").style.display ="inline";
    }
   };
});
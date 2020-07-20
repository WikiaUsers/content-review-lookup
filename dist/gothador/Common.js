/* Any JavaScript here will be loaded for all users on every page load. */

/***************
### Quest Section Collapsing ###

This code is for use in Template:QuestSection. This code makes it so that if you click the questButton, it will show the next questSection.
****************/
var questSections = document.querySelectorAll(".questSection");
for(var i = 0; i < questSections.length; i++)
{
    questSections[i].id = "qs"+i;
    closeSection( questSections[i] );
}
 
var questButtons = document.querySelectorAll(".questButton");
for(var i = 0; i < questButtons.length; i++)
{
    questButtons [i].id = "qb"+i;
    questButtons[i].addEventListener("click", function(e){
        expandSection( document.querySelector("#qs"+e.target.id.slice(-1)) );
    });
}
 
var expandAllButton = document.querySelector("#expandquests");
expandAllButton.innerHTML = "Expand All";
expandAllButton.className = "gothadorbutton";
expandAllButton.addEventListener("click", function(e){
    var questSections = document.querySelectorAll(".questSection");
    for(var i = 0; i < questSections.length; i++)
    {
        expandSection( questSections[i] );
    }
    expandAllButton.style.display="none";
});
 
function expandSection(section) { section.style.maxHeight="2000px"; }
function closeSection (section) { section.style.maxHeight="0"; }
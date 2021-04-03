/* Any JavaScript here will be loaded for all users on every page load. */

window.ajaxSpecialPages = ["SocialActivity"];

// Create the "dev" namespace if it doesn't exist already:
 
window.dev = window.dev || {};
 
// Create the sub-namespace for this addon and set some options:

window.dev.editSummaries = {
    css: '#stdSummaries { ... }',
    select: [
        '(click to browse)',
        '1. Content', [
            'Page created',
            'Updated with new information',
            'Expanded/Rewrote',
            'Revised',
            'Added sources/appearances',
            'Updated links',
            'Updated references',
            'Added/removed image(s)',
            'Modified image(s)',
            'Replaced duplicate image(s)'
         ],
        '2. Refactoring', [
            'Fixed typo',
            'Cleanup',
            'Corrected spelling/grammar',
            'Corrected tense',
            'Factual correction',
            'Formatting',
            'HTML tidying',
            'Corrected template usage',
            'Restored design from the previous edit'
         ],
        '3. Removal/Reversion', [
            'Reverted vandalism',
            'Reverted test edit',
            'Reverted vanity edit',
            'Removed fanon',
            'Removed libel/slander',
            'Removed copyvio'
         ],
        '4. Templates', [
            'Added template(s)',
            'Added infobox',
            'Updated infobox',
            'Added disambig template',
            'Added quote',
            'Modified quotes' 
         ],
        '5. Categories', [
            'Added category',
            'Modified category',
            'Alphabetized categories'
         ]
    ]
}; 

/*spoiler hiding*/
var myMainSpoilers = document.getElementsByClassName("mainSpoiler");
if (myMainSpoilers.length > 0)
{
    var mySpoilers = document.getElementsByClassName("spoiler");
    for(var j=0;j<mySpoilers.length;j++)
    {
        var mySpoiler = mySpoilers[j];
        mySpoiler.classList.toggle("hidden2"); 
        var newDiv = document.createElement("div");
        newDiv.classList.add("reSpoiler");
        var text = document.createTextNode("A spoiler is hidden here. Click the spoiler banner to show all spoilers on this page.");
        newDiv.appendChild(text);
        mySpoiler.parentNode.insertBefore(newDiv,mySpoiler);
    }
}
for(var j=0;j<myMainSpoilers.length;j++)
{
    var myMainSpoiler = myMainSpoilers[j];
    myMainSpoiler.onclick = toggleSpoilers
}
 
function toggleSpoilers () {
    var mySpoilers = document.getElementsByClassName("spoiler");
    for(var i=0;i<mySpoilers.length;i++)
    {
    	var mySpoiler = mySpoilers[i];
        mySpoiler.classList.toggle("hidden2");  
    }
    var myReSpoilers = document.getElementsByClassName("reSpoiler");
    for(var j=0;j<myReSpoilers.length;j++)
    {
    	var myReSpoiler = myReSpoilers[j];
        myReSpoiler.classList.toggle("hidden2");  
    }
}

/*Quests checking*/
var myQuests = document.getElementsByClassName("Quest");
for(var j=0;j<myQuests.length;j++)
{
    myQuests[j].addEventListener("click", function(){this.children[1].classList.toggle("hidden2");this.lastElementChild.classList.toggle("hidden2");});
 
}

/*Clear Previous Element*/
var myClears = document.getElementsByClassName("clearprev");
for(var j=0;j<myClears.length;j++)
{
    myClears[j].previousElementSibling.style.clear = "both";
}
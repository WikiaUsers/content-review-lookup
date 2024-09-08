/* Any JavaScript here will be loaded for all users on every page load. */

/* Possibly blocks users from entering our wiki */

// To change the number of edits required to enter the chat, change the numbers below.  
// Be sure to leave the semi-colon intact.
// To disable the restriction, change both of these to 0. 
 
var mainCountRestriction = 25000;
var totalCountRestriction = 100000;
 
 
// Disable message (1 = enabled, 0 = disabled)
enableMessage = 1;
 
// Message that appears. Links cannot be used in this message.
var undereditMessage = "Hi "+ wgUserName+"! This is not a glitch. This is a new rule on this wiki. This is to avoid those people who do not have edits. It's very annoying. You must have at least 25 mainspace edits to the total of 60 edits. We(the people of this wiki, lawl) have decided to put up this rule. So yeah. Be a good contributor first! -Guppie the Third ";
 
 
// Enable redirect (1 = enabled, 0 = disabled)
var enableRedirect = 0;
 
// Page to redirect to 
var redirectPage = "Plants vs. Zombies Wiki:Rules#Chat";
 
 
// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];
 
var exceptionList = ["Guppie the Third", "Emeraldgreeny", "Punjipoyjeenponja"];
 
 
 
if (exceptionList.indexOf(wgUserName) == -1){
if (typeof alertPopped === "undefined"){
$.get("/wiki/Special:Editcount/"+wgUserName, function(result){
 
regExpNumberIsolation = /\d/g ;
regExpSearch = /\(Main\)/ ;
mainPos = result.search(regExpSearch);
if (mainPos != -1){
slicedMainText = result.slice(mainPos+36, mainPos+41);
 
var numberedMainText = slicedMainText.match(regExpNumberIsolation).toString();
if (numberedMainText.search(",") != -1){
while (numberedMainText.indexOf(",") > -1){
var numberedMainText = numberedMainText.replace(",","");
}
}
}else{numberedMainText = 0;}
 
totalPos = result.search("All wikis");
if (totalPos != -1){
slicedTotalText = result.slice(totalPos+52, totalPos+57);
 
var numberedTotalText = slicedTotalText.match(regExpNumberIsolation).toString();
if (numberedTotalText.search(",") != -1){
while (numberedTotalText.indexOf(",") != -1){
var numberedTotalText = numberedTotalText.replace(",","");
}
}
}else{numberedTotalText = 0;}
 
if (typeof alertPopped === "undefined" && (numberedTotalText < totalCountRestriction || numberedMainText < mainCountRestriction)){
alertPopped = 1;
 
if (wgPageName == "Home" && wgUserName != null){
if (enableMessage == 1){alert(undereditMessage);}
window.close();
if (window.closed == false){
if (enableRedirect == 1){window.location.replace("/wiki/"+redirectPage);}else{window.location.replace(wgServer);}
}
}else if (wgUserName != null){
$(document).ready(function() {
$('[data-canonical="chat"]').click(function (){
if (enableMessage == 1){alert(undereditMessage);}
if (enableRedirect == 1){window.location.replace("/wiki/"+redirectPage);}
}).removeAttr("data-canonical").css("cursor", "pointer");
$('[href="/wiki/Special:Chat"]').removeAttr("href");
setTimeout('$(".chat-join a").removeAttr("onclick").click(function() {if (enableMessage == 1){alert(undereditMessage);} if (enableRedirect == 1){window.location.replace("/wiki/"+redirectPage);}}); $(".chat-join button").removeAttr("onclick").click(function() {if (enableMessage == 1){alert(undereditMessage);} if (enableRedirect == 1){window.location.replace("/wiki/"+redirectPage);}});', 500);
});
}
}
 
});
}
}
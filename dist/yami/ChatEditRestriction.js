// ********************************************
// Implement edit restriction on chat feature
// Written by FoodbanIt, edited by Ricky Spanish, credited to Xiaolinpedia
// ********************************************
 
// To change the number of edits required to enter the chat, change the numbers below.  
// Be sure to leave the semi-colon intact.
// To disable the restriction, change both of these to 0. 
 
var mainCountRestriction = 0;
var totalCountRestriction = 5;
 
 
// Disable message (1 = enabled, 0 = disabled)
enableMessage = 1;
 
// Message that appears. Links cannot be used in this message.
var undereditMessage = "Hi "+ wgUserName+"! Thanks for trying to enter Chat. However, Yami Wiki is a database and as such encourages all contributors to edit, and you haven't yet made the minimum number of edits required to use it. Our chat policy (which can be found at http://yami.wikia.com/wiki/Project:Policy#Chat_Rules) requires that you make at least 5 edits, with at least 1 of these being in our mainspace. We apologize for this inconvenience and hope to see you soon in the wiki's chat soon.";
 
 
// Enable redirect (1 = enabled, 0 = disabled)
var enableRedirect = 1;
 
// Page to redirect to 
var redirectPage = "Project:Policy#Chat_Rules";
 
 
// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];
 
var exceptionList = ["Legendary Super Saiya-Jin 4", "CookiePirate", "Gohan ibbe", "Goku777", "Gotenfan1195", "Maroyasha", "Miricle1778", "Holy Chiz", "BlazeFireXXX"];
 
 
 
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
 
if (wgPageName == "Special:Chat" && wgUserName != null){
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
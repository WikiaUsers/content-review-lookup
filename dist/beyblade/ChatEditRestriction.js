// To change the number of edits required to enter the chat, change the numbers below.  
// Be sure to leave the semi-colon intact.
// To disable the restriction, change both of these to 0. 

var mainCountRestriction = 5;
var totalCountRestriction = 10;


// Disable message (1 = enabled, 0 = disabled)
enableMessage = 1;

// Message that appears. Links cannot be used in this message.
var undereditMessage = "Hi "+ wgUserName+"! Thank you for attempting to join the Beyblade Wiki Chat! While we welcome all users to our Wiki, we do ask that you edit as well. Please attempt to rejoin when you have reached 5 (Decent) Mainspace Edits. If you think you might be an exception, please leave a message on an administrator's Message Wall. Thank you, and we hope to chat with you soon!";


// Enable redirect (1 = enabled, 0 = disabled)
var enableRedirect = 1;

// Page to redirect to 
var redirectPage = "Special:WikiActivity";


// A list of exceptions to this edit restriction.  
// Enclose separate usernames inside of quotations, and separate them with commas.
// i.e. ["username1", "username2"];

var exceptionList = ["SpanishBot", "Bworld360", "ManaBot", "XX ...A...s...u...k...a... Xx"];



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
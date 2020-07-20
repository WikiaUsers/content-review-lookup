/*
function include(s) {
  document.write("<script type=\"text/javascript\" src=\"http://ja.wikia.com/index.php?title=" + encodeURI(s) + "&action=raw&ctype=text/javascript&dontcountme=s\"></script>");
}

include("User:Tommy6/js/hatenawithcounter.js");
include("User:Tommy6/js/livedoorclipwithcounter.js");
include("User:Tommy6/js/yahoobookmarkwithcounter.js");
include("User:Tommy6/js/buzzurlwithcounter.js");
*/

/* randomReferralCodes Script  */
const referralCodes = ["STAR-VMLZ-SKXK","STAR-HW3P-FXB3","STAR-R6SX-YTZP","STAR-K9LW-YDG4"];
const randomIndex = Math.floor(Math.random()*3);
randomReferralCode.innerHTML = referralCodes[randomIndex];
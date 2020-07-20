/* 此处的JavaScript将加载于所有用户每一个页面。 */
// TwitchFeed
importScriptPage('TwitchStuff/FeedListGenerator.js', 'dev');

//Daily Challenge Countdown
 
function startTime() {
    // Get system's time and reverse it to make it a countdown instead of clock
    var today=new Date();
    var h=today.getUTCHours();
    var m=today.getUTCMinutes();
    var sec=today.getUTCSeconds();
    var s1=(sec!=00)?60-sec:sec;
    var m1=(m!=00)?60-m:m;
    var h1=(24 - (h+1));
 
    // Call function to add a zero in front of numbers<10
    // Concat result together
    h1=checkTime(h1);
    m1=checkTime(m1);
    s1=checkTime(s1);
    result = h1 + ":" + m1 + ":" + s1;
 
    // Edit innerHTML
    document.getElementById("countdown").innerHTML = "<span>Next Daily<br>&nbsp;&nbsp;&nbsp;Run in:</span><em>" + result + "</em>";
t=setTimeout('startTime()',500);
}
 
// Function that adds a 0 in front of numbers if less than 10
function checkTime(i) {
    if (i<10) {
        i="0" + i;
    }
    return i;
}
 
// Start up timer after window has loaded
// Doesn't work on outdated browsers
if(window.addEventListener){
    window.addEventListener('load',createClock,false); //W3C
}
else{
    window.attachEvent('onload',createClock); //IE
}
 
 
// Check if WikiaPageHeader exist for that page
// Pages such as user: doesn't contain it
function createClock() {
    var wph = document.getElementById('WikiaPageHeader');
    if ( wph != null ) {
 
        //Create Div, set style, and append to code. 
        var countdownDisplay = document.createElement("div");
        countdownDisplay.id = "countdown";
        countdownDisplay.className = "tally";
        countdownDisplay.style.right = "125px"; 
        countdownDisplay.style.top = "45px";
 
        document.getElementById('WikiaPageHeader').appendChild(countdownDisplay);
 
        startTime();
    }
}
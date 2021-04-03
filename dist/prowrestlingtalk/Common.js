/* Any JavaScript here will be loaded for all users on every page load. */

//SocialMediaButtons
 
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');
 
//Digital Clock
 
window.onload = function () {
        visor = document.getElementByClass("Clock");
        setInterval(actual, 1000);
    }
    function actual() {
        fecha = new Date(); //Update Time.
        hours = fecha.getHours();
        minute = fecha.getMinutes();
        seconds = fecha.getSeconds(); 
        var Time = "";
        if (hours < 10) { 
            hours = "0" + hours;
        }
        if (minute < 10) { 
            minute = "0" + minute;
        }
        if (seconds < 10) { 
            seconds = "0" + seconds;
        }
 
        if (hours > 11) {
            Time = "PM";
        }
        else {
            Time = "AM";
        }
 
        visor.innerHTML = hours + " 3:00 " + minute + " 0:59 " + seconds + " 25 " + Time;
importScriptPage("Digital_Clock/code.js", "dev");
<span class="Clock"></span>
};
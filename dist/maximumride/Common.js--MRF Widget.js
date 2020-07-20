//////////////////////////////////////////////////////////////////////////
// An automatic timer designed to count down to the release of Maximum Ride Forever.
// This timer is based off of MediaWiki:Common.js/HoE_Widget.js, a script from the Summoners War Sky Arena Wiki ([[w:c:summonerswar]])
// Original script courtesy of "M͢ystr͢ile", assistant admin of that wiki.
// Thank you so much. <3
//////////////////////////////////////////////////////////////////////////
 
/* Any JavaScript here will be loaded for all users on every page load. */
 
var released = false;
 
// Create widget
var widget = document.createElement("div");
widget.setAttribute("id", "mrf_widget");
 
// Create link for image to Maximum Ride Forever's page
var mrf_imgLink = document.createElement("a");
mrf_imgLink.setAttribute("id", "mrf_imgLink");
 
// Create img tag to get ready for image to be inserted later
var mrf_img = document.createElement("img");
mrf_img.setAttribute("id", "mrf_img");
 
// Add img tag to a tag
mrf_imgLink.appendChild(mrf_img);
 
// Center image on WikiaRail
mrf_img.setAttribute("style", "display:block; margin:auto;");
 
// Create text for time remaining
var timer = document.createElement("div");
timer.setAttribute("id", "mrf_timer");
timer.setAttribute("style", "font-size:120%; text-align:center; border:2px solid black; background-color: #e60120; color: black; border-radius: 12px; margin: 3px 35px 8px 35px;");
 
 
// Add link, image and timer text to div
widget.appendChild(mrf_imgLink);
widget.appendChild(timer);
 
// The name. Duh. :P
var foreverDiv = document.createElement("div");
foreverDiv.setAttribute("id", "mrf_title");
 
// Add name to top of div
widget.insertBefore(foreverDiv, mrf_imgLink);
 
// Add widget to the Wikia Rail
var wikiaRail = document.getElementById("WikiaRail");
wikiaRail.insertBefore(widget, wikiaRail.childNodes[0]);
 
var mrfRefresh = setInterval(function()
			{
			var pdtTime = new Date();
			pdtTime = new Date(pdtTime.getUTCFullYear(), pdtTime.getUTCMonth(), pdtTime.getUTCDate(), pdtTime.getUTCHours()-7, pdtTime.getUTCMinutes(), pdtTime.getUTCSeconds());
 
			var day = pdtTime.toString().slice(0,3);
			var hour = pdtTime.toString().slice(16,18);
			var minute = pdtTime.toString().slice(19,21);
			var second = pdtTime.toString().slice(22,24);
 
			var currentTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate(), pdtTime.getHours(), pdtTime.getMinutes(), pdtTime.getSeconds());
 
			if (released) {
			    foreverDiv.innerHTML = "Maximum Ride Forever"
                        foreverDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid black; background-color: #e60120; color: black; border-radius: 12px; margin: 3px 35px 8px 35px;");
				$("#tcr_img").attr("src", "https://vignette.wikia.nocookie.net/themaximumride/images/3/3e/Maximum_Ride_Forever.JPG");
				mrf_img.setAttribute("height", 150);
				remainingReleaseTimeInMs = Date.UTC(2015, 4, 17, 22, 0, 0);
    			$("#mrf_timer").html("Maximum Ride Forever has finally been released!");
                    $("#mrf_imgLink").attr("href", "http://maximumride.wikia.com/wiki/Maximum_Ride_Forever");
    			}
 
    		else {
    		    foreverDiv.innerHTML = "Maximum Ride Forever"
                        foreverDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid black; background-color: #e60120; color: black; border-radius: 12px; margin: 3px 35px 8px 35px;");
    			$("#mrf_img").attr("src", "https://vignette.wikia.nocookie.net/themaximumride/images/3/3e/Maximum_Ride_Forever.JPG");
				mrf_img.setAttribute("height", 150);
				remainingReleaseTimeInMs = Date.UTC(2015, 4, 17, 22, 0, 0);
    		    $("#mrf_timer").html("Time left until release: " + differenceInTime(currentTimeInMs, remainingReleaseTimeInMs) );
                    $("#mrf_imgLink").attr("href", "http://maximumride.wikia.com/wiki/Maximum_Ride_Forever");
                }
 
 
 
 
			}, 500);
 
 
 
function differenceInTime(time1, time2)
{
	var result = "";
 
	var difference = Math.floor( Math.abs(time1 - time2) / (60*1000) );
	var divisors = [1440,60,1];
	var formats  = ["d","h","m"];
 
	for (i=0; i<divisors.length; i++)
	{
		var quotient = Math.floor(difference / divisors[i]) * divisors[i];
		var remainder = difference - quotient;
 
		if (difference > remainder || i == divisors.length - 1)
		{
			result += ((difference - remainder) / divisors[i]) + formats[i] + " ";
		}
		else
		{
			result += "";
		}
 
		difference = remainder;
	}
 
	return result;
}
//////////////////////////////////////////////////////////////////////////
// An automatic timer designed to count down to the release of True Colors.
// This timer is based off of MediaWiki:Common.js/HoE_Widget.js, a script from the Summoners War Sky Arena Wiki [[w:c:summonerswar]]
// Original script courtesy of "M͢ystr͢ile", assistant admin of that wiki.
// Thank you so much. <3
//////////////////////////////////////////////////////////////////////////

/* Any JavaScript here will be loaded for all users on every page load. */

var released = false;

// Create widget
var widget = document.createElement("div");
widget.setAttribute("id", "tcr_widget");
 
// Create link for image to True Colors's page
var tcr_imgLink = document.createElement("a");
tcr_imgLink.setAttribute("id", "tcr_imgLink");
 
// Create img tag to get ready for image to be inserted later
var tcr_img = document.createElement("img");
tcr_img.setAttribute("id", "tcr_img");
 
// Add img tag to a tag
tcr_imgLink.appendChild(tcr_img);
 
// Center image on WikiaRail
tcr_img.setAttribute("style", "display:block; margin:auto;");
 
// Create text for time remaining
var timer = document.createElement("div");
timer.setAttribute("id", "tcr_timer");
timer.setAttribute("style", "font-size:120%; text-align:center; border:2px solid grey; background-color: #bad1f5; color: black; margin: 3px 35px 8px 35px;");
 
 
// Add link, image and timer text to div
widget.appendChild(tcr_imgLink);
widget.appendChild(timer);
 
// The name. Duh. :P
var trueColorsDiv = document.createElement("div");
trueColorsDiv.setAttribute("id", "tcr_title");
 
// Add name to top of div
widget.insertBefore(trueColorsDiv, tcr_imgLink);
 
// Add widget to the Wikia Rail
var wikiaRail = document.getElementById("WikiaRail");
wikiaRail.insertBefore(widget, wikiaRail.childNodes[0]);
 
var tcrRefresh = setInterval(function()
			{
			var pdtTime = new Date();
			pdtTime = new Date(pdtTime.getUTCFullYear(), pdtTime.getUTCMonth(), pdtTime.getUTCDate(), pdtTime.getUTCHours()-7, pdtTime.getUTCMinutes(), pdtTime.getUTCSeconds());
 
			var day = pdtTime.toString().slice(0,3);
			var hour = pdtTime.toString().slice(16,18);
			var minute = pdtTime.toString().slice(19,21);
			var second = pdtTime.toString().slice(22,24);
 
			var currentTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate(), pdtTime.getHours(), pdtTime.getMinutes(), pdtTime.getSeconds());
 
			if (released) {
			    trueColorsDiv.innerHTML = "True Colors";
                        trueColorsDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid grey; background-color: #bad1f5; color: black; margin: 3px 35px 8px 35px;");
				$("#tcr_img").attr("src", "http://vignette2.wikia.nocookie.net/kccreations/images/3/32/True_Colors.jpg");
				tcr_img.setAttribute("height", 150);
				remainingReleaseTimeInMs = Date.UTC(2015, 4, 18, 0, 0, 0);
    			$("#tcr_timer").html("True Colors has finally been released!");
                    $("#tcr_imgLink").attr("href", "http://zedd.wikia.com/wiki/True_Colors_(album)");
    			}
    			
    		else {
    		    trueColorsDiv.innerHTML = "True Colors";
                        trueColorsDiv.setAttribute("style", "font-size:120%; text-align:center; border:2px solid grey; background-color: #bad1f5; color: black; margin: 3px 35px 8px 35px;");
    			$("#tcr_img").attr("src", "http://vignette2.wikia.nocookie.net/kccreations/images/3/32/True_Colors.jpg");
				tcr_img.setAttribute("height", 150);
				remainingReleaseTimeInMs = Date.UTC(2015, 4, 18, 0, 0, 0);
    		    $("#tcr_timer").html("Time left until release: " + differenceInTime(currentTimeInMs, remainingReleaseTimeInMs) );
                    $("#tcr_imgLink").attr("href", "http://zedd.wikia.com/wiki/True_Colors_(album)");
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
/* Any JavaScript here will be loaded for all users on every page load. */
$(document).ready(function()
{
	function isDST(t)
	{
		//t is the date object to check, returns true if daylight saving time is in effect.
		var jan = new Date(t.getFullYear(), 0, 1);
		var jul = new Date(t.getFullYear(), 6, 1);

		return Math.min(jan.getTimezoneOffset(), jul.getTimezoneOffset()) == t.getTimezoneOffset();
	}

	var wikiaRail = document.getElementById("WikiaRail");
	if (wikiaRail)
	{
		//Create container
		var cont = document.createElement("div");
		cont.id = "container";
		
		// Create widget
		var widget = document.createElement("div");
		widget.id = "ds_widget";
		
		//Create links table
		var links = document.createElement("table");
		var tr = document.createElement("tr");
		var td = document.createElement("td")
		var ul = document.createElement("ul");
		var li = document.createElement("li");
		var li2 = document.createElement("li");
		var th = document.createElement("th");
		links.id = "ds_links";
		links.setAttribute("style", "width:100%; font-size:14px; border: 1px solid #cacccc; background-color: #fcffff; margin-bottom: 10px;  border-collapse: collapse;");
		th.setAttribute("style", "background:#0038d8; height:10px;");
		td.setAttribute("style", "padding:10px;");
		
		//Create links
		var events = document.createElement("a");
		var patchnotes = document.createElement("a");
		var br = document.createElement("br")
		
		events.innerHTML = "Events";
		events.href = "http://soccerspirits.wikia.com/wiki/Events";
		
		patchnotes.innerHTML = "Patch Notes";
		patchnotes.href = "http://soccerspirits.wikia.com/wiki/Update_History";
		
		//Add links
		links.appendChild(th);
		links.appendChild(tr);
		tr.appendChild(td);
		td.appendChild(ul);
		ul.appendChild(li);
		li.appendChild(events);
		ul.appendChild(li2);
		li2.appendChild(patchnotes);
		
		// Create text for time remaining
		var timer = document.createElement("div");
		timer.id = "ds_timer";
		timer.setAttribute("style", "font-size:150%; text-align:center; border:2px solid black; padding: 10px 10px 10px 10px; font-weight: bold; margin-bottom: 10px; background-color: #fcffff;");
		
		// Add timer text to div
		widget.appendChild(timer);
		
		//Add widget and links to container
		cont.appendChild(widget);
		cont.appendChild(links);

		// Add container to the Wikia Rail
		wikiaRail.insertBefore(cont, wikiaRail.childNodes[0]);

		var pdtTime = new Date();
		// If is Daylight Savings, -7, otherwise -8
		var dstDiff = isDST(pdtTime) ? 7 : 7;
		pdtTime = new Date(pdtTime.getUTCFullYear(), pdtTime.getUTCMonth(), pdtTime.getUTCDate(), pdtTime.getUTCHours() - dstDiff, pdtTime.getUTCMinutes(), pdtTime.getUTCSeconds());

		var day = pdtTime.toString().slice(0, 3);
		var hour = pdtTime.toString().slice(16, 18);
		var minute = pdtTime.toString().slice(19, 21);
		var second = pdtTime.toString().slice(22, 24);

		var currentTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate(), pdtTime.getHours(), pdtTime.getMinutes(), pdtTime.getSeconds());
		
		var remainingDSTimeInMs = Date.UTC(pdtTime.getFullYear(), pdtTime.getMonth(), pdtTime.getDate() + 1, 0, 0, 0);
		
		$("#ds_timer").html("Daily Reset: " + differenceInTime(currentTimeInMs, remainingDSTimeInMs));
	}
});

function differenceInTime(time1, time2)
{
	var result = "";
	var offset = Date.UTC(1970, 0, 1, 16, 0, 0);

    //Deduct 16 hours to offset to 8am (PST) reset time
	var difference = Math.floor((Math.abs(time1 - time2) - offset) / (60 * 1000));
	var divisors = [1440, 60, 1];
	var formats = ["d", "h", "m"];

	for (i = 0; i < divisors.length; i++)
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
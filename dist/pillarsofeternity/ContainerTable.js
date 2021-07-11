/*
	Used in conjunction with Template:ContainerTable and Template:Container
	Currently only supports one ContainerTable per page - bad things might happen otherwise!
*/

(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
    var lootContainerTable = document.querySelector(".loot-container-table");
    var lootContainerTableWrapper = document.querySelector(".loot-container-table-wrapper");
    var randomLootCells = lootContainerTable.querySelectorAll(".lootlist-results-day");
    var randomLootHeaders = lootContainerTable.querySelectorAll(".lootlist-results-day-header");

    var cellsByDay = {};

    function addElementToCellsByDay(elem)
    {
        var day = parseInt(elem.dataset.day);

        if (cellsByDay[day] == undefined)
            cellsByDay[day] = [];
        
        cellsByDay[day].push(elem);
    }

    randomLootCells.forEach(addElementToCellsByDay);
    randomLootHeaders.forEach(addElementToCellsByDay);

    // The currently selected day, 0 for all, -1 for none
    var selectedDay = 0;
	
	if (document.readyState !== "loading") { processContainerTable(); }
	else { window.addEventListener("DOMContentLoaded", processContainerTable); }
	
	function processContainerTable()
	{
	    // Per container
	    addHeaderDayDropdown();
	}

// ContainerTable functions
	
	// Add overarching day dropdown
	function addHeaderDayDropdown()
	{
	    var dayDropdown = lootContainerTable.querySelector(".loot-container-list-select-day");
	    
	    // Create a new select 
	    var select = document.createElement("select");
	    select.classList.add(...dayDropdown.classList);
	    select.style.cssText = dayDropdown.style.cssText;

	    // Add hide all and show all options
        var showAllOpt = document.createElement("option");
        showAllOpt.setAttribute("value", "all");
        showAllOpt.appendChild(document.createTextNode("Show all"));
        select.appendChild(showAllOpt);

        // Show all by default
        selectedDay = 0;
        showAllOpt.setAttribute("selected", "");
	
	    // Add day options
	    for (i = 1; i <= 20; i++)
	    {
	        var opt = document.createElement("option");
	        opt.setAttribute("value", i);
	        opt.appendChild(document.createTextNode(addOrdinal(i)));
	
	        select.appendChild(opt);
	    }
	
	    // Replace the existing placeholder with an actual dropdown
	    dayDropdown.replaceWith(select);
	    dayDropdown = select;

        // Add dropdown event
	    dayDropdown.addEventListener("change", function(e)
	    {
	        if (dayDropdown.value == "all")
	        {
	            selectedDay = dayDropdown.value == 0;

	            for (var day = 1; day <= 20; day++)
	            {
	                for (var i = 0; i < cellsByDay[day].length; i++)
	                {
	                    cellsByDay[day][i].style.display = "";
	                }
	            }
	        }
	        else
	        {
                selectedDay = parseInt(dayDropdown.value);

	            for (var day = 1; day <= 20; day++)
	            {
	                var display = day == dayDropdown.value ? "" : "none";
	                
                    for (var i = 0; i < cellsByDay[day].length; i++)
	                {
	                    cellsByDay[day][i].style.display = display;
	                }
	            }
	        }
	    });
	}

// General helper functions

	// Change the tag of an element to newTag. This returns the created element and deletes the existing element!
	function changeElementTag(element, newTag)
	{
	    var newElement = document.createElement(newTag);
	
	    // Grab all of the original's attributes, and pass them to the replacement
	    for (var i = 0, l = element.attributes.length; i < l; i++)
	    {
	        newElement.setAttribute(element.attributes.item(i).nodeName,
	                                element.attributes.item(i).nodeValue);
	    }
	
	    // Copy child nodes (innerHTML doesn't seem to work all the time)
	    newElement.append(...element.childNodes);
	    element.replaceWith(newElement);
	
	    element = newElement;
	    element = null;
	
	    return newElement;
	}
	
	// Add the appropriate ordinal indicator to a given number (typically integer).
	// For an integer ending in 1, 2 or 3 (except for integers ending in 11, 12 or 13), the ordinal suffix will be -st, -nd and -rd, respectively.
	// If the input is not a number, no ordinal indicator will be added.
	function addOrdinal(num)
	{
	    var str = num.toString();
	
	    // Not a number, return the input as a string
	    if (typeof(num) != "number")
	        return str;
	
	    if (str.endsWith("1") && !str.endsWith("11"))
	        return str + "st";
	    else if (str.endsWith("2") && !str.endsWith("12"))
	        return str + "nd";
	    else if (str.endsWith("3") && !str.endsWith("13"))
	        return str + "rd";
	    else
	        return str + "th";
	
	    return str;
	}
})();
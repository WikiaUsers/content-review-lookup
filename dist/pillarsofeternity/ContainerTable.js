/*
	Used in conjunction with Template:ContainerTable and Template:Container
	Supports multiple ContainerTables on one page, though they are not synced together
*/

(function() // <- Immediately invoked function expression to scope variables and functions to this script
{
    var lootContainerTables = document.querySelectorAll(".loot-container-table");
    var dayDropdowns = [];

    lootContainerTables.forEach(function(table)
    {
        var cellsByDay = collectDayCellsAndHeaders(table);
        var dayDropdown = createDayDropdown(table);
        dayDropdowns.push(dayDropdown);

        // Add dropdown event
        dayDropdown.addEventListener("change", function(e)
        {
            // Show all cells and headers
            if (e.target.value == "all")
            {
                for (var day = 1; day <= 20; day++)
                {
                    for (var i = 0; i < cellsByDay[day].length; i++)
                    {
                        cellsByDay[day][i].style.display = "";
                    }
                }
            }

            // Show only cells and the header for a specific day
            else
            {
                for (var day = 1; day <= 20; day++)
                {
                    var display = day == e.target.value ? "" : "none";

                    for (var i = 0; i < cellsByDay[day].length; i++)
                    {
                        cellsByDay[day][i].style.display = display;
                    }
                }
            }
        });
    });
    
    // Highlight the row if one was anchored to
    if (location.hash)
    {
        var row = document.getElementById(location.hash.slice(1));

        if (row)
        {
            row.style.backgroundColor = "rgb(242 196 98 / 12.5%)";
            row.style.transition = "background-color 0.5s";
        }
    }
    
// ContainerTable functions

    // Collects all .lootlist-results-day and .lootlist-results-day-header for a table
    // Returning an array of these elements indexed by the day
    function collectDayCellsAndHeaders(table)
    {
        var cellsByDay = {};
        var randomLootCells = table.querySelectorAll(".lootlist-results-day");
        var randomLootHeaders = table.querySelectorAll(".lootlist-results-day-header");

        function addElementToCellsByDay(elem)
        {
            var day = parseInt(elem.dataset.day);

            if (cellsByDay[day] == undefined)
                cellsByDay[day] = [];

            cellsByDay[day].push(elem);
        }

        randomLootCells.forEach(addElementToCellsByDay);
        randomLootHeaders.forEach(addElementToCellsByDay);

        return cellsByDay;
    }

    // Replaces the placeholder .loot-container-list-select-day element in the table
    // with an actual dropdown (since we cannot create form elements in wikitext)
    // Returns the created <select>, or null if the placeholder doesn't exist
    function createDayDropdown(table)
    {
        // Get the placeholder dropdown
        var placeholder = table.querySelector(".loot-container-list-select-day");

        if (placeholder == undefined)
            return null;

	    // Create a select
        var select = document.createElement("select");
        select.setAttribute("title", "Day of the month");

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
        select.classList.add(...placeholder.classList);
        select.style.cssText = placeholder.style.cssText;
        placeholder.replaceWith(select);

        return select;
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
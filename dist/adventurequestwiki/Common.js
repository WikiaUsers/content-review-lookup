function initButtons(){
    // get the filter categories
    var filters = document.getElementsByClassName('filter-cat');
    
    if (typeof filters == 'undefined') {
	    return;
	}
    
    for (var j = 0; j < filters.length; j++) {

        // get all the elements with className 'filter-btn'. It returns an array
        var btn_list = (filters[j]).getElementsByClassName('filter-btn');
        
        // See if we're on a page with filters
        if (btn_list.length === 0) {
            return;
        }
        
        // Initialize the html string
        var result_html = "<h3><span class='mw-headline'>" + filters[j].id + "</span></h3><div class='filter-class'>";
        
        // get the lenght of array defined above
        var list_length = btn_list.length;
        var i=0;
      
        // run the for loop for each element in the array
        for(;i<list_length;i++){
            
            // get all the elements with className corresponding to the button. It returns an array
            var elements = document.getElementsByClassName(btn_list[i].id);
            
            // if there are none, don't render the button
            if (elements.length === 0) {
                continue;
            }
          
            // Construct the html
            result_html += '<div class="filter-wrapper card"><div class="filter-button r"><input type="checkbox" class="filter-btn checkbox" id="'+btn_list[i].id+'"><div class="knobs"></div><div class="layer"></div></div><div class="filter-text">'+btn_list[i].innerHTML+'</div></div>';
        }     
        result_html += "</div>";
        
        // apply the html
        filters[j].innerHTML = result_html;
    }
    
    // get the filter-area
    var filter_area = document.getElementById('filters');
    
    // remove hiding attribute
    if (filter_area !== null) {
        filter_area.removeAttribute("style");
    }
}

function getNextDayOfWeek(date, dayOfWeek) {
    // get the date provided
    var result_date = new Date(date.getTime());

    // return the date of the "dayOfWeek" on the same week.
    result_date.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);

    return result_date;
}

function initCalendar(){
    // Get all the elements with the className 'calendar-event'. This returns an array.
    var event_list = document.getElementsByClassName('calendar-event');
    
    // See if we're on the events page.
    if (event_list.length === 0) {
        return;
    }
    
    for (var i = 0; i < event_list.length; i++){
        today = new Date();
        
        //Get the date from the event
        eventDate = event_list[i].firstElementChild.innerHTML;
        eventYear = today.getFullYear();
        eventMonth = eventDate.split("-")[1] - 1;
        eventDay = eventDate.split("-")[0] - 1;

        //Create a new date object for the event
        eventReleaseDate = new Date(eventYear, eventMonth, eventDay);

        // In case the event passed a long time ago
        if (today - eventReleaseDate > 1000*60*60*24*28 && today - eventReleaseDate > 0) {
            eventReleaseDate.setFullYear(eventYear+1);
        }
        // In case it just passed and shouldn't change date yet
        if (eventReleaseDate - today > 1000*60*60*24*(365-28) && eventReleaseDate - today < 1000*60*60*24*365) {
            eventReleaseDate.setFullYear(eventYear-1);
        }
        
        //And convert it to the week's Friday
        eventReleaseDate = getNextDayOfWeek(eventReleaseDate, 5);
        
        //Change the color of recent past events, and future events
        var color = "rgb(0,0,0)";
        
        // It was 4 weeks ago
        if (today - eventReleaseDate < 1000*60*60*24*28 && today - eventReleaseDate > 0) {
            color = "rgb(63,0,0)";
        }
        // It was 3 weeks ago
        if (today - eventReleaseDate < 1000*60*60*24*21 && today - eventReleaseDate > 0) {
            color = "rgb(127,0,0)";
        }
        // It was 2 weeks ago
        if (today - eventReleaseDate < 1000*60*60*24*14 && today - eventReleaseDate > 0) {
            color = "rgb(191,0,0)";
        }
        // It was this past release
        if (today - eventReleaseDate < 1000*60*60*24*7 && today - eventReleaseDate > 0) {
            color = "rgb(255,0,0)";
            event_list[i].innerHTML += " <b>NOW!</b>";
        }
        // It'll be in the next 4 weeks
        if (eventReleaseDate - today < 1000*60*60*24*28 && eventReleaseDate - today > 0) {
            color = "rgb(0,0,63)";
        }
        // It'll be in the next 3 weeks
        if (eventReleaseDate - today < 1000*60*60*24*21 && eventReleaseDate - today > 0) {
            color = "rgb(0,0,127)";
        }
        // It'll be in the next 2 weeks
        if (eventReleaseDate - today < 1000*60*60*24*14 && eventReleaseDate - today > 0) {
            color = "rgb(0,0,191)";
        }
        // It'll be in the next week
        if (eventReleaseDate - today < 1000*60*60*24*7 && eventReleaseDate - today > 0) {
            color = "rgb(0,0,255)";
        }
        event_list[i].style = "color: " + color + ";";
    }
}

function attachClickEvent(){
    // get all the elements with className 'filter-btn'. It returns an array
    var btn_list = document.getElementsByClassName('filter-btn');
    
    // See if we're on a page with filters
    if (btn_list.length === 0) {
        return;
    }
	
    // get the lenght of array defined above
    var list_length = btn_list.length;
    var i=0;
  
    // run the for look for each element in the array
    for(;i<list_length;i++){
      
        // attach the event listener
        btn_list[i].addEventListener("click", filterResults);
    }                                                                             
}

function initFloat(){
    // get all the elements with className 'filter-btn'. It returns an array
    var btn_list = document.getElementsByClassName('filter-btn');
    
    // See if we're on a page with filters
    if (btn_list.length === 0) {
        return;
    }
    
    // get all the collapsible elements in the page
    var collapsible_list = document.getElementsByClassName('collapsible');
    
    // Add the floating badges to each of them
    for (i = 0; i < collapsible_list.length; i++) {
        
        //get the element
        element = collapsible_list[i];
        
        //add the floating badge of each category
        for (j = 0; j < btn_list.length; j++) {
            
            //get the button
            button = btn_list[j];
            
            //if it belongs to that filter
            if (element.classList.contains(button.id)) {
                
                //get the filter
                tag = button.id.split("-")[1];
                
                //create the badge
                new_span = "<span class='" + tag + "-float'>" + tag.toUpperCase()+"</span>";
                
                //add it to the html
                element.innerHTML = new_span + element.innerHTML;
            }
        }
    }
}

function removeDuplicatesInit(){
    // get all the elements with className 'filter-btn'. It returns an array
    var btn_list = document.getElementsByClassName('filter-btn');
    
    // apply the filter to all duplicates in the page
    for (i = 0; i < btn_list.length; i++) {
        
        //get the button
        var button = btn_list[i];
    
        //get all elements that should be filtered
        filtered_elements = document.getElementsByClassName("inferior-"+button.id.split("-")[1]);
        
        //for each of them, add the "collapsed" class
        for (j = 0; j < filtered_elements.length; j++) {
            
            //grab the element
            element = filtered_elements[j];
            
            //if they don't have the class, add it
            if (!(element.classList.contains('collapsed'))) {
			    element.classList.add("collapsed");
    		}
        }
    }
}

function filterResults(e){
	//Create map of buttons
	if (typeof filterResults.buttons == 'undefined') {
		filterResults.buttons = new Map();
		buttons = document.getElementsByClassName('filter-btn');
		for (i = 0; i < buttons.length; i++) {
			button_name = (buttons[i]).id;
			filterResults.buttons.set(button_name,1);
		}
	}
	
    //get the button that is clicked
    var button = e.target;
    
    //get the element id of the button that is clicked
    var eleId = button.id;
	
	//mark button as filtered
	if (button.classList.contains('filter-btn-filtered') === true) {
		button.classList.remove('filter-btn-filtered');
	}
	else {
		button.classList.add('filter-btn-filtered');
	}
    
    //get all the items matching the filter
    var filtered_elements = document.getElementsByClassName(button.id);
	
	//apply the filter to the map
	filterResults.buttons.set(button.id, 1-filterResults.buttons.get(button.id));
	
    //for each element, apply the filter
    for (i = 0; i < filtered_elements.length; i++) {
		
		//get the element
		element = filtered_elements[i];
        
        //get the element classes
        class_list = element.className.split(" ");
		
		//check if it should be displayed
		display_flag = true;
        for (j = 0; j < class_list.length; j++) {
			
			//get the class id
			var classId = class_list[j];
			
			// check to see if the item is collapsed by one of the buttons
			if (typeof filterResults.buttons.get(classId) != 'undefined') {
				if (filterResults.buttons.get(classId) === 0) {
					display_flag = false;
				}
			}
        }
		
		//display or not
		if (display_flag === false) {
			element.classList.add("collapsed");
		}
		else {
			element.classList.remove("collapsed");
		}
    }
}

function initTitle() {
    //Get the title
	guide_title = document.getElementsByClassName('fandom-community-header__community-name')[0];
	
	//Change it to a proper one
	guide_title.innerText = "AdventureQuest Guide";
}

function autoFilter() {
    // hide rares by default
	rare_button = document.getElementById('filter-rare');
    
    // Unless there are filters there's nothing to hide
	if(rare_button !== null) {
	    rare_button.click();
	}
	
	//hide special offer by default
	so_button = document.getElementById('filter-specialoffer');
	
	// Unless there are filters there's nothing to hide
	if(so_button !== null) {
	    so_button.click();
	}
}

function initVoidRotation() {
    // Get the rotation table
    var rotation_block = document.getElementById("void-rotation");
    
    // If it's null this is not the right page
    if (rotation_block !== null) {
        // Get a row in the table
        var arrays = rotation_block.getElementsByTagName("tr");
        
        var initial_date = new Date();
        var array_position = 0;
        
        // Find the row with the date mentioned
        for (var i = 1; i < arrays.length; i++) {
            
            // The date will be on the 2nd cell in the row
            var date_cell = arrays[i].getElementsByTagName("td")[1];
            date_cell = date_cell.innerHTML;
            
            // If the cell isn't empty, it's the correct cell. Save the date.
            if (date_cell != "") {
                if (date_cell.split("-").length >= 3) {
                    array_position = i;
                    
                    // Save the date with the time 14:00 EST
                    initial_date.setFullYear(date_cell.split("-")[0], date_cell.split("-")[1]-1, date_cell.split("-")[2]);
                    initial_date.setUTCHours(18);
                    initial_date.setUTCMinutes(0);
                }
            }
        }
        
        // Update the remaining time
        for (var i = 1; i < arrays.length; i++) {
            
            // In case the event happens prior in the timeline to the saved date.
            if (i < array_position) {
                var delay = ((arrays.length - 1 - array_position) + i) * 7 * 24 * 60 * 60 * 1000;
            }
            
            // In case the event happens after.
            else if (i >= array_position) {
                delay = (i - array_position) * 7 * 24 * 60 * 60 * 1000;
            }
            
            // Set the time of arrival
            var arrival_date = new Date(initial_date.getTime() + delay);
            var today = new Date();
            var miliseconds_remaining = arrival_date - today;
            
            // If the event is too far in the past, advance it to the next rotation
            while (miliseconds_remaining < -7 * 24 * 60 * 60 * 1000) {
                miliseconds_remaining += (arrays.length - 1) * 7 * 24 * 60 * 60 * 1000;
            }
            
            // Calc hours / days remaining
            hours_remaining = miliseconds_remaining / (60 * 60 * 1000);
            days_remaining = miliseconds_remaining / (24 * 60 * 60 * 1000);
            hours_remaining = Math.ceil(hours_remaining) - 24 * Math.floor(days_remaining);
            
            // Get the cell to update
            date_cell = arrays[i].getElementsByTagName("td")[1];
            
            // If the event is the upcoming one
            if (days_remaining < 7 && days_remaining >= 0) {
                date_cell.innerHTML = Math.floor(days_remaining).toString() +" days, " + hours_remaining.toString() + " hours remaining.";
            }
            
            // If the event is currently in progress 
            else if (days_remaining < 0 && days_remaining >= -7) {
                days_remaining = Math.floor(7 + days_remaining);
                date_cell.innerHTML = "Leaves in: " + days_remaining.toString() + " days, " + hours_remaining.toString() + " hours.";
                arrays[i].getElementsByTagName("td")[0].setAttribute("style", "font-weight:bold; background:lightgray");
                arrays[i].getElementsByTagName("td")[1].setAttribute("style", "font-weight:bold; background:lightgray");
            }
            else {
                date_cell.innerHTML = Math.ceil(days_remaining).toString() +" days remaining.";
            }
            
        }
    }
}

// document.body.onload = function() {
//     initTitle();
//     initButtons();
// 	attachClickEvent();
// 	initFloat();
// 	initCalendar();
// 	initVoidRotation();
// 	autoFilter();
// }

initTitle();
initButtons();
attachClickEvent();
initFloat();
initCalendar();
initVoidRotation();
autoFilter();
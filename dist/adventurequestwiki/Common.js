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
      
        // run the for loop for each element in the array
        for(var i=0; i< btn_list.length; i++){
            
            // get all the elements with className corresponding to the button's id. It returns an array
            var elements = document.getElementsByClassName(btn_list[i].id);
            
            // if there are none, don't render the button
            if (elements.length === 0) {
                continue;
            }
            
            // initialize theme variable in case this is darkmode
            var theme = "";
            
            // get darkmode cookie
            var darkmode_cookie = getCookie("Darkmode");
            
            // if the cookie is set to "true", add the darkmode suffix to the classes
            if (darkmode_cookie !== null && darkmode_cookie === "1") {
                theme = "-dark";
            }
          
            // Construct the html
            result_html += '<div class="filter-wrapper' + theme + ' card'+ theme + '"><div class="filter-button r"><input type="checkbox" class="filter-btn checkbox" id="'+btn_list[i].id+'"><div class="knobs"></div><div class="layer"></div></div><div class="filter-text">'+btn_list[i].innerHTML+'</div></div>';
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

function getNextDayOfWeek(date, day_of_week) {
    // get the date provided
    var result_date = new Date(date.getTime());

    // return the date of the "dayOfWeek" on the same week.
    result_date.setDate(date.getDate() + (7 + day_of_week - date.getDay()) % 7);

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
        event_date = event_list[i].firstElementChild.innerHTML;
        event_year = today.getFullYear();
        event_month = event_date.split("-")[1] - 1;
        event_day = event_date.split("-")[0] - 1;

        //Create a new date object for the event
        event_release_date = new Date(event_year, event_month, event_day);

        // In case the event passed a long time ago
        if (today - event_release_date > 1000*60*60*24*28 && today - event_release_date > 0) {
            event_release_date.setFullYear(event_year+1);
        }
        // In case it just passed and shouldn't change date yet
        if (event_release_date - today > 1000*60*60*24*(365-28) && event_release_date - today < 1000*60*60*24*365) {
            event_release_date.setFullYear(event_year-1);
        }
        
        //And convert it to the week's Friday
        event_release_date = getNextDayOfWeek(event_release_date, 5);
        
        //Change the color of recent past events, and future events
        var color = "rgb(0,0,0)";
        
        // It was 4 weeks ago
        if (today - event_release_date < 1000*60*60*24*28 && today - event_release_date > 0) {
            color = "rgb(63,0,0)";
        }
        // It was 3 weeks ago
        if (today - event_release_date < 1000*60*60*24*21 && today - event_release_date > 0) {
            color = "rgb(127,0,0)";
        }
        // It was 2 weeks ago
        if (today - event_release_date < 1000*60*60*24*14 && today - event_release_date > 0) {
            color = "rgb(191,0,0)";
        }
        // It was this past release
        if (today - event_release_date < 1000*60*60*24*7 && today - event_release_date > 0) {
            color = "rgb(255,0,0)";
            event_list[i].innerHTML += " <b>NOW!</b>";
        }
        // It'll be in the next 4 weeks
        if (event_release_date - today < 1000*60*60*24*28 && event_release_date - today > 0) {
            color = "rgb(0,0,63)";
        }
        // It'll be in the next 3 weeks
        if (event_release_date - today < 1000*60*60*24*21 && event_release_date - today > 0) {
            color = "rgb(0,0,127)";
        }
        // It'll be in the next 2 weeks
        if (event_release_date - today < 1000*60*60*24*14 && event_release_date - today > 0) {
            color = "rgb(0,0,191)";
        }
        // It'll be in the next week
        if (event_release_date - today < 1000*60*60*24*7 && event_release_date - today > 0) {
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
  
    // run the for look for each element in the array
    for(var i=0; i<list_length; i++){
      
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
	if (typeof filterResults.buttons === 'undefined') {
		filterResults.buttons = new Map();
		var buttons = document.getElementsByClassName('filter-btn');
		for (var i = 0; i < buttons.length; i++) {
			var button_name = (buttons[i]).id;
			filterResults.buttons.set(button_name,1);
		}
	}
	
    //get the button that is clicked
    var button = e.target;
    
    //get the element id of the button that is clicked
    var ele_id = button.id;
	
	//mark button as filtered
	if (button.classList.contains('filter-btn-filtered') === true) {
		button.classList.remove('filter-btn-filtered');
	}
	else {
		button.classList.add('filter-btn-filtered');
	}
    
    //get all the items matching the filter
    var filtered_elements = document.getElementsByClassName(ele_id);
	
	//apply the filter to the map
	filterResults.buttons.set(ele_id, 1-filterResults.buttons.get(ele_id));
	
    //for each element, apply the filter
    for (var i = 0; i < filtered_elements.length; i++) {
		
		//get the element
		var element = filtered_elements[i];
        
        //get the element classes
        var class_list = element.className.split(" ");
		
		//check if it should be displayed
		var display_flag = true;
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
	guide_title = document.getElementsByClassName('wds-community-header__sitename')[0];
	link = guide_title.children[0];
	
	//Change it to a proper one
	link.innerHTML = "AdventureQuest Guide";
	
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
                arrays[i].getElementsByTagName("td")[0].setAttribute("style", "font-weight:bold; background:lightgray; color: #FF0000;");
                arrays[i].getElementsByTagName("td")[1].setAttribute("style", "font-weight:bold; background:lightgray; color: #FF0000;");
            }
            else {
                date_cell.innerHTML = Math.ceil(days_remaining).toString() +" days remaining.";
            }
            
        }
    }
}

function setCookie(cname, cvalue, exdays) {
    // set up a new date
    var d = new Date();
    
    // set the date of expiration to exdays after the creation)
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    
    //add cookie
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    // grab the cookie
    var cookie = document.cookie.split(cname + "=");
    
    // if it exists split the cookie and return the value
    if (cookie.length > 1) {
        return cookie[1].split(";")[0];
    }
    
    // otherwise return an empty cookie
    else {
        return null;
    }
}

function removeDarkMode() {
    // get varous elements and add / remove the themed classes
    var wikia_page_background = document.getElementById("WikiaPageBackground");
    wikia_page_background.classList.add("backgroundLight");
    wikia_page_background.classList.remove("backgroundDark");
    
    var wikia_page = document.getElementById("WikiaPage");
    wikia_page.classList.remove("wikiaBorderDark");
    
    var footer = document.getElementById("mixed-content-footer");
    footer.classList.add("footerLight");
    footer.classList.remove("footerDark");
    
    var cards = document.getElementsByClassName("card-dark");
    while (cards.length) {
        cards[0].classList.add("card");
        cards[0].classList.remove("card-dark");
    }
    
    var filter_wrappers = document.getElementsByClassName("filter-wrapper-dark");
    while (filter_wrappers.length) {
        filter_wrappers[0].classList.add("filter-wrapper");
        filter_wrappers[0].classList.remove("filter-wrapper-dark");
    }
    
    var table_headers = document.getElementsByTagName("th");
    for (var i = 0; i < table_headers.length; i++) {
        table_headers[i].classList.remove("th-dark");
    }
    
    var article_table = document.getElementsByClassName("article-table");
    for (var i = 0; i < article_table.length; i++) {
        article_table[i].classList.remove("article-table-dark");
    }
    
    var page_headers = document.getElementsByTagName("h1");
    for (var i = 0; i < page_headers.length; i++) {
        page_headers[i].classList.remove("h1-dark");
    }
    
    var quotes = document.getElementsByTagName("pre");
    for (var i = 0; i < quotes.length; i++) {
        quotes[i].classList.remove("pre-dark");
    }
    
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("style","color: #3a3a3a;");
}

function applyDarkMode() {
    // get varous elements and add / remove the themed classes
    var wikia_page_background = document.getElementById("WikiaPageBackground");
    wikia_page_background.classList.add("backgroundDark");
    wikia_page_background.classList.remove("backgroundLight");
    
    var wikia_page = document.getElementById("WikiaPage");
    wikia_page.classList.add("wikiaBorderDark");
    
    var footer = document.getElementById("mixed-content-footer");
    footer.classList.add("footerDark");
    footer.classList.remove("footerLight");
    
    var cards = document.getElementsByClassName("card");
    while(cards.length) {
        cards[0].classList.add("card-dark");
        cards[0].classList.remove("card");
    }
    
    var filter_wrappers = document.getElementsByClassName("filter-wrapper");
    while (filter_wrappers.length) {
        filter_wrappers[0].classList.add("filter-wrapper-dark");
        filter_wrappers[0].classList.remove("filter-wrapper");
    }
    
    var table_headers = document.getElementsByTagName("th");
    for (var i = 0; i < table_headers.length; i++) {
        table_headers[i].classList.add("th-dark");
    }
    
    var article_table = document.getElementsByClassName("article-table");
    for (var i = 0; i < article_table.length; i++) {
        article_table[i].classList.add("article-table-dark");
    }
    
    var page_headers = document.getElementsByTagName("h1");
    for (var i = 0; i < page_headers.length; i++) {
        page_headers[i].classList.add("h1-dark");
    }
    
    var quotes = document.getElementsByTagName("pre");
    for (var i = 0; i < quotes.length; i++) {
        quotes[i].classList.add("pre-dark");
    }
    
    var body = document.getElementsByTagName("body")[0];
    body.setAttribute("style","color: #ffffff;");
}

function darkModeToggle() {
    // grab the value from the cookie
    var darkmode_cookie = getCookie("Darkmode");
    
    // switch it from true to false and vise-versa
    darkmode_cookie = (1 - parseInt(darkmode_cookie)).toString();
    
    // apply or remove darkmode depending on the cookie state
    if (darkmode_cookie === "1") {
        applyDarkMode();
    }
    else {
        removeDarkMode();
    }
    
    // set the cookie and make it expire in 90 days
    setCookie("Darkmode", darkmode_cookie, 90);
}

function tabsToggleDelay(retries) {
    // attempt to reapply darkmode for tabbed pages. This has no overhead since elements would already be changed.
    setTimeout(function() {
        if (retries > 0) {
            var darkmode_cookie = getCookie("Darkmode");
            if (darkmode_cookie === "1") {
                applyDarkMode();
            }
            else {
                removeDarkMode();
            }
            tabsToggleDelay(retries-1);
        }
    }, 500);
}

function tabsToggle(e) {
    // wrapper for the tabsToggleDelay function
    tabsToggleDelay(10);
}

function initDarkModeToggle() {
    // attempt to get the darkmode cookie
    var darkmode_cookie = getCookie("Darkmode");
    
    // if it doesn't exist, create one set to 0 for 30 days
    if (darkmode_cookie === null) {
        setCookie("Darkmode", "0", 30);
    }
    
    // get the numerical value for the cookie
    darkmode_cookie = parseInt(darkmode_cookie);
    
    // apply the correct theme
    if (darkmode_cookie) {
        applyDarkMode();
    }
    else {
        removeDarkMode();
    }
    
    // get the section for darkmode button and apply the html for the button
    var dark_mode_wrapper = document.getElementById('dark_mode_wrapper');
    if (dark_mode_wrapper !== null) {
        dark_mode_wrapper.innerHTML = '<div class="darkmode-class"><div class="darkmode-wrapper"><div class="darkmode-button r"><input type="checkbox" class="checkbox-dark" id="dark_mode"><div class="knobs-dark"></div><div class="layer-dark"></div></div><div class="darkmode-text">Dark Mode</div></div></div>';
    }
    
    // get the button for dark mode
    var darkmode_button = document.getElementsByClassName('checkbox-dark');
    
    // See if we're on a page with a button
    if (darkmode_button.length !== 0) {
        // get the first item in the array, there shouldn't be any other
        darkmode_button = darkmode_button[0];
        
        // attach the event listener
        darkmode_button.addEventListener("click", darkModeToggle);
        
        // Set the button as checked
        if (darkmode_cookie) {
            darkmode_button.checked = true;
        }
        else {
            darkmode_button.checked = false;
        }
    }
    
    // handle tabview functionality
    var tabview = document.getElementById('flytabs_0');]
    
    // See if we're on a page with a button
    if (typeof tabview != 'undefined') {
        var tabs_elements = tabview.getElementsByTagName("span");
        for (var i = 0; i < tabs_elements.length; i++) {
            // attach the event listener
            tabs_elements[i].addEventListener("click", tabsToggle);
        }
        tabsToggle();
    }
}

window.onload = function() {
    initTitle();
    initButtons();
	attachClickEvent();
	initFloat();
	initCalendar();
	initVoidRotation();
	initDarkModeToggle();
}
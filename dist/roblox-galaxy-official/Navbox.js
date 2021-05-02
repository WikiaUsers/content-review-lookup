/*ALL CODE BELOW IS FOR AUTOMATIC SORTING OF THE SHIP NAVBOX: https://roblox-galaxy-official.fandom.com/wiki/Template%3AShipNavbox
──────────────────────────────────────────────────────────────────────────────
Code written/maintained by Explodabat. Please contact me on the Wiki Discord at "Explodabat#3655" or on my message wall if you have any questions or issues
──────────────────────────────────────────────────────────────────────────────
This content previously lived on MediaWiki:Common.js
*/
console.log("Navbox JS Version 4.29.21");
//Array of ship objects -- see "function Ship(...)" for constructor & properties
var shipArr = [];
var count = 0;
var flag = 0;
var sortBy = "";
var canRun = false;
window.setTimeout(function () {
	if(document.getElementById("shipNavbox") !== null){
		canRun = true;
		//add event listeners to navbox if it is present
		updateButtons();
		//listeners run navbox fill code when navbox is opened
		Array.from(document.getElementsByTagName("a")).find(function(obj){
    	    return obj.getAttribute("data-hash") !== null && obj.getAttribute("data-hash").includes("Limited");
  	 	}).addEventListener("click", startNavboxFill);
		Array.from(document.getElementsByTagName("a")).find(function(obj){
  		      return obj.getAttribute("data-hash") !== null && obj.getAttribute("data-hash").includes("Ships");
   		}).addEventListener("click", startNavboxFill);
	}
},500);
var canRestart = true;
//if code has already run and set localStorage item, use that to fill shipArr
if(localStorage.getItem("storedArr") !== null){
    shipArr = JSON.parse(localStorage.getItem("storedArr"));
    count = shipArr.length;
} 
//Array of valid category-based types (classes/events)
var types = ["AI","Fighters","Hidden Event","Halloween 2016","Halloween 2017","Christmas 2017","Fourth of July 2018","Halloween 2018","Christmas 2018","Fourth of July 2019","Retro Ship Event 2019","Halloween 2019","Christmas 2019","Promotion","April Fools 2020","Fourth of July 2020","Retro Ship Event 2020","Halloween 2020","Black Friday 2020","Christmas 2020","Super Capital","Advanced","Miner","Freighter","Frigate","Destroyer","Cruiser","Battlecruiser","Battleship","Dreadnought","Carrier","Admin"];
//Array of pages to be removed from shipArr -- all non-ship pages
var unwantedNamesTypes = ["Ships","Tier List","All Ship","INVALID","Category"];
//General parser object used for parsing the requested pages
var parser = new DOMParser();

//Called to start executing all other functions
function startNavboxFill(){
	console.log("Checking if navbox fill can run...");
	if(canRun){
		console.log("Can run; Navbox fill started...");
		canRun = false;
		if(flag === 0) updateButtons();
		if(this.className !== undefined && this.className.includes("price")) sortBy = "price";
		else sortBy = "name";
		if(shipArr.length === 0){
			returnPage("Category:Ships",getNames,0); //load first 200 entries
			returnPage("Category:Ships?from=MRLS Launcher",getNames,0); //load remaining entries
			returnPage("Category:AI",getNames,0); //load AI class
			count = 0;
		}
		else cleanArr(); //if storedArr already exists in local storage and has filled shipArr, jump straight to general cleanup/sanitization and filling the navbox
	}
	else throw("Error: cannot start while already running or when canRun is false");
}
//Constructor for "ship" objects. Note that "class" is a reserved word and cannot be used for variables, so "type" is used instead
//Type is also used to designate the event a limited ship comes from
function Ship(name,price,type,isVIP,isRemoved){
    this.name = name;
    this.price = price;
    this.type = type;
    this.isVIP = isVIP;
    this.isRemoved = isRemoved;
}
//Runs the passed callback function on an XMLrequst object of the page in the "URL" parameter
function returnPage(url,cFunction,idx) {
	var xhttpS = new XMLHttpRequest();
    xhttpS.open("GET","https://roblox-galaxy-official.fandom.com/wiki/"+url,true); //only internal URLs are valid (prevent Same Origin Policy error or attempt to GET unwanted external page)
    xhttpS.send();
    xhttpS.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) cFunction(xhttpS,url,idx);
        else if(this.readyState == 4 && this.status == 404){
            shipArr[idx].name += " (INVALID - 404)";
            console.log("Warning: Invalid entry at "+idx+" (Error 404 -- Invalid URL)");
            cFunction(xhttpS,url,idx);
        } 
    };
}
//Fill shipArr with all ship names on the given (section) of the "Ships" category page; extraneous category members will be filtered later
function getNames(xhttp,url,idx) {
    flag = 1;
    updateButtons();
    var pg = parser.parseFromString(xhttp.responseText,"text/html");
    for(i = idx; i < pg.getElementsByClassName("category-page__member-link").length; i++){
        if(pg.getElementsByClassName("category-page__member-link")[i].getAttribute("title") !== undefined){
            shipArr.push(new Ship(pg.getElementsByClassName("category-page__member-link")[i].getAttribute("title"),"default","default","default","default"));
        }
    }
    count++;
    if(count >= 3){
        count = 0;
        cleanArr(); //only call next function if all requests have been processed (max list view length on category page is 200)
    } 
}
//sort out unwanted/duplicate elements for efficiency in xml requests by calling "cleanArr"
//loop through all elements in shipArr and use it to request/pass values for "fillPriceType"
function getPriceType(){
    for(i = 0; i < shipArr.length; i++){
        returnPage(shipArr[i].name,fillPriceType,i);
    }
    console.log("ALL SHIP PAGE XMLHTTPREQUESTS SENT");
}
//fill values in shipArr
function fillPriceType(xhttp,name,idx) {
	var p, t, v, r;
    if(shipArr[idx].name != "INVALID"){
        var pg = parser.parseFromString(xhttp.responseText,"text/html");
        //find price of the ship on the page using the infobox HTML
	p = Array.from(pg.getElementsByTagName("td")).find(function(obj){
		return obj.getAttribute("data-source") !== null && obj.getAttribute("data-source").includes("total_cost");
	});
	if(p === undefined) p = "N/A--"+name;
	else p = p.innerHTML;
	//use infobox HTML to get T/F value for "isVIP"
	v = Array.from(pg.getElementsByTagName("div")).find(function(obj){
		return obj.getAttribute("class") !== null && obj.getAttribute("class").includes("pi-data-value pi-font") && obj.parentElement.getAttribute("data-source") !== null && obj.parentElement.getAttribute("data-source").includes("vip_required");
	});
	if(v === undefined) v = false; //assume false if element is not present 
	else if(v.innerHTML.toLowerCase().includes("y")) v = true;
	else v = false;
	//use category bar to determine if ship is classified as removed
	r = Array.from(pg.getElementsByTagName("li")).find(function(obj){
		return obj.getAttribute("data-name") !== null && obj.getAttribute("data-name").includes("Removed From Game"); 
	});
	if(r === undefined) r = false; //assume false if element is not present 
	else r = true;
    //find type for organization based on the category bar on the bottom of the page-- breaks on first type -- determine which types have priority by position in 'types' var
    for(var k = 0; k < types.length; k++){
        for(j = 0; j < pg.getElementsByTagName("li").length; j++){
  		    if( pg.getElementsByTagName("li")[j].getAttribute("data-name") !== null && pg.getElementsByTagName("li")[j].getAttribute("data-name").includes(types[k]) ){
                t = types[k];
                break;
  		    }
        }
        if(t !== undefined) break;
    }
	if(t === undefined) t = "N/A--"+name;
	//fill object properties with page-fetched values
	if(shipArr[idx] === undefined) throw("Error while filling navbox: invalid shipArr entry at index "+idx+"|"+shipArr.length);
	shipArr[idx].price = p;
	shipArr[idx].type = t;
	shipArr[idx].isVIP = v;
	shipArr[idx].isRemoved = r;
    }
	count++;
    if(count == shipArr.length){
       console.log("SHIPARR ELEMENTS FILLED");
       cleanArr();
    }
    else console.log(count+" of "+shipArr.length+"|"+shipArr[idx].name+" (Index "+idx+")");
}
//sub-function called by cleanArr to remove values from shipArr
function remove(idx){
	console.log("REMOVED ITEM AT INDEX "+idx+": "+shipArr[idx].name+"|"+shipArr[idx].price+"|"+shipArr[idx].type);
	shipArr.splice(idx,1);
}
//removes and logs duplicates, unwanted items, and items with an invalid price
function cleanArr(){
    if(localStorage.getItem("storedArr") !== null && shipArr.length === 0){
        shipArr = JSON.parse(localStorage.getItem("storedArr"));
        count = shipArr.length;
    }
	console.log("STARTING DUPLICATE/INVALID FILTER");
	var x = shipArr.length;
	for(j = shipArr.length-1; j >= 0; j--){
            if(j < shipArr.length && (unwantedNamesTypes.some(function(str){ return shipArr[j].name.includes(str);}) || (count > 200 && unwantedNamesTypes.some(function(str){ return shipArr[j].type.includes(str);})))) remove(j);
		    else if(shipArr[j].price.toString().length === 0 || shipArr[j].price.toString().toLowerCase().includes("n/a--")) remove(j);
		    else if(shipArr[j].type.toString().length === 0 || shipArr[j].type.toString().toLowerCase().includes("n/a--")) remove(j);
		    for(i = shipArr.length-1; i >= 0; i--){
                if(j < shipArr.length && shipArr[j].name == shipArr[i].name && i != j) remove(j);
		    }
			if(j < shipArr.length){ //check if index is still valid after potential removals from above
			//limit each object property to only the expected values. Redundant call to toString in case a previous replace made variable type vague
				shipArr[j].name = shipArr[j].name.toString().replace(/[^a-zA-Z0-9\s\'\-ß]/g,""); //only letters, numbers, spaces, "-" (e.g. for "Prototype X-1")
				//price is cleaned separately later because of special cases
				shipArr[j].type = shipArr[j].type.toString().replace(/[^\sa-zA-Z0-9_]/g, ""); //only letters, numbers, spaces, and underscores
			}
	}
    if(shipArr.length === 0){
		canRun = true;
		restartFill();
    }  //if array is empty after clean, remove invalid array and retry XML calls; only retry once to prevent infinite loops
	console.log("Number of removed items: "+(x-shipArr.length));
    console.log("Final array size: "+shipArr.length+"|"+count);
	if(count < 200) getPriceType();
	else if(count > 200){
		console.log("Cleaning up prices...");
		//clean/format price for sorting
		for(i = 0; i < shipArr.length; i++){
			if(shipArr[i].type.includes("default")){
				canRun = true;
				restartFill();
			}
			if(shipArr[i].price.toString().toLowerCase().indexOf("or") > 0)shipArr[i].price = shipArr[i].price.substring(0,shipArr[i].price.toString().indexOf("or")); //cuts the price of ships with two prices to only use the first price (e.g Osiris)
			shipArr[i].price = shipArr[i].price.toString().replace(/[^0-9.]/g, ""); //only numbers and "."
			if(shipArr[i].price === "") shipArr[i].price = 0; //if replace step empties price, assign 0 as price (e.g. Wasp/Wyrm)
			if(shipArr[i].type.indexOf(" ") > 0) shipArr[i].type = shipArr[i].type.replace(/ /g,"_");
		}
        sortArr();
	}
}
function restartFill(){
	if(canRestart && canRun){
		canRestart = false;
		console.log("Invalid array or force refresh");
		shipArr = [];
		localStorage.removeItem("storedArr");
		localStorage.removeItem("lastUpdate");
		count = 0;
		startNavboxFill();
	}
	else if(canRun === false) console.log("Error: cannot restart while running");
	else{ //update buttons and throw an exception on multiple failures
		flag = 4;
        updateButtons();
	}
}
function sortArr(){
    if(sortBy === "price") shipArr.sort(function(a, b){return b.price - a.price}); //sort by ship price
	else shipArr.sort(function(a, b){ //sort by string property "name"
	    var x = b.name.toLowerCase();
        var y = a.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
	});
	if(shipArr.length > 200) localStorage.setItem("storedArr",JSON.stringify(shipArr)); //make sure shipArr is sanitized before storing?   //update localStorage with newly-sorted array
	fillNavbox();
}
//Outputs the ship array by replacing the inner content of the given html element.
function fillNavbox(){
    //if lastUpdate exists and is too old, refresh storedArr storage
    if(localStorage.getItem("lastUpdate") !== null){
        var update = new Date(Date.parse(JSON.parse(localStorage.lastUpdate)));
        if(update.getTime()+172800000 < new Date().getTime()){ //add length of time in milliseconds to "update.getTime" -- e.g. 172800000 ms = 2 days
            localStorage.removeItem("storedArr");
            localStorage.setItem("lastUpdate",JSON.stringify(new Date()));
            shipArr = [];
            flag = 1;
            startNavboxFill();
        } 
    }
    else localStorage.setItem("lastUpdate",JSON.stringify(new Date()));
	//remove and re-add storedArr on any call in case cleanArr() found and removed errors
	//create a "disposable" version of shipArr that can be spliced
    tempShipArr = JSON.parse(localStorage.getItem("storedArr"));
    //clear all targeted spans first so lists don't get doubled
    for(i = 0; i < document.getElementsByTagName("span").length; i++){
        for(j = 0; j < types.length; j++){
            if(document.getElementsByTagName("span")[i].id.replace(/_/g," ").includes("Nav"+types[j])){
            document.getElementsByTagName("span")[i].innerHTML = "";
            }
        }
    }
    //loop through shipArr and add ships
    for(i = tempShipArr.length-1; i >= 0; i--){
        var a, t;
        //Do not create a hyperlink if current page title equals the name of shipArr[i]
        t = Array.from(document.getElementsByTagName("h1")).find(function(obj){
		return obj.getAttribute("class") !== null && obj.getAttribute("class").includes("page-header__title");});
		
        if(t.innerHTML.toString() !== undefined && t.innerHTML.toString().toLowerCase() === tempShipArr[i].name.toLowerCase()){
            a = document.createElement('em');
            a.appendChild(document.createTextNode(tempShipArr[i].name));
            a.title = tempShipArr[i].name+" (Current Page)";
        }
        //else create a hyperlink
        else{
            //Link creation
            a = document.createElement('a');
			//manually replace displayed name of ships with replaced characters in URL
		    if(tempShipArr[i].name == "SS"){
                a.appendChild(document.createTextNode("ß"));
                a.href = "/wiki/"+tempShipArr[i].name;
                a.title = "ß";
            }
			//in the case of invalid/broken links, their presence should be obvious because all attributes use the same value
            else{
				a.appendChild(document.createTextNode(tempShipArr[i].name));
            	a.href = "/wiki/"+tempShipArr[i].name;
            	a.title = tempShipArr[i].name;
            }
			//VIP-only ships have a bold name and are indicated as such in the "title" attribute
            if(tempShipArr[i].isVIP == true){
                a.style.fontWeight = "bold";
                a.title += " (VIP-only)";
            }
            //VIP and Removed ships may stack (e.g. Sanguine), so no else-if; Removed ships have a strikethrough name
            if(tempShipArr[i].isRemoved == true){
                a.style.textDecoration = "line-through";
                a.title += " (Removed)";
            }
        }
        //Add ship/link to navbox
        if(document.getElementById("Nav"+tempShipArr[i].type) !== null){
           document.getElementById("Nav"+tempShipArr[i].type).appendChild(a);
           if(tempShipArr.some(function(obj,idx){ return obj.type == tempShipArr[i].type && i != idx; })) document.getElementById("Nav"+tempShipArr[i].type).innerHTML +=" • ";
        }
        else console.log("Ship not added: "+tempShipArr[i].name+". Invalid or missing category: "+tempShipArr[i].type);
        tempShipArr.splice(i,1);
    }
    if(sortBy == "price") flag = 2;
    else flag = 3;
    updateButtons();
	canRun = true;
	canRestart = true;
    console.log("SHIPARR OUTPUT COMPLETE");
}
//Add eventListeners to all <span> buttons in the array; update button innerHTML/text for different states of "flag"
function updateButtons(){
    var buttonArr = ["priceButton","nameButton"];
    document.getElementById("refresh").addEventListener("click", restartFill);
    document.getElementById("refreshL").addEventListener("click", restartFill);
    for(i = 0; i < buttonArr.length; i++){
        var arr = document.getElementsByClassName(buttonArr[i]);
        for(j = 0; j < arr.length; j++){
            switch(flag){
                case 0:
                    arr[j].addEventListener("click", startNavboxFill);
                    arr[j].addEventListener("mouseover", function(){ this.style.color = '#d6ad0b';});
                    arr[j].addEventListener("mouseout", function(){this.style.color = '#ffffff';});
                    break;
                case 1:
                    arr[j].style.cursor = "auto";
                    arr[j].innerHTML = "Loading, please wait...";
                    break;
                case 2:
                    if(i===0){
                        arr[j].innerHTML = "Ships by Price";
                        arr[j].style.cursor = "auto";
                    }
                    else{
                        arr[j].style.cursor = "pointer";
                        arr[j].innerHTML = "Sort Ships by Name";
                    } 
                    break;
                case 3:
                    if(i===0){
                        arr[j].innerHTML = "Sort Ships by Price";
                        arr[j].style.cursor = "pointer";
                    }
                    else{
                        arr[j].style.cursor = "auto";
                        arr[j].innerHTML = "Ships by Name";
                    } 
                    break;
                case 4:
                    arr[j].style.cursor = "auto";
                    arr[j].innerHTML = "Error loading";
            }
        }
        if(flag == 4) throw("Error while filling navbox: too many attempts");
    }
}
// DONT TOUCH THIS PAGE -SEAN
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
window.AjaxRCRefreshText = 'Auto-Refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';
window.ajaxPages = [
    "Special:RecentChanges",
    "Special:WikiActivity",
    "Special:UncategorizedPages",
    "Special:AllPages"
];
 
TBL_GROUP = "roblox-en";

/*ALL CODE BELOW (Lines 22-265) IS FOR AUTOMATIC SORTING OF THE SHIP NAVBOX: https://roblox-galaxy-official.fandom.com/wiki/Template%3AShipNavbox3
--Code written by Explodabat. Please contact me on the Wiki Discord at "Explodabat#3655" or on my message wall if you have any questions or issues
*/
//Array of ship objects -- see "function Ship(...)" for constructor & properties
var shipArr = [];
var count = 0;
var sortBy = "";
//if code has already run and set localStorage item, use that to fill shipArr
if(localStorage.getItem("storedArr") !== null){
    shipArr = JSON.parse(localStorage.getItem("storedArr"));
    count = shipArr.length;
} 
//String of valid category-based types (classes/events)
var types = ["Fighters","Hidden Event","Halloween 2016","Halloween 2017","Christmas 2017","Fourth of July 2018","Halloween 2018","Christmas 2018","Fourth of July 2019","Retro Ship Event","Halloween 2019","Christmas 2019","Promotion","April Fools 2020","Fourth of July 2020","Prototype","Super Capital","Advanced","Miner","Freighter","Frigate","Destroyer","Cruiser","Battlecruiser","Battleship","Dreadnought","Carrier","Admin"];
//String of pages to be removed from shipArr -- all non-ship pages
var unwantedNamesTypes = ["Ships","Tier List","Category"];
//General parser object used for parsing the requested pages
var parser = new DOMParser();
//initial state and call for updateButtons function
var flag = 0;
//run navbox fill code when navbox is opened
window.onhashchange = startNavboxFill;
//Add eventListeners to all <span> buttons in the array; update button innerHTML/text for different states of "flag"
function updateButtons(){
    var buttonArr = ["priceButton","nameButton"];
    document.getElementById("refresh").addEventListener("click", restartFill);
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
 
            }
        }
    }
}
//Called to start executing all other functions
function startNavboxFill(){
    if(flag === 0) updateButtons();
    if(this.className !== undefined && this.className.includes("price")) sortBy = "price";
    else sortBy = "name";
    if(shipArr.length === 0){
        returnPage("Category:Ships",getNames,0); //load first 200-odd entries
        returnPage("Category:Ships?from=Oblivion",getNames,0); //load remaining entries
        count = 0;
    }
    else cleanArr(); //if storedArr already exists in local storage and has filled shipArr, jump straight to general cleanup/sanitization and filling the navbox
}
//Constructor for "ship" objects. Note that "class" is a reserved word and cannot be used for variables, so "type" is used instead
//Type is also used to designate the event a limited ship comes from
function Ship(name,price,type){
    this.name = name;
    this.price = price;
    this.type = type;
}
//Runs the passed callback function on an XMLrequst object of the page in the "URL" parameter
function returnPage(url,cFunction,idx) {
	var xhttpS = new XMLHttpRequest();
    xhttpS.open("GET","https://roblox-galaxy-official.fandom.com/wiki/"+url,true); //only internal URLs are valid (prevent Same Origin Policy error or attempt to GET unwanted external page)
    xhttpS.send();
    xhttpS.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) cFunction(xhttpS,url,idx);
    };
}
//Fill shipArr with all ship names on the given (section) of the "Ships" category page; extraneous category members will be filtered later
function getNames(xhttp,url,idx) {
    flag = 1;
    updateButtons();
    var pg = parser.parseFromString(xhttp.responseText,"text/html");
    for(i = idx; i < pg.getElementsByClassName("category-page__member-link").length; i++){
        if(pg.getElementsByClassName("category-page__member-link")[i].getAttribute("title") !== undefined){
            shipArr.push(new Ship(pg.getElementsByClassName("category-page__member-link")[i].getAttribute("title"),"default","default"));
        }
    }
    if(shipArr.length > 200) cleanArr(); //only call next function if both requests have been processed (max list view length on category page is 200)
}
//sort out unwanted/duplicate elements for efficiency in xml requests by calling "cleanArr"
//loop through all elements in shipArr and use it to request/pass values for "fillPriceType"
function getPriceType(){
    for(i = 0; i < shipArr.length; i++){
        returnPage(shipArr[i].name,fillPriceType,i);
    }
    console.log("SHIP PAGE XMLHTTPREQUESTS COMPLETE");
}
//fill values in shipArr
function fillPriceType(xhttp,name,idx) {
	var p, t;
    var pg = parser.parseFromString(xhttp.responseText,"text/html");
    //find price of the ship on the page using the infobox HTML
	p = Array.from(pg.getElementsByTagName("td")).find(function(obj){
		return obj.getAttribute("data-source") !== null && obj.getAttribute("data-source").includes("total_cost_");
	});
	if(p === undefined) p = "N/A--"+name;
	else p = p.innerHTML;
    //find type based on the category bar on the bottom of the page-- breaks on first type -- determine which types have priority by position in 'types' var
    for(var k = 0; k < types.length; k++){
        for(var j = 0; j < pg.getElementsByTagName("li").length; j++){
  		    if( pg.getElementsByTagName("li")[j].getAttribute("data-name") !== null && pg.getElementsByTagName("li")[j].getAttribute("data-name").includes(types[k]) ){
                t = types[k];
                break;
  		    }
        }
        if(t !== undefined) break;
    }
	if(t === undefined) t = "N/A--"+name;
	//fill object properties with page-fetched values
	shipArr[idx].price = p;
	shipArr[idx].type = t;
	count++;
    if(count == shipArr.length){
       console.log("SHIPARR ELEMENTS FILLED");
       cleanArr();
    }
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
				shipArr[j].name = shipArr[j].name.toString().replace(/[^a-zA-Z0-9\s-]/g,""); //only letters, numbers, spaces, and "-" (e.g. for "Prototype X-1")
				//price is cleaned separately later because of special cases
				shipArr[j].type = shipArr[j].type.toString().replace(/[^\sa-zA-Z0-9_]/g, ""); //only letters, numbers, spaces, and underscores
			}
	}
    if(shipArr.length === 0) restartFill(); //if array is empty after clean, remove invalid array and retry XML calls
	console.log("Number of removed items: "+(x-shipArr.length));
    console.log("Final array size: "+shipArr.length+"|"+count);
	if(count < 200) getPriceType();
	else if(count > 200){
		console.log("Cleaning up prices...");
		//clean/format price for sorting
		for(i = 0; i < shipArr.length; i++){
			if(shipArr[i].type.includes("default")) restartFill();
			if(shipArr[i].price.toString().toLowerCase().indexOf("or") > 0)shipArr[i].price = shipArr[i].price.substring(0,shipArr[i].price.toString().indexOf("or")); //cuts the price of ships with two prices to only use the first price (e.g Osiris)
			shipArr[i].price = shipArr[i].price.toString().replace(/[^0-9.]/g, ""); //only numbers and "."
			if(shipArr[i].price === "") shipArr[i].price = 0; //if replace step empties price, assign 0 as price (e.g. Wasp/Wyrm)
			if(shipArr[i].type.indexOf(" ") > 0) shipArr[i].type = shipArr[i].type.replace(/ /g,"_");
		}
        sortArr();
	}
}
function restartFill(){
	console.log("invalid array or force refresh");
	shipArr = [];
	localStorage.removeItem("storedArr");
	localStorage.removeItem("lastUpdate");
	count = 0;
    startNavboxFill();
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
    tempShipArr = JSON.parse(localStorage.getItem("storedArr"))
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
        //Link creation
        var a = document.createElement('a');
		//in the case of invalid/broken links, their presence should be obvious because all attributes use the same value
        a.appendChild(document.createTextNode(tempShipArr[i].name));
        a.title = tempShipArr[i].name;
        a.href = "/wiki/"+tempShipArr[i].name;
        //Add link to navbox
        document.getElementById("Nav"+tempShipArr[i].type).appendChild(a);
        if(tempShipArr.some(function(obj,idx){ return obj.type == tempShipArr[i].type && i != idx; })) document.getElementById("Nav"+tempShipArr[i].type).innerHTML +=" • ";
        tempShipArr.splice(i,1);
    }
    if(sortBy == "price") flag = 2;
    else flag = 3;
    updateButtons();
    console.log("SHIPARR OUTPUT COMPLETE");
}
/* Any JavaScript here will be loaded for all users on every page load. */
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';
/* Auto-refreshing recent changes */
ajaxPages = ["Special:Watchlist","Special:Log","Special:Contributions"];
AjaxRCRefreshText = 'Auto-refresh';
AjaxRCRefreshHoverText = 'Automatically refresh the page';

/*
* Test if an element has a certain class
* Description: Uses regular expressions and caching for better performance.
* Taken from Wikipedia's Common.js.
*/

var hasClass = (function () {
	var reCache = {};
	return function (element, className) {
		return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
	};
})();

/*
* Collapsible tables
* Description: Allows tables to be collapsed, showing only the header. See [[Wikipedia:NavFrame]].
* Taken from Wikipedia's Common.js.
*/
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";

function collapseTable(tableIndex) {
	var Button = document.getElementById("collapseButton" + tableIndex);
	var Table = document.getElementById("collapsibleTable" + tableIndex);
	if(!Table || !Button)
		return false;
	var Rows = Table.rows;
	if(Button.firstChild.data == collapseCaption) {
		for (var i = 1; i < Rows.length; i++)
			Rows[i].style.display = "none";
		Button.firstChild.data = expandCaption;
	} else {
		for(var i = 1; i < Rows.length; i++)
			Rows[i].style.display = Rows[0].style.display;
		Button.firstChild.data = collapseCaption;
	}
}

function createCollapseButtons() {
	var tableIndex = 0;
	var NavigationBoxes = new Object();
	var Tables = document.getElementsByTagName( "table" );
	for(var i = 0; i < Tables.length; i++)
		if(hasClass( Tables[i], "collapsible")) {
			var HeaderRow = Tables[i].getElementsByTagName("tr")[0];
			if(!HeaderRow)
				continue;
			var Header = HeaderRow.getElementsByTagName("th")[0];
			if(!Header)
				continue;
			NavigationBoxes[tableIndex] = Tables[i];
			Tables[i].setAttribute("id", "collapsibleTable" + tableIndex);
			var Button = document.createElement("span");
			var ButtonLink = document.createElement("a");
			var ButtonText = document.createTextNode(collapseCaption);
			Button.style.styleFloat = "right";
			Button.style.cssFloat = "right";
			Button.style.fontWeight = "normal";
			Button.style.textAlign = "right";
			Button.style.width = "6em";
			ButtonLink.style.color = Header.style.color;
			ButtonLink.setAttribute("id", "collapseButton" + tableIndex);
			ButtonLink.setAttribute("href", "javascript:collapseTable(" + tableIndex + ");");
			ButtonLink.appendChild(ButtonText );
			Button.appendChild(document.createTextNode("["));
			Button.appendChild(ButtonLink);
			Button.appendChild(document.createTextNode("]"));
			Header.insertBefore(Button, Header.childNodes[0]);
			tableIndex++;
		}
	for(var i = 0; i < tableIndex; i++)
		if(hasClass(NavigationBoxes[i], "collapsed") || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], "autocollapse")))
			collapseTable(i);
}
$(createCollapseButtons);

/*
This function returns the color, based on the Pokémon type. It is used on numerous templates.
*element_class: the type of the color.
@return: the color of the asked type. If the type is not defined in this function, it returns
	the teal (#9DC1B7) color.
*/
function poke_type(element_class){
    var color;
    switch(element_class) {
        case "Bug":
            color = "#CEDE48"; break;

        case "Dark":
            color = "#A2958D"; break;

        case "Dragon":
            color = "#9F77FF"; break;

        case "Electric":
            color = "#F9DA5F"; break;

        case "Fairy":
            color = "#FEA3E8"; break;

        case "Fighting":
            color = "#E5524A"; break;

        case "Flying":
            color = "#CEBFFB"; break;

        case "Fire":
            color = "#F08030"; break;

        case "Ghost":
            color = "#A18DC4"; break;

        case "Grass":
            color = "#77DD77"; break;

        case "Ground":
            color = "#FFDE85"; break;

        case "Ice":
            color = "#BCE6E6"; break;

        case "Normal":
            color = "#C6C6A7"; break;

        case "Poison":
            color = "#DC80DD"; break;

        case "Psychic":
            color = "#F99CB8"; break;

        case "Rock":
            color = "#D1C17D"; break;

        case "Steel":
            color = "#D1D1E0"; break;

        case "Water":
            color = "#9BB8FE"; break;

		// ??? type
        default:
            color = "#9DC1B7";
    }

    return color;
}

/* This function checks if element exists in page. This is used in code branching, so to avoid
	JavaScript from breaking with undefined statements.
*elem: the name of the element, reached through a query selector.
@ return: true or false.
*/
function check_element_exists(elem) { return document.body.contains(document.querySelector(elem)); }

/* This function enables other JavaScript functions to be loaded after the entire page is loaded.
*fun: the name of the JavaScript function.
*timeout: defines when the script is loaded. This is used when some of the page's scripts,
	like tabbers, need to be loaded first, to avoid JavaScript from breaking, which takes time.
	It is initially set to 0, for scripts that can be loaded right away.
	This is an optional parameter.
@ return: N/A.
*/
function page_load(fun){ this(fun, 0); }
function page_load(fun, timeout){
	timeout > 0
		? setTimeout(fun, timeout)
		: window.addEventListener("load", fun);
}

/* This compares two colors of a Pokémon's type. This is used to color templates, to determine
	a primary and a secondary color for a template, for some Pokémon have only one type. If the
	colors are different, the function returns an array with a primary and a secondary color,
	corresponding to the type (in that order), otherwise it returns an array with two colors: a
	primary color element indexed as 0 and 1.
*class_list: the class of the element that contains types.
@ return: an array with two color codes.
*/
function type_compare(class_list){
	return (class_list.length > 2 && class_list[1] !== class_list[2])
		? [poke_type(class_list[1]), poke_type(class_list[2])]
		: [poke_type(class_list[1]), poke_type(class_list[1])];
}

/* This function is used only for Movebox template. It takes the css class to paint borders and backgrounds. */
var movebox_str = ".movebox";

var movebox_function = function(){
	if(check_element_exists(movebox_str) !== false){
	    // Get class for color
	    var movebox = document.querySelectorAll(movebox_str);

	    for(var i = 0; i < movebox.length; i++) {
		    var movebox_class = movebox[i].classList;
		    var movebox_colors = type_compare(movebox_class);
		    var movebox_table = movebox[i].querySelector(movebox_str + " table");
		    var movebox_table_header = movebox[i].querySelectorAll(movebox_str + " table th");
		    var movebox_cell = movebox[i].querySelectorAll(movebox_str + " table td");

		    // Apply colors to borders and background
		    movebox[i].style.border = "1px solid " + movebox_colors[0];
		    movebox_table.style.border = "1px solid " + movebox_colors[0];

		    for(var j = 0; j < movebox_table_header.length; j++)
		    	movebox_table_header[j].style.background = movebox_colors[1];
	
		    for(var k = 0; k < movebox_cell.length; k++)
		        movebox_cell[k].style.borderColor = movebox_colors[0];
	    }
    }
};
page_load(movebox_function, 5000);
/*
	JS: The following functions contains the Javascript logic
	used by the Item Finder page.
*/

/*
    Contains the functions to help managing the html DOM
*/
function htmlHelpers(){
 
    /*
        Gets the Input number value
    */
    function getNumberValue(inputId){
        var element = $('#' + inputId);
 
        if(element){
            return Number(element.val());    
        }
 
        return 0;
    }
 
    /*
        Gets the Input or Select text value
    */
    function getTextValue(inputId){
        var element = $('#' + inputId);
 
        if(element){
            return element.val();
        }
 
        return "";
    }
 
    /*
        Sets the Text inside an element
    */
    function setText(elementId, text){
        var element = $('#' + elementId);
 
        if(element){
            element.text(text);
        }
    }
 
    /*
        Sets Html inside an element
    */
    function setHtml(elementId, html){
        var element = $('#' + elementId);
 
        if(element){
            element.html(html);
        }
    }
 
    return {
        "getNumberValue":   getNumberValue,
        "getTextValue":     getTextValue,
        "setText":          setText,
        "setHtml":          setHtml
    };
}

function itemFinder(itemFinderId){
    
    var htmlDOM = htmlHelpers();
    
    function find(){
        return null;
    }
    
    function draw(){
        htmlDOM.setHtml(itemFinderId,'<div class="item-finder">\
	<div class="item-finder-row">\
		<select>\
			<option value="All">- Item Rarity -</option>\
			<option value="Uber">Uber</option>\
			<option value="Uber">Pro</option>\
		</select>\
		<select>\
			<option value="all">- Item Slot -</option>\
			<option value="helmet">Helmet</option>\
			<option value="cape">Cape</option>\
			<option value="armor">Armor</option>\
			<option value="pauldrons">Pauldrons</option>\
			<option value="weapon">Weapon</option>\
			<option value="gauntlets">Gauntlets</option>\
			<option value="ring">Ring</option>\
			<option value="belt">Belt</option>\
			<option value="boots">Boots</option>\
		</select>\
		<div/>\
		<div/>\
	</div>\
	<div class="item-finder-row">\
		<select>\
			<option value="all">- Perk Type -</option>\
			<option value="helmet">General</option>\
			<option value="cape">Raid</option>\
			<option value="armor">Damage</option>\
			<option value="pauldrons">Resistance</option>\
			<option value="unit">Unit Boost</option>\
			<option value="unit-health">•  Unit Health Boost</option>\
			<option value="unit-damage">•  Unit Damage Boost</option>\
			<option value="gauntlets">Spell Boost</option>\
			<option value="ring">Weapon Strike effect</option>\
			<option value="belt">Pal Boost</option>\
			<option value="boots">Aura</option>\
			<option value="boots">Other</option>\
		</select>\
		<select>\
			<option value="all">- Perk Name -</option>\
		</select>\
		<input type="text" placeholder="Search by Item here..." style="flex: 1 1 0;">\
			<div>\
				<input type="button" value="Search">\
				</div>\
			</div>\
		</div>');
    }
    
    return {
        "draw":     draw,
		"find":     find
	};
}

var itemFinder = itemFinder('item-finder');
itemFinder.draw();
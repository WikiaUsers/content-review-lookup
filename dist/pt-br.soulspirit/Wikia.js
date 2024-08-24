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

/* This function is used only for SpriteGallery template. It takes the css class to paint borders and backgrounds. */
var sprite_gallery_str = ".sprite-gallery";

var sprite_gallery_function = function() {
    if(check_element_exists(sprite_gallery_str) !== false){
    	// Get class for color
        var sprite_gallery_class = document.querySelector(sprite_gallery_str).classList;
        var sprite_gallery_colors = type_compare(sprite_gallery_class);
        var sprite_gallery_images = document.querySelectorAll(sprite_gallery_str + " .gallery-image-wrapper");
		var sprite_gallery_display = document.querySelectorAll(sprite_gallery_str + " .tabbertab");
		var sprite_gallery_menutab = document.querySelectorAll(sprite_gallery_str + " .tabbernav > li");
		var sprite_gallery_tabbernav = document.querySelector(sprite_gallery_str + " .tabbernav");

		// Color the gallery image's area and border
        for(var i = 0; i < sprite_gallery_images.length; i++){
            sprite_gallery_images[i].style.background = sprite_gallery_colors[0];
            sprite_gallery_images[i].style.borderColor = sprite_gallery_colors[1];
        }

		// If there are tabs without a single image, they can be hidden
        for(var j = 0; j < sprite_gallery_display.length; j++){
        	if(sprite_gallery_display[j].children.length === 1)
        		sprite_gallery_menutab[j].style.display = "none";
        	else
        		sprite_gallery_display[j].style.borderColor =
        			sprite_gallery_colors[1];
        }

		// Color the image's tabber borders
		sprite_gallery_tabbernav.style.borderBottom = "1px solid "
			+ sprite_gallery_colors[0];
    }
};
page_load(sprite_gallery_function, 5000);

/* This function is used only for Trainer's Pokémon template. It takes the css class to paint backgrounds. */
var char_poke_str = ".char-poke";

var char_poke_function = function() {
	if(check_element_exists(char_poke_str)){
		var char_poke = document.querySelectorAll(char_poke_str);
		var char_poke_class;

		for(var i = 0; i < char_poke.length; i++){
	    	char_poke_class = char_poke[i].classList;
	    	char_poke_colors = type_compare(char_poke_class);

    		char_poke[i].style.background = "linear-gradient(" +
    			char_poke_colors[0] + ", " + char_poke_colors[1] + ")";
		}
	}
};
page_load(char_poke_function);

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

/* This function is used only for Masters Character Pokémon template. It takes the css class to
	paint borders and backgrounds. */
var masters = ".masters-pokemon";

var masters_pokemon_function = function() {
	if(check_element_exists(masters) !== false){
	    // Get class for color
	    var masters_element = document.querySelectorAll(masters);
	    var masters_header = document.querySelectorAll(masters + " center");
	    var masters_image = masters + " .floatright";
	    var masters_image_test;

	    for(var i = 0; i < masters_element.length; i++){
	        masters_colors = type_compare(masters_element[i].classList);
	        masters_image_test = check_element_exists(masters_image)
	        	? document.querySelectorAll(masters_image)
	        	: false;

			// If the image exists, it is colored with a radial gradient
            if(masters_image_test !== false){
	            if(masters_colors[0] !== masters_colors[1])
	            	masters_image_test[i].style.background =
	            		"radial-gradient(" + masters_colors[1]
	            		+ ", transparent, " + masters_colors[0] + ")";
	        
				// If a character's Pokémon has one type, only one color is used
		        else
	            	masters_image_test[i].style.background =
	            		"radial-gradient(transparent, " + masters_colors[0] + ")";
	        }

	        masters_element[i].style.borderColor = masters_colors[0];
	        masters_header[i].style.background = masters_colors[1];
	    }
	}
};
page_load(masters_pokemon_function);


/* This function is used only for PokédexEntry template. It colorizes the borders. */
var pokedex_entry = ".pokedex-entry";

var pokedex_entry_function = function() {
	if(check_element_exists(pokedex_entry) !== false){
	    // Get class for color
	    var pokedex = document.querySelectorAll(pokedex_entry);
	    var pokedex_list = document.querySelector(pokedex_entry + " ul");
	    var pokedex_list_element = document.querySelectorAll(pokedex_entry + " ul li");
	    var pokedex_colors;

	    for(var i = 0; i < pokedex.length; i++){
	    	pokedex_colors = type_compare(pokedex[i].classList);
	    	pokedex_list.style.borderColor = pokedex_colors[0];

	    	for(var j = 0; j < pokedex_list_element.length; j++)
	    		pokedex_list_element[j].style.borderBottomColor = pokedex_colors[1];
		}
	}
};
page_load(pokedex_entry_function);
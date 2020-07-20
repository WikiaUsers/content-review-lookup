// Function to check if element exists in page
function check_element_exists(elem) { return document.body.contains(document.querySelector(elem)); }

// Function to get the Pokémon type from class and return the color
function poke_type(element_class){
    var color = "#CCC";
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
            color = "#D878D8"; break;

        case "Psychic":
            color = "#F99CB8"; break;

        case "Rock":
            color = "#D1C17D"; break;

        case "Steel":
            color = "#D1D1E0"; break;

        case "Water":
            color = "#9BB8FE"; break;

        case "???":
            color = "#9DC1B7"; break;
    }

    return color;
}

// After all scripts of the page are loaded (like tabber)
function window_load(fun){
    window.addEventListener("load", fun);
}

/* Movebox template */
var movebox_str = ".movebox";

if(check_element_exists(movebox_str) !== false){
    
    var movebox_function = function(){
    // Get class for color
    var movebox = document.querySelector(movebox_str);
    var movebox_prim_color = poke_type(movebox.className.split(" ")[0]);
    var movebox_sec_color = poke_type(movebox.className.split(" ")[1]);

    // If no secondary type
    if(movebox_sec_color.match("#CCC"))
         movebox_sec_color = movebox_prim_color;

    // Apply colors to borders and background
    movebox.style.borderColor = movebox_prim_color;

    var movebox_slideshow_str = movebox_str + " .wikia-slideshow";
    if(check_element_exists(movebox_slideshow_str) !== false){
        var movebox_sliders = Array.from(document.querySelectorAll(movebox_slideshow_str));
        var movebox_tabber = Array.from(document.querySelectorAll(movebox_str + " .tabbertab"));

        for(var i = 0; i < movebox_sliders.length; i++){
            movebox_sliders[i].style.background = "linear-gradient(" + movebox_prim_color + "," + movebox_sec_color + ")";
            movebox_sliders[i].style.border = "1px solid " + movebox_prim_color;

            if(check_element_exists(movebox_str + " .tabbertab") !== false){
                movebox_tabber[i].style.borderColor = movebox_prim_color;
  
                    if(movebox_prim_color === movebox_sec_color)
                        movebox_tabber[i].style.marginBottom = "1px";
            }
        }
    }

    var movebox_table_header = Array.from(document.querySelectorAll(movebox_str + " table th"));
    for(var i = 0; i < movebox_table_header.length; i++)
        movebox_table_header[i].style.background = movebox_sec_color;

    var movebox_cell = Array.from(document.querySelectorAll(movebox_str + " table td"));
    for(var j = 0; j < movebox_cell.length; j++)
        movebox_cell[j].style.borderColor = movebox_prim_color;

    document.querySelector(movebox_str + " table").style.borderColor = movebox_prim_color;

    var movebox_tabbernav_str = movebox_str + " .tabbernav";
    if(check_element_exists(movebox_tabbernav_str) !== false)
        document.querySelector(movebox_tabbernav_str).style.borderBottomColor = movebox_prim_color;
    };
}

window_load(movebox_function);

/* Evolution */
var evolution_str = ".evolution > center";

if(check_element_exists(evolution_str) !== false){
    var evolution_gallery = Array.from(document.querySelectorAll(evolution_str));

    // Replace arrows
    for(var i = 0; i < evolution_gallery.length; i++)
        evolution_gallery[i].innerHTML = "→";
}

/* Sprite gallery */
var sprite_gallery_str = ".sprite-gallery";

window.addEventListener("load", function() {
    if(check_element_exists(sprite_gallery_str) !== false){
        // Get types
        var sprite_gallery = document.querySelector(sprite_gallery_str);
        var sprite_gallery_prim_color = poke_type(sprite_gallery.className.split(" ")[0]);
        var sprite_gallery_sec_color = poke_type(sprite_gallery.className.split(" ")[1]);

        // If no secondary type
        if(sprite_gallery_sec_color.match("#CCC"))
             sprite_gallery_sec_color = sprite_gallery_prim_color;

        document.querySelector(sprite_gallery_str + " .tabbernav").style.borderBottom = "1px solid " + sprite_gallery_sec_color;

        var sprite_gallery_images = Array.from(document.querySelectorAll(sprite_gallery_str + " .gallery-image-wrapper"));

        for(var i = 0; i < sprite_gallery_images.length; i++){
            sprite_gallery_images[i].style.background = sprite_gallery_prim_color;
            sprite_gallery_images[i].style.borderColor = sprite_gallery_sec_color;
        }

        var sprite_gallery_border = Array.from(document.querySelectorAll(sprite_gallery_str + " .tabbertab"));
        for(var j = 0; j < sprite_gallery_border.length; j++)
            sprite_gallery_border[j].style.borderColor = sprite_gallery_sec_color;
    }
});

/* Pokédex entry */
var pokedex_entry_str = ".pokedex_entry";

if(check_element_exists(pokedex_entry_str) !== false){
    var element_p, element_span, height, code;
    var pokedex_entry = Array.from(document.querySelectorAll(pokedex_entry_str));

    for(var i = 0; i < pokedex_entry.length; i++) {
        element_p = Array.from(document.querySelectorAll(pokedex_entry_str + " li p"));
        element_span = Array.from(document.querySelectorAll(pokedex_entry_str + " li span"));
    
        for(var j = 0; j < element_p.length; j++) {
            height = element_p[j].offsetHeight + "px";
            element_span[j].style.lineHeight = height;
    
            code = element_span[j].innerHTML;
    
            switch (code){
                case "Red and Blue":
                    element_span[j].style.background = "linear-gradient(#F11, #11F)"; element_span[j].style.color = "white"; break;
    
                case "Yellow":
                    element_span[j].style.background = "yellow"; break;
    
                case "Gold":
                    element_span[j].style.background = "#DAA520"; break;
    
                case "Silver":
                    element_span[j].style.background = "#C0C0C0"; break;
    
                case "Crystal":
                    element_span[j].style.background = "#4FD9FF"; break;
    
                case "Ruby":
                    element_span[j].style.background = "#DC143C"; element_span[j].style.color = "white"; break;
    
                case "Sapphire":
                    element_span[j].style.background = "#0000CD"; element_span[j].style.color = "white"; break;
    
                case "FireRed":
                    element_span[j].style.background = "#FF7327"; break;
    
                case "LeafGreen":
                    element_span[j].style.background = "#00DD00"; break;
    
                case "Emerald":
                    element_span[j].style.background = "#00A000"; element_span[j].style.color = "white"; break;
    
                case "Diamond":
                    element_span[j].style.background = "#6495ED"; break;
    
                case "Pearl":
                    element_span[j].style.background = "#FFAAAA"; break;
    
                case "Platinum":
                    element_span[j].style.background = "#808080"; element_span[j].style.color = "white"; break;
    
                case "HeartGold":
                    element_span[j].style.background = "#BC9E00"; break;
    
                case "SoulSilver":
                    element_span[j].style.background = "#E1E1E1"; break;
    
                case "Black":
                    element_span[j].style.background = "black"; element_span[j].style.color = "white"; break;
    
                case "White":
                    element_span[j].style.background = "white"; break;
    
                case "Black 2":
                    element_span[j].style.background = "#555"; element_span[j].style.color = "white"; break;
    
                case "White 2":
                    element_span[j].style.background = "#ddd"; break;
    
                case "X":
                    element_span[j].style.background = "#005E9C"; element_span[j].style.color = "white"; break;
    
                case "Y":
                    element_span[j].style.background = "#D12A43"; element_span[j].style.color = "white"; break;
    
                case "Omega Ruby":
                    element_span[j].style.background = "#8B0000"; element_span[j].style.color = "white"; break;
    
                case "Alpha Sapphire":
                    element_span[j].style.background = "#00008B"; element_span[j].style.color = "white"; break;
    
                case "Sun":
                    element_span[j].style.background = "#FFA500"; break;
    
                case "Moon":
                    element_span[j].style.background = "#1E90FF"; break;
    
                case "Ultra Sun":
                    element_span[j].style.background = "linear-gradient(#FFA500, black)"; element_span[j].style.color = "white"; break;
    
                case "Ultra Moon":
                    element_span[j].style.background = "linear-gradient(#1E90FF, black)"; element_span[j].style.color = "white"; break;
    
                case "Let's Go Pikachu":
                    element_span[j].style.background = "#FFD733"; break;
    
                case "Let's Go Eevee":
                    element_span[j].style.background = "brown"; element_span[j].style.color = "white"; break;
    
                case "Sword":
                    element_span[j].style.background = "#0EBFE9"; break;
    
                case "Shield":
                    element_span[j].style.background = "#CB2241"; break;
            }
        }
    }
}
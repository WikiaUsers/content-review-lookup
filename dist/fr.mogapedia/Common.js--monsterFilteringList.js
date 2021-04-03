/* Any JavaScript here will be loaded for all users on every page load. */
$('.grid-filter-container li a').attr('title', '');

// Filtre par taille
$('.grid-filtering-monsters .grid-filter-select-size').html(
    '<select>'+
    '<option value="all" selected>Tout</option>'+
    '<option value="small">Petits monstres</option>'+
    '<option value="big">Grands monstres</option>'+
    '</select>'
)
.mouseup(function() {
    sizeFiltering();
});

// Filtre par espèce
$('.grid-filtering-monsters .grid-filter-select-species').html(
    '<select>'+
    '<option value="Tout">Tout</option>'+
    '<option value="Herbivore">Herbivore</option>'+
    '<option value="Lynien">Lynien</option>'+
    '<option value="Drake ailé">Drake ailé</option>'+
    '<option value="Neopteron">Neopteron</option>'+
    '<option value="Carapaceon">Carapaceon</option>'+
    '<option value="Temnoceran">Temnoceran</option>'+
    '<option value="Amphibien">Amphibien</option>'+
    '<option value="Leviathan">Leviathan</option>'+
    '<option value="Bête à crocs">Bête à crocs</option>'+
    '<option value="Wyverne volante">Wyverne volante</option>'+
    '<option value="Wyverne rapace">Wyverne rapace</option>'+
    '<option value="Wyverne de terre">Wyverne de terre</option>'+
    '<option value="Wyverne à crocs">Wyverne à crocs</option>'+
    '<option value="Wyverne aquatique">Wyverne aquatique</option>'+
    '<option value="Wyverne serpent">Wyverne serpent</option>'+
    '<option value="Dragon ancien">Dragon ancien</option>'+
    '<option value="Relique">Relique</option>'+
    '<option value="???">???</option>'+
    '<option value="Inclassable">Inclassable</option>'+
    '</select>'
)
.mouseup(function() {
    listFiltering();
});

// Filtre par nom
$('.grid-filtering-monsters .grid-filter-search').html(
     '<input type="search" name="q" placeholder="Rechercher..."/>'
)
.keyup(function() {
    listFiltering();
});

// Affichage du nom du monstre
$('.grid-filter-container img').hover(
    function() {
        $('.monster-name', $(this).parents('li')).css({'opacity': '1', 'z-index': '99'});
    }, 
    function() {
        $('.monster-name', $(this).parents('li')).css({'opacity': '0', 'z-index': '-1'});
    }      
);

// Filtrage des monstres
function listFiltering () {
    var filterSpecies = $('.grid-filter-select-species select').find(':selected').text()
    var filterName = $('.grid-filter-search input').val().trim();
    var list = $('.grid-filter-container li');
    var regex = new RegExp(filterName.toLowerCase(),"g");
    
    for (i=0;i<list.length;i++) {
        var name = $('.monster-name', list[i]).text();
        var species = $('.monster-species', list[i]).text();
        
        if (name.toLowerCase().match(regex)) {
            if (filterSpecies == species || filterSpecies == "Tout") {
                $(list[i]).removeClass('grid-filtered');
            }
            else {
                $(list[i]).addClass('grid-filtered');
            }
        } 
        else {
            $(list[i]).addClass('grid-filtered');
        }
    }
}

// Filtrage par taille des monstres
function sizeFiltering () {
    var filterSize = $('.grid-filter-select-size select').find(':selected').text()
    // var filterName = $('.grid-filter-search input').val();
    // var list = $('.grid-filter-container ul');
    //var regex = new RegExp(filterName.toLowerCase(),"g");
    console.log('action: size filtering '+filterSize);
    
    switch (filterSize) {     
        case 'Tout':
            $('ul#small').css({'display': 'block'});
            $('ul#big').css({'display': 'block'});
            break;

        case 'Petits monstres':
            $('ul#small').css({'display': 'block'});
            $('ul#big').css({'display': 'none'});
            break;

        case 'Grands monstres':
            $('ul#small').css({'display': 'none'});
            $('ul#big').css({'display': 'block'});
            break;
    }
}
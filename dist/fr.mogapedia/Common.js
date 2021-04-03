/* Tout JavaScript ici sera chargé avec chaque page accédée par n’importe quel utilisateur. */

// Les imports locaux sont faits sur la page "MediaWiki:ImportJS"

/* Tags utilisateurs (admins principalement) */
window.UserTagsJS = {
    modules: {},
    tags: {
        o: { u: 'Onii-san'},//Tag Bllob (cf. Dysmea pour l'origine)
        art: {u: 'Direction artistique'},
        news: {u: 'Informateur MH'},
        discord : {u: 'Admin Moga Discord'},
        bot : {u: 'Robot domestiqué'},
        film: {u: 'Cinéaste'},

        //Personnalisation par Houmgaor
        hunt_staff: { u: 'Hunter Programmeur'},
            
        //Tags spécial Krow - MH4U
        k: { u: 'KrowMixor'},
        m: { u: 'Krow_Quality'},
                
        //Tag anciens admins
        afk: { u: 'En vacances'},
            
    },
};
UserTagsJS.modules.custom = {
     
     //Tags admin
     'Bllob': ['o'],
     'Dysmea': ['art','discord'],
     'Houmgaor' : ['hunt_staff', 'discord'],
     'Hutskuchi' : ['news', 'discord'],
         
     //Tags particuliers
     'Hunter-Krow': ['k'],
     'HoumgaBot': ['bot'],
     'HutskuBot': ['bot'],
     'Mr.pyro01': ['film'],
         
     //Admins retraités
     'Shin-itchi': ['afk'],
     'Wrondral' : ['afk'],
     'BadBart86' : ['afk'],
     'Non0w' : ['afk'],
};

/****************************** MonsterNavigationTabs *************************/

var tabId = $('.monster-tabs li.selected').attr('data-tab');
console.log(tabId);
$('#monsterNavigationTabs').nextAll().appendTo('.monster-content div[data-tab='+ tabId +']');
$('.monster-content div[data-tab='+ tabId +']').addClass('selected');

$('.monster-tabs a').replaceWith(function(){
    return $('<strong/>').append($(this).contents());
});

$('.monster-tabs li').click( function () {
    element = $(this);
    $('.monster-tabs li').removeClass('selected');
    element.addClass('selected');
    
    $('.monster-content div').removeClass('selected');
    $('.monster-content div[data-tab='+ element.attr('data-tab') +']').addClass('selected');
    
    if ($('.monster-content div[data-tab="'+ element.attr('data-tab') +'"]').children().length === 0) {
        $.ajax({
            url: 'http://fr.mogapedia.wikia.com/api.php',
            data: {
                'format': 'json',
                'action': 'parse',
                'page': element.attr('data-page'),
                'prop': 'text',
            },
            dataType: 'json',
            type: 'GET',
            cache: false,
        }).done(function (data){ 
            $('.monster-content div[data-tab="'+ element.attr('data-tab') +'"]').append(data.parse.text['*']);
            $('.monster-content div[data-tab="'+ element.attr('data-tab') +'"] #monsterNavigationTabs').remove();
        });
    }    
});

/****************************** CollapsibleRow ********************************/

mw.hook('wikipage.content').add(function() {
    $('.show-collapsible-row').off( "click" );
    $('.show-collapsible-row').click(
        function () {
            console.log("click");
            if ($(this).next().hasClass('collapsed-row')) {
                $(this).next().removeClass('collapsed-row');
            }
            else {
                $(this).next().addClass('collapsed-row');
            }
        });
});

/****************************** Thème de tableau ******************************/

var wikiaPath = 'http://fr.mogapedia.wikia.com/wiki/';
var overlay = '<div class="overlay"></div>';
 
$('.hovered-cell td a').append(overlay);
 
/***************************** Compte à rebours *******************************/
 var hutsku = {
    'init_cd':
    function () {
        $(".countdown").each(function() {
            var cdimg = '<div style="background:url(https://images.wikia.nocookie.net/mogapedia/fr/images/f/f5/Countdown-MH.png) no-repeat; width:49px; height:76px; overflow:hidden; display:inline-block; border-radius:4px"></div>';
            // Date de différence = date d'arrivée - date du jour
            var diff = new Date(new Date($(this).text()) - new Date().getTime() );
            $(this).html(cdimg + cdimg + " " + cdimg + cdimg + " " + cdimg + cdimg + " " + cdimg + cdimg);
            // Le nombre de jours
            diff.days = (diff.getFullYear() - 1970) * 365 + diff.getMonth() * 30 + (diff.getDate() - 1);
            // Si l'évènement est déjà passé ou trop lointain
            if (diff.getFullYear() < 1970 || diff.days > 99 ) return;
            // On met en attribut "cd" le nombre de secondes pour mettre en place les cadres pour les images 
            $(this).attr("cd", diff.getTime() );
            // Chaîne telle que le décompte doit être affiché
            diff.string = (diff.days < 10 ? '0' : '') + diff.days + (diff.getHours() < 10 ? '0' : '') + diff.getHours() + (diff.getMinutes() < 10 ? '0' : '') + diff.getMinutes() + (diff.getSeconds() < 10 ? '0' : '') + diff.getSeconds();
            for (var i = 0; i < 8; i++){
                // 77=hauteur d'un panneau, 6=nombre de panneaux pour chaque chiffre. Pour chaque case, on affiche la bonne portion d'image qui  renvoit au bon chiffre
                $($(this).children()[i]).css("background-position", "-2px -" + (parseInt(diff.string.substr(i, 1), 10) * 77 * 6 + 1) + "px");
            }
            $(this).show();
        });
        if ($(".countdown").length){
            //cd = setInterval(hutsku.countdown, 1000);
            setInterval(hutsku.countdown, 1000);
        }
    },
/*********************** Fonctions déroulement des chiffres *******************/
    'countdown':
    function () {
        $(".countdown").each(function() {
            $(this).show();
            var diff = new Date ( parseInt($(this).attr("cd"), 10) );
            // Si le temps vaut 0 on arrête
            if (!Math.floor(diff.getTime() / 1000) ) return;
            diff.setTime(diff.getTime() - 1000);
            $(this).attr("cd", diff.getTime() );
            diff.days = (diff.getFullYear() - 1970) * 365 + diff.getMonth() * 30 + (diff.getDate() - 1);
            // On crée une chaîne de caractères sous la forme HH MM SS
            diff.string = ( (diff.days < 10) ? '0' : '') + diff.days + ( (diff.getHours() < 10) ? '0' : '') + diff.getHours() + (diff.getMinutes() < 10 ? '0' : '') + diff.getMinutes() + (diff.getSeconds() < 10 ? '0' : '') + diff.getSeconds();
            var frame = 8,
                max_array = [9,9, 2,3, 5,9, 5,9];
            do {
                frame--;
                hutsku.CDStep($(this).children()[frame], max_array[frame]);
            } while ( frame > 0 && diff.string.substr(frame, 1) == max_array[frame]);
        // Laisse passer jusqu'à ce que la valeur des minutes atteint son max
        });
    },

    'CDStep':
    function (obj, max) {
        var ypos = parseInt($(obj).css("background-position").split(" ")[1], 10);
        ypos += (max != 9 && ypos == -1) ? 77 * 6 : 77;
        if (ypos > 0) ypos -= 77 * 6 * (max + 1);
        $(obj).css("background-position", "-2px " + ypos + "px");
        if (ypos % (77 * 6) !== 0 && ypos % (77 * 6) != -1) setTimeout(function() {hutsku.CDStep(obj, max);}, 60);
    },
};
hutsku.init_cd();

/******************************** TabView event hook ***************************/
// Permet d'activer un code après le chargement d'un tabview
mw.hook("wikipage.content").add(function(content) {
    if ($(content).is('.tabBody')) {
        var isTabviewScript = $(content).find('.tabview-script-indic').length;
        if (isTabviewScript) {
            // We load TabView Script
            var scriptPath = $(content).find('.tabview-script-indic').attr('title');
            $.getScript(scriptPath).fail(function( qxhr, settings, exception) {
                console.error( "Impossible to load tabview", exception );
            });
        }
    }
});

/********************************** Monster List ******************************/
// Ce code permet de filter les résultats sur une page de type "Liste des
// monstre". Réalisé par [[Utilisateur:Hutskuchi|Hutskuchi]] et 
// [[Utilisateur:Houmgaor|Houmgaor]]

// Remarque : pour un bon fonctionnement du script, vous devez ajouter le 
// code CSS associé
var monsterList = {
	main: $(function() {
		// Filtre par espèce
		$('.monster-filter-select').html(
			'<select>\
				<option value="Tout">Tout</option>\
				<option value="Herbivore">Herbivore</option>\
				<option value="Lynien">Lynien</option>\
				<option value="Drake ailé">Drake ailé</option>\
				<option value="Neopteron">Neopteron</option>\
				<option value="Carapaceon">Carapaceon</option>\
				<option value="Temnoceran">Temnoceran</option>\
				<option value="Amphibien">Amphibien</option>\
				<option value="Leviathan">Leviathan</option>\
				<option value="Bête à crocs">Bête à crocs</option>\
				<option value="Wyverne volante">Wyverne volante</option>\
				<option value="Wyverne rapace">Wyverne rapace</option>\
				<option value="Wyverne de terre">Wyverne de terre</option>\
				<option value="Wyverne à crocs">Wyverne à crocs</option>\
				<option value="Wyverne aquatique">Wyverne aquatique</option>\
				<option value="Wyverne serpent">Wyverne serpent</option>\
				<option value="Dragon ancien">Dragon ancien</option>\
				<option value="Relique">Relique</option>\
				<option value="???">???</option>\
				<option value="Inclassable">Inclassable</option>\
			</select>'
		);
		
		// Filtre par nom
		$('.monster-filter-search').html(
			'<input type="search" name="q" placeholder="Rechercher..."></input>'
		);
		
		// Add event hook
		$('.monster-filter-search input').keyup(monsterList.listFiltering);
		$('.monster-filter-select select').mouseup(monsterList.listFiltering);
	}),
	
	// Filtrage des monstres
	listFiltering: function () {
		var filterSpecies, filterName, list, regex, i, name, species;
	    filterSpecies = $('.monster-filter-select select').find(':selected').text();
	    filterName = $('.monster-filter-search input').val().trim();
	    list = $('.monster-list td');
	    regex = new RegExp(filterName.toLowerCase(),"g");
	    
	    for (i = 0; i < list.length; i++) {
	        name = $('a', list[i]).attr("title");
	        species = $('span', list[i]).attr("title");
	        
	        if (name) {
	            if (filterSpecies != species && filterSpecies != "Tout") {
	            	$(list[i]).addClass('filtered');
	            } else if (!(name.toLowerCase().match(regex))) {
	            	$(list[i]).addClass('filtered');
	            } else {
	            	$(list[i]).removeClass('filtered');   
	            }
	        }
	    }
	},
};
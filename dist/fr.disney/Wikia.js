/* Mise au pluriel des labels */
function plural(singular, plural) {
    var data = $("[data-source=" + singular + "]");
    var links = data.find("a");
        
    if (links.length > 1) {
        data.find("h3").text(plural);
    }
}

/* Accord en genre et nombre des labels */
function agreement(ms, fs, mp, fp) {
    var i;
    var m = 0;
    var f = 0;
    var data = $("[data-source=" + ms + "]");
    
    data.find(".pi-data-value > a").each(function(){
        var href = $(this).attr('href');
        var gender = 0;
        
        var xhr = new XMLHttpRequest();
        xhr.open("GET", href + '?action=render', true);
        
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var fakeDiv = $("<div></div>");
                    data.append(fakeDiv);
                    fakeDiv.html(xhr.responseText);
                    gender = fakeDiv.find('#genre').text();
                    
                    if (gender == 1) {
                        m++;
        
                    } else if (gender == 2) {
                        f++;
                    }
                    
                    if (m + f == 1) {
                        if (f == 1) {
                            data.find("h3").text(fs);
                        }
                    
                    } else if (m + f > 1) {
                        if (m === 0) {
                            data.find("h3").text(fp);

                        } else {
                            data.find("h3").text(mp);
                        }
                    }
                    
                    fakeDiv.remove();
                    
                } else {
                    console.error(xhr.statusText);
                }
            }
        };
        xhr.onerror = function (e) {
          console.error(xhr.statusText);
        };
        xhr.send(null);
    });
}

/* Infobox Personnage */
function character() {
    plural("père", "Père");
    plural("mère", "Mère");
    plural("frère", "Frère");
    plural("sœur", "Sœurs");
    plural("grand-père", "Grands-pères");
    plural("grand-mère", "Grands-mères");
    plural("arrière-grand-père", "Arrière-grands-pères");
    plural("arrière-grand-mère", "Arrière-grands-mères");
    plural("fille", "Filles");
    plural("petit-fils", "Petits-fils");
    plural("petite-fille", "Petites-filles");
    plural("arrière-petit-fils", "Arrière-petits-fils");
    plural("arrière-petite-fille", "Arrière-petites-filles");
    plural("oncle", "Oncles");
    plural("tante", "Tantes");
    plural("neveu", "Neveux");
    plural("nièce", "Nièces");
    plural("cousin", "Cousins");
    plural("cousine", "Cousines");
    plural("grand-oncle", "Grands-oncles");
    plural("grand-tante", "Grands-tantes");
    plural("aïeul", "Aïeux");
    plural("beau-frère", "Beaux-frères");
    plural("belle-sœur", "Belles-sœurs");
    plural("demi-frère", "Demi-frère");
    plural("demi-sœur", "Demi-sœurs");
    plural("beau-fils", "Beaux-fils");
    plural("belle-fille", "Belles-filles");
    agreement("allié", "Alliée", "Alliés", "Alliées");
    agreement("ami", "Amie", "Amis", "Amies");
    plural("amour", "Amours");
    plural("animal", "Animaux");
    plural("sous-fifre", "Sous-fifres");
    agreement("ennemi", "Ennemie", "Ennemis", "Ennemies");
}

/* Infobox Resort */
function resort() {
    plural("ancien_nom", "Anciens noms");
    plural("ville", "Villes");
    plural("propriétaire", "Propriétaires");
}

/*
** Navbox Disneyland Paris
*/

/*** Initialisation des variables */
var lands = [".adventureland", ".discoveryland", ".fantasyland", ".frontierland", ".mainStreet", ".frontLot", ".productionCourtyard", ".toonStudio", ".avengersCampus", ".frozenLand", ".starWars", ".backlot"];

/*** Affichage d'un secteur */
function display(selectedLand){
    $(".flexboxes2 div").removeClass("selected");
    $(".flexboxes2 div").eq(selectedLand).addClass("selected");
        
    for (var land in lands) {
        if (land == selectedLand) {
            $(lands[land]).show();
        }
        else {
            $(lands[land]).hide();
        }
    }
}

/*** Fonction principale */
function disneylandParis() {
    /**** Initialisation de la vue */
    $(".flexboxes1 div:nth-child(1)").addClass("selected");
	display(0);
	index = 0;
	$(".flexboxes2 div:nth-child(n+6)").hide();
    
    /**** Clic sur "Disneyland" */
    $(".flexboxes1 div:nth-child(1)").click(function(){
        if ($(this).hasClass("selected") == false){
            if (index > 4) {
                index = 0;
                display(index);
            }
        
            $(".flexboxes1 div").toggleClass("selected");
            $(".flexboxes2 div:nth-child(-n+5)").show();
            $(".flexboxes2 div:nth-child(n+6)").hide();
        }
    });
    
    /** Clic sur "Walt Disney Studios */
    $(".flexboxes1 div:nth-child(2)").click(function(){
        if ($(this).hasClass("selected") == false){
            if (index < 5) {
                index = 5;
                display(index);
            }
    
            $(".flexboxes1 div").toggleClass("selected");
            $(".flexboxes2 div:nth-child(-n+5)").hide();
            $(".flexboxes2 div:nth-child(n+6)").show();
        }
    });
    
    /** Clic sur l'un des secteurs de parc */
    $(".flexboxes2 div").click(function(){
        index = $(".flexboxes2 div").index(this);
        display(index);
    });
}
    
$(document).ready(function(){
    /* Infobox Personnage */
    if ($('.pi-theme-personnage').length) {
        character();
    }
    
    /* Infobox Resort */
    if ($('.pi-theme-resort').length) {
        resort();
    }
    
    /* Navbox Disneyland Paris */
    if ($('.disneylandParis').length) {
        disneylandParis();
    }
});
/*

===== Outil de constructeur de decks Clash Royale =====
  Par King Dragonhoff
  Remerciements spéciaux à Blaster Niceshot
  
Dependences
  - La partie Statistiques d'une page carte doit avoir l'"ID" approprié.
    - id="unit-statistics" doit être appliqué à la balise div qui entoure la partie Statistiques.
    - id="unit-statistics-table" doit être appliqué au tableau avec les variations des statistiques
      en fonction du niveau.
    - id="unit-attributes-table" doit être appliqué au tableau avec les statistiques qui sont les 
      mêmes pour tous les niveaux d'une carte.
    - Gardez à l'esprit qu'un ID ne doit jamais être utilisé plus d'une fois par page.
  - Les cellules dans "unit statistics-table" doivent contenir un nombre. Si la statistique exacte 
    est inconnue, entrez une approximation en ajoutant le Modèle:Incertitude.
  - Les tableaux sur les pages cartes ne doivent pas contenir des cellules qui utilisent les
    fonctions "rowspan" ou "colspan".
  - L'en tête des cellules (l'en tête des colonnes) dans les tableaux de pages cartes doivent
    rester les mêmes sur l'ensemble du site.
    (ex: La cellule doit rester "Dégâts par seconde". Elle ne doit pas être changée en "DPS" sur
    une page.)
  - Le Modèle:Carte est utilité pour afficher les images des cartes.
  - Le Modèle:MonDeck possède du code qui autorise les utilisateurs à copier un deck sur les
    emplacements de decks de l'outil "Constructeur de decks".
  
Maintainance
  Puisque cet outil récupère les statistiques des cartes et leurs attributs depuis les articles de
  ce wiki, ce script ne doit généralement être modifié que quand de nouvelles cartes aparaissent
  dans le jeu.
  - Ajoutez les nouvelles cartes à la fonction ccalcInputs (la première fonction) et les rôles des
    cartes (les deux premières variables, allez voir Utilisateur:Lowyx/Card Roles).
  - Ajoutez les nouvelles cartes qui font apparaitre des unités à leur mort aux opérations pour une
    moyenne de points de vie et de DPS.
  - Ajoutez les cartes avec un bouclier ou des choses comme le Bélier de combat à la section Spell      
    Counters.
  - Ajoutez les nouveaux sorts de dégâts à la section Damaging Spell Counters.
  - Si une carte a des exceptions (such as spawning units on death or scaling damage), have the
    calc check those.
  - Les modèles suivants devront être mis à jour si de nouvelles cartes sont ajoutées au jeu.
    - Carte
    - LookupCardRarity
    - LookupCardMaxLevel (si le niveau max des troupes est changé)
  - Si les seuils de niveaux maximums des cartes sont changés dans les tournois, modifiez la
    fonction maxCardLevel.
*/

// *********************** Variables et fonctions *************************
// Rôles des cartes (visualisation possible sur Utilisateur:Lowyx/Card_Roles)
var cardRole = {
    1:["Géant", "Squelette géant", "Golem", "Molosse de lave", "P.E.K.K.A", "Golem de glace"],
    2:["Bombardier", "Bouliste", "Prince ténébreux", "Zappy", "Valkyrie" ],
    3:["Fût à gobelins", "Gobelins", "Gardes", "Armée de squelettes", "Squelettes", "Sorcière", "Cimetière"],
    4:["Barbares", "Barbares d'élite", "Chevalier", "Bûcheron", "Mineur", "Mini P.E.K.K.A", "Prince", "Voleuse"],
    5:["Bébé dragon", "Esprits de feu", "Princesse", "Sorcier", "Bourreau"],
    6:["Archers", "Mousquetaire", "Gobelins à lances", "Gobelin à sarbacane", "Trois mousquetaires", "Gang de gobelins", "Sorcière de la nuit"],
    7:["Méga gargouille", "Horde de gargouilles", "Gargouilles", "Dragon de l'enfer", "Chauves-souris"],
    8:["Tour à bombes", "Canon", "Tour de l'enfer", "Mortier", "Tesla", "Arc-X"],
    9:["Cabane de barbare", "Fournaise", "Cabane de gobelin", "Pierre tombale"],
    10:["Ballon", "Chevaucheur de cochon", "Géant royal", "Bélier de combat"],
    11:["Flèches", "Boule de feu", "Poison", "La Bûche", "Électrocution"],
    12:["Foudre", "Roquette"],
    13:["Gel", "Esprit de glace", "Sorcier de glace", "Électro-sorcier"],
    14:["Rage"],
    15:["Clonage","Extracteur d'élixir", "Miroir", "Tornade", "Guérison"]
};
var subCards = {
    1:["Géant", "Squelette géant", "Golem", "Molosse de lave", "P.E.K.K.A", "Golem de glace"],
    2:["Bombardier", "Bouliste", "Prince ténébreux", "Zappy", "Valkyrie" ],
    3:["Fût à gobelins", "Gobelins", "Gardes", "Armée de squelettes", "Squelettes", "Sorcière", "Cimetière"],
    4:["Barbares", "Barbares d'élite", "Chevalier", "Bûcheron", "Mineur", "Mini P.E.K.K.A", "Prince", "Voleuse"],
    5:["Bébé dragon", "Esprits de feu", "Princesse", "Sorcier", "Bourreau", "Sorcier de glace", "Sorcière", "Sorcière de la nuit"],
    6:["Archers", "Mousquetaire", "Gobelins à lances", "Gobelin à sarbacane", "Trois mousquetaires", "Électro-sorcier", "Gang de gobelins", "Sorcière de la nuit"],
    7:["Méga gargouille", "Horde de gargouilles", "Gargouilles", "Dragon de l'enfer", "Bébé dragon", "Chauves-souris"],
    8:["Tour à bombes", "Canon", "Tour de l'enfer", "Mortier", "Tesla", "Arc-X"],
    9:["Cabane de barbare", "Fournaise", "Cabane de gobelin", "Pierre tombale", "Cimetière", "Sorcière"],
    10:["Ballon", "Chevaucheur de cochon", "Géant royal", "Bélier de combat"],
    11:["Flèches", "Boule de feu", "Poison", "La Bûche", "Électrocution", "Esprits de feu"],
    12:["Foudre", "Roquette", "Boule de feu", "Esprits de feu", "Électrocution"],
    13:["Gel", "Esprit de glace", "Sorcier de glace", "Électro-sorcier", "Golem de glace", "Foudre", "Électrocution"],
    14:["Bûcheron", "Rage"],
    15:["Clonage", "Extracteur d'élixir", "Miroir", "Tornade", "Guérison"]
};
// Global Variables
var lookupResult;
var deckCardImages = [];
var i;
var savedDeck, selectedDeck = "1";
var dataTimeout, errorMsgSent, saveDeckMsgSent;
// Define input elements
function ccalcInputs(type,number,loc) {
    var location;
    if (loc === undefined) {
        location = "ccalc";
    } else {
        location = String(loc); // For pages other than Deck Builder
    }
    if (type === "Commune") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location +'-rarity' + number + '"class="' + location + '-rarity-input"><option value="Commune" selected>Commune</option><option value="Rare">Rare</option><option value="Épique">Épique</option><option value="Légendaire">Légendaire</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Archers">Archers</option><option value="Barbares">Barbares</option><option value="Barbares d\'élite">Barbares d\'élite</option><option value="Bombardier">Bombardier</option><option value="Canon">Canon</option><option value="Chauves-souris">Chauves-souris</option><option value="Chevalier">Chevalier</option><option value="Électrocution">Électrocution</option><option value="Esprits de feu">Esprits de feu</option><option value="Esprit de glace">Esprit de glace</option><option value="Flèches">Flèches</option><option value="Gang de gobelins">Gang de gobelins</option><option value="Gargouilles">Gargouilles</option><option value="Géant royal">Géant royal</option><option value="Gobelins">Gobelins</option><option value="Gobelins à lances">Gobelins à lances</option><option value="Horde de gargouilles">Horde de gargouilles</option><option value="Mortier">Mortier</option><option value="Squelettes">Squelettes</option><option value="Tesla">Tesla</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9" selected>9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option></select>');
    } else if (type === "Rare") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location + '-rarity' + number + '"class="' + location + '-rarity-input"><option value="Commune">Commune</option><option value="Rare" selected>Rare</option><option value="Épique">Épique</option><option value="Légendaire">Légendaire</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Bélier de combat">Bélier de combat</option><option value="Boule de feu">Boule de feu</option><option value="Cabane de barbare">Cabane de barbare</option><option value="Cabane de gobelin">Cabane de gobelin</option><option value="Chevaucheur de cochon">Chevaucheur de cochon</option><option value="Extracteur d\'élixir">Extracteur d\'élixir</option><option value="Fournaise">Fournaise</option><option value="Géant">Géant</option><option value="Gobelin à sarbacane">Gobelin à sarbacane</option><option value="Golem de glace">Golem de glace</option><option value="Guérison">Guérison</option><option value="Méga gargouille">Méga gargouille</option><option value="Mini P.E.K.K.A">Mini P.E.K.K.A</option><option value="Mousquetaire">Mousquetaire</option><option value="Pierre tombale">Pierre tombale</option><option value="Roquette">Roquette</option><option value="Sorcier">Sorcier</option><option value="Tour à bombes">Tour à bombes</option><option value="Tour de l\'enfer">Tour de l\'enfer</option><option value="Trois mousquetaires">Trois mousquetaires</option><option value="Valkyrie">Valkyrie</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7" selected>7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select>');
    } else if (type === "Épique") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location + '-rarity' + number + '"class="' + location + '-rarity-input"><option value="Commune">Commune</option><option value="Rare">Rare</option><option value="Épique" selected>Épique</option><option value="Légendaire">Légendaire</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Arc-X">Arc-X</option><option value="Armée de squelettes">Armée de squelettes</option><option value="Ballon">Ballon</option><option value="Bébé dragon">Bébé dragon</option><option value="Bouliste">Bouliste</option><option value="Bourreau">Bourreau</option><option value="Clonage">Clonage</option><option value="Foudre">Foudre</option><option value="Fût à gobelins">Fût à gobelins</option><option value="Gardes">Gardes</option><option value="Gel">Gel</option><option value="Golem">Golem</option><option value="Miroir">Miroir</option><option value="P.E.K.K.A">P.E.K.K.A</option><option value="Poison">Poison</option><option value="Prince">Prince</option><option value="Prince ténébreux">Prince ténébreux</option><option value="Rage">Rage</option><option value="Squelette géant">Squelette géant</option><option value="Sorcière">Sorcière</option><option value="Tornade">Tornade</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4" selected>4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option></select>');
    } else if (type === "Légendaire") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location + '-rarity' + number + '"class="' + location + '-rarity-input"><option value="Commune">Commune</option><option value="Rare">Rare</option><option value="Épique">Épique</option><option value="Légendaire" selected>Légendaire</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Bûcheron">Bûcheron</option><option value="Cimetière">Cimetière</option><option value="Dragon de l\'enfer">Dragon de l\'enfer</option><option value="Électro-sorcier">Électro-sorcier</option><option value="La Bûche">La Bûche</option><option value="Mineur">Mineur</option><option value="Molosse de lave">Molosse de lave</option><option value="Princesse">Princesse</option><option value="Sorcier de glace">Sorcier de glace</option><option value="Sorcière de la nuit">Sorcière de la nuit</option><option value="Voleuse">Voleuse</option><option value="Zappy">Zappy</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>');
    }
}
// Data Retrieval Function
function getPageData(page) {
    var property = '';
    var attribute = '';
    // Code that will execute while AJAX request is running
    clearTimeout(dataTimeout);
    dataTimeout = setTimeout(function() {
        alert("Récupérer les statistiques des cartes prend un certain temps. Si la page n'affiche pas son contenu, vérifiez votre connexion internet et rafraîchissez la page. Si cela ne semble pas être le problème, rendez-vous sur la page de la carte qui ne veut pas afficher ses statistiques pour vérifier qu'elle n'a pas été vandalisée. Si vous ne pouvez pas fixer ce problème vous-même, contactez un membre du staff de ce wiki.");
    }, 15000);
    $('#ccalc-submit').html('<span class="fa fa-spinner fa-pulse"></span>').prop("disabled", true);
    $('#ccalc-save').html('<span class="fa fa-spinner fa-pulse"></span>').prop("disabled", true);
    $(".ccalc-rarity-input, .ccalc-card-input").prop("disabled", true);
    // Test if data for this page has already been retrieved
    if (lookupResult[page]) { // data already exists
        clearTimeout(dataTimeout);
        $('#ccalc-submit').html('Soumettre').prop("disabled", false);
        $('#ccalc-save').html('Sauvegarder à l\'emplacement <span class="displaySelectedDeckNum">' + selectedDeck + '</span>').prop("disabled", false);
        $(".ccalc-rarity-input, .ccalc-card-input").prop("disabled", false);
    } else { // data does not exist
        // AJAX Request
        $.get('http://fr.clashroyale.wikia.com/index.php?title=' + page)
        .done(function(statData) {
            lookupResult[page] = {};
            lookupResult[page].countfallback = $('#unit-attributes-table',statData).attr("data-ccalc-count");
            $('#unit-attributes-table tbody tr:eq(0) th',statData).each(function(b) {
                attribute = $(this).clone().children().remove().end().text().trim().toLowerCase();
                lookupResult[page][attribute] = $('td:eq(' + b + ')',$("#unit-attributes-table tbody tr:eq(1)",statData)).text().trim();
            });
            $('#unit-statistics-table tbody tr:eq(0) th',statData).each(function(i) {
                property = $(this).clone().children().remove().end().text().trim().toLowerCase();
                if (i > 0) {
                    lookupResult[page][property] = [0];
                    $('#unit-statistics-table tbody tr',statData).each(function(a) {
                        if (a > 0) {
                            lookupResult[page][property].push($('td:eq(' + i + ')',$(this)).text().trim().replace(/\D/g, ""));
                            if (a === $('#unit-statistics-table tbody tr',statData).length - 1 && i === $('#unit-statistics-table tbody tr:eq(0) th',statData).length - 1) {
                                // Code that will execute
                                // after AJAX request has finished and
                                // data has been added to lookupResult object
                                clearTimeout(dataTimeout);
                                $('#ccalc-submit').html('Soumettre').prop("disabled", false);
                                $('#ccalc-save').html('Sauvegarder à l\'emplacement <span class="displaySelectedDeckNum">' + selectedDeck + '</span>').prop("disabled", false);
                                $(".ccalc-rarity-input, .ccalc-card-input").prop("disabled", false);
                                localStorage.setItem("ccalcLookupData", JSON.stringify(lookupResult));
                            }
                        }
                    });
                }
            });
        });
    }
}
// Get basic statistics table of a card
function getStatisticsSection(page, rowNum) {
    // Code that will execute while AJAX request is running
    clearTimeout(dataTimeout);
    dataTimeout = setTimeout(function() {
        alert("Récupérer les statistiques des cartes prend un certain temps. Si la page n'affiche pas son contenu, vérifiez votre connexion internet et rafraîchissez la page. Si cela ne semble pas être le problème, rendez-vous sur la page de la carte qui ne veut pas afficher ses statistiques pour vérifier qu'elle n'a pas été vandalisée. Si vous ne pouvez pas fixer ce problème vous-même, contactez un membre du staff de ce wiki.");
    }, 15000);
    $('#ccalc-individual-stats-result').html('<center class="fa fa-spinner fa-pulse" style="color: white; font-size: 24px;"></center>');
    // AJAX Request
    $.get('http://fr.clashroyale.wikia.com/index.php?title=' + page)
    .done(function(pageContent) {
        $("div#unit-statistics",pageContent).children().hide().appendTo("#ccalc-individual-stats-result").fadeIn("slow");
        $("#ccalc-individual-stats-result h2").remove();
        if (rowNum < 100) {
            $("#ccalc-individual-stats #unit-statistics-table tr:nth-of-type(" + rowNum + ")").css("background-color", "#ffffb3");
        }
        clearTimeout(dataTimeout);
        $('#ccalc-individual-stats-result center.fa-spinner').remove();
    });
}
// Deck image updating function
function refreshDeck(card,index) {
    $.getJSON('/api.php?action=parse&text={{Carte|Name=' + card + '|Scale=.33|Link=}}&format=json', function(n) {
        var addCardTemplate = n.parse.text['*'];
        $('#ccalc-deck td.ccalc-card[data-card-index="' + index + '"]').html(addCardTemplate);
        deckCardImages[index] = addCardTemplate;
    });
}
// Place card image in the Selected Card column of the Substitutions section of the result
function substitutionsCardImage(index) {
    $('#ccalc-substitutions td.ccalc-subSelected-card[data-card-index="' + index + '"]').html(deckCardImages[index]);
}
// Get an inline card image and add it to the Similar Cards column of the Substitutions table
function getSubstitutionImage(card,row) {
    if (card !== cardName(row)) {
        $.getJSON('/api.php?action=parse&text={{Carte|Name=' + card + '|Scale=.25|Position=middle|Link=}}&format=json', function(n) {
            var retrievedCardImage = n.parse.text['*'];
            $("#ccalc-substitutions td#similarCards" + row).append(retrievedCardImage);
        });
    }
}
// Get query string parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
// Get deck data from a MyBattleDeck display
function userDeckData(attribute,cardNum) {
    return $(".ccalc-user-deck-data-selected .user-deck-" + attribute + cardNum).text();
}
// Card name by number function
function cardName(number) {
    return $("#ccalc-card" + number).val();
}
// Card rarity by number function
function cardRarity(number) {
    return $("#ccalc-rarity" + number).val();
}
// Card level by number function
function cardLevel(number) {
    return $("#ccalc-level" + number).val();
}
// Get max card level
function maxCardLevel(rarity, tournament) {
    if (rarity === "Commune") {
        if (tournament === true) {
            return 9;
        } else {
            return 13;
        }
    } else if (rarity === "Rare") {
        if (tournament === true) {
            return 7;
        } else {
            return 11;
        }
    } else if (rarity === "Épique") {
        if (tournament === true) {
            return 4;
        } else {
            return 8;
        }
    } else if (rarity === "Légendaire") {
        if (tournament === true) {
            return 1;
        } else {
            return 5;
        }
    } else {
        return 1;
    }
}
// Error Message function
function ccerrorMsg() {
    if (errorMsgSent !== "sent") {
        alert("Le calculateur n'a pas été capable de récupérer les statistiques d'une ou plusieurs cartes. Vérifiez votre connexion internet et cliquez sur Soumettre encore une fois ou rafraîchissez la page. Si cela ne semble pas être le problème, allez sur la page des cartes en question et vérfiez qu'elles n'ont pas été vandalisées. Si vous n'avez pas l'autorisation de fixer ce problème, contactez un membre de l'équipe de ce wikia.");
    }
    errorMsgSent = "sent";
}
// Card comparison table manipulator function
function cardCompareTable(row,cell,mode,input) {
    var rowPlusOne = Number(row) + 1;
    var rowNumString = String(rowPlusOne);
    if (mode == "text") {
        $("#ccalc-cardComparison tr:nth-of-type(" + rowNumString + ") td:nth-of-type(" + cell + ")").text(input);
    } else if (mode == "html") {
        $("#ccalc-cardComparison tr:nth-of-type(" + rowNumString + ") td:nth-of-type(" + cell + ")").html(input);
    } else if (mode == "get") {
        return $("#ccalc-cardComparison tr:nth-of-type(" + rowNumString + ") td:nth-of-type(" + cell + ")").text();
    } else if (mode == "color") {
        return $("#ccalc-cardComparison tr:nth-of-type(" + rowNumString + ") td:nth-of-type(" + cell + ")").css("background-color", input);
    }
}
// Damaging Spell Counters section HTML function
function displaySpellCounter(spell,spellLvl,troop,troopLvl) {
    $("#ccalc-damagingSpellCounters").append($('<div style="display: inline-block; margin: 6px 20px; text-align: center; font-weight: bold;"><table><tr><td data-display-card="' + spell + '" class="ccalc-display-card">' + spell + '</td><td><img src="https://vignette.wikia.nocookie.net/clashroyale/images/1/1e/Fl%C3%A8che_bat.png/revision/latest?cb=20170216102550&path-prefix=fr" alt="Bat" style="height: 60px; vertical-align: middle;" /></td><td data-display-card="' + troop + '" class="ccalc-display-card">' + troop + '</td></tr><tr><td>Niveau ' + spellLvl + '</td><td></td><td>Niveau ' + troopLvl + '</td></tr></table></div>'));
}
// ****************************** Get Started ******************************
$(document).ready(function() {
    // ************************* Memory *************************
    // Load previously retrieved card data
    if (localStorage.getItem("ccalcLookupData") !== null) {
        var retrievedLookupData = localStorage.getItem("ccalcLookupData");
        lookupResult = JSON.parse(retrievedLookupData);
    } else {
        lookupResult = {};
    }
    // Clear memory
    $('#ccalc-clear-memory-harness').html('<button type="button" id="ccalc-clear-memory" title="Nettoyez la mémoire des données de l\'outil pour lui permettre de récupérer les dernières données des cartes. Veuillez noter que ceci n\'effacera pas les decks enregistrés.">Nettoyer la mémoire</button>');
    $("#ccalc-clear-memory").click(function() {
        if (confirm("Cet outil enregistre les données des cartes préalablement récupérées entre les chargements de page pour améliorer votre expérience. Effacez la mémoire pour que l'outil récupère les dernières données des cartes lorsqu'une nouvelle carte est ajoutée dans les entrées. Assurez-vous d'effacer la mémoire après les équilibrages ayant lieu en jeu. Veuillez noter que cela n'effacera pas les decks sauvegardées. Cliquez sur OK pour effacer la mémoire de données et recharger la page.") === true) {
            localStorage.removeItem("ccalcLookupData");
            location.reload();
        } else {}
    });
    // ************************* Place inputs *************************
    // Check for permalink inputs
    if (getParameterByName('rarity1') !== null && getParameterByName('card1') !== null && getParameterByName('level1') !== null && getParameterByName('rarity2') !== null && getParameterByName('card2') !== null && getParameterByName('level2') !== null && getParameterByName('rarity3') !== null && getParameterByName('card3') !== null && getParameterByName('level3') !== null && getParameterByName('rarity4') !== null && getParameterByName('card4') !== null && getParameterByName('level4') !== null && getParameterByName('rarity5') !== null && getParameterByName('card5') !== null && getParameterByName('level5') !== null && getParameterByName('rarity6') !== null && getParameterByName('card6') !== null && getParameterByName('level6') !== null && getParameterByName('rarity7') !== null && getParameterByName('card7') !== null && getParameterByName('level7') !== null && getParameterByName('rarity8') !== null && getParameterByName('card8') !== null && getParameterByName('level8') !== null) {
        $('#ccalc-harness1').html(ccalcInputs(getParameterByName('rarity1'),"1")).ready(function() {
            $('#ccalc-level1').val(getParameterByName('level1'));
        });
        $('#ccalc-harness2').html(ccalcInputs(getParameterByName('rarity2'),"2")).ready(function() {
            $('#ccalc-level2').val(getParameterByName('level2'));
        });
        $('#ccalc-harness3').html(ccalcInputs(getParameterByName('rarity3'),"3")).ready(function() {
            $('#ccalc-level3').val(getParameterByName('level3'));
        });
        $('#ccalc-harness4').html(ccalcInputs(getParameterByName('rarity4'),"4")).ready(function() {
            $('#ccalc-level4').val(getParameterByName('level4'));
        });
        $('#ccalc-harness5').html(ccalcInputs(getParameterByName('rarity5'),"5")).ready(function() {
            $('#ccalc-level5').val(getParameterByName('level5'));
        });
        $('#ccalc-harness6').html(ccalcInputs(getParameterByName('rarity6'),"6")).ready(function() {
            $('#ccalc-level6').val(getParameterByName('level6'));
        });
        $('#ccalc-harness7').html(ccalcInputs(getParameterByName('rarity7'),"7")).ready(function() {
            $('#ccalc-level7').val(getParameterByName('level7'));
        });
        $('#ccalc-harness8').html(ccalcInputs(getParameterByName('rarity8'),"8")).ready(function() {
            $('#ccalc-level8').val(getParameterByName('level8'));
        });
        $('#ccalc-card1').val(getParameterByName('card1')).attr({"data-fallback-val": getParameterByName('card1'), "data-fallback-rarity": getParameterByName('rarity1')});
        $('#ccalc-card2').val(getParameterByName('card2')).attr({"data-fallback-val": getParameterByName('card2'), "data-fallback-rarity": getParameterByName('rarity2')});
        $('#ccalc-card3').val(getParameterByName('card3')).attr({"data-fallback-val": getParameterByName('card3'), "data-fallback-rarity": getParameterByName('rarity3')});
        $('#ccalc-card4').val(getParameterByName('card4')).attr({"data-fallback-val": getParameterByName('card4'), "data-fallback-rarity": getParameterByName('rarity4')});
        $('#ccalc-card5').val(getParameterByName('card5')).attr({"data-fallback-val": getParameterByName('card5'), "data-fallback-rarity": getParameterByName('rarity5')});
        $('#ccalc-card6').val(getParameterByName('card6')).attr({"data-fallback-val": getParameterByName('card6'), "data-fallback-rarity": getParameterByName('rarity6')});
        $('#ccalc-card7').val(getParameterByName('card7')).attr({"data-fallback-val": getParameterByName('card7'), "data-fallback-rarity": getParameterByName('rarity7')});
        $('#ccalc-card8').val(getParameterByName('card8')).attr({"data-fallback-val": getParameterByName('card8'), "data-fallback-rarity": getParameterByName('rarity8')});
    } else { // Default inputs
        $('#ccalc-harness1').html(ccalcInputs("Commune","1"));
        $('#ccalc-harness2').html(ccalcInputs("Commune","2"));
        $('#ccalc-harness3').html(ccalcInputs("Rare","3"));
        $('#ccalc-harness4').html(ccalcInputs("Rare","4"));
        $('#ccalc-harness5').html(ccalcInputs("Épique","5"));
        $('#ccalc-harness6').html(ccalcInputs("Épique","6"));
        $('#ccalc-harness7').html(ccalcInputs("Légendaire","7"));
        $('#ccalc-harness8').html(ccalcInputs("Légendaire","8"));
        $('#ccalc-card1').val("Archers").attr({"data-fallback-val": "Archers", "data-fallback-rarity": "Commune"});
        $('#ccalc-card2').val("Barbares").attr({"data-fallback-val": "Barbares", "data-fallback-rarity": "Commune"});
        $('#ccalc-card3').val("Bélier de combat").attr({"data-fallback-val": "Bélier de combat", "data-fallback-rarity": "Rare"});
        $('#ccalc-card4').val("Boule de feu").attr({"data-fallback-val": "Boule de feu", "data-fallback-rarity": "Rare"});
        $('#ccalc-card5').val("Arc-X").attr({"data-fallback-val": "Arc-X", "data-fallback-rarity": "Épique"});
        $('#ccalc-card6').val("Armée de squelettes").attr({"data-fallback-val": "Armée de squelettes", "data-fallback-rarity": "Épique"});
        $('#ccalc-card7').val("Bûcheron").attr({"data-fallback-val": "Bûcheron", "data-fallback-rarity": "Légendaire"});
        $('#ccalc-card8').val("Cimetière").attr({"data-fallback-val": "Cimetière", "data-fallback-rarity": "Légendaire"});
        
    }
    $("#ccalcPermalink-Harness").html($('<textarea id="ccalcPermalink" style="width: 90%;" rows="5" readonly>Erreur</textarea>'));
    // Place form buttons
    $('#ccalc-submit-harness').html('<button type="submit" id="ccalc-submit">Soumettre</button>');
    $('#ccalc-save-harness').html('<button type="button" id="ccalc-save" title="Sauvegardez ce deck pour une utilisation future.">Sauvegarder à l\'emplacement <span class="displaySelectedDeckNum"></span></button>');
    // Deck selection buttons
    $("#deck-selection .deck-select-button").click(function() {
        $(this).siblings().removeClass("selected-deck");
        $(this).addClass("selected-deck");
        selectedDeck = $(this).text();
        $(".displaySelectedDeckNum").text(selectedDeck);
    });
    $(".displaySelectedDeckNum").text(selectedDeck);
    // Get needed card data as long as this page contains the calculator
    if ($("#cardCalculator").length) {
        getPageData("Archers");
        getPageData("Bélier de combat");
        getPageData("Arc-X");
        getPageData("Bûcheron");
        getPageData("Barbares");
        getPageData("Boule de feu");
        getPageData("Armée de squelettes");
        getPageData("Cimetière");
        getPageData("Roquette");
        getPageData("Électrocution");
        getPageData("Flèches");
        getPageData("La Bûche");
        getPageData("Foudre");
    }
    // ****************************** Save Inputs... ****************************
    // For MyBattleDeck displays: show save buttons
    $(".ccalc-save-user-deck").click(function() {
        $(this).siblings(".save-user-deck-buttons").slideToggle();
    });
    // Save from the tool
    $('#ccalc-save').click(function() {
        savedDeck = [
            {},
            {rarity: cardRarity(1), card: cardName(1), level: cardLevel(1)},
            {rarity: cardRarity(2), card: cardName(2), level: cardLevel(2)},
            {rarity: cardRarity(3), card: cardName(3), level: cardLevel(3)},
            {rarity: cardRarity(4), card: cardName(4), level: cardLevel(4)},
            {rarity: cardRarity(5), card: cardName(5), level: cardLevel(5)},
            {rarity: cardRarity(6), card: cardName(6), level: cardLevel(6)},
            {rarity: cardRarity(7), card: cardName(7), level: cardLevel(7)},
            {rarity: cardRarity(8), card: cardName(8), level: cardLevel(8)}
        ];
        localStorage.setItem("ccalcSavedDeck" + selectedDeck, JSON.stringify(savedDeck));
    });
    // Save from a MyBattleDeck display
    $('.deck-save-button').click(function() {
        $(".ccalc-user-deck-data-selected").removeClass("ccalc-user-deck-data-selected");
        $(this).parents(".user-battle-deck").children(".ccalc-user-deck-data").addClass("ccalc-user-deck-data-selected");
        // Check that all cards are valid and not duplicated
        if (userDeckData("rarity","1") == "invalid" || userDeckData("rarity","2") == "invalid" || userDeckData("rarity","3") == "invalid" || userDeckData("rarity","4") == "invalid" || userDeckData("rarity","5") == "invalid" || userDeckData("rarity","6") == "invalid" || userDeckData("rarity","7") == "invalid" || userDeckData("rarity","8") == "invalid") {
            alert("Impossible de sauvegarder! Une ou plusieurs cartes de ce deck sont invalides.");
        } else if (userDeckData("card","1") == userDeckData("card","2") || userDeckData("card","1") == userDeckData("card","3") || userDeckData("card","1") == userDeckData("card","4") || userDeckData("card","1") == userDeckData("card","5") || userDeckData("card","1") == userDeckData("card","6") || userDeckData("card","1") == userDeckData("card","7") || userDeckData("card","1") == userDeckData("card","8") || userDeckData("card","2") == userDeckData("card","3") || userDeckData("card","2") == userDeckData("card","4") || userDeckData("card","2") == userDeckData("card","5") || userDeckData("card","2") == userDeckData("card","6") || userDeckData("card","2") == userDeckData("card","7") || userDeckData("card","2") == userDeckData("card","8") || userDeckData("card","3") == userDeckData("card","4") || userDeckData("card","3") == userDeckData("card","5") || userDeckData("card","3") == userDeckData("card","6") || userDeckData("card","3") == userDeckData("card","7") || userDeckData("card","3") == userDeckData("card","8") || userDeckData("card","4") == userDeckData("card","5") || userDeckData("card","4") == userDeckData("card","6") || userDeckData("card","4") == userDeckData("card","7") || userDeckData("card","4") == userDeckData("card","8") || userDeckData("card","5") == userDeckData("card","6") || userDeckData("card","5") == userDeckData("card","7") || userDeckData("card","5") == userDeckData("card","8") || userDeckData("card","6") == userDeckData("card","7") || userDeckData("card","6") == userDeckData("card","8") || userDeckData("card","7") == userDeckData("card","8")) {
            alert("Impossible de sauvegarder! Une ou plusieurs cartes de ce deck sont présentes plusieurs fois.");
        } else {
            selectedDeck = $(this).text();
            savedDeck = [
                {},
                {rarity: userDeckData("rarity","1"), card: userDeckData("card","1"), level: userDeckData("level","1")},
                {rarity: userDeckData("rarity","2"), card: userDeckData("card","2"), level: userDeckData("level","2")},
                {rarity: userDeckData("rarity","3"), card: userDeckData("card","3"), level: userDeckData("level","3")},
                {rarity: userDeckData("rarity","4"), card: userDeckData("card","4"), level: userDeckData("level","4")},
                {rarity: userDeckData("rarity","5"), card: userDeckData("card","5"), level: userDeckData("level","5")},
                {rarity: userDeckData("rarity","6"), card: userDeckData("card","6"), level: userDeckData("level","6")},
                {rarity: userDeckData("rarity","7"), card: userDeckData("card","7"), level: userDeckData("level","7")},
                {rarity: userDeckData("rarity","8"), card: userDeckData("card","8"), level: userDeckData("level","8")}
            ];
            localStorage.setItem("ccalcSavedDeck" + selectedDeck, JSON.stringify(savedDeck));
            alert("Ce deck a été sauvegardé à l'emplacement " + selectedDeck + " du Deck Builder.");
        }
    });
    // ************************* ...and restore them ****************************
    $('#deck-selection .deck-select-button').click(function() {
        var retrievedInputString;
        if (localStorage.getItem("ccalcSavedDeck" + selectedDeck) !== null) {
            retrievedInputString = localStorage.getItem("ccalcSavedDeck" + selectedDeck);
            savedDeck = JSON.parse(retrievedInputString);
            for (i = 1; i < 9; i++) {
                $('#ccalc-harness' + String(i)).html(ccalcInputs(savedDeck[i].rarity,String(i)));
                $('#ccalc-card' + String(i)).val(savedDeck[i].card).attr({"data-fallback-val": savedDeck[i].card, "data-fallback-rarity": savedDeck[i].rarity});
                $('#ccalc-level' + String(i)).val(savedDeck[i].level);
                getPageData(savedDeck[i].card);
                refreshDeck(savedDeck[i].card,i);
            }
        } else {
            if (saveDeckMsgSent !== "sent") {
                alert("Vous n'avez actuellement rien sauvegardé à l'emplacement " + selectedDeck + ". Changez les données et cliquer sur le bouton de sauvegarde pour enregistrer un deck.");
                saveDeckMsgSent = "sent";
            }
        }
    });
    // ******************* On rarity change, replace inputs *****************
    $('#cardCalculator').on('change', '.ccalc-rarity-input', function() {
        var newRarity = this.value;
        var cardIndex = $(this).parent().attr("data-card-index");
        var oldCard = $("#ccalc-card" + cardIndex).attr("data-fallback-val");
        var oldCardRarity = $("#ccalc-card" + cardIndex).attr("data-fallback-rarity");
        $(this).parent().html(ccalcInputs(newRarity,cardIndex));
        var changedInput = $("#ccalc-card" + cardIndex);
        var newCard = $(changedInput).val();
        // If user selects an already-selected card, pick a different one
        var dupCardIndex = $(".ccalc-card-input[data-fallback-val='" + newCard + "']").parent().attr("data-card-index");
        var dupCard = $(".ccalc-card-input[data-fallback-val='" + newCard + "']").val();
        if (dupCardIndex) {
            $("select#ccalc-card" + cardIndex + " option").each(function() {
                var endEach = "no";
                if (this.value !== dupCard) {
                    $("#ccalc-card" + cardIndex).val(this.value);
                    dupCardIndex = $(".ccalc-card-input[data-fallback-val='" + this.value + "']").parent().attr("data-card-index");
                    if (dupCardIndex === undefined) {
                        endEach = "end";
                    } else {
                        dupCard = $(".ccalc-card-input[data-fallback-val='" + newCard + "']").val();
                    }
                }
                if (endEach === "end")
                    return false;
            });
        }
        // Perform card change functions as if the card selection was changed
        newCard = $(changedInput).val();
        var newCardIndex = cardIndex;
        // Replace fallback value, get data, replace card image
        $(changedInput).attr({"data-fallback-val": newCard, "data-fallback-rarity": $("#ccalc-rarity" + newCardIndex).val()});
        getPageData(newCard);
        refreshDeck(newCard,newCardIndex);
    });
    // ******** On card change, get card statistics and change deck image ********
    $('#cardCalculator').on('change', '.ccalc-card-input', function() {
        var changedInput = this;
        var newCard = this.value;
        var oldCard = $(this).attr("data-fallback-val");
        var oldCardRarity = $(this).attr("data-fallback-rarity");
        var newCardIndex = $(this).parent().attr('data-card-index');
        // If user selects an already-selected card, swap them.
        var dupCardIndex = $(".ccalc-card-input[data-fallback-val='" + newCard + "']").parent().attr("data-card-index");
        if (dupCardIndex) {
            refreshDeck(oldCard,dupCardIndex);
        }
        $(".ccalc-card-input[data-fallback-val='" + newCard + "']").parent().html(ccalcInputs(oldCardRarity,dupCardIndex)).children(".ccalc-card-input").val(oldCard).attr({"data-fallback-val": oldCard, "data-fallback-rarity": oldCardRarity});
        // Replace fallback value, get data, replace card image
        $(this).attr({"data-fallback-val": newCard, "data-fallback-rarity": $("#ccalc-rarity" + newCardIndex).val()});
        getPageData(newCard);
        refreshDeck(newCard,newCardIndex);
    });
    $('.ccalc-card-input').change();
    // ******** Show basic statistics table when card in deck is clicked ********
    // For deck
    $("#ccalc-deck td.ccalc-card").click(function() {
        var chosenCardNum, chosenCardLvlPlusOne, chosenCard;
        $("#ccalc-individual-stats-result").children().remove();
        $("#ccalc-individual-stats").slideDown("slow");
        chosenCardNum = $(this).attr("data-card-index");
        chosenCardLvlPlusOne = Number(cardLevel(chosenCardNum)) + 1;
        chosenCard = cardName(chosenCardNum);
        $("#individual-stats-card").text(chosenCard);
        $("#ccalc-individual-stats #ccalc-replace-deck-card").hide();
        getStatisticsSection(chosenCard,chosenCardLvlPlusOne);
    });
    // For substitutions table
    var chosenCardName, chosenCardRarity, deckCardIndex, deckCardName;
    $("#ccalc-substitutions .subSimilarCards").on("click", ".cr-display-card", function() {
        $("#ccalc-individual-stats-result").children().remove();
        $("#ccalc-individual-stats").slideDown("slow");
        chosenCardName = $(this).attr("data-card-name");
        chosenCardRarity = $(this).attr("data-card-rarity");
        deckCardIndex = $(this).parents("tr").children("td.ccalc-subSelected-card").attr("data-card-index");
        deckCardName = cardName(deckCardIndex);
        $("#individual-stats-card").text(chosenCardName);
        getStatisticsSection(chosenCardName,100); // 100 so that no row is highlighted
        $("#ccalc-individual-stats #ccalc-replace-deck-card").show().text("Remplacer " + deckCardName + " avec " + chosenCardName);
        // Fade "Scroll Up" alert in and out
        $("#ccalc-scrollup-alert").show();
        $("#ccalc-scrollup-alert").animate({opacity: "1"}, 800);
        $("#ccalc-scrollup-alert").animate({opacity: "0"}, 800);
        $("#ccalc-scrollup-alert").animate({opacity: "1"}, 800);
        $("#ccalc-scrollup-alert").animate({opacity: "0"}, 800, function () {
            $("#ccalc-scrollup-alert").hide();
        });
    });
    // Swap card in
    $("#ccalc-individual-stats #ccalc-replace-deck-card").click(function() {
        if (chosenCardName !== cardName("1") && chosenCardName !== cardName("2") && chosenCardName !== cardName("3") && chosenCardName !== cardName("4") && chosenCardName !== cardName("5") && chosenCardName !== cardName("6") && chosenCardName !== cardName("7") && chosenCardName !== cardName("8")) {
            $('#ccalc-harness' + String(deckCardIndex)).html(ccalcInputs(chosenCardRarity,String(deckCardIndex)));
            $('#ccalc-card' + String(deckCardIndex)).val(chosenCardName).attr({"data-fallback-val": chosenCardName, "data-fallback-rarity": chosenCardRarity});
            getPageData(chosenCardName);
            refreshDeck(chosenCardName,deckCardIndex);
        } else {
            alert("Cette carte est déjà dans votre deck.");
        }
    });
    // Close the result window for basic statisitcs
    $("#ccalc-individual-stats-hide").click(function() {
        $("#ccalc-individual-stats").slideUp("slow");
    });
    // Add checkbox for tournament standard cap restriction to the result
    $("#cardCalculator-result #spellCounterCapCheck-Harness").html('<input type="checkbox" id="spellCounterCapCheckbox" />');
    // If this checkbox is clicked, re-submit
    $("#cardCalculator-result #spellCounterCapCheckbox").change(function() {
        $("#ccalc-submit").click();
    });
    // Make sections collapse when header is clicked and re-expandable by clicking a button that appears
    // Deck Summary
    $("#cardCalculator-result h2 #Sommaire_du_deck").parent("h2").css("cursor", "pointer").click(function() {
        $("#cardCalculator-result #ccalc-analysis-bars").hide();
        $("#cardCalculator-result #show-ccalc-analysis-bars").show();
    });
    $("#cardCalculator-result #show-ccalc-analysis-bars").click(function() {
        $("#cardCalculator-result #ccalc-analysis-bars").show();
        $("#cardCalculator-result #show-ccalc-analysis-bars").hide();
    });
    // Card Comparison
    $("#cardCalculator-result h2 #Comparaison_des_cartes").parent("h2").css("cursor", "pointer").click(function() {
        $("#cardCalculator-result #ccalc-cardComparison").hide();
        $("#cardCalculator-result #show-ccalc-cardComparison").show();
    });
    $("#cardCalculator-result #show-ccalc-cardComparison").click(function() {
        $("#cardCalculator-result #ccalc-cardComparison").show();
        $("#cardCalculator-result #show-ccalc-cardComparison").hide();
    });
    // Substitutions
    $("#cardCalculator-result h2 #Substitutions").parent("h2").css("cursor", "pointer").click(function() {
        $("#cardCalculator-result #ccalc-substitutions").hide();
        $("#cardCalculator-result #show-ccalc-substitutions").show();
    });
    $("#cardCalculator-result #show-ccalc-substitutions").click(function() {
        $("#cardCalculator-result #ccalc-substitutions").show();
        $("#cardCalculator-result #show-ccalc-substitutions").hide();
    });
    // Damaging Spell Counters
    $("#cardCalculator-result h2 #Sorts_qui_vainquent_vos_cartes").parent("h2").css("cursor", "pointer").click(function() {
        $("#cardCalculator-result #ccalc-damagingSpellCounters, #cardCalculator-result #ccalc-damagingSpellCounters-Options").hide();
        $("#cardCalculator-result #show-ccalc-damagingSpellCounters").show();
    });
    $("#cardCalculator-result #show-ccalc-damagingSpellCounters").click(function() {
        $("#cardCalculator-result #ccalc-damagingSpellCounters, #cardCalculator-result #ccalc-damagingSpellCounters-Options").show();
        $("#cardCalculator-result #show-ccalc-damagingSpellCounters").hide();
    });
    // ************************* Submit and show results ************************
    $("#ccalc-submit").click(function() {
        // Check for card stat objects
        if ($.isEmptyObject(lookupResult[$("#ccalc-card1").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card2").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card3").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card4").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card5").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card6").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card7").val()]) === false && $.isEmptyObject(lookupResult[$("#ccalc-card8").val()]) === false) {
            // Successful Output
            $("#cardCalculator-result").slideDown("slow");
            $("#cardCalculator-permalink").slideDown("slow");
            // **************** Bar: Average Elixir Cost *************************
            var elixirTotal, elixirAverage, elixirBar, elixirBarDiff;
            elixirTotal = 0;
            for (i = 1; i < 9; i++) { 
                if (isNaN(lookupResult[cardName(i)].coût) === true) {
                    lookupResult[cardName(i)].coût = 2;
                }
                elixirTotal += Number(lookupResult[cardName(i)].coût);
            }
            elixirAverage = elixirTotal / 8;
            elixirBar = (elixirAverage * 100) / 8; // 8 is the max capcity of the bar
            elixirBarDiff = 100 - elixirBar;
            $("#ccalc-averageElixir .bar1").css("width", elixirBar + "%");
            $("#ccalc-bar-value-averageElixir").text(round(2,elixirAverage));
            $("#ccalc-averageElixir .bar2").css("width", elixirBarDiff + "%");
            // ************** Bar: Minimum Cycle Cost (in Elixir) ****************
            var deckElixir = [], cycleCost, cycleBar, cycleBarDiff;
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"2","text",lookupResult[cardName(i)].coût);
                deckElixir.push(cardCompareTable(i,"2","get"));
            }
            deckElixir.sort(function(a, b){return b-a});
            cycleCost = Number(deckElixir[4]) + Number(deckElixir[5]) + Number(deckElixir[6]) + Number(deckElixir[7]);
            cycleBar = (cycleCost * 100) / 28; // 28 is max capacity of the bar
            cycleBarDiff = 100 - cycleBar;
            $("#ccalc-cycleCost .bar1").css("width", cycleBar + "%");
            $("#ccalc-bar-value-cycleCost").text(round(0,cycleCost));
            $("#ccalc-cycleCost .bar2").css("width", cycleBarDiff + "%");
            // ********************* Bar: Average Hitpoints ***********************
            var hitpointsTotal, hitpointsAverage, hitpointsBar, hitpointsBarDiff, dCount, dCountNoX;
            hitpointsTotal = 0;
            // Sum card hitpoint values
            for (i = 1; i < 9; i++) {
                // Check for count value
                dCount = String(lookupResult[cardName(i)].nombre);
                dCountNoX = dCount.replace(/x/g, "");
                if (lookupResult[cardName(i)].countfallback !== undefined) {
                    lookupResult[cardName(i)].nombre = lookupResult[cardName(i)].countfallback;
                } else if (isNaN(dCountNoX) === true || lookupResult[cardName(i)].nombre === undefined) {
                    lookupResult[cardName(i)].nombre = 1;
                } else {
                    lookupResult[cardName(i)].nombre = Number(dCountNoX);
                }
                // Make sure the card can have hitpoints
                if (lookupResult[cardName(i)].type == "Combattant" || lookupResult[cardName(i)].type == "Bâtiment") {
                    // Check for a card that has more than one troop type then check for missing value
                    if (cardName(i) == "Golem") {
                        if (lookupResult[cardName(i)]["points de vie du golem"] !== undefined && lookupResult[cardName(i)]["points de vie des golemites"] !== undefined) {
                            hitpointsTotal += Number(lookupResult[cardName(i)]["points de vie du golem"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["points de vie des golemites"][cardLevel(i)]));
                            lookupResult[cardName(i)]['points de vie'] = [];
                            lookupResult[cardName(i)]['points de vie'][cardLevel(i)] = Number(lookupResult[cardName(i)]["points de vie du golem"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["points de vie des golemites"][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Molosse de lave") {
                        if (lookupResult[cardName(i)]['points de vie du molosse de lave'] !== undefined && lookupResult[cardName(i)]['points de vie des roquets de lave'] !== undefined) {
                            hitpointsTotal += Number(lookupResult[cardName(i)]['points de vie du molosse de lave'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['points de vie des roquets de lave'][cardLevel(i)]));
                            lookupResult[cardName(i)]['points de vie'] = [];
                            lookupResult[cardName(i)]['points de vie'][cardLevel(i)] = Number(lookupResult[cardName(i)]['points de vie du molosse de lave'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['points de vie des roquets de lave'][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Gang de gobelins") {
                        if (lookupResult[cardName(i)]['points de vie des gobelins'] !== undefined && lookupResult[cardName(i)]['points de vie des gobelins à lances'] !== undefined) {
                            hitpointsTotal += (3 * Number(lookupResult[cardName(i)]['points de vie des gobelins'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['points de vie des gobelins à lances'][cardLevel(i)]));
                            lookupResult[cardName(i)]['points de vie'] = [];
                            lookupResult[cardName(i)]['points de vie'][cardLevel(i)] = ((3 * Number(lookupResult[cardName(i)]['points de vie des gobelins'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['points de vie des gobelins à lances'][cardLevel(i)]))) / 6;
                        } else {
                            ccerrorMsg();
                        }
                    } else {
                        if (lookupResult[cardName(i)]['points de vie'] !== undefined) {
                            hitpointsTotal += Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)]) * Number(lookupResult[cardName(i)].nombre);
                        } else {
                            ccerrorMsg();
                        }
                    }
                } else {
                    lookupResult[cardName(i)]['points de vie'] = [];
                    lookupResult[cardName(i)]['points de vie'][cardLevel(i)] = 0;
                }
            }
            hitpointsAverage = hitpointsTotal / 8;
            hitpointsBar = (hitpointsAverage * 100) / 4500; // 4500 is the max capacity of the bar
            hitpointsBarDiff = 100 - hitpointsBar;
            $("#ccalc-averageHitpoints .bar1").css("width", hitpointsBar + "%");
            $("#ccalc-bar-value-averageHitpoints").text(round(2,hitpointsAverage));
            $("#ccalc-averageHitpoints .bar2").css("width", hitpointsBarDiff + "%");
            // ************************ Bar: Average DPS ***********************
            var dpsTotal, dpsAverage, dpsBar, dpsBarDiff, doubledDPSValue;
            dpsTotal = 0;
            // Sum card DPS values
            for (i = 1; i < 9; i++) {
                // (Count value was checked and saved to the object by the average hitpoints loop)
                // Make sure the card can have DPS
                if (lookupResult[cardName(i)].type == "Combattant" || lookupResult[cardName(i)].type == "Bâtiment") {
                    // Check for an abnormal card then check for missing value
                    // Cards with multiple troop types
                    if (cardName(i) == "Golem") {
                        if (lookupResult[cardName(i)]["dégâts par seconde du golem"] !== undefined && lookupResult[cardName(i)]["dégâts par seconde des golemites"] !== undefined) {
                            dpsTotal += Number(lookupResult[cardName(i)]["dégâts par seconde du golem"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["dégâts par seconde des golemites"][cardLevel(i)]));
                            lookupResult[cardName(i)]['dégâts par seconde'] = [];
                            lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = Number(lookupResult[cardName(i)]["dégâts par seconde du golem"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["dégâts par seconde des golemites"][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Molosse de lave") {
                        if (lookupResult[cardName(i)]['dégâts par seconde du molosse de lave'] !== undefined && lookupResult[cardName(i)]['dégâts par seconde des roquets de lave'] !== undefined) {
                            dpsTotal += Number(lookupResult[cardName(i)]['dégâts par seconde du molosse de lave'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['dégâts par seconde des roquets de lave'][cardLevel(i)]));
                            lookupResult[cardName(i)]['dégâts par seconde'] = [];
                            lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = Number(lookupResult[cardName(i)]['dégâts par seconde du molosse de lave'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['dégâts par seconde des roquets de lave'][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Gang de gobelins") {
                        if (lookupResult[cardName(i)]['dégâts par seconde des gobelins'] !== undefined && lookupResult[cardName(i)]['dégâts par seconde des gobelins à lances'] !== undefined) {
                            dpsTotal += (3 * Number(lookupResult[cardName(i)]['dégâts par seconde des gobelins'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['dégâts par seconde des gobelins à lances'][cardLevel(i)]));
                            lookupResult[cardName(i)]['dégâts par seconde'] = [];
                            lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = ((3 * Number(lookupResult[cardName(i)]['dégâts par seconde des gobelins'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['dégâts par seconde des gobelins à lances'][cardLevel(i)]))) / 6;
                        } else {
                            ccerrorMsg();
                        }
                    // Inferno Tower damage charges
                    } else if (cardName(i) == "Tour de l'enfer") {
                        dpsTotal += 200 + (Number(cardLevel(i)) * 20);
                        lookupResult[cardName(i)]['dégâts par seconde'] = [];
                        lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = 200 + (Number(cardLevel(i)) * 20);
                    // Inferno Dragon damage charges
                    } else if (cardName(i) == "Dragon de l'enfer") {
                        dpsTotal += 160 + (Number(cardLevel(i)) * 20);
                        lookupResult[cardName(i)]['dégâts par seconde'] = [];
                        lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = 200 + (Number(cardLevel(i)) * 20);
                    // Spawner building DPS ignored, Elixir Collector does no damage
                    } else if (cardName(i) == "Cabane de barbare" || cardName(i) == "Cabane de gobelin" || cardName(i) == "Extracteur d'élixir" || cardName(i) == "Fournaise" || cardName(i) == "Pierre tombale") {
                        dpsTotal += 0;
                        lookupResult[cardName(i)]['dégâts par seconde'] = [];
                        lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = 0;
                    // All other cards (normal success)
                    } else if (lookupResult[cardName(i)]['dégâts par seconde'] !== undefined) {
                        // Deal with cards with "x2" in the DPS cell
                        if (String(lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)]).includes("x2") === true) {
                            doubledDPSValue = String(lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)]);
                            lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = Number(doubledDPSValue.replace("x2", "").replace(/\s/g, "")) * 2;
                        // Most cards
                        } else {
                            dpsTotal += Number(lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)]) * Number(lookupResult[cardName(i)].nombre);
                        }
                    // Use Damage if DPS is not present
                    } else if (lookupResult[cardName(i)].dégâts !== undefined) {
                        dpsTotal += Number(lookupResult[cardName(i)].dégâts[cardLevel(i)]) * Number(lookupResult[cardName(i)].nombre);
                        lookupResult[cardName(i)]['dégâts par seconde'] = [];
                        lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = Number(lookupResult[cardName(i)].dégâts[cardLevel(i)]);
                    // Use Area Damage if DPS and Damage are both not present
                    } else if (lookupResult[cardName(i)]['dégâts de zone'] !== undefined) {
                        dpsTotal += Number(lookupResult[cardName(i)]['dégâts de zone'][cardLevel(i)]) * Number(lookupResult[cardName(i)].nombre);
                        lookupResult[cardName(i)]['dégâts par seconde'] = [];
                        lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = Number(lookupResult[cardName(i)]['dégâts de zone'][cardLevel(i)]);
                    // Throw error
                    } else {
                        ccerrorMsg();
                    }
                } else {
                    // For spells
                    lookupResult[cardName(i)]['dégâts par seconde'] = [];
                    lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] = 0;
                }
            }
            dpsAverage = dpsTotal / 8;
            dpsBar = (dpsAverage * 100) / 500; // 500 is the max capacity of the bar
            dpsBarDiff = 100 - dpsBar;
            $("#ccalc-averageDPS .bar1").css("width", dpsBar + "%");
            $("#ccalc-bar-value-averageDPS").text(round(2,dpsAverage));
            $("#ccalc-averageDPS .bar2").css("width", dpsBarDiff + "%");
            // ********************** Bar: Card Type **********************
            var cardTypeTroop, cardTypeSpell, cardTypeBuilding;
            cardTypeTroop = 0;
            cardTypeSpell = 0;
            cardTypeBuilding = 0;
            // Count number of each card type
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type === "Combattant") {
                    cardTypeTroop++;
                } else if (lookupResult[cardName(i)].type === "Sort") {
                    cardTypeSpell++;
                } else {
                    cardTypeBuilding++;
                }
            }
            cardTypeTroop *= 12.5;
            cardTypeSpell *= 12.5;
            cardTypeBuilding *= 12.5;
            $("#ccalc-cardType .bar1").css("width", cardTypeTroop + "%").attr("data-bar-fill", cardTypeTroop);
            $("#ccalc-cardType .bar2").css("width", cardTypeSpell + "%").attr("data-bar-fill", cardTypeSpell);
            $("#ccalc-cardType .bar3").css("width", cardTypeBuilding + "%").attr("data-bar-fill", cardTypeBuilding);
            // ********************** Bar: Can Target **********************
            var targetsNone, targetsBuilding, targetsGround, targetsAny;
            targetsAny = 0;
            targetsGround = 0;
            targetsBuilding = 0;
            targetsNone = 0;
            // Count number of each target type
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].cibles === "Air & Sol" || lookupResult[cardName(i)].cibles === "Air et Sol" || lookupResult[cardName(i)].cibles === "Combattants" || cardName(i) == "Gang de gobelins") {
                    targetsAny++;
                } else if (lookupResult[cardName(i)].cibles === "Sol") {
                    targetsGround++;
                } else if (lookupResult[cardName(i)].cibles === "Bâtiment" || lookupResult[cardName(i)].cibles === "Bâtiments") {
                    targetsBuilding++;
                } else {
                    targetsNone++;
                }
            }
            targetsAny *= 12.5;
            targetsGround *= 12.5;
            targetsBuilding *= 12.5;
            targetsNone *= 12.5;
            $("#ccalc-canTarget .bar1").css("width", targetsAny + "%").attr("data-bar-fill", targetsAny);
            $("#ccalc-canTarget .bar2").css("width", targetsGround + "%").attr("data-bar-fill", targetsGround);
            $("#ccalc-canTarget .bar3").css("width", targetsBuilding + "%").attr("data-bar-fill", targetsBuilding);
            $("#ccalc-canTarget .bar4").css("width", targetsNone + "%").attr("data-bar-fill", targetsNone);
            // ********************** Bar: Damage Type **********************
            var dmgTypeSplash, dmgTypeSingle, dmgTypeNone;
            dmgTypeSplash = 0;
            dmgTypeSingle = 0;
            dmgTypeNone = 0;
            // Count number of each damage type
            for (i = 1; i < 9; i++) {
                if ($.isEmptyObject(lookupResult[cardName(i)]['dégâts de zone']) === false || cardName(i) == "Tornade" || cardName(i) == "La Bûche") {
                    dmgTypeSplash++;
                } else if ($.isEmptyObject(lookupResult[cardName(i)].dégâts) === false || cardName(i) == "Golem" || cardName(i) == "Molosse de lave" || cardName(i) == "Gang de gobelins") {
                    dmgTypeSingle++;
                } else {
                    dmgTypeNone++;
                }
            }
            dmgTypeSplash *= 12.5;
            dmgTypeSingle *= 12.5;
            dmgTypeNone *= 12.5;
            $("#ccalc-damageType .bar1").css("width", dmgTypeSplash + "%").attr("data-bar-fill", dmgTypeSplash);
            $("#ccalc-damageType .bar2").css("width", dmgTypeSingle + "%").attr("data-bar-fill", dmgTypeSingle);
            $("#ccalc-damageType .bar3").css("width", dmgTypeNone + "%").attr("data-bar-fill", dmgTypeNone);
            // *********** Remove certain bars if they are zero. ************
            $("#ccalc-analysis-bars .bar-fully-hide").each(function() {
                if ($(this).attr("data-bar-fill") === "0") {
                    $(this).children().css("opacity", "0");
                } else {
                    $(this).children().css("opacity", "1");
                }
            });
            // **************************** Card Comparison Table ****************************
            // Add Card Names and color them
            for (i = 1; i < 9; i++) {
                var cardComparisonNameLoop = i + 1;
                if (cardRarity(i) == "Commune") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span style="color: #404040; font-weight: bold;">' + cardName(i) + '</span>');
                } else if (cardRarity(i) == "Rare") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span style="color: #e68a00; font-weight: bold;">' + cardName(i) + '</span>');
                } else if (cardRarity(i) == "Épique") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span style="color: #b300b3; font-weight: bold;">' + cardName(i) + '</span>');
                } else if (cardRarity(i) == "Légendaire") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span class="text-legendary" style="font-weight: bold;">' + cardName(i) + '</span>');
                }
            }
            // Elixir Cost column
            // The deckElixir array was generated earlier for the minimum cycle cost bar
            $("#ccalc-cardComparison tr td:nth-of-type(2)").each(function() {
                if ($(this).text() == deckElixir[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckElixir[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckElixir[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckElixir[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckElixir[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckElixir[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckElixir[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckElixir[7]) {$(this).css("background-color", "#45DE68");}
            });
            // HP column
            var deckHP = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"4","text",round(0,lookupResult[cardName(i)]['points de vie'][cardLevel(i)] * Number(lookupResult[cardName(i)].nombre)));
                deckHP.push(cardCompareTable(i,"4","get"));
            }
            deckHP.sort(function(a, b){return a-b});
            $("#ccalc-cardComparison tr td:nth-of-type(4)").each(function() {
                if ($(this).text() == deckHP[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckHP[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckHP[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckHP[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckHP[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckHP[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckHP[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckHP[7]) {$(this).css("background-color", "#45DE68");}
            });
            // HP/Elixir column
            var deckHPbyCost = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"3","text",round(1,cardCompareTable(i,"4","get") / cardCompareTable(i,"2","get")));
                deckHPbyCost.push(cardCompareTable(i,"3","get"));
            }
            deckHPbyCost.sort(function(a, b){return a-b});
            $("#ccalc-cardComparison tr td:nth-of-type(3)").each(function() {
                if ($(this).text() == deckHPbyCost[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckHPbyCost[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckHPbyCost[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckHPbyCost[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckHPbyCost[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckHPbyCost[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckHPbyCost[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckHPbyCost[7]) {$(this).css("background-color", "#45DE68");}
            });
            // DPS column
            var deckDPS = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"6","text",round(0,lookupResult[cardName(i)]['dégâts par seconde'][cardLevel(i)] * Number(lookupResult[cardName(i)].nombre)));
                deckDPS.push(cardCompareTable(i,"6","get"));
            }
            deckDPS.sort(function(a, b){return a-b});
            $("#ccalc-cardComparison tr td:nth-of-type(6)").each(function() {
                if ($(this).text() == deckDPS[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckDPS[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckDPS[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckDPS[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckDPS[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckDPS[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckDPS[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckDPS[7]) {$(this).css("background-color", "#45DE68");}
            });
            // DPS/Elixir column
            var deckDPSbyCost = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"5","text",round(1,cardCompareTable(i,"6","get") / cardCompareTable(i,"2","get")));
                deckDPSbyCost.push(cardCompareTable(i,"5","get"));
            }
            deckDPSbyCost.sort(function(a, b){return a-b});
            $("#ccalc-cardComparison tr td:nth-of-type(5)").each(function() {
                if ($(this).text() == deckDPSbyCost[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckDPSbyCost[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckDPSbyCost[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckDPSbyCost[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckDPSbyCost[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckDPSbyCost[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckDPSbyCost[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckDPSbyCost[7]) {$(this).css("background-color", "#45DE68");}
            });
            // Range column
            /* Remove non-numerical characters and assign range as 0 if it is undefined */
            var standardizedRange, stringRange;
            for (i = 1; i < 9; i++) {
                stringRange = String(lookupResult[cardName(i)].portée);
                /* Remove blind spot values from any cards with defined blind spots */
                if (stringRange.includes("-") === true) {
                    stringRange = stringRange.slice(stringRange.indexOf("-") + 1);
                }
                standardizedRange = stringRange.replace(/[^0-9$.,]/g, "");
                if (isNaN(standardizedRange) === true) {
                    lookupResult[cardName(i)].portée = 0;
                } else {
                    lookupResult[cardName(i)].portée = Number(standardizedRange);
                }
            }
            /* Set the column */
            var deckRange = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"7","text",lookupResult[cardName(i)].portée);
                deckRange.push(cardCompareTable(i,"7","get"));
            }
            deckRange.sort(function(a, b){return a-b});
            $("#ccalc-cardComparison tr td:nth-of-type(7)").each(function() {
                if ($(this).text() == deckRange[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckRange[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckRange[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckRange[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckRange[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckRange[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckRange[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckRange[7]) {$(this).css("background-color", "#45DE68");}
            });
            // Hit Speed column
            /* Remove non-numerical characters and assign hit speed as 0 if it is undefined */
            var standardizedHitSpeed, stringHitSpeed;
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)]['vitesse de frappe'] !== undefined) {
                    stringHitSpeed = String(lookupResult[cardName(i)]['vitesse de frappe']);
                } else {
                    stringHitSpeed = "0";
                }
                standardizedHitSpeed = stringHitSpeed.replace(/[^0-9$.,]/g, "");
                if (isNaN(standardizedHitSpeed) === true) {
                    lookupResult[cardName(i)]['vitesse de frappe'] = 0;
                } else {
                    lookupResult[cardName(i)]['vitesse de frappe'] = Number(standardizedHitSpeed);
                }
            }
            /* Set the column */
            var deckHitSpeed = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"8","text",lookupResult[cardName(i)]['vitesse de frappe']);
                deckHitSpeed.push(cardCompareTable(i,"8","get"));
            }
            deckHitSpeed.sort(function(a, b){return b-a});
            $("#ccalc-cardComparison tr td:nth-of-type(8)").each(function() {
                if ($(this).text() == deckHitSpeed[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckHitSpeed[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckHitSpeed[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckHitSpeed[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckHitSpeed[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckHitSpeed[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckHitSpeed[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckHitSpeed[7]) {$(this).css("background-color", "#45DE68");}
            });
            // Count column
            var deckCount = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"9","text",lookupResult[cardName(i)].nombre);
                deckCount.push(cardCompareTable(i,"9","get"));
            }
            deckCount.sort(function(a, b){return a-b});
            $("#ccalc-cardComparison tr td:nth-of-type(9)").each(function() {
                if ($(this).text() == deckCount[1]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckCount[2]) {$(this).css("background-color", "#FFC054");}
                if ($(this).text() == deckCount[5]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckCount[6]) {$(this).css("background-color", "#B5FF8A");}
                if ($(this).text() == deckCount[3]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckCount[4]) {$(this).css("background-color", "#F6FF78");}
                if ($(this).text() == deckCount[0]) {$(this).css("background-color", "#FF9E9E");}
                if ($(this).text() == deckCount[7]) {$(this).css("background-color", "#45DE68");}
            });
            // Target column
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].cibles == "Air & Sol" || lookupResult[cardName(i)].cibles == "Air et Sol" || lookupResult[cardName(i)].cibles == "Combattants" || cardName(i) == "Gang de gobelins") {
                    cardCompareTable(i,"10","html","<span class='ion-android-star'></span>");
                    cardCompareTable(i,"10","color","#45DE68");
                } else if (lookupResult[cardName(i)].cibles == "Sol") {
                    cardCompareTable(i,"10","html","<span class='ion-android-walk'></span>");
                    cardCompareTable(i,"10","color","#F6FF78");
                } else if (lookupResult[cardName(i)].cibles == "Bâtiments" || lookupResult[cardName(i)].cibles == "Bâtiment") {
                    cardCompareTable(i,"10","html","<span class='ion-home'></span>");
                    cardCompareTable(i,"10","color","#FFC054");
                } else {
                    cardCompareTable(i,"10","html","<span class='ion-close'></span>");
                    cardCompareTable(i,"10","color","#FF9E9E");
                }
            }
            // Damage Type column
            for (i = 1; i < 9; i++) {
                if ($.isEmptyObject(lookupResult[cardName(i)]['dégâts de zone']) === false || cardName(i) == "Tornade" || cardName(i) == "La Bûche") {
                    cardCompareTable(i,"11","html","<span class='ion-fireball'></span>");
                    cardCompareTable(i,"11","color","#45DE68");
                } else if ($.isEmptyObject(lookupResult[cardName(i)].dégâts) === false || cardName(i) == "Golem" || cardName(i) == "Molosse de lave" || cardName(i) == "Gang de gobelins") {
                    cardCompareTable(i,"11","html","<span class='fa fa-crosshairs'></span>");
                    cardCompareTable(i,"11","color","#F6FF78");
                } else {
                    cardCompareTable(i,"11","html","<span class='ion-close'></span>");
                    cardCompareTable(i,"11","color","#FF9E9E");
                }
            }
            // ******************************* Substitutions Table *******************************
            // Clear table from previous submission
            $("#ccalc-substitutions td").html("");
            // Add selected card images
            substitutionsCardImage("1");
            substitutionsCardImage("2");
            substitutionsCardImage("3");
            substitutionsCardImage("4");
            substitutionsCardImage("5");
            substitutionsCardImage("6");
            substitutionsCardImage("7");
            substitutionsCardImage("8");
            // Count number of roles
            var numOfCardRoles = 0;
            for (var x in cardRole) {
                numOfCardRoles++;
            }
            // Determine each card's role number and save it to the lookupResult object
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("1")) > -1) {
                    lookupResult[cardName("1")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("2")) > -1) {
                    lookupResult[cardName("2")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("3")) > -1) {
                    lookupResult[cardName("3")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("4")) > -1) {
                    lookupResult[cardName("4")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("5")) > -1) {
                    lookupResult[cardName("5")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("6")) > -1) {
                    lookupResult[cardName("6")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("7")) > -1) {
                    lookupResult[cardName("7")].role = String(i);
                    break;
                }
            }
            for (i = 1; i <= numOfCardRoles; i++) {
                if (cardRole[i].indexOf(cardName("8")) > -1) {
                    lookupResult[cardName("8")].role = String(i);
                    break;
                }
            }
            // Add similar cards to the Substitutions table based on role number
            if (lookupResult[cardName("1")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards1").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("1")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("1")].role][i],"1");
                }
            }
            if (lookupResult[cardName("2")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards2").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("2")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("2")].role][i],"2");
                }
            }
            if (lookupResult[cardName("3")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards3").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("3")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("3")].role][i],"3");
                }
            }
            if (lookupResult[cardName("4")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards4").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("4")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("4")].role][i],"4");
                }
            }
            if (lookupResult[cardName("5")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards5").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("5")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("5")].role][i],"5");
                }
            }
            if (lookupResult[cardName("6")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards6").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("6")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("6")].role][i],"6");
                }
            }
            if (lookupResult[cardName("7")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards7").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("7")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("7")].role][i],"7");
                }
            }
            if (lookupResult[cardName("8")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards8").append('<p class="ccalc-sub-unique">C\'est une carte tout à fait unique.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("8")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("8")].role][i],"8");
                }
            }
            // *********************** Permalink ************************
            var inputDeck = {rarity1: cardRarity(1), card1: cardName(1), level1: cardLevel(1), rarity2: cardRarity(2), card2: cardName(2), level2: cardLevel(2), rarity3: cardRarity(3), card3: cardName(3), level3: cardLevel(3), rarity4: cardRarity(4), card4: cardName(4), level4: cardLevel(4), rarity5: cardRarity(5), card5: cardName(5), level5: cardLevel(5), rarity6: cardRarity(6), card6: cardName(6), level6: cardLevel(6), rarity7: cardRarity(7), card7: cardName(7), level7: cardLevel(7), rarity8: cardRarity(8), card8: cardName(8), level8: cardLevel(8)};
            $("#ccalcPermalink").val("http://fr.clashroyale.wikia.com/wiki/Deck_Builder?" + $.param(inputDeck));
            // ******************************* Damaging Spell Counters *******************************
            // Clear section from previous submission
            $("#ccalc-damagingSpellCounters").html("");
            // Determine whether or not to restrict to tournament standard cap
            var spellCounterCap;
            if ($("#cardCalculator-result input#spellCounterCapCheckbox").prop('checked') === true) {
                spellCounterCap = true;
            } else {
                spellCounterCap = false;
            }
            // Find what each spell defeats
                /* Each loop checks that:
                    - the card is not a spell (it can have hitpoints)
                    - the spell cannot defeat the card at every level
                    - the spell can defeat the card at atleast one level
                    - the card does not have a shield or similar mechanic
                    - the spell does not cost more than 2 Elixir more than the card
                    - for The Log: card must be a ground troop or building
                */
            // Arrows
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Sort" && Number(lookupResult.Flèches.coût) - Number(lookupResult[cardName(i)].coût) <= 2 && Number(lookupResult.Flèches["dégâts de zone"][1]) < Number(lookupResult[cardName(i)]['points de vie'][maxCardLevel(cardRarity(i))]) && Number(lookupResult.Flèches["dégâts de zone"][maxCardLevel("Commune")]) >= Number(lookupResult[cardName(i)]['points de vie'][1]) && cardName(i) !== "Gardes" && cardName(i) !== "Prince ténébreux" && cardName(i) !== "Bélier de combat") {
                    for (x = 1; x <= maxCardLevel("Commune", spellCounterCap); x++) {
                        if (Number(lookupResult.Flèches["dégâts de zone"][x]) >= Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)])) {
                            displaySpellCounter('Flèches',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Fireball
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Sort" && Number(lookupResult["Boule de feu"].coût) - Number(lookupResult[cardName(i)].coût) <= 2 && Number(lookupResult["Boule de feu"]["dégâts de zone"][1]) < Number(lookupResult[cardName(i)]['points de vie'][maxCardLevel(cardRarity(i))]) && Number(lookupResult["Boule de feu"]["dégâts de zone"][maxCardLevel("Rare")]) >= Number(lookupResult[cardName(i)]['points de vie'][1]) && cardName(i) !== "Gardes" && cardName(i) !== "Prince ténébreux" && cardName(i) !== "Bélier de combat") {
                    for (x = 1; x <= maxCardLevel("Rare", spellCounterCap); x++) {
                        if (Number(lookupResult["Boule de feu"]["dégâts de zone"][x]) >= Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)])) {
                            displaySpellCounter('Boule de feu',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Lightning
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Sort" && Number(lookupResult.Foudre.coût) - Number(lookupResult[cardName(i)].coût) <= 2 && Number(lookupResult.Foudre.dégâts[1]) < Number(lookupResult[cardName(i)]['points de vie'][maxCardLevel(cardRarity(i))]) && Number(lookupResult.Foudre.dégâts[maxCardLevel("Épique")]) >= Number(lookupResult[cardName(i)]['points de vie'][1]) && cardName(i) !== "Gardes" && cardName(i) !== "Prince ténébreux" && cardName(i) !== "Bélier de combat") {
                    for (x = 1; x <= maxCardLevel("Épique", spellCounterCap); x++) {
                        if (Number(lookupResult.Foudre.dégâts[x]) >= Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)])) {
                            displaySpellCounter('Foudre',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Rocket
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Sort" && Number(lookupResult.Roquette.coût) - Number(lookupResult[cardName(i)].coût) <= 2 && Number(lookupResult.Roquette["dégâts de zone"][1]) < Number(lookupResult[cardName(i)]['points de vie'][maxCardLevel(cardRarity(i))]) && Number(lookupResult.Roquette["dégâts de zone"][maxCardLevel("Rare")]) >= Number(lookupResult[cardName(i)]['points de vie'][1]) && cardName(i) !== "Gardes" && cardName(i) !== "Prince ténébreux" && cardName(i) !== "Bélier de combat") {
                    for (x = 1; x <= maxCardLevel("Rare", spellCounterCap); x++) {
                        if (Number(lookupResult.Roquette["dégâts de zone"][x]) >= Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)])) {
                            displaySpellCounter('Roquette',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Zap
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Sort" && Number(lookupResult.Électrocution.coût) - Number(lookupResult[cardName(i)].coût) <= 2 && Number(lookupResult.Électrocution["dégâts de zone"][1]) < Number(lookupResult[cardName(i)]['points de vie'][maxCardLevel(cardRarity(i))]) && Number(lookupResult.Électrocution["dégâts de zone"][maxCardLevel("Commune")]) >= Number(lookupResult[cardName(i)]['points de vie'][1]) && cardName(i) !== "Gardes" && cardName(i) !== "Prince ténébreux" && cardName(i) !== "Bélier de combat") {
                    for (x = 1; x <= maxCardLevel("Commune", spellCounterCap); x++) {
                        if (Number(lookupResult.Électrocution["dégâts de zone"][x]) >= Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)])) {
                            displaySpellCounter('Électrocution',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // The Log
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Sort" && Number(lookupResult["La Bûche"].coût) - Number(lookupResult[cardName(i)].coût) <= 2 && Number(lookupResult["La Bûche"]["dégâts de zone"][1]) < Number(lookupResult[cardName(i)]['points de vie'][maxCardLevel(cardRarity(i))]) && Number(lookupResult["La Bûche"]["dégâts de zone"][maxCardLevel("Légendaire")]) >= Number(lookupResult[cardName(i)]['points de vie'][1]) && cardName(i) !== "Gardes" && cardName(i) !== "Prince ténébreux" && cardName(i) !== "Bélier de combat") {
                    if (lookupResult[cardName(i)].type == "Combattant" && lookupResult[cardName(i)].déplacement == "Air" || lookupResult[cardName(i)].déplacement === "Airs") {} else {
                        for (x = 1; x <= maxCardLevel("Légendaire", spellCounterCap); x++) {
                            if (Number(lookupResult["La Bûche"]["dégâts de zone"][x]) >= Number(lookupResult[cardName(i)]['points de vie'][cardLevel(i)])) {
                                displaySpellCounter('La Bûche',x,cardName(i),cardLevel(i));
                                break;
                            }
                        }
                    }
                }
            }
            // Add card images
            $(".ccalc-display-card").each(function() {
                var ccalcDisplayCardThis = $(this);
                var displayCardName = $(ccalcDisplayCardThis).attr("data-display-card");
                $.getJSON('/api.php?action=parse&text={{Carte|Name=' + displayCardName + '|Scale=.3|Position=middle|Link=}}&format=json', function(n) {
                    var retrievedDisplayCardImage = n.parse.text['*'];
                    $(ccalcDisplayCardThis).html(retrievedDisplayCardImage);
                });
            });
        } else {
            // This is the else of the original "check for objects" if statement.
            ccerrorMsg();
        }
    });
});
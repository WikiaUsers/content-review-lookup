/*

===== Clash Royale Outil de générateur de Decks aléatoires =====
    Par King Dragonhoff
	Traduit de l'anglais par Lowyx
    
Dependences
    - Le Modèle:Carte est utilisé pour afficher les images des cartes.
    - La bouton "Analyser" envoie l'utilisateur sur l'outil de Deck Builder.
    
Maintenance
    - Quand de nouvelles cartes sont ajoutées au jeu,
      ajoutez-les dans les tableaux appropriés ci-dessous.
    - Si un attribut majeur d'une carte, ex: le coût
	  élixir est changé, déplacez-la dans le
	  tableau approprié.
    - Si les règles de tournoi consacrées au
	  niveaux des cartes sont changés, mettez à
	  jour la fonction dcalcCardLevel ci-dessous.
	  
Array ≈ tableau 
*/

// ******************** Card name arrays ********************
// All Cards (remember to copy this array into the rebuildPool function below when updating)
var cardPool = ['Archers','Flèches','Bébé dragon','Ballon','Voleuse','Cabane de barbare','Barbares','Bélier de combat','Tour à bombes','Bombardier','Bouliste','Canon','Clonage','Prince ténébreux','Gobelin à sarbacane','Électro-sorcier','Barbares d\'élite','Extracteur d\'élixir','Bourreau','Esprits de feu','Boule de feu','Gel','Fournaise','Géant','Squelette géant','Fût à gobelins','Gang de gobelins','Cabane de gobelin','Gobelins','Golem','Guérison','Cimetière','Gardes','Chevaucheur de cochon','Golem de glace','Esprit de glace','Sorcier de glace','Dragon de l\'enfer','Tour de l\'enfer','Chevalier','Molosse de lave','Foudre','Bûcheron','Méga gargouille','Mineur','Mini P.E.K.K.A','Horde de gargouilles','Gargouilles','Miroir','Mortier','Mousquetaire','P.E.K.K.A','Poison','Prince','Princesse','Rage','Roquette','Géant royal','Armée de squelettes','Squelettes','Zappy','Gobelins à lances','Tesla','La bûche','Trois mousquetaires','Pierre tombale','Tornade','Valkyrie','Sorcière','Sorcier','Arc-X','Électrocution','Sorcière de la nuit','Chauves-souris','Sapeurs','Chasseur','Fût à barbares','Archer magique','Fût à squelettes','Machine volante','Recrues royales','Cochons royaux','Méga chevalier','Méga boule de neige','Fripons','Séisme','Gobelin géant','Artificière','Charrette à canon','Cavabélier','Pêcheur','Golem élixir','Électroucuteurs','Électro-dragon','Cage gobeline','Guérisseuse armée','Fantôme royal','Colis royal'];
// By elixir cost
var cardsByCost = [
    /* 0 */[],
    /* 1 */['Esprit de glace','Miroir','Squelettes','Guérison'],
    /* 2 */['Esprits de feu','Gobelins','Golem de glace','Rage','Gobelins à lances','La bûche','Électrocution','Chauves-souris','Sapeurs','Méga boule de neige'],
    /* 3 */['Archers','Flèches','Voleuse','Bombardier','Canon','Clonage','Gobelin à sarbacane','Fût à gobelins','Gang de gobelins','Gardes','Sorcier de glace','Chevalier','Méga gargouille','Mineur','Gargouilles','Princesse','Armée de squelettes','Pierre tombale','Tornade','Fût à barbares','Fût à squelettes','Séisme','Artificière','Pêcheur','Golem élixir','Fantôme royal','Colis royal'],
    /* 4 */['Bébé dragon','Bélier de combat','Prince ténébreux','Électro-sorcier','Boule de feu','Gel','Fournaise','Chevaucheur de cochon','Dragon de l\'enfer','Bûcheron','Mini P.E.K.K.A','Mortier','Mousquetaire','Poison','Tour à bombes','Tesla','Valkyrie','Sorcière de la nuit','Chasseur','Archer magique','Machine volante','Électrocuteurs','Cage gobeline','Guérisseuse armée'],
    /* 5 */['Ballon','Barbares','Bouliste','Bourreau','Géant','Cabane de gobelin','Cimetière','Tour de l\'enfer','Horde de gargouilles','Prince','Sorcière','Sorcier','Cochons royaux','Fripons','Charrette à canon','Cavabélier','Électro-dragon'],
    /* 6 */['Extracteur d\'élixir','Barbares d\'élite','Squelette géant','Foudre','Roquette','Géant royal','Zappy','Arc-X','Gobelin géant'],
    /* 7 */['Cabane de barbare','Molosse de lave','P.E.K.K.A','Recrues royales','Méga chevalier'],
    /* 8 */['Golem'],
    /* 9 */['Trois mousquetaires']
];
// By rarity
var cardsByRarity = {
    common:['Archers','Flèches','Barbares','Bombardier','Canon','Barbares d\'élite','Esprits de feu','Gang de gobelins','Gobelins','Esprit de glace','Chevalier','Horde de gargouilles','Gargouilles','Mortier','Géant royal','Squelettes','Gobelins à lances','Tesla','Électrocution','Chauves-souris','Fût à squelettes','Recrues royales','Méga boule de neige','Fripons','Artificière','Colis royal'],
    rare:['Cabane de barbare','Bélier de combat','Tour à bombes','Gobelin à sarbacane','Extracteur d\'élixir','Boule de feu','Fournaise','Géant','Cabane de gobelin','Guérison','Chevaucheur de cochon','Golem de glace','Tour de l\'enfer','Méga gargouille','Mini P.E.K.K.A','Mousquetaire','Roquette','Trois mousquetaires','Pierre tombale','Valkyrie','Sorcier','Machine volante','Cochons royaux','Séisme','Golem élixir','Électrocuteurs','Cage gobeline','Guérisseuse armée'],
    epic:['Bébé dragon','Ballon','Bouliste','Clonage','Prince ténébreux','Bourreau','Gel','Squelette géant','Fût à gobelins','Golem','Gardes','Foudre','Miroir','P.E.K.K.A','Poison','Prince','Rage','Armée de squelettes','Tornade','Sorcière','Arc-X','Sapeurs','Chasseur','Fût à barbares','Gobelin géant','Charrette à canon','Électro-dragon'],
    legendary:['Électro-sorcier','Cimetière','Sorcier de glace','Dragon de l\'enfer','Molosse de lave','Bûcheron','Mineur','Princesse','Zappy','La bûche','Voleuse','Sorcière de la nuit','Archer magique','Méga chevalier','Cavabélier','Pêcheur','Fantôme royal']
};
// By type
var cardsByType = {
    troop:{
        ground:['Archers','Barbares','Bélier de combat','Bombardier','Bouliste','Prince ténébreux','Gobelin à sarbacane','Électro-sorcier','Barbares d\'élite','Bourreau','Esprits de feu','Géant','Squelette géant','Gobelins','Golem','Gardes','Chevaucheur de cochon','Golem de glace','Esprit de glace','Sorcier de glace','Chevalier','Bûcheron','Mineur','Mini P.E.K.K.A','Mousquetaire','P.E.K.K.A','Prince','Princesse','Géant royal','Armée de squelettes','Squelettes','Zappy','Gobelins à lances','Trois mousquetaires','Valkyrie','Sorcière','Sorcier','Voleuse','Sorcière de la nuit','Gang de gobelins','Sapeurs','Chasseur','Archer magique','Recrues royales','Cochons royaux','Méga chevalier','Fripons','Gobelin géant','Artificière','Charrette à canon','Cavabélier','Pêcheur','Golem élixir','Électrocuteurs','Guérisseuse armée','Fantôme royal'],
        air:['Bébé dragon','Ballon','Dragon de l\'enfer','Molosse de lave','Méga gargouille','Horde de gargouilles','Gargouilles','Chauves-souris','Fût à squelettes','Machine volante','Électro-dragon']
    },
    spell:['Flèches','Clonage','Boule de feu','Gel','Fût à gobelins','Cimetière','Guérison','Foudre','Miroir','Poison','Rage','Roquette','La bûche','Tornade','Électrocution','Fût à barbares','Méga boule de neige','Séisme','Colis royal'],
    building:['Cabane de barbare','Tour à bombes','Canon','Extracteur d\'élixir','Fournaise','Cabane de gobelin','Tour de l\'enfer','Mortier','Tesla','Pierre tombale','Arc-X','Cage gobeline']
};
// By arena
var cardsByArena = [
    /* 0 */['Archers','Flèches','Bébé dragon','Gargouilles','Boule de feu','Géant','Chevalier','Mini P.E.K.K.A','Mousquetaire','Prince','Armée de squelettes','Sapeurs'],
    /* 1 */['Fût à gobelins','Cabane de gobelin','Gobelins','Chevaucheur de cochon','Gobelins à lances','Chasseur'],
    /* 2 */['Bombardier','Valkyrie','Squelette géant','Sorcière','Squelettes','Pierre tombale'],
    /* 3 */['Cabane de barbare','Barbares','Canon','Bélier de combat','Fût à barbares','Golem'],
    /* 4 */['Électrocution','Méga gargouille','Mineur','Tour de l\'enfer','Molosse de lave','Horde de gargouilles','P.E.K.K.A','Foudre'],
    /* 5 */['Esprits de feu','Fournaise','Archer magique','Sorcière de la nuit','Tornade','Poison','Sorcier','Chauves-souris'],
    /* 6 */['Fût à squelettes','Roquette','Machine volante','Arc-X','Mortier','Dragon de l\'enfer','La bûche','Ballon'],
    /* 7 */['Prince ténébreux','Méga chevalier','Recrues royales','Gardes','Cochons royaux','Princesse','Géant royal','Trois mousquetaires'],
    /* 8 */['Bouliste','Extracteur d\'élixir','Golem de glace','Esprit de glace','Bûcheron','Sorcier de glace','Méga boule de neige','Gel'],
    /* 9 */['Gobelin à sarbacane','Gobelin géant','Gang de gobelins','Voleuse','Fripons','Séisme'],
    /* 10 */['Barbares d\'élite','Guérison','Artificière','Tour à bombes','Charrette à canon','Cavabélier','Pêcheur'],
    /* 11 */['Tesla','Golem élixir','Électrocuteur','Clonage','Électro-dragon','Électro-sorcier','Zappy'],
    /* 12 */['Colis royal','Cage gobeline','Guérisseuse armée','Miroir','Bourreau','Fantôme royal','Cimetière']
];
// ***************** Other global variables *****************
var generatedDeck = [];
// *********************** Functions ************************
function rebuildPool() {
    var x, i;
    cardPool = ['Archers','Flèches','Bébé dragon','Voleuse','Ballon','Cabane de barbare','Barbares','Bélier de combat','Tour à bombes','Bombardier','Bouliste','Canon','Clonage','Prince ténébreux','Gobelin à sarbacane','Électro-sorcier','Barbares d\'élite','Extracteur d\'élixir','Bourreau','Esprits de feu','Boule de feu','Gel','Fournaise','Géant','Squelette géant','Fût à gobelins','Gang de gobelins','Cabane de gobelin','Gobelins','Golem','Cimetière','Gardes','Guérison','Chevaucheur de cochon','Golem de glace','Esprit de glace','Sorcier de glace','Dragon de l\'enfer','Tour de l\'enfer','Chevalier','Molosse de lave','Foudre','Bûcheron','Méga gargouille','Mineur','Mini P.E.K.K.A','Horde de gargouilles','Gargouilles','Miroir','Mortier','Mousquetaire','P.E.K.K.A','Poison','Prince','Princesse','Rage','Roquette','Géant royal','Armée de squelettes','Squelettes','Zappy','Gobelins à lances','Tesla','La bûche','Trois mousquetaires','Pierre tombale','Tornade','Valkyrie','Sorcière','Sorcier','Arc-X','Électrocution','Sorcière de la nuit','Chauves-souris','Sapeurs','Chasseur','Fût à barbares','Archer magique','Fût à squelettes','Machine volante','Recrues royales','Cochons royaux','Méga chevalier','Méga boule de neige','Fripons','Séisme','Gobelin géant','Artificière','Charrette à canon','Cavabélier','Pêcheur','Golem élixir','Électrocuteurs','Électro-dragon','Cage gobeline','Guérisseuse armée','Fantôme royal','Colis royal'];
    // Elixir Cost Restriction
    for (x in cardsByCost) {
        if (x < Number($("#dcalc-restrict-cost-min").val()) || x > Number($("#dcalc-restrict-cost-max").val())) {
            for (i in cardsByCost[x]) {
                if (Number(cardPool.indexOf(cardsByCost[x][i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByCost[x][i]), 1);
                }
            }
        }
    }
    // Arena Restriction
    for (x in cardsByArena) {
        if (x > Number($("#dcalc-restrict-arena").val())) {
            for (i in cardsByArena[x]) {
                if (Number(cardPool.indexOf(cardsByArena[x][i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByArena[x][i]), 1);
                }
            }
        }
    }
    // Common Restriction
    if ($("#dcalc-restrict-common").prop("checked") === false) {
        for (i in cardsByRarity.common) {
            if (Number(cardPool.indexOf(cardsByRarity.common[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByRarity.common[i]), 1);
            }
        }
    }
    // Rare Restriction
    if ($("#dcalc-restrict-rare").prop("checked") === false) {
        for (i in cardsByRarity.rare) {
            if (Number(cardPool.indexOf(cardsByRarity.rare[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByRarity.rare[i]), 1);
            }
        }
    }
    // Epic Restriction
    if ($("#dcalc-restrict-epic").prop("checked") === false) {
        for (i in cardsByRarity.epic) {
            if (Number(cardPool.indexOf(cardsByRarity.epic[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByRarity.epic[i]), 1);
            }
        }
    }
    // Legendary Restriction
    if ($("#dcalc-restrict-legendary").prop("checked") === false) {
        for (i in cardsByRarity.legendary) {
            if (Number(cardPool.indexOf(cardsByRarity.legendary[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByRarity.legendary[i]), 1);
            }
        }
    }
    // Troop Restriction
    if ($("#dcalc-restrict-troops").prop("checked") === true && $("#dcalc-restrict-troops-ground").prop("checked") === false) {
        for (i in cardsByType.troop.ground) {
            if (Number(cardPool.indexOf(cardsByType.troop.ground[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByType.troop.ground[i]), 1);
            }
        }
    } else if ($("#dcalc-restrict-troops").prop("checked") === true && $("#dcalc-restrict-troops-air").prop("checked") === false) {
        for (i in cardsByType.troop.air) {
            if (Number(cardPool.indexOf(cardsByType.troop.air[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByType.troop.air[i]), 1);
            }
        }
    } else if ($("#dcalc-restrict-troops").prop("checked") === false) {
        for (i in cardsByType.troop.ground) {
            if (Number(cardPool.indexOf(cardsByType.troop.ground[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByType.troop.ground[i]), 1);
            }
        }
        for (i in cardsByType.troop.air) {
            if (Number(cardPool.indexOf(cardsByType.troop.air[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByType.troop.air[i]), 1);
            }
        }
    }
    // Spell Restriction
    if ($("#dcalc-restrict-spells").prop("checked") === false) {
        for (i in cardsByType.spell) {
            if (Number(cardPool.indexOf(cardsByType.spell[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByType.spell[i]), 1);
            }
        }
    }
    // Building Restriction
    if ($("#dcalc-restrict-buildings").prop("checked") === false) {
        for (i in cardsByType.building) {
            if (Number(cardPool.indexOf(cardsByType.building[i])) > -1) {
                cardPool.splice(cardPool.indexOf(cardsByType.building[i]), 1);
            }
        }
    }
}
// Update card image function
function showCardImage(card,index) {
    $.getJSON('/api.php?action=parse&text={{Carte|Name=' + card + '|Scale=.5|Link=}}&format=json', function(n) {
        var addCardTemplate = n.parse.text['*'];
        $('#deckGenerator td.dcalc-card[data-card-index="' + index + '"]').html(addCardTemplate);
    });
}
// Random Integer Generating Function
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Random Card Picking Function
function getRandomCard(index) {
    var pickedCard = cardPool[getRandomInt(0,Number(cardPool.length) - 1)];
    if (Number(generatedDeck.indexOf(pickedCard)) > -1) {
        getRandomCard(index);
    } else {
        generatedDeck.push(pickedCard);
        showCardImage(pickedCard,index);
        $('#deckGenerator td.dcalc-card[data-card-index="' + index + '"]').attr("data-card-chosen", pickedCard);
    }
}
// Get Name of picked card
function dcalcCardName(index) {
    return $('#deckGenerator td.dcalc-card[data-card-index="' + index + '"] .cr-display-card').attr("data-card-name");
}
// Get Rarity of picked card
function dcalcCardRarity(index) {
    return $('#deckGenerator td.dcalc-card[data-card-index="' + index + '"] .cr-display-card').attr("data-card-rarity");
}
// Get Tournament Standard level
function dcalcCardLevel(index) {
    var rarity = $('#deckGenerator td.dcalc-card[data-card-index="' + index + '"] .cr-display-card').attr("data-card-rarity");
    if (rarity === "Commune") {
        return 9;
    } else if (rarity === "Rare") {
        return 9;
    } else if (rarity === "Épique") {
        return 9;
    } else {
        return 9;
    }
}
// ********************** Get Started ***********************
$(document).ready(function() {
    // ************************ Form ************************
    // Toggle ground and air options if the troop option is changed
    $("#deckGenerator").on("change", "#dcalc-restrict-troops", function() {
        if ($(this).prop('checked') === true) {
            $("#dcalc-restrict-troops-ground, #dcalc-restrict-troops-air").prop("checked", true).prop("disabled", false);
        } else {
            $("#dcalc-restrict-troops-ground, #dcalc-restrict-troops-air").prop("checked", false).prop("disabled", true);
        }
    });
    // Uncheck troop option if both the ground and air options are unchecked
    $("#deckGenerator").on("change", "#dcalc-restrict-troops-ground, #dcalc-restrict-troops-air", function() {
        if ($("#dcalc-restrict-troops-ground").prop("checked") === false && $("#dcalc-restrict-troops-air").prop("checked") === false) {
            $("#dcalc-restrict-troops").prop("checked", false);
            $("#deckGenerator #dcalc-restrict-troops").change();
        }
    });
    // Add Analyze button
    $("#deckGenerator #dcalc-analyze-deck-harness").html($('<a id="dcalc-analyze-deck-a" target="_blank"><div id="dcalc-analyze-deck" class="dcalc-button">Analyser</div></a>'));
    // Min Elixir Cost Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-cost-min", function() {
        // Disable options for the max cost below this selection's value
        $("#deckGenerator #dcalc-restrict-cost-max option").each(function() {
            if (Number(this.value) < Number($("#dcalc-restrict-cost-min").val())) {
                $(this).prop("disabled", true);
            } else {
                $(this).prop("disabled", false);
            }
        });
        // Make sure max cost is not lower than the min cost selected
        if (Number(this.value) > Number($("#dcalc-restrict-cost-max").val())) {
            $(this).val($("#dcalc-restrict-cost-max").val());
        }
        var i, x;
        if (Number($(this).attr("data-previous-value")) > Number(this.value)) {
            rebuildPool();
        } else if (Number($(this).attr("data-previous-value")) < Number(this.value)) {
            for (x in cardsByCost) {
                if (x < Number(this.value)) {
                    for (i in cardsByCost[x]) {
                        if (Number(cardPool.indexOf(cardsByCost[x][i])) > -1) {
                            cardPool.splice(cardPool.indexOf(cardsByCost[x][i]), 1);
                        }
                    }
                }
            }
        }
        $(this).attr("data-previous-value", this.value);
    });
    // Max Elixir Cost Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-cost-max", function() {
        // Disable options for the min cost below this selection's value
        $("#deckGenerator #dcalc-restrict-cost-min option").each(function() {
            if (Number(this.value) > Number($("#dcalc-restrict-cost-max").val())) {
                $(this).prop("disabled", true);
            } else {
                $(this).prop("disabled", false);
            }
        });
        // Make sure max cost is not lower than the min cost selected
        if (Number(this.value) < Number($("#dcalc-restrict-cost-min").val())) {
            $(this).val($("#dcalc-restrict-cost-min").val());
        }
        var i, x;
        if (Number($(this).attr("data-previous-value")) < Number(this.value)) {
            rebuildPool();
        } else if (Number($(this).attr("data-previous-value")) > Number(this.value)) {
            for (x in cardsByCost) {
                if (x > Number(this.value)) {
                    for (i in cardsByCost[x]) {
                        if (Number(cardPool.indexOf(cardsByCost[x][i])) > -1) {
                            cardPool.splice(cardPool.indexOf(cardsByCost[x][i]), 1);
                        }
                    }
                }
            }
        }
        $(this).attr("data-previous-value", this.value);
    });
    // Arena Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-arena", function() {
        var i, x;
        if (Number($(this).attr("data-previous-value")) < Number(this.value)) {
            rebuildPool();
        } else if (Number($(this).attr("data-previous-value")) > Number(this.value)) {
            for (x in cardsByArena) {
                if (x <= Number($(this).attr("data-previous-value")) && x > Number(this.value)) {
                    for (i in cardsByArena[x]) {
                        if (Number(cardPool.indexOf(cardsByArena[x][i])) > -1) {
                            cardPool.splice(cardPool.indexOf(cardsByArena[x][i]), 1);
                        }
                    }
                }
            }
        }
        $(this).attr("data-previous-value", this.value);
    });
    // Common Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-common", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            for (i in cardsByRarity.common) {
                if (Number(cardPool.indexOf(cardsByRarity.common[i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByRarity.common[i]), 1);
                }
            }
        }
    });
    // Rare Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-rare", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            for (i in cardsByRarity.rare) {
                if (Number(cardPool.indexOf(cardsByRarity.rare[i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByRarity.rare[i]), 1);
                }
            }
        }
    });
    // Epic Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-epic", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            for (i in cardsByRarity.epic) {
                if (Number(cardPool.indexOf(cardsByRarity.epic[i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByRarity.epic[i]), 1);
                }
            }
        }
    });
    // Legendary Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-legendary", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            for (i in cardsByRarity.legendary) {
                if (Number(cardPool.indexOf(cardsByRarity.legendary[i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByRarity.legendary[i]), 1);
                }
            }
        }
    });
    // Troop Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-troops, #dcalc-restrict-troops-ground, #dcalc-restrict-troops-air", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            if ($("#dcalc-restrict-troops").prop("checked") === true && $("#dcalc-restrict-troops-ground").prop("checked") === false) {
                for (i in cardsByType.troop.ground) {
                    if (Number(cardPool.indexOf(cardsByType.troop.ground[i])) > -1) {
                        cardPool.splice(cardPool.indexOf(cardsByType.troop.ground[i]), 1);
                    }
                }
            } else if ($("#dcalc-restrict-troops").prop("checked") === true && $("#dcalc-restrict-troops-air").prop("checked") === false) {
                for (i in cardsByType.troop.air) {
                    if (Number(cardPool.indexOf(cardsByType.troop.air[i])) > -1) {
                        cardPool.splice(cardPool.indexOf(cardsByType.troop.air[i]), 1);
                    }
                }
            } else if ($("#dcalc-restrict-troops").prop("checked") === false) {
                for (i in cardsByType.troop.ground) {
                    if (Number(cardPool.indexOf(cardsByType.troop.ground[i])) > -1) {
                        cardPool.splice(cardPool.indexOf(cardsByType.troop.ground[i]), 1);
                    }
                }
                for (i in cardsByType.troop.air) {
                    if (Number(cardPool.indexOf(cardsByType.troop.air[i])) > -1) {
                        cardPool.splice(cardPool.indexOf(cardsByType.troop.air[i]), 1);
                    }
                }
            }
        }
    });
    // Spell Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-spells", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            for (i in cardsByType.spell) {
                if (Number(cardPool.indexOf(cardsByType.spell[i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByType.spell[i]), 1);
                }
            }
        }
    });
    // Building Inclusion/Exclusion
    $("#deckGenerator").on("change", "#dcalc-restrict-buildings", function() {
        var i;
        if ($(this).prop("checked") === true) {
            rebuildPool();
        } else if ($(this).prop("checked") === false) {
            for (i in cardsByType.building) {
                if (Number(cardPool.indexOf(cardsByType.building[i])) > -1) {
                    cardPool.splice(cardPool.indexOf(cardsByType.building[i]), 1);
                }
            }
        }
    });
    // Display and color card pool count
    $("#deckGenerator").on("change", "select, input", function() {
        $("#dcalc-card-pool").text(cardPool.length);
        if (Number($("#dcalc-card-pool").text()) < 8) {
            $("#dcalc-card-pool").css("color", "red");
        } else if (Number($("#dcalc-card-pool").text()) < 16) {
            $("#dcalc-card-pool").css("color", "gold");
        } else {
            $("#dcalc-card-pool").css("color", "chartreuse");
        }
    });
    $("#deckGenerator input, #deckGenerator select").change();
    // **************** Re-Roll Specific Card ***************
    $("#deckGenerator td.dcalc-card").click(function() {
        if (cardPool.length === 0) {
            alert("Aucune carte ne rencontre vos exigeances. Veuillez modifier les filtres.");
        } else {
            var rerollCardIndex = $(this).attr("data-card-index");
            var rerollCardName = $(this).attr("data-card-chosen");
            if (Number(generatedDeck.indexOf(rerollCardName)) > -1) {
                generatedDeck.splice(generatedDeck.indexOf(rerollCardName),1);
            }
            getRandomCard(rerollCardIndex);
        }
    });
    // ********************* Roll Deck **********************
    $("#deckGenerator").on("click", "#dcalc-roll-deck", function() {
        // Change "Roll" button to say "Re-Roll" after being clicked once
        $(this).text("Brasser à nouveau");
        $("#deckGenerator .dcalc-roll-or-reroll").text("Brasser à nouveau");
        // Show Analyze button
        $("#deckGenerator #dcalc-analyze-deck-harness").show();
        // Roll deck
        if (cardPool.length < 8) {
            alert("Moins de 8 cartes rencontrent vos exigeances. Veuillez modifier les filtres de telle sorte que il y ait au moins 8 cartes dans le lot");
        } else {
            // Clear generatedDeck
            generatedDeck = [];
            // Roll All 8 Cards
            getRandomCard(1);
            getRandomCard(2);
            getRandomCard(3);
            getRandomCard(4);
            getRandomCard(5);
            getRandomCard(6);
            getRandomCard(7);
            getRandomCard(8);
        }
    });
    // ********* Analyze Deck Using Deck Builder tool **********
    $("#deckGenerator").on("click", "#dcalc-analyze-deck-a", function() {
        // Change Analyze button link
        var deckGenerated = {rarity1: dcalcCardRarity(1), card1: dcalcCardName(1), level1: dcalcCardLevel(1), rarity2: dcalcCardRarity(2), card2: dcalcCardName(2), level2: dcalcCardLevel(2), rarity3: dcalcCardRarity(3), card3: dcalcCardName(3), level3: dcalcCardLevel(3), rarity4: dcalcCardRarity(4), card4: dcalcCardName(4), level4: dcalcCardLevel(4), rarity5: dcalcCardRarity(5), card5: dcalcCardName(5), level5: dcalcCardLevel(5), rarity6: dcalcCardRarity(6), card6: dcalcCardName(6), level6: dcalcCardLevel(6), rarity7: dcalcCardRarity(7), card7: dcalcCardName(7), level7: dcalcCardLevel(7), rarity8: dcalcCardRarity(8), card8: dcalcCardName(8), level8: dcalcCardLevel(8)};
        $("#deckGenerator #dcalc-analyze-deck-a").attr("href", "http://fr.clashroyale.wikia.com/wiki/Deck_Builder?" + $.param(deckGenerated));
    });
});
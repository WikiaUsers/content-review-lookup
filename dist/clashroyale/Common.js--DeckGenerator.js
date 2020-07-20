/*

===== Clash Royale Random Deck Generator tool =====
    By King Dragonhoff
    
Dependencies
    - Template:Card is used to display the card images.
    - Analyze button sends the user to the Deck Builder
      tool.
    
Maintenance
    - When new cards are added to the game, add them 
      to the appropriate card name arrays below.
    - If a major attribute of a card, such as Elixir
      cost, is changed, move it to its new card name 
      array.
    - If the tournament standard card levels are
      changed, update the dcalcCardLevel function below.

*/

// ******************** Card name arrays ********************
// All Cards (remember to copy this array into the rebuildPool function below when updating)
var cardPool = ['Archers','Arrows','Baby Dragon','Balloon','Bandit','Barbarian Hut','Barbarians','Battle Ram','Bomb Tower','Bomber','Bowler','Cannon','Clone','Dark Prince','Dart Goblin','Electro Wizard','Elite Barbarians','Elixir Collector','Executioner','Fire Spirits','Fireball','Freeze','Furnace','Giant','Giant Skeleton','Goblin Barrel','Goblin Gang','Goblin Hut','Goblins','Golem','Graveyard','Guards','Heal','Hog Rider','Ice Golem','Ice Spirit','Ice Wizard','Inferno Dragon','Inferno Tower','Knight','Lava Hound','Lightning','Lumberjack','Mega Minion','Miner','Mini P.E.K.K.A.','Minion Horde','Minions','Mirror','Mortar','Musketeer','Night Witch','P.E.K.K.A.','Poison','Prince','Princess','Rage','Rocket','Royal Giant','Skeleton Army','Skeletons','Sparky','Spear Goblins','Tesla','The Log','Three Musketeers','Tombstone','Tornado','Valkyrie','Witch','Wizard','X-Bow','Zap'];
// By elixir cost
var cardsByCost = [
    /* 0 */[],
    /* 1 */['Ice Spirit','Skeletons'],
    /* 2 */['Fire Spirits','Goblins','Ice Golem','Mirror','Rage','Spear Goblins','The Log','Zap'],
    /* 3 */['Archers','Arrows','Bandit','Bomber','Cannon','Clone','Dart Goblin','Goblin Barrel','Goblin Gang','Guards','Heal','Ice Wizard','Knight','Mega Minion','Miner','Minions','Princess','Skeleton Army','Tombstone','Tornado'],
    /* 4 */['Baby Dragon','Battle Ram','Dark Prince','Electro Wizard','Fireball','Freeze','Furnace','Hog Rider','Inferno Dragon','Lumberjack','Mini P.E.K.K.A.','Mortar','Musketeer','Night Witch','Poison','Tesla','Valkyrie'],
    /* 5 */['Balloon','Barbarians','Bomb Tower','Bowler','Executioner','Giant','Goblin Hut','Graveyard','Inferno Tower','Minion Horde','Prince','Witch','Wizard'],
    /* 6 */['Elixir Collector','Elite Barbarians','Giant Skeleton','Lightning','Rocket','Royal Giant','Sparky','X-Bow'],
    /* 7 */['Barbarian Hut','Lava Hound','P.E.K.K.A.'],
    /* 8 */['Golem'],
    /* 9 */['Three Musketeers']
];
// By rarity
var cardsByRarity = {
    common:['Archers','Arrows','Barbarians','Bomber','Cannon','Elite Barbarians','Fire Spirits','Goblin Gang','Goblins','Ice Spirit','Knight','Minion Horde','Minions','Mortar','Royal Giant','Skeletons','Spear Goblins','Tesla','Zap'],
    rare:['Barbarian Hut','Battle Ram','Bomb Tower','Dart Goblin','Elixir Collector','Fireball','Furnace','Giant','Goblin Hut','Heal','Hog Rider','Ice Golem','Inferno Tower','Mega Minion','Mini P.E.K.K.A.','Musketeer','Rocket','Three Musketeers','Tombstone','Valkyrie','Wizard'],
    epic:['Baby Dragon','Balloon','Bowler','Clone','Dark Prince','Executioner','Freeze','Giant Skeleton','Goblin Barrel','Golem','Guards','Lightning','Mirror','P.E.K.K.A.','Poison','Prince','Rage','Skeleton Army','Tornado','Witch','X-Bow'],
    legendary:['Bandit','Electro Wizard','Graveyard','Ice Wizard','Inferno Dragon','Lava Hound','Lumberjack','Miner','Night Witch','Princess','Sparky','The Log']
};
// By type
var cardsByType = {
    troop:{
        ground:['Archers','Bandit','Barbarians','Battle Ram','Bomber','Bowler','Dark Prince','Dart Goblin','Electro Wizard','Elite Barbarians','Executioner','Fire Spirits','Giant','Giant Skeleton','Goblins','Goblin Gang','Golem','Guards','Hog Rider','Ice Golem','Ice Spirit','Ice Wizard','Knight','Lumberjack','Miner','Mini P.E.K.K.A.','Musketeer','Night Witch','P.E.K.K.A.','Prince','Princess','Royal Giant','Skeleton Army','Skeletons','Sparky','Spear Goblins','Three Musketeers','Valkyrie','Witch','Wizard'],
        air:['Baby Dragon','Balloon','Inferno Dragon','Lava Hound','Mega Minion','Minion Horde','Minions']
    },
    spell:['Arrows','Clone','Fireball','Freeze','Goblin Barrel','Graveyard','Heal','Lightning','Mirror','Poison','Rage','Rocket','The Log','Tornado','Zap'],
    building:['Barbarian Hut','Bomb Tower','Cannon','Elixir Collector','Furnace','Goblin Hut','Inferno Tower','Mortar','Tesla','Tombstone','X-Bow']
};
// By arena
var cardsByArena = [
    /* 0 */['Archers','Arrows','Baby Dragon','Bomber','Fireball','Giant','Knight','Mini P.E.K.K.A.','Musketeer','Prince','Skeleton Army','Witch'],
    /* 1 */['Goblin Barrel','Goblin Hut','Goblins','Lightning','Spear Goblins','Valkyrie'],
    /* 2 */['Balloon','Bomb Tower','Giant Skeleton','Minions','Skeletons','Tombstone'],
    /* 3 */['Barbarian Hut','Barbarians','Cannon','Rage','Rocket','X-Bow'],
    /* 4 */['Freeze','Hog Rider','Inferno Dragon','Inferno Tower','Lava Hound','Minion Horde','P.E.K.K.A.','Tesla'],
    /* 5 */['Fire Spirits','Furnace','Graveyard','Ice Wizard','Mirror','Poison','Wizard','Zap'],
    /* 6 */['Battle Ram','Elixir Collector','Golem','Miner','Mortar','Sparky','The Log','Tornado'],
    /* 7 */['Dark Prince','Electro Wizard','Elite Barbarians','Guards','Mega Minion','Princess','Royal Giant','Three Musketeers'],
    /* 8 */['Bowler','Clone','Ice Golem','Ice Spirit','Lumberjack','Night Witch'],
    /* 9 */['Bandit','Dart Goblin','Executioner','Goblin Gang'],
    /* 10 */['Heal']
];
// ***************** Other global variables *****************
var generatedDeck = [];
// *********************** Functions ************************
function rebuildPool() {
    var x, i;
    cardPool = ['Archers','Arrows','Baby Dragon','Balloon','Bandit','Barbarian Hut','Barbarians','Battle Ram','Bomb Tower','Bomber','Bowler','Cannon','Clone','Dark Prince','Dart Goblin','Electro Wizard','Elite Barbarians','Elixir Collector','Executioner','Fire Spirits','Fireball','Freeze','Furnace','Giant','Giant Skeleton','Goblin Barrel','Goblin Gang','Goblin Hut','Goblins','Golem','Graveyard','Guards','Heal','Hog Rider','Ice Golem','Ice Spirit','Ice Wizard','Inferno Dragon','Inferno Tower','Knight','Lava Hound','Lightning','Lumberjack','Mega Minion','Miner','Mini P.E.K.K.A.','Minion Horde','Minions','Mirror','Mortar','Musketeer','Night Witch','P.E.K.K.A.','Poison','Prince','Princess','Rage','Rocket','Royal Giant','Skeleton Army','Skeletons','Sparky','Spear Goblins','Tesla','The Log','Three Musketeers','Tombstone','Tornado','Valkyrie','Witch','Wizard','X-Bow','Zap'];
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
    $.getJSON('/api.php?action=parse&text={{Card|Name=' + card + '|Scale=.5|Link=}}&format=json', function(n) {
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
    if (rarity === "Common") {
        return 9;
    } else if (rarity === "Rare") {
        return 7;
    } else if (rarity === "Epic") {
        return 4;
    } else {
        return 1;
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
    $("#deckGenerator #dcalc-analyze-deck-harness").html($('<a id="dcalc-analyze-deck-a" target="_blank"><div id="dcalc-analyze-deck" class="dcalc-button">Analyze</div></a>'));
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
            alert("No cards meet your specifications. Please modify the filters.");
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
        $(this).text("Re-Roll");
        $("#deckGenerator .dcalc-roll-or-reroll").text("Re-Roll");
        // Show Analyze button
        $("#deckGenerator #dcalc-analyze-deck-harness").show();
        // Roll deck
        if (cardPool.length < 8) {
            alert("Less than 8 cards meet your specifications. Please modify the filters so that there are at least 8 cards in the card pool.");
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
        $("#deckGenerator #dcalc-analyze-deck-a").attr("href", "http://clashroyale.wikia.com/wiki/Deck_Builder?" + $.param(deckGenerated));
    });
});
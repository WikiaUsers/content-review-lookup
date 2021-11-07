/*

===== Clash Royale Deck Builder tool =====
  By King Dragonhoff
  Special thanks to Blaster Niceshot
  
Dependencies
  - The Statistics section on card articles must have the appropriate ID's.
    - id="unit-statistics" should be applied to the div element
      surrounding the Statistics section.
    - id="unit-statistics-table" should be applied to the table with the 
      level-dependent statistics.
    - id="unit-attributes-table" should be applied to the table with the
      statistics that are the same for all levels of the card.
    - Remember that an ID must never be used more than once per page.
  - Cells in the unit-statistics-table must contain a number. If the exact
    statistic is unknown, enter an estimate along with Template:fact.
  - The tables on card articles must not contain cells that use the 
    colspan or rowspan attributes.
  - The header cells in the card tables must remain consistant across the site.
    (e.g. The cell must remain "Damage per second". It cannot be changed to "DPS" 
    on a page.)
  - Template:Card is used to display the card images.
  - Template:MyBattleDeck has code that allows users to save the deck shown to
    one of the save slots on the tool.
  
Maintenance
  Since this tool retrieves the card statistics and attributes from the wiki 
  articles, this script will typically only need to be modified when new
  cards are added to the game.
  - Add new cards to the ccalcInputs function (the first function) and the 
    card role objects (the first 2 variables; see User:King_Dragonhoff/Card_Roles).
  - Add new cards that spawn units on death to the operations for average
    hitpoints and DPS.
  - Add cards with a shield or things like the Battle Ram to the Spell Counters 
    checklist.
  - Add new damaging spells to the Damaging Spell Counters section code.
  - If the card has any strange exceptions (such as spawning units on death or 
    scaling damage), have the calc check those.
  - The following templates will need to be updated to account for new cards.
    - Card
    - LookupCardRarity
    - LookupCardMaxLevel (if the max level of a rarity is changed)
  - If max card levels or tournament caps are changed, modify the maxCardLevel
    function.
  
*/

// *********************** Variables and functions *************************
// Card Role objects (visualized on User:King_Dragonhoff/Card_Roles)
var cardRole = {
    1:["Giant", "Giant Skeleton", "Golem", "Lava Hound", "P.E.K.K.A.", "Ice Golem"],
    2:["Bomber", "Bowler", "Dark Prince", "Sparky", "Valkyrie" ],
    3:["Goblin Barrel", "Goblins", "Guards", "Skeleton Army", "Skeletons", "Witch", "Graveyard"],
    4:["Barbarians", "Elite Barbarians", "Knight", "Lumberjack", "Miner", "Mini P.E.K.K.A.", "Prince", "Bandit"],
    5:["Baby Dragon", "Fire Spirits", "Princess", "Wizard", "Executioner"],
    6:["Archers", "Musketeer", "Spear Goblins", "Dart Goblin", "Three Musketeers", "Goblin Gang", "Night Witch"],
    7:["Mega Minion", "Minion Horde", "Minions", "Inferno Dragon"],
    8:["Bomb Tower", "Cannon", "Inferno Tower", "Mortar", "Tesla", "X-Bow"],
    9:["Barbarian Hut", "Furnace", "Goblin Hut", "Tombstone"],
    10:["Balloon", "Hog Rider", "Royal Giant", "Battle Ram"],
    11:["Arrows", "Fireball", "Poison", "The Log", "Zap"],
    12:["Lightning", "Rocket"],
    13:["Freeze", "Ice Spirit", "Ice Wizard", "Electro Wizard"],
    14:["Rage"],
    15:["Clone","Elixir Collector", "Mirror", "Tornado", "Heal"]
};
var subCards = {
    1:["Giant", "Giant Skeleton", "Golem", "Lava Hound", "P.E.K.K.A.", "Ice Golem"],
    2:["Bomber", "Bowler", "Dark Prince", "Sparky", "Valkyrie" ],
    3:["Goblin Barrel", "Goblins", "Guards", "Skeleton Army", "Skeletons", "Witch", "Graveyard"],
    4:["Barbarians", "Elite Barbarians", "Knight", "Lumberjack", "Miner", "Mini P.E.K.K.A.", "Prince", "Bandit"],
    5:["Baby Dragon", "Fire Spirits", "Ice Wizard", "Princess", "Wizard", "Witch", "Night Witch", "Executioner"],
    6:["Archers", "Musketeer", "Spear Goblins", "Dart Goblin", "Three Musketeers", "Electro Wizard", "Goblin Gang", "Night Witch"],
    7:["Mega Minion", "Minion Horde", "Minions", "Baby Dragon", "Inferno Dragon"],
    8:["Bomb Tower", "Cannon", "Inferno Tower", "Mortar", "Tesla", "X-Bow"],
    9:["Barbarian Hut", "Furnace", "Goblin Hut", "Tombstone", "Witch", "Graveyard"],
    10:["Balloon", "Hog Rider", "Royal Giant", "Battle Ram"],
    11:["Arrows", "Fireball", "Fire Spirits", "Poison", "The Log", "Zap"],
    12:["Fireball", "Fire Spirits", "Lightning", "Rocket", "Zap"],
    13:["Freeze", "Ice Spirit", "Ice Wizard", "Electro Wizard", "Lightning", "Zap", "Ice Golem"],
    14:["Lumberjack", "Rage"],
    15:["Clone", "Elixir Collector", "Mirror", "Tornado", "Heal"]
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
    if (type === "Common") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location +'-rarity' + number + '"class="' + location + '-rarity-input"><option value="Common" selected>Common</option><option value="Rare">Rare</option><option value="Epic">Epic</option><option value="Legendary">Legendary</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Archers">Archers</option><option value="Arrows">Arrows</option><option value="Barbarians">Barbarians</option><option value="Bomber">Bomber</option><option value="Cannon">Cannon</option><option value="Elite Barbarians">Elite Barbarians</option><option value="Fire Spirits">Fire Spirits</option><option value="Goblin Gang">Goblin Gang</option><option value="Goblins">Goblins</option><option value="Ice Spirit">Ice Spirit</option><option value="Knight">Knight</option><option value="Minion Horde">Minion Horde</option><option value="Minions">Minions</option><option value="Mortar">Mortar</option><option value="Royal Giant">Royal Giant</option><option value="Skeletons">Skeletons</option><option value="Spear Goblins">Spear Goblins</option><option value="Tesla">Tesla</option><option value="Zap">Zap</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9" selected>9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option></select>');
    } else if (type === "Rare") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location + '-rarity' + number + '"class="' + location + '-rarity-input"><option value="Common">Common</option><option value="Rare" selected>Rare</option><option value="Epic">Epic</option><option value="Legendary">Legendary</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Barbarian Hut">Barbarian Hut</option><option value="Battle Ram">Battle Ram</option><option value="Bomb Tower">Bomb Tower</option><option value="Dart Goblin">Dart Goblin</option><option value="Elixir Collector">Elixir Collector</option><option value="Fireball">Fireball</option><option value="Furnace">Furnace</option><option value="Giant">Giant</option><option value="Goblin Hut">Goblin Hut</option><option value="Heal">Heal</option><option value="Hog Rider">Hog Rider</option><option value="Ice Golem">Ice Golem</option><option value="Inferno Tower">Inferno Tower</option><option value="Mega Minion">Mega Minion</option><option value="Mini P.E.K.K.A.">Mini P.E.K.K.A.</option><option value="Musketeer">Musketeer</option><option value="Rocket">Rocket</option><option value="Three Musketeers">Three Musketeers</option><option value="Tombstone">Tombstone</option><option value="Valkyrie">Valkyrie</option><option value="Wizard">Wizard</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7" selected>7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option></select>');
    } else if (type === "Epic") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location + '-rarity' + number + '"class="' + location + '-rarity-input"><option value="Common">Common</option><option value="Rare">Rare</option><option value="Epic" selected>Epic</option><option value="Legendary">Legendary</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Baby Dragon">Baby Dragon</option><option value="Balloon">Balloon</option><option value="Bowler">Bowler</option><option value="Clone">Clone</option><option value="Dark Prince">Dark Prince</option><option value="Executioner">Executioner</option><option value="Freeze">Freeze</option><option value="Giant Skeleton">Giant Skeleton</option><option value="Goblin Barrel">Goblin Barrel</option><option value="Golem">Golem</option><option value="Guards">Guards</option><option value="Lightning">Lightning</option><option value="Mirror">Mirror</option><option value="P.E.K.K.A.">P.E.K.K.A.</option><option value="Poison">Poison</option><option value="Prince">Prince</option><option value="Rage">Rage</option><option value="Skeleton Army">Skeleton Army</option><option value="Tornado">Tornado</option><option value="Witch">Witch</option><option value="X-Bow">X-Bow</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4" selected>4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option></select>');
    } else if (type === "Legendary") {
        return $('<select id="' + location + '-rarity' + number + '" name="' + location + '-rarity' + number + '"class="' + location + '-rarity-input"><option value="Common">Common</option><option value="Rare">Rare</option><option value="Epic">Epic</option><option value="Legendary" selected>Legendary</option></select><select id="' + location + '-card' + number + '" name="' + location + '-card' + number + '" class="' + location + '-card-input"><option value="Bandit">Bandit</option><option value="Electro Wizard">Electro Wizard</option><option value="Graveyard">Graveyard</option><option value="Ice Wizard">Ice Wizard</option><option value="Inferno Dragon">Inferno Dragon</option><option value="Lava Hound">Lava Hound</option><option value="Lumberjack">Lumberjack</option><option value="Miner">Miner</option><option value="Night Witch">Night Witch</option><option value="Princess">Princess</option><option value="Sparky">Sparky</option><option value="The Log">The Log</option></select><select id="' + location + '-level' + number + '" name="' + location + '-level' + number + '" class="' + location + '-level-input"><option value="1" selected>1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select>');
    }
}
// Data Retrieval Function
function getPageData(page) {
    var property = '';
    var attribute = '';
    // Code that will execute while AJAX request is running
    clearTimeout(dataTimeout);
    dataTimeout = setTimeout(function() {
        alert("It is taking a long time to retrieve the card's statistics. If the form is not re-enabled soon, check your Internet connection and refresh the page. If this does not seem to be the problem, check the card's wiki page to ensure that it has not been vandalized. If you are unable to fix the problem, contact a member of the wiki's staff.");
    }, 15000);
    $('#ccalc-submit').html('<span class="fa fa-spinner fa-pulse"></span>').prop("disabled", true);
    $('#ccalc-save').html('<span class="fa fa-spinner fa-pulse"></span>').prop("disabled", true);
    $(".ccalc-rarity-input, .ccalc-card-input").prop("disabled", true);
    // Test if data for this page has already been retrieved
    if (lookupResult[page]) { // data already exists
        clearTimeout(dataTimeout);
        $('#ccalc-submit').html('Submit').prop("disabled", false);
        $('#ccalc-save').html('Save to Slot <span class="displaySelectedDeckNum">' + selectedDeck + '</span>').prop("disabled", false);
        $(".ccalc-rarity-input, .ccalc-card-input").prop("disabled", false);
    } else { // data does not exist
        // AJAX Request
        $.get('https://clashroyale.wikia.com/index.php?title=' + page)
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
                                $('#ccalc-submit').html('Submit').prop("disabled", false);
                                $('#ccalc-save').html('Save to Slot <span class="displaySelectedDeckNum">' + selectedDeck + '</span>').prop("disabled", false);
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
        alert("It is taking a long time to retrieve the card's statistics. If the statistics do not appear soon, check your Internet connection and refresh the page. If this does not seem to be the problem, check the card's wiki page to ensure that it has not been vandalized. If you are unable to fix the problem, contact a member of the wiki's staff.");
    }, 15000);
    $('#ccalc-individual-stats-result').html('<center class="fa fa-spinner fa-pulse" style="color: white; font-size: 24px;"></center>');
    // AJAX Request
    $.get('https://clashroyale.wikia.com/index.php?title=' + page)
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
    $.getJSON('/api.php?action=parse&text={{Card|Name=' + card + '|Scale=.33|Link=}}&format=json', function(n) {
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
        $.getJSON('/api.php?action=parse&text={{Card|Name=' + card + '|Scale=.25|Position=middle|Link=}}&format=json', function(n) {
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
    if (rarity === "Common") {
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
    } else if (rarity === "Epic") {
        if (tournament === true) {
            return 4;
        } else {
            return 8;
        }
    } else if (rarity === "Legendary") {
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
        alert("The calculator was unable to retrieve one or more of the cards' statistics. Please check your Internet connection and submit again or refresh the page. If this does not seem to be the problem, check the card's wiki page to ensure that it has not been vandalized. If you are unable to fix the problem, contact a member of the wiki's staff.");
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
    $("#ccalc-damagingSpellCounters").append($('<div style="display: inline-block; margin: 6px 20px; text-align: center; font-weight: bold;"><table><tr><td data-display-card="' + spell + '" class="ccalc-display-card">' + spell + '</td><td><img src="https://vignette.wikia.nocookie.net/clashroyale/images/2/26/Defeats_Arrow.png/revision/latest?cb=20160917172450" alt="Defeats" style="height: 60px; vertical-align: middle;" /></td><td data-display-card="' + troop + '" class="ccalc-display-card">' + troop + '</td></tr><tr><td>Level ' + spellLvl + '</td><td></td><td>Level ' + troopLvl + '</td></tr></table></div>'));
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
    $('#ccalc-clear-memory-harness').html('<button type="button" id="ccalc-clear-memory" title="Clear the tool\'s data memory to make it retrieve the latest card data. Please note that this will not clear saved decks.">Clear Memory</button>');
    $("#ccalc-clear-memory").click(function() {
        if (confirm("This tool saves previously-retrieved card data between page loads to improve your experience. Clear the memory to make the tool retrieve the latest card data when a new card is selected in the inputs. Be sure to clear the memory after any game updates that modify card statistics. Please note that this will not clear saved decks. Click OK to clear the data memory and reload the page.") === true) {
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
        $('#ccalc-harness1').html(ccalcInputs("Common","1"));
        $('#ccalc-harness2').html(ccalcInputs("Common","2"));
        $('#ccalc-harness3').html(ccalcInputs("Rare","3"));
        $('#ccalc-harness4').html(ccalcInputs("Rare","4"));
        $('#ccalc-harness5').html(ccalcInputs("Epic","5"));
        $('#ccalc-harness6').html(ccalcInputs("Epic","6"));
        $('#ccalc-harness7').html(ccalcInputs("Legendary","7"));
        $('#ccalc-harness8').html(ccalcInputs("Legendary","8"));
        $('#ccalc-card1').val("Archers").attr({"data-fallback-val": "Archers", "data-fallback-rarity": "Common"});
        $('#ccalc-card2').val("Arrows").attr({"data-fallback-val": "Arrows", "data-fallback-rarity": "Common"});
        $('#ccalc-card3').val("Barbarian Hut").attr({"data-fallback-val": "Barbarian Hut", "data-fallback-rarity": "Rare"});
        $('#ccalc-card4').val("Fireball").attr({"data-fallback-val": "Fireball", "data-fallback-rarity": "Rare"});
        $('#ccalc-card5').val("Baby Dragon").attr({"data-fallback-val": "Baby Dragon", "data-fallback-rarity": "Epic"});
        $('#ccalc-card6').val("Lightning").attr({"data-fallback-val": "Lightning", "data-fallback-rarity": "Epic"});
        $('#ccalc-card7').val("Bandit").attr({"data-fallback-val": "Bandit", "data-fallback-rarity": "Legendary"});
        $('#ccalc-card8').val("The Log").attr({"data-fallback-val": "The Log", "data-fallback-rarity": "Legendary"});
        
    }
    $("#ccalcPermalink-Harness").html($('<textarea id="ccalcPermalink" style="width: 90%;" rows="5" readonly>Error</textarea>'));
    // Place form buttons
    $('#ccalc-submit-harness').html('<button type="submit" id="ccalc-submit">Submit</button>');
    $('#ccalc-save-harness').html('<button type="button" id="ccalc-save" title="Save this deck for later use.">Save to Slot <span class="displaySelectedDeckNum"></span></button>');
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
        getPageData("Barbarian Hut");
        getPageData("Baby Dragon");
        getPageData("Bandit");
        getPageData("Arrows");
        getPageData("Fireball");
        getPageData("Lightning");
        getPageData("The Log");
        getPageData("Rocket");
        getPageData("Zap");
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
            alert("Cannot save! One or more of the cards in this deck is invalid.");
        } else if (userDeckData("card","1") == userDeckData("card","2") || userDeckData("card","1") == userDeckData("card","3") || userDeckData("card","1") == userDeckData("card","4") || userDeckData("card","1") == userDeckData("card","5") || userDeckData("card","1") == userDeckData("card","6") || userDeckData("card","1") == userDeckData("card","7") || userDeckData("card","1") == userDeckData("card","8") || userDeckData("card","2") == userDeckData("card","3") || userDeckData("card","2") == userDeckData("card","4") || userDeckData("card","2") == userDeckData("card","5") || userDeckData("card","2") == userDeckData("card","6") || userDeckData("card","2") == userDeckData("card","7") || userDeckData("card","2") == userDeckData("card","8") || userDeckData("card","3") == userDeckData("card","4") || userDeckData("card","3") == userDeckData("card","5") || userDeckData("card","3") == userDeckData("card","6") || userDeckData("card","3") == userDeckData("card","7") || userDeckData("card","3") == userDeckData("card","8") || userDeckData("card","4") == userDeckData("card","5") || userDeckData("card","4") == userDeckData("card","6") || userDeckData("card","4") == userDeckData("card","7") || userDeckData("card","4") == userDeckData("card","8") || userDeckData("card","5") == userDeckData("card","6") || userDeckData("card","5") == userDeckData("card","7") || userDeckData("card","5") == userDeckData("card","8") || userDeckData("card","6") == userDeckData("card","7") || userDeckData("card","6") == userDeckData("card","8") || userDeckData("card","7") == userDeckData("card","8")) {
            alert("Cannot save! One or more of the cards in this deck is repeated.");
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
            alert("This deck has been saved to deck slot " + selectedDeck + " on the Deck Builder Tool.");
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
                alert("You have not saved anything to deck slot " + selectedDeck + ". Change the inputs and click the save button to save a deck.");
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
        $("#ccalc-individual-stats #ccalc-replace-deck-card").show().text("Replace " + deckCardName + " with " + chosenCardName);
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
            alert("This card is already in your deck.");
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
    $("#cardCalculator-result h2 #Deck_Summary").parent("h2").css("cursor", "pointer").click(function() {
        $("#cardCalculator-result #ccalc-analysis-bars").hide();
        $("#cardCalculator-result #show-ccalc-analysis-bars").show();
    });
    $("#cardCalculator-result #show-ccalc-analysis-bars").click(function() {
        $("#cardCalculator-result #ccalc-analysis-bars").show();
        $("#cardCalculator-result #show-ccalc-analysis-bars").hide();
    });
    // Card Comparison
    $("#cardCalculator-result h2 #Card_Comparison").parent("h2").css("cursor", "pointer").click(function() {
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
    $("#cardCalculator-result h2 #Damaging_Spell_Counters").parent("h2").css("cursor", "pointer").click(function() {
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
                if (isNaN(lookupResult[cardName(i)].cost) === true) {
                    lookupResult[cardName(i)].cost = 2;
                }
                elixirTotal += Number(lookupResult[cardName(i)].cost);
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
                cardCompareTable(i,"2","text",lookupResult[cardName(i)].cost);
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
                dCount = String(lookupResult[cardName(i)].count);
                dCountNoX = dCount.replace(/x/g, "");
                if (lookupResult[cardName(i)].countfallback !== undefined) {
                    lookupResult[cardName(i)].count = lookupResult[cardName(i)].countfallback;
                } else if (isNaN(dCountNoX) === true || lookupResult[cardName(i)].count === undefined) {
                    lookupResult[cardName(i)].count = 1;
                } else {
                    lookupResult[cardName(i)].count = Number(dCountNoX);
                }
                // Make sure the card can have hitpoints
                if (lookupResult[cardName(i)].type == "Troop" || lookupResult[cardName(i)].type == "Building") {
                    // Check for a card that has more than one troop type then check for missing value
                    if (cardName(i) == "Golem") {
                        if (lookupResult[cardName(i)]["golem hitpoints"] !== undefined && lookupResult[cardName(i)]["golemite hitpoints"] !== undefined) {
                            hitpointsTotal += Number(lookupResult[cardName(i)]["golem hitpoints"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["golemite hitpoints"][cardLevel(i)]));
                            lookupResult[cardName(i)].hitpoints = [];
                            lookupResult[cardName(i)].hitpoints[cardLevel(i)] = Number(lookupResult[cardName(i)]["golem hitpoints"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["golemite hitpoints"][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Lava Hound") {
                        if (lookupResult[cardName(i)]['lava hound hitpoints'] !== undefined && lookupResult[cardName(i)]['lava pup hitpoints'] !== undefined) {
                            hitpointsTotal += Number(lookupResult[cardName(i)]['lava hound hitpoints'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['lava pup hitpoints'][cardLevel(i)]));
                            lookupResult[cardName(i)].hitpoints = [];
                            lookupResult[cardName(i)].hitpoints[cardLevel(i)] = Number(lookupResult[cardName(i)]['lava hound hitpoints'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['lava pup hitpoints'][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Goblin Gang") {
                        if (lookupResult[cardName(i)]['goblin hitpoints'] !== undefined && lookupResult[cardName(i)]['spear goblin hitpoints'] !== undefined) {
                            hitpointsTotal += (3 * Number(lookupResult[cardName(i)]['goblin hitpoints'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['spear goblin hitpoints'][cardLevel(i)]));
                            lookupResult[cardName(i)].hitpoints = [];
                            lookupResult[cardName(i)].hitpoints[cardLevel(i)] = ((3 * Number(lookupResult[cardName(i)]['goblin hitpoints'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['spear goblin hitpoints'][cardLevel(i)]))) / 6;
                        } else {
                            ccerrorMsg();
                        }
                    } else {
                        if (lookupResult[cardName(i)].hitpoints !== undefined) {
                            hitpointsTotal += Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)]) * Number(lookupResult[cardName(i)].count);
                        } else {
                            ccerrorMsg();
                        }
                    }
                } else {
                    lookupResult[cardName(i)].hitpoints = [];
                    lookupResult[cardName(i)].hitpoints[cardLevel(i)] = 0;
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
                if (lookupResult[cardName(i)].type == "Troop" || lookupResult[cardName(i)].type == "Building") {
                    // Check for an abnormal card then check for missing value
                    // Cards with multiple troop types
                    if (cardName(i) == "Golem") {
                        if (lookupResult[cardName(i)]["golem damage per second"] !== undefined && lookupResult[cardName(i)]["golemite damage per second"] !== undefined) {
                            dpsTotal += Number(lookupResult[cardName(i)]["golem damage per second"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["golemite damage per second"][cardLevel(i)]));
                            lookupResult[cardName(i)]['damage per second'] = [];
                            lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = Number(lookupResult[cardName(i)]["golem damage per second"][cardLevel(i)]) + (2 * Number(lookupResult[cardName(i)]["golemite damage per second"][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Lava Hound") {
                        if (lookupResult[cardName(i)]['lava hound damage per second'] !== undefined && lookupResult[cardName(i)]['lava pup damage per second'] !== undefined) {
                            dpsTotal += Number(lookupResult[cardName(i)]['lava hound damage per second'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['lava pup damage per second'][cardLevel(i)]));
                            lookupResult[cardName(i)]['damage per second'] = [];
                            lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = Number(lookupResult[cardName(i)]['lava hound damage per second'][cardLevel(i)]) + (6 * Number(lookupResult[cardName(i)]['lava pup damage per second'][cardLevel(i)]));
                        } else {
                            ccerrorMsg();
                        }
                    } else if (cardName(i) == "Goblin Gang") {
                        if (lookupResult[cardName(i)]['goblin damage per second'] !== undefined && lookupResult[cardName(i)]['spear goblin damage per second'] !== undefined) {
                            dpsTotal += (3 * Number(lookupResult[cardName(i)]['goblin damage per second'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['spear goblin damage per second'][cardLevel(i)]));
                            lookupResult[cardName(i)]['damage per second'] = [];
                            lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = ((3 * Number(lookupResult[cardName(i)]['goblin damage per second'][cardLevel(i)])) + (3 * Number(lookupResult[cardName(i)]['spear goblin damage per second'][cardLevel(i)]))) / 6;
                        } else {
                            ccerrorMsg();
                        }
                    // Inferno Tower damage charges
                    } else if (cardName(i) == "Inferno Tower") {
                        dpsTotal += 200 + (Number(cardLevel(i)) * 20);
                        lookupResult[cardName(i)]['damage per second'] = [];
                        lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = 200 + (Number(cardLevel(i)) * 20);
                    // Inferno Dragon damage charges
                    } else if (cardName(i) == "Inferno Dragon") {
                        dpsTotal += 160 + (Number(cardLevel(i)) * 20);
                        lookupResult[cardName(i)]['damage per second'] = [];
                        lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = 200 + (Number(cardLevel(i)) * 20);
                    // Spawner building DPS ignored, Elixir Collector does no damage
                    } else if (cardName(i) == "Barbarian Hut" || cardName(i) == "Goblin Hut" || cardName(i) == "Elixir Collector" || cardName(i) == "Furnace" || cardName(i) == "Tombstone") {
                        dpsTotal += 0;
                        lookupResult[cardName(i)]['damage per second'] = [];
                        lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = 0;
                    // All other cards (normal success)
                    } else if (lookupResult[cardName(i)]['damage per second'] !== undefined) {
                        // Deal with cards with "x2" in the DPS cell
                        if (String(lookupResult[cardName(i)]['damage per second'][cardLevel(i)]).includes("x2") === true) {
                            doubledDPSValue = String(lookupResult[cardName(i)]['damage per second'][cardLevel(i)]);
                            lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = Number(doubledDPSValue.replace("x2", "").replace(/\s/g, "")) * 2;
                        // Most cards
                        } else {
                            dpsTotal += Number(lookupResult[cardName(i)]['damage per second'][cardLevel(i)]) * Number(lookupResult[cardName(i)].count);
                        }
                    // Use Damage if DPS is not present
                    } else if (lookupResult[cardName(i)].damage !== undefined) {
                        dpsTotal += Number(lookupResult[cardName(i)].damage[cardLevel(i)]) * Number(lookupResult[cardName(i)].count);
                        lookupResult[cardName(i)]['damage per second'] = [];
                        lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = Number(lookupResult[cardName(i)].damage[cardLevel(i)]);
                    // Use Area Damage if DPS and Damage are both not present
                    } else if (lookupResult[cardName(i)]['area damage'] !== undefined) {
                        dpsTotal += Number(lookupResult[cardName(i)]['area damage'][cardLevel(i)]) * Number(lookupResult[cardName(i)].count);
                        lookupResult[cardName(i)]['damage per second'] = [];
                        lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = Number(lookupResult[cardName(i)]['area damage'][cardLevel(i)]);
                    // Throw error
                    } else {
                        ccerrorMsg();
                    }
                } else {
                    // For spells
                    lookupResult[cardName(i)]['damage per second'] = [];
                    lookupResult[cardName(i)]['damage per second'][cardLevel(i)] = 0;
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
                if (lookupResult[cardName(i)].type === "Troop") {
                    cardTypeTroop++;
                } else if (lookupResult[cardName(i)].type === "Spell") {
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
                if (lookupResult[cardName(i)].target === "Air & Ground" || lookupResult[cardName(i)].target === "Air and Ground" || lookupResult[cardName(i)].target === "Troops" || cardName(i) == "Goblin Gang") {
                    targetsAny++;
                } else if (lookupResult[cardName(i)].target === "Ground") {
                    targetsGround++;
                } else if (lookupResult[cardName(i)].target === "Building" || lookupResult[cardName(i)].target === "Buildings") {
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
                if ($.isEmptyObject(lookupResult[cardName(i)]['area damage']) === false || cardName(i) == "Tornado" || cardName(i) == "The Log") {
                    dmgTypeSplash++;
                } else if ($.isEmptyObject(lookupResult[cardName(i)].damage) === false || cardName(i) == "Golem" || cardName(i) == "Lava Hound" || cardName(i) == "Goblin Gang") {
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
                if (cardRarity(i) == "Common") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span style="color: #404040; font-weight: bold;">' + cardName(i) + '</span>');
                } else if (cardRarity(i) == "Rare") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span style="color: #e68a00; font-weight: bold;">' + cardName(i) + '</span>');
                } else if (cardRarity(i) == "Epic") {
                    $("#ccalc-cardComparison tr:nth-of-type(" + cardComparisonNameLoop + ") td:nth-of-type(1)").html('<span style="color: #b300b3; font-weight: bold;">' + cardName(i) + '</span>');
                } else if (cardRarity(i) == "Legendary") {
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
                cardCompareTable(i,"4","text",round(0,lookupResult[cardName(i)].hitpoints[cardLevel(i)] * Number(lookupResult[cardName(i)].count)));
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
                cardCompareTable(i,"6","text",round(0,lookupResult[cardName(i)]['damage per second'][cardLevel(i)] * Number(lookupResult[cardName(i)].count)));
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
                stringRange = String(lookupResult[cardName(i)].range);
                /* Remove blind spot values from any cards with defined blind spots */
                if (stringRange.includes("-") === true) {
                    stringRange = stringRange.slice(stringRange.indexOf("-") + 1);
                }
                standardizedRange = stringRange.replace(/[^0-9$.,]/g, "");
                if (isNaN(standardizedRange) === true) {
                    lookupResult[cardName(i)].range = 0;
                } else {
                    lookupResult[cardName(i)].range = Number(standardizedRange);
                }
            }
            /* Set the column */
            var deckRange = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"7","text",lookupResult[cardName(i)].range);
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
                if (lookupResult[cardName(i)]['hit speed'] !== undefined) {
                    stringHitSpeed = String(lookupResult[cardName(i)]['hit speed']);
                } else {
                    stringHitSpeed = "0";
                }
                standardizedHitSpeed = stringHitSpeed.replace(/[^0-9$.,]/g, "");
                if (isNaN(standardizedHitSpeed) === true) {
                    lookupResult[cardName(i)]['hit speed'] = 0;
                } else {
                    lookupResult[cardName(i)]['hit speed'] = Number(standardizedHitSpeed);
                }
            }
            /* Set the column */
            var deckHitSpeed = [];
            for (i = 1; i < 9; i++) {
                cardCompareTable(i,"8","text",lookupResult[cardName(i)]['hit speed']);
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
                cardCompareTable(i,"9","text",lookupResult[cardName(i)].count);
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
                if (lookupResult[cardName(i)].target == "Air & Ground" || lookupResult[cardName(i)].target == "Air and Ground" || lookupResult[cardName(i)].target == "Troops" || cardName(i) == "Goblin Gang") {
                    cardCompareTable(i,"10","html","<span class='ion-android-star'></span>");
                    cardCompareTable(i,"10","color","#45DE68");
                } else if (lookupResult[cardName(i)].target == "Ground") {
                    cardCompareTable(i,"10","html","<span class='ion-android-walk'></span>");
                    cardCompareTable(i,"10","color","#F6FF78");
                } else if (lookupResult[cardName(i)].target == "Buildings" || lookupResult[cardName(i)].target == "Building") {
                    cardCompareTable(i,"10","html","<span class='ion-home'></span>");
                    cardCompareTable(i,"10","color","#FFC054");
                } else {
                    cardCompareTable(i,"10","html","<span class='ion-close'></span>");
                    cardCompareTable(i,"10","color","#FF9E9E");
                }
            }
            // Damage Type column
            for (i = 1; i < 9; i++) {
                if ($.isEmptyObject(lookupResult[cardName(i)]['area damage']) === false || cardName(i) == "Tornado" || cardName(i) == "The Log") {
                    cardCompareTable(i,"11","html","<span class='ion-fireball'></span>");
                    cardCompareTable(i,"11","color","#45DE68");
                } else if ($.isEmptyObject(lookupResult[cardName(i)].damage) === false || cardName(i) == "Golem" || cardName(i) == "Lava Hound" || cardName(i) == "Goblin Gang") {
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
                $("#ccalc-substitutions td#similarCards1").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("1")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("1")].role][i],"1");
                }
            }
            if (lookupResult[cardName("2")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards2").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("2")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("2")].role][i],"2");
                }
            }
            if (lookupResult[cardName("3")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards3").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("3")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("3")].role][i],"3");
                }
            }
            if (lookupResult[cardName("4")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards4").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("4")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("4")].role][i],"4");
                }
            }
            if (lookupResult[cardName("5")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards5").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("5")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("5")].role][i],"5");
                }
            }
            if (lookupResult[cardName("6")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards6").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("6")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("6")].role][i],"6");
                }
            }
            if (lookupResult[cardName("7")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards7").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("7")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("7")].role][i],"7");
                }
            }
            if (lookupResult[cardName("8")].role == numOfCardRoles) {
                $("#ccalc-substitutions td#similarCards8").append('<p class="ccalc-sub-unique">That is quite a unique card.</p>');
            } else {
                for (i = 0; i < subCards[lookupResult[cardName("8")].role].length; i++) {
                    getSubstitutionImage(subCards[lookupResult[cardName("8")].role][i],"8");
                }
            }
            // *********************** Permalink ************************
            var inputDeck = {rarity1: cardRarity(1), card1: cardName(1), level1: cardLevel(1), rarity2: cardRarity(2), card2: cardName(2), level2: cardLevel(2), rarity3: cardRarity(3), card3: cardName(3), level3: cardLevel(3), rarity4: cardRarity(4), card4: cardName(4), level4: cardLevel(4), rarity5: cardRarity(5), card5: cardName(5), level5: cardLevel(5), rarity6: cardRarity(6), card6: cardName(6), level6: cardLevel(6), rarity7: cardRarity(7), card7: cardName(7), level7: cardLevel(7), rarity8: cardRarity(8), card8: cardName(8), level8: cardLevel(8)};
            $("#ccalcPermalink").val("https://clashroyale.wikia.com/wiki/Deck_Builder?" + $.param(inputDeck));
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
                if (lookupResult[cardName(i)].type !== "Spell" && Number(lookupResult.Arrows.cost) - Number(lookupResult[cardName(i)].cost) <= 2 && Number(lookupResult.Arrows["area damage"][1]) < Number(lookupResult[cardName(i)].hitpoints[maxCardLevel(cardRarity(i))]) && Number(lookupResult.Arrows["area damage"][maxCardLevel("Common")]) >= Number(lookupResult[cardName(i)].hitpoints[1]) && cardName(i) !== "Guards" && cardName(i) !== "Dark Prince" && cardName(i) !== "Battle Ram") {
                    for (x = 1; x <= maxCardLevel("Common", spellCounterCap); x++) {
                        if (Number(lookupResult.Arrows["area damage"][x]) >= Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)])) {
                            displaySpellCounter('Arrows',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Fireball
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Spell" && Number(lookupResult.Fireball.cost) - Number(lookupResult[cardName(i)].cost) <= 2 && Number(lookupResult.Fireball["area damage"][1]) < Number(lookupResult[cardName(i)].hitpoints[maxCardLevel(cardRarity(i))]) && Number(lookupResult.Fireball["area damage"][maxCardLevel("Rare")]) >= Number(lookupResult[cardName(i)].hitpoints[1]) && cardName(i) !== "Guards" && cardName(i) !== "Dark Prince" && cardName(i) !== "Battle Ram") {
                    for (x = 1; x <= maxCardLevel("Rare", spellCounterCap); x++) {
                        if (Number(lookupResult.Fireball["area damage"][x]) >= Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)])) {
                            displaySpellCounter('Fireball',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Lightning
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Spell" && Number(lookupResult.Lightning.cost) - Number(lookupResult[cardName(i)].cost) <= 2 && Number(lookupResult.Lightning.damage[1]) < Number(lookupResult[cardName(i)].hitpoints[maxCardLevel(cardRarity(i))]) && Number(lookupResult.Lightning.damage[maxCardLevel("Epic")]) >= Number(lookupResult[cardName(i)].hitpoints[1]) && cardName(i) !== "Guards" && cardName(i) !== "Dark Prince" && cardName(i) !== "Battle Ram") {
                    for (x = 1; x <= maxCardLevel("Epic", spellCounterCap); x++) {
                        if (Number(lookupResult.Lightning.damage[x]) >= Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)])) {
                            displaySpellCounter('Lightning',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Rocket
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Spell" && Number(lookupResult.Rocket.cost) - Number(lookupResult[cardName(i)].cost) <= 2 && Number(lookupResult.Rocket["area damage"][1]) < Number(lookupResult[cardName(i)].hitpoints[maxCardLevel(cardRarity(i))]) && Number(lookupResult.Rocket["area damage"][maxCardLevel("Rare")]) >= Number(lookupResult[cardName(i)].hitpoints[1]) && cardName(i) !== "Guards" && cardName(i) !== "Dark Prince" && cardName(i) !== "Battle Ram") {
                    for (x = 1; x <= maxCardLevel("Rare", spellCounterCap); x++) {
                        if (Number(lookupResult.Rocket["area damage"][x]) >= Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)])) {
                            displaySpellCounter('Rocket',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // Zap
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Spell" && Number(lookupResult.Zap.cost) - Number(lookupResult[cardName(i)].cost) <= 2 && Number(lookupResult.Zap["area damage"][1]) < Number(lookupResult[cardName(i)].hitpoints[maxCardLevel(cardRarity(i))]) && Number(lookupResult.Zap["area damage"][maxCardLevel("Common")]) >= Number(lookupResult[cardName(i)].hitpoints[1]) && cardName(i) !== "Guards" && cardName(i) !== "Dark Prince" && cardName(i) !== "Battle Ram") {
                    for (x = 1; x <= maxCardLevel("Common", spellCounterCap); x++) {
                        if (Number(lookupResult.Zap["area damage"][x]) >= Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)])) {
                            displaySpellCounter('Zap',x,cardName(i),cardLevel(i));
                            break;
                        }
                    }
                }
            }
            // The Log
            for (i = 1; i < 9; i++) {
                if (lookupResult[cardName(i)].type !== "Spell" && Number(lookupResult["The Log"].cost) - Number(lookupResult[cardName(i)].cost) <= 2 && Number(lookupResult["The Log"]["area damage"][1]) < Number(lookupResult[cardName(i)].hitpoints[maxCardLevel(cardRarity(i))]) && Number(lookupResult["The Log"]["area damage"][maxCardLevel("Legendary")]) >= Number(lookupResult[cardName(i)].hitpoints[1]) && cardName(i) !== "Guards" && cardName(i) !== "Dark Prince" && cardName(i) !== "Battle Ram") {
                    if (lookupResult[cardName(i)].type == "Troop" && lookupResult[cardName(i)].transport == "Air") {} else {
                        for (x = 1; x <= maxCardLevel("Legendary", spellCounterCap); x++) {
                            if (Number(lookupResult["The Log"]["area damage"][x]) >= Number(lookupResult[cardName(i)].hitpoints[cardLevel(i)])) {
                                displaySpellCounter('The Log',x,cardName(i),cardLevel(i));
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
                $.getJSON('/api.php?action=parse&text={{Card|Name=' + displayCardName + '|Scale=.3|Position=middle|Link=}}&format=json', function(n) {
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
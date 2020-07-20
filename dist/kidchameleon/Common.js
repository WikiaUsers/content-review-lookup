$(document).ready(function(){
    var content = $('#mw-content-text');
    
    //add classes to these links
    content.find('a[href$="Elsewhere_17"],a[href$="Elsewhere_20"],a[href$="Elsewhere_22"],a[href$="Elsewhere_23"],a[href$="Elsewhere_28"],a[href$="Plethora"],a[href$="Stairway_to_Oblivion"],a[href$="The_Black_Pit"],a[href$="Under_Skull_Mountain_1"],a[href$="Under_Skull_Mountain_2"],a[href$="Under_Skull_Mountain_3"],')
    .addClass("Cave");
    
   content.find('a[href$="Alien_Twilight"],a[href$="Bagel_Brothers"],a[href$="Elsewhere_3"],a[href$="Elsewhere_29"],a[href$="Elsewhere_30"],a[href$="Forced_Entry"],a[href$="Sinister_Sewers"],a[href$="The_Deadly_Skyscrapers"],a[href$="Windy_City"],')
    .addClass("City");
    
    content.find('a[href$="Elsewhere_7"],a[href$="Elsewhere_15"],a[href$="Elsewhere_16"],a[href$="Elsewhere_24"],a[href$="Elsewhere_25"],a[href$="Elsewhere_31"],a[href$="Pyramids_of_Peril"],a[href$="The_Crypt"],a[href$="The_Forbidden_Tombs"],')
    .addClass("Desert");
    
    content.find('a[href$="Beneath_the_Twisted_Hills"],a[href$="Hidden_Canyon"],a[href$="Hills_of_Forever"],a[href$="Hills_of_the_Warrior_1"],a[href$="Hills_of_the_Warrior_2"],a[href$="Lion%27s_Den"],a[href$="The_Hills_Have_Eyes"],a[href$="The_Land_Below"],a[href$="The_Valley_of_Life"],')
    .addClass("Hills");
    
    content.find('a[href$="Blizzard_Mountain"],a[href$="Caves_of_Ice"],a[href$="Diamond_Edge"],a[href$="Elsewhere_14"],a[href$="Elsewhere_21"],a[href$="Elsewhere_32"],a[href$="Frosty_Doom"],a[href$="Ice_God%27s_Vengeance"],a[href$="The_Crystal_Crags_1"],a[href$="The_Crystal_Crags_2"],a[href$="The_Final_Marathon"],a[href$="The_Shimmering_Caves"],')
    .addClass("Ice");
    
    content.find('a[href$="Alien_Isle"],a[href$="Coral_Blade_Grotto"],a[href$="Crab_Cove"],a[href$="Elsewhere_1"],a[href$="Elsewhere_4"],a[href$="Hoverboard_Beach"],a[href$="Isle_of_the_Lion_Lord"],a[href$="Knight%27s_Isle"],a[href$="Monster_Island"],a[href$="Scorpion_Isle"],a[href$="Shishkaboss"],a[href$="The_Cliffs_of_Illusion"],a[href$="Whale_Grotto"],')
    .addClass("Island");
    
    content.find('a[href$="Dragonspike"],a[href$="Elsewhere_6"],a[href$="Highwater_Pass_1"],a[href$="Highwater_Pass_2"],a[href$="Madmaze_Mountain"],a[href$="Secrets_in_the_Rocks"],a[href$="Stormwalk_Mountain"],a[href$="The_Pinnacle"],a[href$="The_Nightmare_Peaks_1"],a[href$="The_Nightmare_Peaks_2"],')
    .addClass("Mountain");
    
    content.find('a[href$="Elsewhere_2"],a[href$="Elsewhere_8"],a[href$="Elsewhere_11"],a[href$="Elsewhere_19"],a[href$="Skydragon_Castle_1"],a[href$="Skydragon_Castle_2"],a[href$="Sky_Fortress"],a[href$="Towers_of_Blood"],a[href$="Wind_Castles_1"],a[href$="Wind_Castles_2"],')
    .addClass("Sky");
    
    content.find('a[href$="Bloody_Swamp"],a[href$="Devil%27s_Marsh_1"],a[href$="Devil%27s_Marsh_2"],a[href$="Elsewhere_5"],a[href$="Elsewhere_9"],a[href$="Elsewhere_12"],a[href$="Elsewhere_18"],')
    .addClass("Swamp");
    
    content.find('a[href$="Blue_Lake_Woods_1"],a[href$="Blue_Lake_Woods_2"],a[href$="Boomerang_Bosses"],a[href$="Elsewhere_10"],a[href$="Elsewhere_13"],a[href$="Elsewhere_26"],a[href$="Elsewhere_27"],a[href$="The_Caged_Beasts"],a[href$="The_Whispering_Woods_1"],a[href$="The_Whispering_Woods_2"],a[href$="Tunnels_Beneath_the_Woods"],a[href$="Woods_of_Despair_1"],a[href$="Woods_of_Despair_2"],')
    .addClass("Woods");
	
	//get the theme name from table leve-data and add the right classs to header
	var theme = content.find('#level-data tr:eq(4) td:eq(1)').children(1).text().trim();
	
	if(theme == 'Cave') { content.find('#level-data th:first').addClass("Cave"); }
	if(theme == 'City') { content.find('#level-data th:first').addClass("City"); }
	if(theme == 'Desert') { content.find('#level-data th:first').addClass("Desert"); }
	if(theme == 'Hills') { content.find('#level-data th:first').addClass("Hills"); }
	if(theme == 'Ice') { content.find('#level-data th:first').addClass("Ice"); }
	if(theme == 'Island') { content.find('#level-data th:first').addClass("Island"); }
	if(theme == 'Mountain') { content.find('#level-data th:first').addClass("Mountain"); }
	if(theme == 'Sky') { content.find('#level-data th:first').addClass("Sky"); }
	if(theme == 'Swamp') { content.find('#level-data th:first').addClass("Swamp"); }
	if(theme == 'Woods') { content.find('#level-data th:first').addClass("Woods"); }
});
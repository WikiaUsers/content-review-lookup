/*************************/
/*** ARMOR COMPARISONS ***/
/*************************/
$(document).ready(function()
{
    if (wgPageName == "Custom_Armor_Set_Comparison") {
        importScript("MediaWiki:CustomArmorSet.js");
    }
    
    if (wgPageName == "Armor_Piece_Comparison") {
        importScript("MediaWiki:ArmorSearch.js");
    }
});

/*****************/
/*** MAIN PAGE ***/
/*****************/

if (wgPageName == "Dark_Souls_Wiki") {
    document.getElementById("mw-content-text").style.padding = "0px";
}

importScript("MediaWiki:Portal.js");

/************************/
/*** PS COMPATIBILITY ***/
/************************/

if (wgPageName == "User:Volknur/Sandbox2") {
   importScript("MediaWiki:PSC_Portal.js");
}

/************************/
/*** CATEGORY SORTING ***/
/************************/

if ((wgPageName == "Category:Dark_Souls:_Standard_Weapons") || (wgPageName == "Category:Dark_Souls:_Unique_Weapons") || (wgPageName == "Category:Dark_Souls:_Demon_Weapons") || (wgPageName == "Category:Dark_Souls:_Dragon_Weapons")) {
    $("td h3").filter(function() { return $(this).text() === "A"; }).html("Axes");
    $("td h3").filter(function() { return $(this).text() === "B"; }).html("Bows");
    $("td h3").filter(function() { return $(this).text() === "C"; }).html("Crossbows");
    $("td h3").filter(function() { return $(this).text() === "D"; }).html("Curved Greatswords");
    $("td h3").filter(function() { return $(this).text() === "E"; }).html("Curved Swords");
    $("td h3").filter(function() { return $(this).text() === "F"; }).html("Daggers");
    $("td h3").filter(function() { return $(this).text() === "G"; }).html("Gauntlets");
    $("td h3").filter(function() { return $(this).text() === "H"; }).html("Great Hammers");
    $("td h3").filter(function() { return $(this).text() === "I"; }).html("Greataxes");
    $("td h3").filter(function() { return $(this).text() === "J"; }).html("Greatswords");
    $("td h3").filter(function() { return $(this).text() === "K"; }).html("Halberds");
    $("td h3").filter(function() { return $(this).text() === "K cont."; }).html("Halberds cont.");
    $("td h3").filter(function() { return $(this).text() === "L"; }).html("Hammers");
    $("td h3").filter(function() { return $(this).text() === "M"; }).html("Katanas");
    $("td h3").filter(function() { return $(this).text() === "N"; }).html("Spears");
    $("td h3").filter(function() { return $(this).text() === "O"; }).html("Straight Swords");
    $("td h3").filter(function() { return $(this).text() === "O cont."; }).html("Straight Swords cont.");
    $("td h3").filter(function() { return $(this).text() === "P"; }).html("Thrusting Swords");
    $("td h3").filter(function() { return $(this).text() === "Q"; }).html("Ultra Greatswords");
    $("td h3").filter(function() { return $(this).text() === "R"; }).html("Whips");
    $("td h3").filter(function() { return $(this).text() === "R cont."; }).html("Whips cont.");
    $("td h3").filter(function() { return $(this).text() === "S"; }).html("Small Shields");
    $("td h3").filter(function() { return $(this).text() === "T"; }).html("Medium Shields");
    $("td h3").filter(function() { return $(this).text() === "U"; }).html("Greatshields");
}

/**********************/
/*** FILE COPYRIGHT ***/
/**********************/

if (wgNamespaceNumber == 6) {
    $(".WikiaArticle").prepend('<div class="boilerplate" id="c-fairuse" style="width:90%; margin:0 auto; padding:10px; border:1px solid #A8ACA8; background:#FFFFCC; color:#000;"><p><i><b>This file  is copyrighted. It will be used in a way that qualifies as fair use under US copyright law.</b></i></p></div><br/>');
};

/* Community Choice Awards */
if (wgPageName === 'User_blog:Raylan13/Dark_Souls_Community_Choice_Awards') {
	challengers = {};
 
 	//Character images
	challengers['Straid of Olaphis'] = 'https://images.wikia.nocookie.net/__cb20141215223226/raylantest/images/d/dc/Straid_of_Olaphis.png';
	challengers['Sweet Shalquoir'] = 'https://images.wikia.nocookie.net/__cb20141215223123/raylantest/images/6/66/Sweet_Shalquoir.png';
	challengers['Vengarl of Forossa'] = 'https://images.wikia.nocookie.net/__cb20141215223227/raylantest/images/0/09/VengarlBody.png';
	challengers['Lucatiel of Mirrah'] = 'https://images.wikia.nocookie.net/__cb20141215223224/raylantest/images/4/46/Lucatiel_face.png';
	challengers['Benhart of Jugo'] = 'https://images.wikia.nocookie.net/__cb20140406011230/darksouls/images/b/b7/Benhart_trophy.png';
 
 	//Character links
	challengers['Straid of Olaphis-link'] = 'http://darksouls.wikia.com/wiki/Straid_of_Olaphis';
	challengers['Sweet Shalquoir-link'] = 'http://darksouls.wikia.com/wiki/Sweet_Shalquoir';
 	challengers['Vengarl of Forossa-link'] = 'http://darksouls.wikia.com/wiki/Vengarl_of_Forossa';
 	challengers['Lucatiel of Mirrah-link'] = 'http://darksouls.wikia.com/wiki/Lucatiel_of_Mirrah';
 	challengers['Benhart of Jugo-link'] = 'http://darksouls.wikia.com/wiki/Benhart_of_Jugo';
  
  	//Boss images
	challengers['Executioner\'s Chariot'] = 'https://images.wikia.nocookie.net/__cb20141215223129/raylantest/images/f/fc/Executioner%27s_Chariot.png';
	challengers['Looking Glass Knight'] = 'https://images.wikia.nocookie.net/__cb20141215223224/raylantest/images/1/18/Looking_Glass_Knight.png';
	challengers['Lost Sinner'] = 'https://images.wikia.nocookie.net/__cb20141215223224/raylantest/images/f/f4/LostSinner.jpg';
	challengers['Nashandra'] = 'https://images.wikia.nocookie.net/__cb20141215223225/raylantest/images/c/c3/Nashandra.png';
	challengers['The Pursuer'] = 'https://images.wikia.nocookie.net/__cb20141215223227/raylantest/images/e/ef/The_Pursuer.png';
 
  	//Boss links
	challengers['Executioner\'s Chariot-link'] = 'http://darksouls.wikia.com/wiki/Executioner%27s_Chariot';
	challengers['Looking Glass Knight-link'] = 'http://darksouls.wikia.com/wiki/Looking_Glass_Knight';
	challengers['Lost Sinner-link'] = 'http://darksouls.wikia.com/wiki/Lost_Sinner';
	challengers['Nashandra-link'] = 'http://darksouls.wikia.com/wiki/Nashandra';
	challengers['The Pursuer-link'] = 'http://darksouls.wikia.com/wiki/The_Pursuer';
 
        //View images
	challengers['Drangleic Castle'] = 'https://images.wikia.nocookie.net/__cb20141215223128/raylantest/images/8/8e/DrangleicCastle.jpg';
	challengers['Dragon Aerie'] = 'https://images.wikia.nocookie.net/__cb20141215223124/raylantest/images/7/7c/Dragonaerie.jpg';
	challengers['Shrine of Amana'] = 'https://images.wikia.nocookie.net/__cb20141215223223/raylantest/images/6/67/Lieu-Sanctuaire_d%27Amana.jpg';
 
 	//View links
	challengers['Drangleic Castle-link'] = 'http://darksouls.wikia.com/wiki/Drangleic_Castle';
	challengers['Dragon Aerie-link'] = 'http://darksouls.wikia.com/wiki/Dragon_Aerie';
	challengers['Shrine of Amana-link'] = 'http://darksouls.wikia.com/wiki/Shrine_of_Amana';

 	//PvP images
	challengers['Huntsman\'s Copse'] = 'https://images.wikia.nocookie.net/__cb20141215223129/raylantest/images/e/e7/Huntsman%27s_Copse.jpg';
	challengers['Iron Keep Bridge'] = 'https://images.wikia.nocookie.net/__cb20141215223130/raylantest/images/8/8c/IronKeep.jpg';
	challengers['Belfry Luna'] = 'https://images.wikia.nocookie.net/__cb20141215223124/raylantest/images/1/16/BelfryLuna.jpg';
	challengers['Dragon Shrine'] = 'https://images.wikia.nocookie.net/__cb20141215223127/raylantest/images/0/0d/DragonShrine.png';
 
 	//PvP links
	challengers['Huntsman\'s Copse-link'] = 'http://darksouls.wikia.com/wiki/Huntsman%27s_Copse';
	challengers['Iron Keep Bridge-link'] = 'http://darksouls.wikia.com/wiki/Iron_Keep';
	challengers['Belfry Luna-link'] = 'http://darksouls.wikia.com/wiki/Belfry_Luna';
	challengers['Dragon Shrine-link'] = 'http://darksouls.wikia.com/wiki/Dragon_Shrine';

 	//Ultra Greatsword images
	challengers['Black Knight'] = 'https://images.wikia.nocookie.net/__cb20141215223125/raylantest/images/8/8f/Black_Knight_Ultra_Greatsword.png';
	challengers['Crypt Blacksword'] = 'https://images.wikia.nocookie.net/__cb20141215223125/raylantest/images/1/12/Crypt_Blacksword.png';
	challengers['Drakewing'] = 'https://images.wikia.nocookie.net/__cb20141215223127/raylantest/images/9/9b/Drakewing_Ultra_Greatsword.png';
	challengers['King\'s'] = 'https://images.wikia.nocookie.net/__cb20141215223222/raylantest/images/d/d5/King%27s_Ultra_Greatsword.png';
	challengers['Smelter Sword'] = 'https://images.wikia.nocookie.net/__cb20141215223226/raylantest/images/c/c1/Smelter_Sword.png';
 
 	//Ultra Greatsword links
	challengers['Black Knight-link'] = 'http://darksouls.wikia.com/wiki/Black_Knight_Ultra_Greatsword';
	challengers['Crypt Blacksword-link'] = 'http://darksouls.wikia.com/wiki/Crypt_Blacksword';
	challengers['Drakewing-link'] = 'http://darksouls.wikia.com/wiki/Drakewing_Ultra_Greatsword';
	challengers['King\'s-link'] = 'http://darksouls.wikia.com/wiki/King%27s_Ultra_Greatsword';
	challengers['Smelter Sword-link'] = 'http://darksouls.wikia.com/wiki/Smelter_Sword';

 	//Addition images
	challengers['Curses'] = 'https://images.wikia.nocookie.net/__cb20141215223126/raylantest/images/2/21/Curse_Jar.png';
	challengers['Oil'] = 'https://images.wikia.nocookie.net/__cb20141215223225/raylantest/images/0/06/Oil.png';
	challengers['Phantoms'] = 'https://images.wikia.nocookie.net/__cb20141215223225/raylantest/images/1/14/Phantom_II.png';
 
 	//Addition links
	challengers['Curses-link'] = 'http://darksouls.wikia.com/wiki/Curse_%28Dark_Souls_II%29';
	challengers['Oil-link'] = 'http://darksouls.wikia.com/wiki/Oil_%28Status_Effect%29';
	challengers['Phantoms-link'] = 'http://darksouls.wikia.com/wiki/Phantom_%28Dark_Souls_II%29';

        //Covenant images
        challengers['Bell Keepers'] = 'https://images.wikia.nocookie.net/__cb20141217034916/raylantest/images/6/61/BellKeepers.png';
        challengers['Blue Sentinels'] = 'https://images.wikia.nocookie.net/__cb20141217034917/raylantest/images/e/e5/BlueSentinels.png';
        challengers['Brotherhood of Blood'] = 'https://images.wikia.nocookie.net/__cb20141217034917/raylantest/images/9/98/BrotherhoodofBlood.png';
        challengers['Company of Champions'] = 'https://images.wikia.nocookie.net/__cb20141217034918/raylantest/images/9/90/CompanyofChampions.png';
        challengers['Dragon Remnants'] = 'https://images.wikia.nocookie.net/__cb20141217034919/raylantest/images/b/b6/DragonRemnants.png';
        challengers['Heirs of the Sun'] = 'https://images.wikia.nocookie.net/__cb20141217034920/raylantest/images/c/c5/HeirsoftheSun.png';
        challengers['Pilgrims of Dark'] = 'https://images.wikia.nocookie.net/__cb20141217035005/raylantest/images/c/cc/PilgrimsoftheDark.jpg';
        challengers['Rat King'] = 'https://images.wikia.nocookie.net/__cb20141217035006/raylantest/images/d/d4/RatKing.png';
        challengers['Way of Blue'] = 'https://images.wikia.nocookie.net/__cb20141217035008/raylantest/images/7/79/WayofBlue.png';

        //Covenant links
        challengers['Bell Keepers-link'] = 'http://darksouls.wikia.com/wiki/Bell_Keepers';
        challengers['Blue Sentinels-link'] = 'http://darksouls.wikia.com/wiki/Blue_Sentinels';
        challengers['Brotherhood of Blood-link'] = 'http://darksouls.wikia.com/wiki/Brotherhood_of_Blood';
        challengers['Company of Champions-link'] = 'http://darksouls.wikia.com/wiki/Company_of_Champions';
        challengers['Dragon Remnants-link'] = 'http://darksouls.wikia.com/wiki/Dragon_Remnants';
        challengers['Heirs of the Sun-link'] = 'http://darksouls.wikia.com/wiki/Heirs_of_the_Sun';
        challengers['Pilgrims of Dark-link'] = 'http://darksouls.wikia.com/wiki/Pilgrims_of_Dark';
        challengers['Rat King-link'] = 'http://darksouls.wikia.com/wiki/Rat_King_(Covenant)';
        challengers['Way of Blue-link'] = 'http://darksouls.wikia.com/wiki/Way_of_Blue';

        //Armor images
        challengers['Moon Butterfly'] = 'https://images.wikia.nocookie.net/__cb20141217035001/raylantest/images/a/a3/Moon_Butterfly_Set.png';
        challengers['Smelter Demon'] = 'https://images.wikia.nocookie.net/__cb20141217035007/raylantest/images/4/4c/SmelterDemon.jpg';
        challengers['Dragon Acolyte'] = 'https://images.wikia.nocookie.net/__cb20141217034918/raylantest/images/a/a7/DragonAcolyte.jpg';
        challengers['Aurous\' Set'] = 'https://images.wikia.nocookie.net/__cb20141217034916/raylantest/images/4/4c/Aurous.jpg';
        challengers['Heide Knight'] = 'https://images.wikia.nocookie.net/__cb20141217034920/raylantest/images/0/0b/HeideKnight.jpg';

        //Armor links
        challengers['Moon Butterfly-link'] = 'http://darksouls.wikia.com/wiki/Moon_Butterfly_Set';
        challengers['Smelter Demon-link'] = 'http://darksouls.wikia.com/wiki/Smelter_Demon_Set';
        challengers['Dragon Acolyte-link'] = 'http://darksouls.wikia.com/wiki/Dragon_Acolyte_Set';
        challengers['Aurous\' Set-link'] = 'http://darksouls.wikia.com/wiki/Aurous%27_Set';
        challengers['Heide Knight-link'] = 'http://darksouls.wikia.com/wiki/Heide_Knight_Set';

        //Memory images
        challengers['Jeigh'] = 'https://images.wikia.nocookie.net/__cb20141217034921/raylantest/images/3/3f/Jeigh.jpg';
        challengers['Orro'] = 'https://images.wikia.nocookie.net/__cb20141217035005/raylantest/images/b/b0/Orro.jpg';
        challengers['The King'] = 'https://images.wikia.nocookie.net/__cb20141217035001/raylantest/images/1/1d/King.png';
        challengers['Old Iron King'] = 'https://images.wikia.nocookie.net/__cb20141217035003/raylantest/images/e/ec/OldIronKing.jpg';
        challengers['Vammar'] = 'https://images.wikia.nocookie.net/__cb20141217035008/raylantest/images/9/94/Vammar.png';

        //Memory links
        challengers['Jeigh-link'] = 'http://darksouls.wikia.com/wiki/Memory_of_Jeigh';
        challengers['Orro-link'] = 'http://darksouls.wikia.com/wiki/Memory_of_Orro';
        challengers['The King-link'] = 'http://darksouls.wikia.com/wiki/Memory_of_the_King';
        challengers['Old Iron King-link'] = 'http://darksouls.wikia.com/wiki/Memory_of_the_Old_Iron_King';
        challengers['Vammar-link'] = 'http://darksouls.wikia.com/wiki/Memory_of_Vammar';

        //DLC images
        challengers['Crown of the Sunken King'] = 'https://images.wikia.nocookie.net/__cb20141217035007/raylantest/images/d/d9/SunkenKing.png';
        challengers['Crown of the Old Iron King'] = 'https://images.wikia.nocookie.net/__cb20141217035004/raylantest/images/2/27/OldIronKingDLC.jpg';
        challengers['Crown of the Ivory King'] = 'https://images.wikia.nocookie.net/__cb20141217034921/raylantest/images/b/bd/IvoryKing.jpg';

        //DLC links
        challengers['Crown of the Sunken King-link'] = 'http://darksouls.wikia.com/wiki/Crown_of_the_Sunken_King';
        challengers['Crown of the Old Iron King-link'] = 'http://darksouls.wikia.com/wiki/Crown_of_the_Old_Iron_King';
        challengers['Crown of the Ivory King-link'] = 'http://darksouls.wikia.com/wiki/Crown_of_the_Ivory_King';

	challengerPoll = {
		init: function() {
			$('.ajax-poll').each(function() {
				var pollID = $(this).attr('id').split('-')[2];
				$('.pollAnswerName label', this).each(function(index) {
					var challenger = $(this).text();
					var radioID = $('input', this).attr('id');
					var radioValue = $('input', this).attr('value');
					var challenger1 = challenger.trim();
					challengerPoll.beautify(this, challenger1, pollID, radioID, radioValue);
				});
			});
 
			$('.ajax-poll').on('click', '.challenger img', function() {
				var currentPoll = $(this).parents().find('.ajax-poll').get(0);
				$(this).closest('.ajax-poll').children().find('.challenger').attr('class','challenger');
				$(this).parent().addClass('active');
 
				var pollID = $(this).attr('data-poll');
				var pollRadio = $(this).attr('data-radio');
				var pollValue = $(this).attr('data-value');
				var params = {};
				params['action'] = 'ajax';
				params['rs'] = 'axAjaxPollSubmit';
				params['title'] = wgPageName;
				params['wpPollId'] = pollID;
				params['wpVote'] = 'Vote!';
				params[pollRadio] = pollValue;
				$.post('index.php', params, function(data) {
					var total = data.total;
					$('.pollAnswerVotes', currentPoll).each(function() {
						var votedSpan = $('span', this);
						var votedBar = $('div', this);
						var currentValue = $('span', this).attr('id').split('-')[1];
						
						if (typeof data.votes[currentValue] != 'undefined') {
							$(votedSpan).text(data.votes[currentValue].value);
							$(votedSpan).attr('title',data.votes[currentValue].percent + '%');
							$(votedBar).css('width',data.votes[currentValue].percent + '%');
						}
						else {
							$(votedSpan).text('0');
							$(votedSpan).attr('title','0%');
							$(votedBar).css('width','0%');						
						}
					});		
				}, "json");
			});
 
		},	
		beautify: function(element, challenger, poll, radio, value) {
			var challengerLink = challenger + '-link';
			$(element).html('<a href="' + challengers[challengerLink] +'"><div class="name">' + challenger + '</div></a><div class="challenger"><img data-poll="' + poll +'" data-radio="' + radio + '" data-value="' + value + '" style="width: 100px; height: 100px;" class="challenger-image" src="' + challengers[challenger] + '" alt="' + challenger + '"></div>');
		}
	};
 
	$(document).ready(function() {
		$('.ajax-poll .total').parent().attr('class','description');
		$('.ajax-poll .pollAnswerVotes span').each(function () {
			var titleReplace = $(this).attr('title');
			if (titleReplace == 0) {
				$(this).attr('title','0%');				
			}
			else if (titleReplace) {
				var titleReplace = titleReplace.replace(/[^[0-9\,\.\%]+/g,'');
				$(this).attr('title',titleReplace);
			}
			else {
				$(this).attr('title','0%');		
			}
		});
		challengerPoll.init();
	});
}
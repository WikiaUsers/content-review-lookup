importArticles({
    type: "script",
    articles: [
        "MediaWiki:Wikia.js/Slider.js"
    ]
});

//Scrolls Games left and right
$('.GamesArrowLeft').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll-540},1000);
});
$('.GamesArrowRight').click(function () {
    scroll = $('#GamesCarousel').scrollLeft();
    $('#GamesCarousel').animate({'scrollLeft': scroll+540},1000);
});

// ==============================
// BackToTopButton
// ==============================
 
//A script that adds a "Back To Top" option in the footer of the Oasis theme.
//People don't like scrolling back to top on long pages neither do you :)
//Created by Noemon from Dead Space Wiki
 
 
function hideFade () {
	// hide #backtotop first
	$( "#backtotop" ).hide ();
	// fade in #backtotop
	$( function () {
		$( window ).scroll( function () {
			if ( $( this ).scrollTop () > ButtonStart ) {
				$( '#backtotop' ).fadeIn ();
			} else {
				$( '#backtotop' ).fadeOut ();
			}
		});
	});
}
 
function goToTop (){
	// scroll body to 0px on click
	$( 'body,html' ).animate ({
		scrollTop: 0
	}, ScrollSpeed );
	return false;
}
 
function addBackToTop () {
	if( skin == 'oasis' ) {
		$('<li id="backtotop" style="position: absolute; right:20px; top:0px; border:none;"><button type="button" value="Back To Top" onClick="goToTop();">Back To Top</button></li>').appendTo('#WikiaBarWrapper .toolbar > .tools');	
		hideFade ();
	}	
}
 
var ButtonStart = 800;
var ScrollSpeed = 600;
 
if( !window.BackToTop  ) {
	$( document ).ready( function () { 
		addBackToTop (); 
	});
}
var BackToTop = true; // prevent duplication

/* Voting */
if (wgPageName === 'User_blog:Raylan13/Rogue_vs_Unity_Community_Choice_Awards') {
	challengers = {};
 
 	//Main character images
	challengers['Arno Dorian'] = 'https://images.wikia.nocookie.net/__cb20141210205147/raylantest/images/5/59/Arno.jpg';
	challengers['Shay Cormac'] = 'https://images.wikia.nocookie.net/__cb20141210205509/raylantest/images/b/be/Shay.jpg';
 
 	//Main character links
	challengers['Arno Dorian-link'] = 'http://assassinscreed.wikia.com/wiki/Arno_Dorian';
	challengers['Shay Cormac-link'] = 'http://assassinscreed.wikia.com/wiki/Shay_Cormac';
  
 	//Supporting characters images
	challengers['Achilles Davenport'] = 'https://images.wikia.nocookie.net/__cb20141210205146/raylantest/images/8/88/Achilles.png';
	challengers['Élise de la Serre'] = 'https://images.wikia.nocookie.net/__cb20141210205148/raylantest/images/e/e6/Elise.jpg';
	challengers['Hope Jensen'] = 'https://images.wikia.nocookie.net/__cb20141210205149/raylantest/images/0/00/Hope.jpg';
	challengers['Liam O\'Brien'] = 'https://images.wikia.nocookie.net/__cb20141210205240/raylantest/images/1/15/Liam.png';
	challengers['Pierre Bellec'] = 'https://images.wikia.nocookie.net/__cb20141210205244/raylantest/images/7/7e/Pierre.png';
 
 	//Supporting characters links
	challengers['Achilles Davenport-link'] = 'http://assassinscreed.wikia.com/wiki/Achilles_Davenport';
	challengers['Élise de la Serre-link'] = 'http://assassinscreed.wikia.com/wiki/Elise_de_la_Serre';
	challengers['Hope Jensen-link'] = 'http://assassinscreed.wikia.com/wiki/Hope_Jensen';
	challengers['Liam O\'Brien-link'] = 'http://assassinscreed.wikia.com/wiki/Liam';
	challengers['Pierre Bellec-link'] = 'http://assassinscreed.wikia.com/wiki/Pierre_Bellec';
 
 	//Locations images
	challengers['Atlantic Ocean'] = 'https://images.wikia.nocookie.net/__cb20141210205241/raylantest/images/3/3a/NorthAtlantic.jpg';
	challengers['New York City'] = 'https://images.wikia.nocookie.net/__cb20141210205240/raylantest/images/a/a1/NewYork.jpg';
	challengers['Notre\-Dame'] = 'https://images.wikia.nocookie.net/__cb20141210205242/raylantest/images/b/b9/NotreDame.jpg';
	challengers['Paris'] = 'https://images.wikia.nocookie.net/__cb20141210205242/raylantest/images/8/89/Paris.jpg';
 
 	//Locations links
	challengers['Atlantic Ocean-link'] = 'http://assassinscreed.wikia.com/wiki/Atlantic_Ocean';
	challengers['New York City-link'] = 'http://assassinscreed.wikia.com/wiki/New_York_City';
	challengers['Notre\-Dame-link'] = 'http://assassinscreed.wikia.com/wiki/Notre-Dame';
	challengers['Paris-link'] = 'http://assassinscreed.wikia.com/wiki/Paris';

 	//Backdrop images
	challengers['French Revolution'] = 'https://images.wikia.nocookie.net/__cb20141210205149/raylantest/images/5/55/FrenchRevolution.jpg';
	challengers['Seven Years\' War'] = 'https://images.wikia.nocookie.net/__cb20141210205509/raylantest/images/9/9a/SevenYears.png';
 
 	//Backdrop links
	challengers['French Revolution-link'] = 'http://assassinscreed.wikia.com/wiki/French_Revolution';
	challengers['Seven Years\' War-link'] = 'http://assassinscreed.wikia.com/wiki/Seven_Years%27_War';

 	//Weapons images
	challengers['Air rifle'] = 'https://images.wikia.nocookie.net/__cb20141210205146/raylantest/images/0/06/AirRifle.jpg';
	challengers['Phantom Blade'] = 'https://images.wikia.nocookie.net/__cb20141210205243/raylantest/images/c/ce/PhantomBlade.jpg';
 
 	//Weapons links
	challengers['Air rifle-link'] = 'http://assassinscreed.wikia.com/wiki/Air_rifle';
	challengers['Phantom Blade-link'] = 'http://assassinscreed.wikia.com/wiki/Phantom_Blade';

 	//Story images
	challengers['Assassin\'s Creed: Unity'] = 'https://images.wikia.nocookie.net/__cb20141210205509/raylantest/images/c/c2/Unity.jpg';
	challengers['Assassin\'s Creed: Rogue'] = 'https://images.wikia.nocookie.net/__cb20141210205505/raylantest/images/f/f6/Rogue.jpg';
 
 	//Story links
	challengers['Assassin\'s Creed: Unity-link'] = 'http://assassinscreed.wikia.com/wiki/Assassin%27s_Creed:_Unity';
	challengers['Assassin\'s Creed: Rogue-link'] = 'http://assassinscreed.wikia.com/wiki/Assassin%27s_Creed:_Rogue';

 	//Platform images
	challengers['PC'] = 'https://images.wikia.nocookie.net/__cb20141210205243/raylantest/images/7/79/PC.jpg';
	challengers['PS3'] = 'https://images.wikia.nocookie.net/__cb20141210205244/raylantest/images/2/2a/PS3.jpg';
	challengers['PS4'] = 'https://images.wikia.nocookie.net/__cb20141210205245/raylantest/images/b/bd/PS4.png';
	challengers['Xbox 360'] = 'https://images.wikia.nocookie.net/__cb20141210205511/raylantest/images/3/32/Xbox360.jpg';
	challengers['Xbox One'] = 'https://images.wikia.nocookie.net/__cb20141210205511/raylantest/images/7/78/XBoxOne.jpg';
 
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

/* Voting */
if (wgPageName === 'User_blog:Raylan13/Ultimate_Goblins_vs_Gnomes_Battle') {
	challengers = {};
 
 	//Legendary minion images
	challengers['Blingtron 3000'] = 'https://images.wikia.nocookie.net/__cb20141210032115/raylantest/images/7/7f/BLINGTRON_30001.png';
	challengers['Hemet Nesingwary'] = 'https://images.wikia.nocookie.net/__cb20141203045719/hearthstone/images/2/25/HemetNesingwary1.png';
	challengers['Mekgineer Thermaplugg'] = 'https://images.wikia.nocookie.net/__cb20141114052529/hearthstone/images/f/f9/MEKGINEER_THERMAPLUGG.png';
	challengers['Mimiron\'s Head'] = 'https://images.wikia.nocookie.net/__cb20141114211046/hearthstone/images/3/37/MimironsHead.png';
	challengers['Mogor the Ogre'] = 'https://images.wikia.nocookie.net/__cb20141203050026/hearthstone/images/7/77/MogortheOgre.png';
 
 	//Legendary minion links
	challengers['Blingtron 3000-link'] = 'http://hearthstone.wikia.com/wiki/Blingtron_3000';
	challengers['Hemet Nesingwary-link'] = 'http://hearthstone.wikia.com/wiki/Hemet_Nesingwary_%28card%29';
 	challengers['Mekgineer Thermaplugg-link'] = 'http://hearthstone.wikia.com/wiki/Mekgineer_Thermaplugg';
 	challengers['Mimiron\'s Head-link'] = 'http://hearthstone.wikia.com/wiki/Mimiron%27s_Head';
 	challengers['Mogor the Ogre-link'] = 'http://hearthstone.wikia.com/wiki/Mogor_the_Ogre';
  
 	//Mech images
	challengers['Annoy\-o\-Tron'] = 'https://images.wikia.nocookie.net/__cb20141114052426/hearthstone/images/3/3e/ANNOY-O-TRON.png';
	challengers['Enhance\-o\-Mechano'] = 'https://images.wikia.nocookie.net/__cb20141114052431/hearthstone/images/c/c3/ENHANCE-O-MECHANO.png';
	challengers['Jeeves'] = 'https://images.wikia.nocookie.net/__cb20141119032315/hearthstone/images/6/63/Jeeves.png';
	challengers['Micro Machine'] = 'https://images.wikia.nocookie.net/__cb20141114052530/hearthstone/images/a/ad/MICRO_MACHINE.png';
	challengers['Piloted Sky Golem'] = 'https://images.wikia.nocookie.net/__cb20141114052530/hearthstone/images/6/60/PILOTED_SKY_GOLEM.png';
 
 	//Mech links
	challengers['Annoy\-o\-Tron-link'] = 'http://hearthstone.wikia.com/wiki/Annoy-o-Tron';
	challengers['Enhance\-o\-Mechano-link'] = 'http://hearthstone.wikia.com/wiki/Enhance-o-Mechano';
	challengers['Jeeves-link'] = 'http://hearthstone.wikia.com/wiki/Jeeves';
	challengers['Micro Machine-link'] = 'http://hearthstone.wikia.com/wiki/Micro_Machine';
	challengers['Piloted Sky Golem-link'] = 'http://hearthstone.wikia.com/wiki/Piloted_Sky_Golem';
 
 	//Spare Part images
	challengers['Emergency Coolant'] = 'https://images.wikia.nocookie.net/__cb20141114211004/hearthstone/images/6/68/EmergencyCoolant.png';
	challengers['Finicky Cloakfield'] = 'https://images.wikia.nocookie.net/__cb20141114211006/hearthstone/images/4/46/FinickyCloakfield.png';
	challengers['Reversing Switch'] = 'https://images.wikia.nocookie.net/__cb20141114211046/hearthstone/images/5/5e/ReversingSwitch.png';
	challengers['Rusty Horn'] = 'https://images.wikia.nocookie.net/__cb20141114211048/hearthstone/images/5/51/RustyHorn.png';
	challengers['Whirling Blades'] = 'https://images.wikia.nocookie.net/__cb20141114211049/hearthstone/images/3/34/WhirlingBlades.png';
 
 	//Spare Part links
	challengers['Emergency Coolant-link'] = 'http://hearthstone.wikia.com/wiki/Emergency_Coolant';
	challengers['Finicky Cloak Field-link'] = 'http://hearthstone.wikia.com/wiki/Finicky_Cloak_Field';
	challengers['Reversing Switch-link'] = 'http://hearthstone.wikia.com/wiki/Reversing_Switch';
	challengers['Rusty Horn-link'] = 'http://hearthstone.wikia.com/wiki/Rusty_Horn';
	challengers['Whirling Blades-link'] = 'http://hearthstone.wikia.com/wiki/Whirling_Blades';

 	//Weapon images
	challengers['Coghammer'] = 'https://images.wikia.nocookie.net/__cb20141125004922/hearthstone/images/3/36/Coghammer.png';
	challengers['Cogmaster\'s Wrench'] = 'https://images.wikia.nocookie.net/__cb20141203045516/hearthstone/images/a/a6/CogmastersWrench.png';
	challengers['Glaivezooka'] = 'https://images.wikia.nocookie.net/__cb20141203045718/hearthstone/images/4/4c/Glaivezooka.png';
	challengers['Ogre Warmaul'] = 'https://images.wikia.nocookie.net/__cb20141203050027/hearthstone/images/2/27/OgreWarmaul.png';
	challengers['Powermace'] = 'https://images.wikia.nocookie.net/__cb20141203050028/hearthstone/images/7/7f/Powermace.png';
 
 	//Weapon links
	challengers['Coghammer-link'] = 'http://hearthstone.wikia.com/wiki/Coghammer';
	challengers['Cogmaster\'s Wrench-link'] = 'http://hearthstone.wikia.com/wiki/Cogmaster%27s_Wrench';
	challengers['Glaivezooka-link'] = 'http://hearthstone.wikia.com/wiki/Glaivezooka';
	challengers['Ogre Warmaul-link'] = 'http://hearthstone.wikia.com/wiki/Ogre_Warmaul';
	challengers['Powermace-link'] = 'http://hearthstone.wikia.com/wiki/Powermace';

 	//Class legendary images
	challengers['Malorne'] = 'https://images.wikia.nocookie.net/__cb20141203045846/hearthstone/images/f/ff/Malorne.png';
	challengers['Gahz\'rilla'] = 'https://images.wikia.nocookie.net/__cb20141125004923/hearthstone/images/5/57/Gahzrilla.png';
	challengers['Neptulon'] = 'https://images.wikia.nocookie.net/__cb20141203050026/hearthstone/images/b/bd/Neptulon.png';
	challengers['Mal\'Ganis'] = 'https://images.wikia.nocookie.net/__cb20141203045845/hearthstone/images/d/dc/MalGanis.png';
	challengers['Iron Juggernaut'] = 'https://images.wikia.nocookie.net/__cb20141203045841/hearthstone/images/c/cf/IronJuggernaut.png';
 
 	//Class legendary links
	challengers['Malorne-link'] = 'http://hearthstone.wikia.com/wiki/Malorne';
	challengers['Gahz\rilla-link'] = 'http://hearthstone.wikia.com/wiki/Gahz%27rilla';
	challengers['Neptulon-link'] = 'http://hearthstone.wikia.com/wiki/Neptulon';
	challengers['Mal\'Ganis-link'] = 'http://hearthstone.wikia.com/wiki/Mal%27Ganis';
	challengers['Iron Juggernaut-link'] = 'http://hearthstone.wikia.com/wiki/Iron_Juggernaut';

 	//Epic minion images
	challengers['Clockwork Giant'] = 'https://images.wikia.nocookie.net/__cb20141114052429/hearthstone/images/7/76/CLOCKWORK_GIANT.png';
	challengers['Fel Reaver'] = 'https://images.wikia.nocookie.net/__cb20141203045519/hearthstone/images/9/9f/FelReaver.png';
	challengers['Hobgoblin'] = 'https://images.wikia.nocookie.net/__cb20141203045841/hearthstone/images/3/31/Hobgoblin.png';
	challengers['Mini\-Mage'] = 'https://images.wikia.nocookie.net/__cb20141203050025/hearthstone/images/b/ba/MiniMage.png';
	challengers['Recombobulator'] = 'https://images.wikia.nocookie.net/__cb20141114052531/hearthstone/images/2/25/RECOMBOBULATOR.png';
 
 	//Epic minion links
	challengers['Clockwork Giant-link'] = 'http://hearthstone.wikia.com/wiki/Clockwork_Giant';
	challengers['Fel Reaver-link'] = 'http://hearthstone.wikia.com/wiki/Fel_Reaver';
	challengers['Hobgoblin-link'] = 'http://hearthstone.wikia.com/wiki/Hobgoblin';
	challengers['Mini\-Mage-link'] = 'http://hearthstone.wikia.com/wiki/Mini-Mage';
	challengers['Recombobulator-link'] = 'http://hearthstone.wikia.com/wiki/Recombobulator';
 
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
			$(element).html('<a href="' + challengers[challengerLink] +'"><div class="name">' + challenger + '</div></a><div class="challenger"><img data-poll="' + poll +'" data-radio="' + radio + '" data-value="' + value + '" style="width: 166px; height: 238px;" class="challenger-image" src="' + challengers[challenger] + '" alt="' + challenger + '"></div>');
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

/* Voting */
if (wgPageName === 'User_blog:Raylan13/Ultimate_Five_Nights_at_Freddy\'s_Battle') {
	challengers = {};
 
 	//Antagonist images
	challengers['Balloon Boy'] = 'https://images.wikia.nocookie.net/__cb20141212030706/raylantest/images/2/20/FNAF2BB1.png';
	challengers['Mangle'] = 'https://images.wikia.nocookie.net/__cb20141212030816/raylantest/images/c/c5/RedesignedFoxyTheMangle.png';
	challengers['The Puppet'] = 'https://images.wikia.nocookie.net/__cb20141212030817/raylantest/images/2/2b/ThePuppetsFace.png';
	challengers['Toy Bonnie'] = 'https://images.wikia.nocookie.net/__cb20141212030818/raylantest/images/2/2c/ToyBonnieLeaning.png';
	challengers['Toy Chica'] = 'https://images.wikia.nocookie.net/__cb20141212030818/raylantest/images/c/c9/ToyChicaPortrait.png';
	challengers['Toy Freddy'] = 'https://images.wikia.nocookie.net/__cb20141212030818/raylantest/images/7/7a/ToyFreddyBlackEyes.png';
 
 	//Antagonist links
	challengers['Balloon Boy-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/BB';
	challengers['Mangle-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Mangle';
 	challengers['The Puppet-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/The_Puppet';
 	challengers['Toy Bonnie-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Toy_Bonnie';
 	challengers['Toy Chica-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Toy_Chica';
 	challengers['Toy Freddy-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Toy_Freddy';
  
 	//Original images
	challengers['Bonnie'] = 'https://images.wikia.nocookie.net/__cb20141212030720/raylantest/images/f/f4/Bonnie1.png';
	challengers['Chica'] = 'https://images.wikia.nocookie.net/__cb20141212030720/raylantest/images/a/ab/Chica1.png';
	challengers['Foxy'] = 'https://images.wikia.nocookie.net/__cb20141212030721/raylantest/images/b/b4/Foxy1.png';
	challengers['Freddy Fazbear'] = 'https://images.wikia.nocookie.net/__cb20141212030720/raylantest/images/6/60/5271.png';
 
 	//Original links
	challengers['Bonnie-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Bonnie';
	challengers['Chica-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Chica';
	challengers['Foxy-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Foxy';
	challengers['Freddy Fazbear-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Freddy_Fazbear';
 
 	//Freddy images
	challengers['Golden Freddy'] = 'https://images.wikia.nocookie.net/__cb20141212030704/raylantest/images/5/52/5731.png';
	challengers['Shadow Freddy'] = 'https://images.wikia.nocookie.net/__cb20141212030816/raylantest/images/e/ea/Shadow_freddy_bright.png';
 
 	//Freddy links
	challengers['Golden Freddy-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Golden_Freddy';
	challengers['Shadow Freddy-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Hallucinations_%28FNaF2%29';

 	//Room images
	challengers['Kid\'s Cove'] = 'https://images.wikia.nocookie.net/__cb20141212030703/raylantest/images/0/09/751.png';
	challengers['Main Hall'] = 'https://images.wikia.nocookie.net/__cb20141212030814/raylantest/images/f/f6/Main_Hall.png';
	challengers['The Office'] = 'https://images.wikia.nocookie.net/__cb20141212030817/raylantest/images/f/f8/The_Office_2_No_Flashlight.png';
	challengers['Parts\/Service'] = 'https://images.wikia.nocookie.net/__cb20141212030815/raylantest/images/3/3b/PartsAndServicesEmpty.png';
	challengers['Prize Corner'] = 'https://images.wikia.nocookie.net/__cb20141212030815/raylantest/images/1/19/PrizeCorner.png';
 
 	//Room links
	challengers['Kid\'s Cove-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Kid%27s_Cove';
	challengers['Main Hall-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Main_Hall';
	challengers['The Office-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/The_Office_%28FNaF2%29';
	challengers['Parts\/Service-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Parts/Service';
	challengers['Prize Corner-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Prize_Corner';

 	//Mechanic images
	challengers['Death Minigames'] = 'https://images.wikia.nocookie.net/__cb20141212030722/raylantest/images/5/50/Freddydance1.gif';
	challengers['Flashlight'] = 'https://images.wikia.nocookie.net/__cb20141212030705/raylantest/images/4/45/Flashlight1.png';
	challengers['Freddy Head'] = 'https://images.wikia.nocookie.net/__cb20141212030814/raylantest/images/5/50/LookingThroughTheMask.png';
	challengers['Hallucinations'] = 'https://images.wikia.nocookie.net/__cb20141212030816/raylantest/images/e/ea/Shadow_freddy_bright.png';
	challengers['Music Box'] = 'https://images.wikia.nocookie.net/__cb20141212030817/raylantest/images/2/2b/ThePuppetsFace.png';
 
 	//Mechanic links
	challengers['Death Minigames-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Death_Minigames';
	challengers['Flashlight-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Flashlight';
	challengers['Freddy Head-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Freddy_Fazbear_Head';
	challengers['Hallucinations-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Hallucinations_%28FNaF2%29';
	challengers['Music Box-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Music_Box';

 	//Game images
	challengers['Five Nights at Freddy\'s'] = 'https://images.wikia.nocookie.net/__cb20141212030704/raylantest/images/5/51/7681.png';
	challengers['Five Nights at Freddy\'s 2'] = 'https://images.wikia.nocookie.net/__cb20141212030706/raylantest/images/c/c6/FNAF_2_picture1.png';
 
 	//Game links
	challengers['Five Nights at Freddy\'s-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Five_Nights_at_Freddy%27s';
	challengers['Five Nights at Freddy\'s 2-link'] = 'http://freddy-fazbears-pizza.wikia.com/wiki/Five_Nights_at_Freddy%27s_2';

 
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

/* Voting */
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
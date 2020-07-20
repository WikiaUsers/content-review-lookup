var SocialMediaButtons = { 
	position: "top",
	colorScheme: "light",
	buttonSize: "35px"
};
importScriptPage('SocialIcons/code.js','dev');

/* Voting */
if (wgPageName === 'User_blog:Raylan13/Goblins_vs_Gnomes_Community_Choice_Awards') {
	challengers = {};
 
    //Legendary minion images
	challengers['Blingtron 3000'] = 'https://vignette.wikia.nocookie.net/__cb20141210032115/raylantest/images/7/7f/BLINGTRON_30001.png';
	challengers['Hemet Nesingwary'] = 'https://vignette.wikia.nocookie.net/__cb20141203045719/hearthstone/images/2/25/HemetNesingwary1.png';
	challengers['Mekgineer Thermaplugg'] = 'https://vignette.wikia.nocookie.net/__cb20141114052529/hearthstone/images/f/f9/MEKGINEER_THERMAPLUGG.png';
	challengers['Mimiron\'s Head'] = 'https://vignette.wikia.nocookie.net/__cb20141114211046/hearthstone/images/3/37/MimironsHead.png';
	challengers['Mogor the Ogre'] = 'https://vignette.wikia.nocookie.net/__cb20141203050026/hearthstone/images/7/77/MogortheOgre.png';
 
    //Legendary minion links
	challengers['Blingtron 3000-link'] = 'https://hearthstone.fandom.com/wiki/Blingtron_3000';
	challengers['Hemet Nesingwary-link'] = 'https://hearthstone.fandom.com/wiki/Hemet_Nesingwary_%28card%29';
    challengers['Mekgineer Thermaplugg-link'] = 'https://hearthstone.fandom.com/wiki/Mekgineer_Thermaplugg';
    challengers['Mimiron\'s Head-link'] = 'https://hearthstone.fandom.com/wiki/Mimiron%27s_Head';
    challengers['Mogor the Ogre-link'] = 'https://hearthstone.fandom.com/wiki/Mogor_the_Ogre';
  
    //Mech images
    challengers['Annoy-o-Tron'] = 'https://vignette.wikia.nocookie.net/__cb20141114052426/hearthstone/images/3/3e/ANNOY-O-TRON.png';
    challengers['Enhance-o-Mechano'] = 'https://vignette.wikia.nocookie.net/__cb20141114052431/hearthstone/images/c/c3/ENHANCE-O-MECHANO.png';
	challengers['Jeeves'] = 'https://vignette.wikia.nocookie.net/__cb20141119032315/hearthstone/images/6/63/Jeeves.png';
	challengers['Micro Machine'] = 'https://vignette.wikia.nocookie.net/__cb20141114052530/hearthstone/images/a/ad/MICRO_MACHINE.png';
	challengers['Piloted Sky Golem'] = 'https://vignette.wikia.nocookie.net/__cb20141114052530/hearthstone/images/6/60/PILOTED_SKY_GOLEM.png';
 
    //Mech links
    challengers['Annoy-o-Tron-link'] = 'https://hearthstone.fandom.com/wiki/Annoy-o-Tron';
    challengers['Enhance-o-Mechano-link'] = 'https://hearthstone.fandom.com/wiki/Enhance-o-Mechano';
	challengers['Jeeves-link'] = 'https://hearthstone.fandom.com/wiki/Jeeves';
	challengers['Micro Machine-link'] = 'https://hearthstone.fandom.com/wiki/Micro_Machine';
	challengers['Piloted Sky Golem-link'] = 'https://hearthstone.fandom.com/wiki/Piloted_Sky_Golem';
 
    //Spare Part images
	challengers['Emergency Coolant'] = 'https://vignette.wikia.nocookie.net/__cb20141114211004/hearthstone/images/6/68/EmergencyCoolant.png';
	challengers['Finicky Cloakfield'] = 'https://vignette.wikia.nocookie.net/__cb20141114211006/hearthstone/images/4/46/FinickyCloakfield.png';
	challengers['Reversing Switch'] = 'https://vignette.wikia.nocookie.net/__cb20141114211046/hearthstone/images/5/5e/ReversingSwitch.png';
	challengers['Rusty Horn'] = 'https://vignette.wikia.nocookie.net/__cb20141114211048/hearthstone/images/5/51/RustyHorn.png';
	challengers['Whirling Blades'] = 'https://vignette.wikia.nocookie.net/__cb20141114211049/hearthstone/images/3/34/WhirlingBlades.png';
 
    //Spare Part links
	challengers['Emergency Coolant-link'] = 'https://hearthstone.fandom.com/wiki/Emergency_Coolant';
	challengers['Finicky Cloak Field-link'] = 'https://hearthstone.fandom.com/wiki/Finicky_Cloak_Field';
	challengers['Reversing Switch-link'] = 'https://hearthstone.fandom.com/wiki/Reversing_Switch';
	challengers['Rusty Horn-link'] = 'https://hearthstone.fandom.com/wiki/Rusty_Horn';
	challengers['Whirling Blades-link'] = 'https://hearthstone.fandom.com/wiki/Whirling_Blades';

    //Weapon images
	challengers['Coghammer'] = 'https://vignette.wikia.nocookie.net/__cb20141125004922/hearthstone/images/3/36/Coghammer.png';
	challengers['Cogmaster\'s Wrench'] = 'https://vignette.wikia.nocookie.net/__cb20141203045516/hearthstone/images/a/a6/CogmastersWrench.png';
	challengers['Glaivezooka'] = 'https://vignette.wikia.nocookie.net/__cb20141203045718/hearthstone/images/4/4c/Glaivezooka.png';
	challengers['Ogre Warmaul'] = 'https://vignette.wikia.nocookie.net/__cb20141203050027/hearthstone/images/2/27/OgreWarmaul.png';
	challengers['Powermace'] = 'https://vignette.wikia.nocookie.net/__cb20141203050028/hearthstone/images/7/7f/Powermace.png';
 
    //Weapon links
	challengers['Coghammer-link'] = 'https://hearthstone.fandom.com/wiki/Coghammer';
	challengers['Cogmaster\'s Wrench-link'] = 'https://hearthstone.fandom.com/wiki/Cogmaster%27s_Wrench';
	challengers['Glaivezooka-link'] = 'https://hearthstone.fandom.com/wiki/Glaivezooka';
	challengers['Ogre Warmaul-link'] = 'https://hearthstone.fandom.com/wiki/Ogre_Warmaul';
	challengers['Powermace-link'] = 'https://hearthstone.fandom.com/wiki/Powermace';

    //Class legendary images
	challengers['Malorne'] = 'https://vignette.wikia.nocookie.net/__cb20141203045846/hearthstone/images/f/ff/Malorne.png';
	challengers['Gahz\'rilla'] = 'https://vignette.wikia.nocookie.net/__cb20141125004923/hearthstone/images/5/57/Gahzrilla.png';
	challengers['Neptulon'] = 'https://vignette.wikia.nocookie.net/__cb20141203050026/hearthstone/images/b/bd/Neptulon.png';
	challengers['Mal\'Ganis'] = 'https://vignette.wikia.nocookie.net/__cb20141203045845/hearthstone/images/d/dc/MalGanis.png';
	challengers['Iron Juggernaut'] = 'https://vignette.wikia.nocookie.net/__cb20141203045841/hearthstone/images/c/cf/IronJuggernaut.png';
 
    //Class legendary links
	challengers['Malorne-link'] = 'https://hearthstone.fandom.com/wiki/Malorne';
	challengers['Gahz\rilla-link'] = 'https://hearthstone.fandom.com/wiki/Gahz%27rilla';
	challengers['Neptulon-link'] = 'https://hearthstone.fandom.com/wiki/Neptulon';
	challengers['Mal\'Ganis-link'] = 'https://hearthstone.fandom.com/wiki/Mal%27Ganis';
	challengers['Iron Juggernaut-link'] = 'https://hearthstone.fandom.com/wiki/Iron_Juggernaut';

    //Epic minion images
	challengers['Clockwork Giant'] = 'https://vignette.wikia.nocookie.net/__cb20141114052429/hearthstone/images/7/76/CLOCKWORK_GIANT.png';
	challengers['Fel Reaver'] = 'https://vignette.wikia.nocookie.net/__cb20141203045519/hearthstone/images/9/9f/FelReaver.png';
	challengers['Hobgoblin'] = 'https://vignette.wikia.nocookie.net/__cb20141203045841/hearthstone/images/3/31/Hobgoblin.png';
    challengers['Mini-Mage'] = 'https://vignette.wikia.nocookie.net/__cb20141203050025/hearthstone/images/b/ba/MiniMage.png';
	challengers['Recombobulator'] = 'https://vignette.wikia.nocookie.net/__cb20141114052531/hearthstone/images/2/25/RECOMBOBULATOR.png';
 
    //Epic minion links
	challengers['Clockwork Giant-link'] = 'https://hearthstone.fandom.com/wiki/Clockwork_Giant';
	challengers['Fel Reaver-link'] = 'https://hearthstone.fandom.com/wiki/Fel_Reaver';
	challengers['Hobgoblin-link'] = 'https://hearthstone.fandom.com/wiki/Hobgoblin';
	challengers['Mini-Mage-link'] = 'https://hearthstone.fandom.com/wiki/Mini-Mage';
	challengers['Recombobulator-link'] = 'https://hearthstone.fandom.com/wiki/Recombobulator';
 
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
			if (titleReplace === 0) {
				$(this).attr('title','0%');				
			}
			else if (titleReplace) {
				titleReplace = titleReplace.replace(/[^[0-9\,\.\%]+/g,'');
				$(this).attr('title',titleReplace);
			}
			else {
				$(this).attr('title','0%');		
			}
		});
		challengerPoll.init();
	});
}
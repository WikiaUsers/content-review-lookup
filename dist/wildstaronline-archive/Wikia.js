var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'light',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');
/* Voting */
if (wgPageName === 'User_blog:Pinkachu/2014_Community_Choice_Awards') {
	challengers = {};
 
 	//JRPG Box Art images
	challengers['Chua'] = 'https://images.wikia.nocookie.net/__cb20140407225702/wildstaronline/images/d/d6/Chua1.jpg';
	challengers['Draken'] = 'https://images.wikia.nocookie.net/__cb20140507182055/wildstaronline/images/c/c1/Draken_Transparent.png';
	challengers['Aurin'] = 'https://images.wikia.nocookie.net/__cb20141211225216/wildstaronline/images/7/74/Aurin_female.jpg';
	challengers['Granok'] = 'https://images.wikia.nocookie.net/__cb20140507181533/wildstaronline/images/a/a8/Granok.png';
	challengers['Mechari'] = 'https://images.wikia.nocookie.net/__cb20130228034101/wildstaronline/images/8/81/Mechari.png';
        challengers['Human'] = 'https://images.wikia.nocookie.net/__cb20140424211034/wildstaronline/images/7/7d/Human_Spellslinger_Art.jpg';
        challengers['Cassian'] = 'https://images.wikia.nocookie.net/__cb20130918223530/wildstaronline/images/9/98/Dominion_leader.jpg';
        challengers['Mordesh'] = 'https://images.wikia.nocookie.net/__cb20130917164908/wildstaronline/images/b/b3/Mordesh2.jpg';
	challengers['Warrior'] = 'https://images.wikia.nocookie.net/__cb20140424222956/wildstaronline/images/f/f4/Granok_Warrior_Art.jpg';
	challengers['Esper'] = 'https://images.wikia.nocookie.net/__cb20140424210842/wildstaronline/images/8/81/Aurin_Esper_Art.jpg';	
	challengers['Spellslinger'] = 'https://images.wikia.nocookie.net/__cb20140424211034/wildstaronline/images/7/7d/Human_Spellslinger_Art.jpg';		
 	challengers['Stalker'] = 'https://images.wikia.nocookie.net/__cb20130929054711/wildstaronline/images/6/66/Stalker.jpg';
	challengers['Medic'] = 'https://images.wikia.nocookie.net/__cb20140319074348/wildstaronline/images/3/3c/Medic_resonators.jpg';
        challengers['Engineer'] = 'https://images.wikia.nocookie.net/__cb20140319075303/wildstaronline/images/7/74/Engineer3.jpg';
	challengers['Moodies'] = 'https://images.wikia.nocookie.net/__cb20140521203221/wildstaronline/images/1/17/Icon_tutorialmedium_ui_tutorial_medium_deradune_dom_t3.png';
	challengers['Lopp'] = 'https://images.wikia.nocookie.net/__cb20140525033704/wildstaronline/images/7/7e/AwwLopp.png';
	challengers['Torine Sisterhood'] = 'https://images.wikia.nocookie.net/__cb20141211234129/wildstaronline/images/c/ce/Torine_sisterhood.jpg';
	challengers['Eldan'] = 'https://images.wikia.nocookie.net/__cb20141211223213/wildstaronline/images/c/c9/Eldan_statue.png';
	challengers['Deadstar Marauders'] = 'https://images.wikia.nocookie.net/__cb20141211223545/wildstaronline/images/3/38/Grund_Deadstar_Marauder.jpg';
	challengers['Lore'] = 'https://images.wikia.nocookie.net/__cb20140505052247/wildstaronline/images/9/9d/WildStar.140419.2307472.png';
	challengers['Housing'] = 'https://images.wikia.nocookie.net/__cb20140416121608/wildstaronline/images/e/e5/Spacious_Exile_House.png';
	challengers['Instances'] = 'https://images.wikia.nocookie.net/__cb20140416123827/wildstaronline/images/9/92/EXPEDITION-_Kel_Voreth_Underforge.png';
	challengers['Crafting'] = 'https://images.wikia.nocookie.net/__cb20140521202949/wildstaronline/images/5/55/Icon_tutorialmedium_ui_tradeskill_gen_crafting_station.png';
	challengers['Warplots-Battlegrounds'] = 'https://images.wikia.nocookie.net/__cb20140521060516/wildstaronline/images/2/22/Icon_housingwarplots_warplots_aggressorbot_03.png';
	challengers['Artemis Zin'] = 'https://images.wikia.nocookie.net/__cb20141211230609/wildstaronline/images/6/6e/Artemis_zin.jpg';
	challengers['Mondo Zax'] = 'https://images.wikia.nocookie.net/__cb20140330050029/wildstaronline/images/6/6d/MondoZax.png';
	challengers['Commander Durek'] = 'https://images.wikia.nocookie.net/__cb20140329043651/wildstaronline/images/6/61/Commander_Durek.jpg';
	challengers['Deadeye Brightland'] = 'https://images.wikia.nocookie.net/__cb20140410041704/wildstaronline/images/9/93/Deadeye_and_Grim.jpg';
	challengers['Agent Lex'] = 'https://images.wikia.nocookie.net/__cb20140406040225/wildstaronline/images/8/81/Agent_Lex.jpg';
	challengers['Whitevale'] = 'https://images.wikia.nocookie.net/__cb20140322134252/wildstaronline/images/b/bd/Softsnow_woods_whitevale.jpg';
	challengers['Algoroc'] = 'https://images.wikia.nocookie.net/__cb20131001065808/wildstaronline/images/7/76/Algoroc.jpg';
	challengers['Deradune'] = 'https://images.wikia.nocookie.net/__cb20140521203218/wildstaronline/images/0/02/Icon_tutorialmedium_ui_tutorial_medium_deradune_dom_t2.png';
	challengers['Wilderrun'] = 'https://images.wikia.nocookie.net/__cb20140521203547/wildstaronline/images/0/0c/Icon_tutorialmedium_ui_tutorial_medium_wilderrun_shared_t2.png';
	challengers['Farside'] = 'https://images.wikia.nocookie.net/__cb20140521203253/wildstaronline/images/9/96/Icon_tutorialmedium_ui_tutorial_medium_farside_shared_t2.png';
	
 	//JRPG Box Art links
	challengers['Chua-link'] = 'http://wildstaronline.wikia.com/wiki/Chua';
	challengers['Draken-link'] = 'http://wildstaronline.wikia.com/wiki/Draken';
 	challengers['Aurin-link'] = 'http://wildstaronline.wikia.com/wiki/Aurin';
 	challengers['Granok-link'] = 'http://wildstaronline.wikia.com/wiki/Granok';
 	challengers['Mechari-link'] = 'http://wildstaronline.wikia.com/wiki/Mechari';
        challengers['Human-link'] = 'http://wildstaronline.wikia.com/wiki/Exile_Human';
        challengers['Cassian-link'] = 'http://wildstaronline.wikia.com/wiki/Cassian';
        challengers['Mordesh-link'] = 'http://wildstaronline.wikia.com/wiki/Mordesh';
 	challengers['Warrior-link'] = 'http://wildstaronline.wikia.com/wiki/Warrior';	
 	challengers['Esper-link'] = 'http://wildstaronline.wikia.com/wiki/Esper';	
 	challengers['Engineer-link'] = 'http://wildstaronline.wikia.com/wiki/Engineer';
 	challengers['Stalker-link'] = 'http://wildstaronline.wikia.com/wiki/Stalker';
	challengers['Medic-link'] = 'http://wildstaronline.wikia.com/wiki/Medic';
        challengers['Engineer-link'] = 'http://wildstaronline.wikia.com/wiki/Engineer';
	challengers['Moodies-link'] = 'http://wildstaronline.wikia.com/wiki/Moodies';
 	challengers['Lopp-link'] = 'http://wildstaronline.wikia.com/wiki/Lopp';
 	challengers['Torine Sisterhood-link'] = 'http://wildstaronline.wikia.com/wiki/Torine_Sisterhood';
	challengers['Eldan-link'] = 'http://wildstaronline.wikia.com/wiki/Eldan';	
 	challengers['Deadstar Marauders-link'] = 'http://wildstaronline.wikia.com/wiki/Deadstar_Marauders';
 	challengers['Lore-link'] = 'http://wildstaronline.wikia.com/wiki/Lore';
	challengers['Housing-link'] = 'http://wildstaronline.wikia.com/wiki/housing';
	challengers['Instances-link'] = 'http://wildstaronline.wikia.com/wiki/Instances_by_level';
 	challengers['Crafting-link'] = 'http://wildstaronline.wikia.com/wiki/Crafting';
 	challengers['Warplots-Battlegrounds-link'] = 'http://wildstaronline.wikia.com/wiki/Warplots';
 	challengers['Artemis Zin-link'] = 'http://wildstaronline.wikia.com/wiki/Artemis_Zin';
 	challengers['Mondo Zax-link'] = 'http://wildstaronline.wikia.com/wiki/Mondo_Zax';	
 	challengers['Commander Durek-link'] = 'http://wildstaronline.wikia.com/wiki/Commander_Durek';	
 	challengers['Deadeye Brightland-link'] = 'http://wildstaronline.wikia.com/wiki/Deadeye_Brightland';
 	challengers['Agent Lex-link'] = 'http://wildstaronline.wikia.com/wiki/Agent_Lex';
 	challengers['Whitevale-link'] = 'http://wildstaronline.wikia.com/wiki/Whitevale';	
 	challengers['Algoroc-link'] = 'http://wildstaronline.wikia.com/wiki/Algoroc';
 	challengers['Deradune-link'] = 'http://wildstaronline.wikia.com/wiki/Deradune';
	challengers['Wilderrun-link'] = 'http://wildstaronline.wikia.com/wiki/Wilderrun';	
 	challengers['Farside-link'] = 'http://wildstaronline.wikia.com/wiki/Farside';
 	
 
 	//JRPG Character images
	
 
 	// JRPG Character links
	
 
 	//JRPG Weapon images
	
 
 	//JRPG Weapon links
	
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
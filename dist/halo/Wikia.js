importArticles({
    type: "script",
    articles: [
        "u:dev:AjaxBatchDelete/code.js",
        "u:dev:DupImageList/code.js",
        "MediaWiki:Wikia.js/socialIcons.js",
        "MediaWiki:Wikia.js/inputUserInformation.js",
        "MediaWiki:Wikia.js/MainPage.js",
        "MediaWiki:Wikia.js/Slider.js",
    ]
});

// Authenticated Bungie and 343i users

var authenticatedUsers = ['User:Paul_Russel', 'User_talk:Paul_Russel', 'User_blog:Paul_Russel', 'Special:Contributions/Paul_Russel'];

if ($.inArray(mw.config.get('wgPageName'), authenticatedUsers) > -1) {
	$('.masthead-info').find('hgroup').append('<span class="tag">Authenticated</span>')
}


/* Community Choice Awards */
if (wgPageName === 'User_blog:Matt_Hadick/Halo:_The_Master_Chief_Collection_Community_Choice_Awards') {
	challengers = {};
 
 	//Destiny CCA Images
	challengers['Warthog'] = 'https://images.wikia.nocookie.net/__cb20141217154815/halo/images/2/2a/WarthogCCA.jpg';
	challengers['Scorpion'] = 'https://images.wikia.nocookie.net/__cb20141217154811/halo/images/9/9e/ScorpionCCA.jpg';
	challengers['Spectre'] = 'https://images.wikia.nocookie.net/__cb20141217154814/halo/images/b/b7/SpectreCCA.jpg';
	challengers['Wraith'] = 'https://images.wikia.nocookie.net/__cb20141217154816/halo/images/9/9f/WraithCCA.png';
	challengers['Banshee'] = 'https://images.wikia.nocookie.net/__cb20141217154644/halo/images/b/b1/Banshee_CCA.png';
	challengers['Ghost'] = 'https://images.wikia.nocookie.net/__cb20141217154652/halo/images/b/b5/GhostCCA.png';
	challengers['Battle Rifle'] = 'https://images.wikia.nocookie.net/__cb20141217154645/halo/images/a/ad/BattleRifleCCA.jpg';
	challengers['Sniper Rifle'] = 'https://images.wikia.nocookie.net/__cb20141217154814/halo/images/c/cb/SniperRifleCCA.jpg';
 	challengers['Sentinel Beam'] = 'https://images.wikia.nocookie.net/__cb20141217154812/halo/images/1/1f/SentinelBeamCCA.png';
	challengers['Covenant Carbine'] = 'https://images.wikia.nocookie.net/__cb20141217154647/halo/images/c/cc/CarbineCCA.png';
	challengers['Particle Beam Rifle'] = 'https://images.wikia.nocookie.net/__cb20141217154645/halo/images/b/b8/BeamRifleCCA.png';
	challengers['Energy Sword'] = 'https://images.wikia.nocookie.net/__cb20141217154651/halo/images/0/0b/EnergySwordCCA.png';
	challengers['Brute Shot'] = 'https://images.wikia.nocookie.net/__cb20141217154646/halo/images/2/2d/BruteShotCCA.jpg';
	challengers['Bloodline (Coagulation)'] = 'https://images.wikia.nocookie.net/__cb20141217161721/halo/images/6/62/BloodlineCCA.jpg';
	challengers['Lockdown (Lockout)'] = 'https://images.wikia.nocookie.net/__cb20141217154809/halo/images/8/83/LockdownCCA.jpg';
	challengers['Shrine (Sanctuary)'] = 'https://images.wikia.nocookie.net/__cb20141217154812/halo/images/4/42/ShrineCCA.jpg';
	challengers['Stonetown (Zanzibar)'] = 'https://images.wikia.nocookie.net/__cb20141217154815/halo/images/d/d4/StonestownCCA.jpg';
	challengers['Warlord (Warlock)'] = 'https://images.wikia.nocookie.net/__cb20141217154815/halo/images/9/9a/WarlordCCA.jpg';
	challengers['Zenith (Ascension)'] = 'https://images.wikia.nocookie.net/__cb20141217154816/halo/images/4/42/ZenithCCA.png';
	challengers['Prophets'] = 'https://images.wikia.nocookie.net/__cb20141217154811/halo/images/7/77/ProphetCCA.jpg';
	challengers['Elites'] = 'https://images.wikia.nocookie.net/__cb20141217154648/halo/images/b/b5/EliteCCA.jpg';
	challengers['Brutes'] = 'https://images.wikia.nocookie.net/__cb20141217154646/halo/images/d/d1/BruteCCA.png';
	challengers['Hunters'] = 'https://images.wikia.nocookie.net/__cb20141217154655/halo/images/7/77/HunterCCA.jpg';
	challengers['Drones'] = 'https://images.wikia.nocookie.net/__cb20141217154647/halo/images/e/e7/DroneCCA.jpg';
	challengers['Grunts'] = 'https://images.wikia.nocookie.net/__cb20141217154652/halo/images/4/41/GruntCCA.png';
	challengers['Jackals'] = 'https://images.wikia.nocookie.net/__cb20141217154655/halo/images/0/00/JackelCCA.jpg';
	challengers['Engineers'] = 'https://images.wikia.nocookie.net/__cb20141217154651/halo/images/f/fc/EngineerCCA.jpg';
	challengers['Halo: Combat Evolved'] = 'https://images.wikia.nocookie.net/__cb20141217154654/halo/images/d/d8/HaloCECCA.jpg';
	challengers['Halo 2'] = 'https://images.wikia.nocookie.net/__cb20141217154653/halo/images/9/99/Halo2CCA.jpg';
	challengers['Halo 2 Anniversary'] = 'https://images.wikia.nocookie.net/__cb20141217154652/halo/images/3/37/Halo2AnniversaryCCA.png';
	challengers['Halo 3'] = 'https://images.wikia.nocookie.net/__cb20141217154653/halo/images/6/63/Halo3CCA.jpg';
	challengers['Halo 4'] = 'https://images.wikia.nocookie.net/__cb20141217154654/halo/images/d/db/Halo4CCA.png';
	challengers['Halo: Combat Evolved Anniversary'] = 'https://images.wikia.nocookie.net/__cb20141217154654/halo/images/a/a5/HaloCEACCA.png';

 
 	//Destiny CCA links
	challengers['Warthog-link'] = 'http://halo.wikia.com/wiki/M12_Light_Reconnaissance_Vehicle';
	challengers['Scorpion-link'] = 'http://halo.wikia.com/wiki/M808B_Main_Battle_Tank';
	challengers['Spectre-link'] = 'http://halo.wikia.com/wiki/Type-46_Infantry_Support_Vehicle';
	challengers['Wraith-link'] = 'http://halo.wikia.com/wiki/Type-26_Assault_Gun_Carriage';
	challengers['Banshee-link'] = 'http://halo.wikia.com/wiki/Type-26_Ground_Support_Aircraft';
	challengers['Ghost-link'] = 'http://halo.wikia.com/wiki/Type-32_Rapid_Assault_Vehicle';
	challengers['Battle Rifle-link'] = 'http://halo.wikia.com/wiki/BR55HB_SR_Battle_Rifle';	
	challengers['Sniper Rifle-link'] = 'http://halo.wikia.com/wiki/Sniper_rifle';		
 	challengers['Sentinel Beam-link'] = 'http://halo.wikia.com/wiki/Sentinel_Beam';
	challengers['Covenant Carbine-link'] = 'http://halo.wikia.com/wiki/Type-51_Carbine';
	challengers['Particle Beam Rifle-link'] = 'http://halo.wikia.com/wiki/Type-50_Sniper_Rifle_System';
	challengers['Energy Sword-link'] = 'http://halo.wikia.com/wiki/Type-1_Energy_Weapon/Sword';
	challengers['Brute Shot-link'] = 'http://halo.wikia.com/wiki/Type-25_Grenade_Launcher';
	challengers['Bloodline (Coagulation)-link'] = 'http://halo.wikia.com/wiki/Bloodline';
	challengers['Lockdown (Lockout)-link'] = 'http://halo.wikia.com/wiki/Lockdown';
	challengers['Shrine (Sanctuary)-link'] = 'http://halo.wikia.com/wiki/Shrine';
	challengers['Stonetown (Zanzibar)-link'] = 'http://halo.wikia.com/wiki/Stonetown';
	challengers['Warlord (Warlock)-link'] = 'http://halo.wikia.com/wiki/Warlord';
	challengers['Zenith (Ascension)-link'] = 'http://halo.wikia.com/wiki/Zenith';
	challengers['Prophets-link'] = 'http://halo.wikia.com/wiki/Category:Prophets';
	challengers['Elites-link'] = 'http://halo.wikia.com/wiki/Sangheili';
	challengers['Brutes-link'] = 'http://halo.wikia.com/wiki/Jiralhanae';
	challengers['Hunters-link'] = 'http://halo.wikia.com/wiki/Mgalekgolo';
	challengers['Drones-link'] = 'http://halo.wikia.com/wiki/Yanme%27e';
	challengers['Grunts-link'] = 'http://halo.wikia.com/wiki/Unggoy';
	challengers['Jackals-link'] = 'http://halo.wikia.com/wiki/Kig-Yar';
	challengers['Engineers-link'] = 'http://halo.wikia.com/wiki/Huragok';
	challengers['Halo: Combat Evolved-link'] = 'http://halo.wikia.com/wiki/Halo:_Combat_Evolved';
	challengers['Halo 2-link'] = 'http://halo.wikia.com/wiki/Halo_2';
	challengers['Halo 2 Anniversary-link'] = 'http://halo.wikia.com/wiki/Halo_2:_Anniversary';
	challengers['Halo 3-link'] = 'http://halo.wikia.com/wiki/Halo_3';
	challengers['Halo 4-link'] = 'http://halo.wikia.com/wiki/Halo_4';
	challengers['Halo: Combat Evolved Anniversary-link'] = 'http://halo.wikia.com/wiki/Halo:_Combat_Evolved_Anniversary';
 
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

//Adds Talk page button to edit drop down list, so in case we need to activate Article Comments without removing talk pages.

/*

jQuery(document).ready(function($) {
if (wgNamespaceNumber == 0) {
    $('<li><a id="HN-custom-talk-button" href="/wiki/Talk:'+wgPageName+'" data-tracking="ca-talk-dropdown">Talk</a></li>').insertBefore($("#ca-history").parent());
};
});

*/
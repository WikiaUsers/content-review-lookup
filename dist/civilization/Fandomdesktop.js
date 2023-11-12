/* General */
/** Social Media icons **/
var SocialMediaButtonsNamespaces = [0, 6, 14, 500];
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default",
	wikiTwitterAccount: "default"
};

/* Community Choice Awards */
if (mw.config.get('wgPageName') === 'User_blog:TheBlueRogue/Beyond_Earth_Community_Choice_Awards') {
	var challengers = {};
	var imageUrl = 'https://vignette.wikia.nocookie.net/civilization/images/';
	var wikiUrl = 'https://civilization.fandom.com/wiki/';

 	//Destiny CCA Images
	challengers['Supremacy'] = imageUrl + '5/5b/SupremacyCCA.jpg';
	challengers['Purity'] = imageUrl + 'e/ee/Puritycca.jpg';
	challengers['Harmony'] = imageUrl + '5/53/HarmonyCCA.jpg';
	challengers['Domination'] = imageUrl + '7/7a/DominationCCA.jpg';
	challengers['Contact'] = 'https://vignette.wikia.nocookie.net/dinos-vs-robots/images/e/ef/ContactIcon.png';
	challengers['Promised Land (Purity)'] = imageUrl + '6/6c/PromisedlandCCA.jpg';
	challengers['Transcendence (Harmony)'] = imageUrl + 'b/b1/ContactCCA.jpg';	
	challengers['Emancipation (Supremacy)'] = imageUrl + '9/92/EmancipationCCA.jpg';		
 	challengers['Xeno Titan'] = imageUrl + '8/8d/XenotitanCCA.jpg';
	challengers['LEV Destroyer'] = imageUrl + '7/7f/LevdestroyerCCA.jpg';
	challengers['ANGEL'] = imageUrl + '9/97/AngelCCA.jpg';
	challengers['The Iron Pact'] = imageUrl + '3/3f/IronpactCCA.jpg';
	challengers['The Vesperian Confederacy'] = imageUrl + '0/00/VesperianConspiracyCCA.jpg';
	challengers['InfoAddict'] = imageUrl + '6/64/InfoaddictCCA.jpg';
	challengers['Colorful Tech Web'] = imageUrl + 'a/a6/ColorfultechwebCCA.jpg';
	challengers['True Terraforming'] = imageUrl + '0/08/TrueterraformingCCA.jpg';
	challengers['American Reclamation Corporation (ARC)'] = imageUrl + '3/32/ARCCCA.jpg';
	challengers['Pan-Asian Cooperative (PAC)'] = imageUrl + '7/74/PACCCA.jpg';
	challengers['Franco-Iberia'] = imageUrl + '2/29/FrancoiberaCCA.jpg';
	challengers['Slavic Federation'] = imageUrl + 'e/eb/SlavicFederationCCA.jpg';
	challengers['Polystralia'] = imageUrl + '3/30/PolystraliaCCA.jpg';
	challengers['Kavithan Protectorate'] = imageUrl + '4/47/KavithanProtectorateCCA.jpg';
	challengers['Brasilia'] = imageUrl + '9/93/BrasiliaCCA.jpg';
	challengers['People\'s African Union (PAU)'] = imageUrl + 'a/a2/PAUCCA.jpg';
	challengers['Kraken'] = imageUrl + '4/4c/KrakenCCA.jpg';
	challengers['Sea Dragon'] = imageUrl + '4/47/SeaDragonCCA.jpg';
	challengers['Manticore'] = imageUrl + '2/2f/ManticoreCCA.jpg';
	challengers['Siege Worm'] = imageUrl + '1/1c/SiegewormCCA.jpg';
	challengers['Raptor Bug'] = imageUrl + '3/3d/RaptorbugCCA.jpg';
	challengers['Rocktopus'] = imageUrl + '2/21/RocktopusCCA.jpg';
	challengers['Planet Carver'] = imageUrl + 'd/d4/PlanetcarverCCA.jpg';
	challengers['Deep Space Telescope'] = imageUrl + '4/4b/DeepspacetelescopeCCA.png';
	challengers['All-Seer'] = imageUrl + '6/6f/AllseerCCA.jpg';
	challengers['Beacon'] = imageUrl + '7/74/BeaconCCA.png';
	challengers['Emancipation Gate'] = imageUrl + '8/83/EmancipationgateCCA.png';
	challengers['Exodus Gate'] = imageUrl + '5/5b/ExodusgateCCA.png';
	challengers['Mind Flower'] = imageUrl + '1/12/MindflowerCCA.png';
 
 	//Destiny CCA links
	challengers['Supremacy-link'] = wikiUrl + 'Supremacy_(CivBE)';
	challengers['Purity-link'] = wikiUrl + 'Purity_(CivBE)';
	challengers['Harmony-link'] = wikiUrl + 'Harmony_(CivBE)';
	challengers['Domination-link'] = wikiUrl + 'Victory_(CivBE)';
	challengers['Contact-link'] = wikiUrl + 'Victory_(CivBE)';
	challengers['Promised Land (Purity)-link'] = wikiUrl + 'Victory_(CivBE)';
	challengers['Transcendence (Harmony)-link'] = wikiUrl + 'Victory_(CivBE)';	
	challengers['Emancipation (Supremacy)-link'] = wikiUrl + 'Victory_(CivBE)';		
 	challengers['Xeno Titan-link'] = wikiUrl + 'Xeno_Titan_(CivBE)';
	challengers['LEV Destroyer-link'] = wikiUrl + 'LEV_Destroyer_(CivBE)';
	challengers['ANGEL-link'] = wikiUrl + 'ANGEL_(CivBE)';
	challengers['The Iron Pact-link'] = wikiUrl + 'Mods_(CivBE)';
	challengers['The Vesperian Confederacy-link'] = wikiUrl + 'Mods_(CivBE)';
	challengers['InfoAddict-link'] = wikiUrl + 'Mods_(CivBE)';
	challengers['Colorful Tech Web-link'] = wikiUrl + 'Mods_(CivBE)';
	challengers['True Terraforming-link'] = wikiUrl + 'Mods_(CivBE)';
	challengers['American Reclamation Corporation (ARC)-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Pan-Asian Cooperative (PAC)-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Franco-Iberia-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Slavic Federation-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Polystralia-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Kavithan Protectorate-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Brasilia-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['People\'s African Union (PAU)-link'] = wikiUrl + 'Starting_a_new_game_(CivBE)#Sponsor';
	challengers['Kraken-link'] = wikiUrl + 'Aliens_(CivBE)';
	challengers['Sea Dragon-link'] = wikiUrl + 'Aliens_(CivBE)';
	challengers['Manticore-link'] = wikiUrl + 'Aliens_(CivBE)';
	challengers['Siege Worm-link'] = wikiUrl + 'Aliens_(CivBE)';
	challengers['Raptor Bug-link'] = wikiUrl + 'Aliens_(CivBE)';
	challengers['Rocktopus-link'] = wikiUrl + 'Rocktopus_(CivBE)';
	challengers['Planet Carver-link'] = wikiUrl + 'Planet_Carver_(CivBE)';
	challengers['Deep Space Telescope-link'] = wikiUrl + 'Deep_Space_Telescope_(CivBE)';
	challengers['All-Seer-link'] = wikiUrl + 'All-Seer_(CivBE)';
	challengers['Beacon-link'] = wikiUrl + 'Contact_Beacon_(CivBE)';
	challengers['Emancipation Gate-link'] = wikiUrl + 'Emancipation_Gate_%28CivBE%29';
	challengers['Exodus Gate-link'] = wikiUrl + 'Exodus_Gate_%28CivBE%29';
	challengers['Mind Flower-link'] = wikiUrl + 'Mind_Flower_%28CivBE%29';
 
 	var challengerPoll = {
		init: function() {
			$('.ajax-poll').each(function() {
				var pollID = $(this).attr('id').split('-')[2];
				$('.pollAnswerName label', this).each(function() {
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
				params['title'] = mw.config.get('wgPageName');
				params['wpPollId'] = pollID;
				params['wpVote'] = 'Vote!';
				params[pollRadio] = pollValue;
				$.post('index.php', params, function(data) {
					//var total = data.total;
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
			if (titleReplace === 0) {
				$(this).attr('title','0%');				
			}
			else if (titleReplace) {
				var titleReplace2 = titleReplace.replace(/[^[0-9\,\.\%]+/g,'');
				$(this).attr('title',titleReplace2);
			}
			else {
				$(this).attr('title','0%');		
			}
		});
		challengerPoll.init();
	});
}
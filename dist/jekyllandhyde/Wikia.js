/** Fantasy Face-Off **/
if (wgPageName === 'User_blog:TheBlueRogue/Split_Personality_Face-Off') {
	challengers = {};
 
	//Split VS challenger images
	challengers['Jekyll'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1a/Jekyll.jpg';
	challengers['Hyde'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1e/Hyde.jpg';
	challengers['Tyler Durden'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/7/79/TylerDurden.jpg';
	challengers['The Narrator'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/cb/FightClubNarrator.jpg';
	challengers['Gollum'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/8/8d/Gollum.jpg';
	challengers['Smeagol'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/9/9e/Smeagol.jpg';
 	challengers['Angel'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/bf/Angel.jpg';	
 	challengers['Angelus'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/c4/Angelus.png';		
 	challengers['Dean'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/4/4e/Dean.png';		
 	challengers['Demon Dean'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/a/a7/DemonDean.jpg';
	challengers['Harvey Dent'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/ef/HarveyDent.jpg';
	challengers['Two Face'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/16/TwoFace.jpg';
	challengers['Marcus Kane'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/db/MarcusKane.png';
	challengers['Needles Kane'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/e/ef/NeedlesKane.jpg';
	challengers['Remus Lupin'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/bb/RemusLupin.jpg';
 	challengers['Moony'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/0b/Moony.jpg';	
 	challengers['Harman Smith'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/6b/HarmanSmith.jpg';		
 	challengers['Emir Parkreiner'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/5/5e/EmirParkreiner.png';		
 	challengers['Raiden'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/5/5f/Raiden.png';
	challengers['Jack the Ripper'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f3/JackTheRipper.jpg';
	challengers['The Hulk'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/2/20/TheHulk.jpg';
	challengers['Bruce Banner'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/3/36/BruceBanner.jpg';
	challengers['Francis York Morgan'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/4/4d/Francis.png';
	challengers['Zach'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/f/f6/Zach.png';
 	challengers['Toko Fukawa'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/06/TokoFukawa.jpg';	
 	challengers['Genocide Jack'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/01/GenocideJack.png';		
 	challengers['Damian Tenma'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/0/0c/DamianTenma.png';		
 	challengers['Amazing Nine Tails'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/b/bf/TheAmazingNinetails.png';
	challengers['Saku'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/d/d5/Saku.jpg';
 	challengers['Bo'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/6/6f/Bo.jpg';	
 	challengers['Revolver Ocelot'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/c/cf/RevolverOcelot.png';		
 	challengers['Liquid Ocelot'] = 'https://vignette.wikia.nocookie.net/bluerogues/images/1/1b/LiquidOcelot.png';
 	
	//Split VS challenger links
	challengers['Jekyll-link'] = 'http://jekyll-and-hyde.wikia.com/wiki/Jekyll';
	challengers['Hyde-link'] = 'http://jekyll-and-hyde.wikia.com/wiki/Hyde';
 	challengers['Tyler Durden-link'] = 'http://fightclub.wikia.com/wiki/Tyler_Durden';
 	challengers['The Narrator-link'] = 'http://fightclub.wikia.com/wiki/The_Narrator';
 	challengers['Gollum-link'] = 'http://lotr.wikia.com/wiki/Gollum';
 	challengers['Smeagol-link'] = 'http://lotr.wikia.com/wiki/Smeagol#Biography';	
 	challengers['Angel-link'] = 'http://buffy.wikia.com/wiki/Angel';	
 	challengers['Angelus-link'] = 'http://buffy.wikia.com/wiki/Angel#Angelus';
 	challengers['Dean-link'] = 'http://supernatural.wikia.com/wiki/Dean_Winchester';
 	challengers['Demon Dean-link'] = 'http://supernatural.wikia.com/wiki/Dean_Winchester#Powers_and_Abilities';
	challengers['Harvey Dent-link'] = 'http://batman.wikia.com/wiki/Two-Face';
 	challengers['Two Face-link'] = 'http://batman.wikia.com/wiki/Two-Face#Early_career';
 	challengers['Marcus Kane-link'] = 'http://twistedmetal.wikia.com/wiki/Marcus_Kane';
 	challengers['Needles Kane-link'] = 'http://twistedmetal.wikia.com/wiki/Needles_Kane';
 	challengers['Remus Lupin-link'] = 'http://harrypotter.wikia.com/wiki/Remus_Lupin';	
 	challengers['Moony-link'] = 'http://harrypotter.wikia.com/wiki/Remus_Lupin#Hogwarts_years_.281971-1978.29';	
 	challengers['Harman Smith-link'] = 'http://suda51.wikia.com/wiki/Harman_Smith';
 	challengers['Emir Parkreiner-link'] = 'http://suda51.wikia.com/wiki/Emir_Parkreiner';
 	challengers['Raiden-link'] = 'http://metalgear.wikia.com/wiki/Raiden';
	challengers['Jack the Ripper-link'] = 'http://metalgear.wikia.com/wiki/Raiden#Early_life_and_career';
 	challengers['The Hulk-link'] = 'http://marvel.wikia.com/wiki/Hulk';
 	challengers['Bruce Banner-link'] = 'http://marvel.wikia.com/wiki/Robert_Bruce_Banner_(Earth-616)';
 	challengers['Francis York Morgan-link'] = 'http://deadlypremonition.wikia.com/wiki/Francis_York_Morgan';
 	challengers['Zach-link'] = 'http://deadlypremonition.wikia.com/wiki/Francis_Zach_Morgan';	
 	challengers['Toko Fukawa-link'] = 'http://danganronpa.wikia.com/wiki/Toko_Fukawa';	
 	challengers['Genocide Jack-link'] = 'http://danganronpa.wikia.com/wiki/Genocide_Jack';
 	challengers['Damian Tenma-link'] = 'http://aceattorney.wikia.com/wiki/Damian_Tenma';
	challengers['Amazing Nine Tails-link'] = 'http://aceattorney.wikia.com/wiki/Amazing_Nine-Tails';
	challengers['Saku-link'] = 'http://dothack.wikia.com/wiki/Sakubo';
 	challengers['Bo-link'] = 'http://dothack.wikia.com/wiki/Sakubo';
 	challengers['Revolver Ocelot-link'] = 'http://metalgear.wikia.com/wiki/Revolver_Ocelot';
 	challengers['Liquid Ocelot-link'] = 'http://metalgear.wikia.com/wiki/Liquid_Ocelot';

	challengerPoll = {
		init: function() {
			$('.ajax-poll').each(function() {
				var pollID = $(this).attr('id').split('-')[2];
				$('.pollAnswerName label', this).each(function(index) {
					var challenger = $(this).text();
					var radioID = $('input', this).attr('id');
					var radioValue = $('input', this).attr('value');
					if (index === 0) {
						var challenger1 = challenger.trim();
						challengerPoll.beautify(this, challenger1, pollID, radioID, radioValue);
					}
					else {
						var challenger2 = challenger.trim();
						challengerPoll.beautify(this, challenger2, pollID, radioID, radioValue);
					}
				});
			});
 
			$('.ajax-poll').on('click', '.challenger img', function() {
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
 
					var votedSpan = '#wpPollVote' + pollID + '-' + pollValue;
					var votedBar = '#wpPollBar' + pollID + '-' + pollValue;
 
					$(votedSpan).text(data.votes[pollValue].value);
					$(votedSpan).attr('title',data.votes[pollValue].percent + '%');
					$(votedBar).css('width',data.votes[pollValue].percent + '%');
 
					if(pollValue == 2) {
						pollValueNot = 3;
					}
					else {
						pollValueNot = 2;
					}
					var notVotedValue = total - data.votes[pollValue].value;
					var notVotedPercentage = notVotedValue / total * 100;
					notVotedPercentage = +notVotedPercentage.toFixed(2);
 
					var notVotedSpan = '#wpPollVote' + pollID + '-' + pollValueNot;
					var notVotedBar = '#wpPollBar' + pollID + '-' + pollValueNot;
 
					$(notVotedSpan).text(notVotedValue);
					$(notVotedSpan).attr('title',notVotedPercentage + '%');	
					$(notVotedBar).css('width',notVotedPercentage + '%');				
				}, "json");
			});
 
		},	
		beautify: function(element, challenger, poll, radio, value) {
			var challengerLink = challenger + '-link';
			$(element).html('<a href="' + challengers[challengerLink] +'"><div class="name">' + challenger + '</div></a><div class="challenger"><img data-poll="' + poll +'" data-radio="' + radio + '" data-value="' + value + '" style="width: 200px; height: 200px;" class="challenger-image" src="' + challengers[challenger] + '" alt="' + challenger + '"></div>');
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
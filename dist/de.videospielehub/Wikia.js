/** Fantasy Face-Off **/
if (wgPageName === 'Benutzer_Blog:Foppes/Versus_Wettbewerb') {
	challengers = {};
 
	//Challenger images
	challengers['Mordors Schatten'] = 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/8/81/Talion.jpg';
challengers['Mario'] = 'https://images.wikia.nocookie.net/__cb20141204151800/videospielehub/de/images/4/4f/Mario_VS.png';
challengers['Warframe'] = 'https://images.wikia.nocookie.net/__cb20141204151803/videospielehub/de/images/f/fe/Warframe_Excalibur.jpg';
challengers['Assassin\'s Creed'] = 'https://images.wikia.nocookie.net/__cb20141204151758/videospielehub/de/images/d/d2/Arno_Dorian.png';
challengers['Valve'] = 'https://images.wikia.nocookie.net/__cb20141204151759/videospielehub/de/images/2/25/Gordon_Freeman.jpg';
challengers['GTA'] = 'https://images.wikia.nocookie.net/__cb20141204151803/videospielehub/de/images/f/f6/TrevorGTAV.png';
challengers['League of Legends'] = 'https://images.wikia.nocookie.net/__cb20141204151801/videospielehub/de/images/f/f2/Rammus_LoL.png';
challengers['Halo'] = 'https://images.wikia.nocookie.net/__cb20141204151800/videospielehub/de/images/1/11/John-117.png';
challengers['Moorhuhn'] = 'https://images.wikia.nocookie.net/__cb20141205132258/videospielehub/de/images/d/de/Moorhuhn.jpg';
challengers['Borderlands'] = 'https://images.wikia.nocookie.net/__cb20141204151759/videospielehub/de/images/1/11/Handsome_Jack.jpg';
challengers['Mass Effect'] = 'https://images.wikia.nocookie.net/__cb20141204163933/videospielehub/de/images/0/06/Shepard.jpg';
challengers['Clash of Clans'] = 'https://images.wikia.nocookie.net/__cb20141204151758/videospielehub/de/images/6/62/Barbar.png';
	
 
	//Challenger links
	challengers['Mordors Schatten-link'] = 'http://mordorsschatten.wikia.com/wiki/Talion';
	challengers['Mario-link'] = 'http://de.mario.wikia.com/wiki/Mario';
challengers['Warframe-link'] = 'http://de.warframe.wikia.com/wiki/Excalibur';
challengers['Assassin\'s Creed-link'] = 'http://de.assassinscreed.wikia.com/wiki/Arno_Dorian';
challengers['Valve-link'] = 'http://de.valve.wikia.com/wiki/Gordon_Freeman';
challengers['GTA-link'] = 'http://de.gta.wikia.com/wiki/Trevor_Philips';
challengers['Moorhuhn-link'] = 'http://de.moorhuhn.wikia.com/wiki/Moorhuhn';
challengers['Borderlands-link'] = 'http://de.borderlands.wikia.com/wiki/Handsome_Jack';
challengers['League of Legends-link'] = 'http://de.lol.wikia.com/wiki/Rammus';
challengers['Halo-link'] = 'http://de.halo.wikia.com/wiki/John-117';
challengers['Mass Effect-link'] = 'http://de.masseffect.wikia.com/wiki/Shepard';
challengers['Clash of Clans-link'] = 'http://de.coc.wikia.com/wiki/Barbar';

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
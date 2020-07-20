/* Community Choice Awards voting */
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
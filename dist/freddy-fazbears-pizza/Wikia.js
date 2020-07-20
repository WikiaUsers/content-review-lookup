/* Any JavaScript here will be loaded for users using the Wikia skin */

/* Voting for Ultimate Battle blog */
if (wgPageName === 'User_blog:Raylan13/Five_Nights_at_Freddy\'s_Community_Choice_Awards') {
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
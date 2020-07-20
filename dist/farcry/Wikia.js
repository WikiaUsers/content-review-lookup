var SocialMediaButtons = { 
	position: 'top',
	colorScheme: 'color',
	buttonSize: '35px'
};
importScriptPage('SocialIcons/code.js','dev');
/* Voting */
if (wgPageName === 'User_blog:Pinkachu/2014_Community_Choice_Awards') {
	challengers = {};
 
 	//JRPG Box Art images
	challengers['Pagan Min'] = 'https://images.wikia.nocookie.net/__cb20141117230700/farcry/images/6/6d/Far_Cry_4_Pagan_Min.png';
	challengers['Ajay Ghale'] = 'https://images.wikia.nocookie.net/__cb20141117234257/farcry/images/3/39/Far_Cry_4_Ajay_Ghale.png';
	challengers['Amita'] = 'https://images.wikia.nocookie.net/__cb20141026154056/farcry/images/e/e7/Amitas.jpg';
	challengers['Sabal'] = 'https://images.wikia.nocookie.net/__cb20141026154046/farcry/images/5/53/Sabals.jpg';
	challengers['Yuma Lau'] = 'https://images.wikia.nocookie.net/__cb20141117230245/farcry/images/0/0a/Far_Cry_4_Yuma.png';
	challengers['Honey Badger'] = 'https://images.wikia.nocookie.net/__cb20141030172123/farcry/images/6/6d/480px-FC4_PREVIEWS_HONEY_BADGER.png';
	challengers['Asian Rhino'] = 'https://images.wikia.nocookie.net/__cb20141212200348/farcry/images/8/86/Asian_Rhino.jpg';	
	challengers['Demon Fish'] = 'https://images.wikia.nocookie.net/__cb20141201100821/farcry/images/3/35/DemonFish_page.jpg';		
 	challengers['Elephant'] = 'https://images.wikia.nocookie.net/__cb20140610205948/farcry/images/9/9a/FC4_E3_ELEPHANT_VISTA_1920.jpg';
	challengers['Snow Leopard'] = 'https://images.wikia.nocookie.net/__cb20141030195659/farcry/images/9/96/ImagesONK7WHGE.jpg';
	challengers['Parachute'] = 'https://images.wikia.nocookie.net/__cb20130906131359/farcry/images/d/d0/FC3_cutout_parachute.png';
	challengers['Hovercraft'] = 'https://images.wikia.nocookie.net/__cb20141203074029/farcry/images/1/14/Hovercraft_view.PNG';
	challengers['Buzzer'] = 'https://images.wikia.nocookie.net/__cb20141122221041/farcry/images/a/a7/Far_Cry_4_Gyrocopter.png';
	challengers['Jet Ski'] = 'https://images.wikia.nocookie.net/__cb20130906131359/farcry/images/9/9c/FC3_cutout_jetski.png';
	challengers['Buggy'] = 'https://images.wikia.nocookie.net/__cb20090625222013/farcry/images/3/3d/Wikibuggy.PNG';
	challengers['Assault Rifle'] = 'https://images.wikia.nocookie.net/__cb20090303064936/farcry/images/3/32/M4_1.jpg';
	challengers['Sub Machine Gun'] = 'https://images.wikia.nocookie.net/__cb20130907102711/farcry/images/4/4c/FC3_cutout_smg_ksv.png';
	challengers['Bows'] = 'https://images.wikia.nocookie.net/__cb20141030172652/farcry/images/3/3f/640px-FC4_AutoCross.png';
	challengers['Rocket Launcher'] = 'https://images.wikia.nocookie.net/__cb20100719210709/farcry/images/7/7e/Farcry2_rpg7.png';
	challengers['Handguns'] = 'https://images.wikia.nocookie.net/__cb20141201085848/farcry/images/3/33/M712.jpg';
	challengers['Wingsuit'] = 'https://images.wikia.nocookie.net/__cb20130906131401/farcry/images/c/cd/FC3_cutout_wingsuit.png';
	challengers['Grapple'] = 'https://images.wikia.nocookie.net/__cb20141030172805/farcry/images/e/e8/640px-FC4_GrappleHook.png';
	challengers['Grenade'] = 'https://images.wikia.nocookie.net/__cb20130907102713/farcry/images/3/31/FC3_cutout_throwable_fraggrenade.png';
	challengers['C4'] = 'https://images.wikia.nocookie.net/__cb20130907102713/farcry/images/c/ca/FC3_cutout_throwable_c4.png';
	challengers['Mine'] = 'https://images.wikia.nocookie.net/__cb20130907102528/farcry/images/8/89/FC3_cutout_proximite.png';
	challengers['Royal Palace'] = 'https://images.wikia.nocookie.net/__cb20141204112147/farcry/images/2/23/RoyalPalace_view.jpg';
	challengers['Tirtha'] = 'https://images.wikia.nocookie.net/__cb20141205014103/farcry/images/1/1b/Tirtha_full_view.jpg';
	challengers['Banapur'] = 'https://images.wikia.nocookie.net/__cb20141204070822/farcry/images/4/4f/Banapur_view.jpg'; 
        challengers['Ghale Homestead'] = 'https://images.wikia.nocookie.net/__cb20141204070524/farcry/images/c/cb/GhaleHomestead_High_view.jpg';
	challengers['Utkarsh'] = 'https://images.wikia.nocookie.net/__cb20141204235325/farcry/images/5/56/Utkarsh_view.jpg';
	
 	//JRPG Box Art links
	challengers['Pagan Min-link'] = 'http://farcry.wikia.com/wiki/Pagan_Min';
	challengers['Ajay Ghale-link'] = 'http://farcry.wikia.com/wiki/Ajay_Ghale';
 	challengers['Amita-link'] = 'http://farcry.wikia.com/wiki/Amita';
 	challengers['Sabal-link'] = 'http://farcry.wikia.com/wiki/Sabal';
 	challengers['Yuma Lau-link'] = 'http://farcry.wikia.com/wiki/Yuma_Lau';
 	challengers['Honey Badger-link'] = 'http://farcry.wikia.com/wiki/Honey_Badger';	
 	challengers['Asian Rhino-link'] = 'http://farcry.wikia.com/wiki/Asian_Rhino';	
 	challengers['Demon Fish-link'] = 'http://farcry.wikia.com/wiki/Demon_Fish';
 	challengers['Elephant-link'] = 'http://farcry.wikia.com/wiki/Elephant';
	challengers['Snow Leopard-link'] = 'http://farcry.wikia.com/wiki/Snow_Leopard';
	challengers['Parachute-link'] = 'http://farcry.wikia.com/wiki/Parachute';
 	challengers['Hovercraft-link'] = 'http://farcry.wikia.com/wiki/Hovercraft';
 	challengers['Buzzer-link'] = 'http://farcry.wikia.com/wiki/Buzzer';
	challengers['Jet Ski-link'] = 'http://farcry.wikia.com/wiki/Jet_Ski';	
 	challengers['Buggy-link'] = 'http://farcry.wikia.com/wiki/Buggy';
 	challengers['Assault Rifle-link'] = 'http://farcry.wikia.com/wiki/Category:Assault_Rifles';
	challengers['Sub Machine Gun-link'] = 'http://farcry.wikia.com/wiki/Far_Cry_4_Weapons';
	challengers['Bows-link'] = 'http://farcry.wikia.com/wiki/Far_Cry_4_Weapons';
 	challengers['Rocket Launcher-link'] = 'http://farcry.wikia.com/wiki/Far_Cry_4_Weapons';
 	challengers['Handguns-link'] = 'http://farcry.wikia.com/wiki/Far_Cry_4_Weapons';
 	challengers['Wingsuit-link'] = 'http://farcry.wikia.com/wiki/Wingsuit';
 	challengers['Grapple-link'] = 'http://farcry.wikia.com/wiki/Grapple';	
 	challengers['Grenade-link'] = 'http://farcry.wikia.com/wiki/Grenade';	
 	challengers['C4-link'] = 'http://farcry.wikia.com/wiki/C4';
 	challengers['Mine-link'] = 'http://farcry.wikia.com/wiki/Mine';
 	challengers['Royal Palace-link'] = 'http://farcry.wikia.com/wiki/Royal_Palace';	
 	challengers['Tirtha-link'] = 'http://farcry.wikia.com/wiki/Tirtha';
 	challengers['Banapur-link'] = 'http://farcry.wikia.com/wiki/Banapur';
	challengers['Ghale Homestead-link'] = 'http://farcry.wikia.com/wiki/Ghale_Homestead';
	challengers['Utkarsh-link'] = 'http://farcry.wikia.com/wiki/Utkarsh';
 	
 
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
/* Voting */
if (wgPageName === 'User_blog:TheBlueRogue/Ultimate_JRPG_Battle') {
	challengers = {};
 
 	//JRPG Box Art images
	challengers['Chrono Cross'] = 'https://images.wikia.nocookie.net/__cb20141009194839/gameshub/images/1/12/ChronoCrossBox.jpg';
	challengers['Final Fantasy IX'] = 'https://images.wikia.nocookie.net/gameshub/images/thumb/f/f2/FinalFantasyIXBox.jpg/212px-FinalFantasyIXBox.jpg';
	challengers['Nier'] = 'https://images.wikia.nocookie.net/gameshub/images/5/5a/NeirBox.jpg';
	challengers['Xenoblade Chronicles'] = 'https://images.wikia.nocookie.net/gameshub/images/f/fb/XenobladeChroniclesBox.png';
	challengers['Chrono Trigger'] = 'https://images.wikia.nocookie.net/gameshub/images/c/c2/ChronoTriggerBox.jpg';
	challengers['Xenogears'] = 'https://images.wikia.nocookie.net/gameshub/images/7/79/XenogearsBox.jpg';
	challengers['Suikoden II'] = 'https://images.wikia.nocookie.net/__cb20141009195947/gameshub/images/7/7e/Suikoden2Box.jpg';	
	challengers['The World Ends With You'] = 'https://images.wikia.nocookie.net/gameshub/images/d/dc/TheWorldEndsWithYouBox.jpg';		
 	challengers['Valkyrie Profile'] = 'https://images.wikia.nocookie.net/gameshub/images/0/0b/ValkryieProfileBox.jpg';
	challengers['Suikoden III'] = 'https://images.wikia.nocookie.net/gameshub/images/b/bd/Suikoden3Box.jpg';
	challengers['Final Fantasy X'] = 'https://images.wikia.nocookie.net/gameshub/images/6/6c/FinalFantasyXBox.jpg';
	challengers['Final Fantasy Tactics'] = 'https://images.wikia.nocookie.net/gameshub/images/c/c6/FinalFantasyTacticsBox.jpg';
	challengers['Disgaea: Hour of Darkness'] = 'https://images.wikia.nocookie.net/gameshub/images/f/f1/Disgaea1Box.jpg';
	challengers['The Last Remnant'] = 'https://images.wikia.nocookie.net/gameshub/images/c/ce/TheLastRemnantBox.jpg';
	challengers['Tales of the Abyss'] = 'https://images.wikia.nocookie.net/gameshub/images/6/68/TalesofTheAbyssBox.jpg';
	challengers['Fire Emblem: Awakening'] = 'https://images.wikia.nocookie.net/gameshub/images/0/07/FireEmblemAwakeningBox.jpg';
	challengers['Final Fantasy VIII'] = 'https://images.wikia.nocookie.net/gameshub/images/4/4e/FinalFantasyVIIIBox.jpg';
	challengers['Ar tonelico Qoga: Knell of Ar Ciel'] = 'https://images.wikia.nocookie.net/gameshub/images/4/44/ArtonelicoQogaBox.jpg';
	challengers['Dragon Quest V'] = 'https://images.wikia.nocookie.net/gameshub/images/3/38/DragonQuestVBox.jpg';
	challengers['Persona 4'] = 'https://images.wikia.nocookie.net/gameshub/images/c/c1/Persona4Box.jpg';
	challengers['Lunar: Silver Star Story'] = 'https://images.wikia.nocookie.net/gameshub/images/f/f9/LunarSilverStarBox.jpg';
	challengers['Shin Megami Tensei Nocturne'] = 'https://images.wikia.nocookie.net/gameshub/images/f/fe/ShinMegamiTenseiNocturneBox.jpg';
	challengers['Dark Souls'] = 'https://images.wikia.nocookie.net/gameshub/images/0/02/DarkSoulsBox.jpg';
	challengers['Earthbound'] = 'https://images.wikia.nocookie.net/gameshub/images/9/91/EarthboundBox.jpg';
	challengers['\.hack\/\/IMOQ'] = 'https://images.wikia.nocookie.net/gameshub/images/5/5d/DothackIMOQBox.jpg';
	challengers['Shadow Hearts: Covenant'] = 'https://images.wikia.nocookie.net/gameshub/images/c/cf/ShadowHeartsConvenantBox.jpg';
	challengers['Kingdom Hearts II'] = 'https://images.wikia.nocookie.net/gameshub/images/c/cd/KingdomHearts2Box.png';
	challengers['Tales of Xillia'] = 'https://images.wikia.nocookie.net/gameshub/images/8/82/TalesofXilliaBox.jpg';
	challengers['Valkyria Chronicles'] = 'https://images.wikia.nocookie.net/gameshub/images/8/8c/ValkryiaChroniclesBox.jpg';
	challengers['Skies of Arcadia'] = 'https://images.wikia.nocookie.net/gameshub/images/0/07/SkiesofArcadiaBox.jpg';
	challengers['Grandia'] = 'https://images.wikia.nocookie.net/gameshub/images/b/be/GrandiaBox.jpg';
	challengers['Super Mario RPG: Legend of the Seven Stars'] = 'https://images.wikia.nocookie.net/gameshub/images/1/13/SuperMarioRPGBox.png';
	challengers['Pokemon Red & Blue'] = 'https://images.wikia.nocookie.net/gameshub/images/a/a7/PokemonRedBox.jpg';
	challengers['Baten Kaitos'] = 'https://images.wikia.nocookie.net/gameshub/images/7/73/BatenKaitosBox.jpg';
	challengers['The Legend of Heroes: Trails in the Sky'] = 'https://images.wikia.nocookie.net/gameshub/images/d/d8/TrailsintheSkyBox.jpg';
	challengers['Star Ocean 3: Till the End of Time'] = 'https://images.wikia.nocookie.net/gameshub/images/9/98/StarOcean3Box.jpg';
	challengers['Persona 2'] = 'https://images.wikia.nocookie.net/gameshub/images/2/27/Persona2Box.jpg';
	challengers['Disgaea D2: A Brighter Darkness'] = 'https://images.wikia.nocookie.net/gameshub/images/d/da/Disgaea2Box.jpg';
	challengers['Mana Khemia: Alchemists of Al-Revis'] = 'https://images.wikia.nocookie.net/gameshub/images/e/ec/ManaKhemiaBox.jpg';
	challengers['Tales of Graces f'] = 'https://images.wikia.nocookie.net/gameshub/images/e/ea/TalesofGracesBox.jpg';
	challengers['Final Fantasy VII'] = 'https://images.wikia.nocookie.net/gameshub/images/a/a7/FinalFantasyVIIBox.jpg';
	challengers['Paper Mario: The Thousand-Year Door'] = 'https://images.wikia.nocookie.net/gameshub/images/a/ac/PaperMarioThousandBox.jpg';
	challengers['Final Fantasy XII'] = 'https://images.wikia.nocookie.net/gameshub/images/8/8d/FinalFantasyXIIBox.jpg';
	challengers['Persona 3'] = 'https://images.wikia.nocookie.net/gameshub/images/2/2e/Persona3Box.jpg';
	challengers['Lufia 2'] = 'https://images.wikia.nocookie.net/gameshub/images/9/9f/Lufia2Box.jpg';
	challengers['The Last Story'] = 'https://images.wikia.nocookie.net/gameshub/images/3/39/TheLastStory.jpg';
	challengers['Panzer Dragoon Saga'] = 'https://images.wikia.nocookie.net/gameshub/images/6/64/PanzerDragoonSagaBox.jpg';
	challengers['Phantasy Star 4'] = 'https://images.wikia.nocookie.net/gameshub/images/f/f7/PhantasyStar4Box.jpg';
	challengers['Rogue Galaxy'] = 'https://images.wikia.nocookie.net/gameshub/images/0/08/RogueGalaxyBox.jpg';
 
 	//JRPG Box Art links
	challengers['Chrono Cross-link'] = 'http://chrono.wikia.com/wiki/Chrono_Cross';
	challengers['Final Fantasy IX-link'] = 'http://finalfantasy.wikia.com/wiki/Final_Fantasy_IX';
 	challengers['Nier-link'] = 'http://nier.wikia.com/wiki/NIER_Wiki';
 	challengers['Xenoblade Chronicles-link'] = 'http://xenoblade.wikia.com/wiki/Xenoblade_Chronicles';
 	challengers['Chrono Trigger-link'] = 'http://chrono.wikia.com/wiki/Chrono_Trigger';
 	challengers['Xenogears-link'] = 'http://xenosaga.wikia.com/wiki/Xenogears';	
 	challengers['Suikoden II-link'] = 'http://suikoden.wikia.com/wiki/Suikoden_II';	
 	challengers['The World Ends With You-link'] = 'http://twewy.wikia.com/wiki/The_World_Ends_with_You';
 	challengers['Valkyrie Profile-link'] = 'http://valkyrieprofile.wikia.com/wiki/Valkyrie_Profile';
	challengers['Suikoden III-link'] = 'http://suikoden.wikia.com/wiki/Suikoden_III';
	challengers['Final Fantasy X-link'] = 'http://finalfantasy.wikia.com/wiki/List_of_Final_Fantasy_X_Characters';
 	challengers['Final Fantasy Tactics-link'] = 'http://finalfantasy.wikia.com/wiki/List_of_Final_Fantasy_Tactics_Characters';
 	challengers['Disgaea: Hour of Darkness-link'] = 'http://disgaea.wikia.com/wiki/Category:Characters';
	challengers['The Last Remnant-link'] = 'http://lastremnant.wikia.com/wiki/Category:Characters';	
 	challengers['Tales of the Abyss-link'] = 'http://aselia.wikia.com/wiki/Tales_of_the_Abyss';
 	challengers['Fire Emblem: Awakening-link'] = 'http://fireemblem.wikia.com/wiki/Fire_Emblem:_Awakening';
	challengers['Final Fantasy VIII-link'] = 'http://finalfantasy.wikia.com/wiki/Final_Fantasy_VIII';
	challengers['Ar tonelico Qoga: Knell of Ar Ciel-link'] = 'http://artonelico.wikia.com/wiki/Ar_tonelico_Qoga:_Knell_of_Ar_Ciel';
 	challengers['Dragon Quest V-link'] = 'http://dragonquest.wikia.com/wiki/Dragon_Quest_V';
 	challengers['Persona 4-link'] = 'http://megamitensei.wikia.com/wiki/Persona_4';
 	challengers['Lunar: Silver Star Story-link'] = 'http://lunar.wikia.com/wiki/Lunar:_Silver_Star_Story';
 	challengers['Shin Megami Tensei Nocturne-link'] = 'http://megamitensei.wikia.com/wiki/Shin_Megami_Tensei_III:_Nocturne';	
 	challengers['Dark Souls-link'] = 'http://darksouls.wikia.com/wiki/Dark_Souls_Wiki';	
 	challengers['Earthbound-link'] = 'http://earthbound.wikia.com/wiki/EarthBound';
 	challengers['dot hack IMOQ-link'] = 'http://dothack.wikia.com/wiki/Games';
 	challengers['Shadow Hearts: Covenant-link'] = 'http://shadowhearts.wikia.com/wiki/Shadow_Hearts:_Covenant';	
 	challengers['Kingdom Hearts II-link'] = 'http://kingdomhearts.wikia.com/wiki/Kingdom_Hearts_II';
 	challengers['Tales of Xillia-link'] = 'http://aselia.wikia.com/wiki/Tales_of_Xillia';
	challengers['Valkyria Chronicles-link'] = 'http://valkyria.wikia.com/wiki/Valkyria_Wiki';	
 	challengers['Skies of Arcadia-link'] = 'http://skiesofarcadia.wikia.com/wiki/Skies_of_Arcadia_Wiki';
 	challengers['Grandia-link'] = 'http://grandia.wikia.com/wiki/Main_Page';
	challengers['Super Mario RPG: Legend of the Seven Stars-link'] = 'http://nintendo.wikia.com/wiki/Super_Mario_RPG:_Legend_of_the_Seven_Stars';
	challengers['Pokemon Red & Blue-link'] = 'http://pokemon.wikia.com/wiki/Pok%C3%A9mon_Red_%26_Blue_Version';
 	challengers['Baten Kaitos-link'] = 'http://batenkaitos.wikia.com/wiki/Baten_Kaitos_Wiki';
 	challengers['The Legend of Heroes: Trails in the Sky-link'] = 'http://legendofheroes.wikia.com/wiki/The_Legend_of_Heroes:_Trails_in_the_Sky';
 	challengers['Star Ocean 3: Till the End of Time-link'] = 'http://starocean.wikia.com/wiki/Star_Ocean:_Till_the_End_of_Time';
 	challengers['Persona 2-link'] = 'http://megamitensei.wikia.com/wiki/Persona_2:_Innocent_Sin';	
 	challengers['Disgaea D2: A Brighter Darkness-link'] = 'http://disgaea.wikia.com/wiki/Disgaea_D2:_A_Brighter_Darkness';	
 	challengers['Mana Khemia: Alchemists of Al-Revis-link'] = 'http://atelier.wikia.com/wiki/Mana_Khemia:_Alchemists_of_Al-Revis';
 	challengers['Tales of Graces f-link'] = 'http://aselia.wikia.com/wiki/Tales_of_Graces#Tales_of_Graces_.C6.92';	
 	challengers['Final Fantasy VII-link'] = 'http://finalfantasy.wikia.com/wiki/Final_Fantasy_VII';
 	challengers['Paper Mario: The Thousand-Year Door-link'] = 'http://papermario.wikia.com/wiki/Paper_Mario:_The_Thousand-Year_Door';
	challengers['Final Fantasy XII-link'] = 'http://finalfantasy.wikia.com/wiki/Final_Fantasy_XII';	
 	challengers['Persona 3-link'] = 'http://megamitensei.wikia.com/wiki/Persona_3';
 	challengers['Lufia 2-link'] = 'http://lufia.wikia.com/wiki/Lufia_II:_Rise_of_the_Sinistrals';
	challengers['The Last Story-link'] = 'http://laststory.wikia.com/wiki/The_Last_Story';
	challengers['Panzer Dragoon Saga-link'] = 'http://panzerdragoon.wikia.com/wiki/Panzer_Dragoon_Wikia';
 	challengers['Phantasy Star 4-link'] = 'http://phantasystar.wikia.com/wiki/Phantasy_Star_IV:_The_End_of_the_Millennium';
 	challengers['Rogue Galaxy-link'] = 'http://roguegalaxy.wikia.com/wiki/Rogue_Galaxy';
 
 	//JRPG Character images
	challengers['Kefka'] = 'https://images.wikia.nocookie.net/gameshub/images/f/f7/KefkaCrop.jpg';
	challengers['Indalecio'] = 'https://images.wikia.nocookie.net/gameshub/images/8/8b/IndalecioCrop.png';
	challengers['Luca Blight'] = 'https://images.wikia.nocookie.net/gameshub/images/d/d2/LucaBlightCrop.jpg';
	challengers['Yggdrassil'] = 'https://images.wikia.nocookie.net/gameshub/images/7/78/YggdrassilCrop.jpg';
	challengers['The White Witch'] = 'https://images.wikia.nocookie.net/gameshub/images/6/60/TheWhiteWitchCrop.jpg';
	challengers['Moogle'] = 'https://images.wikia.nocookie.net/gameshub/images/4/43/MoogleCrop.jpg';
	challengers['Prinny'] = 'https://images.wikia.nocookie.net/gameshub/images/8/8c/PrinnyCrop.jpg';
	challengers['Slime'] = 'https://images.wikia.nocookie.net/gameshub/images/a/aa/SlimeCrop.jpg';
	challengers['Muppy Oktavia Wonderchak VIII'] = 'https://images.wikia.nocookie.net/gameshub/images/d/d2/MuppyCrop.jpg';
	challengers['Mieu'] = 'https://images.wikia.nocookie.net/gameshub/images/c/ce/MieuCrop.jpg';
 
 	// JRPG Character links
	challengers['Kefka-link'] = 'http://finalfantasy.wikia.com/wiki/Kefka_Palazzo';
	challengers['Indalecio-link'] = 'http://starocean.wikia.com/wiki/Gabriel_(Star_Ocean_2)';
	challengers['Luca Blight-link'] = 'http://suikoden.wikia.com/wiki/Luca_Blight';
	challengers['Yggdrassil-link'] = 'http://aselia.wikia.com/wiki/Mithos_Yggdrasill';
	challengers['The White Witch-link'] = 'http://ninokuni.wikia.com/wiki/The_White_Witch';
	challengers['Moogle-link'] = 'http://finalfantasy.wikia.com/wiki/Moogle_(Race)';
	challengers['Prinny-link'] = 'http://disgaea.wikia.com/wiki/Prinny';
	challengers['Slime-link'] = 'http://dragonquest.wikia.com/wiki/Slime';
	challengers['Muppy Oktavia Wonderchak VIII-link'] = 'http://atelier.wikia.com/wiki/Muppy_Oktavia_Vonderchek_VIII';
	challengers['Mieu-link'] = 'http://aselia.wikia.com/wiki/Mieu';
 
 	//JRPG Weapon images
	challengers['Gaia Blade'] = 'https://images.wikia.nocookie.net/gameshub/images/e/e3/GaiaBladeCrop.jpg';
	challengers['Dragovian King Sword'] = 'https://images.wikia.nocookie.net/gameshub/images/1/13/DragovianKingSwordCrop.jpg';
	challengers['Ultima Weapon'] = 'https://images.wikia.nocookie.net/gameshub/images/e/e8/UltimaWeaponCrop.jpg';
	challengers['Devil\'s Arms'] = 'https://images.wikia.nocookie.net/gameshub/images/d/d5/DevilArmsCrop.jpg';
	challengers['Chaos Breaker'] = 'https://images.wikia.nocookie.net/gameshub/images/2/2c/ChaosBreakerCrop.png';
 
 	//JRPG Weapon links
	challengers['Gaia Blade-link'] = 'http://goldensun.wikia.com/wiki/Gaia_Blade';
	challengers['Dragovian King Sword-link'] = 'http://dragonquest.wikia.com/wiki/Dragovian_king_sword';
	challengers['Ultima Weapon-link'] = 'http://finalfantasy.wikia.com/wiki/Ultima_Weapon_(Weapon)';
	challengers['Devil\'s Arms-link'] = 'http://aselia.wikia.com/wiki/Devil%27s_Arms';
	challengers['Chaos Breaker-link'] = 'http://shining.wikia.com/wiki/Chaos_Breaker';
 
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
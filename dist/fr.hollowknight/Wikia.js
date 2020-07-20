/** Language dropdown **/
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	server = wgServer.replace("http://", "");
	html = '<nav style="border: 1px solid ' + borderColor + ';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid ' + borderColor + '; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	c = '<img class="';
    a = '"-image" style="width:20px; height:15px; border-radius:3px" src="http://lipis.github.io/flag-icon-css/flags/4x3/';
	flags = {};
	flags['de'] = c + 'de' + a + 'de.svg" alt="German" title="German">';
	flags['en'] = c + 'en' + a + 'us.svg" alt="English" title="English">';
	flags['es'] = c + 'es' + a + 'es.svg" alt="Spanish" title="Spanish">';
	flags['ja'] = c + 'ja' + a + 'jp.svg" alt="Japanese" title="Japanese">';
	flags['pl'] = c + 'pl' + a + 'pl.svg" alt="Polish" title="Polish">';
	flags['pt'] = c + 'pt' + a + 'pt.svg" alt="Portuguese" title="Portuguese">';
	flags['pt-br'] = c + 'pt-br' + a + 'br.svg" alt="Brazilian Portuguese" title="Brazilian Portuguese">';
	flags['ru'] = c + 'ru' + a + 'ru.svg" alt="Russian" title="Russian">';
	flags['ar'] = c + 'ar' + a + 'ae.svg" alt="Arabic" title="Arabic">';
	flags['tr'] = c + 'tr' + a + 'tr.svg" alt="Turkish" title="Turkish">';
	flags['vi'] = c + 'vi' + a + 'vn.svg" alt="Vietnamese" title="Vietnamese">';
	flags['ro'] = c + 'ro' + a + 'ro.svg" alt="Romanian" title="Romanian">';
	flags['it'] = c + 'it' + a + 'it.svg" alt="Italian" title="Italian">';
	flags['fi'] = c + 'fi' + a + 'fi.svg" alt="Finnish" title="Finnish">';
	flags['fr'] = c + 'fr' + a + 'fr.svg" alt="French" title="French">';
	flags['hu'] = c + 'hu' + a + 'hu.svg" alt="Hungarian" title="Hungarian">';
	flags['id'] = c + 'id' + a + 'id.svg" alt="Indonesian" title="Indonesian">';
	flags['nl'] = c + 'nl' + a + 'nl.svg" alt="Dutch" title="Dutch">';
	$('.WikiaPageHeader .comments').after(html);
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "Deutsch":
				languages['de'] = href;
				break;
			case "English":
				languages['en'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Português":
				languages['pt'] = href;
				break;
			case "Português do Brasil":
				languages['pt-br'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Türkçe":
				languages['tr'] = href;
				break;
			case "العربية":
				languages['ar'] = href;
				break;
			case "Tiếng Việt":
				languages['vi'] = href;
				break;
			case "Română":
				languages['ro'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "Suomi":
				languages['fi'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Magyar":
				languages['hu'] = href;
				break;
			case "Bahasa Indonesia":
				languages['id'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
		}
	});
	var language = wgContentLanguage;
	$.each(flags, function(key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').append('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="' + key + '-link" href="' + languages[key] + '"><li style="border-top: 1px solid ' + borderColor + '; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
	$('.WikiaPageHeader .chooselanguage').on('click', function() {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
	});
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function() {
		var that = this;
		var timeOut = setTimeout(function() {
			$(that).removeClass('active');
		}, 500);
		$('.chooselanguage').on('mouseenter', function() {
			clearTimeout(timeOut);
		});
	});
}
if ($('.WikiaArticleInterlang').length > 0) {
	addOnloadHook(appendLanguageDropdown);
}
if ($('.WikiaArticleInterlang').length > 0) {
	addOnloadHook(appendLanguageDropdown);
}
 
/*--------------BandCamp Audio Embeds ----------------*/
/*--------------ART BIG TRACKLIST Hollow Knight OST ----------------*/
$("#ArtBigTrackListHollowKnightOST").replaceWith('<iframe style="border: 0; width: 350px; height: 786px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=large/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*--------------ART SMALL TRACKLIST Hollow Knight OST ----------------*/
$("#ArtSmallTrackListHollowKnightOST").replaceWith('<iframe style="border: 0; width: 400px; height: 472px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=large/bgcol=333333/linkcol=0f91ff/artwork=small/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*--------------Individual Songs ----------------*/
 
/*-------------- Enter Hallownest  ----------------*/
$("#EnterHallownestPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3085101441/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Dirtmouth  ----------------*/
$("#DirtmouthPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1199110903/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Crossroads ----------------*/
$("#CrossroadsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3124010594/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- False Knight  ----------------*/
$("#FalseKnightPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1409821798/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Greenpath ----------------*/
$("#GreenpathPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=645388888/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Hornet ----------------*/
$("#HornetPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3886088546/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Reflection ----------------*/
$("#ReflectionPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3079329828/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Mantis Lords ----------------*/
$("#MantisLordsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3763468112/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- City of Tears ----------------*/
$("#CityOfTearsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2665193936/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Dung Defender ----------------*/
$("#DungDefenderPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3705098204/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Crystal Peak  ----------------*/
$("#CrystalPeakPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2721936729/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Fungal Wastes ----------------*/
$("#FungalWastesPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2947040151/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Decisive Battle ----------------*/
$("#DecisiveBattlePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2999703782/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Soul Sanctum ----------------*/
$("#SoulSanctumPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3816907853/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Resting Grounds ----------------*/
$("#RestingGroundsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3323907551/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
 
/*-------------- Queen's Gardens ----------------*/
$("#QueensGardensPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1002007554/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- The White Lady ----------------*/
$("#TheWhiteLadyPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3532683204/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Broken Vessel ----------------*/
$("#BrokenVesselPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3145211560/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
 
/*-------------- Kingdom's Edge  ----------------*/
$("#KingdomsEdgePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1065575571/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Nosk ----------------*/
$("#NoskPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3746895652/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Dream  ----------------*/
$("#DreamPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1178149996/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
 
/*-------------- Dream Battle  ----------------*/
$("#DreamBattlePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2806475561/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- White Palace ----------------*/
$("#WhitePalacePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2557202430/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Sealed Vessel  ----------------*/
$("#SealedVesselPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3881230229/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Radiance  ----------------*/
$("#RadiancePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2158620079/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- Hollow Knight ----------------*/
$("#HollowKnightPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3718668612/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/*-------------- White Defender ----------------*/
$("#WhiteDefenderPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1451496582/size=small/bgcol=333333/linkcol=0f91ff/track=2527499866/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hidden-dreams">Hidden Dreams by Christopher Larkin</a></iframe>');
 
/*-------------- Truth, Beauty and Hatred  ----------------*/
$("#TruthBeautyAndHatredPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1451496582/size=small/bgcol=333333/linkcol=0f91ff/track=492359097/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hidden-dreams">Hidden Dreams by Christopher Larkin</a></iframe>');
 
/*-------------- Hive Knight ----------------*/
$("#HiveKnightPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3288527064/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Nightmare Lantern (Interlude) ----------------*/
$("#NightmareLanternPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3349996028/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- The Grimm Troupe ----------------*/
$("#TheGrimmTroupePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=2863003550/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Nightmare King  ----------------*/
$("#NightmareKingPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3448749986/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Dreamers  ----------------*/
$("#DreamersPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=670765265/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Pale Court ----------------*/
$("#PaleCourtPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=4290163330/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Gods and Glory ----------------*/
$("#GodsAndGloryPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3723695169/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Daughter of Hallownest ----------------*/
$("#DaughterOfHallownestPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=480515145/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Godhome ----------------*/
$("#GodhomePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=4290869840/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Sisters of Battle ----------------*/
$("#SistersOfBattlePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=1459334580/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
/*-------------- Haunted Foes ----------------*/
$("#HauntedFoesPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=320168263/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
 
/*-------------- Furious Gods ----------------*/
$("#FuriousGodsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=954056682/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
 
/*-------------- Pure Vessel ----------------*/
$("#PureVesselPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3088722229/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');
 
 
/* Allow direct link to tabber content (https://community.fandom.com/wiki/Thread:790781)*/
//<tabber> extension req
//v2.0, 2017, user:fngplg.
(function ($){
    var nstarget = window.location.hash.replace('#', '');
    if (nstarget === '') return;
    //convert wiki-utf 2 ansi
    nstarget = nstarget.replace(/\./g, '%');
    nstarget = decodeURIComponent(nstarget).replace(/_/g, ' ');
    //console.log('trgt:'+nstarget);
    $(function(){
        setTimeout(function() {
            var $nt2a = $('.tabberlive>.tabbernav>Li>a[title="' + nstarget + '"]');
            $nt2a.click();
        }, 100);//settimeout
    });//doc.rdy    
})(jQuery);
 
 
/* --- Special:Upload template preload --- */
 
    var matches = window.location.href.match(/wpForReUpload/);
 
    if( matches && matches.length ) {
    	var mwct;
    } else {
    	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]");
    	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").hide();
    }
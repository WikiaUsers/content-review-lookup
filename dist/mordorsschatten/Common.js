/***** Any JavaScript here will be applied to all skins on the entire site. *****/
/* Profile's masthead */
importScript('MediaWiki:Common.js/masthead.js');

/* Skin */
/** Recent changes arrows **/
if(wgPageName == "Spezial:Letzte_Änderungen") {
	$('.mw-rc-openarrow img').attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/90/Icon-Recent_Changes_arrow.png');

	$('.mw-rc-closearrow img').attr('src','https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/2c/Icon-Recent_Changes_arrow_down.png');
}

/** Redirect arrow **/
	$('.redirectMsg img').attr('src', 'https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/e/e6/Icon-Redirect.png');

/* Main page */
if(wgPageName == "Shadow_of_Mordor_Wikia") {
	$(document).ready(function() {
		/** Chat button icon **/
		$('.mainpage-box-chat .ChatModule .wikia-button').prepend('<img class="chat-icon" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/7/72/Icon-Chat.png" />');
 
		/** Poll text **/
		$('.mainpage-box-poll .total').parent().addClass('pollText'); 
		
		/** Blogs button icon **/
		$('.mainpage-box-blogfeed .blog-button').prepend('<a href="/wiki/Special:CreateBlogPage" class="wikia-button"><img src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/6/66/Icon-Blogs.png" class="blog-icon">Create news</a>');

		/** Hide chat button for logged out users **/
		if(!wgUserName) {
			$('.mainpage-box-chat .ChatModule .chat-join').hide();
		}
	});
}

/* General */
/** Tooltips **/
importScriptPage('MediaWiki:Common.js/tooltip', 'shadowofmordor');
importScriptPage('MediaWiki:Common.js/ImageHover.js');

/** Collapsible elements **/
importScriptPage('ShowHide/code.js', 'dev');
var ShowHideConfig = { autoCollapse: 3 };

/** Blog social media icons **/
if(wgCanonicalNamespace == "Benutzer_Blog") {
        $(document).ready(function() {
                var blogImage = new Image(); blogImage.src = 'https://images.wikia.nocookie.net/__cb20131114152519/shadowofmordor/de/images/4/4c/Blog_icon_active.png';
                var facebookImage = new Image(); facebookImage.src = 'https://images.wikia.nocookie.net/__cb20131114152520/shadowofmordor/de/images/5/53/Facebook_icon_active.png';
                var twitterImage = new Image(); twitterImage.src = 'https://images.wikia.nocookie.net/__cb20131114152517/shadowofmordor/de/images/9/91/Twitter_icon_active.png';
                var googleImage = new Image(); googleImage.src = 'https://images.wikia.nocookie.net/__cb20131114152519/shadowofmordor/de/images/1/18/Google%2B_icon_active.png';
                var rssImage = new Image(); rssImage.src = 'https://images.wikia.nocookie.net/__cb20131114152517/shadowofmordor/de/images/1/10/RSS_icon_active.png';
        
                $('.news-share .blog img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152519/shadowofmordor/de/images/4/4c/Blog_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152519/shadowofmordor/de/images/2/22/Blog_icon.png');
                });  
				
                $('.news-share .facebook img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152520/shadowofmordor/de/images/5/53/Facebook_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152520/shadowofmordor/de/images/3/3f/Facebook_icon.png');
                });  				
				
                $('.news-share .twitter img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152517/shadowofmordor/de/images/9/91/Twitter_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152518/shadowofmordor/de/images/f/f3/Twitter_icon.png');
                });  				
				
                $('.news-share .google img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152519/shadowofmordor/de/images/1/18/Google%2B_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152519/shadowofmordor/de/images/d/d6/Google%2B_icon.png');
                });  				
				
                $('.news-share .rss img').hover(function() {
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152517/shadowofmordor/de/images/1/10/RSS_icon_active.png');
                }, function() {  
                        $(this).attr('src','https://images.wikia.nocookie.net/__cb20131114152517/shadowofmordor/de/images/b/b1/RSS_icon.png');
                });  					
        });
  }

// Lizenzinfo in Upload-Bildschirm erzwingen.
// Wir entfernen hier die "keine Auswahl"-Option und setzen die LU-Option auf Standard. Bilder erscheinen somit im Zweifel immer in einer nachprüfbaren Kategorie.
 
function manipulateLicenseSelector() {
  var select = document.getElementById('wpLicense');
  if (select != null) {
    var option = select.options[0]
    if (option != null) {
      select.removeChild(option);
    }
    select.selectedIndex = select.length - 1;
    licenseSelectorCheck();
  }
}
 
addOnloadHook(manipulateLicenseSelector);

/** Name Generator **/
var nameArray = ["Akoth","Amug","Ashgam","Azdush","Bagabug","Blorg","Borgu","Brogg","Buth","Dûgza","Dûsh","Feldush","Flak","Folgum","Ghâm","Ghûra","Gimub","Glûk","Golm","Gorfel","Gorgûm","Goroth","Grublik","Gûndza","Horhog","Horza","Hoshû","Humgrat","Hûra","Ishgha","Ishmoz","Kâka","Kothûg","Krimp","Kruk","Kugaluga","Latbag","Lorm","Lûga","Lûgdash","Lûgnak","Malmûg","Mogg","Mormog","Mozfel","Muggrish","Mûglûk","Muzglob","Nákra","Nazdûg","Názkûga","Norsko","Norûk","Ogthrak","Olgoth","Olrok","Orthog","Paash","Pigug","Prák","Pug","Pûgrish","Pushkrimp","Ratbag","Ratlûg","Ronk","Rûg","Rûkdûg","Shágflak","Shaká","Skak","Skûn","Snagog","Takra","Tarz","Thakrak","Torz","Tûgog","Tûkâ","Tûmhom","Ugakuga","ûkbûk","Ûkrom","Ukshak","Ushbaka","Ushgol","Uthûg","Zaathra","Zog","Zogdûsh","Zûgor","Zûmug","Zunn"];
var titleArray = ["Archer Trainer","Ash-Skin","Bag-Head","Barrel-Scraper","Beast Slayer","Blade Sharpener","Blood-Lover","Bone-Ripper","Caragor Slayer","Cave Rat","Corpse-Eater","Deathbringer","Drooler","Elf-Slayer","Evil Eye","Fat Head","Fire-Brander","Flesh-Render","Frog-Blood","Ghûl Slayer","Graug Catcher","Grog-Burner","Halfling-Lover","Head-Hunter","Horn Blower","Hot Tongs","Jaws","Learned Scribe","Life-Drinker","Limp-Leg","Literate One","Long-Tooth","Lucky Shot","Mad-Eye","Man-Stalker","Meat Hooks","Metal-Beard","Night-Bringer","of Lithlad","of the Spiders","One-Eye","Plague-Bringer‎‎","Pot-Licker","Quick-Blades","Rabble Rouser","Raid Leader","Ranger-Killer","Ravager","Sawbones","Scar-Artist","Shield Master","Skull Bow","Skull-Cracker","Slashface","Storm-Bringer","Sword Master","the Advisor","the Assassin","the Beheader","the Bitter","the Black","the Bleeder","the Bloated","the Bowmaster","the Brewer","the Brown","the Choker","the Chunky","the Claw","the Clever","the Cook","the Corruptor","the Coward","the Crazy","the Dark","the Defender","the Destroyer","the Devourer","the Diseased","the Disgusting","the Drunk","the Endless","the Flesh Glutton","the Gorger","the Hacker","the","Handsome","the Hungry","the Immovable","the Infernal","the Judge","the Killer","the Kin-Slayer","the Legend","the Loaded","the Lookout","the Mad","the Man-Eater","the Meat Hoarder","the Merciful","the Messenger","the Mindless","the Other Twin","the Poet","the Proud","the Puny","the Rash","the Raven","the Runious","the Runner","the Runt","the Savage","the Scholar","the Screamer","the Serpent","the Shadow","the Shield","the Slasher","the Slaughterer","the Small","the Spike","the Stout","the Surgeon","the Swift","the Tongue","the Twin","the","Unkillable","the Vile","the Wanderer","the Watcher","the Wise","Thin Bones","Tree-Killer","Troll Slayer","Troll-Born","Ugly Face","Who Flees"];
 
$('.namegenerator .generator').on('click',function() {
	var name = nameArray[Math.floor(Math.random() * nameArray.length)];
	var title = titleArray[Math.floor(Math.random() * titleArray.length)];
	var nameTitle = name + ' ' + title;
 
	$('.namegenerator .result-insert').text(nameTitle);
});
/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/** Import du code de wikia.js **/

// Interwiki links
//Taken from http://shadowofmordor.wikia.com/wiki/MediaWiki:Wikia.js by MarkvA
function appendLanguageDropdown() {
	var borderColor = $('.WikiaPageHeader .comments').css('border-top-color');
	var server = wgServer.replace("http://","");
	var html = '<nav style="border: 1px solid '+borderColor+';" class="wikia-menu-button secondary combined chooselanguage"><span class="drop"><img style="margin-top: 3px; margin-left: 2px; margin-right: 4px;" class="chevron" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D"></span><ul style="min-width: 42px; margin-top: 1px; border: 1px solid '+borderColor+'; border-top: none; text-align:center;" class="WikiaMenuElement" style="min-width:20px;"></ul></nav>';
	flags = {};
	flags['nl'] = '<img class="nl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/2/20/Flag_of_the_Netherlands.svg" alt="Dutch">';
	flags['ja'] = '<img class="ja-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9e/Flag_of_Japan.svg" alt="Japanese">';
	flags['it'] = '<img class="it-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/0/03/Flag_of_Italy.svg" alt="Italian">';
	flags['fr'] = '<img class="fr-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/c/c3/Flag_of_France.svg" alt="French">';
	flags['pl'] = '<img class="pl-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/1/12/Flag_of_Poland.svg" alt="Polish">';
	flags['de'] = '<img class="de-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/b/ba/Flag_of_Germany.svg" alt="German">';
	flags['ru'] = '<img class="ru-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/f3/Flag_of_Russia.svg" alt="Russian">';
	flags['zh'] = '<img class="zh-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/f/fa/Flag_of_the_People%27s_Republic_of_China.svg" alt="Chinese">';
	flags['es'] = '<img class="es-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/9/9a/Flag_of_Spain.svg" alt="Spanish">';
	flags['en'] = '<img class="en-image" width="22" height="16" src="https://images.wikia.nocookie.net/middleearthshadowofmordor7723/images/a/a4/Flag_of_the_United_States.svg" alt="English">';
	$('.WikiaPageHeader .comments').after(html);
 
	languages = {};
	$('.WikiaArticleInterlang ul li a').each(function() {
		var languageFull = $(this).text();
		var href = $(this).attr('href');
		var pageNameArray = href.split('/')
		var pageName = pageNameArray[pageNameArray.length - 1];
		switch (languageFull) {
			case "English":
				languages['en'] = href;
				break;
			case "Español":
				languages['es'] = href;
				break;
			case "中文":
				languages['zh'] = href;
				break;
			case "Русский":
				languages['ru'] = href;
				break;
			case "Deutsch":
				languages['de'] = href;
				break;
			case "Polski":
				languages['pl'] = href;
				break;
			case "Français":
				languages['fr'] = href;
				break;
			case "Italiano":
				languages['it'] = href;
				break;
			case "日本語":
				languages['ja'] = href;
				break;
			case "Nederlands":
				languages['nl'] = href;
				break;
		}
	});
 
	var language = wgContentLanguage;
	$.each(flags, function (key, value) {
		if (key === language) {
			$('.WikiaPageHeader .chooselanguage').prepend(flags[key]);
		} 
		else {
			if (languages[key]) {
				$('.WikiaPageHeader .chooselanguage ul').prepend('<a style="display: inline; padding: 0; height: 0; line-height: 0;" class="'+ key +'-link" href="' + languages[key] + '"><li style="border-top: 1px solid '+ borderColor +'; padding-top: 3px; padding-bottom: 3px;" class="' + key + '">' + flags[key] + '</li></a>');
			}
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('click', function () {
		if ($(this).hasClass('active') === false) {
			$(this).addClass('active');
		} 
		else {
			$(this).removeClass('active');
		}
	});
 
	$('.WikiaPageHeader .chooselanguage').on('mouseleave', function () {
		var that = this;
		var timeOut = setTimeout(function () { $(that).removeClass('active'); }, 500);
 
		$('.chooselanguage').on('mouseenter', function () {
			clearTimeout(timeOut);
		});
	});
}
if( $('.WikiaArticleInterlang').length > 0 ) {
	addOnloadHook(appendLanguageDropdown);
}
 
$(document).ready(function() {
	if(!mediaWiki.config.get('wgUserName')) { // If username is not set (the user is logged out), hide the "Flags" dropdown options
		$('.wikia-menu-button .flags-access-class').parent().remove();
	}
});

// Back-to-top module
window.BackToTopText = "Retourner en haut";
window.BackToTopSpeed = 600;
/** Fin de l'import **/

// UserTags
window.UserTagsJS = {
    modules: {},
    tags:    {
        chatmoderator : { u:'Surveillant(e) du Tchat', m:'Surveillant du Tchat', f:'Surveillante du Tchat' },
        admin : {u:'Administrateur(trice)', m:'Administrateur', f:'Administratrice' },
        rollback: { u:'Rollback' },
        directeur: { u:'Directeur(trice)', m:'Directeur', f:'Directrice' },
        rédacteur: { u:'Rédacteur(trice)', m:'Rédacteur', f:'Rédactrice' },
        bureaucrate: { u:'Bureaucrate', m:'Bureaucrate', f:'Bureaucrate' },
        Incollable_sur_Clash_royale: { u:'Incollable sur Clash royale' },
        Quidd: { u:'Quidd' },
        Garde: { u:'Garde' }
    }
};
 
UserTagsJS.modules.inactive      = 30;
UserTagsJS.modules.newuser       = false;
UserTagsJS.modules.autoconfirmed = true;
    
UserTagsJS.modules.userfilter = {
	'CreatorMan2006': ['content-moderator'], // Ne sera jamais affiché modérateur de contenu
	'Superyastiquereuros': ['content-moderator', 'rollback', 'newuser', 'notautoconfirmed'],
	'FrenchPower06': ['newuser', 'notautoconfirmed'],
	'Fr.ClashRoyale.Wiki.Bot.Officiel': ['notautoconfirmed', 'newuser', 'inactive'] //Ne sera jamais affiché en tant que nouvel utilisateur, que nouveau compte ou qu'inactif.
};
 
UserTagsJS.modules.mwGroups = [
    'content-moderator',
    'bureaucrat',
    'chatmoderator',
    'patroller',
    'rollback',
    'sysop',
    'bannedfromchat',
    'bot',
    'bot-global',
];
 
UserTagsJS.modules.metafilter = {
    sysop:         ['bureaucrat', 'founder'],
    bureaucrat:    ['founder'],
    chatmoderator: ['sysop', 'bureaucrat', 'rollback', 'threadmoderator'],
    rollback:      ['sysop', 'bureaucrat']
};
UserTagsJS.modules.autoconfirmed = true; 
UserTagsJS.modules.mwGroups = ['sysop', 'bot', 'chatmoderator']; 
UserTagsJS.modules.custom = { 
        'Lowyx' : ['admin'],
        'Sylvayn': ['directeur'],
        'Maldox': ['Incollable_sur_Clash_royale'],
        'Fr.ClashRoyale.Wiki.Bot.Officiel': ['Quidd'],
        'Superyastiquereuros': ['Garde']
};

/* Articles are interwiki links so that other wikis can use them. */
articles = [
    'u:dev:MediaWiki:DiscordIntegrator/code.js',
    'w:c:spottra:MediaWiki:Common.js/Storage.js',
    'w:c:spottra:MediaWiki:Common.js/Numeral.js',
    'Common.js/KDcollapsibleTables.js',
    'Common.js/calc.js',
    'Common.js/StatusEffects.js',
    'Common.js/DeckCalc.js',
    'Common.js/CardPriceCalc.js',
    'Common.js/DeckGenerator.js',
    'Common.js/BattleDecks.js',
    'u:dev:MediaWiki:ExtendedNavigation/code.js',
    'w:c:dev:MediaWiki:TopEditors/code.js',
    'u:dev:MediaWiki:UserTags/code.js',
    'w:dev:WallGreetingButton/code.js',
    'w:c:clashofclans:MediaWiki:Common.js/Sliders.js',
    'Common.js/CalcForms.js',
    'w:c:boombeach:MediaWiki:Common.js/insertusername.js',
    'w:c:boombeach:MediaWiki:Common.js/Protection.js',
    'w:c:boombeach:MediaWiki:Common.js/jsColor.js',
    'w:c:boombeach:MediaWiki:Common.js/NotificationIcon.js',
    'w:c:boombeach:MediaWiki:Common.js/Fire.js',
    'w:c:boombeach:MediaWiki:Common.js/Highcharts.js',
    'w:c:boombeach:MediaWiki:Common.js/Highcharts-data.js',
    'w:c:boombeach:MediaWiki:Common.js/Highcharts-charts-fromTable.js'
];

// Use Wikia's importArticles() function to load JavaScript files
importArticles({
    type: 'script',
    articles: articles
});

/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 *
 * Element.prototypes added based on code by Om Shankar via StackOverflow.
 */
 
var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] :
            (reCache[className] = new RegExp( "(?:\\s|^)" + className +
            "(?:\\s|$)"))).test(element.className);
        };
})();
 
Element.prototype.hasClassName = function(name) {
    return hasClass(this, name);
};
 
Element.prototype.addClassName = function(name) {
    if (!this.hasClassName(name)) {
        this.className = this.className ? [this.className, name].join(' ') : name;
    }
};
 
Element.prototype.removeClassName = function(name) {
    if (this.hasClassName(name)) {
        var c = this.className;
        this.className = c.replace(new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "").trim();
    }
};
 
/* For internal compatibility -- older defined method, now uses new method */
function hasClassTest(element, className) {
   return hasClass(element, className);
}
 
/* Use this function to round a number or result of an equation to a 
certain digit. */
function roundNum(digit, num) {
    return Math.round((num) * Math.pow(10, digit)) * Math.pow(10, -digit);
}
/* This version cannot round to a digit before the decimal, but it
always rounds without a small left-over */
function round(digit, num) {
    return Number(Math.round(num+'e'+digit)+'e-'+digit);
}
 
/* Use this function to find the sum of two values. It is used in 
the function, arrayAverage, below. */
function addNums(addValueA, addValueB) {
    return addValueA + addValueB;
}
 
/* Use this function to find the average of the numbers in an array. */
function arrayAverage(array) {
    return array.reduce(addNums, 0) / array.length;
}

// Add Make an account notice to sidebar if the user is not signed in
$(window).load(function() {
    if (wgUserName === null) {
        $('section#WikiaRecentActivity').before('<section class="module" id="sidebarReaderNotice"><h2>Supprimer les publicités</h2><p>Vous aimez le wiki mais vous avez des publicités ? <a href="http://fr.clashroyale.wikia.com/wiki/Special:UserSignup">Créer un compte</a> c\'est rapide et facile, cela enlèvera la plupart des publicités de Fandom !</p></section>');
    }
});

// Add Deck Builder module to sidebar
$(window).load(function() {
    $("section#WikiaRecentActivity").after('<section id="DeckBuilderModule" class="module" style="padding-bottom: 0;"><a href="/wiki/Deck_Builder" class="button" style="float: right;">Allons-y !</a><h2 class="activity-heading" style="margin: 0;">Deck Builder</h2><p>Construisez, Analysez et Partagez des Decks</p><div style="text-align: center; line-height: 0; margin-top: 5px;"><img src="https://vignette.wikia.nocookie.net/clashroyale/images/0/04/DeckBuilderCards.png/revision/latest?cb=20161011003315" style="width: 80%;"></div></section>');
});

// General Changes
$(document).ready(function() {
    // Change Random Page button to only go to pages in the mainspace
    $('.wds-dropdown a[data-tracking=explore-random], ul.tools li a[data-name=random]').attr("href", "/fr/wiki/Special:Random/main");
    // Clash of Clans and Brawl Stars topic interwiki links
    $("#CoCLink, #BrawlStarsLink").prependTo(".page-header__contribution > div:first-child").css({"display": "inline-block"});
    // Click the notification icon to reveal hidden banners (Template:Notification)
    $('#Reveal-Trigger').click(function() {
        $('.Revealable').slideToggle("slow");
    });
   // Click element with this class to bring up an alert with the element's title attribute's contents (Template:Help)
    $(".titleAlert").click(function() {
        alert($(this).attr("title"));
    });
    // Template:CollapsibleContent
    $("table.collapsing-table tr.collapsing-table-trigger td").click(function() {
        $(this).parent("tr").siblings("tr").children("td").fadeToggle(600);
        $(this).children("p.collapsing-table-trigger-messages").children("span.collapsing-table-trigger-text").toggleClass("collapsing-table-trigger-text-hidden");
    });
    // Template:HiddenSeries
    $(".HiddenSeriesButton").click(function() {
    $(this).siblings(".HiddenSeries").show();
        $(this).hide();
    });
});

 
/*****************************************************************
** S'il vous plait, ne mettez aucun code JS avant les imports ****
*********** !!! TOUJOURS APRES les imports !!! *******************
******************************************************************/

 
/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */
 
var autoCollapse = 2;
var collapseCaption = 'cacher';
var expandCaption = 'afficher';
 
function collapseTable( tableIndex ) {
        var Button = document.getElementById( 'collapseButton' + tableIndex );
        var Table = document.getElementById( 'collapsibleTable' + tableIndex );
 
        if ( !Table || !Button ) {
                return false;
        }
 
        var Rows = Table.rows;
 
        if ( Button.firstChild.data == collapseCaption ) {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = 'none';
                }
                Button.firstChild.data = expandCaption;
        } else {
                for ( var i = 1; i < Rows.length; i++ ) {
                        Rows[i].style.display = Rows[0].style.display;
                }
                Button.firstChild.data = collapseCaption;
        }
}
 
function createCollapseButtons() {
        var tableIndex = 0;
        var NavigationBoxes = new Object();
        var Tables = document.getElementsByTagName( 'table' );
 
        for ( var i = 0; i < Tables.length; i++ ) {
                if ( hasClass( Tables[i], 'collapsible' ) ) {
 
                        /* only add button and increment count if there is a header row to work with */
                        var HeaderRow = Tables[i].getElementsByTagName( 'tr' )[0];
                        if ( !HeaderRow ) {
                                continue;
                        }
                        var Header = HeaderRow.getElementsByTagName( 'th' )[0];
                        if ( !Header ) {
                                continue;
                        }
 
                        NavigationBoxes[tableIndex] = Tables[i];
                        Tables[i].setAttribute( 'id', 'collapsibleTable' + tableIndex );
 
                        var Button = document.createElement( 'span' );
                        var ButtonLink = document.createElement( 'a' );
                        var ButtonText = document.createTextNode( collapseCaption );
 
                        Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]
 
                        ButtonLink.style.color = Header.style.color;
                        ButtonLink.setAttribute( 'id', 'collapseButton' + tableIndex );
                        ButtonLink.setAttribute( 'href', "javascript:collapseTable(" + tableIndex + ");" );
                        ButtonLink.appendChild( ButtonText );
 
                        Button.appendChild( document.createTextNode( '[' ) );
                        Button.appendChild( ButtonLink );
                        Button.appendChild( document.createTextNode( ']' ) );
 
                        Header.insertBefore( Button, Header.childNodes[0] );
                        tableIndex++;
                }
        }
 
        for ( var i = 0;  i < tableIndex; i++ ) {
                if ( hasClass( NavigationBoxes[i], 'collapsed' ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], 'autocollapse' ) ) ) {
                        collapseTable( i );
                } else if ( hasClass( NavigationBoxes[i], 'innercollapse' ) ) {
                        var element = NavigationBoxes[i];
                        while ( element = element.parentNode ) {
                                if ( hasClass( element, 'outercollapse' ) ) {
                                        collapseTable( i );
                                        break;
                                }
                        }
                }
        }
}
 
addOnloadHook( createCollapseButtons );
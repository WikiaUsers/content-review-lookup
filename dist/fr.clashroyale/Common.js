/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

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
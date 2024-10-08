/* Any JavaScript here will be loaded for all users on every page load. */

/* Ajax Wiki Activity Refresh Settings */
window.ajaxPages = [
    'Special:RecentChanges',
    'Special:Watchlist',
    'Special:Log',
    'Special:Contributions',
    'Special:WikiActivity',
    'Special:BlockList',
    'Special:Statistics'
];
window.AjaxRCRefreshText = 'Auto-refresh';
window.AjaxRCRefreshHoverText = 'Automatically refresh the page';

window.AddRailModule = [{prepend: false,maxAge: 1}];

// Lock comments script settings

window.lockOldComments = (window.lockOldComments || {});
window.lockOldComments.limit = 90;

/* Special Pages config script - Add special pages to the wiki here */
window.pageNames = [

   'PvZWikiEventTitle',
   'ProspectiveStaff',
   'Administrators\'Chambers',
   'PvZArt',
   'Lettuce',
   'TZM',
   'Prism',
   'ANOTHERPAGENAMEWITHOUTPREFIX'

];
window.pageData = [

   'PvZ3 Wiki Event Coming Soon',
   'This is a partial list of users elegible to be staff, intended for staff use. Note that this does not guarantee a successful promotion application and screening process. <br></br> Rollbacks: <br></br> Discussion Moderators: <br><s>Sharksurcool</s></br> Moderators: <br>None<br/> Administrators: <br>CWJ-D, GamesterD<br/> Bureaucrats: <br>None<br/>',
   'Coming Soon!',
   'See art here from [[User:LettuceBirb|Lettuce]], MS, and more!',
   'Lettuce\'s Gijinks is open for business! He sells Glowy Specs™',
   'TZM\'s lair. Yeah, he hides it well. More coming soon.',
   '<h1 class="page-header__title">PrismastebanZ\'s Hidden Messy Sanctuary</h1>' + 'I\'m blue da ba de ba duh da ba. Also, welcome to my hidden messy sanctuary.' + '<div class="mq-wrapper"><span><wikitext>[[File:Rei Ayanami Toast.gif]] [[File:1z148ow th.gif]] [[File:Rei Ayanami Toast.gif]]</span></div></wikitext>' + '<poll>Have you found this page yet?<br>Yes<br>No</poll>',
   'DATAFORLASTPAGEINABOVELIST'

];

//The page "purpose" displays on the web tab
window.pagePurpose = [

   'Wiki Event',
   'Users Eligible to be Staff',
   'Ze Sneaky (Secret) Admin Hideout',
   'PvZ Art Gallery',
   'LettuceBirb',
   'Nightcy\'s Domain',
   'Prism\'s Messy Sanctuary',
   'PURPOSEOFLASTPAGE'

];

// http://dev.wikia.com/wiki/RevealAnonIP
window.RevealAnonIP = {
    permissions: ['rollback', 'sysop', 'bureaucrat', 'bot', 'staff']
};

function updatetimer(i) {
    var now = new Date();
    var then = timers[i].eventdate;
    var diff = count = Math.floor((then.getTime() - now.getTime()) / 1000);

    // catch bad date strings
    if (isNaN(diff)) {
        timers[i].firstChild.nodeValue = '** ' + timers[i].eventdate + ' **';
        return;
    }

    // determine plus/minus
    if (diff < 0) {
        diff = -diff;
        var tpm = ' ';
    } else {
        var tpm = ' ';
    }

    // calculate the diff
    var left = (diff % 60) + ' seconds';
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 60) + ' minutes ' + left;
    diff = Math.floor(diff / 60);
    if (diff > 0) left = (diff % 24) + ' hours ' + left;
    diff = Math.floor(diff / 24);
    if (diff > 0) left = diff + ' days ' + left;
    timers[i].firstChild.nodeValue = tpm + left;

    // a setInterval() is more efficient, but calling setTimeout()
    // makes errors break the script rather than infinitely recurse
    timeouts[i] = setTimeout('updatetimer(' + i + ')', 1000);
}

$(function checktimers() {
    //hide 'nocountdown' and show 'countdown'
    var nocountdowns = getElementsByClassName(document, 'span', 'nocountdown');
    for (var i in nocountdowns) nocountdowns[i].style.display = 'none';
    var countdowns = getElementsByClassName(document, 'span', 'countdown');
    for (var i in countdowns) countdowns[i].style.display = 'inline';

    //set up global objects timers and timeouts.
    timers = getElementsByClassName(document, 'span', 'countdowndate'); //global
    timeouts = new Array(); // generic holder for the timeouts, global
    if (timers.length == 0) return;
    for (var i in timers) {
        timers[i].eventdate = new Date(timers[i].firstChild.nodeValue);
        updatetimer(i); //start it up
    }
});

/* Add extra classes based on category
 * @author: UltimateSupreme (http://c.wikia.com/wiki/User:UltimateSupreme)
 */
(function($, mw) {
    function categorycheck() {
        if ($(this).text() === "Dreamworld levels") {
            $(".wikia-infobox").addClass("dreamworld");
            mw.log("Category found!");
            return;
        }
    }
    $("li.category > span.name > a").each(categorycheck);
}(jQuery, mediaWiki));

/* Rail WAM log */
window.railWAM = {
    logPage:'Project:WAM Log'
};

//These are the keyboard shortcuts for users, a modified version of the !bang script from Dev Wiki
//To do: Remove the need for ! and the : at the end of the string for faster typing
 
$('.wds-global-navigation__search-input').on('keyup', function(){
	var txt = $(this).val(),
		m = txt.match(/^\!([a-z]+) /),
		namespaces;
		j = txt.match(/^\.([a-z]+) /),
		namespaces;
	if (m || j) {
		namespaces = {
		    
		    //Usernames
		    wckd: "User:Wckd",
		    vec: "User:Vectorgreg",
			tzm: "User:TheZombiemelon",
			tclp: "User:IDontCareAboutHistory",
			dino: "User:IDontCareAboutHistory",
			tulo: "User:ThisUserLikesOreo",
			tile: "User:Tile Denial",
			vampy: "User:7 GRAND UMP",
			ump: "User:7 GRAND UMP",
			game: "User:GamesterD",
			gd: "User:GamesterD",
			lb: "User:GloweySpecs",
			lettuce: "User:GloweySpecs",
			glow: "User:GloweySpecs",
			bp: "User:Ballistic Planet",
			drek: "User:Drek'TharSuperSword",
			jack: "User:Jackninja5DipperGravityFalls",
			cw: "User:CWJ-D",
			prism: "User:PrismastebanZ",
			prismsand: "User:PrismastebanZ/Sandbox",
			prismcss: "User:PrismastebanZ/wikia.css",
			prismarc: "User:PrismastebanZ/Archive",
			lily: "User:Lily8763cp",
			iam: "User:Iamarepeater",
			em: "User:Emeskey",
			weeb: "User:WeebishlyDone",
			tohka: "User:WeebishlyDone",
			kostya: "User:Sapfling",
			sap: "User:Sapfling",
			shark: "User:Sharksurcool",
			slav: "User:Mr slav",
			eek: "User:Eek-ondchips",
			impy: "User:DreamyImpy",
			
			//Usernames inaccessible via QWERTY keyboard
			cnguy: "User:棚客",
		    gwaine:	'Ḡwẵine Ḹٍٍkƨ Ĺiĸe Ͼềлȑềd',
			
			//Misc User Stuff
			msg: "Message Wall:",
			cont: "Special:Contributions/",
			edits: "Special:Editcount",
			blog: "User blog:",
			ss: "Special:SpecialPages",
			rules: "Plants vs. Zombies Wiki:Rules",
			utp: "Plants vs. Zombies Wiki:User treatment policy",
			t: "Template:",
			mw: "MediaWiki:",
			s: "Special:",
			h: "Help:",
			m: "Module:",
			f: "File:",
			u: "User:",
			p: "Plants vs. Zombies Wiki:",
			c: "Category:",
			mu: "Special:MultipleUpload",
			
			//Admin shortcuts
			ban: "Special:Block",
			block: "Special:Block",
			blocked: "Special:BlockList",
			act: "Special:WikiActivity",
			recent: "Special:Recentchanges",
			dash: "Special:AdminDashboard",
			main: "Main Page",
			
			//Hyperlinks for mainspace articles (WIP)
			pvz: "Plants vs. Zombies",
			pvzii: "Plants vs. Zombies 2",
			pvziii: "Plants vs. Zombies 3",
			pvziic: "Plants vs. Zombies 2 (Chinese version)",
			pvzh: "Plants vs. Zombies Heroes",
			pvzgw: "Plants vs. Zombies: Garden Warfare",
			pvzgwii: "Plants vs. Zombies: Garden Warfare 2",
			pvzbfn: "Plants vs. Zombies: Battle for Neighborville",
			bfn: "Plants vs. Zombies: Battle for Neighborville",
			pvzas: "Plants vs. Zombies: All Stars",
			pvzo: "Plants vs. Zombies Online",
			pvza: "Plants vs. Zombies Adventures",
			gwe: "Plants vs. Zombies: Great Wall Edition",
			pvzgwe: "Plants vs. Zombies: Great Wall Edition",
			pvzjttw: "Plants vs. Zombies: Journey to the West",
			jttw: "Plants vs. Zombies: Journey to the West",
			pvzse: "Plants vs. Zombies Social Edition",
			pvziise: "Plants vs. Zombies 2 Social Edition",
			pvzar: "Plants vs. Zombies AR Trading Cards"
			
		};
		if (namespaces.hasOwnProperty(m[1])) {
			$(this).val(namespaces[m[1]] /* + ":" */ + txt.substr(m[1].length + 2));
		}
	}
});

window.MessageBlock = {
  title : 'Block',
  message : 'You have been blocked for $2 for $1',
  autocheck : true
};
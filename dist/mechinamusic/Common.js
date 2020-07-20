/* Any JavaScript here will be loaded for all users on every page load. */
 
/**
 * This script will embed the bandcamp player for the song associated with the current wiki page.
 * I wish there was a better way of doing this but all clever tricks I've tried to lazy-load
 * the iframe contents always fails.
 **/
 
 var Conqueror = {
	'Conqueror_(album)': { isAlbum: true, track: "tracklist=false/artwork=small"},
	'Incipient_Tragoedia': { isAlbum: false, track: "track=805047898" },
	'Pray_To_The_Winds': { isAlbum: false, track: "track=1299775322" },
	'Anti-Theist': { isAlbum: false, track: "track=2464111626" },
	'Non_Serviam': { isAlbum: false, track: "track=342001157" },
	'Error_36_48.58_connection_Lost': { isAlbum: false, track: "track=652607410" },
	'Internecion': { isAlbum: false, track: "track=3245530547" },
	'The_Iron_Law': { isAlbum: false, track: "track=1462185580" },
	'Conqueror': { isAlbum: false, track: "track=2990323524" },
	'AD_Astra': { isAlbum: false, track: "track=2680256367" }
};
var Conqueror_album = {
 id: "2184689055",
 href: "//mechinamusic.bandcamp.com/album/conqueror-i",
 title: "Conqueror [I] by Mechina" 
};
 
var Empyrean = {
	'Empyrean_(album)': { isAlbum: true, track: "tracklist=false/artwork=small"},
	'Aporia': { isAlbum: false, track: "track=4157787640" },
	'Asterion': { isAlbum: false, track: "track=1873091631" },
	'Interregnum': { isAlbum: false, track: "track=391141468" },
	'Imperialus': { isAlbum: false, track: "track=1978380238" },
	'Anathema': { isAlbum: false, track: "track=2364317439" },
	'Catechism': { isAlbum: false, track: "track=2135440429" },
	'Cryostasis_simulation_2632_01': { isAlbum: false, track: "track=1278657935" },
	'Elephtheria': { isAlbum: false, track: "track=1726064803" },
	'Empyrean': { isAlbum: false, track: "track=2052380314" },
	'Infineon': { isAlbum: false, track: "track=445923939" },
	'Terminus': { isAlbum: false, track: "track=1537033598" }
};
var Empyrean_album = {
 id: "2408487884",
 href: "//mechinamusic.bandcamp.com/album/empyrean-ii",
 title: "Empyrean [II] by Mechina" 
};
 
var Xenon = {
	'Xenon_(album)': { isAlbum: true, track: "tracklist=false/artwork=small" },
	'Xenon': { isAlbum: false, track: "track=1792200192" },
	'Alithea': { isAlbum: false, track: "track=1389518557" },
	'Zoticus': { isAlbum: false, track: "track=3691081827" },
	'Terrea': { isAlbum: false, track: "track=4177953009" },
	'Tartarus': { isAlbum: false, track: "track=2767411563" },
	'Phedra': { isAlbum: false, track: "track=2940013524" },
	'Thales': { isAlbum: false, track: "track=3284839242" },
	'Erebus': { isAlbum: false, track: "track=3369811184" },
	'Amyntas': { isAlbum: false, track: "track=1902071639" },
	'Actaeon': { isAlbum: false, track: "track=2145377273" }
}; 
var Xenon_album = {
 id: "3672687867",
 href: "//mechinamusic.bandcamp.com/album/xenon",
 title: "Xenon by Mechina" 
};
 
var Acheron = {
	'Acheron_(album)': { isAlbum: true, track: "tracklist=false/artwork=small" },
	'Proprioception': { isAlbum: false, track: "track=201209383" },
	'Earth-Born_Axiom': { isAlbum: false, track: "track=955368781" },
	'Vanquisher': { isAlbum: false, track: "track=4203340916" },
	'On_the_Wings_of_Nefeli': { isAlbum: false, track: "track=838737331" },
	'The_Halcyon_Purge': { isAlbum: false, track: "track=406967978" },
	'Lethean_Waves': { isAlbum: false, track: "track=3015042442" },
	'Ode_to_the_Forgotten_Few': { isAlbum: false, track: "track=2201382142" },
	'The_Hyperion_Threnody': { isAlbum: false, track: "track=2812461461" },
	'Adrasteia': { isAlbum: false, track: "track=1006890231" },
	'Invictus_Daedalus': { isAlbum: false, track: "track=1833344656" },
	'The_Future_Must_Be_Met': { isAlbum: false, track: "track=2251334092" }
};
var Acheron_album = {
 id: "1102585580",
 href: "//mechinamusic.bandcamp.com/album/acheron",
 title: "Acheron by Mechina" 
};

var Progenitor = {
	'Progenitor_(album)': { isAlbum: true, track: "tracklist=false/artwork=small" },
	'Mass_Locked': { isAlbum: false, track: "track=78832544" },
	'Ashes_of_Old_Earth': { isAlbum: false, track: "track=1664767963" },
	'Starscape': { isAlbum: false, track: "track=3855371924" },
	'Cryoshock': { isAlbum: false, track: "track=2221077178" },
	'The_Horizon_Effect': { isAlbum: false, track: "track=2173402573" },
	'Anagenesis': { isAlbum: false, track: "track=437428071" },
	'Planetfall': { isAlbum: false, track: "track=1921568447" },
	'Progenitor': { isAlbum: false, track: "track=3336625598" },
};
var Progenitor_album = {
 id: "282306111",
 href: "//mechinamusic.bandcamp.com/album/progenitor",
 title: "Progenitor by Mechina" 
};

var Embers = {
	'As_Embers_Turn_To_Dust_(album)': { isAlbum: true, track: "tracklist=false/artwork=small" },
	'Godspeed_Vanguards': { isAlbum: false, track: "track=703069847" },
	'Creation_Level_Event': { isAlbum: false, track: "track=171884146" },
	'Impact_Proxy': { isAlbum: false, track: "track=1229419556" },
	'Aetherion_Rain': { isAlbum: false, track: "track=2653624642" },
	'The_Synesthesia_Signal': { isAlbum: false, track: "track=1698557320" },
	'Unearthing_The_Daedalian_Ancient': { isAlbum: false, track: "track=3569751614" },
	'The_Tellurian_Pathos': { isAlbum: false, track: "track=1884471976" },
	'Thus_Always_To_Tyrants': { isAlbum: false, track: "track=1775134362" },
	'Division_Through_Distance': { isAlbum: false, track: "track=1261592409" },
	'As_Embers_Turn_To_Dust': { isAlbum: false, track: "track=2328308734" },
};
var Embers_album = {
 id: "1968485301",
 href: "//mechinamusic.bandcamp.com/album/as-embers-turn-to-dust",
 title: "As Embers Turn to Dust by Mechina" 
};

var Telesterion = {
	'Telesterion_(album)': { isAlbum: true, track: "tracklist=false/artwork=small" },
	'The_Etimasia': { isAlbum: false, track: "track=33962518" },
	'Realm_Breaker': { isAlbum: false, track: "track=2513922322" },
	'The_Allodynia_Lance': { isAlbum: false, track: "track=697378245" },
	'Tyrannos': { isAlbum: false, track: "track=2311747500" },
	'Gene_Heresy': { isAlbum: false, track: "track=1635967302" },
	'Telesterion': { isAlbum: false, track: "track=1894238399" },
	'The_Archivarius_Chaos_Ritual': { isAlbum: false, track: "track=3884746240" },
	'Homeworld_Salient': { isAlbum: false, track: "track=3748862108" },
};
var Telesterion_album = {
 id: "50964188",
 href: "//mechinamusic.bandcamp.com/album/telesterion",
 title: "Telesterion by Mechina" 
};

var Singles = {
	'Andromeda': { iframe: '<iframe style="border: 0; width: 435px; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/track=584807909/size=small/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="//mechinamusic.bandcamp.com/track/andromeda-2016">Andromeda [2016] by Mechina</a></iframe>' },
	'Cepheus': { iframe: '<iframe style="border: 0; width: 435px; height: 42px;" src="http://bandcamp.com/EmbeddedPlayer/track=1591316019/size=small/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="//mechinamusic.bandcamp.com/track/cepheus-ii-i">Cepheus [II.I] by Mechina</a></iframe>' },
	'To_Coexist_Is_To_Surrender': { iframe: '<iframe style="border: 0; width: 435px; height: 42px;" src="//bandcamp.com/EmbeddedPlayer/track=3472022417/size=small/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="https://mechinamusic.bandcamp.com/track/to-coexist-is-to-surrender">To Coexist is to Surrender by Joe Tiberi, David Holch and Mel Rose</a></iframe>' },
	'The_World_We_Lost': { iframe: '<iframe style="border: 0; width: 435px; height: 42px;" src="//bandcamp.com/EmbeddedPlayer/track=1354372460/size=small/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="https://mechinamusic.bandcamp.com/track/the-world-we-lost">The World We Lost by Mechina</a></iframe>' },
	'Assembly_Of_Tyrants': { iframe: '<iframe style="border: 0; width: 435px; height: 472px;" src="//bandcamp.com/EmbeddedPlayer/album=2260936421/size=large/bgcol=333333/linkcol=0f91ff/artwork=small/transparent=true/" seamless><a href="https://mechinamusic.bandcamp.com/album/the-assembly-of-tyrants">The Assembly of Tyrants by Mechina</a></iframe>' },
	'Tyrannical_Resurrection': { iframe: '<iframe width="300" height="423" src="//media.myspace.com/play/album/tyrannical-resurrection-18291125" frameborder="0" allowtransparency="true" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' }
};
 
var embed, album;
var pageName = mw.config.get('wgPageName');
switch (pageName) {
	case 'Conqueror_(album)':
	case 'Incipient_Tragoedia':
	case 'Pray_To_The_Winds':
	case 'Anti-Theist':
	case 'Non_Serviam':
	case 'Error_36_48.58_connection_Lost':
	case 'Internecion':
	case 'The_Iron_Law':
	case 'Conqueror':
	case 'AD_Astra':
		embed = Conqueror[pageName];
		album = Conqueror_album;
		break;
 
	case 'Empyrean_(album)':
	case 'Aporia':
	case 'Asterion':
	case 'Interregnum':
	case 'Imperialus':
	case 'Anathema':
	case 'Catechism':
	case 'Cryostasis_simulation_2632_01':
	case 'Elephtheria':
	case 'Empyrean':
	case 'Infineon':
	case 'Terminus':
		embed = Empyrean[pageName];
		album = Empyrean_album;
		break;
 
	case 'Xenon_(album)':
	case 'Xenon':
	case 'Alithea':
	case 'Zoticus':
	case 'Terrea':
	case 'Tartarus':
	case 'Phedra':
	case 'Thales':
	case 'Erebus':
	case 'Amyntas':
	case 'Actaeon':
		embed = Xenon[pageName];
		album = Xenon_album;
		break;
 
	case 'Acheron_(album)':
	case 'Proprioception':
	case 'Earth-Born_Axiom':
	case 'Vanquisher':
	case 'On_the_Wings_of_Nefeli':
	case 'The_Halcyon_Purge':
	case 'Lethean_Waves':
	case 'Ode_to_the_Forgotten_Few':
	case 'The_Hyperion_Threnody':
	case 'Adrasteia':
	case 'Invictus_Daedalus':
	case 'The_Future_Must_Be_Met':
		embed = Acheron[pageName];
		album = Acheron_album;
		break;
 
	case 'Progenitor_(album)':
	case 'Mass_Locked':
	case 'Ashes_of_Old_Earth':
	case 'Starscape':
	case 'Cryoshock':
	case 'The_Horizon_Effect':
	case 'Anagenesis':
	case 'Planetfall':
	case 'Progenitor':
		embed = Progenitor[pageName];
		album = Progenitor_album;
		break;
		
    case 'As_Embers_Turn_To_Dust_(album)':
    case 'Godspeed_Vanguards':
    case 'Creation_Level_Event':
    case 'Impact_Proxy':
    case 'Aetherion_Rain':
    case 'The_Synesthesia_Signal':
    case 'Unearthing_The_Daedalian_Ancient':
    case 'The_Tellurian_Pathos':
    case 'Thus_Always_To_Tyrants':
    case 'Division_Through_Distance':
    case 'As_Embers_Turn_To_Dust':
        embed = Embers[pageName];
        album = Embers_album;
        break;
 
 	case 'Telesterion_(album)':
	case 'The_Etimasia':
	case 'Realm_Breaker':
	case 'The_Allodynia_Lance':
	case 'Tyrannos':
	case 'Gene_Heresy':
	case 'Telesterion':
	case 'The_Archivarius_Chaos_Ritual':
	case 'Homeworld_Salient':
	    embed = Telesterion[pageName];
        album = Telesterion_album;
        break;
 
	case 'Assembly_Of_Tyrants':
	case 'Tyrannical_Resurrection':
	case 'Andromeda':
	case 'Cepheus':
	case 'To_Coexist_Is_To_Surrender':
	case 'The_World_We_Lost':
		embed = Singles[pageName];
		break;
 
	default:
		//console.log("no audio player defined for page: " + pageName);
		break;
}
 
if(embed) {
	var iframe = '';
	if(embed.iframe) { //singles
		iframe = embed.iframe;
	}
	else {
		iframe = '<iframe style="border: 0; width: 435px; height: '+(embed.isAlbum ? '120' : '42')+'px;" src="//bandcamp.com/EmbeddedPlayer/album='+album.id+'/size='+(embed.isAlbum ? 'large' : 'small')+'/bgcol=333333/linkcol=0f91ff/'+embed.track+'/transparent=true/" seamless><a href="'+album.href+'">'+album.title+'</a></iframe>';
	}
	//find player tag somehow, I'd like this to be more elegant
	//but I don't know how to create a specific HTML tag which I can "find" here
	var content = document.getElementById('mw-content-text');
	content.innerHTML = iframe + content.innerHTML;
}
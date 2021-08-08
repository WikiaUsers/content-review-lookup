/* Cualquier JavaScript aquí será cargado para todos los usuarios al cargar la página. */
/* Importes (exclusivo para administradores) */
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1)
  importScriptPage('MediaWiki:AjaxRedirect/code.js', 'dev');

// Accesibilidad - Botón de 'Ir al contenido prinipal' - por Usuario:Polymeric
// Permite a los usuarios de teclado saltar todos los enlaces navegatorios e ir
// directamente al contenido de la página, mejorando la experiencia para tanto
// para la gente incapacitada como a los ciegos.

// Añade una id al botón de 'Expandir/colapsar', ya que es el único elemento
// consistente al inicio de cualquier página para usuarios registrados, no
// registrados, y en cualquier versión de la misma (ej. leyendo, editando,
// protegiendo, o viendo el historial).
$('.content-size-toggle').attr('id', 'main-content-start');

// Añade el botón de 'Ir al contenido principal'.
$('body').prepend([
  $('<div>',{ 'class': 'jtc-btn', 'id': 'jumpToContent' }).append([
    $('<a>',{ 'class': 'jtc-link', 'href': '#main-content-start', 'role': 'link', 'tabindex': '0' }).text('Ir al contenido principal')
  ])
]);

/* Audios compartidos de BandCamp. */
/** ART BIG TRACKLIST Hollow Knight OST **/
$("#ArtBigTrackListHollowKnightOST").replaceWith('<iframe style="border: 0; width: 350px; height: 786px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=large/bgcol=333333/linkcol=0f91ff/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/** ART SMALL TRACKLIST Hollow Knight OST **/
$("#ArtSmallTrackListHollowKnightOST").replaceWith('<iframe style="border: 0; width: 400px; height: 472px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=large/bgcol=333333/linkcol=0f91ff/artwork=small/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');
 
/** Canciones individuales. **/
/*** Enter Hallownest  ***/
$("#EnterHallownestPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3085101441/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Dirtmouth  ***/
$("#DirtmouthPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1199110903/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Forgotten Crossroads ***/
$("#CrossroadsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3124010594/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** False Knight  ***/
$("#FalseKnightPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1409821798/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Greenpath ***/
$("#GreenpathPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=645388888/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Hornet ***/
$("#HornetPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3886088546/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Reflection ***/
$("#ReflectionPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3079329828/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Mantis Lords ***/
$("#MantisLordsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3763468112/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** City of Tears ***/
$("#CityOfTearsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2665193936/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Dung Defender ***/
$("#DungDefenderPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3705098204/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Crystal Peak  ***/
$("#CrystalPeakPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2721936729/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Fungal Wastes ***/
$("#FungalWastesPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2947040151/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Decisive Battle ***/
$("#DecisiveBattlePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2999703782/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Soul Sanctum ***/
$("#SoulSanctumPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3816907853/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Resting Grounds ***/
$("#RestingGroundsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3323907551/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Queen's Gardens ***/
$("#QueensGardensPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1002007554/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** The White Lady ***/
$("#TheWhiteLadyPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3532683204/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Broken Vessel ***/
$("#BrokenVesselPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3145211560/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Kingdom's Edge  ***/
$("#KingdomsEdgePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1065575571/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Nosk ***/
$("#NoskPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3746895652/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Dream  ***/
$("#DreamPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=1178149996/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Dream Battle  ***/
$("#DreamBattlePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2806475561/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** White Palace ***/
$("#WhitePalacePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2557202430/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Sealed Vessel  ***/
$("#SealedVesselPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3881230229/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Radiance  ***/
$("#RadiancePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=2158620079/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** Hollow Knight ***/
$("#HollowKnightPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2306704082/size=small/bgcol=333333/linkcol=0f91ff/track=3718668612/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-original-soundtrack">Hollow Knight (Original Soundtrack) by Christopher Larkin</a></iframe>');

/*** White Defender ***/
$("#WhiteDefenderPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1451496582/size=small/bgcol=333333/linkcol=0f91ff/track=2527499866/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hidden-dreams">Hidden Dreams by Christopher Larkin</a></iframe>');

/*** Truth, Beauty and Hatred  ***/
$("#TruthBeautyAndHatredPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=1451496582/size=small/bgcol=333333/linkcol=0f91ff/track=492359097/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hidden-dreams">Hidden Dreams by Christopher Larkin</a></iframe>');

/*** Hive Knight ***/
$("#HiveKnightPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3288527064/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Nightmare Lantern (Interlude) ***/
$("#NightmareLanternPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3349996028/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** The Grimm Troupe ***/
$("#TheGrimmTroupePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=2863003550/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Nightmare King  ***/
$("#NightmareKingPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3448749986/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Dreamers  ***/
$("#DreamersPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=670765265/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Pale Court ***/
$("#PaleCourtPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=4290163330/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Gods and Glory ***/
$("#GodsAndGloryPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3723695169/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Daughter of Hallownest ***/
$("#DaughterOfHallownestPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=480515145/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Godhome ***/
$("#GodhomePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=4290869840/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Sisters of Battle ***/
$("#SistersOfBattlePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=1459334580/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Haunted Foes ***/
$("#HauntedFoesPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=320168263/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Furious Gods ***/
$("#FuriousGodsPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=954056682/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Pure Vessel ***/
$("#PureVesselPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=2141448418/size=small/bgcol=333333/linkcol=0f91ff/track=3088722229/transparent=true/" seamless><a href="http://christopherlarkin.bandcamp.com/album/hollow-knight-gods-nightmares">Hollow Knight: Gods &amp; Nightmares by Christopher Larkin</a></iframe>');

/*** Lace ***/
$("#LacePlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=3074030884/size=small/bgcol=ffffff/linkcol=0687f5/track=3278088052/transparent=true/" seamless><a href="https://christopherlarkin.bandcamp.com/album/hollow-knight-silksong-ost-sample">Hollow Knight: Silksong (OST Sample) by Christopher Larkin</a></iframe>');

/*** Bonebottom ***/
$("#BonebottomPlayer").replaceWith('<iframe style="border: 0; width: 100%; height: 42px;" src="https://bandcamp.com/EmbeddedPlayer/album=3074030884/size=small/bgcol=ffffff/linkcol=0687f5/track=979710051/transparent=true/" seamless><a href="https://christopherlarkin.bandcamp.com/album/hollow-knight-silksong-ost-sample">Hollow Knight: Silksong (OST Sample) by Christopher Larkin</a></iframe>');

/* Allow direct link to tabber content (https://community.fandom.com/wiki/Thread:790781) */
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

/* Special:Upload template preload. */
var matches = window.location.href.match(/wpForReUpload/);

if( matches && matches.length ) {
	var mwct;
} else {
	$("#mw-content-text #mw-upload-form fieldset #mw-htmlform-description tbody .mw-htmlform-field-HTMLTextAreaField .mw-input #wpUploadDescription").html("{{infobox file\n|description = \n|source      = \n}}\n\n[[Category:]]");
	$("#mw-upload-form fieldset table#mw-htmlform-description tbody tr.mw-htmlform-field-Licenses").hide();
}
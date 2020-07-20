/**
 * Mark admins and bureaucrats
 */
setInterval(function () {
    "use strict";
        if (this.innerHTML.match(/Blix_Caliber/)) {
            $(this).parent().addClass('bureaucrat');
        }
        if (this.innerHTML.match(/Callofduty4|Cpl.Bohater|Deltaneos|Eulalia459678|KATANAGOD|Leviathan_89|Nifky|RansomTime|Sactage|Sulfur|TK-999|TyA|VegaDark/)) {
            $(this).parent().addClass('vstf');
        }
    });
}, 1);

 /*Chat Party - by ShermanTheMythran Modified by Lil' Trunks*/
var partyLink1 =
"https://images.wikia.nocookie.net/newzcsftest/images/9/91/ShaneDawson_-_Freaky-Deeky_Dancing.ogg"; //link to first song in ogg
 
var partyLinkIE1 =
"https://images.wikia.nocookie.net/newzcsftest/images/9/91/ShaneDawson_-_Freaky-Deeky_Dancing.ogg"; //link to first song in mp3
 
var partyLinkText1 =
"Freaky-deeky Dancing - Shane Dawson"; //text for first song
 
var partyLink2 =
"https://images.wikia.nocookie.net/newzcsftest/images/6/63/Business_Cat.ogg"; //link to second song in ogg
 
var partyLinkIE2 =
"https://images.wikia.nocookie.net/newzcsftest/images/6/63/Business_Cat.ogg"; //link to second song in mp3
 
var partyLinkText2 =
"Business Cat - Weebl"; //text for second song
 
var partyLink3 =
"https://images.wikia.nocookie.net/newzcsftest/images/8/8b/Gangnam_Style_Official_Music_Video_-_2012_PSY_with_Oppan_Lyrics_MP3_Download.ogg"; //link to third song in ogg
 
var partyLinkIE3 =
"https://images.wikia.nocookie.net/newzcsftest/images/8/8b/Gangnam_Style_Official_Music_Video_-_2012_PSY_with_Oppan_Lyrics_MP3_Download.ogg"; //link to third song in ogg
 
var partyLinkText3 =
"Gangnam Style - Psy"; //text for third song
 
importScriptPage('MediaWiki:ChatParty.js','zcrushersstrikeforce');
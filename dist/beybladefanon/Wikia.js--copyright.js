// 14:32, November 25, 2011 (UTC)
//<source lang="JavaScript">

// Create a section on the WikiaRail to display the copyright notice.

if ( wgNamespaceNumber != undefined && !window.atwCopy ) {
        addOnloadHook( addATWCopy );
}
 
var atwCopy = true;
 
function addATWCopy () {
    $('<section class="CopyrightNotice module"><h1 style="margin-top:0px; margin-bottom:10px;">Role Play Guidelines</h1><div><p style="text-align:justify;">Referees are to follow the referee guidelines. Battlers are to follow the battler guidelines. Battles in which either guidelie are not followed will be nulled and voided.<br style="margin-bottom: 10px;"/> &bull; <a href="http://beybladefanon.wikia.com/wiki/Project:Referee_Guidelines" target="_blank">Read the Referee Guidelines</a>.<br />&bull; <a href="http://beybladefanon.wikia.com/wiki/Project:Battler_Guidelines" target="_blank">Read the Battler Guidelines</a>.</p></div></section>').insertBefore('.LatestPhotosModule');
}

// </source>
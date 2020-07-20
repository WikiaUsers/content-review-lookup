// 14:32, November 25, 2011 (UTC)
//<source lang="JavaScript">

// Create a section on the WikiaRail to display the notice.

if ( wgNamespaceNumber != undefined && !window.atwCopy ) {
        addOnloadHook( addATWCopy );
}
 
var atwCopy = true;
 
function addATWCopy () {
    $('<section class="Notice module"><h1 style="margin-top:0px; margin-bottom:10px;">Brick Critics Notice</h1><div><p style="text-align:justify;">Welcome to {{SITENAME}} the online and free LEGO Reviewipedia! You can <a href="http://legocritics/wiki/Special:CreatePage" target="_blank">Create a Review</a> and read other reviews! If you see any vandilism please contact Bob Bricks <a href="http://legocritics/wiki/Message_Wall:Bob_Bricks" target="_blank">here</a>.</p></div></section>').insertAfter('.LatestPhotosModule');
}

// </source>
/* **************************** */
/* *** Reorganizing buttons *** */
/* **************************** */

/* Edit button stuff */
$('.WikiaPageHeader .wikia-menu-button a').html('Edit').addClass('wikia-button');
$('.ns-talk .wikia-menu-button [data-id=edit]').appendTo('.ns-talk .WikiaPageHeader');
$('.ns-talk .WikiaPageHeader>[data-id=edit]').addClass('wikia-button').attr('style','float:right; margin-right:10px');
$('.ns-talk .wikia-menu-button [data-id=addtopic]').html('Add section');

function MoveEditButton() {
	$('#WikiaPageHeader').prepend('<div id="wikia-buttons"></div>');
	$('.wikia-menu-button a:first').appendTo('#wikia-buttons').addClass('wikia-button');
	$('#WikiaPageHeader .comments a').appendTo('#wikia-buttons').addClass('wikia-button');
	$('#wikia-buttons').append('<a href="/index.php?title=' + wgPageName + '&action=history" data-id="history" class="wikia-button">History</a>')
	$('[data-id="move"]').appendTo('#wikia-buttons');
		$('[data-id="move"]').addClass('wikia-button').html('Move');
	$('.WikiaPageHeader .wikia-menu-button').remove();
	$('#wikia-buttons').append('<a href="/index.php?title=' + wgPageName + '&action=protect" data-id="protect" class="wikia-button">Protect</a>');
	$('#wikia-buttons').append('<a href="/index.php?title=' + wgPageName + '&action=delete" data-id="delete" class="wikia-button">Delete</a>');
	$('.WikiHeader div.buttons').remove();
}

addOnloadHook(MoveEditButton);

$(function () {
  /* Adding sidebar */
  $('header.WikiaHeader').after('<div id="mw-sidebar" style=""><a href="/wiki/Special:RecentChanges" class="sidebar-button" id="mw-sb-RC">Changes</a><a href="/wiki/Special:WikiActivity" class="sidebar-button" id="mw-sb-WA">Wiki Activity</a><a href="/wiki/WBVDKT_Wiki" class="sidebar-button" id="mw-sb-WBVDKT">WBVDKT</a><a href="/wiki/Special:Random" class="sidebar-button" id="mw-sb-RP">Random page</a><a href="/wiki/WBVDKT_Wiki"><img id="wiki-avatar" src="https://images.wikia.nocookie.net/__cb20091218201144/wbvdkt/images/8/8f/Wiki-Preview.png"></a><h1 class="secondary"></h1><div class="WikiaRailContainer"></div><h1 class="secondary"></h1><div class="sidebar-links"><div class="mw-cb" id="mw-cb1" title="Click to expand or collapse"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class="mw-sb-chevron" id="mw-ci1">Navigation</div><div id="mw-cs1"><a href="http://wbvdkt.wikia.com/wiki/WBVDKT_Wiki" class="mw-sidebar-menuparent" id="mw-sidebar-menuILparent">WBVDKT<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"><div class="mw-sidebar-menucontainer" id="mw-sidebar-menuILcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menuIL"><a href="/wiki/List_of_civilizations" class="mw-sidebar-submenuparent" id="mw-sidebar-submenuCIVSparent">List of civs<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class=""></a><div class="mw-sidebar-submenucontainer" id="mw-sidebar-submenuCIVScontainer"><ul class="mw-sidebar-submenu" id="mw-sidebar-submenuCIVS"><a href="/wiki/Trade_Emergency_Coalition">Techia</a><a href="/wiki/Gammetan_Civilization">Gammeta</a><a href="/wiki/BlyDonian_Civilization">BlyDonian</a><a href="/wiki/Manaki">Manaki</a><a href="/wiki/Bion_Federation">Bion</a></ul></div><a href="/wiki/List_of_planets">List of planets</a><a href="/wiki/Capita_Council">Capita Council</a><a href="/wiki/File:Map-Appearence-systems_(civ).png">Map</a><a href="/wiki/2012">Year</a></ul></div></a><a href="http://wbvdkt.wikia.com/wiki/WBVDKT_Wiki:Manual_of_Style" class="mw-sidebar-menuparent" id="mw-sidebar-menuWBVDKTparent">Manual of Style<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"><div class="mw-sidebar-menucontainer" id="mw-sidebar-menuWBVDKTcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menuWBVDKT"><a href="/wiki/WBVDKT_Wiki:Article_classification">WW:Class</a><a href="/wiki/WBVDKT_Wiki:Edit_summaries">WW:Summary</a><a href="/wiki/WBVDKT_Wiki:Image_placement">WW:Image</a><a href="/wiki/WBVDKT_Wiki:Tense">WW:Tense</a></ul></div></a><a href="http://wbvdkt.wikia.com/wiki/2012/07" class="mw-sidebar-menuparent" id="mw-sidebar-menuCEparent">Current events<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"><div class="mw-sidebar-menucontainer" id="mw-sidebar-menuCEcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menuCE"><a href="/wiki/2012/08" style="border-bottom-width: 2px">August 2012</a><a href="/wiki/2012/06">June 2012</a><a href="/wiki/2012/05">May 2012</a><a href="/wiki/2012/04">April 2012</a></ul></div></a><a href="http://wbvdkt.wikia.com/wiki/Special:Random" class="mw-sidebar-menuparent" id="mw-sidebar-menurandomparent">Random page<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"><div class="mw-sidebar-menucontainer" id="mw-sidebar-menurandomcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menurandom"><a href="/wiki/Special:Random/file">file</a><a href="/wiki/Special:Random/talk">talk page</a><a href="/wiki/Special:Random/template">template</a><a href="/wiki/Special:Random/archive">archive</a></ul></div></a></div></div><h1 class="secondary"></h1><div class="sidebar-links"><div class="mw-cb" id="mw-cb2" title="Click to expand or collapse"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class="mw-sb-chevron" id="mw-ci2">Interaction</div><div id="mw-cs2"><a href="/wiki/MediaWiki:CreatePage" class="mw-sidebar-menuparent" id="mw-sidebar-menunewparent">New...<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"></a><div class="mw-sidebar-menucontainer" id="mw-sidebar-menunewcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menunew"><a href="/wiki/Special:CreatePage">page</a><a href="/wiki/Special:CreateBlogPage">blog</a><a href="/wiki/Special:Upload">file</a><a href="/wiki/Special:NewFiles">list files</a></ul></div><a href="http://wbvdkt.wikia.com/wiki/Category:Requested_article" class="mw-sidebar-menuparent" id="mw-sidebar-menurepparent">Maintenance<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"></a><div class="mw-sidebar-menucontainer" id="mw-sidebar-menurepcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menurep"><a href="/wiki/Category:Class_U_overall" class="mw-sidebar-submenuparent" id="mw-sidebar-submenuUparent">Class U<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class=""></a><div class="mw-sidebar-submenucontainer" id="mw-sidebar-submenuUcontainer"><ul class="mw-sidebar-submenu" id="mw-sidebar-submenuU"><a href="/wiki/Category:Class_U_overall">Overall</a><a href="/wiki/Category:Class_U_infobox">Infobox</a><a href="/wiki/Category:Class_U_layout_and_formatting">Layout</a><a href="/wiki/Category:Class_U_written_quality">Written</a><a href="/wiki/Category:Class_U_content_quantity">Quantity</a><a href="/wiki/Category:Class_U_graphology">Graphology</a></ul></div><a href="/wiki/Category:Incomplete_article">Incomplete</a><a href="/wiki/Category:Draft_article">Drafts</a><a href="/wiki/Category:Rewrite_article">Rewrite</a><a href="/wiki/Category:Requested_article">More</a></ul></div></div></div><h1 class="secondary"></h1><div class="sidebar-links"><div class="mw-cb" id="mw-cb3" title="Click to expand or collapse"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class="mw-sb-chevron" id="mw-ci3">This page</div><div id="mw-cs3"><a href="/wiki/Special:WhatLinksHere/' + wgPageName + '">WTF links here?</a><a href="/index.php?title=' + wgPageName + '&diff=cur&oldid=prev">WTF did the last edit do?</a><a style="cursor: pointer;" class="mw-sidebar-menuparent" id="mw-sidebar-menuactionsparent">WTF can I do?<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"></a><div class="mw-sidebar-menucontainer" id="mw-sidebar-menuactionscontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menuactions"><a href="" id="mw-submenuactions-edit">Edit</a><a href="" id="mw-submenuactions-history">History</a><a href="" id="mw-submenuactions-move">Move</a><a href="" id="mw-submenuactions-protect">Protect</a><a href="" id="mw-submenuactions-delete">Delete</a></ul></div></div></div><h1 class="secondary"></h1><div class="sidebar-links"><div class="mw-cb" id="mw-cb4" title="Click to expand or collapse"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class="mw-sb-chevron" id="mw-ci4">Utility</div><div id="mw-cs4"><a href="/wiki/Forum:Index">Forums</a><a href="/wiki/MediaWiki:FlexibleWidth" class="mw-sidebar-menuparent" id="mw-sidebar-menuFWparent">Flexible width<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"></a><div class="mw-sidebar-menucontainer" id="mw-sidebar-menuFWcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menuFW"><a href="/wiki/WBVDKT_Wiki:Flexible_width_release_history">history</a><a href="/wiki/WBVDKT_Wiki:Flexible_width_release_plans">plans</a><a href="/wiki/Special:MyPage/wikia.css">my CSS</a><a href="/wiki/Special:MyPage/wikia.js">my JS</a><a href="/wiki/Special:MyPage/wikia.js?action=edit">change skin</a></ul></div><a href="/wiki/Special:SpecialPages" class="mw-sidebar-menuparent" id="mw-sidebar-menuspecialparent">Special pages<img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10"></a><div class="mw-sidebar-menucontainer" id="mw-sidebar-menuspecialcontainer"><ul class="mw-sidebar-menu" id="mw-sidebar-menuspecial"><a href="/wiki/Special:AllPages">all pages</a><a href="/wiki/Special:ListUsers/sysop">admins</a><a href="/wiki/Special:LongPages">longest</a></ul></div></div></div><h1 class="secondary"></h1><div class="sidebar-links"><div class="mw-cb" id="mw-cb5" title="Click to expand or collapse"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png" width="5" height="10" class="mw-sb-chevron" id="mw-ci5">Attribution</div><div id="mw-cs5">Powered by<a href="http://www.mediawiki.org/wiki/MediaWiki">MediaWiki 1.16.5</a>Hosted by<a href="http://www.wikia.com/Wikia">Wikia</a>Optimized<a href="/wiki/WBVDKT_Wiki:Flexible_width_release_history">Flexible width 2.9.7.3</a></div></div></div>');

  /* Copying links from action buttons to sidebar action menu */
  $('#mw-submenuactions-edit').attr('href',$('[data-id=edit]').attr('href'));
  $('#mw-submenuactions-history').attr('href',$('[data-id=history]').attr('href'));
  $('#mw-submenuactions-move').attr('href',$('[data-id=move]').attr('href'));
  $('#mw-submenuactions-protect').attr('href',$('[data-id=protect]').attr('href'));
  $('#mw-submenuactions-delete').attr('href',$('[data-id=delete]').attr('href'));

  /* Sidebar submenu stuff */
  $('div.mw-sidebar-menucontainer a.mw-sidebar-menuparent').remove(); 
  $('ul.mw-sidebar-menu a.mw-sidebar-menuparent').remove();
 
  /* Moving search bar in to sidebar (wikiGymnastics here!) */
  $('.WikiaSearch').appendTo('#mw-sidebar div.WikiaRailContainer');
  $('.WikiHeader > .WikiaSearch').appendTo('#mw-sidebar div.WikiaRailContainer');

  /* If the WikiaRailContainer is empty, then it inserts a sidebar */
  if($('.WikiaRailContainer').html() == '') {$('.WikiaRailContainer').append('<form id="WikiaSearch" class="WikiaSearch" action="index.php?title=Special:Search" method="get"><input type="text" name="search" placeholder="Search this wiki" autocomplete="off" accesskey="f" value=""><input type="hidden" name="fulltext" value="0"><input type="submit"><button class="secondary"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="sprite search" height="17" width="21"></button><div id="AutocompleteContainter_1318288258239" style="position: absolute; top: 21px; left: 0px; "><div class="autocomplete-w1"><div class="autocomplete" id="Autocomplete_1318288258239" style="max-height: 1000px; display: none; "></div></div></div></form>');}

  /* If there is a #WikiaRail in #WikiaPageHeader, then move it to .WikiaRailContainer. This combined with the above will make two searchbars, but whatever */
  $('#WikiaPageHeader > #WikiaSearch').appendTo('.WikiaRailContainer')
  $('.WikiaRail').remove()

  /* Removing search bar class on articles */
  $('.WikiaSearch button.wikia-button').removeClass('wikia-button')

  /* AAAAAAAAAARRRRRRRRRRRRGGGGGGGGGGGGHHHHHHHHHHH */
  $('.shadow-mask').remove();
  
  /* Removing Admin Dashboard */
  $('header#AdminDashboardHeader').remove();
  $('nav#AdminDashboardTabs').remove();

  /* Page title fixes for non-articles */
  $('#WikiaPageHeader h1 strong').remove();
  $('.ns--1 #WikiaPageHeader h1').prepend('Special:');
  $('.ns-1 #WikiaPageHeader h1').prepend('Talk:');
  $('.ns-5 #WikiaPageHeader h1').prepend('WBVDKT Wiki talk:');
  $('.ns-6 #WikiaPageHeader h1').prepend('File:');
  $('.ns-7 #WikiaPageHeader h1').prepend('File talk:');
  $('.ns-8 #WikiaPageHeader h1').prepend('MediaWiki:');
  $('.ns-9 #WikiaPageHeader h1').prepend('MediaWiki talk:');
  $('.ns-10 #WikiaPageHeader h1').prepend('Template:');
  $('.ns-11 #WikiaPageHeader h1').prepend('Template talk:');
  $('.ns-14 #WikiaPageHeader h1').prepend('Category:');
  $('.ns-15 #WikiaPageHeader h1').prepend('Category talk:');
  $('.ns-110 #WikiaPageHeader h1').prepend('Forum:');
  $('.ns-113 #WikiaPageHeader h1').prepend('Archive talk:');

  /* Kill WikiaHeader */
  $('#WikiaHeader').remove();

  /* Kill everything in WikiHeader */
  $('#WikiHeader *').remove();

  /* Stuff in WikiHeader */
  $('#WikiHeader').prepend('<div id="mw-accountnavigation"></div>');
     $('#mw-accountnavigation').prepend('<a href="/wiki/User:'+ wgUserName +'">'+ wgUserName +'</a>');
     $('#mw-accountnavigation').prepend('<a href="/wiki/User_talk:'+ wgUserName +'">Talk</a>');
     $('#mw-accountnavigation').prepend('<a href="/wiki/Special:Preferences">Settings</a>');
     $('#mw-accountnavigation').prepend('<a href="/wiki/Special:Contributions/'+ wgUserName +'">Contribs</a>');
     $('#mw-accountnavigation').prepend('<a href="/wiki/Special:UserLogout?returnto='+ wgPageName +'">Logout</a>');
     $('#wikia-buttons').appendTo('#WikiHeader');

  /* Kill flexible width ad (this -is- flexible width skin) */
  $('#FWad').remove();

  /* Kill mobile CSS */
  $('head link[media="screen"]').remove();
});

/* Readding talk page edit count */
$('span.commentsbubble').appendTo('a[accesskey=t]');

/* search button */
$('img.sprite.search').attr('src', 'https://images.wikia.nocookie.net/wbvdkt/images/4/44/Wiki-search.png');

/* ToC */
$('.toctoggle').insertAfter('#toctitle').html('<a id="togglelink" class="internal" rel="nofollow" href="javascript:toggleToc()">show/hide</a>');

/* Sidebar expand/collapse buttons */
$(document).ready(function(){
  $('div#mw-cb1').click(function(){
    $('div#mw-cs1').toggleClass('mw-sb-hidden');
    $('img#mw-ci1').toggleClass('mw-sb-rotate');
  });
  $('div#mw-cb2').click(function(){
    $('div#mw-cs2').toggleClass('mw-sb-hidden');
    $('img#mw-ci2').toggleClass('mw-sb-rotate');
  });
  $('div#mw-cb3').click(function(){
    $('div#mw-cs3').toggleClass('mw-sb-hidden');
    $('img#mw-ci3').toggleClass('mw-sb-rotate');
  });
  $('div#mw-cb4').click(function(){
    $('div#mw-cs4').toggleClass('mw-sb-hidden');
    $('img#mw-ci4').toggleClass('mw-sb-rotate');
  });
  $('div#mw-cb5').click(function(){
    $('div#mw-cs5').toggleClass('mw-sb-hidden');
    $('img#mw-ci5').toggleClass('mw-sb-rotate');
  });
  $('a#mw-sidebar-menuWBVDKTparent').hover(function(){
    $('#mw-sidebar-menuWBVDKT').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuWBVDKTparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menuWBVDKT').hover(function(){
    $('#mw-sidebar-menuWBVDKT').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuWBVDKTparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-menurandomparent').hover(function(){
    $('#mw-sidebar-menurandom').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menurandomparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menurandom').hover(function(){
    $('#mw-sidebar-menurandom').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menrandomuparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-menuILparent').hover(function(){
    $('#mw-sidebar-menuIL').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuILparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menuIL').hover(function(){
    $('#mw-sidebar-menuIL').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuILparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-menuCEparent').hover(function(){
    $('#mw-sidebar-menuCE').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuCEparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menuCE').hover(function(){
    $('#mw-sidebar-menuCE').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuCEparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-submenuCIVSparent').hover(function(){
    $('#mw-sidebar-menuIL').toggleClass('mw-sidebar-submenu-open');
    $('#mw-sidebar-submenuCIVSparent img').toggleClass('mw-sidebar-menuimg-rotate');
  });
  $('ul#mw-sidebar-submenuCIVS').hover(function(){
    $('#mw-sidebar-menuIL').toggleClass('mw-sidebar-submenu-open');
    $('#mw-sidebar-submenuCIVSparent img').toggleClass('mw-sidebar-menuimg-rotate');
  });
  $('a#mw-sidebar-menuFWparent').hover(function(){
    $('#mw-sidebar-menuFW').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuFWparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menuFW').hover(function(){
    $('#mw-sidebar-menuFW').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuFWparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-menuspecialparent').hover(function(){
    $('#mw-sidebar-menuspecial').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuspecialparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menuspecial').hover(function(){
    $('#mw-sidebar-menuspecial').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuspecialparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-menunewparent').hover(function(){
    $('#mw-sidebar-menunew').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menunewparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menunew').hover(function(){
    $('#mw-sidebar-menunew').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menunewparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-submenuUparent').hover(function(){
    $('#mw-sidebar-menurep').toggleClass('mw-sidebar-submenu-open');
    $('#mw-sidebar-submenuUparent img').toggleClass('mw-sidebar-menuimg-rotate');
  });
  $('ul#mw-sidebar-submenuU').hover(function(){
    $('#mw-sidebar-menurep').toggleClass('mw-sidebar-submenu-open');
    $('#mw-sidebar-submenuUparent img').toggleClass('mw-sidebar-menuimg-rotate');
  });
  $('a#mw-sidebar-menurepparent').hover(function(){
    $('#mw-sidebar-menurep').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menurepparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menurep').hover(function(){
    $('#mw-sidebar-menurep').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menurepparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('a#mw-sidebar-menuactionsparent').hover(function(){
    $('#mw-sidebar-menuactions').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuactionsparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
  $('ul#mw-sidebar-menuactions').hover(function(){
    $('#mw-sidebar-menuactions').toggleClass('mw-sidebar-menu-open');
    $('#mw-sidebar-menuactionsparent img').toggleClass('mw-sidebar-menuimg-rotate')
  });
});  

/* *********************** */
/* *** EDIT PAGE STUFF *** */
/* *********************** */
$(function () {
	$('#editform').after('<div id="fw-editpreviewcontainer" style="min-height: 100px; margin-top: -61px;"></div>');
	$('#EditPageDialog').attr('style','');
	$('.cke_toolbar_mode_switch').appendTo('#EditPageToolbar');
	$('.cke_toolbar_mode_switch .cke_button_ModeSource a span.cke_icon').html('Source');
	$('.cke_toolbar_mode_switch .cke_button_ModeWysiwyg a span.cke_icon').html('Visual');
});

/* Button functions */
$(document).ready(function(){
	$('a#wpPreview').click(function(){
		$('div#fw-editpreviewcontainer').html('').attr('style','margin-top: -81px;');
	 	$('section#EditPageDialog').prependTo('div#fw-editpreviewcontainer').attr('style','');
		$('div.blackout').remove();
  	});
	$('a#wpDiff').click(function(){
		$('div#fw-editpreviewcontainer').html('').attr('style','margin-top: -81px;');
	 	$('section#EditPageDialog').prependTo('div#fw-editpreviewcontainer').attr('style','');
		$('div.blackout').remove();
	});
});
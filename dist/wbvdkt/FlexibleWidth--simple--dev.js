$(function () {
	$('#mw-sidebar').addClass('sm-sidebar')
	// Cleanup stuff (id est remove)
	$('header#AdminDashboardHeader').remove();
	$('nav#AdminDashboardTabs').remove();
	$('#WikiaHeader').remove();
	$('#mw-accountnavigation').remove();
	// New stuff
	$('.sm-sidebar').after('<!-- main --><div class="sm-main"></div>').before('<!-- sidebar -->');
	$('header#WikiHeader').appendTo('.sm-main').addClass('sm-header');
	$('article#WikiaMainContent').appendTo('.sm-main').addClass('sm-article');
	$('section#WikiaPage').remove();
	$('header#WikiaPageHeader').addClass('sm-articleheader');
	// Compacting sidebar
	$('<a href="/wiki/Special:RecentChanges">Recent changes</a>').appendTo('div#mw-cs1');
	$('<a href="/wiki/Special:WikiActivity">Wiki activity</a>').appendTo('div#mw-cs1');
	$('a#mw-sb-RC').remove();
	$('a#mw-sb-WA').remove();
	$('a#mw-sb-RP').remove();
	// Header stuff
		$('.sm-header').append('<a style="float:right;margin-left:10px;" class="wikia-button" id="sm-actionbutton-menu"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png"></a><div id="sm-header-menucontainer" style="float: right; width: 1px;"><ul id="sm-header-menu"></ul></div>');
		$('.wikia-button:contains(Delete)').appendTo('#sm-header-menu').attr('id', 'sm-actionbutton-delete');
		$('.wikia-button:contains(Protect)').appendTo('#sm-header-menu').attr('id', 'sm-actionbutton-protect');
		$('.wikia-button:contains(Move)').appendTo('#sm-header-menu').attr('id', 'sm-actionbutton-move');
		$('.wikia-button:contains(History)').appendTo('.sm-header').attr('id', 'sm-actionbutton-history').attr('style', 'float: right; margin-left: 10px;');
		$('[data-id=comment]:contains(Talk)').appendTo('.sm-header').addClass('wikia-button').attr('id', 'sm-actionbutton-talk').attr('style', 'margin-left: 10px').before('<a href="/wiki/' + wgPageName +'" id="sm-actionbutton-article" class="wikia-button">Article</a>');
		$('[data-id=edit]:contains(Edit)').appendTo('.sm-header').addClass('wikia-button').attr('style', 'float:right;margin-left:10px').attr('id', 'sm-actionbutton-edit');
		$('#wikia-buttons').remove();
		// talk pages
		$('a:contains(Back to page)').appendTo('.sm-header').addClass('wikia-button').attr('id', 'sm-actionbutton-article').html('Article').after('<a href="/wiki/' + wgPageName + '" style="margin-left:10px;" id="sm-actionbutton-talkpage" class="wikia-button">Talk</a>');
		$('.sm-header').append('<a href="/wiki/'+ wgPageName +'" id="sm-actionbutton-read" style="float:right;margin-left:10px;" class="wikia-button">Read</a>')
		$('a[data-id=addtopic]:contains(Add section)').appendTo('.sm-header').attr('id', 'sm-actionbutton-addsection').attr('style', 'float:right;').addClass('wikia-button');
		$('#sm-header-menu').append('<a id="sm-actionbutton-fixwidth" class="wikia-button">Fix width</a>');
		// account navigation
		$('#sm-actionbutton-menu').before('<a style="float: right; border-top-left-radius: 0; border-left: 1px solid #cce;" class="wikia-button" id="sm-userbutton-menu"><img src="https://images.wikia.nocookie.net/wbvdkt/images/0/01/Icon-chevron-full.png"></a><div id="sm-header-usermenucontainer" style="float: right; width: 1px;"><ul id="sm-header-usermenu"></ul></div>');
		$('#sm-header-usermenu').append('<a href="/wiki/User_talk:'+ wgUserName +'" class="wikia-button" style="float: right; margin-left: 10px;" id="sm-userbutton-talk">Talk</a>');
		$('#sm-header-usermenu').append('<a href="/wiki/Special:Preferences" class="wikia-button" style="float: right; margin-left: 10px;" id="sm-userbutton-preferences">Preferences</a>');
		$('#sm-header-usermenu').append('<a href="/wiki/Special:Contributions/'+ wgUserName +'" class="wikia-button" style="float: right; margin-left: 10px;" id="sm-userbutton-contribs">Contribs</a>');
		$('#sm-header-usermenu').append('<a href="/wiki/Special:UserLogout?returnto='+ wgPageName +'" class="wikia-button" style="float: right; margin-left: 10px;" id="sm-userbutton-logout">Log out</a>');
		$('#sm-actionbutton-menu').before('<a href="/wiki/User:'+ wgUserName +'" class="wikia-button" id="sm-userbutton-user" style="float: right; margin-left: 10px; border-top-right-radius: 0;">User</a>');
		// header background
		$('.sm-main').after('<!-- cover --><div class="sm-cover"></div>');
		// enabling edit button
		$('#wpSave').removeAttr('disabled');

		// editor
		$('.editor #sm-actionbutton-read').before('<a href="/wiki/' + wgPageName + '?action=edit" data-id="edit" class="wikia-button" style="float:right;margin-left:10px" id="sm-actionbutton-edit">Edit</a>')
		$('.editor #sm-actionbutton-edit').before('<a href="/wiki/' + wgPageName +'" id="sm-actionbutton-article" class="wikia-button">Article</a>')
});


/* Getting the actionbuttonmenu to collapse/expand and some more toggle-ables */
$(document).ready(function(){
  $('a#sm-actionbutton-menu').hover(function(){
    $('ul#sm-header-menu').toggleClass('sm-header-menu-open');
    $('#sm-actionbutton-menu img').toggleClass('sm-actionbutton-graphic-rotate');
  });
  $('ul#sm-header-menu').hover(function(){
    $('ul#sm-header-menu').toggleClass('sm-header-menu-open');
    $('#sm-actionbutton-menu img').toggleClass('sm-actionbutton-graphic-rotate');
  });
  $('a#sm-userbutton-menu').hover(function(){
    $('ul#sm-header-usermenu').toggleClass('sm-header-usermenu-open');
    $('#sm-userbutton-menu img').toggleClass('sm-actionbutton-graphic-rotate');
  });
  $('ul#sm-header-usermenu').hover(function(){
    $('ul#sm-header-usermenu').toggleClass('sm-header-usermenu-open');
    $('#sm-userbutton-menu img').toggleClass('sm-actionbutton-graphic-rotate');
  });
  $('a#sm-actionbutton-fixwidth').click(function(){
    $('.sm-main').toggleClass('sm-main-fixwidth');
    $('a#sm-actionbutton-fixwidth').toggleClass('sm-actionbutton-fixwidth-pressed');
  });
});
 $(function() {
  /* Gallery Button */
   if($('#showgallerybutton').length) {
    $('.wikinav2 .WikiaPageHeader > .comments[data-id]').before('<a class="wikia-button comments secondary" href="/wiki/'+ encodeURIComponent(wgPageName) + "/Gallery" +'" title="Photo gallery"><img src="https://images.wikia.nocookie.net/vestroia/pl/images/7/74/Galeria.png" style="vertical-align:middle;" /> Gallery</a>');
  }
  
 });
  
  
  
  
  /*Search Enhancements - by ShermanTheMythran (special thanks to Lunarity)*/
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Search this wiki');
mediaWiki.loader.load('jquery.ui.core', null, true);
mediaWiki.loader.using('jquery.ui.core', function() {
	"use strict";
	$('body').on('keypress.WikiaSearchHack', function(ev) {
		if (ev.ctrlKey || ev.altKey || ev.metaKey || !ev.which || $(ev.target).is(':focusable')) { return; }
		ev.preventDefault();
		var $box = $('#WikiaSearch > input[type="text"]').focus();
		$box.val($box.val() + (ev.key || String.fromCharCode(ev.charCode))); }
	); }
);
 
$('.scroll-bottom').click(function() {
	$(this).parents('html, body').animate({scrollTop: $(document).height()}, 'slow'); }
);
 
/*Easy Dropdown Buttons - by ShermanTheMythran (special thanks to Mathmagician)*/
$('.drop-button').click(function() {
	var buttonToggle = $(this).children();
	buttonToggle.toggle();
	$(this).toggleClass('active'); }
);
  
 
/*Various Fixes - by ShermanTheMythran*/
$('html.client-js').addClass(wgUserName);
$('.subnav-2a[data-canonical="newfiles"]').html('New Files');
$('.WikiNav .subnav-3').parent().addClass('parent');
$('#wpSave').click(function() {
	$(this).attr('value','Publishing...'); }
);
 
/*LUSW-only Fixes*/
$('#mainpage-slider a:not(.wikia-button)').removeAttr('href');
$('#info').append('<a href="/wiki/Template:Info/doc" target="_blank" id="info-help" title="click for help" style="border: 1px solid silver; color: silver; border-radius: 8px; font-size: 6pt; text-align: center; width: 10px; height: 10px; line-height: 12px; padding: 1px; position: absolute; right: 5px; margin-top: -22px; cursor: help; transition: border-color .5s, color .5s; -moz-transition: border-color .5s, color .5s; -webkit-transition: border-color .5s, color .5s; -o-transition: border-color .5s, color .5s; opacity: 1; filter: alpha(opacity=100);">?</a>');
$('.ns-0 figure.thumb').remove();
$('.shortcut > a').attr('title','shortcut');
$('#toc').addClass('GlobalModule');
$('.WikiNav .nav-item').mouseover(function() {
	$('.nav-item').removeClass('active');
	$(this).addClass('active'); }
);
$('.WikiNav .nav-item:first-child').addClass('active');
 
/*Alternate Tab Function - by ShermanTheMythran*/
//relies on Template:Tabs
$('.tabBox').append('<style type="text/css">.tabTitle{display:inline-block;background:rgba(192,192,192,.1) !important;background:silver;padding:5px 5px 0;margin:-5px 5px 0;border-radius:100% 100% 0 0/10px 10px 0 0;-webkit-border-radius: 100% 100% 0 0/10px 10px 0 0;cursor:pointer;transition:background .5s;-moz-transition:background .5s;-webkit-transition:background .5s;-o-transition:background .5s}.tabTitle.active{background:rgba(192,192,192,.3) !important;font-weight:bold}.tabTitle:hover{background:rgba(192,192,192,.5) !important}</style>');
$('.tabTitle').click(function(){$('.tabTitle').removeClass('active');$(this).addClass('active');});
$('#tab-1').click(function(){$('.tabContent').hide();$('#tab-1-content').show();});
$('#tab-2').click(function(){$('.tabContent').hide();$('#tab-2-content').show();});
$('#tab-3').click(function(){$('.tabContent').hide();$('#tab-3-content').show();});
$('#tab-4').click(function(){$('.tabContent').hide();$('#tab-4-content').show();});
$('#tab-5').click(function(){$('.tabContent').hide();$('#tab-5-content').show();});
$('#tab-6').click(function(){$('.tabContent').hide();$('#tab-6-content').show();});
$('#tab-7').click(function(){$('.tabContent').hide();$('#tab-7-content').show();});
$('#tab-8').click(function(){$('.tabContent').hide();$('#tab-8-content').show();});
$('#tab-9').click(function(){$('.tabContent').hide();$('#tab-9-content').show();});
$('#tab-10').click(function(){$('.tabContent').hide();$('#tab-10-content').show();});
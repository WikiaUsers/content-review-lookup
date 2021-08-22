var debugcolour = 'blue';  //Change the colour to confirm cache updates
var debugversion = '1629298206509';

window.test452 = { ready:false, complete:false};
window.debug452 = function(out, alert) { if (mw.config.get("wgUserName") == "452") { if ( ["object", "null", "function"].indexOf(typeof out) == -1) console.log(new Date().toJSON()+" "+out); else { console.log(new Date().toJSON()+" object:"); console.log(out); } if (typeof alert != "undefined") window.alert(out); } }

$(function() { /* Run when page has loaded */
  debug452("SRW ready - start "+debugversion);
  $('.jsupdate').css('background-color',debugcolour);
  if (mw.config.get("wgPageName") =="MediaWiki:Common.js") $(".jsupdate+p").prepend("Common.js edited "+(new Date(new Date().getTime() - debugversion).toISOString().substr(8, 2) > 1?"over a day":new Date(new Date().getTime() - debugversion).toISOString().substr(11, 8))+" ago");

  initScripts();

  $('.WikiaArticle a.external[href*="//saintsrow.fandom.com"][target="_blank"]').attr("target","");

  $("#ToggleCSS").html( $("<a>", { html:"Toggle CSS" }).on("click", function() { toggleCSS() }) );

  $(".ShowAllButton").on("click", function() { $(this).toggleClass("ShowAll"); });

  //make article creation one step easier by preloading the default layout.
  $(".mw-special-Wantedpages a[href*=redlink]").each(function() { 
	$(this).attr("href", $(this).attr("href")+"&preload=MediaWiki:Custom-DefaultLayout"); /* UCP screws this up completely. */
  });

  $(".page-header__title").after($(".ns-0 #Rating a[title^=Rating]").clone());  //display rating star

  //Marking unused images on Special:NewFiles
  $(".mw-special-Images .wikia-gallery-item").css({"border":"2px solid red", "overflow":"hidden"});
  $(".mw-special-Images .wikia-gallery-item-posted").parent().parent().css("border","");
  /* UCP doesn't list filenames or where an image is used, wtf. */

  $("img[src='/resources-ucp/resources/assets/file-type-icons/fileicon-ogg.png']").attr("src", "https://static.wikia.nocookie.net/saintsrow/images/c/c9/Audio_log_visual.png/revision/latest/scale-to-width-down/150");
  $("img[data-src='/resources-ucp/resources/assets/file-type-icons/fileicon-ogg.png']").attr("data-src", "https://static.wikia.nocookie.net/saintsrow/images/c/c9/Audio_log_visual.png/revision/latest/scale-to-width-down/150");

  $(".mw-logline-renameuser .comment").each(function(){ /* this issue was never fixed */
	if ($("a", this).length) return;
	var renameparts = $(this).html().split('"');
	$(this).html('(The user <a href="/User:'+renameparts[1]+'">'+renameparts[1]+'</a> has been renamed to <a href="/User:'+renameparts[3]+'">'+renameparts[3]+'</a>.)');
  });

  $("#SortTOC").on("click", function() {
	var toc = new Array();
	for(var i = 0; i < $('#toc li').length; i++) toc.push($('#toc li')[i].innerHTML);
	toc.sort();
	for(var i = 0; i < $('#toc li').length; i++) $('#toc li')[i].innerHTML = toc[i];
  });

  //Insert edit count link, because parser functions can no longer be used in MediaWiki:User-identity-box-edits-since-joining - Wikia was been informed of this problem, and it was not fixed immediately, which indicates it will take years to fix, if ever.
  $("#UserProfileMasthead .tally em").wrap($("<a>").attr("href", "/Special:EditCount/"+$("#UserProfileMasthead h1[itemprop=name]").html()));
/* Special:EditCount is missing on UCP */

  //implementing redirect to Special: pages, because no-one at Wikia considered the fact that people might want to change links to the old forum to redirect users to the new forum.
  if (mw.util.getParamValue('redirect') != "no" && $("div.redirectMsg").length && $("div.redirectMsg a").attr("href")) {
	$(".redirectMsg").append("<br><br><b>Please wait while you are redirected automatically...</b>");
	setTimeout(function() { window.location = $("div.redirectMsg a").attr("href") }, 2000);
  }

  $("#wpSummary").keydown(function(event) {
	//When enter is pressed in the summary box, shift focus away so keyboard shortcuts can be used to change tab.
	if (event.which == 13) { 
	  $("#wpSummary").blur(); 
	  $('form#editform').submit(); //ensure form is submitted after blur
	}
  });
  if (mw.config.get("wgCanonicalSpecialPageName") == "Movepage" && $("#wpNewTitleNs select").val() == 6) $('#wpLeaveRedirect input[name=wpLeaveRedirect]').attr('checked', false); //uncheck redirect box by default when moving files.

  //Display count at the top of unordered lists on special pages for easier counting (whatlinkshere, and others.)
  $(".ns-special .WikiaArticle ul:not(.counted)").each(function(){  
	if ($(">li", this).length != 50 && $(">li", this).length != $("input[name=limit]").attr("value") && $(">li", this).length > 15) $(this).addClass("counted").before("<p>Displaying "+$(">li", this).length+"</p>");  
  }); /* UCP: works, unusedfiles now has different counter. */

  if (mw.util.getParamValue('preload') == "MediaWiki:Custom-DefaultLayout") $("#LayoutNag").html("Please follow the default layout below.<br />"); //change nag when already preloading
  if ($("#NoLinks").length) $("#LayoutNag").remove();
  $('.mw-special-CreatePage #EditPageHeader').on('DOMNodeInserted', function(event) {
	//update preload link with the specified pagename
	$(".mw-newarticletext a[href*=DefaultLayout]").attr("href", $("#EditPageHeader h1 a").attr("href")+"?action=edit&preload=MediaWiki:Custom-DefaultLayout");
  });
  $(".fullwidthbanner").each(function() {
	if ($("img", this).attr("src")) srcAttr = "src";
	else if ($("img", this).attr("data-src")) srcAttr = "data-src"; //lazy-loader
	$("img", this).attr(srcAttr, $("img", this).attr(srcAttr).replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/"+Math.floor($(this).width())+"?")); 
	$("img", this).attr(srcAttr, $("img", this).attr(srcAttr).replace(/\/scale-to-width-down\/\d*\?/g, "/scale-to-width-down/"+Math.floor($(this).width())+"?")); 
	$("img", this).attr("width", "" );
	$("img", this).attr("height", "" );
  });

  if ($(".noarticletext").length && mw.config.get("wgPageName").indexOf("User_blog") == 0) $(".noarticletext").html("<p>You have followed an invalid link.<br><br>There are no Blogs.<br><br>Try the <a href='/Forum'>Forum</a>.<br><br>Please inform the person who linked you here to correct their link.<br /><br />");

  /*  Add links to Explore tab
      Permission explicitly stated on help page: https://c.wikia.com/Help:Navigation?diff=2217695&oldid=2216918
      While Wikia staff may later change their mind, this edit cannot be regarded as a TOU violation as it was valid at the time it was made
  $(".wds-community-header nav>ul>li:last-child ul").append('<li><a href="/wiki/Special:NewPages">New Pages</a></li><li><a href="/wiki/Special:Maps">Maps</a></li><li><a href="/wiki/Forum">Forum</a></li><li><a href="/wiki/Index">Index</a></li>');
  */

  initReferences(); //init References
  $(".ns-0 a.external[href*='youtu'], .ns-0 a.external.free, .ns-0 a.autonumber").each(function() {
    if (!$(this).parents(".reference-text").length) $(this).attr("href", "./Help:Refs"); // link broken References
  });

  $(".mw-collapsible .ogg_player").on("click", function() { return false; } )

  window.randomiser = function(randomclass, randomtemplate, successfunction) {
	  $(randomclass+" .mainboxheading").append(' - <a>Refresh</a>').off("click").on("click", function() { 
	    $(randomclass+" .mainboxbody").html("");
	    $(randomclass+" .mainboxbody").addClass("loading");
	    $.ajax({"dataType": "text","data": {"action":"parse", "format":"xml", "disablelimitreport":"1", "contentmodel":"wikitext", "prop":"text", "text": randomtemplate},"url" :"/api.php","success": function(data) { 
	    $(randomclass+" .mainboxbody").html($(".mainboxbody",$("text", $(data)[1]).text()).html() );
	    $(randomclass+" .mainboxbody").removeClass("loading");
	    if ($('.mw-collapsible').length && typeof $('.mw-collapsible').makeCollapsible == "function") $('.mw-collapsible').makeCollapsible();
	    if($('video, audio').length) $('video, audio').embedPlayer();
	    if (typeof successfunction == 'function') successfunction(data);
	  } }); });
  }

  randomiser(".randompages", "{"+"{mainbox|class=randompages|Random Pages|{"+"{randompages}}}}");
  randomiser(".randomimage", "{"+"{Random/Image|size=555}}");
  randomiser(".randomtrivia", "{"+"{Random/Trivia}}");
  randomiser(".randompoll", "{"+"{Random/Poll}}", function(data) { SRWpollInit(); });
  randomiser(".randomquote1", "{"+"{Random/Quote/1}}");
  randomiser(".randomquote2", "{"+"{Random/Quote/2}}");
  randomiser(".randomquote", "{"+"{Random/Quote}}", function(data) { 
	$(".randomquote").attr("class", $(".mainbox",$("text", $(data)[1]).text()).attr("class"));
	$(".randomquote .mainboxheading").html($(".mainboxheading",$("text", $(data)[1]).text()).html()+' - <a>Refresh</a>' );
	$(".hiddenContent .ogg_player").remove();
  });
  randomiser(".randomaudio", "{"+"{Random/Audio}}", function(data) { 
	if ($(".randomaudio .ogg_player").length == 1) $(".randomaudio .mainboxheading").click();  //if empty, skip to next.
	$(".hiddenContent .ogg_player").remove();
  });

  // Randomiser for [[Ho-ing]] to replace previous <choose><option> randomiser
  $(".RandomHoing").append(' <a style="cursor: pointer;">(Refresh)</a>').on("click", function() { var h1 = ["Dirty","Rusty","Donkey","Angry","Golden","Mushroom","Pearl","Golden","Slippery","Angry","Dripping","Moist","Backdoor","Steaming","Brown","Tickling","Hairy","Dirty","Spitting","King's","Diving","Shooting","Stinky","Rising","Avenging","Submissive","Crazy","Wicked","Royal","Blazing","Creeping","Bloody","Roman","Greek","Sitting","Fiery","Inverted","Clockwise","Double-Fisted"], h2 = ["Sanchez","Trumpet","Punch","Dragon","Shower","Tattoo","Necklace","Corkscrew","Dragon","Knuckler","Shocker","Franklin","Twister","Johnson","Lollipop","Swirl","Vice Grip","Sanchez","Jimmy","Mudslide","Cornhole","Spelunker","Dillow","Scooter","Phoenix","St. James","Milkshake","Double-Stuff","Princess","Norris","Lizard","Matriarch","Butterfly","Mantis","Rattlesnake","Bishop","Shower","Monkey Wrench","Knead"];
  $(".RandomHoing").html(h1[Math.floor((Math.random()*h1.length))]+" "+h2[Math.floor((Math.random()*h2.length))]+' <a style="cursor: pointer;">(Refresh)</a>'); });

  $(".mw-special-Search .unified-search__profiles li:last").before('<li class="unified-search__profiles__profile"><a title="Search in all discussions" href="/Special:Search?search='+$(".unified-search__input__query").val() +'&amp;ns[0]=1&amp;ns[1]=3&amp;ns[2]=5&amp;ns[3]=7&amp;ns[4]=9&amp;ns[5]=11&amp;ns[6]=13&amp;ns[7]=15&amp;ns[8]=110&amp;ns[9]=111&amp;ns[10]=113&amp;ns[11]=500&amp;ns[12]=501&amp;ns[13]=502&amp;ns[14]=503&amp;ns[15]=700&amp;ns[16]=701&amp;ns[17]=1201&amp;discussions=1">Discussions</a></li>'); //Add "Discussions" link to search options

  $(".mw-special-Search a[href*='Saints_Row_Wiki:Disambiguation:']").each(function() { $(this).html($(this).html().replace("Saints Row Wiki:Disambiguation:","Disambiguation:")); }); //Fix links to disambiguation pages.

  if (mw.config.get("wgCanonicalNamespace") == "Forum") {
    $("#mw-content-text").append("<a class='wds-button' href='?section=new&action=submit&nosummary=1'>Add new comment</button>");
  }

  /* Add countdown to cached special pages.  */
  if (mw.config.get("wgNamespaceNumber") == -1) {
	var datestring = $('*:contains("The following data is cached, and was last updated")');
	if (datestring.length) {
	  founddate = datestring[datestring.length-1].innerHTML.match(/updated (.*). A/)[1];
	  now = new Date();
	  now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	  last = new Date(founddate.split(",")[1]+ " "+founddate.split(",")[0]);
	  next = new Date(last.getTime()+(24*60*60000));
	  diff = Math.floor((next.getTime()-now_utc.getTime()));
	  if (diff > 0) {
	    var left = diff>86400000?(new Date(diff).toISOString().substr(8, 2) - 1)+" days, ":"";
	    left += new Date(diff).toISOString().substr(11, 8);

	    $(datestring[datestring.length-1]).append("<div>Time left until next update: "+left+"</div>");
	  } else $(datestring[datestring.length-1]).append("<div>The special page cache update is overdue.</div>");
	}

  } //end special pages countdown

  // Category:Alternate_titles
  if ($("#alttitles").length && (mw.config.get("wgCanonicalNamespace") == "Category")) {
	$.getJSON("/api.php?action=query&generator=categorymembers&rvprop=content&prop=revisions%7Cinfo&gcmtitle="+mw.config.get("wgPageName")+"&gcmlimit=500&format=json")
	.done(function(data) {
	  for (i in data.query.pages) {
	    if(typeof data.query.pages[i].redirect != "undefined") {
	      redirect = data.query.pages[i].title;
	      destination = data.query.pages[i].revisions[0]["*"].match(/#REDIRECT \[\[(.*)]\]/i)[1];
	      rlink = '<a href="/'+redirect+'?redirect=no" title="'+redirect+'" class="mw-redirect">'+redirect+'</a>';
	      dlink = '<a href="/'+destination+'" title="'+destination+'" class="mw-redirect">'+destination+'</a>';
	     $("#alttitles tbody").append("<tr><td>"+ rlink+"</td><td>"+dlink+"</td></tr>");
	    }
	  }
	  $("#alttitles").addClass("sortable").tablesorter(); //sortable doesn't work the other way
	});
  }

  //from https://dev.wikia.com/wiki/DISPLAYTITLE - required for category and template namespaces.
  $('.changePageTitle').eq(0).each(function() {
	var $h1 = $('#PageHeader h1, h1#firstHeading').eq(0);
	$h1.prop('title', $h1.text()).empty().append(this.childNodes);
  }).end().remove();

  if (mw.config.get("wgCanonicalNamespace") == "Category") { /* Default category images for pages without images, previously handled by CSS */
	$(".category-page__member-left").addClass("empty");
	$(".category-page__member-left *").parent().removeClass("empty");
  }

  $("#ExpandFilenamesLink").html(
	$("<a>", { html:"Expand filenames" })
	.on("click", function() {
	  $('.gallerytext a').each(function() {
	    $(this).text($(this).attr('title').replace('File:', ''));
	  })
	})
  );

  $(".diff-addedline, .diff-deletedline").each(function(){ 
    $(this).html($(this).html().replace(/&/g, "&amp;").replace(/&amp;lt/g, "&lt").replace(/&amp;gt/g, "&gt").replace(/&amp;amp;/g, "&amp;").replace(/​/g, "&amp;ZeroWidthSpace;") ) 
  });

  if (!mw.config.get("wgUserId")) $("body").addClass("user-anon");

  debug452("SRW ready - end");
  debug452("ready: "+test452.ready+" - complete: "+test452.complete +" - readystate: "+document.readyState);

  $(document).trigger('readystatechange'); /* This is a race condition: readystate may already be complete */

  test452.ready = true;
  if (test452.complete) debug452("complete before ready - bad");

}); // end $(function() block

// **************************************************************************************************************************************** //
// **************************************************************************************************************************************** //
// **************************************************************************************************************************************** //

$(document).on('readystatechange', function() {
  debug452("SRW onreadystatechange : '"+document.readyState+"'"); 

  if (document.readyState == "complete") {
    $(".CategoryTreeHover .CategoryTreeToggle").eq(0).trigger("click").trigger("click");

    $('.WikiaRail').on('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
	//It is important not to unbind this event, because #wikia-recent-activity is replaced twice when logged out.

	if (!$(".content-review__widget__title a").length) 
	  $(".content-review__widget__title").html('<a href="/Special:JSPages">'+$(".content-review__widget__title").html()+"</a>");

	if ($('.WikiaRail section').length && !$("#NewFilesModule").length) {
	  // Only add it ''once''
	  $('.WikiaRail>div>section:last-of-type').after("<section id='NewFilesModule' class='rail-module loading'><h2><a href='/Special:NewFiles'>New Files</a><a style='float:right' href='/Special:Upload'><button>Upload");
	  $.get("/Special:NewFiles", function(NewFilesPage) {
		$("#NewFilesModule").removeClass("loading");
		if (!$('.wikia-gallery', NewFilesPage).length) { console.log("No NewFiles list."); return; }

		$('.wikia-gallery', NewFilesPage).html($('.wikia-gallery', NewFilesPage).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/212?").replace(/\/scale-to-width-down\/\d*\?/g, "/scale-to-width-down/212?"));
		$("#NewFilesModule").append('<div id="gallery-" hash="" class="wikia-gallery"></div>');
		$(".wikia-gallery-item", NewFilesPage).each(function() {
		  $(".lightbox-caption", this).prepend($("<a>").attr("href",$(".gallery-image-wrapper>a", this).attr("href")).html($(".gallery-image-wrapper>a", this).attr("title")).append($("<br>")));
		  $("#NewFilesModule .wikia-gallery").append(this);
		});
	  });

	  if (!$("#NewFilesModuleCSS").length) $('head').append('<style type="text/css" id="NewFilesModuleCSS">\n#NewFilesModule #gallery- { position:relative;overflow-y:auto; clear: both; text-align:center; height:452px; }\n#NewFilesModule #gallery-:hover {padding-bottom: 100%; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; left: 0 !important; width: auto !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; width: fit-content !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display:block; padding: 5px; margin:0 1em; position: absolute; border: 1px solid; background-color: #fff; z-index: 2; right: 0;  width: calc(100% - 2em) !important; }\n#NewFilesModule h2 {margin: 0 2em 0 0;}\n#NewFilesModule h2 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin: auto !important; }\n#NewFilesModule .wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n#NewFilesModule .wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n@media only screen and (max-width: 1023px) {#NewFilesModule {display:none;}}\n#NewFilesModule.loading h2:after {content: "Loading";font-size: xxx-large;width: 300px;margin-top: 1em;display: block;}\n#NewFilesModule.loading {min-height: 10em;}\n</style>');
	} /* End of custom "NewFilesModule" */

	//add diff links and replace 'a wikia contributor' with the IP address.
	if ($("#wikia-recent-activity").length && !$("#wikia-recent-activity").hasClass("replaced")) {
	  //Only run if #wikia-recent-activity has been added, and it has not already been replaced, 
	  //because #wikia-recent-activity is replaced twice when logged out.
	  $("#wikia-recent-activity").addClass("replaced");

	  $("#wikia-recent-activity li").each( function() {
	    if ($(".edit-info-user", this).attr("href").indexOf("/Special:Contributions/") != -1)
	      $(".edit-info-user", this).html($(".edit-info-user", this).attr("href").replace("/wiki/Special:Contributions/",""));
	    $(this).prepend('<a href="'+$("a", this)[0].getAttribute('href', 2)+'?diff=cur" title="show diff"></a>');
	  });
	}
	/*
	  JoinModule - "Help the Wiki" sidebar message.
	  based on tardis.wikia.com/MediaWiki:Common.js/mosbox.js
	  Permission given in https://support.wikia-inc.com/tickets/103511  
	  Reaffirmed publicly: https://community.wikia.com/Thread:720672#6
	  While Wikia staff may later change their mind, 
	  this edit cannot be regarded as a TOU violation as it was valid at the time it was made
	*/
	if ($('.WikiaRail section').length && !$('#JoinModule').length) { 
/*
	  var joinheading = new Array("You can edit","Anyone can edit","Anybody can edit","Everyone can edit","Everybody can edit","Help us out","Can you add anything?","What can you add?","See something wrong?","Want to help out?","Do you like editing?","We want you to edit!","Add your knowledge","We need your help","Can you improve the wiki?","Editing is easy","New editors needed","Information needed","Your help is needed","The wiki needs you!","Join the wiki","Edit the wiki","Help the wiki");

	  var joincontent = "<section id='JoinModule' class='rail-module center'><h2>"+joinheading[Math.floor((Math.random()*joinheading.length))]+"</h2><span style='color: purple;font-size: 105%;'>"
	   +"Check our <b><a href='/Saints_Row_Wiki:To-do_list'>to-do list</a></b> for ways to help."
	   +"<br /><a href='/Forum'>Use the Forum</a> if you can't find what you need."
	   +"<br /><b>If something is incorrect, <a href='?action=edit'>please fix it</a>.</b>"
	   +"</span></section>";
*/
	  var joincontent  = "<section id='JoinModule' class='rail-module center'><h2>Shortcuts</h2><div style='overflow: auto;'><div class='JoinLeft'><a href='/Saints_Row_Wiki'>Main Page</a><br><a href='/Portal:Index'>Index</a><br><a href='/Special:RecentChanges'>Recent Changes</a><br><a href='/Saints_Row_Wiki:News'>News</a><br></div><div class='JoinRight'><a href='/Saints_Row_Wiki:To-do_list'>To-do list</a><br><a href='/Saints_Row_Wiki:Forums'>Forum</a><br><a href='/Special:Upload'>Upload Files</a><br><a href='/Saints_Row_Wiki:Maps'>Maps</a></div></div></section>";

	  $('.WikiaRail section.rail-module').eq('0').before(joincontent);
	}
	if (!$('#RCLink').length) 
	  $(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Recent Changes</a>');

    });  //end of DOMNodeInserted block
    $('.WikiaRail').trigger('DOMNodeInserted'); //Bypass race condition by firing the event.

    if ($('#editToolbar').length) {
        if (!$('#wikiDiff').length) {
		debug452("no #wikiDiff...");
		$('#mw-content-text').off('DOMNodeInserted').on('DOMNodeInserted', function(event) { 
			if ($('#wikiDiff').length) {
				debug452("#wikiDiff wasn't present, but now it suddenly is.");
				$(document).trigger('readystatechange');
				$('#mw-content-text').off('DOMNodeInserted'); 
			}
		});
	} else {
		debug452("#wikiDiff found");
		$('#wikiDiff').off('DOMNodeInserted').on('DOMNodeInserted', function(event) { 
			$(window).scrollTop(0); 
			debug452("scrolled to diff?");
		});
	}
	$('#wikiPreview').off('DOMNodeInserted').on('DOMNodeInserted', function(event) { 
		$(window).scrollTop(0); 
		$($("#wikiPreview .mw-parser-output")).on('DOMNodeInserted', function(event) { event.stopPropagation(); });
		if ($(".tabber").length && typeof tabberInit == "function") tabberInit();
	});
     }
	$("#mw-content-text img").each(function() { 
//		retryfailedimage($(this));
	});

	if ($(".CategoryTreeTag").length) {
		if (mw.loader.getState("ext.categoryTree") == "registered") mw.loader.load("ext.categoryTree");
		else if (mw.loader.getState("ext.categoryTree") == "loading") {
			mw.loader.implement("ext.categoryTree",function($){(function($,mw){var categoryTree={showToggles:function(){$('span.CategoryTreeToggle').css('display','inline');},handleNode:function(e){var $link=$(this);if($link.data('ct-state')==='collapsed'){categoryTree.expandNode($link);}else{categoryTree.collapseNode($link);}},expandNode:function($link){var $children=$link.parents('.CategoryTreeItem').siblings('.CategoryTreeChildren');$children.show();$link.html(mw.msg('categorytree-collapse-bullet')).attr('title',mw.msg('categorytree-collapse')).data('ct-state','expanded');if(!$link.data('ct-loaded')){categoryTree.loadChildren($link,$children);}},collapseNode:function($link){$link.parents('.CategoryTreeItem').siblings('.CategoryTreeChildren').hide();$link.html(mw.msg('categorytree-expand-bullet')).attr('title',mw.msg('categorytree-expand')).data('ct-state','collapsed');},loadChildren:function($link,$children){var $linkParentCTTag,ctTitle,ctMode,ctOptions;function error(){var $retryLink;$retryLink=$('<a>').text(mw.msg('categorytree-retry')).attr('href','#').click(function(e){e.preventDefault();categoryTree.loadChildren($link,$children);});$children.text(mw.msg('categorytree-error')+' ').append($retryLink);}$link.data('ct-loaded',true);$children.html($('<i class="CategoryTreeNotice"></i>').text(mw.msg('categorytree-loading')));$linkParentCTTag=$link.parents('.CategoryTreeTag');ctTitle=$link.data('ct-title');ctMode=$linkParentCTTag.data('ct-mode');ctMode=typeof ctMode==='number'?ctMode:undefined;ctOptions=$linkParentCTTag.data('ct-options')||mw.config.get('wgCategoryTreePageCategoryOptions');if(typeof ctTitle!=='string'){error();return;}$.get(mw.util.wikiScript(),{action:'ajax',rs:'efCategoryTreeAjaxWrapper',rsargs:[ctTitle,ctOptions,'json']}).success(function(data){data=data.replace(/^\s+|\s+$/,'');data=data.replace(/##LOAD##/g,mw.msg('categorytree-expand'));if(data===''){switch(ctMode){case 0:data=mw.msg('categorytree-no-subcategories');break;case 10:data=mw.msg('categorytree-no-pages');break;case 100:data=mw.msg('categorytree-no-parent-categories');break;default:data=mw.msg('categorytree-nothing-found');}data=$('<i class="CategoryTreeNotice"></i>').text(data);}$children.html(data).find('.CategoryTreeToggle').click(categoryTree.handleNode);categoryTree.showToggles();}).error(error);}};$(function($){$('.CategoryTreeToggle').click(categoryTree.handleNode);categoryTree.showToggles();});})(jQuery,mediaWiki);;},{},{"categorytree-collapse":"collapse","categorytree-expand":"expand","categorytree-collapse-bullet":"[<b>\u2212<\/b>]","categorytree-expand-bullet":"[<b>+<\/b>]","categorytree-load":"load","categorytree-loading":"loading\u2026","categorytree-nothing-found":"nothing found","categorytree-no-subcategories":"no subcategories","categorytree-no-parent-categories":"no parent categories","categorytree-no-pages":"no pages or subcategories","categorytree-error":"Problem loading data.","categorytree-retry":"Please wait a moment and try again."});
		}
	}
	$(window).trigger('resize');
	debug452("SRW onreadystatechange - end");  //race condition: this is not guaranteed to fire after the function block.
	if (test452.ready && !test452.complete) debug452("ready before complete - good.");
	test452.complete = true;
  }
  debug452("ready: "+test452.ready+" - complete: "+test452.complete +" - readystate: "+document.readyState);
}); 
debug452("ready: "+test452.ready+" - complete: "+test452.complete +" - readystate: "+document.readyState);
$(document).trigger('readystatechange');

// **************************************************************************************************************************************** //
// **************************************************************************************************************************************** //
// **************************************************************************************************************************************** //

window.SRWpopup = function(popupid, title, message, type) {
    $("#"+popupid).remove();
    $("body").append('<section class="popupOverlay" id="'+popupid+'"><section class="popupWrapper '+(type?type:'')+'"><button class="close">X</button><h1>'+title+'</h1><section class="popupContent"></section></section></section>');
    $("#"+popupid+' .popupContent').append(message);
    $("#"+popupid).data("scrollTop", $(window).scrollTop());

    $("#"+popupid)[0].adjustTop = function () {
      var calctop = $("#"+popupid).data("scrollTop") + (($(window).height() - $("#"+popupid).outerHeight()) / 2);
      $("#"+popupid).css("top", calctop>0?calctop:0);
      $("#"+popupid+" .popupWrapper").css("margin-top", Math.max((($(window).height() - $("#"+popupid+" .popupWrapper").outerHeight()) *0.50), 50));
    }
    $("#"+popupid)[0].adjustTop();
    $("#"+popupid).prepend('<div class="popupBackground"></div>');
    $("#"+popupid+" .popupBackground").on("click", function(){ $("#"+popupid).remove() });
    $("#"+popupid+" .close").on("click", function(){ $("#"+popupid).remove() });
}

$(".wds-button-group").addClass("buttons"); /* buttons are buttons */

window.retryfailedimage = function(failedimage) {

  $(failedimage).off("error").on("error", function() {
	debug452("failed 1: "+$(failedimage).prop("complete")+" "+$(failedimage).prop("naturalWidth")+" "+$(failedimage).attr("src"));
	retryfailedimage($(failedimage));
  });

  if (typeof $(failedimage).attr("src") != "undefined" && typeof $(failedimage).prop("naturalWidth") != "undefined" && $(failedimage).prop("naturalWidth") == 0) {

debug452("image: "+$(failedimage).prop("complete")+" "+$(failedimage).prop("naturalWidth")+" "+$(failedimage).attr("src"));

	if ($(failedimage).prop("complete")) {
		$(failedimage).off("load").on("load", function() {
			debug452("loaded: "+$(failedimage).prop("naturalWidth")+" "+$(failedimage).attr("src"));
		});
		$(failedimage).off("error").on("error", function() {
			debug452("failed 2: "+$(failedimage).prop("naturalWidth")+" "+$(failedimage).attr("src"));
			retryfailedimage($(failedimage));
		});
		$(failedimage).attr("src", $(failedimage).attr("src"));
	}
  }
}

window.initReferences = function() { 
  //move backlinks into separate span so they are only shown on hover - by 452 for saintsrow.wikia
  $("ol.references li").each( function() { //for each reference
	reftext = $(".reference-text", this)[0]; //copy reference text span
	this.removeChild(reftext); //remove original reference text span
	backlinks = $(this).html(); //copy backlinks
	newNode = $("<span>").addClass("cite-backlinks").html(backlinks);
	$(this).html("").append(newNode).append(reftext);
  });
	//if a ref scroller has a scrollbar displayed, enable shadow.
  $(".scroller.noshadow").each(function() { 
	if ($(this).height()+"px" == $(".scroller").css("max-height")) $(this).removeClass("noshadow");
  });
}
window.initScripts = function() { 
  var loadScripts = new Array(); //cut down on unnecessary scripts being loaded.

  if ($("#SRWmap").length) loadScripts.push('u:sr:MediaWiki:Common.js/SRWMaps.js');

  if (mw.util.getParamValue('action') == "edit" || mw.util.getParamValue('action') == "submit") {
    if (!$(".mw-editform").length) {
      debug452(".mw-editform missing", 1);
    }
    $(".mw-editform").before("<div id='editToolbar'></div>");

    $(".ve-oasis-header__label").html("Editing <a href='/"+mw.config.get("wgPageName")+"'>"+mw.config.get("wgCanonicalNamespace")+(mw.config.get("wgCanonicalNamespace") && ":")+mw.config.get("wgTitle")+"</a>");

    loadScripts.push('u:sr:MediaWiki:Common.js/stdSummaries.js'); // edit page summaries - rewritten
    loadScripts.push('u:sr:MediaWiki:Common.js/stdTemplates.js'); // edit page template - rewritten
    loadScripts.push('u:sr:MediaWiki:Common.js/htmlentities.js'); // button to encode htmlentities  -custom
    loadScripts.push('u:sr:MediaWiki:Common.js/tabber.js');

  } else if (mw.config.get("wgPageName") == "Special:Search") {

  //  loadScripts.push('u:sr:MediaWiki:Common.js/SearchSuggest.js');	// add "search suggestions" to search results 
  // this is almost completely useless now that Opensearch has been neutered.  Consider coding a DPL-based replacement.

  } else if (mw.config.get("wgPageName") == "Special:RecentChanges") {

    loadScripts.push('u:sr:MediaWiki:Common.js/RecentChangesUpdate.js'); // Autoload new Recentchanges -rewritten

  } else {

    debug452("usericons debug - ns2:"+$(".ns-2").length +", ns3:"+$(".ns-3").length+", profile: "+$(".mw-special-UserProfileActivity").length+", contribs: "+$(".mw-special-Contributions").length);
    if ($(".ns-2").length || $(".ns-3").length || $(".mw-special-UserProfileActivity").length || $(".mw-special-Contributions").length)	
	loadScripts.push('u:sr:MediaWiki:Common.js/usericons.js');	// Import custom usericons -custom

//    if (mw.config.get("wgPageName") == "Special:DeadVideos")
//	loadScripts.push('u:sr:MediaWiki:Common.js/DeadVideos.js');	// little use now

    if (mw.config.get("wgPageName").indexOf("Saints_Row_Wiki:Polls") != -1 || $(".SRWpoll").length)
	  loadScripts.push('u:sr:MediaWiki:Common.js/polls.js');        // -custom

    loadScripts.push('u:sr:MediaWiki:Common.js/tabber.js');		// copied external script locally to ensure loading
    loadScripts.push('u:sr:MediaWiki:Common.js/ResizeSlideshow.js');	// Resize Slideshows to fit page width -custom

    loadScripts.push('u:sr:MediaWiki:Common.js/countdown.js');		/* Import javascript countdown.   */
    loadScripts.push('u:sr:MediaWiki:Common.js/tablePopout.js');	// Enables popout tables -rewritten
    loadScripts.push('u:sr:MediaWiki:Common.js/ReferencePopups.js');	// reference popups - needs rewrite

    loadScripts.push('u:sr:MediaWiki:Common.js/View_Source.js');	/* "view source" link */
    loadScripts.push('u:sr:MediaWiki:Common.js/PageRefresh.js');	// "purge" and "null edit" links -rewritten
  }
//  importArticles({ type: 'script', articles: loadScripts });

  loadScripts.forEach(function(v){
    vArr = v.split(":");
    vArr.shift();
    vW = vArr.shift();
    vPage = vArr.join(":");
    console.log("loading "+vPage+" from "+vW);

    if (vW == "sr") vW = "saintsrow";

    importScriptPage(vPage, vW);

  //  importScriptURI('https://'+vW+'.fandom.com/'+ vPage+"?action=raw&ctype=text/javascript");

  });
}
//These functions are not used anywhere, but exist so anyone can use them for testing.
window.toggleCSS = function() { $("link[rel='stylesheet'][href*='modules=site']").attr( "disabled",function(idx, oldAttr){return !oldAttr;});  $(window).trigger('resize'); }
window.toggleUserCSS = function() {  $("link[rel='stylesheet'][href*='modules=user']").attr("disabled",function(idx,oldAttr){return!oldAttr;}); $(window).trigger('resize'); }

  debug452("mediawiki:common.js loaded");
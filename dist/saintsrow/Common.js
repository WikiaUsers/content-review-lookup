//<nowiki>
var testcolour = 'pink';  //Change the colour to confirm cache updates

$(function() { /* Run when page has loaded */
  $('.jsupdate').css('background-color',testcolour);
  debug452("SRW init 4");

  $("#ToggleCSS").html( $("<a>", { html:"Toggle CSS" }).bind("click", function() { toggleCSS() }) );

  $(".ShowAllButton").bind("click", function() { $(this).toggleClass("ShowAll"); });

  $(window).on('scroll', SRWscroll );
  $('.scroller').on('scroll', SRWscroll );

  //make article creation one step easier by preloading the default layout.
  $(".mw-special-Wantedpages a[href*=redlink]").each(function() { 
	$(this).attr("href", $(this).attr("href")+"&preload=MediaWiki:Custom-DefaultLayout");
  });

  $(".page-header__title").after($(".ns-0 #Rating a[title^=Rating]").clone());  //display rating star

  //Marking unused images on Special:NewFiles
  $(".mw-special-Images .wikia-gallery-item").css({"border":"2px solid red", "overflow":"hidden"});
  $(".mw-special-Images .wikia-gallery-item-posted").parent().parent().css("border","");

  $(".mw-logline-renameuser .comment").each(function(){
    if ($("a", this).size()) return;
    var renameparts = $(this).html().split('"');
    $(this).html('(The user <a href="/User:'+renameparts[1]+'">'+renameparts[1]+'</a> has been renamed to <a href="/User:'+renameparts[3]+'">'+renameparts[3]+'</a>.)');
  });

  //Restore ogg_player info link click - Wikia has been informed of this problem, and the cause.
  $(".ogg_player a.image").each(function(){ $(this).unbind("click").bind("click", function() {window.open($(this).prop("href"));});})

  $("#SortTOC").bind("click", function() {
	var toc = new Array();
	for(var i = 0; i < $('#toc li').length; i++) toc.push($('#toc li')[i].innerHTML);
	toc.sort();
	for(var i = 0; i < $('#toc li').length; i++) $('#toc li')[i].innerHTML = toc[i];
  });

  //Insert edit count link, because parser functions can no longer be used in MediaWiki:User-identity-box-edits-since-joining - Wikia was been informed of this problem, and it was not fixed immediately, which indicates it will take years to fix, if ever.
  $("#UserProfileMasthead .tally em").wrap($("<a>").attr("href", "/Special:EditCount/"+$("#UserProfileMasthead h1[itemprop=name]").html()));

  //implementing redirect to Special: pages, because no-one at Wikia considered the fact that people might want to change links to the old forum to redirect users to the new forum.
  if (mw.util.getParamValue('redirect') != "no" && $("div.redirectMsg").length) {
	$(".redirectMsg").append("<br><br><b>Please wait while you are redirected automatically...</b>");
	setTimeout(function() { window.location = $("div.redirectMsg a").attr("href") }, 1000);
  }

  $("#wpSummary").keydown(function( event ) {
	//When enter is pressed in the summary box, shift focus away so keyboard shortcuts can be used to change tab.
	if ( event.which == 13 ) { 
	  $("#wpSummary").blur(); 
	  $('form#editform').submit(); //ensure form is submitted after blur
	}
  });
  if (wgCanonicalSpecialPageName == "Movepage" && $("#wpNewTitleNs").val() == 6) $('#wpLeaveRedirect').attr('checked', false); //uncheck redirect box by default when moving files.

  //Display count at the top of unordered lists on special pages for easier counting (whatlinkshere, unusedfiles, and others.)
  $(".ns-special .WikiaArticle ul:not(.counted)").each(function(){  
	if ($(">li", this).size() != 50 && $(">li", this).size() != $("input[name=limit]").attr("value") && $(">li", this).size() > 15) $(this).addClass("counted").before("<p>Displaying "+$(">li", this).size()+"</p>");  
  });

  //When using ?useskin= on an edit page, return to the same skin upon submit.
  //Only functional on preview and show changes in monobook, since publish results in a "302 Found" redirect.
  if (mw.util.getParamValue('useskin') && $("#editform").length) $("#editform").attr("action", $("#editform").attr("action")+"&useskin="+mw.util.getParamValue('useskin'));

  if (mw.util.getParamValue('preload') == "MediaWiki:Custom-DefaultLayout") $("#LayoutNag").html("Please follow the default layout below.<br />"); //change nag when already preloading
  if ($("#NoLinks").size()) $("#LayoutNag").remove();
  $('.mw-special-CreatePage #EditPageHeader').bind('DOMNodeInserted', function(event) {
	//update preload link with the specified pagename
	$(".mw-newarticletext a[href*=DefaultLayout]").attr("href", $("#EditPageHeader h1 a").attr("href")+"?action=edit&preload=MediaWiki:Custom-DefaultLayout");
  });
  if ($(".mw-special-CreatePage").length && !$(".mw-newarticletext").length) {
	$("#mw-content-text").before('<div id="EditPageIntro" class="editpage-intro"><div class="editpage-intro-wrapper"><div class="mw-newarticletext"><span id="LayoutNag"><b><a class="text" href="'+$("#EditPageHeader h1 a").attr("href")+'?action=edit&preload=MediaWiki:Custom-DefaultLayout">Click this link to load the standard layout</a>, or the page will be deleted.</b><br></span>\n<br>See <a href="/Saints_Row_Wiki:Creating_Articles" title="Saints Row Wiki:Creating Articles">Saints Row Wiki:Creating Articles</a> for more information about creating articles.</div></div></div>');
  }
  $(".fullwidthbanner").each(function() {
	if ($("img", this).attr("src")) srcAttr = "src";
	else if ($("img", this).attr("data-src")) srcAttr = "data-src"; //lazy-loader
	$("img", this).attr(srcAttr, $("img", this).attr(srcAttr).replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/"+Math.floor($(this).width())+"?")); 
	$("img", this).attr(srcAttr, $("img", this).attr(srcAttr).replace(/\/scale-to-width-down\/\d*\?/g, "/scale-to-width-down/"+Math.floor($(this).width())+"?")); 
	$("img", this).attr("width", "" );
	$("img", this).attr("height", "" );
  });

  if ($(".noarticletext").size() && wgPageName.indexOf("User_blog") == 0) $(".noarticletext").html('<br /><b>You have arrived here using an outdated "User_blog" link.<br /><br />All "User_blog" posts are now "Forum" posts.<br /><br />Redirects were left for 1 year, but have since been deleted.<br />Please notify the site you came from to update their links.</b><br /><br />');

  if (wgNamespaceNumber == 3 && typeof wgRedirectedFrom == "string" && wgRedirectedFrom.indexOf("Thread") == 0) $("#WikiaArticle").prepend('<b>You have arrived here using an outdated "Message Wall" Thread link.<br />All "Message Wall" Threads are now "User talk" pages.<br />All redirects will be deleted after 2018-09-01.<br />If you came here from an external site, please notify them to update their links.</b><hr /><br />');
  /*
    Add links to Explore tab
    Permission explicitly stated on help page: https://c.wikia.com/Help:Navigation?diff=2217695&oldid=2216918
    While Wikia staff may later change their mind, this edit cannot be regarded as a TOU violation as it was valid at the time it was made
  $(".wds-community-header nav>ul>li:last-child ul").append('<li><a href="/wiki/Special:NewPages">New Pages</a></li><li><a href="/wiki/Special:Maps">Maps</a></li><li><a href="/wiki/Forum">Forum</a></li><li><a href="/wiki/Index">Index</a></li>');  */
 
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
	//It is important not to unbind this event, because #wikia-recent-activity is replaced twice when logged out.

	if ($('#WikiaRail section').length && !$("#NewFilesModule").length && typeof $NewFilesPage == "undefined") { // Only add it ''once''
	  $NewFilesPage = $('<div>'); // this line, and the next, originate from https://dev.wikia.com/AjaxRC/code.js <3
	  $NewFilesPage.load("/Special:Images #gallery-", function () {
		$('#WikiaRail>section:last-of-type').after("<section id='NewFilesModule' class='module'><h2><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h2>");
		$('#gallery-', $NewFilesPage).html($('#gallery-', $NewFilesPage).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
		$("#NewFilesModule").addClass("compact");
		$("#NewFilesModule").append('<div id="gallery-" hash="" class="wikia-gallery wikia-gallery-caption-below wikia-gallery-position- wikia-gallery-spacing- wikia-gallery-border- wikia-gallery-captions- wikia-gallery-caption-size-"></div>');
		$(".wikia-gallery-item", $NewFilesPage).each(function() {
		  $(".lightbox-caption", this).prepend($("<a>").attr("href",$(".gallery-image-wrapper>a", this).attr("href")).html($(".gallery-image-wrapper>a", this).attr("title")).append($("<br>")));
		  $("#NewFilesModule #gallery-").append(this); 
		});
		delete $NewFilesPage;
	  });
	      
	  if (!$("#NewFilesModuleCSS").length) $('head').append('<style type="text/css" id="NewFilesModuleCSS">\n#NewFilesModule #gallery- { position:relative;overflow-y:auto; clear: both; text-align:center; height:452px; }\n#NewFilesModule #gallery-:hover {padding-bottom: 100%; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; left: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display:block; padding: 5px; margin-top: 0; position: absolute; border: 1px solid; background-color: #fff; z-index: 2; right: 0; width: 250px !important; }\n#NewFilesModule h2 {margin: 0 2em 0 0;}\n#NewFilesModule h2 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n#NewFilesModule .wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n#NewFilesModule .wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n#NewFilesModule a.image-no-lightbox[href$="ogg"] { background-image:url("https://images.wikia.nocookie.net/saintsrow/images/thumb/c/c9/Audio_log_visual.png/200px-Audio_log_visual.png"); color: black; font-weight: bold; }\n@media only screen and (max-width: 1023px) {#NewFilesModule {display:none;}}\n</style>');
	} /* End of custom "NewFilesModule" */

	//add diff links and replace 'a wikia contributor' with the IP address.
	if ($("#wikia-recent-activity").size() && !$("#wikia-recent-activity").hasClass("replaced")) {
	  //Only run if #wikia-recent-activity has been added, and it has not already been replaced, because #wikia-recent-activity is replaced twice when logged out.
	  $("#wikia-recent-activity").addClass("replaced");

	  $("#wikia-recent-activity li").each( function() {
	    if ($(".edit-info-user", this).attr("href").indexOf("/Special:Contributions/") != -1)
	      $(".edit-info-user", this).html($(".edit-info-user", this).attr("href").replace("/wiki/Special:Contributions/",""));
	    $(this).prepend('<a href="'+$("a", this)[0].getAttribute('href', 2)+'?diff=cur" title="show me the change on this page"></a>');
	  });
	}
	/*
          JoinModule - "Help the Wiki" sidebar message.
	  based on tardis.wikia.com/MediaWiki:Common.js/mosbox.js
	  Permission given in https://support.wikia-inc.com/tickets/103511  
	  Reaffirmed publicly: https://community.wikia.com/Thread:720672#6
	  While Wikia staff may later change their mind, this edit cannot be regarded as a TOU violation as it was valid at the time it was made
        */
	if ($('#WikiaRail section').size() && !$('#JoinModule').size()) { 
/*
	  var joinheading = new Array("You can edit","Anyone can edit","Anybody can edit","Everyone can edit","Everybody can edit","Help us out","Can you add anything?","What can you add?","See something wrong?","Want to help out?","Do you like editing?","We want you to edit!","Add your knowledge","We need your help","Can you improve the wiki?","Editing is easy","New editors needed","Information needed","Your help is needed","The wiki needs you!","Join the wiki","Edit the wiki","Help the wiki");

	  var joincontent = "<section id='JoinModule' class='module center'><h2>"+joinheading[Math.floor((Math.random()*joinheading.length))]+"</h2><span style='color: purple;font-size: 105%;'>"
	   +"Check our <b><a href='/Saints_Row_Wiki:To-do_list'>to-do list</a></b> for ways to help."
	   +"<br /><a href='/Forum'>Use the Forum</a> if you can't find what you need."
	   +"<br /><b>If something is incorrect, <a href='?action=edit'>please fix it</a>.</b>"
	   +"</span></section>";
*/
	  var joincontent  = "<section id='JoinModule' class='module center'><h2>Shortcuts</h2><div style='overflow: auto;'><div class='JoinLeft'><a href='/Saints_Row_Wiki'>Main Page</a><br><a href='/Portal:Index'>Index</a><br><a href='/Special:RecentChanges'>Recent Changes</a><br><a href='/Saints_Row_Wiki:News'>News</a><br></div><div class='JoinRight'><a href='/Saints_Row_Wiki:To-do_list'>To-do list</a><br><a href='/Saints_Row_Wiki:Forums'>Forum</a><br><a href='/Special:Upload'>Upload Files</a><br><a href='/Saints_Row_Wiki:Maps'>Maps</a></div></div></section>";

	  $('#WikiaRail section.rail-module').eq('0').before(joincontent);
	}
	if (!$('#RCLink').size()) 
	  $(".WikiaActivityModule").append('<a href="/Special:RecentChanges" title="Special:RecentChanges" class="more" style="float:left;" id="RCLink">Recent Changes</a>');

  });  //end of DOMNodeInserted block
  $('#WikiaRail').trigger('DOMNodeInserted'); //Bypass race condition by firing the event.

  initReferences();

  $(".mw-collapsible .ogg_player").on("click", function() { return false; } )

  function randomiser(randomclass, randomtemplate, successfunction) {
	  $(randomclass+" .mainboxheading").append(' - <a>Refresh</a>').unbind("click").bind("click", function() { 
	    $(randomclass+" .mainboxbody").html("");
	    $(randomclass+" .mainboxbody").addClass("loading");
	    $.ajax({"dataType": "text","data": {"action": "parse","format":"xml","disablepp":"1", "prop":"text","text": randomtemplate},"url": "/api.php","success": function(data) { 
	    $(randomclass+" .mainboxbody").html($(".mainboxbody",$("text", $(data)[1]).text()).html() );
	    $(randomclass+" .mainboxbody").removeClass("loading");
	    $('.mw-collapsible').makeCollapsible();
	    if (typeof successfunction == 'function') successfunction(data);
	  } }); });
  }

  randomiser(".randompages", "{{mainbox|class=randompages|Random Pages|{{randompages}}}}");
  randomiser(".randomimage", "{{Random/Image|size=555}}");
  randomiser(".randomtrivia", "{{Random/Trivia}}");
  randomiser(".randomquote1", "{{Random/Quote/1}}");
  randomiser(".randomquote2", "{{Random/Quote/2}}");
  randomiser(".randomquote", "{{Random/Quote}}", function(data) { 
	$(".randomquote").attr("class",$($("text", $(data)[1]).text()).attr("class"));
	$(".randomquote .mainboxheading").html($(".mainboxheading",$("text", $(data)[1]).text()).html()+' - <a>Refresh</a>' );
	$(".hiddenContent .ogg_player").remove();
  });
  randomiser(".randomaudio", "{{Random/Audio}}", function(data) { 
	if ($(".randomaudio .ogg_player").size() == 1) $(".randomaudio .mainboxheading").click();  //if empty, skip to next.
	$(".hiddenContent .ogg_player").remove();
  });

  // Randomiser for [[Ho-ing]] to replace previous <choose><option> randomiser
  $(".RandomHoing").append(' <a style="cursor: pointer;">(Refresh)</a>').bind("click", function() { var h1 = ["Dirty","Rusty","Donkey","Angry","Golden","Mushroom","Pearl","Golden","Slippery","Angry","Dripping","Moist","Backdoor","Steaming","Brown","Tickling","Hairy","Dirty","Spitting","King's","Diving","Shooting","Stinky","Rising","Avenging","Submissive","Crazy","Wicked","Royal","Blazing","Creeping","Bloody","Roman","Greek","Sitting","Fiery","Inverted","Clockwise","Double-Fisted"], h2 = ["Sanchez","Trumpet","Punch","Dragon","Shower","Tattoo","Necklace","Corkscrew","Dragon","Knuckler","Shocker","Franklin","Twister","Johnson","Lollipop","Swirl","Vice Grip","Sanchez","Jimmy","Mudslide","Cornhole","Spelunker","Dillow","Scooter","Phoenix","St. James","Milkshake","Double-Stuff","Princess","Norris","Lizard","Matriarch","Butterfly","Mantis","Rattlesnake","Bishop","Shower","Monkey Wrench","Knead"];
  $(".RandomHoing").html(h1[Math.floor((Math.random()*h1.length))]+" "+h2[Math.floor((Math.random()*h2.length))]+' <a style="cursor: pointer;">(Refresh)</a>'); });

  $(".mw-special-Search .search-tabs li:last").before('<li class="'+(mw.util.getParamValue('discussions')?'selected':'normal')+'"><a class="articles" href="/Special:Search?search='+$(".mw-special-Search input[name=search]").val() +'&amp;fulltext=Search&amp;ns1=1&amp;ns3=1&amp;ns5=1&amp;ns7=1&amp;ns9=1&amp;ns11=1&amp;ns13=1&amp;ns15=1&amp;ns110=1&amp;ns111=1&amp;ns113=1&amp;ns500=1&amp;ns501=1&amp;ns502=1&amp;ns503=1&amp;ns700=1&amp;ns701=1&amp;ns1201=1&amp;discussions=1" title="Search in all discussions">Discussions</a></li>'); //Add "Discussions" link to search options
  $(".mw-special-Search a[href*='Saints_Row_Wiki:Disambiguation:']").each(function() { $(this).html($(this).html().replace("Saints Row Wiki:Disambiguation:","Disambiguation:")); }); //Fix links to disambiguation pages.

  if ((wgNamespaceNumber == 1201) && !$(".msg-title a").text()) {
	$("ul.replies").prepend("<li class='center'><h1 class='center'><a href="+$(".msg-title a").attr("href")+">This is a thread reply<br>Do not reply here<br>Click here for the parent thread instead</a></h1></li>");
	$(".replyBody").attr("placeholder", "Do not reply here");
	$("ul.replies").append("<li class='center'><h1 class='center'><a href="+$(".msg-title a").attr("href")+">This is a thread reply<br>Do not reply here<br>Click here for the parent thread instead</a></h1></li>");
  }

  /* Add countdown to cached special pages.  Uses some of /countdown.js  */
  if (wgNamespaceNumber == -1) {
	var datestring = $('*:contains("The following data is cached, and was last updated")');
	if (datestring.length && !$("#UpdateCountdown").length) {
	  founddate = datestring[datestring.length-1].innerHTML.match(/updated (.*). A/)[1];
	  now = new Date();
	  now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
	  then = new Date(founddate.split(",")[1]+founddate.split(",")[2]+ " "+founddate.split(",")[0]);
	  next = new Date(then.getTime()+(24*60*60000));
	  diff = count=Math.floor((next.getTime()-now_utc.getTime())/1000);
	  if (diff > 0) {
	    var left = (diff%60) + 's';    diff=Math.floor(diff/60);
	    if(diff > 0) left = (diff%60) + 'm ' + left;    diff=Math.floor(diff/60);
	    if(diff > 0) left = (diff%24) + 'h ' + left;    diff=Math.floor(diff/24);
	    if(diff > 0) left = diff + ' days ' + left;
	    $(datestring[datestring.length-1]).append("<div id='UpdateCountdown'>Time left until next update: "+left+"</div>");
	  } else $(datestring[datestring.length-1]).append("<div id='UpdateCountdown'>The special page cache update is overdue.</div>");
	}
  } //end special pages countdown

  if ((wgNamespaceNumber == 0) && $("#suggestions").length) { /* bastardised from https://dev.wikia.com/SearchSuggest */
	if ($("#suggestions").html() == "...there are no suggestions.") $("#suggestions").html("Loading suggestions...");
	function get404Suggestions(thePageName, retry) {
	  if (thePageName.indexOf("_") != -1) tryPageName = thePageName.split("_").slice(0,-1).join("_");
	  else tryPageName = thePageName.substr(0,thePageName.length-1);
	  debug452(thePageName +" not found.  Try: "+tryPageName+" ("+retry+")");
	  if (retry && (thePageName == tryPageName || thePageName.length < 3)) {
	    if ($("#suggestions").html() == "Loading suggestions...") $("#suggestions").parent().remove();
	    return;
	  }

	  $.getJSON('/api.php?action=opensearch&limit=100&search=' + encodeURIComponent(tryPageName))
	  .done(function (data) {
	    var results = data[1], resultLink;
	    if ($.isArray(results) && results.length) {
	      for (var i = 0; i < results.length; i++) {
	        resultLink = '<a href="/wiki/' +
	          encodeURIComponent(results[i]) + '">' +
	          mw.html.escape( results[i] ) +
	          '</a>';
	        if (wgTitle.indexOf(results[i]) == 0) resultLink = "<b>"+resultLink+"</b>";
	        results[i] = resultLink;
	      }
	      $("#suggestions").html(results.join(', '));
	    } else {
	      setTimeout(function() { get404Suggestions(tryPageName, retry+1) }, 100);
	    }
	  });
	}
	get404Suggestions(wgPageName, 0);
  } // end 404Suggestions

  // Category:Alternate_titles
  if ($("#alttitles").length && (wgCanonicalNamespace == "Category")) {
	$.getJSON("/api.php?action=query&generator=categorymembers&rvprop=content&prop=revisions%7Cinfo&gcmtitle="+wgPageName+"&gcmlimit=500&format=json")
	.done(function (data) {
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

  if (wgCanonicalNamespace == "Category") { /* Default category images for pages without images, previously handled by CSS */
	$(".category-page__member-left").addClass("empty");
	$(".category-page__member-left *").parent().removeClass("empty");
  }

  $("#ExpandFilenamesLink").html(
	$("<a>", { html:"Expand filenames" })
	.bind("click", function() {
	  $('.gallerytext a').each(function() {
	    $(this).text($(this).attr('title').replace('File:', ''));
	  })
	})
  )

  $(".diff-addedline, .diff-deletedline").each(function(){ 
    $(this).html($(this).html().replace(/&/g, "&amp;").replace(/&amp;lt/g, "&lt").replace(/&amp;gt/g, "&gt").replace(/&amp;amp;/g, "&amp;") ) 
  });

}); // end $(function() block

$(".wds-button-group").addClass("buttons"); /* buttons are buttons */

function SRWscroll() { if (typeof ImgLzy != "undefined") ImgLzy.onScroll(); }

window.whenReady = new Array();
document.onreadystatechange = function () {
  if (document.readyState == "complete") {
	$(".tabber").css('display','block');
	$(".tabber").addClass('failed');

	window.whenReady.forEach(function(z){
	  if (typeof window[z] === "function") window[z](); 
	});
	//example: window.whenReady.push("functionName");

	if ($(".CategoryTreeTag").size()) {
		if (mw.loader.getState("ext.categoryTree") == "registered") mw.loader.load("ext.categoryTree");
		else if (mw.loader.getState("ext.categoryTree") == "loading") {
			mw.loader.implement("ext.categoryTree",function($){(function($,mw){var categoryTree={showToggles:function(){$('span.CategoryTreeToggle').css('display','inline');},handleNode:function(e){var $link=$(this);if($link.data('ct-state')==='collapsed'){categoryTree.expandNode($link);}else{categoryTree.collapseNode($link);}},expandNode:function($link){var $children=$link.parents('.CategoryTreeItem').siblings('.CategoryTreeChildren');$children.show();$link.html(mw.msg('categorytree-collapse-bullet')).attr('title',mw.msg('categorytree-collapse')).data('ct-state','expanded');if(!$link.data('ct-loaded')){categoryTree.loadChildren($link,$children);}},collapseNode:function($link){$link.parents('.CategoryTreeItem').siblings('.CategoryTreeChildren').hide();$link.html(mw.msg('categorytree-expand-bullet')).attr('title',mw.msg('categorytree-expand')).data('ct-state','collapsed');},loadChildren:function($link,$children){var $linkParentCTTag,ctTitle,ctMode,ctOptions;function error(){var $retryLink;$retryLink=$('<a>').text(mw.msg('categorytree-retry')).attr('href','#').click(function(e){e.preventDefault();categoryTree.loadChildren($link,$children);});$children.text(mw.msg('categorytree-error')+' ').append($retryLink);}$link.data('ct-loaded',true);$children.html($('<i class="CategoryTreeNotice"></i>').text(mw.msg('categorytree-loading')));$linkParentCTTag=$link.parents('.CategoryTreeTag');ctTitle=$link.data('ct-title');ctMode=$linkParentCTTag.data('ct-mode');ctMode=typeof ctMode==='number'?ctMode:undefined;ctOptions=$linkParentCTTag.data('ct-options')||mw.config.get('wgCategoryTreePageCategoryOptions');if(typeof ctTitle!=='string'){error();return;}$.get(mw.util.wikiScript(),{action:'ajax',rs:'efCategoryTreeAjaxWrapper',rsargs:[ctTitle,ctOptions,'json']}).success(function(data){data=data.replace(/^\s+|\s+$/,'');data=data.replace(/##LOAD##/g,mw.msg('categorytree-expand'));if(data===''){switch(ctMode){case 0:data=mw.msg('categorytree-no-subcategories');break;case 10:data=mw.msg('categorytree-no-pages');break;case 100:data=mw.msg('categorytree-no-parent-categories');break;default:data=mw.msg('categorytree-nothing-found');}data=$('<i class="CategoryTreeNotice"></i>').text(data);}$children.html(data).find('.CategoryTreeToggle').click(categoryTree.handleNode);categoryTree.showToggles();}).error(error);}};$(function($){$('.CategoryTreeToggle').click(categoryTree.handleNode);categoryTree.showToggles();});})(jQuery,mediaWiki);;},{},{"categorytree-collapse":"collapse","categorytree-expand":"expand","categorytree-collapse-bullet":"[<b>\u2212<\/b>]","categorytree-expand-bullet":"[<b>+<\/b>]","categorytree-load":"load","categorytree-loading":"loading\u2026","categorytree-nothing-found":"nothing found","categorytree-no-subcategories":"no subcategories","categorytree-no-parent-categories":"no parent categories","categorytree-no-pages":"no pages or subcategories","categorytree-error":"Problem loading data.","categorytree-retry":"Please wait a moment and try again."});
		}
	}
	debug452("readyState = complete");
	$(window).trigger('resize');
  }
}
if (mw.util.getParamValue('action') != "edit") {
  tabberOptions = {
	manualStartup: 1, //to disable default tabber script, custom tabber script ignores this.
	onLoad: function() {
	  debug452("tabber loaded");
 
	  $(this.div).css('display','block');

	  $(this.div).css('margin-right','-1px'); //fixes issue where content does not resize to fit tabber.
	  if ($($("li a", this.div)[0]).attr("title") == "Male 1") this.tabShow(Math.floor(Math.random()*$("li a", this.div).length));

	  if (window.location.hash) {
	    var choosetab = (window.location.hash).replace('#', '').replace(/_/g, ' ');
	    var currentTabber = this;
	    $(".tabbernav li a", this.div).each(function(i) { 
	      if ($(this).attr("title") === choosetab) currentTabber.tabShow(i);
              if ($('.tabberlive .tabbernav a[title="'+choosetab+'"]').size()) $('.tabberlive .tabbernav a[title="'+choosetab+'"]').get(0).scrollIntoView();
	    });
	    delete currentTabber;
	  }
	}
  };
}

function initReferences() { 
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

window.wgWikiaChatWindowFeatures = '';

var loadScripts = new Array(); //cut down on unnecessary scripts being loaded.

if ($("#SRWmap").length) loadScripts.push('MediaWiki:Common.js/SRWMaps.js');

if (typeof wgIsEditPage != "undefined"|| mw.util.getParamValue('action') == "edit" || mw.util.getParamValue('action') == "submit") {

  loadScripts.push('MediaWiki:Common.js/stdSummaries.js');	/* adds standard edit summaries dropdown - supports monobook */
  loadScripts.push('MediaWiki:Common.js/stdTemplates.js');	/* adds standard templates dropdown      - supports monobook */
  loadScripts.push('MediaWiki:Common.js/htmlentities.js');	/* adds a button to encode htmlentities  - supports monobook */

  $(".diff-link").addClass("wikia-menu-button secondary control-button");

} else if (wgPageName == "Special:Search") {

  loadScripts.push('MediaWiki:Common.js/SearchSuggest.js');			/* add "search suggestions" to search results */

} else if (wgPageName == "Special:RecentChanges") {

  loadScripts.push('MediaWiki:Common.js/AjaxRC.js');			/* Autoload new items on Recentchanges   - supports monobook */

} else {

  if ($("#UserProfileMasthead").size())
	loadScripts.push('MediaWiki:Common.js/usericons.js');		/* Import custom usericons                - supports monobook */

  if (wgPageName == "Special:DeadVideos")
	loadScripts.push('MediaWiki:Common.js/DeadVideos.js');		/* Special:DeadVideos */

  if ($("#mw-dupimages").length) 
	loadScripts.push('MediaWiki:Common.js/DupImageList.js');		/* Import dup image list. see that page for usage */ 

  if (wgPageName.indexOf("Saints_Row_Wiki:Polls") != -1 || $(".SRWpoll").size())
	  loadScripts.push('MediaWiki:Common.js/polls.js');

  loadScripts.push('MediaWiki:Common.js/tabber.js');			/* copied external script locally to ensure loading */
  loadScripts.push('MediaWiki:Common.js/ResizeSlideshow.js');		/* Resize Slideshows to fit page width   - supports monobook */
  loadScripts.push('MediaWiki:Common.js/tablePopout.js');		/* Enables popout tables                 - supports monobook */
  loadScripts.push('MediaWiki:Common.js/countdown.js');			/* Import javascript countdown. Usage: {{countdown| date }}  */
  loadScripts.push('MediaWiki:Common.js/ReferencePopups.js');		/* reference popups */
  loadScripts.push('MediaWiki:Common.js/RevealAnonIP.js');		/* Replace "a wikia contributor" with IP address */

  loadScripts.push('MediaWiki:Common.js/View_Source.js');		/* add "view source" link to edit dropdown */
  loadScripts.push('MediaWiki:Common.js/PurgeButton.js');		/* add "refresh"     link to edit dropdown */
  loadScripts.push('MediaWiki:Common.js/NullEditButton.js');		/* add "null edit"   link to edit dropdown */
}
importArticles({ type: 'script', articles: loadScripts });

//These functions are not used anywhere, but exist so anyone can use them for testing.
function toggleCSS() { $('link[href*="oasis/site"]').attr( "disabled",function(idx, oldAttr){return !oldAttr;}); $(window).trigger('resize'); }
function toggleUserCSS() { $("link[rel='stylesheet'][href*='"+wgUserName+"'][href$='/user']").attr("disabled",function(idx,oldAttr){return!oldAttr;}); $(window).trigger('resize'); }
function debug452(out, alert) { if (wgUserName == "452") if (typeof alert != "undefined") window.alert(out); else { if (typeof out == "string") console.log(new Date().toJSON()+" "+out); else { console.log(new Date().toJSON()); console.log(out); } } }

  debug452("mediawiki:common.js loaded");

//adds button to insert wikitext for redirect 
if ( mwCustomEditButtons ) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAMAAAAcqPc3AAAABGdBTUEAAK/INwWK6QAAAMBQTFRF////AAAACgsNNjtDdYijQ0tXTVZjeoicZnGCj5+2foygVF1qVl9sWGFul6a8go+ih5SnXmd0SE9ZjpuuFhgb1+f+Q1l4a3uQhpixkKO9k6bAl6rEmq3HbHmLnrHLUVtoo7bQmavDKzA3qLvVsMPds8bgqLrSS1Nerb/YorPKeoeYxNjzus3nk6K2YGp3wdTutcffYmx5vc/opbXLanSCydz20uT9c4KVJisxIiYrQEdQQklSLjM5bHeFRk1WSGB7VATZWgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADvSURBVCjPfc7NVoMwEIbhTGpLrVCs1uJPjGkALYWIjaggWO7/rvzAZXN8FzNznkVOGHMWMXbjqj/xz7ENYx+u/vEc7U1u9rk5oEszALxE/KfsrspXGmveyhJurX2na8sru6LhPlJlLbxYdg11HTXLFRUoo2NRwFOj11yvSZuA0jR9bslLU3iSJLpNAp0kwfg8byHwXRby77CZhJlPvq/pZYfg8eLvG7S4oDiOJ1RhwtX2ibw5zT1spdSW83Ol4FLOavlIEnsYOGsp4ULUUzGrhRCHYQgxrb8E/MEV/N4V/M4V/NYV/MxVz6J+c1of/QL8zzSM8mokQQAAAABJRU5ErkJggg%3D%3D",
		"speedTip": "Redirect",
		"tagOpen": "#REDIRECT [[",
		"tagClose": "]]",
		"sampleText": "Insert page name"
	};
//adds button for /htmlentities.js to use.
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAWCAIAAACkFJBSAAAAB3RJTUUH3gEKBRABjTP+BwAAAAlwSFlzAAAOwgAADsIBFShKgAAAAARnQU1BAACxjwv8YQUAAAKCSURBVHjaY/z//z8DZSCnZiILkLrxgiKD7j59DTLl91+KTPn98y/IlO8/fsKFVi+esXTOhOdPH0lKy0WnFITGZhBjEAsyZ8WCKf0tZRA20KCexiJmFpagyBSCpjCBnPTnLwStWjQDyI1Mypu/4ZhnYDSQvXBGD1wWF4Ka8vfPbwj6/vULkBuTWqSkopGQCXIUMxMzXBYXgpry5/cvCPIJiQNyl82dAGSvWQJyl4O7P1wWjux1hIAIzoWGy99/0DiKSSt+dP82MHRPHd1/+/pFKwePsIRcuCwaQBYHmfLzJyKOlNS0D+zaCDRCS8+krHkqExMzsiwEzF17BE0XOFzA4OuXz521OfOmtJnbugqLSty4ev7k4d0QqTPH9r9/9+YvDAiLSQIRnIsSurMnNB7Zu8XNN6KsaXJ58xRguPY3FV2/dOb5kweNJYnVOZEEQhcSYccP7gSyA6LSgGw5Zc2UgvofP7511GSfPXEQKO7iE4YnpsE54PdvuA+fPLrHyy8EZFg5et+5cXn35hXzJreysrJZ2HsgK8OW6sBAS98UyF48o+v29UsfP7w/fnDHo/u3gCL//v1l5+AECv7GAYBqGIElw+x1J4CsVy+etJYmfv/2BdkSIwtHoCuWzOz88uljQFS6R2AsUDAt2BJIzlp7HKJm5ZqNLJA4ApLCopLV3QuWze6+e+PSzx/fZRRULB28nLzCgFLVXQvWL5t+/841iEpoekFig9wyZflBYjIuHNy8cnbZrO7GSSsg3A2bd7CgmUoMuHz2mIqmPrIukCnfvn4hyZTXL56EJOQj6wKZ8v7DJ5JM8Y7M+f7z7/efUF2s7MyM2dUTbtx7QZIpaEBDSQIAZ0sFCw7IoO0AAAAASUVORK5CYII=",
		"speedTip": "HTMLencoder",
		"tagOpen": "",
		"tagClose": "",
		"sampleText": "",
		"imageId": "HTMLencoder"
	};
}
//</nowiki>
$(document).ready(function() {

	$commentDiv = $("#comments");
	
	$.get("https://disqus.com/api/3.0/forums/listPosts.json?forum=cflib&limit=10&related=thread&api_key=vSK5ndtqzaZGn4aEsYsR9xCrV1z656kxT0VODoLLbCOQvFQezy6wtBWNe9Jy3GW4", function(res, code) {
		//Good response?
		if(res.code === 0) {
			var result = "";
			for(var i=0, len=res.response.length; i<len; i++) {
				var post = res.response[i];
				console.dir(post);
				var html = "<div class='comment'>";
				html += "<img src='" + post.author.avatar.small.permalink + "'>";
				html += "<a href='"+ post.author.profileUrl + "'>" + post.author.name + "</a>";
				html += "<p>"+post.raw_message+"</p>";
				html += "<p class='postRef'>Posted at " + post.createdAt + " on <a href='"+ post.thread.link + "'>" + post.thread.title + "</a></p>";
				html += "</div>";
				
				result+=html;
			}
			$commentDiv.html(result);
		}
	});
});


SpoilerAlert = {
    'class': "Spoiler",
    question: 'Trang này có spoiler, bạn có muốn xem không?',
    yes: 'Có, tôi muốn xem.',
    no: 'Không, tôi không muốn.',
    isSpoiler: function () {
        return Boolean($('#spoiler').length);
    }
};

var WikiaNotificationMessage = "<b><u><a href='/wiki/Thread:45659'>Click tại đây để báo lại các chương có vấn đề QUÁ NẶNG về dịch thuật để Sonako ngày một thêm hoàn thiện.</a></u></b>";

var WikiaNotificationexpiry = 0;

window.lastEdited = {
    avatar: true,
    size: false,
    diff: true,
    comment: false,
    time: 'timeago',
    namespaces: {
        include: [],
        exclude: []
    },
    pages: []
};

var MultiUploadoption = {
  max: 30
};
var globalJSArticles;
 
try {
	globalJSArticles = JSON.parse(sessionStorage.getItem("globalJSArticles"));
} catch (e) {
	globalJSArticles = null;
}
 
if (!jQuery.isArray(globalJSArticles)) {
	globalJSArticles = [
		"w:c:dev:BackToTopButton/code.js",
		"u:dev:UserTalkNotifications/code.js",
		"u:dev:RedirectManagement/code.js",
                'u:dev:LastEdited/code.js',
                'u:dev:MultiUpload/code.js',
                'u:dev:SpoilerAlert/code.2.js',
                'u:dev:WikiaNotification/code.js',
        'u:sonako:MediaWiki:Musicbox.js',
        'u:sonako:MediaWiki:Thongbao.js',
        'u:sonako:MediaWiki:AMV.js',
        'u:sonako:MediaWiki:Wikia.js/Changecolor.js',
        'u:sonako:MediaWiki:Wikia.js/customInterface.js',
	'u:sonako:User:Dai_ca_superman/GlobalScripts.js',
	'u:kangaroopower:Mediawiki:Scope.js',
	'u:sonako:MediaWiki:Liquid-Rotate_Rail.js',
	'u:sonako:MediaWiki:Common.js/SocialIcon.js',
	'u:sonako:MediaWiki:Moduledoc.js',
	'u:sonako:MediaWiki:Editdropdown.js',
	'u:admintools:MediaWiki:Common.js/CEB.js'
	];
}
 
console.log("globalJSArticles =", globalJSArticles);
console.log("\nglobalJSArticles.splice(4, 1); sessionStorage.setItem(\"globalJSArticles\", JSON.stringify(globalJSArticles)); window.location.reload();\n\nsessionStorage.removeItem(\"globalJSArticles\"); window.location.reload();\n");
 
// Load all scripts with importArticles()
// http://help.wikia.com/wiki/Help:Including_additional_JavaScript_and_CSS
 
importArticles({
	type: 'script',
	articles: globalJSArticles
});
 
/* </source> */

/* Custom "NewFilesModule" by 452 - displays [[Special:NewFiles]] in the right rail
   There are three ways to use this, by setting the NewFilesModuleCompact variable
   0 - Normal, width is 212
   1 - Compact, width is 106
   2 - Random, if you're not sure which version you like best.

   In both modes, hovering over each displays the uploader info.

   NewFilesModuleCount can be used to specify the number of displayed images.
*/
var NewFilesModuleCompact = 2; //must be 0, 1, or 2.
var NewFilesModuleCount = 13; //any integer

if ($('#WikiaRail').length) { //only on pages where the rail is present
  $('#WikiaRail').bind('DOMNodeInserted', function(event) { //fires after lazy-loading takes place.
    if (!$("#NewFilesModule").length) { // Only add it ''once''
      if (typeof $temp == "undefined") { // Only load it ''once''
        $temp = $('<div>'); // this line, and the next, originate from http://dev.wikia.com/wiki/AjaxRC/code.js <3
        $temp.load("/Special:NewFiles/" +NewFilesModuleCount + " #gallery-", function () {
          $('#WikiaRail section:last-of-type').after("<section id='NewFilesModule' class='module'><h1><a href='/Special:NewFiles'>New Files</a><a class='wikia-button' href='/Special:Upload'>Upload</a></h1>");
          if (typeof NewFilesModuleCompact == "undefined") NewFilesModuleCompact = 0;
          if (NewFilesModuleCompact == 2) NewFilesModuleCompact = Math.floor(Math.random()*2);
          if (NewFilesModuleCompact) {
            $('#gallery-', $temp).html($('#gallery-', $temp).html().replace(/\/scale-to-width\/\d*\?/g, "/scale-to-width/106?"));
            $("#NewFilesModule").addClass("compact");
          }
          $("#NewFilesModule").append($('#gallery-', $temp));
          $("#NewFilesModule .wikia-photogallery-add").remove();
          $("#NewFilesModule .wikia-gallery-item").each(function() { $(".lightbox-caption", this).prepend($("<a>").attr("href",$(".gallery-image-wrapper>a", this).attr("href")).html($(".gallery-image-wrapper>a", this).attr("title")).append($("<br>")));});
          delete $temp; //delete it, in case the rail is wiped after this point.
        });
      }
    }
  });  //end of DOMNodeInserted block
   $('head').append('<style type="text/css">\n#gallery- { position:relative;overflow-y:auto; clear: both; text-align:center; height:452px; }\n#gallery-:hover {padding-bottom: 13em; }\n#NewFilesModule .gallery-image-wrapper { top: 0 !important; height: auto !important; border:none;  background: none; }\n#NewFilesModule.compact .gallery-image-wrapper { width: auto !important; }\n#NewFilesModule .thumb { height:auto !important; }\n#NewFilesModule .wikia-gallery-item { margin: 1px !important; padding: 0 !important; height: auto !important; border: none !important; }\n#NewFilesModule.compact .wikia-gallery-item { width: auto !important; }\n#NewFilesModule .wikia-gallery-item .lightbox-caption { display: none; }\n#NewFilesModule .wikia-gallery-item:hover .lightbox-caption { display:block; padding: 5px; margin-top: 0; position: absolute; border: 1px solid; background-color: #fff; z-index: 2; right: 0; width: 240px !important; }\n#NewFilesModule h1 {margin: 0 2em 0 0;}\n#NewFilesModule h1 a:first-child {color:inherit;}\n#NewFilesModule img { display: block; height: auto !important; width: auto !important; margin-left: auto !important; margin-top: auto !important;}\n.wikia-gallery-item .gallery-image-wrapper a { width: auto !important; height: auto !important; }\n.wikia-gallery-item .gallery-image-wrapper a.image-no-lightbox { line-height: normal; display: block; padding: 1em; }\n</style>');

} // End of custom "NewFilesModule"

//Restore ogg_player info link click - Wikia has been informed of this problem, and the cause.
$(".ogg_player a.image").each(function(){ $(this).unbind("click").bind("click", function() {  window.open($(this).prop("href"));  }); })

$(function() {   /* use monobook when editing CSS/JS pages. */
  if (wgCityId == 4470) return;
  if ((wgPageName.substr(-3) == ".js") || (wgPageName.substr(-4) == ".css")) {
    $("a[href*='.js?action=edit'], a[href*='.css?action=edit']").each(function(){ 
      $(this).attr("href", $(this).attr("href").replace('?action=edit', '?action=edit&useskin=monobook&usesitecss=0')); 
    });
    if (mw.util.getParamValue('action') == "edit") {     
      if (!mw.util.getParamValue('useskin') ) {
        window.location.href = window.location.href.replace('?action=edit','?action=edit&useskin=monobook&usesitecss=0');
      } else {
        $("#editform").attr("action", $("#editform").attr("action")+"&useskin="+mw.util.getParamValue('useskin'));
      }
    }
  }
});


/* add powerusers checkbox to Special:Listuers */
if (wgCanonicalSpecialPageName == "Listusers") $("fieldset.lu_fieldset tr:last-child").prepend('<td valign="middle" style="padding:0px 2px 0px 1px;"><label for="checkBoxForpoweruser"><span style="vertical-align:middle"><input type="checkbox" name="lu_target" class="lu_target" value="poweruser" checked="checked" id="checkBoxForpoweruser"></span> <span style="padding-bottom:5px;">Power Users</span></label></td>');

function toggleCSS() { $('link[href*="oasis/site"]').attr( "disabled",function(idx, oldAttr){return !oldAttr;}); $(window).trigger('resize'); }
function toggleUserCSS() { $("link[rel='stylesheet'][href*='"+wgUserName+"'][href*='/user']").attr("disabled",function(idx,oldAttr){return!oldAttr;}); $(window).trigger('resize'); }
if (!$("#toggleCSS").length) $("#WikiaBarWrapper .toolbar .tools").append("<li><a id='toggleCSS' href='javascript:toggleCSS()'>Toggle CSS</a></li><li><a href='javascript:toggleUserCSS()'>Toggle User CSS</a></li>");
  
if ($("#UserProfileMasthead").size()) $("#UserProfileMasthead .tally em").wrap($("<a>").attr("href", "/Special:EditCount/"+$("#UserProfileMasthead h1[itemprop=name]").html()));

if (wgCanonicalNamespace == "Special") $(".WikiaArticle ul:not(.countLI)").each(function(){  if ($(">li", this).size() != 50 && $(">li", this).size() > 15) $(this).addClass("countLI").prepend("<li>Displaying "+$(">li", this).size()+"</li>");  });

if ($(".WikiaPageHeaderDiffHistory").length && $(".wikia-button[data-id=edit]").attr("href").length) {
  /* change the "edit" link of a diff page to edit the current version, as there is already an edit link for both diffs */
  oldhref = $(".wikia-button[data-id=edit]").attr("href");
  var newhref = oldhref.split("&oldid=")[0];
  $(".wikia-button[data-id=edit]").attr("href", newhref);
}
if (!$("#ca-diff").length && $("a[data-id='history']").closest("ul")) { //adapted from NullEditButton script
  $("a[data-id='history']").closest("ul").prepend($('<li><a/>').find("a").attr({
    href: window.location.origin+window.location.pathname+"?diff=cur",
    accesskey: "0",
    id: "ca-diff",
    title: mw.config.get('wgPageName')
  }).text("Last diff"))
}

if ((wgNamespaceNumber == 1201) && !$(".msg-title a").text()) {
    $("ul.replies").prepend("<li class='center'><h1 class='center'><a href="+$(".msg-title a").attr("href")+">Link to parent thread</a></h1></li>");
}
if ($(".replies .SpeechBubble.message").length) $(".replies .SpeechBubble.message").each(function(){ $(".timestamp", this).append("(<a href='./Thread:"+$(this).attr("data-id")+"'>link</a>)"); });

  /* Add countdown to cached special pages.  Uses some of /countdown.js  */
  if (wgNamespaceNumber == -1) {
    var datestring = $('*:contains("The following data is cached, and was last updated")');
    if (datestring.length) {
      founddate = datestring[datestring.length-1].innerHTML.match(/updated (.*). A/)[1];
      now = new Date();
      now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
      then = new Date(founddate.split(",")[1]+founddate.split(",")[2]+ " "+founddate.split(",")[0]);
      next = new Date(then.getTime()+(24*60*60000));
      diff = count=Math.floor((next.getTime()-now_utc.getTime())/1000);
      var left = (diff%60) + 's';    diff=Math.floor(diff/60);
      if(diff > 0) left = (diff%60) + 'm ' + left;    diff=Math.floor(diff/60);
      if(diff > 0) left = (diff%24) + 'h ' + left;    diff=Math.floor(diff/24);
      if(diff > 0) left = diff + ' days ' + left;
      $(datestring[datestring.length-1]).append("<br>Time left until next update: "+left);
    }
  } //end special pages countdown

window.DragDropUploader = true;
var loadUserScripts = new Array();
if(wgPageName == "Special:RecentChanges") loadUserScripts.push('u:452:AjaxRC.js');
else if ($("#mw-upload-form").size()) loadUserScripts.push('u:452:DragDropUploader.js');
else {
  loadUserScripts.push('u:452:MaintenanceReport.js');
  loadUserScripts.push('u:452:NullEditButton.js');
  loadUserScripts.push('u:dev:AutoEditDropdown/code.js');
  loadUserScripts.push('u:dev:PurgeButton/code.js');
  loadUserScripts.push('u:dev:RevealAnonIP/code.js');
}
importArticles({ type: 'script', articles: loadUserScripts });
console.log("global.js loaded");

$(document).on('readystatechange', function(){
  if (document.readyState == "complete") {
    console.log("readyState complete");
    if (typeof window.snowStorm != 'undefined') {
      window.snowStorm.autoStart = false;
      window.snowStorm.disabled = true;
    }
  }  
});
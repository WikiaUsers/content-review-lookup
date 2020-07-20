// NOTE: support for NavFrames has been removed. Please use mw-collapsible instead.
//   For details see https://community.wikia.com/wiki/Help:Collapsing
// Please contact an administrator if you are still using NavFrame on this wiki.

///////////////////
// CONFIGURATION //
///////////////////
// Shortcut for importArticle
function impart(article) {
    importArticle({ type: 'script', article: article });
}

/////////////
// IMPORTS //
/////////////
 
// https://dev.wikia.com/wiki/Language_Notification
impart('w:c:dev:LWN/code.js');
 
// https://dev.wikia.com/wiki/DupImageList
if (mw.config.get('wgPageName') === "My_Little_Pony_Fan_Labor_Wiki:Duplicate_images") {
    impart('w:c:dev:DupImageList/code.js');
}

// https://dev.wikia.com/wiki/UserRightsRecord
if ($('.rightsrecord').length) {
    impart('w:c:dev:UserRightsRecord/code.js');
}
 
// Custom user rights icons on userpages
if (
  {'User':1, 'User_blog':1, 'User_talk':1}[mw.config.get('wgCanonicalNamespace')] ||
  mw.config.get('wgPageName').indexOf('Special:Contributions') !== -1
){
    impart('MediaWiki:Common.js/userRightsIcons.js');
}

// Imports dead video listing script by Bobogoobo
// Works on https://mlpfanart.wikia.com/wiki/Special:BlankPage?blankspecial=deadvideos
if (mw.config.get('wgPageName') === 'Special:BlankPage' && mw.util.getParamValue('blankspecial')) {
    impart('MediaWiki:Common.js/' + {
        'deadvideos': 'DeadVideos.js'
        }[mw.util.getParamValue('blankspecial')]
    );
}

//////////////////////
// TEMPLATE SUPPORT //
//////////////////////
 
// Support for [[Template:USERNAME]]
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
// Support for [[Template:Emote]] by Bobogoobo
if ($('.emote-template').length || $('#WikiaArticleComments').length) {
    $(function() {
        function emotify($this) {
            var emote = $this.text();
            var url = emotes.match(
              new RegExp('\\n\\*\\s*(.*)\\n(?:\\*\\*.*\\n)*(?=.*' + 
              emote.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1') + //escape specials, from MDN
              ')', 'i'));
            if (url) {
                url = url[1];
                $this.html($('<img />', {'src':url, 'alt':emote, 'height':19, 'width':19 }));
            }
        }
 
        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['9653'].revisions[0]['*'];
            // 9653 is the wgArticleId of MediaWiki:Emoticons
 
            $('.emote-template').each(function() {
                emotify($(this));
            });
        });
 
        $('#WikiaArticleFooter').on('DOMNodeInserted', function() {
            if ($('.emote-template').length === $('.emote-template img').length) {
                return;
            }
 
            $('#WikiaArticleFooter .emote-template').each(function() {
                if (!($(this).children('img').length)) {
                    emotify($(this));
                }
            });
        });
    });
}

// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
// TODO: needs fixing
$(function(){
  if ($(".toc-multicol #toc").size() !== 0) {
    $(function(){
		var x, tdToAppend, listToAppend, showtext = 'show', hidetext = 'hide';
		$("#toc").css("width","100%"); //need to subtract 12px from this for padding for some reason
		$("#toc ul").html("<table><tr><td>" + $("#toc ul").html() + "</td></tr></table>");
		var liList = $("#toc ul li").toArray();
 
		$('table#toc ul').remove();
		if (liList.length % 3 === 0) {
			x = 0;
		}else{
			x = 3 - (liList.length % 3);
		}
		var perCol = (liList.length + x) / 3;
 
		for (var colNum=0; colNum < 3; colNum++){
			listToAppend = "";
			for (var i=0+(colNum*perCol); i<(perCol*(colNum+1)); i++){
				if (typeof(liList[i]) == "undefined"){break;}
				tempElement = document.createElement("div");
				tempElement.appendChild(liList[i]);
				listToAppend += tempElement.innerHTML;
			}
			tdToAppend += '<td style="vertical-align: top; width: 33%;"><ul><table><tbody><tr><td><table><tbody><tr><td><table><tbody><tr><td>'+listToAppend+'</td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></ul></td>';
		}
 
		$('#toc tbody').append('<tr>'+tdToAppend+'</tr>');
		$('#toc tbody tr:eq(0) td').attr("colspan", "3");
		var indentFactor = 10;
		$("head").append("<style>.toclevel-1{padding-left: "+(indentFactor*1)+"px !important}.toclevel-2{padding-left: "+(indentFactor*2)+"px !important}.toclevel-3{padding-left: "+(indentFactor*3)+"px !important}.toclevel-4{padding-left: "+(indentFactor*4)+"px !important}</style>");
		$("#togglelink").off("click").click(function(e){e.preventDefault(); $('#toc ul').slideToggle("fast");
			if ($(this).text() === showtext) { $(this).text(hidetext); } else { $(this).text(showtext); } });
		if (!$('#toc ul').is(':hidden') && $('#togglelink').text() === showtext) {
			$('#togglelink').text(hidetext);
		}
    });
  }
});

///////////////////
// MISC. SCRIPTS //
///////////////////
 
// Fix lazy-loaded tabbified profile images
if ($("div.profile-image img.lzyPlcHld").length > 0){
    $("div.profile-image img.lzyPlcHld").each(function(){
        $(this).attr("src", $(this).attr("data-src"));
    });
}

// Automatically uncheck "Leave a redirect behind" on files
if (mw.config.get('wgPageName').indexOf('Special:MovePage/File:') !== -1) {
    $('input#wpLeaveRedirect').removeAttr('checked');
}
 
 
// Automatically uncheck "Unlock further protect options" when protecting a page
if (mw.config.get('wgAction') === 'protect') {
    $('#mwProtectUnchained').removeAttr('checked');
}

// Auto-insert link from anchor on [[Help:Red links]]
// Please report anything that still doesn't work right, it may need more exceptions
$(document).ready(function(){
    var redlink = window.location.hash;
    if (mw.config.get('wgPageName') === 'Help:Red_links' && redlink !== '') {
        redlink = redlink.slice(1);
        if (redlink.charAt(0) === ':') { redlink = redlink.substring(1); }
        if (redlink.substr(0, 5) !== 'File:') {
            redlink = redlink.replace(/\./g, '%');
        } else {
            var head = redlink.substring(0, redlink.lastIndexOf('.'));
            var tail = redlink.substring(redlink.lastIndexOf('.'));
            redlink = head.replace(/\./g, '%') + tail;
        }
        $("#insertredlink a").attr(
            "href", "/wiki/" + decodeURIComponent(redlink).replace(/\?/g, '%3F') + "?action=history"
        );
        $("#insertredlink a").css("font-weight", "bold");
    }
});

// Add a "view source" button when the Edit button goes to Special:SignUp
$(function() {
    var $a = $('a[data-id="edit"]');
    if ($a.length && $a.attr('href').indexOf('Special:SignUp') !== -1) {
        $a.parent().children('ul.WikiaMenuElement').prepend(
            '<li><a href="/wiki/' + mw.config.get('wgPageName') + 
            '?action=edit">View source</a></li>'
        );
    }
});

// Removes trailing hidden characters on Special:WantedFiles
$(document).ready(function(){
    if (mw.config.get('wgCanonicalSpecialPageName') === "Wantedfiles"){
        $(".mw-spcontent li").each(function(){$(this).html($(this).html().replace(/[^\x20-\x7E]+/g, ""))});
    }
});
 
// IRC and CVNIRC login
$(function() {
    if ($('#IRClogin').length || $('#CVNIRClogin').length) {
        var nick = '';
        if (mw.config.get('wgUserName') === null) {
            nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            nick = mw.config.get('wgUserName').replace(/ /g, "_");
        }
 
        $('#IRClogin').html('<iframe src="https://webchat.freenode.net/?nick=' + nick + '&channels=reddit-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
 
        $('#CVNIRClogin').html('<iframe src="https://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});

/////////////
// NOTICES //
/////////////

// Notice not to add video descriptions when editing the file page
if (
  (mw.config.get("wgAction") === "edit" || mw.config.get("wgAction") === "submit") &&
  mw.config.get('wgCanonicalNamespace') === "File" &&
  !(/.(png|gif|jp(e)?g|ogg|pdf)/gi.test(mw.config.get('wgPageName'))) &&
  mw.config.get('wgUserGroups').indexOf('sysop') === -1
) {
    $("#EditPageHeader").after('<div style="background-color: red; color:white; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">Please do not add descriptions to videos unless it is necessary such as for citing or sourcing purposes.</div>');
}

// Notice not to make one-use user templates
if (
  mw.config.get('wgCanonicalNamespace') === "Template" &&
  !$('#wpTextbox1').val() &&
  (mw.config.get('wgAction') === "edit" || mw.config.get('wgAction') === "submit") &&
  mw.config.get('wgUserGroups').indexOf('sysop') === -1
) {
    $("#EditPageHeader").after('<div style="background-color: red; color:white; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">Please do not create user templates in the Template namespace. If this is going to be a user or signature template, <a href="/wiki/User:'+mw.config.get('wgUserName')+'/'+mw.config.get('wgPageName').slice(9)+'?action=edit">please create it here instead</a>.</div>');
}

//////////////////////
// ADVANCED SCRIPTS //
//////////////////////

/* 
* YouTube Music Player
* Created by Ozank Cx
* Some code taken from https://dev.wikia.com/wiki/MediaWiki:YoutubePlayer/code.js
*
* Playlist support added by Soap Shadow
* Reference: https://developers.google.com/youtube/player_parameters
*/
$(function() {
    // Make it work only in User, User_talk and User_blog namespaces
	if ($('.YTMP').length && [2,3,500].indexOf(mw.config.get('wgNamespaceNumber')) !== -1) {
		$('.YTMP').each(function() {
			var esc = mw.html.escape,
			obj = $(this),
			id = esc(obj.data('id') || ''),
			autoplay = esc('' + obj.data('autoplay')),
			loop = esc('' + obj.data('loop')),
			playlist = esc('' + obj.data('playlist') || ''),
			start = esc('' + obj.data('start')),
			// Playlist support
			listtype = esc('' + obj.data('listtype')),
			list = esc('' + obj.data('list'));
 
			// If playlist type and playlist id aren't blank 
			// then create the playlist embed object.
			if (listtype !== '' && list !== '') {
                obj.html('<div class="YTMP-outer"><div class="YTMP-inner"><iframe width="300" height="300" src="//www.youtube.com/embed?feature=player_embedded&listType=' + listtype + '&list=' + list + '&autoplay=' + autoplay + '&loop=' + loop + '&start=' + start + '"></iframe></div></div>');   
			} else {
                // Else create the original video id embed object.
                if (id === '') return;
                obj.html('<div class="YTMP-outer"><div class="YTMP-inner"><iframe width="300" height="300" src="//www.youtube.com/embed/' + id + '?feature=player_embedded&autoplay=' + autoplay + '&loop=' + loop + '&playlist=' + playlist + '&start=' + start + '"></iframe></div></div>');
            }
		});
	}
});
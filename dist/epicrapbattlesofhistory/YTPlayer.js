// ============================================================
// BEGIN Dynamic Navigation Bars (experimental)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history
 
/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */
 
var autoCollapse = 2;
var collapseCaption = "hide";
var expandCaption = "show";
 
var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /** Dynamic Navigation Bars (experimental) *************************************
  *
  *  Description: See [[Wikipedia:NavFrame]].
  *  Maintainers: UNMAINTAINED
  */
 
  // set up the words in your language
  var NavigationBarHide = '[' + collapseCaption + ']';
  var NavigationBarShow = '[' + expandCaption + ']';
 
  // set up max count of Navigation Bars on page,
  // if there are more, all will be hidden
  // NavigationBarShowDefault = 0; // all bars will be hidden
  // NavigationBarShowDefault = 1; // on pages with more than 1 bar all bars will be hidden
  var NavigationBarShowDefault = autoCollapse;
 
 
  // shows and hides content and picture (if available) of navigation bars
  // Parameters:
  //     indexNavigationBar: the index of navigation bar to be toggled
  function toggleNavigationBar(indexNavigationBar)
  {
     var NavToggle = document.getElementById("NavToggle" + indexNavigationBar);
     var NavFrame = document.getElementById("NavFrame" + indexNavigationBar);
 
     if (!NavFrame || !NavToggle) {
         return false;
     }
 
     // if shown now
     if (NavToggle.firstChild.data.substring(0,NavigationBarHide.length) == NavigationBarHide) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if ( hasClass( NavChild, 'NavPic' ) ) {
                 NavChild.style.display = 'none';
             }
             if ( hasClass( NavChild, 'NavContent') ) {
                 NavChild.style.display = 'none';
             }
         }
     NavToggle.firstChild.data = NavigationBarShow + ' ' + NavToggle.firstChild.data.substring(NavigationBarHide.length);
 
     // if hidden now
     } else if (NavToggle.firstChild.data.substring(0,NavigationBarShow.length) == NavigationBarShow) {
         for (
                 var NavChild = NavFrame.firstChild;
                 NavChild !== null;
                 NavChild = NavChild.nextSibling
             ) {
             if (hasClass(NavChild, 'NavPic')) {
                 NavChild.style.display = 'block';
             }
             if (hasClass(NavChild, 'NavContent')) {
                 NavChild.style.display = 'block';
             }
         }
     NavToggle.firstChild.data = NavigationBarHide + ' ' +NavToggle.firstChild.data.substring(NavigationBarShow.length);
     }
  }
 
  // adds show/hide-button to navigation bars
  function createNavigationBarToggleButton()
  {
     var indexNavigationBar = 0;
     // iterate over all < div >-elements 
     var divs = document.getElementsByTagName("div");
     for(
             var i=0; 
             NavFrame = divs[i]; 
             i++
         ) {
         // if found a navigation bar
         if (hasClass(NavFrame, "NavFrame")) {
             indexNavigationBar++;
             // Find the NavHead and attach the toggle link (Must be this complicated because Moz's firstChild handling is borked) 
             for(var j=0;j < NavFrame.childNodes.length;j++) {
               if (hasClass(NavFrame.childNodes[j], "NavHead")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
               }
               // This is a hack particular to help.wikia for having the title clickable, meh
               if (hasClass(NavFrame.childNodes[j], "NavHeadToggle")) {
                 var NavToggle = document.createElement("a");
                 NavToggle.className = 'NavToggleTitle';
                 NavToggle.setAttribute('id', 'NavToggle' + indexNavigationBar);
                 NavToggle.setAttribute('href', 'javascript:toggleNavigationBar(' + indexNavigationBar + ');');
                 var NavToggleText = document.createTextNode(NavigationBarHide + ' ' + NavFrame.childNodes[j].firstChild.nodeValue);
                 NavToggle.appendChild(NavToggleText);
                 NavFrame.childNodes[j].appendChild(NavToggle);
                 NavFrame.childNodes[j].firstChild.nodeValue='';
               }
 
             }
             NavFrame.setAttribute('id', 'NavFrame' + indexNavigationBar);
         }
     }
     // if more Navigation Bars found than Default: hide all
     if (NavigationBarShowDefault < indexNavigationBar) {
         for(var i=1;i<=indexNavigationBar;i++) {
             toggleNavigationBar(i);
         }
     }
 
  } 
  addOnloadHook( createNavigationBarToggleButton );
 
// END Dynamic Navigation Bars (experimental)
// ============================================================
// ============================================================
 

 
// ********************
// IRC AND CVNIRC LOGIN
// ********************
 
$(function() {
    if ($('#IRClogin').length || $('#CVNIRClogin').length) {
        var nick = '';
        if (mw.config.get('wgUserName') === null) {
            nick = 'Wikian' + Math.floor(Math.random() * 100);
        } else {
            nick = mw.config.get('wgUserName').replace(/ /g, "_");
        }
 
        $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=reddit-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
 
        $('#CVNIRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=cvn-wikia-mlp&prompt=true" width="660" height="400" style="border:0;"></iframe>');
    }
});
 
// ****************
// Duplicate images
// ****************
if (mw.config.get('wgPageName') === "My_Little_Pony_Friendship_is_Magic_Wiki:Duplicate_images"){
  importScriptPage('DupImageList/code.js', 'dev'); //please for the love of Celestia someone fix this darn thing (see talk page)
}
 
// ***************
// Chat appearance
// ***************
 
// Change chat description
if ($('section.ChatModule').length > 0){
	$.get("/wiki/MediaWiki:Chat-headline?action=raw", function(result){
		if ($('p.chat-name').length > 0){
			$('p.chat-name').html(result);
		}else{
			var chatDescInt = setInterval(function() {
				if ($('p.chat-name').length > 0){
					$('p.chat-name').html(result);
					clearInterval(chatDescInt);
				}
			}, 50);
		}
	});
}
 
//**********************************
// Support for [[Template:USERNAME]]
//**********************************
 
$(function() {
    if (window.disableUsernameReplace || mw.config.get('wgUserName') === null) return;
    $('span.insertusername').html(mw.config.get('wgUserName'));
});
 
// *** Custom user rights icons on userpages ***
if ({'User':1, 'User_blog':1, 'User_talk':1}[mw.config.get('wgCanonicalNamespace')] || mw.config.get('wgPageName').indexOf('Special:Contributions') !== -1){
    importScript('MediaWiki:Common.js/userRightsIcons.js');
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
        $("#insertredlink a").attr("href", "/wiki/" + decodeURIComponent(redlink) + "?action=history");
        $("#insertredlink a").css("font-weight", "bold");
    }
});
 
// Automatically uncheck "Leave a redirect behind" on files
if (mw.config.get('wgPageName').indexOf('Special:MovePage/File:') !== -1) {
    $('input#wpLeaveRedirect').removeAttr('checked');
}
 
// Support for multicolumn TOCs
// Usage: <div class="toc-multicol">__TOC__</div>
//needs updating whenever Wikia gets around to fixing the new TOC at least partially
//  changing all #toc ul to #toc ol doesn't quite work
$(window).load(function(){
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
 
 
// Alert contributors when they are editing with their bot flag set
if ((mediaWiki.config.get("wgAction") === "edit" || mediaWiki.config.get("wgAction") === "submit") && mediaWiki.config.get("wgUserGroups").indexOf("bot") !== -1){
   $("#EditPageHeader").after('<div id="botWarning" style="background-color: red; display:block; padding: 5px 0px; text-align: center; font-weight: bold; font-size: 110%;">NOTE: You are currently editing with your bot flag set.</div>');
}
 
//Add a "view source" button when the Edit button goes to Special:SignUp
$(document).ready(function() {
    var $a = $('a[data-id="edit"]');
    if ($a.length && $a.attr('href').indexOf('Special:SignUp') !== -1) {
        $a.parent().children('ul.WikiaMenuElement').prepend(
            '<li><a href="/wiki/' + mw.config.get('wgPageName') + 
            '?action=edit">View source</a></li>'
        );
    }
});
 
//Fix lazy-loaded tabbified profile images
if ($("div.profile-image img.lzyPlcHld").length > 0){
   $("div.profile-image img.lzyPlcHld").each(function(){
      $(this).attr("src", $(this).attr("data-src"));
   });
}
 
// http://dev.wikia.com/wiki/UserRightsRecord
if ($('.rightsrecord').length) {
    importScriptPage('UserRightsRecord/code.js', 'dev');
}
 
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
                $this.html($('<img />', {'src':url, 'alt':emote}));
            }
        }
 
        var emotes = '';
        $.getJSON('/api.php?action=query&prop=revisions&titles=MediaWiki:Emoticons' + 
          '&rvprop=content&format=json', function(data) {
            emotes = data.query.pages['28113'].revisions[0]['*'];
            // 28113 is the wgArticleId of MediaWiki:Emoticons
 
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
 
// Auto-redirect on Special:Search for SXXEXX by Bobogoobo
$(function() {
    var search = mw.util.getParamValue('search');
    if (
      mw.config.get('wgPageName') === 'Special:Search' &&
      search.length <= 6 &&
      /S\d+E\d+/i.test(search)
    ) {
        $('.results-wrapper p').html('Redirecting to episode...');
 
        var s, e;
        s = search.toLowerCase().split('e')[0].substr(1);
        e = search.toLowerCase().split('e')[1];
        $.getJSON('/api.php?action=edit&action=parse&text={{nameconvert|' + 
          s + '|' + e + '}}&format=json', function(data) {
            var episode = (data.parse.text['*'].match(/\>(.*)\n\</) || [0, 0])[1];
            if (episode && episode !== 'TBA' && episode.indexOf('<span class="error">') === -1) {
                $('.results-wrapper p').append($('<a />', {
                    'href':'/wiki/' + episode,
                    'text':episode
                }));
 
                window.location.href = window.location.href.substring(0, 
                  window.location.href.lastIndexOf('/') + 1) + episode;
            } else {
                $('.results-wrapper p').html('Episode not found.');
            }
        });
    }
});
 
// Automatically add categories on Special:Upload, by Bobogoobo
//To delete stored data: window.sessionStorage.removeItem('characterCategories')
$(function() {
    if (mw.config.get('wgCanonicalSpecialPageName') !== 'Upload') {
        return;
    }
 
    var $summary = $('#wpUploadDescription'), $filename = $('#wpDestFile'), eptest = /S\d+E\d+/i,
      charCats = [], charCatsEG = [], shortcuts = {'EG':{}}, pending = 0,
      nicknames = {'Lyra Heartstrings':'Lyra', 'Princess Luna':'Nightmare Moon'}, //be careful
      ccStorage = window.sessionStorage.characterCategories;
 
    function nameCat(input) {
        return input.substring(9).replace(' images', '');
        //return 'Mr. Fluffykins';
    }
 
    function cat(str) {
        if ($summary.val().indexOf('[[' + 'Category:' + str + ']]') === -1) {
            $summary.val($summary.val() + ($summary.val() ? '\n' : '') + 
              '[[' + 'Category:' + str + ']]');
        }
    }
 
    function profile() { //profile images
        if (/\sID\s/i.test($filename.val().replace(/_/g, ' '))) {
            cat('Profile images');
        }
    }
 
    function findCats(filename, isEG) {
        var arr = isEG ? charCatsEG : charCats;
 
        for (var i = 0; i < arr.length; i++) {
            if (filename.indexOf(nameCat(arr[i])) !== -1) {
                cat(arr[i].substring(9) + (isEG ? '/EG' : '')); //meow
            }
        }
        if (isEG) {
            $.each(shortcuts.EG, function(key, value) {
                if (filename.indexOf(nameCat(key)) !== -1) {
                    cat(value.substring(9) + '/EG');
                }
            });
        } else {
            $.each(shortcuts, function(key, value) {
                if (filename.indexOf(nameCat(key)) !== -1 && key !== 'EG') {
                    cat(value.substring(9));
                }
            });
        }
    }
 
    $('#wpUploadDescription').closest('tr').after(
      '<tr><td></td><td id="char-cat-warning"><p style="color:red;"><strong>Warning</strong>: ' +
      'character category adding is experimental. It may not work correctly, ' +
      'and it will only add characters fully named in the file name.<br />' +
      'Please correct any erroneous categories and add missing ones. Report any issues ' +
      '<a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.<br />' +
      'Character category database loading...</p></td></tr>'
    );
 
    if (typeof ccStorage !== 'undefined') {
        charCats = JSON.parse(ccStorage).charCats;
        charCatsEG = JSON.parse(ccStorage).charCatsEG;
        shortcuts = JSON.parse(ccStorage).shortcuts;
        $('#char-cat-warning p').append('retrieved from storage.');
    }
 
    if (typeof window.sessionStorage !== 'undefined' && !window.sessionStorage.characterCategories) {
    $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=Category:Character images' +
      '&cmprop=title&cmlimit=max&format=json', function(data) { //will need update if we get over 500 of these
        pending += 1;
 
        function checkComplete() {
            if (pending === 0 && charCats.length > 0) {
                $('#char-cat-warning p').append('done!');
                if (typeof window.sessionStorage !== 'undefined') {
                    window.sessionStorage.characterCategories = JSON.stringify({
                        'charCats': charCats,
                        'charCatsEG': charCatsEG,
                        'shortcuts': shortcuts
                    });
                    $('#char-cat-warning p').append(' Saved to browser session storage.');
                }
            }
        }
 
        function fEach(response) {
            pending += response.query.categorymembers.length;
            $.each(response.query.categorymembers, function(index, value) {
                if (value.title === 'Category:Cutie Mark Crusaders images' ||
                  value.title === 'Category:Equestria Girls character images') {
                    pending -= 1;
                    return; //saw the EG category after doing everything else :P This is probably easier anyway
                }
 
                if (value.title.substring(value.title.length - 3) === '/EG') {
                    charCatsEG.push(value.title.replace('/EG', ''));
                    if (value.title.indexOf('Princess') !== -1) {
                        shortcuts.EG[value.title.replace('Princess ',
                          '').replace('/EG', '')] = value.title.replace('/EG', '');
                    }
                } else {
                    charCats.push(value.title);
                    if (value.title.indexOf('Princess') !== -1) {
                        shortcuts[value.title.replace('Princess ', '')] = value.title;
                    }
                    if (nicknames[nameCat(value.title)]) {
                        shortcuts['Category:' + nicknames[nameCat(value.title)] + ' images'] = value.title;
                    }
                }
                fGet(value.title);
            });
        }
 
        function fGet(title) {
            $.getJSON('/api.php?action=query&list=categorymembers&cmtitle=' + title +
              '&cmprop=title&cmtype=subcat&cmlimit=max&format=json', function(response) {
                if (response.query.categorymembers.length) {
                    fEach(response);
                }
                pending -= 1;
                checkComplete();
            });
        }
 
        fEach(data);
        pending -= 1;
        checkComplete();
    });}
 
    $filename.change(function() {
        var name = $filename.val().replace(/_/g, ' ');
 
        if ($summary.val().indexOf('[[Category:') !== -1) {
            return;
        } else if (name.substring(0, 6) === 'SLIDER') { //front page sliders
            cat('Front page sliders');
        } else if (eptest.test(name)) { //episodes
            var match = name.match(eptest)[0].split(/e/i);
 
            $.getJSON('/api.php?action=parse&text={{nameconvert|' + 
              match[0].substr(1) + '|' + match[1] + '}}&format=json', function(data) {
                var episode = (data.parse.text['*'].match(/>(.*)\n</) || [0, 0])[1];
                if (episode &&
                    episode !== 'TBA' && 
                    episode.indexOf('<span class="error">') === -1
                ) {
                    cat(episode + ' images');
                    findCats(name, false);
                    profile();
                }
            });
        } else if (/\sEG(?:\s|\.png)/i.test(name)) { //Equestria Girls
            cat('Equestria Girls images');
            findCats(name, true);
            profile();
        } else if (name.substring(0, 7) === 'FANMADE') { //fanmade images
            cat('Fanmade images');
        }
    });
 
    $('#mw-upload-form').on('DOMNodeInserted', '#mw-upload-thumbnail', function(ev) {
        if (ev.target.id === 'mw-upload-thumbnail') {
            $filename.change();
        }
    });
});
 
// Snow yay
$(document).ready(function() {
	if ($('#Snow').length > 0) {
		importScript('MediaWiki:Snow.js');
	}
});
 
// Automatically uncheck "Unlock further protect options" when protecting a page
if (mw.config.get('wgAction') === 'protect') {
    $('#mwProtectUnchained').removeAttr('checked');
}
  
// Imports non-720p image listing script by Bobogoobo
// Applies to http://mlp.wikia.com/wiki/Special:BlankPage?blankspecial=non720
// See subpage for further documentation
if (
  mw.config.get('wgPageName') === 'Special:BlankPage' &&
  mw.util.getParamValue('blankspecial') === 'non720'
) {
    $('#mw-content-text').html('<p>This list is generated from subcategories of Category:Episode images. Please check whether an image is intended to be the size it is before reuploading it. Make any suggestions (including additional patterns that should be skipped) <a href="/wiki/User_talk:Bobogoobo" title="User talk:Bobogoobo">here</a>.</p><div id="non720" style="width:100%;"></div>');
    importScript('MediaWiki:Common.js/Non720.js');
}
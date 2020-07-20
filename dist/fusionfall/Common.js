// ============================================================
// BEGIN Dynamic Navigation Bars (experimantal)
// This script is from Wikipedia. For author attribution, please see http://en.wikipedia.org/w/index.php?title=MediaWiki:Common.js&action=history


/* Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: User:Mike Dillon, User:R. Koot, User:SG
 */

var hasClass = (function () {
    var reCache = {};
    return function (element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
 
 /* Collapsible classes
 * See w:c:dev:ShowHide for info and attribution
 */
 
importScriptPage('ShowHide/code.js', 'dev');
 
$(document).ready(function STemplateUI() {
  $(".ogg_player .image").remove();
});
 
// ==================================================
//  Folding Multi Wiki Tabs (experimental)
// ==================================================

addOnloadHook(foldingTabsMulti);
function foldingTabsMulti() {
  var len=0;
  ftsets = getElementsByClassName(document, 'div', 'foldtabSet');  //global object array thingy
  if(ftsets.length==0) return

  for(var i=0;i<ftsets.length;i++) {  
    ftsets[i].head = getElementsByClassName(ftsets[i], 'div', 'foldtabHead')[0];
    ftsets[i].links = ftsets[i].head.getElementsByTagName('a');
    ftsets[i].boxen = getElementsByClassName(ftsets[i], 'div', 'foldtabBox');

    if(ftsets[i].links.length < ftsets[i].boxen.length) {
      len = ftsets[i].boxen.length;
    } else {
      len = ftsets[i].links.length;
    }

    for(var j=0;j<len;j++) {
      ftsets[i].links[j].href = 'javascript:showmultitab(\'' + i + '\',\'' + j + '\');';
      ftsets[i].links[j].title = 'click to display tab ' + j + ' of set ' + i;
    }
    showmultitab(i,'0');
    ftsets[i].head.style.display = 'block';
  }
}

function showmultitab(set,num) {
  for(var j=0;j<ftsets[set].boxen.length;j++) {
    if(j==num) {
      ftsets[set].boxen[j].style.display = 'block';
    } else {
      ftsets[set].boxen[j].style.display = 'none';
    }
  }
  for(var j=0;j<ftsets[set].links.length;j++) {
    if(j==num) {
      ftsets[set].links[j].className = 'selected';
      ftsets[set].links[j].blur();
    } else {
      ftsets[set].links[j].className = '';
    }
  }
}

// ==================================================
//            END Folding Multi Wiki Tabs
// ==================================================

/* Disable comments for specified pages at discretion without disabling feature
 * by: [[User:Pecoes]]
 */
$(function () {
    if (window.ArticleComments && $.inArray("Locked blogs", mw.config.get('wgCategories')) > -1) {
        ArticleComments.interceptedAddHover = ArticleComments.addHover;
        ArticleComments.addHover = function () {
            $('a.wikia-button.comments.secondary').html('Comments locked');
            $('#article-comm').attr('disabled','disabled').text('Comments on this blog have been disabled.');
            $('#article-comm-submit').attr('disabled', 'disabled');
            $('.article-comm-reply').remove();
            ArticleComments.interceptedAddHover();
        };
    }
});
 
/* Add a tag for "rollback" to user profile header when rollback user category present
 * by: [[User:The 888th Avatar]]
 */
 
$(function() {
	if (wgNamespaceNumber == 2) {
		if (-1 < $.inArray("Rollback users", wgCategories)) {
			$('.masthead-info hgroup').append('<span class="tag">rollback</span>');
		}
	}
});

// Add Social Media buttons
importScript('MediaWiki:Common.js/socialmedia.js');

// Add "about us" and Forums link to "On the Wiki" menu
importScript('MediaWiki:Common.js/addnavlinks.js');

// Change chat description
importScript('MediaWiki:Chat-headline');
 
function changeChatDesc() {
try {
if ($('section.ChatModule').size() > 0 && $('p.chat-name').html() != chatDesc){
$('p.chat-name').html(''+chatDesc+'');
setTimeout("changeChatDesc()", 200);
}
 
}catch (err){
setTimeout("changeChatDesc()", 200);
}
};
 
$(document).ready(function (){changeChatDesc()});

/* Custom edit buttons for source mode
 * by: [[User:Thailog|Thailog]]
 */
 
if ((wgAction == 'submit' || wgAction == 'edit') && mwCustomEditButtons) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/fusionfall/images/4/4d/Support_Button.png",
		"speedTip": "Support",
		"tagOpen": "{{Support}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/fusionfall/images/7/7e/Neutral_Button.png",
		"speedTip": "Oppose",
		"tagOpen": "{{Oppose}} ",
		"tagClose": "",
		"sampleText": ""};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/fusionfall/images/9/9f/Oppose_Button.png",
		"speedTip": "Neutral",
		"tagOpen": "{{Neutral}} ",
		"tagClose": "",
		"sampleText": ""};
}
 
importArticles({
	type: "script",
	articles: [
                'u:dev:FloatingToc/code.js', /* FloatingToc */
	]
});
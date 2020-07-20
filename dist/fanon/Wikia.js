/* AJAX */
ajaxPages=["Special:RecentChanges","Special:WikiActivity","Special:NewPages"];
var indicator="https://images.wikia.nocookie.net/marbleblast/images/b/b4/FB_Throbber_Orange.gif";

importArticles({
    type: 'script',
    articles: [
        'u:dev:Voice_Dictation/voice.js',
        'u:dev:Countdown/code.js',
        'u:dev:ShowHide/code.js',
        'u:dev:DupImageList/code.js',
        'u:dev:InactiveUsers/code.js',
        'u:dev:DisplayClock/code.js',
        'u:deadisland:User:Jgjake2/js/DISPLAYTITLE.js',
        'u:dev:AjaxRC/code.js'
    ]
});


/* Add History Button to Threads - by Seaside98 */
if (mediaWiki.config.get('wgNamespaceNumber') === 1201) {
	$('.follow').after('<a class="wikia-button" style="float:right;margin-left:10px;" href="/wiki/'+ wgPageName +'?action=history">History</a>');
}
 
/* Add Current Diff Link to Edit Menu - by Seaside98 */
$('.WikiaPageHeader .WikiaMenuElement').prepend('<li><a href="/wiki/'+ wgPageName +'?diff=cur">Current Diff</a></li>');

/* Add Editcount tab on all user pages and user talk pages */
/* CODE BY GEORGE BARNICK // [[User:GeorgeBarnick]] */
$(function() {
    var wikiUrl = window.location.hostname;
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "http://" + wikiUrl + "/wiki/Special:Editcount/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Editcount</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});

/* Add a Blog under Contribute - by Codyn329 */
/* Add contributions link to the user dropdown on the Wikia bar */
/* Create a Blog Post quicklink */
$(function() { 
	$('.WikiHeader .buttons .contribute ul li').first().after('<li><a href= "/wiki/Special:CreateBlogPage">Add a Blog</a></li>'); 
    $('<li id="MyContribs"><a href="/wiki/Special:MyContributions">My&nbsp;contributions</a>  </li>').insertAfter('.AccountNavigation > li > .subnav > li:first-child');
    $('<li><a href="/wiki/Special:CreateBlogPage" data-id="createblog">Create a Blog Post</a></li>').insertAfter('.contribute ul li:nth-of-type(3)');
});

/* New Buttons */

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/7/74/Button_comment.png",
		"speedTip": "Comment visible only for editors",
		"tagOpen": "<!-- ",
		"tagClose": " -->",
		"sampleText": "Insert comment here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/7/70/Button_disambig.png",
		"speedTip": "Click for disambiguation page template",
		"tagOpen": "{{",
		"tagClose": "}}",
		"sampleText": "disambig"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
		"speedTip": "Click to strike out text",
		"tagOpen": "<strike>",
		"tagClose": "</strike>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png",
		"speedTip": "Makes text higher (be wary; it makes it small)",
		"tagOpen": "<sup>",
		"tagClose": "</sup>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/a/aa/Button_sub_letter.png",
		"speedTip": "Makes text lower (be wary; it makes it small)",
		"tagOpen": "<sub>",
		"tagClose": "</sub>",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
		"speedTip": "Creates a redirect",
		"tagOpen": "#REDIRECT:[[",
		"tagClose": "]]",
		"sampleText": "Insert text here"
	};

mwCustomEditButtons[mwCustomEditButtons.length] = {
		"imageFile": "https://images.wikia.nocookie.net/lcf119testinggrounds/images/d/d5/Button_noinclude.png",
		"speedTip": "Does not include text when imported to another page",
		"tagOpen": "<noinclude>",
		"tagClose": "</noinclude>",
		"sampleText": "Insert text here"
	};

/* Any JavaScript here will be loaded for all users on every page load. */
/* <pre><nowiki> */

/** Fastdelete *******************************
 * By Splarka
 */
function appendScript(url) {
  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src',url);
  scriptElem.setAttribute('type','text/javascript');
  document.getElementsByTagName('head')[0].appendChild(scriptElem);
}

appendScript('http://www.wikia.com/index.php?title=User:Splarka/fastdelete.js&action=raw&ctype=text/javascript&dontcountme=s');

// </nowiki></pre>
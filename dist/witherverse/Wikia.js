if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
   importArticles({
       type: 'script',
       articles: [
        'u:dev:MediaWiki:AjaxRedirect/code.js',
        'u:dev:MediaWiki:AjaxRename/code.js',
        'u:dev:MediaWiki:AjaxBatchDelete/code.2.js',
        'u:dev:MediaWiki:AjaxBatchUndelete.js',
        'u:dev:MediaWiki:MassProtect/code.js',
      ]
   });   
}

window.railWAM = {logPage: "Project:WAM Log"};

// Flip Content

/*(function() {
    function addHook() {
        $(".flipText1").show();
        $(".flipText2").hide();
        $(".flipText1, .flipText2").off();
        $(".flipText1, .flipText2").click(function(e) {
           $(e.target).closest('span#container.container').children().toggle();
        });
    }
    $(addHook);
    mw.hook('wikipage.content').add(addHook);
}());*/

$(".container").click(function() {
  $div = $(this).find("div");
  $($div).toggleClass("active");
});

//=======================================================
// Adds a Block button to button dropdown on messages
// Author: Sophiedp
//=======================================================
 
if (wgNamespaceNumber === 1201 && 
    mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
for (var i in $('.msg-toolbar')) {
        var user = $('.msg-toolbar:eq(' + i + ')').parent()
        .find('.edited-by a').text();
        $('.msg-toolbar:eq(' + i + ')').find('.WikiaMenuElement li')
        .last().before
        ('<li><a href="/wiki/Special:Block/' + user + '">Block</a></li>');
    }}


/********************************************************************
    ------------- # BEGIN Widespread Code # -------------------------
*********************************************************************/

//===============================================================
// Add new buttons to the toolbar atop the Source Editor
//===============================================================
 
if (mwCustomEditButtons.length) {
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/c8/Button_redirect.png",
	"speedTip": "Add redirect",
	"tagOpen": "#REDIRECT [" + "[",
	"tagClose": "]]",
	"sampleText": "Insert text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/c9/Button_strike.png",
	"speedTip": "Strike through text",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/7/74/Button_comment.png",
	"speedTip": "Add text only visible in the Source Editor",
	"tagOpen": "<!-- ",
	"tagClose": " -->",
	"sampleText": "Insert comment here"
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "//images.wikia.com/central/images/f/fd/Button_underline.png",
	"speedTip": "Underline text",
	"tagOpen": "<u>",
	"tagClose": "</u>",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/4/43/Button-template.png",
	"speedTip": "Add template tags",
	"tagOpen": "{{",
	"tagClose": "}}",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/2/28/Button_wikilink.png",
	"speedTip": "Add link to category or file page",
	"tagOpen": "[[:",
	"tagClose": "]]",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/c/cb/Button_wikipedia.png",
	"speedTip": "Quick link to Wikipedia",
	"tagOpen": "[[wikipedia:",
	"tagClose": "]]",
	"sampleText": ""
	};
 
	mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "//images.wikia.com/central/images/3/3c/Button_pre.png",
	"speedTip": "Show literal content in gray box and code font",
	"tagOpen": "<pre>",
	"tagClose": "</pre>",
	"sampleText": ""
	};
}

/********************************************************************
    ------------- # END Widespread Code # -------------------------
*********************************************************************/

/**
 ----------------------
 # Miscellaneous Code #
 ----------------------
*/

// **************************************************
// Hide namespaces in categories (Splarka)
// **************************************************
// A quick script to hide namespace prefixes in category lists. Just add 
// <div id="catnoprefix" style="display:none;"></div>
// to the category description page to  activate it. 
 
function catprefix() {
  if(!document.getElementById('catnoprefix')) return;
  var anchors = document.getElementById('mw-pages').getElementsByTagName('a');
  for(var i=0;i < anchors.length;i++) {
    if(anchors[i].firstChild.nodeValue.indexOf(':') != -1) {
      anchors[i].firstChild.nodeValue = anchors[i].firstChild
      .nodeValue.substring(anchors[i].firstChild.nodeValue.indexOf(':')+1);}}
} addOnloadHook(catprefix);
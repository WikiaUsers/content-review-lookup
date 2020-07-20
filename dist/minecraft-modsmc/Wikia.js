// Cancel Edit Button
 
$(function addCancel () { 
  if (typeof(wgIsEditPage) != 'undefined') { 
  $('<span id="cancelbutton" class="button" style="margin-top:2px, text-decoration:none"><a id="cancelbuttonlink" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
  }
});

/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ START CUSTOM EDIT BUTTONS \\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/
 
/* Adds some new button shortcuts to the Source Editor */
 
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
 
/*******************************************************************************
\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ END CUSTOM EDIT BUTTONS \\\\\\\\\\\\\\\\\\\\\\\\\
*******************************************************************************/

// Adds a "Logs" tab to User Mastheads
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
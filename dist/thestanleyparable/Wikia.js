window.BackToTopModern = true;

/**------------------------------------------**/
/** Make the toolbar on mobile Chrome orange **/
/**------------------------------------------**/

new function() {
    if ($('meta[name="theme-color"]').exists()) {return}
    $('head').append(
        $('<meta>', {
            name: 'theme-color',
            content: window.ChromeToolbarColor ||
                     mw.config.get('wgSassParams')['color-community-header']
        }));}
();

//***********************************************
/**-------------------------------------------**/
/** Adding a bunch of stuff to the right rail **/
/**-------------------------------------------**/
//***********************************************

var ads = $('#top-right-boxad-wrapper, #NATIVE_TABOOLA_RAIL').last();

/** Creates a box in the right rail to sign up for the 
    Stanley Parable Ultra Deluxe Newsletter **/

var NewsletterModule = (
    "<section id='Newsletter' class='module'><h2>The Stanley Parable\
    Newsletter</h2><br> <p>Enter your email address and the devs will send you\
    updates about The Stanley Parable: Ultra Deluxe as the story develops.\
    <p> <div id='emailform'> <form action='https://crowscrowscrows.com/send\
    y/subscribe' method='POST' accept-charset='utf-8'><input type='mail' \
    name='email' id='email' class='EmailInput' placeholder=\
    'my.email-address@provider.com'/><br/> <div style='display:none;'>\
    <label for='hp'>HP</label><br/><inputtype='text' name='hp' id='HP'/>\
    </div><inputid='ListInput' type='hidden'name='list' \
    value='yWxuGdhLoO4lyEoSegeAhA'/><input type='hidden'name='subform'\
    value='yes'/><button id='SubmitButton' type='submit' name='submit' \
    id='Submit'>Sign me up</button></form></div>");

/** Module with links to Stanley Parable Mods **/

var modModule = $("<section class='module' id='ModModule' style='font-family:\
\'Century Gothic\'; padding: 3px'><h2>Mod Downloads</h2><ul><li><a href=\"http\
s://www.dropbox.com/s/7nudkegjum94i5y/raphael.bsp?dl=0\">Download The Raphael\
 Parable</a></li><li><a href=\"https://www.dropbox.com/s/8xsb50ga0z0947d/exp427_\
beta.zip?dl=0\">Download Experiment 427</a></li><li><a href=\"https://mega.n\
z/#!rsBVSRCT!vjJGLa7jyhz89O83SyLRm9AOCPcmJKwYNZ_7tuSrf14\">Download the Escape\
 Pod Ending Mod</a></li><a href=\"https://gamebanana.com/skins/games/5255\
\">Download skins and mods on GameBanana</a></ul>");

/** Place the modules **/

if (ads.length > 0) {$(modModule).insertAfter(ads);} 
else {$("#WikiaRail").prepend(modModule);}

$(NewsletterModule).insertAfter("#ModModule");
window.AddRailModule = [{prepend: true}];

//********************
/**----------------**/
/** End rail stuff **/
/**----------------**/
//********************

/**--------------------**/
/** Cancel Edit Button **/
/**--------------------**/
 
$(function addCancel () { 
  if (typeof(wgIsEditPage) != 'undefined') { 
  $('<span id="cancelbutton" class="button" style="margin-top:2px, text-decoration:none"><a id="cancelbuttonlink" href="/wiki/'+ wgPageName +'"><span style="color:#FFFFFF">Cancel Edit</span></a></span>').prependTo('#EditPageHeader h2');
}});

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

//=====================================
// Adds a "Logs" tab to User Mastheads
//=====================================
 
$(function() {
    var olds = $(".tabs-container > ul.tabs").html();
    var address = "/wiki/Special:Log/" + wgTitle;
    var adds = "<li data-id='editcount'><a href='" + address + "'>Logs</a></li>";
    var news = olds + adds;
    $(".tabs-container > ul.tabs").html(news);
});
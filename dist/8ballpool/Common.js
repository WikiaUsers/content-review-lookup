/* Any JavaScript here will be loaded for all users on every page load. */

/* AJAX */
window.ajaxPages = ["Special:RecentChanges","Special:Watchlist","Special:Log","Special:Contributions"];

PurgeButtonText = 'Purge';

/* IMPORTS */
importArticles({
    type: 'script',
    articles: [
        'u:dev:RevealAnonIP/code.js',
        'u:dev:ExtendedNavigation/code.js',
        'u:dev:EditIntroButton/code.js',
        'u:dev:BackToTopButton/code.js',
        'u:dev:PurgeButton/code.js',
        'u:dev:AjaxRC/code.js',
        'u:dev:FloatingToc/code.js'
    ]
});

/* end */

//Custom edit buttons
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/1/11/Button_category.png/revision/latest?cb=20120909085943",
	"speedTip": "Add a category",
	"tagOpen": "[[Category:",
	"tagClose": "]]",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/1/12/Button_gallery.png/revision/latest?cb=20070329064959",
	"speedTip": "Add a gallery",
	"tagOpen": "<gallery>",
	"tagClose": "</gallery>",
	"sampleText": "Insert file name(s) here"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/8/86/B.BIG.PNG/revision/latest?cb=20101231004833",
	"speedTip": "Enlarge text",
	"tagOpen": "<big>",
	"tagClose": "</big>",
	"sampleText": "Insert text here"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/7/79/Button_include.png/revision/latest?cb=20081020124414",
	"speedTip": "Include only",
	"tagOpen": "<includeonly>",
	"tagClose": "</includeonly>",
	"sampleText": "Insert text here"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/0/03/Button_em_dash.png/revision/latest?cb=20150118172631",
	"speedTip": "Insert an em dash",
	"tagOpen": "&mdash;",
	"tagClose": "",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/2/28/Button_wikilink.png/revision/latest?cb=20080209094710",
	"speedTip": "Internal link",
	"tagOpen": "[[",
	"tagClose": "]]",
	"sampleText": "Page name here"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
	"speedTip": "Line break",
	"tagOpen": "<br />",
	"tagClose": "",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://images.wikia.nocookie.net/central/images/8/8c/Button_RedX.png?1",
	"speedTip": "Mark for deletion",
	"tagOpen": "{{Delete}}",
	"tagClose": "",
	"sampleText": ""
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://images.wikia.nocookie.net/central/images/c/c8/Button_redirect.png",
	"speedTip": "Redirect",
	"tagOpen": "#REDIRECT [[",
	"tagClose": "]]",
	"sampleText": "Insert text"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://images.wikia.nocookie.net/central/images/c/c9/Button_strike.png",
	"speedTip": "Strike",
	"tagOpen": "<s>",
	"tagClose": "</s>",
	"sampleText": "Strike-through text"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/6/6a/Button_sup_letter.png/revision/latest?cb=20070329065456",
	"speedTip": "Make text higher",
	"tagOpen": "<sup>",
	"tagClose": "</sup>",
	"sampleText": "Insert text here"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png/revision/latest?cb=20070329065451",
	"speedTip": "Template",
	"tagOpen": "{{",
	"tagClose": "}}",
	"sampleText": "Name of template"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
	"imageFile": "https://vignette.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png/revision/latest?cb=20070329065451",
	"speedTip": "Underline",
	"tagOpen": "<u>",
	"tagClose": "</u>",
	"sampleText": "Insert text here"
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png", 
        "speedTip": "Insert a table", 
        "tagOpen": "{| class=\"wikitable\"",
        "sampleText": "Insert text here" 
};
 
mwCustomEditButtons[mwCustomEditButtons.length] = {
     "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
     "speedTip": "Comment visible only for editors",
     "tagOpen": "<!-- ",
     "tagClose": " -->",
     "sampleText": "Insert comment here"
};

/*******************************************************************************
** "Articletype positioning" script; by [[User:Bp]]
*******************************************************************************/
 
function moveArticletypeDiv() {
    var fooel = document.getElementById('ma-article-type');
    if (fooel !== null) {
        var artel = document.getElementById('article'),
            wphel = document.getElementById('WikiaPageHeader'),
            titel = document.getElementById('top');
        fooel = fooel.parentNode.removeChild(fooel);
        if (artel !== null) {
            artel.parentNode.insertBefore(fooel,artel);
        } else if (wphel !== null) {
            wphel.parentNode.insertBefore(fooel,wphel);
        } else {
            //fall back to a position before H1 - useful for monobook skin
            titel.parentNode.insertBefore(fooel,titel);
        }
    }
}
 
hookEvent("load", moveArticletypeDiv);
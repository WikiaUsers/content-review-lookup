/* Any JavaScript here will be loaded for all users on every page load. */


/*Copying the rest from Central Wikia and in January 2009 some from Help Wikia:

Tools: [http://www.wikia.com/index.php?title=-&action=raw&smaxage=0&gen=js reload cache]

<pre><nowiki> */
// ============================================================
//BEGIN additional edit buttons following http://help.wikia.com/wiki/Help:Custom_edit_buttons and http://fr.wikia.com/wiki/MediaWiki:Common.js
if (mwCustomEditButtons) {
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
        "imageFile": "https://images.wikia.nocookie.net/central/images/1/13/Button_enter.png",
        "speedTip": "Line break",
        "tagOpen": "<br />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
        "speedTip": "Template",
        "tagOpen": "{{",
        "tagClose": "}}",
        "sampleText": "Templatename"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/3/3b/Button_template_alt.png",
        "speedTip": "SUBST Template",
        "tagOpen": "{{subst:",
        "tagClose": "}}",
        "sampleText": "Templatename"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/b/b4/Button_category03.png",
        "speedTip": "Category",
        "tagOpen": "[[Category:",
        "tagClose": "]]",
        "sampleText": "Categoryname"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/4/4a/Button_table.png",
        "speedTip": "Table",
        "tagOpen": "{|\n|-\n|\n|\n|}",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/74/Button_comment.png",
        "speedTip": "Comment visible only for editors",
        "tagOpen": "<!-- ",
        "tagClose": " -->",
        "sampleText": "Insert comment here"
    };

    // remettre en forme la balise pre (whatever that means)
    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/3/3c/Button_pre.png",
        "speedTip": "Preformatted text",
        "tagOpen": "<pre>",
        "tagClose": "</pre>",
        "sampleText": "Preformatted text"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/c4/Button_ref.png",
        "speedTip": "Reference",
        "tagOpen": "<ref>",
        "tagClose": "</ref>",
        "sampleText": "Reference, citation, or link"
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/8/8b/Button_ref_link.png",
        "speedTip": "Reference heading and list",
        "tagOpen": "==Notes and references==\n<references />",
        "tagClose": "",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/c/ce/Button_no_include.png",
        "speedTip": "No include",
        "tagOpen": "<nowiki><noinclude> </nowiki>",
        "tagClose": "<nowiki></noinclude></nowiki>",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images/7/79/Button_include.png",
        "speedTip": "Include only",
        "tagOpen": "<nowiki><includeonly></nowiki>",
        "tagClose": "<nowiki></includeonly></nowiki>",
        "sampleText": ""
    };

    mwCustomEditButtons[mwCustomEditButtons.length] = {
        "imageFile": "https://images.wikia.nocookie.net/central/images///c/cb/Button_wikipedia.png",
        "speedTip": "From Wikipedia",
        "tagOpen": "{{use" + "dwp}}",
        "tagClose": "",
        "sampleText": ""
    };

}

//END edit buttons **************************************************

var ShowHideConfig = {
    autoCollapse: 2,
    userLang: true,
    de: {
        show: "Ausklappen",
        hide: "Einklappen",
        showAll: "Ausklappen alle",
        hideAll: "Einklappen alle"
    },
    en: {
        show: "show",
        hide: "hide",
        showAll: "show all",
        hideAll: "hide all"
    },
    es: {
        show: "mostrar",
        hide: "ocultar",
        showAll: "mostrar todo",
        hideAll: "ocultar todo"
    },
    fr: {
        show: "dérouler",
        hide: "enrouler",
        showAll: "dérouler tout",
        hideAll: "enrouler tout"
    },
    ru: {
        show: "показать",
        hide: "скрыть",
        showAll: "показать все",
        hideAll: "скрыть все"
    }
};

/* Phlox: Following auto adds a user's name to form field called ThisUser.    From Dantman and Ciencia_al_Poder, google central wikia for more info.

$(function preloadThisUserName() {
    $("#bodyContent form.createbox") // narrows the search
    .find("input[name$='[Thisuser]']") // affects _any_ template with a parameter/field named: Thisuser
    .val(wgUserName);
});

//Following is for ImageAnnotator.  see Docs at http://commons.wikimedia.org/wiki/Help:Gadget-ImageAnnotator
if (wgNamespaceNumber != -1) importScript('MediaWiki:Gadget-ImageAnnotator.js');

//Following is also for ImageAnnotator, but is probably required by other Gadgets.  It is copied from http://meta.wikimedia.org/wiki/Www.wikipedia.org_template/js

function addLoadEvent(fn) {
    if (window.addEventListener) addEventListener("load", fn, false);
    else if (window.attachEvent) attachEvent("onload", fn);
}

/** Magic editintros ****************************************************
 * Inject editintro text into possibly living people article edit mode - ripped off from WP.  Phlox 2009-10*
 *
 *  Description: Adds editintros on disambiguation pages and BLP pages.
 *  Wikipedia Maintainers: [[User:RockMFR]]


function addEditIntro(name) {
    var el = document.getElementById('control_edit'); // phlox- no ca-edit, because control_edit is what wikia uses
    if (!el) return;
    el = el.getElementsByTagName('a')[0];
    if (el) el.href += '&editintro=' + name;
}

if (wgNamespaceNumber == 0) {
    addOnloadHook(function() {
        if (document.getElementById('disambigbox')) addEditIntro('Template:Disambig_editintro');
    });

    addOnloadHook(function() {
        var cats = document.getElementById('mw-normal-catlinks');
        if (!cats) return;
        cats = cats.getElementsByTagName('a');
        for (var i = 0; i < cats.length; i++) {
            if (cats[i].title == 'Category:Living people' || cats[i].title == 'Category:Possibly living people') {
                addEditIntro('Template:BLP_editintro');
                break;
            }
        }
    });
}
*/
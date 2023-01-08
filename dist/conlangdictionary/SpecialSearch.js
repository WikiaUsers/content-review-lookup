/** Change Special:Search to use a radio menu *******************************************************
 *
 *  Description: Change Special:Search to use a radio menu, with the default being
 *               the internal MediaWiki engine
 *  Created by: [[:fr:User:Pmartin]]
 */

if ((wgNamespaceNumber == -1) && (wgCanonicalSpecialPageName == "Search")) {
    var searchEngines = {
        mediawiki: {
            ShortName: "MediaWiki search",
            Template: "/w/index.php?search={searchTerms}"
        },
        google: {
            ShortName: "Google",
            Template: "http://www.google.com/search?hl=" + wgUserLanguage + "&q={searchTerms}&as_sitesearch=" + wgServer.substr(7, wgServer.length - 1 )
        },
        wikiwix: {
            ShortName: "Wikiwix",
            Template: "http://www.wikiwix.com/index.php?action={searchTerms}&disp=dict"
        },
        live: {
            ShortName: "Bing",
            Template: "http://search.live.com/results.aspx?q={searchTerms}&q1=site:" + wgServer
        },
        yahoo: {
           ShortName: "Yahoo",
           Template: "http://search.yahoo.com/search?p={searchTerms}&vs=" + wgServer
       }
    };
    addOnloadHook(externalSearchEngines);
}


function externalSearchEngines() {

    if (typeof SpecialSearchEnhanced2Disabled != 'undefined') return;

    var mainNode;
    if (document.forms["search"]) { 
        mainNode = document.forms["search"].getElementsByTagName('tr')[0];
    } else {
        if (document.forms["powersearch"]) {
            mainNode = document.forms["powersearch"].getElementsByTagName('tr')[0];
        } else {
            return
        }
    }

    var firstEngine = "mediawiki";

    var lsearchbox = document.getElementById("searchText");
    var initValue = lsearchbox.value;

    var space = "";

    var choices = newNode('td', {id: "searchengineChoices", style: "text-align: center; vertical-align:top"})

    for (var id in searchEngines) {
        var engine = searchEngines[id];
        if(engine.ShortName)
        {
            if (space) choices.appendChild(space);
            space = document.createTextNode(" ");

            choices.appendChild( newNode('span', 
                newNode('input', 
                    {type: "radio", 
                     name: "searchengineselect", 
                     value: id, 
                     onFocus: "changeSearchEngine('"+id+"');", 
                     id: "searchengineRadio-"+id}
                )
            ) );

            choices.appendChild( newNode('label', {"for":"searchengineRadio-"+id}, engine.ShortName) )
        }
    }

    choices.appendChild(newNode('input', {id: "searchengineextraparam", type: "hidden"}));
    mainNode.appendChild(choices);

    changeSearchEngine(firstEngine, initValue);
}

function changeSearchEngine(selectedId) {

    var currentId = document.getElementById("searchengineChoices").currentChoice;
    if (selectedId == currentId) return;

    document.getElementById("searchengineChoices").currentChoice = selectedId;
    var radio = document.getElementById('searchengineRadio-'  + selectedId);
    radio.checked = "checked";

    var engine = searchEngines[selectedId];
    var p = engine.Template.indexOf('?');
    var params = engine.Template.substr(p+1);

    var form;
    if (document.forms["search"]) {
        form = document.forms["search"];
    } else {
        form = document.getElementById("powersearch");
    }
    form.setAttribute("action", engine.Template.substr(0,p));

    var l = ("" + params).split("&");
    for (var i in l) {
        var p = l[i].split("=");
        var pValue = p[1];

        if (pValue == "{language}") {
        } else if (pValue == "{searchTerms}") {
            var input;
            if (document.forms["search"]) {
                input = document.getElementById("searchText");
            } else {
                input = document.getElementById("powerSearchText");
            } 

            input.name = p[0];
        } else {
            var input = document.getElementById("searchengineextraparam");

            input.name = p[0];
            input.value = pValue;
        }
    }
}
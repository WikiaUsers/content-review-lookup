/** Change Special:Search to use a drop-down menu *******************************************************
  *
  *  Description: Change Special:Search to use a drop-down menu, with the default being
  *               the internal MediaWiki engine
  *  Created and maintained by: [[User:Gracenotes]]
  */

function SpecialSearchEnhanced() {
    var createOption = function(site, action, mainQ, addQ, addV) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(site));
        window.searchEngines.push([action, mainQ, addQ, addV]);
        return opt;
    }

    if (document.forms.powersearch)
        var searchForm = document.forms.powersearch;
    if (document.forms.search)
        var searchForm = document.forms.search;

    if (searchForm.lsearchbox) {
        var searchBox = searchForm.lsearchbox;
    } else {
        var searchBox = searchForm.search;
    }
    var selectBox = document.createElement('select');
    selectBox.id = 'searchEngine';
    searchForm.onsubmit = function() {
        var optSelected = window.searchEngines[document.getElementById('searchEngine').selectedIndex];
        searchForm.action = optSelected[0];
        searchBox.name = optSelected[1];
        searchForm.title.value = optSelected[3];
        searchForm.title.name = optSelected[2];
    }
    selectBox.appendChild(createOption('English Wikipedia', mw.config.get( 'wgScript' ), 'search', 'title', 'Special:Search'));
    selectBox.appendChild(createOption('Google', 'http://www.google.com/search', 'q', 'sitesearch', 'en.wikipedia.org'));
    selectBox.appendChild(createOption('Yahoo', 'http://search.yahoo.com/search', 'p', 'vs', 'en.wikipedia.org'));
    selectBox.appendChild(createOption('Bing', 'http://www.bing.com/search', 'q', 'q1', 'site:http://en.wikipedia.org'));
    selectBox.appendChild(createOption('Wikiwix', 'http://www.wikiwix.com/', 'action', 'lang', 'en'));
    selectBox.appendChild(createOption('Exalead', 'http://www.exalead.com/wikipedia/results', 'q', 'language', 'en'));
    searchBox.style.marginLeft = '0px';
    if (document.getElementById('loadStatus')) {
        var lStat = document.getElementById('loadStatus');
    } else {
        var lStat = searchForm.title;
        if( typeof lStat === 'object'  && typeof lStat.length === 'number' ) lStat = lStat[0];
    }
    lStat.parentNode.insertBefore(selectBox, lStat);
}

window.searchEngines = [];

// Script is specific to Special:Search
if ( mw.config.get( 'wgCanonicalSpecialPageName' ) === 'Search'){
  $(SpecialSearchEnhanced);
}
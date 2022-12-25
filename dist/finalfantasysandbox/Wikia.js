/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
if(document.querySelector(".page-Template_Portal_Navigation") || document.querySelector(".page-Final_Fantasy_Sandbox_Wikia")) {
    mainpageTabs();
}
 
function mainpageTabs() {
    var tablist = document.querySelectorAll('div.portal__tablist')[0];
    tablist.classList.add('active');
    var tabs;
    var panels;
 
    var contentstab = document.querySelectorAll('div.portal__tab.contents')[0]
    contentstab.setAttribute('aria-controls', 'portal__tabpanel0');
    var currentreltab = document.querySelectorAll('div.portal__tab.current')[0]
    currentreltab.setAttribute('aria-controls', 'portal__tabpanel1');
 
    var nav_items = [
        {
            title: 'I-V',
            games: ['Final Fantasy', 'Final Fantasy II', 'Final Fantasy III', 'Final Fantasy IV', 'Final Fantasy V']
        },
        {
            title: 'VI-X',
            games: ['Final Fantasy VI', 'Final Fantasy VII', 'Final Fantasy VIII', 'Final Fantasy IX', 'Final Fantasy X']
        },
        {
            title: 'XI-XV',
            games: ['Final Fantasy XI', 'Final Fantasy XII', 'Final Fantasy XIII', 'Final Fantasy XIV', 'Final Fantasy XV']
        },
    ];
 
    var categories = ['Characters', 'Locations', 'Enemies', 'Equipment'];
 
    // Create slide for each of the nav items
    nav_items.forEach(function(item, index) {
        createTablist(item.title, index+2);
        createTab(item.title, item.games, index+2);
    });
 
    // Create a tab from the JSON
    function createTablist(title, index) {
        var tabDomElement = document.createElement('div');
        tabDomElement.classList.add('portal__tab');
        tabDomElement.setAttribute('tabindex', 0);
        tabDomElement.setAttribute('aria-selected', 'false');
        tabDomElement.setAttribute('aria-controls', 'portal__tabpanel'+index);
        tabDomElement.textContent = title;
 
        var tablistDomElement = document.querySelector('div.portal__tablist');
        tablistDomElement.append(tabDomElement);
    }
 
    // Create a slide from the JSON
    function createTab(title, games, index) {
        // Create a new DOM element for a slide
        var tabpanelDomElement = document.createElement('div');
        tabpanelDomElement.classList.add('portal__tabpanel')
        tabpanelDomElement.classList.add('standard');
        tabpanelDomElement.classList.add(title);
        tabpanelDomElement.setAttribute('id', 'portal__tabpanel'+index);
 
        // Populate the slide with the arguments passed from the JSON data
        games.forEach(function(game) {
            var headerDomElement = document.createElement('span');
            headerDomElement.classList.add('portal__tabpanel__content__header');
            headerDomElement.textContent = game;
            tabpanelDomElement.append(headerDomElement);
            var listDomElement = document.createElement('ul');
            tabpanelDomElement.append(listDomElement);
 
            categories.forEach(function(category) {
                var listItemDomElement = document.createElement('li');
                listDomElement.append(listItemDomElement);
                var linkDomElement = document.createElement('a');
                listItemDomElement.append(linkDomElement);
                linkDomElement.href = window.location + '/wiki/Category:' + category + ' in ' + game.split(' ').join('_');
                linkDomElement.textContent = category;
            });
            
            var finalListItemDomElement = document.createElement('li');
            listDomElement.append(finalListItemDomElement);
            var linkDomElement = document.createElement('a');
            finalListItemDomElement.append(linkDomElement);
            linkDomElement.href = window.location + '/wiki/Category:' + game.split(' ').join('_');
            linkDomElement.textContent = '(more...)';
        });
 
        var navigationDomElement = document.querySelector('div.portal__content__contents');
        navigationDomElement.append(tabpanelDomElement);
    }
 
    generateArrays();
    function generateArrays () {
        tabs = document.querySelectorAll('div.portal__tab');
        panels = document.querySelectorAll('div.portal__tabpanel');
    }
 
    // Bind listeners
    for (i = 0; i < tabs.length; ++i) {
        addListeners(i);
    }
 
    function addListeners (index) {
        tabs[index].addEventListener('click', function(event) {
            var tab = event.target;
            activateTab(tab, false);
        });
 
        // Build an array with all tabs (<button>s) in it
        tabs[index].index = index;
    }
 
    // Activates any given tab panel
    function activateTab (tab) {
        // Deactivate all other tabs
        deactivateTabs();
 
        // Remove tabindex attribute
        tab.removeAttribute('tabindex');
 
        // Set the tab as selected
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('selected');
 
        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');
 
        // Remove hidden attribute from tab panel to make it visible
        document.getElementById(controls).classList.add('active');
    }
 
    // Deactivate all tabs and tab panels
    function deactivateTabs () {
        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1');
            tabs[t].setAttribute('aria-selected', 'false');
            tabs[t].classList.remove('selected');
        };
 
        for (p = 0; p < panels.length; p++) {
            panels[p].classList.remove('active');
        };
    }
}
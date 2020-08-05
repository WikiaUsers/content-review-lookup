/**
 * WikiTabs
 * 
 * Switches contents via list of buttons
 * Requires CSS setup (see MediaWiki:WikiTabs.css)
 *
 * @Configuration
 * Import [[MediaWiki:WikiTabs.js]] and [[MediaWiki:WikiTabs.css]].
 * How to import sheets: http://community.wikia.com/wiki/Help:Including_additional_CSS_and_JS
 * 
 * @Usage
 * 1. Wrap your contents to toggle with an element having "wikiTabs" class.
 *    They should be direct children of ".wikiTabs".
 * 2. Assign an id to this wrapper.
 * 3. Wrap your trigger buttons with an element having
 *    (contents wrapper's id) + Toggle
 *    They do not strictly have to be direct decendant element.
 * 
 *  <div id="pokemon" class="wikiTabs">
 *    <div>Target 1</div>
 *    <div>Target 2</div>
 *    <div>Target 3</div>
 *  </div>
 *  
 *  <div id="pokemonToggle">
 *  # [[#|Button 1]]
 *  # [[#|Button 2]]
 *  # [[#|Button 3]]
 *  </div>
 * 
 * @Author   User:Cafeinlove
 * @License  MIT License
 */
void function(document) {
    "use strict";

    var WikiTabs = function(tabGroup, panelGroup) {
        this.group = [];
        this.tabs = tabGroup.getElementsByTagName("a");
        this.panels = panelGroup.children;

        var self = this;

        iterate(self.tabs, function(_, index) {
            self.map(index);
        });

       panelGroup.classList.add("enabled");
    };

    WikiTabs.prototype = {
        map: function(index) {
            var item = new WikiTab(
                this,
                this.tabs[index],
                this.panels[index],
                index
            );
            
            this.group.push(item);
        },
        reset: function() {
            iterate(this.group, function(item, _) {
                item.hide();
            });
        }
    };

    var WikiTab = function(master, tab, panel, index) {
        this.master = master;
        this.tab = tab;
        this.panel = panel;
        this.isActive = false;

        if (index === 0) this.show();

        var self = this;

        tab.addEventListener("click", function(e) {
            e.preventDefault();
            self.master.reset();
            self.show();
        });
    };

    WikiTab.prototype.show = function() {
        this.isActive = true;
        this.tab.classList.add("active");
        this.panel.classList.add("active");
    };

    WikiTab.prototype.hide = function() {
        this.isActive = false;
        this.tab.classList.remove("active");
        this.panel.classList.remove("active");
    };

    function iterate(collection, callback) {
        for (var i = collection.length - 1; i >= 0; i--) {
            callback(collection[i], i);
        }
    }

    void function init() {
        var targets = document.getElementsByClassName("wikiTabs");

        if (targets.length === 0) return;

        iterate(targets, function(panelGroup, _) {
            var tabGroup = document.getElementById(panelGroup.id + "Toggle");
            new WikiTabs(tabGroup, panelGroup);
        });
    }();

}(document);
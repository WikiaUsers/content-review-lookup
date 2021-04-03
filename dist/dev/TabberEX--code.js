// __NOWYSIWYG__
/**
 * TabberEX
 *
 * @version 1.1
 *
 * @author Jono99 <https://dev.fandom.com/wiki/User:Jono99>
 *
 * documentation and examples at:
 * <https://dev.fandom.com/wiki/TabberEX>
 */
 
 (function (window, $, mw) {
    // Function called by tabs to switch tabs
    window.tabberex_switchTab = function(tabber_i, tab_i)
    {
        var tabber_id = "tabberex_" + tabber_i;
        $("#" + tabber_id).children().each(function(i) {
            tabberex_hideTab($(this), $("#" + tabber_id + "_" + i + "_content"));
        });
        var tab_id = tabber_id + "_" + tab_i;
        var tab = $("#" + tab_id);
        var tab_content = $("#" + tab_id + "_content");
        tabberex_showTab(tab, tab_content);
        if (tab.attr("data-tab-location") !== undefined)
        {
            tab_location = tab.attr("data-tab-location");
            if (tab_location[0] == "#" && history.pushState !== undefined)
                history.replaceState(null, null, tab_location);
            else
                location = tab_location;
        }
    };
 
    if (mw.config.get("wgVersion") < "1.33.3") // Legacy
    {
        // Marks a tab as active and reveals its content
        window.tabberex_showTab = function(tab, content)
        {
            tab.addClass("selected");
            content.css("display", "block");
        };
 
        // Marks a tab as inactive and hides its content
        window.tabberex_hideTab = function(tab, content)
        {
            tab.removeClass("selected");
            content.css("display", "none");
        };
 
        // Creates a tabber element and returns it
        window.tabberex_buildTab = function(tabber_i, tab_headers, tab_ex_headers, tab_content, tab_locations)
        {
            var tabber_id = "tabberex_" + tabber_i;
            var tabber = document.createElement("div");
            $(tabber).addClass("tabs-container");
 
            var tabber_tabs = document.createElement("ul");
            $(tabber_tabs).addClass("tabs")
            .attr("id", tabber_id);
            var tabber_content = document.createElement("div");
            $(tabber_content).addClass("tabberex_tab_contents");
            for (var i = 0; i < tab_headers.length; i++)
            {
                var tab_i = tabber_id + "_" + i;
                var tab = document.createElement("li");
                $(tab).attr("id", tab_i)
                .attr("data-tab-location", tab_locations[i]);
                var tab_a = document.createElement("a");
                tab_a.innerHTML = tab_headers[i];
                $(tab_a).attr("href", "javascript:tabberex_switchTab(" + tabber_i + ", " + i + ")");
                tab.appendChild(tab_a);
                tabber_tabs.appendChild(tab);
 
                var content = document.createElement("div");
                $(content).attr("id", tab_i + "_content")
                .css("display", "none");
                content.innerHTML = tab_content[i];
                tabber_content.appendChild(content);
            }
            tabber.appendChild(tabber_tabs);
            tabber.appendChild(tabber_content);
            return tabber.outerHTML;
        };
    }
    else // UCP
    {
		// Inject CSS
		(function() {
			var css = document.createElement("style");
			css.innerHTML = "/* CSS owned by FANDOM */\n.oo-ui-tabSelectWidget{text-align:left;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:auto}.oo-ui-tabOptionWidget{display:inline-block;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;vertical-align:bottom;align-items:center;display:inline-flex;font-size:12px;font-weight:700;height:40px;margin:0;padding:0 11px;text-transform:uppercase;-webkit-transition:background-color 300ms,color 300ms,border-color 300ms;-moz-transition:background-color 300ms,color 300ms,border-color 300ms;transition:background-color 300ms,color 300ms,border-color 300ms}.oo-ui-tabSelectWidget-frameless .oo-ui-tabOptionWidget,.oo-ui-tabSelectWidget:not(.oo-ui-tabSelectWidget-framed) .oo-ui-tabOptionWidget{-webkit-transition:color 300ms,box-shadow 300ms;-moz-transition:color 300ms,box-shadow 300ms;transition:color 300ms,box-shadow 300ms;border-bottom-style:solid;border-bottom-width:1px}.oo-ui-tabOptionWidget .oo-ui-labelElement-label{margin:0;pointer-events:none}";
			document.head.appendChild(css);
		})();
	
        window.tabberex_showTab = function(tab, content)
        {
            tab.addClass("oo-ui-optionWidget-selected")
            .css("cursor", "default");
            content.css("display", "block");
        };
 
        window.tabberex_hideTab = function(tab, content)
        {
            tab.removeClass("oo-ui-optionWidget-selected")
            .css("cursor", "pointer");
            content.css("display", "none");
        };
 
        window.tabberex_buildTab = function(tabber_i, tab_headers, tab_ex_headers, tab_content, tab_locations)
        {
            var tabber_id = "tabberex_" + tabber_i;
            var tabber = document.createElement("div");
            $(tabber).addClass("oo-ui-layout oo-ui-panelLayout oo-ui-indexLayout-tabPanel");
            var tabber_tabs = document.createElement("div");
            $(tabber_tabs).addClass("oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget oo-ui-selectWidget-unpressed oo-ui-selectWidget-depressed oo-ui-tabSelectWidget").attr("id", tabber_id);
            var tabber_content = document.createElement("div");
            $(tabber_content).addClass("tabberex_tab_contents");
            for (var i = 0; i < tab_headers.length; i++)
            {
                var tab_id = tabber_id + "_" + i;
                var tab = document.createElement("div");
                $(tab).addClass("oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget oo-ui-tabOptionWidget")
                .attr("id", tab_id)
                .attr("onclick", "tabberex_switchTab(" + tabber_i + ", " + i + ")")
                .attr("data-tab-location", tab_locations[i])
                .css("cursor", "pointer");
                var tab_span = document.createElement("span");
                $(tab_span).addClass("oo-ui-labelElement-label");
                if (tab_ex_headers[i] === undefined)
                	$(tab_span).text(tab_headers[i]);
                else
                	$(tab_span).html(tab_ex_headers[i]);
                tab.appendChild(tab_span);
                tabber_tabs.appendChild(tab);
                var content = document.createElement("div");
                $(content).attr("id", tab_id + "_content")
                .css("display", "none");
                content.innerHTML = tab_content[i];
                tabber_content.appendChild(content);
            }
            tabber.appendChild(tabber_tabs);
            tabber.appendChild(tabber_content);
            return tabber.outerHTML;
        };
    }
 
    var process_tabbers = function()
    {
        var tabber_i = 0;
        // The tabs are iterated through backwards to properly handle tabbers that are nested within other tabbers
        $($(".tabberex").get().reverse()).each(function() {
            var tab_headers = [];
            var tab_ex_headers = [];
            var tab_content = [];
            var tab_locations = [];
            var default_tab = 0;
 
            // Get tabber details
            $(this).children(".tabberex-tab").each(function(i) {
                // Get header
                var header = $(this).attr("data-tab-header");
                if (header === undefined) header = i + 1;
                tab_headers[i] = header;
 
                // Get content
                function get_ex_header(_) {
                	tab_ex_headers[i] = $(this).html();
                	$(this).detach();
                }
                $(this).children("p").children("span.tabberex-tab-header").each(get_ex_header);
                $(this).children("span.tabberex-tab-header").each(get_ex_header);
                tab_content[i] = $(this).html();
 
                // Get default
                if ($(this).hasClass("tabberex-tab-default"))
                    default_tab = i;
 
                // Get tab location
                tab_locations[i] = $(this).attr("data-tab-location");
                $(this).detach();
            });
			
            // Insert tabber into DOM and select default tab (or tab in url)
            var tabber = tabberex_buildTab(tabber_i, tab_headers, tab_ex_headers, tab_content, tab_locations);
            $(this).removeClass("tabberex").prepend(tabber);
            var default_tab_selector = "#tabberex_" + tabber_i + "_" + default_tab;
            if (location.hash !== ""
            && location.hash !== default_tab_selector
            && location.hash.split("_")[0] == "#tabberex"
            && location.hash.split("_")[1] == default_tab_selector.split("_")[1])
            {
                default_tab_selector = location.hash;
            }
            tabberex_showTab($(default_tab_selector), $(default_tab_selector + "_content"));
            tabber_i++;
        });
    };
 
    mw.hook("wikipage.content").add(process_tabbers);
}(this, jQuery, mediaWiki));
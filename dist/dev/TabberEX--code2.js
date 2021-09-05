// __NOWYSIWYG__
/**
 * TabberEX
 *
 * @version 2.2
 *
 * @author Jono99 <https://phigros.fandom.com/wiki/User:Jono99>
 *
 * documentation and examples at:
 * <https://dev.fandom.com/wiki/TabberEX>
 */
 
 (function (window, $, mw) {
	// Function called by tabs to switch tabs
	window.tabberex_switchTab = function(tabber_id, tab)
	{
		tabberex_hideAllTabs(tabber_id);
		tabberex_showTab(tabber_id, tab);
	};
 
	// Inject CSS
	(function() {
		var tabberex_css = document.createElement("style");
		tabberex_css.innerHTML = "/* CSS owned by FANDOM */\n.oo-ui-tabOptionWidget{display:inline-block;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;vertical-align:bottom;align-items:center;color:rgba(var(--theme-page-text-color--rgb),.75);display:inline-flex;font-size:14px;font-weight:500;height:40px;letter-spacing:.5px;margin:0;padding:0 11px;-webkit-transition:background-color .3s,color .3s,border-color .3s;-moz-transition:background-color .3s,color .3s,border-color .3s;transition:background-color .3s,color .3s,border-color .3s}.oo-ui-tabSelectWidget:not(.oo-ui-tabSelectWidget-framed) .oo-ui-tabOptionWidget{-webkit-transition:color .3s,box-shadow .3s;-moz-transition:color .3s,box-shadow .3s;transition:color .3s,box-shadow .3s;border-bottom:1px solid var(--theme-border-color)}.oo-ui-tabSelectWidget:not(.oo-ui-tabSelectWidget-framed) .oo-ui-tabOptionWidget.oo-ui-optionWidget-selected{box-shadow:inset 0 -2px 0 0 var(--theme-link-color);color:var(--theme-link-color)}";
		document.head.appendChild(tabberex_css);
	})();
		
	window.tabberex_showTab = function(tabber_id, i)
	{
		var base_selector = "[data-tabber-id=\"" + tabber_id + "\"]";
		$(".tabberex-head" + base_selector).children(":nth-child(" + i + ")")
		.addClass("oo-ui-optionWidget-selected")
		.css("cursor", "default");
				
		$($(".tabberex-body" + base_selector).children(":nth-child(" + i + ")").get()).each(function () {
            var display_value = $(this).attr("data-tab-display");
            if (display_value === undefined) display_value = "block";
            $(this).css("display", display_value);
        });
	};
	 
	window.tabberex_hideTab = function(tabber_id, i)
	{
		var base_selector = "[data-tabber-id=\"" + tabber_id + "\"]";
		$(".tabberex-head" + base_selector).children(":nth-child(" + i + ")")
		.removeClass("oo-ui-optionWidget-selected")
		.css("cursor", "pointer");
				
		$(".tabberex-body" + base_selector).children(":nth-child(" + i + ")").css("display", "none");
	};
			
	window.tabberex_hideAllTabs = function(tabber_id)
	{
		var base_selector = "[data-tabber-id=\"" + tabber_id + "\"]";
		$(".tabberex-head" + base_selector).children()
		.removeClass("oo-ui-optionWidget-selected")
		.css("cursor", "pointer");
				
		$(".tabberex-body" + base_selector).children().css("display", "none");
	}
	
	var tabberex_buildTabHead = function(host_div, tabber_id, tab_headers, tab_ex_headers, tab_locations)
	{
		var tabber_head = host_div;
		tabber_head.innerHTML = "";
		$(tabber_head).addClass("tabberex-head oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget oo-ui-selectWidget-unpressed oo-ui-selectWidget-depressed oo-ui-tabSelectWidget")
		.attr("data-tabber-id", tabber_id);
		for (var i = 0; i < tab_headers.length; i++)
		{
			var tab = document.createElement("div");
			$(tab).addClass("oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget oo-ui-tabOptionWidget")
			.css("cursor", "pointer");
			if (tab_locations[i] === undefined)
				$(tab).attr("onclick", "tabberex_switchTab(\"" + tabber_id + "\", " + (i + 1) + ")");
			else
				$(tab).attr("onclick", "location = \"" + tab_locations[i] + "\"");
			var tab_span = document.createElement("span");
			$(tab_span).addClass("oo-ui-labelElement-label");
			if (tab_ex_headers[i] === undefined)
				$(tab_span).text(tab_headers[i]);
			else
				$(tab_span).html(tab_ex_headers[i]);
			tab.appendChild(tab_span);
			tabber_head.appendChild(tab);
		}
		return tabber_head.outerHTML;
	};
	
	var process_tabber_head_tab = function(tab_element, i)
	{
		// Get header
		var header = $(tab_element).attr("data-tab-header");
		if (header === undefined) header = i + 1;
		
		// Get ex header
		var ex_header;
		function get_ex_header(_) {
			ex_header = $(this).html();
			$(this).remove();
		}
		$(tab_element).children("p").children("span.tabberex-tab-header").each(get_ex_header);
		$(tab_element).children("span.tabberex-tab-header").each(get_ex_header);
		
		// Get default
		var is_default = false;
		if ($(tab_element).hasClass("tabberex-tab-default"))
			is_default = true;
		
		// Get tab location
		var tab_location = $(this).attr("data-tab-location");
		
		return {"header": header, "ex_header": ex_header, "default": is_default, "location": tab_location};
	};
	
	var process_tabbers = function()
	{
		var tabber_i = 0;
		var default_tabs = {};
		var tabber_ids = [];
		// The tabs are iterated through backwards to properly handle tabbers that are nested within other tabbers
		$($(".tabberex-head").get().reverse()).each(function() {
			var tab_headers = [];
			var tab_ex_headers = [];
			var tab_locations = [];
			var default_tab = 0;
				
			var tabber_id = $(this).attr("data-tabber-id");
			if (tabber_id === undefined) tabber_id = String(tabber_i);
				
			$(this).children(".tabberex-tab").each(function(i) {
				var tab_details = process_tabber_head_tab(this, i);
				tab_headers[i] = tab_details.header;
				tab_ex_headers[i] = tab_details.ex_header;
				if (tab_details.default)
					default_tab = i;
				tab_locations[i] = tab_details.location;
				$(this).detach();
			});
			
			// Insert tabs into DOM
			tabberex_buildTabHead(this, tabber_id, tab_headers, tab_ex_headers, tab_locations);
			if (default_tabs[tabber_id] === undefined)
				default_tabs[tabber_id] = default_tab;
			tabber_ids.push(tabber_id);
			tabber_i++;
		});
		
		$($(".tabberex-body").get().reverse()).each(function() {
			$(this).children().css("display", "none");
		});
		
		$($(".tabberex").get().reverse()).each(function() {
			var tab_headers = [];
			var tab_ex_headers = [];
			var tab_locations = [];
			var default_tab = 0;
			var tab_contents = [];
			
			var tabber_id = $(this).attr("data-tabber-id");
			if (tabber_id === undefined) tabber_id = String(tabber_i);
            $(this).attr("data-tabber-id", tabber_id);

            var tabber_head = document.createElement("div");
            $(tabber_head).addClass("tabberex-head").attr("data-tabber-id", tabber_id);
            $(this).removeClass("tabberex").addClass("tabberex-body");
			
			$(this).children(".tabberex-tab").each(function(i) {
				var tab_details = process_tabber_head_tab(this, i);
				tab_headers[i] = tab_details.header;
				tab_ex_headers[i] = tab_details.ex_header;
				if (tab_details.default)
					default_tab = i;
				tab_locations[i] = tab_details.location;
				
				// Get tab content
				$(this).css("display", "none");
				tab_contents[i] = $(this);
			});

            tabberex_buildTabHead(tabber_head, tabber_id, tab_headers, tab_ex_headers, tab_locations);
			if (default_tabs[tabber_id] === undefined)
				default_tabs[tabber_id] = default_tab;
            $(tabber_head).insertBefore(this);
			tabber_ids.push(tabber_id);
			tabber_i++;
		});
		
		// Select default tabs
		for (i in tabber_ids)
		{
			tabberex_showTab(tabber_ids[i], default_tabs[tabber_ids[i]] + 1);
		}
	};
 
	mw.hook("wikipage.content").add(process_tabbers);
}(this, jQuery, mediaWiki));
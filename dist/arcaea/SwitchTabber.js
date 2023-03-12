// __NOWYSIWYG__
/**
 * SwitchTabber
 * 
 * @version 1.0
 * 
 * @author Jono99 <https://arcaea.fandom.com/wiki/User:Jono99>
 * 
 * This script adds a TabberEX tabber head to the top of every page that has
 * content that varies between the mobile and Nintendo Switch versions
 * of Arcaea, as denoted by a tabberex body with the data-tabber-id
 * of "SwitchTabber" being on the page. This tabber will also use a cookie to
 * keep track of which tab the user has selected across pages.
 * 
 * This script has a dependancy on TabberEX, which must be imported before
 * this script. <https://dev.fandom.com/wiki/TabberEX>
 */

(function (window, $, mw) {
	window.switchtabber_switchTab = function(i)
	{
		tabberex_switchTab("SwitchTabber", i);
		document.cookie = "SwitchTab=" + (i === 1 ? "Mobile" : "Switch") + ";";
	};
	
	var create_switch_tabber = function()
	{
		var switch_tabber = document.createElement("div");
		$(switch_tabber).addClass("tabberex-head oo-ui-widget oo-ui-widget-enabled oo-ui-selectWidget oo-ui-selectWidget-unpressed oo-ui-selectWidget-depressed oo-ui-tabSelectWidget")
		.attr("data-tabber-id", "SwitchTabber");
		
		var mobile_tab = document.createElement("div");
		$(mobile_tab).addClass("oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget oo-ui-tabOptionWidget")
		.css("cursor", "pointer");
		$(mobile_tab).attr("onclick", "switchtabber_switchTab(1)");
		var mobile_tab_span = document.createElement("span");
		$(mobile_tab_span).addClass("oo-ui-labelElement-label");
		$(mobile_tab_span).html("<img src=\"https://static.wikia.nocookie.net/iowiro/images/5/5b/SwitchTabber_Mobile.png/revision/latest?cb=20210703082420&format=original\" style=\"height: 24px;\"></img>Mobile");
		mobile_tab.appendChild(mobile_tab_span);
		switch_tabber.appendChild(mobile_tab);
		
		var switch_tab = document.createElement("div");
		$(switch_tab).addClass("oo-ui-widget oo-ui-widget-enabled oo-ui-labelElement oo-ui-optionWidget oo-ui-tabOptionWidget")
		.css("cursor", "pointer");
		$(switch_tab).attr("onclick", "switchtabber_switchTab(2)");
		var switch_tab_span = document.createElement("span");
		$(switch_tab_span).addClass("oo-ui-labelElement-label");
		$(switch_tab_span).html("<img src=\"https://static.wikia.nocookie.net/iowiro/images/a/ad/SwitchTabber_Switch.png/revision/latest?cb=20210703082433&format=original\" style=\"height: 24px; margin-right: 4px;\"></img>Switch");
		switch_tab.appendChild(switch_tab_span);
		switch_tabber.appendChild(switch_tab);
		return switch_tabber;
	};
	
	var add_switch_tabber = function()
	{
		// Check if there is any tabber content
		var SwitchTabber_exists = document.body.querySelectorAll("[data-tabber-id=SwitchTabber]").length > 0;
		
		if (SwitchTabber_exists)
		{
			console.log("Adding tabber header");
			if (document.body.classList.contains("skin-oasis"))
				add_switch_tabber_oasis();
			else
				add_switch_tabber_fandomdesktop();
		}
		
		// Switch to mobile or switch tab based on cookies
		var initialtab = 1;
		var tab_cookie = document.cookie.match(/SwitchTab=(\w+);/);
		if (tab_cookie !== null && tab_cookie[1] === "Switch")
			initialtab = 2;
		//setTimeout(tabberex_switchTab, 200, "SwitchTabber", initialtab);
		tabberex_switchTab("SwitchTabber", initialtab);
	};
	
	var add_switch_tabber_oasis = function()
	{
		var switch_tabber = create_switch_tabber();
		
		$($(".page-header__main").get()).each(function() {
			var heading = $(this).children("#firstHeading").get()[0];
			$(heading).detach();
			var containing_div = document.createElement("div");
			$(containing_div).css("display", "flex")
			.css("align-content", "center")
			.css("justify-content", "space-between")
			.append(heading).append(switch_tabber);
			$(this).append(containing_div);
		});
	};
	
	var add_switch_tabber_fandomdesktop = function()
	{
		var switch_tabber = create_switch_tabber();
		var topbar_switch_tabber = create_switch_tabber();
		
		$(".page-header__title-wrapper").css("display", "flex")
		.css("align-content", "center")
		.css("justify-content", "space-between")
		.append(switch_tabber);
		
		// Add tabber to sticky top navigation
		$(topbar_switch_tabber).insertAfter(".fandom-sticky-header > :first-child");
	};
	
	mw.hook("wikipage.content").add(add_switch_tabber);
}(this, jQuery, mediaWiki));
/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny
 * More cleanup and features by Cblair91
 */

var ajaxTimer, doRefresh = true;

var ajaxPages = ["Special:RecentChanges", "Special:WikiActivity", "Special:Log",
                 "Special:Watchlist", "Special:Contributions", "Special:AbuseLog", 
                 "Special:NewFiles", "Special:Statistics", "Special:NewPages",
                 "Special:ListFiles"];
if(!window.ajaxCallAgain)
	var ajaxCallAgain = [];

function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

function getCookie(c_name) {
	if(document.cookie.length > 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if(c_start !== -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if(c_end === -1)
				c_end = document.cookie.length;
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function preloadAJAXRL() {
	($('#WikiaPageHeader').length) ? $('#WikiaPageHeader') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader > h1') : $('.firstHeading')).append('<span style="font-size: xx-small; line-height: 100%;"><span style="border-bottom: 1px dotted;" onClick="loadPageData()">Refresh Now:</span><input type="checkbox" style="margin-bottom: 0;" id="ajaxToggle"><span style="display: none;" id="ajaxLoadProgress"><img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline; float: none;" border="0" alt="Refreshing page" /></span></span>');
	if($('.mw-rc-openarrow a').length)
		$('.mw-rc-openarrow a').removeAttr('href').css('cursor', 'pointer');
	$('#ajaxLoadProgress').ajaxSend(function(event, xhr, settings) {
		if(location.href == settings.url)
			$(this).show();
	}).ajaxComplete(function(event, xhr, settings) {
		var	$collapsibleElements = $('#mw-content-text').find('.mw-collapsible');
		if(location.href == settings.url) {
			$(this).hide();
			for(var i = 0; i < ajaxCallAgain.length; i++)
				ajaxCallAgain[i]();
			if($collapsibleElements.length)
				$collapsibleElements.makeCollapsible();
			if(mw.config.get('wgNamespaceNumber') === -1 && mw.config.get('wgCanonicalSpecialPageName') === 'Recentchanges') {
				mw.special.recentchanges.init();
				if($('.mw-recentchanges-table').find('.WikiaDropdown').length)
					RecentChangesLocal.init();
				if($('.mw-rc-openarrow a').length)
					$('.mw-rc-openarrow a').removeAttr('href').css('cursor', 'pointer');
			}
		}
	});
	$('#ajaxToggle').click(toggleAjaxReload);
	$('#ajaxToggle').attr('checked', (getCookie("ajaxload-" + wgPageName) == "on") ? true : false);
	if(getCookie("ajaxload-" + wgPageName) == "on")
		loadPageData();
}

function toggleAjaxReload() {
	if ($('#ajaxToggle').prop('checked') === true) {
		setCookie("ajaxload-" + wgPageName, "on", 30);
		doRefresh = true;
		loadPageData();
	} else {
		setCookie("ajaxload-" + wgPageName, "off", 30);
		doRefresh = false;
		clearTimeout(ajaxTimer);
	}
}

function loadPageData() {
	var cC = '#mw-content-text';
	$(cC).load(location.href + " " + cC + "> *", function (data) {
		if(doRefresh)
			ajaxTimer = setTimeout(loadPageData, 60000);
	});
}

$(function() {
	for(var x = 0; x < ajaxPages.length; x++)
		if(wgPageName == ajaxPages[x] && $('#ajaxToggle').length === 0)
			preloadAJAXRL();
});

var RecentChangesLocal = {
	init: function() {
		this.$table = $('.mw-recentchanges-table');
		this.$dropdown = this.$table.find('.WikiaDropdown');
		this.$submit = this.$table.find('input[type="submit"]');
		this.$submit.on('click.RecentChangesDropdown', $.proxy(this.saveFilters, this));
		this.$submit.removeAttr('disabled');
		this.dropdown = new Wikia.MultiSelectDropdown(this.$dropdown);
		this.dropdown.on('change', $.proxy(this.onChange, this));
	},
	saveFilters: function(event) {
		var self = this;
		event.preventDefault();
		self.dropdown.disable();
		self.$submit.attr('disabled', 'disabled');
		if(self.dropdown.getSelectedValues().length == 0)
			self.dropdown.doSelectAll(true);
		$.nirvana.sendRequest({
			controller: 'RecentChangesController',
			method: 'saveFilters',
			data: {
				filters: self.dropdown.getSelectedValues()
			},
			type: 'POST',
			format: 'json',
			callback: function(data) {
				window.location.reload();
			}
		});
	}
};
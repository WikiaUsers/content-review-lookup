/*
 * ADVANCED AJAX AUTO-REFRESHING ARTICLES
 * Code originally by "pcj" of Wowpedia
 * Maintenance, cleanup, style and bug fixes by Grunny (http://community.wikia.com/wiki/User:Grunny)
 * Modified by Vuh
 */
var ajaxIndicator = ajaxIndicator || 'https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif',
	ajaxTimer,
	ajaxRefresh = 60000,
	refreshText = 'Automatyczne odświeżanie',
	refreshHover = 'Automatycznie aktualizuje tę stronę',
	doRefresh = true;

if (!window.ajaxPages) {
	var ajaxPages = [
		'Specjalna:Aktywność_na_wiki',
		'Specjalna:Ostatnie_zmiany',
		'Specjalna:Rejestr',
		'Specjalna:Nowe_pliki',
		'Specjalna:Nowe_strony',
		'Specjalna:Aktywność_na_wiki/activity',
		'Specjalna:Aktywność_na_wiki/watchlist'
	];
}
if (!window.ajaxCallAgain) {
	var ajaxCallAgain = [];
}
if (typeof AjaxRCRefreshText == "string") {
	refreshText = AjaxRCRefreshText;
}
if (typeof AjaxRCRefreshHoverText == "string") {
	refreshHover = AjaxRCRefreshHoverText;
}

/**
 * Sets the cookie
 * @param c_name string Name of the cookie
 * @param value string 'on' or 'off'
 * @param expiredays integer Expiry time of the cookie in days
 */
function setCookie(c_name, value, expiredays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * Gets the cookie
 * @param c_name string Cookie name
 * @return The cookie name or empty string
 */
function getCookie(c_name) {
	if (document.cookie.length &gt; 0) {
		var c_start = document.cookie.indexOf(c_name + "=");
		if (c_start !== -1) {
			c_start = c_start + c_name.length + 1;
			var c_end = document.cookie.indexOf(";", c_start);
			if (c_end === -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

/**
 * Main function to start the Auto-refresh process
 */
function preloadAJAXRL() {
	var ajaxRLCookie = (getCookie("ajaxload-" + wgPageName) == "on") ? true : false;
	if (wgPageName == "Specjalna:Aktywność_na_wiki" || wgPageName == "Specjalna:Aktywność_na_wiki/watchlist" || wgPageName == "Specjalna:Aktywność_na_wiki/activity") {
		appTo = ($('#WikiaPageHeader').length) ? $('#WikiaPageHeader .activity-nav ul') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader &gt; h1') : $('.firstheading'));
	} else {
		appTo = ($('#WikiaPageHeader').length) ? $('#WikiaPageHeader &gt; h2') : ($('#AdminDashboardHeader').length ? $('#AdminDashboardHeader &gt; h1') : $('.firstheading'));
	};
	appTo.append('&lt;li id="ajaxRefresh"&gt;&lt;span id="ajaxRefresh"&gt;&lt;span id="ajaxToggleText" title="' + refreshHover + '"&gt;' + refreshText + ':&lt;/span&gt;&lt;input type="checkbox" id="ajaxToggle" /&gt;&lt;span id="ajaxLoadProgress" style="background:url(' + ajaxIndicator + ') no-repeat;"&gt;&lt;/span&gt;&lt;/span&gt;&lt;/li&gt;');
	$('#ajaxLoadProgress').ajaxSend(function (event, xhr, settings) {
		if (location.href == settings.url) {
			$(this).css({
				'opacity': '1',
				'filter': 'alpha(opacity=100)'
			});
		}
	}).ajaxComplete(function (event, xhr, settings) {
		var $collapsibleElements = $('#mw-content-text').find('.mw-collapsible');
		if (location.href == settings.url) {
			$(this).css({
				'opacity': '0',
				'filter': 'alpha(opacity=0)'
			});
			for (var i = 0; i &lt; ajaxCallAgain.length; i++) {
				ajaxCallAgain[i]();
			}
			if ($collapsibleElements.length) {
				$collapsibleElements.makeCollapsible();
			}
			if (mw.config.get('wgNamespaceNumber') === -1 &amp;&amp; mw.config.get('wgCanonicalSpecialPageName') === 'Recentchanges') {
				mw.special.recentchanges.init();
				if ($('.mw-recentchanges-table').find('.WikiaDropdown').length) {
					RecentChangesLocal.init();
				}
			}
		}
	});
	$('#ajaxRefresh').css({
		'font-size': 'xx-small',
		'line-height': '100%',
		'float': 'right',
		'margin-right': '-135px'
	});
	$('#ajaxToggleText').css({
		'border-bottom': '1px dotted',
		'cursor': 'help'
	});
	$('#ajaxToggle').css({
		'margin-top': '1px',
		'position': 'absolute'
	});
	$('#ajaxLoadProgress').css({
		'opacity': '0',
		'filter': 'alpha(opacity=0)',
		'position': 'absolute',
		'height': '24px',
		'width': '24px',
		'transition': 'opacity .5s',
		'-moz-transition': 'opacity .5s',
		'-webkit-transition': 'opacity .5s',
		'-o-transition': 'opacity .5s',
		'margin': '-4px 0 0 20px'
	});
	$('#ajaxToggle').click(toggleAjaxReload);
	$('#ajaxToggle').attr('checked', ajaxRLCookie);
	if (getCookie("ajaxload-" + wgPageName) == "on") {
		loadPageData();
	}
}

/**
 * Turn refresh on and off by toggling the checkbox
 */
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

/**
 * Does the actual refresh
 */
function loadPageData() {
	var cC = '#mw-content-text';
	$(cC).load(location.href + " " + cC + " &gt; *", function (data) {
		if (doRefresh) {
			ajaxTimer = setTimeout(loadPageData, ajaxRefresh);
		}
	});
}

/**
 * Load the script on specific pages
 */
$(function () {
	for (var x = 0; x &lt; ajaxPages.length; x++) {
		if (wgPageName == ajaxPages[x] &amp;&amp; $('#ajaxToggle').length === 0) {
			preloadAJAXRL();
		}
	}
});

/**
 * Temp Hack: copy the RC filter JS since it can't be accessed
 */
var RecentChangesLocal = {
	init: function () {
		this.$table = $('.mw-recentchanges-table');
		this.$dropdown = this.$table.find('.WikiaDropdown');
		this.$submit = this.$table.find('input[type="submit"]');
		this.$submit.on('click.RecentChangesDropdown', $.proxy(this.saveFilters, this));
		this.$submit.removeAttr('disabled'); //FF clean

		this.dropdown = new Wikia.MultiSelectDropdown(this.$dropdown);
		this.dropdown.on('change', $.proxy(this.onChange, this));

	},

	saveFilters: function (event) {
		var self = this;

		event.preventDefault();

		self.dropdown.disable();
		self.$submit.attr('disabled', 'disabled');

		if (self.dropdown.getSelectedValues().length == 0) {
			self.dropdown.doSelectAll(true);
		}

		$.nirvana.sendRequest({
			controller: 'RecentChangesController',
			method: 'saveFilters',
			data: {
				filters: self.dropdown.getSelectedValues()
			},
			type: 'POST',
			format: 'json',
			callback: function (data) {
				window.location.reload();
			}
		});
	}
};
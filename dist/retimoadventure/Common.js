/* Any JavaScript here will be loaded for all users on every page load. */

/*Add click-through banners to right column*/
(function () {
	var obj = {};
	obj.clickThrough = function () {
		var rail = document.getElementById('WikiaRail'),
			recent = document.getElementById('WikiaRecentActivity'),
			div;
		if (rail && recent && recent.parentNode === rail) {
			div = document.createElement('DIV');
			div.innerHTML = [
			    '<strong><div align="center">Server is currently<span style="color:green",> ONLINE.</span></b></div></strong>',
			    '<!--<div align="center">Maintenance is scheduled for <span style="color:red">July 16, 09:00 - 11:00 GMT</span></div>-->',
                '<!--<div align="center"><b>Server Maintenance Ongoing: <span style="color:red">EMERGENCY.</span></b></div>-->',
			    '<div align="center"><iframe src="http://www.thetimenow.com/clock/kst/korea_standard_time?t=n&embed=1&text=15&textdate=20&format=12&digitalclock=36&analogclock=60&letter_spacing=-1&bordersize=1&bordercolor=black&bgcolor=EBF8FF&colorloc=000000&colordigital=2C8EBF&colordate=000000&styleloc=normal&styledigital=normal&styledate=bold&right=0" width="300" height="100" style="border:none;overflow:hidden;" scrolling="no"></iframe><a href="http://www.thetimenow.com/kst/korea_standard_time" style="position:absolute; top:0; left:0; display:inline-block; width:300px; height:100px; z-index:50;" target="_blank" rel="nofollow" title="Clock provided by thetimenow.com"></a>',
			    '</iframe></div>',
			].join('');
			recent.parentNode.insertBefore(div, recent);
		}
                return !!(rail && recent);
	};
	obj.insert = function () {
		if (!obj.clickThrough()) {
			setTimeout(function() {
				obj['insert']();
			}, 250);
		}
	};
	obj.insert();
})();
 
/* Auto updating recent changes opt-in
  * See w:c:dev:AjaxRC for info & attribution 
  */
 
 AjaxRCRefreshText = 'Auto-Refresh';
 AjaxRCRefreshHoverText = 'Automatically refresh the page';
 ajaxPages = ["Special:RecentChanges","Special:WikiActivity"];
 importScriptPage('AjaxRC/code.js', 'dev');
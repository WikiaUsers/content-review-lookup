// Created by User:TheSeal27 for the Roblox Survive and Kill the Killers in Area 51 Wiki on Fandom. Original page: https://saktkia51.fandom.com/wiki/MediaWiki:UserPageNotice.js
{
	if (mw.config.get('wgNamespaceNumber') === 2 && mw.config.get('wgTitle').match(/[/]/) !== null && !document.getElementById('UserPageNotice')) {
		console.log("[User Page Notice] [LOG]: Script activation conditions met. Running script...");
		let str = "<div class='templatedesktop AlertNotice' id='UserPageNotice'><span style='font-weight:bold;font-size:20px'>"
		+ "<span style='color:var(--saktkia51-js-userpagenotice-hazard-color)'>⚠</span> Unofficial Content <span style='color:var(--saktkia51-js-userpagenotice-hazard-color)'>⚠</span></span><br>"
		+ `<span style='font-weight:bold'>${mw.config.get('wgPageName').replace(/_/g, ' ')}</span> is a personal user page. It is not a main wiki article, and as such, any information contained on this page is not official.</div>`;
		document.getElementById('content').insertAdjacentHTML('beforebegin', str);
	} else {
		console.log("[User Page Notice] [LOG]: Script activation conditions not met. Exiting...");
	}
}
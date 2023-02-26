// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:UserPageNotice.js
// Check if current page is a sub-page of a page in the 'User' namespace.
if (window.location.pathname.match(/[/]User:.*[/]/gi) && mw.config.get('wgAction') === "view") {
    const pagename = mw.config.get("wgCanonicalNamespace") + ":" + mw.config.get("wgTitle");
    const text = "<div class='templatedesktop AlertNotice'><span style='font-weight:bold;font-size:20px'><span style='color:#FFA500'>⚠</span> Unofficial Content <span style='color:#FFA500'>⚠</span></span><br>" + "<span style='font-weight:bold'>" + pagename + "</span>" + " is a personal user page. It is not a main wiki article, and as such, any information contained on this page is not official.</div>";
    document.getElementById("content").insertAdjacentHTML("beforebegin", text);
}
// If current page is not a sub-page of a 'User' namespace page and the current action is not 'view', return null.
else {
    null;
}
// Created by User:TheSeal27 for the Roblox Grass Cutting Incremental Wiki on Fandom. Original page: https://roblox-grass-cutting-incremental.fandom.com/wiki/MediaWiki:UserPageNotice.js
// Created by User:TheSeal27 for the Mining Simulator Wiki on Fandom. Original page: https://mining-simulator.fandom.com/wiki/MediaWiki:UserPageNotice.js
if (mw.config.get('wgNamespaceNumber') == 2 && mw.config.get('wgTitle').match(/[/]/) !== null) {
    const text = "<div class='templatedesktop AlertNotice'><span style='font-weight:bold;font-size:20px'><span style='color:#FFA500'>⚠</span> Unofficial Content <span style='color:#FFA500'>⚠</span></span><br>" + "<span style='font-weight:bold'>" + mw.config.get('wgPageName').replace(/_/g, ' ') + '</span>' + ' is a personal user page. It is not a main wiki article, and as such, any information contained on this page is not official.</div><br/>';
    document.getElementById('content').insertAdjacentHTML('beforebegin', text);
}
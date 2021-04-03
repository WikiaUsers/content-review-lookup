if (mw.config.get('wgCanonicalSpecialPageName') == "Recentchanges"){
    $(".mw-rc-openarrow").each(function(){$(this).click();});

    window.ajaxCallAgain = window.ajaxCallAgain || [];
    window.ajaxCallAgain.push(function(){$(".mw-rc-openarrow").each(function(){$(this).click();});});
}
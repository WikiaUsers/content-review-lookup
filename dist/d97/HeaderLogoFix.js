function privateLogoSwitcher() {
    var displayed = $("#ChatHeader > h1.private").css( "display" );
    if(circleType=="circle" && alignType=="right") {
        if(displayed=='block') {
            $( "#HeaderLogo" ).css( "display", "none" );
        } else {
            $( "#HeaderLogo" ).css( "display", "inline" );
        }
    }
    console.log("privateLogoSwitcher success");
}

$("#Rail > h1.public.wordmark").hover(function() {privateLogoSwitcher()});
$("#PrivateChatList > li").hover(function() {privateLogoSwitcher()});
$("#UserStatsMenu > div.actions > ul.regular-actions > li.private").hover(function() {privateLogoSwitcher()});
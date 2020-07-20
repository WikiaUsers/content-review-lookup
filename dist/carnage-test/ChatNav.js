var chatNav = {
    init: function(){
        var navHTML =
            '<aside class="ChatNavigation chat-navigation side-nav" id="ChatNavigation">' +
                '<nav class="navigation-menu chat-menu">' +
                    '<h3>Menu</h3>' +
                    '<ul>' +
                    '</ul>' +
                '</nav>' +
            '</aside>';
        if (wgCanonicalSpecialPageName == "Chat" || wgPageName == "Special:Chat"){
            if (!$('#ChatNavigation').length){
                $('body.ChatWindow').append(navHTML);
            }
        }
    }
};

$(document).ready(function(){
    chatNav.init();
});
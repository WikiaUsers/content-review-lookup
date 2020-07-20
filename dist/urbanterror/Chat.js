/* Replace Wikia chat with IRC chat */

//Insert the IRC chat, and use the Wikia username as their IRC nick
$(function () {
    if ( mw.config.get( 'wgCanonicalSpecialPageName' ) == 'Chat' ) {
        $( '#WikiaPage' ).append( '<div id="IRCchatreplace" class="IRCchat"><iframe id="UrTwikiChat" class="IRCframe" src="http://webchat.quakenet.org/?nick=' + mw.config.get('wgUserName') + '&channels=%23cmm%2C%23urbanmappers%2C%23urbanterror%2C%23urtwiki&uio=OT10cnVlJjExPTIzNg6b"></iframe></div>' );
        //mw.util.addCSS( '#IRCchatreplace{border:' + $( '#IRCchatreplace' ).css( 'border' ) + ';background:' + $( '#IRCchatreplace' ).css( 'background' ) + ';}' );
    }
});
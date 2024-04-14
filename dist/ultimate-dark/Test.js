(function(mw, $){
    'use strict';
    if (wgCanonicalSpecialPageName === "Chat") {
       importStyleSheet("MediaWiki:Test.css", "ultimate-dark");
       $('.ChatHeader .public').append('<div class="test-menu"><nav class="test-menu-wrapper" id="test-menu-wrapper">Test<span class="drop"><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron" /></span><section class="navigation"><ul class="GlobalModule dropdown test-menu-list" id="GlobalModule"><li><a href="javascript:openTestModal();">Test</a></li><li><a href="javascript:clearChat();">Clear Chat</a></li><li id="options"><a>Options</a><ul><li><form class="WikiaForm" method="" name="" style="overflow-y: auto; max-height: 180px;"><h2>Options</h2><label for="background">Chat Background: </label><input id="background" type="text" placeholder="Chat Background" autofocus /><br /><label for="self-post">Self Post Background: </label><input id="self-post" type="text" placeholder="Self Post Background" /><br /><label for="surround">Surround: </label><input id="surround" type="text" placeholder="Surround Background" /><br /><label for="selfpost-color">Self Post Color: </label><input id="selfpost-color" type="text" placeholder="Self Post Color" /><br /><label for="chat-color">Chat Text Color: </label><input id="chat-color" type="text" placeholder="Chat Text Color" /><br /><label for="chat-font">Chat Font: </label><select id="chat-font"></select><br /><label for="selfpost-font">Self Post Font</label><section class="options-right" style="float: right;"><button type="submit" class="wikia-button">Submit</button></section></form></li></ul></li><li><a href="javascript:toggleAway();">Toggle Away</a></li></ul></section></nav></div>');
       /* Function to add fonts */
       function addFont(font) {
           var option = '<option value="' + font + '">' + font + '</option>';
           $('#chat-font, #selfpost-font').append(option);
       }
       /* Configuring Fonts */
       addFont('Aclonica');
       addFont('Acme');
       addFont('Arial');
       addFont('Comic Sans');
       addFont('Courier New');
       addFont('Doppio One');
       addFont('Georgia');
       addFont('Lato');
       addFont('Lucida Console');
       addFont('Orbitron');
       addFont('Palatino Linotype');
       addFont('Segoe UI');
       addFont('Source Sans Pro');
       addFont('Tahoma');
       addFont('Trebuchet MS');
       addFont('Verdana');

       if (wgUserGroups.indexOf('chatmoderator') != -1 && wgUserGroups.indexOf('sysop') != -1) {
          $('.test-menu-list').append('<li><a href="javascript:multiKick();">Multi Kick</a></li>');
       }
    }
})(this.mediawiki, this.jQuery);
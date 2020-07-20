//__NOWYSIWYG__ <syntaxhighlight lang="javascript">
/**
  * Disable Bot Message Walls 
  * 
  * @author - Jdm280
  *  
  */

$(function (config) {
    config = config || {};
    var PageName = mw.config.get('wgTitle'), 
    Namespace = mw.config.get('wgCanonicalNamespace'),
    exceptions = config.exceptions || [];
 
    if (Namespace === "Message_Wall") {
        $.getJSON('/api.php?action=query&list=groupmembers&gmgroups=bot&gmlimit=max&format=json', //Calling all bots
        function(data) {
            var botList = data.users;
            for (var i = 0; i < botList.length; i++) {
                if (botList[i].name === PageName) {
                    if (exceptions.indexOf(PageName) === -1 ) {
                        $('.Wall.Board').remove();
                    }
                    break;
                }
            }
        });
    }
}(window.DisableBotMessageWalls));
// </syntaxhighlight>
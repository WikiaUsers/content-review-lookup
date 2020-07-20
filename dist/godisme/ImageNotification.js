importScriptPage('MediaWiki:APIQuery.js', 'monchbox');
     
    function ImageNotification() {
            if(wgPageName != wgSiteName + 'talk:Image Gallery' && wgPageName != wgSiteName + 'talk:Image Gallery') {
                    //check if someone edited the talk page for the gallery
                    var api = new APIQuery({logger: function() {}});
                    api.newQuery('GET', {action: 'query', prop: 'info', titles: wgSiteName + talk:Image Gallery'}, function(result) {
                            var pages = result.query.pages;
                            for(var i in pages) {
                                    if(i > 0 && pages[i].lastrevid > readCookie('msgwl_' + pages[i].title.substring(pages[i].title.lastIndexOf(':') + 2))) {
                                            var sub = pages[i].title.substring(pages[i].title.lastIndexOf('/') + 1);
                                            if(skin == 'oasis') {
                                                    document.getElementById('WikiaFooter').getElementsByTagName('ul')[0].outerHTML += '<ul id="WikiaNotifications" class="WikiaNotifications"><li><div data-type="1"><a class="sprite close-notification"></a>There is a <a href="/index.php?title= wgSiteName + 'talk:Image Gallery'" title="wgSiteName + 'talk:Image Gallery'">new image to be catalogued</a>.</div></li></ul>';
                                            }
                                            else {
                                                    document.getElementById('contentSub').outerHTML += '<div class="usermessage">There is a <a href="/index.php?title= wgSiteName + 'talk:Image Gallery'" title="wgSiteName + 'talk:Image Gallery'">image to be catalogued</a>.</div>';
                                            }
                                    }
                            }
                    });
                    api.send(0);
            }
            else {createCookie('msgwl_' + wgPageName.substring(wgPageName.lastIndexOf(':') + 2), wgCurRevisionId, 99999);}
}
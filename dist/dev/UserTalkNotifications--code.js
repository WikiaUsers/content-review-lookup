// 22:25, July 10, 2015 (UTC)

// User Talk Notifications
// Author: Seaside98
// Updated for Monobook by Curiouscrab (July 2015)

// Variables
mw.loader.using('mediawiki.Title').then(function() {
    var talkWikis = window.talkWikis || [];
    var pageName = window.talkName || 'Talk';
    
    var talkNames = [];
    var enUserName = encodeURIComponent(wgUserName);
    var subdomain = wgServer.match(/^https?:\/\/(.*)\.(wikia\.com|fandom\.com|wikia\.org)$/)[1];
    var domain = wgServer.match(/^https?:\/\/(.*)\.(wikia\.com|fandom\.com|wikia\.org)$/)[2];
    var pageTitle = new mw.Title(wgPageName).title;
    var talkpageTitle = wgUserName + '/' + pageName;
    
    // Untouched variables DO NOT SETUP LIKE ABOVE VARIABLES
    var oldlinks = [];
    var oldlinkstext = [];
    var combineditems = [];

    //  Add WikiaNotification element if not present
    if(skin === 'oasis') {
        if (!$('#WikiaNotifications').length) {
            $('#WikiaBarWrapper').before('<ul id="WikiaNotifications" class="WikiaNotifications" style="z-index: 10;"></ul>');
        }
    }

    // Add option in edit menu
    if (pageTitle === talkpageTitle) {
        $('.page-header__contribution-buttons .wds-list').append(
            $('<li>', {
                'class': 'userTalkNotify'
            }).append(
                $('<a>', {
                    href: '//community.wikia.com/wiki/Special:MyPage/global.js'
                }).click(function() {
                    utnModify('New');
                })
            )
        );
    }

    // Uppercase the first letter of each wiki's name
    talkWikis.forEach(function(wiki, i) {
        talkNames[i] = wiki.replace(/\b./g, function(m) { return m.toUpperCase(); });
        talkWikis[i] = /^[0-9a-z\.-]+$/.test(wiki) ? wiki : '';
        utnCheckWiki(i);
    });

    function isOnTalkPage(z) {
        return subdomain === talkWikis[z] && pageTitle === talkpageTitle;
    }

    // Check for new messages
    function utnCheckWiki(z) {
        //If we are on the talkpage or the cookie isn't set, then update the timestamp
        if (isOnTalkPage(z)) {
            $('.userTalkNotify').replaceWith('<li><a href="//community.wikia.com/wiki/User:'+enUserName+'/global.js" onclick="utnModify(\'Old\')">Don\'t Notify</a></li>');
            utnSetStamp(z);
        } else if (!$.cookie('talk'+talkWikis[z])){
            utnSetStamp(z);
        } else {
            //Load the edits since the last timestamp, organize the data, and then display it to the user
            $.ajax({
                url: "//" + talkWikis[z] + ".wikia.com/api.php?action=query&prop=revisions&titles=User:"+enUserName+"/"+pageName+"&rvprop=user&rvend="+$.cookie('talk'+talkWikis[z])+"&format=json",
                dataType: "jsonp",
                cache: false
            }).done(function(data) {
                var userAry = [];
                var userList;
                var plural;
                var p; for (p in data.query.pages) { break; }
                if ("revisions" in data.query.pages[p]) {
                    for (var i=0; i<data.query.pages[p].revisions.length; i++) {
                        userAry[i]=data.query.pages[p].revisions[i].user;
                    }
                    $.unique(userAry);
                    if (userAry.length == 1) {
                        userList = userAry[0];
                        plural = 'a new message';
                    } else {
                        var userFirst = userAry.pop();
                        userList = userAry.join(", ")+' and '+userFirst;
                        plural = 'new messages';
                    }
                    if (subdomain === talkWikis[z]) {
                        if(skin === 'oasis') {
                            $('.WikiaNotifications').append('<li><div data-type="1"><a class="sprite close-notification talkClose" onclick="utnSetStamp('+z+')" target="_blank"></a>You have <a href="//'+talkWikis[z]+'.wikia.com/wiki/User:'+enUserName+'/'+pageName+'">'+plural+'</a> from '+userList+'.</div></li>');
                        } else {
                            if(!$('.usermessage').length) {
                                $('#mw-content-text').prepend('<div class="usermessage">You have <a href="/wiki/User:'+enUserName+'/'+pageName+'?redirect=no">new messages</a> (<a href="/wiki/User:'+enUserName+'/'+pageName+'?diff=cur">changes since last visit</a>).</div>');
                            } else {
                                if(document.getElementsByClassName('usermessage')[0].getElementsByTagName('a')[0].innerHTML.substring(document.getElementsByClassName('usermessage')[0].getElementsByTagName('a')[0].innerHTML.length-4,document.getElementsByClassName('usermessage')[0].getElementsByTagName('a')[0].innerHTML.length)=='Wiki') {
                                    for(i=0;i<document.getElementsByClassName('usermessage')[0].getElementsByTagName('a').length;i++) {
                                        oldlinks.push(document.getElementsByClassName('usermessage')[0].getElementsByTagName('a')[i].href);
                                        oldlinkstext.push(document.getElementsByClassName('usermessage')[0].getElementsByTagName('a')[i].innerHTML);
                                    }
                                    oldlinks.push('//'+talkWikis[z]+'.wikia.com/index.php?title=User:'+enUserName+'/'+pageName);
                                    oldlinkstext.push(talkNames[z]+' Wiki');
                                    for(i=0;i<oldlinks.length;i++) {
                                        combineditems.push('<a href="'+oldlinks[i]+'">'+oldlinkstext[i]+'</a>');
                                    }
                                    $('.usermessage').html('You have new messages on ' + combineditems.join(', '));
                                } else {
                                    $('.usermessage').html('You have new messages on ' + '<a href="'+document.getElementsByClassName('usermessage')[0].getElementsByTagName('a')[0].href+'">'+wgSiteName+'</a>, <a href="//' + talkWikis[z] + '.wikia.com/index.php?title=User:'+enUserName+'/'+pageName+'">'+talkNames[z]+' Wiki</a>');
                                }
                            }
                        }
                    } else {
                        if(skin === 'oasis') {    
                            $('.WikiaNotifications').append('<li><div data-type="1"><a class="sprite close-notification talkClose" onclick="utnSetStamp('+z+')" target="_blank"></a>You have '+plural+' on the <a href="//'+talkWikis[z]+'.wikia.com/wiki/User:'+enUserName+'/'+pageName+'">'+talkNames[z]+' Wiki</a> from '+userList+'.</div></li>');
                        } else {
                            if(!$('.usermessage').length) {
                                $('#mw-content-text').prepend('<div class="usermessage">You have new messages on <a href="//'+talkWikis[z]+'.wikia.com/index.php?title=User:'+enUserName+'/'+pageName+'">'+talkNames[z]+' Wiki</a></div>');
                            } else {
                                document.getElementsByClassName('usermessage')[0].innerHTML = document.getElementsByClassName('usermessage')[0].innerHTML + ', <a href="//' + talkWikis[z] + '.wikia.com/wiki/User:' + enUserName + '/' + pageName + '">' + talkNames[z] + ' Wiki</a>';
                            }
                        }
                    }
                    $('.talkClose').click(function() {
                        $(this).parent().remove();
                    });
                }
            });
        }
    }
    
    // Update the timestamp cookie
    function utnSetStamp(z) {
        //Load the last revision to get the timestamp instead of relying on the user's computer for the correct time
        $.ajax({
            url: "//" + talkWikis[z] + ".wikia.com/api.php?action=query&prop=revisions&titles=User:" + enUserName + "/" + pageName + "&rvprop=timestamp&rvlimit=1&format=json",
            dataType: "jsonp",
            cache: false
        }).done(function(data) {
            var p; for (p in data.query.pages) { break; }
            //Add 1 second to the timestamp of the last edit and store it as a cookie
            if ("revisions" in data.query.pages[p]) {
                var curTime = (parseInt(data.query.pages[p].revisions[0].timestamp.replace(/[^0-9]/g, ""))+1).toString();
                $.cookie('talk'+talkWikis[z], curTime, {expires: 5, path: '/', domain: '.wikia.com'});
            //If the page doesn't exist, prompt the user to create it
            } else if (isOnTalkPage(z)) {
                $('.WikiaNotifications').append('<li><div data-type="1">Please create the page <a href="//'+talkWikis[z]+'.wikia.com/wiki/User:'+enUserName+'/'+pageName+'" target="_blank">User:'+wgUserName+'/'+pageName+'</a> on the '+talkNames[z]+' Wiki.</div></li>');
            }
        });
    }
    
    // Set cookie on click
    function utnModify(z) {
        $.cookie('talkPage' + z, subdomain, {path: '/', domain: '.wikia.com'});
    }
    
    // Edit the text
    function utnAddNewWiki(tNew, tOld) {
        var wName;
        text = text.replace(/\u00A0/g, ' '); //Annoying space character
        if (tNew) {
            $.cookie('talkPageNew', null, {path: '/', domain: '.wikia.com'});
            if (text.match(/window\.talkWikis.*?=.*?\[.*?\]/)) {
                text = text.replace(/window\.talkWikis.*?=.*?\[([^\]]*)/,"window.talkWikis = ['"+tNew+"',$1").replace(/window\.talkWikis.*?\[(.*?),(?=\])/,"window.talkWikis = [$1"); //Add new and check commas
            } else {
                text = "window.talkWikis = ['" + tNew + "'];\n"+text;
            }
            wName = tNew;
        } else {
            $.cookie('talkPageOld', null, {path: '/', domain: '.wikia.com'});
            var re = new RegExp("window\\.talkWikis[\\s\\S]*?\\[(.*?)(('"+tOld+"',)|(,'"+tOld+"')|('"+tOld+"'))");
            text = text.replace(re,"window.talkWikis = [$1");
            wName = tOld;
        }
        $('body').prepend('<div style="width:100%;height:100%;background:white;z-index:100000000;position:absolute;opacity:.8;"><div class="utnOver" style="position:fixed;top:50%;left:50%;font-size:50px;font-weight:bold;margin-top:-40px;margin-left:-190px;color:white;background:black;border-radius:30px;padding:20px;width:360px;height:60px;text-align:center;">Editing Array...</div></div>');
        utnEditPage(wName);
    }
    // Edit the actual page
    function utnEditPage(z) {
        $.ajax({
            url: "/api.php?action=query&prop=info&intoken=edit&titles=User:" + enUserName + "/global.js&format=json",
            dataType: "json"
        }).done(function(data) {
            var p; for (p in data.query.pages) { break; }
            $.ajax({
                url: "/api.php?action=edit&minor=true&title=User:" + enUserName + "/global.js&token=" + encodeURIComponent(data.query.pages[p].edittoken),
                data: {'text': text},
                dataType: "json",
                type: 'POST'
            }).fail(function() { //It works. Even though the computer doesn't know it.
                $('.utnOver').text('Redirecting...');
                window.open("//"+z+".wikia.com/wiki/User:"+enUserName+"/"+pageName,"_self");
            });
        });
    }
        
    // Start process of editing global.js (Using this instead of cookies for cross browser/device compatibility.)
    if (subdomain + pageTitle == 'community' + wgUserName + '/global.js' && ($.cookie('talkPageNew') || $.cookie('talkPageOld'))) {
        var text = $('.javascript').text();
        utnAddNewWiki($.cookie('talkPageNew'), $.cookie('talkPageOld'));
    }
});
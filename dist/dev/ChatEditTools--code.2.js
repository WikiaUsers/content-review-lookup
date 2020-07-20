//<syntaxhighlight lang="javascript">
/**
 * 
 * ChatToolsPro.
 * @authors: [[w:User:Doork]] and [[w:User:Ditto Creeper Bot]]
 */
/*
 (function() {
        var querypagelink = [
            'BrokenRedirects',
            'DoubleRedirects',
            'Unusedcategories',
            'Unusedimages',
            'Wantedcategories',
            'Wantedfiles',
            'Wantedpages',
            'Wantedtemplates',
            'Uncategorizedimages',
            'Uncategorizedpages',
            'Uncategorizedtemplates',
            'Uncategorizedcategories'
        ],i;    
        
function inlineAlert(msg) {
    mainRoom.model.chats.add(new models.InlineAlert({text:msg}));
    $('[name="message"]').val('').removeAttr('disabled').focus();  
}
 
// Function for message input
$('[name="message"]').keypress(function(e) {
    if (e.which == 13) {
 
        var message = this.value;
 
        // Stop posting of whitespace
        if (!message.trim()) {
            e.preventDefault();
            $('[name="message"]').val('').removeAttr('disabled').focus();  
        }
        // !help command. Shows all the commands.
        if (/!help/i.test(message) && mainRoom.active === true) {
            e.preventDefault();
            inlineAlert('Commands: !category, !delete, !talkpage, !quickdelete, !protect, !block, !message, !undo, !pageinfo, !editcount, !edit, !rc, !rearrange, !style, !script, !css, !query');
        }
    }
});

$(function(){
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 9) == '!category') {
            command = $(this).val().split("|");
            page = command[1];
            category = '\n[[Category:' + command[2] + ']]';
            $(this).unbind('keypress').val('');
            commandsAPI.category();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 7) == '!delete') {
            command = $(this).val().split("|");
            page = command[1];
            reason = command[2];
            $(this).unbind('keypress').val('');
            commandsAPI.delete();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 6) == '!block') {
            command = $(this).val().split("|");
            username = command[1];
            duration = command[2];
            blockReason = command[3];
            $(this).unbind('keypress').val('');
            commandsAPI.block();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 8) == '!protect') {
            command = $(this).val().split("|");
            page = command[1];
            protecttype = command[2];
            protectexpiry = command[3];
            protectreason = command[4];
            $(this).unbind('keypress').val('');
            commandsAPI.protect();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 12) == '!quickdelete') {
            command = $(this).val().split("|");
            page = command[1];
            reason = command[2];
            content = '{{delete|' + reason + '}}';
            $(this).unbind('keypress').val('');
            commandsAPI.quickdelete();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 9) == '!talkpage') {
            command = $(this).val().split("|");
            user = command[1];
            title = command[2];
            message = command[3];
            $(this).unbind('keypress').val('');
            commandsAPI.talkpage();
        }
    });
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 8) == '!message') {
            command = $(this).val().split("|");
            user = command[1];
            title = command[2];
            content = command[3];
            $(this).unbind('keypress').val('');
            commandsAPI.message();
        }
    });    
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 10) == '!editcount') {
            command = $(this).val().split("|");
            user = command[1];
            $(this).unbind('keypress').val('');
            commandsAPI.editcount();
        }
    });    
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 9) == '!pageinfo') {
            command = $(this).val().split("|");
            page = command[1];
            title = command[2];
            content = command[3];
            $(this).unbind('keypress').val('');
            commandsAPI.pageinfo();
        }
    });    
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 5) == '!undo') {
            command = $(this).val().split("|");
            page = command[1];
            $(this).unbind('keypress').val('');
            commandsAPI.undo();
        }
    });  
    $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 5) == '!edit') {
            command = $(this).val().split("|");
            page = command[1];
            $(this).unbind('keypress').val('');
            commandsAPI.edit();
        }
    });  
        $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 3) == '!rc') {
            command = $(this).val().split("|");
            page = command[1];
            $(this).unbind('keypress').val('');
            commandsAPI.rc();
        }
    });     
        $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 10) == '!rearrange') {
            command = $(this).val().split("|");
            page = command[1];
            $(this).unbind('keypress').val('');
            commandsAPI.rearrange();
        }
    }); 
        $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 7) == '!script') {
            command = $(this).val().split("|");
            page = command[1];
            wiki = command[2];
            $(this).unbind('keypress').val('');
            commandsAPI.scriptthing();
        }
    });   
         $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 6) == '!style') {
            command = $(this).val().split("|");
            page = command[1];
            wiki = command[2];
            $(this).unbind('keypress').val('');
            commandsAPI.stylething();
        }
    }); 
         $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 4) == '!css') {
            command = $(this).val().split("|");
            page = command[1];
            wiki = command[2];
            $(this).unbind('keypress').val('');
            commandsAPI.stylechat();
        }
    });     
         $('[name="message"]').keydown(function(e) {
        if (e.which == 13 && $(this).val().substr(0, 6) == '!query') {
            command = $(this).val().split("|");
            $(this).unbind('keypress').val('');
            commandsAPI.querypage();
        }
    });         
    });
    var commandsAPI = {
        delete: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'delete',
                reason: reason,
                title: page,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        block: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'block',
                user: username,
                expiry: duration,
                nocreate: 0,
                autoblock: 0,
                reason: blockReason,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        protect: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'protect',
                expiry: protectexpiry,
                protections: protecttype,
                watchlist: 'nochange',
                title: page,
                reason: protectreason,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        category: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: prompt('Type a summary please.'),
                title: page,
                appendtext: category,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        quickdelete: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Admins,this page needs deletion because ' + reason + '.',
                title: page,
                prependtext: content,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
        },
        talkpage: function() {
            $.post(mw.util.wikiScript('api'), {
                format: 'json',
                action: 'edit',
                summary: 'Adding message: ' + title,
                title: 'User_talk:' + user,
                section: 'new',
                sectiontitle: title,
                text: message,
                token: mw.user.tokens.get("editToken"),
                success: alert('Done!')
            });
inlineAlert('Talk edited of: [[User:' + command[1] + '|'+ command[1] + ']] (Title:' + command[1] + ') (Message:' + command[3] + ')');
        },
        message: function(){
           $.nirvana.sendRequest({
                controller: 'WallExternal',
                method: 'postNewMessage',
                type: 'POST',
                data: {
                    body: command[3],
                    pagetitle: 'Message_Wall:' + command[1],
                    messagetitle: command[2],
                    token: mw.user.tokens.values.editToken
                }
           }); 
inlineAlert('Message sent to: [[User:' + command[1] + '|'+ command[1] + ']] (Title:' + command[1] + ') (Message:' + command[3] + ')');
        },
        editcount: function(){
 $.get("/wiki/Special:Editcount/"+ user.replace(/ /g,'_'), function(result){
 
          regExpNumberIsolation = /\d/g ;
          regExpSearch = /\(Main\)/ ;
          mainPos = result.search(regExpSearch);
          var numberedMainText;
          if (mainPos != -1){
            slicedMainText = result.slice(mainPos+36, mainPos+41);
 
            numberedMainText = slicedMainText.match(regExpNumberIsolation).toString();
            if (numberedMainText.search(",") != -1){
              while (numberedMainText.indexOf(",") > -1){
                numberedMainText = numberedMainText.replace(",","");
              }
            }
          }else{
            numberedMainText = 0;
          }
 
          totalPos = result.search(">All wikis");
          var numberedTotalText;
          if (totalPos != -1){
            slicedTotalText = result.slice(totalPos+0, totalPos+58);
 
            numberedTotalText = slicedTotalText.match(regExpNumberIsolation).toString();
            if (numberedTotalText.search(",") != -1){
              while (numberedTotalText.indexOf(",") != -1){
                numberedTotalText = numberedTotalText.replace(",","");
              }
            }
          }else{
            numberedTotalText = 0;
          }
inlineAlert('[[User:' + user + '|'+ user + ']] has ' + numberedTotalText + ' edits.');
          });
        },
        undo: function(){
var ds; mw.loader.using('mediawiki.api').then(function() { ds = new mw.Api();
            var API = new mw.Api();
            API.get({
                action: 'query',
                prop: 'revisions',
                titles: command[1],
                rvprop: 'user|ids|content',
                rvlimit: 500,
                cb: new Date().getTime()
            }).done(function(undothing) {
                for (var i in undothing.query.pages) {
                    var something = undothing.query.pages[i].revisions;
                        
            ds.post({
                action: 'edit', title: command[1],
                undo: undothing.query.pages[i].revisions[0].revid,
                bot: '1',
                token: mw.user.tokens.get('editToken')
            });
                    }
            });
inlineAlert('Undid revisions for: [[' + command[1] + '|'+ command[1] + ']]');
});
        },
        pageinfo: function(){
var ds; mw.loader.using('mediawiki.api').then(function() { ds = new mw.Api();
            var API = new mw.Api();
            ds.get({
                action: 'query',
                prop: 'revisions',
                titles: command[1],
                rvprop: 'user|ids|content',
                rvlimit: 500,
                cb: new Date().getTime()
            }).done(function(undothing) {
                for (var i in undothing.query.pages) {
                    var something = undothing.query.pages[i].revisions;
inlineAlert('<table id="content-chat" style="word-wrap:break-word;white-space: pre-wrap;background: rgba(0, 0, 0, 0.48);text-align: left;color:white"><tbody><tr><th>Page:</th><th>[[' + command[1] + '|'+ command[1] + ']]</th></tr><tr><th>Last Editor:</th><th>'+ something[0].user +'</th></tr><tr><th id="content-chat-th">[Content]</th><th>' + undothing.query.pages[i].revisions[0]["*"].replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</th></tr></tbody></table>');
                     }
            });
       });
       },
        edit: function(){
var ds; mw.loader.using('mediawiki.api').then(function() { ds = new mw.Api();
            var API = new mw.Api();
            ds.get({
                action: 'query',
                prop: 'revisions',
                titles: command[1],
                rvprop: 'user|ids|content',
                rvlimit: 500,
                cb: new Date().getTime()
            }).done(function(undothing) {
                for (var i in undothing.query.pages) {
                    var something = undothing.query.pages[i].revisions;
inlineAlert('<table class="reststop" id="content-chat" style="word-wrap:break-word;white-space: pre-wrap;background: rgba(0, 0, 0, 0.48);text-align: left;color:white"><tbody><tr><th>Page:</th><th>[[' + command[1] + '|'+ command[1] + ']]</th></tr><tr><th>Last Editor:</th><th>'+ something[0].user +'</th></tr><tr><th id="content-chat-th">[Content]</th><th><textarea style="width:80%;height:50%" id="editarea">' + undothing.query.pages[i].revisions[0]["*"]+'</textarea></th><th><button id="sendrevisions">Publish</button></th></tr></tbody></table>');
                     }
       document.getElementById('sendrevisions').addEventListener('click', function() {
var ds; mw.loader.using('mediawiki.api').then(function() { ds = new mw.Api();
            var API = new mw.Api();
            ds.post({
                            action: 'edit',
                            title: page,
                            text: $('#editarea').val(),
                            summary: 'Edited via Chat',
                            token: mw.user.tokens.values.editToken
                        });
       });
       $('.reststop').replaceWith('Content Submitted!');
       });
            });
       });
       }, 
       rc: function(){
           //<syntaxhighlight lang="javascript">
           */
/* Made by [[User:AnimatedCartoons]] */
/* Fixed with help from [[User:452]], [[User:Dorumin]], and [[User:Ditto Creeper Bot]] */
// Recent changes notification (part 1 of 3)
/*
var wk = wgServer;
var useredits;
    // Variables
    var un = mw.config.get('wgUserName'),
        ttl = document.title,
        ytmnthnm = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ],
        ytname;
var notifyChanges = function (d) {
        var name = d.query.recentchanges[0].user,
            title = d.query.recentchanges[0].title,
            comment = d.query.recentchanges[0].comment,
            revid = d.query.recentchanges[0].revid,
            title2 = title.replace(/\?/g, '%3F'),
            comment2 = comment.replace(/"/g, '\''),
            name2;
 
        if (name === mw.config.get('wgUserName')) {
            name2 = 'You';
        } else {
            name2 = '<a href="' + localStorage.getItem('notifyChanges') + '/wiki/User:' + name + '" target="_blank">' + name + '</a>(<a class="activityfeed-diff" href="' + wk + '/wiki/' + title2 + '?diff=' + revid + '" target="_blank">Adiff</a>)';
        }
 
        $('.watchlist').html(name2 + ' changed <a href="' + localStorage.getItem('notifyChanges') + '/wiki/' + title2 + '" target="_blank" title="' + comment2 + '" style="text-decoration: none; border-bottom: 1px dotted; cursor: help;">' + title + '</a></span> (<a href="' + localStorage.getItem('notifyChanges') + '/wiki/' + title2 + '?diff=' + revid + '" target="_blank">diff</a>)(<a class="activityfeed-diff" href="' + localStorage.getItem('notifyChanges') + '/wiki/' + title2 + '?diff=' + revid + '" target="_blank">Adiff</a>)');
    };
 
        // Descriptive title
        document.title = ttl;
 
        // Show own username on the list
        $('li#user-' + un).attr('style', 'display: block !important');
 
        // Recent changes notification (part 2 of 3)
        if (!localStorage.getItem('notifyChanges')) {
            localStorage.setItem('notifyChanges', wk);
        }
 
        var watchList = function () {
                if (localStorage.getItem('notifyChanges') === wk) {
                    $.getJSON(wk + '/api.php', {
                        action: 'query',
                        list: 'recentchanges',
                        rclimit: 1,
                        rcdir: 'older',
                        rctype: 'edit',
                        rcprop: 'ids|user|title|comment',
                        format: 'json'
                    }, function (data) {
                        var name = data.query.recentchanges[0].user,
                            title = data.query.recentchanges[0].title,
                            comment = data.query.recentchanges[0].comment,
                            revid = data.query.recentchanges[0].revid,
                            title2 = title.replace(/\?/g, '%3F'),
                            comment2 = comment.replace(/"/g, '\''),
                            name2;
 
                        if (name === un) {
                            name2 = 'You';
                        } else {
                            name2 = '<a href="' + wk + '/wiki/User:' + name + '" target="_blank">' + name + '</a>';
                        }
 
                        $('.watchlist').html(name2 + ' changed <a href="' + wk + '/wiki/' + title2 + '" target="_blank" title="' + comment2 + '" style="text-decoration: none; border-bottom: 1px dotted; cursor: help;">' + title + '</a></span> (<a href="' + wk + '/wiki/' + title2 + '?diff=' + revid + '" target="_blank">diff</a>)');
                    });
                } else {
                    mw.loader.load(localStorage.getItem('notifyChanges') + '/api.php?action=query&list=recentchanges&rclimit=1&rcprop=ids|user|title|comment&rcdir=older&rctype=edit&format=json&callback=notifyChanges');
                }
            };
 
        $(function () {
            $('.ChatHeader').append('<div class="watchlist"></div>');
            watchList();
        });
 
        setInterval(watchList, 2000);
 
        // Bug fixes
        var bgfxs = function (chat) {
                $('.continued:first-child').removeClass('continued');
                $('.inline-alert').next('li.continued:not(.inline-alert)').removeClass('continued');
            };
 
        window.mainRoom.model.chats.bind('afteradd', bgfxs);
 
        var rlct = setInterval(function () {
                if ($('.WikiaSearch').length) {
                    $('.WikiaSearch').css('left', '250px');
                    clearInterval(rlct);
                }
            }, 1);
 
        // Removals
        var rmv = setInterval(function () {
                if ($('.chattopic').length) {
                    $('.chattopic').remove();
                    clearInterval(rmv);
                }
            }, 1);
                mw.util.addCSS(' \
    body {\
    -moz-user-select: none;\
    -ms-user-select: none;\
    -webkit-user-select: none;\
    font-size: 14px !important;\
    overflow: hidden;\
    user-select: none;\
}\
/* Enable selection *\
.inline-alert,\
.message,\
.Chat .username,\
.time,\
.Write textarea {\
    -moz-user-select: text !important;\
    -ms-user-select: text !important;\
    -webkit-user-select: text !important;\
    user-select: text !important;\
}\
 \
/* Show *\
li.User,\
.continued .time {\
    display: block !important;\
}\
 \
/* Hide *\
 \
/* Change padding *\
 \
.watchlist {\
    color: #fff;\
    position: absolute;\
    right: 5px;\
    top: 11px;\
}\
.inline-time {\
    float: right;\
}\
.inline-alert span {\
    color: inherit !important;\
    cursor: auto !important;\
    text-decoration: none !important;\
}\
\
.ChatHeader .User{display:none}');
            $('.UserStatsMenu').hide();
},
       rearrange: function(){
        $('.WikiChatList').wrap('<div id="WikiChat" />');
        $('.PrivateChatList').wrap('<div id="PrivateChat" />');
 
        mw.loader.using('jquery.ui.sortable', function () {
            $('.WikiChatList').sortable({
                revert: true,
                containment: '#WikiChat',
                handle: 'img',
                axis: 'y',
                cursor: 'ns-resize',
                start: function (e, ui) {
                    ui.placeholder.height(ui.item.height());
                }
            });
 
            $('.PrivateChatList').sortable({
                revert: true,
                containment: '#PrivateChat',
                handle: 'img',
                axis: 'y',
                cursor: 'ns-resize',
                start: function (e, ui) {
                    ui.placeholder.height(ui.item.height());
                }
            });
        });
       },
       scriptthing: function(){
           importArticle({
                type: 'script',
                article: 'u:' + command[2] + ':' + command[1]
            });
       },
       stylething: function(){
           importArticle({
               type: 'style',
               article: 'u:' + command[2] + ':' + command[1]
           });
       },
       stylechat: function(d){
           mw.util.addCSS(command[1]);
       },
       querypage: function() {
        $.showCustomModal('Listing','<style>#budarea h2 {\
    color:black;text-shadow:0px 1px 4px black\
}\
#budarea table, #budarea td, #budarea th {\
    border:4px black solid;\
}</style><div id="budarea">\
<table><tbody><tr><th><h2> Select Page to List </h2></th><th><h2>Limit the Feed</h2></th></tr><tr><td><select class="budclass"><option value="Uncategorizedcategories">Uncategorizedcategories</option><option value="Uncategorizedtemplates">Uncategorizedtemplates</option><option value="Uncategorizedpages">Uncategorizedpages</option><option value="Uncategorizedimages">Uncategorizedimages</option><option value="Wantedtemplates">Wantedtemplates</option><option value="Wantedpages">Wantedpages</option><option value="Wantedfiles">Wantedfiles</option><option value="Wantedcategories">Wantedcategories</option><option value="Unusedimages">Unusedimages</option><option value="Unusedcategories">Unusedcategories</option><option value="DoubleRedirects">DoubleRedirects</option><option value="BrokenRedirects">BrokenRedirects</option></select></td><td><input id="qlimittext" onclick="commandsAPI.AlphabetLock()" placeholder="Listing Limit [Example: 20]"></input></td></tr></tbody></table>\
<div class="budappend">\
</div>\
</div>', { buttons: [{
                message: 'Close',
                handler: function() {
                    $('#form-report').closeModal();
                }
            }, {
                id: 'start-button',
                message: 'List',
                defaultButton: true,
                handler: function() {
                    InitiateListing();
                }
}]});
function InitiateListing(){
    var qlimitthing = $('input#qlimittext').val() || 1000 ;
               $.ajax({
                url:'/api.php?action=query&list=querypage&qppage='+ $('select.budclass option:selected').text() +'&qplimit='+ qlimitthing+'&format=json',
                type: 'GET',
                format: 'json',
                data: {
                    action: 'query',
                    format: 'json'
                }
        }).done(function(d){
                $.showCustomModal('Wanted Pages','<div id="epiclister" style="overflow:scroll;height:300px"><table class="boirer"><tr><th>Link</th><th>Number of Links</th></tr></table></div>');
                for (i=0;i<100;i++){
                $('#epiclister table.boirer').append('<tr><td><a href="/wiki/Special:WhatLinksHere/' + d.query.querypage.results[i].title+ '">'+ d.query.querypage.results[i].title+ '</a></td><td>' +d.query.querypage.results[i].value + ' links</td></tr>');
                }
            });
}
},AlphabetLock: function(){
            $('input#qlimittext').keypress(function(e) {
    var a = [];
    var k = e.which;
    for (i = 48; i < 58; i++)
        a.push(i);
    if (a.indexOf(k) === -1)
        e.preventDefault();
});
}   
};
})();

*/
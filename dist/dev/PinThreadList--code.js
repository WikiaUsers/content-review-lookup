importArticle({
    type: 'script',
    article: 'u:dev:MediaWiki:I18n-js/code.js'
});
importArticle({
    type: 'style',
    article: 'u:dev:MediaWiki:PinThreadList.css'
});

var pinIcon = 'https://vignette.wikia.nocookie.net/mogapedia/images/5/5f/Pin.png/revision/latest?cb=20171102222925&path-prefix=fr';
var unpinIcon = 'https://vignette.wikia.nocookie.net/mogapedia/images/d/d3/Unpin.png/revision/latest?cb=20171102230647&path-prefix=fr';
var i18n;
 
$(function () {
    mw.hook('dev.i18n').add(function(i18no) {
        i18no.loadMessages('PinThreadList').then(init);
    });
});

function init (i18nData) {
    i18n = i18nData;
    if (TestGroups()) {
        $('.thread').hover();
        $('.thread-left h4').replaceWith(function(){
            return $('<p/>').append($(this).contents());
        });
        $('.thread-left p:first-of-type').append(' <div class="pin"><img style="" src="'+pinIcon+'" width="15px" height="15px"/></div>');
        $('.pin').click(function () {
            var $parents = $(this.closest('.thread'));
            var id = $parents.attr('data-id');
            pinThread(id);
        });
    }
 
 
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            'format': 'json',
            'action': 'query',
            'titles': 'MediaWiki:Custom-PinThreadList',
            'prop': 'revisions',
            'rvprop': 'content'
        },
        dataType: 'json',
        type: 'GET',
        cache: false,
    })
    .done(function (data) {
        var threadsId = getThreads(data);
        if (threadsId) {
            addPinThreadList();
            for (i=0; i<threadsId.length;i++) {
                $('ul.PinThreadList').prepend($('li.thread[data-id='+threadsId[i]+']'));
            }
            if (TestGroups()) {
                $('.PinThreadList .pin img').attr('src', unpinIcon);
                $('.PinThreadList .pin').unbind("click");
                $('.PinThreadList .pin').click(function () {
                    var $parents = $(this.closest('.thread'));
                    var id = $parents.attr('data-id');
                    unpinThread(id);
                });
            }
        }
    });
}
 
function getThreads (object) {
    var pageId;
    for (var key in object.query.pages) {
        pageId = key.toString();
    }
    if (pageId != -1) {
        var text = object.query.pages[pageId].revisions[0]['*'];
        if (!text) {
            return null;
        }
        return text.split("\n");
    }
    else {
        return null;
    }
}
 
function pinThread (id) {
    if ($('ul.PinThreadList').length === 0) {
        addPinThreadList();
    }
    $('ul.PinThreadList br').before($('li.thread[data-id='+id+']'));
    if (TestGroups()) { 
        $('li.thread[data-id='+id+'] .pin img').attr('src', unpinIcon);
        $('li.thread[data-id='+id+'] .pin').unbind("click");
        $('li.thread[data-id='+id+'] .pin').click(function () {
            var $parents = $(this.closest('.thread'));
            var id = $parents.attr('data-id');
            unpinThread(id);
        });
    }
    editDatabase(id);
}
 
function unpinThread (id) {
    $('ul.ThreadList').prepend($('li.thread[data-id='+id+']'));
    $('ul.PinThreadList li.thread[data-id='+id+']').remove();
    if (TestGroups()) {
        $('li.thread[data-id='+id+'] .pin img').attr('src', pinIcon);
        $('li.thread[data-id='+id+'] .pin').unbind("click");
        $('li.thread[data-id='+id+'] .pin').click(function () {
            var $parents = $(this.closest('.thread'));
            var id = $parents.attr('data-id');
            pinThread(id);
        });
    }
    $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            'format': 'json',
            'action': 'query',
            'titles': 'MediaWiki:Custom-PinThreadList',
            'prop': 'revisions',
            'rvprop': 'content'
        },
        dataType: 'json',
        type: 'GET',
        cache: false,
    })
    .done(function (data) {
        var content = getThreads(data);
        editDatabase(id, true, content.join('\n'));
    });
 
}
 
function addPinThreadList () {
    $('div.ContentHeader').before('<ul class="ThreadList PinThreadList"><br clear="all" /></ul>');
    $('.PinThreadList').before('<div class="ContentHeader">' + i18n.msg('text').escape() + '</div>');
}
 
function editDatabase (id, unpin, content) {
    var text;
    if (unpin) {
        text = content.replace(id, '');
        $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            'format': 'json',
            'action': 'edit',
            'title': 'MediaWiki:Custom-PinThreadList',
            'text': text,
            'token': mw.user.tokens.get('editToken')
        },
        dataType: 'json',
        type: 'POST',
        });
    } 
    else {
        text = '\n'+id;
        $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
            'format': 'json',
            'action': 'edit',
            'title': 'MediaWiki:Custom-PinThreadList',
            'appendtext': text,
            'token': mw.user.tokens.get('editToken')
        },
        dataType: 'json',
        type: 'POST',
        });
    }
}

function TestGroups () {
    // Check if the user is a mod. Return True if yes.
    return ['bureaucrat', 'sysop', 'content-moderator'].some(function (group) {
        return mw.config.get('wgUserGroups').indexOf(group) > -1;
    });
}
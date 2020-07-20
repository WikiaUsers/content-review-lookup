var _wikichat_ = $.extend({}, _wikichat_);
_wikichat_.chatbans = $.extend({}, _wikichat_.chatbans);
_wikichat_.chatbans.starters = ['importCSS', 'createUI', 'loadContent', 'initShow', 'toggleLog'];
_wikichat_.chatbans.importCSS = function(){
    importArticle({ type: 'style', article: 'MediaWiki:Chat.css/chatbans.css' });
};
_wikichat_.chatbans.createUI = function(){
    var $ui = $('<nav />', { 'class': 'ChatBansWrapper chat_bans log_wrapper', 'id': 'ChatBansWrapper' });
    $ui.html([
        $('<a />', { 'class': 'ChatBansButton chat_bans_button log_button', 'id': 'ChatBansButton', 'href': '#' }),
        $('<ul />', { 'class': 'ChatBansList chat_bans_list log_list', 'id': 'ChatBansList' })
    ]);
    $('.ChatHeader .public').append($ui);
};
_wikichat_.chatbans.pad = function(n){
    if (isNaN(n)) return 'NaN';
    else if (n < 10){
        n = '0' + n;
    }
    return n;
};
_wikichat_.chatbans.parseDate = function(date, format){
    format = typeof format === 'undefined' ? '' : format;
    var _date = new Date(date),
        _format = _wikichat_.chatbans.format || '$fmo $fd, $yy $12hh:$m:$s$ampm',
        _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        _dotws = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        _dates = {
            // Years
            'yy': _date.getFullYear(),
            'y': _date.getFullYear() % 100,
            // Months
            'fmo': _months[_date.getMonth()],
            'mo': _months[_date.getMonth()].slice(0, 3),
            'mn': _date.getMonth() + 1,
            'fmn': _wikichat_.chatbans.pad(_date.getMonth() + 1),
            // Days
            'dotw': _dotws[_date.getDay()],
            'fd': _wikichat_.chatbans.pad(_date.getDate()),
            'd': _date.getDate(),
            // Hours
            '12hh': _wikichat_.chatbans.pad(_date.getHours() % 12 === 0 ? 12 : _date.getHours() % 12),
            '12h': _date.getHours() % 12 === 0 ? 12 : _date.getHours() % 12,
            'hh': _wikichat_.chatbans.pad(_date.getHours()),
            'h': _date.getHours(),
            'ampm': (_date.getHours() > 12 ? 'PM' : 'AM').toLowerCase(),
            // Minutes
            'm': _wikichat_.chatbans.pad(_date.getMinutes()),
            's': _wikichat_.chatbans.pad(_date.getSeconds())
        },
        _string = '',
        _ampm = false;
    _string = _format.replace(/\$([a-z0-9\-]{1,})/g, function(match, name){
        if (name === '12hh' || name === '12h') _ampm = true;
        if (_ampm === false && name == 'ampm') return '';
        return _dates[name];
    });
    return _string;
};
_wikichat_.chatbans.loadContent = function(){
    var $elem = $('#ChatBansList', $('#ChatBansWrapper'));
    $.ajax({
        method: 'GET',
        dataType: 'json',
        url: '/api.php',
        data: {
            action: 'query',
            list: 'logevents',
            leprop: 'title|user|timestamp|type|parsedcomment|details',
            letype: 'chatban',
            lelimit: _wikichat_.chatbans.limit && _wikichat_.chatbans.limit > 0 || 20,
            format: 'json'
        },
        xhr: function(){
            var xhr = null;
            if (typeof window.XMLHttpRequest == 'undefined'){
                xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
            } else {
                xhr = new window.XMLHttpRequest();
            }
            xhr.onprogress = typeof _wikichat_.chatbans.progress == 'function' ? _wikichat_.chatbans.progress : $.noop;
            return xhr;
        },
        success: function(data){
            var logevents = data.query.logevents,
                format = '<li class="ChatBanItem chat_ban_item log_item" id="ChatBanItem-$index">$date: $user $action $target $text $comment</li>';
            if ($.isEmptyObject(logevents) === false){
                Array.prototype.forEach.call(logevents, function(logevent, i){
                    var string = '',
                        obj = {
                            user: '<a href="/index.php?title=User:$userlink">$username</a>',
                            username: logevent.user,
                            userlink: encodeURIComponent(logevent.user),
                            target: '<a href="/index.php?title=$targetlink">$targetname</a>',
                            targetlink: logevent.title,
                            targetname: logevent.title.split(':')[1],
                            date: _wikichat_.chatbans.parseDate(logevent.timestamp),
                            comment: logevent.parsedcomment ? '<span class="comment">($commenttxt)</span>' : '',
                            commenttxt: logevent.parsedcomment,
                            expiry: logevent[2],
                            index: i
                        };
                    switch (logevent.action){
                        case 'chatbanadd':
                            obj.action = 'banned';
                            obj.text = 'from chat with expiry time of $expiry.';
                            break;
                        case 'chatbanchange':
                            obj.action = 'changed ban settings for';
                            obj.text = 'with an expiry time of $expiry.';
                            break;
                        case 'chatbanremove':
                            obj.action = 'unbanned';
                            obj.text = 'from chat.';
                            break;
                    }
                    obj.text = obj.text.replace('$expiry', obj.expiry);
                    string = format.replace(/\$([a-z0-9]{1,})/g, function(match, name){
                        var s;
                        if (name === 'user'){
                            s = obj[name];
                            return s.replace('$userlink', obj.userlink)
                                    .replace('$username', obj.username);
                        } else if (name === 'target'){
                            s = obj[name];
                            return s.replace('$targetlink', obj.targetlink)
                                    .replace('$targetname', obj.targetname);
                        } else if (name === 'comment'){
                            s = obj[name];
                            return s.replace('$commenttxt', obj.commenttxt);
                        } else {
                            return obj[name];
                        }
                    });
                    
                    var $temp = $('<div />');
                    $temp.html(string);
                    $temp.children('li').html($temp.children('li').html().trim());
                    string = $temp.html();
                    
                    $elem.append(string);
                });
            } else {
                $elem.html('<li>There are no logs available. Please try again later.</li>');
            }
        },
        error: function(error){
            $elem.html('<li>There are no logs available. Please try again later.</li>');
        }
    });
};
_wikichat_.chatbans.initShow = function(){
    var $log = $('#ChatBansList');
    if (_wikichat_.chatbans.showOnLoad === true && typeof _wikichat_.chatbans.showOnLoad == 'boolean'){
        $trigger.addClass('active');
        $log.addClass('show');
    }
};
_wikichat_.chatbans.toggleLog = function(){
    var $log = $('#ChatBansList'),
        $trigger = $log.prev('#ChatBansButton');
    $trigger.on('click', function(event){
        event.preventDefault();
        if ($log.hasClass('show')){
            $log.empty();
        } else {
            _wikichat_.chatbans.loadContent();
        }
        $trigger.toggleClass('active');
        $log.toggleClass('show');
    });
};
$(document).ready(function(){
    _wikichat_.chatbans.starters.forEach(function(starter){
        _wikichat_.chatbans[starter].apply(window, []);
    });
});
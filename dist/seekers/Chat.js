/* =======================================
 
credit goes to the Animal Crossing Wiki for the code!
 
======================================  */
 
var chatags = typeof chatags !== 'undefined' ? chatags : {};
 
chatags.images = typeof chatags.images !== 'undefined' ? chatags.images : false;
chatags.videos = typeof chatags.videos !== 'undefined' ? chatags.videos : false;
 
chatags.css = '.chatags-image{max-width:300px;max-height:300px;}';
 
chatags.tags = {
    'b': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/b]', '</span>');
        } else {
            s = s.replace('[b]', '<span style="font-weight:bold;">');
        }
        return s;
    },
    'bg': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/bg]', '</span>');
        } else {
            try {
                s = s.replace('[bg ' + t.slice(t.indexOf(' ') + 1) + ']', '<span style="background-color:' + mw.html.escape(t.slice(t.indexOf(' '))) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'big': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/big]', '</span>');
        } else {
            s = s.replace('[big]', '<span style="font-size:16pt;">');
        }
        return s;
    },
    'c': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/c]', '</span>');
        } else {
            try {
                s = s.replace('[c ' + t.slice(t.indexOf(' ') + 1) + ']', '<span style="color:' + mw.html.escape(t.slice(t.indexOf(' '))) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'code': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/code]', '</span>');
        } else {
            s = s.replace('[code]', '<span style="font-family:monospace;">');
        }
        return s;
    },
    'font': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/font]', '</span>');
        } else {
            try {
                s = s.replace('[font ' + t.slice(t.indexOf(' ') + 1) + ']', '<span style="font-family:' + mw.html.escape(t.slice(t.indexOf(' '))) + ';">');
            } catch (e) {
                console.log(e);
            }
        }
        return s;
    },
    'i': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/i]', '</span>');
        } else {
            s = s.replace('[i]', '<span style="font-style:italic;">');
        }
        return s;
    },
    'small': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/small]', '</span>');
        } else {
            s = s.replace('[small]', '<span style="font-size:7pt;">');
        }
        return s;
    },
    's': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/s]', '</span>');
        } else {
            s = s.replace('[s]', '<span style="text-decoration:line-through;">');
        }
        return s;
    },
    'sub': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sub]', '</sub>');
        } else {
            s = s.replace('[sub]', '<sub>');
        }
        return s;
    },
    'sup': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sup]', '</sup>');
        } else {
            s = s.replace('[sup]', '<sup>');
        }
        return s;
    },
    'u': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/u]', '</span>');
        } else {
            s = s.replace('[u]', '<span style="text-decoration:underline;">');
        }
        return s;
    },
    'sp': function(s, t) {
        if (t.charAt(0) === '/') {
            s = s.replace('[/sp]', '</div></div></div>');
        } else {
            s = s.replace('[sp]', '<div style="margin-top:5px"><div style="margin-bottom:2px"> <input class="spoilerbutton" type="button" value="Show spoiler" style="margin:0px;padding:0px 7px;height:initial;" onclick="if (this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display != \'\') { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'\';      this.innerText = \'\'; this.value = \'Hide\'; } else { this.parentNode.parentNode.getElementsByTagName(\'div\')[1].getElementsByTagName(\'div\')[0].style.display = \'none\'; this.innerText = \'\'; this.value = \'Show\'; }"></div><div class="alt2" style="border-bottom: 1px dashed grey"><div style="display: none;">');
        }
        return s;
    }
};

window.IsTyping = $.extend(window.IsTyping, {
    filterSelf: false
});

//Temporary CSS to make the typing indicator readable
mw.util.addCSS(".typing-indicator{background-color:white}");

/* =======================================
 
credits to Dragonfree97 from the Animal Crossing Wiki!
 
======================================  */
 
// thx to some guy on stackexchange for this one
function padDigits(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}
 
// Replaces the timestamp on the end of messages with one which has a seconds counter.
function timestamp(e) {
    var timeStampMessage = "#entry-" + e.cid;
    if ($(timeStampMessage).hasClass('inline-alert')) {
        var timer = new Date();
        var hours = timer.getHours();
        var minutes = padDigits(timer.getMinutes(), 2);
        var seconds = padDigits(timer.getSeconds(), 2);
        var formatTime = hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
        $(timeStampMessage).append("<span class='time' style='font-weight: initial;'>" + formatTime + "</span>");
    } else {
        var timeStampTime = new Date(e.attributes.timeStamp);
        var formatTime = timeStampTime.getHours().toString() + ":" + padDigits(timeStampTime.getMinutes(), 2).toString() + ":" + padDigits(timeStampTime.getSeconds(), 2).toString();
        $(timeStampMessage + " > span.time").html(formatTime);
    }
}

importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:IsTyping.js',
    ]
});
importArticles({
    type: 'script',
    articles: [
        'u:shining-armor:MediaWiki:ChatTags/code.js',
    ]
});
(function(mw, $, mainRoom, config){
    var FandomizedChat = $.extend({}, window.FandomizedChat);
    FandomizedChat.padTime = function(number){
        if (typeof number === 'string' && !isNaN(number)){
            number = parseInt(number, 10);
        } else if (isNaN(number)){
            number = 0;
        }
        
        if (number < 10){
            number = '0' + number;
        }
        return number;
    };
    FandomizedChat.formatTime = function(date, format){
        if (date instanceof Date){
 
            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                time = {
                    // Two-digit numeric year
                    yy: this.padTime(date.getFullYear() % 100),
                    // Four-digit numeric year
                    yyyy: date.getFullYear(),
                    // Numeric month
                    m: date.getMonth() + 1,
                    // Two-digit numeric month
                    mm: this.padTime(date.getMonth() + 1),
                    // Three-letter month name
                    mmm: monthNames[date.getMonth()].substr(0, 3),
                    // Full month name
                    mmmm: monthNames[date.getMonth()],
                    // Numeric day
                    d: date.getDate(),
                    // Two-digit numeric day
                    dd: this.padTime(date.getDate()),
                    // Three-letter day of the week
                    ddd: dayNames[date.getDay()].substr(0, 3),
                    // Full day of the week
                    dddd: dayNames[date.getDay()],
                    // Hours
                    h: date.getHours(),
                    // Two-digit hours
                    hh: this.padTime(date.getHours()),
                    // Minutes
                    n: date.getMinutes(),
                    // Two-digit minutes    
                    nn: this.padTime(date.getMinutes()),
                    // Seconds
                    s: date.getSeconds(),
                    // Two-digit seconds
                    ss: this.padTime(date.getSeconds())
                };
            return format.replace(/\$([a-z][\w\-]*)/ig, function(match, $1){
                if (time.hasOwnProperty($1)){
                    return time[$1];
                }
                return match;
            });
        } else {
            date = new Date(date);
            if (isNaN(date.getTime())){
                return;
            } else {
                this.formatTime(date);
            }
        }
    };
    FandomizedChat.changeTime = function(child){
        var $elem = $('#entry-' + child.cid),
            now = new Date(),
            time = this.formatTime(now, '$hh:$mm:$ss');
        $elem.children('.time').html(time);
    };
    mainRoom.model.chats.bind('afteradd', FandomizedChat.changeTime);
    window.FandomizedChat = FandomizedChat;
}(mediaWiki, jQuery, mainRoom, $.extend({}, window.FCConfig)));
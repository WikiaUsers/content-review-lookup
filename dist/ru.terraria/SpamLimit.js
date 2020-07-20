
window.rate = 0;
window.repeatmsg = 0;
window.repeattrigger = 0;
function ratelimit(e) {
    if (rate > 5) {
        return ratekick.call(this, e, 'Лимит пройден');
    }
    var len = this.value.length;
    if (len>=3000 || this.value.split('\n').length>=6) {
        var val = this.value.substring(0,3000).split('\n');
        val = val.slice(0,5).join('\n');
        this.value = val;
        if (e.type == 'keypress') {
            e.preventDefault();
            return false;
        }
    }
    if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
        rate += Math.floor(len/500)+1;
        if (!Math.floor(len/500)) {
            setTimeout(function() {
                if (rate > 0) { rate -= 1 }
            },5000);
        } else if (Math.floor(len/500)==1) {
            setTimeout(function() {
                if (rate > 0) { rate -= 2 }
            },5000);
        } else if (len == 3000) {
            setTimeout(function() {
                if (rate > 0) { rate -= 3 }
            },5000);
        }
    }
    var repeatmatch = this.value.match(/(.{8,})\1{4,}|(.{12,})\2{2,}|(.{5,})\3{10,}/i);
    if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && (repeatmatch || repeatmsg > 0)) {
        if ((repeatmatch && (repeatmsg >= 1 || repeattrigger>2)) || (repeatmatch2 = this.value.match(/(.{5,})\1{12,}/i))) {
            var match = (repeatmatch2&&repeatmatch2[1])||repeatmatch[1]||repeatmatch[2];
            var matchcount = this.value.match(new RegExp(match.replace(/(?=[.\\+*?[^\]$(){}\|])/gi, "\\"), 'g')).length;
            if (match.length > 10) match = match.substr(0,10)+'...';
            return ratekick.call(this,e,'Послан повторяющийся текст: "'+match+'", '+matchcount+' раз');
        } else if (repeatmatch) {
            repeattrigger++;
            repeatmsg += 5;
            mainRoom.model.chats.add(new models.InlineAlert({text: '<span style="color:#B00;">Пожалуйста, не повторяйте одно и то же несколько раз.'}));
        } else repeatmsg--;
    }
}
function ratekick(e, msg) {
    this.disabled = true;
    e.preventDefault();
    mainRoom.sendMessage({which : 13, shiftKey : false, preventDefault : function() {}, target : $('<textarea name="message">##Автоматическое сообщение: '+msg+'. Если необходимо, кликните [['+(wgSiteName == 'Террария вики'?'Служебная:Contributions/':'Служебная:Contributions/')+wgUserName+'|здесь]], чтобы заблокировать меня.</textarea>') })
    document.location.href = wgServer+"/wiki/Террария вики:Чат/Кик";
    return false;
}
if (mw.config.get('wgUserGroups').indexOf('chatmoderator') === -1 && mw.config.get('wgUserGroups').indexOf('threadmoderator') === -1) {
    $('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
}
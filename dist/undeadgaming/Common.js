// ******
// IRC Login (Courtesy of Sactage)
// ******
$(document).ready(function() {
        if($('#IRClogin')){
            var nick = (wgUserName == null) ? ('Wikian' + Math.floor(Math.random() * 10)) : wgUserName.replace(/ /g, '_');
            $('#IRClogin').html('<iframe src="http://webchat.freenode.net/?nick=' + nick + '&channels=undead-gaming&prompt=true&uio=OT10cnVlJjExPTUxJjEyPXRydWU37" width="950" height="400" style="border:0;"></iframe>');
        }
    });
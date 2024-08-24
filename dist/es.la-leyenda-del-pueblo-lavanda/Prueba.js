if (wgUserGroups.indexOf('chatmoderator')!= -1) {
    $(function() {
	$('[name="message"]').keypress(function(e) {
		if (e.which == 13) {
			if (this.value.split(' ')[0] == '/banear') {
				e.preventDefault();
				var toKick = this.value.replace(/^\/banear /,'');
				if (!$('#WikiChatList [data-user="'+toKick+'"]').length) {
					confirm(toKick + ' no está xd')?mainRoom.ban({name: toKick}):undefined;
				} else {
					mainRoom.ban({name: toKick});
				}
				this.value = '';
				return true;
			}
		}
	});
});
}

$(function() { 
var asdasd = wgUserGroups.join(' '); 
if(asdasd.indexOf('staff') + asdasd.indexOf('helper') + asdasd.indexOf('vstf') + asdasd.indexOf('sysop') + asdasd.indexOf('rollback') <= -5) { 
window.location.replace("http://c.wikia.com"); 
} 
});

if(wgCanonicalSpecialPageName == 'Chat') {
function salirxd() {
$('#ChatHeader .User').css('display', 'none');
}
$('form#Write').append('<a class="wikia-button" href="javascript:salirxd()" style="position:absolute; right:85px; top:0;">Desconectar</a>');
}
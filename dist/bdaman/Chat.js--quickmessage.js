function createAlias(alias, on, run) {
	$('[name="message"]').keypress(function(e) {
		if (typeof on == 'number') on += '';
		if (typeof on == 'string') on = on.split(/[,\|]/);
		var val = this.value;
		if (on.indexOf(e.which+'')!=-1 && val.toLowerCase().search(new RegExp('/'+alias.toLowerCase()+'\\b')) == 0) {
			val = val.substr(alias.length+(val.charAt(alias.length+1)==' '?2:1));
			if (typeof run == 'string') this.value = run + ' ' + val;
			else if (typeof run == 'function') run(val, e);
			if (e.which!=13) e.preventDefault();
		}
	});
}
 
/* Creating /me command */
createAlias('me', 32, '* '+wgUserName);

/* Creating /deadchat command */
createAlias('deadchat', 32, 'Chat is dead...party! http://bit.ly/DeadChat');

/* Creating /gangnam command */
createAlias('gangnam', 32, '* 'document.getElementById('sound').innerHTML = '<audio src="http://images.wikia.com/ricta/images/4/48/Gangnam_Style.ogg" autoplay=""></audio>');
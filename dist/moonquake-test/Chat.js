// ***************
// Spam Filter
// ***************
 
// Credit to Master Ceadeus 27 for this version of the filter, script modified slightly for more leniency/easier changing
 
// Change these variables to modify the leniency of the script
 
var maxLimit = 8; // limit for sent lines
var maxLength = 1900; // limit for how long a line can be (in chars)
var limitTimeout = 2000; // timeout for the sent lines limiter
 
var rate = 0;
function ratelimit(e) {
	if (rate > maxLimit) {
		this.disabled = true;//disabling input in case they press ESC before the redirect is complete
		e.preventDefault();
		mainRoom.sendMessage({which : 13, shiftKey : false, preventDefault : function() {} })
		document.location.href = wgServer+"/wiki/Project:Chat/Ratelimit_triggered";
		return false;
	}
	if (this.value.length>=maxLength || this.value.split('\n').length>=6) {
		var val = this.value.substring(0,maxLength).split('\n');
		val = val[0]+'\n'+val[1]+'\n'+val[2]+'\n'+val[3]+'\n'+val[4];//remove all lines after the 5th line.
		this.value = val;
		if (e.type == 'keypress') {
			e.preventDefault();
			return false;
		}
	}
	if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
		rate += 1;
		setTimeout(function() {
			if (rate > 0) { rate -= 1 }
		},limitTimeout);
	}
}


$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);

// *******************
// END Spam Filter
// *******************

// ************
// Chat options import
// ************
 
var chatOptionsLoaded = false;
if (!chatOptionsLoaded){
	chatOptionsLoaded = true;
	importScriptPage('MediaWiki:Chat.js/options.js','cod');
}
 
// ****************
// END Chat options import
// ****************

//*Allow Chat Mods and admins to kick users using /kick <username>*//
if (wgUserGroups.indexOf('chatmoderator')!=-1 || wgUserGroups.indexOf('sysop')!=-1) {
	createAlias('kick', 13, function(toKick,e) {
		if ($('#WikiChatList [data-user="'+toKick+'"]').length) {
			mainRoom.kick({name: toKick})
		} else {
			if (confirm(toKick + ' is not in this chat. Still try to kick him?')) mainRoom.kick({name: toKick});
		}
		e.target.value = '';
	});
}
if (wgUserGroups.indexOf('sysop')!=-1) {
	createAlias('block', 13, function(toBan,e) {
		if (confirm('Are you really sure you want to block '+toBan+' permanently from the wiki, and kick them from this chat? Note: seperate the username and the block reason with a comma.')) {
			toBan = toBan.split(',');
			reason = toBan.slice(1).join(' ');
			$.post('runescape.wikia.com/api.php?action=block&user='+toBan[0]+'&expiry=infinite&nocreate=true&noemail=true&reason='+encodeURIComponent(reason))
			mainRoom.kick({name: toBan[0]})
		}
	})
}
//*******************
// Attempting to add a message 
// that will work with commands-bear with me.
//*******************
//*****************************
// Ugh ugh quackery, I tell you
//*****************************
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
//**************************//
// NOW here's the fun part  //
//**************************//
createAlias('!spam', 32, '*, '+wgUserName, '<p>Please do not spam or vandalize.</p>');

//******
//Stuffy stuff
//******
alert("Welcome to this chat, yo")
//<nowiki>
var rate = 0;
function ratelimit(e) {
	if (rate > 5) {
		this.disabled = true;//disabling input in case they press ESC before the redirect is complete
		e.preventDefault();
		$('[name="message"]').val('##Automated message: Ratelimit passed. If necessary, click [['+(wgSiteName == 'Creepypasta wiki'?'Creepypasta:Chat#':'Special:Contributions/')+wgUserName+'|here]] to ban me from the chat.');
		mainRoom.sendMessage({which : 13, shiftKey : false, preventDefault : function() {}, target : $('[name="message"]') })
		document.location.href = wgServer+"/wiki/CP:Chat/RateLimit";
		return false;
	}
	var len = this.value.length;
	if (len>=1000 || this.value.split('\n').length>=6) {
		var val = this.value.substring(0,1000).split('\n');
		val = val.slice(0,5).join('\n');//remove all lines after the 5th line.
		this.value = val;
		if (e.type == 'keypress') {
			e.preventDefault();
			return false;
		}
	}
	if (e.type == 'keypress' && e.which == 13 && !e.shiftKey && this.value != '') {
		rate += Math.floor(len/500)+1; //messages of <500 count as 1 message, >500 counts as 2 messages and 1000 counts as 3. Preventing spammers from posting too much within the limits of this script
		if (!Math.floor(len/500)) {
			setTimeout(function() {
				if (rate > 0) { rate -= 1 }
			},5000);
		} else if (Math.floor(len/500)==1) {
			setTimeout(function() {
				if (rate > 0) { rate -= 2 }
			},5000);
		} else if (len == 1000) {
			setTimeout(function() {
				if (rate > 0) { rate -= 3 }
			},5000);
		}
	}
}
$('[name="message"]').keyup(ratelimit).keypress(ratelimit).keydown(ratelimit);
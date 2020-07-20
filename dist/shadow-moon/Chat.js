/* Tab Insert */
 
importScriptPage('User:Joeytje50/tabinsert.js', 'runescape');
 
//Chat's topic. Remember to escape single quotes in the topic using \' to prevent this from breaking.
var chatTopic = '<font color="#FFC000"> Welcome to the Clone Wars Adventures Character Wiki chat!</font><br /> <style="position:relative;text-decoration:underline;font-size: 10px;">Don’t swear</style> <font color="#FFC000">~</font> <style="position:relative;text-decoration:underline;font-size: 10px;">No bullying</style> <font color="#FFC000">~</font> <style="position:relative;text-decoration:underline;font-size: 10px;">Keep discussions family friendly</style> <font color="#FFC000">~</font> <style="position:relative;text-decoration:underline;font-size: 10px;">Respect ALL Users</style> <font color="#FFC000">~</font> <style="position:relative;text-decoration:underline;font-size: 10px;">No spamming</style><br />'
 
 
 
$(function() {
	$('#ChatHeader .public.wordmark').prepend('<div class="chattopic" style="text-align:center;position:absolute;width:60%;z-index:0;font-size: 13px;color:#FFFFFF;font-weight:bold;line-height:1.6;margin-left:190px;">'+chatTopic+'</div>')
	.find('a').attr('style','position:relative;text-decoration:underline;')
})
 
 
// Credit to Joeytje50, script modified slightly for more leniency/easier changing
 
// Change these variables to modify the leniency of the script
 
var maxLimit = 6; // limit for sent lines
var maxLength = 1250; // limit for how long a line can be (in chars)
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
 
document.title = "Shadow Moon Wikia Chat";
 
$('.Write [name="message"]').keypress(function (e) {
            if (e.which === 13) {
                this.value = this.value.replace(/[[]]/gi, ':)');
            }
        });

importScriptPage("ChatTags/code.js", "dev");
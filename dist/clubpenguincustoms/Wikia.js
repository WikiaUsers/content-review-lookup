// UserTags - remove tags of chatmoderators o
 
$(document).ready(function() {
	function usertagscleanup() {     
		if ($("body.ns-2 hgroup .tag.patroller-user").length > 0) { // if the user has a patroller tag
			$("hgroup .tag.rollback-user").hide().append(" (*hidden*)"); // hide rollback tag
			$("hgroup .tag.chatmoderator-user").hide().append(" (*hidden*)"); // hide chatmoderator tag
			$("hgroup .tag.patroller-user").css("margin-left","5px");
		} else if ($("body.ns-2 hgroup .tag.rollback-user").length > 0) { // if the user has no patroller tag but has a rollback tag
			$("hgroup .tag.chatmoderator-user").hide().append(" (*hidden*)"); // hide chatmoderator tag
			$("hgroup .tag.rollback-user").css("margin-left","5px");
		}
	}
	setTimeout(usertagscleanup, 1000)
});
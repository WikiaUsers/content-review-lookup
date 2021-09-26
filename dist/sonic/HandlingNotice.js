//Control which messages to show to the user in a sitenotice given they are in one of the following groups:
$(function() {
var isauto = false, isuser = false;
$.each(mw.config.get('wgUserGroups'), function(key, value) {
		if (value == "autoconfirmed") {
				isauto = true;
    }
		else if (value == "user") {
				isuser = true;
    }
});
if (isauto == true) //The user is autoconfirmed
	if ($('.notifications-placeholder #newcomer').length > 0) {
				var $child = $('.notifications-placeholder #newcomer');
				var $parent = $child.parent();
				$child.remove();
				if ($parent.children().length == 0) //remove sitenotice if only the 'newcomer' message was there
						$('.notifications-placeholder').remove();
	}
else if (isuser == true) //The user is still only in the 'user' group right
	if ($('.notifications-placeholder #regular').length > 0)
			$('.notifications-placeholder #regular').remove(); //only remove the 'regular' id '<p>'s
else  //He is not even a user...
	return;
});
(function init(mw, $, mainRoom, factory){
	if (!mainRoom.isInitialized){
		init(mw, $, mainRoom, factory);
		return;
	} else {
		factory(mw, $, mainRoom);
	}
}(this.mediaWiki, this.jQuery, this.mainRoom, function(mw, $, mainRoom){
	var messageEnhancements = {},
		_values = ['wgUserName', 'wgUserGroups', 'wgSiteName', 'wgServer'],
		_config = mw.config.get(_values);
		
	messageEnhancements.escapeScripts = function(text){
	    var temp = $('<div />'),
	        excluded = ['iframe', 'script', 'style', 'meta', 'link', 'title', 'html', 'body'];
	    temp.html(text);
	    temp.find(excluded.join(', ')).replaceWith(function(){
	        return mw.html.escape($(this).prop('outerHTML'));
	    });
	    return temp.html();
	};
	
	messageEnhancements.groupTagMessages = $.extend(true, {
	    'staff': '<img class="staff-badge-icon" src="https://slot1-images.wikia.nocookie.net/__cb1510142907/common/extensions/wikia/DesignSystem/bower_components/design-system/dist/svg/wds-company-logo-fandom.svg" />',
		'helper': 'FANDOM Helper',
		'vstf': 'VSTF',
		'bureaucrat': 'Bureaucrat',
		'sysop': 'Administrator',
		'chatmoderator': 'Chat Moderator',
		'discussions-moderator': 'Discussions Moderator',
		'rollback': 'Rollback',
		'patroller': 'Patroller',
		'codeeditor': 'Code Editor',
		'checkuser': 'Checkuser',
		'bot': 'Bot',
		'councilor': 'FANDOM Council',
		'vanguard': 'Vanguard'
	}, window.groupTagMessages || {});
	messageEnhancements.createTag = function(cid, $target){
		var cidObject = mainRoom.model.chats._byCid[cid],
			username = cidObject.attributes.name,
			usernameObject = mainRoom.model.users.findByName(username) || null;
		if (typeof usernameObject == 'undefined') return;
		
		function parseBadge(item){
		    if (/<>\./.test(item)){
		        return messageEnhancements.escapeScripts(item);
		    } else {
		        return item;
		    }
		}
		
		$target = typeof $target !== 'undefined' ? $target : $('#entry-' + cid);
		if ($target.hasClass('inline-alert')) return;
		var groups = usernameObject.attributes.groups,
			allowed = [
				'staff', 'helper', 'vstf',
				'bureaucrat', 'sysop', 'discussions-moderator', 'chatmoderator', 'rollback',
				'patroller', 'codeeditor', 'checkuser',
				'bot', 'councilor', 'vanguard'
			];
		allowed = $.merge(allowed, window.allowedGroups || []);
		groups = groups.filter(function(group){
			return allowed.indexOf(group) > -1;
		}).sort(function(a, b){
			if (allowed.indexOf(a) > allowed.indexOf(b)) return 1;
			else if (allowed.indexOf(a) < allowed.indexOf(b)) return -1;
			else return 0;
		});
		var limit = window.groupTagLimit || 1, tags = null;
		if (limit > 1){
		    tags = [];
		    for (var i = 0, g = groups.length; i < g; i++){
		        var group = groups[i],
		            item = messageEnhancements.groupTagMessages[group],
		            tagHTML = parseBadge(item),
		            html = $('<span />', {
		            'class': 'chat-user-group-tag user-group-tag tag tag-' + group,
		            html: tagHTML
		        });
		        tags[tags.length] = html;
		    }
		} else {
		    var group = groups[0],
		        item = messageEnhancements.groupTagMessages[group],
		        tagHTML = parseBadge(html);
		    tags = $('<span />', {
		        'class': 'chat-user-group-tag user-group-tag tag tag-' + group,
		        html: tagHTML
		    });
		}
		$target.find('span.username').after(tags);
	};
	
	$(document).ready(function(){
	    $('.Chat li').each(function(){
	        if ($(this).attr('id')){
	            var _entryid = $(this).attr('id'),
	                cid = _entryid.replace('entry-', '');
	            messageEnhancements.createTag(cid, $(this));
	        }
	    });
	    
	    mainRoom.model.chats.bind('afteradd', function(child){
	        var cid = child.cid;
	        messageEnhancements.createTag(cid);
	    });
	});
}));
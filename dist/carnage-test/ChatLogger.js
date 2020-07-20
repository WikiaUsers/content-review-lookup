(function(mw, $, chat_logger){
	var ChatLogger = Object.create(null);
	function createCookieString(cookie_obj, parse_function){
		var cookie_keys = Object.keys(cookie_obj),
			res = null;
		function mapItems(key, index){
			var item = cookie_obj[key], string = '';
			if (typeof parse_function == 'function'){
				string = parse_function.apply(this, [typeof item !== 'object' ? item : '', key, index, cookie_keys, typeof item == 'object' ? item : {}]);
			} else {
				if (index < (cookie_keys.length - 1)){
					string = key + ':' + item + ';';
				} else {
					string = key + ':' + item;
				}
			}
			return string || '';
		}
		var mapKeys = mapItems.bind(ChatLogger);
		res = cookie_keys.map(mapKeys).filter(function(item){ return item !== '' });
		return res.join(' ');
	}
 
	function setCookie(name, value, expiry){
		var expiry_date = new Date(),
			target_date = parseInt(expiry_date.getDate() + expiry, 10);
		expiry_date.setDate(target_date);
		var cookie_obj = Object.defineProperty({}, name, {
			configurable: true,
			writable: true,
			enumarable: true,
			value: value
		});
		cookie_obj['expires'] = {
			condition: ['string', 'number'].indexOf(typeof expiry) > -1 && expiry !== null,
			value: expiry
		};
		document.cookie = createCookieString(cookie_obj, function(item, key, index, object, config){
			var keys = Object.keys(object), isLast = (index === (keys.length - 1)), res = '';
			if (typeof config == 'object'){
				if (typeof config.condition == 'true' && config.condition === true){
					if (!isLast){
						res = key + '=' + encodeURIComponent(config.value) + ';';
					} else {
						res = key + '=' + encodeURIComponent(config.value);
					}
					return res;
				}
				return '';
			} else {
				if (!isLast){
					res = key + '=' + encodeURIComponent(item) + ';';
				} else {
					res = key + '=' + encodeURIComponent(item);
				}
				return res || '';
			}
		});
	}
 
	function getCookie(name){
		if (document.cookie.length > 0){
			var start = document.cookie.indexOf(name + '=');
			if (start !== -1){
				start = start + name.length + 1;
				var end = document.cookie.length(';', start);
				if (end === -1){
					end = document.cookie.length;
				}
				return decodeURIComponent(document.cookie.substring(start, end));
			}
		}
		return '';
	}
 
	ChatLogger.pad = function(n, base){
		base = typeof base !== 'undefined' ? base : 10;
		if (!isNaN(n)){
			if (parseInt(n, base) < base){
				return '0' + n;
			}
			return n;
		}
		return NaN;
	};
 
	ChatLogger.convert = function(time, name){
		var time_object = {
			'h': function(n){
				return n * 60 * 60 * 1000;
			},
			'm': function(n){
				return n * 60 * 1000;
			},
			's': function(n){
				return n * 1000;
			}
		};
		if (time_object.hasOwnProperty(name)){
			return time_object[name].apply(this, [parseInt(time, 10)]);
		}
	};
 
	ChatLogger.date = new Date();
	ChatLogger.curTime = [null, null, null];
	ChatLogger.curTime[0] = ChatLogger.date.getUTCHours();
	ChatLogger.curTime[1] = ChatLogger.date.getUTCMinutes();
	ChatLogger.curTime[2] = ChatLogger.date.getUTCSeconds();
	ChatLogger.timeTillMidnight =
		(ChatLogger.convert((23 - ChatLogger.curTime[0]), 'h')) +
		(ChatLogger.convert((59 - ChatLogger.curTime[1]), 'm')) +
		(ChatLogger.convert((60 - ChatLogger.curTime[2]), 's'));
	setTimeout('setInterval("ChatLogger.submitLog()", ' + ChatLogger.convert(24, 'h') + ')', ChatLogger.timeTillMidnight);
	setTimeout('ChatLogger.submitLog()', ChatLogger.timeTillMidnight);
	ChatLogger.logInterval = ChatLogger.logInterval ? ChatLogger.logInterval : ChatLogger.convert(60, 'm');
 
	ChatLogger.toUTCTime = function(string){
		console.log(string);
		var time_zone = this.date.getTimezoneOffset()/60,
			hour = parseInt(string.split(':')[0]),
			UTChour = hour-time_zone;
		if (UTChour < 1){
			UTChour = 12 + UTChour;
		} else if (UTChour > 12){
			UTChour = UTChour - 12;
		}
		var UTCTime = this.pad(UTChour) + ':' + string.split(':')[1] + (string.split(':').length > 2 ? ':' + string.split(':')[2] : '');
		return UTCTime;
	};
 
	ChatLogger.getLog = function(exists, content){
		var messages = $('.Chat').find('.message'),
			message = messages.eq(0).html(),
			msguser = messages.eq(0).closest('li').data('user') || messages.eq(0).closest('li').attr('data-user'),
			msgtime = this.toUTCTime(messages.eq(0).closest('li').find('.time').html()),
			i;
		for (i = 1; typeof messages[i] !== 'undefined'; i++){
			message += '<|>' + messages.eq(i).html();
			msguser += '<|>' + messages.eq(i).closest('li').data('user') || messages.eq(i).closest('li').attr('data-user');
			msgtime += this.toUTCTime(messages.eq(i).closest('li').find('.time').html());
        }
		message = message.split('<|>');
		msguser = msguser.split('<|>');
		msgtime = msgtime.split('<|>');
 
		var ChatLog = '<ul class="WikiChatLog chat-log" id="WikiChatLog">';
		for (i = 0; typeof message[i] !== 'undefined'; i++){
			ChatLog +=
				'<li class="WikiChatLogItem chat-log-item" id="WikiChatLogItem-' + i + '">' +
					'<div class="WikiChatLogTime chat-log-time">' + msgtime[i] + '</div>' +
					'<div class="WikiChatLogUser chat-log-user">' + msguser[i] + '</div>' +
					'<div class="WikiChatLogMessage chat-log-message">' + message[i] + '</div>' +
				'</li>';
		}
		var wikilinks = new RegExp('<a href="' + mw.config.get('wgServer') + '/wiki/([^"]*)">([^<]*)</a>', 'g'),
			patterns = [
				[/(\s|\t){2,}/g, ' '],
				[/<img src="[^"]+".*? alt="([^"]+)"[^>]*>/g, '[[$1]]'],
				[wikilinks, function(match, page, title){ return '[[' + page.replace(/_/g, ' ') + '|' + title + ']]'; }],
				[/\[\[([^\]]*?) {2,}/g, '[[$1]]'],
				[/\[\[([^|]*)\|\1\]\]/g, '[[$1]]'],
				[/<a href=\"([^\"]+)\">[^<]*<\/a>/g, '$1'],
				['[[' + mw.config.get('wgServer') + '/wiki/]]', mw.config.get('wgServer') + '/wiki/']
			];
		for (var j = 0; j < patterns.length; j++){
			var pattern = patterns[j][0],
				result = patterns[j][1];
			ChatLog = ChatLog.replace(pattern, result);
		}
		var res = exists ? content.replace('</div>', ChatLog + '</div>') :
			'<div class="WikiChatLogWrapper dynamic-chat-log">\n' + ChatLog + '</div>\n[[Category:Wikia Chat Logs|<strong class="error">Error: Invalid time.</strong>]]';
		return res;
	};
 
	ChatLogger.submitLog = function(restart){
		restart = restart ? restart : false;
		var date = new Date(),
			monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			d = date.getUTCDate() + '_' + monthNames[date.getUTCMonth()] + '_' + date.getUTCFullYear(),
			that = this;
		$.ajax({
			method: 'GET',
			dataType: 'json',
			url: mw.config.get('wgScriptPath') + '/api.php',
			data: {
				'action': 'query',
				'prop': 'info|revisions',
				'intoken': 'edit',
				'titles': 'Project:Chat/Logs/' + d,
				'rvprop': 'content',
				'rvlimit': '1',
				'indexpageids': 'true',
				'format': 'json'
			},
			success: function(response){
				console.log(response);
				var page = response.query.pages[response.query.pageids[0]],
					pageExists = response.query.pages['-1'] ? false : true,
					content = typeof page['revisions'] !== 'undefined' ? page.revisions[0]['*'] : '';
				$.ajax({
					method: 'POST',
					dataType: 'json',
					url: mw.config.get('wgScriptPath') + '/api.php',
					data: {
						'minor': 'yes',
						'bot': 'yes',
						'summary': '',
						'action': 'edit',
						'title': 'Project:Chat/Logs/' + d,
						'starttimestamp': page.starttimestamp,
						'token': page.edittoken,
						'text': that.getLog(pageExists, content),
						'format': 'json'
					},
					success: function(){
						if (restart === true){
							window.location.reload(true);
						}
					}
				});
			}
		});
	};
	window.ChatLogger = ChatLogger;
})(this.mediaWiki, this.jQuery, typeof this.WikiChatLogger == 'object' ? this.WikiChatLogger : {});
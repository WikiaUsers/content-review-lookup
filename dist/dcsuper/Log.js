var ewGedbFetching = false;
var ewItemIds = [];

$(function() {
	var refreshTimer = null;
	var rcIds = [];

	var loadingHtml = '<img src="https://images.wikia.nocookie.net/common/skins/common/images/ajax.gif" width="16" height="16" alt="Loading..." />';

	function articleURL(article) {
		return mw.config.get('wgArticlePath').replace('$1', encodeURI(article.replace(/ /g, '_')));
	}

	function scriptURL(article) {
		return mw.config.get('wgScript') + '?title=' + encodeURIComponent(article.replace(/ /g, '_'));
	}

	function callAPI(data, method, callback) {
		data['format'] = 'json';

		$.ajax({
			data: data,
			dataType: 'json',
			url: mw.config.get('wgScriptPath') + '/api.php',
			type: method,
			success: function(response) {
				if (response.error) {
				} else {
					callback(response);
				}
			},
			timeout: 10000
		});
	}

	function reloadComplete() {
		if ($('#logAutoRefresh:checked').length) {
			window.clearTimeout(refreshTimer);
			refreshTimer = window.setTimeout(reloadData, 10 *1000);
		}
		$('#log_update img').hide();
		$('#logLastUpdate').text((new Date()).toUTCString());
	}

	function reloadData() {
		$('#log_update img').show();
		var rcQuery = {
			'action': 'query',
			'list': 'logevents',
			'lelimit': '1',
			'leprop': 'user|timestamp|title|parsedcomment|type|details',
			'letype': 'block|protect|rights|delete|upload|move|newusers',
                        'format': 'JSON'
		};

		callAPI(rcQuery, 'GET', function(response) {
			var revs = [];
			var curDate = '';
			var rc = response.query.logevents[0];
            
            if(rcIds.length != 0)
                $('#logHeader').nextAll().remove();
	
            rcIds.push(rc.rcid);

			revs.push(rc.revid);
			revs.push(rc.old_revid);

            var next = "";
            if (rc.type==="block" && rc.action==="unblock")
                next = ' Removed block';
            else if (rc.type==="block")
                next = ' Block duration: ' + rc.block.duration;

            var prev = '(<a href="' + articleURL('Special:Log/' + rc.type) + '" target="_blank">';
            if (rc.type=="delete")
                prev += 'Deletion log' + '</a>) ';
            else if (rc.type=="upload")
                prev += 'Upload log' + '</a>) ';
            else if (rc.type=="move")
                prev = ' ' + prev + 'Move log' + '</a>) Moved to: ' + '<a href="' + articleURL(rc.move.new_title) + '" target="_blank">' + rc.move.new_title + '</a>';
            else if (rc.type=="block")
                prev = ' ' + prev + 'Block log' + '</a>) ';
            else if (rc.type=="abusefilter")
                prev = ' ' + prev + 'Abuse Filter log' + '</a>) (<a href="' + articleURL('Special:AbuseFilter/history/' + rc[1] + '/diff/prev/' + rc[0]) + '" target="_blank">diff</a>)';
            else if (rc.type=="newusers")
                prev = ' ' + prev + 'User creation log' + '</a>)';
            else if (rc.type=="useravatar")
                prev = ' ' + prev + 'User avatar log' + '</a>)';
            else if (rc.type=="protect")
                prev = ' ' + prev + 'Protection log' + '</a>) ' + rc[0];
            else if (rc.type=="rights")
                prev = ' ' + prev + 'User rights log' + '</a>) ' + rc.rights.old + ' to ' + ((rc.rights.new=='')?'(none)':rc.rights.new);

            if (rc.parsedcomment) {
                prev += " (";
                next = ")" + next;
            }

	var date = rc.timestamp.substring(0, 10);
	var time = rc.timestamp.substring(11, 19);

			$('#logHeader').after(
'<tr class="rc_rev_' + rc.revid + ' rc_page_' + rc.pageid + ' rc_cur">' +
	'<td rowspan="2"><b>' + time + '</b></td>' +
	'<td>' +
		'<a href="' + articleURL(rc.title) + '" target="_blank">' + rc.title + '</a> ' +
	'</td>' +
'<td class="rc_user_' + rc.revid + '">' + '<a href="' + articleURL('User:' + rc.user) + '" target="_blank">' + rc.user + '</a>' + '</td>' +
'</tr><tr class="rc_rev_' + rc.revid + ' rc_page_' + rc.pageid + ' rc_prev">' +
	'<td class="comment">' + prev + '<i>' + rc.parsedcomment + '</i>' + next + '</td>' +
        '<td>&raquo; ' +
		'<a href="' + articleURL('User_talk:' + rc.user) + '" target="_blank">talk</a> &bull; ' +
		'<a href="' + articleURL('Special:Contributions/' + rc.user) + '" target="_blank">contribs</a>' +
'</tr>'
			);

			
			reloadComplete();
			
		});
	} // function reloadData()

    var page_arr = ['User:Suppa_chuppa/Sandbox_4',
                    'User:Suppa_chuppa/RecentChangesHybrid',
                    'User:Thebrains222/Counter_Vandalism_Feed',
                    'User:Suppa_chuppa/RCH_Lite'];
    if ($.inArray(mw.config.get('wgPageName'), page_arr) > -1 && (mw.config.get('wgAction') == 'view' || mw.config.get('wgAction') == 'purge'))
    {
		$('#WikiaRail').remove();
		$('body').addClass('oasis-one-column');

		appendCSS(
			'.rc_cur > td, .rc_cur > th { border-top: 2px solid #333 !important; }' +
			'/*#log_msg { padding: 1em; margin: 1px; border: 1px solid black; }*/'
		);

		$('#log_options').empty().append(
'<form>' +
	'<fieldset>' +
		'<legend>Log Watch options</legend>' +
		'<input type="checkbox" id="logAutoRefresh" checked="checked" /> <label for="logAutoRefresh">Auto-refresh table</label>&nbsp;&nbsp;&nbsp;' +
                '<input type="checkbox" id="logRefresh" checked="unchecked" /> <label for="logRefresh">Click here if table gets stuck</label><br />' +
	'</fieldset>' +
'</form>'
		);

		$('#log_update').html('Last update: <span id="logLastUpdate"></span> ' + loadingHtml);

		var $table = $('<table >').addClass('wikitable').attr('id', 'ewData').css('width', '100%');
		$table.append(
'<tr id="logHeader">' +
	'<th>Time</th>' +
	'<th>Title</th>' +
	'<th>User</th>' +
'</tr>'
		);

		$('#log_main').empty().append($table);

                $('#logRefresh').click(function() {
			$('#logHeader').nextAll().remove();//.sleep(2500);
			rcIds = [];
			reloadData();
		});
		reloadData();
	}
});

/* </pre> */
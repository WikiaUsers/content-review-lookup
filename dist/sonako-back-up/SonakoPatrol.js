//<nowiki>
$(function() {
 
// set these in accordance with your wiki's warning templates (without "Template:")
var warn_templates = ["Test1", "Test2", "Warn3", "No Vandal", "Error1", "Error2", "Deu", "Pov1", "Pov2", "RDT", "Warnfl", "Charm_log_1", "Charm_log_2", "Gemw1", "Gemw2"];
 
// whether a user may rollback edits and block users
var is_sysop = $.inArray('sysop', wgUserGroups) > -1;
var is_rollback = is_sysop || $.inArray('rollback', wgUserGroups) > -1;
 
// add settings to the page
$('#rcp_settings').empty().append('Namespaces:' +
				'<table>' +
					'<tr>' +
						'<td valign="top">' +
							'<div id="namespace_s"></div>' +
						'</td>' +
						'<td valign="top">' +
							'<div id="limit_s"></div>' +
							'<div id="anon_s"></div>' +
							'<div id="minor_s"></div>' +
							'<div id="since_s"></div>' +
							'<div id="submit_s"></div>' +
						'</td>' +
					'</tr>' +
				'</table>' +
				'<div style="font-weight:bold;" id="rcp-loading"></div>');
 
var $select = $('<select multiple="multiple" id="namespace"/>');
$select.append('<option>All</option><option value="0">(main)</option>');
 
for(var i = 1; i < 200; i++) {
	if(typeof wgFormattedNamespaces[i] !== "undefined") {
		$select.append('<option value="' + i + '">' + wgFormattedNamespaces[i] + '</option>');
	}
}
 
$('#namespace_s').append($select);
 
$('#limit_s').empty().append('<label for="limit">Number of edits to fetch: </label><input type="text" id="limit" maxlength="3" size="1" value="50" />');
$('#anon_s').empty().append('<label for="anon">Only show anonymous users: </label><input type="checkbox" id="anon" />');
$('#minor_s').empty().append('<label for="minor">Only show non-minor edits: </label><input type="checkbox" id="minor" />');
$('#since_s').empty().append('<label for="since">Show edits since: </label><input type="text" id="rcsince" />');
$('#submit_s').empty().append('<button type="button" id="go">Submit</button>');
$('#go').click(function() {
	$('#go').attr('disabled', 'disabled').text('Loading...');
	go();
});
$('#go').after('<br /><span style="display:none;" id="commands-toggle">Commands:<textarea id="commands" rows="2" cols="5" /></span>');
 
//==================
// Global variables
//==================
var revIds, old_revIds, pages, users, diffs, comments, tokens, timestamps, tops;
var show_diff, parse_diffs;
var counter = 0, working = false, edittoken, starttimestamp;
 
/*
 * 
 */
function warn(user, i) {
	$.ajax({
		url: wgServer + '/api.php',
		data: {
			'action': 'query',
			'format': 'json',
			'prop': 'revisions',
			'rvprop': 'timestamp',
			'titles': 'User talk:' + user,
			'indexpageids': true
		},
		success: function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			$.post( wgServer + '/api.php',
				{
					'action': 'edit',
					'title': 'User talk:' + user,
					'appendtext': '\n{{subst:' + $('#warn-templates').val() + '}} ~~~~',
					'token': edittoken,
					'minor': 'yes',
					'summary': 'Warning: through [[Project:RC Patrol|RC Patrol]]',
					'basetimestamp': page.missing ? page.revisions[0].timestamp : '',
					'starttimestamp': starttimestamp
				},
				function(response) { },
				'json'
			);
			$('#warn-form').empty().append('<span style="color:green;">warned</span>'); 
		}
	});
}
 
/*
 * Set token and timestamp values for editing
 */
function get_edit_info() {
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		data: {
			'format': 'json',
			'action': 'query',
			'prop': 'info|revisions',
			'intoken': 'edit',
			'titles': 'User:Suppa chuppa',
			'indexpageids': true
		},
		success: function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			edittoken = page.edittoken;
			starttimestamp = page.starttimestamp;
		}
	});
}
 
/*
 * Save the contents of a page through the API
 * @param: content, the content to save
 * @param: i, the index of the page in the pages array
 */
function save(content, i) {
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		type: 'POST',
		data: {
			'action': 'edit',
			'title': pages[i],
			'text': content,
			'summary': $('#summary').val() + ' (through [[Project:RC Patrol|RC Patrol]])',
			'basetimestamp': starttimestamp,
			'startimestamp': starttimestamp,
			'token': edittoken
		},
		success: function(response) {
		}
	});
}
 
/*
 * Turns #diff into an edit form to make minor changes
 * @param: active, a number indicating which diff is being edited.
 * @param: i, the index of the revid and page in the revIds and pages arrays
 */
function edit_form(active, i) {
	$('#diff').empty().append('<table style="width:100%;">' +
					'<tr>' +
						'<td style="width:50%;" valign="top">' +
							'<textarea' + (active==1||active==3?'':' disabled="disabled"') + ' rows="40" id="content_1" />' +
						'</td>' +
						'<td valign="top">' +
							'<textarea' + (active==2||active==4?'':' disabled="disabled"') + ' rows="40" id="content_2" />' +
						'</td>' +
					'</tr>' +
				  '</table>');
 
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		data: {
			'action': 'query',
			'format': 'json',
			'prop': 'revisions',
			'titles': pages[i],
			'rvprop' : 'content',
			'rvlimit': 2,
			'rvstartid': old_revIds[i],
			'rvdir': 'newer',
			'indexpageids': true
		},
		success: function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			$('#nav').empty().append('Summary: <input id="summary" type="textbox"/ > <button id="save">Save</button> <a id="cancel">cancel</a>');
			if(active < 3) {
				$('#content_1').val(page.revisions[0]['*']);
				$('#content_2').val(page.revisions[1]['*']);
				$('#save').click(function() { save($('#content_' + active).val(), i); show_diff(i); get_edit_info(); });
			}
			else {
				$('#content_1').val(page.revisions[1]['*']);
				$('#save').click(function() { save($('#content_' + (active-2)).val(), i); show_diff(i); get_edit_info(); });
			}
			$('#summary').keydown(function(e) {
				if(e.which == 13) {
					$('#save').click();
					$('#commands').focus();
					return false;
				}
			});
			$('#cancel').click(function() { show_diff(i); if(active > 2) { $('#cur-diff').click(); } });
		}
	});
	if(active > 2) {
		$.ajax({
			url: wgServer + '/api.php',
			dataType: 'json',
			data: {
				'action': 'query',
				'format': 'json',
				'prop': 'revisions',
				'titles': pages[i],
				'rvprop' : 'content',
				'rvlimit': 1,
				'indexpageids': true
			},
			success: function(response) {
				$('#content_2').val(response.query.pages[response.query.pageids[0]].revisions[0]['*']);
			}
		});
	}
}
 
/*
 * Show the difference between the selected revision and the current
 * @param: i, the index of the revision in the revIds array
 */
function show_cur(i) {
	$('#cur-diff').empty().append('<span style="font-weight:bold;">Loading...</span>');
	$('#diff').attr('class', i);
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		data: {
			'format': 'json',
			'action': 'query',
			'revids': revIds[i],
			'prop': 'revisions',
			'rvprop': 'timestamp|parsedcomment|user|ids',
			'rvdiffto': 'cur',
			'rvtoken': 'rollback',
			'indexpageids': 'true'
		},
		success: function(response) {
			$('#compare-toggle').toggle();
			$('#cur-diff').toggle();
			$('#prev-diff').toggle();
			$('#diff-options').toggle();
			$('#rev-inner').toggle();
			$('#comment').toggle();
			$('#diff').empty().append('<table style="width:100%">' + response.query.pages[response.query.pageids[0]].revisions[0].diff['*'] + '</table>');
 
			$('#diff tr:first-child td.diff-lineno:first-child').append(' <small><a id="edit-3">(edit)</a></small>');
			$('#edit-3').click(function() { edit_form(3, i); });
			$('#diff tr:first-child td.diff-lineno:nth-child(2)').append(' <small><a id="edit-4">(edit)</a></small>');
			$('#edit-4').click(function() { edit_form(4, i); });
		}
	});
}
 
/*
 * Provide a link to view the difference between the shown diff and the current revision
 * @param: i, the index of the revision in the revIds array
 */
function not_top(i) {
	$('#cur-link').empty().append('<a id="cur-diff">compare to current revision</a>');
	$('#cur-diff').click(function() { show_cur(i) });
	$('#prev-diff').click(function() {
		$('#compare-toggle').toggle();
		$('#prev-diff').toggle();
		$('#cur-diff').empty().append('compare to current revision');
		$('#cur-diff').toggle();
		$('#diff-options').toggle();
		$('#rev-inner').toggle();
		$('#comment').toggle();
		show_diff(i);
	});
}
 
/*
 * Indicate that this revision is on top and provide a rollback link
 * @param: i, the index of the revision in the revIds array
 */
function top(i) {
	$('#cur-link').empty().append('<span style="font-weight:bold;">most current revision</span>');
	// show the rollback option if the user is a sysop or has rollback rights
	if(is_rollback) {
		$('#diff-options').append(' &bull; <span id="rollback-link">[<a>rollback</a>]</span>');
			$('#rollback-link').click(function() {
				$.ajax({
				url: wgServer + '/api.php',
				dataType: 'json',
				type: 'POST',
				data: {
					'format': 'json',
					'action': 'rollback',
					'title': pages[i],
					'user': users[i],
					'token': tokens[i],
					'summary': 'Reverted edits by [[Special:Contributions/' + users[i] + '|' + users[i] + ']] ([[User talk:' + users[i] + '|talk]]) using [[Project:RC Patrol|RC Patrol]]'
				},
				success: function(response) {
					$('#rollback-link').empty().append('<span style="color:green;">reverted</span>');
				}
			});
		});
	}
}
 
/*
 * Append diff options based on user groups
 * @param: i, the index of the revision in the revIds array
 */
function append_diff_options(i) {
	$('#undo-link').click(function() { $('#undo-toggle').toggle(); });
	$('#undo-go').click(function() {
		summary = $('#undo-summary').val();
		if(summary.trim())
			summary = ': ' + summary;
		undo(summary, i);
		get_edit_info();
		$('#undo-form').empty().append('<span style="color:green;">undone</span>');
	});
	$('#undo-summary').keydown(function(e) {
		if(e.which == 13) {
			$('#undo-go').click();
			$('#commands').focus();
			return false;
		}
	});
 
	$('#undo-form').after(  ' &bull; <span id="warn-form">' +
					'<a id="warn-link">warn</a>' +
					'<span id="warn-toggle" style="display:none;">' +
						'<select id="warn-templates" />' +
						'<button id="warn-go">Warn</button>' +
					'</span>' +
				'</span>');
	for(var t = 0; t < warn_templates.length; t = t + 1) {
		$('#warn-templates').append('<option value="' + warn_templates[t] + '">' + warn_templates[t] + '</option>');
	}
	$('#warn-go').click(function() {
		warn(users[i], i);
		get_edit_info();
	});
	$('#warn-templates').keydown(function(e) {
		if(e.which == 13) {
			$('#warn-go').click();
			$('#commands').focus();
			return false;
		}
	});
	$('#warn-link').click(function() {
		$('#warn-toggle').toggle();
	});
 
	// show the block option if the user is a sysop
	if(is_sysop) {
		$('#diff-options').append(' &bull; <span id="block-form"><a id="block-link">block</a>&nbsp;<span id="block-toggle" style="display: none;">' +
					'<select id="block-duration">' +
						'<option value="2 hours">2 hours</option>' +
						'<option value="1 day">1 day</option>' +
						'<option value="3 days">3 days</option>' +
						'<option value="1 week">1 week</option>' +
					'</select>&nbsp;' +
					'Summary: <input type="textbox" id="block-reason" />&nbsp;' +
					'<button id="block-go">Block</button></span></span>');
		$('#block-link').click(function() {
			var block_token, base_stamp, start_stamp;
			$('#block-toggle').toggle();
			$('#block-go').click(function() {
				var expiry = $('#block-duration').val();
				$.ajax({
					url: wgServer + '/api.php',
					dataType: 'json',
					data: {
						'format': 'json',
						'action': 'query',
						'prop': 'info|revisions',
						'intoken': 'block',
						'titles': pages[i],
						'indexpageids': true
					},
					success: function(response) {
						block_token = response.query.pages[response.query.pageids[0]].blocktoken;
						block(users[i], block_token);
					}
				});
			});
		});
	}
 
	$('#diff-options').append('<hr />');
	$('#diff').empty().append('<table style="width:100%;">' + diffs[i] + '</table>');
 
	$('#nav').empty().append('<button type="button" id="prev_b">Prev</button><button type="button" id="next_b">Next</button>');
	if(i > 0)
		$('#prev_b').click(function() { show_diff(i-1); });
	else
		$('#prev_b').attr('disabled', '');
	if(i < revIds.length - 1)
		$('#next_b').click(function() { show_diff(i+1); });
	else
		$('#next_b').attr('disabled', '');
 
	$('#diff tr:first-child td.diff-lineno:first-child').append(' <small><a id="edit-1">(edit)</a></small>');
	$('#edit-1').click(function() { edit_form(1, i); });
 
	$('#diff tr:first-child td.diff-lineno:nth-child(2)').append(' <small><a id="edit-2">(edit)</a></small>');
	$('#edit-2').click(function() { edit_form(2, i); });
 
	$('#commands').unbind();
	$('#commands').keydown(function(e) {
		if(e.which == 37 && i > 0) { // left arrow
			$('#commands').val('');
			show_diff(i-1);
		}
		else if(e.which == 39 && i < revIds.length - 1) { // right arrow
			$('#commands').val('');
			show_diff(i+1);
		}
		else if(e.which == 82 && tops[i] && is_rollback) { // 'r'
			$('#commands').val('');
			$('#rollback-link').click();
		}
		else if(e.which == 85) { // 'u'
			$('#commands').val('');
			$('#undo-link').click();
			$('#undo-summary').focus();
			return false;
		}
		else if(e.which == 87) { // 'w'
			$('#warn-link').click();
			$('#warn-templates').focus();
			return false;
		}
		else if(e.which == 66 && is_sysop) { // 'b'
			$('#block-link').click();
			$('#block-reason').focus();
			return false;
		}
		else if(e.which == 67) { // 'c'
			$('#commands').val('');
			if($('#prev-diff').css('display') == 'none')
				$('#cur-diff').click();
			else
				$('#prev-diff').click();
			return false;
		}
	});
}
 
/*
 * Undo a selected edit through the API
 * @param: summary, the undo summary
 * @param: i, the index of the page, revision, and user in the pages, revIds, and users arrays
 */
function undo(summary, i) {
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		type: 'POST',
		data: {
			'action': 'edit',
			'title': pages[i],
			'undo': revIds[i],
			'summary': 'Undid revision ' + revIds[i] + ' by [[Special:Contributions/' + users[i] + '|' + users[i] + ']] ([[User talk:' + users[i] + '|talk]]) using [[Project:RC Patrol|RC Patrol]]' + summary,
			'basetimestamp': starttimestamp,
			'startimestamp': starttimestamp,
			'token': edittoken
		},
		success: function() {}
	});
}
 
/*
 * Block a given user through the API
 * @param: user, user to block
 * @param: token, block token
 */
function block(user, token) {
	var expiry = $('#block-duration').val();
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		type: 'POST',
		data: {
			'format': 'json',
			'action': 'block',
			'user': user,
			'token': token,
			'anononly': '',
			'nocreate': '',
			'autoblock': '',
			'allowusertalk': '',
			'expiry': expiry,
			'reason': $('#block-summary').val() + '(blocked through [[Project:RC Patrol|RC Patrol]])'
		},
		success: function(response) {
			$('#block-form').empty().append('<span style="color:green;">blocked</span>');
		}
	});
}
 
/*
 * Fetch options from #rcp_settings, parse diffs, and show them
 */
function go() {
	// only continue if a current request is not already being processed
	if(working) { return; }
 
	working = true;
	counter = 0;
	$('#rcp-loading').empty().append("Loading...<br />Generating list...");
 
	// clear data and fetch options
	revIds = [], old_revIds = [], pages = [], users = [], diffs = [], comments = [], tokens = [], timestamps = [], tops = [];
	var dropdown = $('#namespace').val() || [];
	var since = $('#rcsince').val().trim();
	var ns = dropdown.join('|');
	var limit = $('#limit').val().trim();
	var show = "";
	if ($('#anon').attr('checked')) 
		show = "|anon";
	else if ($('#minor').attr('checked')) 
		show = "|!minor";
 
	/*
	 * Load diff information and display when the first one becomes available
	 */
	parse_diffs = function() {
		diffs.length = revIds.length;
		users.length = revIds.length;
		comments.length = revIds.length;
		tokens.length = revIds.length;
		timestamps.length = revIds.length;
 
		for(var j = 0; j < revIds.length; j++) {
			$.ajax({
				url: wgServer + '/api.php',
				dataType: 'json',
				data: {
					'format': 'json',
					'action': 'query',
					'revids': revIds[j],
					'prop': 'revisions',
					'rvprop': 'timestamp|parsedcomment|user|ids',
					'rvdiffto': 'prev',
					'rvtoken': 'rollback',
					'indexpageids': 'true'
				},
				success: function(response) {
					var page = response.query.pages[response.query.pageids[0]];
					var rev = page.revisions[0];
					var k = $.inArray(rev.revid, revIds);
					diffs[k] = rev.diff['*'];
					users[k] = rev.user;
					comments[k] = rev.parsedcomment;
					tokens[k] = rev.rollbacktoken;
					timestamps[k] = rev.timestamp;
 
					$.ajax({
						url: wgServer + '/api.php',
						dataType: 'json',
						data: {
							'format': 'json',
							'action': 'query',
							'list': 'usercontribs',
							'ucuser': users[k],
							'ucstart': timestamps[k],
							'ucend': timestamps[k]
						},
						success: function(response) {
							var contrib = response.query.usercontribs[0];
							var l = $.inArray(contrib.revid, revIds);
							counter++;
							var is_top = contrib.top;
							if(is_top == null)
								tops[l] = false;
							else
								tops[l] = true;
							if(l == 0) {
								$('#rcp-loading').empty();
								show_diff(0);
								$('#go').text('Parsing diffs...');
								if($('#commands-toggle').is(':hidden'))
									$('#commands-toggle').toggle();
							}
							if(counter == revIds.length) {
								working = false;
								$('#go').removeAttr('disabled');
								$('#go').text('Submit');
							}
						}
					});
				}
			});
			$('#parsing-done').empty().append('(' + (j + 1) + '/' + revIds.length + ')');
		}
		$('#rcp-loading').append('<br />Waiting for server reply...');
	}
 
	/*
	 * Show a selected diff
	 * @param: i, the index of the diff information
	 */
	show_diff = function(i) {
		if(i > revIds.length - 1) { return; }
 
		$('#rcp_diff').empty().append(  '<div id="article"></div>'+
						'<div id="revision"></div>'+
						'<div id="comment"></div>'+
						'<span id="cur-link"></span>' +
						'<span id="prev-diff" style="font-weight:bold; display:none;"><a>Return to diff</a><hr /></span>' +
						'<span id="diff-options"></span>'+
						'<div id="nav"></div>'+
						'<span style="display:none; font-weight:bold;">Loading...</span>'+
						'<span style="font-weight:bold; display:none;" id="compare-toggle">Comparison with current revision:</span><hr />'+
						'<table class="diff">'+
							'<div id="diff"></div>'+
						'</table>');
 
		$('#article').empty().append('<h1>' +
						'<a href="/wiki/' + pages[i] + '" target="_blank">' + pages[i] + '</a> ' +
						'<small>(<a href="/index.php?diff=prev&oldid=' + revIds[i] + '" target="_blank">view diff</a>)</small>' +
					     '</h1>');
 
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
		var t = timestamps[i];
		t = t.substring(11,16) + ', ' + months[t.substring(5,7) - 1] + ' ' + t.substring(8,10) + ', ' + t.substring(0,4) + ' (UTC)';
 
		$('#revision').empty().append('Diff <input id="diff-num" type="text" maxlength="3" size="1" style="text-align:right;" /> of ' + revIds.length +
					      '&nbsp;<button id="diff_go">Go</button> <br />' +
					      '<span id="rev-inner">Revision ' + revIds[i] + ' on ' + t + ' by user: <a href="/wiki/Special:Contributions/' + users[i] + '" target="_blank">' + users[i] + '</a> ' +
					      '(<a href="/wiki/User_talk:' + users[i] + '" target="_blank">talk</a>)<br /></span>');
		$('#diff-num').val(i + 1);
		$('#diff_go').click(function() { show_diff( $('#diff-num').val() - 1 ); });
 
		$('#comment').empty().append('Comment: ');
 
		if(typeof comments[i] !== "undefined")
			$('#comment').append(comments[i]);
 
		$('#comment').append('<hr />');
		$('#diff-options').empty().append(' &bull; <span id="undo-form">(<a id="undo-link">undo</a>)' +
							'<span id="undo-toggle" style="display:none;">&nbsp;' +
								'<input type="text" id="undo-summary" />'+
								'<button id="undo-go">Save</button>' +
							'</span>' +
						  '</span>');
		if(tops[i])
			top(i);
		else
			not_top(i);
		append_diff_options(i);
	}
 
	var rc_data = {	'format': 'json',
			'action': 'query',
			'list': 'recentchanges',
			'rctype': 'edit|new',
			'rcshow': '!bot' + show,
			'rclimit': limit,
			'rcprop': 'user|title|timestamp|ids',
			'rcnamespace': ns,
			'rcstart': since };
 
	if(since) { rc_data['rcdir'] = 'newer'; }
 
	// Fetch edit information from API based on settings
	$.ajax({
		url: wgServer + '/api.php',
		dataType: 'json',
		data: rc_data,
		success: function(response) {
			if(since == '')
				response.query.recentchanges.reverse();
			for (var i in response.query.recentchanges) {
				var rc = response.query.recentchanges[i];
				revIds.push(rc.revid);
				old_revIds.push(rc.old_revid);
				pages.push(rc.title);
			}
			$('#rcp-loading').append(' Done.</br />Sending requests... <span id="parsing-done"></span>');
			parse_diffs();
		}
	});
 
	get_edit_info();
}
 
});
//</nowiki>
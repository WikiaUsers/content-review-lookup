//<nowiki>
$(function() {
 
// set these in accordance with your wiki's warning templates (without "Plantilla:")
var warn_templates = ["Test1", "Test2", "Warn3", "No Vandal", "Error1", "Error2", "Pfnepu", "Pvn1", "Pvn2", "RDT", "Warnfl", "Registro_de_amuletos_1", "Registro_de_amuletos_2", "Gemw1", "Gemw2"];
 
// whether a user may rollback edits and block users
var is_sysop = $.inArray('sysop', wgUserGroups) > -1;
var is_rollback = is_sysop || $.inArray('rollback', wgUserGroups) > -1;
 
// add settings to the page
$('#rcp_settings').empty().append('Espacio de nombre:' +
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
$select.append('<option>Todos</option><option value="0">(Principal)</option>');
 
for(var i = 1; i < 200; i++) {
	if(typeof wgFormattedNamespaces[i] !== "undefined") {
		$select.append('<option value="' + i + '">' + wgFormattedNamespaces[i] + '</option>');
	}
}
 
$('#namespace_s').append($select);
 
$('#limit_s').empty().append('<label for="limit">Número de ediciones a tomar: </label><input type="text" id="limit" maxlength="3" size="1" value="50" />');
$('#anon_s').empty().append('<label for="anon">Solo mostrar usuarios anónimos: </label><input type="checkbox" id="anon" />');
$('#minor_s').empty().append('<label for="minor">Solo mostrar ediciones mayores: </label><input type="checkbox" id="minor" />');
$('#since_s').empty().append('<label for="since">Mostrar ediciones desde: </label><input type="text" id="rcsince" />');
$('#submit_s').empty().append('<button type="button" id="go">Cargar</button>');
$('#go').click(function() {
	$('#go').attr('disabled', 'disabled').text('Cargando...');
	go();
});
$('#go').after('<br /><span style="display:none;" id="commands-toggle">Comandos:<textarea id="commands" rows="2" cols="5" /></span>');
 
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
			'titles': 'Muro:' + user,
			'indexpageids': true
		},
		success: function(response) {
			var page = response.query.pages[response.query.pageids[0]];
			$.post( wgServer + '/api.php',
				{
					'action': 'edit',
					'title': 'Muro:' + user,
					'appendtext': '\n{{subst:' + $('#warn-templates').val() + '}} ~~~~',
					'token': edittoken,
					'minor': 'yes',
					'summary': 'Aviso: a través de la [[Project:Patrulla de CR|]]',
					'basetimestamp': page.missing ? page.revisions[0].timestamp : '',
					'starttimestamp': starttimestamp
				},
				function(response) { },
				'json'
			);
			$('#warn-form').empty().append('<span style="color:green;">advertido</span>'); 
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
			'titles': 'MediaWiki:Common.js',
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
			'summary': $('#summary').val() + ' (a través de la [[Project:Patrulla de CR|]])',
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
			$('#nav').empty().append('Resumen: <input id="summary" type="textbox"/ > <button id="save">Guardar</button> <a id="cancel">cancelar</a>');
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
	$('#cur-diff').empty().append('<span style="font-weight:bold;">Cargando...</span>');
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
 
			$('#diff tr:first-child td.diff-lineno:first-child').append(' <small><a id="edit-3">(editar)</a></small>');
			$('#edit-3').click(function() { edit_form(3, i); });
			$('#diff tr:first-child td.diff-lineno:nth-child(2)').append(' <small><a id="edit-4">(editar)</a></small>');
			$('#edit-4').click(function() { edit_form(4, i); });
		}
	});
}
 
/*
 * Provide a link to view the difference between the shown diff and the current revision
 * @param: i, the index of the revision in the revIds array
 */
function not_top(i) {
	$('#cur-link').empty().append('<a id="cur-diff">comparar con revisión actual</a>');
	$('#cur-diff').click(function() { show_cur(i) });
	$('#prev-diff').click(function() {
		$('#compare-toggle').toggle();
		$('#prev-diff').toggle();
		$('#cur-diff').empty().append('comparar con revisión actual');
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
	$('#cur-link').empty().append('<span style="font-weight:bold;">revisión más reciente</span>');
	// show the rollback option if the user is a sysop or has rollback rights
	if(is_rollback) {
		$('#diff-options').append(' &bull; <span id="rollback-link">[<a>revertir</a>]</span>');
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
					'summary': 'Ediciones revertidas por [[Especial:Contribuciones/' + users[i] + '|' + users[i] + ']] ([[Muro:' + users[i] + '|muro]]) usando la [[Project:Patrulla de CR|]]'
				},
				success: function(response) {
					$('#rollback-link').empty().append('<span style="color:green;">revertido</span>');
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
		$('#undo-form').empty().append('<span style="color:green;">deshecho</span>');
	});
	$('#undo-summary').keydown(function(e) {
		if(e.which == 13) {
			$('#undo-go').click();
			$('#commands').focus();
			return false;
		}
	});
 
	$('#undo-form').after(  ' &bull; <span id="warn-form">' +
					'<a id="warn-link">advertir</a>' +
					'<span id="warn-toggle" style="display:none;">' +
						'<select id="warn-templates" />' +
						'<button id="warn-go">Advertir</button>' +
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
		$('#diff-options').append(' &bull; <span id="block-form"><a id="block-link">bloquear</a>&nbsp;<span id="block-toggle" style="display: none;">' +
					'<select id="block-duration">' +
						'<option value="2 hours">2 horas</option>' +
						'<option value="1 day">1 día</option>' +
						'<option value="3 days">3 días</option>' +
						'<option value="1 week">1 semana</option>' +
					'</select>&nbsp;' +
					'Resumen: <input type="textbox" id="block-reason" />&nbsp;' +
					'<button id="block-go">Bloquear</button></span></span>');
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
 
	$('#nav').empty().append('<button type="button" id="prev_b">Anterior</button><button type="button" id="next_b">Siguiente</button>');
	if(i > 0)
		$('#prev_b').click(function() { show_diff(i-1); });
	else
		$('#prev_b').attr('disabled', '');
	if(i < revIds.length - 1)
		$('#next_b').click(function() { show_diff(i+1); });
	else
		$('#next_b').attr('disabled', '');
 
	$('#diff tr:first-child td.diff-lineno:first-child').append(' <small><a id="edit-1">(editar)</a></small>');
	$('#edit-1').click(function() { edit_form(1, i); });
 
	$('#diff tr:first-child td.diff-lineno:nth-child(2)').append(' <small><a id="edit-2">(editar)</a></small>');
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
		else if(e.which == 85) { // 'd'
			$('#commands').val('');
			$('#undo-link').click();
			$('#undo-summary').focus();
			return false;
		}
		else if(e.which == 87) { // 'a'
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
			if($('#prev-diff').css('display') == 'ning')
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
			'summary': 'Revisión ' + revIds[i] + ' deshecha por [[Especial:Contribuciones/' + users[i] + '|' + users[i] + ']] ([[Muro:' + users[i] + '|muro]]) usando la [[Project:Patrulla de CR|]]' + summary,
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
			'reason': $('#block-summary').val() + '(bloqueado mediante la [[Project:Patrulla de CR|]])'
		},
		success: function(response) {
			$('#block-form').empty().append('<span style="color:green;">bloqueado</span>');
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
	$('#rcp-loading').empty().append("Cargando...<br />Generando lista...");
 
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
								$('#go').text('Cargando diferencias...');
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
		$('#rcp-loading').append('<br />Esperando por respuesta del servidor...');
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
						'<span id="prev-diff" style="font-weight:bold; display:none;"><a>Volver a dif</a><hr /></span>' +
						'<span id="diff-options"></span>'+
						'<div id="nav"></div>'+
						'<span style="display:none; font-weight:bold;">Cargando...</span>'+
						'<span style="font-weight:bold; display:none;" id="compare-toggle">Comparación con revisión actual:</span><hr />'+
						'<table class="diff">'+
							'<div id="diff"></div>'+
						'</table>');
 
		$('#article').empty().append('<h1>' +
						'<a href="/wiki/' + pages[i] + '" target="_blank">' + pages[i] + '</a> ' +
						'<small>(<a href="/index.php?diff=prev&oldid=' + revIds[i] + '" target="_blank">ver dif</a>)</small>' +
					     '</h1>');
 
		var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre","Noviembre", "Diciembre"];
		var t = timestamps[i];
		t = t.substring(11,16) + ', ' + months[t.substring(5,7) - 1] + ' ' + t.substring(8,10) + ', ' + t.substring(0,4) + ' (UTC)';
 
		$('#revision').empty().append('Dif <input id="diff-num" type="text" maxlength="3" size="1" style="text-align:right;" /> de ' + revIds.length +
					      '&nbsp;<button id="diff_go">Ir</button> <br />' +
					      '<span id="rev-inner">Revisión ' + revIds[i] + ' del ' + t + ' por el usuario: <a href="/wiki/Especial:Contribuciones/' + users[i] + '" target="_blank">' + users[i] + '</a> ' +
					      '(<a href="/wiki/Muro:' + users[i] + '" target="_blank">muro</a>)<br /></span>');
		$('#diff-num').val(i + 1);
		$('#diff_go').click(function() { show_diff( $('#diff-num').val() - 1 ); });
 
		$('#comment').empty().append('Comentario: ');
 
		if(typeof comments[i] !== "undefined")
			$('#comment').append(comments[i]);
 
		$('#comment').append('<hr />');
		$('#diff-options').empty().append(' &bull; <span id="undo-form">(<a id="undo-link">deshacer</a>)' +
							'<span id="undo-toggle" style="display:none;">&nbsp;' +
								'<input type="text" id="undo-summary" />'+
								'<button id="undo-go">Guardar</button>' +
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
			$('#rcp-loading').append(' Hecho.</br />Enviando peticiones... <span id="parsing-done"></span>');
			parse_diffs();
		}
	});
 
	get_edit_info();
}
 
});
//</nowiki>
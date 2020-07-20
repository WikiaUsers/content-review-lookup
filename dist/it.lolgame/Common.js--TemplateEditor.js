//Imported and translated from https://pl.leagueoflegends.wikia.com/wiki/MediaWiki:TemplateEditor.js

window.dataTemplates = [
	{
		'match':/template:data.+/ig,
		'before': '{'+'{'+'{'+'{'+'{1<noinclude>|champion data</noinclude>}}}|2={'+'{'+'{2|}}}|3={'+'{'+'{3|}}}|4={'+'{'+'{4|}}}|5={'+'{'+'{5|}}}\n',
		'after': '}}',
	}
];
function dataTemplateEditor() {
	window.templateEditorReady = false;
	var permision = true;
	if(typeof(wgRestrictionEdit) != 'undefined') {
		if(wgRestrictionEdit[0] == 'autoconfirmed') {
			permision = false;
			var groups = ['adminmentor', 'bot', 'autoconfirmed', 'helper', 'staff', 'sysop', 'vstf'];
			for(var x=0;x<groups.length;x++) {
				if(wgUserGroups.indexOf(groups[x]) != -1) {
					permision = true;
					break;
				}
			}
		} else if(wgRestrictionEdit[0] == 'sysop') {
			permision = false;
			var groups = ['adminmentor', 'helper', 'staff', 'sysop', 'vstf'];
			for(var x=0;x<groups.length;x++) {
				if(wgUserGroups.indexOf(groups[x]) != -1) {
					permision = true;
					break;
				}
			}
		}
	} else permision = true;
	if(!permision) return;
	
	for(var i=0;i<window.dataTemplates.length;i++)
		if(window.dataTemplates[i]['match'].test(wgPageName))
			return dataTemplateHandle(i);
}
function dataTemplateMenu(index) {
	if($('body').hasClass('skin-oasis')) {
		var nav = $('#WikiaPageHeader .wikia-menu-button');
		var def = nav.find('#ca-edit');
		var copy = def.clone().prependTo(nav.find('.WikiaMenuElement')).wrap('<li></li>').find('img').remove();
		def.append(' form')
			.attr('href', def.attr('href').replace('action=', 'teaction='))
			.attr('id', 'ca-teedit')
			.data('template', index)
			.click(function(e) {
				dataTemplateStartEditor($(this).data('template'));
				e.preventDefault();
				return false;
			});
	} else if($('body').hasClass('skin-monobook')) {
		var def = $('#p-cactions #ca-edit');
		var form = def.clone().insertBefore(def).attr('id', 'ca-teedit');
		
		form.find('a').append(' form')
			.attr('href', form.find('a').attr('href').replace('action=', 'teaction='))
			.data('template', index)
			.removeAttr('title')
			.removeAttr('primary')
			.click(function(e) {
				dataTemplateStartEditor($(this).data('template'));
				e.preventDefault();
				return false;
			});
	}
}
function dataTemplateHandle(index) {
	dataTemplateMenu(index);
	var edit = $('<input type="button" class="button secondary" id="te-edit-button" value="Edit" />')
		.data('template', index)
		.click(function() {
			dataTemplateStartEditor($(this).data('template'));
		});
	var save = $('<input type="button" class="button" id="te-save-button" value="Save" />')
		.data('template', index)
		.click(function() {
			dataTemplateSave($(this).data('template'));
		});
	var savespan = $('<span id="te-save" style="display: none;">Edit&nbsp;summary:&nbsp;<input type="text" id="te-summary" /></span>')
		.append([' ', save]);
	var retry = $('<input type="button" class="button" id="te-retry-button" style="display: none;" value="Spróbuj ponownie" />')
		.data('template', index)
		.click(function() {
			dataTemplateGetToken(wgArticleId);
		});
	var msg = $('<span id="te-error" style="display: none;"></span>');
	$('.te-controls').append([msg,' ',edit,' ',retry,' ',savespan]);
	if(/teaction\=edit/.test(location.search)) {
		dataTemplateStartEditor($(this).data('template'));
	}
}
function dataTemplateGetToken(pageid) {
	$('#te-error, #te-retry-button').fadeOut('slow');
	var url = '/api.php?format=json&action=query&prop=info%7Crevisions&intoken=edit&pageids='+pageid;
	$.ajax({
		url: url,
		dataType: 'json',
		success: function(data) {
			window.teStartTimestamp = data['query']['pages'][pageid]['starttimestamp'];
			window.teEditTimestamp = data['query']['pages'][pageid]['revisions'][0]['timestamp'];
			window.teEditToken = data['query']['pages'][pageid]['edittoken'];
			window.teTitle = data['query']['pages'][pageid]['title'];
			$('#te-save').fadeIn();
		},
		error: function(data) {
			$('#te-error').fadeIn('slow').html('There was a problem retrieving the token');
			$('#te-retry-button').fadeIn('slow');
		},
	});
	return 'asd';
}
function dataTemplateStartEditor(index) {
	location.hash = '#Parameters';
	if(!templateEditorReady) {
		templateEditorReady = true;
		template = window.dataTemplates[index];
		$('#te-edit-button').fadeOut('slow', function() {
			window.teEditToken = dataTemplateGetToken(wgArticleId);
		});
		var inputs = $('#mw-content-text .te-input');
		inputs.each(function() {
			$this = $(this);
			$this.data('value', $this.text().replace(/^\s+|\s+$/, ''));
			$this.html('<div class="old-value">'+$this.html()+'</div><div class="new-value" style="display: none;"><input type="text" /></div>');
			$this.find('input').val($this.data('value'));
		});
		inputs.find('.old-value').hide();
		inputs.find('.new-value').show();
	}
}
function dataTemplateSaveText(title, text) {
	$('#te-error, #te-retry-button').fadeOut('slow');
	if($('#te-summary').val()) var summ = 'Edited with [[MediaWiki:Common.js/TemplateEditor.js]]: '+$('#te-summary').val();
	else var summ = 'Edited with [[MediaWiki:Common.js/MediaWiki:TemplateEditor.js]]';
	$.ajax({
		url: '/api.php',
		data: {
			'format': 'json',
			'action': 'edit',
			'title': title,
			'notminor': true,
			'basetimestamp': teEditTimestamp,
			'starttimestamp': teStartTimestamp,
			'summary': summ,
			'text': text,
			'token': teEditToken,
		},
		type: 'POST',
		dataType: 'json',
		success: function(data) {
			if(data['edit'] && data['edit']['result'] == 'Success') {
				location.reload();
			} else if(data['error']) {
				$('#te-error').fadeIn('slow').html('An error occurred while saving: <span style="font-style:italic;font-size:smaller;color:#999;">'+data['error']['info']+'</span>');
			}
		},
		failure: function(data) {
			$('#te-error').fadeIn('slow').html('An error occurred while saving');
		},
	});
}
function dataTemplateSave(index) {
	template = window.dataTemplates[index];
	var values = [];
	var inputs = $('#mw-content-text .te-input .new-value input');
	var required = false;
	inputs.each(function() {
		$(this).css('border-color', '');
		var name = $(this).closest('.te-input').data('name');
		var value = $(this).val();
		if(!value) {
			if($(this).closest('.te-input').hasClass('empty'))
				return values.push('|'+pad(name)+'= '+'\n');
			if($(this).closest('.te-input').hasClass('required')) {
				$(this).css('border-color', 'red');
				return required = true;
			}
		} else
			return values.push('|'+pad(name)+'= '+value+'\n');
	});
	if(required) return;
	
	dataTemplateSaveText(teTitle, template['before']+values.join('')+template['after']);
}
function pad(str) {
   return str.length > 9 ? str : (str + '          ').slice(0,10);
}
$(dataTemplateEditor);
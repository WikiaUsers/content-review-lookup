/**
 * This script helps creating a list of filenames in a sequence.
 * @docs [[Name Sequencer]]
 * @author Ditto Duck Penguin - original script
 * @author Kofirs2634 - rewrite (i18n and UCP support)
 */
$(function() {
	if (window.NameSequencer) return;
	window.NameSequencer = true;
	
	const c = mw.config.get(['wgArticlePath', 'wgCanonicalSpecialPageName', 'wgTitle']);
	var i18n;

	$('#my-tools-menu').prepend($('<li>', { class: 'custom' }).append($('<a>', {
		text: 'Name Sequencer',
		href: c.wgArticlePath.replace('$1', 'Special:Blankpage/Name_Sequencer')
	})));

	function init() {
		$('#mw-content-text').empty()
		.append($('<a>', { href: 'https://dev.fandom.com/wiki/Name_Sequencer', text: i18n.msg('helpLink').plain(), id: 'nsq-help' }))
		.append($('<div>', { class: 'nsq-entry' })
			.append($('<strong>', { text: i18n.msg('settings').plain() }))
			.append($('<input>', { id: 'nsq-prefix', placeholder: i18n.msg('namespace').plain() }))
			.append($('<input>', { id: 'nsq-name', placeholder: i18n.msg('name').plain() }))
			.append($('<input>', { id: 'nsq-number', type: 'number', min: 0, placeholder: i18n.msg('number').plain() }))
			.append($('<input>', { id: 'nsq-suffix', placeholder: i18n.msg('suffix').plain() }))
			.append($('<input>', { id: 'nsq-extension', placeholder: i18n.msg('extension').plain() }))
			.append($('<label>', { text: i18n.msg('zero').plain() })
				.append($('<input>', { id: 'nsq-zero', type: 'checkbox' })))
			.append($('<button>', { id: 'nsq-gen', text: i18n.msg('btnGenerate').plain() }))
		)
		.append($('<div>', { class: 'nsq-entry' })
			.append($('<strong>', { text: i18n.msg('findReplace').plain() }))
			.append($('<input>', { id: 'nsq-find', placeholder: i18n.msg('find').plain() }))
			.append($('<input>', { id: 'nsq-replace', placeholder: i18n.msg('replace').plain() }))
			.append($('<button>', { id: 'nsq-fnr', text: i18n.msg('btnReplace').plain() }))
		)
		.append($('<textarea>', { cols: 75, rows: 25, id: 'nsq-result', placeholder: i18n.msg('result').plain() }));
	
		$('head').append($('<style>', { text:
			'.nsq-entry > * { margin-right: 3px }' +
			'.nsq-entry label { display: inline-block }' +
			'#nsq-help { display: block; text-align: right; font-weight: bold }'
		}));
	
		$('#nsq-gen').click(generate);
		$('#nsq-fnr').click(replace);
	}
	function generate() {
		var prefix = $('#nsq-prefix').val(), name = $('#nsq-name').val(),
			num = parseInt($('#nsq-number').val()) || 10,
			suffix = $('#nsq-suffix').val(), ext = $('#nsq-extension').val(),
			zero = $('#nsq-zero').prop('checked');
			list = '';
		if (zero) { for (i = 0; i < num; i++) list += prefix + name + i + suffix + ext + '\n' }
		else { for (i = 1; i <= num; i++) list += prefix + name + i + suffix + ext + '\n' }
		$('#nsq-result').val(list)
	}
	function replace() {
		var regexp = new RegExp($('#nsq-find').val(), 'gm'),
			replace = $('#nsq-replace').val()
		$('#nsq-result').val($('#nsq-result').val().replace(regexp, replace))
	}
	
	mw.hook('dev.i18n').add(function(i18ni) {
		i18ni.loadMessages('Name Sequencer').done(function(i18np) {
			i18n = i18np;
			i18n.useUserLang();
			if (c.wgCanonicalSpecialPageName == 'Blankpage' && c.wgTitle.match(/\/Name Sequencer/i)) init()
		})
	})
	
	importArticle({ type: 'script', article: 'u:dev:MediaWiki:I18n-js/code.js' });
})
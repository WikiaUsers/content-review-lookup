// Kindly adapted from [[w:dev:User:Demotivator/Over500Edits.js]] with permission
window.UserTagsJS = $.extend(true, window.UserTagsJS, { extensions: {} });
UserTagsJS.extensions.Over500Edits = {
	start: function(config, username) {
		var promise = $.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				action: 'parse',
				format: 'json',
				text: '{{Special:Editcount/' + username + '/0}}',
				prop: 'text',
				disablepp: 1
			},
			dataType: 'json'
		}).then(function(json) {
			var num = $(json.parse.text['*']).text().replace(/[^\d]/g, '');
			if (num && +num >= 500) {
				return ['over500club'];
			}
			return null;
		});
		return {
			tags: {
				over500club: { u: 'Senior Prankster', title:'This person has made 500 or more edits on this wiki.'}
			},
			promise: promise
		};
	}
};
$(function(){
	var api = new mw.Api();
	var langs = [
		{
			code:'en',
			nameNative:'English',
		},
		
		{
			code:'bg',
			nameNative:'български',
		},
		
		{
			code:'ca',
			nameNative:'català',
		},
		
		{
			code:'cs',
			nameNative:'čeština',
		},
		
		{
			code:'de',
			nameNative:'Deutsch',
		},
		
		{
			code:'eo',
			nameNative:'Esperanto',
		},
		
		{
			code:'es',
			nameNative:'español',
		},
		
		{
			code:'fr',
			nameNative:'français',
		},
		
		{
			code:'it',
			nameNative:'italiano',
		},
		
		{
			code:'ja',
			nameNative:'日本語',
		},
		
		{
			code:'nl',
			nameNative:'Nederlands',
		},
		
		{
			code:'pl',
			nameNative:'polski',
		},
		
		{
			code:'pt',
			nameNative:'português',
		},
		
		{
			code:'ro',
			nameNative:'română',
		},
		
		{
			code:'ru',
			nameNative:'русский',
		},
		
		{
			code:'sr',
			nameNative:'српски / srpski',
		},
		
		{
			code:'sv',
			nameNative:'svenska',
		},
		
		{
			code:'uk',
			nameNative:'українська',
		},
		
		{
			code:'zh',
			nameNative:'中文',
		},
	];
	
	api.get({
		action:'query',
		meta:'siteinfo',
		siprop:'languages',
		siinlanguagecode:mw.config.get('wgUserLanguage'),
		format:'json',
	}).done(function(data){
		langs.forEach(function(lang){
			lang.nameLocal = data.query.languages.find(function(obj){
				return obj.code === lang.code;
			})['*'];
		});
	});
	
	api.get({
		action:'query',
		meta:'siteinfo',
		siprop:'interwikimap',
		format:'json',
	}).done(function(data){
		langs.forEach(function(lang){
			lang.url = data.query.interwikimap.find(function(obj){
				return obj.prefix === lang.code;
			}).url.replace('http://', 'https://').replace('/wiki/$1', '');
		});
	});
	
	function link(page, text, lang){
		return '<td><a href="' + lang.url + mw.util.getUrl(page) + '" title="' + lang.code + ':' + page + '">' + text + '</a></td>';
	}
	
	// Administration table
	
	populateAdministrationTable(langs[0]);
	
	function populateAdministrationTable(lang){
		if ($('.administration').length === 0){
			return;
		}
		
		var validRoles = ['bot', 'bureaucrat', 'sysop', 'content-moderator', 'rollback', 'quick-answers-editor'];
		
		$.getJSON('/' + lang.code + '/api.php' +
			'?action=listuserssearchuser' +
			'&groups=' + validRoles.join(',') +
			'&contributed=0' +
			'&limit=100' +
			'&order=ts_edit' +
			'&sort=desc' +
			'&offset=0' +
			'&format=json',
		function(result){
			var now = new Date().getTime();
			
			for (var i = 0; i < result.listuserssearchuser.result_count; i++){
				if (result.listuserssearchuser[i]){
					var username = result.listuserssearchuser[i].username;
					var numberOfEdits = result.listuserssearchuser[i].edit_count;
					var id = lang.code + '__' + username.replace(/\s/g, '_');
					var lastEdit = result.listuserssearchuser[i].last_edit_date;
					var lastEditComp = lastEdit.split(/,* /);
					var lastEditDate =
						lastEdit ?
						new Date(lastEditComp[1]+' '+lastEditComp[2]+' '+lastEditComp[3]+' '+lastEditComp[0]+' UTC').getTime()
						: 0;
					
					var roles = validRoles.filter(function(role){
						return result.listuserssearchuser[i].groups.split(', ').indexOf(role) !== -1;
					});
					
					if (roles.length > 0){
						$('.administration .placeholder').before($('<tr id="' + id + '">')
							.append(link('User:' + username, username, lang))
							.append('<td>'+roles.join(', ')+'</td>')
							.append('<td>'+numberOfEdits+'</td>')
							.append(link('Special:Contributions/' + username, lastEdit, lang))
							.append('<td>'+lang.nameLocal+'</td>')
							.append('<td class="status" data-last-edit="' + lastEditDate + '"></td>')
						);
					}
				}
			}
			
			if ((langs.indexOf(lang)+1) < langs.length){
				populateAdministrationTable(langs[langs.indexOf(lang)+1]);
			} else {
				$('.administration .placeholder').remove();
				$('.administration .status').each(function(){
					if (now - $(this).data('last-edit') > 157680000000){
						$(this).addClass('inactive').html('Inactive');
					} else if (now - $(this).data('last-edit') > 2592000000){
						$(this).addClass('semi-active').html('Semi-active');
					} else {
						$(this).addClass('active').html('Active');
					}
				});
			}
		});
	}
	
	// International stats table
	
	stats(langs[0]);
	
	function stats(lang){
		if ($('.international-stats').length === 0){
			return;
		}
		
		$.getJSON('/' + lang.code + '/api.php' +
			'?action=query' +
			'&meta=siteinfo' +
			'&siprop=statistics' +
			'&format=json',
		function(result){
			$('.international-stats .placeholder').before($('<tr>')
				.append(link('', lang.nameLocal, lang))
				.append(link('Category:User ' + lang.code, lang.code, lang))
				.append(link('Special:AllPages', result.query.statistics.articles, lang))
				.append(link('Special:ListFiles', result.query.statistics.images, lang))
				.append(link('Special:ListUsers', result.query.statistics.activeusers, lang))
				.append(link('Special:ListUsers/sysop', result.query.statistics.admins, lang))
			);
			
			if ((langs.indexOf(lang)+1) < langs.length){
				stats(langs[langs.indexOf(lang)+1]);
			} else {
				$('.international-stats .placeholder').remove();
			}
		});
	}
});
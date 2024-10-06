$(function(){
// does not handle MA/mu
	var langs = [
		{
			code:'en',
			nameNative:'English',
			nameEnglish:'English',
		},

		{
			code:'bg',
			nameNative:'български',
			nameEnglish:'Bulgarian',
		},

		{
			code:'ca',
			nameNative:'català',
			nameEnglish:'Catalan',
		},

		{
			code:'cs',
			nameNative:'čeština',
			nameEnglish:'Czech',
		},

		{
			code:'de',
			nameNative:'Deutsch',
			nameEnglish:'German',
		},

		{
			code:'eo',
			nameNative:'Esperanto',
			nameEnglish:'Esperanto',
		},

		{
			code:'es',
			nameNative:'español',
			nameEnglish:'Spanish',
		},

		{
			code:'fr',
			nameNative:'français',
			nameEnglish:'French',
		},

		{
			code:'it',
			nameNative:'italiano',
			nameEnglish:'Italian',
		},

		{
			code:'ja',
			nameNative:'日本語',
			nameEnglish:'Japanese',
		},

		{
			code:'nl',
			nameNative:'Nederlands',
			nameEnglish:'Dutch',
		},

		{
			code:'pl',
			nameNative:'polski',
			nameEnglish:'Polish',
		},

		{
			code:'pt',
			nameNative:'português',
			nameEnglish:'Portuguese',
		},

		{
			code:'ro',
			nameNative:'română',
			nameEnglish:'Romanian',
		},

		{
			code:'ru',
			nameNative:'русский',
			nameEnglish:'Russian',
		},

		{
			code:'sr',
			nameNative:'српски / srpski',
			nameEnglish:'Serbian',
		},

		{
			code:'sv',
			nameNative:'svenska',
			nameEnglish:'Swedish',
		},

		{
			code:'uk',
			nameNative:'українська',
			nameEnglish:'Ukranian',
		},

		{
			code:'zh',
			nameNative:'中文',
			nameEnglish:'Chinese',
		},
	];

// Administration table

	populateAdministrationTable(langs[0]);

	function populateAdministrationTable(lang){
		if ($('.administration').length === 0){
			return;
		}

		var validRoles = ['bot', 'bureaucrat', 'sysop', 'content-moderator', 'rollback', 'quick-answers-editor'];

		$.getJSON('/'+lang.code+'/api.php'+
			'?action=listuserssearchuser'+
			'&groups='+validRoles.join(',')+
			'&contributed=0'+
			'&limit=100'+
			'&order=ts_edit'+
			'&sort=desc'+
			'&offset=0'+
			'&format=json',
		function(result){
			var now = new Date().getTime();

			for (var i = 0; i < result.listuserssearchuser.result_count; i++){
				if (result.listuserssearchuser[i]){
					var username = result.listuserssearchuser[i].username;
					var numberOfEdits = result.listuserssearchuser[i].edit_count;
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
						$('.administration .placeholder').before($('<tr>')
							.append('<td><a href="'+mw.util.getUrl(lang.code+':User:'+username)+'">'+username+'</a></td>')
							.append('<td>'+roles.join(', ')+'</td>')
							.append('<td>'+numberOfEdits+'</td>')
							.append('<td><a href="'+mw.util.getUrl(lang.code+':Special:Contributions/'+username)+'">'+lastEdit+'</a></td>')
							.append('<td>'+lang.code+'</td>')
							.append('<td class="status"></td>')
						);
					}

					if (now - lastEditDate > 157680000000){
						$('.status:last').addClass('inactive').html('Inactive');
					} else if (now - lastEditDate > 2592000000){
						$('.status:last').addClass('semi-active').html('Semi-active');
					} else {
						$('.status:last').addClass('active').html('Active');
					}
				}
			}

			if ((langs.indexOf(lang)+1) < langs.length){
				populateAdministrationTable(langs[langs.indexOf(lang)+1]);
			} else {
				$('.administration .placeholder').remove();
			}
		});
	}

// International stats table

	stats(langs[0]);

	function stats(lang){
		if ($('.international-stats').length === 0){
			return;
		}

		$.getJSON('/'+lang.code+'/api.php'+
			'?action=query'+
			'&meta=siteinfo'+
			'&siprop=statistics'+
			'&format=json',
		function(result){
			$('.international-stats .placeholder').before($('<tr>')
				.append('<td><a href="/'+lang.code+'/wiki/">'+lang.nameEnglish+'</a></td>')
				.append('<td><a href="/wiki/Category:User '+lang.code+'">'+lang.code+'</a></td>')
				.append('<td><a href="/'+lang.code+'/wiki/Special:AllPages">'+result.query.statistics.articles+'</a></td>')
				.append('<td><a href="/'+lang.code+'/wiki/Special:ListFiles">'+result.query.statistics.images+'</a></td>')
				.append('<td><a href="/'+lang.code+'/wiki/Special:ListUsers">'+result.query.statistics.activeusers+'</a></td>')
				.append('<td><a href="/'+lang.code+'/wiki/Special:ListUsers/sysop">'+result.query.statistics.admins+'</a></td>')
			);

			if ((langs.indexOf(lang)+1) < langs.length){
				stats(langs[langs.indexOf(lang)+1]);
			} else {
				$('.international-stats .placeholder').remove();
			}
		});
	}
});
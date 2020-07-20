//rewritten by [[m:User:Hoo man]]; 2012-08-26, adapted by [[user:Obersachse]]
mw.loader.using('mediawiki.util', function() {
	var userSet = {
	'A' : ['A.I.', 'Abiyoyo', 'Adavyd', 'Aleksandrit', 'Alex Smotrov', 'Alex Spade', 'Alma Pater', 'Altes', 'Andreykor', 'Atorero', 'Be nt all', 'Bezik', 'Biathlon', 'Bilderling', 'Blacklake', 'Bogdanpax', 'Butko', 'Cantor', 'Carn', 'Cemenarist', 'CodeMonk', 'Convallaria majalis', 'Ctac', 'Daryona', 'David.s.kats', 'D.bratchuk', 'Dmitry89', 'Dmitry Rozhkov', 'Drbug', 'DR', 'Dinamik', 'Dodonov', 'El-chupanebrej', 'Eleferen', 'Elmor', 'Evacat', 'Goga312', 'Grebenkov', 'Gruznov', 'Ghuron', 'Ilya Voyager', 'Infovarius', 'INSAR', 'Insider', '', 'Jackie', 'JukoFF', 'Kalan', 'Kovani', 'Letzte*Spieler', 'Lite', 'Melirius', 'Michgrig', 'Mitrius', 'Neon', 'Niklem', 'OneLittleMouse', 'Petrov Victor', 'PtQa', 'Putnik', 'Rave', 'Samal', 'Serguei S. Dukachev', 'Shakko', 'ShinePhantom', 'Sigwald', 'Stauffenberg',  'TenBaseT', 'Testus', 'Torin', 'Tosha', 'VasilievVV', 'Victoria', 'Vlsergey', 'Volkov', 'Wanderer777', 'Wanwa', 'Wind', 'WindEwriX', 'Wulfson', 'АлександрВв', 'Андрей Романенко', 'Джекалоп', 'Ликка', 'Мастер теней', 'С. Л.', 'Сайга20К', 'Якушев Илья'],
	'B' : ['Artem Korzhimanov', 'Lazyhawk', 'Levg', 'Obersachse', 'Rubin16', 'Vladimir Solovjev'],
	'C' : ['DR', 'Ilya Voyager', 'Wind', 'Wulfson'],
	'I' : ['91i79', 'Alexey Nechay', 'Aserebrenik', 'Bot89', 'Changall', 'Charmbook', 'Christian Valentine', 'Deinocheirus', 'Dimitris', 'Doomych', 'Drakosh', 'Emaus', 'EugenG', 'FlankerFF', 'Haffman', 'Horim', 'Iluvatar', 'Kobac', 'Krassotkin', 'Lychagin', 'Marina99', 'Matty Dean', 'MaxBioHazard', 'Maykel', 'NBS', 'Nikita Kozyrev', 'Pasteurizer', 'Pessimist2006', 'Postoronniy-13', 'Raise-the-Sail', 'Saint Johann', 'Sealle', 'Sergeisemenoff', 'Sir Shurf', 'Skydrinker', 'The Wrong Man', 'Trykin', 'Qweedsa', 'Scorpion-811', 'Vajrapani', 'Zooro-Patriot', 'Yuri Che', 'Александр Русский', 'Дядя Фред', 'Обывало', 'Рулин', 'Скороварка', 'Синдар', 'Спиридонов Илья', 'Тара-Амингу'],
	'O' : ['Blacklake', 'Levg'],
	'K' : ['Anonim.one', 'Biathlon', 'Petrov Victor', 'PtQa', 'TenBaseT', 'Дядя Фред'],
	'Ar' : ['DR', 'Generous', 'Victoria', 'Vladimir Solovjev', 'Vlsergey'],
	'Ar+' : ['Michgrig', 'VasilievVV']
	};

	var userSetTip = {
	'A':'администратор',
	'B':'бюрократ',
	'C':'checkuser',
	'I':'подводящий итоги',
	'O':'ревизор',
	'K':'клерк',
	'Ar':'арбитр',
	'Ar+':'резервный арбитр'};

	$(document).ready(function() {
		mw.util.addCSS('tt.userflags {color:#0645ad}');
		mw.util.$content.find('a').each( function(i, lnk) {
			if( /[?#]/.test(lnk.href) && lnk.href.indexOf('redlink=1') === -1 ) {
				return;
			}
			var mm, f, user, flags, tips;
			mm = /^Участни(к|ца):(.*)/.exec(lnk.title);
			if( !mm ) {
				return;
			}
			user = decodeURIComponent(mm[2]);
			if (lnk.className.indexOf('new') !== -1) {
				user = user.replace(/ \([^\)]+\)$/,'');
			}
			flags = []; tips = [];
			for( f in userSet ) {
				if($.inArray( user, userSet[f] ) !== -1 ){
					flags.push(f);
					tips.push(userSetTip[f]);
				}
			}
			if( !flags.length ) {
				return;
			}

			tips = ' ('+tips.join(', ')+')';

			$(lnk)
			.after('\u00A0', '<tt class=userflags title="'+tips+'">('+flags.join(',') + ')</tt>')
			.attr('title', $(lnk).attr('title') +  tips);

		});
	});
});
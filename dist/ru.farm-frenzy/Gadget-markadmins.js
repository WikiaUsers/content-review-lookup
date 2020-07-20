// rewritten by [[m:User:Hoo man]]; 2012-08-26, adapted by [[user:Obersachse]], optimized by [[У:Jack who built the house]]
(function () {

var userSet = {
	'A' : ['Ysernames5', 'Энгри', 'Мега-Богдан', 'Арсений Иванов', '91i79', 'Abiyoyo', 'Alex Spade', 'Alma Pater', 'Altes', 'AndreyIGOSHEV', 'Andreykor', 'Be nt all', 'Bezik', 'Biathlon', 'Bilderling', 'Butko', 'Christian Valentine', 'CodeMonk', 'Convallaria majalis', 'Ctac', 'D.bratchuk', 'Deinocheirus', 'Dima st bk', 'Dinamik', 'Dmitry89', 'Dodonov', 'DonRumata', 'DR', 'Draa kul', 'Drbug', 'DZ', 'El-chupanebrej', 'Fedor Babkin', 'GAndy', 'Ghuron', 'Grebenkov', 'Infovarius', 'INSAR', 'Insider', 'JukoFF', 'Kalan', 'Melirius', 'Michgrig', 'Mihail Lavrov', 'Mitrius', 'NBS', 'Neon', 'Niklem', 'OneLittleMouse', 'Petrov Victor', 'PtQa', 'Putnik', 'Q-bit array', 'Sealle', 'SerSem', 'Shakko', 'ShinePhantom', 'Sigwald', 'Tatewaki', 'TenBaseT', 'Testus', 'Track13', 'Vajrapani', 'Victoria', 'Vlsergey', 'Volkov', 'Wanderer777', 'Well-Informed Optimist', 'WindEwriX', 'Wulfson', 'Zanka', 'АлександрВв', 'Андрей Романенко', 'Джекалоп', 'Йо Асакура', 'Ле Лой', 'Мастер теней', 'Тара-Амингу', 'Томасина'],
	'B' : ['Мега-Богдан', 'Adavyd', 'Lazyhawk', 'Levg', 'Rubin16', 'Sir Shurf', 'Vladimir Solovjev'],
	'C' : ['DR', 'OneLittleMouse', 'Q-bit array', 'Wulfson', 'Ле Лой'],
	'E' : ['Force majeure', 'Iniquity', 'Jack who built the house', 'Saint Johann'],
	'I' : ['Alexander Roumega', 'Alexei Kopylov', 'AnimusVox', 'Carpodacus', 'Changall', 'Charmbook', 'Dimetr', 'Dmitry Rozhkov', 'Dogad75', 'Drakosh', 'Emaus', 'EugenG', 'FlankerFF', 'Gamliel Fishkin', 'Hercules63', 'Ignatus', 'Iluvatar', 'Jackie', 'Karachun', 'Krassotkin', 'Lingveno', 'Max Guinness', 'Maxinvestigator', 'Meiræ', 'MisterXS', 'Neolexx', 'Oleg Yunakov', 'Oleksiy.golubov', 'Postoronniy-13', 'Qweedsa', 'Raise-the-Sail', 'RasabJacek', 'Saint Johann', 'Scorpion-811', 'Sergeisemenoff', 'UnderTheDome', 'VasilievVV', 'Vyacheslav84', 'Wanwa', 'Zooro-Patriot', 'Александр Русский', 'Викиенот', 'Дворецкий', 'Есстествоиспытатель', 'Золоторёв Павел', 'Лука Батумец', 'Обывало', 'Полиционер', 'Рулин', 'Седьмая волна', 'Уљар', 'Фил Вечеровский'],
	'O' : ['Altes', 'DR', 'Vladimir Solovjev', 'Levg'],
	'K' : ['Michgrig', 'Petrov Victor', 'Q-bit array', 'Фил Вечеровский'],
	'Ar': ['Biathlon', 'Deinocheirus', 'GAndy', 'Melirius', 'TenBaseT']
};

// Участники, у которых в подписи стоит только ссылка на обсуждение
var usersWithTalkLinkInSignature = ['Йо Асакура', 'Мастер теней', 'Уљар'];

var userSetTips = {
	'A' : 'администратор',
	'B' : 'бюрократ',
	'C' : 'проверяющий участников',
	'E' : 'инженер',
	'I' : 'подводящий итоги',
	'O' : 'ревизор',
	'K' : 'клерк',
	'Ar': 'арбитр'
};

function addCSS(css) {
	var styleElem = document.createElement('style');
	styleElem.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(styleElem);
}

function markadmins($content) {
	// console.log((-lastTime + (lastTime = $.now())) + ' - started');
	if (!$content.length) {
		// console.log((-lastTime + (lastTime = $.now())) + ' - content element not found');
		return;
	}
	runNum++;
	if (runNum === 1) {
		addCSS('\
			tt.userflags { color:#0645ad; }\
			.userflags-wrapper { -moz-user-select:none; }\
		');
	}

	// Фильтрация по свойству title ускоряет общее выполнение, кроме оочень длинных страниц,
	// где два селектора накладны.
	var $links = $content.find('a[title^="Участни"], a[title^="Обсуждение участни"]');

	// Чтобы не гонять по второму кругу, если количество ссылок на странице не изменилось.
	// А при третьем выполнении гонять надо, так как его могут запускать скрипты автоматического
	// обновления СН и подобные, заменяющие текст страницы.
	if (runNum === 2) {
		if ($links.length === prevLinksCount) {
			// console.log((-lastTime + (lastTime = $.now())) + ' - links count not changed');
			return;
		} else {
			if ($links.length > prevLinksCount) {
				$links = $links.slice(prevLinksCount);
				// console.log('links count: +' + $links.length);
			} else {
				var msg = 'MediaWiki:Gadget-markadmins.js: Нестандартная ситуация: количество ссылок на втором проходе (' + $links.length + ') меньше, чем на первом (' + prevLinksCount + '). Снова обходим все ссылки.';
				if (console.info) {
					console.info(msg);
				} else {
					console.log(msg);
				}
			}
		}
	}

	$links.each(function (i, link) {
		if (/[?#]/.test(link.href) && link.href.indexOf('redlink=1') === -1) {
			return;
		}
		var matches, user, flags, tips, flag;
		matches = /^Участни(?:к|ца):(.+)|Обсуждение участни(?:ка|цы):(.+)/.exec(link.title);
		if (!matches) {
			return;
		}
		if (matches[2] && usersWithTalkLinkInSignature.indexOf(matches[2]) !== -1) {
			if (!$(link).parent().hasClass('mw-usertoollinks') && $(link).text().indexOf('обс') === -1) {
				matches[1] = matches[2];
			} else {
				return;
			}
		} else if (!matches[1]) {
			return;
		}
		user = decodeURIComponent(matches[1]);
		if (link.className.indexOf('new') !== -1) {
			user = user.replace(/ \([^\)]+\)$/, '');
		}
		flags = []; tips = [];
		for (flag in userSet) {
			if ($.inArray(user, userSet[flag]) !== -1) {
				flags.push(flag);
				tips.push(userSetTips[flag]);
			}
		}
		if (!flags.length) {
			return;
		}

		tips = ' (' + tips.join(', ') + ')';

		// Без jQuery здесь общее ускорение вдвое
		var spanElem = document.createElement('span');
		spanElem.className = 'userflags-wrapper';
		var nbspElem = document.createTextNode('\u00A0');
		var ttElem = document.createElement('tt');
		ttElem.className = 'userflags';
		ttElem.title = tips;
		var flagsElem = document.createTextNode('(' + flags.join(',') + ')');

		ttElem.appendChild(flagsElem);
		spanElem.appendChild(nbspElem);
		spanElem.appendChild(ttElem);

		link.parentNode.insertBefore(spanElem, link.nextSibling);
		link.title = link.title + tips;
	});

	prevLinksCount = $links.length;
	// console.log((-lastTime + (lastTime = $.now())) + ' - finished');
}

var runNum = 0;
var prevLinksCount;
var lastTime = $.now();
markadmins($('#mw-content-text'));  // Ранняя пробежка во избежание поздних скачков текста на странице
mw.hook('wikipage.content').add(markadmins);

}());
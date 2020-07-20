// <pre>
/*
 * UserWikiInfo v4.1: Una colección de enlaces útiles relacionados con el usuario que aparece en contribuciones, página de usuario y discusión, con recuento de ediciones y avatar, para Monobook
 *
 * Copyright (C) 2010-2016  Jesús Martínez Novo ([[User:Ciencia Al Poder]])
 *
 * This program is free software; you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation; either version 2 of the License, or
 *   (at your option) any later version
 *
 * @requires: mediawiki.api, jquery.ui.dialog, jquery.form
*/
(function($, mw) {
	'use strict';
	var elLenguaje = mw.config.get('wgUserLanguage');
 	switch(elLenguaje) {
 		case "es":
 			var _tmpl = '<div class="useravatar"><a title="Avatar de {U}"><img src="https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100" width="100" height="100" alt="Avatar" /></a></div>' + '<span class="userlink"><a title="Página de usuario">Usuario:{U}</a></span> &#124; <span class="talklink"><a title="Página de discusión">Discusión</a> </span>{email} &#124; <span class="contribslink"><a title="Contribuciones de usuario">Contribuciones</a></span>{group}' + '<div class="contribdetails"></div>',
			_blogtmpl = ' &#124; <span class="bloglink"><a href="/wiki/User_blog:{u}" title="Ir a los blogs del usuario">Blogs</a></span>',
			_contrtmpl = '{U} ha realizado {c} ediciones desde el {fe}<br /><span class="contenteditcount"><a href="/wiki/Especial:Editcount/{U}" title="{cu} ediciones (el {r}% del total) se han hecho en artículos, categorías, imágenes y plantillas. Ver estadísticas avanzadas."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
			_grouptmpl = ' &#124; <span class="usergroups" title="Grupos a los que pertenece el usuario">Grupos: {g}</span>',
			_nosuchuser = 'El usuario no existe',
			_editavatar = 'Cambiar avatar',
			_editavatardescription = 'Selecciona una imagen desde tu PC para utilizar como tu avatar. Debería tener forma cuadrada (misma altura que anchura). Si la imagen es alargada se recortará, por lo que puede quedar deformada. Es recomendable que la edites primero en un programa de edición de imágenes para que tenga estas dimensiones. El tamaño óptimo es 150x150px.',
			_previewsaveavatar = 'Esta es la imagen que has subido y que se usará como avatar. Si estás de acuerdo, confirma el cambio. Ten en cuenta que podría seguir mostrándose el anterior por un tiempo debido a que tu navegador ha guardado la versión antigua. Si al aceptar ves la imagen que acabas de subir es que todo ha ido bien.',
			_saveavatar = 'Aplicar el nuevo avatar',
			_datefm = '{d} de {m} de {y}',
			_months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
			_groupseparator = ', ',
			_groups = {
				bureaucrat: '<a href="/wiki/Project:Administradores">burócrata</a>',
				sysop: '<a href="/wiki/Project:Administradores">administrador</a>',
				rollback: '<a href="/wiki/Special:ListUsers/rollback">reversor</a>',
				chatmoderator: '<a href="/wiki/Ayuda:Chat#Moderadores_de_Chat">moderador (chat)</a>',
				"content-moderator": '<a href="/wiki/Ayuda:Privilegios_de_usuario#Moderador_de_contenido">moderador (contenido)</a>',
				threadmoderator: '<a href="/wiki/Ayuda:Privilegios_de_usuario#Moderador_de_discusiones">moderador (discusiones)</a>',
				bot: '<a href="/wiki/Help:Bots">bot</a>',
				'fb-user': false,
				'*': false,
				user: false,
				autoconfirmed: false,
				emailconfirmed: false,
				poweruser: false
			};
 			break;
 		case "pl":
 			var _tmpl = '<div class="useravatar"><a title="{U}\'s avatar"><img src="https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100" width="100" height="100" alt="Avatar" /></a></div>' + '<span class="userlink"><a title="User page">User:{U}</a></span> &#124; <span class="talklink"><a title="User talk page">User talk</a> </span>{email} &#124; <span class="contribslink"><a title="User\'s contributions">Contributions</a></span>{group}' + '<div class="contribdetails"></div>',
			_blogtmpl = ' &#124; <span class="bloglink"><a href="/wiki/User_blog:{u}" title="Przejdź do blogu użytkownika">Blog</a></span>',
			_contrtmpl = '{U} dokonał {c} edycji od {fe}<br /><span class="contenteditcount"><a href="/wiki/special:Editcount/{U}" title="{cu} edycje w przestrzeni głównej ({r}% łącznie) zostały dokonane w artykułach, kategoriach, zdjęciach i szablonach. Zobacz statystyki"><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
			_grouptmpl = ' &#124; <span class="usergroups" title="Ten użytkownik należy do następujących grup">Uprawnienia: {g}</span>',
			_nosuchuser = 'Konto tego użytkownika nie zostało zarejestrowane',
			_editavatar = 'Zmień awatar',
			_editavatardescription = 'Wybierz zdjęcie ze swojego dysku. Powinno ono zawierać tę samą wysokość i szerokość, gdyż w przeciwnym razie Twój awatar zostanie przycięty. Rekomenduje się edycję zdjęcia celem zachowania prawidłowych proporcji (150x150px powinno wystarczyć)',
			_previewsaveavatar = 'To jest zdjęcie, które przesłałeś i które będzie Twoim nowym awatarem. Jeżeli wszystko poszło po Twojej myśli, zapisz zmiany. Miej na uwadze, że Twój poprzedni awatar może być wyświetlany jeszcze przez jakiś czas, ze względu na fakt że przeglądarka wciąż może mieć zapisaną dawną wersję. Jeżeli ujrzysz swój nowy awatar, będzie to znaczyć, że wszystko się zgadza.',
			_saveavatar = 'Zapisz swój nowy awatar',
			_datefm = '{d} {m} {y}',
			_months = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'],
			_groupseparator = ', ',
			_groups = {
				bureaucrat: 'biurokrata',
				sysop: 'administrator',
				rollback: 'rollback',
				chatmoderator: 'moderator czatu',
				"content-moderator": 'moderator treści',
				threadmoderator: 'moderator dyskusji',
				bot: 'bot',
				'fb-user': false,
				'*': false,
				user: false,
				autoconfirmed: false,
				emailconfirmed: false,
				poweruser: false
			};
			break;
 		case "be":
 			var _tmpl = '<div class="useravatar"><a title="Аватар удзельніка {U}"><img src="https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100" width="100" height="100" alt="Avatar" /></a></div>' + '<span class="userlink"><a title="Старонка ўдзельніка">Удзельнік:{U}</a></span> &#124; <span class="talklink"><a title="Старонка абмеркавання ўдзельніка">Абмеркаванне ўдзельніка</a> </span>{email} &#124; <span class="contribslink"><a title="Унёсак удзельніка">Унёсак</a></span>{group}' + '<div class="contribdetails"></div>',
			_blogtmpl = ' &#124; <span class="bloglink"><a href="/wiki/User_blog:{u}" title="Спіс блогаў удзельніка">Блогі</a></span>',
			_contrtmpl = '{U} зрабіў(ла) {c} правак з {fe}<br /><span class="contenteditcount"><a href="/wiki/special:Editcount/{U}" title="{cu} правак ({r}% ад агульнага ліку) былі зроблены ў артыкулах, катэгорыях, выявах і шаблонах. Гл. статыстыку."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
			_grouptmpl = ' &#124; <span class="usergroups" title="Удзельнік прыналежыць да наступных груп">Групы: {g}</span>',
			_nosuchuser = 'Удзельнік не існуе',
			_editavatar = 'Змяніць аватар',
			_editavatardescription = 'Выберыце выяву з прылады. Яна павінна мець аднолькавую вышыню і шырыню. Калі выява не мае слушных прапорцый, яна будзе абрэзана. Рэкамендуецца спачатку адрэдагаваць выяву, каб атрымаць слушныя прапорцыі (150x150px павінна быць добра)',
			_previewsaveavatar = 'Гэта выява, якую вы загрузілі, і будзе вашым новым аватарам. Калі вы згодны з гэтым, захавайце аватар. Майце на ўвазе, што ваш папярэдні аватар можа адлюстроўвацца некаторы час, таму што ваш браўзар захаваў старую версію. Калі вы захоўваеце і бачыце новую выяву, гэта азначае, што ўсё ў парадку.',
			_saveavatar = 'Захаваць новы аватар',
			_datefm = ' {d} {m} {y} гады',
			_months = ['студзеня', 'лютага', 'сакавіка', 'красавіка', 'траўня', 'чэрвеня', 'ліпеня', 'жніўня', 'верасня', 'кастрычніка', 'лістапада', 'снежня'],
			_groupseparator = ', ',
			_groups = {
				bureaucrat: '<a href="/wiki/Special:ListUsers/bureaucrat">бюракрат</a>',
				sysop: '<a href="/wiki/Special:ListAdmins">адміністратар</a>',
				rollback: '<a href="/wiki/Special:ListUsers/rollback">адкатчык</a>',
				chatmoderator: '<a href="/wiki/Special:ListUsers/chatmoderator">мадэратар чату</a>',
				"content-moderator": '<a href="/wiki/Special:ListUsers/content-moderator">мадэратар кантэнту</a>',
				threadmoderator: '<a href="/wiki/Special:ListUsers/threadmoderator">мадэратар абмеркаванняў</a>',
				bot: '<a href="/wiki/Special:ListUsers/bot">бот</a>',
				'fb-user': false,
				'*': false,
				user: false,
				autoconfirmed: false,
				emailconfirmed: false,
				poweruser: false
			};
			break;
 		case "ru":
 			var _tmpl = '<div class="useravatar"><a title="Аватар участника {U}"><img src="https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100" width="100" height="100" alt="Avatar" /></a></div>' + '<span class="userlink"><a title="Страница участника">Участник:{U}</a></span> &#124; <span class="talklink"><a title="Страница обсуждения участника">Обсуждение участника</a> </span>{email} &#124; <span class="contribslink"><a title="Вклад участника">Вклад</a></span>{group}' + '<div class="contribdetails"></div>',
			_blogtmpl = ' &#124; <span class="bloglink"><a href="/wiki/User_blog:{u}" title="Список блогов участника">Блоги</a></span>',
			_contrtmpl = '{U} сделал(а) {c} правок с {fe}<br /><span class="contenteditcount"><a href="/wiki/special:Editcount/{U}" title="{cu} правок ({r}% от общего числа) были сделаны в статьях, категориях, изображениях и шаблонах. См. статистику."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
			_grouptmpl = ' &#124; <span class="usergroups" title="Участник принадлежит к следующим группам">Группы: {g}</span>',
			_nosuchuser = 'Участник не существует',
			_editavatar = 'Сменить аватар',
			_editavatardescription = 'Выберите изображение с устройства. Оно должно иметь одинаковую высоту и ширину. Если изображение не имеет правильных пропорций, оно будет обрезано. Рекомендуется сначала отредактировать изображение, чтобы получить правильные пропорции (150x150px должно быть хорошо)',
			_previewsaveavatar = 'Это изображение, которое вы загрузили, и будет вашим новым аватаром. Если вы согласны с этим, сохраните аватар. Имейте в виду, что ваш предыдущий аватар может отображаться некоторое время, потому что ваш браузер сохранил старую версию. Если вы сохраняете и видите новое изображение, это означает, что всё в порядке.',
			_saveavatar = 'Сохранить новый аватар',
			_datefm = ' {d} {m} {y} года',
			_months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
			_groupseparator = ', ',
			_groups = {
				bureaucrat: '<a href="/wiki/Special:ListUsers/bureaucrat">бюрократ</a>',
				sysop: '<a href="/wiki/Special:ListAdmins">администратор</a>',
				rollback: '<a href="/wiki/Special:ListUsers/rollback">откатчик</a>',
				chatmoderator: '<a href="/wiki/Справка:Чат#Статус_модератора_чата">модератор чата</a>',
				"content-moderator": '<a href="/wiki/Справка:Уровни_доступа_участников#Модераторы_контента">модератор контента</a>',
				threadmoderator: '<a href="/wiki/Справка:Уровни_доступа_участников#Модераторы_обсуждений">модератор обсуждений</a>',
				bot: '<a href="/wiki/Справка:Боты">бот</a>',
				'fb-user': false,
				'*': false,
				user: false,
				autoconfirmed: false,
				emailconfirmed: false,
				poweruser: false
			};
			break;
 		case "uk":
 			var _tmpl = '<div class="useravatar"><a title="Аватар користувача {U}"><img src="https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100" width="100" height="100" alt="Avatar" /></a></div>' + '<span class="userlink"><a title="Сторінка користувача">Користувач:{U}</a></span> &#124; <span class="talklink"><a title="Сторінка обговорення користувача">Обговорення користувача</a> </span>{email} &#124; <span class="contribslink"><a title="Внесок користувача">Внесок</a></span>{group}' + '<div class="contribdetails"></div>',
			_blogtmpl = ' &#124; <span class="bloglink"><a href="/wiki/User_blog:{u}" title="Список блоґів користувача">Блоґи</a></span>',
			_contrtmpl = '{U} зробив(ла) {c} редагувань з {fe}<br /><span class="contenteditcount"><a href="/wiki/special:Editcount/{U}" title="{cu} редагувань ({r}% від загальної кількості) були зроблені в статтях, категоріях, зображеннях та шаблонах. Див. статистику."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
			_grouptmpl = ' &#124; <span class="usergroups" title="Користувач належить до наступних груп">Групи: {g}</span>',
			_nosuchuser = 'Користувач не існує',
			_editavatar = 'Змінити аватар',
			_editavatardescription = 'Оберіть зображення з пристрою. Воно мусить мати однакову висоту та ширину. Якщо зображення не має правильних пропорцій, воно буде обрізано. Рекомендується спочатку відредагувати зображення, аби отримати правильні пропорції (150x150px має бути добре)',
			_previewsaveavatar = 'Це зображення, яке ви завантажили, й буде вашим новим аватаром. Якщо ви згодні з цим, збережіть аватар. Майте на увазі, що ваш попередній аватар може відображатися деякий час, тому що ваш браузер зберіг стару версію. Якщо ви зберігаєте й бачите нове зображення, це означає, що все добре.',
			_saveavatar = 'Зберегти новий аватар',
			_datefm = ' {d} {m} {y} року',
			_months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
			_groupseparator = ', ',
			_groups = {
				bureaucrat: '<a href="/wiki/Special:ListUsers/bureaucrat">бюрократ</a>',
				sysop: '<a href="/wiki/Special:ListAdmins">адміністратор</a>',
				rollback: '<a href="/wiki/Special:ListUsers/rollback">відкатник</a>',
				chatmoderator: '<a href="/wiki/Довідка:Чат#Статус_модератора_чату">модератор чату</a>',
				"content-moderator": '<a href="/wiki/Special:ListUsers/content-moderator">модератор контенту</a>',
				threadmoderator: '<a href="/wiki/Special:ListUsers/threadmoderator">модератор обговорень</a>',
				bot: '<a href="/wiki/Довідка:Боти">бот</a>',
				'fb-user': false,
				'*': false,
				user: false,
				autoconfirmed: false,
				emailconfirmed: false,
				poweruser: false
			};
			break;
 		case "en":
 		default:
 			var _tmpl = '<div class="useravatar"><a title="{U}\'s avatar"><img src="https://images.wikia.nocookie.net/messaging/images/1/19/Avatar.jpg/revision/latest/scale-to-width-down/100" width="100" height="100" alt="Avatar" /></a></div>' + '<span class="userlink"><a title="User page">User:{U}</a></span> &#124; <span class="talklink"><a title="User talk page">User talk</a> </span>{email} &#124; <span class="contribslink"><a title="User\'s contributions">Contributions</a></span>{group}' + '<div class="contribdetails"></div>',
			_blogtmpl = ' &#124; <span class="bloglink"><a href="/wiki/User_blog:{u}" title="Go to user\'s blogs">Blogs</a></span>',
			_contrtmpl = '{U} has made {c} edits since {fe}<br /><span class="contenteditcount"><a href="/wiki/special:Editcount/{U}" title="{cu} edits ({r}% of the total) were performed on articles, categories, images, and templates. See stats."><span class="psmax"><span class="psact pslvl{l}" style="width:{r}%;"></span></span></a></span>',
			_grouptmpl = ' &#124; <span class="usergroups" title="The user belongs to the following groups">Groups: {g}</span>',
			_nosuchuser = 'The user doesn\'t exists',
			_editavatar = 'Change avatar',
			_editavatardescription = 'Select an image from your device. It should has the same height and width. If it doesn\'t has the right proportions, it will be cut out. It is recommended to edit your image first to have the right proportions (150x150px should be fine)',
			_previewsaveavatar = 'This is the image that you uploaded and will be your new avatar. If you agree with this, confirm the change. Keep in mind that your previous avatar may continue to be displayed for a while because your browser has saved the old version. If you accept and you see the new image, it means that everything is OK.',
			_saveavatar = 'Apply the new avatar',
			_datefm = '{m} {d} of {y}',
			_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			_groupseparator = ', ',
			_groups = {
				bureaucrat: '<a href="/wiki/Project:Administrators">bureaucrat</a>',
				sysop: '<a href="/wiki/Project:Administrators">administrator</a>',
				rollback: '<a href="/wiki/Special:ListUsers/rollback">rollback</a>',
				chatmoderator: '<a href="/wiki/Help:Chat#Chat_Moderators">chat moderator</a>',
				"content-moderator": '<a href="/wiki/Help%3AUser_rights#Content_Moderators">content moderator</a>',
				threadmoderator: '<a href="/wiki/Help%3AUser_rights#Discussions_Moderators">discussions moderator</a>',
				bot: '<a href="/wiki/Help:Bots">bot</a>',
				'fb-user': false,
				'*': false,
				user: false,
				autoconfirmed: false,
				emailconfirmed: false,
				poweruser: false
			};
			break;
	}
	//_avatarWidth = 100, // Initial width
	var _avatarHeight = 100, // Max height
	_avatarImg = null,
	_isIP = false,
	_userid = null,
	_username = null,
	_firstEditDate = null,
	_dlg = null,
	_fetchinginfo = false,
	_formdata = null,
	_init = function() {
		var u = null, qParams, api, cbu, sl;
		qParams = {action:'query', list:'users|usercontribs', usprop: 'groups|editcount|registration|emailable', uclimit:'1', ucdir:'newer', ucprop:'timestamp', smaxage:'3600', maxage: '3600'};
		api = new mw.Api();
		if (mw.config.get('wgNamespaceNumber', 0) === -1 && mw.config.get('wgCanonicalSpecialPageName', '') === 'Contributions') {
			u = $('.mw-contributions-form:first input[name="target"]').val();
		} else if (mw.config.get('wgNamespaceNumber', 0) == 2 || mw.config.get('wgCanonicalNamespace', '') === 'User_talk' /* This namespace is always User_talk */ || mw.config.get('wgNamespaceNumber', 0) == 1200 || mw.config.get('wgNamespaceNumber', 0) == 500) {
			u = mw.config.get('wgTitle', '');
			sl = u.indexOf('/');
			if (sl !== -1) {
				u = u.substr(0, sl);
			}
		}
		if (!u) return;
		qParams.ususers = qParams.ucuser = u;
		if (u.search(new RegExp('^\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}$')) !== -1) {
			_isIP = true;
		}
		$('#bodyContent').prepend('<div id="UserWikiInfo"></div>');
		api.get(qParams).done(_dataRecv);
	},
	_dataRecv = function(data) {
		var q = data.query, exists = true, $uwi = $('#UserWikiInfo'), u, groups, emailable, firstedit, userid, g, grouptext, api, params;
		if (typeof q.users[0].missing !== 'undefined') {
			exists = false;
		}
		u = q.users[0].name;
		groups = q.users[0].groups;
		emailable = (typeof q.users[0].emailable === 'string');
		firstedit = (q.usercontribs.length === 0 ? '' : q.usercontribs[0].timestamp);
		userid = -1;
		grouptext = '';
		api = new mw.Api();
		if (!_isIP && exists) {
			//userid = q.allusers[0].id.toString();
			userid = q.users[0].userid.toString();
		}
		u.replace(new RegExp('\<', 'g'), '&lt;').replace(new RegExp('\>', 'g'), '&gt;').replace(new RegExp('"', 'g'), '&quot;');
		if (firstedit !== '') {
			_firstEditDate = new Date(Date.UTC(firstedit.substr(0,4), parseInt(firstedit.substr(5,2),10)-1, firstedit.substr(8,2)));
		} else {
			_firstEditDate = new Date();
		}
		if (groups && groups.length > 0) {
			g = '';
			for (var i = 0; i < groups.length; i++) {
				if (_groups[groups[i]] === false) {
					continue;
				}
				if (g.length) {
					g += _groupseparator;
				}
				g += (_groups[groups[i]] || groups[i]);
			}
			if (g.length) {
				grouptext = _grouptmpl.replace(new RegExp('\\{g\\}', 'g'), g);
			}
		}
		$uwi.append(
			_tmpl.replace(
				'{email}', (emailable ? _blogtmpl : '')).replace(
				new RegExp('\\{U\\}', 'g'), u).replace(
				new RegExp('\\{u\\}', 'g'), mw.util.wikiUrlencode(u)).replace(
				'{group}', grouptext));
		$uwi.find('.useravatar > a').eq(0).attr('href', mw.util.wikiGetlink(((_isIP ? (mw.config.get('wgFormattedNamespaces')['-1'] + ':Contributions/') : (mw.config.get('wgFormattedNamespaces')['2'] + ':')) + u)));
		if (!_isIP) {
			$uwi.find('.userlink > a').eq(0).attr('href', mw.util.wikiGetlink(mw.config.get('wgFormattedNamespaces')['2'] + ':' + u));
		}
		$uwi.find('.talklink > a').eq(0).attr('href', mw.util.wikiGetlink(mw.config.get('wgFormattedNamespaces')['3'] + ':' + u));
		$uwi.find('.contribslink > a').eq(0).attr('href', mw.util.wikiGetlink(mw.config.get('wgFormattedNamespaces')['-1'] + ':Contributions/' + u));
		if (!exists) {
			$uwi.children('.contribdetails').eq(0).text(_nosuchuser);
		}
		// Contribs
		_username = u;
		_userid = userid;
		// Avatar
		if (!_isIP) {
			$.getJSON('/api/v1/User/Details/', { ids: userid }).success(_wikiaMetadata);
		}
		//if ((q.users[0].editcount||0) > 0) -- En wikia puede salir editcount a 0 aun habiendo editado
		params = {
			action: 'parse',
			text: '{{special:EditCount/{{PAGENAME}}}}|{{special:EditCount/{{PAGENAME}}/0}}|{{special:EditCount/{{PAGENAME}}/6}}|{{special:EditCount/{{PAGENAME}}/10}}|{{special:EditCount/{{PAGENAME}}/14}}',
			title: 'User:'+u,
			prop: 'text',
			disablepp: '',
			smaxage: '3600',
			maxage: '3600'
		};
		api.get(params).done(_contribsData);
	},
	_wikiaMetadata = function(data) {
		var img;
		if (mw.config.get('wgUserName', '') === _username) {
			$('<a class="editavatar" href="#">').text(_editavatar).appendTo($('#UserWikiInfo').find('.useravatar').eq(0)).on('click', function() {
				mw.loader.using(['jquery.ui.dialog', 'jquery.form', 'jquery.json'], _changeAvatar);
				return false;
			});
		}
		if (data.items && data.items.length > 0) {
			img = new Image();
			_avatarImg = img;
			img.onload = _avatarLoaded;
			img.alt = 'avatar';
			img.src = data.items[0].avatar;
		}
	},
	_avatarLoaded = function() {
		var img = _avatarImg, h = img.height;
		if (h < 1) return;
		if (h > _avatarHeight) {
			img.style.height = _avatarHeight+'px';
		}
		$('#UserWikiInfo > .useravatar img').eq(0).replaceWith(img);
	},
	_contribsData = function(data) {
		var text = data.parse.text['*'], c = 0, cu = 0, acontr = [], rate = 0, lvl = 0, d = _firstEditDate, fe = '', n;
		if (text.indexOf('class="new"') !== -1 || text.indexOf('<p>') === -1) return; // Template does not exist/sanity check
		text = text.substring(3, text.indexOf('</p>')).replace(new RegExp('[\.,]', 'g'), '');
		// Sum of each number, separated by pipes
		acontr = text.split('|');
		for (var i = 0; i < acontr.length; i++) {
			n = parseInt(acontr[i], 10);
			if (isNaN(n)) return;
			if (i === 0) {
				c = n;
			} else {
				cu += n;
			}
		}
		if (c !== 0) {
			// Multiply by 100, convert to int and divide by 100 to round to 2 decimal positions. Multiply by 100 again because it's a %
			rate = parseInt((cu*10000/c), 10)/100;
			// Level: a integer between 0 and 4 proportional to rate, to allow specific styles applied
			lvl = parseInt((cu/c*4), 10);
			// Sometimes the sum is greater than 100 (wrong cached data?). Correct it
			if (rate > 100) {
				rate = 100;
				lvl = 4;
			}
		}
		fe = _datefm.replace('{d}', d.getDate()).replace('{m}', _months[d.getMonth()]).replace('{y}', d.getFullYear());
		$('#UserWikiInfo > .contribdetails').eq(0).append(
			_contrtmpl.replace(new RegExp('\\{U\\}', 'g'), _username).replace(
				new RegExp('\\{c\\}', 'g'), c).replace(
				new RegExp('\\{cu\\}', 'g'), cu).replace(
				new RegExp('\\{l\\}', 'g'), lvl).replace(
				new RegExp('\\{r\\}', 'g'), rate).replace(
				new RegExp('\\{fe\\}', 'g'), fe));
	},
	// Método para mostrar el form de cambio de avatar. Si el argumento es string es por algun error
	_changeAvatar = function(o) {
		var bFirstDialog = false;
		if (!_dlg) {
			bFirstDialog = true;
			_dlg = $('<div id="UserWikiInfoUploadAvatar">');
		} else {
			_dlg.find('input').off().end().html('');
		}
		if (typeof o === 'string') {
			$('<div class="error">').text(o).appendTo(_dlg);
		}
		$('<p>').text(_editavatardescription).appendTo(_dlg);
		_dlg.append(
			'<form action="/wikia.php?controller=UserProfilePage&method=onSubmitUsersAvatar&format=json&userId='+_userid+'" method="post" enctype="multipart/form-data">' +
			'<input type="file" name="UPPLightboxAvatar"/></form>').find('input[type="file"]').on('change', _uploadAvatar);
		if (bFirstDialog) {
			_dlg.dialog({
				modal: true,
				title: _editavatar,
				width: 500
			});
		} else {
			_dlg.dialog('option', {height: 'auto'}).dialog('open');
		}
		// Fetch the rest of user data
		if (!_fetchinginfo && _formdata === null) {
			$.post('/wikia.php?controller=UserProfilePage&format=json', {method: 'getLightboxData', tab: 'about', userId: _userid, rand: Math.floor(Math.random()*100001)}, _fetchResult, 'json');
		}
	},
	_fetchResult = function(data) {
		if (data.body) {
			_formdata = {};
			$(data.body).find('#userData').find('input,select').each(function() {
				_formdata[this.name] = this.value;
			});
		}
		_fetchinginfo = false;
	},
	_uploadAvatar = function() {
		_dlg.find('form').eq(0).find('input').css('visibility', 'hidden').after('<span class="mw-small-spinner"></span>').end().ajaxSubmit({
			dataType: 'json',
			success: function(data) {
				try {
					if(data.result.success === true) {
						_dlg.find('input').off().end().html(
							'<div style="float:left; margin-right: 10px;"><img class="useravatar" src="'+data.result.avatar+'" /></div>').append(
							$('<p>').text(_previewsaveavatar)).append(
							'<p><input type="button" name="save" /></p>').find(
							'input[name="save"]').val(_saveavatar).on('click', _submitChanges);
						_dlg.dialog('option', {height: 'auto'}).dialog('open');
					} else {
						_changeAvatar(data.result.error);
					}
				} catch(e) {
					_changeAvatar(e.message);
				}
			},
			error: function(xhr, status, errMsg) {
				var msg = (status || '');
				if (msg.length) {
					msg += ': ' + errMsg;
				} else {
					msg = errMsg;
				}
			}
		});
	},
	_submitChanges = function() {
		_dlg.find('input').off().attr('disabled', 'disabled');
		if (_formdata === null) {
			_changeAvatar('Error: formdata null');
		}
		_formdata.avatarData = {'file': _dlg.find('img.useravatar').attr('src'), 'source': 'uploaded', 'userId': _userid};
		$.ajax({
			type: 'POST',
			url: '/wikia.php?controller=UserProfilePage&format=json&method=saveUserData',
			dataType: 'json',
			data: {
				userId: _userid,
				data: $.toJSON( _formdata ),
				token: mw.user.tokens.get('editToken')
			}
		}).done(_submitComplete).fail(function(xhr, t, e) {
			if (t === null && e !== undefined) {
				t = e.toString() + e.stack;
			}
			_changeAvatar(t);
		});
	},
	_submitComplete = function(data) {
		if (data.status === 'error') {
			_changeAvatar(data.errormsg);
		} else {
			var img = $('#UserWikiInfo').find('.useravatar').find('img');
			var src = img.attr('src');
			if (src.indexOf('?') === -1) {
				src += '?';
			}
			src += (new Date()).getMilliseconds().toString();
			img.off('load').get(0).onload = null;
			img.attr('src', src);
			_dlg.dialog('close');
		}
	};
	if (mw.config.get('wgUserGroups').indexOf('user') != -1) {
		mw.loader.using(['mediawiki.api'], function() { 
			// Don't load two modules if the wiki and the user import the code
			if (mw.config.get('skin') != 'oasis' && $('#UserWikiInfo').length < 1) {
				$(_init);
			}
		});
	}
})(jQuery, mw);
// </pre>
function QLicenseUI() {
    var options = {
        '== Лицензирование: ==\n{{CopyrightedEA|фанон}}': 'Фанон-изображение',
        '== Лицензирование: ==\n{{CopyrightedEA|сим1}}': 'Персонаж из TS1',
        '== Лицензирование: ==\n{{CopyrightedEA|ss1}}': 'Снимок экрана из TS1',
        '== Лицензирование: ==\n{{CopyrightedEA|участок1}}': 'Участок из TS1',
        '== Лицензирование: ==\n{{CopyrightedEA|сим2}}': 'Персонаж из TS2',
        '== Лицензирование: ==\n{{CopyrightedEA|ss2}}': 'Снимок экрана из TS2',
        '== Лицензирование: ==\n{{CopyrightedEA|участок2}}': 'Участок из TS2',
        '== Лицензирование: ==\n{{CopyrightedEA|сим3}}': 'Персонаж из TS3',
        '== Лицензирование: ==\n{{CopyrightedEA|ss3}}': 'Снимок экрана из TS3',
        '== Лицензирование: ==\n{{CopyrightedEA|участок3}}': 'Участок из TS3',
        '== Лицензирование: ==\n{{CopyrightedEA|сим}}': 'Персонаж из TS4',
        '== Лицензирование: ==\n{{CopyrightedEA|ss4}}': 'Снимок экрана из TS4',
        '== Лицензирование: ==\n{{CopyrightedEA|участок4}}': 'Участок из TS4',
        '== Лицензирование: ==\n{{CopyrightedEA|сими}}': 'Персонаж из «Историй»',
        '== Лицензирование: ==\n{{CopyrightedEA|участоки}}': 'Участок из «Историй»',
        '== Лицензирование: ==\n{{CopyrightedEA|ssи}}': 'Снимок экрана из «Историй»',
        '== Лицензирование: ==\n{{CopyrightedEA|симм}}': 'Персонаж из The Sims Medieval',
        '== Лицензирование: ==\n{{CopyrightedEA|ssm}}': 'Снимок экрана из Medieval',
        '== Лицензирование: ==\n{{CopyrightedEA|simкон}}': 'Персонаж из игры для консолей',
        '== Лицензирование: ==\n{{CopyrightedEA|ssкон}}': 'Снимок экрана из игры для консолей',
        '== Лицензирование: ==\n{{CopyrightedEA|ssмоб}}': 'Снимок экрана из мобильных игр',
        '== Лицензирование: ==\n{{CopyrightedEA|семья}}': 'Изображение семьи', 
        '== Лицензирование: ==\n{{CopyrightedEA|объект}}': 'Предмет',
        '== Лицензирование: ==\n{{CopyrightedEA|питомец}}': 'Питомец',
        '== Лицензирование: ==\n{{CopyrightedEA|обложка}}': 'Обложка игры',
        '== Лицензирование: ==\n{{CopyrightedEA|вос}}': 'Воспоминание',
        '== Лицензирование: ==\n{{CopyrightedEA|родословная}}': 'Изображение родословной',
        '== Лицензирование: ==\n{{CopyrightedEA|муд}}': 'Эмоция',
        '== Лицензирование: ==\n{{CopyrightedEA|мудбр}}': 'Эмоция без рамки',
        '== Лицензирование: ==\n{{CopyrightedEA|черта}}': 'Черта характера',
        '== Лицензирование: ==\n{{CopyrightedEA|зодиак}}': 'Знак зодиака',
        '== Лицензирование: ==\n{{CopyrightedEA|иконка}}': 'Иконка',
        '== Лицензирование: ==\n{{CopyrightedEA|логотип}}': 'Логотип игры',
        '== Лицензирование: ==\n{{CopyrightedEA|интерфейс}}': 'Что-то из интерфейса игры',
        '== Лицензирование: ==\n{{CopyrightedEA|промо}}': 'Рекламное изображение',
        '== Лицензирование: ==\n{{CopyrightedEA|рендер}}': 'Рендер',
        '== Лицензирование: ==\n{{CopyrightedEA|концепт}}': 'Концепт-арт',
        '== Лицензирование: ==\n{{CopyrightedEA}}': 'Что-то из серии The Sims/другое изображения, на которое имеет права EA',
        '== Лицензирование: ==\n{{Copyrighted by Wikia}}': 'Что-то из интерфейса Wikia',
        '== Лицензирование: ==\n{{Из Викимедиа}}': 'Из Викимедиа',
        '== Лицензирование: ==\n{{CC-by-sa-3.0}}': 'Находится под лицензией Creative Commons Attribution 3.0 (свободная лицензия)',
        '== Лицензирование: ==\n{{GFDL}}': 'Находится под лицензией GFDL (свободная лицензия)',
        '== Лицензирование: ==\n{{PD}}': 'Публичное достояние',
        '== Лицензирование: ==\n{{Fairuse}}': 'Авторское право',
        '== Лицензирование: ==\n{{Без лицензии}}': 'Без лицензии'
		};
		
	var optstr = '';
	for (var i in options ) {
		if ( options.hasOwnProperty( i ) ) {
			optstr += '<option value="' + i + '" style="text-align:center;">' + options[i] + '</option>';
		}
	}
 
	var html = '<p style="text-align:center;"><select id="QLicenseSelect" style="width: 45%;">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Добавить лицензию</a>';
	if($('#License').length) {
		html += '&nbsp;<span style="color:green; font-weight:bold; text-align:center;">У этого файла есть лицензия.</span></p>';
	} else {
		html += '&nbsp;<span style="color:red; font-weight:bold; text-align:center;">У этого файла нет лицензии.</span></p>';
	}
	
	$('#WikiaArticle').prepend(html);
	$('#aSubmit').click( function(event) {
		this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
		$.post("/api.php", {action: "edit", title: mw.config.get("wgPageName"), token: mw.user.tokens.values.editToken, bot: true, appendtext: $("#QLicenseSelect").val(), summary: "Лицензирование изображения."}, function (result) {
			window.location = wgServer + '/index.php?title=' + mw.config.get("wgPageName") + '&action=purge';
		});
	});
}

if ($("body").hasClass("ns-6") && $('#file').length) QLicenseUI();
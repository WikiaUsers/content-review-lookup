/* Quick image license - contains the most commonly used licensing criteria */
$(function() {
    var config = mw.config.get([
    	'wgNamespaceIds', 
    	'wgNamespaceNumber', 
    	'wgAction', 
    	'wgServer', 
    	'wgPageName',
    	'wgUserGroups'
    ]);

    if (
    	!config.wgUserGroups.includes('autoconfirmed') ||
        config.wgNamespaceIds.file !== config.wgNamespaceNumber ||
        config.wgAction !== 'view' ||
        window.QLicenseLoaded
    ) return;

    var options = {
        ' ': 'Выберите лицензию',
		        '== Лицензирование ==\n{{CopyrightedEA|фанон}}': 'Снимок экрана для фанона (персонаж, семья, снимок экрана)',
		        '== Лицензирование ==\n{{CopyrightedEA|сим1}}': 'Персонаж из The Sims',
		        '== Лицензирование ==\n{{CopyrightedEA|сим2}}': 'Персонаж из The Sims 2',
		        '== Лицензирование ==\n{{CopyrightedEA|сим3}}': 'Персонаж из The Sims 3',
                '== Лицензирование ==\n{{CopyrightedEA|сим4}}': 'Персонаж из The Sims 4',
                '== Лицензирование ==\n{{CopyrightedEA|симм}}': 'Персонаж из The Sims Medieval',
                '== Лицензирование ==\n{{CopyrightedEA|сими}}': 'Персонаж из «The Sims Истории»',
                '== Лицензирование ==\n{{CopyrightedEA|simкон}}': 'Персонаж из игр The Sims для консолей',
                '== Лицензирование ==\n{{CopyrightedEA|питомец}}': 'Питомец',
                '== Лицензирование ==\n{{CopyrightedEA|сим}}': 'Другой персонаж',
                '== Лицензирование ==\n{{CopyrightedEA|семья}}': 'Семья',
                '== Лицензирование ==\n{{CopyrightedEA|древо}}': 'Родословная',
                '== Лицензирование ==\n{{CopyrightedEA|ss1}}': 'Снимок экрана из The Sims',
                '== Лицензирование ==\n{{CopyrightedEA|ss2}}': 'Снимок экрана из The Sims 2',
                '== Лицензирование ==\n{{CopyrightedEA|ss3}}': 'Снимок экрана из The Sims 3',
                '== Лицензирование ==\n{{CopyrightedEA|ss4}}': 'Снимок экрана из The Sims 4',
                '== Лицензирование ==\n{{CopyrightedEA|ssкон}}': 'Снимок экрана из игр The Sims для консолей',
                '== Лицензирование ==\n{{CopyrightedEA|ssи}}': 'Снимок экрана из «The Sims Истории»',
                '== Лицензирование ==\n{{CopyrightedEA|ssm}}': 'Снимок экрана из The Sims Medieval',
                '== Лицензирование ==\n{{CopyrightedEA|ssмоб}}': 'Снимок экрана из мобильных игр',
                '== Лицензирование ==\n{{CopyrightedEA|объект}}': 'Объект',
                '== Лицензирование ==\n{{CopyrightedEA|вос}}': 'Воспоминание',
                '== Лицензирование ==\n{{CopyrightedEA|муд}}': 'Эмоция',
                '== Лицензирование ==\n{{CopyrightedEA|мудбр}}': 'Эмоция без рамки',
                '== Лицензирование ==\n{{CopyrightedEA|черта}}': 'Черта характера',
                '== Лицензирование ==\n{{CopyrightedEA|зодиак}}': 'Знак зодиака',
                '== Лицензирование ==\n{{CopyrightedEA|участок1}}': 'Участок из The Sims',
                '== Лицензирование ==\n{{CopyrightedEA|участок2}}': 'Участок из The Sims 2',
                '== Лицензирование ==\n{{CopyrightedEA|участок3}}': 'Участок из The Sims 3',
                '== Лицензирование ==\n{{CopyrightedEA|участок4}}': 'Участок из The Sims 4',
                '== Лицензирование ==\n{{CopyrightedEA|участокжи}}': 'Участок из «Житейских историй»',
                '== Лицензирование ==\n{{CopyrightedEA|участокип}}': 'Участок из «Историй о питомцах»',
                '== Лицензирование ==\n{{CopyrightedEA|участокир}}': 'Участок из «Историй робинзонов»',
                '== Лицензирование ==\n{{CopyrightedEA|обложка}}': 'ОФИЦИАЛЬНАЯ обложка игры',
                '== Лицензирование ==\n{{CopyrightedEA|лого}}': 'Логотип игры',
                '== Лицензирование ==\n{{CopyrightedEA|рендер}}': 'Рендер от разработчиков',
                '== Лицензирование ==\n{{CopyrightedEA|иконка}}': 'Иконка',
                '== Лицензирование ==\n{{CopyrightedEA|интерфейс}}': 'Что-то из интерфейса игры',
                '== Лицензирование ==\n{{CopyrightedEA|промо}}': 'Рекламное изображение',
                '== Лицензирование ==\n{{CopyrightedEA|концепт}}': 'Концепт-арт',
                '== Лицензирование ==\n{{CopyrightedEA}}': 'Что-то из серии игр The Sims/другое изображения, на которое имеет права EA',
                '== Лицензирование ==\n{{Copyrighted by FANDOM}}': 'Это изображение является частью интерфейса вики',
		        '== Лицензирование ==\n{{Fairuse}}': 'Авторское право',
		        '== Лицензирование ==\n{{GFDL}}': 'Этот файл носит лицензию GFDL',
		        '== Лицензирование ==\n{{Apache}}': 'Этот файл носит лицензию Apache 2.0',
		        '== Лицензирование ==\n{{CC-by-sa-4.0}}': 'Этот файл носит лицензию Creative Commons Attribution 4.0',
                '== Лицензирование ==\n{{CC-by-sa-3.0}}': 'Этот файл носит лицензию Creative Commons Attribution 3.0',
                '== Лицензирование ==\n{{CC-by-sa-2.5}}': 'Этот файл носит лицензию Creative Commons Attribution 2.5',
                '== Лицензирование ==\n{{CC-by-sa-2.0}}': 'Этот файл носит лицензию Creative Commons Attribution 2.0',
                '== Лицензирование ==\n{{CC-by-sa-1.0}}': 'Этот файл носит лицензию Creative Commons Attribution 1.0',
                '== Лицензирование ==\n{{СС0}}': 'Этот файл носит лицензию Creative Commons Attribution Zero',
                '== Лицензирование ==\n{{PD}}': 'Авторские права на этот файл истекли, или он не охраняется авторским правом',
                '== Лицензирование ==\n{{FAL}}': 'Этот файл находится под лицензией Free Art License',
                '== Лицензирование ==\n{{Self}}': 'Изображение загружено автором',
                '== Лицензирование ==\n{{Без лицензии}}': 'Я не знаю лицензию'
    };
    var optstr = '';
    for (var i in options) {
        if (options.hasOwnProperty(i)) {
            optstr += '<option value="' + i + '" style="text-align:left;padding-bottom:10px;">' + options[i] + '</option>';
        }
    }

    var html = '<p style="text-align:left;"><select id="QLicenseSelect">' + optstr + '</select>&nbsp;<a class="wikia-button" style="margin:0 1em; cursor:pointer;" id="aSubmit">Добавить лицензию</a>';
    if ($('#LicensedFile').length || $('#Лицензирование').length) {
        html += '&nbsp;<span style="color:#008000; font-weight:bold; text-align:left;">У этого файла есть лицензия.</span></p>';
    } else {
        html += '&nbsp;<span style="color:#ff0000; font-weight:bold; text-align:left;">У этого файла нет лицензии.</span></p>';
    }
    $(html).insertAfter('#filetoc');
    $('#aSubmit').click(function(event) {
        this.innerHTML = '<img src="https://images.wikia.nocookie.net/dev/images/8/82/Facebook_throbber.gif" style="vertical-align: baseline;" border="0" />';
        $.post("/ru/api.php", {
            action: "edit",
            title: config.wgPageName,
            token: mw.user.tokens.values.editToken,
            bot: true,
            appendtext: $("#QLicenseSelect").val(),
            summary: "Лицензировать изображение."
        }, function(result) {
            window.location = config.wgServer + '/ru/index.php?title=' + config.wgPageName + '&action=purge';
        });
    });
});
//
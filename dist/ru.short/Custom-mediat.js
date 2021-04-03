/* Указание размеров файлов по умолчанию в редакторе вики согласно правилам оформления статей
 * Written by Megakott for https://short.fandom.com/ru
 */

var media_t_console_error_logs = false; /* вывод ошибок в консоль выключен по умолчанию, выключается написанием в консоль "media_t_console_error_logs = true;" (без кавычек) */
var media_t_works_1 = true; /* деактивируется при нажатии */
var media_t_works_2 = true; /* деактивируется при измении параметров */

function get_events(elm) {
	var elo = Object.keys(elm);
	var elq = null;
	elo.forEach(function(els) {if (els.startsWith('jQuery')) {elq = elm[els].events;}});
	return elq;
}

function media_func() {
	if (document.querySelectorAll('.ve-ui-mwMediaDialog .ve-ui-mwMediaDialog-panel-settings .oo-ui-labelElement-label')[2].textContent != 'Имя файла') { /* чтобы не было ошибок */
		if (document.querySelectorAll('.ve-ui-mwMediaDialog .oo-ui-icon-alignLeft')[0] !== undefined) {
			var el = document.querySelectorAll('.ve-ui-mwMediaDialog .oo-ui-icon-alignLeft')[0].parentElement;
			if (!(el.parentElement.classList.contains('oo-ui-buttonElement-active'))) {
				var ev = new MouseEvent('mousedown', {
					view: window,
					bubbles: true,
					cancelable: true
				});
				el.dispatchEvent(ev);
				get_events(el).mousedown[0].handler(ev);
			}
		}
		if (document.querySelectorAll('.ve-ui-mwMediaDialog .ve-ui-mediaSizeWidget-section-sizetype > div > a')[1] !== undefined) {
			var el0 = document.querySelectorAll('.ve-ui-mwMediaDialog .ve-ui-mediaSizeWidget-section-sizetype > div > a')[1];
			if (!(el0.parentElement.classList.contains('oo-ui-buttonElement-active'))) {
				var ev0 = new MouseEvent('mousedown', {
					view: window,
					bubbles: true,
					cancelable: true
				});
				el0.dispatchEvent(ev0);
				get_events(el0).mousedown[0].handler(ev0);
			}
		}
		if (document.querySelectorAll('.ve-ui-mwMediaDialog .ve-ui-mediaSizeWidget-section-sizetype > div > a')[1] !== undefined) {
			var el1 = document.querySelectorAll('.ve-ui-mwMediaDialog .ve-ui-mediaSizeWidget-section-custom input')[0];
			el1.value = '250';
			var ev1 = new KeyboardEvent('keydown');
			el1.dispatchEvent(ev1);
			get_events(el1).keydown[0].listener(ev1);
			var ev2 = new KeyboardEvent('change');
				el1.dispatchEvent(ev2);
			get_events(el1).change[0].handler(ev2);
		}
	}
}

setInterval(function() {
	try {
		if ((media_t_works_1) && (media_t_works_2)) {
			 /* выполняется только если оба media_t_works активированы */
			media_func();
		}
	} catch (e) {
		if (media_t_console_error_logs) {
			console.log(e);
		}
	}
}, 200);


$(document).click(function(e) {
	/* пауза на секунду при клике чтобы избежать ошибок при использовании диалоговых окон */
	media_t_works_1 = false;
	setTimeout(function() {media_t_works_1 = true;}, 1000);
	
	/* приостановка скрипта при клике на дополнительные параметры и возобновление при клике на инструменты рекдатора */
	var tpth = e.originalEvent.path;
	var tptha = false;
	var tpthb = false;
	tpth.forEach(function(l) {if (l.classList !== undefined) {if (l.classList.contains('ve-ui-mwMediaDialog-panel-settings')) {if (l.getElementsByClassName('oo-ui-tabOptionWidget')[1].classList.contains('oo-ui-optionWidget-selected')) {tptha = true;}} if (l.classList.contains('oo-ui-toolGroup-tools')) {tpthb = true;}}});
	if (tptha) {
		media_t_works_2 = false;
	}
	if (tpthb) {
		media_t_works_2 = true;
	}
});
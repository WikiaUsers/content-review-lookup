/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

window.ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"]; 
window.AjaxRCRefreshText = 'Автообновление';




/* === Раздел обычного кода === */

/* Метод для отображения ника */
//insertusername
$(function UserNameReplace() {
    if(typeof(disableUsernameReplace) !== 'undefined' && disableUsernameReplace || wgUserName === null) return;
    $("span.insertusername").html(wgUserName);
});

importArticles({
    type: 'script',
    articles: [
        'w:c:dev:TopEditors/code.js'
    ]
});

/* Прочее */
mw.hook('wikipage.content').add(function () {
	const $stats = $('.enemy-stats-template');
	if ($stats.length === 0) return;
	$stats.each(function (_) {
		const $template = $(this);

		// references to necessary elements
		$template.find('td.enemy-stats-input').each(function () {
			const newElem = $('<input>', {
				'value': $(this).text()
			});
			$(this).html(newElem);
		});
		const $inputs = $template.find('td.enemy-stats-input input');
		const $magInput = $template.find('.enemy-mag-input input');
		const $decimalInput = $template.find('.enemy-decimals-input input');
		const $crystalInput = $template.find('.enemy-crystal-input input');

		const $hpCell = $template.find('.enemy-stats-hp');
		const $apCell = $template.find('.enemy-stats-ap');

		// for Aliens and Starred Aliens
		const alien = Number($crystalInput.val()) == 600;
		const starred = Number($crystalInput.val()) == 1500;
		// set up table
		$template.find('.enemy-stats-table .enemy-stats-value.abilities .scaled').each(function () {
			this.dataset.initialValue = this.textContent.replaceAll(',', '');
		});
		$template.find('.enemy-stats-table').addClass('table-loaded');

		// retrieve stats
		const hp = Number($template.find('.enemy-stats-table').attr('data-hp'));
		/** @type Number[] */
		const ap = JSON.parse($template.find('.enemy-stats-table').attr('data-ap'));

		const freqText = $template.find('.enemy-stats-table').attr('data-freq');
		let freq;
		if (freqText) {
			freq = [true, Number(freqText)];
		}
		else {
			freq = false;
		}

		$inputs.on('input', function () { calculate(); });

		// events
		$inputs.on('keydown', function (e) {
			let increment;
			switch (e.which) {
				case 38:
					// up arrow
					e.preventDefault();
					increment = 1;
					break;
				case 40:
					// down arrow
					e.preventDefault();
					if (this.value == 0) return;
					increment = -1;
					break;
				default:
					return;
			}
			if (this.value.includes('/')) {
				const parts = this.value.split('/');
				parts[1] = Number(parts[1]) + increment;
				if (parts[1] <= 0) {
					this.value = Number(parts[0]) + parts[1];
				} else {
					this.value = `${parts[0]}/${parts[1]}`;
				}
			} else {
				this.value = Number(this.value) + increment;
			}
			$(this).trigger('input');
		});

		function convertDoubleMag(magInput) {
			return magInput.split('/').map(Number);
		}

		function toDisplay(number, decimals) {
			return number.toLocaleString(undefined, { maximumFractionDigits: decimals });
		}

		function adjustMags(stat, statMag, alienMag, starredMag) {
			return Math.floor(stat * statMag * alienMag * starredMag / (100 * 100 * 100));
		}

		// update table to show calculated values
		function calculate() {
			const mags = convertDoubleMag($magInput.val());
			const hpMag = mags[0];
			const apMag = mags.length >= 2 ? mags[1] : mags[0];

			const decimals = Number($decimalInput.val());
			const alienMag = alien ? (700 - Number($crystalInput.val())) : 100;
			const starredMag = starred ? (1600 - Number($crystalInput.val())) : 100;

			const newHP = adjustMags(hp, hpMag, alienMag, starredMag);
			const newAp = ap.reduce((sum, a) => sum + adjustMags(a, apMag, alienMag, starredMag), 0);

			$hpCell.text(`${toDisplay(newHP)} HP`);

			let damage = `${toDisplay(newAp)} урона`;
			if (freq[0]) {
				const dps = toDisplay(newAp / freq[1] * 30, decimals);
				damage += `<br><small>(${dps} УВС)</small>`;
			}
			$apCell.html(damage);

			$template.find('.enemy-stats-table .enemy-stats-value.abilities .scaled').each(function () {
				const scaleVal = $(this).attr('data-type') == 'ap' ? apMag : hpMag;
				const newAp = adjustMags(Number(this.dataset.initialValue), scaleVal, alienMag, starredMag);
				$(this).text(toDisplay(newAp));
			});
		}
	});
});
/* Шаблон:UnitViewer */
var lpj_api;

function log_page_json(name) {
    lpj_api.get({
        action: 'query',
        prop: 'revisions',
        titles: name,
        rvprop: 'content',
        rvslots: 'main',
        formatversion: '2'
    }).done(function (data) {
        var content = data.query.pages[0].revisions[0].slots.main.content
        var unspaced_content = JSON.stringify(JSON.parse(content))
        console.log(unspaced_content)
    })
}

mw.loader.using('mediawiki.api').then(function () {
    lpj_api = new mw.Api();
})
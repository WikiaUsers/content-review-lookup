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

/* Шаблон:Статистика кота */
mw.hook('wikipage.content').add(function () {
	if (window.catStatsLoaded) return;
	window.catStatsLoaded = true;
	// prevent double loading

	const $tables = $('.detailed-cat-stats-table');

	if ($tables.length === 0) {
		return;
	}

	// set up tables
	$tables.each(function () {
		const $this = $(this);
		const $controls = $this.prev('.detailed-cat-stats-controls');
		const scaling = JSON.parse(this.dataset.scaling);
		let decimals = 2;
		let hpTreasure = 300;
		let apTreasure = 300;

		// create inputs
		$this.find('.stats-table-cell.cell-input').each(function () {
			const level = $(this).text();
			const input = $('<input>', {
				'class': 'cat-stats-level-input detailed-cat-stats-input',
				'value': level,
				'type': 'text',
				'pattern': /^[\d,\+]+$/,
			});
			$(this).html(input);
		});

		$this.find('.cat-stats-level-input').on('input', function () {
			const newValue = this.value.replace(/[^0-9\+]/g, '');
			if (this.value !== newValue) {
				this.value = newValue;
				return;
			}
			const newLevel = convertPlusLevel(newValue);
			const $parent = $(this).parent();
			const baseHP = Number($parent.attr('data-hp'));
			/** @type {number[]} */
			const baseAP = JSON.parse($parent.attr('data-ap'));
			const cycle = Number($parent.attr('data-cycle'));

			const hpBuff = Number($parent.prevAll('.health-buff').children().val());
			const apBuff = Number($parent.prevAll('.attack-buff').children().val());
			let hpOrb = 0;
			let apOrb = 0;
			const $hpOrb = $parent.prevAll('.health-orb').children();
			const $apOrb = $parent.prevAll('.attack-orb').children();
			if ($hpOrb.length > 0) hpOrb = Number($hpOrb.val());
			if ($apOrb.length > 0) apOrb = Number($apOrb.val());

			const newHP = calcStat(baseHP, newLevel, scaling, hpTreasure, (hpBuff + 100) * (hpOrb + 100) / 10000);
			const newAPList = baseAP.map((hit) => calcStat(hit, newLevel, scaling, apTreasure, (apBuff + 100) / 100, apOrb));
			const newAP = newAPList.reduce((sum, next) => sum + next, 0);
			const newDPS = newAP / cycle * 30;

			$parent.nextAll('.stat-hp').text(toDisplay(newHP, 0));
			$parent.nextAll('.stat-ap').text(toDisplay(newAP, 0));
			$parent.nextAll('.stat-dps').text(toDisplay(newDPS, decimals));
			$parent.nextAll('.cell-value.abilities').first().find('span.multi-hit-dmg').each(function () {
				// find next abilities section, run this function over all hits
				// of the multi-hit
				const cls = $(this).attr('class').match(/hit-(\d)/);
				const clsNum = Number(cls[1]);
				$(this).text(toDisplay(newAPList[clsNum - 1]));
			});
		});

		$this.find('.stats-table-cell.cell-value.abilities').each(function () {
			/** @type {string} */
			const html = $(this).html();
			const multiHitMatch = html.match(/Мульти-атака[^b]*?$(?:<br>|\.|$)/);
			if (!multiHitMatch) { return; }

			if (multiHitMatch.length !== 1) {
				console.warn('Multi-hit found multiple times');
				return;
			}
			const multiHitHTML = multiHitMatch[0];

			let replacementCount = 0;
			const newHTML = multiHitHTML.replaceAll(/([\d,]+)( на [\d,]+f)/g, function (_, hitDmg, postFix) {
				replacementCount += 1;
				return `<span class="multi-hit-dmg hit-${replacementCount}">${hitDmg}</span>${postFix}`;
			});

			$(this).html(html.replaceAll(multiHitHTML, newHTML));
		});

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			type: 'text',
			pattern: /^[\d,\+]+$/,
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9+]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				$this.find('.cat-stats-level-input')
					.val($(this).val())
					.trigger('input');
			})
			.appendTo($controls.find('.global-level'));

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': decimals
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				decimals = Number($(this).val());
				$this.find('.cat-stats-level-input').trigger('input');
			})
			.appendTo($controls.find('.decimal-places'));

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': hpTreasure
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				hpTreasure = Number($(this).val());
				$this.find('.cat-stats-level-input').trigger('input');
			})
			.appendTo($controls.find('.health-treasure'));

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': apTreasure
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				apTreasure = Number($(this).val());
				$this.find('.cat-stats-level-input').trigger('input');
			})
			.appendTo($controls.find('.attack-treasure'));

		const ABILITY_DEFAULT = 0;
		const ABILITY_SIMPLE = 1;
		const $abilityToggle = $('<button>', {
			'data-state': ABILITY_DEFAULT,
		})
			.text('По умолчанию')
			.on('click', function () {
				$this.toggleClass('ability-simple');
				const newState = 1 - Number(this.dataset.state);
				this.dataset.state = newState;

				$(this).text(newState == ABILITY_SIMPLE ? 'Упрощённо' : 'По умолчанию');
				mw.storage.set('detailedCatStatsSimpleAbilities', newState);
			})
			.appendTo($controls.find('.ability-toggle'));
		if (mw.storage.get('detailedCatStatsSimpleAbilities') == ABILITY_SIMPLE) {
			$abilityToggle.trigger('click');
		}

		$this.find('.stats-table-cell.time-toggle').each(function () {
			// int[]
			let frames = JSON.parse(this.dataset.frames);
			if (Number.isInteger(frames)) { frames = [frames]; }

			const frameList = frames.map((value) => toDisplay(value));
			const secondList = frames.map((value) => toDisplay(value / 30, 2));

			this.dataset.frames = frameList.join('/');
			this.dataset.seconds = secondList.join('/');
		});

		const DURATION_FRAMES = 0;
		const DURATION_SECONDS = 1;
		const $durationToggle = $('<button>', {
			'data-state': DURATION_FRAMES,
		})
			.text('Кадры')
			.on('click', function () {
				$this.toggleClass('duration-seconds');
				const newState = 1 - Number(this.dataset.state);
				this.dataset.state = newState;

				$(this).text(newState == DURATION_SECONDS ? 'Секунды' : 'Кадры');
				mw.storage.set('detailedCatStatsUseSeconds', newState);

				$this.find('.stats-table-cell.time-toggle').each(function () {
					$(this).text(this.dataset[newState == DURATION_SECONDS ? 'seconds' : 'frames']);
				});
			})
			.appendTo($controls.find('.duration-toggle'));
		if (mw.storage.get('detailedCatStatsUseSeconds') == DURATION_SECONDS) {
			$durationToggle.trigger('click');
		}

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': 0
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				$(this).parent().nextAll('.cell-input').children().trigger('input');
			})
			.appendTo($this.find('.health-buff'));

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': 0
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				$(this).parent().nextAll('.cell-input').children().trigger('input');
			})
			.appendTo($this.find('.attack-buff'));

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': 0
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				$(this).parent().nextAll('.cell-input').children().trigger('input');
			})
			.appendTo($this.find('.health-orb'));

		$('<input>', {
			'class': 'detailed-cat-stats-input',
			'value': 0
		})
			.on('input', function () {
				const newValue = this.value.replace(/[^0-9]/g, '');
				if (this.value !== newValue) {
					this.value = newValue;
					return;
				}
				$(this).parent().nextAll('.cell-input').children().trigger('input');
			})
			.appendTo($this.find('.attack-orb'));

		$this.find('.detailed-cat-stats-input').add($controls.find('.detailed-cat-stats-input')).on('keydown', function (e) {
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
			if (this.value.includes('+')) {
				const parts = this.value.split('+');
				parts[1] = Number(parts[1]) + increment;
				if (parts[1] <= 0) {
					this.value = Number(parts[0]) + parts[1];
				} else {
					this.value = `${parts[0]}+${parts[1]}`;
				}
			} else {
				this.value = Number(this.value) + increment;
			}
			$(this).trigger('input');
		});
	});

	// converts string input for a level into a number
	function convertPlusLevel(levelInput) {
		return levelInput.split('+').map(Number).reduce((sum, a) => sum + a, 0);
	}

	/**
	 * Calculate a base stat.
	 * @param {number} base
	 * @param {number} level
	 * @param {number[]} scaling List of percentages.
	 * @param {number} treasure As a percentage.
	 * @param {number} buff Multiplies the stat directly.
	 * @param[opt] {number} plus Additional damage as a multiple of base stat.
	 * @returns {number} Stat at level.
	 */
	function calcStat(base, level, scaling, treasure, buff, plus = 0) {
		const max_scaled_level = scaling.length * 10;
		let stat = base;
		for (let l = 2; l <= Math.min(level, max_scaled_level); l++) {
			const index = Math.ceil(l / 10) - 1; // index for scaling array
			stat += base * scaling[index] / 100;
		}
		if (level > max_scaled_level) {
			const to_apply = level - max_scaled_level;
			stat += base * scaling[scaling.length - 1] * to_apply / 100;
			// if PONOS hasn't coded in the max scaling for this level, then
			// just calculate it all in one by assuming it's the same as the
			// scaling for the last 10 levels
		}

		stat = Math.floor(Math.round(stat) * (100 + 0.5 * treasure) / 100 * buff) + base * plus;
		return stat;
	}

	// formats a number so that it is suitable for display
	function toDisplay(number, decimals) {
		return number.toLocaleString(undefined, { maximumFractionDigits: decimals });
	}
});
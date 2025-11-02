/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.my-gallery').forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('.gallery-img'));
    const ctrls = Array.from(gallery.querySelectorAll('.gallery-control'));

    if (!imgs.length || !ctrls.length) return;

    function showIndex(i) {
      imgs.forEach(img => img.classList.remove('active'));
      ctrls.forEach(c => c.classList.remove('active'));

      const index = (i + imgs.length) % imgs.length;
      const img = imgs.find(x => Number(x.dataset.i) === index);
      const ctrl = ctrls.find(x => Number(x.dataset.i) === index);

      if (img) img.classList.add('active');
      if (ctrl) ctrl.classList.add('active');
    }

    if (!imgs.some(x => x.classList.contains('active'))) {
      showIndex(0);
    }

    ctrls.forEach(ctrl => {
      ctrl.addEventListener('click', function (e) {
        e.preventDefault();
        const i = Number(this.dataset.i) || 0;
        showIndex(i);
      });
    });

    // (опционально) автоплей — раскомментируй если нужно
    /*
    let auto = true;
    if (auto) {
      let cur = 0;
      setInterval(() => {
        cur = (cur + 1) % imgs.length;
        showIndex(cur);
      }, 3000); // 3s между сменами
    }
    */
  });
});

mw.hook('wikipage.content').add(function($content) {
  const galleries = $content.find('.my-gallery');
  galleries.each(function() {
    const gallery = this;
    const imgs = gallery.querySelectorAll('.gallery-img');
    const controls = gallery.querySelectorAll('.gallery-control');

	if (imgs.length > 0 && controls.length > 0) {
		imgs[0].classList.add('active');
		controls[0].classList.add('active');
    }

    controls.forEach(control => {
      control.addEventListener('click', () => {
        const i = control.dataset.i;
        imgs.forEach(img => img.classList.remove('active'));
        controls.forEach(btn => btn.classList.remove('active'));
        imgs[i].classList.add('active');
        control.classList.add('active');
      });
    });
  });
});










document.querySelectorAll('.research-collapsible-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		btn.textContent = isActive ? 'Закрыть' : 'Посмотреть';
	});
});

document.querySelectorAll('.navbox-button').forEach(btn => {
	btn.addEventListener('click', () => {
		const isActive = btn.classList.toggle('active');
		
		const wrapper = btn.closest('.navbox-wrapper');
		const container = wrapper.querySelector('.navbox-container');

		if (isActive) {
			container.classList.add('active');
		} else {
			container.classList.remove('active');
		}
	});
});


$(function () {

	$('#search').html(
		'<input id="searchInput" class="bfw-search" placeholder="Ввести название…" style="width:100%">'
	);

	$('#filter-type').html(
		'<select id="filterType" class="bfw-filter">' +
			'<option value="">Все типы</option>' +
			'<option value="fruit-type-физический">Физические</option>' +
			'<option value="fruit-type-звериный">Звериные</option>' +
			'<option value="fruit-type-элементальный">Элементальные</option>' +
		'</select>'
	);

	$('#filter-rarity').html(
		'<select id="filterRarity" class="bfw-filter">' +
			'<option value="">Все редкости</option>' +
			'<option value="rarity-обычный">Обычный</option>' +
			'<option value="rarity-необычный">Необычный</option>' +
			'<option value="rarity-редкий">Редкий</option>' +
			'<option value="rarity-легендарный">Легендарный</option>' +
			'<option value="rarity-мифический">Мифический</option>' +
			'<option value="rarity-премиумный">Премиумный</option>' +
		'</select>'
	);
	
	$('#filter-effect').html(
		'<select id="filterEffect" class="bfw-filter">' +
			'<option value="">Все эффекты</option>' +
			'<option value="effect-damage-styles">🤜 Урон Боевых Стилей</option>' +
			'<option value="effect-damage-swords">⚔️ Урон Мечей</option>' +
			'<option value="effect-damage-guns">🏹 Урон Оружий</option>' +
			'<option value="effect-damage-fruits">🍈 Урон Фруктов</option>' +
			'<option value="effect-damage">💠 Урон</option>' +
			'<option value="effect-damage-sea-events">🌊 Урон Морским Событиям</option>' +
			'<option value="effect-cooldown-reduce">💠🕛 Уменьшение перезарядки</option>' +
			'<option value="effect-cooldown-reduce-styles">🤜🕛 Перезарядка Боевых Стилей</option>' +
			'<option value="effect-cooldown-reduce-swords">⚔️🕛 Перезарядка Мечей</option>' +
			'<option value="effect-cooldown-reduce-guns">🏹🕛 Перезарядка Оружий</option>' +
			'<option value="effect-cooldown-reduce-fruits">🍈🕛 Перезарядка Фруктов</option>' +
			'<option value="effect-hp">❤️ Здоровье</option>' +
			'<option value="effect-hp-regen">🔜❤️ Регенерация Здоровья</option>' +
			'<option value="effect-energy">⚡Энергия</option>' +
			'<option value="effect-energy-regen">🔜⚡Восстановление Энергии</option>' +
			'<option value="effect-meter-regen">🔜➖ Восстановление шкалы Фрукта</option>' +
			'<option value="effect-defense">🛡️ Защита</option>' +
			'<option value="effect-defense-styles">🛡️🤜 Защита от Боевых Стилей</option>' +
			'<option value="effect-defense-swords">🛡️⚔️ Защита от Мечей</option>' +
			'<option value="effect-defense-guns">🛡️🏹 Защита от Оружий</option>' +
			'<option value="effect-defense-fruits">🛡️🍈 Защита от Фруктов</option>' +
			'<option value="effect-defense-sea-events">🛡️🌊 Защита от Морских Событий</option>' +
			'<option value="effect-movement-speed">🦶 Скорость бега</option>' +
			'<option value="effect-dash-range">💨🔝 Дальность рывка</option>' +
			'<option value="effect-dash-speed">💨🔜 Скорость рывка</option>' +
			'<option value="effect-cooldown-reduce-flash-step">🌪️🕛 Перезарядка Мгновенного Шага</option>' +
			'<option value="effect-defense-water">🛡️💧 Защита от Воды</option>' +
			'<option value="effect-vampirism">🧛 Вампиризм</option>' +
			'<option value="effect-instinct-dodge">👁🔟️ Уклонения Инстинкта</option>' +
			'<option value="effect-instinct-range">👁🔝️ Дальность Инстинкта</option>' +
			'<option value="effect-air-jump">☁️ Дополнительный Воздушный Прыжок</option>' +
			'<option value="effect-sixth-area-vision">🪬 Видение</option>' +
			'<option value="effect-drop-chance-sea-events">✖️🌊 Шанс дропа с Морских Событий</option>' +
			'<option value="effect-boost-exp">✖️💿 Буст опыта</option>' +
			'<option value="effect-boost-mastery">✖️📀 Буст мастерства</option>' +
		'</select>'
	);

	$('#filter-sea').html(
		'<select id="filterSea" class="bfw-filter">' +
			'<option value="">Все моря</option>' +
			'<option value="sea-первое">Первое море</option>' +
			'<option value="sea-второе">Второе море</option>' +
			'<option value="sea-третье">Третье море</option>' +
		'</select>'
	);

	function filterItems () {
		const search = $('#searchInput').val().trim().toLowerCase();

		const filters = {
			type   : $('#filterType').val(),
			rarity : $('#filterRarity').val(),
			effect : $('#filterEffect').val(),
			sea    : $('#filterSea').val()
		};

		$('#itemList > div').each(function () {
			const $t = $(this);

			const textOk =
				!search ||
					($t.attr('id')||'').toLowerCase().startsWith(search) ||
					$t.text().toLowerCase().startsWith(search);

			const catsOk = Object.entries(filters).every(([attr, val]) => {
				if (!val) return true;
				const list = ($t.data(attr) || '')
                    .toString()
					.split(/\s+/);
				return list.includes(val);
			});

			$t.toggle(textOk && catsOk);
		});
	}

	$(document).on('input change', '#searchInput, #filterType, #filterRarity, #filterEffect, #filterSea', filterItems);
});
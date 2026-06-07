switch (mw.config.get('wgPageName')) {
  case 'Настройки':
    var checksEl = document.querySelectorAll('.settingsCheckbox');
    var redirEl = document.querySelectorAll('.settingsRedirect');
    var descr = document.getElementById("settingsDescr");
    var loaders = document.querySelectorAll(".loadPopupTab");
    
    var header = document.getElementById("descrHeader");
    var block = document.getElementById("descrBlock");

    function selectCycles() {
      checksEl.forEach(check => {
        check.onclick = () => {
          // Удаляем активный класс у всех
          
          loaders.forEach(loader => {
          animateOpacity(loader, 0, 1, 600);
          })
          
          checksEl.forEach(s => s.classList.remove('selected'));
          // Добавляем выбранный
          check.classList.add('selected');
          console.log(check.textContent);
          
          
          loadTemplate(check.dataset.template, "settingsDescr", () => {
          	loaders.forEach(loader => {
        		animateOpacity(loader, 1, 0, 600);
        	})
          });
          
        };
      });
      
      redirEl.forEach(redirect => {
		redirect.onclick = () => {
    		loadTemplate(redirect.dataset.template, "settingsTab", () => {
    			checksEl = document.querySelectorAll('.settingsCheckbox');
    			redirEl = document.querySelectorAll('.settingsRedirect');
    			descr = document.getElementById("settingsDescr");
    			selectCycles();
    			console.log("Обработчики перенавешаны");
    			if(redirect.textContent === "Титры") {
    				header.style.display = 'none';
    				block.style.display = 'none';
    			} else {
    				header.style.display = '';
    				block.style.display = '';
    			}
    	});
	  };
	});
    }

    selectCycles();
    break;
}




function loadTemplate(templateName, targetId, callback) {
  $.getJSON(mw.util.wikiScript('api'), {
    action: 'parse',
    page: 'Template:' + templateName,
    prop: 'text',
    format: 'json'
  })
  .done(function (data) {
    if (data.parse && data.parse.text) {
      document.getElementById(targetId).innerHTML = data.parse.text['*'];
      if (callback) callback();
    } else {
      console.warn("API вернул пусто:", data);
    }
  })
  .fail(function (err) {
    console.error("Ошибка API:", err);
  });
}


function animateOpacity(el, from, to, time) {
	if (!el) return;
	el.style.display = 'flex';
	el.style.opacity = from;

	let start = null;

	function step(timestamp) {
		if (!start) start = timestamp;
		let progress = (timestamp - start) / time;
		if (progress > 1) progress = 1;

		el.style.opacity = from + (to - from) * progress;

		if (progress < 1) {
			requestAnimationFrame(step);
		} else if (to === 0) {
			el.style.display = 'none'; // скрываем после исчезновения
		}
	}

	requestAnimationFrame(step);
}


var wiki_name_number=Math.floor(Math.random() * 12);
	var wiki_name_text=["Давай посмотрим, что там... Ой.", "Мы... приносим извинения за то, что брандмауэр был активирован, когда вы проходили оценочный курс.", "Подводная лодка прибыла.", "Оооооооууууууу, посетитель!", "Это... Просто Себастьян", "П-привет?", "Я тебя напугал?", "ТЫ! НАРУШАЕШЬ!! ДРЕСС-КОД!!!", "С возвращением! Хотите прокатиться еще раз?" ][wiki_name_number];
	var elements=document.getElementsByClassName('fandom-community-header__community-name');
	var wiki_name=elements[0];
	wiki_name.textContent=wiki_name_text;
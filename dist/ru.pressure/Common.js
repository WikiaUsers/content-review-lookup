switch (mw.config.get('wgPageName')) {
  case 'Настройки':
    var checksEl = document.querySelectorAll('.settingsCheckbox');
    var redirEl = document.querySelectorAll('.settingsRedirect');
    var descr = document.getElementById("settingsDescr");
    var loaders = document.querySelectorAll(".loadPopupTab");

    function selectCycles() {
      checksEl.forEach(status => {
        status.onclick = () => {
          // Удаляем активный класс у всех
          
          loaders.forEach(loader => {
          animateOpacity(loader, 0, 1, 600);
          })
          
          checksEl.forEach(s => s.classList.remove('selected'));
          // Добавляем выбранный
          status.classList.add('selected');
          console.log(status.textContent);
          
          
          loadTemplate(status.dataset.template, "settingsDescr", () => {
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
	if (!el) return; // защита от null
	el.style.display = 'flex'; // убедимся, что элемент видим
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
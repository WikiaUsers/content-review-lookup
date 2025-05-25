
(function() {
  function arrangeSkillsInCircle(wheelId, skillSelector, innerWheelId = null, innerSkillSelector = null) {
    var wheel = document.getElementById(wheelId);
    var skills = wheel ? wheel.querySelectorAll(skillSelector) : [];
    var innerWheel = innerWheelId ? document.getElementById(innerWheelId) : null;
    var innerSkills = innerWheel ? innerWheel.querySelectorAll(innerSkillSelector) : [];

    if (!wheel || skills.length === 0) {
      console.warn('Не найден элемент wheel с id "' + wheelId + '" или элементы skill с селектором "' + skillSelector + '" внутри него.');
      return;
    }

    var numSkills = skills.length;
    var wheelSize = Math.min(window.innerWidth, window.innerHeight) * 0.75; // Размер колеса - половина наименьшего размера окна
    wheel.style.width = wheelSize + 'px';
    wheel.style.height = wheelSize + 'px';

    var radius = wheelSize / 2 * 0.8; // Радиус круга
    var centerX = wheelSize / 2;
    var centerY = wheelSize / 2;

    // Вычисляем размер skill элементов, чтобы они были квадратными и помещались в круг
    var skillSize = (2 * radius * Math.sin(Math.PI / numSkills)) * 0.8; // Формула для определения максимального размера квадрата

    for (var i = 0; i < skills.length; i++) {
      skills[i].style.width = skillSize + 'px';
      skills[i].style.height = skillSize + 'px';
      //skills[i].style.lineHeight = skillSize + 'px'; //  если у skill есть текст и его нужно центрировать по вертикали
    }


    for (var i = 0; i < numSkills; i++) {
      var angle = (2 * Math.PI * i) / numSkills;
      var x = centerX + radius * Math.cos(angle) - skillSize / 2;
      var y = centerY + radius * Math.sin(angle) - skillSize / 2;

      skills[i].style.position = 'absolute';
      skills[i].style.left = x + 'px';
      skills[i].style.top = y + 'px';
    }

    wheel.style.position = 'relative';


    // Обработка внутреннего колеса, если оно есть
    if (innerWheel && innerSkills.length > 0) {
      var numInnerSkills = innerSkills.length;
      var innerWheelSize = wheelSize * 0.5; // Уменьшенный размер внутреннего колеса (например, 50% от внешнего)
      innerWheel.style.width = innerWheelSize + 'px';
      innerWheel.style.height = innerWheelSize + 'px';
      innerWheel.style.position = 'absolute';
      innerWheel.style.left = (wheelSize - innerWheelSize) / 2 + 'px'; // Центрируем внутреннее колесо по горизонтали
      innerWheel.style.top = (wheelSize - innerWheelSize) / 2 + 'px'; // Центрируем внутреннее колесо по вертикали

      var innerRadius = innerWheelSize / 2 * 0.55; // Радиус внутреннего круга
      var innerCenterX = innerWheelSize / 2;
      var innerCenterY = innerWheelSize / 2;

      // Вычисляем размер skill элементов внутреннего колеса
      var innerSkillSize = (2 * innerRadius * Math.sin(Math.PI / numInnerSkills)) * 0.8;

      for (var i = 0; i < innerSkills.length; i++) {
        innerSkills[i].style.width = innerSkillSize + 'px';
        innerSkills[i].style.height = innerSkillSize + 'px';
      }

      for (var i = 0; i < numInnerSkills; i++) {
        var angle = (2 * Math.PI * i) / numInnerSkills;
        var x = innerCenterX + innerRadius * Math.cos(angle) - innerSkillSize / 2;
        var y = innerCenterY + innerRadius * Math.sin(angle) - innerSkillSize / 2;

        innerSkills[i].style.position = 'absolute';
        innerSkills[i].style.left = x + 'px';
        innerSkills[i].style.top = y + 'px';
      }

      innerWheel.style.position = 'absolute';
    }
  }

  // --- Новый код начинается здесь ---

  var selectedSkills = {
    wheel: [],
    wheel2: []
  };

  var maxSelectedSkills = 3;

  function getMaxSkillsAmount() {
    let amountElement = document.getElementById('skillsAmount');
    if (amountElement) {
      let amount = parseInt(amountElement.textContent, 10);
      if (!isNaN(amount) && amount >= 2 && amount <= 20) {
        return amount;
      }
    }
    return 3; // Возвращаем значение по умолчанию, если элемент не найден или значение некорректно
  }

  function updateSkillsAmountDisplay() {
    let amountElement = document.getElementById('skillsAmount');
    if (amountElement) {
      amountElement.textContent = maxSelectedSkills;
    }
    updateButtonOpacity(); // Обновляем прозрачность кнопок
    updateResetPriceDisplay(); // Обновляем стоимость сброса
  }

  function updateButtonOpacity() {
      let lessSkillsButton = document.getElementById('lessSkills');
      let moreSkillsButton = document.getElementById('moreSkills');

      if (lessSkillsButton) {
          lessSkillsButton.style.opacity = (maxSelectedSkills === 2) ? '0' : '1';
      }
      if (moreSkillsButton) {
          moreSkillsButton.style.opacity = (maxSelectedSkills === 20) ? '0' : '1';
      }
  }

  function increaseSkillsAmount() {
    if (maxSelectedSkills < 20) {
      maxSelectedSkills++;
      updateSkillsAmountDisplay();
    }
  }

  function decreaseSkillsAmount() {
    if (maxSelectedSkills > 2) {
      maxSelectedSkills--;
      updateSkillsAmountDisplay();
      //Удаляем выбранные скиллы если их стало больше чем нужно
      while (selectedSkills.wheel.length + selectedSkills.wheel2.length > maxSelectedSkills){
          if(selectedSkills.wheel.length > 0){
            let skillToRemove = selectedSkills.wheel.shift();
            let skillElement = document.querySelector('#wheel div.' + skillToRemove + '.selectedSkill'); //Ищем по классу
            if(skillElement){
              skillElement.classList.remove('selectedSkill');
            }
          } else if (selectedSkills.wheel2.length > 0){
            let skillToRemove = selectedSkills.wheel2.shift();
             let skillElement = document.querySelector('#wheel2 div.' + skillToRemove + '.selectedSkill'); //Ищем по классу
            if(skillElement){
              skillElement.classList.remove('selectedSkill');
            }
          }
      }

      updateSelectedSkillsDisplay();
      updateSynergiesDisplay();
      drawSynergyLines();
    }
  }


  function handleSkillClick(event, wheelName) {
    var skill = event.target;

    // Проверяем, есть ли у навыка класс "wasted"
    if (skill.classList.contains('wasted')) {
      return; // Если есть, то прерываем обработку
    }

    var skillId = skill.classList[0]; // Получаем текст из первого класса скилла
    var index = selectedSkills[wheelName].indexOf(skillId);

    //Считаем общее количество выбранных навыков
    let totalSelected = selectedSkills.wheel.length + selectedSkills.wheel2.length;

    if (index === -1) { // Skill не выбран
      if (totalSelected < maxSelectedSkills) {
        selectedSkills[wheelName].push(skillId);
        skill.classList.add('selectedSkill');
      } else {
          // Находим первый выбранный навык и убираем его
          if(selectedSkills.wheel.length > 0){
            let skillToRemove = selectedSkills.wheel.shift();
            let skillElement = document.querySelector('#wheel div.' + skillToRemove + '.selectedSkill'); //Ищем по классу
            if(skillElement){
              skillElement.classList.remove('selectedSkill');
            }
          } else if (selectedSkills.wheel2.length > 0){
            let skillToRemove = selectedSkills.wheel2.shift();
             let skillElement = document.querySelector('#wheel2 div.' + skillToRemove + '.selectedSkill'); //Ищем по классу
            if(skillElement){
              skillElement.classList.remove('selectedSkill');
            }
          }


        selectedSkills[wheelName].push(skillId);
        skill.classList.add('selectedSkill');
      }
    } else { // Skill уже выбран, убираем выбор
      selectedSkills[wheelName].splice(index, 1);
      skill.classList.remove('selectedSkill');
    }

    updateSelectedSkillsDisplay();
    updateSynergiesDisplay();
    drawSynergyLines();
    updateResetPriceDisplay(); // Обновляем стоимость сброса после каждого клика
  }


  function updateSelectedSkillsDisplay() {
    var displayElement = document.getElementById('selected-skills');  //Создайте элемент с id="selected-skills" в HTML
    if (!displayElement) {
      console.warn('Не найден элемент для отображения выбранных навыков с id "selected-skills".');
      return;
    }

    displayElement.innerHTML = 'Выбранные навыки: ' + selectedSkills.wheel.concat(selectedSkills.wheel2).join(', ');
  }

  function updateSynergiesDisplay() {
    var synergyDisplay = document.getElementById('synergy-info');  //Создайте элемент с id="synergy-info" в HTML
    if (!synergyDisplay) {
      console.warn('Не найден элемент для отображения информации о синергиях с id "synergy-info".');
      return;
    }

    synergyDisplay.innerHTML = ''; // Очищаем предыдущий вывод

    if (selectedSkills.wheel.length > 0 && selectedSkills.wheel2.length > 0) {
      selectedSkills.wheel.forEach(function(skill1) {
        selectedSkills.wheel2.forEach(function(skill2) {
          // Вызываем шаблон Wiki
          getSynergyInfo(skill1, skill2, function(synergyText) {
            synergyDisplay.innerHTML += '<div>' + synergyText + '</div>';
          });
        });
      });
    } else {
      synergyDisplay.innerHTML = 'Выберите хотя бы по одному навыку из каждого колеса для отображения их комбинаций.';
    }
  }

  function getSynergyInfo(skill1, skill2, callback) {
    var templateName = 'СинергияНавыков';
    var wikiText = '{{' + templateName + '|' + skill1 + '|' + skill2 + '}}';

    // Используем API Fandom для разбора шаблона
    $.ajax({
      url: mw.util.wikiScript('api'),
      data: {
        action: 'parse',
        text: wikiText,
        contentmodel: 'wikitext',
        format: 'json',
        uselang: mw.config.get('wgUserLanguage')
      },
      dataType: 'json',
      success: function(data) {
        if (data.parse && data.parse.text && data.parse.text['*']) {
          callback(data.parse.text['*']);
        } else {
          callback('Ошибка получения информации о синергии.');
          console.error('Ошибка при разборе шаблона:', data);
        }
      },
      error: function(xhr, status, error) {
        callback('Ошибка получения информации о синергии.');
        console.error('Ошибка AJAX:', status, error);
      }
    });
  }


  function drawSynergyLines() {
    // Получаем canvas или создаем его, если его нет
    let canvas = document.getElementById('synergy-canvas');
    let synergyInfoContainer = document.getElementById('wheel').parentNode; // Находим родительский контейнер

    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'synergy-canvas';
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none'; // Чтобы canvas не перехватывал клики
      synergyInfoContainer.appendChild(canvas); // Добавляем canvas в контейнер synergy-info
    }

    const wheelElement = document.getElementById('wheel');
    const wheel2Element = document.getElementById('wheel2');

    if (!wheelElement || !wheel2Element) {
      console.warn('Колесо или внутреннее колесо не найдены.');
      return;
    }

    const rect1 = wheelElement.getBoundingClientRect();
    const rect2 = wheel2Element.getBoundingClientRect();
    const containerRect = synergyInfoContainer.getBoundingClientRect();

    canvas.width = containerRect.width; // Ширина контейнера
    canvas.height = containerRect.height; // Высота контейнера

    // Учитываем смещение контейнера, чтобы правильно позиционировать линии
    const containerOffsetX = containerRect.left;
    const containerOffsetY = containerRect.top;


    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем canvas перед рисованием

    selectedSkills.wheel.forEach(skill1Text => {
      selectedSkills.wheel2.forEach(skill2Text => {
        //Ищем элементы по классу
        const skill1Element = document.querySelector('#wheel div.' + skill1Text);
        const skill2Element = document.querySelector('#wheel2 div.' + skill2Text);

        if (skill1Element && skill2Element) {
          const skill1Rect = skill1Element.getBoundingClientRect();
          const skill2Rect = skill2Element.getBoundingClientRect();

          // Корректируем координаты, учитывая положение контейнера
          const startX = skill1Rect.left + skill1Rect.width / 2 - containerOffsetX;
          const startY = skill1Rect.top + skill1Rect.height / 2 - containerOffsetY;
          const endX = skill2Rect.left + skill2Rect.width / 2 - containerOffsetX;
          const endY = skill2Rect.top + skill2Rect.height / 2 - containerOffsetY;

          const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
		      ctx.lineCap = "round";
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.lineWidth = 5;
          ctx.strokeStyle = gradient; // Используем градиент для цвета
    	    ctx.shadowColor = '#ffffff';
    	    ctx.shadowBlur = 5;
    	    ctx.shadowOffsetX = 0;
    	    ctx.shadowOffsetY = 0;
          ctx.stroke();
        }
      });
    });
  }


  function calculateResetPrice() {
    let wheelSkills = document.querySelectorAll('#wheel #skill');
    let wheel2Skills = document.querySelectorAll('#wheel2 #skill2');
    let validSkills = 0;

    wheelSkills.forEach(skill => {
      if (!skill.classList.contains('wasted') && !skill.classList.contains('temporary')) {
        validSkills++;
      }
    });

    wheel2Skills.forEach(skill => {
      if (!skill.classList.contains('wasted') && !skill.classList.contains('temporary')) {
        validSkills++;
      }
    });

    return validSkills * 50;
  }

  function updateResetPriceDisplay() {
    let resetPriceElement = document.getElementById('resetPrice');
    let resetPriceElementShow = document.getElementById('resetPriceShow');
    let hasWastedSkill = document.querySelector('#wheel #skill.wasted, #wheel2 #skill2.wasted') !== null;

    if (!resetPriceElement) {
      console.warn('Не найден элемент с id "resetPrice".');
      return;
    }
    if (!resetPriceElementShow) {
      console.warn('Не найден элемент с id "resetPriceShow".');
      return;
    }

    let resetPrice = calculateResetPrice();

    if (hasWastedSkill) {
      resetPriceElement.textContent = + resetPrice;
      resetPriceElementShow.style.display = 'block'; // Показываем элемент
    } else {
      resetPriceElementShow.style.display = 'none'; // Скрываем элемент
    }
  }


  // ---  Конец нового кода ---

  // Добавляем функцию в глобальную область видимости, чтобы её можно было вызывать из вики-страниц
  window.arrangeSkillsInCircle = arrangeSkillsInCircle;

  // Используем хук для выполнения кода после загрузки страницы
  $(function() {
    //  Пример вызова с внутренним колесом:
    arrangeSkillsInCircle('wheel', '#skill', 'wheel2', '#skill2');

    // Инициализируем maxSelectedSkills
    maxSelectedSkills = getMaxSkillsAmount();
    updateSkillsAmountDisplay();

    // Добавляем обработчики кликов на навыки
    var skills = document.querySelectorAll('#wheel #skill');
    skills.forEach(function(skill) {
      skill.addEventListener('click', function(event) {
        handleSkillClick(event, 'wheel');
      });
    });

    var innerSkills = document.querySelectorAll('#wheel2 #skill2');
    innerSkills.forEach(function(skill) {
      skill.addEventListener('click', function(event) {
        handleSkillClick(event, 'wheel2');
      });
    });

     // Добавляем обработчики для кнопок изменения количества навыков
    let lessSkillsButton = document.getElementById('lessSkills');
    if (lessSkillsButton) {
      lessSkillsButton.addEventListener('click', decreaseSkillsAmount);
    } else {
      console.warn('Не найден элемент с id "lessSkills".');
    }

    let moreSkillsButton = document.getElementById('moreSkills');
    if (moreSkillsButton) {
      moreSkillsButton.addEventListener('click', increaseSkillsAmount);
    } else {
      console.warn('Не найден элемент с id "moreSkills".');
    }



    // Первоначальное отображение
    updateSelectedSkillsDisplay();
    updateSynergiesDisplay();
    updateResetPriceDisplay(); //Первоначальное отображение цены
    updateButtonOpacity();

    // Пересчитываем при изменении размера окна
    $(window).resize(function() {
      arrangeSkillsInCircle('wheel', '#skill', 'wheel2', '#skill2');
      drawSynergyLines();
    });
    $(window).on('load', function() {
        drawSynergyLines();
    });
  });
})();
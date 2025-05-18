
;(function () {
  // Функция для выполнения запроса к шаблону и получения результата
  function getTemplateResult(templateString) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
          action: 'parse',
          text: templateString,
          pst: true, // Pre-save transform (обязательно для шаблонов!)
          format: 'json',
        },
        dataType: 'json',
        success: function(data) {
          if (data && data.parse && data.parse.text && data.parse.text['*']) {
            resolve(data.parse.text['*']);
          } else {
            console.error('Ошибка при разборе шаблона:', data);
            reject('Ошибка при разборе шаблона.');
          }
        },
        error: function(xhr, status, error) {
          console.error('Ошибка при запросе к API:', status, error);
          reject('Ошибка при запросе к API: ' + error);
        },
      });
    });
  }

  // Функция для подсчета символов "■" в строке
  function countSquares(text) {
    return (text.match(/■/g) || []).length;
  }

  // Функция для установки opacity слота
  function setSlotOpacity(slotNumber, opacity) {
    const strSlotId = 'str-armorslot-' + slotNumber;
    const slotElement = document.getElementById(strSlotId);
    if (slotElement) {
      slotElement.style.opacity = opacity;
    } else {
      console.warn(`Не найден элемент с id ${strSlotId}`);
    }
  }

  // Глобальная переменная для хранения заполненных слотов
  let filledSlots = '';


  // Основная функция
   function processItemInfoboxes() {
    let totalSquares = 0;
    let slotCounts = {};
    let maxSlotConflicts = 0;
    let currentSlotConflicts = 0; // Счетчик текущих конфликтов
    let occupiedSlots = [];

    const interchangeableSlots = {
      15: [23],
      23: [15],
      16: [24],
      24: [16],
      17: [25],
      25: [17],
      18: [26],
      26: [18],
      19: [27],
      27: [19],
      20: [28],
      28: [20],
      21: [22, 29, 30],
      22: [21, 29, 30],
      29: [21, 22, 30],
      30: [21, 22, 29],
      31: [36],
      36: [31],
      32: [37],
      37: [32],
      33: [38],
      38: [33],
      34: [39],
      39: [34],
      35: [40],
      40: [35],
    };

      // Определяем максимальное количество конфликтов
      if (document.getElementById('Закутывание')) {
          maxSlotConflicts = 4;
      } else {
          maxSlotConflicts = 0;
      }


    const itemInfoboxes = document.querySelectorAll('span.item-infobox');

    // Итерируемся по всем инфобоксам
    const infoboxPromises = Array.from(itemInfoboxes).map(infobox => {
      const dataItem = infobox.dataset.item;
      const dataUp = infobox.dataset.up;

      if (dataItem) {
        let templateString = '{{ПодсказкаПредмета|' + dataItem;
        if (dataUp) {
          templateString += '|Улучшение=' + dataUp;
        }
        templateString += '}}';

        return getTemplateResult(templateString)
          .then(templateResult => {

            // Проверка на соответствие критериям для игнорирования слотов
            const hasActive = templateResult.includes('id_Активные_артефакты');
            const hasWeight = templateResult.includes('id_Вес');
            const hasWeight2 = templateResult.includes('id_Вес2');
            const hasNoPassive = !templateResult.includes('id_Пассивные_артефакты');
            const hasNoArmor = !templateResult.includes('id_Броня');
            const passiveActivationPresent = document.getElementById('Пассивная__активация');

            if (passiveActivationPresent && hasActive && hasWeight && hasNoPassive && hasNoArmor) {
              // Увеличиваем количество квадратиков на 1 (или 2 если есть "Вес2")
              totalSquares += hasWeight2 ? 2 : 1;
              return; // Прекращаем обработку слотов для этого инфобокса
            }

            const squaresCount = countSquares(templateResult);
            totalSquares += squaresCount;

            //Проверка на щиты и привязка к слотам
            const hasShields = templateResult.includes('id_Щиты');
            const hasArmorSlots = /(armorslot-\d+-end)/.test(templateResult);
            const bastionPresent = document.getElementById('Бастион');
            const fillAllSlots = templateResult.includes('Полностью дозанимают все незанятые слоты брони владельца') || templateResult.includes('Полностью дозанимает все незанятые слоты брони владельца');

            if (hasShields && !hasArmorSlots && bastionPresent) {

			for (let i = 12; i <= 13; i++) {
              const slotText = 'armorslot-' + i + '-end';
                slotCounts[slotText] = (slotCounts[slotText] || 0) + 1;

                if (slotCounts[slotText] > 1) {
                  if (interchangeableSlots[i]) {
                    const altSlots = interchangeableSlots[i];
                    let conflictResolved = false;

                    for (const altSlotNumber of altSlots) {
                      const altSlotText = 'armorslot-' + altSlotNumber + '-end';

                      if (!templateResult.includes(altSlotText) && !filledSlots.includes(altSlotText)) {
                        setSlotOpacity(altSlotNumber, 1);
                        filledSlots += altSlotText;
                        conflictResolved = true;
                        break;
                      }
                    }

                    if (!conflictResolved) {
                      currentSlotConflicts++; // Увеличиваем счетчик конфликтов

                      if (currentSlotConflicts > maxSlotConflicts) {
                      }
                    }
                  } else {
                    currentSlotConflicts++; // Увеличиваем счетчик конфликтов
                    if (currentSlotConflicts > maxSlotConflicts) {
                    }
                  }
                }
                occupiedSlots.push(slotText);
            }
			return;
			}

            for (let i = 1; i <= 40; i++) {
              const slotText = 'armorslot-' + i + '-end';
            if(fillAllSlots) setSlotOpacity(i, 1);
              if (templateResult.includes(slotText)) {
                slotCounts[slotText] = (slotCounts[slotText] || 0) + 1;

                if (slotCounts[slotText] > 1) {
                  if (interchangeableSlots[i]) {
                    const altSlots = interchangeableSlots[i];
                    let conflictResolved = false;

                    for (const altSlotNumber of altSlots) {
                      const altSlotText = 'armorslot-' + altSlotNumber + '-end';

                      if (!templateResult.includes(altSlotText) && !filledSlots.includes(altSlotText)) {
                        setSlotOpacity(altSlotNumber, 1);
                        filledSlots += altSlotText;
                        conflictResolved = true;
                        break;
                      }
                    }

                    if (!conflictResolved) {
                      currentSlotConflicts++; // Увеличиваем счетчик конфликтов

                      if (currentSlotConflicts > maxSlotConflicts) {
                      }
                    }
                  } else {
                    currentSlotConflicts++; // Увеличиваем счетчик конфликтов
                    if (currentSlotConflicts > maxSlotConflicts) {
                    }
                  }
                }
                occupiedSlots.push(slotText);
              }
            }
          })
          .catch(error => {
            console.error('Ошибка обработки item-infobox:', error);
          });
      } else {
        return Promise.resolve(); // Ничего не делаем, если нет dataItem
      }
    });

	let maxPassive = 3;
          const PassiveArtsPresent = document.querySelector('div#Демонстративность');
          if (PassiveArtsPresent) {
            maxPassive += 2;
          }
    // После обработки всех инфобоксов
    Promise.all(infoboxPromises)
      .then(() => {
        let squaresString = '';
        for (let i = 0; i < totalSquares; i++) {
        	if (i < maxPassive) squaresString += '■';
        }
        for (let i = totalSquares; i < maxPassive; i++) {
          squaresString += '□';
        }

        const passiveArtsDiv = document.querySelector('div.passive-arts');
        if (passiveArtsDiv) {
          passiveArtsDiv.textContent = squaresString;
        } else {
          console.warn('Не найден div с классом passive-arts.');
        }

        if (totalSquares > maxPassive) {
          const slotsErrorDiv = document.querySelector('div.slots-error');
          if (slotsErrorDiv) {
            slotsErrorDiv.textContent = 'Недостаточно слотов пассивных артефактов';
          } else {
            console.warn('Не найден div с классом slots-error.');
          }
        }

        for (let i = 1; i <= 40; i++) {
          const slotText = 'armorslot-' + i + '-end';
          if (slotCounts[slotText]) {
            setSlotOpacity(i, 1);
          }
        }

        if (currentSlotConflicts > maxSlotConflicts) { // Проверяем количество конфликтов
          const armorslotsErrorDiv = document.querySelector('div.armorslots-error');
          if (armorslotsErrorDiv) {
            armorslotsErrorDiv.textContent = 'Конфликт слотов брони';
          } else {
            console.warn('Не найден div с классом armorslots-error.');
          }
        }

      });
  }


  // Условие запуска скрипта
  if (document.body.textContent.includes('Снаряжение') && document.body.textContent.includes('Набор')) {
    // Запускаем основную функцию
    processItemInfoboxes();
  } else {
  }
}());
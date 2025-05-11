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
    let hasSlotConflict = false;
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
            const squaresCount = countSquares(templateResult);
            totalSquares += squaresCount;

            for (let i = 1; i <= 40; i++) {
              const slotText = 'armorslot-' + i + '-end';
              if (templateResult.includes(slotText)) {
                slotCounts[slotText] = (slotCounts[slotText] || 0) + 1;

                if (slotCounts[slotText] > 1) {
                  if (interchangeableSlots[i]) {
                    const altSlots = interchangeableSlots[i];
                    let conflictResolved = false;

                    for (const altSlotNumber of altSlots) {
                      const altSlotText = 'armorslot-' + altSlotNumber + '-end';

                      if (!templateResult.includes(altSlotText) && !filledSlots.includes(altSlotText)) {
                        console.log(altSlotText);
                        console.log(filledSlots);
                        setSlotOpacity(altSlotNumber, 1);
                        filledSlots += altSlotText;
                        console.log(filledSlots);
                        conflictResolved = true;
                        break;
                      }
                    }

                    if (!conflictResolved) {
                      hasSlotConflict = true;
                    }
                  } else {
                    hasSlotConflict = true;
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

    // После обработки всех инфобоксов
    Promise.all(infoboxPromises)
      .then(() => {
        let squaresString = '';
        for (let i = 0; i < totalSquares; i++) {
        	if (i < 3) squaresString += '■';
        }
        for (let i = totalSquares; i < 3; i++) {
          squaresString += '□';
        }

        const passiveArtsDiv = document.querySelector('div.passive-arts');
        if (passiveArtsDiv) {
          passiveArtsDiv.textContent = squaresString;
        } else {
          console.warn('Не найден div с классом passive-arts.');
        }

        if (totalSquares > 3) {
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

        if (hasSlotConflict) {
          const armorslotsErrorDiv = document.querySelector('div.armorslots-error');
          if (armorslotsErrorDiv) {
            armorslotsErrorDiv.textContent = 'Конфликт слотов брони';
          } else {
            console.warn('Не найден div с классом armorslots-error.');
          }
        }

        console.log('Занятые слоты:', occupiedSlots);
      });
  }


  // Условие запуска скрипта
  if (document.body.textContent.includes('Снаряжение') && document.body.textContent.includes('Набор')) {
    // Запускаем основную функцию
    processItemInfoboxes();
  } else {
    console.log("Скрипт не запущен: на странице нет слов 'Снаряжение' и 'Набор'.");
  }
}());
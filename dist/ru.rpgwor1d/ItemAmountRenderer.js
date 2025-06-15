
(function() {
  function parseAndCountItems() {
    const itemsContainer = document.getElementById("items-to-count");
    if (!itemsContainer) {
      console.warn("Контейнер с id 'items-to-count' не найден.");
      return;
    }

    const parseDivs = itemsContainer.querySelectorAll("div[id='parse']");
    const templates = Array.from(parseDivs);
    let parsedCount = 0;
    const totalTemplates = templates.length;

    templates.forEach(function(div) {
      var templateName = div.textContent.trim();
      var wikiText = '{{' + templateName + '}}';

      $.ajax({
        url: mw.util.wikiScript('api'),
        data: {
          action: 'parse',
          text: wikiText,
          contentmodel: 'wikitext',
          format: 'json',
          uselang: mw.config.get('wgUserLanguage'),
          title: mw.config.get('wgPageName'),
        },
        dataType: 'json',
        success: function(data) {
          if (data.parse && data.parse.text && data.parse.text['*']) {
            div.innerHTML = data.parse.text['*'];

          } else {
            div.innerHTML = 'Ошибка получения информации о шаблоне: ' + templateName;
            console.error('Ошибка при разборе шаблона:', data);
          }
        },
        error: function(xhr, status, error) {
          div.innerHTML = 'Ошибка получения информации о шаблоне: ' + templateName;
          console.error('Ошибка AJAX:', status, error);
        },
        complete: function() {
          parsedCount++;
          if (parsedCount === totalTemplates) {
            countAndDisplayItems(itemsContainer);
          }
        }
      });
    });
  }

  function countAndDisplayItems(itemsContainer) {
    const commonItemsCountContainer = document.getElementById("common-items-count");
    const rareItemsCountContainer = document.getElementById("rare-items-count");
    const epicItemsCountContainer = document.getElementById("epic-items-count");
    const legendaryItemsCountContainer = document.getElementById("legendary-items-count");
    const bannedItemsCountContainer = document.getElementById("banned-items-count");
    const uniqueItemsCountContainer = document.getElementById("unique-items-count");
    const glossItemsCountContainer = document.getElementById("gloss-items-count");
    const maximumItemsCountContainer = document.getElementById("maximum-items-count");
    const allItemsCountContainer = document.getElementById("all-items-count"); // Новый контейнер

    if (!commonItemsCountContainer || !rareItemsCountContainer || !epicItemsCountContainer || !legendaryItemsCountContainer || !bannedItemsCountContainer || !uniqueItemsCountContainer || !glossItemsCountContainer || !maximumItemsCountContainer || !allItemsCountContainer) {
      console.warn("Один или несколько целевых контейнеров для отображения счетчиков не найдены.");
      return;
    }

    const containerMap = {
      "quality-H": { container: commonItemsCountContainer, idSet: new Set() },
      "quality-G": { container: rareItemsCountContainer, idSet: new Set() },
      "quality-F": { container: epicItemsCountContainer, idSet: new Set() },
      "quality-E": { container: legendaryItemsCountContainer, idSet: new Set() },
      "quality-D": { container: bannedItemsCountContainer, idSet: new Set() },
      "quality-C": { container: uniqueItemsCountContainer, idSet: new Set() },
      "quality-B": { container: glossItemsCountContainer, idSet: new Set() },
      "quality-A": { container: maximumItemsCountContainer, idSet: new Set() }
    };

    let totalItemsCount = 0; // Переменная для общего количества

    function findAndCountItems(element) {
        const itemArray = Array.from(element.children); // Итерируемся по дочерним элементам
            itemArray.forEach(child => {
                let prefix = null;
                let targetContainerInfo = null;

                if (child.id.startsWith("quality-H")) {
                    prefix = "quality-H";
                    targetContainerInfo = containerMap["quality-H"];
                } else if (child.id.startsWith("quality-G")) {
                    prefix = "quality-G";
                    targetContainerInfo = containerMap["quality-G"];
                } else if (child.id.startsWith("quality-F")) {
                    prefix = "quality-F";
                    targetContainerInfo = containerMap["quality-F"];
                } else if (child.id.startsWith("quality-E")) {
                    prefix = "quality-E";
                    targetContainerInfo = containerMap["quality-E"];
                } else if (child.id.startsWith("quality-D")) {
                    prefix = "quality-D";
                    targetContainerInfo = containerMap["quality-D"];
                } else if (child.id.startsWith("quality-C")) {
                    prefix = "quality-C";
                    targetContainerInfo = containerMap["quality-C"];
                } else if (child.id.startsWith("quality-B")) {
                    prefix = "quality-B";
                    targetContainerInfo = containerMap["quality-B"];
                } else if (child.id.startsWith("quality-A")) {
                    prefix = "quality-A";
                    targetContainerInfo = containerMap["quality-A"];
                }

                if (prefix && targetContainerInfo) {
                    const idSet = targetContainerInfo.idSet;

                    if (!idSet.has(child.id)) {
                        idSet.add(child.id);
                        totalItemsCount++; // Увеличиваем общий счетчик
                    }
                } else {
                    // Если id не начинается с "quality-", рекурсивно ищем в потомках
                    findAndCountItems(child);
                }
            });
    }


    findAndCountItems(itemsContainer);

    // Обновляем содержимое контейнеров с количеством
    for (const key in containerMap) {
      const containerInfo = containerMap[key];
      containerInfo.container.textContent = containerInfo.idSet.size;
    }

    // Отображаем общее количество предметов
    allItemsCountContainer.textContent = totalItemsCount;

    // 3. Удаляем контейнер "items-to-count"
    itemsContainer.remove();
    console.log("Парсинг и подсчет завершены.");
  }

  $(document).ready(function() {
    parseAndCountItems();
  });
})();

(function() {
  function parseAndMoveItems() {
    const itemsContainer = document.getElementById("items");
    if (!itemsContainer) {
      console.warn("Контейнер с id 'items' не найден.");
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
            tooltips.applyTooltips($(div));

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
            moveAndShuffleItems(itemsContainer);
          }
        }
      });
    });
  }

  function moveAndShuffleItems(itemsContainer) {
    const commonItemsContainer = document.querySelector(".common-items");
    const rareItemsContainer = document.querySelector(".rare-items");
    const epicItemsContainer = document.querySelector(".epic-items");
    const legendaryItemsContainer = document.querySelector(".legendary-items");
    const bannedItemsContainer = document.querySelector(".banned-items");

    if (!commonItemsContainer || !rareItemsContainer || !epicItemsContainer || !legendaryItemsContainer || !bannedItemsContainer) {
      console.warn("Один или несколько целевых контейнеров не найдены.");
      return;
    }

    const containerMap = {
      "quality-H": { container: commonItemsContainer, existingIds: {} },
      "quality-G": { container: rareItemsContainer, existingIds: {} },
      "quality-F": { container: epicItemsContainer, existingIds: {} },
      "quality-E": { container: legendaryItemsContainer, existingIds: {} },
      "quality-D": { container: bannedItemsContainer, existingIds: {} }
    };

        // Initialize existingIds for each container
        for (const key in containerMap) {
            const container = containerMap[key].container;
            const existingIds = containerMap[key].existingIds;

            for (let i = 0; i < container.children.length; i++) {
                const child = container.children[i];
                if (child.id) {
                    existingIds[child.id] = true;
                }
            }
        }



    // Рекурсивная функция для поиска элементов с "quality-" и перемещения с проверкой на дубликаты
    function findAndMoveItems(element) {
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
        }

        if (prefix && targetContainerInfo) {
            const container = targetContainerInfo.container;
            const existingIds = targetContainerInfo.existingIds;

            if (!existingIds[child.id]) {
              container.appendChild(child);
              existingIds[child.id] = true;
            } else {
              child.remove();
              console.warn(`Удален дубликат элемента с id: ${child.id} (в ${prefix} контейнере)`);
            }
          } else {
            // Если id не начинается с "quality-", рекурсивно ищем в потомках
            findAndMoveItems(child);
          }
      });
    }

    // Начинаем поиск с itemsContainer
    findAndMoveItems(itemsContainer);

       function shuffleChildren(parent) {
        const children = Array.from(parent.children);
        for (let i = children.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            parent.appendChild(children[j]);
        }
    }

    if (commonItemsContainer){
      shuffleChildren(commonItemsContainer);
    }
    if(rareItemsContainer){
      shuffleChildren(rareItemsContainer);
    }
    if(epicItemsContainer){
      shuffleChildren(epicItemsContainer);
    }
    if(legendaryItemsContainer){
      shuffleChildren(legendaryItemsContainer);
    }
    if(bannedItemsContainer){
      shuffleChildren(bannedItemsContainer);
    }

    // 3. Удаляем контейнер "items"
    itemsContainer.remove();
    console.log("Парсинг и перемещение завершены.");
  }

  $(document).ready(function() {
    parseAndMoveItems();
  });
})();

var NsortID = function () {
  // Get all list elements with the ID "list"
  console.log("Sort by name!");
  var lists1 = document.querySelectorAll("#list");
  var lists2 = document.querySelectorAll("#all-items");

  // Iterate over each list element
  for (var i = 0; i < lists1.length; i++) {
    var list = lists1[i];
    var toSort = list.children;
    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort(function (a, b) {
      var aord = a.id.split('item-')[1];
      var bord = b.id.split('item-')[1];

      if (typeof aord !== 'undefined' && typeof bord !== 'undefined') {
        return aord.localeCompare(bord);
      } else {
        return 0;
      }
    });

    // Append the sorted items back to the list
    for (var j = 0; j < toSort.length; j++) {
      list.appendChild(toSort[j]);
    }
  }
  for (var i = 0; i < lists2.length; i++) {
    var list = lists2[i];
    var toSort = list.children;
    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort(function (a, b) {
      var aord = a.id.split('item-')[1];
      var bord = b.id.split('item-')[1];

      if (typeof aord !== 'undefined' && typeof bord !== 'undefined') {
        return aord.localeCompare(bord);
      } else {
        return 0;
      }
    });

    // Append the sorted items back to the list
    for (var j = 0; j < toSort.length; j++) {
      list.appendChild(toSort[j]);
    }
  }
};


var QsortID = function () {
  // Get all list elements with the ID "list"
  console.log("Sort by quality!");
  var lists1 = document.querySelectorAll("#list");
  var lists2 = document.querySelectorAll("#all-items");
  // Iterate over each list element
  for (var i = 0; i < lists1.length; i++) {
    var list = lists1[i];
    var toSort = list.children;
    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort(function (a, b) {
      var aord = a.id.split('quality-')[1];
      var bord = b.id.split('quality-')[1];

      if (typeof aord !== 'undefined' && typeof bord !== 'undefined') {
        return aord.localeCompare(bord);
      } else {
        return 0;
      }
    });

    // Append the sorted items back to the list
    for (var j = 0; j < toSort.length; j++) {
      list.appendChild(toSort[j]);
    }
  }
  for (var i = 0; i < lists2.length; i++) {
    var list = lists2[i];
    var toSort = list.children;
    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort(function (a, b) {
      var aord = a.id.split('quality-')[1];
      var bord = b.id.split('quality-')[1];

      if (typeof aord !== 'undefined' && typeof bord !== 'undefined') {
        return aord.localeCompare(bord);
      } else {
        return 0;
      }
    });

    // Append the sorted items back to the list
    for (var j = 0; j < toSort.length; j++) {
      list.appendChild(toSort[j]);
    }
  }
};

var PsortID = function () {
  // Get all list elements with the ID "list"
  console.log("Sort by player!");
  var lists1 = document.querySelectorAll("#list");
  var lists2 = document.querySelectorAll("#all-items");

  // Iterate over each list element
  for (var i = 0; i < lists1.length; i++) {
    var list = lists1[i];
    var toSort = list.children;
    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort(function (a, b) {
      var aord = a.id.split('player-')[1];
      var bord = b.id.split('player-')[1];

      if (typeof aord !== 'undefined' && typeof bord !== 'undefined') {
        return aord.localeCompare(bord);
      } else {
        return 0;
      }
    });

    // Append the sorted items back to the list
    for (var j = 0; j < toSort.length; j++) {
      list.appendChild(toSort[j]);
    }
  }
  for (var i = 0; i < lists2.length; i++) {
    var list = lists2[i];
    var toSort = list.children;
    toSort = Array.prototype.slice.call(toSort, 0);

    toSort.sort(function (a, b) {
      var aord = a.id.split('player-')[1];
      var bord = b.id.split('player-')[1];

      if (typeof aord !== 'undefined' && typeof bord !== 'undefined') {
        return aord.localeCompare(bord);
      } else {
        return 0;
      }
    });

    // Append the sorted items back to the list
    for (var j = 0; j < toSort.length; j++) {
      list.appendChild(toSort[j]);
    }
  }
};
var Random = (function () {
  var allItemsContainer = document.getElementById("all-items");
  var hasBeenInitialized = false;

  return function () {
    if (!allItemsContainer) {
      console.error("Контейнер с id 'all-items' не найден.");
      return;
    }

    if (!hasBeenInitialized) {
      var qualityDivs = Array.from(document.querySelectorAll('div[id^="quality-"]'))
        .filter(div => !div.classList.contains("armor-set-infobox"));

      // Объект для отслеживания существующих id в all-items.
      var existingIds = {};
      // Заполняем existingIds id'шниками существующих элементов в allItemsContainer.  Это ОЧЕНЬ ВАЖНО сделать ДО перемещения,
      // чтобы избежать удаления элементов, которые уже были внутри allItemsContainer.
      for (let i = 0; i < allItemsContainer.children.length; i++) {
        const child = allItemsContainer.children[i];
        if (child.id) {
          existingIds[child.id] = true;
        }
      }


      // Перемещаем и проверяем на дубликаты
      qualityDivs.forEach(div => {
        if (!existingIds[div.id]) {
          allItemsContainer.appendChild(div);
          existingIds[div.id] = true;  // Отмечаем id как существующий
        } else {
          // Если дубликат, удаляем элемент
          div.remove();
          console.warn(`Удален дубликат элемента с id: ${div.id}`);
        }
      });

      // Удаление элементов h3, h2, div#list, div#parseTemplate
      document.querySelectorAll('h3').forEach(el => el.remove());
      document.querySelectorAll('h2').forEach(el => el.remove());
      document.querySelectorAll('div#list').forEach(el => el.remove());
      document.querySelectorAll('div#parseTemplate').forEach(el => el.remove());

      hasBeenInitialized = true;
      console.log("Элементы перемещены, дубликаты удалены и лишние элементы удалены.");
    }


    // Получаем актуальный список элементов в allItemsContainer
    var currentItems = Array.from(allItemsContainer.children);

    // Сортируем случайным образом
    currentItems.sort(() => Math.random() - 0.5);

    // Очищаем контейнер
    allItemsContainer.innerHTML = '';

    // Добавляем отсортированные элементы обратно
    currentItems.forEach(item => allItemsContainer.appendChild(item));

    console.log("Элементы перемешаны.");
  };
})();


const sortByQualityButton = document.getElementById("sort_by_quality_button");
if (sortByQualityButton) {
    sortByQualityButton.onclick = QsortID;
}

const sortByNameButton = document.getElementById("sort_by_name_button");
if (sortByNameButton) {
    sortByNameButton.onclick = NsortID;
}

const sortByPlayerButton = document.getElementById("sort_by_player_button");
if (sortByPlayerButton) {
    sortByPlayerButton.onclick = PsortID;
}

const randomButton = document.getElementById("random_button");
if (randomButton) {
    randomButton.onclick = Random;
}
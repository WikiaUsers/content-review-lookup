var NsortID = function () {
  // Get all list elements with the ID "list"
  var lists = document.querySelectorAll("#list");

  // Iterate over each list element
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
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
  var lists = document.querySelectorAll("#list");

  // Iterate over each list element
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
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
  var lists = document.querySelectorAll("#list");

  // Iterate over each list element
  for (var i = 0; i < lists.length; i++) {
    var list = lists[i];
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

    document.getElementById("sort_by_quality_button").onclick = QsortID;
    document.getElementById("sort_by_name_button").onclick = NsortID;
    document.getElementById("sort_by_player_button").onclick = PsortID;
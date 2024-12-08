;(function () {
    console.log("Fandom wiki page loaded!");
  const divs = document.querySelectorAll('div');
var count_a = 0;
var count_b = 0;
var count_c = 0;
var count_d = 0;
var count_e = 0;
var count_f = 0;
var count_g = 0;
var count_h = 0;
var count_i = 0;
for (var i = 0; i < divs.length; i++) {
  var div = divs[i];
  if (div.id && div.id.includes('quality-A')) {
    count_a++;
  }
  if (div.id && div.id.includes('quality-B')) {
    count_b++;
  }
  if (div.id && div.id.includes('quality-C')) {
    count_c++;
  }
  if (div.id && div.id.includes('quality-D')) {
    count_d++;
  }
  if (div.id && div.id.includes('quality-E')) {
    count_e++;
  }
  if (div.id && div.id.includes('quality-F')) {
    count_f++;
  }
  if (div.id && div.id.includes('quality-G')) {
    count_g++;
  }
  if (div.id && div.id.includes('quality-H')) {
    count_h++;
  }
  if (div.id && div.id.includes('quality-I')) {
    count_i++;
  }
}
const a_div = document.getElementById("A-qount");
const b_div = document.getElementById("B-qount");
const c_div = document.getElementById("C-qount");
const d_div = document.getElementById("D-qount");
const e_div = document.getElementById("E-qount");
const f_div = document.getElementById("F-qount");
const g_div = document.getElementById("G-qount");
const h_div = document.getElementById("H-qount");
const i_div = document.getElementById("I-qount");
const total_div = document.getElementById("qount");
  if (a_div) {
    a_div.textContent = count_a;
  }
  if (b_div) {
    b_div.textContent = count_b;
  }
  if (c_div) {
    c_div.textContent = count_c;
  }
  if (d_div) {
    d_div.textContent = count_d;
  }
  if (e_div) {
    e_div.textContent = count_e;
  }
  if (f_div) {
    f_div.textContent = count_f;
  }
  if (g_div) {
    g_div.textContent = count_g;
  }
  if (h_div) {
    h_div.textContent = count_h;
  }
  if (i_div) {
    i_div.textContent =  count_i;
  }
  if (total_div) {
    total_div.textContent = count_i + count_h + count_g + count_f + count_e + count_d + count_c + count_b + count_a;
  }
}());
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
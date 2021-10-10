importScript('MediaWiki:COSFilter.js');
importScript('MediaWiki:Common.js/calc.js');

document.getElementsByClassName("page-content").innerHTML =+ "<div style='background-color:#bbb;color:#999;border:10px solid green;'>HELP HELP HELP HELP</div>";

// Any JavaScript here will be loaded for all users on every page load.
// Javascript for 'Attempt at Making a Working Filter'
filterType("all");
function filterType(c) {
  var x, i;
  x = document.getElementsByClassName("filterDiv");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove it from the elements that aren't selected \\
  for (i = 0; i < x.length; i++) {
    removeClass(x[i], "show"); 
    if (x[i].className.indexOf(c) > -1) addClass(x[i], "show");
  }  
}

// Show filtered elements
function addClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" "); 
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

 // Hide elements that are not selected
function removeClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}
  
// Add active class to the current control button (highlight it)  
var buttonContainer = document.getElementById("buttonBox");
var buttons = buttonContainer.getElementsByClassName("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Testing user input JS
function myFunction() {
  var x, y, z, a, text, text2, text3;

  x = document.getElementById("numb").value;
  y = 250+(550+150*(x-2))*(x-1);
  z = 5+0.5*(x-1);
  a = 5+0.2*(x-1);
  text = y; text2 = z; text3 = a;
  document.getElementById("demo").innerHTML = text;
  document.getElementById("demo2").innerHTML = text2;
  document.getElementById("demo3").innerHTML = text3;
}

$(function () {
  if ($('#ll55-wrapper').length) {
    document.getElementById('ll55-wrapper').innerHTML =
      '<p>Please input the current level:</p>' +
      '<input id="numb" type="number" style="width: 130px">' +
      '<button type="button" onclick="myFunction()">Submit</button>' +
      '<p><img src="Gold.png"> <a id="demo">250</a></p>' +
      '<p><a id="demo2">5</a>%</p>' +
      '<p><a id="demo3">5</a>%</p>';
  }
});

// Alternature use input

!function() {
    var $in = $('<input>', {type: 'text'}),
        $do = $('<input>', {type: 'button', value: 'do'}),
        $wrap = $('<span>', {class: '.mycalc-wrap'});
    $wrap.append([$in, $do]);
    $('.mycalc').append($wrap);
    function doe(what) {
        alert(eval(what));
    }
    $in.on('keydown', function(e) {
        if (e.which === 13) doe($in.val());
    });
    $do.on('click', function(e) {
        doe($in.val());
    });
}();

// Javascript for 'Attempt at Making a Working Filter' ends here 
//

function myFunction() {
  var x, y, z, a, text, text2, text3;

  x = document.getElementById("numb").value;
  y = 250+(550+150*(x-2))*(x-1);
  z = 5+0.5*(x-1);
  a = 5+0.2*(x-1);
  text = y; text2 = z; text3 = a;
  document.getElementById("demo").innerHTML = text;
  document.getElementById("demo2").innerHTML = text2;
  document.getElementById("demo3").innerHTML = text3;
}

$(function () {
  if ($('#ll55-wrapper').length) {
    document.getElementById('ll55-wrapper').innerHTML =
      '<p>Please input the current level:</p>' +
      '<input id="numb" type="number" style="width: 130px">' +
      '<button type="button" onclick="myFunction()">Submit</button>' +
      '<p><img src="Gold.png"> <a id="demo">250</a></p>' +
      '<p><a id="demo2">5</a>%</p>' +
      '<p><a id="demo3">5</a>%</p>';
  }
});

function myFunction() {
  var x, y, z, a, text, text2, text3;

  x = document.getElementById("numb").value;
  y = 250+(550+150*(x-2))*(x-1);
  z = 5+0.5*(x-1);
  a = 5+0.2*(x-1);
  text = y; text2 = z; text3 = a;
  document.getElementById("demo").innerHTML = text;
  document.getElementById("demo2").innerHTML = text2;
  document.getElementById("demo3").innerHTML = text3;
}

$(function () {
  if ($('#ll55-wrapper').length) {
    document.getElementById('ll55-wrapper').innerHTML =
      '<p>Please input the current level:</p>' +
      '<input id="numb" type="number" style="width: 130px">' +
      '<button type="button" onclick="myFunction()">Submit</button>' +
      '<p><img src="Gold.png"> <a id="demo">250</a></p>' +
      '<p><a id="demo2">5</a>%</p>' +
      '<p><a id="demo3">5</a>%</p>';
  }
});
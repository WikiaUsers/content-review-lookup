importScript('MediaWiki:COSFilter.js');
importScript('MediaWiki:Common.js/calc.js');

/*document.getElementsByClassName("page-content").innerHTML.div.style.background-color = "blue";*/

document.getElementById('other-wrapped-here')[0]
        .addEventListener('click', function (event) {
            selectionHERE();
        });
        
function selectionHERE() {
	document.getElementById("other-wrapped-here").innerHTML = "{{Calculator/Sandbox|"+ 100 + "|"+ YESSSS +"}}";
}

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
      '<p><img src="https://static.wikia.nocookie.net/pawnwikiwootesting/images/2/26/Egg.png/revision/latest?cb=20211025202136&format=original"> <a id="demo">250</a></p>' +
      '<p><a id="demo2">5</a>%</p>' +
      '<p><a id="demo3">5</a>%</p>';
      document.getElementById('ll55-wrapper').innerHTML = "DOES this even WORK????";
  }
});
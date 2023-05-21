
	if (document.getElementsByClassName('all')[0] != null && document.getElementsByClassName('all') != null) {
		document.getElementsByClassName('all')[0]
	        .addEventListener('click', function (event) {
	            filterSelection("all")
	        });
	}
	
	if (document.getElementsByClassName('tier1')[0] != null && document.getElementsByClassName('tier1') != null) {
		document.getElementsByClassName('tier1')[0]
	        .addEventListener('click', function (event) {
	            filterSelection("tier1")
	        });
	}	
	
	if (document.getElementsByClassName('tier2')[0] != null && document.getElementsByClassName('tier2') != null) {
		document.getElementsByClassName('tier2')[0]
	        .addEventListener('click', function (event) {
	            filterSelection("tier2")
	        });
	}
	
	if (document.getElementsByClassName('tier3')[0] != null && document.getElementsByClassName('tier3') != null) {
		document.getElementsByClassName('tier3')[0]
	        .addEventListener('click', function (event) {
	            filterSelection("tier3")
	        });
	}
	
	if (document.getElementsByClassName('tier4')[0] != null && document.getElementsByClassName('tier4') != null) {
		document.getElementsByClassName('tier4')[0]
	        .addEventListener('click', function (event) {
	            filterSelection("tier4")
	        });
	}
	
	if (document.getElementsByClassName('tier5')[0] != null && document.getElementsByClassName('tier5') != null) {
		document.getElementsByClassName('tier5')[0]
	        .addEventListener('click', function (event) {
	            filterSelection("tier5")
	        });
	}

/* Rest of code */

filterSelection("all")
function filterSelection(c) {
	  var x, i;
	  
	  if (document.getElementsByClassName("filterDiv") != null) {
		  x = document.getElementsByClassName("filterDiv");
		  if (c == "all") c = "";
		  for (i = 0; i < x.length; i++) {
		    removeFilterSection(x[i], "show");
		    if (x[i].className.indexOf(c) > -1) addFilterSection(x[i], "show");
		 }
	  }
}

function addFilterSection(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function removeFilterSection(element, name) {
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

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");

if (btnContainer != null) {
	var btns = btnContainer.getElementsByClassName("btn");
	for (var i = 0; i < btns.length; i++) {
	  btns[i].addEventListener("click", function(){
	    var current = document.getElementsByClassName("active");
	    current[0].className = current[0].className.replace(" active", "");
	    this.className += " active";
	  });
	}
}
  //console.log('logs immediately');
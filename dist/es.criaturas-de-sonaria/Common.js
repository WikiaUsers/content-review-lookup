importArticles({
	type: 'script',
	articles: [
		'MediaWiki:Common.js/shoom-calc.js'
		]
})
/* Any JavaScript here will be loaded for all users on every page load. */
/* UserTags */

/* window.UserTagsJS = {
	modules: {},
	tags: {},
	oasisPlaceBefore: ''
}; */

/* window.UserTagsJS = {
	modules: {},
	tags: {
		developer: { u: 'Developer', order: 100 },
		tester: { u: 'Tester', order: 101 },
		officialcreaturecreator: { u: 'Official Creature Creator', order: 102 }
	}
};

UserTagsJS.modules.custom = {
	'PawnDive': ['tester'], // Add Editor of the Month + Featured
	'Floweries': ['tester'], // Add featured
	'NauticaElurra': ['tester', 'officialcreaturecreator', 'developer'],
	'VeryYellowDuck': ['officialcreaturecreator'], // Add Featured + Templates Guru
	'UserName 4': ['inactive'] // Always Inactive
};

UserTagsJS.modules.mwGroups = ['developer', 'tester', 'officialcreaturecreator'];

/* END - UserTags */

/* Filtering by each class... */
if (this) {
document.getElementsByClassName('all')[0]
        .addEventListener('click', function (event) {
            filterSelection("all")
        });

document.getElementsByClassName('tier1')[0]
        .addEventListener('click', function (event) {
            filterSelection("tier1")
        });

document.getElementsByClassName('tier2')[0]
        .addEventListener('click', function (event) {
            filterSelection("tier2")
        });

document.getElementsByClassName('tier3')[0]
        .addEventListener('click', function (event) {
            filterSelection("tier3")
        });
        
document.getElementsByClassName('tier4')[0]
        .addEventListener('click', function (event) {
            filterSelection("tier4")
        });
        
document.getElementsByClassName('tier5')[0]
        .addEventListener('click', function (event) {
            filterSelection("tier5")
        });

/* Rest of code */
filterSelection("all")
function filterSelection(c) {
	  var x, i;
	  x = document.getElementsByClassName("filterDiv");
	  if (c == "all") c = "";
	  for (i = 0; i < x.length; i++) {
	    remove(x[i], "show");
	    if (x[i].className.indexOf(c) > -1) add(x[i], "show");
	 }
}
function add(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function remove(element, name) {
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
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
}
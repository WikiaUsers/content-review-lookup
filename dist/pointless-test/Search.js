var catList = []; //declare 'catList'
var allCats = new Map([
  ['Male','Gender:Male'],
  ['Female','Gender:Female'],
  ['Other','Gender:Other'],
]);
var outString = ""; //declare 'outString'
var catPlus = "Category:";

function ddC(cat) {
  var index = catList.indexOf(cat); //sets 'index' to the first instance of the param 'cat'
  if (index == -1) {
    //if 'cat' is not in array
    catList.push(cat); //add 'cat' to the end
    document.getElementById(cat).innerHTML = "<b>" + cat + "</b>";
    //bold
  } else {
    //if 'cat' is in array
    catList.splice(index, 1); //remove it from the array
    document.getElementById(cat).innerHTML = cat;
  }
}

function catg(value) {
  outString += catPlus + allCats.get(value) + "<br>";
  //set output to "Catagory:" + the value of the array element + newline
}

function output() {
  catList.forEach(catg); //run catg for every array element
  document.getElementById("output").innerHTML = outString;
  //output outString into DPL params
  outString = ""; //empty outString to allow next run
}

function cB(cat, row) {
  var button = document.createElement('button');
  button.innerHTML = cat;
  if (cat == 'Submit') {
    button.onclick = function () { output(); };
  } else {
    button.onclick = function () { ddC(cat); };
  }
  button.id = cat;
  document.getElementById(row).appendChild(button);
}

if (window.location.pathname == '/wiki/DPL_Testing') {
//Create buttons

//Genders
cB('Male', 'r1');
cB('Female', 'r1');
cB('Other', 'r1');

//Submit
cB('Submit', 'r2');

}
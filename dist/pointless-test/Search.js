var catList = []; //declare 'catList'
var outString = ""; //declare 'outString'
var catPlus = "Category:"

function dropdownClick(cat) {
    var index = catList.indexOf(cat); //sets 'index' to the first instance of the param 'cat'
    if (index == -1) { //if 'cat' is not in array
        catList.push(cat);  //add 'cat' to the end
        document.getElementById(cat).innerHTML = "<b>"+cat+"</b>";
        //bold  
    } else { //if 'cat' is in array
        catList.splice(index,1); //remove it from the array
        document.getElementById(cat).innerHTML = cat;
    }
}

function catg(value) {
    outString += catPlus + value + "<br>"; 
    //set output to "Catagory:" + the value of the array element + newline
}

function output() {
    catList.forEach(catg) //run catg for every array element
    document.getElementById("output").innerHTML = outString;
    //output outString into DPL params
    outString = ""; //empty outString to allow next run
}
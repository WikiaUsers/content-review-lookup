console.log("Touken Script 006");

// Import external scripts
importArticles({
    type: 'script',
    articles: [
        'u:dev:BackToTopButton/code.js',
        'MediaWiki:Countdown.js',
        //'MediaWiki:Sm2.js',
        'MediaWiki:FixVignette.js',
    ]
});

/*
if (mw.config.get("wgUserGroups").indexOf('sysop') > -1) {
  massRenameDelay = 800;
  massRenameSummary = 'automatic';
  importScriptPage('MassRename/code.js', 'dev');
  
  batchDeleteDelay = 800;
  importScriptPage('AjaxBatchDelete/code.2.js', 'dev');
}

if (mw.config.get("wgUserGroups").indexOf('poweruser') > -1) {
  nullEditDelay = 600;
  importScriptPage('MassNullEdit/code.js', 'dev');
}
*/

/*----------If you got any question with this code for the filter, please contact LeafWolf233 through Touken Ranbu wiki ----------*/
/*----------For the custom mutil-filter on the character table (Ver. 1.0)----------*/
 
/*-----Varibles-----*/
//grab datas from the table, not including the header
const container = document.querySelector(".tabbertab[title='Detalles de todos los personajes']");
const table = container.querySelectorAll("tr:not(#header)");
 
//buttons
const tantouFilter = document.querySelector("div#Tantou");
const wakiFilter = document.querySelector("div#Wakizashi");
const uchiFilter = document.querySelector("div#Uchigatana");
const tachiFilter = document.querySelector("div#Tachi");
const ootachiFilter = document.querySelector("div#Ootachi");
const yariFilter = document.querySelector("div#Yari");
const nagiFilter = document.querySelector("div#Naginata");
const tsurugiFilter = document.querySelector("div#Tsurugi");
 
const tokuFilter = document.querySelector("div#Toku");
const kiwameFilter = document.querySelector("div#Kiwame");
 
const r1Filter = document.querySelector("span#Baja");
const r2Filter = document.querySelector("span#Media");
const r3Filter = document.querySelector("span#Alta");
const r4Filter = document.querySelector("span#Especial");
const r5Filter = document.querySelector("span#Superior");
 
const forjaFilter = document.querySelector("span#Forja");
const caidaFilter = document.querySelector("span#Caida");
const limitadoFilter = document.querySelector("span#Limitado");
 
const resetearFilter = document.querySelector("span#Resetear");
 
//arraies that store differrent types of clicked buttons' id
const tipos = [];
const kiwameStatus = [];
const rareza = [];
const disponibilidad = [];
const allButtons = [tipos, kiwameStatus, rareza, disponibilidad];
 
//path for buttons' image
const tantou = "https://vignette.wikia.nocookie.net/touken-ranbu/images/6/69/Tantou.png";
const waki = "https://vignette.wikia.nocookie.net/touken-ranbu/images/b/b8/Wakizashi.png";
//const wakiClicked = "https://vignette.wikia.nocookie.net/touken-ranbu/images/a/a4/Wakizashi-r3.png";
const uchi = "https://vignette.wikia.nocookie.net/touken-ranbu/images/4/46/Uchigatana.png";
const tachi = "https://vignette.wikia.nocookie.net/touken-ranbu/images/5/54/Tachi.png";
const ootachi = "https://vignette.wikia.nocookie.net/touken-ranbu/images/f/f3/Ootachi.png";
const yari = "https://vignette.wikia.nocookie.net/touken-ranbu/images/b/b4/Yari.png";
const nagi = "https://vignette.wikia.nocookie.net/touken-ranbu/images/4/49/Naginata.png";
const tsurugi = "https://vignette.wikia.nocookie.net/touken-ranbu/images/c/c1/Tsurugi.png";
const toku = "https://vignette.wikia.nocookie.net/touken-ranbu/images/5/57/Toku-button.png";
const kiwame = "https://vignette.wikia.nocookie.net/a-normal-playground/images/5/56/Kiwame.png";
const generalClicked = "https://vignette.wikia.nocookie.net/touken-ranbu/images/6/62/Clicked-button.png"; //for testing purpose
//button's border style
const unclickedBorder = "2px solid rgb(205,208,214)";
const clickedBorder = "2px solid rgb(255, 255, 255)";
 
/*-----Calling functions-----*/
//bind events to buttons
tantouFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, tantou, generalClicked)});
wakiFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, waki, generalClicked)});
uchiFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, uchi, generalClicked)});
tachiFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, tachi, generalClicked)});
ootachiFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, ootachi, generalClicked)});
yariFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, yari, generalClicked)});
nagiFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, nagi, generalClicked)});
tsurugiFilter.addEventListener("click", function() {buttonOperationDiv(this, tipos, tsurugi, generalClicked)});
 
tokuFilter.addEventListener("click", function() {buttonOperationDiv(this, kiwameStatus, toku, generalClicked)});
kiwameFilter.addEventListener("click", function() {buttonOperationDiv(this, kiwameStatus, kiwame, generalClicked)});
 
r1Filter.addEventListener("click", function() {buttonOperationSpan(this, rareza)});
r2Filter.addEventListener("click", function() {buttonOperationSpan(this, rareza)});
r3Filter.addEventListener("click", function() {buttonOperationSpan(this, rareza)});
r4Filter.addEventListener("click", function() {buttonOperationSpan(this, rareza)});
r5Filter.addEventListener("click", function() {buttonOperationSpan(this, rareza)});
 
forjaFilter.addEventListener("click", function() {buttonOperationSpan(this, disponibilidad)});
caidaFilter.addEventListener("click", function() {buttonOperationSpan(this, disponibilidad)});
limitadoFilter.addEventListener("click", function() {buttonOperationSpan(this, disponibilidad)});
 
resetearFilter.addEventListener("click", function() {resetear()});
 
 
 
/*-----Functions-----*/
//main function for button made by div [the code is inspired by Kévin Bibollet from stack overflow]
function buttonOperationDiv(clickedElement, buttonArray, unclickedImageSrc, clickedImageSrc){
    //store button's img element and img's src for future use
    currentImg = clickedElement.querySelector("img");
    currentImgSrc = currentImg.getAttribute("src");
    //is the button being clicked
    isFiltered = (currentImgSrc === clickedImageSrc);
 
    //button was clicked, undo the filtering
    if(isFiltered){ 
        currentImg.setAttribute("src", unclickedImageSrc);
        //remove the id from the array
        removeFromArray(clickedElement.id, buttonArray);
        //if no other button is in clicked status, set the table back to dafault display
        if(checkMainArrayEmptiness()){
            resetTable();
        }else{
            hideAllRows();
            buttonFilter();
        }
    }else{ //button isn't clicked, start filtering
        currentImg.setAttribute("src", clickedImageSrc);
        //store id into array
        buttonArray.push(clickedElement.id);
        hideAllRows();
        buttonFilter();
    }
}
 
//main function for button made by span [the code is inspired by Kévin Bibollet from stack overflow]
function buttonOperationSpan(button, buttonArray){
    //store button's img element and img's src for future use
    currentBorder = button.style.border;
    //is the button being clicked
    isFiltered = (currentBorder === clickedBorder);
 
    //button was clicked, undo the filtering
    if(isFiltered){ 
        button.style.border = unclickedBorder;
        //remove the id from the array
        removeFromArray(button.id, buttonArray);
        //if no other button is in clicked status, set the table back to dafault display
        if(checkMainArrayEmptiness()){
            resetTable();
        }else{
            hideAllRows();
            buttonFilter();
        }
    }else{ //button isn't clicked, start filtering
        button.style.border = clickedBorder;
        //store id into array
        buttonArray.push(button.id);
        hideAllRows();
        buttonFilter();
    }
}
 
//reset the filtering on table, is used in buttonOperation()
function resetTable(){
    for(i = 0; i < table.length; i++){
        table[i].style.display = "";
    }
}
 
//hide all rows of the table
function hideAllRows(){
    for(i = 0; i < table.length; i++){
        table[i].style.display = "none";
    }
}
 
//remove id from the array based on the input, is used in buttonOperation()
function removeFromArray(inputID, array){
    var tempIndex = array.indexOf(inputID);
    if(tempIndex !== -1){
        array.splice(tempIndex, 1);
    }
}
 
//check whether the array of buttons is empty, is return true if yes, false as no, used in buttonOperation()
function checkMainArrayEmptiness(){
    for(i = 0; i < allButtons.length; i++){
        if(allButtons[i].length !== 0){
            return false;
        }
    }
    return true;
}
 
//filtering the table based on the array which store all clicked button, is used in buttonOperation(). The code is written by Elphas Tori from stack overflow
function buttonFilter(){
 
    var combinations = allButtons.reduce(function (previous, current) {
 
    if (current.length === 0)
        return previous;
 
    if (previous.length === 0)
        return current;
 
    const accumulate = current.map(function (cur){
 
        return previous.map(function(pre) {
            if(Array.isArray(pre)){
                return pre.concat(cur);
            }
                return [pre].concat(cur);
        });
    });
 
    // Flatten combinations
    return accumulate.reduce( function (acc, x) {
        return acc.concat(x);
    });
});
 
    combinations.forEach(function (combination) { 
        //if the output is string, convert it into an array for the convenience of checkIDFromArray()
        if(typeof combination === "string"){
            checkIDFromArray([combination]);
        }else{
            checkIDFromArray(combination);
        }
 
    });
}
 
//check whether this column has all the values from array, return true if is, vise versa. Is used in filter()
function checkIDFromArray(inputArray){
    var childElements;
    var matched = 0;
    var sameAmountID;
    var rexValue;
    var rexFull;
    //loop through the whole table's html for each row a time
    for(i = 0; i < table.length; i++){
        //a collection of children of a table row
        childElements = table[i].children;
        //loop through some related children till find the matched html
        for(var p = 4; p < childElements.length; p++){
            //loop through the inputArray to compare with child element
            for(var q = 0; q < inputArray.length; q++){
                //turn the id from array into regular expression for filtering purpose
                rexValue = "\\b" + inputArray[q] + "\\b";
                rexFull = new RegExp(rexValue, "i");
                //if the column have the exact same word, match count +1
                if(rexFull.test(childElements[p].innerHTML)){
                    matched++;
                }
                //quit the loop if the row have same amounts of matched id compare to input Array, also set display to ""
                sameAmountID = (matched === inputArray.length);
                if(sameAmountID){
                   table[i].style.display = ""; 
                   break;
                }
            }
        }
        matched = 0;
    }
}
 
//for reset all the button and the table
function resetear(){
    //empty the array of buttons
    for (var arr in allButtons){
        allButtons[arr].splice(0, allButtons[arr].length);
    }
 
    //reset button's dafault img/border
    //img
    const buttonDivs = [tantouFilter, wakiFilter, uchiFilter, tachiFilter, ootachiFilter, yariFilter, nagiFilter, tsurugiFilter, tokuFilter, kiwameFilter];
    const buttonImgSrc = [tantou, waki, uchi, tachi, ootachi, yari, nagi, tsurugi, toku, kiwame];
    for(var i in buttonDivs){
        buttonDivs[i].querySelector("img").setAttribute("src", buttonImgSrc[i])
    }
    //border
    const buttonSpans = [r1Filter, r2Filter, r3Filter, r4Filter, r5Filter, forjaFilter, caidaFilter, limitadoFilter];
    for(var c in buttonSpans){
        buttonSpans[c].style.border = unclickedBorder;
    }
 
    //reset the table
    resetTable();
}
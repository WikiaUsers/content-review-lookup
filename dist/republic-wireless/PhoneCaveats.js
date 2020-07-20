/* The table on Republic_Phone_Caveats uses CSS to enable horizontal scrolling. */
/* Unfortunately, the row heights do not line up when broken apart like this. */
/* This script will set each row's height equal to the larger of the two sections. */


/* Find out how many rows and columns we're dealing with */
var oneRow=document.getElementById('customWidthWrapper').getElementsByTagName("tr");
var rowCount=oneRow.length;
/* rowCount is exact number of rows in the table, begins with 1 */

/* For each row in the table, compare and change to higher value the row height on the left to that on the right.*/
/* also rewrite rows that were identical to fix "speed bump." */
/* style each row after resize */

  for (var eachRow=1;eachRow<rowCount;eachRow++){
        var elmntLeft = oneRow[eachRow].children[0].clientHeight;
        var elmntRight = oneRow[eachRow].children[1].clientHeight;
        
        if (elmntLeft > elmntRight){     
            var newRowHeightL=elmntLeft;
            oneRow[eachRow].children[1].style.height=newRowHeightL+"px";
            oneRow[eachRow].children[1].style.maxHeight=newRowHeightL+"px";
            oneRow[eachRow].children[0].style.height=newRowHeightL+"px";
            oneRow[eachRow].children[0].style.maxHeight=newRowHeightL+"px";
            oneRow[eachRow].style.height=newRowHeightL+"px";
            oneRow[eachRow].style.maxHeight=newRowHeightL+"px";
       }
        else {
            var newRowHeightR=elmntRight+1;
            oneRow[eachRow].children[0].style.height=newRowHeightR+"px";
            oneRow[eachRow].children[0].style.maxHeight=newRowHeightR+"px";
            oneRow[eachRow].children[1].style.height=newRowHeightR+"px";    
            oneRow[eachRow].children[1].style.maxHeight=newRowHeightR+"px";
            oneRow[eachRow].style.height=newRowHeightR+"px";
            oneRow[eachRow].style.maxHeight=newRowHeightR+"px";
        }
        
        oneRow[eachRow].style.borderBottom="1px solid #e8e8e8";
        oneRow[eachRow].style.top="auto";
}

/* For our next trick, we'll make columns disappear and re-appear on demand */
/* count the number of columns in the table */


var colCount=oneRow[1].getElementsByTagName("td").length;
var modelKind;
var hideButtonName;
var unhideButtonName;
/* determine width of the first column */
var colWidth=(100/(colCount));
var colWidthUsage=colWidth+"%";
var colWidth1=colWidth*2;


/* make buttons move from hide to restore row */
/* make columns disappear when button is clicked. */

function hideColumns (){
    /* hide the "hide" button, reveal the "unhide" button */
    hideButtonName="hide"+modelKind;
    unhideButtonName="unhide"+modelKind;
    document.getElementById(hideButtonName).style.visibility="hidden"; 
    document.getElementById('unhideButtons').style.visibility="visible";
    document.getElementById(unhideButtonName).style.visibility="visible";
    for (var scanHeader=1;scanHeader<colCount;scanHeader++){
        cetteCol=oneRow[0].getElementsByTagName("th")[scanHeader];
        var colHeader=cetteCol.innerText.replace( /^\s+|\s+$/g,"");
        if (colHeader==modelKind){
            for (var chaqueRow=0;chaqueRow<rowCount;chaqueRow++){
                var chaqueCell=oneRow[chaqueRow].children[scanHeader];
                chaqueCell.style.display="none";
                chaqueCell.style.width="0";
            }
        }
    }
/* table width adjustment goes here */
/*     colWidth1=colWidth1-(colWidth);
    var colWidthNewUsage=colWidth1+"%";
  document.getElementById('customWidthWrapper').children[0].children[0].children[0].style.marginLeft=colWidthNewUsage; */


}

/* make buttons move from restore to hid row */
/* make columns re-appear when button is clicked. */

function unhideColumns (){
    /* hide the "unhide" button, reveal the "hide" button */
    hideButtonName="hide"+modelKind;
    unhideButtonName="unhide"+modelKind;
    document.getElementById(unhideButtonName).style.visibility="hidden"; 
    document.getElementById(hideButtonName).style.visibility="visible";
/* make the column with that column name re-appear */
    for (var scanHeader=1;scanHeader<colCount;scanHeader++){
        cetteCol=oneRow[0].getElementsByTagName("th")[scanHeader];
        var colHeader=cetteCol.innerText.replace( /^\s+|\s+$/g,"");
        if (colHeader==modelKind){
            for (var chaqueRow=0;chaqueRow<rowCount;chaqueRow++){
                var chaqueCell=oneRow[chaqueRow].children[scanHeader];
                chaqueCell.style.display="table-cell";
                chaqueCell.style.width=colWidthUsage;
            }
        }
    }
}

$('#hideXT').click(function () {
    modelKind="XT";
    hideColumns();
});
$('#unhideXT').click(function () {
    modelKind="XT";
    unhideColumns();
});
$('#hideX1').click(function () {
    modelKind="X1";
    hideColumns();
});
$('#unhideX1').click(function () {
    modelKind="X1";
    unhideColumns();
});
$('#hideX2').click(function () {
    modelKind="X2";
    hideColumns();
});
$('#unhideX2').click(function () {
    modelKind="X2";
    unhideColumns();
});
$('#hideG1').click(function () {
    modelKind="G1";
    hideColumns();
});
$('#unhideG1').click(function () {
    modelKind="G1";
    unhideColumns();
});
$('#hideG3').click(function () {
    modelKind="G3";
    hideColumns();
});
$('#unhideG3').click(function () {
    modelKind="G3";
    unhideColumns();
});
$('#hideE1').click(function () {
    modelKind="E1";
    hideColumns();
});
$('#unhideE1').click(function () {
    modelKind="E1";
    unhideColumns();
});
$('#hideE2').click(function () {
    modelKind="E2";
    hideColumns();
});
$('#unhideE2').click(function () {
    modelKind="E2";
    unhideColumns();
});
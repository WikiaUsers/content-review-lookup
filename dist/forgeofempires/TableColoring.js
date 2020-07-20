/* negative and positive values get colored accordingly */
$(function() {
    $('.ProdTable td').each(function(index) {
 
        switch (($(this).text() || '').trim().slice(0,1)) {
            case '+':
                $(this).css('color','lime');
                break;
            case '-':
                $(this).css('color','red');
                break;
        }
    });
});
/* Auto background coloring according to age */
$(function() {
  $('.AgeTable td:first-child').each(function(index) {
    switch (($(this).text() || '').trim()) {
       case 'NA':
       case 'No Age':
         $(this).addClass("ColorNA");
         break;
      case 'SA':
       case 'Stone Age':
         $(this).addClass("ColorSA");
         break;
        case 'BA':
       case 'Bronze Age':
         $(this).addClass("ColorBA");
         break;
       case 'IA':
       case 'Iron Age':
         $(this).addClass("ColorIA");
         break;
       case 'EMA':
       case 'Early Middle Ages':
         $(this).addClass("ColorEMA");
         break;
       case 'HMA':
       case 'High Middle Ages':
         $(this).addClass("ColorHMA");
         break;
       case 'LMA':
       case 'Late Middle Ages':
         $(this).addClass("ColorLMA");
         break;
       case 'CA':
       case 'Colonial Age':
         $(this).addClass("ColorCA");
         break;
       case 'INA':
       case 'Industrial Age':
         $(this).addClass("ColorINA");
         break;
       case 'PE':
       case 'Progressive Era':
         $(this).addClass("ColorPE");
         break;
       case 'ME':
       case 'Modern Era':
         $(this).addClass("ColorME");
         break;
       case 'PME':
       case 'Postmodern Era':
         $(this).addClass("ColorPME");
         break;
       case 'CE':
       case 'Contemporary Era':
         $(this).addClass("ColorCE");
         break;
       case 'TE':
       case 'Tomorrow Era':
         $(this).addClass("ColorTE");
         break;
       case 'FE':
       case 'Future Era':
         $(this).addClass("ColorFE");
         break;
       case 'AF':
       case 'Arctic Future':
         $(this).addClass("ColorAF");
         break;
       case 'OF':
       case 'Oceanic Future':
         $(this).addClass("ColorOF");
         break;
       case 'VF':
       case 'Virtual Future':
         $(this).addClass("ColorVF");
         break;
       case 'SAM':
       case 'Space Age Mars':
         $(this).addClass("ColorSAM");
         break;
       case 'SAAB':
       case 'Space Age Asteroid Belt':
         $(this).addClass("ColorSAAB");
         break;
    }
  });
});
 
$(function() {
  $('.AgeTable th').each(function(index) {
    switch (($(this).text() || '').trim()) {
       case 'NA':
       case 'No Age':
         $(this).addClass("ColorNA");
         break;
      case 'SA':
       case 'Stone Age':
         $(this).addClass("ColorSA");
         break;
        case 'BA':
       case 'Bronze Age':
         $(this).addClass("ColorBA");
         break;
       case 'IA':
       case 'Iron Age':
         $(this).addClass("ColorIA");
         break;
       case 'EMA':
       case 'Early Middle Ages':
         $(this).addClass("ColorEMA");
         break;
       case 'HMA':
       case 'High Middle Ages':
         $(this).addClass("ColorHMA");
         break;
       case 'LMA':
       case 'Late Middle Ages':
         $(this).addClass("ColorLMA");
         break;
       case 'CA':
       case 'Colonial Age':
         $(this).addClass("ColorCA");
         break;
       case 'INA':
       case 'Industrial Age':
         $(this).addClass("ColorINA");
         break;
       case 'PE':
       case 'Progressive Era':
         $(this).addClass("ColorPE");
         break;
       case 'ME':
       case 'Modern Era':
         $(this).addClass("ColorME");
         break;
       case 'PME':
       case 'Postmodern Era':
         $(this).addClass("ColorPME");
         break;
       case 'CE':
       case 'Contemporary Era':
         $(this).addClass("ColorCE");
         break;
       case 'TE':
       case 'Tomorrow Era':
         $(this).addClass("ColorTE");
         break;
       case 'FE':
       case 'Future Era':
         $(this).addClass("ColorFE");
         break;
       case 'AF':
       case 'Arctic Future':
         $(this).addClass("ColorAF");
         break;
       case 'OF':
       case 'Oceanic Future':
         $(this).addClass("ColorOF");
         break;
       case 'VF':
       case 'Virtual Future':
         $(this).addClass("ColorVF");
         break;
       case 'SAM':
       case 'Space Age Mars':
         $(this).addClass("ColorSAM");
         break;
       case 'SAAB':
       case 'Space Age Asteroid Belt':
         $(this).addClass("ColorSAAB");
         break;
    }
  });
});
 
/*Table wrapping*/
var myTables = document.getElementsByClassName("WrapTable");
for(var j=0;j<myTables.length;j++)
{
var myTable = myTables[j];
var myDiv = myTable.parentElement;
var newTable = document.createElement("table");
 
newTable.setAttribute("class", myTable.className.replace(/\bWrapTable\b/g, ""));
newTable.innerHTML =  myTable.innerHTML;
myTable.style.width = "49.5%";
newTable.style.cssText = myTable.style.cssText;
myTable.style.float = "left";
newTable.style.float = "rigth";
myTable.parentNode.insertBefore(newTable, myTable.nextSibling);
 
var rows = myTable.getElementsByTagName("tr");
var rowsCopy = newTable.getElementsByTagName("tr");
 
//start from 1 instead of 0 because first row are the headers
for(var i=1;i<rows.length;i++)
{
    if(i>(rows.length/2))
    {
        rows[i].style.display = "none";
    }else
    {
        rowsCopy[i].style.display = "none";
    }
}
}
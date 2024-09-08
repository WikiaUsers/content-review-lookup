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
function mapStringToAge(string) {
  switch (string) {
    case 'NA':
    case 'No Age':
      return "ColorNA";
    case 'SA':
    case 'Stone Age':
      return "ColorSA";
    case 'BA':
    case 'Bronze Age':
      return "ColorBA";
    case 'IA':
    case 'Iron Age':
      return "ColorIA";
    case 'EMA':
    case 'Early Middle Ages':
      return "ColorEMA";
    case 'HMA':
    case 'High Middle Ages':
      return "ColorHMA";
    case 'LMA':
    case 'Late Middle Ages':
      return "ColorLMA";
    case 'CA':
    case 'Colonial Age':
      return "ColorCA";
    case 'INA':
    case 'Industrial Age':
      return "ColorINA";
    case 'PE':
    case 'Progressive Era':
      return "ColorPE";
    case 'ME':
    case 'Modern Era':
      return "ColorME";
    case 'PME':
    case 'Postmodern Era':
      return "ColorPME";
    case 'CE':
    case 'Contemporary Era':
      return "ColorCE";
    case 'TE':
    case 'Tomorrow Era':
      return "ColorTE";
    case 'FE':
    case 'Future Era':
      return "ColorFE";
    case 'AF':
    case 'Arctic Future':
      return "ColorAF";
    case 'OF':
    case 'Oceanic Future':
      return "ColorOF";
    case 'VF':
    case 'Virtual Future':
      return "ColorVF";
    case 'SAM':
    case 'Space Age Mars':
      return "ColorSAM";
    case 'SAAB':
    case 'Space Age Asteroid Belt':
      return "ColorSAAB";
    case 'SAV':
	case 'Space Age Venus':
	  return "ColorSAV";
    case 'SAJM':
	case 'Space Age Jupiter Moon':
	  return "ColorSAJM";	 
	case 'SAT':
	case 'Space Age Titan':
	  return "ColorSAT";
	case 'SASH':
	case 'Space Age Space Hub':
	  return "ColorSASH";
  }
  return undefined;
}

/* Auto background coloring according to age */
$(function() {
  $('.AgeTable td:first-child').each(function(index) {
    var $element = $(this)
    var age = mapStringToAge($element.text().trim() || '');
    if(age) {
      $element.addClass(age);
    }
  });
});

$(function() {
  $('.AgeTable th').each(function(index) {
    var $element = $(this)
    var age = mapStringToAge($element.text().trim() || '');
    if(age) {
      $element.addClass(age);
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
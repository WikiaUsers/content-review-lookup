function isNumberKey(evt){
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode == 13){
		calculatecss(document.getElementById("cssForm"));
	} else {
		return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
	}
}
    
function delimitNumbers(str) {
  return (str + "").replace(/\b(\d+)((\.\d+)*)\b/g, function(a, b, c) {
    return (b.charAt(0) > 0 && !(c || ".").lastIndexOf(".") ? b.replace(/(\d)(?=(\d{3})+$)/g, "$1,") : b) + c;
  });
}
    
function getLife(life) {    
var retValue = ""
var incRate = 0;
    
if(life==0)
    return "0";
    
switch (true) {
    case (life>=1 && life<=5):
        incRate = 15;
        retValue = (life * incRate).toString();
        break;
    case (life>=6 && life<=10):
        incRate = 25;
        retValue = (75+((life-5) * incRate)).toString();
        break;
    case (life>=11 && life<=15):
        incRate = 50;
        retValue = (200+((life-10) * incRate)).toString();
        break;
    case (life>=16 && life<=20):
        incRate = 100;
        retValue = (400+((life-15) * incRate)).toString();
        break;
    case (life>20):
        incRate = 200;
        retValue = (800+((life-20) * incRate)).toString();
        break;
}    
    return retValue;
    
}
    
function calculatecss(frm)
{
var skillLevel = frm.skillLevel.value;
var pl = parseInt(frm.pl.options[frm.pl.selectedIndex].value,10);
var total = ""
    
if(frm.pl.selectedIndex > 0){
    total = (skillLevel * pl).toString();
} else {
    total = getLife(skillLevel);   
}

document.getElementById("csspace").innerHTML = frm.skillLevel.value != "" ? delimitNumbers(total) + " gold" : "0 gold";

}
$('<iframe id="myiframe"></iframe><input type="text" name="myText" value="" /><input type="button" value="點擊" onClick="myFun()" />').appendTo('#mw-content-text');

function myFun(){
var myTxt = $("input:text[name='myText']").val();
//   $('#test1').html(myTxt);

}
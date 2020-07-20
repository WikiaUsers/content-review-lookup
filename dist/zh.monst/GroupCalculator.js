$('你的ID是:<input type="text" id="ID" onchange="groupCalc()" style="width:100px"><br/>年の功より亀の甲？ 的組別:<span id="pmTurtleGroup">-</span><br/>昼の飯より亀の甲？ 的組別:<span id="noonTurtleGroup">-</span><br/>マンの亀よりオクの甲？ 的組別:<span id="weekendTurtleGroup">-</span><br/>').appendTo('#groupcalculator');

var ID=0;
function calc(){
     $("#noonTurtleGroup").text(ID%4+"組。");$("#pmTurtleGroup").text(ID%5+"組。");$("#weekendTurtleGroup").text(ID%3+"組。");}
function error(){
    $("#noonTurtleGroup").text("-");$("#pmTurtleGroup").text("-");}
function groupCalc(){
    var v=parseInt($("#ID").val(),10);if (isNaN(v)||v<=0||v/100000000<1||v/100000000>10){error();}else{ID=v;calc();}}
function Klammern()
{
var target=document.getElementsByTagName("TEXTAREA")[0];
if(document.getElementsByTagName("TEXTAREA")[1]!==undefined)
{
   target=document.getElementsByTagName("TEXTAREA")[1];
}
var text=target.value
target.value="("+text+")";
}
$("#Write img").on("click",Klammern);
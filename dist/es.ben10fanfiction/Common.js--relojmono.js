/*reloj hora del cliente */
/*Hora militar quitada by jultrun121*/
function hora(){
var fecha = new Date()
var hora = fecha.getHours()
var minuto = fecha.getMinutes()
var segundo = fecha.getSeconds()
var mes = fecha.getmounth()
if(hora>=12 && hora<=23)
m="P.M"
else
m="A.M"
if (hora < 10) {hora = "0" + hora}
if (minuto < 10) {minuto = "0" + minuto}
if (segundo < 10) {segundo = "0" + segundo}
if(hora==12)
{
    m="M.D.";
}
if(hora==13)
{
    hora="0"+1;
    m="P.M.";
}
if(hora==14)
{
    hora="0"+2;
    m="P.M.";
}
if(hora==15)
{
    hora="0"+3;
    m="P.M.";
}
if(hora==16)
{
    hora="0"+4;
    m="P.M.";
}
if(hora==17)
{
    hora="0"+5;
    m="P.M.";
}
if(hora==18)
{
    hora="0"+6;
    m="P.M.";
}
if(hora==19)
{
    hora="0"+7;
    m="P.M.";
}
if(hora==20)
{
    hora="0"+8;
    m="P.M.";
}
if(hora==21)
{
    hora="0"+9;
    M="P.M.";
}
if(hora==22)
{
    hora=10;
    m="P.M.";
}
if(hora==23)
{
    hora=11;
    m="P.M.";
}
if((hora==0)||(hora==24))
{
    hora=12;
    m="M.N";
} 
 
var nowhora = mes + hora + ":" + minuto + ":" + segundo + " - " + m 
document.getElementById('hora').firstChild.nodeValue = nowhora
tiempo = setTimeout('hora()',1000)
}
addOnloadHook(hora);
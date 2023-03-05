/*Rashid*/

var newDate = new Date();
var fechaActual = new Date();
var domingo = 'Carlin';         /*Dom - 0*/
var lunes = 'Svargrond';        /*Lun - 1*/
var martes = 'Liberty Bay';     /*Mar - 2*/
var miercoles = 'Port Hope';    /*Mie - 3*/
var jueves = 'Ankrahmun';       /*Jue - 4*/
var viernes = 'Darashia';       /*Vie - 5*/
var sabado = 'Edron';           /*Sab - 6*/
var hora = newDate.getHours();
var minuto = newDate.getMinutes();
var dia = fechaActual.getDay();
switch(dia)
{
case 0:
if (hora == '4' && minuto < '30'){
ubicacion = (sabado);
}else if (hora == '4' && minuto == '30'){
ubicacion = (domingo);
}else if (hora == '4' && minuto > '30'){
ubicacion = (domingo);
}else if (hora > '4'){
ubicacion = (domingo);
}else if (hora < '4'){
ubicacion = (sabado);
}
document.getElementById("rashid").innerHTML = ubicacion;
break;
case 1:
if (hora == '4' && minuto < '30'){
ubicacion = (domingo);
}else if (hora == '4' && minuto == '30'){
ubicacion = (lunes);
}else if (hora == '4' && minuto > '30'){
ubicacion = (lunes);
}else if (hora > '4'){
ubicacion = (lunes);
}else if (hora < '4'){
ubicacion = (domingo);
}
document.getElementById("rashid").innerHTML = ubicacion;
break;
case 2:
if (hora == '4' && minuto < '30'){
ubicacion = (lunes);
}else if (hora == '4' && minuto == '30'){
ubicacion = (martes);
}else if (hora == '4' && minuto > '30'){
ubicacion = (martes);
}else if (hora > '4'){
ubicacion = (martes);
}else if (hora < '4'){
ubicacion = (lunes);
}
document.getElementById("rashid").innerHTML = ubicacion;
break;
case 3:
if (hora == '4' && minuto < '30'){
ubicacion = (martes);
}else if (hora == '4' && minuto == '30'){
ubicacion = (miercoles);
}else if (hora == '4' && minuto > '30'){
ubicacion = (miercoles);
}else if (hora > '4'){
ubicacion = (miercoles);
}else if (hora < '4'){
ubicacion = (martes);
}
document.getElementById("rashid").innerHTML = ubicacion;
break;
case 4:
if (hora == '4' && minuto < '30'){
ubicacion = (miercoles);
}else if (hora == '4' && minuto == '30'){
ubicacion = (jueves);
}else if (hora == '4' && minuto > '30'){
ubicacion = (jueves);
}else if (hora > '4'){
ubicacion = (jueves);
}else if (hora < '4'){
ubicacion = (miercoles);
}
document.getElementById("rashid").innerHTML = ubicacion;
break;
case 5:
if (hora == '4' && minuto < '30'){
ubicacion = (jueves);
}else if (hora == '4' && minuto == '30'){
ubicacion = (viernes);
}else if (hora == '4' && minuto > '30'){
ubicacion = (viernes);
}else if (hora > '4'){
ubicacion = (viernes);
}else if (hora < '4'){
ubicacion = (jueves);
}
document.getElementById("rashid").innerHTML = ubicacion;
break;
case 6:
if (hora == '4' && minuto < '30'){
ubicacion = (viernes);
}else if (hora == '4' && minuto == '30'){
ubicacion = (sabado);
}else if (hora == '4' && minuto > '30'){
ubicacion = (sabado);
}else if (hora > '4'){
ubicacion = (sabado);
}else if (hora < '4'){
ubicacion = (viernes);
}
document.getElementById("rashid").innerHTML = ubicacion;
break; 
}
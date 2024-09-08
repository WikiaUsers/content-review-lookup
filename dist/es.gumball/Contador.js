function contar() {
  fecha=new Date(2015,01,01,0,0,0); //año,mes,dia,hora,minuto,segundo
  ahora=new Date();
  dif=new Date(fecha-ahora);
  txt='Quedan '+dif.getDate()+' d&iacute;as, '+dif.getHours()+' horas, ';
  txt+=dif.getMinutes()+' minutos y '+dif.getSeconds()+' segundos para el pr&oacute;ximo a&ntildeo!';
  document.getElementById('pepe').innerHTML=txt;
}
$(document).ready(function(){
    $('.barracolorchat a').append(' <span style="color:red;">[OFF]</span>');
    $(".Chat ul").after("<div class='inline-alert' id='BarraColorChat'><span class='rojo' style='color:red;'>Rojo</span> - <span class='amarillo' style='color:yellow;'>Amarillo</span> - <span class='verde' style='color:green;'>Verde</span> - <span class='azul' style='color:blue;'>Azul</span> - <span class='naranja' style='color:orange;'>Naranja</span> - <span class='violeta' style='color:purple;'>Violeta</span> - <span class='rosado' style='color:pink;'>Rosado</span> - <span class='marron' style='color:brown;'>Marrón</span> - <span class='celeste' style='color:skyblue;'>Celeste</span></div>");
    $('#BarraColorChat span').click(function(){
         var color = $(this).attr('class');
         var alerta=prompt("Inserte texto color" + color,"Soy un texto mágico");
         var contenido = $('textarea').val();
         var x = " [[*" + color + "|" + alerta + "]] ";
         $('textarea').val(contenido + x);
    });
});
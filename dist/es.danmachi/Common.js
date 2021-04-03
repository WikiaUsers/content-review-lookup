/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

// Personalización para la columna "Estado" de las tablas de Familias
$(function() {
    $("table.familia-table td:last-child:contains('Activo')").css("background-color", "#00FF00");
    $("table.familia-table td:last-child:contains('Activa')").css("background-color", "#00FF00");
    $("table.familia-table td:last-child:contains('Muerto')").css("background-color", "#A6A6A6");
    $("table.familia-table td:last-child:contains('Muerta')").css("background-color", "#A6A6A6");
    $("table.familia-table td:last-child:contains('Desconocido')").css("background-color", "#AD5AAD");
    $("table.familia-table td:last-child:contains('Dejó la Familia')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó la familia')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó Temporalmente')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó temporalmente')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó Parcialmente')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó parcialmente')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó el Gremio')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Dejó el gremio')").css("background-color", "#AFEEEE");
    $("table.familia-table td:last-child:contains('Encarcelado')").css("background-color", "#FFFF00");
    $("table.familia-table td:last-child:contains('Desertó')").css("background-color", "#FF4C4C");
});
$(function () {
    // Select ALL <a> inside the main navigation bar
    var navLinks = $('nav a');

    navLinks.each(function () {
        console.log($(this).text(), $(this).attr('href'));
    });
});
/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */
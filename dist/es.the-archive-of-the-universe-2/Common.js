/* SISTEMA DE CREDENCIALES A42 - EJECUCIÓN DIRECTA */
$(document).ready(function() {
    
    // 1. Verificar si ya existe credencial en el navegador
    var credencial = localStorage.getItem('A42_Credencial');

    if (credencial) {
        // Si ya hay credencial guardada, ocultamos la pantalla
        $('#pantalla-verificacion').hide();
        $('body').css('overflow', 'auto');
    } else {
        // Si no hay credencial, congelamos el scroll para que no naveguen
        $('body').css('overflow', 'hidden');
    }

    // 2. Escuchar el clic en los botones de credencial
    $(document).on('click', '.btn-auth, .btn-auth a', function() {
        
        // GUARDAMOS EN LA MEMORIA DEL NAVEGADOR
        localStorage.setItem('A42_Credencial', 'verificado');
        
        // Ocultamos el bloqueo
        $('#pantalla-verificacion').fadeOut(300);
        $('body').css('overflow', 'auto');
    });

});
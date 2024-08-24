/* Cualquier c�digo JavaScript escrito aqu� se cargar� para todos los usuarios en cada carga de p�gina */

/* Case insensitive (icontains) */
	jQuery.expr.pseudos.icontains = jQuery.expr.createPseudo(function(arg) {
		return function( elem ) {
			return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});

// Personalizaci�n para la columna "Estado" en las tablas de Familias
$(function () {
	if ($("body").hasClass("theme-fandomdesktop-dark")) {
		theme = "dark";
	}
	else {
		theme = "light";
	}
	
	lastColumn = "table.familia-table td:last-child";
	$(lastColumn + ':icontains("Activo")').css("background-color", "var(--familia-table_activo-"+theme+")");
	$(lastColumn + ':icontains("Activa")').css("background-color", "var(--familia-table_activo-"+theme+")");
	$(lastColumn + ':icontains("Muerto")').css("background-color", "var(--familia-table_muerto-"+theme+")");
	$(lastColumn + ':icontains("Muerta")').css("background-color", "var(--familia-table_muerto-"+theme+")");
	$(lastColumn + ':icontains("Desconocido")').css("background-color", "var(--familia-table_desconocido-"+theme+")");
	$(lastColumn + ':icontains("Dej� la Familia")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Dej� temporalmente")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Dej� parcialmente")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Dej� el gremio")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Encarcelado")').css("background-color", "var(--familia-table_encarcelado-"+theme+")");
	$(lastColumn + ':icontains("Desert�")').css("background-color", "var(--familia-table_deserto-"+theme+")");
});
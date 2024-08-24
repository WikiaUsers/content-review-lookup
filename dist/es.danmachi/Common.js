/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

/* Case insensitive (icontains) */
	jQuery.expr.pseudos.icontains = jQuery.expr.createPseudo(function(arg) {
		return function( elem ) {
			return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});

// Personalización para la columna "Estado" en las tablas de Familias
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
	$(lastColumn + ':icontains("Dejó la Familia")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Dejó temporalmente")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Dejó parcialmente")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Dejó el gremio")').css("background-color", "var(--familia-table_dejo-"+theme+")");
	$(lastColumn + ':icontains("Encarcelado")').css("background-color", "var(--familia-table_encarcelado-"+theme+")");
	$(lastColumn + ':icontains("Desertó")').css("background-color", "var(--familia-table_deserto-"+theme+")");
});
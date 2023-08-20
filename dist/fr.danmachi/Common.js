/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

/* Case insensitive (icontains) */
jQuery.expr.pseudos.icontains = jQuery.expr.createPseudo(function(arg) {
	return function( elem ) {
		return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
	};
});

/* Applies css styles to the last column of the members-table based on the value of the cells */
$(function () {
	if ($("body").hasClass("theme-fandomdesktop-dark")) {
		theme = "dark";
	}
	else {
		theme = "light";
	}
	
	lastColumn = "table.members-table td:last-child";
	$(lastColumn + ':icontains("Active")').css("background-color", "var(--members-table_active-"+theme+")");
	$(lastColumn + ':icontains("Deceased")').css("background-color", "var(--members-table_deceased-"+theme+")");
	$(lastColumn + ':icontains("Unknown")').css("background-color", "var(--members-table_unknown-"+theme+")");
	$(lastColumn + ':icontains("Left familia")').css("background-color", "var(--members-table_left-"+theme+")");
	$(lastColumn + ':icontains("Partially left Familia")').css("background-color", "var(--members-table_left-"+theme+")");
	$(lastColumn + ':icontains("Temporary leave")').css("background-color", "var(--members-table_left-"+theme+")");
	$(lastColumn + ':icontains("Left guild")').css("background-color", "var(--members-table_left-"+theme+")");
	$(lastColumn + ':icontains("Imprisoned")').css("background-color", "var(--members-table_imprisoned-"+theme+")");
	$(lastColumn + ':icontains("Defected")').css("background-color", "var(--members-table_defected-"+theme+")");
});
/* Any JavaScript here will be loaded for all users on every page load. */

/* Applies css styles to the last column of the members-table based on the value of the cells */
$(function() {

	/* Case insensitive (icontains) */
	jQuery.expr.pseudos.icontains = jQuery.expr.createPseudo(function(arg) {
		return function( elem ) {
			return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
		};
	});

	lastColumn = "table.members-table td:last-child";
	$(lastColumn + ':icontains("Active")').css("background-color", "#00FF00");
	$(lastColumn + ':icontains("Deceased")').css("background-color", "#A6A6A6");
	$(lastColumn + ':icontains("Unknown")').css("background-color", "#AD5AAD");
	$(lastColumn + ':icontains("Left familia")').css("background-color", "#AFEEEE");
	$(lastColumn + ':icontains("Partially left Familia")').css("background-color", "#AFEEEE");
	$(lastColumn + ':icontains("Temporary leave")').css("background-color", "#AFEEEE");
	$(lastColumn + ':icontains("Left guild")').css("background-color", "#AFEEEE");
	$(lastColumn + ':icontains("Imprisoned")').css("background-color", "#FFFF00");
	$(lastColumn + ':icontains("Defected")').css("background-color", "#FF4C4C");

	/* Special case for Bell */
	firstColumn = "table.members-table td:first-child";
	$(firstColumn + ':contains("Bell Cranel")').each(function() {
		$(this).siblings(':last-child').css("background-color", "#AFEEEE");
	});
});
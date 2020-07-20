/* Selectively Collapsible Tables (by King Dragonhoff)
    Classes:
        kd-collapsible: add this to the main table element
        kd-collapsible-trigger: add this to the cell element
            that should contain the button used to expand or 
            collapse the targeted portions of the table
        kd-collapsible-target: add this to the row element(s)
            that should be expanded and collapsed when the
            button is clicked
        kd-collapsible-collapsed: add this to the main table
            element to make all of the targeted row elements
            in that table hidden by default
*/
$(document).ready(function() {
    // Change these variables to change what the button says
    var KDcollapsibleExpandText = "Afficher";
    var KDcollapsibleCollapseText = "Masquer";
    // Add button
    $("table.kd-collapsible").each(function() {
        if ($(this).hasClass("kd-collapsible-collapsed") === true) {
            $(this).find("td.kd-collapsible-trigger, th.kd-collapsible-trigger").css("position", "relative").append('<span class="button kd-collapsible-button" style="position: absolute; right: 3px;">' + KDcollapsibleExpandText + '</span>');
        } else if ($(this).hasClass("kd-collapsible-collapsed") === false) {
            $(this).find("td.kd-collapsible-trigger, th.kd-collapsible-trigger").css("position", "relative").append('<span class="button kd-collapsible-button" style="position: absolute; right: 3px;">' + KDcollapsibleCollapseText + '</span>');
        }
    });
    // Set default states
    $("table.kd-collapsible tr.kd-collapsible-target").show();
    $("table.kd-collapsible.kd-collapsible-collapsed tr.kd-collapsible-target").hide();
    // Expand/Collapse targets when button is clicked and toggle button text
    $("table.kd-collapsible .kd-collapsible-trigger").on("click", ".kd-collapsible-button", function() {
        $(this).parents("table.kd-collapsible").find("tr.kd-collapsible-target").fadeToggle();
        if ($(this).text() === KDcollapsibleExpandText) {
            $(this).text(KDcollapsibleCollapseText);
        } else if ($(this).text() === KDcollapsibleCollapseText) {
            $(this).text(KDcollapsibleExpandText);
        }
    });
});
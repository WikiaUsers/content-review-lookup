// ==================
//  Code for Template:Suite3
//  Author: Soxra
// ==================

$(document).ready(function () {
	$(".morphMaster").each(function () {
		var $master = $(this);
		var $tabs = $master.find(".morphTabBox");
		var $container = $master.find(".morphTabContainer");

		$tabs.find(".morphLink").click(function () {
			var id = $(this).attr("id");
			id = id.substr(0, id.length - 4);
			$container.find(".morphContent").hide();
			$container.find("#" + id + "Content").show();
		});
	});
});
$(document).ready(function(){
	// handle main categories click event
	$("#main-cat-1").click(function(){
		if (!$("#subcat-set-1").hasClass("selectedSubCatSet")) {
			$(".selectedSubCatSet .subCat").removeAttr("style");
			$(".selectedSubCatSet .subCat .subCatPic").hide();
			$(".selectedSubCatSet").removeClass("selectedSubCatSet");
			$(".selectedSubCatContent").removeClass("selectedSubCatContent");
			$(".selectedMainCatItem").removeClass("selectedMainCatItem");
			$(".selectedSubCat").removeClass("selectedSubCat");
			$("#subcat-1").addClass("selectedSubCat");
			$("#subcat-1-icon").show();
			$("#subcat-set-1").addClass("selectedSubCatSet");
			$("#subcat-1-content").addClass("selectedSubCatContent");
			$("#main-cat-1").addClass("selectedMainCatItem");
		}
	});
	$("#main-cat-2").click(function(){
		if (!$("#subcat-set-2").hasClass("selectedSubCatSet")) {
			$(".selectedSubCatSet .subCat").removeAttr("style");
			$(".selectedSubCatSet .subCat .subCatPic").hide();
			$(".selectedSubCatSet").removeClass("selectedSubCatSet");
			$(".selectedSubCatContent").removeClass("selectedSubCatContent");
			$(".selectedMainCatItem").removeClass("selectedMainCatItem");
			$(".selectedSubCat").removeClass("selectedSubCat");
			$("#subcat-9").addClass("selectedSubCat");
			$("#subcat-9-icon").show();
			$("#subcat-set-2").addClass("selectedSubCatSet");
			$("#subcat-9-content").addClass("selectedSubCatContent");
			$("#main-cat-2").addClass("selectedMainCatItem");
		}
	});

	// make subcategory block transform upon mouse hover
	var timeoutId = null;
	var maxHeight = "100px";
	var minHeight = "50px";
	$(".subCat").mouseenter(function(){
		var sid = $(this).attr("id");
		var ref = $(this);
		if (timeoutId) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		}
		if ($(this).css("height") != maxHeight) {
			timeoutId = window.setTimeout(function() {
				$(".selectedSubCatSet .subCat").each(function(){
					if ($(this).attr("id") != sid) {
						var hid = $(this).attr("id");
						$("#" + hid + "-icon").fadeOut("fast");		
						$("#" + hid).animate({height: minHeight},"fast");
					}
				});
				ref.animate({height: maxHeight},"fast");
				$("#" + sid + "-icon").fadeIn("fast");	
			}, 300);
		}
	});

	$(".subCat").mouseleave(function(){
		if (timeoutId) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		}
	});

	// make the selected subcategory back on top when mouse leave the selection area
	$(".subCatSet").mouseleave(function(){
		var sid = $(".selectedSubCat").attr("id");
		if (timeoutId) {
			window.clearTimeout(timeoutId);
			timeoutId = null;
		}
		if ($(".selectedSubCat").css("height") != maxHeight) {
			timeoutId = window.setTimeout(function() {
				$(".selectedSubCatSet .subCat").each(function(){
					if ($(this).attr("id") != sid) {
						var hid = $(this).attr("id");
						$("#" + hid + "-icon").fadeOut("fast");		
						$("#" + hid).animate({height: minHeight},"fast");
					}
				});
				$("#" + sid).animate({height: maxHeight},"fast");
				$("#" + sid + "-icon").fadeIn("fast");	
			}, 300);
		}
	});

	// click subcatgory -> show the corresponding content
	$(".subCat").click(function(){
		var sid = $(this).attr("id");
		if(!$("#" + sid + "-content").hasClass("selectedSubCatContent")) {
			$(".selectedSubCatContent").removeClass("selectedSubCatContent");
			$(".selectedSubCat").removeClass("selectedSubCat");
			$("#" + sid + "-content").addClass("selectedSubCatContent");
			$("#" + sid).addClass("selectedSubCat");
		}
	});
});
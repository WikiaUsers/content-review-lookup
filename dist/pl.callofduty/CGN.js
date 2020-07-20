/**
 * CodGamesNavigation (CGN)
 * Skrypt do obsługi szablonu CGN – nowej nawigacji gier na stronie głównej.
 * 
 * @author  MGRINZ
 */

$(function() {
	"use strict";
	var codgamesNagivigation = {};
	
	codgamesNagivigation.content = $("#codgames-navigation-content .slider-wrapper");
	codgamesNagivigation.navbar = $("#codgames-navigation-navbar");
	
	codgamesNagivigation.content.find(".categories .category").click(slideCategoriesIn);
	codgamesNagivigation.navbar.find(".navbar-left, .navbar-right").click(slideCategories);
	codgamesNagivigation.navbar.find(".navbar-center").click(slideCategoriesOut);

	codgamesNagivigation.content.find("p").each(function () {
		$(this).replaceWith($(this).html());
	});

	function slideCategoriesIn() {
		var button = $(this);
		var offset = 660;
		var pagePosition = codgamesNagivigation.content.position().left;
        pagePosition = Math.round(pagePosition);
		
		if(pagePosition % offset != 0)
			return;
		
		var categoryId = button.data("category");
		var categoryName = button.find(".category-caption").text();
		var categoriesCount = codgamesNagivigation.content.find(".codgames-navigation-page").length;
		var index = codgamesNagivigation.content.find(".category-page.category-" + categoryId).eq(0).index();
		
		if(index < 0)
			return;
		
		if(index == categoriesCount - 1)
			codgamesNagivigation.navbar.find(".navbar-right").addClass("hidden");
		codgamesNagivigation.navbar.find(".navbar-center").text(categoryName);
		
		slideTo(codgamesNagivigation.content, -offset, index);
		
		codgamesNagivigation.navbar.addClass("visible");
	}
	
	function slideCategories() {
		var button = $(this);
		var offset = 660;
		
		var pagePosition = codgamesNagivigation.content.position().left;
        pagePosition = Math.round(pagePosition);
		
		if(pagePosition % offset != 0)
			return;
		
		var categoriesCount = codgamesNagivigation.content.find(".codgames-navigation-page").length;
		
		var categoriesMinPosition = 0;
		var categoriesMaxPosition = - (offset * categoriesCount - 660);
		
		if(button.hasClass("navbar-right")) {
			slideRight(codgamesNagivigation.content, offset, function (categoriesNewPosition) {
				if(categoriesNewPosition <= categoriesMaxPosition)
					button.addClass("hidden");
				button.siblings(".navbar-left").removeClass("hidden");
				pagePosition = categoriesNewPosition;
			});
		} else if(button.hasClass("navbar-left")) {
			if(pagePosition == -offset)
				slideCategoriesOut();
			else {
				slideLeft(codgamesNagivigation.content, offset, function (categoriesNewPosition) {
					button.siblings(".navbar-right").removeClass("hidden");
					pagePosition = categoriesNewPosition;					
				});
			}
		}
		
		var index = (pagePosition / -offset);
		var categoryPage = codgamesNagivigation.content.find(".codgames-navigation-page").eq(index);
		var categoryId = categoryPage.data("category");
		var category = codgamesNagivigation.content.find('.category[data-category="' + categoryId + '"]');
		var categoryName = category.find(".category-caption").text();
		button.siblings(".navbar-center").text(categoryName);
	}
	
	function slideCategoriesOut() {
		var button = $(this);
		var offset = 660;
		var pagePosition = codgamesNagivigation.content.position().left;
        pagePosition = Math.round(pagePosition);
		
		if(pagePosition % offset != 0)
			return;
		
		slideTo(codgamesNagivigation.content, -offset, 0);
		
		codgamesNagivigation.navbar.removeClass("visible");
		button.siblings(".navbar-right").removeClass("hidden");
	}
	
	function slideLeft(element, offset, callback) {
		callback = callback || $.noop;
		
		var left = getTranslatedLeft(element);
		left += offset;
		if(left % offset != 0) {
			if(left < 0)
				left = left - left % offset;
			else if(left > 0)
				left = left + (offset - left % offset);
		}
		
		setTranslatedLeft(element, left);
		callback(left);
	}
	
	function slideRight(element, offset, callback) {
		callback = callback || $.noop;
		
		var left = getTranslatedLeft(element);
		left += -offset;
		if(left % offset != 0)
			left = left - left % offset - offset;
		
		setTranslatedLeft(element, left);
		callback(left);
	}

	function slideTo(element, offset, index) {
		var left = getTranslatedLeft(element);
		left = offset * index;
		setTranslatedLeft(element, left);
	}
	
	function getTranslatedLeft(element) {
		var transform = element.css("transform");
		
		if(transform == "none")
			return 0;
	
		var matrix = transform.substring(7, transform.length-1).split(", ");
		return parseInt(matrix[4]);
	}
	
	function setTranslatedLeft(element, value) {
		value = "translate(" + value + "px)";
		element.css("transform", value);
	}
	
});
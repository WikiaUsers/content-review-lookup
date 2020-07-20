/* Any JavaScript here will be loaded for all users on every page load. */

// Sample usage:
/*
    var t = new lzWikiaPopup()
    			.create("test-p")
    			.setTitle("This is a popup dialog!! ")
    			.setContent("Some random content for the popup dialog...")
    			.showPopup();
*/

/// <summary>
///     Creates a popup modal whose content (HTML) can be set.
/// </summary>
var lzWikiaPopup = function() {
    var that = {};
    var popupId = "lzWikiaPopup";
    var popup;

    // Creates the skeleton of the popup modal.
    // Optionally pass in an HTML ID for the popup for uniqueness.
	that.create = function(id) {
		popup = document.createElement("div");
		popup.id = popupId = typeof(id) === "undefined" ? popupId : id;
		var template = '<h1 id="title"></h1>' + 
                       '<section class="modalContent"></section>';
		popup.innerHTML = template;

		return that;
	};

    // Sets the title of the popup modal.
	that.setTitle = function(title) {
		$(popup).find("#title").html(title);

		return that;
	};

    // Sets the content of the popup modal (in html).
	that.setContent = function(HtmlContent) {
		$(popup).find(".modalContent").html(HtmlContent);

		return that;
	};

    // Displays the popup
	that.showPopup = function() {
		$(popup).makeModal();

		return that;
	}

    // Gets the HTML ID of the popup element
	that.getPopupId = function() {
		return popupId;
	}

	return that;
};
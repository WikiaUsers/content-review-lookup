// JavaScript Document
$(document).ready(function() {
	//retrieving NavTab Containers within the document's body
	var oContainers = $(".NavTabContainer", document.body);
	for (var i=0;i<oContainers.length;i++) {
		var oCurContainer=$(oContainers[i]);

		//checks for default Header
		$(".NavTabContent", oCurContainer).hide();
		var oDefaultHeader = $(".SelectedNavTabHeader", oCurContainer);
		if (oDefaultHeader) {
			var sTitle = $(oDefaultHeader).attr("title");
			$(".NavTabContent[title='"+sTitle+"']", oCurContainer).show();
		}

		var $headerBlocks = $('.NavHeaderBlock');
		$headerBlocks.each( function() {
			$('.NavTabHeader').click( function () {
				var headerTitle = $(this).parent().attr('title');
				$('.SelectedNavTabHeader').removeClass("SelectedNavTabHeader");
				$(this).addClass("SelectedNavTabHeader");
				var $content = $('.NavTabContentBlock[title="'+headerTitle+'"]');
				var clickedTab = $(this).attr("title");
				$('.NavTabContent', $content).hide();
				var $selectedContent = $('.NavTabContent[title="'+clickedTab+'"]', $content);
				$selectedContent.show();
			});
		});

		//adding callback function to headers
		/*oCurContainer.find(".NavTabHeader").click(function() {
			//getting the parent container(s). this should maybe be done differently?
			var oParentContainer = $(this).parent(".NavTabContainer");
			alert(oParentContainer.length);
			//getting the header's title
			var sTitle = $(this).attr("title");

			$(".SelectedNavTabHeader", oParentContainer).removeClass("SelectedNavTabHeader");
			$(".NavTabContent", oParentContainer).hide();
			$(this).addClass("SelectedNavTabHeader");
			//shows cotents associated to selected header (matching the title attributes)
			$(".NavTabContent[title='"+sTitle+"']", oParentContainer).show();
		});*/
	}
});
/* Any JavaScript here will be loaded for all users on every page load. */

$(document).ready(function() {
    
    $(".event-dialogue > p").each(function() {
        var wrapper = $('<div style="display: flex; align-items: flex-start;margin-top: 10px;margin-bottom: 10px;"></div>');
        var text = $(this).text().trim();
        var img = $(this).find("a:first-child");
        var imgWrapper = $('<div style="padding-right: 10px"></div>');
        var textWrapper = $('<div style="flex-grow: 1"></div>');

        textWrapper.text(text);
        imgWrapper.append(img);
        wrapper.append(imgWrapper);
        wrapper.append(textWrapper);

        $(this).parent().append(wrapper);
        $(this).remove();
    });
    
    //start of font size toggle for story
    
    $("#smallText").click(function() {
    	$(".event-dialogue").css("font-size", "0.875em");
    });
    
    $("#mediumText").click(function() {
    	$(".event-dialogue").css("font-size", "1.125em");
    });
    
    $("#largeText").click(function() {
    	$(".event-dialogue").css("font-size", "1.875em");
    });
    
    //end of font size toggle for story
    
});

/* [[Halidom]] */
mw.hook('wikipage.content').add(function() {
	var container = document.getElementById("halidom-grid-toggle-container");
	if (container) {
		var HalidomMapTable = document.getElementsByClassName('HalidomMapTable')[0];
		container.innerHTML =
		'<input type="checkbox" id="halidom-grid-toggle" class="wds-toggle__input">' +
		'<label for="halidom-grid-toggle" class="wds-toggle__label">切换网格视图</label>';
		document.getElementById('halidom-grid-toggle').addEventListener('change', function() {
			HalidomMapTable.classList.toggle('HalidomMapLines');
		});
	}
});
/* [[Template:EventStoryHeader]] */
mw.hook('wikipage.content').add(function($content) {
	$content.find('.event-dialogue > p').each(function() {
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
    
    $content.find('#smallText').click(function() {
    	$(".event-dialogue").css("font-size", "0.875em");
    });
    
    $content.find('#mediumText').click(function() {
    	$(".event-dialogue").css("font-size", "1.125em");
    });
    
    $content.find('#largeText').click(function() {
    	$(".event-dialogue").css("font-size", "1.875em");
    });
});
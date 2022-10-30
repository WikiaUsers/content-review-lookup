/* Any JavaScript here will be loaded for all users on every page load. */
$('body').append("<div class='minecraft-tip' id='minecraft-tip'></div>");

var textOutputFormatted;

var reformat = function(event) {
	textOutputFormatted = event.replace(/&br/g, '§r<br class="break">')
	.replace(/&el/g, '§r<br class="empty-line">')
	.replace(/&nbsp/g, '§r<div class="no-break-space"></div>')
	.replace(/§0/g, '</span><span class="c-0">')
	.replace(/§1/g, '</span><span class="c-1">')
	.replace(/§2/g, '</span><span class="c-2">')
	.replace(/§3/g, '</span><span class="c-3">')
	.replace(/§4/g, '</span><span class="c-4">')
	.replace(/§5/g, '</span><span class="c-5">')
	.replace(/§6/g, '</span><span class="c-6">')
	.replace(/§7/g, '</span><span class="c-7">')
	.replace(/§8/g, '</span><span class="c-8">')
	.replace(/§9/g, '</span><span class="c-9">')
	.replace(/§a/g, '</span><span class="c-a">')
	.replace(/§b/g, '</span><span class="c-b">')
	.replace(/§c/g, '</span><span class="c-c">')
	.replace(/§d/g, '</span><span class="c-d">')
	.replace(/§e/g, '</span><span class="c-e">')
	.replace(/§f/g, '</span><span class="c-f">')
	.replace(/§g/g, '</span><span class="c-g">')
	.replace(/§h/g, '</span><span class="c-6-bedrock">')
	.replace(/§l/g, '<b class="c-l">')
	.replace(/§o/g, '<i class="c-o">')
	.replace(/§n/g, '<n class="c-n">')
	.replace(/§m/g, '<m class="c-m">')
	.replace(/§r/g, '</span></b></i></n></m>');
	
	return textOutputFormatted;
}

$('.slot-item').mouseover(function(event) {
        var $PosTop = $(this).position().top;
        var $PosLeft = $(this).position().left;
});

	$(".minecraft-item").mouseover(function(event) {
	$(mcTip).css("display", "block");
	mcTip.innerHTML = "<div class='text-line'>" + reformat(event.target.dataset.mctitle) + "</div><div class='shadow-line'>" + reformat(event.target.dataset.mctitle) + "</div>";
	// Sets X position of the tip, considering possible overflow to the right
	if (window.innerWidth - event.pageX - 11 - event.pageX % 2 < $(mcTip).outerWidth(true)) {
		var x = event.pageX - event.pageX % 2 - $(mcTip).outerWidth(true);  
	} else {
		var x = event.pageX + 13 - event.pageX % 2;
	}
	// Sets Y position of the tip, considering possible overflow to the top
	if (event.pageY - 28 - event.pageY % 2 < $(document).scrollTop()) {
		  var y = event.pageY + 17 - event.pageY % 2 - $(document).scrollTop();
	} else {
		  var y = event.pageY - 31 - event.pageY % 2 - $(document).scrollTop();
	}
		$(mcTip).css("left", x);
		$(mcTip).css("top", y);
	});

	$(".minecraft-item").mousemove(function(event) {
	// Sets X position of the tip, considering possible overflow to the right
	if (window.innerWidth - event.pageX - 11 - event.pageX % 2 < $(mcTip).outerWidth(true)) {
		var x = event.pageX - event.pageX % 2 - $(mcTip).outerWidth(true);  
	} else {
		var x = event.pageX + 13 - event.pageX % 2;
	 }
	// Sets Y position of the tip, considering possible overflow to the top
	if (event.pageY - 28 - event.pageY % 2 < $(document).scrollTop()) {
		  var y = event.pageY + 17 - event.pageY % 2 - $(document).scrollTop();
	} else {
		  var y = event.pageY - 31 - event.pageY % 2 - $(document).scrollTop();
	  }
		$(mcTip).css("left", x);
		$(mcTip).css("top", y);
	});

	$(".minecraft-item").mouseout(function(event) {
		$(mcTip).css("display", "none");
	});
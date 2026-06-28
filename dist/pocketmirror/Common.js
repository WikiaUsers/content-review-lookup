/* Any JavaScript here will be loaded for all users on every page load. */

/*
    Template:Spoiler on dev.miraheze.org
*/
$(function(){
    //spoiler block behavior
	$('.spoiler').click(function(){
		$(this).toggleClass('off');
	});
	// spoiler button behavior
    $('#spoilerbtn').text('Show all spoilers');
	$('#spoilerbtn').click(function(){
		$(this).toggleClass('hide');
		$('.spoiler').toggleClass('showall');
		
		if ($(this).is('.hide')){ $(this).text('Hide all spoilers'); } 
        else { $(this).text('Show all spoilers'); }
	});	
});
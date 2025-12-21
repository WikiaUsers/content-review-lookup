/* 이 자바스크립트 설정은 모든 문서, 모든 사용자에게 적용됩니다. */
/*
    Template:Spoiler on fandom.com
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
// [[Category:Scripts]]
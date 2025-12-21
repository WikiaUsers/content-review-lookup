/* 여기의 자바스크립트는 모바일 사이트를 사용하/*
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
// [[Category:Scripts]]는 사용자에게 로드됩니다 */
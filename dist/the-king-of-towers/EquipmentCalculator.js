//Work in progress
$(document).ready(function(){
	$("images-row").hover(function(){
		$(this).width(100)}, 
		function(){
		$(this).width(75);
		});
	$("images-row").on('click', function(){
		$("hidden-div").show();
	});
});
//Social Media buttons
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');

//Main page
if( wgPageName === "EverQuest_Next_Landmark_Wiki" ) {
	$(window).load(function() {
		var boxHeight = $('.mainpage-box-welcome .box').height();
		$('.mainpage-box-welcome .background-left').css('height',boxHeight+'px');
		$('.mainpage-box-welcome .background-left').css('margin-bottom','-'+boxHeight+'px');
		$('.mainpage-box-welcome .background-right').css('height',boxHeight+'px');
		$('.mainpage-box-welcome .background-right').css('margin-bottom','-'+boxHeight+'px');
	});

	$(window).on('resize',function() {
		var boxHeight = $('.mainpage-box-welcome .box').height();
		$('.mainpage-box-welcome .background-left').css('height',boxHeight+'px');
		$('.mainpage-box-welcome .background-left').css('margin-bottom','-'+boxHeight+'px');
		$('.mainpage-box-welcome .background-right').css('height',boxHeight+'px');
		$('.mainpage-box-welcome .background-right').css('margin-bottom','-'+boxHeight+'px');
	});
}
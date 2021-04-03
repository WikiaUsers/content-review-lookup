/** Social Media buttons **/
var SocialMediaButtons = { 
	position: "top",
	colorScheme: "dark",
	buttonSize: "default"
};
importScriptPage('SocialIcons/code.js','dev');
 
/* Mainpage */
/** Mainpage sliders **/
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
mw.loader.using( ['jquery.cookie']);
 
/****************************************/
/* sliders using jquery by User:Tierrie */
/****************************************/
//wsl.loadScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js");
//wsl.loadScript("http://dragonage.wikia.com/index.php?title=MediaWiki:Jquery-ui.min.js&action=raw&ctype=text/javascript");
mw.loader.using( ['jquery.ui.tabs'], function() {
  var $tabs = $("#portal_slider").tabs({ fx: {opacity:'toggle', duration:100} } );
  var image1Source = 'https://images.wikia.nocookie.net/acepatrol/images/a/ab/Mainpage-Header-Home.png';
  var image2Source = 'https://images.wikia.nocookie.net/acepatrol/images/0/06/Mainpage-Header-Ace_Patrol.png';
  var image3Source = 'https://images.wikia.nocookie.net/acepatrol/images/3/30/Mainpage-Header-Pacific_Skies.png';
  var image4Source = 'https://images.wikia.nocookie.net/acepatrol/images/1/16/Mainpage-Header-Media.png';
  var image1Alt = 'Home';
  var image2Alt = 'Ace Patrol';
  var image3Alt = 'Pacific Skies';
  var image4Alt = 'Media';
  currentTab = 1;
  prevDisabled = false;
  nextDisabled = false;
  $("[class^=portal_sliderlink]").click(function() { // bind click event to link
    var sliderNumber = this.className.replace("portal_sliderlink_", "");
    $(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
    $(".mainpage-box-home").addClass("slider-" + sliderNumber);
    currentTab = this.className.replace("portal_sliderlink_", "");
    if( currentTab == 1 ) {
		$(".mainpage-header-home img").attr("src",image1Source);
		$(".mainpage-header-home img").attr("alt",image1Alt);
    }	    
    else if( currentTab == 2 ) {
		$(".mainpage-header-home img").attr("src",image2Source);	
		$(".mainpage-header-home img").attr("alt",image2Alt);
    }
    else if( currentTab == 3 ) {
		$(".mainpage-header-home img").attr("src",image3Source);	
		$(".mainpage-header-home img").attr("alt",image3Alt);
    }
    else if( currentTab == 4 ) {
		$(".mainpage-header-home img").attr("src",image4Source);
		$(".mainpage-header-home img").attr("alt",image4Alt);		
    }
    else {
		$(".mainpage-header-home img").attr("src",image1Source);
		$(".mainpage-header-home img").attr("alt",image1Alt);		
    }
    $tabs.tabs('select', this.className.replace("portal_sliderlink_", ""));
    return false;
  });
  $('#portal_next').click(function() {
	if(nextDisabled == false) {
		nextDisabled = true;
		prevDisabled = true;
		$('#portal_next').css('opacity','0.5');
		$('#portal_prev').css('opacity','0.5');
		setTimeout(function() {
			$('#portal_next').css('opacity','');
			$('#portal_prev').css('opacity','');
			nextDisabled = false;
			prevDisabled = false;
		},300);
		currentTab++;
		if(currentTab == 5) {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-1");
			currentTab = 1;
		}
		else {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-"+currentTab);
		}
		if( currentTab == 1 ) {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);
		}
		else if( currentTab == 2 ) {
			$(".mainpage-header-home img").attr("src",image2Source);	
			$(".mainpage-header-home img").attr("alt",image2Alt);
		}
		else if( currentTab == 3 ) {
			$(".mainpage-header-home img").attr("src",image3Source);	
			$(".mainpage-header-home img").attr("alt",image3Alt);
		}
		else if( currentTab == 4 ) {
			$(".mainpage-header-home img").attr("src",image4Source);
			$(".mainpage-header-home img").attr("alt",image4Alt);		
		}
		else {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);		
		}
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == ($tabs.tabs('length'))-1) ? 0 : $tabs.tabs('option', 'selected') + 1 ); // switch to next tab
		return false;
		}
  });
  $('#portal_prev').click(function() { // bind click event to link
	if(prevDisabled == false) {
		prevDisabled = true;
		nextDisabled = true;
		$('#portal_prev').css('opacity','0.5');
		$('#portal_next').css('opacity','0.5');
		setTimeout(function() {
			$('#portal_prev').css('opacity','');
			$('#portal_next').css('opacity','');
			prevDisabled = false;
			nextDisabled = false;
		},300);
		currentTab--;
		if(currentTab == 0) {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-4");
			currentTab = 4;
		}
		else {
			$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
			$(".mainpage-box-home").addClass("slider-"+currentTab);
		}
		$(".mainpage-box-home").attr("class", "mainpage-box mainpage-box-home clearfix");
		$(".mainpage-box-home").addClass("slider-"+currentTab);
		if( currentTab == 1 ) {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);
		}
		else if( currentTab == 2 ) {
			$(".mainpage-header-home img").attr("src",image2Source);	
			$(".mainpage-header-home img").attr("alt",image2Alt);
		}
		else if( currentTab == 3 ) {
			$(".mainpage-header-home img").attr("src",image3Source);	
			$(".mainpage-header-home img").attr("alt",image3Alt);
		}
		else if( currentTab == 4 ) {
			$(".mainpage-header-home img").attr("src",image4Source);
			$(".mainpage-header-home img").attr("alt",image4Alt);		
		}
		else {
			$(".mainpage-header-home img").attr("src",image1Source);
			$(".mainpage-header-home img").attr("alt",image1Alt);		
		}
		$tabs.tabs('select', ($tabs.tabs('option', 'selected') == 0) ? ($tabs.tabs('length')-1) : $tabs.tabs('option', 'selected') - 1 ); // switch to previous tab
		return false;
	}
  });
});
 
/* Mainpage */
if(wgPageName == "Sid_Meiers_Ace_Patrol_Wiki") {
	$(function() {
		/** Poll class **/
		$('.mainpage-box-poll .total').parent().addClass('pollText');

		
		/** Load home box header images silently **/
		var img = new Image(); img.src = 'https://images.wikia.nocookie.net/acepatrol/images/a/ab/Mainpage-Header-Home.png';
		var img2 = new Image(); img2.src = 'https://images.wikia.nocookie.net/acepatrol/images/0/06/Mainpage-Header-Ace_Patrol.png';
		var img3 = new Image(); img3.src = 'https://images.wikia.nocookie.net/acepatrol/images/3/30/Mainpage-Header-Pacific_Skies.png';
		var img4 = new Image(); img4.src = 'https://images.wikia.nocookie.net/acepatrol/images/1/16/Mainpage-Header-Media.png';
	});
}
/* Any JavaScript here will be loaded for all users on every page load. */


/*
==========================================
Scroll detector for the fadeInUp animation
==========================================
*/
$( document ).ready(function() { 

$(window).scroll(function() { 
	$('.fadeInUpObject').each(function(){ 
	var imagePos = $(this).offset().top; 
	
	var topOfWindow = $(window).scrollTop(); 
		if (imagePos < topOfWindow+600) { 
			$(this).addClass("fadeInUp"); 
		}
			
	});
		
});

});


/* 
==========================================
Scroll detector for the pullDown animation 
==========================================
*/ 

$( document ).ready(function() { //when the page has loaded,

$(window).scroll(function() { 
	$('.pullDownObject').each(function(){ //For each element with the class "pullDownObject",
	var imagePos = $(this).offset().top; 
	
	var topOfWindow = $(window).scrollTop(); //(Defining topOfWindow)
		if (imagePos < topOfWindow+600) { //If the element is 600px away from topOfWindow,
			$(this).addClass("pullDown"); //Add the "pullDown" class to it, giving it the animation
		}
			
	});
		
});

});

/* Note that the pullDown class is defined elsewhere, in the wiki's CSS page */


/* 
================
Countdown script 
================
*/ 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:Countdown/code.js"
    ]
});
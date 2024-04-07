/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */

//Opens and closes community links
$('#communitytitle').click(function(){
	if (timerTime > 0) {
		jQuery.noop();
	} else {
		if ($('#communitylinks').hasClass('closed')) {
			$('#communitylinks').removeClass('closed').addClass('opened').animate({ height: "285px" }, 1000).css('padding-top','5px');
			$('#communitytitle').text('Свернуть список сообществ');
			timerTime = 500
		} else if ($('#communitylinks').hasClass('opened')) {
			$('#communitylinks').removeClass('opened').addClass('closed').animate({ height: "0px" }, 1000).css('padding-top','0px');
			$('#communitytitle').text('Развернуть список сообществ');
			timerTime = 500
		}
	}
});
/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
 
//Изображения в профайлах
var img =  {};
img["Ramdim"] = ['<img src="https://images.wikia.nocookie.net/__cb20140207193554/masseffect/ru/images/d/dd/IRammstein.png?uselang=ru" width="120px" height="120px">'];
if (typeof img[wgTitle] != "undefined") {
$('<div style="position:absolute; left:580px; top: 0px;">' + img[wgTitle] + '</div>').appendTo('.masthead-info');
}


//Grab image URLs and set to variables
 var slider1url = $('#slider0url').text();
 var slider1url = $('#slider1url').text();
 var slider2url = $('#slider2url').text();
 var slider3url = $('#slider3url').text();
 var slider4url = $('#slider4url').text();
 $('#slider1').addClass('linked');
  
 //When panals are clickable, links to designated URL.
 $('#slider0img').click(function(){
 	if ($('#slider0').hasClass('linked')) {
 		window.location.href = slider0url;
 	}
 });
 
 $('#slider0img').click(function(){
 	if ($('#slider0').hasClass('linked')) {
 		window.location.href = slider0url;
 	}
 });
 
 $('#slider1img').click(function(){
 	if ($('#slider1').hasClass('linked')) {
 		window.location.href = slider1url;
 	}
 });
  
 $('#slider2img').click(function(){
 	if ($('#slider2').hasClass('linked')) {
 		window.location.href = slider2url;
 	}
 });
  
 $('#slider3img').click(function(){
 	if ($('#slider3').hasClass('linked')) {
 		window.location.href = slider3url;
 	}
 });
  
 $('#slider4img').click(function(){
 	if ($('#slider4').hasClass('linked')) {
 		window.location.href = slider4url;
 	}
 });
  
 //Opens and closes panels when clicked.
   $('#slider0').click(function(){
 	if ($('#slider0').hasClass('animated')) {
 		$('#slider0').dequeue().stop();
 	} else if ($('#slider2').hasClass('animated')) {
 		$('#slider2').dequeue().stop();
 	} else if ($('#slider3').hasClass('animated')) {
 		$('#slider3').dequeue().stop();
 	}
 }, function() {
 	if ($('#slider0').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
 			$('#slider0').removeClass('animated').dequeue();
 			$('#slider0').addClass('closed').removeClass('linked');
 			$('#slider2').addClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider0').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider0').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened').addClass('linked');
 			$('#slider0').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('opened');
 		});
 	}
 });
  
 $('#slider3').click(function(){
 	if ($('#slider0').hasClass('animated')) {
 		$('#slider0').dequeue().stop();
 	} else if ($('#slider2').hasClass('animated')) {
 		$('#slider2').dequeue().stop();
 	} else if ($('#slider3').hasClass('animated')) {
 		$('#slider3').dequeue().stop();
 	}
 }, function() {
 	if ($('#slider0').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
 			$('#slider0').removeClass('animated').dequeue();
 			$('#slider0').addClass('closed').removeClass('linked');
 			$('#slider3').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider0').removeClass('animated').dequeue();
 			$('#slider0').addClass('closed');
 		});
 	} else if ($('#slider0').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('closed').removeClass('linked');
 			$('#slider3').addClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider0').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('opened').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	}
 });
  
 
 
 
 
 
 $('#slider1').click(function(){
 	if ($('#slider1').hasClass('animated')) {
 		$('#slider1').dequeue().stop();
 	} else if ($('#slider2').hasClass('animated')) {
 		$('#slider2').dequeue().stop();
 	} else if ($('#slider3').hasClass('animated')) {
 		$('#slider3').dequeue().stop();
 	}
 }, function() {
 	if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('opened').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
 		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('opened').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
 		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('opened').addClass('linked'); b
 			$('#slider2').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened');
 		});
 		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('opened');
 		});
 	}
 });
  
 $('#slider2').click(function(){
 	if ($('#slider1').hasClass('animated')) {
 		$('#slider1').dequeue().stop();
 	} else if ($('#slider2').hasClass('animated')) {
 		$('#slider2').dequeue().stop();
 	} else if ($('#slider3').hasClass('animated')) {
 		$('#slider3').dequeue().stop();
 	}
 }, function() {
 	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('closed').removeClass('linked');
 			$('#slider2').addClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('opened');
 		});
 	}
 });
  
 $('#slider3').click(function(){
 	if ($('#slider1').hasClass('animated')) {
 		$('#slider1').dequeue().stop();
 	} else if ($('#slider2').hasClass('animated')) {
 		$('#slider2').dequeue().stop();
 	} else if ($('#slider3').hasClass('animated')) {
 		$('#slider3').dequeue().stop();
 	}
 }, function() {
 	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('closed').removeClass('linked');
 			$('#slider3').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('closed');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('closed').removeClass('linked');
 			$('#slider3').addClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('opened').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	}
 });
  
 $('#slider4').click(function(){
 	if ($('#slider1').hasClass('animated')) {
 		$('#slider1').dequeue().stop();
 	} else if ($('#slider2').hasClass('animated')) {
 		$('#slider2').dequeue().stop();
 	} else if ($('#slider3').hasClass('animated')) {
 		$('#slider3').dequeue().stop();
 	}
 }, function() {
 	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('closed').removeClass('linked');
 			$('#slider4').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider3').removeClass('linked');
 		});
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('closed');
 		});
 		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('closed');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('closed').removeClass('linked');
 			$('#slider4').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider3').removeClass('linked');
 		});
 		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('closed');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
 		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('closed').removeClass('linked');
 			$('#slider4').addClass('linked');
 			$('#slider1').removeClass('linked');
 			$('#slider2').removeClass('linked');
 		});
 	}
 });
  
 //Scrolls through slider every 6 seconds
 var scrolltimer = window.setInterval(autoScroll, 6000);
  
 function autoScroll() {
 	if ($('#slider1').hasClass('opened') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider2arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider1').removeClass('opened').addClass('animated').animate({ width: "25px" }, "normal", "linear", function() {
 			$('#slider1').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
 			$('#slider2').addClass('linked');
 			$('#slider3').removeClass('linked');
 			$('#slider4').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('opened') && $('#slider3').hasClass('opened')) {
 		$('#slider3arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider2caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider2').removeClass('opened').addClass('animated').animate({ width: "50px" }, "normal", "linear", function() {
 			$('#slider2').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
 			$('#slider3').addClass('linked');
 			$('#slider4').removeClass('linked');
 			$('#slider1').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('opened')) {
 		$('#slider4arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider3caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider3').removeClass('opened').addClass('animated').animate({ width: "75px" }, "normal", "linear", function() {
 			$('#slider3').addClass('closed').removeClass('linked').removeClass('animated').dequeue();
 			$('#slider4').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider1').removeClass('linked');
 		});
 	} else if ($('#slider1').hasClass('closed') && $('#slider2').hasClass('closed') && $('#slider3').hasClass('closed')) {
 		$('#slider1arrow').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider4caption').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0}, 200);
 		$('#slider1caption').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4arrow').css({opacity: 0, visibility: "visible"}).animate({opacity: 1.0}, 500);
 		$('#slider4').removeClass('opened').addClass('animated').animate({ width: "700px" }, "normal", "linear", function() {
 			$('#slider4').removeClass('linked').removeClass('animated').dequeue();
 			$('#slider1').addClass('linked');
 			$('#slider2').removeClass('linked');
 			$('#slider3').removeClass('linked');
 		});
 		$('#slider3').removeClass('closed').addClass('animated').animate({ width: "675px" }, "normal", "linear", function() {
 			$('#slider3').removeClass('animated').dequeue();
 			$('#slider3').addClass('opened');
 		});
 		$('#slider2').removeClass('closed').addClass('animated').animate({ width: "650px" }, "normal", "linear", function() {
 			$('#slider2').removeClass('animated').dequeue();
 			$('#slider2').addClass('opened');
 		});
 		$('#slider1').removeClass('closed').addClass('animated').animate({ width: "625px" }, "normal", "linear", function() {
 			$('#slider1').removeClass('animated').dequeue();
 			$('#slider1').addClass('opened');
 		});
 	}
 }
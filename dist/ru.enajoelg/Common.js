/* Размещённый здесь код JavaScript будет загружаться пользователям при обращении к каждой странице */
/*Mainpage by Wormix Game & Arhat*/
$(function(){
	$('.win_slider_button_1').click(function() {
    	$(".win_slider_1").removeClass("hide_slide");
    	$(".win_slider_1").siblings('.win_slide ').addClass('hide_slide');
	});

	$('.win_slider_button_2').click(function() {
    	$(".win_slider_2").removeClass("hide_slide");
    	$(".win_slider_2").siblings('.win_slide ').addClass('hide_slide');
	});

	$('.win_slider_button_3').click(function() {
    	$(".win_slider_3").removeClass("hide_slide");
    	$(".win_slider_3").siblings('.win_slide ').addClass('hide_slide');
	});

	$('.win_slider_button_4').click(function() {
    	$(".win_slider_4").removeClass("hide_slide");
    	$(".win_slider_4").siblings('.win_slide ').addClass('hide_slide');
	});

	$('.win_slider_button_5').click(function() {
    	$(".win_slider_5").removeClass("hide_slide");
    	$(".win_slider_5").siblings('.win_slide ').addClass('hide_slide');
	});

	$('#help_button').click(function() {
		$("#win_soc").css({"display": "none"});
    	$("#win_help").css({"display": "block"});
	});
	
	function isEna(){
		ena = $('#win_dog');
		if(ena.attr('e') && ena.attr('n') && ena.attr('a')){
			imgEna = ena.children('img');
			imgEna.attr('src','https://static.wikia.nocookie.net/enajoelg/images/7/7c/Ena_spin.gif/revision/latest?cb=20210617231137&path-prefix=ru');
			imgEna.attr('width', 120);
		}
	}

	enaNumber = Math.ceil(Math.random() * 3);
	enaWord = Math.ceil(Math.random() * 2);
	$('#change_word' + enaWord).css({"display": "block"});
	
	if(enaNumber == 1){
		$('#number_header').text('00110001 00110000 00110000 00110000 00110000');
	}else if(enaNumber == 2){
		$('#number_header').text('TURRÓN!TURRÓN!TURRÓN!');
	}else{
		$('#number_header').text('Forget your past.');
	}
	
	var dog_counter = 0;
	$('#win_dog').click(function(){
		dog_counter += 1;
		ena = $('#win_dog');
		if((dog_counter == 5) && !(ena.attr('e') && ena.attr('n') && ena.attr('a'))){
			$('.slide_content').each(function(){
				if(!($(this).parent().hasClass('hide_slide'))){
					$(this).addClass('shepherd_parent');
				    $(this).html('<img class="shepherd" src="https://static.wikia.nocookie.net/enajoelg/images/6/60/Shepherd_main_page.gif/revision/latest?cb=20210715084932&path-prefix=ru">');
				}
			});
		}
	});
	
    $('#change_word_e').click(function(){
    	$('#win_dog').attr('e', true);
    	isEna();
    });
    $('.change_word_n').each(function(){
    	$(this).click(function(){
    	$('#win_dog').attr('n', true);
    	isEna();
    	});
    });
    $('#change_word_a').click(function(){
    	$('#win_dog').attr('a', true);
    	isEna();
    });
});
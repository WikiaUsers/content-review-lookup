$('.BlockMainSlideContainer .BlockGallerySlide a, .BlockAddSlidesContainer .BlockGallerySlide a').removeClass('image').removeAttr('href').unbind('click').click(function()
{
	let iID= 0;
	// перенос главного слайда в конец списка дочерних слайдов
	$( ".BlockMainSlideContainer .BlockGallerySlide" ).appendTo('.BlockAddSlidesContainer tr').wrap( "<td></td>" );
	// извлечения id из текущего слайда
	iID = $(this).parent().attr('data-id');
	// перенос текущего слайда из списка дочерних в главный
	$('.BlockGalleryInfoContainer .BlockGalleryInfo').css('display', 'none');
	// плавное отображение блока с описанием текущего слайда (связь по id)
	$('.BlockGalleryInfoContainer .BlockGalleryInfo[data-id='+ iID +']').fadeIn(700);
	// плавное отображение текущего слайда
	$(this).parent().unwrap().appendTo('.BlockMainSlideContainer').css('display', 'none').fadeIn(700);
});

// переключение слайдов
function ShowNextSlide()
{
  $('.BlockAddSlidesContainer tr td:first .BlockGallerySlide a').click();
}
setInterval( ShowNextSlide, 10000) ;
/**/
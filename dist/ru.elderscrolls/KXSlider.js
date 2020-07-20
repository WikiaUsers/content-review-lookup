// KXSlider
// Special for rutes

var KXSlider = '.kx-slider';

$(KXSlider + '__next').click(function() { 
    // if last slide - goto first
  if ($(KXSlider + '__slide.active').index() + 1 === $(KXSlider + '__slide').length) {
    $(KXSlider + '__slide.active').removeClass('active');
  	$(KXSlider + '__slide').first().addClass('active');
    return;
  }
  $(KXSlider + '__slide.active')
    .removeClass('active')
    .next()
    .addClass('active');
});
$(KXSlider + '__prev').click(function() { 
    // if first slide - goto first
  if ($(KXSlider + '__slide.active').index() === 0) {
    $(KXSlider + '__slide.active').removeClass('active');
  	$(KXSlider + '__slide').last().addClass('active');
    return;
  }
  $(KXSlider + '__slide.active')
    .removeClass('active')
    .prev()
    .addClass('active');
});
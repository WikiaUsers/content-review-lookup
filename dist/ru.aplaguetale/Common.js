/* © A Plague Tale Вики *//* Spirit Force */
// Спасибо за подключение JS
/*————————————————————————————————————————————————————————————————————————————*/

switch ( mw.config.get('wgPageName') ) {
    case 'Справка:Шпаргалка_по_CSS_и_JS':
        // Дальнейший код будет применяться только для страницы 'Справка:Шпаргалка по CSS и JS'
        break;
    case 'Справка:Проверка JavaScript':
        // Код будет применяться для страницы 'Справка:Проверка JavaScript'
        break;
}

/*----------------------------------------------------------------------------*/
/* Слайдшоу */
/*----------------------------------------------------------------------------*/

/* проверка на существование */
var elSlideshow = document.querySelector('#aptSlideshow');
if (typeof elSlideshow !== 'undefined' && elSlideshow !== null) {
  startSlideshow();
}

function startSlideshow() {

  const slides = $('.apt_slide');
  var choices = [];
  var currentSlide = 0;
  var slideshowInterval = setInterval(nextSlide, 3000);
  var playing = true;

  for (var i = 0; i < slides.length; i ++) {
    choices[i] = new Choice();
  }
  $('#forchoices').append(choices);
  choices[0].addClass('selectedChoice');

  function Choice() {
    return $("<div></div>").addClass('choice');
  }

  function goToSlide(n) {
    slides[currentSlide].className = 'apt_slide';
    choices[currentSlide].toggleClass('selectedChoice');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'apt_slide showingSlide';
    choices[currentSlide].toggleClass('selectedChoice');
  }
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  function previousSlide() {
    goToSlide(currentSlide - 1);
  }
  function pauseSlideshow() {
    playing = false;
    clearInterval(slideshowInterval);
    $('#slideshowPauseButton').html('►');
  }
  function playSlideshow() {
    playing = true;
    slideshowInterval = setInterval(nextSlide, 3000);
    $('#slideshowPauseButton').html('I I');
  }

  $('#contentPlace').on("mouseover", pauseSlideshow);
  $('#contentPlace').on("mouseout", playSlideshow);
  $('#forchoices').on("mouseover", pauseSlideshow);
  $('#forchoices').on("mouseout", playSlideshow);

  $('#slideshowPauseButton').click(function() {
    if (playing) {
      pauseSlideshow();
    } else {
      playSlideshow();
    }
  });
  $('.choice').click(function() {
    var index = $(".choice").index(this);
    goToSlide(index);
  });
  $('#moreRats').click(function() {
    if ($('#moreWind').css('opacity') == 0) {
      $('#moreWind').css({
        opacity: '1'
      });
    } else {
      $('#moreWind').css({
        opacity: '0'
      });
    }
  });
}

/*————————————————————————————————————————————————————————————————————————————*/
/* © 2019 */
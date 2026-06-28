/* 1. Вставь вместо того, который сейчас */

mw.loader.using('jquery', function() {

  $(document).on('click', '.barbos-terminal .term-btn', function(e) {

    e.preventDefault();

    var terminal = $(this).closest('.barbos-terminal');

    var code = terminal.find('.term-input').text().trim();

    var target = $(this).data('target');

    var errorDiv = terminal.find('.term-error');

    

    if (code === target) {

      var url = '/wiki/%D0%A3%D1%87%D0%B0%D1%81%D1%82%D0%BD%D0%B8%D0%BA:Dramz0wen/' + encodeURIComponent(target);

      window.location.href = url;

    } else {

      errorDiv.text('❌ Неверный код доступа.').show();

    }

  });

});

/* 2. Новый: */

$(function() {

   B=66, A=65, R=82, B=66, O=79, S=83

  var barbosCode = [66, 65, 82, 66, 79, 83];

  var barbosIndex = 0;



  $(document).keydown(function(e) {

    if (e.keyCode === barbosCode[barbosIndex]) {

      barbosIndex++;

      if (barbosIndex === barbosCode.length) {

        $('#barbos-secret').slideDown(); // Показываем скрытый блок

        barbosIndex = 0; // Сбрасываем счётчик

      }

    } else {

      barbosIndex = 0; // Ошибка — начинаем заново

    }

  });

});

/* 3. */

$(function() {

  $('.decay-text').each(function() {

    var el = $(this);

    var text = el.text();

    var i = 0;

    var timer = setInterval(function() {

      if (i <= text.length) {

        el.text(text.substring(0, text.length - i));

        i++;

      } else {

        clearInterval(timer);

      }

    }, 2000);

  });

});

/* Последний */

$(function() {

  $('.typewriter-text').each(function() {

    var el = $(this);

    var text = el.text();

    el.text('');

    var i = 0;

    var timer = setInterval(function() {

      if (i < text.length) {

        el.text(el.text() + text.charAt(i));

        i++;

      } else {

        clearInterval(timer);

      }

    }, 100);

  });

});
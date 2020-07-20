/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */if ($(".tally > a > em").length && $('#UserProfileMasthead').length && mw.config.get('wgAction') === 'view') {
       var editCount = +($( '.masthead-info-lower .tally:first-child > a > em' ).text().replace( /[^\d]/g, )) || 0;
           title = ;
       if (editCount <= 100) {
           title = "Котёнок";
       } else if (editCount > 100 && editCount <= 500) {
           title = "Ученик";
       } else if (editCount > 500 && editCount <= 1000) {
           title = "Воин";
       } else if (editCount > 1000 && editCount <= 2000) {
           title = "Стрший воин";
       }
       $('<span />', {
           class: 'tag',
           text: title
       }).appendTo('.masthead-info hgroup');
   }
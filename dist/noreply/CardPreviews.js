;(function($, mw) {
   if (window.cardPreview) {
      return;
   }
   var cP = {};

   cP.getPage = function(page) {
      return $.ajax({
         url: '/api/v1/Articles/Details',
         type: 'GET',
         format: 'json',
         data: {
            titles: page,
            abstract: '200',
            width: '200',
            height: '200'
         }
      });
   };

   window.cardPreview = cP;
   var timer;
   $('#WikiaPage').prepend($('<div>').addClass('cardpreview-card'));
   $('#WikiaMainContent a').mouseenter(function() {
      if (!$(this).attr('title')) return;
      var link = $(this);
      var title = $(this).attr('title');
      $(link).attr('titletemp', $(link).attr('title'));
      timer = setTimeout(function() {
         cP.getPage(title).then(function(data) {
            console.log(data.items);
            var card = $('.cardpreview-card');
            if (Object.keys(data.items).length === 0) return;
            card.empty();
            for (var first in data.items) {
               var abstract = data.items[first].abstract;
               if (abstract === '') return;
               abstract = abstract.replace(new RegExp('(' + title + '[a-zA-Z]*|' + link.text() + '[a-zA-Z]*)', 'im'), '<strong>$1</strong>');
               card.append('<div class="cardpreview-content">' + abstract + '</div>');
               break;
            }
            card.removeClass('cpre-hide');
            card.detach().appendTo(link);
            $(link).attr('title', '');
            if (link.position().left < 400) {
               card.css('left', link.position().left);
            } else {
               card.css('left', link.position().left + link.width() - 300);
            }
            console.log(link);
         });
      }, 300);
   }).mouseleave(function() {
      clearTimeout(timer);
      $('.cardpreview-card').addClass('cpre-hide');
      $('.cardpreview-card').parent().attr('title', $('.cardpreview-card').parent().attr('titletemp'));
   });
})(jQuery, mediaWiki);
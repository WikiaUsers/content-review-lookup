//Фон профиля

if (wgPageName == "Участник:Уиллозавр") {
    $('body').css('background', 'url(https://images.wikia.nocookie.net/__cb20141121190641/avp-world/ru/images/b/b0/Xenomorph-Background.jpg) no-repeat center center fixed #000000');
}

/* Плашки */
//добавляет новые "статусы" участников, и, опционально - картинки к ним. Прав не даёт.
//Originaly made for ru-AvP World Wiki http://ru.avp.wikia.com/ 
//Images inserting added by Wildream
 $(function() {
 var rights = {};
 var image = {};
var ImgStart = '<a href=""><img src=" ';
 var ImgEnd = '"></a>';
 rights["Harbinger007"]                        = ["КСЕНОМОРФ ВЛАСТИТЕЛЬ"];
 image["Harbinger007"]                         = [ImgStart + 'https://images.wikia.nocookie.net/__cb20141121201543/avp-world/ru/images/a/a7/WeylanWikiBanner.png' + ImgEnd];
 if (typeof rights[wgTitle] != "undefined") {
 
      // remove old rights
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[wgTitle].length; i < len; i++) {

   if (typeof image[wgTitle] != "undefined") {  

        // add new rights
        $('<span class="tag">' + rights[wgTitle][i] + '</span><span style="position:relative; left:60px;">' + image[wgTitle] + '</span>').appendTo('.masthead-info hgroup');
      }
     else {
       // add new rights
        $('<span class="tag">' + rights[wgTitle][i] + '</span>').appendTo('.masthead-info hgroup');
      }
     }
    }
   
});

/********************
 * Случайный фон *
 * by Kopcap94 *
 ********************/
$(function() {
    var imgs = [
        'https://vignette.wikia.nocookie.net/avp-world/images/2/2c/Pred2018Wall.jpg/revision/latest?cb=20180825162320&path-prefix=ru',
    ];
 
    $('body.skin-oasis').attr('style', 'background-image:url(' + imgs[Math.floor((imgs.length) * Math.random())] + ') !important');
});
 
/********************/

/********************
 * Auto Update *
 ********************/
 
 importArticles({
    type: 'script',
    articles: [
        'w:dev:AjaxRC/code.js',
        'w:dev:Countdown/code.js',
        'u:dev:DiscordIntegrator/code.js'
    ]
});
 
var ajaxPages = ["Служебная:WikiActivity","Служебная:RecentChanges"];
var AjaxRCRefreshText = 'Автообновление';

/********************/
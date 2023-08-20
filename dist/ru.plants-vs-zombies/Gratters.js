/*Взято с Вики Сообщества*/
(function($) {
    if (!$('#WikiaRail').length) {
        return;
    }
 
var wishes_array = [
	'Camandor@ru.plantsvs-zombies@ Поздравляю всех участников с пятилетием Plants vs. Zombies Wiki! Пусть последующие годы принесут ещё больше активности, в том числе новых статей и участников, данному проекту! <span style="color:rgb(0,100,0);"> И не забывайте поливать свои растения для предстоящих битв с нежитью!</span>',
	'TimmyfiedBoy@ru.plantsvs-zombies@ Поздравляю данный проект, а также всех его участников и администрацию с пятилетием. Желаю побольше мозговитых статей, убитых зомби и мощных растений. Настоятельно рекомендую сохранить свои мозги до следующей годовщины)))',
'BonkChoy99@ru.plantsvs-zombies@ Поздравляю всех, кто был на проэкте, тех кто правил страницы или просто случайных участников с такой великой датой. Столько всего было. Желаю вам сохранить мозги и удачи, а также хороших статей.',
],
    random = Math.floor(Math.random()*wishes_array.length),
    wish = wishes_array[random].split('@');
 
    $('#WikiaRail').prepend(
        '<div id="newyearwishes" style="width:98%; position:relative; margin:13px auto; font-size:15px;">' +
            '<div style="background: #e7f4d2; padding:20px 10px 10px 10px; border: 1px solid #FFFFFF; border-radius: 8px; box-shadow: 0px 2px 5px 0px #cde8a1;">' +
                '<div style="width:100%; text-align:center;">«' + wish[2] + '»</div>' +
                '<hr style="margin:5px 0;"/>' +
                '<div style="text-align:right; font-style:italic; margin-right:5px;">' +
                    'Участник <a href="/wiki/User:' + wish[0] + '">' + wish[0].replace('_', ' ') +'</a>' +
                    '<br />' +
                '</div>' +
            // Top-center
            '<div style="position:absolute; width:100%; text-align:center; top:-26px; left:0;">' +
                '<img src="https://vignette.wikia.nocookie.net/plantsvs-zombies/images/1/1f/5TrophyMini.png/revision/latest?cb=20180211183139&path-prefix=ru">' +
            '</div>' +
            // Top-left
            '<div style="position:absolute; top:-8px; left:-6px;">' +
                '<img src="https://vignette.wikia.nocookie.net/plantsvs-zombies/images/2/28/ExplodingFruitcakeMini.png/revision/latest?cb=20180211182247&path-prefix=ru">' +
            '</div>' +
            // Top-right
            '<div style="position:absolute; top:-6px; right:-8px;">' +
                '<img src="https://vignette.wikia.nocookie.net/plantsvs-zombies/images/3/36/PresentMini_2.png/revision/latest?cb=20180211185901&path-prefix=ru">' +
            '</div>' +
            // Bot-left
            '<div style="position:absolute; bottom:-8px; left:-8px;">' +
                '<img src="https://vignette.wikia.nocookie.net/plantsvs-zombies/images/2/21/PresentMini.png/revision/latest?cb=20180211183625&path-prefix=ru">' +
            '</div>' +
            // Bot-right
            '<div style="position:absolute; bottom:-8px; right:-6px;">' +
                '<img src="https://vignette.wikia.nocookie.net/plantsvs-zombies/images/5/50/ExplodingFruitcakeMini2.png/revision/latest?cb=20180211183411&path-prefix=ru">' +
            '</div>' +
        '</div>'
    );
})(this.jQuery);
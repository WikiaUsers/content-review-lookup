/*Взято с Вики Сообщества*/
(function($) {
    if (!$('#WikiaRail').length) {
        return;
    }
    
var wish = [['Онэ Юнайтед', 'Я поздравляю Anrgy Birds Wiki! 8 лет это просто огромный срок, но вики это её участники! От администраторов, до доже наверное, вандалов! Ведь если бы не участники, то вики бы не выжила. Так что я поздравлю участников этой вики! Всех, которые за 8 лет работапи на этой вики!'],
        ['Vlad Playz', 'Поздравляю Angry Birds Wiki! Всё-таки 8 лет стараний участников и нынешних администраторов достойны похвалы, без разницы, чей! Желаю вашей вики процветания, как и прежде.'],
        ['NowNoNamer', 'Восьмой. Как будто вчера был третий, серьёзно)'],
        ['Sasha300', 'Желаю данной вики цветения и благоухания . А также администраторам и участникам гиганский респект и долгих лет жизни. ;)'],
        ['King Hoggy 20-02', '8️⃣🎉🎂😡🐦Wiki🇷🇺<br />Список пожеланий: 🎁👊💘🚗🥇🎰📱💲📈🔝💯'],
        ['Stickmandsuy', 'Желаю, чтоб было всё очень хорошо, весело и радостно!  С восьми-летием! Наша Викия скоро в 3-тий класс пойдет!(бадум-тсс)'],
        ['Ybr-95', 'Желаю, чтобы конец этой вики был таким же достойным, как её начало и история.'],
        ['Super Piggeo', 'Поздравляю дорогую своему сердцу Angry Birds Wiki.<br />Наша вики, относящаяся к ныне не самомой популярной франшизе, достигла поразительных высот благодаря работе администрации и усилиям участников, даже образовала вокруг себя фольклор и богатую историю, доказав, что это действительно уникальный проект. Я желаю ему дальнейшего развития, а всем отмечающим эту дату - не забывать о нем, и помнить не только о самой вики, но и о людях, когда-то стоявших и до сих пор стоящих за ней. С восьмилетием!'],
        ['Stickmandsuy', 'Я завтра в школу не иду урааа!<br />А вики будет 8 лет!)'],
        ['Elisa the Midnight Slayer', 'Поздравляю вики с восьмилетием и хочу сказать спасибо всем участникам, от простого редактора до админа, за чудесные воспоминания, связанные с проектом.'],
        ['Zeynal10', 'Поздравляю с 8-летием. За это долгое время Angry Birds Wiki стало не просто Вики по Angry Birds, а нечто большим для всех нас. Именно здесь мы завели много друзей и знакомых, с которыми общаемся и вне Вики. Хочу сказать спасибо всем участникам, которые принесли вклад в эту Вики, писали блоги, деллали Мемы, создавали новые фандомы, и масштабные правки в статьях. Отдельное спасибо всем админам и модерам, да же почётным, за то, что проделали такую замечательную работу. Хочу пожелать вики прибавление Админ состава, Новых интересных участников, новые блоги, новые игры по Angry Birds и многое другое!'],
        ['Camandor', 'Проект — жил, проект — жив, проект — будет жить!!! Желаю и верю, что мы сможем возродить былую активность, наверстать упущенное и, словно воскрешённый феникс из горячего пепла, ещё покажем весь наш истинный и доселе нераскрытый по-настоящему потенциал.'],
        ['Хуперзвук48', 'Администраторы, конечно, в силах выдать на этот аккаунт бан, и я им этого не запрещаю. Я знаю, что мой локальный разбан на этой вики датируется следующим месяцем (как же быстро летит время...), но я помимо этого имею бессрочную глобальную блокировку за исполинский вандализм КБВ. Так что, мне нечего терять.<br />Angry Birds Wiki является первым википроектом, который я посетил, первым википроектом, куда я вносил вклад, а также третьим сайтом, на котором я зарегистрировался вообще. На протяжении 5 лет я повстречал на этом сайте многих обывателей, как хороших, так и плохих. Друзья также имелись, правда, ныне я общаюсь лишь с двумя -- Айс и Джей. Раньше их было куда больше, но одна часть из них покинула ФЭНДОМ, а другая -- просто перестала со мной общаться. С этим википроектом связано действительно много воспоминаний -- моя бывшая тяга к конфликтам, скандалы из-за УМ, мои долгие и тщательные попытки написать приличные блоги. Пришел я на эту вики будучи молоденьким мечтателем-фантазером, а ушел вандалом и мастером метаиронии.<br />Дальнейшая жизнь этой вики негарантированна, учитывая то, что серия Angry Birds давно утратила интерес фанатов, что сильно сказалось на активности этого сайта, а на новые достойные игры от компании надежды уже нет. Так что, раз судьба вики предрешена, то я желаю успешной дальнейшей жизни участникам этой вики, уже повзрослевшим.<br />С 8-летием!'],
        ['Agent KM', 'Я... Благодарен всему админ-составу (и Диме в частности), за то, что благодаря ей я познакомился с многими людьми, с которыми общаюсь до сих пор. Даже если вики пойдет в гроб, её частичка всегда останется в моей душе, но надеюсь, что этого не случится. Спасибо вам за все. Спасибо всем создателям народного творчества на вики. Просто спасибо. Я не знаю, что больше сказать.'],
        ['Rain Dreamer', '"Где же та молодая шпана, что сотрёт с нас с лица земли?" - пел Борис Гребенщиков почти сорок лет назад. Кажется, ветераны АБ-фанона думают сейчас то же самое. Собственно, в день рождения нашей вики я хотел бы пожелать ей новых людей, которые плотно занялись бы рассказами, играми, комиксами и прочим, которые реально горели бы этим делом.']],
    random = Math.floor(Math.random() * wish.length);
 
    $('#WikiaRail').prepend(
        '<div id="newyearwishes" style="width:98%; position:relative; margin:13px auto; font-size:15px;">' +
            '<div style="background-color:white; padding:20px 10px 10px 10px; border-radius:5px; border:2px Salmon; box-shadow:0 0 10px #0094FF; min-height:45px;">' +
                '<div style="width:100%; text-align:center;">«' + wish[random][1] + '»</div>' +
                '<hr style="margin:5px 0;"/>' +
                '<div style="text-align:right; font-style:italic; margin-right:5px;">' +
                    'Участник <a href="/ru/wiki/User:' + wish[random][0].replace(' ', '_') + '">' + wish[random][0] +'</a>' +
                    '<br />' +
                '</div>' +
            // Top-center
            '<div style="position:absolute; width:100%; text-align:center; top:-28px; left:0;">' +
                '<img src="https://vignette.wikia.nocookie.net/angrybirds/images/e/e4/7лет-2.png/revision/latest?cb=20190219203701&path-prefix=ru">' +
            '</div>' +
            // Top-left
            '<div style="position:absolute; top:-14px; left:-8px;">' +
                '<img src="https://images.wikia.nocookie.net/angrybirds/ru/images/9/9a/%D0%A2%D0%BE%D1%80%D1%82%D0%B5%D0%B3_40.png">' +
            '</div>' +
            // Top-right
            '<div style="position:absolute; top:-14px; right:-10px;">' +
                '<img src="https://images.wikia.nocookie.net/angrybirds/ru/images/7/78/%D0%A2%D0%BE%D1%80%D1%82%D0%B5%D0%B3_40_1.png">' +
            '</div>' +
        '</div>'
    );
})(this.jQuery);
$(document).ready(function() {
    var launchAdding = function() {
            var getObjects = {
                //  Номер:['Название','Ссылка на картинку (начиная от /images/)'], (запятая, если элемент не последний!!)
                0:['Торговец','e/e0/Credit_chip_small.png'],
                1:['Объект связан с Республикой','6/6e/36px-Galactic_Republic_Icon.png'],
                2:['Объект связан с Империей','1/1c/36px-Sith_Empire_Icon.png'],
                3:['Иконка указывает на запись Кодекса','1/14/Codex_Icon.png'],
                4:['Сильный, победить несложно','7/7d/Strong_Icon.png'],
                5:['Элитный - достойный противник','c/ce/Elite_Icon.png'],
                6:['Чемпион - опасен для одиночки','e/e9/Champion_Icon.png']
            };
            $('#WikiRecentActivity').after('<section class="NewSection module" id="NewSection"></section>');
            $('#NewSection').append('<h1 style="text-align:center; margin-bottom:10px;">Экспликация</h1>');
            $('#NewSection h1').after('<table id="ExplTable" style="width:100%; font-size:13px;"><tr><td style="text-align:center;"><span style="font-size:14px; color:yellow; font-weight:bold">*</span></td><td>Сундук</td></tr></table>');
            for (var i=0; i<Object.keys(getObjects).length; i++) {
                $('#ExplTable').append('<tr><td><img src="https://images.wiki.nocookie.net/swtor/ru/images/'+getObjects[i][1]+'" width="16" height="16"></td><td>'+getObjects[i][0]+'</td></tr>');
            }
        },
        searchCount = 0,
        searchRail = setInterval(function() {
            if ($('#WikiRecentActivity').length) {
                clearInterval(searchRail);
                launchAdding();
            } else if (searchCount == 10) { clearInteval(searchRail); }
            searchCount++;
        }, 500);
});
$(document).ready(function() {
    /* Скрипты для карточки предмета */
    itemListPrice();
    itemInit();
    opponentInit();
    function itemInit() {
        var infobox = $('table.aw_item_infobox');
        
        if (infobox.length) {
            loadList('loaded_locations', 'item_locations_list');
            loadList('loaded_shops', 'item_shop_list');
            loadList('loaded_quests', 'item_quest_list');
            loadList('loaded_loot', 'item_loot_list');
            loadList('loaded_random_loot', 'item_random_loot_list');
        }
        function loadList(contID, listID) {
            var a = $('#' + contID), b = $('#' + listID), l = a.children('ul');
            
            l.children('li').each(function() {
                var self = $(this), item = self.attr('title'), list = self.find('li'), parent = b.find('tbody').length ? b.find('tbody') : b, action = false;
                
                switch(contID) {
                    case 'loaded_locations': // Загрузка списка локаций
                    case 'loaded_quests': // Загрузка списка квестов
                    case 'loaded_loot': // Загрузка списка лута с противников
                    case 'loaded_random_loot': { // Загрузка списка возможного лута с противников
                        action = function(obj) {
                            var html = '<tr><td style="text-align: center; width: 20px;">' + obj.html() + '</td><td colspan="2"><a href="/wiki/' + item + '" title="' + item + '">' + item + '</a></td></tr>';
                            parent.append(html);
                        };
                        break;
                    }
                    case 'loaded_shops': {// Загрузка списка магазинов
                        action = function(obj) {
                            var arr = obj.html().split(' ');
                            var html = '<tr><td style="text-align: center; width: 20px;">' + arr[0] + '</td>\
                                <td><a href="/wiki/' + item + '" title="' + item + '">' + item + '</a>' + (arr[2] ? ' x ' + arr[2] : '') + '</td>\
                                <td style="text-align: center; width:100px;">' + arr[1] + ' монет</td></tr>';
                            parent.append(html);
                        };
                        break;
                    }
                }
                if (list.length) {
                    list.each(function() {action($(this));});
                }
            });
            a.remove();
            if (!b.find("tr[class!='title']").length) b.remove();
        }
    }
    function itemListPrice() {
        var list = $('table#location_item_list');
        if (list.length) {
            list.each(function() {
                var a = $(this).children('tbody').length ? $(this).children('tbody').children('tr') : $(this).children('tr');
                a.each(function() {
                    var b = $(this).children('td').eq(2), c = b.children('div'), d = b.find('table.aw_item_infobox tr'), e = '&mdash;';
                    for (var i=0; i < d.length; i++) {
                        if (d.eq(i).children('td').eq(0).html().search(/Value/) != -1) {
                            e = d.eq(i).children('td').eq(1).html() + ' монет';
                            break;
                        }
                    }
                    c.html(e);
                });
            });
        }
    }
    function opponentInit() {
        var b = $('table#opponent_locations_list');
        
        if (b.length) {
            var a = $('#loaded_locations'), l = a.children('ul');
            l.children('li').each(function() {
                var self = $(this), item = self.attr('title'), list = self.find('li'), parent = b.find('tbody').length ? b.find('tbody') : b;
                if (list.length) {
                    list.each(function() {
                        var html = '<tr><td style="text-align: center; width: 20px;">' + $(this).html() + '</td><td><a href="/wiki/' + item + '" title="' + item + '">' + item + '</a></td></tr>';
                        parent.append(html);
                    });
                }
            });
            a.remove();
        }
    }
});
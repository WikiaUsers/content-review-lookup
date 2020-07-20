/* Any JavaScript here will be loaded for all users on every page load. */
var monster = $('.quest-monster div#monster').text();

function parseIcon (questList, opus) {
    for (i=0;i<questList.length;i++) {
        (function (i) {
            var quest = questList[i];
            var id = 'quest-icon-'+opus+'-'+i;
            $.ajax({
                url: 'http://fr.mogapedia.wikia.com/api.php',
                data: {
                    'format': 'json',
                    'action': 'parse',
                    'text': quest.icon,
                    'prop': 'text',
                },
                type: 'GET',
                cache: false,
            })
            .done( function (data) {
                quest.icon = data.parse.text["*"];
                var rank;
                if ((quest.rank.match(/G/g)||[]).length) {
                    rank = quest.rank;
                }
                else {
                    rank = (quest.rank.match(/★/g)||[]).length + '★';
                }
                var $quest = $('img', quest.icon).attr({
                    width: "30",
                    height: "30"
                });
                var $tr = $('<tr class="show-collapsible-row" id="'+id+'">').html('<td>'+$quest.prevObject[0].innerHTML+'</td><td>'+quest.hub+' '+rank+'</td><td>'+quest.name+'</td>');
                var $trHidden = $('<tr class="collapsible-row quest collapsed-row">').html('<td colspan="3"><div><b>Objectif principal</b>: '+quest.goal.replace(/\[\[/g, '').replace(/\]\]/g, '')+'<br/><b>Objectif secondaire</b>: '+quest.subquest.replace(/\[\[/g, '').replace(/\]\]/g, '')+'<br/><b>Lieu</b>: '+quest.location.replace(/\[\[/g, '').replace(/\]\]/g, '')+'<br/><b>Récompense</b>: '+quest.rewardZ.replace(/\[\[/g, '').replace(/\]\]/g, '')+'</div></td>');
                $('.tabbertab[title='+quest.game+'] table.quest-table').append($tr);
                $('.tabbertab[title='+quest.game+'] table.quest-table').append($trHidden);  
                $('.show-collapsible-row#'+id).click(
                function () {
                    if ($(this).next().hasClass('collapsed-row')) {
                        $(this).next().removeClass('collapsed-row');
                    }
                    else {
                        $(this).next().addClass('collapsed-row');
                    }
                }
            );
            });
        }) (i);
    }
}

function shearchQuest (data, opus, hub) {
    var $dataRank = $('div.tabbertab', data);
    var questList = [];
    for (var tab=0; tab<$dataRank.length;tab++) {
        var rank = $dataRank[tab].attributes.title.value;
        if (rank.indexOf('★') !== -1) {
            var string = $dataRank[tab].outerHTML;
            var $dataQuest = $('.quest', string);
            for (var quest=0; quest<$dataQuest.length;quest++) {
                var goal = $dataQuest[quest].attributes[4].value;
                if (goal.indexOf('[['+monster+']]') !== -1) {
                    var dataQuest = $($dataQuest[quest]);
                    var dataRank = $($dataRank[tab]);
                    var object = {
                        hub: hub,
                        game: opus,
                        rank: dataRank.attr('title'),
                        name: dataQuest.attr('data-name'),
                        type: dataQuest.attr('data-type'),
                        icon: dataQuest.attr('data-icon'),
                        goal: dataQuest.attr('data-goal'),
                        location: dataQuest.attr('data-location'),
                        time: dataQuest.attr('data-time'),
                        rewardZ: dataQuest.attr('data-rewardz'),
                        rewardP: dataQuest.attr('data-rewardp'),
                        subquestP: dataQuest.attr('data-subquestp'),
                        subquestZ: dataQuest.attr('data-subquestz'),
                        subquest: dataQuest.attr('data-subquest'),
                        description: dataQuest.attr('data-description'),
                    };
                    questList.push(object);
                } 
            }
        } 
    }
    return questList;
}
 
function getMonsterQuest (opus) {
    var villagePath; 
    var guildPath;
    switch (opus) {
        case 'MHGen': 
            villagePath = 'MHGen_-_Quêtes_Village';
            guildPath = 'MHGen_-_Quêtes_Guilde';
            break;
        case 'MH4U': 
            villagePath = 'MH4U_-_Quêtes_Caravane';
            guildPath = 'Quêtes_de_la_Grand_Salle_(MH4U)';
    }
 
    var list = [];
    list.push($.ajax({
        url: 'http://fr.mogapedia.wikia.com/api.php',
        data: {
            'format': 'json',
            'action': 'parse',
            'page': guildPath,
            'prop': 'text',
        },
        type: 'GET',
        cache: false,
    })
        .done(function (data) {
        var d = data.parse.text["*"];
        list[0] = shearchQuest(d, opus, 'Guilde');
    }));
 
    list.push($.ajax({
        url: 'http://fr.mogapedia.wikia.com/api.php',
        data: {
            'format': 'json',
            'action': 'parse',
            'page': villagePath,
            'prop': 'text',
        },
        type: 'GET',
        cache: false,
    })
        .done(function (data) {
        var d = data.parse.text["*"];
        list[1] = shearchQuest(d, opus, 'Village');
    }));
 
    Promise.all(list).then(function(data) {
        list = list[0].concat(list[1]);
        var header = '<tr><th class="unsortable" style="text-align: center; color:#fff; width:170px; background-color:#996600;"> Icônes </th><th style="text-align: center; color:#fff; width:100px; background-color:#996600;"> Rang </th><th style="text-align: center; color:#fff; background-color:#996600;"> Nom de la quête </th></tr>';
        $('.quest-monster .tabbertab[title='+opus+'] table.quest-table').append(header);
        
        parseIcon(list, opus);
        if (list.length === 0) {
            $('.quest-monster .tabbernav li a[title='+opus+']').remove();
            $('.quest-monster .tabbertab[title='+opus+']').remove();
        }
        
    });
}

$(function () {
    list = [];
    getMonsterQuest('MHGen', list);
    getMonsterQuest('MH4U', list);
});
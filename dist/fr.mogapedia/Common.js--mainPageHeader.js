/* Any JavaScript here will be loaded for all users on every page load. */

if ($('#BanderoleWikia').length > 0) {
    var iconNumber = 12, // number of icons on the header
    opusNumber = Math.floor(Math.random() * (9 - 2 + 1) + 2), // select the right column of the table
    
    getMonsterIcons = function (list, loop) {
        var iconList = [],
        indiceList = [], i, nb;
        for (i = 0; i < loop; i++) {
            do {
                nb = Math.floor(Math.random() * list.length);
            }
            while (indiceList.indexOf(nb) != -1); 
        
            list[nb] = $(list[nb]).attr('href', $('td:first a', $(list[nb]).parents('tr')).attr('href')); // lien de l'icône par celui de la première cellule de sa ligne
            iconList.push(list[nb][0].outerHTML);
            indiceList.push(nb);
        }
        return iconList;
    };

    $.ajax({
        url: '/api.php',
        data: {
            'format': 'json',
            'action': 'parse',
            'page': 'Blog_utilisateur:Hutskuchi/Icones_des_Monstres',
            'prop': 'text',
        },
        dataType: 'json',
        type: 'GET',
        cache: false,
    })
    .done( function (data) {
        var text = data.parse.text['*'], 
        validCells, monsterIconList, i;
        validCells = $('td:nth-child(' + opusNumber + ') a.image', text);
        monsterIconList = getMonsterIcons(validCells, iconNumber);
        for (i = 0; i < iconNumber; i++) {
            $('#BanderoleWikia td')[i].innerHTML = monsterIconList[i];
        }
    });
}
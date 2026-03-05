/* En-tête dynamique de la page principale.
   Affiche une banderole d'icônes de monstres choisies aléatoirement
   parmi un opus au hasard. Les icônes et leurs liens sont extraits
   depuis la page « Blog_utilisateur:Hutskuchi/Icones_des_Monstres »
   via l'API MediaWiki. */

if ($('#BanderoleWikia').length > 0) {
    var iconNumber = 12, // nombre d'icônes affichées dans la banderole
    opusNumber = Math.floor(Math.random() * (9 - 2 + 1) + 2), // colonne aléatoire du tableau (= opus MH)

    // Sélectionne « loop » icônes aléatoires sans doublon depuis « list »
    getMonsterIcons = function (list, loop) {
        var iconList = [],
        indiceList = [], i, nb;
        for (i = 0; i < loop; i++) {
            do {
                nb = Math.floor(Math.random() * list.length);
            }
            while (indiceList.indexOf(nb) != -1);

            // Remplace le lien de l'icône par celui de la première cellule de sa ligne
            list[nb] = $(list[nb]).attr('href', $('td:first a', $(list[nb]).parents('tr')).attr('href'));
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
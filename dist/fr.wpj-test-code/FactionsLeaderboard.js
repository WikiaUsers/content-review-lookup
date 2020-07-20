//Configuration des factions
var Factions = [
    {
        name    :'Bleus',
        members : [
            'Parandar',
            'Thalia Herondale'
            ]
    },
    {
        name    :'Rouge',
        members : [
            'Elferia et fitz'
            ]
    }
];

function RefreshFactionsLeaderboard() {
    //Comptage des modifications dans le mois
    for (i = 0; i < Factions.length; i++) { 
        console.log(i);
        //Initialisation des variables de comptage pour le traitement
        window["NumberOfEdits_" + Factions[i]['name']] = 0;
        //Stockage des contributions
        $('body').append('<div id="UserContribsStock" style="display:none;"></div>');
        //Compte des modifications de chaque membre de faction
        for (member of Factions[i]['members']) {
            console.log(member);
        }
    }
}
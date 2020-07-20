var fallout = {};

fallout.card = "{| class=\"va-table va-table-center\" \n\
! style=\"font-size:300%; width:100px; height:50px\"|B \n\
! style=\"font-size:300%; width:100px; height:50px\"|I \n\
! style=\"font-size:300%; width:100px; height:50px\"|N \n\
! style=\"font-size:300%; width:100px; height:50px\"|G \n\
! style=\"font-size:300%; width:100px; height:50px\"|O \n";

fallout.pickedEntries = [];
fallout.entries = [
    'Todd in jeans and a T-shirt',
    'Nothing about Fallout for first 10 minutes',
    'We learned that from Skyrim',
    'To support the modding community',
    'Paid mods',
    'See that X, you can Y it',
    'Oct 2015 release date',
    'Mobile app',
    'Voiced protagonist',
    'New IP',
    'Pete is sarcastic',
    'Nervous silence',
    'Conference starts late',
    'Technical difficulties',
    'Fallout 4 gameplay',
    'CGI trailer',
    'X times bigger than Skyrim',
    'Massive open world',
    'Can\'t do this on last gen consoles',
    'Breaking new ground',
    'Nervous laughter',
    'We\'ve listened to fans',
    'Ron Perlman on stage',
    'Nuclear explosion',
    'Something Avellone related'
];

fallout.getRandomEntry = function() {
    rand = Math.round(Math.random() * (23 - 0) + 0);
    
    if (fallout.pickedEntries.indexOf(fallout.entries[rand]) > -1) {
        return fallout.getRandomEntry();
    } else {
        fallout.pickedEntries.push(fallout.entries[rand]);
        return fallout.entries[rand];
    }
};

fallout.generateCard = function() {
    for (var cols = 1; cols < 6; cols++) {
        fallout.card += "|- style=\"height:100px\"\n";
        
        for (var rows = 1; rows < 6; rows++) {
            if (rows === 3 && cols === 3) {
                fallout.card += "| [[File:Gametitle-FO4.png|80px]]\n";
            } else {
                fallout.card += "| " + fallout.getRandomEntry() + "\n";
            }
        }
    }
    
    fallout.card += '|}';
};

fallout.publishCard = function() {
    $.ajax({
        url: '/api.php',
        type: 'POST',
        dataType: 'json',
        data: {
            'action': 'edit',
            'title': 'User:' + mw.config.get('wgUserName') + '/E3_Bingo',
            'text': fallout.card,
            'reason': 'Auto-generating bingo card!',
            'format': 'json',
            'token': mw.user.tokens.values.editToken
        },
        success: function(data) {
            if (!data.error) {
                location.href = '/wiki/User:' + encodeURIComponent(mw.config.get('wgUserName')) + '/E3_Bingo';
            } else {
                alert("There was an error creating your card :(\nPlease refresh and try again or contact Shining-Armor\nError: " + data.error.info);
            }
        },
        error: function(e) {
            alert("There was an error creating your card :(\nPlease refresh and try again or contact Shining-Armor");
        }
    });
};

fallout.init = function() {
    if (mw.config.get('wgPageName') === 'User_blog:The_Gunny/Fallout_4_BINGO,_play_along') {
        document.querySelector('#falloutBingoButton').innerHTML = '<a class="wikia-button" id="falloutBingoButtonGenerate">Generate Card!</a>';
        document.querySelector('#falloutBingoButtonGenerate').addEventListener('click', function() {
            if (mw.config.get('wgUserName') !== null) {
                fallout.generateCard();
                fallout.publishCard();
            } else {
                alert('Please log in or create an account to play Bingo!');
            }
        });
    } else if (mw.config.get('wgPageName') === 'User:' + mw.config.get('wgUserName').replace(' ', '_') + '/E3_Bingo') {
        $('table.va-table td').each(function() {
            $(this).on('click', function() {
                $(this).css('background', 'white');
            });
        });
    }
};

$(document).ready(function() { fallout.init() });
(function() {
    var data = {
        1: [
            'Pilot',
            'Canvassing',
            'The Reporter',
            'Boys\' Club',
            'The Banquet',
            'Rock Show'
        ],
        2: [
            'Pawnee Zoo',
            'The Stakeout',
            'Beauty Pageant',
            'Practice Date',
            'Sister City',
            'Kaboom',
            'Greg Pikitis',
            'Ron and Tammy',
            'The Camel',
            'Hunting Trip',
            'Tom\'s Divorce',
            'Christmas Scandal',
            'The Set Up',
            'Leslie\'s House',
            'Sweetums',
            'Galentine\'s Day',
            'Woman of the Year',
            'The Possum',
            'Park Safety',
            'Summer Catalog',
            '94 Meetings',
            'Telethon',
            'The Master Plan',
            'Freddy Spaghetti'
        ],
        3: [
            'Go Big or Go Home',
            'Flu Season',
            'Time Capsule',
            'Ron & Tammy: Part 2',
            'Media Blitz',
            'Indianapolis',
            'Harvest Festival',
            'Camping',
            'April and Andy\'s Fancy Party',
            'Soulmates',
            'Jerry\'s Painting',
            'Eagleton',
            'The Fight',
            'Road Trip',
            'The Bubble',
            'Li\'l Sebastian'
        ],
        4: [
            'I\'m Leslie Knope',
            'Ron and Tammys',
            'Born & Raised',
            'Pawnee Rangers',
            'Meet N Greet',
            'End of the World',
            'The Treaty',
            'Smallest Park',
            'The Trial of Leslie Knope',
            'Citizen Knope',
            'The Comeback Kid',
            'Campaign Ad',
            'Bowling for Votes',
            'Operation Ann',
            'Dave Returns',
            'Sweet Sixteen',
            'Campaign Shake-Up',
            'Lucky',
            'Live Ammo',
            'The Debate',
            'Bus Tour',
            'Win, Lose, or Draw'
        ],
        5: [
            'Ms. Knope Goes to Washington',
            'Soda Tax',
            'How a Bill Becomes a Law',
            'Sex Education',
            'Halloween Surprise',
            'Ben\'s Parents',
            'Leslie vs. April',
            'Pawnee Commons',
            'Ron and Diane',
            'Two Parties',
            'Women in Garbage',
            'Ann\'s Decision',
            'Emergency Response',
            'Leslie and Ben',
            'Correspondents\' Lunch',
            'Bailout',
            'Partridge',
            'Animal Control',
            'Article Two',
            'Jerry\'s Retirement',
            'Swing Vote',
            'Are You Better Off?'
        ],
        6: [
            'London (part 1)',
            'London (part 2)',
            'The Pawnee-Eagleton Tip off Classic',
            'Doppelgängers',
            'Gin It Up!',
            'Filibuster',
            'Recall Vote',
            'Fluoride',
            'The Cones of Dunshire',
            'Second Chunce',
            'New Beginnings',
            'Farmers Market',
            'Ann and Chris',
            'Anniversaries',
            'The Wall',
            'New Slogan',
            'Galentine\'s Day',
            'Prom',
            'Flu Season 2',
            'One in 8,000',
            'Moving Up (part 1)',
            'Moving Up (part 2)'
        ],
        7: [
            '2017',
            'Ron & Jammy',
            'William Henry Harrison',
            'Leslie & Ron',
            'Gryzzlbox',
            'Save JJ\'s',
            'Donna & Joe',
            'Ms. Ludgate-Dwyer Goes to Washington',
            'Pie-Mary',
            'The Johnny Karate Super Awesome Musical Explosion Show',
            'Two Funerals',
            'One Last Ride'
        ]
    }
    var html = '<section id="episode-search" class="module"><h2>Search an episode</h2><form id="search-episode" class="WikiaForm"><div id="season-container"><b>Season:</b> <select id="season"><option value="">select a season</option>';
    for (var i in data) {
        html += '<option value="' + i + '">Season ' + i + '</option>';
    }
    html += '</select></div><div id="episode-container"></div><button type="submit" style="margin-top: 5px;">Go</button></form></section>';
    document.getElementById('WikiaRecentActivity').insertAdjacentHTML('afterend', html);
    document.getElementById('season').addEventListener('change', function() {
        var select = '<b>Episode:</b> <select id="episode" style="max-width: 200px;">';
        for (i = 0; i < data[this.value].length; i++) {
            var val = i + 1;
            if (val < 10) {
                val = '0' + val;
            }
            select += '<option value="' + val + '">Episode ' + val + ' - ' + data[this.value][i] + '</option>';
        }
        select += '</select>';
        document.getElementById('episode-container').innerHTML = select;
    });
    document.getElementById('search-episode').addEventListener('submit', function(e) {
        e.preventDefault();
        var season = document.getElementById('season'),
            episode = document.getElementById('episode');
        if (!(season && season.value && episode && episode.value)) {
            var error = document.createElement('span');
                error.id = 'episode-search-error';
                error.textContent = ' Please fill out all fields';
            this.appendChild(error);
            return false;
        }
        window.location.replace(window.location.origin + '/wiki/S0' + season.value + 'E' + episode.value);
    });
})();
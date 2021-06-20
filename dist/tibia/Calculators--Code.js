//<noinclude>{{protected|this page contains javascript and therefor VERY vulnerable to vandalism or hackers}}</noinclude>
/*jslint devel: true, browser: true, white: true, indent: 2, plusplus: true, bitwise: true*/
/*global $, wgUserName, mw */
$(function() {
    //__NOWYSIWYG__
    /*General*/
    'use strict';
    var npcs_locations = { /* Took from Template:NPC_Trades/City */
            'A Bearded Woman': 'Carlin*',
            'A Beautiful Girl': 'Yalahar*',
            'A Confused Frog': 'Thais*',
            'A Dark Priestess': 'Edron*',
            'A Dead Bureaucrat': 'Venore*',
            'A Dwarven Ghost': 'Kazordoon*',
            'A Fading Memory': 'Yalahar*',
            'A Fluffy Squirrel': 'Carlin*',
            'A Frog': 'Thais*',
            'A Ghostly Guardian': 'Venore*',
            'A Ghostly Knight': 'Venore*',
            'A Ghostly Sage': 'Venore*',
            'A Ghostly Woman': 'Carlin*',
            'A Grumpy Cyclops': 'Yalahar',
            'A Lost Soul': 'Carlin*',
            'A Majestic Warwolf': 'Edron*',
            'A Prisoner': 'Thais*',
            'A Restless Soul': 'Svargrond*',
            'A Sleeping Dragon': 'Farmine*',
            'A Starving Dog': 'Svargrond*',
            'A Strange Fellow': 'Venore',
            'A Sweaty Cyclops': 'Ab\'Dendriel',
            'A Tainted Soul': 'Carlin*',
            'A Tortured Soul': 'Carlin*',
            'A Wandering Soul': 'Yalahar*',
            'A Wrinkled Bonelord': 'Ab\'Dendriel*',
            'Abran Ironeye': 'Venore',
            'Admiral Wyrmslicer': 'Liberty Bay',
            'Adrenius': 'Venore*',
            'Ahmet': 'Ankrahmun',
            'Ajax': 'Carlin*',
            'Alaistar': 'Rathleton',
            'Al Dee': 'Rookgaard',
            'Albert': 'Edron*',
            'Albinius': 'Thais*',
            'Aldo': 'Venore',
            'Alesar': 'Ankrahmun*',
            'Alexander': 'Edron',
            'Alia': 'Carlin',
            'Alissa': 'Meluna',
            'Allen': 'Venore',
            'Alternative Rock': 'Gray Beach',
            'Alwin': 'Venore',
            'Amanda': 'Edron',
            'Amarie': 'Ab\'Dendriel',
            'Amber': 'Rookgaard',
            'An Ancient Priest': 'Ankrahmun*',
            'An Apparition': 'Carlin*',
            'An Old Dragonlord': 'Ab\'Dendriel*',
            'An Orc Guard': 'Rookgaard',
            'Anderson': 'Carlin*',
            'Anerui': 'Ab\'Dendriel',
            'Aneus': 'Carlin*',
            'Angelina': 'Venore*',
            'Angus': 'Port Hope',
            'Appaloosa': 'Venore',
            'Ariella': 'Liberty Bay*',
            'Arito': 'Ankrahmun',
            'Arkarra': 'Carlin*',
            'Arkhothep': 'Ankrahmun',
            'Arkulius': 'Edron',
            'Armenius': 'Yalahar*',
            'Arnold': 'Venore',
            'Aruda': 'Thais',
            'Ashtamor': 'Venore',
            'Asima': 'Darashia',
            'Asnarus': 'Roshamuul',
            'Asrak': 'Venore',
            'Asralius': 'Rookgaard',
            'Atrad': 'Liberty Bay*',
            'Auron': 'Roshamuul',
            'Avar Tar': 'Edron*',
            'Awareness of the Emperor': 'Farmine*',
            'Azalea': 'Rathleton',
            'Azil': 'Darashia',
            'Baa\'Leal': 'Ankrahmun*',
            'Baltim': 'Svargrond*',
            'Bambi Bonecrusher': 'Carlin',
            'Barbara': 'Carlin',
            'Barnabas Dee': 'Rathleton',
            'Barney': 'Liberty Bay*',
            'Barry': 'Yalahar*',
            'Bashira': 'Ab\'Dendriel',
            'Basilisk': 'Kazordoon*',
            'Baxter': 'Thais',
            'Beatrice': 'Edron',
            'Ben': 'Port Hope',
            'Benevola': 'Ab\'Dendriel*',
            'Benjamin': 'Thais*',
            'Berenice': 'Liberty Bay',
            'Bertha': 'Svargrond',
            'Bertram': 'Liberty Bay',
            'Bezil': 'Kazordoon',
            'Biff The Baker': 'Thais',
            'Billy': 'Rookgaard',
            'Black Bert': 'Thais',
            'Blind Orc': 'Rookgaard*',
            'Blossom Bonecrusher': 'Carlin',
            'Bo\'Ques': 'Ankrahmun',
            'Bolfona': 'Yalahar*',
            'Bonifacius': 'Edron',
            'Boozer': 'Venore',
            'Borkas': 'Venore',
            'Boveas': 'Thais',
            'Bozo': 'Thais',
            'Braden': 'Liberty Bay',
            'Bradford': 'Liberty Bay',
            'Brasith': 'Ab\'Dendriel',
            'Brengus': 'Port Hope',
            'Brewster': 'Port Hope',
            'Briasol': 'Ab\'Dendriel',
            'Brodrosch': 'Kazordoon',
            'Bron': 'Carlin*',
            'Bruce': 'Yalahar*',
            'Bruno': 'Carlin*',
            'Buddel': 'Svargrond*',
            'Budrik': 'Kazordoon*',
            'Bunny Bonecrusher': 'Carlin',
            'Busty Bonecrusher': 'Carlin',
            'Cael': 'Farmine',
            'Cameron': 'Liberty Bay',
            'Captain Bluebear': 'Thais',
            'Captain Breezelda': 'Svargrond',
            'Captain Cookie': 'Yalahar',
            'Captain Fearless': 'Venore',
            'Captain Greyhound': 'Carlin',
            'Captain Haba': 'Svargrond',
            'Captain Jack': 'Carlin*',
            'Captain Kurt': 'Island of Destiny',
            'Captain Max': 'Liberty Bay*',
            'Captain Seagull': 'Ab\'Dendriel',
            'Captain Seahorse': 'Edron',
            'Captain Sinbeard': 'Ankrahmun',
            'Captain Tiberius': 'Travora',
            'Captain Waverider': 'Liberty Bay*',
            'Caramellia': 'Carlin*',
            'Carina': 'Venore',
            'Carlos': 'Rookgaard*',
            'Carlson': 'Carlin*',
            'Casper': 'Darashia*',
            'Cedrik': 'Liberty Bay',
            'Ceiron': 'Ab\'Dendriel*',
            'Cerdras': 'Carlin',
            'Chantalle': 'Liberty Bay',
            'Charles': 'Port Hope',
            'Charlotta': 'Liberty Bay',
            'Chartan': 'Farmine*',
            'Chatterbone': 'Venore',
            'Chemar': 'Darashia',
            'Chephan': 'Venore',
            'Chester Kahs': 'Thais',
            'Chief Grarkharok': 'Edron*',
            'Chip': 'Carlin*',
            'Chondur': 'Liberty Bay*',
            'Chrak': 'Farmine*',
            'Christine': 'Rathleton',
            'Christoph': 'Venore',
            'Chrystal': 'Edron',
            'Chuckles': 'Yalahar',
            'Cillia': 'Thais',
            'Cipfried': 'Rookgaard',
            'Clark': 'Port Hope',
            'Clyde': 'Port Hope',
            'Cobra (NPC)': 'Ankrahmun*',
            'Coltrayne': 'Dawnport',
            'Cornelia': 'Carlin',
            'Costello': 'Carlin*',
            'Cranky Lizard Crone': 'Farmine*',
            'Cruleo': 'Ab\'Dendriel*',
            'Curos': 'Farmine*',
            'Dabui': 'Darashia*',
            'Dagomir': 'Venore',
            'Dalbrect': 'Carlin*',
            'Dallheim': 'Rookgaard',
            'Dane': 'Carlin',
            'Daniel Steelsoul': 'Edron',
            'Dankwart': 'Svargrond',
            'Danlon': 'Liberty Bay*',
            'Dario': 'Ankrahmun',
            'Dark Priestess': 'Edron*',
            'Demon Mother': 'Venore*',
            'Demonguard': 'Venore*',
            'Dermot': 'Thais*',
            'Digger': 'Venore',
            'Dixi': 'Rookgaard',
            'Djema': 'Ankrahmun*',
            'Donald McRonald': 'Thais',
            'Dorbin': 'Yalahar',
            'Dorian': 'Thais',
            'Doug': 'Liberty Bay',
            'Dove': 'Venore',
            'Dread Guardian': 'Yalahar*',
            'Dreadeye': 'Ab\'Dendriel',
            'Drog': 'Yalahar*',
            'Dronk': 'Kazordoon',
            'Druid Yandur': 'Island of Destiny',
            'Dukosch': 'Kazordoon*',
            'Duncan': 'Liberty Bay*',
            'Duria': 'Kazordoon',
            'Dustrunner': 'Venore',
            'Ebenizer': 'Edron',
            'Eclesius': 'Thais',
            'Edala': 'Ab\'Dendriel*',
            'Eddy': 'Thais*',
            'Edoch': 'Darashia',
            'Edmund': 'Rathleton',
            'Edowir': 'Thais*',
            'Edron Guardsman': 'Edron',
            'Edvard': 'Edron',
            'Eirik': 'Svargrond',
            'Elane': 'Thais',
            'Elathriel': 'Ab\'Dendriel',
            'Eleonore': 'Liberty Bay',
            'Elf Guard': 'Ab\'Dendriel',
            'Elgar': 'Travora',
            'Eliza': 'Edron',
            'Elvith': 'Ab\'Dendriel',
            'Emilie': 'Thais',
            'Emma': 'Carlin',
            'Emperor Kruzak': 'Kazordoon',
            'Emperor Rehal': 'Yalahar*',
            'Eranth': 'Liberty Bay*',
            'Erayo': 'Liberty Bay*',
            'Eremo': 'Edron*',
            'Eroth': 'Ab\'Dendriel',
            'Esrik': 'Farmine',
            'Ethan': 'Yalahar*',
            'Etzel': 'Kazordoon*',
            'Eva': 'Carlin',
            'Evan': 'Liberty Bay',
            'Ezean': 'Farmine*',
            'Fa\'Hradin': 'Ankrahmun*',
            'Fadil': 'Darashia',
            'Falk': 'Edron',
            'Faluae': 'Ab\'Dendriel',
            'Feizuhl': 'Ankrahmun',
            'Fenbala': 'Carlin',
            'Fenech': 'Ankrahmun',
            'Fergus': 'Liberty Bay',
            'Ferks': 'Port Hope',
            'Ferryman Kamil': 'Thais*',
            'Ferus': 'Kazordoon',
            'Finarfin': 'Ab\'Dendriel',
            'Fiona': 'Edron',
            'Flint': 'Rathleton',
            'Florentine': 'Carlin',
            'Frafnar': 'Yalahar*',
            'Frans': 'Venore',
            'Frederik': 'Liberty Bay',
            'Freezhild': 'Svargrond*',
            'Friedolin': 'Carlin',
            'Frodo': 'Thais',
            'Frok, the Guard': 'Yalahar*',
            'Fyodor': 'Rathleton',
            'Fynn': 'Svargrond',
            'Gabel': 'Ankrahmun*',
            'Gail': 'Port Hope',
            'Galuna': 'Thais',
            'Gamel': 'Thais',
            'Gamon': 'Thais',
            'Garamond': 'Dawnport',
            'Garzon': 'Yalahar*',
            'Gate Guardian': 'Farmine*',
            'Gelagos': 'Carlin*',
            'Gewen': 'Kazordoon',
            'Ghorza': 'Rathleton*',
            'Ghost Captain': 'Thais*',
            'Ghost of a Priest': 'Port Hope*',
            'Ghostly Woman': 'Venore*',
            'Ghosts of a Priest': 'Port Hope*',
            'Gnomailion': 'Gnomegate',
            'Gnomally': 'Gnomegate',
            'Gnomegica': 'Gnomegate',
            'Gnomejam': 'Gnomegate',
            'Gnomad': 'Gnomegate',
            'Gnomenezer': 'Gnomegate',
            'Gnomercy': 'Gnomegate',
            'Gnomerrow': 'Gnomegate',
            'Gnomette': 'Gnomegate',
            'Gnomincia': 'Gnomegate',
            'Gnominus': 'Gnomegate',
            'Gnomission': 'Gnomegate',
            'Gnomole': 'Gnomegate',
            'Gnomux': 'Kazordoon*',
            'Gladys': 'Edron*',
            'Golem Guardian': 'Yalahar',
            'Golem Servant': 'Yalahar*',
            'Gordon': 'Liberty Bay',
            'Gorn': 'Thais',
            'Graham': 'Rathleton',
            'Graubart': 'Carlin*',
            'Gree Dee': 'Yalahar',
            'Gregor': 'Thais',
            'Grizzly Adams': 'Port Hope',
            'Grodrik': 'Kazordoon',
            'Grof, The Guard': 'Thais',
            'Grombur': 'Yalahar*',
            'Gruffy': 'Thais*',
            'Guide Alexena': 'Carlin',
            'Guide Behil': 'Darashia',
            'Guide Davina': 'Liberty Bay',
            'Guide Edna': 'Yalahar',
            'Guide Elena': 'Venore',
            'Guide Jonathan': 'Edron',
            'Guide Luke': 'Thais',
            'Guide Rahlkora': 'Ankrahmun',
            'Guide Thelandil': 'Ab\'Dendriel',
            'Guide Tiko': 'Port Hope',
            'Gundralph': 'Edron',
            'Gurbasch': 'Edron*',
            'H.L.': 'Venore*',
            'Habdel': 'Darashia',
            'Hagor': 'Venore*',
            'Hairycles': 'Port Hope*',
            'Hal': 'Yalahar*',
            'Halif': 'Darashia',
            'Halvar': 'Svargrond',
            'Hamilton': 'Liberty Bay',
            'Hamish': 'Dawnport',
            'Hanna': 'Thais',
            'Hardek': 'Thais*',
            'Harkath Bloodblade': 'Thais',
            'Harlow': 'Yalahar*',
            'Harog': 'Yalahar*',
            'Haroun': 'Ankrahmun',
            'Harsky': 'Thais',
            'Hawkyr': 'Svargrond',
            'Healing Wolf Master': 'Unknown',
            'Helor': 'Port Hope',
            'Hemor, The Guard': 'Kazordoon',
            'Henricus': 'Thais',
            'Herbert': 'Liberty Bay',
            'Hjaern': 'Svargrond*',
            'Hoaxette': 'Thais',
            'Hofech': 'Darashia',
            'Hoggle': 'Thais',
            'Hugo': 'Venore',
            'Humgolf': 'Kazordoon',
            'Humnog, The Guard': 'Kazordoon',
            'Humphrey': 'Carlin*',
            'Huntsman': 'Ab\'Dendriel',
            'Hyacinth': 'Rookgaard*',
            'Imalas': 'Carlin',
            'Imbul': 'Port Hope',
            'Inigo': 'Dawnport',
            'Irea': 'Ab\'Dendriel',
            'Iriana': 'Yalahar*',
            'Irmana': 'Venore',
            'Irvin': 'Liberty Bay',
            'Ishebad': 'Ankrahmun',
            'Ishina': 'Darashia',
            'Isimov': 'Kazordoon',
            'Iskan': 'Svargrond',
            'Isolde': 'Liberty Bay',
            'Iwan': 'Edron',
            'Iwar': 'Kazordoon',
            'Iyad': 'Svargrond',
            'Izsh': 'Farmine*',
            'Jack': 'Edron*',
            'Jack\'s Mother': 'Edron*',
            'Jack\'s Sister': 'Edron*',
            'Jack Fate': 'Liberty Bay',
            'Jakahr': 'Ankrahmun',
            'James': 'Edron*',
            'Janz': 'Svargrond',
            'Jason': 'Liberty Bay*',
            'Jean Claude': 'Venore',
            'Jean Pierre': 'Ankrahmun*',
            'Jefrey': 'Liberty Bay',
            'Jerom': 'Edron*',
            'Jessica': 'Svargrond',
            'Jezzara': 'Ankrahmun',
            'Jimbin': 'Kazordoon',
            'Jimmy': 'Yalahar*',
            'John': 'Liberty Bay*',
            'Jorge': 'Thais*',
            'Julian': 'Venore',
            'Julius': 'Yalahar*',
            'Junkar': 'Thais*',
            'Kalvin': 'Venore',
            'Karith': 'Yalahar',
            'Karl': 'Carlin',
            'Kasmir': 'Darashia',
            'Kawill': 'Kazordoon',
            'Kaya': 'Rathleton*',
            'Kazzan': 'Darashia',
            'Kevin': 'Thais*',
            'Kihil, the Guard': 'Yalahar*',
            'King Tibianus': 'Thais',
            'Kito': 'Farmine*',
            'Kjesse': 'Svargrond',
            'Klaus': 'Liberty Bay*',
            'Knight Hykrion': 'Island of Destiny',
            'Kroox': 'Kazordoon',
            'Kulag, The Guard': 'Thais',
            'Lailene': 'Edron',
            'Larek': 'Rathleton*',
            'Lazaran': 'Farmine*',
            'Lea': 'Carlin',
            'Lector': 'Carlin',
            'Lee\'Delle': 'Rookgaard',
            'Leeland': 'Venore',
            'Legola': 'Carlin',
            'Liane': 'Carlin',
            'Lightfoot': 'Venore',
            'Lily': 'Rookgaard',
            'Lisander': 'Yalahar',
            'Livielle': 'Venore',
            'Lizard Tunnel Guard': 'Farmine*',
            'Llathriel': 'Ab\'Dendriel',
            'Lokur': 'Kazordoon',
            'Lorbas': 'Venore*',
            'Lorek': 'Port Hope',
            'Loria': 'Thais',
            'Lorietta': 'Yalahar',
            'Lothar': 'Carlin',
            'Lou Toose': 'Carlin',
            'Loui': 'Rookgaard',
            'Lubo': 'Thais*',
            'Lucius': 'Yalahar*',
            'Lugri': 'Thais*',
            'Lukosch': 'Kazordoon*',
            'Luna': 'Edron',
            'Lunch': 'Kazordoon*',
            'Lungelen': 'Thais',
            'Lurik': 'Svargrond',
            'Lynda': 'Thais',
            'Lyonel': 'Liberty Bay',
            'Maealil': 'Ab\'Dendriel',
            'Mugruu': 'Rathleton*',
            'Makao': 'Farmine*',
            'Malor': 'Ankrahmun',
            'Malunga': 'Liberty Bay',
            'Marcus': 'Liberty Bay',
            'Maria': 'Venore',
            'Marina': 'Liberty Bay*',
            'Maris': 'Yalahar*',
            'Maritima': 'Yalahar*',
            'Markwin': 'Thais*',
            'Marlene': 'Carlin*',
            'Maro': 'Rathleton',
            'Marvik': 'Thais',
            'Maryza': 'Kazordoon',
            'Maun': 'Roshamuul',
            'Mehkesh': 'Ankrahmun',
            'Melchior': 'Ankrahmun',
            'Melfar': 'Kazordoon',
            'Melian': 'Farmine',
            'Memech': 'Ankrahmun',
            'Menacing Mummy': 'Yalahar',
            'Meraya': 'Liberty Bay*',
            'Messenger of Santa': 'Varies',
            'Miles, The Guard': 'Thais',
            'Milos': 'Edron',
            'Minzy': 'Venore*',
            'Mirabell': 'Edron',
            'Miraia': 'Darashia',
            'Mordecai': 'Rathleton',
            'Morgan': 'Liberty Bay',
            'Morpel': 'Yalahar',
            'Mortimer': 'Carlin*',
            'Morun': 'Darashia',
            'Mr. West': 'Yalahar*',
            'Mugluf': 'Darashia',
            'Muhad': 'Ankrahmun',
            'Muriel': 'Thais',
            'Murim': 'Farmine',
            'Muzir': 'Darashia',
            'Myra': 'Port Hope',
            'Nah\'Bob': 'Ankrahmun*',
            'Naji': 'Thais',
            'Namasa': 'Farmine*',
            'Nathaniel': 'Venore',
            'Ned Nobel': 'Varies',
            'Nelliem': 'Venore',
            'Nelly': 'Svargrond',
            'Nemal': 'Venore*',
            'Nezil': 'Kazordoon',
            'Nicholas': 'Rathleton',
            'Nielson': 'Carlin',
            'Nienna': 'Meluna',
            'Nilsor': 'Svargrond*',
            'Nokmir': 'Yalahar*',
            'Noodles': 'Thais',
            'Nor': 'Svargrond*',
            'Norbert': 'Venore',
            'Norf': 'Thais*',
            'Norma': 'Rookgaard',
            'Norris': 'Liberty Bay',
            'Nurik': 'Venore',
            'Nydala': 'Carlin',
            'Obi': 'Rookgaard',
            'Ocelus': 'Liberty Bay*',
            'Odemara': 'Venore',
            'Oiriz': 'Yalahar',
            'Old Adall': 'Port Hope',
            'Old Rock Boy': 'Gray Beach',
            'Oldrak': 'Venore*',
            'Oliver': 'Yalahar*',
            'Olrik': 'Ab\'Dendriel',
            'Omur': 'Darashia',
            'Ongulf': 'Farmine',
            'Orc Berserker (NPC)': 'Yalahar',
            'Ormuhn': 'Ankrahmun',
            'Orockle': 'Gray Beach',
            'Ortheus': 'Yalahar*',
            'Oswald': 'Thais',
            'Ottokar': 'Venore',
            'Padreia': 'Carlin',
            'Paladin Narai': 'Island of Destiny',
            'Palimuth': 'Yalahar',
            'Palomino': 'Thais',
            'Paolo': 'Liberty Bay*',
            'Parlan': 'Liberty Bay',
            'Partos': 'Thais',
            'Paulette': 'Thais',
            'Paulie': 'Rookgaard',
            'Peggy': 'Liberty Bay',
            'Pemaret': 'Edron*',
            'Penny': 'Carlin*',
            'Perac': 'Carlin',
            'Percy Silverhand': 'Liberty Bay',
            'Percybald': 'Carlin',
            'Perod': 'Port Hope',
            'Peter': 'Yalahar*',
            'Petros': 'Darashia',
            'Phillip': 'Carlin',
            'Pig (NPC)': 'Thais',
            'Pino': 'Edron',
            'Polly': 'Liberty Bay*',
            'Pompan': 'Farmine',
            'Prezil': 'Farmine',
            'Prisoner': 'Thais',
            'Puffels': 'Edron',
            'Pugwah': 'Yalahar',
            'Pukosch': 'Kazordoon*',
            'Pydar': 'Kazordoon',
            'Pyro Peter': 'Venore',
            'Pyromental': 'Yalahar*',
            'Pythius the Rotten': 'Yalahar*',
            'Queen Eloise': 'Carlin',
            'Quentin': 'Thais',
            'Quero': 'Thais',
            'Rabaz': 'Farmine',
            'Rachel': 'Carlin',
            'Raffael': 'Island of Destiny',
            'Rafzan': 'Venore*',
            'Rahkem': 'Ankrahmun',
            'Rapanaio': 'Kazordoon',
            'Rashid': 'Varies',
            'Rata\'Mari': 'Ankrahmun',
            'Ray': 'Port Hope',
            'Raymond Striker': 'Liberty Bay*',
            'Razan': 'Darashia',
            'Red Lilly': 'Liberty Bay',
            'Redward': 'Yalahar',
            'Reed': 'Yalahar*',
            'Rehon': 'Yalahar*',
            'Richard': 'Dawnport',
            'Riddler': 'Kazordoon*',
            'Robert': 'Svargrond',
            'Robin': 'Thais',
            'Robson': 'Kazordoon*',
            'Rock In A Hard Place': 'Gray Beach',
            'Rock Steady': 'Gray Beach',
            'Roderick': 'Ab\'Dendriel',
            'Rodney': 'Venore',
            'Rokyn': 'Venore',
            'Romella': 'Venore',
            'Romir': 'Svargrond*',
            'Rose': 'Venore',
            'Rosemarie': 'Port Hope',
            'Ross': 'Liberty Bay',
            'Roswitha': 'Rathleton',
            'Rottin Wood': 'Venore*',
            'Rowenna': 'Carlin',
            'Rudolph': 'Edron',
            'Ruprecht': 'Carlin*',
            'Sam': 'Thais',
            'Samir': 'Darashia*',
            'Sandra': 'Edron',
            'Santa Claus': 'Tibia',
            'Santiago': 'Rookgaard',
            'Sarina': 'Carlin',
            'Satsu': 'Meluna',
            'Scott': 'Carlin*',
            'Scrutinon': 'Gray Island',
            'Scutty': 'Kazordoon',
            'Sebastian': 'Liberty Bay*',
            'Serafin': 'Yalahar*',
            'Servant Sentry': 'Edron',
            'Ser Tybald': 'Dawnport',
            'Seymour': 'Rookgaard',
            'Shalmar': 'Darashia',
            'Shanar': 'Ab\'Dendriel',
            'Sharon': 'Travora',
            'Shauna': 'Carlin',
            'Sherry McRonald': 'Thais',
            'Shiantis': 'Venore',
            'Shiriel': 'Ab\'Dendriel',
            'Shirith': 'Ab\'Dendriel',
            'Shoddy Beggar': 'Edron',
            'Siflind': 'Svargrond*',
            'Sigurd': 'Kazordoon',
            'Silas': 'Rathleton',
            'Simon the Beggar': 'Thais*',
            'Sinatuki': 'Svargrond*',
            'Sinclair': 'Edron',
            'Sirik': 'Svargrond',
            'Skeleton Guard': 'Liberty Bay*',
            'Skip': 'Liberty Bay*',
            'Skjaar': 'Thais*',
            'Smaralda': 'Thais',
            'Smiley': 'Venore',
            'Snake Eye': 'Venore*',
            'Soilance': 'Yalahar',
            'Sorcerer Estrella': 'Island of Destiny',
            'Spectulus': 'Edron',
            'Stan': 'Venore',
            'Storkus': 'Kazordoon*',
            'Stutch': 'Thais',
            'Suzy': 'Thais',
            'Sven': 'Svargrond',
            'Svenson': 'Carlin*',
            'Swolt': 'Farmine',
            'Sylvester': 'Venore',
            'Taegen': 'Feyrist',
            'Talesia': 'Venore',
            'Talila': 'Feyrist',
            'Talphion': 'Kazordoon',
            'Tamara': 'Yalahar*',
            'Tamerin': 'Yalahar*',
            'Tamoril': 'Yalahar*',
            'Tanaro': 'Meluna',
            'Tandros': 'Port Hope',
            'Tarak': 'Yalahar*',
            'Tatak': 'Farmine*',
            'Tehlim': 'Yalahar*',
            'Telas': 'Edron*',
            'Telas Golem': 'Edron*',
            'Tereban': 'Edron',
            'Tesha': 'Ankrahmun',
            'Testserver Assistant': 'Varies',
            'Tezila': 'Kazordoon',
            'Thanita': 'Carlin*',
            'The Blind Prophet': 'Port Hope*',
            'The Bone Master': 'Venore*',
            'The Crone': 'Ankrahmun*',
            'The Dream Master': 'Venore*',
            'The Gatekeeper': 'Rookgaard',
            'The Oracle': 'Rookgaard',
            'The Orc King': 'Venore*',
            'The Queen Of The Banshee': 'Carlin*',
            'Theodore Loveless': 'Liberty Bay',
            'Thomas': 'Edron',
            'Thorgrin': 'Farmine',
            'Thorwulf': 'Svargrond',
            'Tibra': 'Carlin',
            'Tim, The Guard': 'Thais',
            'Timothy': 'Yalahar',
            'Timur': 'Thais*',
            'Todd': 'Thais',
            'Tokel': 'Thais*',
            'Tom': 'Rookgaard',
            'Tony': 'Yalahar*',
            'Toothless Tim': 'Carlin',
            'Topsy': 'Thais',
            'Torence': 'Liberty Bay',
            'Tothdral': 'Ankrahmun',
            'Towncryer': 'Thais',
            'Trimegis': 'Thais',
            'Trisha': 'Carlin',
            'Tristan': 'Liberty Bay',
            'Tulf': 'Kazordoon',
            'Turvy': 'Thais',
            'Tyrias': 'Liberty Bay',
            'Ubaid': 'Ankrahmun*',
            'Ukea': 'Ab\'Dendriel',
            'Ulala': 'Farmine*',
            'Ulrik': 'Thais*',
            'Umar': 'Ankrahmun*',
            'Uncle': 'Venore',
            'Urkalio': 'Venore',
            'Ursula': 'Edron',
            'Uso': 'Port Hope',
            'Ustan': 'Port Hope',
            'Uzgod': 'Kazordoon',
            'Uzon': 'Carlin*',
            'Vad Inchi': 'Thais',
            'Valentina': 'Thais*',
            'Valindara': 'Feyrist',
            'Vascalir': 'Rookgaard',
            'Velvet': 'Venore',
            'Vera': 'Carlin*',
            'Vescu': 'Port Hope*',
            'Vincent': 'Yalahar',
            'Vladruc': 'Venore',
            'Vulturenose': 'Liberty Bay*',
            'Wally': 'Thais*',
            'Walter, The Guard': 'Thais',
            'Warbert': 'Venore',
            'Willard': 'Edron',
            'William': 'Carlin',
            'Willie': 'Rookgaard',
            'Winfred': 'Carlin*',
            'Wyat': 'Thais',
            'Wyda': 'Venore*',
            'Wyrdin': 'Edron',
            'Xed': 'Venore',
            'Xelvar': 'Kazordoon',
            'Xodet': 'Thais',
            'Xorlosh': 'Yalahar*',
            'Yalahari (NPC)': 'Yalahar',
            'Yaman': 'Ankrahmun*',
            'Yanni': 'Venore',
            'Yasir': 'Varies',
            'Yawno': 'Port Hope*',
            'Yberius': 'Venore',
            'Yoem': 'Edron*',
            'Yulas': 'Venore',
            'Zaidal': 'Port Hope',
            'Zalamon': 'Farmine*',
            'Zarak': 'Yalahar*',
            'Zebron': 'Venore',
            'Zerbrus': 'Rookgaard',
            'Zethra': 'Thais*',
            'Zirella': 'Rookgaard*',
            'Zirkon': 'Yalahar*',
            'Zizzle': 'Farmine*',
            'Zlak': 'Farmine*',
            'Znozel': 'Yalahar',
            'Zoltan': 'Edron',
            'Zora': 'Svargrond*',
            'Ztiss': 'Farmine*',
            'Zumtah': 'Farmine',
            'Zurak': 'Farmine'
        },
        get_item_name_from_img_src = function (src) {
            var tokens, imgnamecomponents, name;
            tokens = src.split(/\//);
            
            /*
             * All image links follow a similar pattern: tokens[7] contains image name.
             * Assumption: there are no slashes in the image name.
             * Assumption: there is only one extension separator (.) in the image name.
             * Example: Ancient_Amulet.gif
             */
            imgnamecomponents = (tokens[7] || "").split(".");
            
            /* First element of the components corresponds to the image file, without the extension. */
            name = decodeURIComponent(imgnamecomponents[0].replace(/_/g, ' ').toLowerCase());
            
            return name;
        },
        calculator_numcs = function(n) {
            n = String(n);
            while ((/\d{4}/).test(n)) {
                n = n.replace(/(\d{3},|\d{3}$)/, ',$1');
            }
            return n;
        },
        calculator_btn_m = function(o) {
            $(o).prev().val(parseInt($(o).prev().val(), 10) - 1);
            $(o).prev().keyup();
        },
        calculator_btn_p = function(o) {
            $(o).prev().prev().val(parseInt($(o).prev().prev().val(), 10) + 1);
            $(o).prev().prev().keyup();
        },
        calculator_array_sort = function(inputArr, numeric, by_key, reverse, sub_key) {
            var tmp_arr = {},
                valArr = [],
                keyArr = [],
                keys = [],
                sorter, i, k, populateArr = [],
                is_numeric = function(v) {
                    v = parseFloat(v);
                    return (typeof v === 'number' && !isNaN(v));
                },
                bubbleSort = function(keyArr, inputArr, sub_key) {
                    var i, j, tempValue, tempKeyVal, ret;
                    for (i = inputArr.length - 2; i >= 0; i--) {
                        for (j = 0; j <= i; j++) {
                            ret = (sub_key === '') ? sorter(inputArr[j + 1], inputArr[j]) : sorter((typeof inputArr[j + 1].resist[sub_key] === 'undefined' ? inputArr[j + 1][sub_key] : inputArr[j + 1].resist[sub_key]), (typeof inputArr[j].resist[sub_key] === 'undefined' ? inputArr[j][sub_key] : inputArr[j].resist[sub_key]));
                            if (ret < 0) {
                                tempValue = inputArr[j];
                                inputArr[j] = inputArr[j + 1];
                                inputArr[j + 1] = tempValue;
                                tempKeyVal = keyArr[j];
                                keyArr[j] = keyArr[j + 1];
                                keyArr[j + 1] = tempKeyVal;
                            }
                        }
                    }
                };
            if (typeof numeric === 'undefined') {
                numeric = false;
            }
            if (typeof by_key === 'undefined') {
                by_key = false;
            }
            if (typeof reverse === 'undefined') {
                reverse = false;
            }
            if (typeof sub_key === 'undefined') {
                sub_key = '';
            }
            if (numeric) {
                sorter = function(a, b) {
                    return (reverse ? b - a : a - b);
                };
            } else {
                sorter = function(a, b) {
                    var x = a,
                        y = b,
                        tmp;
                    if (!is_numeric(a) && !is_numeric(b)) {
                        tmp = (function(a, b) {
                            a = a.search(/[a-z]/);
                            b = b.search(/[a-z]/);
                            if ((a !== 0 && b !== 0) || a === b) {
                                return 0;
                            }
                            if (a === 0) {
                                return -1;
                            }
                            if (b === 0) {
                                return 1;
                            }
                        }(x, y));
                        if (tmp !== 0) {
                            return tmp * (reverse ? -1 : 1);
                        }
                        if (a === b) {
                            return 0;
                        }
                        if (a > b) {
                            return (reverse ? -1 : 1);
                        }
                        return (reverse ? 1 : -1);
                    }
                    a = parseFloat(a) || 0;
                    b = parseFloat(b) || 0;
                    return (reverse ? b - a : a - b);
                };
            }
            if (by_key) {
                for (k in inputArr) {
                    if (inputArr.hasOwnProperty(k)) {
                        keys.push(k);
                    }
                } /*Make a list of key names*/
                keys.sort(sorter);
                for (i = 0; i < keys.length; i++) {
                    k = keys[i];
                    tmp_arr[k] = inputArr[k];
                } /*Rebuild array with sorted key names*/
                for (i in tmp_arr) {
                    if (tmp_arr.hasOwnProperty(i)) {
                        populateArr[i] = tmp_arr[i];
                    }
                }
            } else {
                for (k in inputArr) {
                    if (inputArr.hasOwnProperty(k)) {
                        valArr.push(inputArr[k]);
                        keyArr.push(k);
                    }
                } /*Get key and value*/
                try {
                    bubbleSort(keyArr, valArr, sub_key);
                } catch (e) {
                    return false;
                } /*Sort our new temporary arrays*/
                for (i = 0; i < valArr.length; i++) {
                    populateArr[keyArr[i]] = valArr[i];
                } /*Repopulate the old array*/
            }
            return populateArr;
        },
        loyalty_bonus = function(points) {
          var bonus = Math.floor(points/360) * 0.05 + 1;
          if (bonus > 1.5) {
            bonus = 1.5;
          } else if (bonus === 0) {
            bonus = 1;
          }
          return bonus; /*Format: 1,00, 1,05, 1,15, etc */
        },
        magic_vocs = {
            "knight" : 3,
            "paladin" : 1.4,
            "druid": 1.1,
            "sorcerer" : 1.1,
            "none": 4
        },
        melee_vocs = {
            "knight" : 1.1,
            "paladin" : 1.2,
            "druid": 1.8,
            "sorcerer" : 2,
            "none" : 2
        },
        fist_vocs = {
            "knight" : 1.1,
            "paladin" : 1.2,
            "druid": 1.5,
            "sorcerer" : 1.5,
            "none" : 1.5
        },
        dist_vocs = {
            "knight" : 1.4,
            "paladin" : 1.1,
            "druid": 1.8,
            "sorcerer" : 2,
            "none" : 2
        },
        shield_vocs = {
            "knight" : 1.1,
            "paladin" : 1.1,
            "druid": 1.5,
            "sorcerer" : 1.5,
            "none" : 1.5
        },
        get_constants = function(voc, type) {
            var A, y, minlevel = 10;
            if (type == "magic") {
                A = 1600;
                y = magic_vocs[voc];
                minlevel = 0;
            } else if (type == "axe" || type == "sword" || type == "club") {
                A = 50;
                y = melee_vocs[voc];
            } else if (type == "fist") {
                A = 50;
                y = fist_vocs[voc];
            } else if (type == "shield") {
                A = 100;
                y = shield_vocs[voc];
            } else if (type == "dist") {
                A = 30;
                y = dist_vocs[voc];
            } else if (type == "fish") {
                A = 20;
                y = 1.1;
            }
            var constants = [A, y, minlevel];
            return constants;
        },
        level_to_pts = function(level, voc, type) {
          var constants = get_constants(voc, type),
          A = constants[0],
          y = constants[1],
          minlevel = constants[2],
          points = A*((Math.pow(y, level - minlevel) - 1)/(y - 1));
          return Math.round(points);
        },
        current_pts = function(level, voc, pct_left, type) {
          var curr_pts = level_to_pts(level, voc, type),
          next_pts = level_to_pts(level + 1, voc, type),
          dif = next_pts - curr_pts,
          advanced = ((100-pct_left)/100) * dif;
          return Math.round((curr_pts + advanced));
        },
        pts_to_level = function(pts, voc, type) {
          var constants = get_constants(voc, type),
          A = constants[0],
          y = constants[1],
          minlevel = constants[2],
          skill = Math.floor(Math.log(pts * (y - 1)/A + 1)/Math.log(y)) + minlevel;
          return skill;
        },
        pts_to_next_level = function(currlevel, voc, type) {
          var constants = get_constants(voc, type),
          A = constants[0],
          y = constants[1],
          minlevel = constants[2],
          pts = A * Math.pow(y, currlevel - minlevel);
          return pts;
        };

    $('body:first').append(
        '<style type="text/css">' +
        '#calculators_container{width:100%;}' +
        '#calculators_container>div {text-align:center;border:1px solid #bfcfcf; background-color:#f9fcff;padding:8px 10px;margin: 0 auto;}' +
        '.text_align_left {text-align:left;}' +
        '.text_align_center {text-align:center;}' +
        '.text_align_right {text-align:right;}' +
        '.valign_top {vertical-align:top;}' +
        '.center_tables table {margin-left: auto; margin-right: auto;}' +
        '#calculator_statsrs {display:block;width:296px;position:relative;}' +
        '#calculator_statsrs div {position:absolute;color:#bfbfbf;font:bold 14px Tahoma;}' +
        '#calculator_statsr1 {top:64px;right:30px;}' +
        '#calculator_statsr2 {top:90px;right:30px;}' +
        '#calculator_statsr3 {top:30px;left:165px;}' +
        '#calculator_statsr4 {top:30px;left:23px;}' +
        '#calculator_looti1 {width:600px;}' +
        '#calculator_exp {width:400px;}' +
        '#calculator_stats {width:300px;}' +
        '#calculator_reakskill {width:550px;}' +
        '#calculator_exerciseweapons {width:690px;}' +
        '#calculator_armor td {vertical-align:top;}' +
        '#calculator_armor_damages, #calculator_armor_compare {width:100%;}' +
        '#calculator_armor_damages td, #calculator_armor_compare td {width: 9%;vertical-align:middle;}' +
        '#calculator_armor_damages th, #calculator_armor_compare th {width: 19%;vertical-align:middle;}' +
        '#calculator_armor_compare th {font-weight:normal;}' +
        '#calculator_armor_body_main {background:url(\'https://tibia.fandom.com/index.php?title=Special:FilePath&file=Tibia_Client_Background_Light.gif\');margin:0px 10px;position:relative;display:inline-block;width:112px;height:149px;border:1px black solid;}' +
        '#calculator_armor_body_main div {position:absolute; width:32px; height:32px;background:url(\'https://tibia.fandom.com/index.php?title=Special:FilePath&file=Set_Background.gif\');padding: 1px;}' +
        '#calculator_armor_body_main img {border:none;cursor:pointer;}' +
        '#calculator_armor_tt_items {display:none;z-index:999;position:absolute;width:auto;height:auto;background:#DDDDDD;border:1px black solid;padding:4px;}' +
        '#calculator_reakskill input {margin: 0px 10px 0px 10px;}' +
        '#calculator_exerciseweapons input {margin: 0px 10px 0px 10px;}' +
        '</style>'
    );
    /*Exp*/
    (function() {
        $('#calculator_exp')
            .append('Level: ')
            .append('<input type="text" size="8" maxlength="4" id="calculator_expi1" value="8" />&nbsp;')
            .append($('<input type="button" value="-" />').click(function() {
                calculator_btn_m(this);
            })).append('&nbsp;')
            .append($('<input type="button" value="+" />').click(function() {
                calculator_btn_p(this);
            }))
            .append('<br /><br /><span id="calculator_expr1"></span>')
            .append('<input type="checkbox" id="death_rh" name="death_rh">' + 
                    '<label for="death_rh" style="font-size:0.7em">Retro Hardcore PvP</label><br/><br/>')
            .append('<span id="calculator_expr2"></span>');
        $('#calculator_expi1').keyup(function() {
            if ($(this).val() === '') {
                $(this).val(1).select();
            }
            var exp, nextexp, totalxploss, fivebloss, fiveblossp, sevenbloss, sevenblossp, lvl = Math.abs(parseInt($(this).val(), 10) || 1), prot = 0.08;
            $(this).val(lvl);
            exp = (50 * Math.pow(lvl - 1, 3) - 150 * Math.pow(lvl - 1, 2) + 400 * (lvl - 1)) / 3;
            nextexp = String(((50 * Math.pow(lvl, 3) - 150 * Math.pow(lvl, 2) + 400 * (lvl)) / 3) - exp);
            nextexp = nextexp.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if ($('#death_rh').prop('checked')) {
                prot = 0.0631;
            }
            totalxploss = Math.round((lvl + 50) * (lvl * lvl - 5 * lvl + 8) / 2);
            fivebloss = totalxploss * (1 - 0.3 - 5 * prot);
            fiveblossp = Math.round(100 * 100 * fivebloss/exp)/100;
            sevenbloss = totalxploss * (1 - 0.3 - 7 * prot);
            sevenblossp = Math.round(100 * 100 * sevenbloss/exp)/100;
            exp = String(exp).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            fivebloss = String(Math.round(fivebloss)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            sevenbloss = String(Math.round(sevenbloss)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            
            var min_share_lvl = Math.floor((lvl / 3) * 2);
            var max_share_lvl = Math.ceil((lvl / 2) * 3);
            max_share_lvl += lvl % 2 === 0 ? 1 : 0;
            // The share range is always calculated from the higher level rounding down.
            // For this reason, the max share level for even levels is underestimated. 
            // For example: a level 151 can share with a level 100 even though 100 * (3/2) = 150.
            $('#calculator_expr1').html(
                'Total level XP: <b>' + exp + '</b><br/>' +
                'Next level XP: <b>' + nextexp + '</b><br/><br/>' +
                'Death XP Loss (5 blessings): <b>' + fivebloss + ' (' + fiveblossp + '%)</b><br/>' +
                'Death XP Loss (7 blessings): <b>' + sevenbloss + ' (' + sevenblossp + '%)</b><br/>' +
                '<span style="font-size:0.7em">promoted characters with 100% to next level</span><br/>'
            );
            $('#calculator_expr2').html(
                'Minimum level to share experience: <b>' + min_share_lvl + '</b><br/>' +
                'Maximum level to share experience: <b>' + max_share_lvl + '</b>'
            );
        });
        $('#death_rh').change(function () {
            $('#calculator_expi1').keyup();
            
        });
        $('#calculator_expi1').keyup();
    }());

    /*Stats*/
    (function() {
        var x, tmp = '',
            calculator_stats_voc = {
                'Druid': [5, 30, 10],
                'Knight': [15, 5, 25],
                'Paladin': [10, 15, 20],
                'Sorcerer': [5, 30, 10],
                'Rookstayer': [5, 5, 10]
            }, //[hp, mana, cap]

        calculator_stats_update = function() {
            var x, lvl;
            for (x = 2; x <= 4; x++) {
                if ($('#calculator_statsi' + x).val() === '') {
                    $('#calculator_statsi' + x).val(8).select();
                }
                $('#calculator_statsi' + x).val(Math.abs(parseInt($('#calculator_statsi' + x).val(), 10) || 8));
            }
            lvl = parseInt($('#calculator_statsi2').val(), 10);
            x = calculator_stats_voc[$('#calculator_statsi1').val()][0];
            $('#calculator_statsr1').text(145 + (5 * Math.min(8, lvl)) + (Math.max(0, lvl - 8) * x));
            x = calculator_stats_voc[$('#calculator_statsi1').val()][1];
            $('#calculator_statsr2').text(50 + (5 * Math.min(8, lvl)) + (Math.max(0, lvl - 8) * x));
            x = calculator_stats_voc[$('#calculator_statsi1').val()][2];
            $('#calculator_statsr3').text(390 + (10 * Math.min(8, lvl)) + (Math.max(0, lvl - 8) * x));
            $('#calculator_statsr4').text(109 +(lvl));
        };

        for (x in calculator_stats_voc) {
            if (calculator_stats_voc.hasOwnProperty(x)) {
                tmp += '<option value="' + x + '">' + x + '</option>';
            }
        }
        $('#calculator_stats').html(
            '<table><tr>' +
            '<td class="text_align_right">Vocation:</td>' +
            '<td class="text_align_left"><select id="calculator_statsi1" size="1">' + tmp + '</select></td>' +
            '</tr><tr>' +
            '<td class="text_align_right">Target level:</td>' +
            '<td class="text_align_left"><input type="text" size="8" maxlength="4" id="calculator_statsi2" value="8" />&nbsp;<input type="button" value="-" />&nbsp;<input type="button" value="+" /></td>' +
            '</tr><tr><td colspan="2">' +
            '<div id="calculator_statsrs"><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Calculator_Stats.png" alt="Stats" />' +
            '<div id="calculator_statsr1"></div>' +
            '<div id="calculator_statsr2"></div>' +
            '<div id="calculator_statsr3"></div>' +
            '<div id="calculator_statsr4"></div>' +
            '</div>' +
            '</td></tr>' +
            '</table>'
        );

        $('#calculator_statsi2').keyup(calculator_stats_update)
            .next().click(function() {
                calculator_btn_m(this);
                calculator_stats_update();
            })
            .next().click(function() {
                calculator_btn_p(this);
                calculator_stats_update();
            });
        $('#calculator_statsi1').change(calculator_stats_update);
        calculator_stats_update();
    }());

    /*Real Skill*/
    (function() {
        var skilltypes = ["magic", "fist", "club", "sword", "axe", "dist", "shield", "fish"],
        skillnames = {
            "magic" : "Magic Level",
            "fist" : "Fist Fighting",
            "club" : "Club Fighting",
            "sword" : "Sword Fighting",
            "axe" : "Axe Fighting",
            "dist" : "Distance Fighting",
            "shield" : "Shielding",
            "fish" : "Fishing"
        },
        minskills = {
        "magic" : 0,
        "fist" : 10, "club" : 10, "sword" : 10, "axe" : 10, "dist" : 10, "shield" : 10, "fish" : 10
        },
        next_pts = function(level, voc, type) {
          var constants = get_constants(voc, type),
          A = constants[0],
          y = constants[1],
          minlevel = constants[2],
          points = A*Math.pow(y, level - minlevel);
          return Math.round(points);
        },
        skill_wo_loyalty = function(points, loyalty) {
          var bonus = loyalty_bonus(loyalty),
          pts = points / bonus;
          return Math.floor(pts);
        },
        calculator_realskill_update = function(changedskills = skilltypes) {
            var voc = $('input[name="calculator_rs_vocation"]:checked').val(),
            loyalty = parseInt($('#calculator_rs_loyalty_pts').val(), 10);
          
            for (let type of changedskills) {
                var level = parseInt($('#calculator_rs_' + type + '_level').val(), 10);
                if (level > 150) level = 150;
                
                var pct_left = parseInt($('#calculator_rs_' + type + '_left').val(), 10);
                if (pct_left > 100) {
                  pct_left = 100;
                } else if (pct_left < 1) {
                  pct_left = 1;
                }
                
                var curr_pts = current_pts(level, voc, pct_left, type),
                real_pts = skill_wo_loyalty(curr_pts, loyalty),
                real_level = pts_to_level(real_pts, voc, type),
                real_curr_base = level_to_pts(real_level, voc, type),
                real_next_total = level_to_pts(real_level + 1, voc, type),
                real_next_pts = next_pts(real_level, voc, type),
                skill_left_pts = real_next_total - real_pts,
                real_pct = Math.ceil(100 * (skill_left_pts/real_next_pts));   
                /*var bonus = loyalty_bonus(loyalty);
                $('#calculator_rs_loyalty_bonus').html(Math.round((bonus - 1) * 100) + '%:');*/
                $('#calculator_rs_' + type + '_bar1').width(100 - pct_left + "%");
                $('#calculator_rs_' + type + '_bar2').width(pct_left + "%");
                $('#calculator_rs_' + type + '_realbar1').width(100 - real_pct + "%");
                $('#calculator_rs_' + type + '_realbar2').width(real_pct + "%");
                $('#calculator_rs_' + type + '_level_real').html(real_level);
                $('#calculator_rs_' + type + '_left_real').html(real_pct);
            }
        };
        
        $('#calculator_reakskill').html(
            '<input type="radio" value = "druid" name ="calculator_rs_vocation" checked>Druid' +
            '<input type="radio" value = "sorcerer" name ="calculator_rs_vocation">Sorcerer' +
            '<input type="radio" value = "knight" name ="calculator_rs_vocation">Knight' +
            '<input type="radio" value = "paladin" name ="calculator_rs_vocation">Paladin' +
            '<input type="radio" value = "none" name ="calculator_rs_vocation">None' +
            '<br/><br/>' +
            'Loyalty points:' +
            '<input id="calculator_rs_loyalty_pts" type="number" value="0" min="0" max="10000" style="width:45px;">' +
            'Loyalty bonus:' +
            '<input id="calculator_rs_loyalty_bonus" type="number" value="0" min="0" max="50" step = "5">%<br/><br/>' +
            '<div">' +
            '<table id ="calculator_rs_inputs" style="margin: 0 auto;">' +
            '<tr>' +
            '<td>Skill</td><td>Current</td><td>% left</td><td>real skill</td><td>% left</td>' +
            '</tr>' + 
            '</table>' +
            '</div>'
        );
        for (let type of skilltypes) {
            $('#calculator_rs_inputs tr:last').after(
                '<tr><td>' + skillnames[type] + '</td>' + 
                '<td><input id="calculator_rs_' + type + '_level" type="number" value="' + minskills[type] + '" min="0" max="150" style="width:40px;"></td>' +
                '<td><input id="calculator_rs_' + type + '_left" type="number" value="100" min="1" max="100" style="width:40px;"><br/>' +
                '<div style="width: 136px; border:1px #000000 solid;">' +
                    '<span id = "calculator_rs_' + type + '_bar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
                    '<span id = "calculator_rs_' + type + '_bar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
                '</div>' +
                '<td><span id="calculator_rs_' + type + '_level_real"></span></td>' +
                '<td><span id="calculator_rs_' + type + '_left_real">100</span><br/>' +
                '<div style="width: 136px; border:1px #000000 solid;">' +
                    '<span id = "calculator_rs_' + type + '_realbar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
                    '<span id = "calculator_rs_' + type + '_realbar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
                '</div>' +
                '</td>' +
                '</tr>');
            $('#calculator_rs_' + type + '_level, #calculator_rs_' + type + '_left').on('keyup change', function() {calculator_realskill_update([type])});
        }
        $('#calculator_rs_loyalty_pts').on('keyup change', function () {
            $('#calculator_rs_loyalty_bonus').val(Math.round(100*(loyalty_bonus(parseInt($('#calculator_rs_loyalty_pts').val(), 10)) - 1)));
            calculator_realskill_update();
        });
        $('#calculator_rs_loyalty_bonus').on('keyup change', function () {
            $('#calculator_rs_loyalty_pts').val(360 * (parseInt($('#calculator_rs_loyalty_bonus').val(), 10)/ 5));
            calculator_realskill_update();
        });
        $('input[name="calculator_rs_vocation"]').change(function () {calculator_realskill_update(skilltypes)});
        calculator_realskill_update();
    }());
    
/*    Exercise Weapons  */
    
    (function() {
        var calculator_exerciseweapons_update = function() {
            var loyalty = 1 + parseInt($('#calculator_ew_loyalty_bonus').val(), 10) / 100;
            loyalty = isNaN(loyalty) ? 1 : loyalty;
            var level = parseInt($('#calculator_ew_skill_level').val(), 10);
            level = isNaN(level) ? 10 : (level > 150 ? 150 : level);
            var pct_left = parseFloat($('#calculator_ew_left').val(), 10);
            pct_left = (isNaN(pct_left) || pct_left > 100) ? 100 : pct_left;
            
            var vocation = 'druid';
            if ($('select[name=calculator_ew_voc_skill]').val() == 'magicknight') {
                vocation = 'knight';
            } else if (($('select[name=calculator_ew_voc_skill]').val() == 'magicpaladin')) {
                vocation = 'paladin';
            }
            var curr_pts = current_pts(level, vocation, pct_left, 'magic');
            var mode = $('input[name=ew_mode]:checked').val();
            var event = $('input[name=ew_event]:checked').val() ? 2 : 1;
            var dummy = $('input[name=ew_dummy]:checked').val() ? 1.1 : 1;
            var weapon_type = 1;
            if  ($('select[name=calculator_ew_wep_type]').val() == 'training') {
            	weapon_type = 0.1;
            } else if  ($('select[name=calculator_ew_wep_type]').val() == 'durable') {
            	weapon_type = 3.6;
            } else if  ($('select[name=calculator_ew_wep_type]').val() == 'lasting') {
            	weapon_type = 28.8;
            }
            var charges = 500 * weapon_type;
            var add_pts = 0;
            var weappts = dummy * event * loyalty * 600 * charges; // 600 UMPs of 500 mana ea
            var weappct = Math.round(100 * 100 * weappts / pts_to_next_level(level, vocation, 'magic')) / 100;
            var nweapons, trained_pts, trained_level, pts_to_next, next_pts_total, left_pts, final_pct_left;
            $('#calculator_ew_warning').empty(); //Clear warnings before any calculation
            if (mode == 'weapons') {
                nweapons = parseInt($('#calculator_ew_nweapons').val(), 10);
                add_pts = weappts * nweapons; 
                $('#calculator_ew_skill_trained').prop('disabled', true );
                $('#calculator_ew_weapcost_gold').prop('disabled', false );
                $('#calculator_ew_weapcost_coins').prop('disabled', false );
                $('#calculator_ew_skill_left_trained').html(100);
                $('#calculator_ew_nweapons').prop('disabled', false);
                trained_pts = curr_pts + add_pts;
                trained_level = pts_to_level(trained_pts, vocation, 'magic');
                
                $('#calculator_ew_skill_trained').val(trained_level);
            } else {
                $('#calculator_ew_nweapons').prop('disabled', true );
                $('#calculator_ew_skill_trained').prop('disabled', false);
                $('#calculator_ew_weapcost_gold').prop('disabled', true );
                $('#calculator_ew_weapcost_coins').prop('disabled', true );
                trained_level = parseInt($('#calculator_ew_skill_trained').val(), 10);
                trained_pts = level_to_pts(trained_level, vocation, 'magic');
                nweapons = Math.ceil((trained_pts - curr_pts)/weappts);
                var trained_level_real = pts_to_level(curr_pts + weappts * nweapons, vocation, 'magic');
                if (trained_level_real > trained_level) {
                     $('#calculator_ew_warning').html('The number of weapons will be sufficient to achieve a higher skill than the submitted value. The final skill will be ' + trained_level_real + '.');
                }
                $('#calculator_ew_nweapons').val(nweapons);
            }
            if (trained_level < level || isNaN (trained_level)) {
                $('#calculator_ew_warning').html('The trained skill cannot be lower than the current skill.');
            } else {
                pts_to_next = pts_to_next_level(trained_level, vocation, 'magic');
                next_pts_total = level_to_pts(trained_level + 1, vocation, 'magic');
                left_pts = next_pts_total - trained_pts;
                final_pct_left = Math.ceil(10000 * (left_pts/pts_to_next))/100; 
                final_pct_left = final_pct_left > 100 ? 100 : final_pct_left; //Roundings and reversed formula can lead to slightly different numbers that end up with 100.01% pct left. 
                $('#calculator_ew_skill_bar1').width(100 - pct_left + "%");
                $('#calculator_ew_skill_bar2').width(pct_left + "%");
                
                $('#calculator_ew_skill_trainedbar1').width(100 - final_pct_left + "%");
                $('#calculator_ew_skill_trainedbar2').width(final_pct_left + "%");
                
                $('#calculator_ew_skill_left_trained').html(final_pct_left);
                
                $('#calculator_ew_weapcost_gold').val(nweapons * weapon_type * 262500/1000);
                $('#calculator_ew_weapcost_coins').val(nweapons * weapon_type * 25);
                
                /* update summary of calculation */
                $('#calculator_ew_skill_desc').html($('#calculator_ew_skill_level').val());
                $('#calculator_ew_loyalty_desc').html($('#calculator_ew_loyalty_bonus').val());
                $('#calculator_ew_event_desc').html($('input[name=ew_event]:checked').val() ? 'with' : 'without');
                $('#calculator_ew_dummy_desc').html($('input[name=ew_dummy]:checked').val() ? 'house' : 'regular');
                $('#calculator_ew_weappct_desc').html(weappct);
                
                var train_time_total = nweapons * charges * 2;
                var train_time_h = Math.floor(train_time_total / (60 * 60));
                var train_time_min = Math.floor(train_time_total / 60 - train_time_h * 60);
                var train_time_s = train_time_total - train_time_min * 60 - train_time_h * 60 * 60;
                
                $('#calculator_ew_train_time').html(train_time_h + ' hours, ' + train_time_min + ' minutes and ' + train_time_s + ' seconds');
            }
        };
        $('#calculator_exerciseweapons').html(
            '<div style="position: absolute;width: 680px;"><div style="display: grid;grid-row-gap:50px;">' +
                '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Ferumbras_Exercise_Dummy.gif" style="float:left">' +
                '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Exercise_Dummy.gif" style="float:right"></div>' +
                '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Lasting_Exercise_Bow.gif" style="float:left;">' +
                '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Lasting_Exercise_Sword.gif" style="float:right;"></div>' +
                '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Lasting_Exercise_Rod.gif" style="float:left;">' +
                '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Lasting_Exercise_Axe.gif" style="float:right;"></div>' +
                '<div><img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Lasting_Exercise_Wand.gif" style="float:left;">' +
                '<img src="https://tibia.fandom.com/index.php?title=Special:FilePath&file=Lasting_Exercise_Club.gif" style="float:right;"></div>' +
            '</div></div>' +
            '<div style="position:relative;">' +
                '<label>Loyalty points:' +
                '<input id="calculator_ew_loyalty_pts" type="number" value="0" min="0" max="10000" style="width:45px;"></label>' +
                '<label>Loyalty bonus:' +
                '<input id="calculator_ew_loyalty_bonus" type="number" value="0" min="0" max="50" step = "5" style="width:45px;">%</label><br/><br/>' +
                '<label>Skill/Vocation: <select name="calculator_ew_voc_skill"><option value="magemagic" selected>Magic/Mage</option><option value="magemagic">Melee/Knight</option><option value="magemagic">Distance/Paladin</option><option value="magicpaladin">Magic/Paladin</option><option value="magicknight">Magic/Knight</option></select><label><br/><br/>' +
                '<label>Weapon Type: <select name="calculator_ew_wep_type"><option value="training">Training (50x, 1min40s)</option><option value="regular" selected>Regular (500x, 16min40s)</option><option value="durable">Durable (1,800x, 1h)</option><option value="lasting">Lasting (14,400x, 8h)</option></select></label><br/><br/>' +
                '<label><input type="checkbox" name="ew_event" value="double">Double Skills Event</label>' +
                '<label><input type="checkbox" name="ew_dummy" value="expert">House Dummy</label><br/><br/>' +
                /*'<input type="radio" name="ew_charges" value="exercise" checked>Exercise Weapon (500 charges)' +
                '<input type="radio" name="ew_charges" value="training">Training Weapon (100 charges)<br/><br/>' +*/
                '<label><input type="radio" name="ew_mode" value="weapons">Number of Weapons</label>' +
                '<label><input type="radio" name="ew_mode" value="skill" checked>Weapons required to achieve a skill</label>' +
                /*'<label><input type="radio" name="ew_mode" value="gold">Cost in Gold</label>' +
                '<label><input type="radio" name="ew_mode" value="coins">Cost in Tibia Coins</label>' +*/
                '<table style="margin: 0 auto;">' +
                '<tr>' +
                '<td>Current Skill (Base + Loyalty)</td><td>% left</td>'+
                '</tr><tr>' + 
                    '<td><input id="calculator_ew_skill_level" type="number" value="0" min="0" max="150" style="width:40px;"></td>' +
                    '<td><input id="calculator_ew_left" type="number" value="100" min="0.01" max="100" style="width:50px;"><br/>' +
                    '<div style="width: 136px; border:1px #000000 solid;">' +
                        '<span id = "calculator_ew_skill_bar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
                        '<span id = "calculator_ew_skill_bar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
                    '</div></td>' +
                '</table><br/>' +
                'Simulations:' +
                
                '<table style="margin: 0 auto;">' +
                '<tr>' +
                '<td><label for="calculator_ew_skill_trained">Trained Skill</label></td><td><label for="calculator_ew_skill_left_trained">% left</label></td><td><label for="calculator_ew_nweapons"># of Weapons</label></td><td><label for="calculator_ew_weapcost_gold">Cost (Gold)</label></td><td><label for="calculator_ew_weapcost_coins">Cost (TC)</label></td>' +
                '</tr><tr>' + 
                    '<td><input id="calculator_ew_skill_trained" type="number" value="0" min="0" max="150" style="width:40px;"></td>' +
                    '<td><span id="calculator_ew_skill_left_trained">100</span><br/>' +
                    '<div style="width: 136px; border:1px #000000 solid;">' +
                        '<span id = "calculator_ew_skill_trainedbar1" style="text-align: right; height: 2px; width: 100%;background-color: #11B711;display: table;"></span>' +
                        '<span id = "calculator_ew_skill_trainedbar2" style="text-align: left; width: 50%; background-color: #444444"></span>' +
                    '</div></td>' +
                    '</td>' +
                    '<td><input id="calculator_ew_nweapons" type="number" value="0" min="0" max="1000" style="width:60px;" disabled></td>' +
                    '<td><input id="calculator_ew_weapcost_gold" type="number" value="0" min="0" step = "262.5" max="2626500" style="width:70px;" disabled>k</td>' +
                    '<td><input id="calculator_ew_weapcost_coins"  type="number" value="0" min="0" step = "25" max="25000" style="width:70px;" disabled></td>' +
                    '</tr>' +
                '</table><span id="calculator_ew_warning", style="color:red;"></span>' +
                '<br/><br/>' +
                'At ml/skill <span id="calculator_ew_skill_desc">0</span> with ' + 
                '<span id="calculator_ew_loyalty_desc">0</span>% loyalty bonus, ' +
                '<span id="calculator_ew_event_desc">with</span> double skill event and '+
                '<span id="calculator_ew_dummy_desc">regular</span> dummy,' +
                '<br/>each weapon will advance ' +
                '<span id="calculator_ew_weappct_desc">1</span>% of the current skill.<br/><br/>' +
                'You will need <span id="calculator_ew_train_time">0 hours, 0 minutes and 0 seconds</span> to use the required number of exercise weapons.' +
            '</div>'
        );
        $('#calculator_ew_loyalty_pts').on('keyup change', function () {
            $('#calculator_ew_loyalty_bonus').val(Math.round(100*(loyalty_bonus(parseInt($('#calculator_ew_loyalty_pts').val(), 10)) - 1)));
                calculator_exerciseweapons_update();
        });
        $('#calculator_ew_loyalty_bonus').on('keyup change', function () {
                $('#calculator_ew_loyalty_pts').val(360 * (parseInt($('#calculator_ew_loyalty_bonus').val(), 10)/ 5));
                calculator_exerciseweapons_update();
        });
        $('input[name=ew_mode], input[name=ew_dummy], input[name=ew_event], select[name=calculator_ew_voc_skill], select[name=calculator_ew_wep_type], #calculator_ew_skill_level, #calculator_ew_left, #calculator_ew_skill_trained, #calculator_ew_nweapons').on('keyup change', function() {
            calculator_exerciseweapons_update();
        });
        $('#calculator_ew_weapcost_gold').on('keyup change', function () {
                $('#calculator_ew_nweapons').val(Math.floor($('#calculator_ew_weapcost_gold').val() / 262.5));
                calculator_exerciseweapons_update();
        });
        $('#calculator_ew_weapcost_coins').on('keyup change', function () {
                $('#calculator_ew_nweapons').val(Math.floor($('#calculator_ew_weapcost_coins').val() / 25));
                calculator_exerciseweapons_update();
        });
    }());
   
    /*Loot*/
    (function() {
        $('#calculator_loot').width(620).append(
            '<div id="calculator_loot_tg1">' +
            '<textarea cols="60" rows="10" id="calculator_looti1"></textarea>' +
            '<br />' +
            '<input type="button" id="calculator_lootb1" value="Process" />' +
            '&nbsp;' +
            '<input type="button" id="calculator_lootb2" value="Clear" />' +
            '</div>' +
            '<div id="calculator_loot_tg2" style="display:none;">' +
            '<input type="button" id="calculator_lootb3" value="Back" />' +
            '<table style="width:100%;"><tr><td class="valign_top">' +
            '<div id="calculator_lootr3" class="center_tables"></div>' +
            '</td>' +
            '<td class="valign_top center_tables" id="calculator_lootrc">' +
            '<b>NPCs to visit</b>' +
            '<table class="wikitable" id="calculator_lootr2"><thead><tr><th>City</th><th>NPC</th></tr></thead><tbody id="calculator_lootr2a"><tr><th colspan="2">-</th></tr></tbody></table>' +
            '<table class="wikitable"><thead><tr><th>Skipped Items</th></tr></thead><tbody id="calculator_lootr5"><tr><td>None</td></tr></tbody></table>' +
            '</td></tr></table>' +
            '</div>'
        );
        var calculator_loot_process2 = function() {
                var ucwords = function(str) {
                        /*jslint regexp: true */
                        str = String(str).replace(/^(.)|\s(.)|-(.)/g, function($1) {
                            return $1.toUpperCase();
                        });
                        /*jslint regexp: false */
                        return str.replace(/( To The | In A | In The | Of The | Of A | Of A | On A | Of | The | From The | From | And )/, function($1) {
                            return $1.toLowerCase();
                        });
                    },
                    get_wiki_data = function() {
                        var ret = {
                                'npcnotes': {}
                            },
                            x, p, i = 0,
                            tdata = ['', '', '', ''], //npc, item, weight, value
                            h = '|npc=Magic Shopkeeper NPCs|Empty Potion Flask|0|5' +
                            '|npc=Banker NPCs|Gold Coin|0.1|1|Platinum Coin|0.1|100|Crystal Coin|0.1|10000' +
                            ($('#calculator_loot_dpl').text());
                        while (h.search(/\s\s/) !== -1) {
                            h = h.replace(/\s\s/g, ' ');
                        }
                        h = h.replace(/npc\s*=\s*/g, 'npc=');
                        p = h.split('|');
                        for (x = 0; x < p.length; x++) {
                            p[x] = $.trim(p[x]);
                        }
                        while (p[0] === '') {
                            p = p.slice(1);
                        }
                        //item_name={weight,sellto,npcvalue}
                        for (x = 0; x < p.length; x++) {
                            if (p[x].substr(0, 4) === 'npc=') {
                                /*jslint regexp: true */
                                tdata[0] = p[x].substr(4).replace(/</g, '');
                                /*jslint regexp: false */
                                if (tdata[0].indexOf(',') > -1) {
                                    ret.npcnotes[$.trim(tdata[0].split(',')[0])] = $.trim(tdata[0].split(',')[1]);
                                    tdata[0] = $.trim(tdata[0].split(',')[0]);
                                }
                                i = 0;
                            } else {
                                tdata[i] = p[x];
                                if (i === 3) {
                                    tdata[3] = (tdata[3].substr(0, 1) === '-' ? 0 : parseInt(tdata[3], 10));
                                    /*jslint regexp: true */
                                    tdata[1] = tdata[1].replace(/</g, '');
                                    /*jslint regexp: false */
                                    if (typeof ret[tdata[1]] === 'undefined' || ret[tdata[1]].npcvalue < tdata[3]) {
                                        ret[tdata[1]] = {
                                            'weight': parseFloat(tdata[2]),
                                            'sellto': tdata[0],
                                            'npcvalue': tdata[3]
                                        };
                                    }
                                    i = 0;
                                }
                            }
                            i++;
                        }
                        return ret;
                    },
                    loot_to_singular = function(t) {
                        var calculator_loot_p_words = {
                                'Cookies': 'Cookie',
                                'Mushroom Pies': 'Mushroom Pie',
                                '*Pieces of *': 'Piece of ',
                                '*Bundles of *': 'Bundle of ',
                                '*Strands of *': 'Strand of ',
                                '*Bunches of *': 'Bunch of ',
                                '* Toes': ' Toe',
                                '*Flasks of *': 'Flask of ',
                                '* Teeth': ' Tooth',
                                'Globs of *': 'Glob of ',
                                'Essences of *': 'Essence of ',
                                'Books of *': 'Book of ',
                                'Piles of *': 'Pile of ',
                                'Lumps of *': 'Lump of ',
                                '*Ears of *': 'Ear of ',
                                '*s of Corruption': ' of Corruption',
                                'Sabreteeth': 'Sabretooth',
                                'Pairs of *': 'Pair of ',
                                'Pools of Chitinous Glue': 'Pool of Chitinous Glue',
                                'Scrolls of *': 'Scroll of ',
                                '* Feet': ' Foot',
                                '*s of a Deepling': ' of a Deepling',
                                'Eyes of *': 'Eye of ',
                                'Veins of *': 'Vein of ',
                                'Sights of Surrender\'s Eye': 'Sight of Surrender\'s Eye'
                            },
                            /*Exceptions*/
                            calculator_loot_p_ends = {
                                'she': 'sh',
                                'ie': 'y',
                                've': 'fe',
                                'oe': 'o',
                                'ze': 'z',
                                'che': 'ch',
                                'sse': 'ss'
                            },
                            /*Exceptions of endings (after removing the last 's')*/
                            x, lastletter;
                        for (x in calculator_loot_p_words) {
                            if (calculator_loot_p_words.hasOwnProperty(x)) {
                                if ((new RegExp('^' + x.replace(/\*/g, '.*?') + '$')).test(t)) {
                                    return t.replace(x.replace(/\*/g, ''), calculator_loot_p_words[x]);
                                }
                            }
                        }
                        lastletter = t.slice(t.length - 1);
                        if (lastletter === 's') {
                            t = t.slice(0, t.length - 1); /*remove the s*/
                            lastletter = t.slice(t.length - 3); /*check last 3 letters*/
                            if (typeof calculator_loot_p_ends[lastletter] !== 'undefined') {
                                t = t.slice(0, t.length - 3) + calculator_loot_p_ends[lastletter];
                            }
                            lastletter = t.slice(t.length - 2); /*check last 2 letters*/
                            if (typeof calculator_loot_p_ends[lastletter] !== 'undefined') {
                                t = t.slice(0, t.length - 2) + calculator_loot_p_ends[lastletter];
                            }
                        }
                        return t;
                    },
                    calculator_loot_pages_ex = {
                        'Black Skull': 'Black Skull (Item)'
                    },
                    x, line, name, amount, tmp, data, data_items = {},
                    d = get_wiki_data(),
                    skip, skiplist = [],
                    totalsee = 0,
                    calculator_loot_sum = function() {
                        var tmp = 0,
                            npcs = {},
                            npcso = [],
                            x, npc, city, skipped = [],
                            npc_note;
                        $('.calculator_loot_includecb').each(function() {
                            if ($(this).attr('checked')) {
                                tmp += (Number($(this).parent().nextAll(':eq(3)').html().replace(/,/g, '')) || 0);
                                npcs[data_items[$(this).parent().nextAll(':eq(1)').text()][2]] = 0;
                            }
                        });
                        npcs = calculator_array_sort(npcs, false, true);
                        for (npc in npcs) {
                            if (npcs.hasOwnProperty(npc)) {
                                /*jslint regexp: true */
                                city = npcs_locations.hasOwnProperty(npc) ? npcs_locations[npc].replace(/</g, '') : '?';
                                /*jslint regexp: false */
                                npc_note = d.npcnotes.hasOwnProperty(npc);
                                npcso.push(
                                    '<tr>' +
                                    (npc_note ? '<td style="border-bottom:none;">' : '<td>') + city + '</td>' +
                                    (npc_note ? '<td style="border-bottom:none;">' : '<td>') + '<a href="/wiki/' + encodeURIComponent(npc) + '">' + npc + '</a></td>' +
                                    '</tr>' +
                                    (npc_note ? '<tr><td colspan="2" style="border-top:none;">' + d.npcnotes[npc] + '</td></tr>' : '')
                                );
                            }
                        }
                        for (x in skiplist) {
                            if (skiplist.hasOwnProperty(x)) {
                                skipped.push('<tr><td><a href="/wiki/' + encodeURIComponent(skiplist[x].replace(/ /g, '_')) + '">' + encodeURIComponent(skiplist[x]).replace(/%20/g, ' ') + '</a></td></tr>');
                            }
                        }
                        npcso.sort();
                        skipped.sort();
                        $('#calculator_lootr2').html('<tbody><tr><th>City</th><th>NPC</th></tr></tbody><tbody id="calculator_lootr2a"><tr><th colspan="2">-</th></tr></tbody>');
                        $('#calculator_lootr2a').html(npcso.join('') || '<tr><td>None</td></tr>');
                        $('#calculator_lootr4').html(calculator_numcs(tmp) + ' gp');
                        $('#calculator_lootr1').html(totalsee);
                        $('#calculator_lootr5').html(skipped.join('') || '<tr><td>None</td></tr>');
                    };
                data = $.trim($('#calculator_looti1').val()).split('\n');
                for (x in data) {
                    if (data.hasOwnProperty(x)) {
                        line = data[x].indexOf('You see ');
                        /*jslint regexp: true */
                        if (line !== -1 &&
                            data[x].match(/You see (?:.*? \(Level \d{1,3}\)\. .{1,2}e is a|a closed door.|an open door.)/) === null
                        ) {
                            /*jslint regexp: false */
                            skip = false;
                            line = data[x].substr(line + 8);
                            amount = parseInt(line.match(/^a[n]? /i) ? 1 : (line.match(/^\d+ /i) ? line.match(/^\d+ /i) : 0), 10);
                            /*jslint regexp: true */
                            line = $.trim(line.replace(/(?:\(|It is empty|that is brand-new|that will expire in).*/, ''));
                            /*jslint regexp: false */
                            if (line.substr(line.length - 1) === '.') {
                                line = line.substr(0, line.length - 1);
                            }
                            line = ucwords($.trim(line)); //item name
                            name = line; //For aliasing (black skull)
                            if (amount === 0) {
                                name = calculator_loot_pages_ex.hasOwnProperty(line) ? calculator_loot_pages_ex[line] : line;
                                try {
                                    tmp = data[parseInt(x, 10) + 1].match(/weigh[s]? (\d{1,4}\.\d{1,2}) oz/);
                                    if (tmp === null) {
                                        tmp = data[parseInt(x, 10) + 2].match(/weigh[s]? (\d{1,4}\.\d{1,2}) oz/);
                                    }
                                } catch (e) {
                                    tmp = null;
                                }
                                tmp = (tmp === null || tmp[1] === 'undefined' ? 0 : parseFloat(tmp[1]));
                                if (typeof d[name] === 'undefined' || d[name].npcvalue === 0) {
                                    skiplist.push(line);
                                    skip = true;
                                } //not in list or 0gp
                                else {
                                    amount = Math.round(tmp / d[name].weight) || 0;
                                    if (amount === 0) {
                                        skiplist.push(line);
                                        alert(line + ' will be omitted, couldn\'t find the weight.');
                                        skip = true;
                                    }
                                }
                            } else {
                                line = line.substr(line.indexOf(' ') + 1);
                                if (amount > 1) {
                                    line = loot_to_singular(line);
                                }
                                name = calculator_loot_pages_ex.hasOwnProperty(line) ? calculator_loot_pages_ex[line] : line;
                            }
                            if (!skip) {
                                if (typeof d[name] === 'undefined' || d[name].npcvalue === 0) {
                                    skiplist.push(line);
                                    skip = true;
                                } //not in list or 0 gp
                            }
                            if (!skip) {
                                //Item is included
                                totalsee++;
                                if (typeof data_items[line] === 'undefined') {
                                    tmp = (!d[name].sellto.match(/You can return the/gi) && !d[name].sellto.match(/player/gi)) ? d[name].sellto : '';
                                    data_items[name] = [0, d[name].npcvalue, tmp];
                                } //[name][amount, price, npc/'']
                                data_items[name][0] += amount;
                            }
                        }
                    }
                }

                data_items = calculator_array_sort(data_items, false, true);
                $('#calculator_lootr3').empty().append(
                    $('<div />').css({
                        'width': '45%',
                        'display': 'inline-block'
                    }).append(
                        '<table class="wikitable"><tr><th>Total NPC value:</th></tr><tr><td id="calculator_lootr4">0 gp</td></tr></table>'
                    ),
                    $('<div />').css({
                        'width': '45%',
                        'display': 'inline-block'
                    }).append(
                        '<table class="wikitable"><tr><th>Total "looks"</th></tr><tr><td id="calculator_lootr1">-</td></tr></table>'
                    ),
                    '<table id="calculator_loot_table" class="wikitable sortable"><thead><tr><th class="unsortable">Sum<input type="checkbox" checked="checked" /></th><th>Amount</th><th>Item Name</th><th>Price</th><th>Total</th></tr></thead>' +
                    '<tbody id="calculator_loot_tableb"></tbody>' +
                    '</table>'
                );
                for (x in data_items) {
                    if (data_items.hasOwnProperty(x)) {
                        $('#calculator_loot_tableb').append(
                            $('<tr></tr>', {
                                'title': 'NPC that buys: ' + data_items[x][2]
                            }).append(
                                '<td><input type="checkbox" class="calculator_loot_includecb" checked="checked" /></td><td>' + data_items[x][0] + '</td>' +
                                '<td><a href="/wiki/' + encodeURIComponent((calculator_loot_pages_ex.hasOwnProperty(x) ? calculator_loot_pages_ex[x] : x).replace(/ /g, '_')) + '">' + x + '</a></td>' +
                                '<td>' + calculator_numcs(data_items[x][1]) + '</td><td>' + calculator_numcs(data_items[x][0] * data_items[x][1]) + '</td>'
                            )
                        );
                    }
                }
                calculator_loot_sum();
                $('.calculator_loot_includecb').click(function() {
                    calculator_loot_sum();
                });
                $('#calculator_lootrc a, #calculator_lootr3 a').click(function() {
                    window.open(this.href);
                    return false;
                });
                $('#calculator_loot_table :checkbox:first').click(function() {
                    $('#calculator_loot_table :checkbox').attr('checked', $(this).attr('checked'));
                    calculator_loot_sum();
                });
                $('#calculator_loot_tg1').hide();
                $('#calculator_loot_tg2').show();
                try {
                    mw.loader.using('jquery.tablesorter', function() {
                        $('#calculator_loot_table').not('.jquery-tablesorter').tablesorter();
                    });
                } catch (er) {}
            },
            calculator_loot_process = function() {
                if ($.trim($('#calculator_loot_dpl').text()) === '') {
                    if (!$('#calculator_loot_blackout').size()) {
                        $('body:first').append(
                            $('<div>Loading items data</div>').attr('id', 'calculator_loot_blackout').css({
                                'position': 'absolute',
                                'font-size': 'xx-large',
                                'font-weight': 'bolder',
                                'font-family': 'Arial',
                                'color': 'white',
                                'text-align': 'center',
                                'background-color': '#666666',
                                'z-index': '2'
                            })
                        );
                    }
                    var $cl = $('#calculator_loot');
                    $('#calculator_loot_blackout').css({
                            top: $cl.offset().top,
                            left: $cl.offset().left,
                            width: $cl.width(),
                            height: $cl.height(),
                            'padding-top': $cl.css('padding-top'),
                            'padding-right': $cl.css('padding-right'),
                            'padding-bottom': $cl.css('padding-bottom'),
                            'padding-left': $cl.css('padding-left'),
                            border: $cl.css('border')
                        })
                        .fadeTo('slow', 0.8);
                    $.get('/index.php?title=Calculators/Lootdata&action=render', function(data) { /*For wiki*/
                        //      $.get('data.php', function (data) {/*For local*/
                        var rep = /<p>|<\/p>|<!--[\s\S]*?-->|<\s*pre[\s\S]*?<\/pre>|<\s*script[\s\S]*?<\/script>|<\s*table[\s\S]*?<\/table>|<\s*noinclude[\s\S]*?<\/noinclude>/gi;
                        data = data.replace(rep, '').replace(/\s/g, ' ');
                        /*jslint regexp: true */
                        data = data.replace(/<a.*?>(.*?)<\/a>/gi, '0');
                        /*jslint regexp: false */
                        $('#calculator_loot_dpl').text(data);
                        $('#calculator_loot_blackout').fadeOut();
                        calculator_loot_process2();
                    }, 'text');
                } else {
                    calculator_loot_process2();
                }
            };

        $('#calculator_lootb1').click(function() {
            calculator_loot_process();
        });
        $('#calculator_lootb2').click(function() {
            $('#calculator_looti1').val('');
        });
        $('#calculator_lootb3').click(function() {
            $('#calculator_loot_tg2').hide();
            $('#calculator_loot_tg1').show();
            $('#calculator_lootb2').click();
        });
    }());

    /*Armor*/
    (function() {
        $('#calculator_armor').append(
            '<table class="wikitable" width="100%">' +
            '<tr><td style="vertical-align:middle;width:132px">' +
            '<div id="calculator_armor_body_main">' +
            '  <div style="top:2px;left:39px;"><img id="calculator_armor_body_helmet" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:39px;left:39px;"><img id="calculator_armor_body_armor" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:76px;left:39px;"><img id="calculator_armor_body_legs" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:113px;left:39px;"><img id="calculator_armor_body_boots" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:17px;left:2px;"><img id="calculator_armor_body_amulet" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:54px;left:76px;"><img id="calculator_armor_body_shield" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:54px;left:2px;"><img id="calculator_armor_body_weapon" alt="" src="" width="32" height="32" /></div>' +   
            '  <div style="top:91px;left:2px;"><img id="calculator_armor_body_ring" alt="" src="" width="32" height="32" /></div>' +
            '  <div style="top:91px;left:76px;"><img id="calculator_armor_body_belt" alt="" src="" width="32" height="32" /></div>' +
            '</div>' +
            '</td><td colspan="3">' +
            '  <div id="calculator_armor_items_div" class="text_align_left" style="overflow:auto;width:100%;height:165px;"></div>' +
            '</td></tr><tr><td>' +
            '  <div></div>' +
            '  <div id="calculator_armor_links"><b>Links to items</b></div>' +
            '</td><td class="text_align_left" style="width:180px;">' +
            '  <table>' +
            '  <tr><th colspan="2">Sort by:</th></tr>' +
            '  <tr><td colspan="2"><input type="radio" value="name" name="calculator_armor_items_sort" />Name <input type="radio" value="oz" name="calculator_armor_items_sort" />Oz <input type="radio" value="arm" name="calculator_armor_items_sort" />Armor' +
            '  </td></tr><tr><th colspan="2">Protection:</th></tr>' +
            '  <tr><td><input type="radio" value="physical" name="calculator_armor_items_sort" checked="checked" />Physical</td><td><input type="radio" value="fire" name="calculator_armor_items_sort" />Fire</td></tr>' +
            '  <tr><td><input type="radio" value="earth" name="calculator_armor_items_sort" />Earth</td><td><input type="radio" value="energy" name="calculator_armor_items_sort" />Energy</td></tr>' +
            '  <tr><td><input type="radio" value="ice" name="calculator_armor_items_sort" />Ice</td><td><input type="radio" value="holy" name="calculator_armor_items_sort" />Holy</td></tr>' +
            '  <tr><td><input type="radio" value="death" name="calculator_armor_items_sort" />Death</td><td><input type="radio" value="manadrain" name="calculator_armor_items_sort" />Mana Drain</td></tr>' +
            '  <tr><td></td><td><input type="radio" value="lifedrain" name="calculator_armor_items_sort" />Life Drain</td></tr></table>' +
            '</td><td style="width:115px;">' +
            '  <b>Damage type:</b><br /><select id="calculator_armor_damage_type" size="1"><option value="physical" selected="selected">Physical</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="energy">Energy</option><option value="ice">Ice</option><option value="holy">Holy</option><option value="death">Death</option><option value="manadrain">Mana Drain</option><option value="lifedrain">Life Drain</option></select>' +
            '  <br /><br />' +
            '  <b>Show items for:</b><br />' +
            '  <select id="calculator_armor_voc" size="1"><option value="0">All</option><option value="1" selected="selected">Druid</option><option value="2">Knight</option>  <option value="4">Paladin</option><option value="8">Sorcerer</option></select>' +
            '  <br /><br />' +
            '  <input type="checkbox" value="1" id="calculator_armor_np" /> Show non <br />protective items' +

            '</td><td style="width:179px;">' +
            '  <b>Defensive Imbuements:</b><br/>' +
            '  Armor: <select style="width:85px;" id="calculator_armor_imbue_1" size="1" disabled><option value="none" selected="selected">None</option><option value="basic">Basic</option><option value="intricate">Intricate</option><option value="powerful">Powerful</option></select><br />' +
            '  Shield: <select style="width:85px;" id="calculator_armor_imbue_2" size="1" disabled><option value="none" selected="selected">None</option><option value="basic">Basic</option><option value="intricate">Intricate</option><option value="powerful">Powerful</option></select><br /><br />' +
            '  <hr />' +
            '  Required Level: <span id="calculator_armor_req_level">None</span><br />' +
            '  Needed Cap: <span id="calculator_armor_set_oz">0.00 oz</span><br />' +
            '  Total Armor: <span id="calculator_armor_set_arm">0</span><br />' +
            '  <span id="calculator_armor_set_prot">Physical protection: 0%</span>' +
            '</td></tr></table>' +
            '<table id="calculator_armor_damages" class="wikitable">' +
            '<tr><th>Hit with <span id="calculator_armor_damage_type_ind">Physical</span></th><td>10</td><td>20</td><td>50</td><td>100</td><td>200</td><td>300</td><td>400</td><td>800</td><td><input type="text" id="calculator_armor_custom_damage" value="100" size="5" maxlength="5" /></td></tr>' +
            '<tr><th>Will hit</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
            '</table>'
        );
        var calculator_armor_parts_names = ['amulet', 'ring', 'helmet', 'armor', 'legs', 'boots', 'shield', 'weapon', 'belt'],
            calculator_armor_names_parts = {
                'amulet': 0,
                'ring': 1,
                'helmet': 2,
                'armor': 3,
                'legs': 4,
                'boots': 5,
                'shield': 6,
                'weapon': 7,
                'belt': 8
            },
            calculator_armor_imbue_prot = {
                'Physical': [0, 0, 0, 0],
                'Fire': [0, 3, 8, 15],
                'Earth': [0, 3, 8, 15],
                'Energy': [0, 3, 8, 15],
                'Ice': [0, 3, 8, 15],
                'Holy': [0, 3, 8, 15],
                'Death': [0, 2, 5, 10],
                'Mana Drain': [0, 0, 0, 0],
                'Life Drain': [0, 0, 0, 0],
            },
            calculator_armor_get_link_for_name = function(item, part) {
                /* Filter out every image that doesn't match. We should be left with a jQuery object containing one element.
                 * If we aren't, just get the first one anyway. */
                 
                /* Wikia's Lazy Loading functionality requires us to check data-src. If data-src doesn't exist, it may have already been processed, so
                 * use the src as a fallback. This solves a rare issue of (usually a single) image not loading correctly. */
                 
                var $item = $('#calculator_armor_list_' + calculator_armor_parts_names[part] + '_img img').filter(function() {
                    var $this = $(this), dataSrc;
                    dataSrc = $this.attr('data-src') || $this.attr('src');
                    if(dataSrc != null) {
                        /* OLD CODE.
                         * It should suffice to check if parsing the src would result in the same name as we've been provided.
                         * var a = dataSrc.split('/');
                         * return (decodeURIComponent(a[7]) === decodeURIComponent(item.replace(/ /g, '_') + '.gif') ? true : false);
                         */
                        return (get_item_name_from_img_src(dataSrc) === item.toLowerCase());
                    }
                }).first();
                
                return $item.attr('data-src') || $item.attr('src');
            },
            get_items_data = function(name) {
                var part = calculator_armor_names_parts[name],
                    ret = {},
                    x, p, h = $('#calculator_armor_list_' + name).html().replace(/<p>/gi, '').replace(/<\/p>/gi, ''),
                    get_vocation_number = function(t) {
                        t = t.toLowerCase();
                        return (t.match(/druid/i) ? 1 : 0) + (t.match(/knight/i) ? 2 : 0) + (t.match(/paladin/i) ? 4 : 0) + (t.match(/sorcerer/i) ? 8 : 0);
                    };
                while (h.search(/\s\s/) !== -1) {
                    h = h.replace(/\s\s/g, ' ');
                }
                h = h.replace(/\s/g, ' ');
                p = h.split('|');
                for (x in p) {
                    if (p.hasOwnProperty(x)) {
                        p[x] = $.trim(p[x]);
                    }
                }
                while (p[0] === '') {
                    p = p.slice(1);
                }
                for (x = 0; x < p.length; x = x + 8) {
                    /*jslint regexp: true */
                    ret[p[x].toLowerCase()] = {
                        name: p[x],
                        def: (parseInt(p[x + 1], 10) || 0),
                        arm: (parseInt(p[x + 2], 10) || 0),
                        oz: parseFloat(p[x + 3]) || 0,
                        att: $.trim(p[x + 4].replace(/none\.?/gi, '').replace(/<a.*?>(.*?)<\/a>/gi, '$1').replace(/</g, '')),
                        resist: {
                            physical: (parseInt((' ' + p[x + 5]).split(/physical/i)[1], 10) || 0),
                            fire: (parseInt((' ' + p[x + 5]).split(/fire/i)[1], 10) || 0),
                            earth: (parseInt((' ' + p[x + 5]).split(/earth/i)[1], 10) || 0),
                            energy: (parseInt((' ' + p[x + 5]).split(/energy/i)[1], 10) || 0),
                            ice: (parseInt((' ' + p[x + 5]).split(/ice/i)[1], 10) || 0),
                            holy: (parseInt((' ' + p[x + 5]).split(/holy/i)[1], 10) || 0),
                            death: (parseInt((' ' + p[x + 5]).split(/death/i)[1], 10) || 0),
                            manadrain: (parseInt((' ' + p[x + 5]).split(/mana drain/i)[1], 10) || 0),
                            lifedrain: (parseInt((' ' + p[x + 5]).split(/life drain/i)[1], 10) || 0)
                        },
                        lvl: (parseInt(p[x + 6], 10) || 0),
                        voc: get_vocation_number(p[x + 7]),
                        ur: calculator_armor_get_link_for_name(p[x], part)
                    };
                    /*jslint regexp: false */
                }
                x = 'No' + name.slice(0, 1).toUpperCase() + name.slice(1);
                ret[x.toLowerCase()] = {
                    name: x,
                    def: 0,
                    arm: 0,
                    oz: 0,
                    att: '',
                    lvl: 0,
                    voc: 0,
                    resist: {
                        physical: 0,
                        fire: 0,
                        earth: 0,
                        energy: 0,
                        ice: 0,
                        holy: 0,
                        death: 0,
                        manadrain: 0,
                        lifedrain: 0
                    }
                };
                ret[x.toLowerCase()].ur = calculator_armor_get_link_for_name(x, part);
                $('#calculator_armor_body_' + calculator_armor_parts_names[part]).attr('src', ret[x.toLowerCase()].ur);
                return ret;
            },
            calculator_armor_items_data = [get_items_data('amulet'), get_items_data('ring'), get_items_data('helmet'), get_items_data('armor'), get_items_data('legs'), get_items_data('boots'), get_items_data('shield'), get_items_data('weapon'), get_items_data('belt')],
            calculator_armor_vocv = 1,
            calculator_armor_current_part = 0,

            calculator_armor_template_translate = {
                'helmet': 'head',
                'armor': 'torso',
                'boots': 'feet',
                'amulet': 'neck',
                'ring': 'ring',
                'legs': 'legs',
                'shield': 'lefthand',
                'weapon': 'righthand',
                'shoulders': 'shoulders',
                'belt': 'belt'
            },
            calculator_armor_items_sorted,
            calculator_armor_do_items_sorted = function(part, key) {
                if (typeof key === 'undefined') {
                    key = $('[name=calculator_armor_items_sort]:checked').val();
                }
                calculator_armor_items_sorted = calculator_armor_items_data[part];
                if (key === 'name') {
                    calculator_armor_items_sorted = calculator_array_sort(calculator_armor_items_sorted, false, true);
                } else {
                    calculator_armor_items_sorted = calculator_array_sort(calculator_armor_items_sorted, false, false, true, key);
                }
            },
            calculator_armor_calculate = function(update_links) {
                var x, $links = $(),
                    tmp, tmpa = [],
                    dmg_type = $('#calculator_armor_damage_type :selected').text(),
                    imbue_prots = [],
                    min_val = [],
                    max_val = [],
                    calculate_damage = function(total_arm, damage, prot) {
                        var r1 = 0,
                            r2 = 0,
                            r3;
                        damage = parseInt(damage, 10);
                        if ($('#calculator_armor_damage_type').val() === 'physical') {
                            /*jslint unparam: true */
                            $.each(prot, function(i, v) {
                                damage = parseInt(((100 - v) / 100) * damage, 10);
                            });
                            /*jslint unparam: false */
                            r1 += (total_arm < 2 ? total_arm : Math.floor(total_arm / 2));
                            r2 += (total_arm < 2 ? total_arm : (total_arm % 2 === 0 ? total_arm - 1 : total_arm - 2));
                            r1 = r1 > damage ? damage : r1;
                            r2 = r2 > damage ? damage : r2;
                            r3 = (r2 + r1) / 2;
                            // min/max (avg)
                            return Math.max(0, damage - r2) + '/' + Math.max(0, damage - r1) + ' (' + Math.max(0, damage - r3) + ')';
                        }
                        r1 = damage;
                        /*jslint unparam: true */
                        $.each(prot, function(i, v) {
                            r1 = parseInt(((100 - v) / 100) * r1, 10);
                        });
                        /*jslint unparam: false */
                        return r1;
                    };
                if (update_links) {
                    $('#calculator_armor_links').empty();
                    for (x = 0; x < calculator_armor_parts_names.length; x++) {
                        tmpa = $('#calculator_armor_body_' + calculator_armor_parts_names[x]).attr('src');
                        if(tmpa != null) {
                            tmp = get_item_name_from_img_src(tmpa);
                            if (calculator_armor_items_data[x].hasOwnProperty(tmp)) {
                                if ('no' + calculator_armor_parts_names[x] !== tmp.toLowerCase()) {
                                    $links = $links.add(
                                        $('<a>', {
                                            'href': '/wiki/' + encodeURIComponent(calculator_armor_items_data[x][tmp].name.replace(/ /g, '_')),
                                            'title': calculator_armor_parts_names[x]
                                        })
                                        .text(calculator_armor_items_data[x][tmp].name)
                                    );
                                }
                            }
                        }
                    }
                    $links.not(':last').each(function() {
                        $('#calculator_armor_links').append($(this), '<br />');
                    });
                    $('#calculator_armor_links').append($links.last());
                    $('#calculator_armor_links a').click(function() {
                        window.open(this.href);
                        return false;
                    });
                }
                $('#calculator_armor_links, #calculator_armor_compare th').each(function() {
                    var x, lvl = 0,
                        oz = 0,
                        arm = 0,
                        dmg_prot = [],
                        tmp = '',
                        tmpa = [],
                        $link, $this = $(this);
                    for (x = 0; x < calculator_armor_parts_names.length; x++) {
                        $link = $this.children('a[title="' + calculator_armor_parts_names[x] + '"]');
                        if ($link.size()) {
                            tmpa = $link.attr('href').split(/\//);
                            tmp = decodeURIComponent(tmpa[tmpa.length - 1].replace(/_/g, ' ').toLowerCase());
                            if (calculator_armor_items_data[x].hasOwnProperty(tmp)) {
                                arm += calculator_armor_items_data[x][tmp].arm;
                                oz += calculator_armor_items_data[x][tmp].oz;
                                lvl = (calculator_armor_items_data[x][tmp].lvl > lvl ? calculator_armor_items_data[x][tmp].lvl : lvl);
                                if ((tmp = calculator_armor_items_data[x][tmp].resist[dmg_type.toLowerCase().replace(/\s/g, '')]) !== 0) {
                                    dmg_prot.push(tmp);
                                }
                            }
                        }
                    }
                    imbue_prots.push(calculator_armor_imbue_prot[dmg_type][$('#calculator_armor_imbue_1').prop('selectedIndex')],
                    calculator_armor_imbue_prot[dmg_type][$('#calculator_armor_imbue_2').prop('selectedIndex')]);
                    $.each(imbue_prots, function (i, v) {
                        if (v > 0) {
                            dmg_prot.push(v);
                        }
                    });
                    lvl = lvl || 'None';
                    oz = String(oz);
                    oz = oz + (oz.match(/\.\d\d/) ? '' : (oz.match(/\.\d/) ? '0' : '.00')) + ' oz';
                    tmpa = [];
                    for (x = 0; x < dmg_prot.length; x++) {
                        tmpa.push(dmg_prot[x] + '%');
                    }
                    tmp = dmg_type + ' protection:<br />' + (!tmpa.length ? '0%' : tmpa.join(', '));
                    if ($(this).is('div')) {
                        $('#calculator_armor_req_level').html(lvl);
                        $('#calculator_armor_set_oz').html(oz);
                        $('#calculator_armor_set_arm').html(arm);
                        var tot_dmg_prot = 1;
                        $.each(dmg_prot, function(i, v) {
                                tot_dmg_prot = tot_dmg_prot * ((100 - v)/100);
                        });
                        tot_dmg_prot = Math.round((1 - tot_dmg_prot) * 100 * 10) / 10;
                        $('#calculator_armor_set_prot').html(tmp + '<br/>Total: ' + tot_dmg_prot + '%');
                        $('#calculator_armor_damages tr:eq(1) td').text(function(i) {
                            if (i !== 8) {
                                return calculate_damage(arm, $('#calculator_armor_damages tr:eq(0) td:eq(' + i + ')').text(), dmg_prot);
                            }
                            return calculate_damage(arm, $('#calculator_armor_damages input').val(), dmg_prot);
                        });
                    } else {
                        $(this).attr('title',
                            'Required Level: ' + lvl + ' - Needed Cap: ' + oz +
                            ' - Total Armor: ' + arm + ' - ' + tmp.replace(/<br \/>/, ' ')
                        );
                        $(this).nextAll('td').text(function(i) {
                            if (i !== 8) {
                                return calculate_damage(arm, $('#calculator_armor_damages tr:eq(0) td:eq(' + i + ')').text(), dmg_prot);
                            }
                            return calculate_damage(arm, $('#calculator_armor_damages input').val(), dmg_prot);
                        });
                    }
                });
                if (!update_links) {
                    if ($('#calculator_armor_compare tr').size() > 1) {
                        $('#calculator_armor_compare tr').each(function() {
                            $(this).children('td').each(function(col) {
                                var tmp = $(this).text().match(/\([\d\.]+\)/),
                                    val;
                                if (tmp === null) {
                                    tmp = $(this).text().match(/[\d\.]+/);
                                }
                                val = parseFloat(tmp[0].replace(/[\(\)]/g, ''), 10);
                                min_val[col] = typeof min_val[col] === 'undefined' ? val : Math.min(min_val[col], val);
                                max_val[col] = typeof max_val[col] === 'undefined' ? val : Math.max(max_val[col], val);
                            });
                        });
                        $('#calculator_armor_compare tr').each(function() {
                            $(this).children('td').each(function(col) {
                                var tmp = $(this).text().match(/\([\d\.]+\)/),
                                    val;
                                if (tmp === null) {
                                    tmp = $(this).text().match(/[\d\.]+/);
                                }
                                val = parseFloat(tmp[0].replace(/[\(\)]/g, ''), 10);
                                $(this).css('background-color',
                                    (max_val[col] === min_val[col] ? 'transparent' :
                                        (val === min_val[col] ? '#D2F0D2' :
                                            (val === max_val[col] ? '#F0D2D2' : 'transparent')
                                        )
                                    )
                                );
                            });
                        });
                    } else {
                        $('#calculator_armor_compare tr td').css('background-color', 'transparent');
                    }
                }
            },
            calculator_armor_tt_html = function(d) {
                var arm_att_resist, att_resist, oz, x, voc_lvl = [],
                    resist = [];
                for (x in d.resist) {
                    if (d.resist.hasOwnProperty(x)) {
                        if (d.resist[x] !== 0) {
                            resist.push(x + ' ' + (d.resist[x] > 0 ? '+' : '') + d.resist[x] + '%');
                        }
                    }
                }
                resist = resist.length ? 'protection ' + resist.join(', ') : '';
                if (d.voc & 1) {
                    voc_lvl.push('druids');
                }
                if (d.voc & 2) {
                    voc_lvl.push('knights');
                }
                if (d.voc & 4) {
                    voc_lvl.push('paladins');
                }
                if (d.voc & 8) {
                    voc_lvl.push('sorcerers');
                }
                voc_lvl = (voc_lvl.length || d.lvl) ? '<br />It can only be wielded properly by ' + (voc_lvl.length ? voc_lvl.join(' and ') : 'players') + (d.lvl ? ' of level ' + d.lvl + ' or higher' : '') + '.' : '';
                att_resist = (d.att ? (resist.length ? [d.att, resist] : [d.att]) : (resist.length ? [resist] : [])).join(', ');
                arm_att_resist = (
                    d.arm ?
                    'Arm:' + d.arm + (att_resist.length ? ', ' : '') :
                    (d.def ?
                        'Def:' + d.def + (att_resist.length ? ', ' : '') :
                        '')
                );
                arm_att_resist += att_resist;
                oz = String(d.oz);
                oz = oz + (oz.match(/\.\d/) ? '0' : (oz.match(/\.\d\d/) ? '' : '.00'));
                return '<b>' + d.name + '</b>' + (arm_att_resist ? ' (' + arm_att_resist + ')' : '') + voc_lvl + (d.oz ? '<br />It weighs ' + oz + ' oz.' : '');
            };
        $('#calculator_armor_damage_type').change(function() {
            var no_imbue = ['physical', 'manadrain', 'lifedrain'];
            if (no_imbue.includes($(this).val())) {
                $('#calculator_armor_imbue_1').val('none');
                $('#calculator_armor_imbue_1').prop('disabled', 'true');
                $('#calculator_armor_imbue_2').val('none');
                $('#calculator_armor_imbue_2').prop('disabled', 'true');
            } else {
                $('#calculator_armor_imbue_1').removeAttr('disabled');
                $('#calculator_armor_imbue_2').removeAttr('disabled');
            }
            $('[name=calculator_armor_items_sort][value=' + $('#calculator_armor_damage_type').val() + ']').attr('checked', 'checked');
            $('#calculator_armor_damage_type_ind').text($('#calculator_armor_damage_type :selected').text());
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
            calculator_armor_calculate(false);
        });
        $('#calculator_armor_imbue_1, #calculator_armor_imbue_2').change(function() {
            calculator_armor_calculate(false);
        });
        $('#calculator_armor_voc').change(function() {
            var need_clear = false;
            $.each(calculator_armor_parts_names, function(i, v) {
                var tmpa = $('#calculator_armor_body_' + v).attr('src').split(/\//),
                    tmp;
                tmpa = tmpa[tmpa.length - 3].split(/\./);
                tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
                if (calculator_armor_items_data[i].hasOwnProperty(tmp)) {
                    if (calculator_armor_items_data[i][tmp].voc !== 0 && !(calculator_armor_items_data[i][tmp].voc & parseInt($('#calculator_armor_voc').val(), 10))) {
                        need_clear = true;
                        return false;
                    }
                }
            });
            if (need_clear) {
                if (confirm('This will reset the set, continue?')) {
                    $.each(calculator_armor_parts_names, function(i, v) {
                        var x = 'No' + v.slice(0, 1).toUpperCase() + v.slice(1);
                        $('#calculator_armor_body_' + v).attr('src', calculator_armor_get_link_for_name(x, i)).attr('alt', '');
                    });
                    calculator_armor_vocv = parseInt($('#calculator_armor_voc').val(), 10);
                } else {
                    $('#calculator_armor_voc').val(calculator_armor_vocv);
                }
            } else {
                calculator_armor_vocv = parseInt($('#calculator_armor_voc').val(), 10);
            }
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
            calculator_armor_calculate(true);
        });


        $('#calculator_armor_custom_damage').keyup(function() {
            $(this).val(parseInt($(this).val(), 10) || 0);
            if ($(this).val() === '0') {
                $(this).select();
            }
            calculator_armor_calculate(false);
        });

        $('#calculator_armor_body_main img').click(function() {
                var tmp, x, y, t = parseInt(calculator_armor_names_parts[$(this).attr('id').split('_')[3]], 10);
                calculator_armor_current_part = t;
                calculator_armor_do_items_sorted(calculator_armor_current_part);
                $('#calculator_armor_items_div').html('');
                for (x in calculator_armor_items_sorted) {
                    if (calculator_armor_items_sorted.hasOwnProperty(x)) {
                        tmp = true;
                        for (y in calculator_armor_items_sorted[x].resist) {
                            if (calculator_armor_items_sorted[x].resist.hasOwnProperty(y)) {
                                if (calculator_armor_items_sorted[x].resist[y] !== 0) {
                                    tmp = false;
                                    break;
                                }
                            }
                        }
                        if (
                            (('no' + calculator_armor_parts_names[t] === x.toLowerCase()) || $('#calculator_armor_np').is(':checked') || !tmp || calculator_armor_items_sorted[x].arm !== 0) &&
                            (calculator_armor_items_sorted[x].voc === 0 || calculator_armor_vocv === 0 || (calculator_armor_items_sorted[x].voc & calculator_armor_vocv))
                        ) {
                            $('#calculator_armor_items_div').append(
                                $('<img class="item_img" ' + 'src="' + calculator_armor_items_sorted[x].ur + '" ' +
                                    'alt="' + calculator_armor_items_sorted[x].name + '" ' +
                                    'width="32" height="32" />'));
                        }
                    }
                }
                $('.item_img').css('cursor', 'pointer')
                    .click(function() {
                        if ($('#calculator_armor_code_div').is(':visible')) {
                            $('#calculator_armor_code_toggle').click();
                        }
                        $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).attr('src', $(this).attr('src')).attr('alt', $(this).attr('alt'));
                        calculator_armor_calculate(true);
                    })
                    .mousemove(function(e) {
                        if ($(this).attr('alt') === '') {
                            return;
                        }
                        var tmp = get_item_name_from_img_src($(this).attr('src'));
                        t = calculator_armor_items_data[calculator_armor_current_part][tmp];
                        $('#calculator_armor_tt_items').show().css({
                            top: (e.pageY + 20) + 'px',
                            left: (e.pageX + 10) + 'px'
                        }).html(calculator_armor_tt_html(t));
                    })
                    .mouseout(function() {
                        $('#calculator_armor_tt_items').hide();
                    });
                if ($('#calculator_armor_tt_items').size() === 0) {
                    $('body:eq(0)').append($('<div id="calculator_armor_tt_items">&nbsp;</div>'));
                }
            })
            .mousemove(function(e) {
                if ($(this).attr('alt') === '') {
                    return;
                }
                var tmpa = $(this).attr('src').split(/\//),
                    tmp, t;
                tmpa = tmpa[tmpa.length - 3].split(/\./);
                tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
                t = calculator_armor_items_data[calculator_armor_names_parts[$(this).attr('id').split('_')[3]]][tmp];
                $('#calculator_armor_tt_items').show().css({
                    top: (e.pageY + 20) + 'px',
                    left: (e.pageX + 10) + 'px'
                }).html(calculator_armor_tt_html(t));
            })
            .mouseout(function() {
                $('#calculator_armor_tt_items').hide();
            });

        $('#calculator_armor_np').click(function() {
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
        });
        $('[name=calculator_armor_items_sort]').click(function() {
            $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
        });


        $('#calculator_armor_body_helmet').click();
        calculator_armor_calculate(true);

        $('#calculator_armor_links').after(
            '<hr />Code for your ',
            (wgUserName ?
                $('<a href="https://tibia.fandom.com/wiki/User:' + wgUserName + '?action=edit">user page</a>').click(function() {
                    window.open($(this).attr('href'));
                    return false;
                }) :
                'user page'
            ),
            ' ',
            $('<input type="button" id="calculator_armor_code_toggle" value="Show" />').toggle(function() {
                var calculator_armor_template = '{{Equips_Set';
                /*jslint unparam: true */
                $.each(calculator_armor_parts_names.concat(['shoulders']), function(i, v) {
                    calculator_armor_template += '\n  |' + calculator_armor_template_translate[v] + '=' + ($('#calculator_armor_body_' + v).attr('alt') || 'None');
                });
                /*jslint unparam: false */
                calculator_armor_template += '\n}}';
                if ($('#calculator_armor_code_div').size() < 1) {
                    $(this).after(
                        $('<div />', {
                            'id': 'calculator_armor_code_div'
                        }).append(
                            $('<textarea />', {
                                'id': 'calculator_armor_code',
                                'rows': '12',
                                'cols': '30'
                            }).click(function() {
                                $(this).select();
                            })
                        ).css('display', 'none')
                    );
                }
                $('#calculator_armor_code').val(calculator_armor_template).parent().slideDown(200, function() {
                    $('#calculator_armor_code_toggle').val('Hide');
                });
            }, function() {
                $('#calculator_armor_code_div').slideUp(200, function() {
                    $('#calculator_armor_code_toggle').val('Show');
                });
            }),
            '<hr />Add set to ',
            $('<input />', {
                'type': 'button',
                'value': 'compare'
            }).click(function() {
                var set_text = [],
                    already_on_list = false;
                if ($('#calculator_armor_links a').size() > 0) {
                    $('#calculator_armor_links a').each(function() {
                        set_text.push($(this).html());
                    });
                    if ($('#calculator_armor_compare').size() === 0) {
                        $('#calculator_armor_damages').after($('<table>', {
                            'id': 'calculator_armor_compare',
                            'class': 'wikitable'
                        }));
                    }
                    $('#calculator_armor_compare th').each(function() {
                        if ($(this).children('a').text() === $('#calculator_armor_links').children('a').text()) {
                            already_on_list = true;
                            return false;
                        }
                    });
                    if (already_on_list) {
                        alert('This set is already on the list.');
                    } else {
                        $('#calculator_armor_compare').append(
                            $('<tr>').append(
                                $('<th>').append(
                                    $('<input>', {
                                        'type': 'button',
                                        'value': 'Load this set'
                                    }).click(function() {
                                        var $td = $(this).parent();
                                        $.each(calculator_armor_parts_names, function(i, v) {
                                            var x = 'No' + v.slice(0, 1).toUpperCase() + v.slice(1),
                                                $link = $td.children('a[title="' + calculator_armor_parts_names[i] + '"]'),
                                                tmp, tmpa, tmpo;
                                            $('#calculator_armor_body_' + v).attr('src', calculator_armor_get_link_for_name(x, i)).attr('alt', '');
                                            if ($link.size()) {
                                                tmpa = $link.attr('href').split(/\//);
                                                tmp = decodeURIComponent(tmpa[tmpa.length - 1].replace(/_/g, ' ').toLowerCase());
                                                if (calculator_armor_items_data[i].hasOwnProperty(tmp)) {
                                                    tmpo = calculator_armor_items_data[i][tmp];
                                                    $('#calculator_armor_body_' + v).attr('src', tmpo.ur).attr('alt', tmpo.name);
                                                }
                                            }
                                        });
                                        $('#calculator_armor_voc').val($td.children('input:hidden').val());
                                        $('#calculator_armor_body_helmet').click();
                                        calculator_armor_calculate(true);
                                    }),
                                    ' ',
                                    $('<div>').css({
                                        'cursor': 'pointer',
                                        'display': 'inline-block'
                                    }).text('x').click(function() {
                                        $(this).closest('tr').remove();
                                        calculator_armor_calculate(false);
                                    }),
                                    $('<input>', {
                                        'type': 'hidden',
                                        'value': $('#calculator_armor_voc').val()
                                    }),
                                    $('#calculator_armor_links').children().clone(true)
                                ),
                                $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'),
                                $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'), $('<td>').html('&nbsp;'),
                                $('<td>').html('&nbsp;')
                            )
                        );
                        calculator_armor_calculate(false);
                    }
                }
            })
        );
    }());
    /* True Damage Taken */
    (function() {
    	$('#calculator_truedamage').css({backgroundColor: "white"});
    	$('#calculator_truedamage').html(
    		'<div style="float:left;padding: 0 1em;">' +
    		'<span>Paste the <b>Input Analyzer</b> data here:</span><br/>' +
    		'<span><small>(Make sure you have selected "Show Session Values")</small></span><br/>' +
    		'<textarea id="calculator_td_input" rows="15" cols="30"></textarea></div>' +
    		'<span><small>Check your elemental resistances with your set equipped in the Cyclopedia.<br/>' +
    		'Go to Character &#8680; General Stats &#8680; Combat Stats.</small></span>' + 
    		'<table id="calculator_td_resist"><tr>' +
    		'<th>Element</th><th>Resistance (%)</th>' +
    		'</tr><tr>' +
    		'<td>Physical</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Physical_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Mana Drain</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_ManaDrain_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Fire</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Fire_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Earth</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Earth_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Energy</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Energy_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Ice</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Ice_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Holy</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Holy_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Death</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Death_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Drowning</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_Drowning_prot">%</td>' +
    		'</tr><tr>' +
    		'<td>Life Drain</td><td><input type="number" min="0" max = "100" value = "0"id="calculator_td_LifeDrain_prot">%</td>' +
    		'</tr></table>' +
    		'<div style="clear:both;"></div>' +
    		'<input type="button" id="calculator_td_process" value="Process" /><br/>' +
    		'<div id="calculator_td_output">' +
    		'</div>' 
		);
		$('#calculator_td_resist').css({border: '1px solid black', borderSpacing: 0});
		$('#calculator_td_process').click(function () {
			var dmg_taken = {}, dmg_true = {};
	    	var input = $('#calculator_td_input').val().split("\n").splice(4, 50);
	    	while (input[0].substr(0, 6) != 'Damage') {
	    		var elRegexp = /\s\s([a-zA-Z ]+)/;
	    		var element = elRegexp.exec(input[0])[0].replaceAll(" ", "");
	    		var valRegexp = /\d+,?\d+?,?\d?/;
	    		var damage = parseInt(valRegexp.exec(input[0])[0].replaceAll(",", ""));
	    		dmg_taken[element] = damage;
	    		input.shift();
	    	}
	    	$.each(Object.keys(dmg_taken), function (i, v) {
	    		var resist = 1 - parseInt($('#calculator_td_' + v + '_prot').val())/100;
	    		dmg_true[v] = dmg_taken[v] / resist;
	    		
	    	});
	    	var total_taken = Object.values(dmg_taken).reduce(function(x, y) { return x + y; }, 0),
	    	total_true = Object.values(dmg_true).reduce(function(x, y) { return x + y; }, 0);
	    	var rows = '';
	    	$.each(Object.keys(dmg_taken), function (i, v) {
	    		rows += '<tr>' + 
		    		'<td>' + v + '</td>' +
		    		'<td>' + dmg_taken[v] + ' (' + Math.round(10000*dmg_taken[v]/total_taken)/100 + '%)</td>' +
		    		'<td>' + Math.round(dmg_true[v]) + ' (' + Math.round(10000*dmg_true[v]/total_true)/100 + '%)</td>' +
		    		'</tr>';
	    	});
	    	var lastRow = '<tr>' + 
		    	'<td><b>Total</b></td>' +
		    	'<td><b>' + total_taken + '</b></td>' +
		    	'<td><b>' + Math.round(total_true) + '</b></td>' +
		    	'</tr>';
	    	$('#calculator_td_output').html(
	    		'<table class="wikitable"><tr>' +
	    		'<th>Element</th><th>Damage Taken</th><th>True Damage</th></tr>' +
	    		rows + 
	    		lastRow +
	    		'</table>'
	    	);
		});
    }());
    
    /*General*/
    $('#calculators_loading').hide();
    $('#calculators_container').show();
});
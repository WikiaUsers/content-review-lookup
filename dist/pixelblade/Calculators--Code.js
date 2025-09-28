//<noinclude>{{protected|this page contains javascript and therefor VERY vulnerable to vandalism or hackers}}</noinclude>
/*jslint devel: true, browser: true, white: true, indent: 2, plusplus: true, bitwise: true*/
/*global $, wgUserName, mw */
$(function() {
    //__NOWYSIWYG__g
    /*General*/
    'use strict';
    var npcs_locations = { /* Took from Template:NPC_Trades/City */
            'A Bearded Woman': 'Carlin*',
            'A Beautiful Girl': 'Yalahar*',
            'A Confused Frog': 'Thais*',
            'A Dark Priestess': 'Edron*',
            'A Dead Bureaucrat': 'Venore*',
            'A Dragon Mother': 'Svargrond*',
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
            'A Strange Chalice': 'Farmine*',
            'A Strange Fellow': 'Venore',
            'A Sweaty Cyclops': 'Ab\'Dendriel',
            'A Tainted Soul': 'Carlin*',
            'A Tortured Soul': 'Carlin*',
            'A Wandering Soul': 'Yalahar*',
            'A Wrinkled Bonelord': 'Ab\'Dendriel*',
            'Abran Ironeye': 'Venore',
            'Admiral Wyrmslicer': 'Liberty Bay',
            'Adrenius': 'Venore*',
            'Agostina': 'Ankrahmun*',
            'Ahmet': 'Ankrahmun',
            'Ajax': 'Carlin*',
            'Alaistar': 'Rathleton',
            'Al Dee': 'Rookgaard',
            'Albert': 'Edron*',
            'Alberto': 'Kazordoon*',
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
            'Andrew Lyze': 'Port Hope*',
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
            'Augustin': 'Bounac',
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
            'Brom': 'Kazordoon*',
            'Bruce': 'Yalahar*',
            'Bruno': 'Carlin*',
            'Brutus': 'Ankrahmun*',
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
            'Cledwyn': 'Thais*',
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
            'Dal the Huntress': 'Bounac',
            'Dalbrect': 'Carlin*',
            'Dallheim': 'Rookgaard',
            'Dane': 'Carlin',
            'Daniel Steelsoul': 'Edron',
            'Dankwart': 'Svargrond',
            'Danlon': 'Liberty Bay*',
            'Dario': 'Ankrahmun',
            'Dark Priestess': 'Edron*',
            'Dino': 'Thais*',
            'Demon Mother': 'Venore*',
            'Demonguard': 'Venore*',
            'Dermot': 'Thais*',
            'Digger': 'Venore',
            'Dixi': 'Rookgaard',
            'Djema': 'Ankrahmun*',
            'Domizian': 'Darashia',
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
            'Eliyas': 'Issavi',
            'Eliza': 'Edron',
            'Elvith': 'Ab\'Dendriel',
            'Emilie': 'Thais',
            'Emilio': 'Edron*',
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
            'Fabiana': 'Rathleton*',
            'Fadil': 'Darashia',
            'Falk': 'Edron',
            'Faloriel': 'Issavi',
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
            'Fral the Butcher': 'Bounac',
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
            'Inkaef': 'Issavi',
            'Innkeeper Alphonse': 'Bounac',
            'Irea': 'Ab\'Dendriel',
            'Iriana': 'Yalahar*',
            'Irmana': 'Venore',
            'Irvin': 'Liberty Bay',
            'Ishebad': 'Ankrahmun',
            'Ishina': 'Darashia',
            'Isimov': 'Kazordoon',
            'Iskan': 'Svargrond',
            'Isolde': 'Liberty Bay',
            'Ivalisse': 'Thais*',
            'Iwan': 'Edron',
            'Iwar': 'Kazordoon',
            'Iyad': 'Svargrond',
            'Izsh': 'Farmine*',
            'Jack': 'Edron*',
            'Jack\'s Mother': 'Edron*',
            'Jack\'s Sister': 'Edron*',
            'Jack Fate': 'Liberty Bay',
            'Jack Springer': 'Thais',
            'Jakahr': 'Ankrahmun',
            'James': 'Edron*',
            'Janz': 'Svargrond',
            'Jason': 'Liberty Bay*',
            'Jean Claude': 'Venore',
            'Jean Pierre': 'Ankrahmun*',
            'Jefrey': 'Liberty Bay',
            'Jehan the Baker': 'Bounac',
            'Jerom': 'Edron*',
            'Jessica': 'Svargrond',
            'Jezzara': 'Ankrahmun',
            'Jimbin': 'Kazordoon',
            'Jimmy': 'Yalahar*',
            'John': 'Liberty Bay*',
            'John (Bounac)': 'Bounac',
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
            'Khanna': 'Issavi',
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
            'Lorenzo': 'Thais*',
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
            'Mysterious Device': 'Port Hope*',
            'Nah\'Bob': 'Ankrahmun*',
            'Naji': 'Thais',
            'Namasa': 'Farmine*',
            'Nathaniel': 'Venore',
            'Ned Nobel': 'Ab\'Dendriel',
            'Nelliem': 'Venore',
            'Nelly': 'Svargrond',
            'Nemal': 'Venore*',
            'Nezil': 'Kazordoon',
            'Nicholas': 'Rathleton',
            'Nielson': 'Carlin',
            'Nienna': 'Meluna',
            'Nilsor': 'Svargrond*',
            'Ninos': 'Issavi',
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
            'Onfroi': 'Bounac',
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
            'Ramina': 'Issavi',
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
            'Relaxed Bartender': 'Schrödinger\'s Island',
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
            'Roughington': 'Rathleton*',
            'Rowenna': 'Carlin',
            'Rudolph': 'Edron',
            'Ruprecht': 'Carlin*',
            'Sam': 'Thais',
            'Samir': 'Darashia*',
            'Sandra': 'Edron',
            'Santa Claus': 'Varies',
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
            'Shadowpunch': 'Edron*',
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
            'Tarun': 'Port Hope*',
            'Tatak': 'Farmine*',
            'Tefrit': 'Issavi*',
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
            'The Librarian': 'Issavi',
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
            'Victor': 'Thais*',
            'Vigintius': 'Vigintia',
            'Vincent': 'Yalahar',
            'Vladruc': 'Venore',
            'Vulturenose': 'Liberty Bay*',
            'Wally': 'Thais*',
            'Walter, The Guard': 'Thais',
            'Walter Jaeger': 'Thais',
            'Warbert': 'Venore',
            'Weakened Forest Fury': 'Venore*',
            'Wes the Blacksmith': 'Bounac',
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
            'Yana': 'Thais*',
            'Yanni': 'Venore',
            'Yasir': 'Varies',
            'Yawno': 'Port Hope*',
            'Yberius': 'Venore',
            'Yoem': 'Edron*',
            'Yonan': 'Issavi',
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
            'Zurak': 'Farmine*'
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
        '#calculator_looti1 {width:600px;}' +
        '</style>'
    );
   
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
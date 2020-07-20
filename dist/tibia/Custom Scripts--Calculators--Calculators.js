//<noinclude>{{protected|this page contains javascript and therefor VERY vulnerable to vandalism or hackers}}</noinclude><pre id="pre_calculators">
/*jslint devel: true, browser: true, white: true, indent: 2, plusplus: true, bitwise: true*/
/*global $, wgUserName, mw */
(function () {
//__NOWYSIWYG__
/*General*/
  'use strict';
  var
  npcs_locations = { /* Took from Template:NPC_Trades/City */
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
'Al Dee': 'Rookgaard',
'Albert': 'Edron*',
'Aldo': 'Venore',
'Alesar': 'Ankrahmun*',
'Alexander': 'Edron',
'Alia': 'Carlin',
'Alissa': 'Meluna',
'Allen': 'Venore',
'Alternative Rock': 'Gray Beach',
'Alwin': 'Venore',
'Amanda': 'Edron',
'Amarie': 'Ab\'dendriel',
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
'Asrak': 'Venore',
'Asralius': 'Rookgaard',
'Atrad': 'Liberty Bay*',
'Avar Tar': 'Edron*',
'Awareness of the Emperor': 'Farmine*',
'Azil': 'Darashia',
'Baa\'Leal': 'Ankrahmun*',
'Baltim': 'Svargrond*',
'Bambi Bonecrusher': 'Carlin',
'Barbara': 'Carlin',
'Barney': 'Liberty Bay*',
'Barry': 'Yalahar*',
'Bashira': 'Ab\'Dendriel',
'Basilisk': 'Kazordoon*',
'Baxter': 'Thais',
'Beatrice': 'Edron',
'Ben': 'Port Hope',
'Benevola': 'Carlin*',
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
'Chondur': 'Liberty Bay*',
'Chrak': 'Farmine*',
'Christoph': 'Venore',
'Chrystal': 'Edron',
'Chuckles': 'Yalahar',
'Cillia': 'Thais',
'Cipfried': 'Rookgaard',
'Clark': 'Port Hope',
'Clyde': 'Port Hope',
'Cobra (NPC)': 'Stone Tomb',
'Cornelia': 'Carlin',
'Costello': 'Carlin*',
'Cranky Lizard Crone': 'Farmine*',
'Cruleo': 'Venore*',
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
'Dreadeye': 'Ab\'Dendriel',
'Drog': 'Yalahar*',
'Dronk': 'Kazordoon',
'Druid Yandur': 'Island of Destiny',
'Duncan': 'Liberty Bay*',
'Duria': 'Kazordoon',
'Dustrunner': 'Venore',
'Ebenizer': 'Edron',
'Eclesius': 'Thais',
'Edala': 'Ab\'Dendriel*',
'Eddy': 'Thais*',
'Edoch': 'Darashia',
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
'Falk': 'Edron',
'Faluae': 'Ab\'Dendriel',
'Feizuhl': 'Ankrahmun',
'Fenbala': 'Carlin',
'Fenech': 'Ankrahmun',
'Fergus': 'Liberty Bay',
'Ferks': 'Port Hope',
'Ferryman Kamil': 'Thais*',
'Ferus': 'Kazordoon',
'Finarfin': 'Ab\'dendriel',
'Fiona': 'Edron',
'Florentine': 'Carlin',
'Frafnar': 'Yalahar*',
'Frans': 'Venore',
'Frederik': 'Liberty Bay',
'Freezhild': 'Svargrond*',
'Friedolin': 'Carlin',
'Frodo': 'Thais',
'Frok, the Guard': 'Yalahar*',
'Fynn': 'Svargrond',
'Gabel': 'Ankrahmun*',
'Gail': 'Port Hope',
'Galuna': 'Thais',
'Gamel': 'Thais',
'Gamon': 'Thais',
'Garzon': 'Yalahar*',
'Gate Guardian': 'Farmine*',
'Gelagos': 'Carlin*',
'Ghost Captain': 'Thais*',
'Ghost of a Priest': 'Port Hope*',
'Ghostly Woman': 'Venore*',
'Ghosts of a Priest': 'Port Hope*',
'Golem Guardian': 'Yalahar',
'Golem Servant': 'Yalahar*',
'Gordon': 'Liberty Bay',
'Gorn': 'Thais',
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
'Jefrey': 'Liberty Bay depot, here.',
'Jerom': 'Edron*',
'Jessica': 'Svargrond',
'Jezzara': 'Ankrahmun',
'Jimbin': 'Kazordoon',
'Jimmy': 'Yalahar*',
'John': 'Liberty Bay*',
'Julian': 'Venore',
'Julius': 'Yalahar*',
'Junkar': 'Thais*',
'Kalvin': 'Venore',
'Karith': 'Yalahar',
'Karl': 'Carlin',
'Kasmir': 'Darashia',
'Kawill': 'Kazordoon',
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
'Luna': 'Edron',
'Lunch': 'Kazordoon*',
'Lungelen': 'Thais',
'Lurik': 'Svargrond',
'Lynda': 'Thais',
'Lyonel': 'Liberty Bay',
'Maealil': 'Ab\'Dendriel',
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
'Marvik': 'Thais',
'Maryza': 'Kazordoon',
'Mehkesh': 'Ankrahmun',
'Melchior': 'Ankrahmun',
'Melfar': 'Kazordoon',
'Melian': 'Farmine',
'Memech': 'Ankrahmun',
'Menacing Mummy': 'Yalahar',
'Meraya': 'Liberty Bay*',
'Miles, The Guard': 'Thais',
'Milos': 'Edron',
'Minzy': 'Venore*',
'Mirabell': 'Edron',
'Miraia': 'Darashia',
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
'Penny': 'Isle of Solitude',
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
'Riddler': 'Kazordoon*',
'Robert': 'Svargrond',
'Robin': 'Thais',
'Robson': 'Robson Isle',
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
'Scott': 'Senja',
'Scrutinon': 'Gray Island',
'Scutty': 'Kazordoon',
'Sebastian': 'Liberty Bay*',
'Serafin': 'Yalahar*',
'Servant Sentry': 'Edron',
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
'Talesia': 'Venore',
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
'Testserver Assistant': 'Tibia',
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
'Vascalir': 'Rookgaard',
'Velvet': 'Venore',
'Vera': 'Senja',
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
'Zirella': 'Rookgaard*',
'Zirkon': 'Yalahar*',
'Zizzle': 'Farmine*',
'Zlak': 'Farmine*',
'Znozel': 'Yalahar',
'Zoltan': 'Edron',
'Zora': 'Svargrond*',
'Ztiss': 'Farmine*',
'Zumtah': 'Unknown',
'Zurak': 'Farmine*',
'Chip': 'Carlin*',
'Gnomailion': 'Gnomegate',
'Gnomally': 'Gnomegate',
'Gnomegica': 'Gnomegate',
'Gnomejam': 'Gnomegate',
'Gnomerrow': 'Gnomegate',
'Gnomette': 'Gnomegate',
'Gnomincia': 'Gnomegate',
'Gnominus': 'Gnomegate',
'Gnomission': 'Gnomegate',
'Xelvar': 'Kazordoon'
  },
  calculator_numcs = function (n) { n = String(n); while ((/\d{4}/).test(n)) { n = n.replace(/(\d{3},|\d{3}$)/, ',$1'); } return n; },
  calculator_btn_m = function (o) { $(o).prev().val(parseInt($(o).prev().val(), 10) - 1); $(o).prev().keyup(); },
  calculator_btn_p = function (o) { $(o).prev().prev().val(parseInt($(o).prev().prev().val(), 10) + 1); $(o).prev().prev().keyup(); },

  calculator_array_sort = function (inputArr, numeric, by_key, reverse, sub_key) {
    var tmp_arr = {}, valArr = [], keyArr = [], keys = [], sorter, i, k, populateArr = [],
    is_numeric = function (v) { v = parseFloat(v); return (typeof v === 'number' && !isNaN(v)); },
    bubbleSort = function (keyArr, inputArr, sub_key) {
      var i, j, tempValue, tempKeyVal, ret; for (i = inputArr.length - 2; i >= 0; i--) { for (j = 0; j <= i; j++) {
        ret = (sub_key === '') ? sorter(inputArr[j + 1], inputArr[j]) : sorter((typeof inputArr[j + 1].resist[sub_key] === 'undefined' ? inputArr[j + 1][sub_key] : inputArr[j + 1].resist[sub_key]), (typeof inputArr[j].resist[sub_key] === 'undefined' ? inputArr[j][sub_key] : inputArr[j].resist[sub_key]));
        if (ret < 0) { tempValue = inputArr[j]; inputArr[j] = inputArr[j + 1]; inputArr[j + 1] = tempValue; tempKeyVal = keyArr[j]; keyArr[j] = keyArr[j + 1]; keyArr[j + 1] = tempKeyVal; }
      } }
    };
    if (typeof numeric === 'undefined') { numeric = false; }
    if (typeof by_key === 'undefined') { by_key = false; }
    if (typeof reverse === 'undefined') { reverse = false; }
    if (typeof sub_key === 'undefined') { sub_key = ''; }
    if (numeric) { sorter = function (a, b) { return (reverse ? b - a : a - b); }; }
    else {
      sorter = function (a, b) {
        var x = a, y = b, tmp;
        if (!is_numeric(a) && !is_numeric(b)) {
          tmp = (function (a, b) {a = a.search(/[a-z]/); b = b.search(/[a-z]/); if ((a !== 0 && b !== 0) || a === b) {return 0; } if (a === 0) {return -1; } if (b === 0) {return 1; } }(x, y));
          if (tmp !== 0) { return tmp * (reverse ? -1 : 1); }
          if (a === b) { return 0; }
          if (a > b) { return (reverse ? -1 : 1); }
          return (reverse ? 1 : -1);
        }
        a = parseFloat(a) || 0;
        b = parseFloat(b) || 0;
        return (reverse ? b - a : a - b);
      };
    }
    if (by_key) {
      for (k in inputArr) { if (inputArr.hasOwnProperty(k)) { keys.push(k); } }/*Make a list of key names*/
      keys.sort(sorter);
      for (i = 0; i < keys.length; i++) { k = keys[i]; tmp_arr[k] = inputArr[k]; }/*Rebuild array with sorted key names*/
      for (i in tmp_arr) { if (tmp_arr.hasOwnProperty(i)) { populateArr[i] = tmp_arr[i]; } }
    }
    else {
      for (k in inputArr) { if (inputArr.hasOwnProperty(k)) { valArr.push(inputArr[k]); keyArr.push(k); } }/*Get key and value*/
      try { bubbleSort(keyArr, valArr, sub_key); } catch (e) { return false; }/*Sort our new temporary arrays*/
      for (i = 0; i < valArr.length; i++) { populateArr[keyArr[i]] = valArr[i]; }/*Repopulate the old array*/
    }
    return populateArr;
  };

  $('body:first').append(
    '<style type="text/css">' +
    '#calculators_container{width:100%;}' +
    '#calculators_container>div {text-align:center;display:inline-block;border:1px solid #bfcfcf; background-color:#f9fcff;padding:8px 10px;}' +
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
    '#calculator_exp {width:250px;}' +
    '#calculator_armor td {vertical-align:top;}' +
    '#calculator_armor_damages, #calculator_armor_compare {width:100%;}' +
    '#calculator_armor_damages td, #calculator_armor_compare td {width: 9%;vertical-align:middle;}' +
    '#calculator_armor_damages th, #calculator_armor_compare th {width: 19%;vertical-align:middle;}' +
    '#calculator_armor_compare th {font-weight:normal;}' +
    '#calculator_armor_body_main {background:url(\'https://images.wikia.nocookie.net/tibia/en/images/3/39/Tibia_Client_Background_Light.gif\');margin:0px 10px;position:relative;display:inline-block;width:112px;height:149px;border:1px black solid;}' +
    '#calculator_armor_body_main div {position:absolute; width:32px; height:32px;background:url(\'https://images.wikia.nocookie.net/tibia/en/images/b/b3/Set_Background.gif\');padding: 1px;}' +
    '#calculator_armor_body_main img {border:none;cursor:pointer;}' +
    '#calculator_armor_tt_items {display:none;z-index:999;position:absolute;width:auto;height:auto;background:#DDDDDD;border:1px black solid;padding:4px;}' +
    '</style>'
  );
/*Exp*/
(function () {
  $('#calculator_exp')
  .append('Level: ')
  .append('<input type="text" size="8" maxlength="4" id="calculator_expi1" value="1" />&nbsp;')
  .append($('<input type="button" value="-" />').click(function () { calculator_btn_m(this); })).append('&nbsp;')
  .append($('<input type="button" value="+" />').click(function () { calculator_btn_p(this); }))
  .append('<br /><br /><span id="calculator_expr1"></span>');
  $('#calculator_expi1').keyup(function () {
    if ($(this).val() === '') { $(this).val(1).select(); }
    var exp, lvl = Math.abs(parseInt($(this).val(), 10) || 1);
    $(this).val(lvl);
    exp = String((50 * Math.pow(lvl - 1, 3) - 150 * Math.pow(lvl - 1, 2) + 400 * (lvl - 1)) / 3);
    while ((/\d{4}/).test(exp)) { exp = exp.replace(/(\d{3},|\d{3}$)/, ',$1'); }
    $('#calculator_expr1').html('Experience for level ' + lvl + ': <b>' + exp + '</b>');
  });
  $('#calculator_expi1').keyup();
}());

/*Stats*/
(function () {
  var x, tmp = '',
  calculator_stats_voc = {'Druid': [5, 30, 10], 'Knight': [15, 5, 25], 'Paladin': [10, 15, 20], 'Sorcerer': [5, 30, 10], 'Rookstayer': [5, 5, 10]},//[hp, mana, cap]

  calculator_stats_update = function () {
    var x, lvl, rooklvl;
    for (x = 2; x <= 4; x++) {
      if ($('#calculator_statsi' + x).val() === '') { $('#calculator_statsi' + x).val(8).select(); }
      $('#calculator_statsi' + x).val(Math.abs(parseInt($('#calculator_statsi' + x).val(), 10) || 8));
    }
    lvl = parseInt($('#calculator_statsi2').val(), 10);
    rooklvl = parseInt($('#calculator_statsi3').val(), 10);
    x = calculator_stats_voc[$('#calculator_statsi1').val()][0];
    $('#calculator_statsr1').text(145 + (rooklvl * 5) + ((lvl - rooklvl) * x));
    x = calculator_stats_voc[$('#calculator_statsi1').val()][1];
    $('#calculator_statsr2').text(50 + (5 * Math.min(rooklvl, lvl)) + (Math.max(0, lvl - rooklvl) * x));
    x = calculator_stats_voc[$('#calculator_statsi1').val()][2];
    $('#calculator_statsr3').text(390 + (rooklvl * 10) + ((lvl - rooklvl) * x));
    $('#calculator_statsr4').text(220 + (2 * (lvl - 1)));
  };

  for (x in calculator_stats_voc) { if (calculator_stats_voc.hasOwnProperty(x)) { tmp += '<option value="' + x + '">' + x + '</option>'; } }
  $('#calculator_stats').html(
    '<table><tr>' +
    '<td class="text_align_right">Vocation:</td>' +
    '<td class="text_align_left"><select id="calculator_statsi1" size="1">' + tmp + '</select></td>' +
    '</tr><tr>' +
    '<td class="text_align_right">Target level:</td>' +
    '<td class="text_align_left"><input type="text" size="8" maxlength="4" id="calculator_statsi2" value="8" />&nbsp;<input type="button" value="-" />&nbsp;<input type="button" value="+" /></td>' +
    '</tr><tr>' +
    '<td class="text_align_right">Level on which <br />you left rookgard:</td>' +
    '<td class="text_align_left"><input type="text" size="8" maxlength="4" id="calculator_statsi3" value="8" />&nbsp;<input type="button" value="-" />&nbsp;<input type="button" value="+" /></td>' +
    '</tr><tr><td colspan="2">' +
    '<div id="calculator_statsrs"><img src="https://images.wikia.nocookie.net/tibia/en/images/5/55/Calculator_Stats.png" alt="Stats" />' +
    '<div id="calculator_statsr1"></div>' +
    '<div id="calculator_statsr2"></div>' +
    '<div id="calculator_statsr3"></div>' +
    '<div id="calculator_statsr4"></div>' +
    '</div>' +
    '</td></tr>' +
    '</table>'
  );

  $('#calculator_statsi2, #calculator_statsi3').keyup(calculator_stats_update)
  .next().click(function () {calculator_btn_m(this); calculator_stats_update(); })
  .next().click(function () {calculator_btn_p(this); calculator_stats_update(); });
  $('#calculator_statsi1').change(calculator_stats_update);
  calculator_stats_update();
}());

/*Loot*/
(function () {
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
  var calculator_loot_process2 = function () {
    var ucwords = function (str) {
/*jslint regexp: true */
      str = String(str).replace(/^(.)|\s(.)|-(.)/g, function ($1) { return $1.toUpperCase(); });
/*jslint regexp: false */
      return str.replace(/( To The | In The | Of The | Of A | Of A | On A | Of | The | From The | From | And )/, function ($1) { return $1.toLowerCase(); });
    },
    get_wiki_data = function () {
      var ret = {'npcnotes': {}}, x, p, i = 0,
      tdata = ['', '', '', ''],//npc, item, weight, value
      h = '|npc=Magic Shopkeeper NPCs|Empty Potion Flask|0|5' +
          '|npc=Banker NPCs|Gold Coin|0.1|1|Platinum Coin|0.1|100|Crystal Coin|0.1|10000' +
          ($('#calculator_loot_dpl').text());
      while (h.search(/\s\s/) !== -1) { h = h.replace(/\s\s/g, ' '); } h = h.replace(/npc\s*=\s*/g, 'npc='); p = h.split('|');
      for (x = 0; x < p.length; x++) { p[x] = $.trim(p[x]); }
      while (p[0] === '') { p = p.slice(1); }
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
        }
        else {
          tdata[i] = p[x];
          if (i === 3) {
            tdata[3] = (tdata[3].substr(0, 1) === '-' ? 0 : parseInt(tdata[3], 10));
/*jslint regexp: true */
            tdata[1] = tdata[1].replace(/</g, '');
/*jslint regexp: false */
            if (typeof ret[tdata[1]] === 'undefined' || ret[tdata[1]].npcvalue < tdata[3]) {
              ret[tdata[1]] = {'weight': parseFloat(tdata[2]), 'sellto': tdata[0], 'npcvalue': tdata[3]};
            }
            i = 0;
          }
        }
        i++;
      }
      return ret;
    },
    loot_to_singular = function (t) {
      var calculator_loot_p_words = {
        'Cookies': 'Cookie', 'Mushroom Pies' : 'Mushroom Pie', '*Pieces of *': 'Piece of ', '*Bundles of *': 'Bundle of ', '*Strands of *': 'Strand of ',
        '*Bunches of *': 'Bunch of ', '* Toes': ' Toe', '*Flasks of *': 'Flask of ', '* Teeth': ' Tooth',
        'Globs of *': 'Glob of ', 'Essences of *': 'Essence of ', 'Books of *': 'Book of ', 'Piles of *': 'Pile of ',
        'Lumps of *': 'Lump of ', '*Ears of *': 'Ear of ', '*s of Corruption': ' of Corruption', 'Sabreteeth': 'Sabretooth', 'Pools of Chitinous Glue': 'Pool of Chitinous Glue',
        'Scrolls of *': 'Scroll of ', '* Feet': ' Foot', '*s of a Deepling': ' of a Deepling', 'Eyes of *': 'Eye of ', 'Veins of *': 'Vein of ', 'Sights of Surrender\'s Eye': 'Sight of Surrender\'s Eye'
      },/*Exceptions*/
      calculator_loot_p_ends = {'she': 'sh', 'ie': 'y', 've': 'fe', 'oe': 'o', 'ze': 'z', 'che': 'ch', 'sse': 'ss'},/*Exceptions of endings (after removing the last 's')*/
      x, lastletter;
      for (x in calculator_loot_p_words) { if (calculator_loot_p_words.hasOwnProperty(x)) {
        if ((new RegExp('^' + x.replace(/\*/g, '.*?') + '$')).test(t)) { return t.replace(x.replace(/\*/g, ''), calculator_loot_p_words[x]); }
      } }
      lastletter = t.slice(t.length - 1);
      if (lastletter === 's') {
        t = t.slice(0, t.length - 1);/*remove the s*/
        lastletter = t.slice(t.length - 3);/*check last 3 letters*/
        if (typeof calculator_loot_p_ends[lastletter] !== 'undefined') { t = t.slice(0, t.length - 3) + calculator_loot_p_ends[lastletter]; }
        lastletter = t.slice(t.length - 2);/*check last 2 letters*/
        if (typeof calculator_loot_p_ends[lastletter] !== 'undefined') { t = t.slice(0, t.length - 2) + calculator_loot_p_ends[lastletter]; }
      }
      return t;
    },
    calculator_loot_pages_ex = {
      'Black Skull': 'Black Skull (Item)'
    },
    x, line, name, amount, tmp, data, data_items = {}, d = get_wiki_data(), skip, skiplist = [],
    totalsee = 0,
    calculator_loot_sum = function () {
      var tmp = 0, npcs = {}, npcso = [], x, npc, city, skipped = [], npc_note;
      $('.calculator_loot_includecb').each(function () { if ($(this).attr('checked')) {
        tmp += (Number($(this).parent().nextAll(':eq(3)').html().replace(/,/g, '')) || 0);
        npcs[data_items[$(this).parent().nextAll(':eq(1)').text()][2]] = 0;
      } });
      npcs = calculator_array_sort(npcs, false, true);
      for (npc in npcs) { if (npcs.hasOwnProperty(npc)) {
/*jslint regexp: true */
        city = npcs_locations.hasOwnProperty(npc) ? npcs_locations[npc].replace(/</g, '') : '?';
/*jslint regexp: false */
        npc_note = d.npcnotes.hasOwnProperty(npc);
        npcso.push(
          '<tr>' +
          (npc_note ? '<td style="border-bottom:none;">' : '<td>') + city + '</td>' +
          (npc_note ? '<td style="border-bottom:none;">' : '<td>') + '<a href="/wiki/' + encodeURIComponent(npc) + '">' + npc + '</a></td>' +
          '</tr>'+
          (npc_note ? '<tr><td colspan="2" style="border-top:none;">' + d.npcnotes[npc] + '</td></tr>' : '')
          );
      } }
      for (x in skiplist) { if (skiplist.hasOwnProperty(x)) { skipped.push('<tr><td><a href="/wiki/' + encodeURIComponent(skiplist[x].replace(/ /g, '_')) + '">' + encodeURIComponent(skiplist[x]).replace(/%20/g, ' ') + '</a></td></tr>'); } }
      npcso.sort();
      skipped.sort();
      $('#calculator_lootr2').html('<tbody><tr><th>City</th><th>NPC</th></tr></tbody><tbody id="calculator_lootr2a"><tr><th colspan="2">-</th></tr></tbody>');
      $('#calculator_lootr2a').html(npcso.join('') || '<tr><td>None</td></tr>');
      $('#calculator_lootr4').html(calculator_numcs(tmp) + ' gp');
      $('#calculator_lootr1').html(totalsee);
      $('#calculator_lootr5').html(skipped.join('') || '<tr><td>None</td></tr>');
    };
    data = $.trim($('#calculator_looti1').val()).split('\n');
    for (x in data) { if (data.hasOwnProperty(x)) {
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
        if (line.substr(line.length - 1) === '.') { line = line.substr(0, line.length - 1); }
        line = ucwords($.trim(line));//item name
        name = line;//For aliasing (black skull)
        if (amount === 0) {
          name = calculator_loot_pages_ex.hasOwnProperty(line) ? calculator_loot_pages_ex[line] : line;
          try {
            tmp = data[parseInt(x, 10) + 1].match(/weigh[s]? (\d{1,4}\.\d{1,2}) oz/);
            if (tmp === null) {
              tmp = data[parseInt(x, 10) + 2].match(/weigh[s]? (\d{1,4}\.\d{1,2}) oz/);
            }
          } catch (e) { tmp = null; }
          tmp = (tmp === null || tmp[1] === 'undefined' ? 0 : parseFloat(tmp[1]));
          if (typeof d[name] === 'undefined' || d[name].npcvalue === 0) { skiplist.push(line); skip = true; }//not in list or 0gp
          else {
            amount = Math.round(tmp / d[name].weight) || 0;
            if (amount === 0) { skiplist.push(line); alert(line + ' will be omitted, couldn\'t find the weight.'); skip = true; }
          }
        }
        else {
          line = line.substr(line.indexOf(' ') + 1);
          if (amount > 1) { line = loot_to_singular(line); }
          name = calculator_loot_pages_ex.hasOwnProperty(line) ? calculator_loot_pages_ex[line] : line;
        }
        if (!skip) {
          if (typeof d[name] === 'undefined' || d[name].npcvalue === 0) { skiplist.push(line); skip = true; }//not in list or 0 gp
        }
        if (!skip) {
        //Item is included
          totalsee++;
          if (typeof data_items[line] === 'undefined') {
            tmp = (!d[name].sellto.match(/You can return the/gi) && !d[name].sellto.match(/player/gi)) ? d[name].sellto : '';
            data_items[name] = [0, d[name].npcvalue, tmp];
          }//[name][amount, price, npc/'']
          data_items[name][0] += amount;
        }
      }
    } }

    data_items = calculator_array_sort(data_items, false, true);
    $('#calculator_lootr3').empty().append(
      $('<div />').css({'width': '45%', 'display': 'inline-block'}).append(
        '<table class="wikitable"><tr><th>Total NPC value:</th></tr><tr><td id="calculator_lootr4">0 gp</td></tr></table>'
      ),
      $('<div />').css({'width': '45%', 'display': 'inline-block'}).append(
        '<table class="wikitable"><tr><th>Total "looks"</th></tr><tr><td id="calculator_lootr1">-</td></tr></table>'
      ),
      '<table id="calculator_loot_table" class="wikitable sortable"><thead><tr><th class="unsortable">Sum<input type="checkbox" checked="checked" /></th><th>Amount</th><th>Item Name</th><th>Price</th><th>Total</th></tr></thead>' +
      '<tbody id="calculator_loot_tableb"></tbody>' +
      '</table>'
    );
    for (x in data_items) { if (data_items.hasOwnProperty(x)) {
      $('#calculator_loot_tableb').append(
        $('<tr></tr>', {'title': 'NPC that buys: ' + data_items[x][2]}).append(
          '<td><input type="checkbox" class="calculator_loot_includecb" checked="checked" /></td><td>' + data_items[x][0] + '</td>' +
          '<td><a href="/wiki/' + encodeURIComponent((calculator_loot_pages_ex.hasOwnProperty(x) ? calculator_loot_pages_ex[x] : x).replace(/ /g, '_')) + '">' + x + '</a></td>' +
          '<td>' + calculator_numcs(data_items[x][1]) + '</td><td>' + calculator_numcs(data_items[x][0] * data_items[x][1]) + '</td>'
        )
      );
    } }
    calculator_loot_sum();
    $('.calculator_loot_includecb').click(function () { calculator_loot_sum(); });
    $('#calculator_lootrc a, #calculator_lootr3 a').click(function () {window.open(this.href); return false; });
    $('#calculator_loot_table :checkbox:first').click(function () { $('#calculator_loot_table :checkbox').attr('checked', $(this).attr('checked')); calculator_loot_sum(); });
    $('#calculator_loot_tg1').hide(); $('#calculator_loot_tg2').show();
    try {
      mw.loader.using('jquery.tablesorter', function () {
        $('#calculator_loot_table').not('.jquery-tablesorter').tablesorter();
      });
    } catch (er) {}
  },
  calculator_loot_process = function () {
    if ($.trim($('#calculator_loot_dpl').text()) === '') {
      if (!$('#calculator_loot_blackout').size()) {
        $('body:first').append(
          $('<div>Loading items data</div>').attr('id', 'calculator_loot_blackout').css({
            'position': 'absolute', 'font-size': 'xx-large', 'font-weight': 'bolder', 'font-family': 'Arial', 'color': 'white', 'text-align': 'center', 'background-color': '#666666', 'z-index': '2'
          })
        );
      }
      var $cl = $('#calculator_loot');
      $('#calculator_loot_blackout').css({top: $cl.offset().top, left: $cl.offset().left, width: $cl.width(), height: $cl.height(), 'padding-top': $cl.css('padding-top'), 'padding-right': $cl.css('padding-right'), 'padding-bottom': $cl.css('padding-bottom'), 'padding-left': $cl.css('padding-left'), border: $cl.css('border')})
      .fadeTo('slow', 0.8);
      $.get('/index.php?title=Calculators/Lootdata&action=render', function (data) {/*For wiki*/
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
    }
    else { calculator_loot_process2(); }
  };

  $('#calculator_lootb1').click(function () { calculator_loot_process(); });
  $('#calculator_lootb2').click(function () { $('#calculator_looti1').val(''); });
  $('#calculator_lootb3').click(function () {
    $('#calculator_loot_tg2').hide(); $('#calculator_loot_tg1').show();
    $('#calculator_lootb2').click();
  });
}());

/*Armor*/
(function () {
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
    '  <div style="top:91px;left:2px;"><img id="calculator_armor_body_ring" alt="" src="" width="32" height="32" /></div>' +
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
    '  <tr><td><input type="radio" value="death" name="calculator_armor_items_sort" />Death</td><td></td></tr></table>' +
    '</td><td style="width:115px;">' +
    '  <b>Damage type:</b><br /><select id="calculator_armor_damage_type" size="1"><option value="physical" selected="selected">Physical</option><option value="fire">Fire</option><option value="earth">Earth</option><option value="energy">Energy</option><option value="ice">Ice</option><option value="holy">Holy</option><option value="death">Death</option></select>' +
    '  <br /><br />' +
    '  <b>Show items for:</b><br />' +
    '  <select id="calculator_armor_voc" size="1"><option value="0">All</option><option value="1" selected="selected">Druid</option><option value="2">Knight</option>  <option value="4">Paladin</option><option value="8">Sorcerer</option></select>' +
    '  <br /><br />' +
    '  <input type="checkbox" value="1" id="calculator_armor_np" /> Show non <br />protective items' +

    '</td><td style="width:179px;">' +
    '  Required Level: <span id="calculator_armor_req_level">None</span><br />' +
    '  Needed Cap: <span id="calculator_armor_set_oz">0.00 oz</span><br />' +
    '  Total Armor: <span id="calculator_armor_set_arm">0</span><br />' +
    '  <span id="calculator_armor_set_prot">Physical protection: 0%</span>' +
    '</td></tr></table>' +
    '<table id="calculator_armor_damages" class="wikitable">' +
    '<tr><th>Hit with <span id="calculator_armor_damage_type_ind">Physical</span></th><td>10</td><td>20</td><td>50</td><td>100</td><td>200</td><td>300</td><td>400</td><td>800</td><td><input type="text" id="calculator_armor_custom_damage" value="100" size="5" maxlength="4" /></td></tr>' +
    '<tr><th>Will hit</th><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>' +
    '</table>'
  );
  var calculator_armor_parts_names = ['amulet', 'ring', 'helmet', 'armor', 'legs', 'boots', 'shield'],
  calculator_armor_names_parts = {'amulet': 0, 'ring': 1, 'helmet': 2, 'armor': 3, 'legs': 4, 'boots': 5, 'shield': 6},
  calculator_armor_get_link_for_name = function (item, part) {
    var r = $('#calculator_armor_list_' + calculator_armor_parts_names[part] + '_img img').filter(function () {
      var a = $(this).attr('src').split('/');
      return (decodeURIComponent(a[7]) === decodeURIComponent(item.replace(/ /g, '_') + '.gif') ? true : false);
    }).first().attr('src');
    return r;
  },
  get_items_data = function (name) {
    var part = calculator_armor_names_parts[name],
    ret = {}, x, p, h = $('#calculator_armor_list_' + name).html().replace(/<p>/gi, '').replace(/<\/p>/gi, ''),
    get_vocation_number = function (t) {
      t = t.toLowerCase();
      return (t.match(/druid/i) ? 1 : 0) + (t.match(/knight/i) ? 2 : 0) + (t.match(/paladin/i) ? 4 : 0) + (t.match(/sorcerer/i) ? 8 : 0);
    };
    while (h.search(/\s\s/) !== -1) { h = h.replace(/\s\s/g, ' '); }
    h = h.replace(/\s/g, ' ');
    p = h.split('|');
    for (x in p) { if (p.hasOwnProperty(x)) { p[x] = $.trim(p[x]); } }
    while (p[0] === '') { p = p.slice(1); }
    for (x = 0; x < p.length; x = x + 8) {
/*jslint regexp: true */
      ret[p[x].toLowerCase()] = {
        name: p[x], def: (parseInt(p[x + 1], 10) || 0), arm: (parseInt(p[x + 2], 10) || 0), oz: parseFloat(p[x + 3]) || 0,
        att: $.trim(p[x + 4].replace(/none\.?/gi, '').replace(/<a.*?>(.*?)<\/a>/gi, '$1').replace(/</g, '')),
        resist: {
          physical: (parseInt((' ' + p[x + 5]).split(/physical/i)[1], 10) || 0), fire: (parseInt((' ' + p[x + 5]).split(/fire/i)[1], 10) || 0),
          earth: (parseInt((' ' + p[x + 5]).split(/earth/i)[1], 10) || 0), energy: (parseInt((' ' + p[x + 5]).split(/energy/i)[1], 10) || 0),
          ice: (parseInt((' ' + p[x + 5]).split(/ice/i)[1], 10) || 0), holy: (parseInt((' ' + p[x + 5]).split(/holy/i)[1], 10) || 0),
          death: (parseInt((' ' + p[x + 5]).split(/death/i)[1], 10) || 0)
        },
        lvl: (parseInt(p[x + 6], 10) || 0),
        voc: get_vocation_number(p[x + 7]), ur: calculator_armor_get_link_for_name(p[x], part)
      };
/*jslint regexp: false */
    }
    x = 'No' + name.slice(0, 1).toUpperCase() + name.slice(1);
    ret[x.toLowerCase()] = {name: x, def: 0, arm: 0, oz: 0, att: '', lvl: 0, voc: 0, resist: {physical: 0, fire: 0, earth: 0, energy: 0, ice: 0, holy: 0, death: 0} };
    ret[x.toLowerCase()].ur = calculator_armor_get_link_for_name(x, part);
    $('#calculator_armor_body_' + calculator_armor_parts_names[part]).attr('src', ret[x.toLowerCase()].ur);
    return ret;
  },
  calculator_armor_items_data = [get_items_data('amulet'), get_items_data('ring'), get_items_data('helmet'), get_items_data('armor'), get_items_data('legs'), get_items_data('boots'), get_items_data('shield')],
  calculator_armor_vocv = 1,
  calculator_armor_current_part = 0,

  calculator_armor_template_translate = {'helmet': 'head', 'armor': 'torso', 'boots': 'feet', 'amulet': 'neck', 'ring': 'ring', 'legs': 'legs', 'shield': 'lefthand', 'righthand': 'righthand', 'shoulders': 'shoulders', 'belt': 'belt'},
  calculator_armor_items_sorted,
  calculator_armor_do_items_sorted = function (part, key) {
    if (typeof key === 'undefined') { key = $('[name=calculator_armor_items_sort]:checked').val(); }
    calculator_armor_items_sorted = calculator_armor_items_data[part];
    if (key === 'name') { calculator_armor_items_sorted = calculator_array_sort(calculator_armor_items_sorted, false, true); }
    else { calculator_armor_items_sorted = calculator_array_sort(calculator_armor_items_sorted, false, false, true, key); }
  },
  calculator_armor_calculate = function (update_links) {
    var x, $links = $(), tmp, tmpa = [],
    dmg_type = $('#calculator_armor_damage_type :selected').text(),
    min_val = [], max_val = [],
    calculate_damage = function (total_arm, damage, prot) {
      var r1 = 0, r2 = 0, r3; damage = parseInt(damage, 10);
      if ($('#calculator_armor_damage_type').val() === 'physical') {
/*jslint unparam: true */
        $.each(prot, function (i, v) { damage = parseInt(((100 - v) / 100) * damage, 10); });
/*jslint unparam: false */
        r1 += (total_arm < 2 ? total_arm : Math.floor(total_arm / 2));
        r2 += (total_arm < 2 ? total_arm : (total_arm % 2 === 0 ? total_arm - 1 : total_arm - 2));
        r1 = r1 > damage ? damage : r1; r2 = r2 > damage ? damage : r2;
        r3 = (r2 + r1) / 2;
        // min/max (avg)
        return Math.max(0, damage - r2) + '/' + Math.max(0, damage - r1) + ' (' + Math.max(0, damage - r3) + ')';
      }
      r1 = damage;
/*jslint unparam: true */
      $.each(prot, function (i, v) { r1 = parseInt(((100 - v) / 100) * r1, 10); });
/*jslint unparam: false */
      return r1;
    };
    if (typeof update_links === 'undefined') { update_links = true; }
    if (update_links) {
      $('#calculator_armor_links').empty();
      for (x = 0; x < calculator_armor_parts_names.length; x++) {
        tmpa = $('#calculator_armor_body_' + calculator_armor_parts_names[x]).attr('src').split(/\//);
        tmpa = tmpa[7].split(/\./);
        tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
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
      $links.not(':last').each(function () { $('#calculator_armor_links').append($(this), '<br />'); });
      $('#calculator_armor_links').append($links.last());
      $('#calculator_armor_links a').click(function () { window.open(this.href); return false; });
    }
    $('#calculator_armor_links, #calculator_armor_compare th').each(function () {
      var x, lvl = 0, oz = 0, arm = 0, dmg_prot = [], tmp = '', tmpa = [], $link, $this = $(this);
      for (x = 0; x < calculator_armor_parts_names.length; x++) {
        $link = $this.children('a[title="' + calculator_armor_parts_names[x] + '"]');
        if ($link.size()) {
          tmpa = $link.attr('href').split(/\//);
          tmp = decodeURIComponent(tmpa[tmpa.length - 1].replace(/_/g, ' ').toLowerCase());
          if (calculator_armor_items_data[x].hasOwnProperty(tmp)) {
            arm += calculator_armor_items_data[x][tmp].arm;
            oz += calculator_armor_items_data[x][tmp].oz;
            lvl = (calculator_armor_items_data[x][tmp].lvl > lvl ? calculator_armor_items_data[x][tmp].lvl : lvl);
            if ((tmp = calculator_armor_items_data[x][tmp].resist[dmg_type.toLowerCase()]) !== 0) { dmg_prot.push(tmp); }
          }
        }
      }
      lvl = lvl || 'None';
      oz = String(oz); oz = oz + (oz.match(/\.\d\d/) ? '' : (oz.match(/\.\d/) ? '0' : '.00')) + ' oz';
      tmpa = []; for (x = 0; x < dmg_prot.length; x++) { tmpa.push(dmg_prot[x] + '%'); }
      tmp = dmg_type + ' protection:<br />' + (!tmpa.length ? '0%' : tmpa.join(', '));
      if ($(this).is('div')) {
        $('#calculator_armor_req_level').html(lvl);
        $('#calculator_armor_set_oz').html(oz);
        $('#calculator_armor_set_arm').html(arm);
        $('#calculator_armor_set_prot').html(tmp);
        $('#calculator_armor_damages tr:eq(1) td').text(function (i) {
          if (i !== 8) { return calculate_damage(arm, $('#calculator_armor_damages tr:eq(0) td:eq(' + i + ')').text(), dmg_prot); }
          return calculate_damage(arm, $('#calculator_armor_damages input').val(), dmg_prot);
        });
      }
      else {
        $(this).attr('title',
          'Required Level: ' + lvl + ' - Needed Cap: ' + oz +
          ' - Total Armor: ' + arm + ' - ' + tmp.replace(/<br \/>/, ' ')
        );
        $(this).nextAll('td').text(function (i) {
          if (i !== 8) { return calculate_damage(arm, $('#calculator_armor_damages tr:eq(0) td:eq(' + i + ')').text(), dmg_prot); }
          return calculate_damage(arm, $('#calculator_armor_damages input').val(), dmg_prot);
        });
      }
    });
    if (!update_links) {
      if ($('#calculator_armor_compare tr').size() > 1) {
        $('#calculator_armor_compare tr').each(function () {
          $(this).children('td').each(function (col) {
            var tmp = $(this).text().match(/\([\d\.]+\)/), val;
            if (tmp === null) { tmp = $(this).text().match(/[\d\.]+/); }
            val = parseFloat(tmp[0].replace(/[\(\)]/g, ''), 10);
            min_val[col] = typeof min_val[col] === 'undefined' ? val : Math.min(min_val[col], val);
            max_val[col] = typeof max_val[col] === 'undefined' ? val : Math.max(max_val[col], val);
          });
        });
        $('#calculator_armor_compare tr').each(function () {
          $(this).children('td').each(function (col) {
            var tmp = $(this).text().match(/\([\d\.]+\)/), val;
            if (tmp === null) { tmp = $(this).text().match(/[\d\.]+/); }
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
      }
      else { $('#calculator_armor_compare tr td').css('background-color', 'transparent'); }
    }
  },
  calculator_armor_tt_html = function (d) {
    var arm_att_resist, att_resist, oz, x, voc_lvl = [], resist = [];
    for (x in d.resist) { if (d.resist.hasOwnProperty(x)) {
      if (d.resist[x] !== 0) { resist.push(x + ' ' + (d.resist[x] > 0 ? '+' : '') + d.resist[x] + '%'); }
    } }
    resist = resist.length ? 'protection ' + resist.join(', ') : '';
    if (d.voc & 1) { voc_lvl.push('druids'); } if (d.voc & 2) { voc_lvl.push('knights'); }
    if (d.voc & 4) { voc_lvl.push('paladins'); } if (d.voc & 8) { voc_lvl.push('sorcerers'); }
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
  $('#calculator_armor_damage_type').change(function () {
    $('[name=calculator_armor_items_sort][value=' + $('#calculator_armor_damage_type').val() + ']').attr('checked', 'checked');
    $('#calculator_armor_damage_type_ind').text($('#calculator_armor_damage_type :selected').text());
    $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
    calculator_armor_calculate(false);
  });

  $('#calculator_armor_voc').change(function () {
    var need_clear = false;
    $.each(calculator_armor_parts_names, function (i, v) {
      var tmpa = $('#calculator_armor_body_' + v).attr('src').split(/\//), tmp;
      tmpa = tmpa[tmpa.length - 1].split(/\./);
      tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
      if (calculator_armor_items_data[i].hasOwnProperty(tmp)) {
        if (calculator_armor_items_data[i][tmp].voc !== 0 && !(calculator_armor_items_data[i][tmp].voc & parseInt($('#calculator_armor_voc').val(), 10))) { need_clear = true; return false; }
      }
    });
    if (need_clear) {
      if (confirm('This will reset the set, continue?')) {
        $.each(calculator_armor_parts_names, function (i, v) {
          var x = 'No' + v.slice(0, 1).toUpperCase() + v.slice(1);
          $('#calculator_armor_body_' + v).attr('src', calculator_armor_get_link_for_name(x, i)).attr('alt', '');
        });
        calculator_armor_vocv = parseInt($('#calculator_armor_voc').val(), 10);
      }
      else { $('#calculator_armor_voc').val(calculator_armor_vocv); }
    }
    else { calculator_armor_vocv = parseInt($('#calculator_armor_voc').val(), 10); }
    $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click();
    calculator_armor_calculate();
  });


  $('#calculator_armor_custom_damage').keyup(function () {
    $(this).val(parseInt($(this).val(), 10) || 0);
    if ($(this).val() === '0') { $(this).select(); }
    calculator_armor_calculate(false);
  });

  $('#calculator_armor_body_main img').click(function () {
    var tmp, x, y, t = parseInt(calculator_armor_names_parts[$(this).attr('id').split('_')[3]], 10);
    calculator_armor_current_part = t; calculator_armor_do_items_sorted(calculator_armor_current_part);
    $('#calculator_armor_items_div').html('');
    for (x in calculator_armor_items_sorted) { if (calculator_armor_items_sorted.hasOwnProperty(x)) {
      tmp = true; for (y in calculator_armor_items_sorted[x].resist) { if (calculator_armor_items_sorted[x].resist.hasOwnProperty(y)) {
        if (calculator_armor_items_sorted[x].resist[y] !== 0) { tmp = false; break; }
      } }
      if (
         (('no' + calculator_armor_parts_names[t] === x.toLowerCase()) || $('#calculator_armor_np').is(':checked') || !tmp || calculator_armor_items_sorted[x].arm !== 0) &&
         (calculator_armor_items_sorted[x].voc === 0 || calculator_armor_vocv === 0 || (calculator_armor_items_sorted[x].voc & calculator_armor_vocv))
      ) {
        $('#calculator_armor_items_div').append(
          $('<img class="item_img" ' + 'src="' + calculator_armor_items_sorted[x].ur + '" ' +
            'alt="' + calculator_armor_items_sorted[x].name + '" ' +
            'width="32" height="32" />'));
      }
      } }
    $('.item_img').css('cursor', 'pointer')
    .click(function () {
      if ($('#calculator_armor_code_div').is(':visible')) { $('#calculator_armor_code_toggle').click(); }
      $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).attr('src', $(this).attr('src')).attr('alt', $(this).attr('alt'));
      calculator_armor_calculate();
    })
    .mousemove(function (e) {
      if ($(this).attr('alt') === '') { return; }
      var tmpa = $(this).attr('src').split(/\//), tmp, t;
      tmpa = tmpa[7].split(/\./);
      tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
      t = calculator_armor_items_data[calculator_armor_current_part][tmp];
      $('#calculator_armor_tt_items').show().css({top: (e.pageY + 20) + 'px', left: (e.pageX + 10) + 'px'}).html(calculator_armor_tt_html(t));
    })
    .mouseout(function () { $('#calculator_armor_tt_items').hide(); });
    if ($('#calculator_armor_tt_items').size() === 0) {
      $('body:eq(0)').append($('<div id="calculator_armor_tt_items">&nbsp;</div>'));
    }
  })
  .mousemove(function (e) {
    if ($(this).attr('alt') === '') { return; }
    var tmpa = $(this).attr('src').split(/\//), tmp, t;
    tmpa = tmpa[tmpa.length - 1].split(/\./);
    tmp = decodeURIComponent(tmpa[0].replace(/_/g, ' ').toLowerCase());
    t = calculator_armor_items_data[calculator_armor_names_parts[$(this).attr('id').split('_')[3]]][tmp];
    $('#calculator_armor_tt_items').show().css({top: (e.pageY + 20) + 'px', left: (e.pageX + 10) + 'px'}).html(calculator_armor_tt_html(t));
  })
  .mouseout(function () { $('#calculator_armor_tt_items').hide(); });

  $('#calculator_armor_np').click(function () { $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click(); });
  $('[name=calculator_armor_items_sort]').click(function () { $('#calculator_armor_body_' + calculator_armor_parts_names[calculator_armor_current_part]).click(); });


  $('#calculator_armor_body_helmet').click();
  calculator_armor_calculate();

  $('#calculator_armor_links').after(
    '<hr />Code for your ',
    (wgUserName ?
      $('<a href="http://tibia.wikia.com/wiki/User:' + wgUserName + '?action=edit">user page</a>').click(function () {
        window.open($(this).attr('href')); return false;
      }) :
      'user page'
    ),
    ' ',
    $('<input type="button" id="calculator_armor_code_toggle" value="Show" />').toggle(function () {
      var calculator_armor_template = '{{Equips_Set';
/*jslint unparam: true */
      $.each(calculator_armor_parts_names.concat(['righthand', 'shoulders', 'belt']), function (i, v) {
        calculator_armor_template += '\n  |' + calculator_armor_template_translate[v] + '=' + ($('#calculator_armor_body_' + v).attr('alt') || 'None');
      });
/*jslint unparam: false */
      calculator_armor_template += '\n}}';
      if ($('#calculator_armor_code_div').size() < 1) {
        $(this).after(
          $('<div />', {'id': 'calculator_armor_code_div'}).append(
            $('<textarea />', {'id': 'calculator_armor_code', 'rows': '12', 'cols': '30'}).click(function () { $(this).select(); })
          ).css('display', 'none')
        );
      }
      $('#calculator_armor_code').val(calculator_armor_template).parent().slideDown(200, function () { $('#calculator_armor_code_toggle').val('Hide'); });
    }, function () {
      $('#calculator_armor_code_div').slideUp(200, function () { $('#calculator_armor_code_toggle').val('Show'); });
    }),
    '<hr />Add set to ',
    $('<input />', {'type': 'button', 'value': 'compare'}).click(function () {
      var set_text = [], already_on_list = false;
      if ($('#calculator_armor_links a').size() > 0) {
        $('#calculator_armor_links a').each(function () { set_text.push($(this).html()); });
        if ($('#calculator_armor_compare').size() === 0) {
          $('#calculator_armor_damages').after($('<table>', {'id': 'calculator_armor_compare', 'class': 'wikitable'}));
        }
        $('#calculator_armor_compare th').each(function () {
          if ($(this).children('a').text() === $('#calculator_armor_links').children('a').text()) {
            already_on_list = true;
            return false;
          }
        });
        if (already_on_list) { alert('This set is already on the list.'); }
        else {
          $('#calculator_armor_compare').append(
            $('<tr>').append(
              $('<th>').append(
                $('<input>', {'type': 'button', 'value': 'Load this set'}).click(function () {
                  var $td = $(this).parent();
                  $.each(calculator_armor_parts_names, function (i, v) {
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
                  calculator_armor_calculate();
                }),
                ' ',
                $('<div>').css({'cursor': 'pointer', 'display': 'inline-block'}).text('x').click(function () {
                  $(this).closest('tr').remove();
                  calculator_armor_calculate(false);
                }),
                $('<input>', {'type': 'hidden', 'value': $('#calculator_armor_voc').val()}),
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
  /*General*/
  $('#calculators_loading').hide();
  $('#calculators_container').show();
}());
//</pre>
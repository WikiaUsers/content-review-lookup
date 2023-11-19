var settings = {
	'default': '==Licensing==\n{{Fairuse}}',
	_PRIORITY: 1,
	preloads: 
	[
        {
            name: 'Map Location',
			preload: 
			'==Summary==\n'+
			'{{Map Image\n'+
				'|region   = $(2)$\n'+
				'|location = $(1)$\n'+
				'|type     = \n'+
				'|update   = \n'+
			'}}\n'+
			'\n'+
			'==Licensing==\n'+
			'{{Fairuse}}',
			fillin: [
				/* Fontaine */
				{ values: [ 'Abandoned Laboratory Lower Ruins', 'Fontaine' ], name: 'Abandoned Laboratory Lower Ruins, Fontaine', reference: '[[File:Abandoned Laboratory Lower Ruins Map Template.png|200px]]' },
                { values: [ 'Abandoned Laboratory Ruins', 'Fontaine' ], name: 'Abandoned Laboratory Ruins, Fontaine', reference: '[[File:Abandoned Laboratory Ruins Map Template.png|200px]]' },
                { values: [ 'Abandoned Laboratory Upper Water Area', 'Fontaine' ], name: 'Abandoned Laboratory Upper Water Area, Fontaine', reference: '[[File:Abandoned Laboratory Upper Water Area Map Template.png|200px]]' },
                { values: [ 'After Escaping the Convoluted Corridor', 'Fontaine' ], name: 'After Escaping the Convoluted Corridor, Fontaine', reference: '[[File:After Escaping the Convoluted Corridor Map Template.png|200px]]' },
                { values: [ 'Annapausis', 'Fontaine' ], name: 'Annapausis, Fontaine', reference: '[[File:Annapausis Map Template.png|200px]]' },
                { values: [ 'Belleau Region (North)', 'Fontaine' ], name: 'Belleau Region (North), Fontaine', reference: '[[File:Belleau Region (North) Map Template.png|200px]]' },
                { values: [ 'Belleau Region (South)', 'Fontaine' ], name: 'Belleau Region (South), Fontaine', reference: '[[File:Belleau Region (South) Map Template.png|200px]]' },
                { values: [ 'Beryl Region (Center)', 'Fontaine' ], name: 'Beryl Region (Center), Fontaine', reference: '[[File:Beryl Region (Center) Map Template.png|200px]]' },
                { values: [ 'Beryl Region (South)', 'Fontaine' ], name: 'Beryl Region (South), Fontaine', reference: '[[File:Beryl Region (South) Map Template.png|200px]]' },
                { values: [ 'Bravais\' Hidden Study', 'Fontaine' ], name: 'Bravais\' Hidden Study, Fontaine', reference: '[[File:Bravais\' Hidden Study Map Template.png|200px]]' },
                { values: [ 'Central Laboratory Ruins', 'Fontaine' ], name: 'Central Laboratory Ruins, Fontaine', reference: '[[File:Central Laboratory Ruins Map Template.png|200px]]' },
                { values: [ 'Chemin de L\'Espoir', 'Fontaine' ], name: 'Chemin de L\'Espoir, Fontaine', reference: '[[File:Chemin de L\'Espoir Map Template.png|200px]]' },
                { values: [ 'Convoluted Corridor at the Top of the Tall Tower', 'Fontaine' ], name: 'Convoluted Corridor at the Top of the Tall Tower, Fontaine', reference: '[[File:Convoluted Corridor at the Top of the Tall Tower Map Template.png|200px]]' },
                { values: [ 'Court of Fontaine', 'Fontaine' ], name: 'Court of Fontaine, Fontaine', reference: '[[File:Court of Fontaine Map Template.png|200px]]' },
                { values: [ 'Court of Fontaine Region (East)', 'Fontaine' ], name: 'Court of Fontaine Region (East), Fontaine', reference: '[[File:Court of Fontaine Region (East) Map Template.png|200px]]' },
                { values: [ 'Court of Fontaine Region (West)', 'Fontaine' ], name: 'Court of Fontaine Region (West), Fontaine', reference: '[[File:Court of Fontaine Region (West) Map Template.png|200px]]' },
                { values: [ 'Elton Trench', 'Fontaine' ], name: 'Elton Trench, Fontaine', reference: '[[File:Elton Trench Map Template.png|200px]]' },
                { values: [ 'Elynas', 'Fontaine' ], name: 'Elynas, Fontaine', reference: '[[File:Elynas Map Template.png|200px]]' },
                { values: [ 'Erinnyes Forest (East)', 'Fontaine' ], name: 'Erinnyes Forest (East), Fontaine', reference: '[[File:Erinnyes Forest (East) Map Template.png|200px]]' },
                { values: [ 'Erinnyes Forest (North)', 'Fontaine' ], name: 'Erinnyes Forest (North), Fontaine', reference: '[[File:Erinnyes Forest (North) Map Template.png|200px]]' },
                { values: [ 'Erinnyes Forest (South)', 'Fontaine' ], name: 'Erinnyes Forest (South), Fontaine', reference: '[[File:Erinnyes Forest (South) Map Template.png|200px]]' },
                { values: [ 'Fleuve Cendre', 'Fontaine' ], name: 'Fleuve Cendre, Fontaine', reference: '[[File:Fleuve Cendre Map Template.png|200px]]' },
                { values: [ 'Fontaine Research Institute of Kinetic Energy Engineering Region (North)', 'Fontaine' ], name: 'Fontaine Research Institute of Kinetic Energy Engineering Region (North), Fontaine', reference: '[[File:Fontaine Research Institute of Kinetic Energy Engineering Region (North) Map Template.png|200px]]' },
                { values: [ 'Fontaine Research Institute of Kinetic Energy Engineering Region (North-East)', 'Fontaine' ], name: 'Fontaine Research Institute of Kinetic Energy Engineering Region (North-East), Fontaine', reference: '[[File:Fontaine Research Institute of Kinetic Energy Engineering Region (North-East) Map Template.png|200px]]' },
                { values: [ 'Fontaine Research Institute of Kinetic Energy Engineering Region (South)', 'Fontaine' ], name: 'Fontaine Research Institute of Kinetic Energy Engineering Region (South), Fontaine', reference: '[[File:Fontaine Research Institute of Kinetic Energy Engineering Region (South) Map Template.png|200px]]' },
                { values: [ 'Fontaine Research Institute of Kinetic Energy Engineering Region (South-East)', 'Fontaine' ], name: 'Fontaine Research Institute of Kinetic Energy Engineering Region (South-East), Fontaine', reference: '[[File:Fontaine Research Institute of Kinetic Energy Engineering Region (South-East) Map Template.png|200px]]' },
                { values: [ 'Fortress of Meropide Abandoned Production Zone', 'Fontaine' ], name: 'Fortress of Meropide Abandoned Production Zone, Fontaine', reference: '[[File:Fortress of Meropide Abandoned Production Zone Map Template.png|200px]]' },
                { values: [ 'Fortress of Meropide Administrative Area', 'Fontaine' ], name: 'Fortress of Meropide Administrative Area, Fontaine', reference: '[[File:Fortress of Meropide Administrative Area Map Template.png|200px]]' },
                { values: [ 'Fortress of Meropide Dormitory Block', 'Fontaine' ], name: 'Fortress of Meropide Dormitory Block, Fontaine', reference: '[[File:Fortress of Meropide Dormitory Block Map Template.png|200px]]' },
                { values: [ 'Fortress of Meropide Production Zone Lower Level', 'Fontaine' ], name: 'Fortress of Meropide Production Zone Lower Level, Fontaine', reference: '[[File:Fortress of Meropide Production Zone Lower Level Map Template.png|200px]]' },
                { values: [ 'Fortress of Meropide Production Zone Upper Level', 'Fontaine' ], name: 'Fortress of Meropide Production Zone Upper Level, Fontaine', reference: '[[File:Fortress of Meropide Production Zone Upper Level Map Template.png|200px]]' },
                { values: [ 'Fortress of Meropide Reception Area', 'Fontaine' ], name: 'Fortress of Meropide Reception Area, Fontaine', reference: '[[File:Fortress of Meropide Reception Area Map Template.png|200px]]' },
                { values: [ 'Hydrological Data Central Processing Station', 'Fontaine' ], name: 'Hydrological Data Central Processing Station, Fontaine', reference: '[[File:Hydrological Data Central Processing Station Map Template.png|200px]]' },
                { values: [ 'Kuisel\'s Clockwork Workshop Entrance', 'Fontaine' ], name: 'Kuisel\'s Clockwork Workshop Entrance, Fontaine', reference: '[[File:Kuisel\'s Clockwork Workshop Entrance Map Template.png|200px]]' },
                { values: [ 'Kuisel\'s Clockwork Workshop Lower Level', 'Fontaine' ], name: 'Kuisel\'s Clockwork Workshop Lower Level, Fontaine', reference: '[[File:Kuisel\'s Clockwork Workshop Lower Level Map Template.png|200px]]' },
                { values: [ 'Kuisel\'s Clockwork Workshop Middle Level', 'Fontaine' ], name: 'Kuisel\'s Clockwork Workshop Middle Level, Fontaine', reference: '[[File:Kuisel\'s Clockwork Workshop Middle Level Map Template.png|200px]]' },
                { values: [ 'Liffey Region (North-East)', 'Fontaine' ], name: 'Liffey Region (North-East), Fontaine', reference: '[[File:Liffey Region (North-East) Map Template.png|200px]]' },
                { values: [ 'Liffey Region (North-West)', 'Fontaine' ], name: 'Liffey Region (North-West), Fontaine', reference: '[[File:Liffey Region (North-West) Map Template.png|200px]]' },
                { values: [ 'Liffey Region (South-East)', 'Fontaine' ], name: 'Liffey Region (South-East), Fontaine', reference: '[[File:Liffey Region (South-East) Map Template.png|200px]]' },
                { values: [ 'Liffey Region (South-West)', 'Fontaine' ], name: 'Liffey Region (South-West), Fontaine', reference: '[[File:Liffey Region (South-West) Map Template.png|200px]]' },
                { values: [ 'Lumidouce Harbor', 'Fontaine' ], name: 'Lumidouce Harbor, Fontaine', reference: '[[File:Lumidouce Harbor Map Template.png|200px]]' },
                { values: [ 'Morte Region', 'Fontaine' ], name: 'Morte Region, Fontaine', reference: '[[File:Morte Region Map Template.png|200px]]' },
                { values: [ 'Poisson', 'Fontaine' ], name: 'Poisson, Fontaine', reference: '[[File:Poisson Map Template.png|200px]]' },
                { values: [ 'River Talionis', 'Fontaine' ], name: 'River Talionis, Fontaine', reference: '[[File:River Talionis Map Template.png|200px]]' },
                { values: [ 'Romaritime Harbor', 'Fontaine' ], name: 'Romaritime Harbor, Fontaine', reference: '[[File:Romaritime Harbor Map Template.png|200px]]' },
                { values: [ 'Salacia Plain', 'Fontaine' ], name: 'Salacia Plain, Fontaine', reference: '[[File:Salacia Plain Map Template.png|200px]]' },
                { values: [ 'Scorching Cave Lower Level', 'Fontaine' ], name: 'Scorching Cave Lower Level, Fontaine', reference: '[[File:Scorching Cave Lower Level Map Template.png|200px]]' },
                { values: [ 'Scorching Cave Upper Level', 'Fontaine' ], name: 'Scorching Cave Upper Level, Fontaine', reference: '[[File:Scorching Cave Upper Level Map Template.png|200px]]' },
                { values: [ 'Shipwreck', 'Fontaine' ], name: 'Shipwreck, Fontaine', reference: '[[File:Shipwreck Map Template.png|200px]]' },
                { values: [ 'Source of All Waters The Great Fontaine Lake (Center)', 'Fontaine' ], name: 'Source of All Waters The Great Fontaine Lake (Center), Fontaine', reference: '[[File:Source of All Waters The Great Fontaine Lake (Center) Map Template.png|200px]]' },
                { values: [ 'Source of All Waters The Great Fontaine Lake (East)', 'Fontaine' ], name: 'Source of All Waters The Great Fontaine Lake (East), Fontaine', reference: '[[File:Source of All Waters The Great Fontaine Lake (East) Map Template.png|200px]]' },
                { values: [ 'Source of All Waters The Great Fontaine Lake (North)', 'Fontaine' ], name: 'Source of All Waters The Great Fontaine Lake (North), Fontaine', reference: '[[File:Source of All Waters The Great Fontaine Lake (North) Map Template.png|200px]]' },
                { values: [ 'Submerged Ruins Central Quartier', 'Fontaine' ], name: 'Submerged Ruins Central Quartier, Fontaine', reference: '[[File:Submerged Ruins Central Quartier Map Template.png|200px]]' },
                { values: [ 'Submerged Ruins Northern Quartier', 'Fontaine' ], name: 'Submerged Ruins Northern Quartier, Fontaine', reference: '[[File:Submerged Ruins Northern Quartier Map Template.png|200px]]' },
                { values: [ 'Submerged Ruins Outskirts', 'Fontaine' ], name: 'Submerged Ruins Outskirts, Fontaine', reference: '[[File:Submerged Ruins Outskirts Map Template.png|200px]]' },
                { values: [ 'Submerged Stony Path', 'Fontaine' ], name: 'Submerged Stony Path, Fontaine', reference: '[[File:Submerged Stony Path Map Template.png|200px]]' },
                { values: [ 'Thalatta Submarine Canyon', 'Fontaine' ], name: 'Thalatta Submarine Canyon, Fontaine', reference: '[[File:Thalatta Submarine Canyon Map Template.png|200px]]' },
                { values: [ 'The Court of the Millennial Pearl Seahorse', 'Fontaine' ], name: 'The Court of the Millennial Pearl Seahorse, Fontaine', reference: '[[File:The Court of the Millennial Pearl Seahorse Map Template.png|200px]]' },
                { values: [ 'Throne of Emperor of Fire and Iron', 'Fontaine' ], name: 'Throne of Emperor of Fire and Iron, Fontaine', reference: '[[File:Throne of Emperor of Fire and Iron Map Template.png|200px]]' },
                { values: [ 'Underwater Cave', 'Fontaine' ], name: 'Underwater Cave, Fontaine', reference: '[[File:Underwater Cave Map Template.png|200px]]' },
                { values: [ 'Within Elynas (Lower)', 'Fontaine' ], name: 'Within Elynas (Lower), Fontaine', reference: '[[File:Within Elynas (Lower) Map Template.png|200px]]' },
                { values: [ 'Within Elynas (Upper)', 'Fontaine' ], name: 'Within Elynas (Upper), Fontaine', reference: '[[File:Within Elynas (Upper) Map Template.png|200px]]' },
				/* Sumeru */
				{ values: ['Aaru Village', 'Sumeru'], name: 'Aaru Village, Sumeru', reference: '[[File:Aaru Village Map Template.png|200px]]' },
				{ values: ['Apam Woods', 'Sumeru'], name: 'Apam Woods, Sumeru', reference: '[[File:Apam Woods Map Template.png|200px]]' },
				{ values: ['Apep\'s Resort', 'Sumeru'], name: 'Apep\'s Resort, Sumeru', reference: '[[File:Apep\'s Resort Map Template.png|200px]]' },
				{ values: ['Ardravi Valley', 'Sumeru'], name: 'Ardravi Valley, Sumeru', reference: '[[File:Ardravi Valley Map Template.png|200px]]' },
				{ values: ['Ashavan Realm (North)', 'Sumeru'], name: 'Ashavan Realm (North), Sumeru', reference: '[[File:Ashavan Realm (North) Map Template.png|200px]]' },
				{ values: ['Ashavan Realm (South-East)', 'Sumeru'], name: 'Ashavan Realm (South-East), Sumeru', reference: '[[File:Ashavan Realm (South-East) Map Template.png|200px]]' },
				{ values: ['Ashavan Realm (South-West)', 'Sumeru'], name: 'Ashavan Realm (South-West), Sumeru', reference: '[[File:Ashavan Realm (South-West) Map Template.png|200px]]' },
				{ values: ['Ashavan Realm (West)', 'Sumeru'], name: 'Ashavan Realm (West), Sumeru', reference: '[[File:Ashavan Realm (West) Map Template.png|200px]]' },
				{ values: ['Caravan Ribat', 'Sumeru'], name: 'Caravan Ribat, Sumeru', reference: '[[File:Caravan Ribat Map Template.png|200px]]' },
				{ values: ['Chatrakam Cave', 'Sumeru'], name: 'Chatrakam Cave, Sumeru', reference: '[[File:Chatrakam Cave Map Template.png|200px]]' },
				{ values: ['Chemin Oublie', 'Sumeru'], name: 'Chemin Oublie, Sumeru', reference: '[[File:Chemin Oublie Map Template.png|200px]]' },
				{ values: ['Desert of Hadramaveth (East)', 'Sumeru'], name: 'Desert of Hadramaveth (East), Sumeru', reference: '[[File:Desert of Hadramaveth (East) Map Template.png|200px]]' },
				{ values: ['Desert of Hadramaveth (North)', 'Sumeru'], name: 'Desert of Hadramaveth (North), Sumeru', reference: '[[File:Desert of Hadramaveth (North) Map Template.png|200px]]' },
				{ values: ['Desert of Hadramaveth (North-East)', 'Sumeru'], name: 'Desert of Hadramaveth (North-East), Sumeru', reference: '[[File:Desert of Hadramaveth (North-East) Map Template.png|200px]]' },
				{ values: ['Desert of Hadramaveth (South)', 'Sumeru'], name: 'Desert of Hadramaveth (South), Sumeru', reference: '[[File:Desert of Hadramaveth (South) Map Template.png|200px]]' },
				{ values: ['Desert of Hadramaveth (West)', 'Sumeru'], name: 'Desert of Hadramaveth (West), Sumeru', reference: '[[File:Desert of Hadramaveth (West) Map Template.png|200px]]' },
				{ values: ['Desert of Hadramaveth', 'Sumeru'], name: 'Desert of Hadramaveth, Sumeru', reference: '[[File:Desert of Hadramaveth Map Template.png|200px]]' },
				{ values: ['Devantaka Mountain', 'Sumeru'], name: 'Devantaka Mountain, Sumeru', reference: '[[File:Devantaka Mountain Map Template.png|200px]]' },
				{ values: ['Gandha Hill', 'Sumeru'], name: 'Gandha Hill, Sumeru', reference: '[[File:Gandha Hill Map Template.png|200px]]' },
				{ values: ['Gandharva Ville', 'Sumeru'], name: 'Gandharva Ville, Sumeru', reference: '[[File:Gandharva Ville Map Template.png|200px]]' },
				{ values: ['Gate of Zulqarnain Subterranean Defile', 'Sumeru'], name: 'Gate of Zulqarnain Subterranean Defile, Sumeru', reference: '[[File:Gate of Zulqarnain Subterranean Defile Map Template.png|200px]]' },
				{ values: ['Gavireh Lajavard', 'Sumeru'], name: 'Gavireh Lajavard, Sumeru', reference: '[[File:Gavireh Lajavard Map Template.png|200px]]' },
				{ values: ['Girdle of the Sands (South)', 'Sumeru'], name: 'Girdle of the Sands (South), Sumeru', reference: '[[File:Girdle of the Sands (South) Map Template.png|200px]]' },
				{ values: ['Hangeh Afrasiyab Lower Level', 'Sumeru'], name: 'Hangeh Afrasiyab Lower Level, Sumeru', reference: '[[File:Hangeh Afrasiyab Lower Level Map Template.png|200px]]' },
				{ values: ['Hangeh Afrasiyab Upper Level', 'Sumeru'], name: 'Hangeh Afrasiyab Upper Level, Sumeru', reference: '[[File:Hangeh Afrasiyab Upper Level Map Template.png|200px]]' },
				{ values: ['Harvisptokhm & Amrita Pool', 'Sumeru'], name: 'Harvisptokhm & Amrita Pool, Sumeru', reference: '[[File:Harvisptokhm & Amrita Pool Map Template.png|200px]]' },
				{ values: ['Hypostyle Desert', 'Sumeru'], name: 'Hypostyle Desert, Sumeru', reference: '[[File:Hypostyle Desert Map Template.png|200px]]' },
				{ values: ['Land of Lower Setekh', 'Sumeru'], name: 'Land of Lower Setekh, Sumeru', reference: '[[File:Land of Lower Setekh Map Template.png|200px]]' },
				{ values: ['Land of Upper Setekh', 'Sumeru'], name: 'Land of Upper Setekh, Sumeru', reference: '[[File:Land of Upper Setekh Map Template.png|200px]]' },
				{ values: ['Madinat al-Nuhas Lower Level', 'Sumeru'], name: 'Madinat al-Nuhas Lower Level, Sumeru', reference: '[[File:Madinat al-Nuhas Lower Level Map Template.png|200px]]' },
				{ values: ['Madinat al-Nuhas Upper Level', 'Sumeru'], name: 'Madinat al-Nuhas Upper Level, Sumeru', reference: '[[File:Madinat al-Nuhas Upper Level Map Template.png|200px]]' },
				{ values: ['Mawtiyima Forest', 'Sumeru'], name: 'Mawtiyima Forest, Sumeru', reference: '[[File:Mawtiyima Forest Map Template.png|200px]]' },
				{ values: ['Old Vanarana', 'Sumeru'], name: 'Old Vanarana, Sumeru', reference: '[[File:Old Vanarana Map Template.png|200px]]' },
				{ values: ['Pardis Dhyai', 'Sumeru'], name: 'Pardis Dhyai, Sumeru', reference: '[[File:Pardis Dhyai Map Template.png|200px]]' },
				{ values: ['Port Ormos', 'Sumeru'], name: 'Port Ormos, Sumeru', reference: '[[File:Port Ormos Map Template.png|200px]]' },
				{ values: ['Realm of Farakhkert (North)', 'Sumeru'], name: 'Realm of Farakhkert (North), Sumeru', reference: '[[File:Realm of Farakhkert (North) Map Template.png|200px]]' },
				{ values: ['Realm of Farakhkert', 'Sumeru'], name: 'Realm of Farakhkert, Sumeru', reference: '[[File:Realm of Farakhkert Map Template.png|200px]]' },
				{ values: ['Samudra Coast', 'Sumeru'], name: 'Samudra Coast, Sumeru', reference: '[[File:Samudra Coast Map Template.png|200px]]' },
				{ values: ['Sumeru City', 'Sumeru'], name: 'Sumeru City, Sumeru', reference: '[[File:Sumeru City Map Template.png|200px]]' },
				{ values: ['The Palace of Alcazarzaray', 'Sumeru'], name: 'The Palace of Alcazarzaray, Sumeru', reference: '[[File:The Palace of Alcazarzaray Map Template.png|200px]]' },
				{ values: ['Vimara Village', 'Sumeru'], name: 'Vimara Village, Sumeru', reference: '[[File:Vimara Village Map Template.png|200px]]' },
				{ values: ['Vissudha Field (West)', 'Sumeru'], name: 'Vissudha Field (West), Sumeru', reference: '[[File:Vissudha Field (West) Map Template.png|200px]]' },
				{ values: ['Vissudha Field', 'Sumeru'], name: 'Vissudha Field, Sumeru', reference: '[[File:Vissudha Field Map Template.png|200px]]' },
				/* Inazuma */
				{ values: ['Fort Mumei', 'Inazuma'], name: 'Fort Mumei, Inazuma', reference: '[[File:Fort Mumei Map Template.png|200px]]' },
				{ values: ['Inazuma City', 'Inazuma'], name: 'Inazuma City, Inazuma', reference: '[[File:Inazuma City Map Template.png|200px]]' },
				{ values: ['Jakotsu Mine (South)', 'Inazuma'], name: 'Jakotsu Mine (South), Inazuma', reference: '[[File:Jakotsu Mine (South) Map Template.png|200px]]' },
				{ values: ['Jinren Island', 'Inazuma'], name: 'Jinren Island, Inazuma', reference: '[[File:Jinren Island Map Template.png|200px]]' },
				{ values: ['Kannazuka', 'Inazuma'], name: 'Kannazuka, Inazuma', reference: '[[File:Kannazuka Map Template.png|200px]]' },
				{ values: ['Kujou Encampment', 'Inazuma'], name: 'Kujou Encampment, Inazuma', reference: '[[File:Kujou Encampment Map Template.png|200px]]' },
				{ values: ['Minor Narukami Islands', 'Inazuma'], name: 'Minor Narukami Islands, Inazuma', reference: '[[File:Minor Narukami Islands Map Template.png|200px]]' },
				{ values: ['Minor Ritou Islands', 'Inazuma'], name: 'Minor Ritou Islands, Inazuma', reference: '[[File:Minor Ritou Islands Map Template.png|200px]]' },
				{ values: ['Moshiri Kara', 'Inazuma'], name: 'Moshiri Kara, Inazuma', reference: '[[File:Moshiri Kara Map Template.png|200px]]' },
				{ values: ['Narukami Island (Middle) - Amakane Island, Byakko Plain, Konda Village', 'Inazuma'], name: 'Narukami Island (Middle) - Amakane Island, Byakko Plain, Konda Village, Inazuma', reference: '[[File:Narukami Island (Middle) - Amakane Island, Byakko Plain, Konda Village Map Template.png|200px]]' },
				{ values: ['Narukami Island (North)', 'Inazuma'], name: 'Narukami Island (North), Inazuma', reference: '[[File:Narukami Island (North) Map Template.png|200px]]' },
				{ values: ['Nazuchi Beach', 'Inazuma'], name: 'Nazuchi Beach, Inazuma', reference: '[[File:Nazuchi Beach Map Template.png|200px]]' },
				{ values: ['Ritou', 'Inazuma'], name: 'Ritou, Inazuma', reference: '[[File:Ritou Map Template.png|200px]]' },
				{ values: ['Seirai Island', 'Inazuma'], name: 'Seirai Island, Inazuma', reference: '[[File:Seirai Island Map Template.png|200px]]' },
				{ values: ['Tatarasuna', 'Inazuma'], name: 'Tatarasuna, Inazuma', reference: '[[File:Tatarasuna Map Template.png|200px]]' },
				{ values: ['Tsurumi Island', 'Inazuma'], name: 'Tsurumi Island, Inazuma', reference: '[[File:Tsurumi Island Map Template.png|200px]]' },
				{ values: ['Tsurumi Island Ruins', 'Inazuma'], name: 'Tsurumi Island Ruins, Inazuma', reference: '[[File:Tsurumi Island Ruins Map Template.png|200px]]' },
				{ values: ['Violet Court', 'Inazuma'], name: 'Violet Court, Inazuma', reference: '[[File:Violet Court Map Template.png|200px]]' },
				{ values: ['Watatsumi Island', 'Inazuma'], name: 'Watatsumi Island, Inazuma', reference: '[[File:Watatsumi Island Map Template.png|200px]]' },
				{ values: ['Yashiori Island', 'Inazuma'], name: 'Yashiori Island, Inazuma', reference: '[[File:Yashiori Island Map Template.png|200px]]' },
				{ values: ['Dainichi Mikoshi', 'Enkanomiya'], name: 'Dainichi Mikoshi, Enkanomiya', reference: '[[File:Dainichi Mikoshi Map Template.png|200px]]' },
				{ values: ['Evernight Temple', 'Enkanomiya'], name: 'Evernight Temple, Enkanomiya', reference: '[[File:Evernight Temple Map Template.png|200px]]' },
				{ values: ['Kunado\'s Locus', 'Enkanomiya'], name: 'Kunado\'s Locus, Enkanomiya', reference: '[[File:Kunado\'s Locus Map Template.png|200px]]' },
				{ values: ['Serpent\'s Bowels', 'Enkanomiya'], name: 'Serpent\'s Bowels, Enkanomiya', reference: '[[File:Serpent\'s Bowels Map Template.png|200px]]' },
				{ values: ['The Narrows', 'Enkanomiya'], name: 'The Narrows, Enkanomiya', reference: '[[File:The Narrows Map Template.png|200px]]' },
				{ values: ['The Serpent\'s Heart', 'Enkanomiya'], name: 'The Serpent\'s Heart, Enkanomiya', reference: '[[File:The Serpent\'s Heart Map Template.png|200px]]' },
				{ values: ['Vishap Research Lab', 'Enkanomiya'], name: 'Vishap Research Lab, Enkanomiya', reference: '[[File:Vishap Research Lab Map Template.png|200px]]' },
				{ values: ['Yachimatahiko\'s Locus', 'Enkanomiya'], name: 'Yachimatahiko\'s Locus, Enkanomiya', reference: '[[File:Yachimatahiko\'s Locus Map Template.png|200px]]' },
				{ values: ['Yachimatahime\'s Locus', 'Enkanomiya'], name: 'Yachimatahime\'s Locus, Enkanomiya', reference: '[[File:Yachimatahime\'s Locus Map Template.png|200px]]' },
				/* Liyue */
				{ values: ['Bishui Plain', 'Liyue'], name: 'Bishui Plain, Liyue', reference: '[[File:Bishui Plain Map Template.png|200px]]' },
				{ values: ['Dihua Marsh', 'Liyue'], name: 'Dihua Marsh, Liyue', reference: '[[File:Dihua Marsh Map Template.png|200px]]' },
				{ values: ['Guili Plains', 'Liyue'], name: 'Guili Plains, Liyue', reference: '[[File:Guili Plains Map Template.png|200px]]' },
				{ values: ['Guyun Stone Forest', 'Liyue'], name: 'Guyun Stone Forest, Liyue', reference: '[[File:Guyun Stone Forest Map Template.png|200px]]' },
				{ values: ['Lisha', 'Liyue'], name: 'Lisha, Liyue', reference: '[[File:Lisha Map Template.png|200px]]' },
				{ values: ['Liyue Harbor 1', 'Liyue'], name: 'Liyue Harbor 1, Liyue', reference: '[[File:Liyue Harbor 1 Map Template.png|200px]]' },
				{ values: ['Liyue Harbor 2', 'Liyue'], name: 'Liyue Harbor 2, Liyue', reference: '[[File:Liyue Harbor 2 Map Template.png|200px]]' },
				{ values: ['Liyue Harbor', 'Liyue'], name: 'Liyue Harbor, Liyue', reference: '[[File:Liyue Harbor Map Template.png|200px]]' },
				{ values: ['Luhua Pool', 'Liyue'], name: 'Luhua Pool, Liyue', reference: '[[File:Luhua Pool Map Template.png|200px]]' },
				{ values: ['Mingyun Village', 'Liyue'], name: 'Mingyun Village, Liyue', reference: '[[File:Mingyun Village Map Template.png|200px]]' },
				{ values: ['Minlin (East)', 'Liyue'], name: 'Minlin (East), Liyue', reference: '[[File:Minlin (East) Map Template.png|200px]]' },
				{ values: ['Minlin', 'Liyue'], name: 'Minlin, Liyue', reference: '[[File:Minlin Map Template.png|200px]]' },
				{ values: ['Mt. Tianheng', 'Liyue'], name: 'Mt. Tianheng, Liyue', reference: '[[File:Mt. Tianheng Map Template.png|200px]]' },
				{ values: ['Qingce Village', 'Liyue'], name: 'Qingce Village, Liyue', reference: '[[File:Qingce Village Map Template.png|200px]]' },
				{ values: ['Sal Terrae', 'Liyue'], name: 'Sal Terrae, Liyue', reference: '[[File:Sal Terrae Map Template.png|200px]]' },
				{ values: ['Sea of Clouds (North)', 'Liyue'], name: 'Sea of Clouds (North), Liyue', reference: '[[File:Sea of Clouds (North) Map Template.png|200px]]' },
				{ values: ['Sea of Clouds (South)', 'Liyue'], name: 'Sea of Clouds (South), Liyue', reference: '[[File:Sea of Clouds (South) Map Template.png|200px]]' },
				{ values: ['Stone Gate', 'Liyue'], name: 'Stone Gate, Liyue', reference: '[[File:Stone Gate Map Template.png|200px]]' },
				{ values: ['The Chasm', 'Liyue'], name: 'The Chasm, Liyue', reference: '[[File:The Chasm Map Template.png|200px]]' },
				{ values: ['Tianqiu Valley', 'Liyue'], name: 'Tianqiu Valley, Liyue', reference: '[[File:Tianqiu Valley Map Template.png|200px]]' },
				{ values: ['Wangshu Inn', 'Liyue'], name: 'Wangshu Inn, Liyue', reference: '[[File:Wangshu Inn Map Template.png|200px]]' },
				{ values: ['Wuwang Hill', 'Liyue'], name: 'Wuwang Hill, Liyue', reference: '[[File:Wuwang Hill Map Template.png|200px]]' },
				{ values: ['Court of Pillars', 'The Chasm'], name: 'Court of Pillars, The Chasm', reference: '[[File:Court of Pillars Map Template.png|200px]]' },
				{ values: ['Glowing Narrows, Nameless Ruins, Stony Halls', 'The Chasm'], name: 'Glowing Narrows, Nameless Ruins, Stony Halls, The Chasm', reference: '[[File:Glowing Narrows, Nameless Ruins, Stony Halls Map Template.png|200px]]' },
				{ values: ['Main Mining Area', 'The Chasm'], name: 'Main Mining Area, The Chasm', reference: '[[File:Main Mining Area Map Template.png|200px]]' },
				{ values: ['Underground Waterway', 'The Chasm'], name: 'Underground Waterway, The Chasm', reference: '[[File:Underground Waterway Map Template.png|200px]]' },
				/* Mondstadt */
				{ values: ['Brightcrown Canyon', 'Mondstadt'], name: 'Brightcrown Canyon, Mondstadt', reference: '[[File:Brightcrown Canyon Map Template.png|200px]]' },
				{ values: ['Cape Oath', 'Mondstadt'], name: 'Cape Oath, Mondstadt', reference: '[[File:Cape Oath Map Template.png|200px]]' },
				{ values: ['Cider Lake', 'Mondstadt'], name: 'Cider Lake, Mondstadt', reference: '[[File:Cider Lake Map Template.png|200px]]' },
				{ values: ['Dadaupa Gorge', 'Mondstadt'], name: 'Dadaupa Gorge, Mondstadt', reference: '[[File:Dadaupa Gorge Map Template.png|200px]]' },
				{ values: ['Dawn Winery', 'Mondstadt'], name: 'Dawn Winery, Mondstadt', reference: '[[File:Dawn Winery Map Template.png|200px]]' },
				{ values: ['Dragonspine', 'Mondstadt'], name: 'Dragonspine, Mondstadt', reference: '[[File:Dragonspine Map Template.png|200px]]' },
				{ values: ['Mondstadt (City)', 'Mondstadt'], name: 'Mondstadt (City), Mondstadt', reference: '[[File:Mondstadt (City) Map Template.png|200px]]' },
				{ values: ['Musk Reef', 'Mondstadt'], name: 'Musk Reef, Mondstadt', reference: '[[File:Musk Reef Map Template.png|200px]]' },
				{ values: ['Springvale', 'Mondstadt'], name: 'Springvale, Mondstadt', reference: '[[File:Springvale Map Template.png|200px]]' },
				{ values: ['Starfell Lake', 'Mondstadt'], name: 'Starfell Lake, Mondstadt', reference: '[[File:Starfell Lake Map Template.png|200px]]' },
				{ values: ['Starsnatch Cliff & Thousand Winds', 'Mondstadt'], name: 'Starsnatch Cliff & Thousand Winds, Mondstadt', reference: '[[File:Starsnatch Cliff & Thousand Winds Map Template.png|200px]]' },
				{ values: ['Stormbearer Mountains', 'Mondstadt'], name: 'Stormbearer Mountains, Mondstadt', reference: '[[File:Stormbearer Mountains Map Template.png|200px]]' },
				{ values: ['Stormbearer Point', 'Mondstadt'], name: 'Stormbearer Point, Mondstadt', reference: '[[File:Stormbearer Point Map Template.png|200px]]' },
				{ values: ['Stormterror\'s Lair', 'Mondstadt'], name: 'Stormterror\'s Lair, Mondstadt', reference: '[[File:Stormterror\'s Lair Map Template.png|200px]]' },
				{ values: ['Whispering Woods', 'Mondstadt'], name: 'Whispering Woods, Mondstadt', reference: '[[File:Whispering Woods Map Template.png|200px]]' },
				{ values: ['Windrise & Falcon Coast', 'Mondstadt'], name: 'Windrise & Falcon Coast, Mondstadt', reference: '[[File:Windrise & Falcon Coast Map Template.png|200px]]' },
				{ values: ['Wolvendom', 'Mondstadt'], name: 'Wolvendom, Mondstadt', reference: '[[File:Wolvendom Map Template.png|200px]]' },
				/* Events */
				{ values: ['Broken Isle', 'Golden Apple Archipelago'], name: 'Broken Isle, Golden Apple Archipelago', reference: '[[File:Broken Isle Map Template.png|200px]]' },
				{ values: ['Minacious Isle', 'Golden Apple Archipelago'], name: 'Minacious Isle, Golden Apple Archipelago', reference: '[[File:Minacious Isle Map Template.png|200px]]' },
				{ values: ['Pudding Isle', 'Golden Apple Archipelago'], name: 'Pudding Isle, Golden Apple Archipelago', reference: '[[File:Pudding Isle Map Template.png|200px]]' },
				{ values: ['Twinning Isle Central Platform', 'Golden Apple Archipelago'], name: 'Twinning Isle Central Platform, Golden Apple Archipelago', reference: '[[File:Twinning Isle Central Platform Map Template.png|200px]]' },
				{ values: ['Twinning Isle', 'Golden Apple Archipelago'], name: 'Twinning Isle, Golden Apple Archipelago', reference: '[[File:Twinning Isle Map Template.png|200px]]' },
				{ values: ['Overgrown Valley (East)', 'Veluriyam Mirage'], name: 'Overgrown Valley (East), Veluriyam Mirage', reference: '[[File:Overgrown Valley (East) Map Template.png|200px]]' },
				{ values: ['Overgrown Valley (East) Underground', 'Veluriyam Mirage'], name: 'Overgrown Valley (East) Underground, Veluriyam Mirage', reference: '[[File:Overgrown Valley (East) Underground Map Template.png|200px]]' },
				{ values: ['Overgrown Valley', 'Veluriyam Mirage'], name: 'Overgrown Valley, Veluriyam Mirage', reference: '[[File:Overgrown Valley Map Template.png|200px]]' },
				{ values: ['Overgrown Valley Underground', 'Veluriyam Mirage'], name: 'Overgrown Valley Underground, Veluriyam Mirage', reference: '[[File:Overgrown Valley Underground Map Template.png|200px]]' },
				{ values: ['Pavilion of Hermits', 'Veluriyam Mirage'], name: 'Pavilion of Hermits, Veluriyam Mirage', reference: '[[File:Pavilion of Hermits Map Template.png|200px]]' },
				{ values: ['Silver Bottle Courtyard (West)', 'Veluriyam Mirage'], name: 'Silver Bottle Courtyard (West), Veluriyam Mirage', reference: '[[File:Silver Bottle Courtyard (West) Map Template.png|200px]]' },
				{ values: ['Silver Bottle Courtyard (West) Underground', 'Veluriyam Mirage'], name: 'Silver Bottle Courtyard (West) Underground, Veluriyam Mirage', reference: '[[File:Silver Bottle Courtyard (West) Underground Map Template.png|200px]]' },
				{ values: ['Silver Bottle Courtyard', 'Veluriyam Mirage'], name: 'Silver Bottle Courtyard, Veluriyam Mirage', reference: '[[File:Silver Bottle Courtyard Map Template.png|200px]]' },
				{ values: ['Thinkers\' Theater', 'Veluriyam Mirage'], name: 'Thinkers\' Theater, Veluriyam Mirage', reference: '[[File:Thinkers\' Theater Map Template.png|200px]]' },
				{ values: ['Veluriyam Mirage (East)', 'Veluriyam Mirage'], name: 'Veluriyam Mirage (East), Veluriyam Mirage', reference: '[[File:Veluriyam Mirage (East) Map Template.png|200px]]' },
			]
        },
        {
            name: 'HEOs',
            header: true
        },
        {
            name: 'HEO Images',
            preload: '==Summary==\n{{File\n|category     = HEO Images\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'HEO Location Context',
            preload: '==Summary==\n{{File\n|category     = HEO Location Context\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Items',
            header: true
        },
        {
            name: 'Item Location Context',
            preload: '==Summary==\n{{File\n|category     = Item Location Context\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Items in the Wild',
            preload: '==Summary==\n{{File\n|category     = Items in the Wild\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'NPCs',
            header: true
        },
        {
            name: 'NPC Location Context',
            preload: '==Summary==\n{{File\n|category     = NPC Location Context\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'NPCs In-Game',
            preload: '==Summary==\n{{File\n|category     = NPCs In-Game\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Quests',
            header: true
        },
        {
            name: 'Quest Detail Images',
            preload: '==Summary==\n{{File\n|category     = Quest Detail Images\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Quest Images',
            preload: '==Summary==\n{{File\n|category     = Quest Images\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Others',
            header: true
        },
        {
            name: 'Achievement Location Context',
            preload: '==Summary==\n{{File\n|category     = Achievement Location Context\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Location Images',
            preload: '==Summary==\n{{File\n|category     = Location Images\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Web Event Screenshots',
            preload: '==Summary==\n{{File\n|category     = Web Event Screenshots\n}}\n\n==Licensing==\n{{Fairuse}}'
        },
        {
            name: 'Official Media',
            preload: '==Summary==\n{{File\n|category     = Official Media\n|characters    = \n|date          = \n|sourcelink    = \n|sourcelabel    = \n|description   = \n}}\n\n==Licensing==\n{{Fairuse}}'
        },
	]
};
mw.hook('dev.BetterUpload').fire(settings);
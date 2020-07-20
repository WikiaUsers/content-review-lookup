// Kod JS odpowiedzialny za Quiz
window.quizName = 'Quiz — Gothic';
window.quizLang = 'pl';
window.resultsTextArray = [
	'Poszło kiepsko. Czas odświeżyć swoją wiedzę z Gothika!',
	'Nie jest źle, ale mogłoby być lepiej! Może czas odświeżyć sobie serię Gothic?',
	'Masz większość poprawnych odpowiedzi, brawo!',
	'Gratuluję, twoja wiedza o Gothiku jest godna naśladowania!'
];
var questions = [
	['Jak się nazywa postać, z którą Bezimienny rozmawia na początku Gothic 3?',
		'Nie ma takiej postaci. Gra się zaczyna walką',
		'Xardas',
		'Diego',
		'Ivy',
		'Saturas'
	],
	['Kto zlecił zamach na Estebana?',
		'Fisk',
		'Cavalorn',
		'Dexter',
		'Huno',
		'Żaden z powyższych'
	],
	['Jaka jest najpotężniejsza istota, z którą staje do walki Bezimienny?',
		'Śniący',
		'Beliar',
		'Wrzód',
		'Bestia (Gothic 3: Zmierzch Bogów)',
		'Smok Ożywieniec'
	],
	['Kto może zrobić dla Bezimiennego zbroję z pancerzy pełzaczy w Gothic?',
		'Wilk',
		'Lares',
		'Buster',
		'Stone',
		'Diego'
	],
	['Jak ma na imię prawdziwa matka Pasterza z Feshyr?',
		'Nie wiadomo',
		'Alma',
		'Ivy',
		'Velaya',
		'Nadja'
	],
	['Kto jest przywódcą Nemory?',
		'Russel',
		'Treslott',
		'Cole',
		'Tyler',
		'Kippler'
	],
	['Gdzie leży południowa świątynia Beliara?',
		'Nie wiadomo',
		'W Bakareshu',
		'Na Argaan',
		'W Khorinis',
		'Na wyspie Irdorath'
	],
	['Której osoby Bezimienny nie może zabrać na Esmeraldę?',
		'Harada',
		'Benneta',
		'Mario',
		'Miltena',
		'Torlofa'
	],
	['Kto okazuje się być zdrajcą na Dworze Irdorath?',
		'Mario',
		'Lester',
		'Bennet',
		'Lares',
		'Lee'
	],
	['Ile kosztuje broń, którą Bezimienny może kupić od Harada po zostaniu paladynem?',
		'2000 sztuk złota',
		'1500 bryłek rudy',
		'1500 sztuk złota',
		'2500 sztuk złota',
		'1000 sztuk złota'
	],
	['Jak ma na imię właściciel „Betty”?',
		'Skinner',
		'Diego',
		'Huno',
		'Snaf',
		'Thorus'
	],
	['Jak nazywa się narzeczony Jilvie?',
		'Ricklen',
		'Hertan',
		'Renwick',
		'Gilthor',
		'Mermund'
	],
	['Jedyny znany wytwórca Szkarawudy to...',
		'Melog',
		'Irrigh',
		'Morrigh',
		'Lester',
		'Cor Kalom'
	],
	['Czego chce od Bezimiennego Sibur Narad?',
		'Skór lodowych wilków',
		'Pazura topielca',
		'Paczki ziela',
		'2000 sztuk złota',
		'Wódy'
	],
	['W którym roku powstało Piranha Bytes?',
		'1997',
		'1995',
		'1996',
		'1998',
		'1999'
	],
	['Kto jest założycielem Gothicpedii?',
		'Masiq',
		'RuthlessChimpanzee (MarkosBoss)',
		'Paskudnik',
		'Light22',
		'Lord of Pain Duriel'
	]
];

// Importy
importArticle({
	type: 'script',
	article: 'u:dev:MediaWiki:Quiz/code.js'
});
importArticle({
	type: 'style',
	article: 'MediaWiki:Quiz.css'
});
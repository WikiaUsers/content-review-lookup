var quizName = "Teste o seu conhecimento do Duolingo";
var quizLang = "en";
var resultsTextArray = [
	"Tu podes fazer melhor que isso!",
	"Estas a melhorar mais ainda não es um Duolinguist",
	"És um Duolinguist experiente",
	"Tu és um perito de Duolingo",
	];
        var questions = [
		
	["O que aconteceu no dia 9th of October 2013?",
	"A incubadora de idiomas",
	"A loja lingot foi criada",
	"Hackathon"],
	
	["Quanto é que o Duolingo custa?",
	"É de borla!",
	"$10",
	"€50",
	"£1",
	"R10"],
	
	["Duolingo ensina varios idiomas",
	"Verdade",
	"Falso"],
	
	["Quem criou o Duolingo?",
	"Luis von Ahn, e Severin Hacker",
	"Mark Zuckerberg",
	"Don Juan ",
	"Bill gates"],

	["Duolingo é ",
	"Um serviço de aprendizagem de idiomas e de tradução",
	"Um jogo",
	"Um filme"],
	
	["O que podes fazer na Imersão?",
	"Traduzir e ler textos",
	"Ler textos",
	"Nenhuma das outras respostas"],
	
	["Qual é o mascote do Duolingo?",
	"Duo",
	"Uma formiga",
	"Um urso",
	"Um penguim"],
		
        ["Quais são as invenções mais famosas do Luis von Ahn?",
        "Captcha, e Duolingo ",
	"Captcha",
	"Duolingo"],	

        ["Onde podes comprar unidades bonus? ",
        "Na loja virtual",
	"No supermarcado",
	"No mercado"],	

        ["Qual foi o primeiro curso criado por voluntarios?",
        "Inglês para Russos",
        "Inglês para Espanhois",
        "Inglês para Holandeses"],
        

        ["Qual foi o primeiro curso criado pela incubadora?",
        "Inglês para Alemães",
        "Inglês para Russos",
        "Inglês para Espanhois",
        "Inglês para Holandeses"],

        ["Qual destes frases é uma das mais populares do Duolingo?",
        "Yo soy un pingüino.",
        "I eat mutton",
        "Je ne sais pas"],

         ["Qual foi o terceiro presente do natal?",
        "Unidades bonus",
        "Inglês para Russos",
        "Treinador Duo"]
];

importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
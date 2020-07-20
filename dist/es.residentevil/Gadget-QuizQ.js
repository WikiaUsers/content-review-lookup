var quizName = "Resident Evil Wiki Quiz";
var quizLang = "es";
var resultsTextArray = [
        "Rango D: Tus conocimientos sobre Resident Evil son muy bajos.",
	"Rango C: Puedes mejorar, sigue aprendiendo. Hay muchos artículos en la Wiki que te ayudarán a mejorar.",
	"Rango B: Aún no demuestras ser superior, pero eres mejor que otros.",
	"Rango A: Eres bastante conocedor, se nota que examinas casi todo.",
	"Rango S: ¡Vaya! Eres casi un experto, dudo que muchos hayan llegado a este punto. ¿Lo puedes hacer solo un poco mejor?",
        "Rango SS: ¡Increíble! ¿Qué a caso eres un fan del 96? Has llegado a lo más alto. ¿Qué se siente ser tan conocedor? ¡Felicidades!"
	];
var questions = [
 
	["¿Cuál de estos niños no era parte del Proyecto Wesker?",
       "Ricky",
       "Marco",
       "Felicia", 
       "Derek"],
 
	["¿Cuál de estos personajes sufrió de amnesia?",
	"Ark Thompson",
	"Lott Klein",
	"Bruce McGivern",
	"Piers Nivans"],

	["¿Qué tiene Sheva Alomar en su brazo izquierdo?",
	"Un tatuaje", 
	"Una herida", 
	"Una cicatriz",
	"Un protector"],

        ["A la unidad del R.P.D. de la que Leon es parte en RE2 se le conoce como:",
	"R.P.D. Select Police Force", 
	"Special Tactics And Rescue Squad", 
	"Special Select Team",
	"R.P.D. Squad"],

        ["Moonlight Sonata compuesta por Beethoven es parte del OST de:",
	"Resident Evil", 
	"Resident Evil CODE: Veronica", 
	"Resident Evil CODE: Veronica X",
	"Resident Evil: Outbreak File 2"],

        ["¿Dónde recibió entrenamiento HUNK en 1996?",
	"Isla Rockfort", 
	"Base de la Antártida", 
	"Laboratorio del Cáucaso",
	"Centro de Formación de Umbrella"],
      
        ["En Resident Evil 5 Chris indica que de niño siempre quiso ser:",
	"Capitán de un Barco", 
	"Militar", 
	"Agente",
	"Astronauta"],

	["¿Cómo se llama la organización a la que Chris se unió en 2003?",
	"Private Biohazard Containment Unit",
	"B.S.A.A.",
	"S.T.A.R.S.",
	"U.S.A.F."],

        ["¿En qué días transcurre el Incidente de la Mansión?",
       "24 y 25 de Julio",
       "23 Y 24 de Julio",
       "28 y 29 de Septiembre", 
       "29 y 30 de Julio"],

        ["Resident Evil: The Marhawa Desire fue escrito y dibujado por:",
       "Naoki Serizawa",
       "S.D. Perry",
       "DeCandido", 
       "Masaru Miyazaki"],

        ["Claire Redfield aparece en:",
       "Resident Evil: Degeneration",
       "Resident Evil: Damnation",
       "Biohazard 4D Executer", 
       "Biohazard 4 Incubate"],

       ["Alexia y Alfred son hijos de:",
       "Alexander Ashford",
       "Alfred Ashford",
       "Arthur Ashford", 
       "Thomas Ashford"],

	["¿Cuál de estas películas sirvió de inspiración a Shinji Mikami?",
	"Dawn of the Dead (1978)",
	"Night of the living dead (1968)",
	"Day of the Dead (1985)",
	"Return of the Living Dead (1985)"],


        ["¿Cuál es el juego más vendido de Resident Evil?",
	"Resident Evil 5",
	"Resident Evil 4",
	"Resident Evil 6",
	"Resident Evil 2",
	"Resident Evil"],

	["¿Cómo se llama el virus que Birkin entregó a Wesker?",
	"Virus Prototype",
	"Virus Progenitor",
	"Virus-G",
	"Uroboros"],


	["¿Quién fue el Director de Resident Evil 2?",
	"Hideki Kamiya",
	"Noboru Sugimura",
	"Shinji Mikami",
	"Jun Takeuchi"],

       ["En Resident Evil 4 Ada Wong indica que le entregó a Wesker una muestra de:",
	"Plaga Subordinada",
	"Plaga de Control",
	"Plaga tipo 2",
	"Plaga tipo 3"],

       ["Uno de los escritores de Resident Evil 2 es:",
	"Noboru Sugimura",
	"Hideki Kamiya",
	"Koji Oda",
	"Yasuhiro Ampo"],


	["Jun Takeuchi define la rivalidad entre Chris y Wesker como:",
	"Una lucha entre la oscuridad y la luz",
	"Una lucha entre el bien y el mal",
	"Una lucha entre la verdad y la mentira",
	"Una lucha entre dos grandes"],

        ["Leon Scott Kennedy no aparece en:",
	"Biohazard: The Episodes",
	"BIOHAZARD ZombieBuster",
	"BIOHAZARD Clan Master",
	"Resident Evil: Uprising"],


	["Resident Evil: Survivor 2 - CODE: Veronica es:",
	"Una pesadilla de Claire Redfield",
	"Una historia falsa",
	"Una pesadilla de Steve Burnside",
	"Una historia real"],


	["¿Cuál de estos no es un juego verdadero?",
	"Biohazard DASH",
	"PACHISLOT BIOHAZARD 6",
	"Biohazard Outbreak Survive",
	"BIOHAZARD Team Survive"],


	["¿Los padres de Jill Valentine son de qué origen?",
	"Francés - Japonés",
	"Inglés - Americano",
	"Italiano - Americano",
	"Inglés - Francés"],


	["¿Cómo se les llama a las dobles de Carla Radames?",
	"Doppelgängers",
	"Twins",
	"Dvostrukos",
	"Doppios"],


	["Las Samurai Edge de los S.T.A.R.S. son versiones custom de las:",
	"Beretta 92F",
	"Beretta M93R",
	"Beretta 92FS",
	"Beretta"]
	];
importArticles({
    type: 'script',
    articles: [
        'u:dev:Quiz/code.js'
    ]
});
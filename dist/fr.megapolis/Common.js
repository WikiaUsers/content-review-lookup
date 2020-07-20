/* Tout JavaScript ici sera chargé pour chaque page visitée par n’importe quel utilisateur. */

// AjaxRC configuration option
var ajaxRefresh = 30000;

//=======Quiz===========
var quizName = "Quiz Mégapolis";
var quizLang = "fr";
var resultsTextArray = [
    "Dommage. Mais retente ta chance, tu feras certainement un meilleur score !",
    "Tu t'en sors bien, mais sois attentif à chaque question.",
    "C'est pas mal ! Tu peux faire mieux !",
    "Tu as frôlé le score parfait, mais tu as globalement eu un bon résultat, alors tu peux être fier de toi, bravo !",
    "Super ! Tu connais Mégapolis comme ta poche !"
];
var questions = [
    ["La première tâche nous est donnée par...",
        "Alice",
        "Mike",
        "Édouard"],
        
    ["Combien faut-il de matériaux pour construire le premier pont ?", 
        "12 matériaux", 
        "10 matériaux", 
        "20 matériaux"],

    ["À quel niveau débloques-tu l'Unité de peinture ?",
        "Au niveau 8",
        "Au niveau 10",
        "Au niveau 5"],

    ["Quel bâtiment peux-tu gagner grâce à la quête donnée au niveau 8 ?",
        "Big Ben",
        "La Tour Eiffel",
        "Une usine de meubles supplémentaire"],

    ["La première zone dans laquelle on construit sa ville s'appelle...",
        "Le centre-ville",
        "La vallée fluviale",
        "La plaine"],

    ["Quand débloques-tu l'accès aux Montagnes rocheuses ?'",
        "Au niveau 15",
        "Au niveau 12",
        "Au niveau 18"],

    ["En quelle année est sorti le jeu Mégapolis ?",
        "En 2014",
        "En 2010",
        "En 2011"],

    ["Quel bâtiment comporte la plus grand nombre d'étapes de construction ?",
        "Le tunnel sous-marin",
        "Le centre d'affaires mondial Néphilim",
        "La Baie perdue"],

    ["Combien de mégabucks gagne-t'on à chaque nouveau niveau ?",
        "Un",
        "Deux",
        "Trois"],

    ["Combien d'amis peux-tu inviter au hasard ?",
        "Huit",
        "Dix",
        "Cinq"],

    ["Quel bâtiment ne débloque pas d'accès à une nouvelle région ?",
        "L'embranchement du tunnel Crique (entrée)",
        "Le carrefour",
        "Le pont du Léviathan",
        "La station des Berges du Fleuve"],

    ["Quel matériau ne s'achète pas avec des mégabucks ?",
        "Le schéma d'assemblage",
        "Le dessin technique",
        "Les poutres en fer",
        "Les blocs de béton"],

    ["Quels bâtiments ne rapportent pas d'argent ?",
        "Les bâtiments résidentiels",
        "Les usines",
        "Les infrastructures",
        "Les bâtiments extérieurs à la boutique"],

    ["Combien de trains possèdes-tu après avoir bâti la gare internationale ?",
        "Deux",
        "Un",
        "Trois",
        "Quatre"],

    ["Que peux-tu créer au bureau de création ?",
        "Des bus",
        "Des avions",
        "Des fusées",
        "Des sondes atmosphériques"],

    ["Combien d'avions au maximum peux-tu avoir dans un hall ?",
        "Six",
        "Quatre",
        "Cinq",
        "Douze"],

    ["À quel niveau débloques-tu la zone de Las Megas ?",
        "Au niveau 38",
        "Au niveau 35",
        "Au niveau 33",
        "Au niveau 45"],

    ["Combien y a t'il de manoirs en arrivant la première fois à Las Megas ?",
        "Trois",
        "Deux",
        "Un",
        "Aucun"],

    ["Quelle est la première ressource produite au complexe industriel ?",
        "Du bois",
        "Du minerai de fer",
        "Du charbon",
        "Du diamant"],

    ["Quel endroit ne possède qu'une seule « région » ?",
        "L'île touristique",
        "Les montagnes rocheuses",
        "Le complexe industriel",
        "Mégapolis"],

    ["Lequel de ces bâtiments de Mégapolis existe dans la vraie vie ?",
        "Le complexe résidentiel du Zodiaque",
        "L'amphithéâtre",
        "La supérette",
        "Le centre canin",
        "La grande maison japonaise"],

    ["La zone de Mégapolis et Las Megas possèdent un point commun. Lequel ?",
        "Elles ont toutes les deux un réseau de monorail",
        "Elles ont toutes les deux un réseau de ferries",
        "Elles possèdent une île",
        "On peut y faire du commerce",
        "On peut y construire une trésorerie"],

    ["Que gagne-t'on si l'on finit la quête du complexe industriel dans les temps ?",
        "Un excavateur à godets",
        "Une mine de diamants",
        "Un centre minier",
        "La tour de la ville",
        "Un certificat de construction"],

    ["Quelle est la somme maximale qu'il est possible de gagner au port de commerce de Mégapolis ?",
        "345 000 pièces",
        "1 000 000 de pièces",
        "43 000 pièces",
        "220 000 pièces",
        "13 000 pièces"],

    ["Combien d'améliorations faut-il effectuer sur un avion ?",
        "Six",
        "Cinq",
        "Quatre",
        "Trois",
        "Huit"],

    ["À quelle fréquence y-a t'il des concours sur Mégapolis ?",
        "Toutes les deux semaines",
        "Tous les mois",
        "Toutes les semaines",
        "Six fois par semestre",
        "Tous les jours"],

    ["Quel matériau unique est le plus cher ?",
        "Le téléphone mobile",
        "La carte SD",
        "La carte de locomotive électrique",
        "Les jumelles",
        "La boussole"],

    ["À quel niveau cesse-t-on de débloquer des bâtiments ?",
        "Au niveau 125",
        "Au niveau 130",
        "Au niveau 120",
        "Au niveau 100",
        "Au niveau 255"],

    ["Combien de matériaux faut-il pour construire une plateforme de transport sur le périphérique ?",
        "100 matériaux",
        "1 matériau",
        "50 matériaux",
        "75 matériaux",
        "150 matériaux"],

    ["Mégapolis est un jeu jouable sur Adobe Flash.",
        "Vrai",
        "Faux"]
];

// Code Quiz - ne pas toucher
(function($) {
	'use strict';
	var translations = {
		// English
		en: {
			nxtBtn: "Next",
			rplBtn: "Replay",
			resultsHeader: "Results",
			noQuestionsHeader: "No questions provided"
		},
		// Deutsch
		de: {
			nxtBtn: "Weiter",
			rplBtn: "Wiederholen",
			resultsHeader: "Ergebnisse",
			noQuestionsHeader: "Keine Fragen bereitgestellt"
		},
		// Français
		fr: {
			nxtBtn: "Suivant",
			rplBtn: "Rejouer",
			resultsHeader: "Résultats",
			noQuestionsHeader: "Aucune question posée"
		},
                // Spanish
		es: {
			nxtBtn: "Siguiente",
			rplBtn: "Repetir",
			resultsHeader: "Resultados",
			noQuestionsHeader: "No hay preguntas proporcionadas"
		},
		// Polski
		pl: {
			nxtBtn: "Dalej",
			rplBtn: "Ponów",
			resultsHeader: "Wyniki",
			noQuestionsHeader: "Nie wpowadzono pytań"
		},
		// Mandarin
		zh: {
			nxtBtn: "下一题",
			rplBtn: "再来一次",
			resultsHeader: "结果",
			noQuestionsHeader: "题库中还没有题"
		}
	};
 
	function msg(name) {
        if (quizLang in translations && name in translations[quizLang]) {
            return translations[quizLang][name];
        }
        return translations.en[name];
    }
 
	var score = 0;
	var currentQuestion = 0;
	var secondsSince = 0;
	var minutesSince = 0;
	var questionsAmount = questions.length;
	var startCounterVar;
	$.fn.randomize = function(selector) {
		(selector ? this.find(selector) : this).parent().each(function() {
			$(this).children(selector).sort(function() {
				return Math.random() - 0.5;
			}).detach().appendTo(this);
		});
		return this;
	};
 
	$(document).ready(function() {
		if ($('#quizQ').length > 0) {
		console.log($('#quizQ').length);
			$('div#quizQ').append('<div id="quizBlockWrapper"></div><div id="quizBlock"><h3 id="quizName"></h3><div id="questionBlock"><h4 id="question"></h4><form id="questionForm" name="questionForm"></form></div><div id="nxtBtnWrapper"><h3 id="nxtBtn"></h3></div><div id="questionCounter"></div></div><div id="quizCountdown"></div><div id="quizBackground"></div>');
			$('#quizQ #quizName').text(quizName);
			if (questionsAmount > 0) {
				$('#quizQ #nxtBtn').on('click', function() {
					$('#quizQ #nxtBtn').removeClass('nxtBtnActive');
					if ($('#quizQ #questionForm input:checked').length > 0 || currentQuestion === -1) {
						updateScore();
						$('#quizQ #questionBlock').fadeOut(200, updateForm);
						$('#quizQ #questionBlock').fadeIn(200);
					}
				});
				$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
				$('#quizQ #nxtBtn').text(msg("nxtBtn"));
				createform();
				$('#quizQ #questionBlock').on('click', function() {
					if ($('#quizQ #questionForm input:checked').length > 0) {
						$('#quizQ #nxtBtn').addClass('#quizQ nxtBtnActive');
					}
				});
			} else {
				$('#quizQ #question').html('<div id="resultsHeader" style="text-align:center">' + msg("noQuestionsHeader") + '</div>');
			}
		}
	});
 
	function createform() {
		var currentQuestionArray = questions[currentQuestion];
		$('#quizQ #question').text(currentQuestionArray[0]);
		$.each(currentQuestionArray, function(i, v) {
			if (i < 1) {
				return true;
			}
			$('#quizQ #questionForm').append('<div id="answerWrapper"><input id="answer' + i + '" name="answer" type="radio" value="' + i + '" /><label for="answer' + i + '">' + v + '</label></div>');
		});
		$('#answerWrapper').randomize();
	}
 
	function updateScore() {
		if (currentQuestion !== -1) {
			var submittedAnswer = $('#quizQ #questionForm input:checked + label').text();
			var currentQuestionArray = questions[currentQuestion];
			var correctAnswer = currentQuestionArray[1];
			if (correctAnswer === submittedAnswer) {
				score++;
			}
		} else {
			score = 0;
		}
	}
 
	function updateForm() {
		currentQuestion++;
		if (currentQuestion < questionsAmount) {
			$('#quizQ #questionForm').empty();
			createform();
			$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
		}
		if (currentQuestion === questionsAmount) {
			currentQuestion = -1;
			$('#quizQ #questionForm').empty();
			$('#quizQ #questionCounter').text("");
			$('#quizQ #question').html('<div id="resultsHeader">' + msg("resultsHeader") + ':' + '<br />' + Math.round(score / questionsAmount * 100) + '% (' + score + '/' + questionsAmount + ')</div>');
			var finalScore = score / questionsAmount;
			var resultsFraction = 1 / resultsTextArray.length;
			var resultsText;
			$.each(resultsTextArray, function(i, v) {
				if (finalScore >= resultsFraction * i) {
					resultsText = v;
				}
			});
			$('#quizQ #questionBlock').append('<div id="resultsText">' + resultsText + '</div>');
			$('#quizQ #nxtBtn').text(msg("rplBtn")).addClass('nxtBtnActive');
		}
		if (currentQuestion === 0) {
			$('#quizQ #resultsText').remove();
			$('#quizQ #nxtBtn').text(msg("nxtBtn")).removeClass('nxtBtnActive');
			$('#quizQ #questionCounter').text(currentQuestion + 1 + '/' + questionsAmount);
		}
	}
})(jQuery);
 
// END Quiz
// ============================================================

/** Collapsible tables *********************************************************
 *
 *  Description: Allows tables to be collapsed, showing only the header. See
 *                         http://www.mediawiki.org/wiki/Manual:Collapsible_tables.
 *  Maintainers: [[en:User:R. Koot]]
 */

var autoCollapse = 2;
var collapseCaption = 'cacher';
var expandCaption = 'afficher';

function collapseTable(tableIndex) {
    var Button = document.getElementById('collapseButton' + tableIndex);
    var Table = document.getElementById('collapsibleTable' + tableIndex);

    if (!Table || !Button) {
        return false;
    }

    var Rows = Table.rows;

    if (Button.firstChild.data == collapseCaption) {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = 'none';
        }
        Button.firstChild.data = expandCaption;
    } else {
        for (var i = 1; i < Rows.length; i++) {
            Rows[i].style.display = Rows[0].style.display;
        }
        Button.firstChild.data = collapseCaption;
    }
}

function createCollapseButtons() {
    var tableIndex = 0;
    var NavigationBoxes = new Object();
    var Tables = document.getElementsByTagName('table');

    for (var i = 0; i < Tables.length; i++) {
        if (hasClass(Tables[i], 'collapsible')) {

            /* only add button and increment count if there is a header row to work with */
            var HeaderRow = Tables[i].getElementsByTagName('tr')[0];
            if (!HeaderRow) {
                continue;
            }
            var Header = HeaderRow.getElementsByTagName('th')[0];
            if (!Header) {
                continue;
            }

            NavigationBoxes[tableIndex] = Tables[i];
            Tables[i].setAttribute('id', 'collapsibleTable' + tableIndex);

            var Button = document.createElement('span');
            var ButtonLink = document.createElement('a');
            var ButtonText = document.createTextNode(collapseCaption);

            Button.className = 'collapseButton'; // Styles are declared in [[MediaWiki:Common.css]]

            ButtonLink.style.color = Header.style.color;
            ButtonLink.setAttribute('id', 'collapseButton' + tableIndex);
            ButtonLink.setAttribute('href', "javascript:collapseTable(" + tableIndex + ");");
            ButtonLink.appendChild(ButtonText);

            Button.appendChild(document.createTextNode('['));
            Button.appendChild(ButtonLink);
            Button.appendChild(document.createTextNode(']'));

            Header.insertBefore(Button, Header.childNodes[0]);
            tableIndex++;
        }
    }

    for (var i = 0; i < tableIndex; i++) {
        if (hasClass(NavigationBoxes[i], 'collapsed') || (tableIndex >= autoCollapse && hasClass(NavigationBoxes[i], 'autocollapse'))) {
            collapseTable(i);
        } else if (hasClass(NavigationBoxes[i], 'innercollapse')) {
            var element = NavigationBoxes[i];
            while (element = element.parentNode) {
                if (hasClass(element, 'outercollapse')) {
                    collapseTable(i);
                    break;
                }
            }
        }
    }
}

addOnloadHook(createCollapseButtons);


/** Test if an element has a certain class **************************************
 *
 * Description: Uses regular expressions and caching for better performance.
 * Maintainers: [[User:Mike Dillon]], [[User:R. Koot]], [[User:SG]]
 */

var hasClass = (function() {
    var reCache = {};
    return function(element, className) {
        return (reCache[className] ? reCache[className] : (reCache[className] = new RegExp("(?:\\s|^)" + className + "(?:\\s|$)"))).test(element.className);
    };
})();
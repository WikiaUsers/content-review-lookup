Complex_words = {
	// Troggish Dictionary, Part 2 of 5:
	"naggu dumak" : "welcome",
	// Troggish Dictionary, Part 3 of 5:
	"wrug krath" : "disappoint",
	// Troggish Dictionary, Part 4 of 5:
	"nikk nan" : "maybe"
}

Dictionary = {
	// Troggish Dictionary, Part 1 of 5:
	"nomnom" : "eat",
	"fnag" : "brave",
	"azdah" : "dragon",
	"naytut" : "follow",
	"nom" : "of",
	"nagd" : ["would", "should"],
	"en" : "and",
	"lono" : "alone",
	"budu" : "take",
	"missio" : "mission",
	"pobda" : "wife",
	"mxini" : "really",
	"obw" : "as",
	"sizlo" : ["kill", "slay"],
	"rewk" : "back",
	"den" : "for",
	"shax" : ["food", "meal"],
	"dogobodran" : ["grateful", "thankful"],
	"dogobodraniel" : ["gratefulness", "thankfulness"],
	"omnaghu" : "robbery",
	"Mut" : "But",
	"Kutok" : "Sure",
	"Tiketo" : "Ticket",
	"Tutar" : "Wood",
	"Onu" : "In",
	"Wetru" : "There",
	"Yevet" : "Never",
	"Ax" : "Axe",
	"Pokto" : "Piece",
	"Kiv" : "So",
	"Benit" : "Send",
	"Jus" : "More",
	"Gnjilji" : "Glue",
	// Troggish Dictionary, Part 2 of 5:
	"rtran" : "well",
	"woro" : "warrior",
	"ai" : ["i", "me"],
	"trfil" : "offer",
	"quag" : "egg",
	"magzo" : "leave",
	"okol" : ["to make", "create"],
	"retve" : ["to retrive", "bring"],
	"ne" : "no",
	"quati" : ["to ask", "question"],
	"qondo" : "done",
	"dilo" : "from",
	"ivis" : "want",
	"ayu" : ["my", "mine"],
	"daloo" : "far",
	"divon" : "god",
	"damom" : "damn",
	"telo" : "buy",
	"silo" : "sell",
	"cakok" : "to try",
	"tete" : "must",
	"gudogo" : "reward",
	"drociboa" : ["generous", "caring"],
	"karkothon" : "recognize",
	"letas" : "news",
	"tokono" : "token",
	"jugozd" : "think",
	"totro" : "tree",
	"nivi" : "see",
	"neeego" : "lower",
	"eov" : "if",
	"likot" : "another",
	"pekter" : "regret",
	"recpioe" : "recipe",
	"vuu" : "who",
	// Troggish Dictionary, Part 3 of 5:
	"ren" : "with",
	"oto" : ["that", "it"],
	"ople" : "please",
	"sizzel" : "slayer",
	"husband" : "pobad",
	"elet" : "then",
	"dy" : "yes",
	"wirt" : "help",
	"zang" : ["super", "great"],
	"ishic" : "name",
	"hikar" : "find",
	"xolo" : "any",
	"yuta" : "just",
	"xax" : ["to be", "be"],
	"luno" : "love",
	"onotupa" : "soon",
	"emest" : "this",
	"repeto" : "again",
	"hotosos" : ["haste", "hurry"],
	"qon" : ["do", "does"],
	"dind" : "thing",
	"dogob" : ["thank you", "thanks"],
	"vivis" : "day",
	"veqerot" : "always",
	"hoza" : "home",
	"ruko" : "need",
	"nolis" : "collect",
	"yon" : ["he", "she", "it"],
	"yono" : ["him", "her"],
	"qidode" : "about",
	"totrosizo" : "lumberjack",
	"viiigo" : "higher",
	"vitfar" : "enough",
	"helve" : "half",
	"omgeovit" : "impressive",
	"vutdad" : "give",
	"rekagu" : "translate",
	"lingval" : "language",
	"incio" : "ancient",
	"wuxuant" : "someone",
	// Troggish Dictionary , Part 4 of 5:
	"babod" : "worried",
	"jal" : "what",
	"tupa" : "time",
	"finni" : "fine",
	"liti" : "items",
	"ragna" : "strenght",
	"tu" : "to",
	"polipido" : "preparor",
	"ilandi" : "island",
	"ekt" : "the",
	"min" : ["am", "is", "are"],
	"konkot" : ["concoction", "potion"],
	"momnak" : "hello",
	"turivizno" : "adventurer",
	"zun" : ["road", "way"],
	"kagu" : ["tell", "say"],
	"calre" : "remember",
	"racha" : ["reach", "to get to"],
	"peset" : "insect",
	"munu" : "have",
	"hald" : "wait",
	"notro" : "night",
	"nuovo" : "new",
	"ooolo" : "long",
	"ooono" : "short",
	"minon" : "know",
	"cet" : "go",
	"holo" : "hall",
	"esp" : "you",
	"espo" : "them",
	"espa" : "we",
	"ogd" : ["can", "could", "will"],
	"artt" : ["once", "when"],
	"wuax" : "some",
	"inhibis" : "inhabitants",
	// Troggish Dictionary , Part 5 of 5: Some known rules of Troggish language:
	"ono" : "one",
	"duo" : "two",
	"tio" : "three",
	"hreo" : "four",
	"vento" : "five",
	"lanto" : "six",
	"axto" : "seven",
	"onto" : "eight",
	"nino" : "nine",
	"ceno" : "ten"
}

var translated = '';

$(document).ready(function(){
	$('#translator').html('<div id="type_field"><textarea class=""></textarea></div><div id="result_field"></div>');

	$('#translator div textarea').on('blur', function(){
	   $(this).removeClass('focus');
	}).on('focus', function(){
	  $(this).addClass('focus');
	}); 

	$('#translator #type_field').on( 'change keyup keydown paste cut', 'textarea', function (){
	    $(this).height(0).height(this.scrollHeight);
	    translateText($('#translator #type_field textarea').val());
	    $('#result_field').html(translated);
	}).find( 'textarea' ).change();

	$('div #result_field').on( 'change keyup keydown paste cut', this, function (){
	    $(this).height(0).height(this.scrollHeight);
	}).find( this ).change();

	function hasWhiteSpace(s) {
	  return s.indexOf(' ') >= 0;
	}

	function translateText(text){
		text = text.toLowerCase();
		var word = text.split(',').join("");
		word = word.split('.').join("");
		regex = new RegExp(word, "g");

		// replace all "complex words"
		for (var key in Complex_words) {
		  if (Complex_words.hasOwnProperty(key)) {
		  	text = text.replace(new RegExp(key, 'gi'), Complex_words[key]);
		  }
		}
		// split rest of text into words
		if(hasWhiteSpace(text)){
			words = text.split(" ")
			// replace all regular words
			for (var i = 0; i < words.length; i++) {
				var word = words[i].split(',').join("");
				word = word.split('.').join("");
				regex = new RegExp(word, "g");

				if(typeof Dictionary[word] == 'string'){
					words[i] = words[i].replace(regex, Dictionary[word]);
				}
				else if(typeof Dictionary[word] == 'object'){
					Dictionary[words[i]] = Dictionary[words[i]].join('/');
					words[i] = words[i].replace(words[i], Dictionary[words[i]]);
				}
			}

			//join all words together again
			text = words.join(' ');
		}
		else if(Dictionary[word] != null){ // if there's only one word

			if(typeof Dictionary[word] == 'string'){
				text = text.replace(regex, Dictionary[word]);
				console.log(word)
			}
			else if(typeof Dictionary[word] == 'object'){
				Dictionary[word] = Dictionary[word].join('/');
				text = text.replace(regex, Dictionary[word]);
			}
		}

		// replace global variable
		translated = text;
	}
});
/* Any JavaScript here will be loaded for all users on every page load. */

$(function() {
    var conf = mw.config.get([
            'wgAction',
            'wgNamespaceNumber'
        ]);

	// loads [[MediaWiki:Geshi.css]] on Thread namespace as necessary
	// as it's not loaded by default
	// @example <http://dev.wikia.com/wiki/Thread:5735>
	// @todo check if this is needed for Message_Wall too
	// @todo submit a bug report for this too
	if (conf.wgNamespaceNumber === 1201 && $('.mw-geshi').length) {
		mw.loader.load('ext.geshi.local');
	}
	
	if (conf.wgAction === 'edit' && conf.wgNamespaceNumber === 0) {
        // causing some duplication bugs atm, will revisit soon TM
        // importScript('MediaWiki:CodeEditor.js');
	}
});

var quizName = "El Tigre Quiz";
var quizLang = "en";
var resultsTextArray = [ 
	"You don't know much... You should visit Miracle City someday.",
	"You know some things about El Tigre, not bad.",
	"You know a lot! You're an El Tigre Expert!" 
    ];
var questions = [

	["What's Manny's last name?",
	"Rivera",
	"Alberto",
	"Santos",
	"Rolando"], 

	["Who is Manny's best friend?",
	"Frida Suárez",
	"Zoe Aves",
	"Sophia"],
	
	["How's Frida's father called?",
	"Emiliano Suárez",
	"João Suárez",
	"Felipe Suárez",
	"Antonio Suárez"],

	["Which is the first episode of the series?",
	"Sole of a Hero",
	"The Mother of All Tigres",
	"Fistful of Collars",
	"Back to Escuela"],

	["What is Manny's full name?",
	"Manuel Pablo Gutiérrez O'Brian Equihua Rivera",
	"Manuel Alberto de Santos Afonso Rivera",
	"Manuel da Cunha Rivera",
	"Manuel Araujo Moura Rivera"],

	["Who created El Tigre: The Adventures of Manny Rivera?",
	"Jorge R. Gutiérrez and Sandra Equihua",
	"Brandon Sawyer and Scott Kreamer",
	"Gabe Swarr and Dave Thomas",
	"Eddie Guzelian and Tracy Berna"],

	["How many episode does this series have?",
	"26",
	"80",
	"52",
	"13"],

	["When did the series start?",
	"March 3, 2007",
	"September 16, 2012",
	"May 23, 2009",
	"August 18, 2004"],

	["When did the series end?",
	"September 13, 2008",
	"February 2, 2014",
	"June 28, 2010",
	"April 9, 2006"],

	["Is El Tigre good or evil?",
	"Undecided",
	"Good",
	"Evil"]
	
	];
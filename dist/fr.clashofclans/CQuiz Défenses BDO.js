//Version modifi�e de http://www.creativejuiz.fr/blog/tutoriels/personnaliser-aspect-boutons-radio-checkbox-css
//Code d'apr�s Gguigui1
//Quiz B�timents D�fenifs (base des ouvriers) avec correction
    mw.util.addCSS('\
.quizbdo { \
	margin-right:auto; \
	margin-left:auto; \
	text-align:center; \
background: rgb(252,194,118); /* Old browsers */ \
background: -moz-linear-gradient(top, rgba(252,194,118,1) 0%, rgba(255,255,255,1) 100%); /* FF3.6+ */ \
background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(252,194,118,1)), color-stop(100%,rgba(255,255,255,1))); /* Chrome,Safari4+ */ \
background: -webkit-linear-gradient(top, rgba(252,194,118,1) 0%,rgba(255,255,255,1) 100%); /* Chrome10+,Safari5.1+ */ \
background: -o-linear-gradient(top, rgba(252,194,118,1) 0%,rgba(255,255,255,1) 100%); /* Opera 11.10+ */ \
background: -ms-linear-gradient(top, rgba(252,194,118,1) 0%,rgba(255,255,255,1) 100%); /* IE10+ */ \
background: linear-gradient(to bottom, rgba(252,194,118,1) 0%,rgba(255,255,255,1) 100%); /* W3C */ \
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#fcc276\', endColorstr=\'#ffffff\',GradientType=0 ); /* IE6-9 */ \
	border-radius:40px; \
	border:2px ridge silver; \
	font-size:18px; \
	margin-top:30px; \
} \
.quizbdo [type="radio"]:not(:checked), \
.quizbdo [type="radio"]:checked { \
  position: absolute; \
  left: -9999px; \
} \
.quizbdo [type="radio"]:not(:checked) + label, \
.quizbdo [type="radio"]:checked + label { \
  position: relative; \
  padding-left: 25px; \
  cursor: pointer; \
} \
.quizbdo [type="radio"]:not(:checked) + label:before, \
.quizbdo [type="radio"]:checked + label:before { \
  content: \'\'; \
  position: absolute; \
  left:0; \
  top: 2px; \
  width: 17px; \
  height: 17px; \
  border: 1px solid #aaa; \
  background: #f8f8f8; \
  border-radius: 3px; \
  box-shadow: inset 0 1px 3px rgba(0,0,0,.3); \
} \
.quizbdo [type="radio"]:not(:checked) + label:after, \
.quizbdo [type="radio"]:checked + label:after { \
  content: "X"; \
  position: absolute; \
  top: 0; left: 4px; \
  font-size: 16px; \
  color: #09ad7e; \
  transition: all .2s;  \
} \
.quizbdo [type="radio"]:not(:checked) + label:after { \
  opacity: 0;  \
  transform: scale(0);  \
} \
.quizbdo [type="radio"]:checked + label:after { \
  opacity: 1; \
  transform: scale(1); \
}');
    var questions = ['Une seule rafale du Double Canon est compos�e de combien de tirs ?', 'Quelle est la port�e d\'une Tour d\'Archers de la Base des Ouvriers en mode "attaque rapide" ?', 'Combien de Broyeur(s) pouvez-vous poss�der avec la Maison des Ouvriers au niveau 5 ?', 'Combien de canons composent un Multi-Mortier de niveau 1 ?', 'Quelles Troupes composent un Poste de garde de niveau 3 ?', 'Combien de <b>groupes</b> de Remparts pouvez-vous poss�der avec la Maison des Ouvriers de niveau 4 ?', 'Quels sont les types de Troupes cibl�es par le R�tissoire ?', 'Combien de bombes d\'un Bombardier de niveau 1 sont n�cessaires pour d�truire un Rempart de niveau 6 ?', 'Quelle est la capacit� du ressort d\'un Pi�ge � Pouss�e de niveau 3 ?', 'Quelle est la vitesse d\'attaque des Bombes A�riennes ?'];
    var answers = {
        0: ['4', '3', '2', '6'],
        1: ['7', '6', '9', '11'],
        2: ['1', '2', '3'],
        3: ['3', '4', '5', '2'],
        4: ['2 Barbares, 1 archer', '1 barbare, 1 archer', '1 barbare, 2 archers', '2 barbares, 2 archers'],
        5: ['15', '10', '20', '75'],
        6: ['Terrestres et a�riennes', 'Uniquement terrestres', 'Uniquement a�riennes', 'Sous-marines et intra-terrestres'],
        7: ['4', '2', '3', '5'],
        8: ['10', '7', '15', '20'],
        9: ['3 000 000 000 de nanosecondes', '3 800 000 microsecondes', '4 000 millisecondes'],
    };
    var time = 15;
    var points = 0;
    var badanswers = 0,
        goodanswers = 0
        notanswers = 0;
    var timeinterval;
    var countquestions = 0;

    function finishquiz() {
        if (points < 0) {
            custommessage = "En dessous de 0, pas de bol ! Heureusement, ce site est l'endroit id�al pour vous rattraper et devenir incollable sur les D�fenses de la Base des Ouvriers";
        } else if (points < 5) {
            custommessage = "Moins d'un quart des points, vous avez quelques notions sur la Base des Ouvriers mais les informations annexes vous �chappent, n'h�sitez pas � les r�colter en naviguant sur ce site, elles pourront vous �tre utile pour la suite du jeu.";
        } else if (points < 10) {
            custommessage = "En dessous de la moyenne mais ce n'est pas la catastrophe, vous avez les notions du jeu ainsi que quelques informations annexes mais la majorit� d'entre elles vous sont inconnues, vous pouvez en apprendre d'autres en naviguant sur ce site si vous le souhaitez.";
        } else if (points < 15) {
            custommessage = "Vous avez plus que la moyenne, bravo ! Vous avez de bonnes connaissances du jeu mais vous ne le connaissez pas enti�rement et ce site peut vous permettre d'�toffer vos connaissances d�j� bonnes.";
        } else if (points < 20) {
            custommessage = 'Bravo ! Vous avez eu beaucoup de points, vous avez des connaissances extr�ment bonnes du jeu et peu de choses doivent vous �chapper. Cependant, en naviguant sur ce site, vous pourriez mettre la lumi�re sur ce "peu de choses" qui vous �chappent encore.';
        } else if (points == 20) {
            custommessage = "F�licitations ! Vous avez r�pondu tout juste ! Soit vous �tes un fan absolu de SUPERCELL au point d'en conna�tre toutes les facettes, soit un fin tricheur ;).";
        }
        if (points > -2 && points < 2) {
            points += " point";
        } else {
            points += " points";
        }
        $('.quizbdo:first').html('<h3>F�licitations, vous avez termin� le quiz !<br />Dites-nous votre r�sultat dans les commentaires ! N\'oubliez-pas que vous pouvez toujours peaufiner vos connaissances en parcourant les articles du Wiki Clash of Clans, et ainsi viser les 20/20 au quiz !<br />Maintenant, voici vos r�sultats :</h3><br />Vous avez un total de ' + points + ' sur 20 !<br /><h3>Vous avez eu ' + goodanswers + ' r�ponse(s) justes, ' + badanswers + ' r�ponse(s) fausses et vous n\'avez pas r�pondu � ' + notanswers + ' question(s) ou vous n\'avez pas r�pondu dans le temps imparti.</h3><br /><h4>' + custommessage + '</h4>');
    }
	function notime() {
        if ($("div.quizbdo > label").hasClass('disabled')) {
                return;
        }
			clearTimeout(timeinterval);
            $('div.quizbdo > label').addClass('disabled');
            $('.quizbdo input[name="answer"], .quizbdo label, #skip').prop('disabled', true);
            notanswers += 1;
            $('div.quizbdo > label').each(function () {
                if ($(this).html() == answers[countquestions][0]) {
                    $(this).siblings('input[name="answer"]').css('background-color', 'green');
                    $(this).css('background-color', 'green');
                }
            });
            countquestions += 1;
            setTimeout(nextquestions, 3000);
	}
    function nextquestions() {
        $('#quiz-time').html(15);
        var composent = $('.quizbdo:first');
        if (!questions[countquestions] || !answers[countquestions]) {
            finishquiz();
            return;
        }
        $(composent).html('<span style="text-align:center;"><i style="display:inline-block; margin-top:10px;"> Question n�' + Math.floor(countquestions + 1) + ': ' + questions[countquestions] + '</i></span>');
        var reponsesorder = [];
        while (reponsesorder.length < answers[countquestions].length) {
            var number = Math.floor(Math.random() * answers[countquestions].length);
            if (reponsesorder.indexOf(number) == -1) {
                reponsesorder.push(number);
            }
        }
        for (i = 0; i < reponsesorder.length; i++) {
            $(composent).html($(composent).html() + '<br /><input type="radio" name="answer" id="answer-' + i + '" value="' + i + '"/><label for="answer-' + i + '">' + answers[countquestions][reponsesorder[i]] + '</label>');
        }
		$(composent).html($(composent).html() + '<br /><input type="radio" name="skip" id="skip" value="skip"><label onclick="notime();" for="skip">Passer la question</label>');
        $(composent).html($(composent).html() + '<DIV STYLE="background-image: url(https://vignette.wikia.nocookie.net/guigui/images/1/1a/Chronometre-icone-4052-48.png/revision/latest?cb=20150723154434&path-prefix=fr); position:relative; bottom:20px; left:20px; width:48px; height:48px"><center><span id="quiz-time" style="line-height:48px; display:inline; font-size:20px;">' + time + '</span></DIV>');
        timeinterval = setTimeout(updatetime, 1000);
        $('div.quizbdo > label').not('label[for="skip"]').click(function () {
            if ($(this).hasClass('disabled')) {
                return;
            }
            //console.log($(this));
            $('div.quizbdo > label').addClass('disabled');
            $('.quizbdo input[name="answer"], .quizbdo label, #skip').prop('disabled', true);
            if (answers[countquestions][0] == $(this).html()) {
                $(this).siblings('input[name="answer"]').css('background-color', 'green');
                $(this).css('background-color', 'green');
                points += 2;
                goodanswers += 1;
            } else {
                $('div.quizbdo > label').each(function () {
                    if ($(this).html() == answers[countquestions][0]) {
                        $(this).siblings('input[name="answer"]').css('background-color', 'green');
                        $(this).css('background-color', 'green');
                    }
                });
                $(this).siblings('input[name="answer"]').css('background-color', 'red');
                $(this).css('background-color', 'red');
                points -= 1;
                badanswers += 1;
            }
            countquestions += 1;
            clearTimeout(timeinterval);
            setTimeout(nextquestions, 3000);
        });
    }

    function updatetime() {
        var time = $('#quiz-time').html();
        if (time > 15) {
            time = 15;
        }
        time -= 1;
        $('#quiz-time').html(time);
        if (time < 0) {
            notime();
            return;
        }
        timeinterval = setTimeout(updatetime, 1000);
    }
    $('.quizbdo:first').each(function () {
        $('.quizbdo').css('padding', '10px');
        $(this).html('<p style="color: #303030; line-height:28px;">Depuis le 22 mai 2017, un second village a �t� ajout� dans Clash of Clans : <br /><b><i>La Base des Ouvriers !</i></b><br />Ce quiz vous permettra de tester vos connaissances sur les D�fenses de ce village secondaire. Compos� de 10 questions, ce quiz ne dure que quelques minutes. En cliquant sur le bouton&nbsp;<i>C\'est parti !</i>, le quiz commencera et la premi�re question s\'affichera.</br />Vous aurez 15 secondes pour r�pondre � chaque question, et il y a une seule bonne r�ponse par question. Cliquez sur une r�ponse pour la valider. Une fois votre r�ponse valid�e, la bonne r�ponse est affich�e. Si la r�ponse s�lectionn�e s\'affiche vert, c\'�tait la bonne r�ponse, si elle s\'affiche rouge, la mauvaise et dans ce cas, la bonne s\'affichera en vert. 3 secondes apr�s, la prochaine question s\'affichera et ainsi de suite. Voici le bar�me de points ! :</br />Bonne r�ponse : +2 points</br />Mauvaise r�ponse : -1 point</br />Aucune r�ponse : 0 point</br />Le quiz est donc sur 20 points et les points n�gatifs sont gard�s haha !</br />� vous de jouer !</p><div class="button" style="font-size:18px; padding:8px;" id="quiz-start">C\'est parti !</div>');
        var position = $('#WikiaArticle').offset();
        $('#quiz-start').click(function () {
            $('.quizbdo').css('padding', '');
            $('html, body').animate({
                scrollTop: position.top - 50
            }, 'fast');
            nextquestions();
        });
    });
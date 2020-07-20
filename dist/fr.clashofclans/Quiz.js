//Version modifiée de http://www.creativejuiz.fr/blog/tutoriels/personnaliser-aspect-boutons-radio-checkbox-css
    mw.util.addCSS('\
.quiz { \
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
.quiz [type="radio"]:not(:checked), \
.quiz [type="radio"]:checked { \
  position: absolute; \
  left: -9999px; \
} \
.quiz [type="radio"]:not(:checked) + label, \
.quiz [type="radio"]:checked + label { \
  position: relative; \
  padding-left: 25px; \
  cursor: pointer; \
} \
.quiz [type="radio"]:not(:checked) + label:before, \
.quiz [type="radio"]:checked + label:before { \
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
.quiz [type="radio"]:not(:checked) + label:after, \
.quiz [type="radio"]:checked + label:after { \
  content: "X"; \
  position: absolute; \
  top: 0; left: 4px; \
  font-size: 16px; \
  color: #09ad7e; \
  transition: all .2s;  \
} \
.quiz [type="radio"]:not(:checked) + label:after { \
  opacity: 0;  \
  transform: scale(0);  \
} \
.quiz [type="radio"]:checked + label:after { \
  opacity: 1; \
  transform: scale(1); \
}');
    var questions = ['Quelle est la troupe avec le moins de dégâts par attaque ?', 'Quel est le quotient des dégâts par seconde du P.E.K.K.A au niveau 3 et de sa capacité de logement ?', 'Combien d\'élixir noir aurez-vous dépensé pour passer votre Roi des barbares du niveau 1 au niveau 40 ?', 'Quel est le sort le moins cher améliorable au niveau maximum sans le laboratoire niveau 8 (Hôtel de ville niveau 10) ?', 'Quel est le seul sort dont les améliorations sont toutes disponibles avec un hôtel de ville au niveau 10 (laboratoire niveau 8) ?', 'Combien de ressources aurez-vous dépensé pour passer tous vos remparts au niveau 11 ?', 'Combien de points de vie a un rempart niveau 8 ?', 'Combien de sapeur(s) niveau 1 faut-il pour détruire un rempart niveau 11 ?', 'Combien de points de vie en pourcentage un sort sismique au niveau 2 enlève-t-il à un bâtiment ?', 'Combien de temps dure l\'amélioration du sort d\'empoisonnement du niveau 3 au niveau 4 ?', 'Combien de temps s\'écoule entre deux attaques d\'un P.E.K.K.A ?', 'D\'un point de vue étymologique, quel troupe ne fait pas partie de la composition GOWIPE ?', 'Quel est la défense dont on n\'obtient pas de nouveaux exemplaires après le passage de l\'Hôtel de ville au niveau 10 ?', 'Le 4 juillet 2015, quel joueur a atteint la ligue légende en premier ?', 'Combien de case(s) subisse(nt) l\'explosion des bombes des ballons ?', 'Quand sont apparues les guerres de clans ?', 'Combien d\'or pouvez-vous piller à un hôtel de ville au niveau 10 si ces réserves sont remplies au maximum, avec un château de clan vide ?', 'Combien y a-t-il de défenses dans Clash of Clans ? (en comptant tous les pièges comme une seule entité)', 'Quel piège est le moins cher à réarmer à son niveau maximum ?', 'En considérant que l\'attente entre les améliorations est nulle et que les héros sont améliorés un par un, combien de semaines vous faudra-t-il pour améliorer vos deux héros au niveau maximum ?'];
    var answers = {
        0: ['Sorcière', 'Molosse de lave', 'Gargouille'],
        1: ['12', '9,6', '7,4', '14'],
        2: ['3 752 500', '3 865 730', '4 134 600', '4 000 500'],
        3: ['Sort de Rage', 'Sort de Gel', 'Sort de Saut', 'Sort de Foudre', 'Sort de Guérison'],
        4: ['Sort de Gel', 'Sort de Foudre', 'Sort de Rage', 'Sort de Saut', 'Sort de Guérison'],
        5: ['2.205.262.500', '1.543.849.000', '4.463.836.000', '3.474.746.000'],
        6: ['3 000', '2 500', '2 600', '3 200'],
        7: ['15', '14', '12', '10', '20'],
        8: ['8%', '6%', '10%', '4%'],
        9: ['10 jours', '12 jours', '14 jours', '8 jours'],
        10: ['2,5 secondes', '3 secondes', '3,5 secondes', '4 secondes', '2 secondes'],
        11: ['Sapeur(s)', 'Golem(s)', 'Sorcière(s)/Sorcier(s)', 'P.E.K.K.A'],
        12: ['Tesla camouflée', 'Canon', 'Tour d\'archers', 'Tour de l\'enfer'],
        13: ['shaheen uae', 'Brandon', 'Chief Pat', 'iiwk'],
        14: ['1,2 case', '1,6 case', '1 case', '2 cases', '1,4 case'],
        15: ['09 avril 2014', '29 janvier 2014', '16 mai 2014', '04 juillet 2014'],
        16: ['1 101 000', '1 001 000', '1 451 000', '1 541 000'],
        17: ['11', '12', '10', '9', '13'],
        18: ['Bombe', 'Piège à ressort', 'Piège squelettique'],
        19: ['65 semaines', '50 semaines', '55 semaines', '60 semaines', '70 semaines']
    };
    var time = 30;
    var points = 0;
    var badanswers = 0,
        goodanswers = 0
        notanswers = 0;
    var timeinterval;
    var countquestions = 0;

    function finishquiz() {
        if (points < 0) {
            custommessage = "En dessous de 0 ! Allez réviser vos informations sur Clash of Clans et ce site est l'endroit parfait pour le faire !";
        } else if (points < 10) {
            custommessage = "Moins d'un quart des points, vous avez quelques notions sur Clash of Clans mais les informations annexes vous échappent, n'hésitez pas à les récolter en naviguant sur ce site, elles pourront vous être utile pour la suite du jeu.";
        } else if (points < 20) {
            custommessage = "En dessous de la moyenne mais ce n'est pas la catastrophe, vous avez les notions du jeu ainsi que quelques informations annexes mais la majorité d'entre elles vous sont inconnues, vous pouvez en apprendre d'autres en naviguant sur ce site si vous le souhaitez.";
        } else if (points < 30) {
            custommessage = "Vous avez plus que la moyenne, bravo ! Vous avez de bonnes connaissances du jeu mais vous ne le connaissez pas entièrement et ce site peut vous permettre d'étoffer vos connaissances déjà bonnes.";
        } else if (points < 40) {
            custommessage = 'Bravo ! Vous avez eu beaucoup de points, vous avez des connaissances extrêment bonnes du jeu et peu de choses doivent vous échapper. Cependant, en naviguant sur ce site, vous pourriez mettre la lumière sur ce "peu de choses" qui vous échappent encore.'
        } else if (points == 40) {
            custommessage = "Félicitations ! Vous avez répondu tout juste ! Soit vous êtes un fan absolu de SUPERCELL au point d'en connaître toutes les facettes, soit un fin tricheur ;).";
        }
        if (points > -2 && points < 2) {
            points += " point";
        } else {
            points += " points";
        }
        $('.quiz:first').html('<h3>Félicitations, vous avez terminé le quiz ! Alors, il était facile ou dur ? ;)<br />Toutes les réponses à ce questionnaire se trouve sur ce site et si vous souhaitez avoir la page où est indiqué l\'une des réponses, n\'hésitez pas à le demander dans les commentaires en bas de la page.<br />Maintenant, voici vos résultats :</h3><br />Vous avez un total de ' + points + ' sur 40 !<br /><h3>Vous avez eu ' + goodanswers + ' réponse(s) justes, ' + badanswers + ' réponse(s) fausses et vous n\'avez pas répondu à ' + notanswers + ' question(s) ou vous n\'avez pas répondu dans le temps imparti.</h3><br /><h4>' + custommessage + '</h4>');
    }
	function notime() {
        if ($("div.quiz > label").hasClass('disabled')) {
                return;
        }
		clearTimeout(timeinterval);
		$('div.quiz > label').addClass('disabled');
		$('.quiz input[name="answer"], .quiz label, #skip').prop('disabled', true);
		$('#quiz-time').html(0);
		notanswers += 1;
		countquestions += 1;
		nextquestions();
	}
    function nextquestions() {
        $('#quiz-time').html(30);
        var composent = $('.quiz:first');
        if (!questions[countquestions] || !answers[countquestions]) {
            finishquiz();
            return;
        }
        $(composent).html('<span style="text-align:center;"><i style="display:inline-block; margin-top:10px;"> Question n°' + Math.floor(countquestions + 1) + ': ' + questions[countquestions] + '</i></span>');
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
        $('div.quiz > label').not('label[for="skip"]').click(function () {
            if ($(this).hasClass('disabled')) {
                return;
            }
            //console.log($(this));
            $('div.quiz > label').addClass('disabled');
            $('.quiz input[name="answer"], .quiz label, #skip').prop('disabled', true);
            if (answers[countquestions][0] == $(this).html()) {
                points += 2;
                goodanswers += 1;
            } else {
                points -= 1;
                badanswers += 1;
            }
            $(this).siblings('input[name="answer"]').css('background-color', 'black');
            $(this).css('background-color', 'black');
            countquestions += 1;
            clearTimeout(timeinterval);
            setTimeout(nextquestions, 3000);
        });
    }
    function updatetime() {
        var time = $('#quiz-time').html();
        if (time > 30) {
            time = 30;
        }
        time -= 1;
        $('#quiz-time').html(time);
        if (time < 0) {
            notime();
            return;
        }
        timeinterval = setTimeout(updatetime, 1000);
    }
    $('.quiz:first').each(function () {
        $('.quiz').css('padding', '10px');
        $(this).html('<p style="color: #303030; line-height:28px;"><span style="display:inline; font-style:italic;">«&nbsp;Un quiz ? Haha ! Moi, personnellement, je connais tout sur Clash of Clans et je n\'ai pas besoin de quiz.&nbsp;»</span>&nbsp;→&nbsp;<b>N\'en soyez pas si sûr !</b><br /><br /><span style="display:inline; text-align:justify;">Nous vous proposons en cet été 2015 très chaud, un quiz sur un jeu dont certains ont passé plusieurs heures voire jours entiers dessus, c\'est-à-dire sur Clash of Clans.</span><br /><b><i>Mais connaissez-vous vraiment toutes les informations sur ce jeu ?</i></b><br />Ce quiz vous permettra de le savoir.</br />Ce quiz dure environ 5 minutes et il est composé de 20 questions, certaines assez faciles, d\'autres sont plus difficiles pour certains joueurs, certaines difficiles voire impossibles pour la majorité des joueurs et d\'autres piégeuses. En effet, ce quiz n\'est pas des plus simples.<br />En cliquant sur le bouton&nbsp;<i>C\'est parti !</i>, le quiz commencera et la première question s\'affichera.<br />Vous aurez 30 secondes pour répondre à chaque question, et il y a une seule bonne réponse par question. Ainsi, en cliquant sur la réponse où sur la boîte à cocher à gauche d\'elle, vous validerez la réponse sélectionnée.<br />Une fois la réponse validée, la réponse est affichée en noir car vous êtes dans le quiz sans correction (voir <a href="/wiki/Quiz_avec_correction">ici</a> pour le quiz avec correction). 3 secondes après, la prochaine question s\'affichera et ainsi de suite.<br />Et le pire arrive, le barème de points ! :<br />Une bonne réponse : +2 points<br />Une mauvaise réponse : -1 point<br />Aucune réponse : 0 point<br />Le quiz est donc sur 40 points et les points négatifs sont gardés haha !<br />Bonne chance !<br /><span style="display:inline; font-style:italic;">Note : Vous pourrez faire ce quiz autant de fois que vous voudrez, il n\'y a pas aucune restriction sur le nombre de fois que vous pouvez faire ce quiz.</span></p><br /><div class="button" style="font-size:18px; padding:8px;" id="quiz-start">C\'est parti !</div>');
        var position = $('#WikiaArticle').offset();
        $('#quiz-start').click(function () {
            $('.quiz').css('padding', '');
            $('html, body').animate({
                scrollTop: position.top - 50
            }, 'fast');
            nextquestions();
        });
    });
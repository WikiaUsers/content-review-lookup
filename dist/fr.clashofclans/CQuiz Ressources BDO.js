//Version modifiée de http://www.creativejuiz.fr/blog/tutoriels/personnaliser-aspect-boutons-radio-checkbox-css
//Code d'après Gguigui1
//Quiz Bâtiments de Ressource (base des ouvriers) avec correction
    mw.util.addCSS('\
.quizressourcesbdo { \
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
.quizressourcesbdo [type="radio"]:not(:checked), \
.quizressourcesbdo [type="radio"]:checked { \
  position: absolute; \
  left: -9999px; \
} \
.quizressourcesbdo [type="radio"]:not(:checked) + label, \
.quizressourcesbdo [type="radio"]:checked + label { \
  position: relative; \
  padding-left: 25px; \
  cursor: pointer; \
} \
.quizressourcesbdo [type="radio"]:not(:checked) + label:before, \
.quizressourcesbdo [type="radio"]:checked + label:before { \
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
.quizressourcesbdo [type="radio"]:not(:checked) + label:after, \
.quizressourcesbdo [type="radio"]:checked + label:after { \
  content: "X"; \
  position: absolute; \
  top: 0; left: 4px; \
  font-size: 16px; \
  color: #09ad7e; \
  transition: all .2s;  \
} \
.quizressourcesbdo [type="radio"]:not(:checked) + label:after { \
  opacity: 0;  \
  transform: scale(0);  \
} \
.quizressourcesbdo [type="radio"]:checked + label:after { \
  opacity: 1; \
  transform: scale(1); \
}');
    var questions = ['Pour un même niveau, quelle est la Mine d\'Or qui produit plus d\'Or que l\'autre entre celle du Village Principal et celle de la Base des Ouvriers ?', 'Quel est la troisième ressource que les joueurs ont l\'occasion d’extraire dans la Base des Ouvriers ?', 'Quelle est la capacité d\'une Mine de Gemmes de niveau 6 ?', 'Sachant que sa production est de 3,3 Gemmes par jour, quelle est-elle pour un mois de 30 jours ?', 'À quel niveau de la Maison des Ouvriers peut-on la construire ?', 'Parmi les Bâtiments ci-dessous, lequel existe également dans Clash Royale ?', 'De combien de petits réservoirs est composé un Réservoir d\'Élixir de niveau 4 ?', 'Combien peut-on posséder de Réservoirs d\'Élixir avec la Maison des Ouvriers au niveau 6 ?', 'Quelle est la capacité d\'une Réserve d\'Or de niveau 5 ?', 'Sachant que si on soustrayait les points d\'expérience acquis pour la construction d\'une Réserve niveau 1 et 2 (=102 pts à eux deux) à ceux d\'une Réserve niveau 6, on obtiendrait 87. Alors combien de points d’expérience gagne t-on pour l’amélioration d’une Réserve d\'Or au niveau 6 ?'];
    var answers = {
        0: ['La Mine d\'or de la Base des Ouvriers', 'La mine d\'or du Village Principal'],
        1: ['Des Gemmes', 'Des pièces de cuivre appartenant au Roi Gobelin', 'Des Diamants', 'De l\'Émeraude'],
        2: ['16 Gemmes', '14 Gemmes', '18 Gemmes'],
        3: ['99', '90,3', '101,6', '96'],
        4: ['MDO niveau 3', 'MDO niveau 1', 'MDO niveau 2'],
        5: ['Extracteur d\'Élixir', 'Mine d\'Or', 'Mine de Gemmes', 'Réservoir d\'Élixir'],
        6: ['4', '1', '2', '3'],
        7: ['2', '1', '3'],
        8: ['600 000 or', '450 000 or', '750 000 or', ' 500 000 or'],
        9: ['189', '179', '199'],
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
            custommessage = "En dessous de 0, pas de bol ! Heureusement, ce site est l'endroit idéal pour vous rattraper et devenir incollable sur les Ressources de la Base des Ouvriers";
        } else if (points < 5) {
            custommessage = "Moins d'un quart des points, vous avez quelques notions sur la Base des Ouvriers mais les informations annexes vous échappent, n'hésitez pas à les récolter en naviguant sur ce site, elles pourront vous être utile pour la suite du jeu.";
        } else if (points < 10) {
            custommessage = "En dessous de la moyenne mais ce n'est pas la catastrophe, vous avez les notions du jeu ainsi que quelques informations annexes mais la majorité d'entre elles vous sont inconnues, vous pouvez en apprendre d'autres en naviguant sur ce site si vous le souhaitez.";
        } else if (points < 15) {
            custommessage = "Vous avez plus que la moyenne, bravo ! Vous avez de bonnes connaissances du jeu mais vous ne le connaissez pas entièrement et ce site peut vous permettre d'étoffer vos connaissances déjà bonnes.";
        } else if (points < 20) {
            custommessage = 'Bravo ! Vous avez eu beaucoup de points, vous avez des connaissances extrêment bonnes du jeu et peu de choses doivent vous échapper, la dernière question a dû vous donner du fil à retordre, <b>MOUHAHAHA</b>. Cependant, en naviguant sur ce site, vous pourriez mettre la lumière sur ce "peu de choses" qui vous échappent encore.';
        } else if (points == 20) {
            custommessage = "Félicitations ! Vous avez répondu tout juste ! Soit vous êtes un fan absolu de SUPERCELL au point d'en connaître toutes les facettes, soit un fin tricheur ;).";
        }
        if (points > -2 && points < 2) {
            points += " point";
        } else {
            points += " points";
        }
        $('.quizressourcesbdo:first').html('<h3>Félicitations, vous avez terminé le quiz !<br />Dites-nous votre résultat dans les commentaires ! N\'oubliez-pas que vous pouvez toujours peaufiner vos connaissances en parcourant les articles du Wiki Clash of Clans, et ainsi viser les 20/20 au quiz !<br />Maintenant, voici vos résultats :</h3><br />Vous avez un total de ' + points + ' sur 20 !<br /><h3>Vous avez eu ' + goodanswers + ' réponse(s) justes, ' + badanswers + ' réponse(s) fausses et vous n\'avez pas répondu à ' + notanswers + ' question(s) ou vous n\'avez pas répondu dans le temps imparti.</h3><br /><h4>' + custommessage + '</h4>');
    }
	function notime() {
        if ($("div.quizressourcesbdo > label").hasClass('disabled')) {
                return;
        }
			clearTimeout(timeinterval);
            $('div.quizressourcesbdo > label').addClass('disabled');
            $('.quizressourcesbdo input[name="answer"], .quizressourcesbdo label, #skip').prop('disabled', true);
            notanswers += 1;
            $('div.quizressourcesbdo > label').each(function () {
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
        var composent = $('.quizressourcesbdo:first');
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
        $('div.quizressourcesbdo > label').not('label[for="skip"]').click(function () {
            if ($(this).hasClass('disabled')) {
                return;
            }
            //console.log($(this));
            $('div.quizressourcesbdo > label').addClass('disabled');
            $('.quizressourcesbdo input[name="answer"], .quizressourcesbdo label, #skip').prop('disabled', true);
            if (answers[countquestions][0] == $(this).html()) {
                $(this).siblings('input[name="answer"]').css('background-color', 'green');
                $(this).css('background-color', 'green');
                points += 2;
                goodanswers += 1;
            } else {
                $('div.quizressourcesbdo > label').each(function () {
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
    $('.quizressourcesbdo:first').each(function () {
        $('.quizressourcesbdo').css('padding', '10px');
        $(this).html('<p style="color: #303030; line-height:28px;">Depuis le 22 mai 2017, un second village a été ajouté dans Clash of Clans : <br /><b><i>La Base des Ouvriers !</i></b><br />Ce quiz vous permettra de tester vos connaissances sur les Bâtiments de Ressources de ce village secondaire. Composé de 10 questions, ce quiz ne dure que quelques minutes. En cliquant sur le bouton&nbsp;<i>C\'est parti !</i>, le quiz commencera et la première question s\'affichera.</br />Vous aurez 15 secondes pour répondre à chaque question, et il y a une seule bonne réponse par question. Cliquez sur une réponse pour la valider. Une fois votre réponse validée, la bonne réponse est affichée. Si la réponse sélectionnée s\'affiche vert, c\'était la bonne réponse, si elle s\'affiche rouge, la mauvaise et dans ce cas, la bonne s\'affichera en vert. 3 secondes après, la prochaine question s\'affichera et ainsi de suite. Voici le barème de points ! :</br />Bonne réponse : +2 points</br />Mauvaise réponse : -1 point</br />Aucune réponse : 0 point</br />Le quiz est donc sur 20 points et les points négatifs sont gardés haha !</br />À vous de jouer !</p><div class="button" style="font-size:18px; padding:8px;" id="quiz-start">C\'est parti !</div>');
        var position = $('#WikiaArticle').offset();
        $('#quiz-start').click(function () {
            $('.quizressourcesbdo').css('padding', '');
            $('html, body').animate({
                scrollTop: position.top - 50
            }, 'fast');
            nextquestions();
        });
    });
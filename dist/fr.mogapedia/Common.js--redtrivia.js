/* Anecdotes (Trivia) Monster Hunter — par Houmgaor.
   Affiche un formulaire permettant aux utilisateurs de soumettre de nouvelles
   questions/réponses sur la page « Trivia Monster Hunter ». Les données sont
   enregistrées dans la sous-page « Trivia Monster Hunter/data » via l'API.
   Prérequis : placer <div id="redtrivia"></div> sur la page cible. */
if (mw.config.get('wgPageName') == 'Trivia_Monster_Hunter') {
    var redtrivia = {
        'init' : function () {
            // Crée le formulaire de soumission de question
            $('#triviaform').html('<form name="triviaform" onsubmit="redtrivia.register();">\
            <span>Entrez votre question :</span><input type="text" name="question" maxlength="500" size="100" required/><br />\
            <span>Entrez la première réponse : </span><input type="text" name="answer1" oninput="redtrivia.check()" maxlength="40" required/><br />\
            <span>Si vous avez une remarque, ou autre chose à signaler</span><br/><input type="text" name="other" maxlength="800"/><br />\
            <input type="submit" value="Envoyer" />\
</form>');
        redtrivia.form = document.forms.triviaform;
        },
 
        'check' : function() {
            // Ajoute ou supprime dynamiquement des champs de réponse
            var inputs = redtrivia.answers(),
            empty = 0, i;
            // On compte les cases vides
            inputs.forEach(function (input) {
                if (input.value === '') empty ++;
            });
 
            // S'il n'y a plus de case vide, on ajoute une ligne
            if (empty === 0) {
                // i = numéro du prochain champ à ajouter
             i = 1;
                while (redtrivia.form['answer' + (++i)]);
                $(redtrivia.form['answer' + (i - 1)]).after('<br /><span>Réponse n°' + i + ' : </span><input type="text" name="answer' + i + '" oninput="redtrivia.check()" maxlength="40">');
            } else {
                // Sinon on supprime les lignes excédentaires
                for (i = inputs.length - 1; i > 0; i--) {
                    if (inputs[i].value === '' && empty > 1 && inputs[i].name != 'answer1') {
                        empty--;
                        $(inputs[i]).prev().remove();
                        $(inputs[i]).prev('br').remove();
                        inputs[i].outerHTML = '';
                    }
                }
            }
        },
 
        'answers' : function () {
            // Récupère et renvoie tous les champs de réponse du formulaire
            var foo = redtrivia.form.getElementsByTagName('input'), i, inputs = [];
            for (i = 0; i < foo.length; i++)
                if (foo[i].name)
                    if (foo[i].name.includes('answer'))
                        inputs.push(foo[i]);
            return inputs;
        },
 
        'register' : function () {
            // Enregistre la question via l'API MediaWiki
            // On désactive le bouton pour éviter les soumissions multiples
            redtrivia.form.querySelector('input[type="submit"]').disabled = true;
            var inputs = redtrivia.answers(),
            content = '\n' + redtrivia.form.question.value;
            inputs.forEach(function (i) {
                if (i.value !== '') content += '`' + i.value;
            });
            // Remarque optionnelle en fin de ligne
            content += '|' + redtrivia.form.querySelector('input[name="other"]').value;
            content = content.replace(/\|$/g, '');
        $.ajax({
            url: mw.util.wikiScript( 'api' ),
            data: {
                format: 'json',
                action: 'edit',
                title: 'Trivia Monster Hunter/data',
                summary: "Ajout automatique d'une nouvelle réponse",
                appendtext: content,
                token: mw.user.tokens.values.editToken
            },
            dataType: 'json',
            type: 'POST',
            success: function( data ) {
                if ( data && data.edit && data.edit.result == 'Success' ) {
                    redtrivia.form.innerText = "Question enregistrée avec succès ! La page va être rechargée";
                    setTimeout(function () {window.location.reload();}, 3000); // recharge la page après succès
                    return;
                } else if ( data && data.error ) {
                    alert( 'Erreur: code d\'erreur de l\'API "' + data.error.code + '": ' + data.error.info );
                } else {
                    alert( 'Erreur: résultat inconnu de l\'API.' );
                }
            },
            error: function( xhr ) {
                alert( 'Erreur: échec de la requête.' );
            }
        });
            // On réactive le bouton de soumission
            redtrivia.form.querySelector('input[type="submit"]').disabled = false;
            return;
        }
    };
 
    redtrivia.init();
}
/* Fait par Houmgaor, pour utiliser le code, vous devez mettre un div avec l'id "redtrivia" sur la page "Trivia Monster Hunter". Il suffit de copié-collé : <div id="redtrivia"></div> */
if (mw.config.get('wgPageName') == 'Trivia_Monster_Hunter') {
    var redtrivia = {
        'init' : function () {
            // Creates the form
            $('#triviaform').html('<form name="triviaform" onsubmit="redtrivia.register();">\
            <span>Entrez votre question :</span><input type="text" name="question" maxlength="500" size="100" required/><br />\
            <span>Entrez la première réponse : </span><input type="text" name="answer1" oninput="redtrivia.check()" maxlength="40" required/><br />\
            <span>Si vous avez une remarque, ou autre chose à signaler</span><br/><input type="text" name="other" maxlength="800"/><br />\
            <input type="submit" value="Envoyer" />\
</form>');
        redtrivia.form = document.forms.triviaform;
        },
 
        'check' : function() {
            // Adds or removes inputs from the form
            var inputs = redtrivia.answers(),
            empty = 0, i;
            // On compte les cases vides
            inputs.forEach(function (input) {
                if (input.value === '') empty ++;
            });
 
            // If there is no more space, we add a line
            if (empty === 0) {
                // i is the number of the input we want to add, there two inputs which are not questions
             i = 1;
                while (redtrivia.form['answer' + (++i)]);
                $(redtrivia.form['answer' + (i - 1)]).after('<br /><span>Réponse n°' + i + ' : </span><input type="text" name="answer' + i + '" oninput="redtrivia.check()" maxlength="40">');
            } else {
                // Then we remove supplementary lines
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
            // Reloads the answer inputs and returns them
            var foo = redtrivia.form.getElementsByTagName('input'), i, inputs = [];
            for (i = 0; i < foo.length; i++)
                if (foo[i].name)
                    if (foo[i].name.includes('answer'))
                        inputs.push(foo[i]);
            return inputs;
        },
 
        'register' : function () {
            // Registers the output from the form
            // We hide the button, preventing multi-sumbiting
            redtrivia.form.querySelector('input[type="submit"]').disabled = true;
            var inputs = redtrivia.answers(),
            content = '\n' + redtrivia.form.question.value;
            inputs.forEach(function (i) {
                if (i.value !== '') content += '`' + i.value;
            });
            // The last note
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
                    setTimeout(function () {window.location.reload();}, 3000); // reload page if edit was successful
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
            // Then we can show the button
            redtrivia.form.querySelector('input[type="submit"]').disabled = false;
            return;
        }
    };
 
    redtrivia.init();
}
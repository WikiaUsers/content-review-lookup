// Auteur @Think D. Solucer
// Script pour tester si un utilisateur rentre bien le bon nombre d'octets demandés avant de publier
if (console)
    console.log("Version 1.00");
    
function wordCount( val ){
            return val.length;
        }

var nb_base;
var FLAG_UN = 0;
        
switch(wgTransactionContext.action)
    {
        case "edit":
            if ( FLAG_UN === 0 )
                {
                $('*').on('mouseover', '#wpTextbox1', function(){
                    nb_base = wordCount( this.value );
                });
                    FLAG_UN = 1;
                }
            
                $('#wpTextbox1').on('input', function(){    
                  var c = wordCount( this.value );
                  difference = c - nb_base;
                    if ( difference <= 2 && difference >= -2 ) // -2 <= Diff <= 2
                    {
                        $("#wpSave").replaceWith('<span id="wpSave" style="color:red; font-size:15px; font-weight: bold;">Pas assez de mots</span>');
                        $("#wpSummary").replaceWith('<span id="wpSummary" style="color:red; font-size:15px; font-weight: bold;">T\'as ajouté pour l\'instant ' + difference + ' caractère(s).</span>');
                    }
                    else
                    {
                        $("#wpSave").replaceWith('<input class="control-button even" tabindex="22" id="wpSave" name="wpSave" type="submit" value="Publier" accesskey="s">');
                        $('#wpSummary').replaceWith('<input type="text" id="wpSummary" name="wpSummary" placeholder="Ajouter un résumé de vos modifications" tabindex="1" value="" maxlength="250">');
                    }
                });
            break;
        case "view":
            // A voir plus tard
            break;
        default:
            break;
    }
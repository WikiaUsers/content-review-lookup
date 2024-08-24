/**********************************************************************/
/*  WikiaNotifications: Reglas,                                       */
/*                      extraído de "SmashPedia" [[w:c:es.smashbros]] */
/**********************************************************************/

function editMensaje() { $('#EditPageHeader').after('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div data-type="1"><a class="sprite close-notification"></a><a href="/index.php?title=Reglas">Reglas</a>.</div></li></ul>'); }   addOnloadHook(editMensaje);


/**********************************************************************/
/*  Desactivar votaciones cuando el hilo esté cerrado,                */
/*                         extraído de "Ben 10 Wiki" [[w:c:es.ben10]] */
/**********************************************************************/

$(function() {
    if ($(".deleteorremove-infobox").is('*')) {
        $('input[name="wpVote"]').attr('disabled','disabled')
                                 .attr('value','Votación finalizada');
    }
});
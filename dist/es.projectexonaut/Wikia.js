importScriptPage('FloatingToc/code.js', 'dev');
/* Mensaje de edici�n */

function editMensaje() { $('#EditPageHeader').after('<ul id="WikiaNotifications" class="WikiaNotifications"><li><div data-type="1"><a class="sprite close-notification"></a><a href="/index.php?title=Wiki_Proyect_Exonaut%3AReglas_de_edici%C3%B3n_de_art%C3%ADculos">Reglas de edici�n</a>.</div></li></ul>'); }   addOnloadHook(editMensaje);
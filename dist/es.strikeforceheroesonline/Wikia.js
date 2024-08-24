 // Bot�n para ir arriba
importScriptPage('BackToTopButton/code.js', 'dev');
// Editar introducci�n de los art�culos
EditIntroButtonText = 'Editar introducci�n';
importScriptPage('EditIntroButton/code.js', 'dev');
// Men�es desplegables con hover
window.AutoEditDropdownConfig = {
    expandedAreaContribute: true,
    expandedAreaEdit: true
};
 
importArticles({
    type: 'script',
    articles: [
        'w:c:dev:AutoEditDropdown/code.js'
    ]
});
// Lista de administradores
   // <div id="admin-list"></div>
importScriptPage('ListAdmins/code.js', 'dev');
// No comentarios en entradas de blog antiguas
   // 30 d�as
window.LockOldBlogs = {
    expiryDays: 30,
    expiryMessage: "Este blog no ha tenido actividad desde hace m�s de 30 d�as, por lo cual no puedes dejar comentarios ya que ser�a in�til.",
    nonexpiryCategory: "Blogs permanentes"
};
 
 
importArticles({
    type: "script",
    articles: [
        "w:c:dev:LockOldBlogs/code.js"
    ]
});
// Actualizar p�gina
PurgeButtonText = 'Actualizar p�gina';
importScriptPage('PurgeButton/code.js', 'dev');
// Referencias pop-ups
importScriptPage('ReferencePopups/code.js', 'dev');
// IP de an�nimos
importScriptPage('RevealAnonIP/usercode.js', 'dev');
// Inspecci�n de hilos
importScriptPage('Thread Inspection/code.js', 'dev');
// Slider de tiempo
importScriptPage('TimedSlider/code.js', 'dev');
// Mejores editores
   // <div class="topeditors" data-te-namespace="" data-te-type="edit|new" data-te-show="" data-te-user="" data-te-limit="25" data-te-offset="7">generando lista...</div>
      // data-te-namespace: espacio de nombres, separar con barras "|"
      // data-te-type: tipo de ediciones a considerar, separar con barras "|"
         // Se pueden usar "edit" para ediciones, "new" para creaci�n de art�culos y "log" para registros
      // data-te-show: tipo de ediciones a ocultar, separar con barras "|"
         // Se pueden usar "minor" para ocultar ediciones menores, "bot" para ocultar ediciones de bot, "anon" para ocultar ediciones de an�nimos, "redirect" para ocultar redirecciones y "patrolled" para ocultar patrullajes
         // Agregar un signo de interrogaci�n "!" para ocultar opuestos, ejemplo: !minor
      // data-te-user: usuario espec�fico. No poner el prefijo de usuario:
      // data-te-limit: usuarios a mostrar
      // data-te-offser: d�as a tomar en cuenta
importScriptPage('TopEditors/code.js', 'dev');
 
/****************************************/
/*Necesario para (Plantilla:Desplegable)*/
/****************************************/
importScriptPage('ShowHide/code.js', 'dev');
/* Texto de la busqueda - by ShermanTheMythran */
$('.Search .WikiaSearch input[name="search"]').attr('placeholder','Buscar en esta wiki');
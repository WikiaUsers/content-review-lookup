/* Activar� el bot�n que le permitira borrar una notificaci�n de un art�culo div */
$(".nota-cerrar").click(function() {
  $(this).parent()
  .animate({ opacity: 0 }, 250, function() {
    $(this)
    .animate({ marginBottom: 0 }, 250)
    .children()
    .animate({ padding: 0 }, 250)
    .wrapInner("<div />")
    .children()
    .slideUp(250, function() {
      $(this).closest(".nota").remove();
    });
  });
});
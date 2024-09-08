/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página */

window.AddRailModule = [{prepend: true}];

mw.hook('Discord.widget.rail').add(function() {
  if ($('section.rail-module.activity-module').length)
    $('section.rail-module.discord-module').insertAfter('section.rail-module.activity-module');
});
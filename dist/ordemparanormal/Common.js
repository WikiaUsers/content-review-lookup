/* C�digos JavaScript colocados aqui ser�o carregados por todos que acessarem alguma p�gina desta wiki */

window.AddRailModule = [{prepend: true}];

mw.hook('Discord.widget.rail').add(function() {
  if ($('section.rail-module.activity-module').length)
    $('section.rail-module.discord-module').insertAfter('section.rail-module.activity-module');
});
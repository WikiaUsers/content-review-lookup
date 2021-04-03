window.AddRailModule = [{prepend: true}];

mw.hook('Discord.widget.rail').add(function() {
  if ($('section.rail-module.activity-module').length)
    $('section.rail-module.discord-module').insertAfter('section.rail-module.activity-module');
});
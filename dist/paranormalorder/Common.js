/* Any JavaScript here will be loaded for all users on every page load. */

mw.hook("Discord.widget.rail").add(function() {
  if ($("section.rail-module.activity-module").length)
    $("section.rail-module.discord-module").insertAfter("section.rail-module.activity-module");
});
window.AddRailModule = [{prepend: true}];

mw.hook('AddRailModule.module').add(function() {
  mw.hook('dev.wds').add(function(wds) {
    $('.railModule.rail-module h2.has-icon').prepend(
      wds.icon('discord', {'class': 'wds-icon-small'})
    );
    wds.render('h2.has-icon');
  });
});
//<source lang="javascript">
switch (wgPageName) {
     case 'Client':
          $(function () {
               $('<iframe id="wikimarks-server" src="http://pecoes.wikia.com/wiki/Server?action=render" frameborder="0" width="1" height="1"></iframe>')
               .appendTo('body');
               console.log('#wikimarks-server');
          });
          break;
     case 'Server':
          if (self == top) return;
          window.getWikimarks = function () {
               var loaded = false;
               var callbacks = [];
               $(function () {
                    loaded = true;
                    var callback;
                    while (callback = callbacks.shift()) {
                         callback(localStorage('works'))
                    }
               });
               return function (callback) {
                    if (loaded) callback(localStorage('works'));
                    else callbacks.push(callback);
               }
          }();
          break;
}
//</source>
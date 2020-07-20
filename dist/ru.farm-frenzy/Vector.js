//"add section" at the bottom
if( mw.config.get('wgNamespaceNumber') && mw.config.get('wgAction') == 'view' )
 $('#ca-addsection a').clone()
 .css({'float':'right', 'font-size':'0.8em', 'color':'#0645ad', 'padding':'4px 0.5em',
  'background':'#f2f7fb url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAIAAABmjeQ9AAAARElEQVR42mVO2wrAUAhy/f8fz+niVMTYQ3hLKkgGgN/IPvgIhUYYV/qogdP75J01V+JwrKZr/5YPcnzN3e6t7l+2K+EFX91B1daOi7sAAAAASUVORK5CYII=)',
  'border':'1px outset #a7d7f9', 'border-top-style':'none'})
 .insertAfter('#content')
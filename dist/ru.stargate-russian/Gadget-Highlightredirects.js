/*
Глобальные переменные:
redir_style - style for redirects (default='color:green') //стиль редиректов, по умолчанию 'color:green'
redir_vis_style - style for visited redirects (default='color:darkgreen') //стиль посещенных редиректов, по умолчанию 'color:darkgreen'
tab_redir - show the tab (default=false) //показывать закладку, по умолчанию false
*/
// example
//redir_style='background-color:pink !important'
//redir_vis_style='background-color:pink !important'
//tab_redir = true

if (wgAction != 'edit' && wgCanonicalNamespace != 'Special')
{
var highlightRedirects = {

run : function()
{
    var redir_style=window.redir_style || 'color:#338800'
    var redir_vis_style=window.redir_vis_style || 'color:#338899'
    appendCSS('a.mw-redirect { ' + redir_style + '} a.mw-redirect:visited { '+redir_vis_style+'}');
},

install : function()
{
    with(highlightRedirects)
    {
        if (window.tab_redir) {
            addPortletLink ('p-cactions', 'javascript:highlightRedirects.run();', 'redirects') ||
            addPortletLink ('views', 'javascript:highlightRedirects.run();', 'redirects');
        } else {
            if ( wgNamespaceNumber >= 0 ) highlightRedirects.run();
        }
    }
}

};
 
//
// Hook up installation function
//
addOnloadHook(highlightRedirects.install);
}
// <source lang="JavaScript">

/**
 * Workaround for [[bugzilla:708]] via [[Template:InterProject]].
 * Originally based on code from [[wikt:de:MediaWiki:Common.js]] by [[wikt:de:User:Melancholie]],
 * cleaned up and modified for compatibility with the Vector skin.
 *
 * Maintainer(s): [[User:Ilmari Karonen]]
 */
addOnloadHook( function () {
    if ( document.getElementById('p-interproject') ) return;  // avoid double inclusion

    var interPr = document.getElementById('interProject');
    var sisterPr = document.getElementById('sisterProjects');
    if (!interPr) return;

    var toolBox = document.getElementById('p-tb');
    var panel;
    if (toolBox) {
        panel = toolBox.parentNode;
    } else {
        // stupid incompatible skins...
        var panelIds = ['panel', 'column-one', 'mw_portlets', 'mw-panel'];
        for (var i = 0; !panel && i < panelIds.length; i++) {
             panel = document.getElementById(panelIds[i]);
        }
        // can't find a place for the portlet, try to undo hiding
        if (!panel) {
            appendCSS( '#interProject, #sisterProjects { display: block; }' );
            return;
        }
    }

    var interProject = document.createElement("div");
    interProject.id = "p-interproject";
    interProject.className = (skin == "vector" ? "portal" : "portlet");

    interProject.innerHTML =
        '<h5><a href="/wiki/Commons:SisterProjects">' +
        (sisterPr && sisterPr.firstChild ? sisterPr.firstChild.innerHTML : "Sister Projects") +
        '<\/a><\/h5><div class="' + (skin == "vector" ? "body" : "pBody") +'">' +
        interPr.innerHTML + '<\/div>';

    if (toolBox && toolBox.nextSibling) {
        panel.insertBefore(interProject, toolBox.nextSibling);
    } else {
        panel.appendChild(interProject);
    }
} );
appendCSS( '#interProject, #sisterProjects { display: none; }' );

// </source>
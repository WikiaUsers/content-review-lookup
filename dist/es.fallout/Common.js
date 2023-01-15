/* <nowiki> */

/* ######################################################################## */
/* ### El JavaScript aquí se carga para todos los usuarios y pieles     ### */
/* ######################################################################## */

// Back to Top
window.BackToTopModern = true;
window.BackToTopArrow = true;

/* ######################################################################### */
/* ### ARCHIVE TOOL                                                      ### */
/* ### ----------------------------------------------------------------- ### */
/* ### Descripción: Archivado de páginas de discusión mediante de GUI    ### */
/* ### Créditos:    Usuario:Dantman (original)                           ### */
/* ###              Usuario:Porter21 (Oasis & Monobook support)          ### */
/* ### Aviso legal: Véase https://dev.wikia.com/wiki/ArchiveTool/code.js ### */
/* ######################################################################### */
window.ArchiveToolConfig = {
   archiveListTemplate: "Archivados",
   archivePageTemplate: "PágArchivada",
   archiveSubpage: "Archivado",
   userLang: true
};

/* ######################################################################## */
/* ### CÓDIGO COMPARTIDO                                                ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Utilizado por varios módulos                        ### */
/* ### Créditos:    varios                                              ### */
/* ######################################################################## */

/**
 * Removes lazy loading from all images contained in `lazyIcon`.
 * 
 * By User:Sakaratte. 
 */
function removeLazyLoad(lazyIcon) {
    var lazyIconImages = lazyIcon.getElementsByTagName("img");
    for (var i = 0; i < lazyIconImages.length; i++) {
        var iconSrc = lazyIconImages[i].getAttribute("data-src");
        if (iconSrc !== null)
            lazyIconImages[i].setAttribute("src", iconSrc);
        lazyIconImages[i].className = "";
    }
}

/* ######################################################################## */
/* ### ICONOS DE TÍTULO (Plantilla:Juegos)                              ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Descripción: Añade iconos al título del artículo                 ### */
/* ### Créditos:    Usuario:Porter21                                    ### */
/* ######################################################################## */
/*
$(function() {
    if (window.wgIsMainpage)
        return;
    if (wgNamespaceNumber !== 0 && wgNamespaceNumber !== 4 && wgNamespaceNumber !== 110 && wgNamespaceNumber !== 502)
        return;
    if (skin !== "oasis" && skin !== "fandomdesktop")
        return;

    var wrapper = $("#va-titleicons-wrapper");
    var iconBar = $("#va-titleicons");
    var previewBar = $("#va-titleicons-preview");
    if (wrapper.length === 0 || iconBar.length === 0 || $("a", previewBar).length === 0)
        return;

    var articleDiv = $("#content");
    if (articleDiv.length > 0) {
        iconBar.css("display", "block");
        wrapper.prependTo(articleDiv);
    }

    $("#va-titleicons-more").append("<img width='0' height='0' class='va-titleicons-chevron' src='https://images.wikia.nocookie.net/common/skins/common/blank.gif'>");

    iconBar.hover(
        function() { $(this).addClass("va-titleicons-hover"); },
        function() { $(this).removeClass("va-titleicons-hover"); }
    );
    
    removeLazyLoad(document.getElementById("va-titleicons-preview"));
    removeLazyLoad(document.getElementById("va-titleicons-fullsize"));
});
*/
/* ############################################################################# */
/* ### MARQUESINA MÓVIL (Plantilla:Marquesina)                               ### */
/* ### --------------------------------------------------------------------  ### */
/* ### Descripción: Muesta una marquesina móvil                              ### */
/* ### Créditos:    desconocido                                              ### */
/* ###              Usuario:FDekker                                          ### */
/* ############################################################################# */
$(function() {
    $(".ticker").each(function(_, ticker) {
        var step = 10;  // How many pixels to move text each tick
        var tickerSpeed = 200;
        
        ticker = $(ticker);
        
        if (ticker.attr('data-speed') !== undefined)
            tickerSpeed = parseInt(ticker.attr('data-speed'));
            
        if (ticker.attr('data-step') !== undefined)
            step = parseInt(ticker.attr('data-step'));
            
        ticker.css("display", "block");

        var wrapper = $(".tickerWrapper", ticker);
        wrapper.css("left", (step + ticker.width()) + "px");

        var text = $(".tickerText", ticker);
        var textWidth = text.outerWidth();

        setInterval(function() {
            var offset =
                (wrapper.position().left > -(textWidth + step))
                    ? (wrapper.position().left - step) + "px"  // Move left
                    : (ticker.width() + step) + "px";  // Reset
            wrapper.css("left", offset);
        }, tickerSpeed);
    });
});

/* ######################################################################### */
/* ### Imagenes del Staff                                                ### */
/* ### ----------------------------------------------------------------- ### */
/* ### Descripción: Carga las imágenes del equipo de administradores.    ### */
/* ### URL: https://es.fallout.wikia.com/wiki/El Refugio:Administradores ### */
/* ### Créditos:    Usuario:TwoBearsHigh-Fiving                          ### */
/* ###              Usuario:FDekker                                      ### */
/* ######################################################################### */
$(function() {
    var placeholderClass = "user-image-placeholder";

    var placeholders = $("." + placeholderClass);
    if (placeholders.length === 0) 
        return;

    var users = placeholders
        .map(function(_, placeholder) { 
            return $(placeholder).attr("data-user");
        })
        .map(function(_, user) {
        	return user.replace(/@/g, "\"");
        })
        .toArray();
 
    $.ajax({
        url: "https://" + window.location.hostname + "/es/api/v1/User/Details",
        data: { "ids": users.join(",") },
        success: function(response) {
            response.items.forEach(function(item) {
            	var escapedName = item.name.replace(/"/g, "@");

            	$("." + placeholderClass + "[data-user]")
        			// Separate filter to support quotes in usernames
            		.filter(function() {
            			return $(this).data("user") === escapedName;
            		})
                    .each(function(_, placeholder) {
                        placeholder = $(placeholder);

                        var width = placeholder.attr("data-width");
                        var height = placeholder.attr("data-height");
                        if (width === undefined && height === undefined) {
                            width = "100px";
                            height = "100px";
                        } else if (width === undefined || height === undefined) {
                            width = width || height;
                            height = width || height;
                        }

                        placeholder.html(
                            "<img style='width: " + width + "; height: " + height + ";' " +
                                 "src='" + item.avatar + "'/>"
                        );
                    });
            });
        },
        dataType: "json"
    });
});

/* ##################################################################################### */
/* ### Contenido notable                                                             ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Descripción: Crea una plantilla colapsable donde no sea adecuado              ### */
/* ### usar mw-collapsable                                                           ### */
/* ### URL: https://fallout.wikia.com/wiki/Fallout_Wiki:Notable_content/draft        ### */
/* ### Creditos:    Usuario:Sakaratte                                                ### */
/* ##################################################################################### */

$(function() {
    var collapseCaption = "Contraer";
    var expandCaption = "Expandir";

    document.querySelectorAll(".np-collapsible").forEach(function(collapsible) {
        removeLazyLoad(collapsible);

        var collapsed = collapsible.querySelector("#np-collapsed");
        var helip = collapsible.querySelector("#np-helip");
        helip.innerHTML = expandCaption;
        helip.addEventListener("click", function(e) {
            var navState = helip.innerHTML;
            var navClassList = collapsed.classList;

            if (navState == expandCaption) {
                navClassList.add("np-visible");
                navClassList.remove("np-hidden");
                helip.innerHTML = collapseCaption;
            } else {
                navClassList.remove("np-visible");
                navClassList.add("np-hidden");
                helip.innerHTML = expandCaption;
            }
        });
    });
});

/* ##################################################################################### */
/* ### Multiple File Delete                                                          ### */
/* ### ----------------------------------------------------------------              ### */
/* ### Description: Es un script que agrega un botón de "Eliminación selectiva" a    ### */
/* ### las páginas especiales                                                        ### */
/* ### Credit:      User:Spottra - KhangND (reescrito)                               ### */
/* ##################################################################################### */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:MultipleFileDelete/code.js',
    ]
});
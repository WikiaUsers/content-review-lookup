/* <nowiki> */

/* ################################################################################### */
/* ### Ce code JavaScript est chargé pour tous les utilisateurs et tous les skins. ### */
/* ################################################################################### */

/* ######################################################################## */
/* ### CODE PARTAGÉ                                                     ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description : Utilisé par de multiples modules                   ### */
/* ### Crédits :      various                                           ### */
/* ######################################################################## */

/**
 * Retire le chargement paresseux de toutes les images contenues dans `lazyIcon`.
 * 
 * Par l'utilisateur : Sakaratte. 
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
/* ### ICÔNES DE TITRES (Modèle:Jeux)                                   ### */
/* ### ---------------------------------------------------------------- ### */
/* ### Description : Ajoute les icônes à un titre d'article             ### */
/* ### Crédits :     Utilisateur:Porter21                               ### */
/* ######################################################################## */

$(function() {
    if (window.wgIsMainpage)
        return;
    if (wgNamespaceNumber !== 0 && wgNamespaceNumber !== 4 && wgNamespaceNumber !== 110 && wgNamespaceNumber !== 502)
        return;
    if (skin !== "oasis" && skin !== "wikia")
        return;

    var wrapper = $("#va-titleicons-wrapper");
    var iconBar = $("#va-titleicons");
    var previewBar = $("#va-titleicons-preview");
    if (wrapper.length === 0 || iconBar.length === 0 || $("a", previewBar).length === 0)
        return;

    var articleDiv = $(".WikiaArticle");
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

/* ############################################################################# */
/* ### TICKER                                                                ### */
/* ### --------------------------------------------------------------------  ### */
/* ### Description : Affiche un ticker, dans le [[Modèle:Ticker]]            ### */
/* ### Crédits :      inconnu                                                ### */
/* ###              Utilisateur:FDekker                                      ### */
/* ############################################################################# */
$(function() {
    var step = 10;  // How many pixels to move text each tick

    $(".ticker").each(function(_, ticker) {
        ticker = $(ticker);
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
        }, 200);
    });
});

/* ###################################################################################### */
/* ### Images du personnel                                                            ### */
/* ### --------------------------------------------------------------------           ### */
/* ### Description : Charge toutes les dernières images du personnel sur la page.     ### */
/* ### URL: https://fallout.wikia.com/wiki/Fallout_Wiki:Administrators_and_moderators ### */
/* ### Crédits :    Utilisateur:TwoBearsHigh-Fiving                                   ### */
/* ###              Utilisateur:FDekker                                               ### */
/* ###################################################################################### */
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
        	return user.replace(/@/g, "\"")
        })
        .toArray();
 
    $.ajax({
        url: "https://" + window.location.hostname + "/api/v1/User/Details",
        data: { "ids": users.join(",") },
        success: function(response) {
            response.items.forEach(function(item) {
            	var escapedName = item.name.replace(/"/g, "@")

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
/* ### Contenu notable                                                               ### */
/* ### --------------------------------------------------------------------          ### */
/* ### Description : Crée un modèle réductible où "mw-collapsable" ne convient pas   ### */
/* ###              à l'utilisation.                                                 ### */
/* ### URL : https://fallout.fandom.com/wiki/Fallout_Wiki:Notable_content/draft      ### */
/* ### Crédits :      Utilisateur:Sakaratte                                          ### */
/* ##################################################################################### */

$(function() {
    var collapseCaption = "Less";
    var expandCaption = "More";

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
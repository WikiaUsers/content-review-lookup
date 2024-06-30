/* Any JavaScript here will be loaded for all users on every page load. */
/*Open Game using URI, and launch a toast*/
$(function() {
    function openRobloxLink() {
        var link = "roblox://placeId=12018816388";
        window.open(link, "_self");

        mw.hook("dev.toasts").add(function(toasts) {
            var toastMessage = "Game Launched!";
            toasts.success(toastMessage);
        });
    }

    $('.play-dovedale').click(function() {
        openRobloxLink();
    });
});
/*tally form embed*/
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.tallyforms').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://tally.so/embed/' + id ,
                css: css
            })
        );
    });
});

/*Wikisite hookup embed*/
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.wiki-site-embed').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://wiki.enews.link/' + id ,
                css: css
            })
        );
    });
});
/* PDF Functionality */
var pdfs = document.querySelectorAll(".mw-parser-output .pdf");
pdfs.forEach(function(e)
{
    var embed = document.createElement("embed");
    embed.src = e.dataset.src;
    embed.type = "application/pdf";
    embed.style.cssText = e.style.cssText;
    e.replaceWith(embed);
});

/* Google Forms embed for forms without the /e attr. */
mw.hook('wikipage.content').add(function($content) {
    if (!$content) {
        return;
    }
    $content.find('.googleforms-alt').each(function() {
        var $this = $(this),
            id = $this.attr('data-forms-id'),
            widget = $this.attr('data-widget') || true;
            css = {
                width: 'inherit',
                height: 'inherit',
                border: 0
            };
        $this.html(
            $('<iframe>', {
                src: 'https://docs.google.com/forms/d/' + id + '/viewform?embedded=true&hl=' + mw.config.get('wgUserLanguage'),
                css: css
            })
        );
    });
});

/*Signalling Guide Notifications*/
$(document).ready(function() {
    mw.hook('dev.toasts').add(function(Toasts) {
        var mainPageToasts = $('.SignallingGuideToasts');
        if (mainPageToasts.length) {
            Toasts.success("We've recently updated this page. Drop your feedback in the comments!", { icon: 'success'});
        }
    });
});

/* New Popup */
document.addEventListener("DOMContentLoaded", function() {
    var popupHtml = `
        <div id="popup" class="popup">
            <div class="popup-content">
                <span class="close" onclick="closePopup()">&times;</span>
                <h2>Welcome!</h2>
                <p>We have launched a new website. Check it out!</p>
                <button id="visitButton">Visit New Site</button>
            </div>
        </div>
    `;

    // Append the popup HTML to the body
    document.body.insertAdjacentHTML('beforeend', popupHtml);

    var popup = document.getElementById("popup");
    popup.style.display = "block";

    var visitButton = document.getElementById("visitButton");
    visitButton.addEventListener("click", function() {
        window.location.href = "https://dovedale.wiki";
    });
});

function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}
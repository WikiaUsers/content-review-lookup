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
/*Main Page NOtifications*/
$(document).ready(function() {
    mw.hook('dev.toasts').add(function(Toasts) {
        var mainPageToasts = $('.MainPageToasts');
        if (mainPageToasts.length) {
            Toasts.info("We've recently updated the Signalling Guide page. Check it out!", { icon: 'info', timeout: 5000 });
             Toasts.warning("Dovedale has recently updated to V1.0. During this time, some pages may be out of date as we work on editing. Thank you for your patience.", { icon: 'warning', timeout: 5000 });

        }
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
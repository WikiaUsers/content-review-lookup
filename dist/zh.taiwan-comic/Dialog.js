var currentTooltipsShows = null; // The identifier of current tooltips
const cached = {};               // Cached data of tooltips

/**
 *  A debounce function that delays the execution of a function
 * @param {Function} func The function to be executed
 * @returns {Function} A function that delays the execution of the input function
 */
function debounce(func) {
    var timeout = null;
    const delay = 300;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timeout)

        timeout = setTimeout(function () {
            func.apply(context, args)
        }, delay)
    }
}

/**
     * Create a tooltips contains body
     * @param  {JQuery<HTMLElement>} component The HTML elements to insert in the tooltips
     * @returns {JQuery<HTMLDivElement>[]} The tooltips box and its arrow
     */
function createTooltipBox(component) {
    const dialog = $('<div class="dialog"></div>');
    const dialogArrow = $('<div class="dialog-arrow"></div>');
    dialog.append(dialogArrow);
    dialog.append(component)

    return [dialog, dialogArrow];
}

/**
 * Generate `left` and `translateX` attribute for dialog
 * @param {HTMLAnchorElement} aTag
 * @param {JQuery<HTMLDivElement>} dialog
 * @param {JQuery<HTMLDivElement>} dialogArrow 
 * @returns {string[]}`left` and `translateX` attribute 
 */
function generateLeftAttr(aTag, dialog, dialogArrow) {

    var leftAttr;
    var translateX; // transform attribute for CSS

    const containerWidth = $('.page-content').width();  // The `width` of the container

    const left = $(aTag).offset().left;             // The `left` relative to the document
    const containerLeft = $(".page").offset().left; // The `left` of topest container
    const targetLeft = left - containerLeft;        // The target `left` to be set to the dialog. (This value is relative to the topest container instead of the document)

    // Doesn't exceed the width of page || it is too left to show at the left ---> show it at the right
    if ((targetLeft + dialog.innerWidth() < containerWidth) || (targetLeft - dialog.innerWidth() < 0)) {
        leftAttr = "calc(" + targetLeft + "px - 1rem)";
        dialogArrow.css("left", 0);
        translateX = "50%";

    } else {  // Shows at the left
        leftAttr = "calc(" + (targetLeft - dialog.innerWidth()) + "px + 1.5rem)";
        dialogArrow.css("right", 0);
        translateX = "-50%";
    }
    return [leftAttr, translateX];
}

/**
 * Generate `top` and `translateY` attribute for dialog
 * @param {HTMLAnchorElement} aTag
 * @param {JQuery<HTMLDivElement>} dialog
 * @param {JQuery<HTMLDivElement>} dialogArrow 
 * @returns {string[]} `top` and `translateY` attribute 
 */
function generateTopAttr(aTag, dialog, dialogArrow) {
    var topAttr;
    var translateY;

    // Set `top` of the tooltip dialog
    const scrollTop = $(window).scrollTop();  // The value you scrolled down
    const windowHeight = $(window).height();  // The `height` of your current browser

    const top = $(aTag).offset().top;               // The `top` relative to the document
    const containerTop = $(".page").offset().top;   // The `top` of the topest container
    const targetTop = top - containerTop;  // The target `top` to be set to the dialog. (This value is relative to the topest container instead of the document)

    var topAttr;
    if (top + dialog.innerHeight() + 50 - scrollTop < windowHeight) { // Doesn't exceed the height of window (50px is for preserving some space at the bottom of the dialog)
        topAttr = "calc(" + (targetTop) + "px + 1.5rem)";
        dialogArrow.css({
            top: 0,
            "border-color": "transparent transparent var(--theme-page-background-color--secondary) transparent",
            "border-width": "0 10px 10px 10px"
        });
        translateY = "-100%";
    } else {
        topAttr = "calc(" + (targetTop - dialog.innerHeight()) + "px - 0.7rem)";
        dialogArrow.css({
            bottom: 0,
            "border-color": "var(--theme-page-background-color--secondary) transparent transparent transparent",
            "border-width": "10px 10px 0 10px"
        });
        translateY = "100%";
    }
    return [topAttr, translateY];
}


/**
 * Bind events on anchor tag to show the tooltips
 * @param {HTMLAnchorElement} aTag An anchor tag that shows the tooltips
 * @param {number|string} tooltipsID The identifier for this tooltips. All the identifier passed to this param must not be duplicated
 * @param {Function} callback A function should return a Promise object with *an* HTML element to show in the tooltips.
 *                            This function will be executed when hovering on a link.
 *                            The result will be cached, so don't worry the same actions will be executed many times
 */
function bindEventOnTooltips(aTag, tooltipsID, callback) {

    /**
     * Get tooltips body from cached or from callback function
     * Since Fandom doesn't support async/await keyword :( , this function is born
     * @returns {Promise<JQuery<HTMLElement>>} Tooltips Body
     */
    function getTooltipsBody() {
        return new Promise(function (resolve, reject) {
            var tooltipsBody;
            if (tooltipsID in cached) {  // Found in cache
                tooltipsBody = cached[tooltipsID];
                resolve(tooltipsBody);

            } else { // Not found in cache, execute the callback function
                callback().then(function (tooltipsBody) {
                    cached[tooltipsID] = tooltipsBody;  // Cache it
                    resolve(tooltipsBody)

                }).catch(function (error) {
                    reject(error);
                });
            }
        });
    }
    

    $(aTag).on('mouseenter', function () {

        if (currentTooltipsShows === tooltipsID) {
            return;  // The tooltips is shown for this one, doesn't need to do anything
        }

        currentTooltipsShows = tooltipsID;

        getTooltipsBody(tooltipsID, callback).then(function (tooltipsBody) {  // Get tooltips body from cache or from callback function

            if (currentTooltipsShows !== tooltipsID) { // If the mouse move away, don't show the tooltips
                return;
            }

            const newTooltips = createTooltipBox(tooltipsBody);
            const dialog = newTooltips[0];
            const dialogArrow = newTooltips[1];

            $('.dialog').detach(); // Remove the box
            dialogArrow.removeAttr("style"); // Remove style of arrow

            dialog.appendTo('.page-content'); // Show the new tooltip dialog

            // Generate `left` and `translateX` attribute
            const lattr = generateLeftAttr(aTag, dialog, dialogArrow);
            const leftAttr = lattr[0];
            const translateX = lattr[1];

            // Generate `top` and `translateY` attribute
            const tattr = generateTopAttr(aTag, dialog, dialogArrow);
            const topAttr = tattr[0];
            const translateY = tattr[1];

            dialog.css({
                top: topAttr,
                left: leftAttr,
            });
            dialogArrow.css("transform", "translate(" + translateX + ", " + translateY + ")");
            dialog.fadeIn(50);

            dialog.on('mouseenter', function () {
                currentTooltipsShows = tooltipsID;
            });

            dialog.on('mouseleave', function () {
                currentTooltipsShows = null;
                debounce(function () {
                    if (currentTooltipsShows === null) { // If it's still null, perform a fade out animation
                        $('.dialog').fadeOut(100, function () {
                            if (currentTooltipsShows === null) { // If it's still null after 100ms. remove the box
                                $('.dialog').detach();
                            }
                        });
                    }
                })();
            });
        });
    });

    $(aTag).on('mouseleave', function () {
        currentTooltipsShows = null;
        debounce(function () {
            if (currentTooltipsShows === null) { // If it's still null, perform a fade out animation
                $('.dialog').fadeOut(100, function () {
                    if (currentTooltipsShows === null) { // If it's still null after 100ms. remove the box
                        $('.dialog').detach();
                    }
                });
            }
        })();
    });
}

/**
 * Gerenerate preview text to show on the tooltips.
 *  We only preserve the bold and italic for the preview.
 *  We also ignore reference, reference list, and the information box at <aside>
 * @param {HTMLElement} content HTML content retrieved from mediawiki API
 * @returns {string} Preview text
 */
function generatePreviewText(content) {
    var text = "";
    for (var i = 0; i < content.childNodes.length; i++) {
        const sub = content.childNodes[i];
        if (sub.nodeType === Node.ELEMENT_NODE) {
            if (sub.tagName === "ASIDE" ||
                sub.classList.contains("mw-references-wrap") ||  // Reference list
                sub.classList.contains("reference")  // Reference
            ) {
                // pass
            } else if (sub.tagName === "B") {
                text += '<b>' + generatePreviewText(sub) + '</b>'
            } else if (sub.tagName === "I") {
                text += '<i>' + generatePreviewText(sub) + '</i>'
            } else {
                text += generatePreviewText(sub);
            }

        } else if (sub.nodeType === Node.TEXT_NODE) { // Pure Text
            text += sub.nodeValue.trim();
        }
    }
    return text;
}

// Show the reference
$("sup.reference a").each(function () {

    var refId = $(this).attr('href');
    refId = refId.replace(":", "\\:"); // An ID might contains a colon, add a backslash before the colon

    const ref = $("li" + refId + " .reference-text");
    if (!ref) return;

    const refText = ref.html();

    bindEventOnTooltips(this, refId, function () {
        const wrapper = $('<div class="dialog-preview-reference">').append(
            $('<div style="font-weight: bold;">參考來源</div>'),
            $('<div>').append(refText)
        );
        return Promise.resolve(wrapper);
    })
});

// Preview the article
$("#content a").each(function () {
    const href = $(this).attr("href");
    if (href === undefined ||
        !href.toLowerCase().startsWith("/zh/wiki/") ||  // Not a link to the community
        href.includes("?") || // e.g. `?veaction=edit`, `?action=submit`
        href.includes(":") || // e.g. `Template:`, `File:`
        $(this).hasClass("mw-editsection-visualeditor")) { // Link to open editor 
        return;
    }

    const article = $(this).attr("title");
    if (article === undefined) {
        return;
    }

    bindEventOnTooltips(this, href, function () {
        return new Promise(function (resolve) {
            var text = '取得預覽時發生錯誤';
            var imgurl = '';

            $.ajax({
                url: '/zh/api.php?action=parse&page=' + article + '&prop=text&format=json&disablepp=&redirects=&smaxage=600&maxage=600&section=0',
                method: "GET",
                timeout: 5000,
            }).then(function (data) {
                if (data && data.parse && data.parse.text && data.parse.text["*"]) { // The data exists
                    const content = data.parse.text["*"];
                    const contentParsed = $.parseHTML(content);

                    text = generatePreviewText(contentParsed[0]);

                    var imgs = $(contentParsed).find("aside figure img");
                    if (imgs.length !== 0) {
                        imgurl = $(imgs[0]).attr("src");
                    }
                }

                const wrapper = $('<div class="dialog-preview-article">').append(
                    $('<a class="reset-a" href=' + href + '>').append(
                        $('<div class="dialog-preview-article-text">').html(text)
                    )
                );

                if (imgurl !== '') {
                    wrapper.addClass("with-thumbnail");
                    wrapper.append(
                        $('<a class="reset-a" href=' + href + '>').append(
                            $('<img src=' + imgurl + ' class="dialog-preview-article-thumbnail">')
                        )
                    );
                }
                resolve(wrapper);
            });
        });
    });
});
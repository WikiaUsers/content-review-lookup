// Reference tooltips
// Ported from https://ru.wikipedia.org/wiki/MediaWiki:Gadget-referenceTooltips.js

function referenceTooltips($content) {
    // Make sure we are in article, project, or help namespace
    if ($.inArray(mw.config.get('wgCanonicalNamespace'), ["", "Project", "Help", "Draft"]) !== -1) {

        function toggleRT(o) {
            mw.loader.using("mediawiki.cookie", function () {
                mw.cookie.set("RTsettings", o + "|" + settings[1] + "|" + settings[2], {path: "/", expires: 90});
                location.reload();
            });
        }

        var settings;
        settings = [1, 200, +("ontouchstart" in document.documentElement)];
        if (settings[0] == 0) {
            var footer = $("#footer-places, #f-list");
            if (footer.length === 0) {
                footer = $("#footer li").parent();
            }
            footer.append($("<li>").append(
                $("<a>")
                    .text(mw.message("RT-enable"))
                    .attr("href", "#")
                    .click(function () {
                        toggleRT(1)
                    })
            ));
            return;
        }
        var isTouchscreen = +settings[2],
            timerLength = isTouchscreen ? 0 : +settings[1];
        $content.find('.reference').each(function () {
            var tooltipNode, hideTimer, showTimer, checkFlip = false;

            function findRef(h) {
                h = h.firstChild;
                h = h && h.getAttribute && h.getAttribute("href");
                h = h && h.split("#");
                h = h && h[1];
                h = h && document.getElementById(h);
                h = h && h.nodeName == "LI" && h;
                return h;
            }

            function hide(refLink) {
                if (tooltipNode && tooltipNode.parentNode == document.body) {
                    hideTimer = setTimeout(function () {
                        $(tooltipNode).animate({opacity: 0}, 100, function () {
                            document.body.removeChild(tooltipNode)
                        });
                    }, isTouchscreen ? 16 : 100);
                } else {
                    $(findRef(refLink)).removeClass("RTTarget");
                }
            }

            function show() {
                if (!tooltipNode.parentNode || tooltipNode.parentNode.nodeType === 11) {
                    document.body.appendChild(tooltipNode);
                    checkFlip = true;
                }
                $(tooltipNode).stop().animate({opacity: 1}, 100);
                clearTimeout(hideTimer);
            }

            $(this)[isTouchscreen ? 'click' : 'hover'](function (e) {
                var _this = this;
                if (isTouchscreen) {
                    e.preventDefault();
                    (tooltipNode && tooltipNode.parentNode == document.body) || setTimeout(function () {
                        $(document.body).on("click touchstart", function (e) {
                            e = e || event;
                            e = e.target || e.srcElement;
                            for (; e && !$(e).hasClass("referencetooltip");)
                                e = e.parentNode;
                            if (!e) {
                                clearTimeout(showTimer);
                                hide(_this);
                                $(document.body).off("click touchstart", arguments.callee);
                            }
                        });
                    }, 0);
                }
                hideTimer && clearTimeout(hideTimer);
                showTimer && clearTimeout(showTimer);
                showTimer = setTimeout(function () {
                    var h = findRef(_this);
                    if (!h) {
                        return
                    }
                    var windowTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
                        hOffsetTop = $(h).offset().top;
                    if (!isTouchscreen && windowTop < hOffsetTop && windowTop + $(window).height() > hOffsetTop + h.offsetHeight) {
                        $(h).addClass("RTTarget");
                        return;
                    }
                    if (!tooltipNode) {
                        tooltipNode = document.createElement("ul");
                        tooltipNode.className = "referencetooltip";
                        var c = tooltipNode.appendChild($(h).clone(true)[0]);
                        try {
                            if (c.firstChild.nodeName != "A") {
                                while (c.childNodes[1].nodeName == "A" && c.childNodes[1].getAttribute("href").indexOf("#cite_ref-") !== -1) {
                                    do {
                                        c.removeChild(c.childNodes[1])
                                    } while (c.childNodes[1].nodeValue == " ");
                                }
                            }
                        } catch (e) {
                            mw.log(e)
                        }
                        c.removeChild(c.firstChild);
                        tooltipNode.appendChild(document.createElement("li"));
                        isTouchscreen || $(tooltipNode).hover(show, hide);
                    }
                    show();
                    var o = $(_this).offset(), oH = tooltipNode.offsetHeight;
                    $(tooltipNode).css({top: o.top - oH, left: o.left - 7});
                    if (tooltipNode.offsetHeight > oH) { // is it squished against the right side of the page?
                        $(tooltipNode).css({left: 'auto', right: 0});
                        tooltipNode.lastChild.style.marginLeft = (o.left - tooltipNode.offsetLeft) + "px";
                    }
                    if (checkFlip) {
                        if (o.top < tooltipNode.offsetHeight + ( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0 )) { // is part of it above the top of the screen?
                            $(tooltipNode).addClass("RTflipped").css({top: o.top + 12});
                        } else if (tooltipNode.className === "referencetooltip RTflipped") { // cancel previous
                            $(tooltipNode).removeClass("RTflipped");
                        }
                        checkFlip = false;
                    }
                }, timerLength);
            }, isTouchscreen ? undefined : function () {
                clearTimeout(showTimer);
                hide(this);
            });

        });

    }
}

mw.hook('wikipage.content').add(referenceTooltips);
/* Any JavaScript here will be loaded for all users on every page load. */


/* JAKE CHAOS MODE */

mw.loader.using(["mediawiki.api"]).then(function () {
    var jakeImageUrl = null;
    var active = false;
    var savedImages = [];
    var savedBackgrounds = [];
    var savedText = [];

    new mw.Api().get({
        action: "query",
        titles: "File:JAKE.png",
        prop: "imageinfo",
        iiprop: "url"
    }).then(function (data) {
        var pages = data.query.pages;
        var page = pages[Object.keys(pages)[0]];

        if (page.imageinfo && page.imageinfo[0]) {
            jakeImageUrl = page.imageinfo[0].url;
        }
    });

    function toggleJakeChaos() {
        if (!jakeImageUrl) {
            alert("Jake image is still loading. Try again in a moment!");
            return;
        }

        active = !active;

        document.body.classList.remove("jake-chaos-flash");
        void document.body.offsetWidth;
        document.body.classList.add("jake-chaos-flash");

        if (active) {
            savedImages = [];
            savedBackgrounds = [];
            savedText = [];

            document.querySelectorAll("img").forEach(function (img) {
                if (img.closest(".jake-chaos-trigger")) return;

                savedImages.push({
                    el: img,
                    src: img.getAttribute("src"),
                    srcset: img.getAttribute("srcset")
                });

                img.src = jakeImageUrl;
                img.removeAttribute("srcset");
            });

            document.querySelectorAll("*").forEach(function (el) {
                if (el.closest(".jake-chaos-trigger")) return;

                var bg = getComputedStyle(el).backgroundImage;

                if (bg && bg !== "none") {
                    savedBackgrounds.push({
                        el: el,
                        bg: el.style.getPropertyValue("background-image"),
                        priority: el.style.getPropertyPriority("background-image")
                    });

                    el.style.setProperty(
                        "background-image",
                        "url('" + jakeImageUrl + "')",
                        "important"
                    );
                    el.style.setProperty("background-repeat", "repeat", "important");
                }
            });

            document.body.style.setProperty(
                "background-image",
                "url('" + jakeImageUrl + "')",
                "important"
            );

            var walker = document.createTreeWalker(
                document.querySelector("#mw-content-text") || document.body,
                NodeFilter.SHOW_TEXT
            );

            while (walker.nextNode()) {
                var node = walker.currentNode;

                if (!node.nodeValue.trim()) continue;
                if (node.parentElement.closest(".jake-chaos-trigger, script, style, textarea, input, code, pre")) continue;

                savedText.push({
                    node: node,
                    original: node.nodeValue
                });

                node.nodeValue = node.nodeValue.replace(
                    /\S+/g,
                    function () {
                        return Math.random() < 0.5
                            ? "Jake Junior"
                            : "Jake Senior";
                    }
                );
            }

            document.body.classList.add("jake-chaos-active");
        } else {
            savedImages.forEach(function (item) {
                if (item.src === null) item.el.removeAttribute("src");
                else item.el.setAttribute("src", item.src);

                if (item.srcset === null) item.el.removeAttribute("srcset");
                else item.el.setAttribute("srcset", item.srcset);
            });

            savedBackgrounds.forEach(function (item) {
                if (item.bg) {
                    item.el.style.setProperty(
                        "background-image",
                        item.bg,
                        item.priority
                    );
                } else {
                    item.el.style.removeProperty("background-image");
                }
            });

            savedText.forEach(function (item) {
                item.node.nodeValue = item.original;
            });

            document.body.style.removeProperty("background-image");
            document.body.classList.remove("jake-chaos-active");
        }

        setTimeout(function () {
            document.body.classList.remove("jake-chaos-flash");
        }, 450);
    }

    document.addEventListener("click", function (event) {
    var target = event.target;

    if (target instanceof Element) {
        var trigger = target.closest(".jake-chaos-trigger");

        if (trigger) {
            console.log("JAKE TRIGGER CLICKED!");
            event.preventDefault();
            toggleJakeChaos();
        }
    }
});
});


(function () {
    var variants = {
        'golden markiplier': {
            title: 'Golden Markiplier',
            color: '#ffd700'
        },
        'ruby markiplier': {
            title: 'Ruby Markiplier',
            color: '#e0115f'
        },
        'sapphire markiplier': {
            title: 'Sapphire Markiplier',
            color: '#0f52ba'
        },
        'silver markiplier': {
            title: 'Silver Markiplier',
            color: '#c0c0c0'
        }
    };

    function setup(context) {
        var containers = [];

        if (
            context.matches &&
            context.matches('.freak-infobox-container')
        ) {
            containers.push(context);
        }

        if (context.querySelectorAll) {
            containers = containers.concat(
                Array.from(
                    context.querySelectorAll('.freak-infobox-container')
                )
            );
        }

        containers.forEach(function (container) {
            var infobox = container.querySelector('.portable-infobox');
            if (!infobox) return;

            var collection = infobox.querySelector('.pi-image-collection');
            if (!collection || collection.dataset.variantSwitcherReady) return;

            var title = infobox.querySelector('.pi-title');
            if (!title) return;

            var tabs = collection.querySelectorAll(
                '.wds-tabs__tab, .pi-tab-link'
            );

            if (!tabs.length) return;

            collection.dataset.variantSwitcherReady = 'true';

            function updateVariant(name) {
                var key = name.trim().toLowerCase();
                var variant = variants[key];

                if (!variant) return;

                title.textContent = variant.title;

                container.style.setProperty('--char-color', variant.color);
                infobox.style.setProperty('--char-color', variant.color);

                infobox.querySelectorAll('.pi-title, .pi-header').forEach(
                    function (element) {
                        element.style.setProperty(
                            'background-color',
                            variant.color,
                            'important'
                        );
                    }
                );

                infobox.querySelectorAll('.pi-border-color').forEach(
                    function (element) {
                        element.style.setProperty(
                            'border-color',
                            variant.color,
                            'important'
                        );
                    }
                );
            }

            function getTabName(tab) {
                var label = tab.querySelector(
                    '.wds-tabs__tab-label, .pi-tab-label'
                );

                return (label || tab).textContent
                    .trim()
                    .replace(/\s+/g, ' ')
                    .toLowerCase();
            }

            collection.addEventListener('click', function (event) {
                var target = event.target;
                if (!(target instanceof Element)) return;

                var tab = target.closest(
                    '.wds-tabs__tab, .pi-tab-link'
                );

                if (!tab || !collection.contains(tab)) return;

                var name = getTabName(tab);

                if (variants[name]) {
                    updateVariant(name);
                }
            });

            var activeTab = collection.querySelector(
                '.wds-tabs__tab.wds-is-current, ' +
                '.wds-tabs__tab[aria-selected="true"], ' +
                '.pi-tab-link.current'
            );

            if (activeTab) {
                updateVariant(getTabName(activeTab));
            }
        });
    }

    mw.hook('wikipage.content').add(function ($content) {
        setup($content[0]);
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            setup(document);
        });
    } else {
        setup(document);
    }
})();

mw.hook('wikipage.content').add(function($content) {
    $content.find('.autoplay-audio-trigger').each(function() {
        var url = $(this).data('audio-url');
        if (url && !$(this).data('audio-played')) {
            $(this).data('audio-played', true);
            var audio = new Audio(url);
            
            audio.play().catch(function() {
                $(document).one('click keydown', function() {
                    audio.play();
                });
            });
        }
    });
});


window.spoilerTags = {
    unspoil: false
};
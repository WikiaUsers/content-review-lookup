$(function () {
    const vkElements = document.querySelectorAll(".vk-widget");

    if (vkElements.length < 1) return;

    mw.loader.getScript("https://vk.com/js/api/openapi.js?169").then(init);

    function init() {
        for (var i in vkElements) {
            var dataset = vkElements[i].dataset;

            if (!dataset.widget) return;

            vkElements[i].classList.add("vk-element--" + dataset.widget);
            vkElements[i].id += "vk-element-" + i;

            var id = "vk-element-" + i;

            switch (dataset.widget) {
                case "community":   setup.community(dataset, id); break;
                case "poll":        setup.poll(dataset, id); break;
                case "subscribe":   setup.subscribe(dataset, id); break;
                case "app":         setup.app(dataset, id); break;
                case "article":     setup.article(dataset, id); break;
                case "podcast":     setup.podcast(dataset, id); break;
            }
        }
    }

        var setup = {
            community: function(dataset, id) {
                var mode, nocover, height, width;

                if (dataset.mode) {
                    switch (dataset.mode) {
                        case "users":
                            mode = 3;
                            break;
                        case "feed":
                            mode = 4;
                            break;
                        case "basic":
                        default:
                            mode = 1;
                            break;
                    }
                } else mode = 1;

                if (dataset.nocover) {
                    switch (dataset.nocover) {
                        case "true":
                            nocover = 1;
                            break;
                        case "false":
                            nocover = 0;
                            break;
                        default:
                            nocover = 0;
                            break;
                    }
                } else {
                    mode = 1;
                    soft = 0;
                }

                height = dataset.height ? dataset.height : 400;
                width = dataset.width ? dataset.width : 300;

                VK.Widgets.Group(id, {
                    mode: mode,
                    no_cover: nocover,
                    height: height,
                    width: width,
                    color1: dataset.colorBg,
                    color2: dataset.colorText,
                    color3: dataset.colorButton
                }, dataset.id);
            },

            poll: function(dataset, id) {
                VK.Widgets.Poll(id, {}, dataset.id);
            },

            subscribe: function(dataset, id) {
                var mode, soft;

                if (dataset.mode) {
                    switch (dataset.mode) {
                        case "button":
                            mode = 1;
                            soft = 0;
                            break;
                        case "button-soft":
                            mode = 1;
                            soft = 1;
                            break;
                        case "link":
                            mode = 2;
                            soft = 0;
                            break;
                        case "link-soft":
                            mode = 2;
                            soft = 1;
                            break;
                        default:
                            mode = 1;
                            soft = 0;
                            break;
                    }
                } else {
                    mode = 1;
                    soft = 0;
                }

                VK.Widgets.Subscribe(id, {
                    mode: mode,
                    soft: soft
                }, dataset.id);
            },

            app: function(dataset, id) {
                var mode;

                if (dataset.mode) {
                    switch (dataset.mode) {
                        case "card":
                            mode = 1;
                            break;
                        case "users":
                            mode = 2;
                            break;
                        case "button":
                            mode = 3;
                            break;
                        default:
                            mode = 1;
                            break;
                    }
                } else mode = 1;

                VK.Widgets.App(id, dataset.id, {
                    mode: mode
                });
            },

            article: function(dataset, id) {
                VK.Widgets.Article(id, dataset.link);
            },

            podcast: function(dataset, id) {
                VK.Widgets.Podcast(id, dataset.link);
            }
        };
});